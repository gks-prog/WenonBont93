import { create } from 'zustand';

export interface Track {
  id: string;
  title: string;
  bpm: number;
  genre: string;
  image: string;
  audioUrl: string;
  price: string;
}

export interface CartItem {
  id: string | number;
  title: string;
  price: string;
  image: string;
  type: 'Beat' | 'Pack';
}

interface AppState {
  playlist: Track[];
  currentIndex: number;
  currentTrack: Track | null;
  isPlaying: boolean;
  setTrack: (track: Track, playlist: Track[]) => void;
  togglePlay: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  stopPlayer: () => void;
  
  cart: CartItem[];
  isCartOpen: boolean;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string | number) => void;
  toggleCart: () => void;
}

export const useStore = create<AppState>((set, get) => ({
  playlist: [],
  currentIndex: -1,
  currentTrack: null,
  isPlaying: false,
  setTrack: (track, playlist) => {
    const index = playlist.findIndex((t) => t.id === track.id);
    set({ currentTrack: track, playlist, currentIndex: index, isPlaying: true });
  },
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  stopPlayer: () => set({ currentTrack: null, isPlaying: false, playlist: [] }),
  nextTrack: () => {
    const { playlist, currentIndex } = get();
    if (playlist.length === 0) return;
    const nextIndex = currentIndex === playlist.length - 1 ? 0 : currentIndex + 1;
    set({ currentTrack: playlist[nextIndex], currentIndex: nextIndex, isPlaying: true });
  },
  prevTrack: () => {
    const { playlist, currentIndex } = get();
    if (playlist.length === 0) return;
    const prevIndex = currentIndex === 0 ? playlist.length - 1 : currentIndex - 1;
    set({ currentTrack: playlist[prevIndex], currentIndex: prevIndex, isPlaying: true });
  },

  cart: [],
  isCartOpen: false,
  addToCart: (item) => set((state) => ({ 
    cart: [...state.cart, item], 
    isCartOpen: true 
  })),
  removeFromCart: (id) => set((state) => ({ 
    cart: state.cart.filter((item) => item.id !== id) 
  })),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
}));
