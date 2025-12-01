import { useState } from 'react';
import { Home } from './components/Home';
import { SignupScreen } from './components/SignupScreen';
import { LoginScreen } from './components/LoginScreen';
import { OTPScreen } from './components/OTPScreen';
import { VoiceControl } from './components/VoiceControl';
import { Personalization } from './components/Personalization';
import { Cart } from './components/Cart';
import { Checkout } from './components/Checkout';
import { CategoryView } from './components/CategoryView';
import { Search } from './components/Search';
import { Account } from './components/Account';
import { Voucher } from './components/Voucher';
import { Onboarding } from './components/Onboarding';
import { TooltipTutorial } from './components/TooltipTutorial';
import { TrackOrder } from './components/TrackOrder';
import { CurrentOrders } from './components/CurrentOrders';
import { PastOrders } from './components/PastOrders';
import { ClarityTracking } from './components/ClarityTracking';
import { CartProvider } from './contexts/CartContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { Toaster } from './components/ui/sonner';

type Screen = 'signup' | 'login' | 'otp' | 'home' | 'voice' | 'personalization' | 'cart' | 'checkout' | 'category' | 'search' | 'account' | 'voucher' | 'onboarding' | 'trackOrder' | 'currentOrders' | 'pastOrders';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('signup');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showTooltipTutorial, setShowTooltipTutorial] = useState(false);

  const handleNavigate = (screen: Screen, category?: string) => {
    if (category) {
      setSelectedCategory(category);
    }
    setCurrentScreen(screen);
  };

  const handleOnboardingComplete = () => {
    setCurrentScreen('home');
    setShowTooltipTutorial(true);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'signup':
        return <SignupScreen onNavigate={handleNavigate} />;
      case 'login':
        return <LoginScreen onNavigate={handleNavigate} onLogin={(phone) => {
          setPhoneNumber(phone);
          setCurrentScreen('otp');
        }} />;
      case 'otp':
        return <OTPScreen phoneNumber={phoneNumber} onVerify={() => setCurrentScreen('home')} onNavigate={handleNavigate} />;
      case 'onboarding':
        return <Onboarding onComplete={handleOnboardingComplete} />;
      case 'home':
        return (
          <>
            <Home onNavigate={handleNavigate} />
            {showTooltipTutorial && (
              <TooltipTutorial onComplete={() => setShowTooltipTutorial(false)} />
            )}
          </>
        );
      case 'voice':
        return <VoiceControl onNavigate={handleNavigate} />;
      case 'personalization':
        return <Personalization onNavigate={handleNavigate} />;
      case 'cart':
        return <Cart onNavigate={handleNavigate} />;
      case 'checkout':
        return <Checkout onNavigate={handleNavigate} />;
      case 'category':
        return <CategoryView onNavigate={handleNavigate} category={selectedCategory} />;
      case 'search':
        return <Search onNavigate={handleNavigate} />;
      case 'account':
        return <Account onNavigate={handleNavigate} />;
      case 'voucher':
        return <Voucher onNavigate={handleNavigate} />;
      case 'trackOrder':
        return <TrackOrder onNavigate={handleNavigate} />;
      case 'currentOrders':
        return <CurrentOrders onNavigate={handleNavigate} />;
      case 'pastOrders':
        return <PastOrders onNavigate={handleNavigate} />;
      default:
        return <SignupScreen onNavigate={handleNavigate} />;
    }
  };

  return (
    <SettingsProvider>
      <CartProvider>
        <ClarityTracking />
        <div className="min-h-screen bg-gray-50">
          {renderScreen()}
        </div>
        <Toaster position="bottom-center" />
      </CartProvider>
    </SettingsProvider>
  );
}