import { Hero } from "@/components/ui/Hero";

export default function Home() {
  return (
    <main className="w-full flex flex-col">
      <Hero />
      
      {/* Temporary section specifically added so you can test scrolling */}
      <section id="portfolio" className="h-[100dvh] w-full bg-[#111111] flex items-center justify-center border-t border-white/5">
        <h2 className="text-[#a1a1aa] text-xl md:text-3xl font-light tracking-[0.3em] uppercase">
          Marketplace & Portfolio Next
        </h2>
      </section>
    </main>
  );
}
