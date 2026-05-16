import Link from "next/link";
import { Marketplace } from "@/components/sections/Marketplace";
import { Portfolio } from "@/components/sections/Portfolio";

export default function Home() {
  return (
    <main className="w-full flex flex-col bg-[#0a0a0a]">
      {/* Cinematic Hero */}
      <section className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0a0a]">
          <img 
            src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop" 
            alt="Studio Environment" 
            className="w-full h-full object-cover opacity-30 object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
        </div>

        <div className="relative z-10 w-full max-w-[1440px] px-[clamp(1.5rem,5vw,3rem)] flex flex-col items-center text-center">
          <span className="text-[#7c3aed] text-xs md:text-sm font-bold tracking-[0.4em] uppercase mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Visionary Audio Architect
          </span>
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-bold text-white tracking-tighter leading-[0.85] mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            SONIC <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/20">
              SUPREMACY.
            </span>
          </h1>
          <p className="max-w-xl text-[#a1a1aa] text-sm md:text-base leading-relaxed tracking-wide mb-10 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            Award-winning production, dark luxury instrumentation, and cinematic scoring for the next generation of creative artists.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Link href="/beats" className="px-10 py-4 bg-white text-black font-bold tracking-widest uppercase text-xs rounded-sm hover:bg-[#7c3aed] hover:text-white transition-colors duration-500 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              Explore Catalog
            </Link>
            <Link href="/portfolio" className="px-10 py-4 bg-transparent border border-white/20 text-white font-bold tracking-widest uppercase text-xs rounded-sm hover:border-white transition-colors duration-500 backdrop-blur-sm">
              View Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Inject Sub-sections */}
      <Marketplace />
      <Portfolio />
    </main>
  );
}
