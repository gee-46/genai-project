import React, { useState } from 'react';
import { Trophy, Star, Calendar, Target, Award, CheckCircle, Lock } from 'lucide-react';

interface WellnessJourneyProps {
  language: string;
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  progress: number;
  maxProgress: number;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'milestone';
  progress: number;
  maxProgress: number;
  reward: string;
  completed: boolean;
}

const WellnessJourney: React.FC<WellnessJourneyProps> = ({ language }) => {
  const [activeTab, setActiveTab] = useState('journey');

  const content = {
    en: {
      title: "Wellness Journey",
      subtitle: "Your path to better mental health",
      currentLevel: "Current Level",
      nextLevel: "Next Level",
      badges: "Badges",
      challenges: "Challenges",
      achievements: "Achievements",
      progress: "Progress",
      earnedBadges: "Earned Badges",
      lockedBadges: "Locked Badges",
      dailyChallenges: "Daily Challenges",
      weeklyChallenges: "Weekly Challenges",
      milestones: "Milestones",
      complete: "Complete",
      inProgress: "In Progress",
      locked: "Locked",
      wellnessStreak: "Wellness Streak",
      days: "days"
    },
    hi: {
      title: "कल्याण यात्रा",
      subtitle: "बेहतर मानसिक स्वास्थ्य का आपका रास्ता",
      currentLevel: "वर्तमान स्तर",
      nextLevel: "अगला स्तर",
      badges: "बैज",
      challenges: "चुनौतियां",
      achievements: "उपलब्धियां",
      progress: "प्रगति",
      earnedBadges: "अर्जित बैज",
      lockedBadges: "लॉक किए गए बैज",
      dailyChallenges: "दैनिक चुनौतियां",
      weeklyChallenges: "साप्ताहिक चुनौतियां",
      milestones: "मील के पत्थर",
      complete: "पूर्ण",
      inProgress: "प्रगति में",
      locked: "लॉक",
      wellnessStreak: "कल्याण स्ट्रीक",
      days: "दिन"
    }
  };

  const t = content[language as keyof typeof content];

  const badges: Badge[] = [
    {
      id: '1',
      name: language === 'en' ? 'First Steps' : 'पहले कदम',
      description: language === 'en' ? 'Completed your first mood check' : 'अपनी पहली मूड जांच पूरी की',
      icon: '🌱',
      earned: true,
      progress: 1,
      maxProgress: 1
    },
    {
      id: '2',
      name: language === 'en' ? 'Mindful Week' : 'सचेत सप्ताह',
      description: language === 'en' ? '7 days of mindfulness practice' : '7 दिन का माइंडफुलनेस अभ्यास',
      icon: '🧘',
      earned: true,
      progress: 7,
      maxProgress: 7
    },
    {
      id: '3',
      name: language === 'en' ? 'Community Helper' : 'समुदायिक सहायक',
      description: language === 'en' ? 'Helped 5 community members' : '5 समुदायिक सदस्यों की मदद की',
      icon: '🤝',
      earned: false,
      progress: 3,
      maxProgress: 5
    },
    {
      id: '4',
      name: language === 'en' ? 'Wellness Warrior' : 'कल्याण योद्धा',
      description: language === 'en' ? '30-day wellness streak' : '30-दिन की कल्याण स्ट्रीक',
      icon: '⚡',
      earned: false,
      progress: 12,
      maxProgress: 30
    }
  ];

  const challenges: Challenge[] = [
    {
      id: '1',
      title: language === 'en' ? 'Morning Gratitude' : 'सुबह की कृतज्ञता',
      description: language === 'en' ? 'Write 3 things you\'re grateful for' : '3 चीजें लिखें जिनके लिए आप आभारी हैं',
      type: 'daily',
      progress: 1,
      maxProgress: 1,
      reward: '10 XP',
      completed: true
    },
    {
      id: '2',
      title: language === 'en' ? 'Breathing Exercise' : 'सांस की एक्सरसाइज',
      description: language === 'en' ? 'Complete a 5-minute breathing session' : '5-मिनट का सांस सत्र पूरा करें',
      type: 'daily',
      progress: 0,
      maxProgress: 1,
      reward: '15 XP',
      completed: false
    },
    {
      id: '3',
      title: language === 'en' ? 'Community Connection' : 'समुदायिक संपर्क',
      description: language === 'en' ? 'Engage with 3 community posts this week' : 'इस सप्ताह 3 समुदायिक पोस्ट के साथ जुड़ें',
      type: 'weekly',
      progress: 1,
      maxProgress: 3,
      reward: '50 XP',
      completed: false
    }
  ];

  const currentLevel = 5;
  const currentXP = 1250;
  const nextLevelXP = 1500;
  const wellnessStreak = 12;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h1>
          <p className="text-gray-600 text-lg">{t.subtitle}</p>
        </div>

        {/* Level Progress */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-full">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{t.currentLevel}: {currentLevel}</h2>
                <p className="text-gray-600">{currentXP} / {nextLevelXP} XP</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-purple-600 mb-1">{wellnessStreak}</div>
              <div className="text-sm text-gray-600">{t.wellnessStreak} {t.days}</div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(currentXP / nextLevelXP) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-gray-100 rounded-xl p-1 mb-8">
          <button
            onClick={() => setActiveTab('journey')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
              activeTab === 'journey'
                ? 'bg-white text-purple-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {t.challenges}
          </button>
          <button
            onClick={() => setActiveTab('badges')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
              activeTab === 'badges'
                ? 'bg-white text-purple-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {t.badges}
          </button>
        </div>

        {activeTab === 'journey' && (
          <div className="space-y-6">
            {/* Daily Challenges */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-blue-500" />
                {t.dailyChallenges}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {challenges.filter(c => c.type === 'daily').map((challenge) => (
                  <div
                    key={challenge.id}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      challenge.completed
                        ? 'bg-green-50 border-green-200'
                        : 'bg-gray-50 border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-semibold text-gray-900">{challenge.title}</h4>
                      {challenge.completed ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <div className="bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded-full">
                          {challenge.reward}
                        </div>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{challenge.description}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          challenge.completed ? 'bg-green-500' : 'bg-purple-500'
                        }`}
                        style={{ width: `${(challenge.progress / challenge.maxProgress) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Challenges */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Target className="h-5 w-5 mr-2 text-orange-500" />
                {t.weeklyChallenges}
              </h3>
              <div className="space-y-4">
                {challenges.filter(c => c.type === 'weekly').map((challenge) => (
                  <div
                    key={challenge.id}
                    className="p-4 rounded-xl border-2 bg-gray-50 border-gray-200 hover:border-orange-300 transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-semibold text-gray-900">{challenge.title}</h4>
                      <div className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full">
                        {challenge.reward}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{challenge.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                        <div 
                          className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(challenge.progress / challenge.maxProgress) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">
                        {challenge.progress}/{challenge.maxProgress}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'badges' && (
          <div className="space-y-6">
            {/* Earned Badges */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Award className="h-5 w-5 mr-2 text-yellow-500" />
                {t.earnedBadges}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {badges.filter(b => b.earned).map((badge) => (
                  <div
                    key={badge.id}
                    className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border border-yellow-200 text-center hover:shadow-md transition-shadow"
                  >
                    <div className="text-3xl mb-2">{badge.icon}</div>
                    <h4 className="font-semibold text-gray-900 mb-1">{badge.name}</h4>
                    <p className="text-xs text-gray-600">{badge.description}</p>
                    <div className="mt-2">
                      <Star className="h-4 w-4 text-yellow-500 mx-auto" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress Badges */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Lock className="h-5 w-5 mr-2 text-gray-500" />
                {t.inProgress}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {badges.filter(b => !b.earned).map((badge) => (
                  <div
                    key={badge.id}
                    className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-center hover:shadow-md transition-shadow"
                  >
                    <div className="text-3xl mb-2 opacity-50">{badge.icon}</div>
                    <h4 className="font-semibold text-gray-900 mb-1">{badge.name}</h4>
                    <p className="text-xs text-gray-600 mb-3">{badge.description}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(badge.progress / badge.maxProgress) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {badge.progress}/{badge.maxProgress}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WellnessJourney;