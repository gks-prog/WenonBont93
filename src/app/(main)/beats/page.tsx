"use client";

import { useStore, Track } from "@/lib/store/useStore";
import { useState } from "react";

const BEATS: Track[] = [
  { id: "b1", title: "ETHEREAL", bpm: 140, genre: "Trap", price: "$49.99", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800", audioUrl: "" },
  { id: "b2", title: "NOCTURNAL", bpm: 128, genre: "Techno", price: "$59.99", image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800", audioUrl: "" },
  { id: "b3", title: "VANGUARD", bpm: 110, genre: "Boom Bap", price: "$39.99", image: "https://images.unsplash.com/photo-1518814441584-1845fbb1f20d?w=800", audioUrl: "" },
];

export default function BeatsPage() {
  const { currentTrack, isPlaying, setTrack, togglePlay, addToCart } = useStore();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBeats = BEATS.filter(beat => 
    beat.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    beat.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="pt-32 pb-20 bg-[#0a0a0a] min-h-screen px-[clamp(1.5rem,5vw,3rem)]">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-20 border-b border-white/10 pb-10">
          <div>
             <h1 className="text-5xl md:text-8xl font-bold text-white tracking-tighter">BEAT<br/><span className="text-[#a1a1aa]">STORE.</span></h1>
             <p className="text-[#a1a1aa] mt-4 text-sm tracking-wide">License premium instrumentals for your next major release.</p>
          </div>
          <div className="flex-1 max-w-md w-full">
            <input 
              type="text" 
              placeholder="Search by title or genre..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#111111] border border-white/10 rounded-sm px-6 py-4 text-white text-sm focus:outline-none focus:border-[#7c3aed] transition-colors" 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBeats.map((track) => (
            <div key={track.id} className="group bg-[#050505] border border-white/5 hover:border-white/20 rounded-xl p-5 transition-all duration-500 shadow-2xl">
              <div className="relative aspect-square rounded-lg overflow-hidden mb-5 bg-[#111111]">
                <img src={track.image} alt={track.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
                <button 
                  onClick={() => currentTrack?.id === track.id ? togglePlay() : setTrack(track, BEATS)}
                  className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
                >
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-black shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-110 transition-transform">
                    {currentTrack?.id === track.id && isPlaying ? (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                    ) : (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="ml-1"><path d="M8 5v14l11-7z"/></svg>
                    )}
                  </div>
                </button>
              </div>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">{track.title}</h3>
                  <p className="text-[#a1a1aa] text-[10px] uppercase tracking-widest mt-1">{track.bpm} BPM • {track.genre}</p>
                </div>
                <span className="text-[#7c3aed] font-bold tracking-wider">{track.price}</span>
              </div>
              <button 
                onClick={() => addToCart({ ...track, type: 'Beat' })}
                className="w-full py-4 bg-transparent border border-white/20 text-white text-[10px] tracking-[0.2em] uppercase font-bold hover:bg-white hover:text-black transition-all rounded-sm"
              >
                Add to Cart
              </button>
            </div>
          ))}
          {filteredBeats.length === 0 && (
            <div className="col-span-full py-20 text-center text-[#a1a1aa] uppercase tracking-widest text-sm border border-white/5 border-dashed rounded-sm">
              No instrumentals found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
