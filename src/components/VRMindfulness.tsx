import React, { useState } from 'react';
import { Play, Pause, RotateCcw, Settings, Headphones, Eye, Wind, Mountain } from 'lucide-react';

interface VRMindfulnessProps {
  language: string;
}

interface VRSession {
  id: string;
  title: string;
  description: string;
  duration: string;
  environment: string;
  type: 'breathing' | 'meditation' | 'nature' | 'guided';
  thumbnail: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const VRMindfulness: React.FC<VRMindfulnessProps> = ({ language }) => {
  const [selectedSession, setSelectedSession] = useState<VRSession | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showSettings, setShowSettings] = useState(false);

  const content = {
    en: {
      title: "VR/AR Mindfulness Sessions",
      subtitle: "Immersive experiences for deep relaxation and focus",
      selectSession: "Choose Your Experience",
      currentSession: "Current Session",
      play: "Play",
      pause: "Pause",
      restart: "Restart",
      settings: "Settings",
      duration: "Duration",
      difficulty: "Difficulty",
      environment: "Environment",
      instructions: "Instructions",
      breathingGuide: "Follow the visual breathing guide",
      immersiveMode: "Immersive Mode",
      audioSettings: "Audio Settings",
      visualSettings: "Visual Settings",
      sessionTypes: {
        breathing: "Breathing Exercise",
        meditation: "Guided Meditation",
        nature: "Nature Immersion",
        guided: "Guided Journey"
      },
      difficulties: {
        beginner: "Beginner",
        intermediate: "Intermediate", 
        advanced: "Advanced"
      },
      startSession: "Start Session",
      sessionComplete: "Session Complete!"
    },
    hi: {
      title: "VR/AR माइंडफुलनेस सत्र",
      subtitle: "गहरी विश्राम और फोकस के लिए इमर्सिव अनुभव",
      selectSession: "अपना अनुभव चुनें",
      currentSession: "वर्तमान सत्र",
      play: "चलाएं",
      pause: "रोकें",
      restart: "पुनः आरंभ",
      settings: "सेटिंग्स",
      duration: "अवधि",
      difficulty: "कठिनाई",
      environment: "वातावरण",
      instructions: "निर्देश",
      breathingGuide: "दृश्य सांस गाइड का पालन करें",
      immersiveMode: "इमर्सिव मोड",
      audioSettings: "ऑडियो सेटिंग्स",
      visualSettings: "विज़ुअल सेटिंग्स",
      sessionTypes: {
        breathing: "सांस की एक्सरसाइज",
        meditation: "निर्देशित ध्यान",
        nature: "प्रकृति विसर्जन",
        guided: "निर्देशित यात्रा"
      },
      difficulties: {
        beginner: "शुरुआती",
        intermediate: "मध्यम",
        advanced: "उन्नत"
      },
      startSession: "सत्र शुरू करें",
      sessionComplete: "सत्र पूर्ण!"
    }
  };

  const t = content[language as keyof typeof content];

