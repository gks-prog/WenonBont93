"use client";

import { useAudio } from "@/context/AudioContext";

// Define the shape of our sample data
type Sample = {
  id: string;
  title: string;
  artist: string;
  url: string;
};

// Mock data (You will eventually pass this in from your database as a prop)
const DEFAULT_SAMPLES: Sample[] = [
  { id: "sp-1", title: "808 - Subterranean", artist: "WENON BONT", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { id: "sp-2", title: "Snare - Razor Blade", artist: "WENON BONT", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  { id: "sp-3", title: "Melody Loop - Dark Knight", artist: "WENON BONT", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
  { id: "sp-4", title: "Hi-Hat - Venom Roll", artist: "WENON BONT", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
];

export function SamplePackPreview({ samples = DEFAULT_SAMPLES }: { samples?: Sample[] }) {
  // Connect to the Global Audio Engine
  const { playTrack, currentTrack, isPlaying } = useAudio();

  return (
    <div className="bg-[#111] border border-white/10 rounded-xl p-6 shadow-2xl max-w-2xl w-full">
      <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
        <h3 className="text-white text-sm font-bold uppercase tracking-widest">Preview Sounds</h3>
        <span className="text-[#a1a1aa] text-[10px] uppercase tracking-[0.2em]">{samples.length} Files</span>
      </div>

      <div className="flex flex-col gap-2">
        {samples.map((sample, index) => {
          const isActive = currentTrack?.id === sample.id;
          
          return (
            <div 
              key={sample.id} 
              className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                isActive ? "bg-[#7c3aed]/10 border-[#7c3aed]/30" : "bg-black/30 border-transparent hover:bg-black/50 hover:border-white/5"
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="text-[#a1a1aa] text-xs font-mono w-4">{index + 1}</span>
                
                {/* THE PLAY/PAUSE TRIGGER */}
                <button 
                  onClick={() => playTrack(sample)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    isActive && isPlaying 
                      ? "bg-[#7c3aed] text-white shadow-[0_0_10px_rgba(124,58,237,0.5)]" 
                      : "bg-white/10 text-white hover:bg-white hover:text-black"
                  }`}
                >
                  {isActive && isPlaying ? (
                    // Pause Icon
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6zm8 0h4v16h-4z"/></svg>
                  ) : (
                    // Play Icon
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5"><path d="M8 5v14l11-7z"/></svg>
                  )}
                </button>

                <div>
                  <p className={`text-xs font-bold uppercase tracking-wider ${isActive ? "text-[#7c3aed]" : "text-white"}`}>
                    {sample.title}
                  </p>
                </div>
              </div>

              {/* Visualizer Animation (Only shows when playing) */}
              <div className="flex items-center gap-1 h-4">
                {isActive && isPlaying && (
                  <>
                    <div className="w-1 bg-[#7c3aed] animate-[bounce_1s_infinite_ease-in-out] h-full"></div>
                    <div className="w-1 bg-[#7c3aed] animate-[bounce_1s_infinite_0.2s_ease-in-out] h-2/3"></div>
                    <div className="w-1 bg-[#7c3aed] animate-[bounce_1s_infinite_0.4s_ease-in-out] h-full"></div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
