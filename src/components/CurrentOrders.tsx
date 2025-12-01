import { ChevronLeft, Package, Clock, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { useSettings } from '../contexts/SettingsContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';

type Screen = 'signup' | 'login' | 'otp' | 'home' | 'voice' | 'personalization' | 'cart' | 'checkout' | 'category' | 'search' | 'account' | 'voucher' | 'trackOrder' | 'currentOrders' | 'pastOrders';

interface CurrentOrdersProps {
  onNavigate: (screen: Screen) => void;
}

export function CurrentOrders({ onNavigate }: CurrentOrdersProps) {
  const { language } = useSettings();
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState('');
  const [cancelReason, setCancelReason] = useState('');
  const [orders, setOrders] = useState([
    {
      id: '#ORD-12345',
      items: 5,
      total: 1250,
      estimatedMinutes: 15,
      status: 'Out for Delivery',
      date: '23 Nov, 2025'
    },
    {
      id: '#ORD-12344',
      items: 3,
      total: 680,
      estimatedMinutes: 25,
      status: 'Processing',
      date: '23 Nov, 2025'
    }
  ]);

  const translations = {
    english: {
      title: 'Current Orders',
      trackOrder: 'Track Order',
      cancelOrder: 'Cancel Order',
      items: 'items',
      estimatedDelivery: 'Estimated delivery in',
      minutes: 'minutes',
      orderId: 'Order',
      noOrders: 'No current orders',
      noOrdersDesc: 'You have no orders in progress',
      cancelTitle: 'Cancel Order',
      cancelDesc: 'Why do you want to cancel this order?',
      reasonLabel: 'Select or enter reason',
      customReason: 'Other reason (please specify)',
      confirmCancel: 'Confirm Cancellation',
      cancelButton: 'Cancel',
      orderCancelled: 'Order cancelled successfully'
    },
    urdu: {
      title: 'موجودہ آرڈرز',
      trackOrder: 'آرڈر ٹریک کریں',
      cancelOrder: 'آرڈر منسوخ کریں',
      items: 'اشیاء',
      estimatedDelivery: 'متوقع ڈیلیوری',
      minutes: 'منٹ میں',
      orderId: 'آرڈر',
      noOrders: 'کوئی موجودہ آرڈر نہیں',
      noOrdersDesc: 'آپ کے پاس کوئی آرڈر جاری نہیں ہے',
      cancelTitle: 'آرڈر منسوخ کریں',
      cancelDesc: 'آپ یہ آرڈر کیوں منسوخ کرنا چاہتے ہیں؟',
      reasonLabel: 'وجہ منتخب کریں یا درج کریں',
      customReason: 'دوسری وجہ (براہ کرم وضاحت کریں)',
      confirmCancel: 'منسوخی کی تصدیق کریں',
      cancelButton: 'منسوخ کریں',
      orderCancelled: 'آرڈر کامیابی سے منسوخ ہو گیا'
    }
  };

  const cancelReasons = [
    'Changed my mind',
    'Found a better price elsewhere',
    'Ordered by mistake',
    'Delivery time too long',
    'Want to modify the order'
  ];

  const t = translations[language];

  const handleCancelClick = (orderId: string) => {
    setSelectedOrderId(orderId);
    setShowCancelDialog(true);
  };

  const handleConfirmCancel = () => {
    if (!cancelReason.trim()) {
      toast.error('Please provide a reason for cancellation');
      return;
    }
    
    // Remove the cancelled order
    setOrders(orders.filter(order => order.id !== selectedOrderId));
    setShowCancelDialog(false);
    setCancelReason('');
    toast.success(t.orderCancelled);
  };

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
        {orders.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center">
            <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h2 className="text-gray-600 mb-2">{t.noOrders}</h2>
            <p className="text-sm text-gray-400">{t.noOrdersDesc}</p>
          </div>
        ) : (
          orders.map((order) => (
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

              <div className="flex items-center gap-2 mb-4 p-3 bg-yellow-50 rounded-lg">
                <Clock className="w-5 h-5 text-[#FFD700]" />
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-semibold">{t.estimatedDelivery} {order.estimatedMinutes} {t.minutes}</span>
                  </p>
                  <p className="text-sm text-gray-600">{order.status}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => onNavigate('trackOrder')}
                  className="flex-1 bg-[#FFD700] hover:bg-[#FFD700]/90 text-black rounded-full"
                >
                  {t.trackOrder}
                </Button>
                <Button
                  onClick={() => handleCancelClick(order.id)}
                  variant="outline"
                  className="flex-1 border-red-500 text-red-500 hover:bg-red-50 rounded-full"
                >
                  <X className="w-4 h-4 mr-2" />
                  {t.cancelOrder}
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Cancel Order Dialog */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>{t.cancelTitle}</DialogTitle>
            <DialogDescription>{t.cancelDesc}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label>{t.reasonLabel}</Label>
              <div className="space-y-2 mt-2">
                {cancelReasons.map((reason) => (
                  <button
                    key={reason}
                    onClick={() => setCancelReason(reason)}
                    className={`w-full text-left p-3 rounded-lg border transition-colors ${
                      cancelReason === reason
                        ? 'border-[#FFD700] bg-yellow-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {reason}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="custom-reason">{t.customReason}</Label>
              <Textarea
                id="custom-reason"
                value={cancelReason.includes('Changed') || cancelReason.includes('Found') || cancelReason.includes('Ordered') || cancelReason.includes('Delivery') || cancelReason.includes('Want') ? '' : cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="Type your reason here..."
                className="mt-2"
              />
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => {
                  setShowCancelDialog(false);
                  setCancelReason('');
                }}
                variant="outline"
                className="flex-1 rounded-full"
              >
                {t.cancelButton}
              </Button>
              <Button
                onClick={handleConfirmCancel}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-full"
              >
                {t.confirmCancel}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}