import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/Navbar";
import { GlobalPlayer } from "@/components/ui/GlobalPlayer";
import { CartDrawer } from "@/components/ui/CartDrawer";
// ...
      <body className={`${inter.variable} font-sans bg-[#0a0a0a] text-white antialiased relative min-h-[100dvh]`}>
        <Navbar />
        {children}
        <GlobalPlayer />
        <CartDrawer />
      </body>
// ...
const inter = Inter({ subsets: ["latin"], variable: '--font-inter', display: 'swap' });

export const metadata: Metadata = {
  title: "Wenon Bont | Cinematic Portfolio",
  description: "A dark luxury creative portfolio built with Next.js 15.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans bg-[#0a0a0a] text-white antialiased relative min-h-[100dvh]`}>
        <Navbar />
        {children}
        <GlobalPlayer />
      </body>
    </html>
 );
}
