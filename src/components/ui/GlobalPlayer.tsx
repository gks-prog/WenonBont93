"use client";

import { useAudio } from "@/context/AudioContext";

export function GlobalPlayer() {
  const { currentTrack, isPlaying, togglePlayPause } = useAudio();

  // If no track is loaded, hide the player completely
  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#0a0a0a]/90 backdrop-blur-md border-t border-[#7c3aed]/30 p-4 z-[9999] animate-in slide-in-from-bottom-10">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        
        {/* Track Info */}
        <div className="flex items-center gap-4 flex-1">
          <div className="w-10 h-10 bg-[#111] border border-white/10 rounded flex items-center justify-center animate-pulse">
            <span className="text-[#7c3aed] text-xs font-bold">WB</span>
          </div>
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-widest">{currentTrack.title}</h4>
            <p className="text-[#a1a1aa] text-[10px] uppercase tracking-[0.2em] mt-1">{currentTrack.artist}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex-1 flex justify-center">
          <button 
            onClick={togglePlayPause}
            className="w-12 h-12 flex items-center justify-center bg-white text-black rounded-full hover:bg-[#7c3aed] hover:text-white transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(124,58,237,0.5)]"
          >
            {isPlaying ? (
              // Pause Icon
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6zm8 0h4v16h-4z"/></svg>
            ) : (
              // Play Icon
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="ml-1"><path d="M8 5v14l11-7z"/></svg>
            )}
          </button>
        </div>

        {/* Action (Buy/License placeholder) */}
        <div className="flex-1 flex justify-end">
          <button className="px-4 py-2 border border-white/20 text-white text-[10px] uppercase tracking-widest rounded hover:bg-white hover:text-black transition-colors hidden md:block">
            View License Options
          </button>
        </div>

      </div>
    </div>
  );
}
