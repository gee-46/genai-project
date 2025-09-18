import React, { useState } from 'react';
import { MessageCircle, Users, BookOpen, Heart, TrendingUp, Calendar, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getRandomQuote } from '../lib/quotes';

interface DashboardProps {
  language: string;
}

const Dashboard: React.FC<DashboardProps> = ({ language }) => {
  const [userMood, setUserMood] = useState('calm');
  const content = {
    en: {
      welcome: "Welcome back to MannMitra",
      subtitle: "Your safe space for mental wellness",
      todaysMood: "Today's Mood Check",
      quickActions: "Quick Actions",
      chatWithAI: "Chat with AI",
      joinCommunity: "Join Community",
      exploreResources: "Explore Resources",
      crisisSupport: "Crisis Support",
      recentActivity: "Recent Activity",
      moodTrend: "Mood Trend",
      improving: "Improving",
      copingStrategies: "Personalized Coping Strategies",
      mindfulness: "Mindfulness Exercise",
      journaling: "Guided Journaling",
      breathing: "Breathing Exercise",
      confidential: "100% Confidential & Anonymous",
      dailyPositiveQuote: "Daily Positive Quote"
    },
    hi: {
      welcome: "MannMitra में वापस स्वागत है",
      subtitle: "मानसिक स्वास्थ्य के लिए आपका सुरक्षित स्थान",
      todaysMood: "आज की मूड जांच",
      quickActions: "त्वरित कार्य",
      chatWithAI: "AI से बात करें",
      joinCommunity: "समुदाय में शामिल हों",
      exploreResources: "संसाधन देखें",
      crisisSupport: "संकट सहायता",
      recentActivity: "हाल की गतिविधि",
      moodTrend: "मूड की प्रवृत्ति",
      improving: "सुधार हो रहा है",
      copingStrategies: "व्यक्तिगत मुकाबला रणनीतियाँ",
      mindfulness: "माइंडफुलनेस अभ्यास",
      journaling: "निर्देशित जर्नलिंग",
      breathing: "श्वास अभ्यास",
      confidential: "100% गोपनीय और अनाम",
      dailyPositiveQuote: "दैनिक सकारात्मक उद्धरण"
    }
  };

  const t = content[language as keyof typeof content];

  const moodOptions = [
    { emoji: '😊', label: language === 'en' ? 'Happy' : 'खुश', color: 'bg-green-100 hover:bg-green-200 border-green-200', mood: 'happy' },
    { emoji: '🙂', label: language === 'en' ? 'Good' : 'अच्छा', color: 'bg-blue-100 hover:bg-blue-200 border-blue-200', mood: 'good' },
    { emoji: '😐', label: language === 'en' ? 'Okay' : 'ठीक', color: 'bg-yellow-100 hover:bg-yellow-200 border-yellow-200', mood: 'okay' },
    { emoji: '😔', label: language === 'en' ? 'Sad' : 'उदास', color: 'bg-orange-100 hover:bg-orange-200 border-orange-200', mood: 'sad' },
    { emoji: '😢', label: language === 'en' ? 'Anxious' : 'चिंतित', color: 'bg-red-100 hover:bg-red-200 border-red-200', mood: 'anxious' },
    { emoji: '😌', label: language === 'en' ? 'Calm' : 'शांत', color: 'bg-cyan-100 hover:bg-cyan-200 border-cyan-200', mood: 'calm' },
    { emoji: '⚡', label: language === 'en' ? 'Energetic' : 'ऊर्जावान', color: 'bg-purple-100 hover:bg-purple-200 border-purple-200', mood: 'energetic' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.welcome}</h1>
          <p className="text-gray-600 text-lg">{t.subtitle}</p>
          <div className="mt-4 flex items-center space-x-2 text-sm text-gray-500">
            <Shield className="h-4 w-4" />
            <span>{t.confidential}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Mood Check */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Heart className="h-5 w-5 mr-2 text-pink-500" />
                {t.todaysMood}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                {moodOptions.map((mood, index) => (
                  <button
                    key={index}
                    onClick={() => setUserMood(mood.mood)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 text-center hover:scale-105 ${mood.color}`}
                  >
                    <div className="text-2xl mb-2">{mood.emoji}</div>
                    <div className="text-xs font-medium text-gray-700">{mood.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">{t.quickActions}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <button className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-200 hover:scale-105">
                  <MessageCircle className="h-8 w-8 mx-auto mb-3" />
                  <div className="text-sm font-medium">{t.chatWithAI}</div>
                </button>
                <a href="#community" className="p-6 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl text-white hover:from-teal-600 hover:to-teal-700 transition-all duration-200 hover:scale-105 block text-center">
                  <Users className="h-8 w-8 mx-auto mb-3" />
                  <div className="text-sm font-medium">{t.joinCommunity}</div>
                </a>
                <a href="#mood" className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl text-white hover:from-purple-600 hover:to-purple-700 transition-all duration-200 hover:scale-105 block text-center">
                  <Calendar className="h-8 w-8 mx-auto mb-3" />
                  <div className="text-sm font-medium">Mood Tracker</div>
                </a>
                <a href="#journey" className="p-6 bg-gradient-to-br from-green-500 to-green-600 rounded-xl text-white hover:from-green-600 hover:to-green-700 transition-all duration-200 hover:scale-105 block text-center">
                  <TrendingUp className="h-8 w-8 mx-auto mb-3" />
                  <div className="text-sm font-medium">Wellness Journey</div>
                </a>
                <a href="#recommendations" className="p-6 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl text-white hover:from-orange-600 hover:to-orange-700 transition-all duration-200 hover:scale-105 block text-center">
                  <BookOpen className="h-8 w-8 mx-auto mb-3" />
                  <div className="text-sm font-medium">Recommendations</div>
                </a>
                <a href="#vr" className="p-6 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl text-white hover:from-indigo-600 hover:to-indigo-700 transition-all duration-200 hover:scale-105 block text-center">
                  <div className="text-2xl mb-3">🥽</div>
                  <div className="text-sm font-medium">VR Mindfulness</div>
                </a>
                <a href="#journaling" className="p-6 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl text-white hover:from-pink-600 hover:to-pink-700 transition-all duration-200 hover:scale-105 block text-center">
                  <div className="text-2xl mb-3">📝</div>
                  <div className="text-sm font-medium">Group Journaling</div>
                </a>
                <a href="#breathing" className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl text-white hover:from-purple-600 hover:to-purple-700 transition-all duration-200 hover:scale-105 block text-center">
                  <div className="text-2xl mb-3">🫁</div>
                  <div className="text-sm font-medium">Breathing Exercise</div>
                </a>
                <a href="#crisis" className="p-6 bg-gradient-to-br from-red-500 to-red-600 rounded-xl text-white hover:from-red-600 hover:to-red-700 transition-all duration-200 hover:scale-105 block text-center">
                  <Shield className="h-8 w-8 mx-auto mb-3" />
                  <div className="text-sm font-medium">{t.crisisSupport}</div>
                </a>
              </div>
            </div>

            {/* Personalized Coping Strategies */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">{t.copingStrategies}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link to="/mindfulness" className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200 hover:shadow-md transition-shadow block">
                  <div className="text-2xl mb-2">🧘</div>
                  <h3 className="font-semibold text-green-800 mb-2">{t.mindfulness}</h3>
                  <p className="text-sm text-green-700">5 min guided session</p>
                </Link>
                <Link to="/journal" className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 hover:shadow-md transition-shadow block">
                  <div className="text-2xl mb-2">📝</div>
                  <h3 className="font-semibold text-blue-800 mb-2">{t.journaling}</h3>
                  <p className="text-sm text-blue-700">Express your thoughts</p>
                </Link>
                <a href="#breathing" className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200 hover:shadow-md transition-shadow block">
                  <div className="text-2xl mb-2">🫁</div>
                  <h3 className="font-semibold text-purple-800 mb-2">{t.breathing}</h3>
                  <p className="text-sm text-purple-700">Calm your mind</p>
                </a>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Daily Streak */}
            {/* Removed Daily Streak card */}

            {/* Daily Positive Quote */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-pink-500" />
                🌸 {t.dailyPositiveQuote}
              </h3>
              <div className="text-center text-gray-700 italic text-sm">
                "{getRandomQuote()}"
              </div>
            </div>

            {/* Mood Trend */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
                {t.moodTrend}
              </h3>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-2">📈</div>
                <div className="text-green-600 font-medium">{t.improving}</div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.recentActivity}</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="text-sm text-gray-700">Completed mood check</div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="text-sm text-gray-700">Mindfulness session</div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div className="text-sm text-gray-700">AI conversation</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;