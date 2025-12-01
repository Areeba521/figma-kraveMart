import { ChevronLeft, Mic, Volume2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSettings } from '../contexts/SettingsContext';

type Screen = 'signup' | 'login' | 'otp' | 'home' | 'voice' | 'personalization' | 'cart' | 'checkout' | 'category' | 'search' | 'account' | 'voucher';

interface VoiceControlProps {
  onNavigate: (screen: Screen) => void;
}

export function VoiceControl({ onNavigate }: VoiceControlProps) {
  const [visibleMessages, setVisibleMessages] = useState<number>(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentSpeakingIndex, setCurrentSpeakingIndex] = useState<number | null>(null);
  const { language } = useSettings();

  const translations = {
    english: {
      title: 'Voice Control',
      messages: [
        {
          sender: 'user',
          text: 'I need to buy bread. Which company\'s bread should I get?',
        },
        {
          sender: 'bot',
          text: 'Bake Parlor bread costs 100 rupees.\nWould you like to purchase it?',
        },
        {
          sender: 'user',
          text: 'Yes',
        },
        {
          sender: 'bot',
          text: 'Your total bill is 199 rupees\nBake Parlor - 100 rupees\nDelivery Charges - 99 rupees',
        },
        {
          sender: 'user',
          text: 'Yes, confirm',
        },
        {
          sender: 'bot',
          text: 'Your order has been confirmed. Delivery time is 20 minutes',
        }
      ]
    },
    urdu: {
      title: 'آواز کنٹرول',
      messages: [
        {
          sender: 'user',
          text: 'مجھے بریڈ خریدنی ہے۔ کس کمپنی کی بریڈ لوں؟',
        },
        {
          sender: 'bot',
          text: 'بیک پارلر کی بریڈ 100 روپے کی ہے۔\nکیا آپ اسے خریدنا چاہیں گے؟',
        },
        {
          sender: 'user',
          text: 'جی ہاں',
        },
        {
          sender: 'bot',
          text: 'آپ کا کل بل 199 روپے ہے\nبیک پارلر - 100 روپے\nڈیلیوری چارجز - 99 روپے',
        },
        {
          sender: 'user',
          text: 'ہاں، کنفرم کریں',
        },
        {
          sender: 'bot',
          text: 'آپ کا آرڈر کنفرم ہو چکا ہے۔ ڈیلیوری کا وقت 20 منٹ ہے',
        }
      ]
    }
  };

  const t = translations[language];

  useEffect(() => {
    if (visibleMessages < t.messages.length) {
      const message = t.messages[visibleMessages];
      
      if (message.sender === 'user') {
        // Show recording animation for user messages
        setIsRecording(true);
        setTimeout(() => {
          setIsRecording(false);
          setVisibleMessages(visibleMessages + 1);
        }, 2000);
      } else {
        // Show speaking animation and speak the text for bot messages
        setIsSpeaking(true);
        setCurrentSpeakingIndex(visibleMessages);
        
        // Simulate text-to-speech
        const utterance = new SpeechSynthesisUtterance(message.text);
        utterance.lang = language === 'urdu' ? 'ur-PK' : 'en-US';
        utterance.onend = () => {
          setIsSpeaking(false);
          setCurrentSpeakingIndex(null);
          setVisibleMessages(visibleMessages + 1);
        };
        speechSynthesis.speak(utterance);
      }
    }
  }, [visibleMessages, t.messages.length, language]);

  const handleMicClick = () => {
    if (visibleMessages === 0) {
      setVisibleMessages(1);
    }
  };

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto pb-32 relative flex flex-col">
      {/* Header */}
      <div className="bg-[#FFD700] p-4 flex items-center">
        <button onClick={() => onNavigate('home')} className="mr-4">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="flex-1">{t.title}</h1>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {t.messages.slice(0, visibleMessages).map((message, index) => (
          <div
            key={index}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
          >
            <div
              className={`max-w-[80%] p-4 rounded-2xl relative ${
                message.sender === 'user'
                  ? 'bg-[#FFD700] text-black rounded-br-none'
                  : 'bg-gray-100 text-black rounded-bl-none'
              }`}
              style={{ whiteSpace: 'pre-line' }}
            >
              {message.text}
              {isSpeaking && currentSpeakingIndex === index && (
                <Volume2 className="w-4 h-4 absolute top-2 right-2 animate-pulse text-green-600" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Centered Voice Button */}
      <div className="flex items-center justify-center pb-8">
        <button
          onClick={handleMicClick}
          disabled={isRecording || isSpeaking}
          className={`rounded-full p-8 shadow-lg transition-all ${
            isRecording ? 'bg-red-500' : isSpeaking ? 'bg-green-500' : 'bg-[#FFD700]'
          } ${(isRecording || isSpeaking) ? 'animate-pulse' : ''}`}
        >
          {isSpeaking ? (
            <Volume2 className="w-12 h-12 text-white" />
          ) : (
            <Mic className={`w-12 h-12 ${isRecording ? 'text-white' : 'text-black'}`} />
          )}
        </button>
      </div>

      {/* Recording Animation */}
      {isRecording && (
        <div className="fixed bottom-32 left-1/2 transform -translate-x-1/2 z-40">
          <div className="bg-red-500 rounded-full px-6 py-3 flex gap-1 items-center">
            <span className="text-white mr-2">Recording</span>
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-1 bg-white rounded-full animate-wave"
                style={{
                  height: '16px',
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        @keyframes wave {
          0%, 100% {
            height: 16px;
          }
          50% {
            height: 32px;
          }
        }
        .animate-wave {
          animation: wave 1s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}