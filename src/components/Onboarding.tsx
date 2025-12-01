import { useState } from 'react';
import { Button } from './ui/button';
import { ChevronRight, ChevronLeft, ShoppingCart, Search, User, Mic } from 'lucide-react';

type Screen = 'signup' | 'login' | 'otp' | 'home' | 'voice' | 'personalization' | 'cart' | 'checkout' | 'category' | 'search' | 'account' | 'voucher';

interface OnboardingProps {
  onComplete: () => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      icon: <Search className="w-16 h-16 text-[#FFD700]" />,
      title: 'Browse & Search',
      description: 'Search for your favorite products and browse through categories easily'
    },
    {
      icon: <ShoppingCart className="w-16 h-16 text-[#FFD700]" />,
      title: 'Add to Cart',
      description: 'Add items to your cart and manage quantities with simple controls'
    },
    {
      icon: <Mic className="w-16 h-16 text-[#FFD700]" />,
      title: 'Voice Control',
      description: 'Use voice commands in Urdu to search and add items to your cart'
    },
    {
      icon: <User className="w-16 h-16 text-[#FFD700]" />,
      title: 'Track Your Orders',
      description: 'Monitor your current orders and view delivery status in real-time'
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const goToStep = (index: number) => {
    setCurrentStep(index);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-between p-6 max-w-md mx-auto">
      {/* Skip button */}
      <div className="w-full flex justify-end">
        <button onClick={handleSkip} className="text-gray-500 hover:text-gray-700">
          Skip
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
        <div className="w-32 h-32 bg-yellow-50 rounded-full flex items-center justify-center">
          {steps[currentStep].icon}
        </div>
        <h2 className="text-2xl">{steps[currentStep].title}</h2>
        <p className="text-gray-600 max-w-sm">
          {steps[currentStep].description}
        </p>
      </div>

      {/* Progress and Navigation */}
      <div className="w-full space-y-6">
        {/* Progress dots */}
        <div className="flex justify-center gap-2">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => goToStep(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentStep
                  ? 'w-8 bg-[#FFD700]'
                  : 'w-2 bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Navigation buttons */}
        <div className="flex gap-3">
          {currentStep > 0 && (
            <Button
              onClick={handleBack}
              variant="outline"
              className="flex-1 rounded-full border-gray-300"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
          )}
          <Button
            onClick={handleNext}
            className={`${currentStep === 0 ? 'w-full' : 'flex-1'} bg-[#FFD700] hover:bg-[#FFD700]/90 text-black rounded-full flex items-center justify-between`}
          >
            <span>{currentStep === steps.length - 1 ? 'Get Started' : 'Next'}</span>
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}