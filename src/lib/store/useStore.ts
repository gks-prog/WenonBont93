import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Track = {
  id: string;
  title: string;
  price: string;
  image?: string; // Image is now expected
  type: 'Beat' | 'Pack' | 'Course';
  bpm?: number;
  genre?: string;
  audioUrl?: string;
  quantity?: number;
};

interface StoreState {
  cart: Track[];
  isCartOpen: boolean;
  toastMessage: string | null; 
  addToCart: (item: Track) => void;
  removeFromCart: (id: string) => void;
  openCart: () => void;
  closeCart: () => void;
  clearToast: () => void; 
}

// We wrap the store in 'persist' to permanently save cart data in localStorage
export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      cart: [],
      isCartOpen: false,
      toastMessage: null,

      addToCart: (item) => set((state) => {
        const existingItem = state.cart.find((i) => i.id === item.id);
        const newCart = existingItem 
          ? state.cart.map((i) => i.id === item.id ? { ...i, quantity: (i.quantity || 1) + 1 } : i)
          : [...state.cart, { ...item, quantity: 1 }];

        if (state.toastMessage) clearTimeout((window as any).toastTimer);
        (window as any).toastTimer = setTimeout(() => { get().clearToast(); }, 3000);

        return {
          cart: newCart,
          isCartOpen: true, // Auto-open cart when item added
          toastMessage: `${item.title} added to Arsenal`,
        };
      }),
      
      removeFromCart: (id) => set((state) => ({
        cart: state.cart.filter((item) => item.id !== id),
      })),

      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      clearToast: () => set({ toastMessage: null }),
    }),
    {
      name: 'wenon-bont-storage', // The secret key saved in the browser
      partialize: (state) => ({ cart: state.cart }), // Only save the cart items, not UI state like isCartOpen
    }
  )
);
