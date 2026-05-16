import { Hero } from "@/components/ui/Hero";
import { Marketplace } from "@/components/sections/Marketplace";
import { Portfolio } from "@/components/sections/Portfolio";

export default function Home() {
  return (
    <main className="w-full flex flex-col">
      <Hero />
      <Marketplace />
      <Portfolio />
    </main>
  );
}
