import React, { useState } from 'react';
import { Heart, Menu, X, Globe, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  currentLanguage: string;
  onLanguageChange: (lang: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentLanguage, onLanguageChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-blue-500 to-teal-500 p-2 rounded-xl">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              MannMitra
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex space-x-6">
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Dashboard
              </Link>
              <Link to="/chat" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                AI Chat
              </Link>
              <Link to="/community" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Community
              </Link>
              <div className="relative group">
                <button className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                  Features
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    <Link to="/journey" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                      Wellness Journey
                    </Link>
                    <Link to="/mood" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                      Mood Tracker
                    </Link>

                    <Link to="/vr" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                      VR Mindfulness
                    </Link>
                    <Link to="/journaling" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                      Group Journaling
                    </Link>
                  </div>
                </div>
              </div>
              <Link to="/crisis" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Crisis Support
              </Link>
            </nav>
            
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => onLanguageChange(currentLanguage === 'en' ? 'hi' : 'en')}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <Globe className="h-4 w-4" />
                <span className="text-sm font-medium">{currentLanguage === 'en' ? 'EN' : 'हि'}</span>
              </button>
              
              <button className="relative p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-3 space-y-3">
            <a href="#dashboard" className="block py-2 text-gray-700 hover:text-blue-600 font-medium">
              Dashboard
            </a>
            <a href="#chat" className="block py-2 text-gray-700 hover:text-blue-600 font-medium">
              AI Chat
            </a>
            <a href="#community" className="block py-2 text-gray-700 hover:text-blue-600 font-medium">
              Community
            </a>
            <a href="#journey" className="block py-2 text-gray-700 hover:text-blue-600 font-medium">
              Wellness Journey
            </a>
            <a href="#mood" className="block py-2 text-gray-700 hover:text-blue-600 font-medium">
              Mood Tracker
            </a>

            <a href="#vr" className="block py-2 text-gray-700 hover:text-blue-600 font-medium">
              VR Mindfulness
            </a>
            <a href="#journaling" className="block py-2 text-gray-700 hover:text-blue-600 font-medium">
              Group Journaling
            </a>
            <a href="#crisis" className="block py-2 text-gray-700 hover:text-blue-600 font-medium">
              Crisis Support
            </a>
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <button 
                onClick={() => onLanguageChange(currentLanguage === 'en' ? 'hi' : 'en')}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-100"
              >
                <Globe className="h-4 w-4" />
                <span className="text-sm font-medium">{currentLanguage === 'en' ? 'English' : 'हिंदी'}</span>
              </button>
              <button className="relative p-2 rounded-lg bg-gray-100">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;