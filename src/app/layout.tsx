import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Navbar } from "@/components/ui/Navbar";
import { CartDrawer } from "@/components/ui/CartDrawer";
import { FloatingCartButton } from "@/components/ui/FloatingCartButton"; // DELETE THIS LINE IF YOU DON'T HAVE THIS FILE ANYMORE

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WENON BONT | Premium Audio Infrastructure",
  description: "Exclusive beats and sound kits for industry professionals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#0a0a0a] text-white antialiased`}>
        <Navbar />
        {children}
        <FloatingCartButton /> {/* DELETE THIS IF YOU DELETED LINE 6 */}
        <CartDrawer />
      </body>
    </html>
  );
}
