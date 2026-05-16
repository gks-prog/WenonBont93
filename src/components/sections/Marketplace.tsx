"use client";

import { useStore, Track } from "@/lib/store/useStore"; // Updated import

const MOCK_BEATS: Track[] = [
  { id: "1", title: "SYNTAX ERROR", bpm: 140, genre: "Dark Trap", price: "$49", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop", audioUrl: "" },
  { id: "2", title: "PARIS ARCHIVE", bpm: 120, genre: "Luxury Drill", price: "$49", image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop", audioUrl: "" },
  { id: "3", title: "A24 PROTOCOL", bpm: 95, genre: "Cinematic", price: "$99", image: "https://images.unsplash.com/photo-1518814441584-1845fbb1f20d?q=80&w=800&auto=format&fit=crop", audioUrl: "" },
  { id: "4", title: "BRUTALIST", bpm: 145, genre: "Phonk", price: "$49", image: "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=800&auto=format&fit=crop", audioUrl: "" },
];

export function Marketplace() {
  const { currentTrack, isPlaying, setTrack, togglePlay } = useStore();

  const handlePlay = (track: Track) => {
    if (currentTrack?.id === track.id) togglePlay();
    else setTrack(track, MOCK_BEATS); // Passes the whole array for looping
  };
  
  // ... rest of the Marketplace code remains exactly the same
