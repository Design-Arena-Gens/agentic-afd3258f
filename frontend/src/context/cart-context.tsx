import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { Cake, CartItem } from '@/types';

type CartContextValue = {
  items: CartItem[];
  cartCount: number;
  subtotal: number;
  addToCart: (payload: { cake: Cake; quantity: number; size?: string; frostingOption?: string; customMessage?: string }) => void;
  updateQuantity: (cakeId: number, quantity: number) => void;
  removeItem: (cakeId: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart: CartContextValue['addToCart'] = ({ cake, quantity, size, frostingOption, customMessage }) => {
    setItems(prev => {
      const existing = prev.find(item => item.cake.id === cake.id);
      if (existing) {
        return prev.map(item =>
          item.cake.id === cake.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          cake,
          quantity,
          size: size ?? cake.sizes?.[0],
          frostingOption: frostingOption ?? cake.frostingOptions?.[0],
          customMessage: customMessage ?? ''
        }
      ];
    });
  };

  const updateQuantity: CartContextValue['updateQuantity'] = (cakeId, quantity) => {
    if (quantity <= 0) {
      removeItem(cakeId);
      return;
    }
    setItems(prev => prev.map(item => (item.cake.id === cakeId ? { ...item, quantity } : item)));
  };

  const removeItem = (cakeId: number) => {
    setItems(prev => prev.filter(item => item.cake.id !== cakeId));
  };

  const clear = () => setItems([]);

  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.cake.price * item.quantity, 0), [items]);
  const cartCount = useMemo(() => items.reduce((count, item) => count + item.quantity, 0), [items]);

  const value = useMemo(
    () => ({
      items,
      cartCount,
      subtotal,
      addToCart,
      updateQuantity,
      removeItem,
      clear
    }),
    [items, cartCount, subtotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

