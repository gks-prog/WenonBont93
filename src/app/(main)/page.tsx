import { Hero } from "@/components/ui/Hero";
import { Marketplace } from "@/components/sections/Marketplace";
import { Portfolio } from "@/components/sections/Portfolio";
import { SamplePacks } from "@/components/sections/SamplePacks";
import { Footer } from "@/components/ui/Footer";

export default function Home() {
  return (
    <main className="w-full flex flex-col bg-[#0a0a0a]">
      <Hero />
      <Marketplace />
      <SamplePacks />
      <Portfolio />
      <Footer />
    </main>
  );
}
