import React, { useState } from 'react';
import { Music, Palette, Play, Heart, Headphones, Image, Shuffle, Volume2 } from 'lucide-react';

interface MoodBasedRecommendationsProps {
  language: string;
}

interface Recommendation {
  id: string;
  title: string;
  artist?: string;
  type: 'music' | 'art' | 'video';
  mood: string;
  thumbnail: string;
  duration?: string;
  description: string;
}

const MoodBasedRecommendations: React.FC<MoodBasedRecommendationsProps> = ({ language }) => {
  const [selectedMood, setSelectedMood] = useState('calm');
  const [activeTab, setActiveTab] = useState('music');

  const content = {
    en: {
      title: "Mood-Based Recommendations",
      subtitle: "AI-curated content to match your emotional state",
      selectMood: "How are you feeling?",
      music: "Music",
      art: "Art",
      videos: "Videos",
      playNow: "Play Now",
      viewArt: "View Art",
      watchVideo: "Watch Video",
      addToFavorites: "Add to Favorites",
      createPlaylist: "Create Playlist",
      moods: {
        calm: "Calm & Peaceful",
        energetic: "Energetic & Motivated",
        sad: "Sad & Reflective",
        anxious: "Anxious & Stressed",
        happy: "Happy & Joyful",
        focused: "Focused & Productive"
      }
    },
    hi: {
      title: "मूड-आधारित सिफारिशें",
      subtitle: "आपकी भावनात्मक स्थिति के अनुकूल AI-क्यूरेटेड सामग्री",
      selectMood: "आप कैसा महसूस कर रहे हैं?",
      music: "संगीत",
      art: "कला",
      videos: "वीडियो",
      playNow: "अभी चलाएं",
      viewArt: "कला देखें",
      watchVideo: "वीडियो देखें",
      addToFavorites: "पसंदीदा में जोड़ें",
      createPlaylist: "प्लेलिस्ट बनाएं",
      moods: {
        calm: "शांत और शांतिपूर्ण",
        energetic: "ऊर्जावान और प्रेरित",
        sad: "उदास और चिंतनशील",
        anxious: "चिंतित और तनावग्रस्त",
        happy: "खुश और आनंदित",
        focused: "केंद्रित और उत्पादक"
      }
    }
  };

  const t = content[language as keyof typeof content];

  const musicRecommendations: Recommendation[] = [
    {
      id: '1',
      title: 'Ocean Waves & Piano',
      artist: 'Nature Sounds Collective',
      type: 'music',
      mood: 'calm',
      thumbnail: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=300',
      duration: '45:00',
      description: 'Gentle piano melodies with soothing ocean sounds'
    },
    {
      id: '2',
      title: 'Morning Motivation Mix',
      artist: 'Upbeat Collective',
      type: 'music',
      mood: 'energetic',
      thumbnail: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=300',
      duration: '32:15',
      description: 'Energizing tracks to start your day right'
    },
    {
      id: '3',
      title: 'Rainy Day Reflections',
      artist: 'Ambient Dreams',
      type: 'music',
      mood: 'sad',
      thumbnail: 'https://images.pexels.com/photos/1529881/pexels-photo-1529881.jpeg?auto=compress&cs=tinysrgb&w=300',
      duration: '38:22',
      description: 'Melancholic melodies for introspective moments'
    },
    {
      id: '4',
      title: 'Anxiety Relief Soundscape',
      artist: 'Healing Frequencies',
      type: 'music',
      mood: 'anxious',
      thumbnail: 'https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&w=300',
      duration: '60:00',
      description: 'Calming frequencies designed to reduce anxiety'
    }
  ];

  const artRecommendations: Recommendation[] = [
    {
      id: '5',
      title: 'Serene Landscape Collection',
      type: 'art',
      mood: 'calm',
      thumbnail: 'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Peaceful nature scenes to calm the mind'
    },
    {
      id: '6',
      title: 'Vibrant Abstract Energy',
      type: 'art',
      mood: 'energetic',
      thumbnail: 'https://images.pexels.com/photos/1509534/pexels-photo-1509534.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Bold colors and dynamic forms to energize'
    },
    {
      id: '7',
      title: 'Contemplative Portraits',
      type: 'art',
      mood: 'sad',
      thumbnail: 'https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Thoughtful portraits for reflection'
    },
    {
      id: '8',
      title: 'Geometric Harmony',
      type: 'art',
      mood: 'anxious',
      thumbnail: 'https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Structured patterns to bring order to chaos'
    }
  ];

  const videoRecommendations: Recommendation[] = [
    {
      id: '9',
      title: 'Guided Forest Meditation',
      type: 'video',
      mood: 'calm',
      thumbnail: 'https://images.pexels.com/photos/1496373/pexels-photo-1496373.jpeg?auto=compress&cs=tinysrgb&w=300',
      duration: '15:30',
      description: 'Walk through a peaceful forest with guided meditation'
    },
    {
      id: '10',
      title: 'High-Energy Workout Motivation',
      type: 'video',
      mood: 'energetic',
      thumbnail: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=300',
      duration: '20:45',
      description: 'Motivational workout session to boost energy'
    }
  ];

  const getRecommendations = () => {
    switch (activeTab) {
      case 'music':
        return musicRecommendations.filter(item => item.mood === selectedMood);
      case 'art':
        return artRecommendations.filter(item => item.mood === selectedMood);
      case 'videos':
        return videoRecommendations.filter(item => item.mood === selectedMood);
      default:
        return [];
    }
  };

  const getMoodColor = (mood: string) => {
    const colors = {
      calm: 'from-blue-500 to-cyan-500',
      energetic: 'from-orange-500 to-red-500',
      sad: 'from-gray-500 to-blue-500',
      anxious: 'from-purple-500 to-pink-500',
      happy: 'from-yellow-500 to-orange-500',
      focused: 'from-green-500 to-teal-500'
    };
    return colors[mood as keyof typeof colors] || colors.calm;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h1>
          <p className="text-gray-600 text-lg">{t.subtitle}</p>
        </div>

        {/* Mood Selection */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">{t.selectMood}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {Object.entries(t.moods).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setSelectedMood(key)}
                className={`p-4 rounded-xl border-2 transition-all text-center hover:scale-105 ${
                  selectedMood === key
                    ? `bg-gradient-to-br ${getMoodColor(key)} text-white border-transparent shadow-lg`
                    : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="text-2xl mb-2">
                  {key === 'calm' && '🧘'}
                  {key === 'energetic' && '⚡'}
                  {key === 'sad' && '😔'}
                  {key === 'anxious' && '😰'}
                  {key === 'happy' && '😊'}
                  {key === 'focused' && '🎯'}
                </div>
                <div className="text-sm font-medium">{label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Content Type Tabs */}
        <div className="flex space-x-1 bg-gray-100 rounded-xl p-1 mb-8">
          <button
            onClick={() => setActiveTab('music')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 ${
              activeTab === 'music'
                ? 'bg-white text-purple-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Music className="h-4 w-4" />
            <span>{t.music}</span>
          </button>
          <button
            onClick={() => setActiveTab('art')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 ${
              activeTab === 'art'
                ? 'bg-white text-purple-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Palette className="h-4 w-4" />
            <span>{t.art}</span>
          </button>
          <button
            onClick={() => setActiveTab('videos')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 ${
              activeTab === 'videos'
                ? 'bg-white text-purple-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Play className="h-4 w-4" />
            <span>{t.videos}</span>
          </button>
        </div>

        {/* Recommendations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getRecommendations().map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow group"
            >
              <div className="relative">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <button className="bg-white bg-opacity-90 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-opacity-100">
                    {activeTab === 'music' && <Play className="h-6 w-6 text-purple-600" />}
                    {activeTab === 'art' && <Image className="h-6 w-6 text-purple-600" />}
                    {activeTab === 'videos' && <Play className="h-6 w-6 text-purple-600" />}
                  </button>
                </div>
                {item.duration && (
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                    {item.duration}
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                {item.artist && (
                  <p className="text-gray-600 text-sm mb-2">{item.artist}</p>
                )}
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                
                <div className="flex items-center justify-between">
                  <button className={`bg-gradient-to-r ${getMoodColor(selectedMood)} text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all flex items-center space-x-2`}>
                    {activeTab === 'music' && <Headphones className="h-4 w-4" />}
                    {activeTab === 'art' && <Palette className="h-4 w-4" />}
                    {activeTab === 'videos' && <Play className="h-4 w-4" />}
                    <span className="text-sm font-medium">
                      {activeTab === 'music' && t.playNow}
                      {activeTab === 'art' && t.viewArt}
                      {activeTab === 'videos' && t.watchVideo}
                    </span>
                  </button>
                  
                  <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                    <Heart className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Actions</h3>
              <p className="text-gray-600">Create personalized playlists and collections</p>
            </div>
            <div className="flex space-x-3">
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors flex items-center space-x-2">
                <Shuffle className="h-4 w-4" />
                <span>{t.createPlaylist}</span>
              </button>
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg transition-colors flex items-center space-x-2">
                <Volume2 className="h-4 w-4" />
                <span>Ambient Mode</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodBasedRecommendations;