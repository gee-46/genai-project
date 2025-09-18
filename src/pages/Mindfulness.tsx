import React from 'react';
import { useNavigate } from 'react-router-dom';

const Mindfulness: React.FC = () => {
  const navigate = useNavigate();

  const exercises = [
    {
      title: "5-Minute Breathing Awareness",
      description: "Focus on your breath for 5 minutes. Inhale deeply through your nose, hold for a moment, and exhale slowly through your mouth. This helps calm the mind and reduce stress.",
      button: "Start Exercise",
      route: "/mindfulness-session"
    },
    {
      title: "Mindful Listening 🎧",
      description: "Close your eyes and focus on the sounds around you for 3–5 minutes. This boosts presence and awareness.",
      button: "Start Listening",
      route: "/mindful-listening"
    },
    {
      title: "Affirmation Booster 🌟",
      description: "Read or listen to positive affirmations tailored to reduce stress and build confidence.",
      button: "Start Affirmations",
      route: "/affirmations"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">🧘 Mindfulness Exercises</h1>
          <p className="text-gray-600 text-lg">Take a moment to center yourself with these guided practices</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exercises.map((exercise, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{exercise.title}</h3>
              <p className="text-gray-700 mb-4">{exercise.description}</p>
              <button
                onClick={() => navigate(exercise.route)}
                className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-teal-600 transition-colors"
              >
                {exercise.button}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mindfulness;
