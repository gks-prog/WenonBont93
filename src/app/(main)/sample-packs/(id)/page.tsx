"use client";

import { SamplePackPreview } from "@/components/ui/SamplePackPreview";
import { useParams } from "next/navigation";

export default function SinglePackPage() {
  // This grabs the URL parameter (e.g., "dark-knight") so you know which pack to load from your database later
  const params = useParams(); 
  const packId = params.id as string;

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 px-4 pb-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Breadcrumb Navigation */}
        <div className="mb-8 border-b border-white/10 pb-6">
          <a href="/sample-packs" className="text-[#a1a1aa] text-[10px] uppercase tracking-widest hover:text-white transition-colors">
            ← Back to Marketplace
          </a>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* LEFT SIDE: Pack Details */}
          <div className="w-full lg:w-1/3 flex flex-col gap-6 sticky top-24">
            <div className="aspect-square bg-[#111] border border-white/10 rounded-xl flex items-center justify-center shadow-2xl">
              <span className="text-[#7c3aed] text-sm font-bold tracking-widest uppercase">
                {/* Dynamically display the ID for now */}
                {packId.replace("-", " ")} 
              </span>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-white uppercase tracking-widest">{packId.replace("-", " ")}</h2>
              <p className="text-[#7c3aed] text-lg font-bold mt-2">$29.99</p>
              <p className="text-[#a1a1aa] mt-4 text-sm leading-relaxed">
                Premium audio assets ready for industry standard production. High-fidelity WAV format.
              </p>
            </div>
            
            <button className="w-full bg-white text-black text-[10px] tracking-[0.3em] uppercase font-bold py-4 rounded hover:bg-[#7c3aed] hover:text-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              Add to Cart
            </button>
          </div>

          {/* RIGHT SIDE: The Audio Preview Engine */}
          <div className="w-full lg:w-2/3">
            {/* The Preview Component mounts here! */}
            <SamplePackPreview />
          </div>

        </div>
      </div>
    </div>
  );
}
