import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

let db;

async function initDb() {
  db = await open({
    filename: './journals.db',
    driver: sqlite3.Database
  });
  await db.run(`
    CREATE TABLE IF NOT EXISTS journals (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT UNIQUE,
      content TEXT
    )
  `);
  await db.run(`
    CREATE TABLE IF NOT EXISTS affirmations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT,
      affirmation TEXT,
      userId TEXT DEFAULT 'anon'
    )
  `);
  await db.run(`
    CREATE TABLE IF NOT EXISTS chatHistory (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId TEXT DEFAULT 'anon',
      message TEXT,
      response TEXT,
      timestamp TEXT
    )
  `);
  await db.run(`
    CREATE TABLE IF NOT EXISTS communityPosts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId TEXT DEFAULT 'anon',
      title TEXT,
      content TEXT,
      timestamp TEXT,
      likes INTEGER DEFAULT 0
    )
  `);
  await db.run(`
    CREATE TABLE IF NOT EXISTS moodEntries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId TEXT DEFAULT 'anon',
      date TEXT,
      mood TEXT,
      note TEXT
    )
  `);
  await db.run(`
    CREATE TABLE IF NOT EXISTS wellnessProgress (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId TEXT DEFAULT 'anon',
      activity TEXT,
      date TEXT
    )
  `);
  await db.run(`
    CREATE TABLE IF NOT EXISTS recommendations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT,
      content TEXT,
      mood TEXT
    )
  `);
  await db.run(`
    CREATE TABLE IF NOT EXISTS groupJournals (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      groupId TEXT,
      userId TEXT DEFAULT 'anon',
      content TEXT,
      date TEXT
    )
  `);
  await db.run(`
    CREATE TABLE IF NOT EXISTS breathingLogs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId TEXT DEFAULT 'anon',
      duration INTEGER,
      date TEXT
    )
  `);
  await db.run(`
    CREATE TABLE IF NOT EXISTS crisisRequests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId TEXT DEFAULT 'anon',
      timestamp TEXT
    )
  `);

  // Insert sample recommendations
  await db.run("INSERT OR IGNORE INTO recommendations (type, content, mood) VALUES ('song', 'Happy Song - Artist', 'happy')");
  await db.run("INSERT OR IGNORE INTO recommendations (type, content, mood) VALUES ('video', 'Motivational Video', 'happy')");
  await db.run("INSERT OR IGNORE INTO recommendations (type, content, mood) VALUES ('exercise', 'Calm Breathing', 'stressed')");
  await db.run("INSERT OR IGNORE INTO recommendations (type, content, mood) VALUES ('song', 'Relaxing Music', 'stressed')");
  await db.run("INSERT OR IGNORE INTO recommendations (type, content, mood) VALUES ('video', 'Nature Documentary', 'relaxed')");
  await db.run("INSERT OR IGNORE INTO recommendations (type, content, mood) VALUES ('exercise', 'Gentle Yoga', 'relaxed')");
  await db.run("INSERT OR IGNORE INTO recommendations (type, content, mood) VALUES ('song', 'Uplifting Tune', 'low')");
  await db.run("INSERT OR IGNORE INTO recommendations (type, content, mood) VALUES ('video', 'Inspirational Story', 'low')");
}

