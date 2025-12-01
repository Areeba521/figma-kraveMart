import { ChevronLeft, ChevronRight, MapPin, Wallet, CreditCard, Tag, Settings, User, ShoppingBag, History, Edit2, Check, X } from 'lucide-react';
import { useState } from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { toast } from 'sonner@2.0.3';

type Screen = 'signup' | 'login' | 'otp' | 'home' | 'voice' | 'personalization' | 'cart' | 'checkout' | 'category' | 'search' | 'account' | 'voucher' | 'currentOrders' | 'pastOrders';

interface AccountProps {
  onNavigate: (screen: Screen) => void;
}

export function Account({ onNavigate }: AccountProps) {
  const { language, userProfile, setUserProfile } = useSettings();
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editedName, setEditedName] = useState(userProfile.name);
  const [editedEmail, setEditedEmail] = useState(userProfile.email);
  const [editedPhone, setEditedPhone] = useState(userProfile.phone);

  const handleSaveProfile = () => {
    if (!editedName.trim() || !editedEmail.trim() || !editedPhone.trim()) {
      toast.error('All fields are required');
      return;
    }
    setUserProfile({
      name: editedName,
      email: editedEmail,
      phone: editedPhone
    });
    setIsEditingProfile(false);
    toast.success('Profile updated successfully');
  };

  const handleCancelEdit = () => {
    setEditedName(userProfile.name);
    setEditedEmail(userProfile.email);
    setEditedPhone(userProfile.phone);
    setIsEditingProfile(false);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only letters and spaces
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
    setEditedName(value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only numbers
    const value = e.target.value.replace(/[^0-9]/g, '');
    setEditedPhone(value);
  };

  const translations = {
    english: {
      title: 'My Account',
      personalInfo: 'Personal Information',
      addresses: 'Delivery Addresses',
      addAddress: 'Add New Address',
      wallet: 'My Wallet',
      walletBalance: 'Balance',
      paymentMethods: 'Payment Methods',
      addPayment: 'Add New Card',
      vouchers: 'My Vouchers',
      viewAll: 'View All',
      settings: 'Settings',
      home: 'Home',
      work: 'Work',
      other: 'Other',
      name: 'Name',
      email: 'Email',
      phone: 'Phone Number',
      currentOrders: 'Current Orders',
      pastOrders: 'Past Orders',
      edit: 'Edit',
      save: 'Save',
      cancel: 'Cancel'
    },
    urdu: {
      title: 'میرا اکاؤنٹ',
      personalInfo: 'ذاتی معلومات',
      addresses: 'ڈیلیوری ایڈریسز',
      addAddress: 'نیا ایڈریس شامل کریں',
      wallet: 'میرا بٹوہ',
      walletBalance: 'بیلنس',
      paymentMethods: 'ادائیگی کے طریقے',
      addPayment: 'نیا کارڈ شامل کریں',
      vouchers: 'میرے واؤچرز',
      viewAll: 'سب دیکھیں',
      settings: 'ترتیبات',
      home: 'گھر',
      work: 'دفتر',
      other: 'دیگر',
      name: 'نام',
      email: 'ای میل',
      phone: 'فون نمبر',
      currentOrders: 'موجودہ آرڈرز',
      pastOrders: 'پچھلے آرڈرز',
      edit: 'ترمیم',
      save: 'محفوظ کریں',
      cancel: 'منسوخ'
    }
  };

  const t = translations[language];

  const addresses = [
    {
      id: 0,
      type: 'home',
      label: t.home,
      address: 'House #123, Street 45, F-7, Islamabad'
    },
    {
      id: 1,
      type: 'work',
      label: t.work,
      address: 'Office Building, Blue Area, Islamabad'
    },
    {
      id: 2,
      type: 'other',
      label: t.other,
      address: 'Apartment 5B, G-11, Islamabad'
    }
  ];

  const paymentMethods = [
    { last4: '4242', type: 'Visa', expiry: '12/25' },
    { last4: '8888', type: 'Mastercard', expiry: '08/26' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 max-w-md mx-auto pb-20">
      {/* Header */}
      <div className="bg-[#FFD700] p-4 flex items-center">
        <button onClick={() => onNavigate('home')} className="mr-4">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="flex-1">{t.title}</h1>
      </div>

      <div className="p-4 space-y-4">
        {/* Personal Information */}
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <h2>{t.personalInfo}</h2>
            </div>
            {!isEditingProfile ? (
              <button
                onClick={() => setIsEditingProfile(true)}
                className="text-[#FFD700] flex items-center gap-1"
              >
                <Edit2 className="w-4 h-4" />
                <span className="text-sm">{t.edit}</span>
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleSaveProfile}
                  className="text-green-600 flex items-center gap-1"
                >
                  <Check className="w-4 h-4" />
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="text-red-600 flex items-center gap-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
          
          {isEditingProfile ? (
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-600">{t.name}</label>
                <Input
                  value={editedName}
                  onChange={handleNameChange}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">{t.email}</label>
                <Input
                  value={editedEmail}
                  onChange={(e) => setEditedEmail(e.target.value)}
                  type="email"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">{t.phone}</label>
                <Input
                  value={editedPhone}
                  onChange={handlePhoneChange}
                  type="tel"
                  className="mt-1"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-600">{t.name}</span>
                <span>{userProfile.name || 'Not set'}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-600">{t.email}</span>
                <span>{userProfile.email || 'Not set'}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-600">{t.phone}</span>
                <span>{userProfile.phone || 'Not set'}</span>
              </div>
            </div>
          )}
        </div>

        {/* Current Orders */}
        <button 
          onClick={() => onNavigate('currentOrders')}
          className="bg-white rounded-lg p-4 w-full"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              <h2>{t.currentOrders}</h2>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </button>

        {/* Past Orders */}
        <button 
          onClick={() => onNavigate('pastOrders')}
          className="bg-white rounded-lg p-4 w-full"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <History className="w-5 h-5" />
              <h2>{t.pastOrders}</h2>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </button>

        {/* Delivery Addresses */}
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <h2>{t.addresses}</h2>
            </div>
          </div>

          <div className="space-y-3">
            {addresses.map((address) => (
              <button
                key={address.id}
                onClick={() => setSelectedAddress(address.id)}
                className={`w-full text-left p-3 rounded-lg border-2 transition-colors ${
                  selectedAddress === address.id
                    ? 'border-[#FFD700] bg-yellow-50'
                    : 'border-gray-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 mt-1 flex items-center justify-center ${
                    selectedAddress === address.id ? 'border-[#FFD700]' : 'border-gray-300'
                  }`}>
                    {selectedAddress === address.id && (
                      <div className="w-3 h-3 bg-[#FFD700] rounded-full" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="mb-1">{address.label}</p>
                    <p className="text-gray-600 text-sm">{address.address}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <button className="w-full mt-3 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-[#FFD700] hover:text-black transition-colors">
            + {t.addAddress}
          </button>
        </div>

        {/* Wallet */}
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wallet className="w-5 h-5" />
              <h2>{t.wallet}</h2>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
          <div className="mt-3 bg-gradient-to-r from-[#FFD700] to-yellow-500 rounded-lg p-4">
            <p className="text-sm opacity-80">{t.walletBalance}</p>
            <p className="text-2xl mt-1">Rs 1,250</p>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              <h2>{t.paymentMethods}</h2>
            </div>
          </div>

          <div className="space-y-3">
            {paymentMethods.map((method, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 border rounded-lg"
              >
                <div className="w-12 h-8 bg-gradient-to-br from-blue-600 to-blue-400 rounded flex items-center justify-center text-white text-xs">
                  {method.type}
                </div>
                <div className="flex-1">
                  <p>•••• {method.last4}</p>
                  <p className="text-sm text-gray-500">Expires {method.expiry}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            ))}
          </div>

          <button className="w-full mt-3 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-[#FFD700] hover:text-black transition-colors">
            + {t.addPayment}
          </button>
        </div>

        {/* Vouchers */}
        <button 
          onClick={() => onNavigate('voucher')}
          className="bg-white rounded-lg p-4 w-full"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Tag className="w-5 h-5" />
              <h2>{t.vouchers}</h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">{t.viewAll}</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </button>

        {/* Settings */}
        <button 
          onClick={() => onNavigate('personalization')}
          className="bg-white rounded-lg p-4 w-full"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              <h2>{t.settings}</h2>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </button>
      </div>
    </div>
  );
}