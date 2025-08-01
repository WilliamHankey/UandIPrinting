import React, { createContext, useContext, useState, useMemo } from 'react';
import { urlFor } from '@/lib/sanity';

export interface CartItem {
  id: string;
  title: string;
  image: string | { asset: { _ref: string } };
  category: string;
  price: number;
  quantity?: number;
  specifications?: Record<string, any>;
  basePrice?: number;
}

interface CartContextType {
  cartItems: CartItem[];
  totalPrice: number;
  totalItems: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getImageUrl: (image: string | { asset: { _ref: string } }) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Calculate total price
  const totalPrice = useMemo(() => {
    return items.reduce((total, item) => {
      return total + (item.price * (item.quantity || 1));
    }, 0);
  }, [items]);

  // Calculate total items
  const totalItems = useMemo(() => {
    return items.reduce((total, item) => {
      return total + (item.quantity || 1);
    }, 0);
  }, [items]);

  const getImageUrl = (image: string | { asset: { _ref: string } }) => {
    if (typeof image === 'string') {
      return image;
    }
    if (image?.asset?._ref) {
      return urlFor(image).url();
    }
    return ''; // Fallback empty string or you could use a default image
  };

  const addToCart = (item: CartItem) => {
    setItems((currentItems) => {
      // For specification-based items, we don't merge quantities since each configuration is unique
      if (item.specifications && Object.keys(item.specifications).length > 0) {
        return [...currentItems, { ...item, quantity: 1 }];
      }
      
      // For regular items, merge quantities
      const existingItem = currentItems.find((i) => i.id === item.id);
      if (existingItem) {
        return currentItems.map((i) =>
          i.id === item.id ? { ...i, quantity: (i.quantity || 1) + 1 } : i
        );
      }
      return [...currentItems, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{ 
        cartItems: items, 
        totalPrice, 
        totalItems,
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart, 
        getImageUrl 
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
