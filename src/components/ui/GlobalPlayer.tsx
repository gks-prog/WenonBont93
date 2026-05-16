"use client";

import { useEffect, useRef } from "react";
import { useAudioStore } from "@/lib/store/useAudioStore";

export function GlobalPlayer() {
  const { currentTrack, isPlaying, togglePlay } = useAudioStore();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => console.log("Audio play blocked by browser"));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-[100] bg-[#0a0a0a]/90 backdrop-blur-2xl border-t border-white/5 safe-p-bottom animate-fade-in-up">
      <div className="w-full max-w-[1440px] mx-auto px-[clamp(1rem,5vw,3rem)] h-24 flex items-center justify-between gap-6">
        
        {/* Track Info */}
        <div className="flex items-center gap-6 flex-1 min-w-0">
          <div className="relative w-14 h-14 bg-[#111111] overflow-hidden rounded-sm">
            <img src={currentTrack.image} alt={currentTrack.title} className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-white font-medium text-lg tracking-tight truncate">{currentTrack.title}</span>
            <span className="text-[#a1a1aa] text-xs tracking-[0.1em] uppercase truncate mt-1">
              {currentTrack.bpm} BPM • {currentTrack.genre}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center">
          <button 
            onClick={togglePlay}
            className="w-14 h-14 flex items-center justify-center rounded-full bg-white text-black hover:scale-105 hover:bg-[#7c3aed] hover:text-white transition-all duration-300"
          >
            {isPlaying ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            )}
          </button>
        </div>

        {/* Action (Purchase) */}
        <div className="flex-1 flex justify-end">
           <button className="hidden md:block px-8 py-3 bg-transparent border border-white/20 text-white font-medium hover:border-[#7c3aed] transition-colors duration-300 text-sm tracking-widest uppercase">
             License — {currentTrack.price}
           </button>
        </div>
      </div>
      <audio ref={audioRef} src={currentTrack.audioUrl} onEnded={togglePlay} loop />
    </div>
  );
}
