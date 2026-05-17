import { Navbar } from "@/components/ui/Navbar";
import { CartDrawer } from "@/components/ui/CartDrawer";
import { FloatingCartButton } from "@/components/ui/FloatingCartButton";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-[#0a0a0a]">
      <Navbar />
      {children}
      <CartDrawer />
      <FloatingCartButton />
    </div>
  );
}
