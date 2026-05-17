import { create } from 'zustand';

export type Track = {
  id: string;
  title: string;
  price: string;
  image: string;
  type: 'Beat' | 'Pack' | 'Course';
  bpm?: number;
  genre?: string;
  audioUrl?: string;
};

interface StoreState {
  // Cart State
  cart: Track[];
  isCartOpen: boolean;
  hasOpenedCartThisSession: boolean;
  
  // Cart Actions
  addToCart: (item: Track) => void;
  removeFromCart: (id: string) => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  // Audio State (Preserved for your beats player)
  currentTrack: Track | null;
  isPlaying: boolean;
  setTrack: (track: Track, playlist?: Track[]) => void;
  togglePlay: () => void;
}

export const useStore = create<StoreState>((set, get) => ({
  // Initial State
  cart: [],
  isCartOpen: false,
  hasOpenedCartThisSession: false,
  currentTrack: null,
  isPlaying: false,

  // Enhanced Cart Logic
  addToCart: (item) => set((state) => {
    const isFirstTime = !state.hasOpenedCartThisSession;
    return {
      cart: [...state.cart, item],
      // Only force open if it's the absolute first interaction
      isCartOpen: isFirstTime ? true : state.isCartOpen,
      hasOpenedCartThisSession: true,
    };
  }),
  
  removeFromCart: (id) => set((state) => {
    const newCart = state.cart.filter((item) => item.id !== id);
    return {
      cart: newCart,
      // Auto-close if the cart becomes empty
      isCartOpen: newCart.length === 0 ? false : state.isCartOpen,
    };
  }),

  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  toggleCart: () => set((state) => ({ 
    isCartOpen: state.cart.length > 0 ? !state.isCartOpen : false 
  })),

  // Audio Actions
  setTrack: (track) => set({ currentTrack: track, isPlaying: true }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
}));