  const vrSessions: VRSession[] = [
    {
      id: '1',
      title: language === 'en' ? 'Ocean Breathing' : 'समुद्री सांस',
      description: language === 'en' ? 'Breathe with the rhythm of ocean waves' : 'समुद्री लहरों की लय के साथ सांस लें',
      duration: '10 min',
      environment: 'Ocean Beach',
      type: 'breathing',
      thumbnail: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=400',
      difficulty: 'beginner'
    },
    {
      id: '2',
      title: language === 'en' ? 'Forest Meditation' : 'वन ध्यान',
      description: language === 'en' ? 'Deep meditation in a peaceful forest' : 'शांत जंगल में गहरा ध्यान',
      duration: '20 min',
      environment: 'Forest Clearing',
      type: 'meditation',
      thumbnail: 'https://images.pexels.com/photos/1496373/pexels-photo-1496373.jpeg?auto=compress&cs=tinysrgb&w=400',
      difficulty: 'intermediate'
    },
    {
      id: '3',
      title: language === 'en' ? 'Mountain Peak Serenity' : 'पर्वत शिखर शांति',
      description: language === 'en' ? 'Find peace at the top of the world' : 'दुनिया के शीर्ष पर शांति पाएं',
      duration: '15 min',
      environment: 'Mountain Summit',
      type: 'nature',
      thumbnail: 'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=400',
      difficulty: 'beginner'
    },
    {
      id: '4',
      title: language === 'en' ? 'Cosmic Journey' : 'ब्रह्मांडीय यात्रा',
      description: language === 'en' ? 'Guided meditation through the cosmos' : 'ब्रह्मांड के माध्यम से निर्देशित ध्यान',
      duration: '25 min',
      environment: 'Space',
      type: 'guided',
      thumbnail: 'https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg?auto=compress&cs=tinysrgb&w=400',
      difficulty: 'advanced'
    }
  ];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-100';
      case 'intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'breathing': return <Wind className="h-4 w-4" />;
      case 'meditation': return <Eye className="h-4 w-4" />;
      case 'nature': return <Mountain className="h-4 w-4" />;
      case 'guided': return <Headphones className="h-4 w-4" />;
      default: return <Play className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h1>
          <p className="text-gray-600 text-lg">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Session Selection */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">{t.selectSession}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {vrSessions.map((session) => (
                  <div
                    key={session.id}
                    onClick={() => setSelectedSession(session)}
                    className={`cursor-pointer rounded-xl border-2 transition-all hover:shadow-lg ${
                      selectedSession?.id === session.id
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-indigo-300'
                    }`}
                  >
                    <div className="relative">
                      <img
                        src={session.thumbnail}
                        alt={session.title}
                        className="w-full h-32 object-cover rounded-t-xl"
                      />
                      <div className="absolute top-2 right-2 flex space-x-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(session.difficulty)}`}>
                          {t.difficulties[session.difficulty as keyof typeof t.difficulties]}
                        </span>
                      </div>
                      <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                        {session.duration}
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        {getTypeIcon(session.type)}
                        <h3 className="font-semibold text-gray-900">{session.title}</h3>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{session.description}</p>
                      <p className="text-gray-500 text-xs">{session.environment}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* VR Player Interface */}
            {selectedSession && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="relative h-64 bg-gradient-to-br from-indigo-600 to-purple-600">
                  <img
                    src={selectedSession.thumbnail}
                    alt={selectedSession.title}
                    className="w-full h-full object-cover opacity-50"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <h3 className="text-2xl font-bold mb-2">{selectedSession.title}</h3>
                      <p className="text-indigo-100 mb-4">{selectedSession.description}</p>
                      
                      {/* VR Breathing Guide Visualization */}
                      {selectedSession.type === 'breathing' && (
                        <div className="flex items-center justify-center mb-4">
                          <div className={`w-20 h-20 rounded-full border-4 border-white transition-all duration-4000 ${
                            isPlaying ? 'scale-125 opacity-70' : 'scale-100 opacity-100'
                          }`}>
                            <div className="w-full h-full rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                              <Wind className="h-8 w-8 text-white" />
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div className="text-sm text-indigo-100">
                        {t.breathingGuide}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Player Controls */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="bg-indigo-500 hover:bg-indigo-600 text-white p-3 rounded-full transition-colors"
                      >
                        {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                      </button>
                      
                      <button
                        onClick={() => setCurrentTime(0)}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-3 rounded-full transition-colors"
                      >
                        <RotateCcw className="h-5 w-5" />
                      </button>
                      
                      <button
                        onClick={() => setShowSettings(!showSettings)}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-3 rounded-full transition-colors"
                      >
                        <Settings className="h-5 w-5" />
                      </button>
                    </div>
                    
                    <div className="text-sm text-gray-600">
                      {formatTime(currentTime)} / {selectedSession.duration}
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div 
                      className="bg-indigo-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${(currentTime / 600) * 100}%` }}
                    ></div>
                  </div>
                  
                  {/* Session Info */}
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-sm text-gray-500">{t.duration}</div>
                      <div className="font-semibold text-gray-900">{selectedSession.duration}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">{t.difficulty}</div>
                      <div className="font-semibold text-gray-900">
                        {t.difficulties[selectedSession.difficulty as keyof typeof t.difficulties]}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">{t.environment}</div>
                      <div className="font-semibold text-gray-900">{selectedSession.environment}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Settings & Instructions Sidebar */}
          <div className="space-y-6">
            {/* Instructions */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Eye className="h-5 w-5 mr-2 text-indigo-500" />
                {t.instructions}
              </h3>
              
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Find a comfortable, quiet space</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Use headphones for best experience</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Follow the visual and audio guides</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Don't worry if your mind wanders</p>
                </div>
              </div>
            </div>

            {/* Settings Panel */}
            {showSettings && (
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Settings className="h-5 w-5 mr-2 text-gray-500" />
                  {t.settings}
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.audioSettings}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.visualSettings}
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                        <span className="ml-2 text-sm text-gray-600">{t.immersiveMode}</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" defaultChecked />
                        <span className="ml-2 text-sm text-gray-600">Visual Breathing Guide</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Start */}
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">Quick Start</h3>
              <p className="text-indigo-100 text-sm mb-4">
                New to VR mindfulness? Start with our beginner-friendly ocean breathing session.
              </p>
              <button className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white py-3 px-4 rounded-lg transition-colors font-medium">
                {t.startSession}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VRMindfulness;