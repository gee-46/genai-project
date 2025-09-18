import React from 'react';
import { Phone, MessageSquare, Shield, Clock, Heart, AlertTriangle } from 'lucide-react';

interface CrisisSupportProps {
  language: string;
}

const CrisisSupport: React.FC<CrisisSupportProps> = ({ language }) => {
  const content = {
    en: {
      title: "Crisis Support",
      subtitle: "Immediate help when you need it most",
      emergency: "If you're in immediate danger, please call emergency services: 100",
      nationalHelplines: "National Mental Health Helplines",
      available24: "Available 24/7",
      freeConfidential: "Free & Confidential",
      immediateHelp: "Need Immediate Help?",
      talkNow: "Talk to Someone Now",
      chatSupport: "Crisis Chat Support",
      selfCare: "Crisis Self-Care",
      breathingExercise: "5-Minute Breathing Exercise",
      groundingTechnique: "Grounding Technique",
      safetyPlan: "Personal Safety Plan",
      emergencyContacts: "Emergency Contacts",
      warningText: "If you're having thoughts of self-harm or suicide, please reach out immediately.",
      helplines: [
        {
          name: "KIRAN Mental Health Helpline",
          number: "1800-599-0019",
          description: "National mental health helpline by Ministry of Health"
        },
        {
          name: "Sneha Suicide Prevention",
          number: "044-24640050",
          description: "24/7 suicide prevention helpline"
        },
        {
          name: "Vandrevala Foundation",
          number: "9999666555",
          description: "Mental health support and crisis counseling"
        }
      ]
    },
    hi: {
      title: "संकट सहायता",
      subtitle: "जब आपको सबसे ज्यादा मदद की जरूरत हो",
      emergency: "यदि आप तत्काल खतरे में हैं, तो कृपया आपातकालीन सेवाओं को कॉल करें: 100",
      nationalHelplines: "राष्ट्रीय मानसिक स्वास्थ्य हेल्पलाइन",
      available24: "24/7 उपलब्ध",
      freeConfidential: "निःशुल्क और गोपनीय",
      immediateHelp: "तत्काल मदद चाहिए?",
      talkNow: "अभी किसी से बात करें",
      chatSupport: "संकट चैट सहायता",
      selfCare: "संकट स्व-देखभाल",
      breathingExercise: "5-मिनट की सांस की एक्सरसाइज",
      groundingTechnique: "ग्राउंडिंग तकनीक",
      safetyPlan: "व्यक्तिगत सुरक्षा योजना",
      emergencyContacts: "आपातकालीन संपर्क",
      warningText: "यदि आप स्व-नुकसान या आत्महत्या के विचार कर रहे हैं, तो कृपया तुरंत संपर्क करें।",
      helplines: [
        {
          name: "KIRAN मानसिक स्वास्थ्य हेल्पलाइन",
          number: "1800-599-0019",
          description: "स्वास्थ्य मंत्रालय की राष्ट्रीय मानसिक स्वास्थ्य हेल्पलाइन"
        },
        {
          name: "स्नेहा आत्महत्या रोकथाम",
          number: "044-24640050",
          description: "24/7 आत्महत्या रोकथाम हेल्पलाइन"
        },
        {
          name: "वंद्रेवाला फाउंडेशन",
          number: "9999666555",
          description: "मानसिक स्वास्थ्य सहायता और संकट परामर्श"
        }
      ]
    }
  };

  const t = content[language as keyof typeof content];

  const selfCareActivities = [
    {
      icon: '🫁',
      title: language === 'en' ? 'Deep Breathing' : 'गहरी सांस',
      description: language === 'en' ? 'Inhale for 4, hold for 4, exhale for 6' : '4 तक सांस लें, 4 तक रोकें, 6 तक छोड़ें'
    },
    {
      icon: '🤚',
      title: language === 'en' ? '5-4-3-2-1 Grounding' : '5-4-3-2-1 ग्राउंडिंग',
      description: language === 'en' ? '5 things you see, 4 you touch, 3 you hear, 2 you smell, 1 you taste' : '5 चीजें जो आप देखते हैं, 4 जो आप छूते हैं, 3 जो आप सुनते हैं, 2 जो आप सूंघते हैं, 1 जो आप चखते हैं'
    },
    {
      icon: '💧',
      title: language === 'en' ? 'Cold Water' : 'ठंडा पानी',
      description: language === 'en' ? 'Splash cold water on your face or hold ice cubes' : 'अपने चेहरे पर ठंडा पानी छिड़कें या बर्फ के टुकड़े पकड़ें'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-br from-red-500 to-orange-500 p-3 rounded-full">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h1>
          <p className="text-gray-600 text-lg">{t.subtitle}</p>
        </div>

        {/* Emergency Warning */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="text-lg font-semibold text-red-800 mb-2">{t.warningText}</h2>
              <p className="text-red-700 font-medium">{t.emergency}</p>
            </div>
          </div>
        </div>

        {/* Immediate Help Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <button className="bg-gradient-to-br from-red-500 to-red-600 text-white p-8 rounded-2xl hover:from-red-600 hover:to-red-700 transition-colors group text-left">
            <Phone className="h-12 w-12 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold mb-2">{t.talkNow}</h3>
            <p className="text-red-100">Call a trained crisis counselor</p>
            <div className="mt-4 flex items-center text-red-100">
              <Clock className="h-4 w-4 mr-2" />
              <span className="text-sm">{t.available24}</span>
            </div>
          </button>

          <button className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-8 rounded-2xl hover:from-blue-600 hover:to-blue-700 transition-colors group text-left">
            <MessageSquare className="h-12 w-12 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold mb-2">{t.chatSupport}</h3>
            <p className="text-blue-100">Text-based crisis support</p>
            <div className="mt-4 flex items-center text-blue-100">
              <Heart className="h-4 w-4 mr-2" />
              <span className="text-sm">{t.freeConfidential}</span>
            </div>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* National Helplines */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">{t.nationalHelplines}</h2>
            <div className="space-y-4">
              {t.helplines.map((helpline, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{helpline.name}</h3>
                    <a 
                      href={`tel:${helpline.number}`}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                    >
                      <Phone className="h-4 w-4" />
                      <span>{helpline.number}</span>
                    </a>
                  </div>
                  <p className="text-gray-600 text-sm">{helpline.description}</p>
                  <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {t.available24}
                    </span>
                    <span className="flex items-center">
                      <Shield className="h-3 w-3 mr-1" />
                      {t.freeConfidential}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Crisis Self-Care */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">{t.selfCare}</h2>
            <div className="space-y-4">
              {selfCareActivities.map((activity, index) => (
                <div key={index} className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">{activity.icon}</div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{activity.title}</h3>
                      <p className="text-gray-600 text-sm">{activity.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Action Buttons */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-xl hover:from-purple-600 hover:to-purple-700 transition-colors">
                <div className="text-lg mb-1">🧘</div>
                <div className="text-sm font-medium">{t.breathingExercise}</div>
              </button>
              <button className="bg-gradient-to-r from-teal-500 to-teal-600 text-white p-4 rounded-xl hover:from-teal-600 hover:to-teal-700 transition-colors">
                <div className="text-lg mb-1">🛡️</div>
                <div className="text-sm font-medium">{t.safetyPlan}</div>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-2xl p-6 text-center">
          <Heart className="h-6 w-6 text-yellow-600 mx-auto mb-3" />
          <p className="text-yellow-800 font-medium mb-2">
            {language === 'en' ? 'You are not alone' : 'आप अकेले नहीं हैं'}
          </p>
          <p className="text-yellow-700 text-sm">
            {language === 'en' 
              ? 'Crisis support is available 24/7. Your life has value and there are people who want to help.'
              : 'संकट सहायता 24/7 उपलब्ध है। आपके जीवन का मूल्य है और ऐसे लोग हैं जो मदद करना चाहते हैं।'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default CrisisSupport;