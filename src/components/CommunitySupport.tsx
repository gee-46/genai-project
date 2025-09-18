import React, { useState } from 'react';
import { Users, MessageSquare, Heart, Shield, ChevronRight, Plus } from 'lucide-react';

interface CommunitySupport {
  language: string;
}

interface Discussion {
  id: string;
  title: string;
  author: string;
  replies: number;
  likes: number;
  timeAgo: string;
  category: string;
  isAnonymous: boolean;
}

const CommunitySupport: React.FC<CommunitySupport> = ({ language }) => {
  const [activeCategory, setActiveCategory] = useState('all');

  const content = {
    en: {
      title: "Community Support",
      subtitle: "Connect with others in a safe, moderated space",
      categories: {
        all: "All Discussions",
        anxiety: "Anxiety Support",
        depression: "Depression Support",
        stress: "Stress Management",
        relationships: "Relationships",
        students: "Student Life"
      },
      newDiscussion: "Start New Discussion",
      anonymous: "Anonymous",
      replies: "replies",
      likes: "likes",
      ago: "ago",
      guidelines: "Community Guidelines",
      guidelineText: "This is a safe, supportive space. All posts are AI-moderated for safety.",
      moderatedBy: "AI-Moderated for Safety",
      joinDiscussion: "Join Discussion"
    },
    hi: {
      title: "सामुदायिक सहायता",
      subtitle: "एक सुरक्षित, नियंत्रित स्थान पर दूसरों से जुड़ें",
      categories: {
        all: "सभी चर्चाएं",
        anxiety: "चिंता सहायता",
        depression: "अवसाद सहायता",
        stress: "तनाव प्रबंधन",
        relationships: "रिश्ते",
        students: "छात्र जीवन"
      },
      newDiscussion: "नई चर्चा शुरू करें",
      anonymous: "गुमनाम",
      replies: "जवाब",
      likes: "पसंद",
      ago: "पहले",
      guidelines: "समुदायिक दिशानिर्देश",
      guidelineText: "यह एक सुरक्षित, सहायक स्थान है। सभी पोस्ट सुरक्षा के लिए AI-नियंत्रित हैं।",
      moderatedBy: "सुरक्षा के लिए AI-नियंत्रित",
      joinDiscussion: "चर्चा में शामिल हों"
    }
  };

  const t = content[language as keyof typeof content];

  const discussions: Discussion[] = [
    {
      id: '1',
      title: language === 'en' ? 'Managing exam stress as a college student' : 'कॉलेज छात्र के रूप में परीक्षा के तनाव का प्रबंधन',
      author: 'Student_2024',
      replies: 12,
      likes: 8,
      timeAgo: '2h',
      category: 'students',
      isAnonymous: true
    },
    {
      id: '2',
      title: language === 'en' ? 'Dealing with social anxiety in group situations' : 'समूहिक स्थितियों में सामाजिक चिंता से निपटना',
      author: 'Anonymous_Helper',
      replies: 24,
      likes: 15,
      timeAgo: '4h',
      category: 'anxiety',
      isAnonymous: true
    },
    {
      id: '3',
      title: language === 'en' ? 'Finding motivation during difficult times' : 'कठिन समय में प्रेरणा खोजना',
      author: 'Hopeful_Journey',
      replies: 18,
      likes: 22,
      timeAgo: '6h',
      category: 'depression',
      isAnonymous: true
    },
    {
      id: '4',
      title: language === 'en' ? 'Balancing work and mental health' : 'काम और मानसिक स्वास्थ्य में संतुलन',
      author: 'Working_Well',
      replies: 31,
      likes: 19,
      timeAgo: '8h',
      category: 'stress',
      isAnonymous: true
    }
  ];

  const filteredDiscussions = activeCategory === 'all' 
    ? discussions 
    : discussions.filter(d => d.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h1>
          <p className="text-gray-600 text-lg">{t.subtitle}</p>
          <div className="mt-4 flex items-center space-x-2 text-sm text-green-600 bg-green-50 px-3 py-2 rounded-lg w-fit">
            <Shield className="h-4 w-4" />
            <span>{t.moderatedBy}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
              <div className="space-y-2">
                {Object.entries(t.categories).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setActiveCategory(key)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      activeCategory === key
                        ? 'bg-blue-100 text-blue-700 font-medium border border-blue-200'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <button className="w-full mt-6 bg-gradient-to-r from-blue-500 to-teal-500 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-teal-600 transition-colors flex items-center justify-center space-x-2">
                <Plus className="h-4 w-4" />
                <span className="font-medium">{t.newDiscussion}</span>
              </button>

              {/* Guidelines */}
              <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-green-800 mb-2 flex items-center">
                  <Heart className="h-4 w-4 mr-2" />
                  {t.guidelines}
                </h3>
                <p className="text-sm text-green-700">{t.guidelineText}</p>
              </div>
            </div>
          </div>

          {/* Discussions Feed */}
          <div className="lg:col-span-3">
            <div className="space-y-4">
              {filteredDiscussions.map((discussion) => (
                <div
                  key={discussion.id}
                  className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow cursor-pointer group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="bg-gradient-to-br from-blue-500 to-teal-500 p-2 rounded-full">
                          <Users className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-gray-900">{discussion.author}</span>
                            {discussion.isAnonymous && (
                              <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full flex items-center">
                                <Shield className="h-3 w-3 mr-1" />
                                {t.anonymous}
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-gray-500">{discussion.timeAgo} {t.ago}</span>
                        </div>
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                        {discussion.title}
                      </h3>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <MessageSquare className="h-4 w-4" />
                            <span>{discussion.replies} {t.replies}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Heart className="h-4 w-4" />
                            <span>{discussion.likes} {t.likes}</span>
                          </div>
                        </div>

                        <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-medium group-hover:translate-x-1 transition-transform">
                          <span>{t.joinDiscussion}</span>
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="mt-8 text-center">
              <button className="bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-6 rounded-lg border border-gray-300 transition-colors">
                {language === 'en' ? 'Load More Discussions' : 'और चर्चाएं लोड करें'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunitySupport;