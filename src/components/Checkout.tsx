import { ChevronLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { useCart } from '../contexts/CartContext';
import { useSettings } from '../contexts/SettingsContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

type Screen = 'signup' | 'login' | 'otp' | 'home' | 'voice' | 'personalization' | 'cart' | 'checkout' | 'trackOrder' | 'currentOrders';

interface CheckoutProps {
  onNavigate: (screen: Screen) => void;
}

export function Checkout({ onNavigate }: CheckoutProps) {
  const { userProfile } = useSettings();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('H# 225- C, Gulzar 4 millenium mall, 22-B Street Phase 2');
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const [voucherCode, setVoucherCode] = useState('');
  const [autofillFromLastOrder, setAutofillFromLastOrder] = useState(false);
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  
  const { getCartTotal } = useCart();

  // Pre-fill user information from profile
  useEffect(() => {
    if (userProfile.name) setName(userProfile.name);
    if (userProfile.email) setEmail(userProfile.email);
    if (userProfile.phone) setPhone(userProfile.phone);
  }, [userProfile]);

  const itemsTotal = getCartTotal();
  const deliveryFee = 120;
  const platformCharges = 9;
  const total = itemsTotal + deliveryFee + platformCharges;

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only letters and spaces
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
    setName(value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only numbers
    const value = e.target.value.replace(/[^0-9]/g, '');
    setPhone(value);
  };

  const handleAutofillChange = (checked: boolean) => {
    setAutofillFromLastOrder(checked);
    if (checked) {
      // Fill with dummy data from "last order"
      setName('Ahmed Khan');
      setEmail('ahmed.khan@example.com');
      setPhone('03001234567');
      setAddress('H# 225- C, Gulzar 4 millenium mall, 22-B Street Phase 2');
      setPaymentMethod('Cash on Delivery');
    } else {
      // Restore to user profile data or clear
      setName(userProfile.name || '');
      setEmail(userProfile.email || '');
      setPhone(userProfile.phone || '');
      setAddress('H# 225- C, Gulzar 4 millenium mall, 22-B Street Phase 2');
      setPaymentMethod('Cash on Delivery');
    }
  };

  const handlePlaceOrder = () => {
    setShowOrderSuccess(true);
  };

  const handleGoHome = () => {
    setShowOrderSuccess(false);
    onNavigate('home');
  };

  const handleTrackDelivery = () => {
    setShowOrderSuccess(false);
    onNavigate('trackOrder');
  };

  return (
    <div className="min-h-screen bg-gray-50 max-w-md mx-auto pb-32">
      {/* Header */}
      <div className="bg-[#FFD700] p-4 flex items-center">
        <button onClick={() => onNavigate('cart')} className="mr-4">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1>Checkout</h1>
      </div>

      <div className="p-4 space-y-6">
        {/* Autofill from Last Order */}
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center gap-2">
            <Checkbox
              id="autofill"
              checked={autofillFromLastOrder}
              onCheckedChange={handleAutofillChange}
            />
            <Label htmlFor="autofill" className="cursor-pointer">
              Autofill from last order
            </Label>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white rounded-lg p-4">
          <h2 className="mb-4">Personal Information</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-gray-600">Name *</Label>
              <Input
                id="name"
                placeholder="Enter Name here"
                value={name}
                onChange={handleNameChange}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-gray-600">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter Email here"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="phone" className="text-gray-600">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter Phone Number here"
                value={phone}
                onChange={handlePhoneChange}
                className="mt-1"
              />
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <Label className="text-gray-600">Address *</Label>
            <button className="text-[#FFD700]">Change address</button>
          </div>
          <Input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-1"
          />
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <Label className="text-gray-600">Payment Method *</Label>
            <button className="text-[#FFD700]">Payment options</button>
          </div>
          <Input
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="mt-1"
          />
        </div>

        {/* Voucher Code */}
        <div className="bg-white rounded-lg p-4">
          <Label className="mb-4 block">Voucher Code</Label>
          <div className="flex gap-2">
            <Input
              placeholder="Enter Code Here"
              value={voucherCode}
              onChange={(e) => setVoucherCode(e.target.value)}
              className="flex-1"
            />
            <Button className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-black px-6">
              Apply
            </Button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg p-4">
          <h2 className="mb-4">Order Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Item(s) Total</span>
              <span>{itemsTotal}.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery Fee</span>
              <span>{deliveryFee}.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Platform Charges</span>
              <span>{platformCharges}.0</span>
            </div>
            <div className="border-t pt-2 mt-2 flex justify-between">
              <span>Total</span>
              <span>{total}.0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Place Order Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t max-w-md mx-auto">
        <div className="p-4">
          <Button
            onClick={handlePlaceOrder}
            className="w-full bg-[#FFD700] hover:bg-[#FFD700]/90 text-black rounded-full flex items-center justify-between"
          >
            <span>Place Order</span>
            <span>Rs {total}</span>
          </Button>
        </div>
      </div>

      {/* Order Success Dialog */}
      <Dialog open={showOrderSuccess} onOpenChange={setShowOrderSuccess}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <DialogTitle className="text-center text-xl">Order Placed Successfully!</DialogTitle>
            <DialogDescription className="text-center">
              Your order has been confirmed and will be delivered soon.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 mt-4">
            <Button
              onClick={handleTrackDelivery}
              className="w-full bg-[#FFD700] hover:bg-[#FFD700]/90 text-black rounded-full"
            >
              Track Delivery
            </Button>
            <Button
              onClick={handleGoHome}
              variant="outline"
              className="w-full border-gray-300 rounded-full"
            >
              Return to Home
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}