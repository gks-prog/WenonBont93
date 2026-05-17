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
  quantity?: number; // Tracks multiple additions
};

interface StoreState {
  cart: Track[];
  isCartOpen: boolean;
  hasOpenedCartThisSession: boolean;
  toastMessage: string | null; 
  
  addToCart: (item: Track) => void;
  removeFromCart: (id: string) => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  clearToast: () => void; 

  currentTrack: Track | null;
  isPlaying: boolean;
  playlist: Track[];

  setTrack: (track: Track, newPlaylist?: Track[]) => void;
  togglePlay: () => void;
  stopPlayer: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
}

export const useStore = create<StoreState>((set, get) => ({
  cart: [],
  isCartOpen: false,
  hasOpenedCartThisSession: false,
  toastMessage: null,
  currentTrack: null,
  isPlaying: false,
  playlist: [],

  addToCart: (item) => set((state) => {
    // 1. Check if product already exists
    const existingItem = state.cart.find((i) => i.id === item.id);
    
    // 2. Add new or increment quantity
    const newCart = existingItem 
      ? state.cart.map((i) => i.id === item.id ? { ...i, quantity: (i.quantity || 1) + 1 } : i)
      : [...state.cart, { ...item, quantity: 1 }];

    // 3. Handle Toast Notification Logic
    if (state.toastMessage) clearTimeout((window as any).toastTimer);
    (window as any).toastTimer = setTimeout(() => {
      get().clearToast();
    }, 3000);

    return {
      cart: newCart,
      isCartOpen: !state.hasOpenedCartThisSession ? true : state.isCartOpen,
      hasOpenedCartThisSession: true,
      toastMessage: `${item.title} added to Arsenal`,
    };
  }),
  
  removeFromCart: (id) => set((state) => ({
    // Safely remove the item. We removed the code that forces the cart to close here.
    cart: state.cart.filter((item) => item.id !== id),
  })),

  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  clearToast: () => set({ toastMessage: null }),

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
