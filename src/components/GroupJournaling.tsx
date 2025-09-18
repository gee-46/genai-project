import React, { useState } from 'react';
import { Users, Edit3, Send, Heart, MessageCircle, Shield, Plus, Filter } from 'lucide-react';

interface GroupJournalingProps {
  language: string;
}

interface JournalEntry {
  id: string;
  author: string;
  title: string;
  content: string;
  timestamp: Date;
  likes: number;
  comments: number;
  isAnonymous: boolean;
  mood: string;
  tags: string[];
}

interface JournalPrompt {
  id: string;
  title: string;
  description: string;
  category: string;
  participants: number;
}

const GroupJournaling: React.FC<GroupJournalingProps> = ({ language }) => {
  const [activeTab, setActiveTab] = useState('prompts');
  const [selectedPrompt, setSelectedPrompt] = useState<JournalPrompt | null>(null);
  const [newEntry, setNewEntry] = useState({ title: '', content: '', isAnonymous: true });
  const [filterMood, setFilterMood] = useState('all');

  const content = {
    en: {
      title: "Anonymous Group Journaling",
      subtitle: "Share your thoughts in a safe, AI-moderated space",
      prompts: "Writing Prompts",
      entries: "Community Entries",
      myEntries: "My Entries",
      writeEntry: "Write Entry",
      currentPrompt: "Current Prompt",
      participants: "participants",
      anonymous: "Anonymous",
      public: "Public",
      postAnonymously: "Post Anonymously",
      shareEntry: "Share Entry",
      likes: "likes",
      comments: "comments",
      filterByMood: "Filter by Mood",
      allMoods: "All Moods",
      grateful: "Grateful",
      reflective: "Reflective",
      hopeful: "Hopeful",
      challenging: "Challenging",
      titlePlaceholder: "Give your entry a title...",
      contentPlaceholder: "Share your thoughts, feelings, or experiences...",
      aiModerated: "AI-Moderated for Safety",
      joinPrompt: "Join This Prompt",
      newPrompt: "Suggest New Prompt"
    },
    hi: {
      title: "गुमनाम समूह जर्नलिंग",
      subtitle: "एक सुरक्षित, AI-नियंत्रित स्थान में अपने विचार साझा करें",
      prompts: "लेखन संकेत",
      entries: "समुदायिक प्रविष्टियां",
      myEntries: "मेरी प्रविष्टियां",
      writeEntry: "प्रविष्टि लिखें",
      currentPrompt: "वर्तमान संकेत",
      participants: "प्रतिभागी",
      anonymous: "गुमनाम",
      public: "सार्वजनिक",
      postAnonymously: "गुमनाम रूप से पोस्ट करें",
      shareEntry: "प्रविष्टि साझा करें",
      likes: "पसंद",
      comments: "टिप्पणियां",
      filterByMood: "मूड के अनुसार फ़िल्टर करें",
      allMoods: "सभी मूड",
      grateful: "आभारी",
      reflective: "चिंतनशील",
      hopeful: "आशावान",
      challenging: "चुनौतीपूर्ण",
      titlePlaceholder: "अपनी प्रविष्टि को एक शीर्षक दें...",
      contentPlaceholder: "अपने विचार, भावनाएं या अनुभव साझा करें...",
      aiModerated: "सुरक्षा के लिए AI-नियंत्रित",
      joinPrompt: "इस संकेत में शामिल हों",
      newPrompt: "नया संकेत सुझाएं"
    }
  };

  const t = content[language as keyof typeof content];

  const journalPrompts: JournalPrompt[] = [
    {
      id: '1',
      title: language === 'en' ? 'Three Things I\'m Grateful For Today' : 'आज मैं जिन तीन चीजों के लिए आभारी हूं',
      description: language === 'en' ? 'Reflect on the positive moments and people in your day' : 'अपने दिन के सकारात्मक क्षणों और लोगों पर विचार करें',
      category: 'gratitude',
      participants: 127
    },
    {
      id: '2',
      title: language === 'en' ? 'A Challenge I Overcame This Week' : 'इस सप्ताह मैंने जो चुनौती पार की',
      description: language === 'en' ? 'Share a difficulty you faced and how you handled it' : 'एक कठिनाई साझा करें जिसका आपने सामना किया और आपने इसे कैसे संभाला',
      category: 'growth',
      participants: 89
    },
    {
      id: '3',
      title: language === 'en' ? 'My Safe Space' : 'मेरा सुरक्षित स्थान',
      description: language === 'en' ? 'Describe a place (real or imagined) where you feel completely at peace' : 'एक स्थान (वास्तविक या कल्पित) का वर्णन करें जहां आप पूरी तरह से शांति महसूस करते हैं',
      category: 'reflection',
      participants: 156
    },
    {
      id: '4',
      title: language === 'en' ? 'Letter to My Future Self' : 'मेरे भविष्य के स्वयं को पत्र',
      description: language === 'en' ? 'Write a message of hope and encouragement to yourself one year from now' : 'अब से एक साल बाद अपने लिए आशा और प्रोत्साहन का संदेश लिखें',
      category: 'hope',
      participants: 203
    }
  ];

  const journalEntries: JournalEntry[] = [
    {
      id: '1',
      author: 'Anonymous_Writer',
      title: language === 'en' ? 'Finding Light in Dark Moments' : 'अंधेरे क्षणों में प्रकाश खोजना',
      content: language === 'en' 
        ? 'Today was particularly difficult, but I realized that even in my lowest moments, there are small things that bring me comfort. The sound of rain, a warm cup of tea, and knowing that others here understand what I\'m going through.'
        : 'आज विशेष रूप से कठिन था, लेकिन मुझे एहसास हुआ कि अपने सबसे कम क्षणों में भी, छोटी चीजें हैं जो मुझे आराम देती हैं। बारिश की आवाज, चाय का गर्म कप, और यह जानना कि यहां अन्य लोग समझते हैं कि मैं क्या झेल रहा हूं।',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      likes: 24,
      comments: 8,
      isAnonymous: true,
      mood: 'reflective',
      tags: ['hope', 'comfort', 'community']
    },
    {
      id: '2',
      author: 'Hopeful_Journey',
      title: language === 'en' ? 'Small Victories Matter' : 'छोटी जीत मायने रखती है',
      content: language === 'en'
        ? 'I managed to get out of bed before noon today, and that felt like climbing a mountain. Sometimes the smallest steps forward are the most meaningful ones.'
        : 'मैं आज दोपहर से पहले बिस्तर से उठने में कामयाब रहा, और यह एक पहाड़ चढ़ने जैसा लगा। कभी-कभी आगे के सबसे छोटे कदम सबसे अर्थपूर्ण होते हैं।',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      likes: 31,
      comments: 12,
      isAnonymous: true,
      mood: 'hopeful',
      tags: ['progress', 'self-care', 'victory']
    },
    {
      id: '3',
      author: 'Grateful_Heart',
      title: language === 'en' ? 'Unexpected Kindness' : 'अप्रत्याशित दयालुता',
      content: language === 'en'
        ? 'A stranger smiled at me on the bus today, and it completely changed my mood. It reminded me that kindness exists everywhere, even in the smallest gestures.'
        : 'आज बस में एक अजनबी ने मुझ पर मुस्कराया, और इसने मेरा मूड पूरी तरह से बदल दिया। इसने मुझे याद दिलाया कि दयालुता हर जगह मौजूद है, यहां तक कि सबसे छोटे इशारों में भी।',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      likes: 18,
      comments: 5,
      isAnonymous: true,
      mood: 'grateful',
      tags: ['kindness', 'connection', 'gratitude']
    }
  ];

  const getMoodColor = (mood: string) => {
    const colors = {
      grateful: 'bg-green-100 text-green-800',
      reflective: 'bg-blue-100 text-blue-800',
      hopeful: 'bg-yellow-100 text-yellow-800',
      challenging: 'bg-red-100 text-red-800'
    };
    return colors[mood as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const filteredEntries = filterMood === 'all' 
    ? journalEntries 
    : journalEntries.filter(entry => entry.mood === filterMood);

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return language === 'en' ? 'Just now' : 'अभी';
    if (diffInHours === 1) return language === 'en' ? '1 hour ago' : '1 घंटे पहले';
    return language === 'en' ? `${diffInHours} hours ago` : `${diffInHours} घंटे पहले`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h1>
          <p className="text-gray-600 text-lg">{t.subtitle}</p>
          <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-green-600 bg-green-50 px-3 py-2 rounded-lg w-fit mx-auto">
            <Shield className="h-4 w-4" />
            <span>{t.aiModerated}</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-gray-100 rounded-xl p-1 mb-8">
          <button
            onClick={() => setActiveTab('prompts')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
              activeTab === 'prompts'
                ? 'bg-white text-green-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {t.prompts}
          </button>
          <button
            onClick={() => setActiveTab('entries')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
              activeTab === 'entries'
                ? 'bg-white text-green-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {t.entries}
          </button>
          <button
            onClick={() => setActiveTab('write')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
              activeTab === 'write'
                ? 'bg-white text-green-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {t.writeEntry}
          </button>
        </div>

        {/* Writing Prompts Tab */}
        {activeTab === 'prompts' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {journalPrompts.map((prompt) => (
              <div
                key={prompt.id}
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{prompt.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{prompt.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Users className="h-4 w-4" />
                    <span>{prompt.participants} {t.participants}</span>
                  </div>
                  
                  <button
                    onClick={() => {
                      setSelectedPrompt(prompt);
                      setActiveTab('write');
                    }}
                    className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-blue-600 transition-colors font-medium"
                  >
                    {t.joinPrompt}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Community Entries Tab */}
        {activeTab === 'entries' && (
          <div>
            {/* Filter Bar */}
            <div className="bg-white rounded-2xl shadow-lg p-4 border border-gray-100 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Filter className="h-5 w-5 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">{t.filterByMood}</span>
                  <select
                    value={filterMood}
                    onChange={(e) => setFilterMood(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="all">{t.allMoods}</option>
                    <option value="grateful">{t.grateful}</option>
                    <option value="reflective">{t.reflective}</option>
                    <option value="hopeful">{t.hopeful}</option>
                    <option value="challenging">{t.challenging}</option>
                  </select>
                </div>
                
                <button className="bg-green-100 hover:bg-green-200 text-green-700 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>{t.newPrompt}</span>
                </button>
              </div>
            </div>

            {/* Entries List */}
            <div className="space-y-6">
              {filteredEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-gradient-to-br from-green-500 to-blue-500 p-2 rounded-full">
                        <Edit3 className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900">{entry.author}</span>
                          {entry.isAnonymous && (
                            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full flex items-center">
                              <Shield className="h-3 w-3 mr-1" />
                              {t.anonymous}
                            </span>
                          )}
                          <span className={`text-xs px-2 py-1 rounded-full ${getMoodColor(entry.mood)}`}>
                            {t[entry.mood as keyof typeof t] || entry.mood}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">{formatTimeAgo(entry.timestamp)}</span>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{entry.title}</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">{entry.content}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors">
                        <Heart className="h-4 w-4" />
                        <span className="text-sm">{entry.likes} {t.likes}</span>
                      </button>
                      <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors">
                        <MessageCircle className="h-4 w-4" />
                        <span className="text-sm">{entry.comments} {t.comments}</span>
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {entry.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Write Entry Tab */}
        {activeTab === 'write' && (
          <div className="max-w-4xl mx-auto">
            {selectedPrompt && (
              <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl shadow-lg p-6 text-white mb-6">
                <h3 className="text-xl font-semibold mb-2">{t.currentPrompt}</h3>
                <h4 className="text-lg font-medium mb-2">{selectedPrompt.title}</h4>
                <p className="text-green-100">{selectedPrompt.description}</p>
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="mb-6">
                <input
                  type="text"
                  value={newEntry.title}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, title: e.target.value }))}
                  placeholder={t.titlePlaceholder}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-lg font-medium"
                />
              </div>

              <div className="mb-6">
                <textarea
                  value={newEntry.content}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, content: e.target.value }))}
                  placeholder={t.contentPlaceholder}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none"
                  rows={12}
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={newEntry.isAnonymous}
                    onChange={(e) => setNewEntry(prev => ({ ...prev, isAnonymous: e.target.checked }))}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-700 flex items-center">
                    <Shield className="h-4 w-4 mr-1" />
                    {t.postAnonymously}
                  </span>
                </label>

                <button className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-blue-600 transition-colors font-medium flex items-center space-x-2">
                  <Send className="h-4 w-4" />
                  <span>{t.shareEntry}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupJournaling;