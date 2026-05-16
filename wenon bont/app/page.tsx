import { Navbar } from "@/components/ui/Navbar";
import { Hero } from "@/components/ui/Hero";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-primary selection:bg-accent selection:text-primary">
      <Navbar />
      <Hero />
      
      {/* Future components to be generated. Placed here to dictate the architectural flow. */}
      
      <section id="about" className="min-h-screen bg-surface flex items-center border-t border-background/10">
        {/* About.tsx */}
      </section>

      <section id="portfolio" className="min-h-screen bg-background flex items-center">
        {/* Portfolio.tsx */}
      </section>

      <section id="beats" className="min-h-screen bg-surface flex items-center">
        {/* Marketplace.tsx */}
      </section>

      {/* Additional sections follow the same alternating pattern to create visual rhythm */}
    </main>
  );
}