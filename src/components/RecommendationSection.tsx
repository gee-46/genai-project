import React, { useEffect, useState } from 'react';

interface RecommendationSectionProps {
  mood: string;
}

interface Recommendation {
  id: string;
  title: string;
  artist?: string;
  type: 'music' | 'video';
  mood: string;
  thumbnail: string;
  duration?: string;
  description: string;
  embedUrl?: string;
}

const recommendations: Record<string, { music: Recommendation[]; videos: Recommendation[] }> = {
  calm: {
    music: [
      {
        id: '1',
        title: 'Ocean Waves & Piano',
        artist: 'Nature Sounds Collective',
        type: 'music',
        mood: 'calm',
        thumbnail: 'https://picsum.photos/400/300?random=1',
        duration: '45:00',
        description: 'Gentle piano melodies with soothing ocean sounds',
        embedUrl: 'https://open.spotify.com/embed/playlist/37i9dQZF1DX3PIPIT6lEg5',
      },
    ],
    videos: [
      {
        id: '9',
        title: 'Guided Forest Meditation',
        type: 'video',
        mood: 'calm',
        thumbnail: 'https://picsum.photos/400/300?random=3',
        duration: '15:30',
        description: 'Walk through a peaceful forest with guided meditation',
        embedUrl: 'https://www.youtube.com/embed/inpok4MKVLM',
      },
    ],
  },
  energetic: {
    music: [
      {
        id: '2',
        title: 'Morning Motivation Mix',
        artist: 'Upbeat Collective',
        type: 'music',
        mood: 'energetic',
        thumbnail: 'https://picsum.photos/400/300?random=4',
        duration: '32:15',
        description: 'Energizing tracks to start your day right',
        embedUrl: 'https://open.spotify.com/embed/playlist/37i9dQZF1DXdPec7aLTmlC',
      },
    ],
    videos: [
      {
        id: '10',
        title: 'High-Energy Workout Motivation',
        type: 'video',
        mood: 'energetic',
        thumbnail: 'https://picsum.photos/400/300?random=6',
        duration: '20:45',
        description: 'Motivational workout session to boost energy',
        embedUrl: 'https://www.youtube.com/embed/2L2lnxIcNmo',
      },
    ],
  },
  happy: {
    music: [
      {
        id: '11',
        title: 'Happy Pop Hits',
        artist: 'Pop Masters',
        type: 'music',
        mood: 'happy',
        thumbnail: 'https://picsum.photos/400/300?random=7',
        duration: '40:00',
        description: 'Uplifting pop songs to keep the good vibes going',
        embedUrl: 'https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M',
      },
    ],
    videos: [
      {
        id: '13',
        title: 'Funny Cat Videos Compilation',
        type: 'video',
        mood: 'happy',
        thumbnail: 'https://picsum.photos/400/300?random=9',
        duration: '10:00',
        description: 'Adorable cat videos to make you smile',
        embedUrl: 'https://www.youtube.com/embed/tpiyEe_CqB4',
      },
    ],
  },
  good: {
    music: [
      {
        id: '14',
        title: 'Chill Acoustic Vibes',
        artist: 'Acoustic Lounge',
        type: 'music',
        mood: 'good',
        thumbnail: 'https://picsum.photos/400/300?random=10',
        duration: '35:00',
        description: 'Relaxed acoustic tunes for a pleasant day',
        embedUrl: 'https://open.spotify.com/embed/playlist/37i9dQZF1DX4E3UdUs7fUx',
      },
    ],
    videos: [
      {
        id: '16',
        title: 'Nature Walk in the Park',
        type: 'video',
        mood: 'good',
        thumbnail: 'https://picsum.photos/400/300?random=12',
        duration: '20:00',
        description: 'Relaxing walk through beautiful parks',
        embedUrl: 'https://www.youtube.com/embed/8aGQ7TQTgRg',
      },
    ],
  },
  okay: {
    music: [
      {
        id: '17',
        title: 'Neutral Background Music',
        artist: 'Ambient Sounds',
        type: 'music',
        mood: 'okay',
        thumbnail: 'https://picsum.photos/400/300?random=13',
        duration: '50:00',
        description: 'Subtle ambient music for focus and balance',
        embedUrl: 'https://open.spotify.com/embed/playlist/37i9dQZF1DX4PP3DA4J0N8',
      },
    ],
    videos: [
      {
        id: '19',
        title: 'Mindful Breathing Exercises',
        type: 'video',
        mood: 'okay',
        thumbnail: 'https://picsum.photos/400/300?random=15',
        duration: '12:00',
        description: 'Simple breathing techniques for mindfulness',
        embedUrl: 'https://www.youtube.com/embed/4LbA9M5aJ2I',
      },
    ],
  },
  sad: {
    music: [
      {
        id: '20',
        title: 'Melancholic Piano Pieces',
        artist: 'Sad Piano Collective',
        type: 'music',
        mood: 'sad',
        thumbnail: 'https://picsum.photos/400/300?random=16',
        duration: '38:00',
        description: 'Emotional piano music for reflection',
        embedUrl: 'https://open.spotify.com/embed/playlist/37i9dQZF1DX7qK8ma5wgG1',
      },
    ],
    videos: [
      {
        id: '22',
        title: 'Comforting Rain Sounds',
        type: 'video',
        mood: 'sad',
        thumbnail: 'https://picsum.photos/400/300?random=18',
        duration: '30:00',
        description: 'Soothing rain sounds for comfort',
        embedUrl: 'https://www.youtube.com/embed/q76bMs-NwRk',
      },
    ],
  },
  anxious: {
    music: [
      {
        id: '23',
        title: 'Calming Nature Sounds',
        artist: 'Anxiety Relief',
        type: 'music',
        mood: 'anxious',
        thumbnail: 'https://picsum.photos/400/300?random=19',
        duration: '60:00',
        description: 'Nature sounds to reduce anxiety',
        embedUrl: 'https://open.spotify.com/embed/playlist/37i9dQZF1DX4PP3DA4J0N8',
      },
    ],
    videos: [
      {
        id: '25',
        title: 'Guided Anxiety Relief',
        type: 'video',
        mood: 'anxious',
        thumbnail: 'https://picsum.photos/400/300?random=21',
        duration: '18:00',
        description: 'Guided session to manage anxiety',
        embedUrl: 'https://www.youtube.com/embed/4pLUleLdwY4',
      },
    ],
  },
};

