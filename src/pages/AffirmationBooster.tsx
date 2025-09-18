import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRandomAffirmation } from '../lib/affirmations';
import { useMoods } from '../hooks/useMoods';

const AffirmationBooster: React.FC = () => {
  const navigate = useNavigate();
  const [currentAffirmation, setCurrentAffirmation] = useState<string>('');
  const [streak, setStreak] = useState<number>(0);
  const { moods } = useMoods('anon');

  useEffect(() => {
    // Get latest mood
    const latestMood = moods.length > 0 ? moods[0].mood : 'happy';
    const moodKey = latestMood.toLowerCase().includes('happy') ? 'happy' :
                    latestMood.toLowerCase().includes('stressed') ? 'stressed' :
                    latestMood.toLowerCase().includes('relaxed') ? 'relaxed' :
                    latestMood.toLowerCase().includes('low') ? 'low' : 'happy';
    setCurrentAffirmation(getRandomAffirmation(moodKey));

    // Fetch streak
    fetch('http://localhost:4000/api/affirmations/streak/anon')
      .then(res => res.json())
      .then(data => setStreak(data.streak))
      .catch(err => console.error('Failed to fetch streak', err));
  }, [moods]);

  const handleNextAffirmation = () => {
    const latestMood = moods.length > 0 ? moods[0].mood : 'happy';
    const moodKey = latestMood.toLowerCase().includes('happy') ? 'happy' :
                    latestMood.toLowerCase().includes('stressed') ? 'stressed' :
                    latestMood.toLowerCase().includes('relaxed') ? 'relaxed' :
                    latestMood.toLowerCase().includes('low') ? 'low' : 'happy';
    setCurrentAffirmation(getRandomAffirmation(moodKey));
  };

  const handlePlayAffirmation = () => {
    const utterance = new SpeechSynthesisUtterance(currentAffirmation);
    window.speechSynthesis.speak(utterance);
  };

  const handleSaveToJournal = async () => {
    const today = new Date().toISOString().split('T')[0];
    try {
      const response = await fetch('http://localhost:4000/api/affirmations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: today, affirmation: currentAffirmation, userId: 'anon' })
      });
      if (response.ok) {
        alert('Affirmation saved to journal!');
        // Update streak
        setStreak(prev => prev + 1);
      } else {
        alert('Failed to save affirmation.');
      }
    } catch (error) {
      console.error('Error saving affirmation:', error);
      alert('Error saving affirmation.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-8 relative overflow-hidden">
      {/* Calming background animation */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-purple-300 rounded-full animate-pulse"></div>
        <div className="absolute top-20 right-20 w-24 h-24 bg-pink-300 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 left-20 w-28 h-28 bg-blue-300 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-20 h-20 bg-purple-400 rounded-full animate-bounce"></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <span className="text-xl mr-2">⬅</span>
            Back to Dashboard
          </button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">🌸 Affirmation Booster</h1>
          <p className="text-gray-600 text-lg">You've practiced affirmations for {streak} days</p>
        </div>

        <div className="flex justify-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 max-w-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">Daily Affirmation</h2>
            <p className="text-gray-700 text-lg text-center italic mb-8">"{currentAffirmation}"</p>
            <div className="flex flex-col space-y-4">
              <button
                onClick={handleNextAffirmation}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-colors"
              >
                Next Affirmation 🔄
              </button>
              <button
                onClick={handlePlayAffirmation}
                className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 px-4 rounded-lg hover:from-green-600 hover:to-teal-600 transition-colors"
              >
                Play Affirmation 🔊
              </button>
              <button
                onClick={handleSaveToJournal}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-4 rounded-lg hover:from-orange-600 hover:to-red-600 transition-colors"
              >
                Save to Journal 💾
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AffirmationBooster;
