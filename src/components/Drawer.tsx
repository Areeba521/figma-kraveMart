import { Menu as MenuIcon, X, ChevronDown, LogOut, Settings } from 'lucide-react';
import { useState } from 'react';
import { useSettings } from '../contexts/SettingsContext';

type Screen = 'signup' | 'login' | 'otp' | 'home' | 'voice' | 'personalization' | 'cart' | 'checkout' | 'category' | 'search' | 'account' | 'voucher';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (screen: Screen) => void;
}

export function Drawer({ isOpen, onClose, onNavigate }: DrawerProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const { language } = useSettings();

  const translations = {
    english: {
      personalization: 'Personalization',
      helpSupport: 'Help & Support',
      privacyPolicy: 'Privacy Policy',
      termsConditions: 'Terms & Conditions',
      supportRequests: 'My Support Requests',
      logout: 'Logout'
    },
    urdu: {
      personalization: 'ذاتی ترتیبات',
      helpSupport: 'مدد اور سپورٹ',
      privacyPolicy: 'رازداری کی پالیسی',
      termsConditions: 'شرائط و ضوابط',
      supportRequests: 'میری سپورٹ درخواستیں',
      logout: 'لاگ آؤٹ'
    }
  };

  const t = translations[language];

  const toggleExpand = (item: string) => {
    setExpandedItem(expandedItem === item ? null : item);
  };

  const handleLogout = () => {
    onClose();
    onNavigate('login');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 max-w-md mx-auto"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed top-0 left-0 h-full w-80 bg-white z-50 shadow-xl flex flex-col max-w-md">
        {/* Header */}
        <div className="bg-[#FFD700] p-6">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 bg-black rounded flex items-center justify-center">
              <span className="text-[#FFD700] italic" style={{ fontFamily: 'serif' }}>Krave</span>
            </div>
            <span className="text-black">Mart</span>
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto">
          <nav className="p-4 space-y-1">
            {/* Personalization */}
            <button
              onClick={() => {
                onNavigate('personalization');
                onClose();
              }}
              className="flex items-center gap-3 w-full p-3 hover:bg-gray-50 rounded"
            >
              <Settings className="w-6 h-6" />
              <span>{t.personalization}</span>
            </button>

            {/* Help & Support */}
            <div>
              <button
                onClick={() => toggleExpand('help')}
                className="flex items-center gap-3 w-full p-3 hover:bg-gray-50 rounded"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 17v.01M12 13.5c0-.828.56-1.5 1.25-1.5.69 0 1.25-.672 1.25-1.5S13.94 9 13.25 9c-.69 0-1.25.672-1.25 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span className="flex-1 text-left">{t.helpSupport}</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${expandedItem === 'help' ? 'rotate-180' : ''}`} />
              </button>

              {/* Submenu */}
              {expandedItem === 'help' && (
                <div className="ml-9 space-y-1 mt-1">
                  <button className="flex items-center gap-3 w-full p-3 hover:bg-gray-50 rounded text-gray-600">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                      <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>{t.privacyPolicy}</span>
                  </button>
                  <button className="flex items-center gap-3 w-full p-3 hover:bg-gray-50 rounded text-gray-600">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                      <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>{t.termsConditions}</span>
                  </button>
                  <button className="flex items-center gap-3 w-full p-3 hover:bg-gray-50 rounded text-gray-600">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                      <path d="M18.364 5.636a9 9 0 11-12.728 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M12 2v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <span>{t.supportRequests}</span>
                  </button>
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* Logout */}
        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full p-3 text-red-600 hover:bg-red-50 rounded"
          >
            <LogOut className="w-6 h-6" />
            <span>{t.logout}</span>
          </button>
        </div>
      </div>
    </>
  );
}