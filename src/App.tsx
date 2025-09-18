import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ChatInterface from './components/ChatInterface';
import CommunitySupport from './components/CommunitySupport';
import WellnessJourney from './components/WellnessJourney';
import MoodTracker from './components/MoodTracker';
import MoodBasedRecommendations from './components/MoodBasedRecommendations';
import VRMindfulness from './components/VRMindfulness';
import GroupJournaling from './components/GroupJournaling';
import Journal from './pages/Journal';
import BreathingExercise from './components/BreathingExercise';
import Mindfulness from './pages/Mindfulness';
import MindfulnessSession from './components/MindfulnessSession';
import MindfulListening from './pages/MindfulListening';
import AffirmationBooster from './pages/AffirmationBooster';
import Chat from './pages/Chat';
import Community from './pages/Community';
import Features from './pages/Features';
import CrisisSupport from './pages/CrisisSupport';

function App() {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header 
          currentLanguage={currentLanguage} 
          onLanguageChange={setCurrentLanguage} 
        />
        <Routes>
          <Route path="/" element={<Dashboard language={currentLanguage} />} />
          <Route path="/chat" element={<ChatInterface language={currentLanguage} />} />
          <Route path="/community" element={<CommunitySupport language={currentLanguage} />} />
          <Route path="/crisis" element={<CrisisSupport language={currentLanguage} />} />
          <Route path="/resources" element={<MoodBasedRecommendations language={currentLanguage} />} />
          <Route path="/journey" element={<WellnessJourney language={currentLanguage} />} />
          <Route path="/mood" element={<MoodTracker language={currentLanguage} />} />
          <Route path="/recommendations" element={<MoodBasedRecommendations language={currentLanguage} />} />
          <Route path="/vr" element={<VRMindfulness language={currentLanguage} />} />
          <Route path="/journaling" element={<GroupJournaling language={currentLanguage} />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/breathing" element={<BreathingExercise language={currentLanguage} />} />
          <Route path="/mindfulness" element={<Mindfulness />} />
          <Route path="/mindfulness-session" element={<MindfulnessSession />} />
          <Route path="/mindful-listening" element={<MindfulListening />} />
          <Route path="/affirmations" element={<AffirmationBooster />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
