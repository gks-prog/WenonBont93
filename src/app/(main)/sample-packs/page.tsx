"use client";

import { useStore } from "@/lib/store/useStore";

const PACKS = [
  { id: "p1", title: "CHROMA", type: "Pack", price: "$29.99", tags: ["100 Loops", "MIDI Included", "100% Royalty Free"], desc: "High-fidelity analog synth loops processed through vintage tape machines.", img: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=800" },
  { id: "p2", title: "DRAIN", type: "Pack", price: "$19.99", tags: ["50 808s", "Perc Loops", "WAV Format"], desc: "Industry-standard drum sounds synthesized for maximum transient punch.", img: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800" },
];

export default function SamplePacksPage() {
  const { addToCart } = useStore();

  return (
    <main className="pt-32 pb-20 bg-[#0a0a0a] min-h-screen px-[clamp(1.5rem,5vw,3rem)]">
      <div className="max-w-[1440px] mx-auto">
        <h1 className="text-5xl md:text-8xl font-bold text-white tracking-tighter mb-20 border-b border-white/10 pb-10">SAMPLE<br/><span className="text-[#a1a1aa]">ARCHIVE.</span></h1>
        
        <div className="flex flex-col gap-12">
          {PACKS.map(pack => (
            <div key={pack.id} className="group relative flex flex-col md:flex-row gap-8 lg:gap-16 bg-[#050505] border border-white/5 hover:border-white/10 rounded-sm p-6 lg:p-10 transition-all duration-500">
              <div className="w-full md:w-80 lg:w-96 aspect-square rounded-sm overflow-hidden border border-white/10 bg-[#111111] flex-shrink-0 relative">
                <img src={pack.img} alt={pack.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-90 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              <div className="flex-1 flex flex-col justify-center">
                <div className="mb-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-2">
                    <h3 className="text-4xl lg:text-6xl font-bold text-white tracking-tighter">{pack.title}</h3>
                    <span className="text-2xl font-bold text-white bg-white/5 px-6 py-2 rounded-sm border border-white/10">{pack.price}</span>
                  </div>
                  <p className="text-[#7c3aed] text-xs tracking-[0.3em] uppercase font-bold mb-6">{pack.type}</p>
                  <p className="text-[#a1a1aa] text-sm leading-relaxed max-w-2xl mb-8">{pack.desc}</p>
                  
                  <div className="flex flex-wrap gap-3 mb-10">
                    {pack.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-bold tracking-widest text-[#a1a1aa] border border-white/10 bg-[#111111] px-4 py-2 rounded-sm uppercase">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mt-auto">
                 <button 
  onClick={() => addToCart({ id: pack.id, title: pack.title, price: pack.price, image: pack.img, type: 'Pack' })}
  className="w-full md:w-auto px-12 py-5 bg-white text-black text-[10px] tracking-[0.3em] uppercase font-bold hover:bg-[#7c3aed] hover:text-white transition-all rounded-sm shadow-[0_0_20px_rgba(255,255,255,0.1)]"
>
  Add to Arsenal
</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