app.post('/api/journals', async (req, res) => {
  const { date, content } = req.body;
  if (!date || content === undefined) {
    return res.status(400).json({ error: 'Date and content are required' });
  }
  try {
    const existing = await db.get('SELECT * FROM journals WHERE date = ?', date);
    if (existing) {
      await db.run('UPDATE journals SET content = ? WHERE date = ?', content, date);
    } else {
      await db.run('INSERT INTO journals (date, content) VALUES (?, ?)', date, content);
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/journals/:date', async (req, res) => {
  const { date } = req.params;
  try {
    const journal = await db.get('SELECT * FROM journals WHERE date = ?', date);
    if (journal) {
      res.json({ content: journal.content });
    } else {
      res.json({ content: '' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/affirmations', async (req, res) => {
  const { date, affirmation, userId = 'anon' } = req.body;
  if (!date || !affirmation) {
    return res.status(400).json({ error: 'Date and affirmation are required' });
  }
  try {
    await db.run('INSERT INTO affirmations (date, affirmation, userId) VALUES (?, ?, ?)', date, affirmation, userId);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/affirmations/:date', async (req, res) => {
  const { date } = req.params;
  const { userId = 'anon' } = req.query;
  try {
    const affirmations = await db.all('SELECT * FROM affirmations WHERE date = ? AND userId = ?', date, userId);
    res.json({ affirmations });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/affirmations/streak/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const rows = await db.all('SELECT DISTINCT date FROM affirmations WHERE userId = ? ORDER BY date DESC', userId);
    const streak = rows.length;
    res.json({ streak });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Chat History
app.post('/api/chat', async (req, res) => {
  const { userId = 'anon', message, response } = req.body;
  const timestamp = new Date().toISOString();
  try {
    await db.run('INSERT INTO chatHistory (userId, message, response, timestamp) VALUES (?, ?, ?, ?)', userId, message, response, timestamp);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/chat/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const history = await db.all('SELECT * FROM chatHistory WHERE userId = ? ORDER BY timestamp DESC', userId);
    res.json({ history });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Community Posts
app.post('/api/community', async (req, res) => {
  const { userId = 'anon', title, content } = req.body;
  const timestamp = new Date().toISOString();
  try {
    await db.run('INSERT INTO communityPosts (userId, title, content, timestamp) VALUES (?, ?, ?, ?)', userId, title, content, timestamp);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/community', async (req, res) => {
  try {
    const posts = await db.all('SELECT * FROM communityPosts ORDER BY timestamp DESC');
    res.json({ posts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/community/:id/like', async (req, res) => {
  const { id } = req.params;
  try {
    await db.run('UPDATE communityPosts SET likes = likes + 1 WHERE id = ?', id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mood Entries
app.post('/api/mood', async (req, res) => {
  const { userId = 'anon', date, mood, note } = req.body;
  try {
    await db.run('INSERT INTO moodEntries (userId, date, mood, note) VALUES (?, ?, ?, ?)', userId, date, mood, note);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/mood/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const entries = await db.all('SELECT * FROM moodEntries WHERE userId = ? ORDER BY date DESC', userId);
    res.json({ entries });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Wellness Progress
app.post('/api/wellness', async (req, res) => {
  const { userId = 'anon', activity, date } = req.body;
  try {
    await db.run('INSERT INTO wellnessProgress (userId, activity, date) VALUES (?, ?, ?)', userId, activity, date);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/wellness/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const progress = await db.all('SELECT * FROM wellnessProgress WHERE userId = ? ORDER BY date DESC', userId);
    res.json({ progress });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Recommendations
app.get('/api/recommendations/:mood', async (req, res) => {
  const { mood } = req.params;
  try {
    const recommendations = await db.all('SELECT * FROM recommendations WHERE mood = ?', mood);
    res.json({ recommendations });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Group Journals
app.post('/api/group-journals', async (req, res) => {
  const { groupId, userId = 'anon', content, date } = req.body;
  try {
    await db.run('INSERT INTO groupJournals (groupId, userId, content, date) VALUES (?, ?, ?, ?)', groupId, userId, content, date);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/group-journals/:groupId', async (req, res) => {
  const { groupId } = req.params;
  try {
    const entries = await db.all('SELECT * FROM groupJournals WHERE groupId = ? ORDER BY date DESC', groupId);
    res.json({ entries });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Breathing Logs
app.post('/api/breathing', async (req, res) => {
  const { userId = 'anon', duration, date } = req.body;
  try {
    await db.run('INSERT INTO breathingLogs (userId, duration, date) VALUES (?, ?, ?)', userId, duration, date);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crisis Requests
app.post('/api/crisis', async (req, res) => {
  const { userId = 'anon' } = req.body;
  const timestamp = new Date().toISOString();
  try {
    await db.run('INSERT INTO crisisRequests (userId, timestamp) VALUES (?, ?)', userId, timestamp);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Failed to initialize database', err);
});
