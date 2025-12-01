import { ChevronLeft, MapPin, Phone, Package, Truck, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { useSettings } from '../contexts/SettingsContext';

type Screen = 'signup' | 'login' | 'otp' | 'home' | 'voice' | 'personalization' | 'cart' | 'checkout' | 'category' | 'search' | 'account' | 'voucher' | 'trackOrder' | 'currentOrders';

interface TrackOrderProps {
  onNavigate: (screen: Screen) => void;
  orderId?: string;
}

export function TrackOrder({ onNavigate, orderId = '#ORD-12345' }: TrackOrderProps) {
  const { language } = useSettings();

  const translations = {
    english: {
      title: 'Track Order',
      orderId: 'Order ID',
      estimatedTime: 'Estimated Delivery Time',
      minutes: 'minutes',
      status: {
        ordered: 'Order Placed',
        processing: 'Processing',
        outForDelivery: 'Out for Delivery',
        delivered: 'Delivered'
      },
      deliveryPartner: 'Delivery Partner',
      contactDriver: 'Contact Driver',
      orderDetails: 'Order Details',
      items: 'items',
      deliveryAddress: 'Delivery Address',
      home: 'Home'
    },
    urdu: {
      title: 'آرڈر ٹریک کریں',
      orderId: 'آرڈر آئی ڈی',
      estimatedTime: 'متوقع ڈیلیوری وقت',
      minutes: 'منٹ',
      status: {
        ordered: 'آرڈر دیا گیا',
        processing: 'تیاری جاری',
        outForDelivery: 'ڈیلیوری کے لیے روانہ',
        delivered: 'ڈیلیور ہو گیا'
      },
      deliveryPartner: 'ڈیلیوری پارٹنر',
      contactDriver: 'ڈرائیور سے رابطہ کریں',
      orderDetails: 'آرڈر کی تفصیلات',
      items: 'اشیاء',
      deliveryAddress: 'ڈیلیوری ایڈریس',
      home: 'گھر'
    }
  };

  const t = translations[language];

  const orderStatus = 'outForDelivery'; // Can be: ordered, processing, outForDelivery, delivered
  const estimatedMinutes = 15;

  const statusSteps = [
    { key: 'ordered', icon: CheckCircle, label: t.status.ordered },
    { key: 'processing', icon: Package, label: t.status.processing },
    { key: 'outForDelivery', icon: Truck, label: t.status.outForDelivery },
    { key: 'delivered', icon: CheckCircle, label: t.status.delivered }
  ];

  const getCurrentStepIndex = () => {
    return statusSteps.findIndex(step => step.key === orderStatus);
  };

  const currentStepIndex = getCurrentStepIndex();

  return (
    <div className="min-h-screen bg-gray-50 max-w-md mx-auto pb-20">
      {/* Header */}
      <div className="bg-[#FFD700] p-4 flex items-center">
        <button onClick={() => onNavigate('currentOrders')} className="mr-4">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1>{t.title}</h1>
      </div>

      <div className="p-4 space-y-4">
        {/* Order ID and Estimated Time */}
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600">{t.orderId}</p>
              <p className="text-lg">{orderId}</p>
            </div>
            {orderStatus !== 'delivered' && (
              <div className="text-right">
                <p className="text-sm text-gray-600">{t.estimatedTime}</p>
                <p className="text-lg text-[#FFD700]">{estimatedMinutes} {t.minutes}</p>
              </div>
            )}
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="bg-white rounded-lg p-4 h-64 flex items-center justify-center border-2 border-dashed border-gray-300">
          <div className="text-center text-gray-400">
            <MapPin className="w-12 h-12 mx-auto mb-2" />
            <p>Map View</p>
            <p className="text-sm">Live tracking would appear here</p>
          </div>
        </div>

        {/* Order Status Timeline */}
        <div className="bg-white rounded-lg p-4">
          <h2 className="mb-4">Order Status</h2>
          <div className="space-y-4">
            {statusSteps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = index <= currentStepIndex;
              const isCurrent = index === currentStepIndex;

              return (
                <div key={step.key} className="flex items-center gap-4">
                  {/* Icon */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isCompleted
                        ? 'bg-[#FFD700] text-black'
                        : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Label and time */}
                  <div className="flex-1">
                    <p className={isCurrent ? 'font-semibold' : ''}>{step.label}</p>
                    {isCompleted && (
                      <p className="text-sm text-gray-500">
                        {index === 0 ? '10:30 AM' : index === 1 ? '10:45 AM' : index === 2 ? '11:15 AM' : '11:30 AM'}
                      </p>
                    )}
                  </div>

                  {/* Line connector */}
                  {index < statusSteps.length - 1 && (
                    <div
                      className={`absolute left-[2.5rem] w-0.5 h-8 ${
                        index < currentStepIndex ? 'bg-[#FFD700]' : 'bg-gray-200'
                      }`}
                      style={{ marginTop: '2.5rem' }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Delivery Partner */}
        <div className="bg-white rounded-lg p-4">
          <h2 className="mb-4">{t.deliveryPartner}</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-lg">👨</span>
              </div>
              <div>
                <p>Ali Hassan</p>
                <p className="text-sm text-gray-500">Rider #1234</p>
              </div>
            </div>
            <Button
              className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-black rounded-full"
              size="sm"
            >
              <Phone className="w-4 h-4 mr-2" />
              {t.contactDriver}
            </Button>
          </div>
        </div>

        {/* Delivery Address */}
        <div className="bg-white rounded-lg p-4">
          <h2 className="mb-4">{t.deliveryAddress}</h2>
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-[#FFD700] mt-1" />
            <div>
              <p className="font-semibold">{t.home}</p>
              <p className="text-sm text-gray-600">
                H# 225- C, Gulzar 4 millenium mall, 22-B Street Phase 2, Islamabad
              </p>
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-lg p-4">
          <h2 className="mb-4">{t.orderDetails}</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-gray-100 rounded-lg"></div>
              <div className="flex-1">
                <p>Fresh Milk</p>
                <p className="text-sm text-gray-500">1 Liter</p>
              </div>
              <p>Rs 180</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-gray-100 rounded-lg"></div>
              <div className="flex-1">
                <p>Bread</p>
                <p className="text-sm text-gray-500">1 Pack</p>
              </div>
              <p>Rs 90</p>
            </div>
            <div className="border-t pt-3 flex justify-between">
              <span className="font-semibold">Total</span>
              <span className="font-semibold">Rs 270</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
