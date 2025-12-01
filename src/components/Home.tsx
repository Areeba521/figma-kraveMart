import { Search, Menu, ShoppingCart, Home as HomeIcon, User, Mic, Plus } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';
import { Drawer } from './Drawer';
import { useSettings } from '../contexts/SettingsContext';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';

type Screen = 'signup' | 'login' | 'otp' | 'home' | 'voice' | 'personalization' | 'cart' | 'checkout' | 'category' | 'search';

interface HomeProps {
  onNavigate: (screen: Screen, category?: string) => void;
}

export function Home({ onNavigate }: HomeProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showProductRequest, setShowProductRequest] = useState(false);
  const [productName, setProductName] = useState('');
  const [productDetails, setProductDetails] = useState('');
  const { language } = useSettings();

  const translations = {
    english: {
      search: 'Search for "Fruits"...',
      groceryEssentials: 'Grocery Essentials',
      shopByBrand: 'Shop By Brand',
      dairyEggs: 'Dairy & Eggs',
      bakery: 'Bakery',
      snacks: 'Snacks',
      beverages: 'Beverages',
      meat: 'Meat',
      fruits: 'Fruits',
      vegetables: 'Vegetables',
      milk: 'Milk',
      cheese: 'Cheese',
      yogurt: 'Yogurt',
      bread: 'Bread',
      buns: 'Buns',
      cakes: 'Cakes',
      chips: 'Chips',
      biscuits: 'Biscuits',
      chocolates: 'Chocolates',
      juices: 'Juices',
      softDrinks: 'Soft Drinks',
      water: 'Water',
      dontSeeProduct: "Don't see the product you're looking for?",
      requestProduct: 'Request a Product',
      requestProductTitle: 'Request a Product',
      requestProductDesc: 'Tell us what product you\'d like to see in our store',
      productNameLabel: 'Product Name',
      productDetailsLabel: 'Additional Details (optional)',
      productDetailsPlaceholder: 'Brand preference, size, specific requirements...',
      submit: 'Submit Request',
      cancel: 'Cancel',
      requestSubmitted: 'Request submitted successfully! We\'ll notify you when it\'s available.'
    },
    urdu: {
      search: '"پھل" تلاش کریں...',
      groceryEssentials: 'گروسری کی ضروری اشیاء',
      shopByBrand: 'برانڈ کے لحاظ سے خریداری',
      dairyEggs: 'ڈیری اور انڈے',
      bakery: 'بیکری',
      snacks: 'سنیکس',
      beverages: 'مشروبات',
      meat: 'گوشت',
      fruits: 'پھل',
      vegetables: 'سبزیاں',
      milk: 'دودھ',
      cheese: 'پنیر',
      yogurt: 'دہی',
      bread: 'روٹی',
      buns: 'بن',
      cakes: 'کیک',
      chips: 'چپس',
      biscuits: 'بسکٹ',
      chocolates: 'چاکلیٹ',
      juices: 'جوس',
      softDrinks: 'سافٹ ڈرنکس',
      water: 'پانی',
      dontSeeProduct: 'اپنی مطلوبہ چیز نہیں مل رہی؟',
      requestProduct: 'پروڈکٹ کی درخواست کریں',
      requestProductTitle: 'پروڈکٹ کی درخواست',
      requestProductDesc: 'ہمیں بتائیں کہ آپ کون سی پروڈکٹ دیکھنا چاہتے ہیں',
      productNameLabel: 'پروڈکٹ کا نام',
      productDetailsLabel: 'اضافی تفصیلات (اختیاری)',
      productDetailsPlaceholder: 'برانڈ کی ترجیح، سائز، مخصوص ضروریات...',
      submit: 'درخواست بھیجیں',
      cancel: 'منسوخ کریں',
      requestSubmitted: 'درخواست کامیابی سے بھیج دی گئی! جب دستیاب ہو گی تو آپ کو مطلع کریں گے۔'
    }
  };

  const t = translations[language];

  const categories = [
    { name: t.meat, image: 'https://images.unsplash.com/photo-1704081628926-d64845e7ca93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYXclMjBtZWF0JTIwc3RlYWt8ZW58MXx8fHwxNzYzNzc4OTE4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
    { name: t.fruits, image: 'https://images.unsplash.com/photo-1669999207738-fcdb7103a6f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjBhcHBsZSUyMGZydWl0fGVufDF8fHx8MTc2Mzg1MDIyMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
    { name: t.vegetables, image: 'https://images.unsplash.com/photo-1734989175071-fedc119fb52e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBtaXhlZHxlbnwxfHx8fDE3NjM4ODA0MDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
  ];

  const brands = [
    { name: 'Unilever', logo: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=100' },
    { name: 'Shan', logo: 'https://images.unsplash.com/photo-1599481238640-4c1288750d7a?w=100' },
  ];

  const handleCategoryClick = (categoryName: string) => {
    onNavigate('category', categoryName);
  };

  const handleSubmitRequest = () => {
    if (!productName.trim()) {
      toast.error('Please enter product name');
      return;
    }
    
    // Submit the request (in a real app, this would send to backend)
    toast.success(t.requestSubmitted);
    setShowProductRequest(false);
    setProductName('');
    setProductDetails('');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 max-w-md mx-auto">
      {/* Drawer */}
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} onNavigate={onNavigate} />

      {/* Header */}
      <div className="bg-[#FFD700] p-4 flex items-center justify-between">
        <button onClick={() => setIsDrawerOpen(true)} className="p-2">
          <Menu className="w-6 h-6" />
        </button>
        <button 
          onClick={() => onNavigate('search')}
          className="flex-1 mx-4 bg-white rounded-full px-4 py-2 flex items-center gap-2"
        >
          <Search className="w-5 h-5 text-gray-500" />
          <span className="flex-1 text-left text-gray-500">{t.search}</span>
        </button>
      </div>

      {/* Banner */}
      <div className="p-4">
        <div className="relative rounded-xl overflow-hidden">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1560096142-792fc2baab4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm9jZXJ5JTIwc2FsZSUyMGJhbm5lciUyMGNvbG9yZnVsfGVufDF8fHx8MTc2Mzg4MDQwNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Limited Time Offer"
            className="w-full h-40 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/70 to-transparent p-4 flex items-center">
            <div className="text-white">
              <p className="bg-[#FFD700] text-black px-2 py-1 inline-block mb-2">LEARNMORE</p>
              <h2 className="text-white mb-1">Limited</h2>
              <h2 className="text-white">Time Offer</h2>
              <p className="text-white mt-2">11.11</p>
              <p className="text-white">Salet</p>
            </div>
          </div>
        </div>
      </div>

      {/* Grocery Essentials */}
      <div className="px-4 mb-6">
        <h2 className="mb-4">{t.groceryEssentials}</h2>
        <div className="grid grid-cols-3 gap-4">
          {categories.map((category, index) => (
            <button 
              key={index}
              onClick={() => handleCategoryClick(category.name)}
              className="text-left"
            >
              <div className="bg-white rounded-lg p-4 mb-2">
                <ImageWithFallback
                  src={category.image}
                  alt={category.name}
                  className="w-full h-16 object-cover rounded"
                />
              </div>
              <p className="text-center">{category.name}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Second Row */}
      <div className="px-4 mb-6">
        <div className="grid grid-cols-3 gap-4">
          {categories.map((category, index) => (
            <div key={`row2-${index}`}>
              <div className="bg-white rounded-lg p-4 mb-2">
                <ImageWithFallback
                  src={category.image}
                  alt={category.name}
                  className="w-full h-16 object-cover rounded"
                />
              </div>
              <p className="text-center">{category.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Third Row */}
      <div className="px-4 mb-6">
        <div className="grid grid-cols-3 gap-4">
          {categories.map((category, index) => (
            <div key={`row3-${index}`}>
              <div className="bg-white rounded-lg p-4 mb-2">
                <ImageWithFallback
                  src={category.image}
                  alt={category.name}
                  className="w-full h-16 object-cover rounded"
                />
              </div>
              <p className="text-center">{category.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Shop By Brand */}
      <div className="px-4 mb-6">
        <h2 className="mb-4">{t.shopByBrand}</h2>
        <div className="flex gap-4">
          {brands.map((brand, index) => (
            <div key={index} className="bg-white rounded-lg p-4 w-20 h-20 flex items-center justify-center">
              <ImageWithFallback
                src={brand.logo}
                alt={brand.name}
                className="w-12 h-12 object-contain"
              />
            </div>
          ))}
          <div className="bg-white rounded-lg p-4 w-20 h-20 flex items-center justify-center">
            <div className="w-12 h-12 bg-[#FFD700] rounded-lg flex items-center justify-center">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1599481238640-4c1288750d7a?w=100"
                alt="Nestle"
                className="w-10 h-10 object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Dairy & Eggs */}
      <div className="px-4 mb-6">
        <h2 className="mb-4">{t.dairyEggs}</h2>
        <div className="grid grid-cols-3 gap-4">
          {[
            { name: t.milk, image: 'https://images.unsplash.com/photo-1635714293982-65445548ac42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYWlyeSUyMG1pbGslMjBwcm9kdWN0c3xlbnwxfHx8fDE3NjM4ODE4NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
            { name: t.cheese, image: 'https://images.unsplash.com/photo-1635714293982-65445548ac42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYWlyeSUyMG1pbGslMjBwcm9kdWN0c3xlbnwxfHx8fDE3NjM4ODE4NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
            { name: t.yogurt, image: 'https://images.unsplash.com/photo-1635714293982-65445548ac42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYWlyeSUyMG1pbGslMjBwcm9kdWN0c3xlbnwxfHx8fDE3NjM4ODE4NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
          ].map((item, index) => (
            <div key={index}>
              <div className="bg-white rounded-lg p-4 mb-2">
                <ImageWithFallback
                  src={item.image}
                  alt={item.name}
                  className="w-full h-16 object-cover rounded"
                />
              </div>
              <p className="text-center">{item.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bakery */}
      <div className="px-4 mb-6">
        <h2 className="mb-4">{t.bakery}</h2>
        <div className="grid grid-cols-3 gap-4">
          {[
            { name: t.bread, image: 'https://images.unsplash.com/photo-1674770067314-296af21ad811?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBicmVhZHxlbnwxfHx8fDE3NjM4NjQ1NTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
            { name: t.buns, image: 'https://images.unsplash.com/photo-1674770067314-296af21ad811?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBicmVhZHxlbnwxfHx8fDE3NjM4NjQ1NTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
            { name: t.cakes, image: 'https://images.unsplash.com/photo-1674770067314-296af21ad811?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBicmVhZHxlbnwxfHx8fDE3NjM4NjQ1NTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
          ].map((item, index) => (
            <div key={index}>
              <div className="bg-white rounded-lg p-4 mb-2">
                <ImageWithFallback
                  src={item.image}
                  alt={item.name}
                  className="w-full h-16 object-cover rounded"
                />
              </div>
              <p className="text-center">{item.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Snacks */}
      <div className="px-4 mb-6">
        <h2 className="mb-4">{t.snacks}</h2>
        <div className="grid grid-cols-3 gap-4">
          {[
            { name: t.chips, image: 'https://images.unsplash.com/photo-1734027899096-291063588ab3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbmFja3MlMjBjaGlwc3xlbnwxfHx8fDE3NjM4Mjc2ODF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
            { name: t.biscuits, image: 'https://images.unsplash.com/photo-1734027899096-291063588ab3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbmFja3MlMjBjaGlwc3xlbnwxfHx8fDE3NjM4Mjc2ODF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
            { name: t.chocolates, image: 'https://images.unsplash.com/photo-1734027899096-291063588ab3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbmFja3MlMjBjaGlwc3xlbnwxfHx8fDE3NjM4Mjc2ODF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
          ].map((item, index) => (
            <div key={index}>
              <div className="bg-white rounded-lg p-4 mb-2">
                <ImageWithFallback
                  src={item.image}
                  alt={item.name}
                  className="w-full h-16 object-cover rounded"
                />
              </div>
              <p className="text-center">{item.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Beverages */}
      <div className="px-4 mb-6">
        <h2 className="mb-4">{t.beverages}</h2>
        <div className="grid grid-cols-3 gap-4">
          {[
            { name: t.juices, image: 'https://images.unsplash.com/photo-1652922664558-03d0f2932e58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZXZlcmFnZSUyMGRyaW5rc3xlbnwxfHx8fDE3NjM4ODE4NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
            { name: t.softDrinks, image: 'https://images.unsplash.com/photo-1652922664558-03d0f2932e58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZXZlcmFnZSUyMGRyaW5rc3xlbnwxfHx8fDE3NjM4ODE4NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
            { name: t.water, image: 'https://images.unsplash.com/photo-1652922664558-03d0f2932e58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZXZlcmFnZSUyMGRyaW5rc3xlbnwxfHx8fDE3NjM4ODE4NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
          ].map((item, index) => (
            <div key={index}>
              <div className="bg-white rounded-lg p-4 mb-2">
                <ImageWithFallback
                  src={item.image}
                  alt={item.name}
                  className="w-full h-16 object-cover rounded"
                />
              </div>
              <p className="text-center">{item.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Product Request Section */}
      <div className="px-4 mb-24">
        <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl p-6 border-2 border-dashed border-[#FFD700]">
          <h3 className="mb-2 text-center">{t.dontSeeProduct}</h3>
          <p className="text-sm text-gray-600 text-center mb-4">
            Let us know what you need and we'll try to add it to our inventory
          </p>
          <Button
            onClick={() => setShowProductRequest(true)}
            className="w-full bg-[#FFD700] hover:bg-[#FFD700]/90 text-black rounded-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            {t.requestProduct}
          </Button>
        </div>
      </div>

      {/* Product Request Dialog */}
      <Dialog open={showProductRequest} onOpenChange={setShowProductRequest}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>{t.requestProductTitle}</DialogTitle>
            <DialogDescription>{t.requestProductDesc}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label htmlFor="product-name">{t.productNameLabel}</Label>
              <Input
                id="product-name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="e.g., Organic Honey"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="product-details">{t.productDetailsLabel}</Label>
              <Textarea
                id="product-details"
                value={productDetails}
                onChange={(e) => setProductDetails(e.target.value)}
                placeholder={t.productDetailsPlaceholder}
                className="mt-2"
              />
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => {
                  setShowProductRequest(false);
                  setProductName('');
                  setProductDetails('');
                }}
                variant="outline"
                className="flex-1 rounded-full"
              >
                {t.cancel}
              </Button>
              <Button
                onClick={handleSubmitRequest}
                className="flex-1 bg-[#FFD700] hover:bg-[#FFD700]/90 text-black rounded-full"
              >
                {t.submit}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Voice Button */}
      <button
        onClick={() => onNavigate('voice')}
        className="fixed right-4 bottom-28 bg-[#FFD700] rounded-full p-4 shadow-lg z-50 max-w-md"
      >
        <Mic className="w-6 h-6" />
      </button>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#FFD700] flex justify-around items-center py-4 max-w-md mx-auto">
        <button className="flex flex-col items-center gap-1">
          <div className="bg-white rounded-full p-2">
            <HomeIcon className="w-6 h-6" />
          </div>
        </button>
        <button 
          onClick={() => onNavigate('cart')}
          className="flex flex-col items-center gap-1"
        >
          <div className="bg-white rounded-full p-2">
            <ShoppingCart className="w-6 h-6" />
          </div>
        </button>
        <button 
          onClick={() => onNavigate('account')}
          className="flex flex-col items-center gap-1"
        >
          <div className="bg-white rounded-full p-2">
            <User className="w-6 h-6" />
          </div>
        </button>
      </div>
    </div>
  );
}