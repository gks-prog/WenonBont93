"use client";

// 1. Import the component we just built
import { SamplePackPreview } from "@/components/ui/SamplePackPreview";

export default function SamplePacksPage() {
  // (Keep whatever existing state or hooks you have here)

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 px-4 pb-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Page Header */}
        <div className="mb-12 border-b border-white/10 pb-6">
          <h1 className="text-3xl font-bold text-white uppercase tracking-widest">Sample Packs</h1>
          <p className="text-[#a1a1aa] text-xs uppercase tracking-[0.2em] mt-2">Premium Audio Assets for Production</p>
        </div>

        {/* Product Container */}
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* LEFT SIDE: Product Image & Buying Info */}
          <div className="w-full lg:w-1/3 flex flex-col gap-6 sticky top-24">
            {/* Replace with your actual cover art image */}
            <div className="aspect-square bg-[#111] border border-white/10 rounded-xl flex items-center justify-center shadow-2xl">
              <span className="text-[#7c3aed] text-sm font-bold tracking-widest uppercase">Dark Knight Vol. 1</span>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-white uppercase tracking-widest">DARK KNIGHT DRUM KIT</h2>
              <p className="text-[#7c3aed] text-lg font-bold mt-2">$29.99</p>
              <p className="text-[#a1a1aa] mt-4 text-sm leading-relaxed">
                Over 150+ industry standard 808s, claps, snares, and hi-hats. 
                Designed for dark trap and drill production. High-fidelity WAV format.
              </p>
            </div>
            
            {/* Your Add to Cart Button */}
            <button className="w-full bg-white text-black text-[10px] tracking-[0.3em] uppercase font-bold py-4 rounded hover:bg-[#7c3aed] hover:text-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              Add to Cart
            </button>
          </div>

          {/* RIGHT SIDE: The Audio Preview Engine */}
          <div className="w-full lg:w-2/3">
            {/* 2. Drop the component here. 
                It will automatically connect to your Global Player when a user clicks play. */}
            <SamplePackPreview />
          </div>

        </div>
      </div>
    </div>
  );
}

import { useStore } from "@/lib/store/useStore";

const PACKS = [
  { id: 1, title: "OMNIPOTENCE", desc: "Cinematic Trap Melodies", tags: ["100% Royalty Free", "WAV + MIDI", "50+ Loops"], price: "$29", image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=800&auto=format&fit=crop" },
  { id: 2, title: "VOID DRUMS", desc: "Industry Standard Percussion", tags: ["100% Royalty Free", "200+ One Shots", "WAV"], price: "$39", image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=800&auto=format&fit=crop" },
  { id: 3, title: "ANALOG TEXTURES", desc: "Warm Synth Accents", tags: ["100% Royalty Free", "Analog Processed"], price: "$24", image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=800&auto=format&fit=crop" },
];

export function SamplePacks() {
  const { addToCart } = useStore();

  return (
    <section id="sample-packs" className="w-full section-padding bg-[#050505]">
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
          <div>
            <h2 className="text-[#7c3aed] text-xs font-bold tracking-[0.3em] uppercase mb-4">Producer Tools</h2>
            <h3 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">SAMPLE <br/><span className="text-[#a1a1aa]">PACKS.</span></h3>
          </div>
          <button className="text-sm text-white border-b border-white/30 pb-1 hover:text-white hover:border-white transition-colors w-fit">Browse All Packs</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PACKS.map((pack) => (
            <div key={pack.id} className="group flex flex-col gap-4">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#111111] border border-white/5 shadow-2xl">
                <img src={pack.image} alt={pack.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {pack.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-bold text-white tracking-widest uppercase shadow-sm">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-[2px]">
             <button 
  onClick={() => addToCart({ 
    id: String(pack.id), // The Fix: Safely cast the number to a string
    title: pack.title, 
    price: pack.price, 
    image: pack.image, 
    type: 'Pack' 
  })}
  className="px-8 py-3 bg-white text-black font-bold tracking-widest uppercase text-xs rounded-full shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105 transition-transform"
>
  Add to Cart - {pack.price}
</button>
                </div>
              </div>

              <div className="flex flex-col px-1">
                <h4 className="text-xl font-bold text-white tracking-tight">{pack.title}</h4>
                <p className="text-[#a1a1aa] text-sm mt-1">{pack.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
