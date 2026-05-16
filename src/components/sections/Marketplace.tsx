"use client";

import { useAudioStore, Track } from "@/lib/store/useAudioStore";

const MOCK_BEATS: Track[] = [
  { id: "1", title: "SYNTAX ERROR", bpm: 140, genre: "Dark Trap", price: "$49", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop", audioUrl: "" },
  { id: "2", title: "PARIS ARCHIVE", bpm: 120, genre: "Luxury Drill", price: "$49", image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop", audioUrl: "" },
  { id: "3", title: "A24 PROTOCOL", bpm: 95, genre: "Cinematic", price: "$99", image: "https://images.unsplash.com/photo-1518814441584-1845fbb1f20d?q=80&w=800&auto=format&fit=crop", audioUrl: "" },
  { id: "4", title: "BRUTALIST", bpm: 145, genre: "Phonk", price: "$49", image: "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=800&auto=format&fit=crop", audioUrl: "" },
];

export function Marketplace() {
  const { currentTrack, isPlaying, setTrack, togglePlay } = useAudioStore();

  const handlePlay = (track: Track) => {
    if (currentTrack?.id === track.id) togglePlay();
    else setTrack(track);
  };

  return (
    <section id="beats" className="w-full section-padding bg-[#0a0a0a]">
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <h2 className="text-[#7c3aed] text-xs font-bold tracking-[0.3em] uppercase mb-4">The Catalog</h2>
            <h3 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">SONIC <br/><span className="text-[#a1a1aa]">ARSENAL.</span></h3>
          </div>
          <button className="text-sm text-white border-b border-white pb-1 hover:text-[#7c3aed] hover:border-[#7c3aed] transition-colors w-fit">View All Tracks</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {MOCK_BEATS.map((track) => {
            const isActive = currentTrack?.id === track.id;
            return (
              <div key={track.id} className="group relative flex flex-col gap-5">
                <div 
                  className="relative aspect-square bg-[#111111] overflow-hidden cursor-pointer rounded-sm" 
                  onClick={() => handlePlay(track)}
                >
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img src={track.image} alt={track.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  
                  <div className={`absolute inset-0 flex items-center justify-center z-20 transition-all duration-500 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100'}`}>
                    <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20">
                      {isActive && isPlaying ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                      ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="ml-1"><path d="M8 5v14l11-7z"/></svg>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-white text-lg tracking-tight group-hover:text-[#7c3aed] transition-colors">{track.title}</h4>
                    <span className="text-[#a1a1aa] text-xs tracking-[0.1em] uppercase mt-1 block">{track.bpm} BPM • {track.genre}</span>
                  </div>
                  <span className="text-white font-medium">{track.price}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
