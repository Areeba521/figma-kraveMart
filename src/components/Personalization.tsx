import { ChevronLeft } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

type Screen = 'signup' | 'login' | 'otp' | 'home' | 'voice' | 'personalization' | 'cart' | 'checkout' | 'category' | 'search';

interface PersonalizationProps {
  onNavigate: (screen: Screen) => void;
}

export function Personalization({ onNavigate }: PersonalizationProps) {
  const { fontSize, iconSize, theme, language, setFontSize, setIconSize, setTheme, setLanguage } = useSettings();

  const translations = {
    english: {
      title: 'Personalization',
      fontSize: 'Font Size',
      language: 'Language',
      themes: 'Themes',
      iconSize: 'Icon Size',
      english: 'English',
      urdu: 'Urdu',
      light: 'Light',
      dark: 'Dark',
      colorblind: 'Colorblind'
    },
    urdu: {
      title: 'ذاتی ترتیبات',
      fontSize: 'فونٹ سائز',
      language: 'زبان',
      themes: 'تھیمز',
      iconSize: 'آئیکن سائز',
      english: 'انگریزی',
      urdu: 'اردو',
      light: 'روشن',
      dark: 'تاریک',
      colorblind: 'رنگ اندھا پن'
    }
  };

  const t = translations[language];

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto">
      {/* Header */}
      <div className="bg-[#FFD700] p-4 flex items-center">
        <button onClick={() => onNavigate('home')} className="mr-4">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="flex-1">{t.title}</h1>
      </div>

      {/* Settings */}
      <div className="p-6 space-y-8">
        {/* Font Size */}
        <div>
          <h2 className="mb-4">{t.fontSize}</h2>
          <div className="flex items-center justify-center gap-8">
            <button
              onClick={() => setFontSize('small')}
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                fontSize === 'small'
                  ? 'bg-[#FFD700]'
                  : 'bg-white border-2 border-gray-300'
              }`}
            >
              S
            </button>
            <button
              onClick={() => setFontSize('medium')}
              className={`w-16 h-16 rounded-full flex items-center justify-center ${
                fontSize === 'medium'
                  ? 'bg-[#FFD700]'
                  : 'bg-white border-2 border-gray-300'
              }`}
            >
              M
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`w-20 h-20 rounded-full flex items-center justify-center ${
                fontSize === 'large'
                  ? 'bg-[#FFD700]'
                  : 'bg-white border-2 border-gray-300'
              }`}
            >
              L
            </button>
          </div>
        </div>

        {/* Language */}
        <div>
          <h2 className="mb-4">{t.language}</h2>
          <div className="flex gap-4">
            <button
              onClick={() => setLanguage('english')}
              className={`flex-1 py-3 rounded ${
                language === 'english'
                  ? 'bg-[#FFD700] text-black'
                  : 'bg-white border-2 border-gray-300'
              }`}
            >
              {t.english}
            </button>
            <button
              onClick={() => setLanguage('urdu')}
              className={`flex-1 py-3 rounded ${
                language === 'urdu'
                  ? 'bg-[#FFD700] text-black'
                  : 'bg-white border-2 border-gray-300'
              }`}
            >
              {t.urdu}
            </button>
          </div>
        </div>

        {/* Themes */}
        <div>
          <h2 className="mb-4">{t.themes}</h2>
          <div className="grid grid-cols-3 gap-3">
            {/* Light Theme */}
            <button
              onClick={() => setTheme('light')}
              className={`rounded-lg overflow-hidden border-2 ${
                theme === 'light' ? 'border-[#FFD700] border-4' : 'border-gray-300'
              }`}
            >
              <div className="bg-white h-16 flex items-center justify-center">
                <span className="text-black text-sm">{t.light}</span>
              </div>
              <div className="bg-gray-100 h-12 flex items-center justify-center">
                <span className="text-gray-600 text-xs">A</span>
              </div>
            </button>

            {/* Dark Theme */}
            <button
              onClick={() => setTheme('dark')}
              className={`rounded-lg overflow-hidden border-2 ${
                theme === 'dark' ? 'border-[#FFD700] border-4' : 'border-gray-300'
              }`}
            >
              <div className="bg-gray-900 h-16 flex items-center justify-center">
                <span className="text-white text-sm">{t.dark}</span>
              </div>
              <div className="bg-gray-800 h-12 flex items-center justify-center">
                <span className="text-gray-300 text-xs">A</span>
              </div>
            </button>

            {/* Colorblind Theme */}
            <button
              onClick={() => setTheme('colorblind')}
              className={`rounded-lg overflow-hidden border-2 ${
                theme === 'colorblind' ? 'border-[#FFD700] border-4' : 'border-gray-300'
              }`}
            >
              <div className="h-16 flex items-center justify-center" style={{ backgroundColor: '#FFC20A' }}>
                <span className="text-black text-sm">{t.colorblind}</span>
              </div>
              <div className="h-12 flex items-center justify-center" style={{ backgroundColor: '#0C7BDC' }}>
                <span className="text-white text-xs">A</span>
              </div>
            </button>
          </div>
        </div>

        {/* Icon Size */}
        <div>
          <h2 className="mb-4">{t.iconSize}</h2>
          <div className="flex items-center justify-center gap-8">
            <button
              onClick={() => setIconSize('small')}
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                iconSize === 'small'
                  ? 'bg-[#FFD700]'
                  : 'bg-white border-2 border-gray-300'
              }`}
            >
              S
            </button>
            <button
              onClick={() => setIconSize('medium')}
              className={`w-16 h-16 rounded-full flex items-center justify-center ${
                iconSize === 'medium'
                  ? 'bg-[#FFD700]'
                  : 'bg-white border-2 border-gray-300'
              }`}
            >
              M
            </button>
            <button
              onClick={() => setIconSize('large')}
              className={`w-20 h-20 rounded-full flex items-center justify-center ${
                iconSize === 'large'
                  ? 'bg-[#FFD700]'
                  : 'bg-white border-2 border-gray-300'
              }`}
            >
              L
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}