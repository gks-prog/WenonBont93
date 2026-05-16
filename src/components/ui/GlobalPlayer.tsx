"use client";

import { useEffect, useRef } from "react";
import { useStore } from "@/lib/store/useAudioStore";

export function GlobalPlayer() {
  const { currentTrack, isPlaying, togglePlay, stopPlayer } = useAudioStore();
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
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[1200px] z-[100] animate-fade-in-up">
      {/* Matte Liquid Glass Container */}
      <div className="bg-[#0a0a0a]/40 backdrop-blur-3xl backdrop-saturate-[1.5] border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] rounded-xl overflow-hidden flex items-center justify-between gap-4 p-3 md:p-4 pr-6">
        
        {/* Track Info */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-lg overflow-hidden shadow-inner flex-shrink-0">
            <img src={currentTrack.image} alt={currentTrack.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-white font-bold md:text-lg tracking-tight truncate drop-shadow-md">{currentTrack.title}</span>
            <span className="text-[#a1a1aa] text-[10px] md:text-xs tracking-[0.1em] uppercase truncate mt-0.5">
              {currentTrack.bpm} BPM • {currentTrack.genre}
            </span>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center justify-center">
          <button 
            onClick={togglePlay}
            className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-white hover:scale-105 hover:bg-white hover:text-black transition-all duration-300 shadow-lg"
          >
            {isPlaying ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="ml-1"><path d="M8 5v14l11-7z"/></svg>
            )}
          </button>
        </div>

        {/* Action (Purchase) & Close */}
        <div className="flex-1 flex justify-end items-center gap-4 md:gap-8">
           <button className="hidden md:block px-6 py-2.5 bg-[#7c3aed]/20 border border-[#7c3aed]/50 text-white hover:bg-[#7c3aed] transition-colors duration-300 text-xs tracking-widest uppercase rounded-md shadow-[0_0_15px_rgba(124,58,237,0.3)]">
             License — {currentTrack.price}
           </button>
           
           <button 
             onClick={stopPlayer}
             className="text-[#a1a1aa] hover:text-white transition-colors"
             aria-label="Close Player"
           >
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
           </button>
        </div>
      </div>
      <audio ref={audioRef} src={currentTrack.audioUrl} onEnded={togglePlay} loop />
    </div>
  );
}
