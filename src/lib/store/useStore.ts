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

  // Audio State
  currentTrack: Track | null;
  isPlaying: boolean;
  playlist: Track[];

  // Audio Actions
  setTrack: (track: Track, newPlaylist?: Track[]) => void;
  togglePlay: () => void;
  stopPlayer: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
}

export const useStore = create<StoreState>((set, get) => ({
  // Initial State
  cart: [],
  isCartOpen: false,
  hasOpenedCartThisSession: false,
  currentTrack: null,
  isPlaying: false,
  playlist: [],

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
  setTrack: (track, newPlaylist) => set((state) => ({ 
    currentTrack: track, 
    isPlaying: true,
    playlist: newPlaylist || state.playlist
  })),
  
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  
  stopPlayer: () => set({ currentTrack: null, isPlaying: false }),
  
  nextTrack: () => set((state) => {
    if (!state.currentTrack || state.playlist.length === 0) return state;
    const currentIndex = state.playlist.findIndex(t => t.id === state.currentTrack?.id);
    const nextIndex = (currentIndex + 1) % state.playlist.length;
    return { currentTrack: state.playlist[nextIndex], isPlaying: true };
  }),
  
  prevTrack: () => set((state) => {
    if (!state.currentTrack || state.playlist.length === 0) return state;
    const currentIndex = state.playlist.findIndex(t => t.id === state.currentTrack?.id);
    const prevIndex = currentIndex === 0 ? state.playlist.length - 1 : currentIndex - 1;
    return { currentTrack: state.playlist[prevIndex], isPlaying: true };
  }),
}));
