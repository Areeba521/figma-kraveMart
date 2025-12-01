import { createContext, useContext, useState, ReactNode } from 'react';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  originalPrice?: number;
  discount?: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  updateQuantity: (id: number, change: number) => void;
  removeFromCart: (id: number) => void;
  getCartTotal: () => number;
  getItemQuantity: (id: number) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: 'Innovative Digestive Original Biscuit( Family Pack)- 1 Piece',
      price: 250,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1722239310662-84a950cfa62d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXNjdWl0JTIwcGFja2FnZSUyMHByb2R1Y3R8ZW58MXx8fHwxNzYzODgxODg3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 2,
      name: 'LU Prince Biscuit',
      price: 80,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400'
    },
    {
      id: 3,
      name: 'Chocolicious',
      price: 260,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=400'
    }
  ]);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      if (existingItem) {
        return prevItems.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, change: number) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity + change }
          : item
      );
      // Remove items with quantity 0 or less
      return updatedItems.filter(item => item.quantity > 0);
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const getCartTotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const getItemQuantity = (id: number) => {
    const item = cartItems.find(i => i.id === id);
    return item ? item.quantity : 0;
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        getCartTotal,
        getItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
