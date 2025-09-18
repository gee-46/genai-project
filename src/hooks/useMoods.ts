// src/hooks/useMoods.ts
import { useEffect, useState } from 'react';
import { getMoods, saveMood, MoodEntry } from '../lib/db';

// Hook: useMoods(userId?: string, year?: number)
// - userId defaults to 'anon' for demo
// - year is optional; if passed, moods will be filtered to that year (YYYY)
export function useMoods(userId: string = 'anon', year?: number) {
  const [moods, setMoods] = useState<MoodEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getMoods(userId);
        if (!mounted) return;
        if (!data) {
          setMoods([]);
        } else if (typeof year === 'number') {
          // filter entries that belong to the requested year
          const filtered = data.filter((m: MoodEntry) => {
            // assume m.date is YYYY-MM-DD or ISO string
            if (!m.date) return false;
            const y = new Date(m.date).getFullYear();
            return y === year;
          });
          setMoods(filtered);
        } else {
          setMoods(data);
        }
      } catch (e: unknown) {
        console.warn('[useMoods] failed', e);
        if (mounted) setError('Failed to load moods');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [userId, year]);

  // addMood persists using db.saveMood and updates local state
  const addMood = async (date: string, mood: string, note?: string) => {
    try {
      const res = await saveMood(userId, date, mood, note);
      if (res) {
        setMoods(prev => [...prev, res]);
        return res;
      } else {
        return null;
      }
    } catch (e: unknown) {
      console.warn('[useMoods] addMood failed', e);
      return null;
    }
  };

  return { moods, loading, error, addMood };
}
