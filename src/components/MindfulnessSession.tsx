import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const MindfulnessSession: React.FC = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isPaused && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const progressPercent = ((300 - timeLeft) / 300) * 100;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Mindfulness Breathing Session</h1>
      <div className="text-2xl font-mono mb-4">{formatTime(timeLeft)}</div>

      {/* Breathing animation */}
      <div className="flex items-center justify-center mb-6">
        <div
          className={`rounded-full bg-blue-400 opacity-50`}
          style={{
            width: '200px',
            height: '200px',
            animation: isPaused ? 'none' : 'breath 4s ease-in-out infinite',
          }}
        />
      </div>

      {/* Instructions */}
      <div className="mb-6 text-center text-gray-700 space-y-2">
        <p>Inhale deeply…</p>
        <p>Hold…</p>
        <p>Exhale slowly…</p>
      </div>

      {/* Controls */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={togglePause}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          {isPaused ? 'Resume' : 'Pause'}
        </button>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
        >
          Back to Dashboard
        </button>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-md h-4 bg-gray-300 rounded overflow-hidden">
        <div
          className="h-full bg-blue-600 transition-all duration-1000"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <style>{`
        @keyframes breath {
          0%, 100% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.3);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default MindfulnessSession;
