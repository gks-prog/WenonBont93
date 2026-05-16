"use client";

import { useEffect, useRef } from "react";
import { useStore } from "@/lib/store/useStore";

export function GlobalPlayer() {
  const { currentTrack, isPlaying, togglePlay, stopPlayer, nextTrack, prevTrack, addToCart } = useStore();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.play().catch(() => {});
      else audioRef.current.pause();
    }
  }, [isPlaying, currentTrack]);

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[1000px] z-[100] animate-fade-in-up">
      {/* Matte Milky Glass Container */}
      <div className="bg-white/[0.08] backdrop-blur-[40px] backdrop-saturate-[1.2] border border-white/20 shadow-[0_8px_32px_rgba(255,255,255,0.05)] rounded-2xl overflow-hidden flex items-center justify-between gap-4 p-3 pr-6 relative">
        
        {/* Track Info */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border border-white/10">
            <img src={currentTrack.image} alt={currentTrack.title} className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-white font-bold text-base md:text-lg tracking-tight truncate">{currentTrack.title}</span>
            <span className="text-white/60 text-[10px] md:text-xs tracking-[0.1em] uppercase truncate mt-0.5">
              {currentTrack.bpm} BPM • {currentTrack.genre}
            </span>
          </div>
        </div>

        {/* Endless Loop Controls */}
        <div className="flex items-center justify-center gap-3 md:gap-6">
          <button onClick={prevTrack} className="text-white/70 hover:text-white transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
          </button>
          
          <button 
            onClick={togglePlay}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white text-black hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          >
            {isPlaying ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="ml-1"><path d="M8 5v14l11-7z"/></svg>
            )}
          </button>

          <button onClick={nextTrack} className="text-white/70 hover:text-white transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
          </button>
        </div>

        {/* Actions */}
        <div className="flex-1 flex justify-end items-center gap-6">
           <button 
             onClick={() => addToCart({ id: currentTrack.id, title: currentTrack.title, price: currentTrack.price, image: currentTrack.image, type: 'Beat' })}
             className="hidden md:block px-6 py-2 bg-transparent border border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300 text-xs font-bold tracking-widest uppercase rounded-full"
           >
             Add to Cart — {currentTrack.price}
           </button>
           
           <button 
             onClick={stopPlayer}
             className="w-8 h-8 flex items-center justify-center rounded-full bg-black/20 text-white/70 hover:text-white hover:bg-black/40 transition-colors"
             aria-label="Close"
           >
             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
           </button>
        </div>
      </div>
      <audio ref={audioRef} src={currentTrack.audioUrl} onEnded={nextTrack} />
    </div>
  );
}
