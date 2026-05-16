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

interface AudioState {
  currentTrack: Track | null;
  isPlaying: boolean;
  setTrack: (track: Track) => void;
  togglePlay: () => void;
}

export const useAudioStore = create<AudioState>((set) => ({
  currentTrack: null,
  isPlaying: false,
  setTrack: (track) => set({ currentTrack: track, isPlaying: true }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
}));
