import React, { useState, useEffect } from 'react';

interface BreathingExerciseProps {
  language: string;
}

const BreathingExercise: React.FC<BreathingExerciseProps> = ({ language }) => {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'complete'>('inhale');
  const [cycleCount, setCycleCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(4);
  const [isActive, setIsActive] = useState(false);
  const [totalCycles] = useState(75); // 5 minutes = 75 cycles (12s per cycle)

  const content = {
    en: {
      title: "Breathing Exercise",
      subtitle: "Find your calm with guided breathing",
      inhale: "Inhale",
      hold: "Hold",
      exhale: "Exhale",
      start: "Start Breathing",
      restart: "Restart",
      backToHome: "Back to Home",
      wellDone: "Well Done!",
      completed: "You've completed your breathing session",
      cycles: "cycles completed"
    },
    hi: {
      title: "श्वास अभ्यास",
      subtitle: "निर्देशित श्वास के साथ अपना शांत ढूंढें",
      inhale: "श्वास लें",
      hold: "रोकें",
      exhale: "श्वास छोड़ें",
      start: "श्वास शुरू करें",
      restart: "पुनः आरंभ करें",
      backToHome: "घर वापस जाएं",
      wellDone: "बहुत अच्छा!",
      completed: "आपने अपना श्वास सत्र पूरा कर लिया है",
      cycles: "चक्र पूरे हुए"
    }
  };

  const t = content[language as keyof typeof content];

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && phase !== 'complete') {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Move to next phase
            if (phase === 'inhale') {
              setPhase('hold');
              return 4;
            } else if (phase === 'hold') {
              setPhase('exhale');
              return 4;
            } else if (phase === 'exhale') {
              const newCycleCount = cycleCount + 1;
              setCycleCount(newCycleCount);
              if (newCycleCount >= totalCycles) {
                setPhase('complete');
                setIsActive(false);
                return 0;
              } else {
                setPhase('inhale');
                return 4;
              }
            }
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, phase, cycleCount, totalCycles]);

  const startExercise = () => {
    setIsActive(true);
    setPhase('inhale');
    setTimeLeft(4);
    setCycleCount(0);
  };

  const restartExercise = () => {
    setIsActive(false);
    setPhase('inhale');
    setTimeLeft(4);
    setCycleCount(0);
  };

  const backToHome = () => {
    window.location.hash = '';
  };

  const getCircleSize = () => {
    if (!isActive) return 'w-32 h-32';
    if (phase === 'inhale') return 'w-48 h-48';
    if (phase === 'hold') return 'w-48 h-48';
    if (phase === 'exhale') return 'w-32 h-32';
    return 'w-32 h-32';
  };

  const getCircleColor = () => {
    if (!isActive) return 'bg-blue-200';
    if (phase === 'inhale') return 'bg-blue-300';
    if (phase === 'hold') return 'bg-green-300';
    if (phase === 'exhale') return 'bg-purple-300';
    return 'bg-blue-200';
  };

  if (phase === 'complete') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-100">
          <div className="text-6xl mb-6">🎉</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{t.wellDone}</h1>
          <p className="text-gray-600 mb-6">{t.completed}</p>
          <div className="text-lg font-semibold text-green-600 mb-8">
            {cycleCount} {t.cycles}
          </div>
          <div className="space-y-4">
            <button
              onClick={restartExercise}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              {t.restart}
            </button>
            <button
              onClick={backToHome}
              className="w-full bg-gray-200 text-gray-800 py-3 px-6 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
            >
              {t.backToHome}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h1>
          <p className="text-gray-600 text-lg">{t.subtitle}</p>
        </div>

        {/* Breathing Circle */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-8">
            <div
              className={`rounded-full transition-all duration-1000 ease-in-out ${getCircleSize()} ${getCircleColor()} flex items-center justify-center shadow-lg`}
            >
              <div className="text-white text-xl font-semibold">
                {isActive ? timeLeft : '4'}
              </div>
            </div>
          </div>

          {/* Phase Indicator */}
          <div className="text-center mb-6">
            <div className="text-2xl font-bold text-gray-900 mb-2">
              {isActive ? t[phase] : t.inhale}
            </div>
            <div className="text-gray-600">
              {isActive ? `${timeLeft} seconds` : 'Ready to begin'}
            </div>
          </div>

          {/* Progress */}
          {isActive && (
            <div className="w-full max-w-md mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Progress</span>
                <span>{cycleCount}/{totalCycles} cycles</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(cycleCount / totalCycles) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Controls */}
          {!isActive ? (
            <button
              onClick={startExercise}
              className="bg-blue-600 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg"
            >
              {t.start}
            </button>
          ) : (
            <button
              onClick={() => setIsActive(false)}
              className="bg-red-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-red-700 transition-colors"
            >
              Pause
            </button>
          )}
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">How it works:</h3>
          <div className="space-y-3 text-gray-700">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-600 text-sm font-semibold">1</span>
              </div>
              <p><strong>Inhale:</strong> Breathe in slowly for 4 seconds as the circle expands</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-green-600 text-sm font-semibold">2</span>
              </div>
              <p><strong>Hold:</strong> Hold your breath for 4 seconds</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-purple-600 text-sm font-semibold">3</span>
              </div>
              <p><strong>Exhale:</strong> Breathe out slowly for 4 seconds as the circle contracts</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-orange-600 text-sm font-semibold">4</span>
              </div>
              <p>Repeat for 5 minutes (75 cycles) for maximum benefit</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreathingExercise;
