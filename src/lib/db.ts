// db.ts - Firestore helper with DEMO_MODE fallback.
import { DEMO_MODE, demoMoods } from '../config';

// NOTE: To enable Firestore, install firebase and fill in config below.
// For hackathon/demo without backend, DEMO_MODE=true will be used.
// To enable real DB, set DEMO_MODE=false and provide valid firebaseConfig.
let firebaseAvailable = false;
try {
  // lazy import to avoid runtime error when firebase is not installed
  import('firebase/app').then((firebase) => {
    firebaseAvailable = !!firebase;
  });
} catch {
  firebaseAvailable = false;
}

// For ES modules, we can use dynamic import instead of require
// But since firebase is installed, we'll keep it simple for now

// Placeholder types
export type MoodEntry = { date: string; mood: string; note?: string; userId?: string };

type DemoMood = { date: string; mood: string };

// If DEMO_MODE, return demo moods
export async function saveMood(userId: string, date: string, mood: string, note?: string) : Promise<MoodEntry | null> {
  if (DEMO_MODE) {
    const entry = { date, mood, note };
    // In demo mode, we don't persist to server; just return the entry.
    console.log('[db] DEMO_MODE saveMood', entry);
    return entry;
  }
  if (!firebaseAvailable) {
    console.warn('[db] Firebase SDK not available. Enable DEMO_MODE or install firebase.');
    return null;
  }
  // Real implementation left as TODO for integration
  console.warn('[db] Real Firestore save not implemented in this demo patch.');
  return { date, mood, note };
}

/* eslint-disable @typescript-eslint/no-unused-vars */
export async function getMoods(_userId: string): Promise<MoodEntry[]> {
  if (DEMO_MODE) {
    // map demoMoods shape to MoodEntry if necessary
    return demoMoods.map((d: DemoMood) => ({ date: d.date, mood: d.mood, note: '' }));
  }
  if (!firebaseAvailable) {
    console.warn('[db] Firebase SDK not available. Enable DEMO_MODE or install firebase.');
    return [];
  }
  // Real implementation left as TODO for integration
  console.warn('[db] Real Firestore get not implemented in this demo patch.');
  return [];
}
