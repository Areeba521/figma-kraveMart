import { useState } from 'react';
import { Button } from './ui/button';
import { X } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

interface TooltipTutorialProps {
  onComplete: () => void;
}

export function TooltipTutorial({ onComplete }: TooltipTutorialProps) {
  const [currentTooltip, setCurrentTooltip] = useState(0);
  const { language } = useSettings();

  const tooltips = [
    {
      id: 'search',
      title: language === 'urdu' ? 'پروڈکٹس تلاش کریں' : 'Search Products',
      description: language === 'urdu' 
        ? 'یہاں کلک کر کے آپ کسی بھی پروڈکٹ کو نام، کیٹیگری یا برانڈ سے تلاش کر سکتے ہیں۔ تلاش کے نتائج میں آپ فلٹر لگا سکتے ہیں اور براہ راست کارٹ میں شامل کر سکتے ہیں۔'
        : 'Click here to search for any product by name, category, or brand. You can filter results and add items directly to cart from search results.',
      position: { top: '80px', left: '50%', transform: 'translateX(-50%)' },
      arrowPosition: 'top'
    },
    {
      id: 'categories',
      title: language === 'urdu' ? 'کیٹیگریز براؤز کریں' : 'Browse Categories',
      description: language === 'urdu'
        ? 'گوشت، پھل، سبزیاں، ڈیری اور دیگر کیٹیگریز میں سے کسی پر بھی ٹیپ کریں۔ ہر کیٹیگری میں آپ کو مختلف پروڈکٹس ملیں گی جن کو آپ اپنے کارٹ میں شامل کر سکتے ہیں۔'
        : 'Tap on any category like Meat, Fruits, Vegetables, Dairy, and more. Each category shows all available products that you can add to your cart.',
      position: { top: '280px', left: '50%', transform: 'translateX(-50%)' },
      arrowPosition: 'top'
    },
    {
      id: 'voice',
      title: language === 'urdu' ? 'آواز سے کنٹرول' : 'Voice Control',
      description: language === 'urdu'
        ? 'اس بٹن پر دبائیں اور اردو میں بولیں جیسے "ایک کلو آم کارٹ میں ڈالیں" یا "گوشت دکھائیں"۔ آپ آواز سے پروڈکٹس تلاش کر سکتے ہیں، کارٹ میں شامل کر سکتے ہیں اور آرڈر کی تصدیق کر سکتے ہیں۔'
        : 'Press this button and speak in Urdu like "ek kilo aam cart mein dalen" or "gosht dikhayein". You can search products, add to cart, and confirm orders using voice commands only.',
      position: { bottom: '140px', right: '20px' },
      arrowPosition: 'bottom-right'
    },
    {
      id: 'cart',
      title: language === 'urdu' ? 'آپ کی کارٹ' : 'Your Cart',
      description: language === 'urdu'
        ? 'یہاں سے اپنی کارٹ دیکھیں۔ آپ تعداد بڑھا یا گھٹا سکتے ہیں، اشیاء ہٹا سکتے ہیں اور چیک آؤٹ کر سکتے ہیں۔ کارٹ میں قیمت کی مکمل تفصیل اور ڈیلیوری کی معلومات ملتی ہیں۔'
        : 'View your shopping cart here. You can increase/decrease quantities, remove items, and proceed to checkout. Cart shows price breakdown and delivery details.',
      position: { bottom: '100px', left: '50%', transform: 'translateX(-50%)' },
      arrowPosition: 'bottom'
    },
    {
      id: 'personalization',
      title: language === 'urdu' ? 'ذاتی ترتیبات' : 'Personalization',
      description: language === 'urdu'
        ? 'پروفائل میں جائیں اور ترتیبات کو اپنی پسند کے مطابق بنائیں: تھیم تبدیل کریں (روشن، تاریک، رنگ اندھا)، زبان (اردو/انگریزی)، فونٹ کا سائز اور آئیکن کا سائز۔ یہ تبدیلیاں پوری ایپ میں لاگو ہوں گی۔'
        : 'Go to Profile to customize settings: change theme (light, dark, colorblind), language (Urdu/English), font size, and icon size. These settings apply across the entire app.',
      position: { bottom: '100px', right: '30px' },
      arrowPosition: 'bottom-right'
    }
  ];

  const handleNext = () => {
    if (currentTooltip < tooltips.length - 1) {
      setCurrentTooltip(currentTooltip + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentTooltip > 0) {
      setCurrentTooltip(currentTooltip - 1);
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const tooltip = tooltips[currentTooltip];

  return (
    <div className="fixed inset-0 z-50 max-w-md mx-auto">
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-black/70" onClick={handleSkip} />

      {/* Highlight spot for the current element */}
      {tooltip.id === 'search' && (
        <div 
          className="absolute top-4 left-4 right-4 h-16 rounded-full border-[6px] border-[#FFD700] pointer-events-none"
          style={{ boxShadow: '0 0 0 2000px rgba(0,0,0,0.7)' }}
        />
      )}
      {tooltip.id === 'categories' && (
        <div 
          className="absolute left-4 right-4 rounded-xl border-[6px] border-[#FFD700] pointer-events-none"
          style={{ top: '220px', height: '140px', boxShadow: '0 0 0 2000px rgba(0,0,0,0.7)' }}
        />
      )}
      {tooltip.id === 'voice' && (
        <div 
          className="absolute right-4 bottom-28 w-20 h-20 rounded-full border-[6px] border-[#FFD700] pointer-events-none"
          style={{ boxShadow: '0 0 0 2000px rgba(0,0,0,0.7)', transform: 'translate(2px, 2px)' }}
        />
      )}
      {tooltip.id === 'cart' && (
        <div 
          className="absolute bottom-4 w-20 h-20 rounded-full border-[6px] border-[#FFD700] pointer-events-none"
          style={{ left: '50%', transform: 'translate(-50%, 2px)', boxShadow: '0 0 0 2000px rgba(0,0,0,0.7)' }}
        />
      )}
      {tooltip.id === 'personalization' && (
        <div 
          className="absolute bottom-4 right-4 w-20 h-20 rounded-full border-[6px] border-[#FFD700] pointer-events-none"
          style={{ boxShadow: '0 0 0 2000px rgba(0,0,0,0.7)', transform: 'translate(2px, 2px)' }}
        />
      )}

      {/* Tooltip */}
      <div
        className="absolute bg-white rounded-lg p-4 shadow-xl w-[280px]"
        style={tooltip.position}
      >
        {/* Arrow */}
        <div
          className={`absolute w-0 h-0 border-l-8 border-r-8 border-transparent ${
            tooltip.arrowPosition === 'top'
              ? '-top-2 left-1/2 -translate-x-1/2 border-b-8 border-b-white'
              : tooltip.arrowPosition === 'bottom'
              ? '-bottom-2 left-1/2 -translate-x-1/2 border-t-8 border-t-white'
              : tooltip.arrowPosition === 'bottom-right'
              ? '-bottom-2 right-8 border-t-8 border-t-white'
              : '-bottom-2 left-1/2 -translate-x-1/2 border-t-8 border-t-white'
          }`}
        />

        <div className="space-y-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className={`${language === 'urdu' ? 'text-right' : ''}`}>{tooltip.title}</h3>
            <button onClick={handleSkip} className="text-gray-400 hover:text-gray-600 shrink-0">
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className={`text-sm text-gray-600 ${language === 'urdu' ? 'text-right' : ''}`}>
            {tooltip.description}
          </p>

          {/* Progress indicator */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex gap-1">
              {tooltips.map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 w-1.5 rounded-full ${
                    index === currentTooltip ? 'bg-[#FFD700]' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              {currentTooltip > 0 && (
                <Button
                  onClick={handleBack}
                  variant="ghost"
                  size="sm"
                  className="text-xs"
                >
                  {language === 'urdu' ? 'پیچھے' : 'Back'}
                </Button>
              )}
              <Button
                onClick={handleNext}
                size="sm"
                className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-black text-xs"
              >
                {currentTooltip === tooltips.length - 1 
                  ? (language === 'urdu' ? 'سمجھ آ گئی!' : 'Got it!') 
                  : (language === 'urdu' ? 'اگلا' : 'Next')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}