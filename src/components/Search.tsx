import { useState } from 'react';
import { ChevronLeft, Search as SearchIcon, SlidersHorizontal, Plus, Minus } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useCart } from '../contexts/CartContext';
import { toast } from 'sonner@2.0.3';
import { Slider } from './ui/slider';
import { Checkbox } from './ui/checkbox';
import { Button } from './ui/button';

type Screen = 'signup' | 'login' | 'otp' | 'home' | 'voice' | 'personalization' | 'cart' | 'checkout' | 'category' | 'search';

interface SearchProps {
  onNavigate: (screen: Screen) => void;
}

const allProducts = [
  { id: 1, name: 'Chicken Breast', category: 'Meat', price: 299, image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=200', rating: 5, vegan: false },
  { id: 2, name: 'Japanese Kobe Beef', category: 'Meat', price: 1999, image: 'https://images.unsplash.com/photo-1588347818036-8fc373ea3c27?w=200', rating: 5, vegan: false },
  { id: 3, name: 'Salted Egg', category: 'Dairy', price: 150, image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=200', rating: 4, vegan: false },
  { id: 4, name: 'Vegan-Friendly Milk', category: 'Dairy', price: 180, image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200', rating: 5, vegan: true },
  { id: 5, name: 'Zero Sugar Soda', category: 'Beverages', price: 120, image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=200', rating: 4, vegan: true },
  { id: 6, name: 'Fructose-Free Syrup', category: 'Beverages', price: 250, image: 'https://images.unsplash.com/photo-1523260578934-c4b6157fceb1?w=200', rating: 3, vegan: true },
  { id: 7, name: 'Red Apple', category: 'Fruits', price: 199, image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=200', rating: 5, vegan: true },
  { id: 8, name: 'Orange', category: 'Fruits', price: 149, image: 'https://images.unsplash.com/photo-1580052614034-c55d20bfee3b?w=200', rating: 4, vegan: true },
  { id: 9, name: 'Banana', category: 'Fruits', price: 89, image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=200', rating: 5, vegan: true },
  { id: 10, name: 'Tomato', category: 'Vegetables', price: 99, image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=200', rating: 4, vegan: true },
  { id: 11, name: 'Carrot', category: 'Vegetables', price: 79, image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=200', rating: 5, vegan: true },
  { id: 12, name: 'Potato', category: 'Vegetables', price: 59, image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=200', rating: 4, vegan: true },
];

export function Search({ onNavigate }: SearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showFilter, setShowFilter] = useState(false);
  const [priceRange, setPriceRange] = useState([20, 248]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [veganOnly, setVeganOnly] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>(['Chicken Breast', 'Japanese Kobe Beef', 'Salted Egg']);
  const { addToCart, updateQuantity, getItemQuantity } = useCart();

  const categories = ['Fruits', 'Vegetables', 'Dairy', 'Meat', 'Beverages'];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query && !recentSearches.includes(query)) {
      setRecentSearches([query, ...recentSearches.slice(0, 4)]);
    }
  };

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const toggleRating = (rating: number) => {
    if (selectedRatings.includes(rating)) {
      setSelectedRatings(selectedRatings.filter(r => r !== rating));
    } else {
      setSelectedRatings([...selectedRatings, rating]);
    }
  };

  const applyFilters = () => {
    setShowFilter(false);
  };

  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesRating = selectedRatings.length === 0 || selectedRatings.includes(product.rating);
    const matchesVegan = !veganOnly || product.vegan;
    
    return matchesSearch && matchesCategory && matchesPrice && matchesRating && matchesVegan;
  });

  const trendingItems = [
    'Vegan-Friendly Milk',
    'Zero Sugar Soda',
    'Fructose-Free Syrup'
  ];

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image
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

  return (
    <div className="min-h-screen bg-gray-50 max-w-md mx-auto pb-20">
      {/* Header */}
      <div className="bg-white p-4 flex items-center gap-3 border-b">
        <button onClick={() => onNavigate('home')} className="p-2">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="flex-1">Search</h1>
      </div>

      {/* Search Bar */}
      <div className="p-4 bg-white">
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-gray-100 rounded-full px-4 py-2 flex items-center gap-2">
            <SearchIcon className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search anything"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="flex-1 bg-transparent outline-none"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
          <button
            onClick={() => setShowFilter(true)}
            className="px-4 py-2 rounded-full bg-white border flex items-center gap-2 whitespace-nowrap"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filter
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                selectedCategories.includes(category)
                  ? 'bg-[#FFD700] text-black'
                  : 'bg-white border'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {searchQuery === '' ? (
        <div className="p-4 space-y-6">
          {/* Trending Items */}
          <div>
            <h2 className="mb-3">Trending Items</h2>
            <div className="space-y-2">
              {trendingItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleSearch(item)}
                  className="flex items-center gap-3 w-full text-left"
                >
                  <SearchIcon className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">{item}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Recent Searches */}
          <div>
            <h2 className="mb-3">Recent Searches</h2>
            <div className="space-y-2">
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleSearch(search)}
                  className="flex items-center gap-3 w-full text-left"
                >
                  <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                    <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-gray-600">{search}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4">
          <h2 className="mb-4">Search Results ({filteredProducts.length})</h2>
          <div className="grid grid-cols-2 gap-4">
            {filteredProducts.map((product) => {
              const quantity = getItemQuantity(product.id);
              return (
                <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-sm">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-3">
                    <h3 className="mb-1">{product.name}</h3>
                    <p className="text-gray-500 mb-2">Rs {product.price}</p>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < product.rating ? 'text-yellow-400' : 'text-gray-300'}>★</span>
                      ))}
                    </div>
                    {quantity > 0 ? (
                      <div className="flex items-center justify-center gap-2 bg-gray-50 rounded py-2">
                        <button
                          onClick={() => handleUpdateQuantity(product.id, -1, product.name)}
                          className="bg-gray-200 rounded-full p-1.5"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-semibold">{quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(product.id, 1, product.name)}
                          className="bg-[#FFD700] rounded-full p-1.5"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-full bg-[#FFD700] py-2 rounded"
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Filter Modal */}
      {showFilter && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end max-w-md mx-auto">
          <div className="bg-white w-full rounded-t-3xl p-6 space-y-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h2>Sort & Filter</h2>
              <button onClick={() => setShowFilter(false)}>
                <ChevronLeft className="w-6 h-6" />
              </button>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="mb-3">Price Range</h3>
              <div className="flex justify-between mb-2">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                min={20}
                max={248}
                step={1}
                className="w-full"
              />
            </div>

            {/* Ratings */}
            <div>
              <h3 className="mb-3">Ratings</h3>
              <div className="flex gap-3">
                {[5, 4, 3].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => toggleRating(rating)}
                    className={`px-4 py-2 rounded ${
                      selectedRatings.includes(rating)
                        ? 'bg-[#FFD700]'
                        : 'bg-gray-100'
                    }`}
                  >
                    {rating} Stars
                  </button>
                ))}
              </div>
            </div>

            {/* Vegan Friendly */}
            <div>
              <h3 className="mb-3">Vegan Friendly</h3>
              <div className="flex items-center gap-3">
                <Checkbox
                  id="vegan-yes"
                  checked={veganOnly}
                  onCheckedChange={(checked) => setVeganOnly(checked as boolean)}
                />
                <label htmlFor="vegan-yes">Yes</label>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <Checkbox
                  id="vegan-no"
                  checked={!veganOnly}
                  onCheckedChange={(checked) => setVeganOnly(!(checked as boolean))}
                />
                <label htmlFor="vegan-no">No</label>
              </div>
            </div>

            {/* Apply Button */}
            <button
              onClick={applyFilters}
              className="w-full bg-[#FFD700] py-3 rounded-full"
            >
              Apply Filter
            </button>
          </div>
        </div>
      )}
    </div>
  );
}