const RecommendationSection: React.FC<RecommendationSectionProps> = ({ mood }) => {
  const [activeTab, setActiveTab] = useState<'music' | 'videos'>('music');
  const [currentMood, setCurrentMood] = useState(mood);

  useEffect(() => {
    setCurrentMood(mood);
  }, [mood]);

  const moodContent = recommendations[currentMood] || recommendations['calm'];

  return (
    <div id="recommendations" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Recommendations for your mood: <span className="capitalize">{currentMood}</span></h2>
      <div className="space-y-4">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('music')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'music' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            🎵 Music
          </button>
          <button
            onClick={() => setActiveTab('videos')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'videos' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            🎥 Videos
          </button>
        </div>

        {activeTab === 'music' && (
          <div className="space-y-6">
            {moodContent.music.length === 0 && <p>No music recommendations available.</p>}
            {moodContent.music.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                {item.artist && <p className="text-sm text-gray-600 mb-2">{item.artist}</p>}
                <div className="aspect-w-16 aspect-h-9">
                  {item.embedUrl ? (
                    <iframe
                      src={item.embedUrl}
                      title={item.title}
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full rounded-lg"
                    />
                  ) : (
                    <img src={item.thumbnail} alt={item.title} className="w-full h-auto rounded-lg" />
                  )}
                </div>
                <p className="mt-2 text-gray-700">{item.description}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'videos' && (
          <div className="space-y-6">
            {moodContent.videos.length === 0 && <p>No video recommendations available.</p>}
            {moodContent.videos.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <div className="aspect-w-16 aspect-h-9">
                  {item.embedUrl ? (
                    <iframe
                      src={item.embedUrl}
                      title={item.title}
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full rounded-lg"
                    />
                  ) : (
                    <img src={item.thumbnail} alt={item.title} className="w-full h-auto rounded-lg" />
                  )}
                </div>
                <p className="mt-2 text-gray-700">{item.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendationSection;
