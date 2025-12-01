import { ChevronLeft } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

type Screen = 'signup' | 'login' | 'otp' | 'home' | 'voice' | 'personalization' | 'cart' | 'checkout' | 'category' | 'search' | 'account' | 'voucher';

interface VoucherProps {
  onNavigate: (screen: Screen) => void;
}

export function Voucher({ onNavigate }: VoucherProps) {
  const { language } = useSettings();

  const translations = {
    english: {
      title: 'Voucher',
      kraveExpress: 'Krave Express',
      superStore: 'Super Store',
      ramadan: 'Ramadan',
      justForYou: 'Just for you',
      banks: 'Banks',
      welcome: 'WELCOME',
      discount: '50.0%',
      minOrder: 'Min Order',
      maxDiscount: 'Maximum discount',
      description: 'Description',
      descText: 'Enjoy Rs. 500 OFF on your first order!',
      applicable: 'Applicable only on Fruits & Vegetables!'
    },
    urdu: {
      title: 'واؤچر',
      kraveExpress: 'کریو ایکسپریس',
      superStore: 'سپر سٹور',
      ramadan: 'رمضان',
      justForYou: 'صرف آپ کے لیے',
      banks: 'بینک',
      welcome: 'خوش آمدید',
      discount: '50.0%',
      minOrder: 'کم سے کم آرڈر',
      maxDiscount: 'زیادہ سے زیادہ رعایت',
      description: 'تفصیل',
      descText: 'اپنے پہلے آرڈر پر 500 روپے کی چھوٹ حاصل کریں!',
      applicable: 'صرف پھلوں اور سبزیوں پر لاگو!'
    }
  };

  const t = translations[language];

  const tabs = [
    { id: 'krave', label: t.kraveExpress },
    { id: 'super', label: t.superStore },
    { id: 'ramadan', label: t.ramadan }
  ];

  const subtabs = [
    { id: 'just', label: t.justForYou },
    { id: 'banks', label: t.banks }
  ];

  return (
    <div className="min-h-screen bg-gray-50 max-w-md mx-auto">
      {/* Header */}
      <div className="bg-[#FFD700] p-4 flex items-center">
        <button onClick={() => onNavigate('account')} className="mr-4">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="flex-1">{t.title}</h1>
      </div>

      {/* Tabs */}
      <div className="bg-[#FFD700] px-4 pb-2">
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`px-4 py-2 rounded-t-lg ${
                tab.id === 'krave'
                  ? 'bg-white text-black'
                  : 'text-black opacity-60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Subtabs */}
      <div className="bg-white px-4 py-3 border-b">
        <div className="flex gap-2">
          {subtabs.map((subtab) => (
            <button
              key={subtab.id}
              className={`px-6 py-2 rounded-full ${
                subtab.id === 'just'
                  ? 'bg-[#FFD700] text-black'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {subtab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Voucher Card */}
      <div className="p-4">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-3xl mb-2">{t.welcome}</h2>
              </div>
              <div className="text-right">
                <p className="text-4xl">{t.discount}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">{t.minOrder}</span>
                <span>499</span>
              </div>

              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">{t.maxDiscount}</span>
                <span>500</span>
              </div>

              <div className="py-2">
                <p className="text-gray-600 mb-2">{t.description}</p>
                <p className="text-sm mb-1">{t.descText}</p>
                <p className="text-sm text-red-600">{t.applicable}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
