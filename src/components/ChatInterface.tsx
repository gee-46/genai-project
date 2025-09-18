import React, { useState, useEffect, useRef } from 'react';
import culturalResponses from '../data/culturalResponses';
import CrisisCard from './CrisisCard';
import BreathingExercise from './BreathingExercise';
import { detectMood } from '../lib/sentiment';

const HeartIcon = () => (
  <svg
    className="w-8 h-8 text-pink-400 mx-auto mb-2"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

type Message = {
  id: number;
  sender: 'user' | 'ai' | 'system';
  text: string;
  type?: 'normal' | 'coping' | 'helpline' | 'mood' | 'crisis';
  onClick?: () => void;
  component?: React.ReactNode;
};

const sentimentKeywords = {
  sad: ['sad', 'depressed', 'unhappy', 'down', 'low', 'hopeless', 'tired'],
  anxious: ['anxious', 'nervous', 'worried', 'stressed', 'overwhelmed', 'panic'],
  positive: ['happy', 'good', 'great', 'joy', 'excited', 'love', 'thankful'],
};

const copingTriggers = {
  stress: 'Breathing Exercise',
  sleep: 'Guided Meditation',
  lonely: 'Journaling or Peer Support',
};



const ChatInterface: React.FC<{ language?: string }> = ({ language = 'english' }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [exchangeCount, setExchangeCount] = useState(0);
  const [showBreathing, setShowBreathing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

interface StringArray {
  [key: string]: string[];
}
interface StringMap {
  [key: string]: string;
}
const sentimentKeywordsTyped: StringArray = sentimentKeywords;
const copingTriggersTyped: StringMap = copingTriggers;

const detectSentiment = (text: string): 'sad' | 'anxious' | 'positive' | 'neutral' => {
  const lower = text.toLowerCase();
  if (sentimentKeywordsTyped.sad.some((word) => lower.includes(word))) return 'sad';
  if (sentimentKeywordsTyped.anxious.some((word) => lower.includes(word))) return 'anxious';
  if (sentimentKeywordsTyped.positive.some((word) => lower.includes(word))) return 'positive';
  return 'neutral';
};

const checkCopingTrigger = (text: string): string | null => {
  const lower = text.toLowerCase();
  for (const key in copingTriggersTyped) {
    if (lower.includes(key)) return copingTriggersTyped[key];
  }
  return null;
};

  const getAdaptiveResponse = (sentiment: string): string => {
    switch (sentiment) {
      case 'sad':
        return "I'm sorry you're feeling down. Remember, it's okay to have tough days.";
      case 'anxious':
        return "Take a deep breath. You're doing your best, and that's enough.";
      case 'positive':
        return "That's wonderful to hear! Keep up the great vibes!";
      default:
        return "I'm here to listen. Tell me more.";
    }
  };

  const getCulturalResponse = (): string => {
    const lang = language.toLowerCase();
    const responses = lang === 'hindi' ? culturalResponses.hindi : culturalResponses.english;
    const idx = Math.floor(Math.random() * responses.length);
    return responses[idx];
  };



  const saveCrisisMood = async (date: string) => {
    try {
      await fetch('http://localhost:4000/api/mood', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'anon', date, mood: 'crisis', note: 'Crisis detected in chat' })
      });
    } catch (error) {
      console.error('Failed to save crisis mood', error);
    }
  };

  // New helper to get quick action buttons based on AI message text
  const getQuickActions = (text: string): { label: string; onClick: () => void }[] => {
    const actions: { label: string; onClick: () => void }[] = [];
    const lower = text.toLowerCase();

    if (lower.includes('breathing exercise')) {
      actions.push({
        label: 'Breathing Exercise',
        onClick: () => alert('Launching Breathing Exercise...'),
      });
    }
    if (lower.includes('mood tracker') || lower.includes('log mood')) {
      actions.push({
        label: 'Mood Tracker',
        onClick: () => alert('Opening Mood Calendar...'),
      });
    }
    if (lower.includes('journal') || lower.includes('journaling')) {
      actions.push({
        label: 'Journal',
        onClick: () => alert('Opening Journal...'),
      });
    }
    if (lower.includes('crisis helpline') || lower.includes('urgent help') || lower.includes('suicidal')) {
      actions.push({
        label: 'Crisis Helpline',
        onClick: () => alert('Displaying Crisis Helpline numbers...'),
      });
    }
    return actions;
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMessage: Message = {
      id: Date.now(),
      sender: 'user',
      text: input.trim(),
      type: 'normal',
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Check for crisis
    const mood = detectMood(userMessage.text);
    if (mood === 'crisis') {
      const date = new Date().toISOString().split('T')[0];
      saveCrisisMood(date);
      const empatheticMessage: Message = {
        id: Date.now() + 1,
        sender: 'ai',
        text: "I hear your pain, and I care. You're not alone. Let's get you support.",
        type: 'normal',
      };
      const crisisCardMessage: Message = {
        id: Date.now() + 2,
        sender: 'system',
        text: '',
        type: 'crisis',
        component: <CrisisCard onCallNow={() => window.open('tel:18005990019')} onTryBreathing={() => setShowBreathing(true)} />,
      };
      setMessages((prev) => [...prev, empatheticMessage, crisisCardMessage]);
      setTimeout(() => {
        const promptMessage: Message = {
          id: Date.now() + 3,
          sender: 'system',
          text: 'Would you like me to log this in your mood calendar so we can track your recovery together?',
          type: 'mood',
          onClick: () => alert('Opening Mood Calendar...'),
        };
        setMessages((prev) => [...prev, promptMessage]);
      }, 2000);
      return;
    }

    // Check for coping triggers
    const copingTool = checkCopingTrigger(userMessage.text);
        if (copingTool) {
          const copingMessage: Message = {
            id: Date.now() + 1,
            sender: 'system',
            text: `You might find the ${copingTool} helpful. Click to try it.`,
            type: 'coping',
            onClick: () => {
              alert(`Launching ${copingTool} feature...`);
              // TODO: Integrate actual feature launch
            },
          };
          setMessages((prev) => [...prev, copingMessage]);
          return;
        }

    // Sentiment detection and adaptive response
    const sentiment = detectSentiment(userMessage.text);
    let aiResponse = getAdaptiveResponse(sentiment);

    // Add cultural response randomly (30% chance)
    if (Math.random() < 0.3) {
      aiResponse += ' ' + getCulturalResponse();
    }

    const aiMessage: Message = {
      id: Date.now() + 2,
      sender: 'ai',
      text: aiResponse,
      type: 'normal',
    };

    setTimeout(() => {
      setMessages((prev) => [...prev, aiMessage]);
      setExchangeCount((count) => count + 1);

      // Mood logging prompt after 5 exchanges
      if (exchangeCount + 1 === 5) {
        const moodPrompt: Message = {
          id: Date.now() + 3,
          sender: 'system',
          text: 'Would you like to log your mood for today?',
          type: 'mood',
          onClick: () => {
            alert('Opening Mood Calendar...');
            // TODO: Integrate Mood Calendar component and save mood
          },
        };
        setMessages((prev) => [...prev, moodPrompt]);
      }
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-white via-gray-100 to-blue-100">
      <div className="pt-12 pb-6">
        <HeartIcon />
        <h1 className="text-center text-3xl font-semibold text-gray-800">
          MannMitra – Your Mind’s Friend
        </h1>
      </div>
      <div className="flex-1 overflow-y-auto px-4 space-y-4">
        {messages.map((msg) => {
          if (msg.type === 'crisis') {
            return <div key={msg.id}>{msg.component}</div>;
          }
          if (msg.type === 'coping') {
            return (
              <div
                key={msg.id}
                onClick={msg.onClick}
                className="max-w-xs md:max-w-md cursor-pointer ml-auto bg-green-100 text-green-900 rounded-xl rounded-tr-none px-4 py-2 opacity-0 animate-fadeIn"
                style={{ animationFillMode: 'forwards' }}
              >
                {msg.text}
              </div>
            );
          }
          if (msg.type === 'helpline') {
            return (
              <div
                key={msg.id}
                className="max-w-xs md:max-w-md ml-auto bg-red-100 border border-red-400 text-red-900 rounded-xl rounded-tr-none px-4 py-2 whitespace-pre-line opacity-0 animate-fadeIn"
                style={{ animationFillMode: 'forwards' }}
              >
                {msg.text}
              </div>
            );
          }
          if (msg.type === 'mood') {
            return (
              <div
                key={msg.id}
                onClick={msg.onClick}
                className="max-w-xs md:max-w-md cursor-pointer ml-auto bg-yellow-100 text-yellow-900 rounded-xl rounded-tr-none px-4 py-2 opacity-0 animate-fadeIn"
                style={{ animationFillMode: 'forwards' }}
              >
                {msg.text}
              </div>
            );
          }
          return (
            <div
              key={msg.id}
              className={`max-w-xs md:max-w-md px-4 py-2 ${
                msg.sender === 'user'
                  ? 'ml-auto bg-blue-200 text-blue-900 rounded-xl rounded-tr-none'
                  : 'mr-auto bg-white border border-gray-300 text-gray-800 rounded-xl rounded-tl-none'
              } opacity-0 animate-fadeIn`}
              style={{ animationFillMode: 'forwards' }}
            >
              {msg.text}
              {/* Quick Action Buttons for AI messages */}
              {msg.sender === 'ai' && (
                <div className="mt-2 flex space-x-2">
                  {getQuickActions(msg.text).map((action, idx) => (
                    <button
                      key={idx}
                      onClick={action.onClick}
                      className="rounded-xl bg-indigo-500 hover:bg-indigo-600 p-2 text-white"
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-transparent px-4 py-3 shadow-inner">
        <div className="flex items-center max-w-4xl mx-auto">
          <input
            type="text"
            placeholder="Type your thoughts here…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 rounded-full px-5 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={sendMessage}
            aria-label="Send message"
            className="ml-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <svg
              className="w-6 h-6 transform rotate-45"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>
      <style>{`
        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease forwards;
        }
      `}</style>
      {showBreathing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-4xl w-full max-h-full overflow-auto">
            <button onClick={() => setShowBreathing(false)} className="float-right text-gray-500 hover:text-gray-700">X</button>
            <BreathingExercise language="en" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatInterface;
