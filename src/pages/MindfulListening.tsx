import React from 'react';
import { useNavigate } from 'react-router-dom';

const MindfulListening: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Mindful Listening 🎧</h1>
      <p className="text-center max-w-xl mb-6">
        This is the Mindful Listening session. Add instructions/audio here.
      </p>
      <button
        onClick={() => navigate('/')}
        className="px-6 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default MindfulListening;
