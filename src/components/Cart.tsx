import { ChevronLeft, Plus, Minus } from "lucide-react";
import { Button } from "./ui/button";
import { useCart } from "../contexts/CartContext";
import { useSettings } from "../contexts/SettingsContext";
import { toast } from "sonner@2.0.3";

type Screen =
  | "signup"
  | "login"
  | "otp"
  | "home"
  | "voice"
  | "personalization"
  | "cart"
  | "checkout"
  | "category"
  | "search"
  | "account"
  | "voucher";

interface CartProps {
  onNavigate: (screen: Screen) => void;
}

export function Cart({ onNavigate }: CartProps) {
  const { cartItems, updateQuantity, getCartTotal } = useCart();
  const { language } = useSettings();

  const translations = {
    english: {
      cart: 'Cart',
      yourCart: 'Your Cart',
      emptyCart: 'Your cart is empty',
      startShopping: 'Start Shopping',
      remaining: 'remaining to avail',
      freeDelivery: 'FREE DELIVERY !',
      proceedToCheckout: 'Proceed to Checkout',
      quantityIncreased: 'Quantity increased',
      quantityDecreased: 'Quantity decreased',
      removedFromCart: 'removed from cart'
    },
    urdu: {
      cart: 'کارٹ',
      yourCart: 'آپ کی کارٹ',
      emptyCart: 'آپ کی کارٹ خالی ہے',
      startShopping: 'خریداری شروع کریں',
      remaining: 'مفت ڈیلیوری کے لیے باقی',
      freeDelivery: 'مفت ڈیلیوری!',
      proceedToCheckout: 'چیک آؤٹ پر جائیں',
      quantityIncreased: 'مقدار بڑھائی گئی',
      quantityDecreased: 'مقدار کم کی گئی',
      removedFromCart: 'کارٹ سے ہٹایا گیا'
    }
  };

  const t = translations[language];

  const itemsTotal = getCartTotal();
  const deliveryFee = itemsTotal > 0 ? 120 : 0;
  const platformCharges = itemsTotal > 0 ? 9 : 0;
  const total = itemsTotal + deliveryFee + platformCharges;
  const remainingForFreeDelivery = Math.max(0, 1000 - itemsTotal);

  const handleUpdateQuantity = (itemId: number, change: number, itemName: string) => {
    const currentQuantity = cartItems.find(i => i.id === itemId)?.quantity || 0;
    updateQuantity(itemId, change);
    
    if (change > 0) {
      toast.success(t.quantityIncreased);
    } else {
      const newQuantity = currentQuantity - 1;
      if (newQuantity === 0) {
        toast.error(`${itemName} ${t.removedFromCart}`);
      } else {
        toast.success(t.quantityDecreased);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 max-w-md mx-auto pb-32">
      {/* Header */}
      <div className="bg-[#FFD700] p-4 flex items-center">
        <button
          onClick={() => onNavigate("home")}
          className="mr-4"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1>{t.cart}</h1>
      </div>

      {/* Cart Items */}
      <div className="p-4">
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center">
            <p className="text-gray-500 mb-4">{t.emptyCart}</p>
            <Button
              onClick={() => onNavigate("home")}
              className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-black"
            >
              {t.startShopping}
            </Button>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-4">
                <h2>{t.yourCart}</h2>
                <div className="bg-green-500 text-white px-3 py-1 rounded-full flex items-center gap-2">
                  <span>~</span>
                  <span>30 min</span>
                </div>
              </div>

              {/* Cart Items List */}
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="mb-1">{item.name}</p>
                      <p className="text-gray-600">
                        Rs {item.price}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleUpdateQuantity(item.id, -1, item.name)}
                        className="bg-gray-200 rounded-full p-1"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleUpdateQuantity(item.id, 1, item.name)}
                        className="bg-[#FFD700] rounded-full p-1"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Free Delivery Progress */}
            {remainingForFreeDelivery > 0 && (
              <div className="bg-white rounded-lg p-4 mb-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border-4 border-[#FFD700] flex items-center justify-center">
                  <div className="w-4 h-4 bg-[#FFD700] rounded-full"></div>
                </div>
                <p>
                  Rs {remainingForFreeDelivery} {t.remaining}{' '}
                  {t.freeDelivery}
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Bottom Checkout Bar */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t max-w-md mx-auto">
          <div className="p-4">
            <Button
              onClick={() => onNavigate("checkout")}
              className="w-full bg-[#FFD700] hover:bg-[#FFD700]/90 text-black rounded-full flex items-center justify-between"
            >
              <span>{t.proceedToCheckout}</span>
              <span>Rs {total}</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}