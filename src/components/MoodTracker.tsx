// src/components/MoodTracker.tsx
import React, { useState, useEffect } from 'react';
import BreathingExercise from './BreathingExercise';

const currentYear = new Date().getFullYear();

function isValidYear(y: number) {
  return Number.isInteger(y) && y >= 2000 && y <= 2099;
}

// helper to get days in month
function getDaysInMonth(year: number, monthIndex: number) {
  return new Date(year, monthIndex + 1, 0).getDate();
}

const MoodTracker: React.FC = () => {
  const [year, setYear] = useState<number>(currentYear);
  const [userId] = useState<string>('anon');
  const [showBreathing, setShowBreathing] = useState<boolean>(false);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedMood, setSelectedMood] = useState<string>('😊 Happy');
  const [note, setNote] = useState<string>('');
  const [moods, setMoods] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchMoods();
  }, [year]);

  const fetchMoods = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:4000/api/mood/${userId}`);
      const data = await response.json();
      setMoods(data.entries || []);
    } catch (error) {
      console.error('Failed to fetch moods', error);
    } finally {
      setLoading(false);
    }
  };

  const addMood = async (date: string, mood: string, note?: string) => {
    try {
      const response = await fetch('http://localhost:4000/api/mood', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, date, mood, note })
      });
      if (response.ok) {
        fetchMoods(); // refresh
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to save mood', error);
      return false;
    }
  };

  // map moods by date YYYY-MM-DD to mood string
  const moodMap = new Map<string, string>(moods.map((m: any) => [m.date, m.mood]));

  const handleSaveMood = async (date: string) => {
    await addMood(date, selectedMood, note);
    setNote('');
    alert(`Saved mood for ${date} ✔️`);
  };

  const handleYearChange = (val: string) => {
    const y = Number(val);
    if (!isNaN(y) && isValidYear(y)) {
      setYear(y);
      setSelectedMonth(null);
      setSelectedDate(null);
    } else {
      // invalid year, ignore or show error - choose to alert
      alert('Please enter a valid year between 2000 and 2099');
    }
  };

  const months = [...Array(12)].map((_, i) => i); // 0..11

  return (
    <div className="p-4 rounded-lg shadow bg-white">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Mood Tracker 🗓️</h2>
        <div className="flex items-center gap-2">
          <label className="text-sm">Year:</label>
          <input
            type="number"
            value={year}
            min={2000}
            max={2099}
            onChange={(e) => handleYearChange(e.target.value)}
            className="w-24 p-1 border rounded"
          />
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <button onClick={() => handleSaveMood(new Date().toISOString().split('T')[0])} className="px-3 py-1 bg-green-200 rounded">😊 Happy</button>
          <button onClick={() => handleSaveMood(new Date().toISOString().split('T')[0])} className="px-3 py-1 bg-yellow-200 rounded">😟 Stressed</button>
          <button onClick={() => handleSaveMood(new Date().toISOString().split('T')[0])} className="px-3 py-1 bg-blue-200 rounded">😌 Relaxed</button>
        </div>
        <div>
          <button onClick={() => setShowBreathing(true)} className="px-3 py-1 bg-indigo-600 text-white rounded">Activate Breathing Exercise</button>
        </div>
      </div>

      {selectedMonth !== null && (
        <div className="mb-4">
          <h3 className="font-semibold mb-2">{new Date(year, selectedMonth, 1).toLocaleString(undefined, { month: 'long' })} {year}</h3>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: getDaysInMonth(year, selectedMonth) }).map((_, i) => {
              const day = i + 1;
              const key = `${year}-${String(selectedMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const mood = moodMap.get(key);
              const isSelected = selectedDate === key;
              return (
                <div
                  key={key}
                  className={`p-1 border rounded text-xs h-16 flex flex-col justify-between cursor-pointer ${
                    isSelected ? 'border-blue-600 bg-blue-100' : ''
                  }`}
                  onClick={() => setSelectedDate(key)}
                >
                  <div className="text-xs text-gray-500">{day}</div>
                  <div className="mt-2">{mood || '—'}</div>
                </div>
              );
            })}
          </div>
          {selectedDate && (
            <div className="mt-3">
              <label className="block mb-1 font-medium">Select Mood for {selectedDate}</label>
              <div className="flex gap-2 mb-2">
                <button className={`px-3 py-1 rounded ${selectedMood === '😊 Happy' ? 'bg-blue-200' : 'bg-gray-100'}`} onClick={() => setSelectedMood('😊 Happy')}>😊 Happy</button>
                <button className={`px-3 py-1 rounded ${selectedMood === '😟 Stressed' ? 'bg-blue-200' : 'bg-gray-100'}`} onClick={() => setSelectedMood('😟 Stressed')}>😟 Stressed</button>
                <button className={`px-3 py-1 rounded ${selectedMood === '😌 Relaxed' ? 'bg-blue-200' : 'bg-gray-100'}`} onClick={() => setSelectedMood('😌 Relaxed')}>😌 Relaxed</button>
                <button className={`px-3 py-1 rounded ${selectedMood === '😔 Low' ? 'bg-blue-200' : 'bg-gray-100'}`} onClick={() => setSelectedMood('😔 Low')}>😔 Low</button>
              </div>
              <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="Add a short note (optional)" className="w-full border rounded p-2 mb-2" rows={2} />
              <button onClick={() => handleSaveMood(selectedDate)} className="bg-blue-600 text-white px-4 py-2 rounded">Save Mood</button>
            </div>
          )}
          <div className="mt-2">
            <button onClick={() => setSelectedMonth(null)} className="text-sm text-blue-600">Close month</button>
          </div>
        </div>
      )}

      <h3 className="font-semibold mb-2">Year Overview: {year}</h3>
      {loading ? <div>Loading moods...</div> : (
        <div className="grid grid-cols-3 gap-3">
          {months.map((m) => {
            // count moods in this month
            const daysInMonth = getDaysInMonth(year, m);
            let count = 0;
            for (let d = 1; d <= daysInMonth; d++) {
              const key = `${year}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
              if (moodMap.has(key)) count++;
            }
            return (
              <div key={m} className="p-3 border rounded">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-medium">{new Date(year, m, 1).toLocaleString(undefined, { month: 'long' })}</div>
                  <div className="text-sm text-gray-500">{count} days</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setSelectedMonth(m)} className="text-sm px-2 py-1 border rounded">View</button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Breathing modal / inline component */}
      {showBreathing && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4">
          <div className="bg-white rounded p-4 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-semibold">Breathing Exercise (5 minutes)</h4>
              <button onClick={() => setShowBreathing(false)} className="px-2 py-1 text-sm">Close</button>
            </div>
            <BreathingExercise language="en" />
          </div>
        </div>
      )}

    </div>
  );
};

export default MoodTracker;
