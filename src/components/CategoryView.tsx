import { ChevronLeft, Search, Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { toast } from 'sonner@2.0.3';
import { ShoppingCart, Home as HomeIcon, User } from 'lucide-react';
import { Button } from './ui/button';

type Screen = 'signup' | 'login' | 'otp' | 'home' | 'voice' | 'personalization' | 'cart' | 'checkout' | 'category';

interface CategoryViewProps {
  onNavigate: (screen: Screen) => void;
  category: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  weight: string;
}

export function CategoryView({ onNavigate, category }: CategoryViewProps) {
  const [activeTab, setActiveTab] = useState('Vegetables');
  const [activeSubTab, setActiveSubTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const { addToCart, updateQuantity, getItemQuantity } = useCart();

  const products: Product[] = [
    {
      id: 101,
      name: 'Potatoes (Aalu)',
      price: 68,
      image: 'https://images.unsplash.com/photo-1578385474120-184465704f2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3RhdG8lMjB2ZWdldGFibGV8ZW58MXx8fHwxNzYzODgyNTk5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      weight: '1 KG'
    },
    {
      id: 102,
      name: 'Tomatoes (Timatar)',
      price: 62,
      image: 'https://images.unsplash.com/photo-1700064165267-8fa68ef07167?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjB0b21hdG8lMjBmcmVzaHxlbnwxfHx8fDE3NjM4ODI1OTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      weight: '1 KG'
    },
    {
      id: 103,
      name: 'Onion (Piyaz)',
      price: 93,
      originalPrice: 155,
      discount: 40,
      image: 'https://images.unsplash.com/photo-1729292933757-5e9d9e8d4ead?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjBvbmlvbiUyMHZlZ2V0YWJsZXxlbnwxfHx8fDE3NjM4ODI2MDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      weight: '1 KG'
    },
    {
      id: 104,
      name: 'Carrots (Gajar)',
      price: 45,
      image: 'https://images.unsplash.com/photo-1737402710058-0ce100f79b34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJyb3QlMjB2ZWdldGFibGV8ZW58MXx8fHwxNzYzODgyNjAwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      weight: '500 GM'
    },
    {
      id: 105,
      name: 'Bell Peppers (Shimla Mirch)',
      price: 120,
      image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWxsJTIwcGVwcGVyJTIwY2Fwc2ljdW18ZW58MXx8fHwxNzYzODgyNjI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      weight: '500 GM'
    },
    {
      id: 106,
      name: 'Cucumber (Kheera)',
      price: 35,
      image: 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdWN1bWJlciUyMHZlZ2V0YWJsZXxlbnwxfHx8fDE3NjM4ODI2Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      weight: '500 GM'
    },
    {
      id: 107,
      name: 'Cauliflower (Phool Gobi)',
      price: 55,
      image: 'https://images.unsplash.com/photo-1568584711271-e0d0c8f3f722?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXVsaWZsb3dlciUyMHZlZ2V0YWJsZXxlbnwxfHx8fDE3NjM4ODI2Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      weight: '1 Piece'
    },
    {
      id: 108,
      name: 'Spinach (Palak)',
      price: 28,
      image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGluYWNoJTIwbGVhZnklMjBncmVlbnxlbnwxfHx8fDE3NjM4ODI2Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      weight: '250 GM'
    },
    {
      id: 109,
      name: 'Green Chillies',
      price: 18,
      image: 'https://images.unsplash.com/photo-1583663848850-46af0f85a975?w=400',
      weight: '100 GM'
    },
    {
      id: 110,
      name: 'Ginger (Adrak)',
      price: 42,
      image: 'https://images.unsplash.com/photo-1619176184044-80d7ae46ed14?w=400',
      weight: '250 GM'
    },
  ];

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      originalPrice: product.originalPrice,
      discount: product.discount
    });
    toast(
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <p className="font-semibold">Added to cart!</p>
          <p className="text-sm text-gray-600">{product.name}</p>
        </div>
        <Button
          size="sm"
          onClick={() => onNavigate('cart')}
          className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-black"
        >
          View Cart
        </Button>
      </div>,
      { duration: 3000 }
    );
  };

  const handleUpdateQuantity = (productId: number, change: number, productName: string) => {
    updateQuantity(productId, change);
    if (change > 0) {
      toast(
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <p className="font-semibold">Added to cart!</p>
            <p className="text-sm text-gray-600">{productName}</p>
          </div>
          <Button
            size="sm"
            onClick={() => onNavigate('cart')}
            className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-black"
          >
            View Cart
          </Button>
        </div>,
        { duration: 3000 }
      );
    } else {
      const newQuantity = getItemQuantity(productId) - 1;
      if (newQuantity === 0) {
        toast.error(`${productName} removed from cart`);
      } else {
        toast.success(`Quantity decreased`);
      }
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 max-w-md mx-auto pb-20">
      {/* Header */}
      <div className="bg-[#FFD700] p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <button onClick={() => onNavigate('home')}>
              <ChevronLeft className="w-6 h-6" />
            </button>
            <span>Categories</span>
          </div>
          <button onClick={() => setShowSearch(!showSearch)}>
            <Search className="w-6 h-6" />
          </button>
        </div>

        {/* Search Bar */}
        {showSearch && (
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-full outline-none"
            />
          </div>
        )}

        {/* Main Tabs */}
        <div className="flex gap-2 mb-2">
          {['Flash Deal', 'Fruits & Vegetables', 'Weekend Off'].map((tab) => (
            <button
              key={tab}
              className={`px-3 py-1 rounded text-sm whitespace-nowrap ${
                tab === 'Fruits & Vegetables'
                  ? 'bg-white text-black'
                  : 'text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Sub Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {['Vegetables', 'Exotics', 'Fruits', 'Dry Fruits'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1 rounded-full text-sm whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-[#4CAF50] text-white'
                  : 'bg-white text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="px-4 pt-4 pb-20">
        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.map((product) => {
            const quantity = getItemQuantity(product.id);
            return (
              <div key={product.id} className="bg-white rounded-lg p-3 relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-24 object-cover rounded mb-2"
                />
                <h3 className="text-sm mb-1">{product.name} - {product.weight}</h3>
                <div className="flex items-center justify-between">
                  <div>
                    {product.originalPrice && (
                      <span className="text-xs text-gray-400 line-through mr-1">
                        Rs {product.originalPrice}
                      </span>
                    )}
                    <span className="text-sm">Rs {product.price}</span>
                  </div>
                  {quantity > 0 ? (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleUpdateQuantity(product.id, -1, product.name)}
                        className="bg-gray-200 rounded-full p-1"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-sm">{quantity}</span>
                      <button
                        onClick={() => handleUpdateQuantity(product.id, 1, product.name)}
                        className="bg-[#FFD700] rounded-full p-1"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-[#FFD700] rounded-full p-1.5"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  )}
                </div>
                {product.discount && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded">
                    {product.discount}% off
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#FFD700] flex justify-around items-center py-4 max-w-md mx-auto">
        <button onClick={() => onNavigate('home')} className="flex flex-col items-center gap-1">
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
          onClick={() => onNavigate('personalization')}
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