import { ChevronLeft, Package, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';
import { useSettings } from '../contexts/SettingsContext';

type Screen = 'signup' | 'login' | 'otp' | 'home' | 'voice' | 'personalization' | 'cart' | 'checkout' | 'category' | 'search' | 'account' | 'voucher' | 'trackOrder' | 'currentOrders' | 'pastOrders';

interface PastOrdersProps {
  onNavigate: (screen: Screen) => void;
}

export function PastOrders({ onNavigate }: PastOrdersProps) {
  const { language } = useSettings();

  const translations = {
    english: {
      title: 'Past Orders',
      reorder: 'Reorder',
      items: 'items',
      delivered: 'Delivered',
      orderId: 'Order',
      noOrders: 'No past orders',
      noOrdersDesc: 'You haven\'t placed any orders yet'
    },
    urdu: {
      title: 'پچھلے آرڈرز',
      reorder: 'دوبارہ آرڈر کریں',
      items: 'اشیاء',
      delivered: 'ڈیلیور ہو گیا',
      orderId: 'آرڈر',
      noOrders: 'کوئی پچھلا آرڈر نہیں',
      noOrdersDesc: 'آپ نے ابھی تک کوئی آرڈر نہیں دیا'
    }
  };

  const t = translations[language];

  const pastOrders = [
    {
      id: '#ORD-12343',
      items: 8,
      total: 2450,
      status: 'Delivered',
      date: '22 Nov, 2025'
    },
    {
      id: '#ORD-12342',
      items: 4,
      total: 890,
      status: 'Delivered',
      date: '20 Nov, 2025'
    },
    {
      id: '#ORD-12341',
      items: 6,
      total: 1560,
      status: 'Delivered',
      date: '18 Nov, 2025'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 max-w-md mx-auto pb-20">
      {/* Header */}
      <div className="bg-[#FFD700] p-4 flex items-center">
        <button onClick={() => onNavigate('account')} className="mr-4">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1>{t.title}</h1>
      </div>

      <div className="p-4 space-y-4">
        {pastOrders.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center">
            <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h2 className="text-gray-600 mb-2">{t.noOrders}</h2>
            <p className="text-sm text-gray-400">{t.noOrdersDesc}</p>
          </div>
        ) : (
          pastOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold">{t.orderId} {order.id}</p>
                  <p className="text-sm text-gray-500">{order.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">Rs {order.total}</p>
                  <p className="text-sm text-gray-500">{order.items} {t.items}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4 p-3 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <p className="text-sm text-green-700">{t.delivered}</p>
              </div>

              <Button
                onClick={() => onNavigate('home')}
                variant="outline"
                className="w-full border-[#FFD700] text-black hover:bg-[#FFD700]/10 rounded-full"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                {t.reorder}
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
