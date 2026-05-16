import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Inter font configured for cinematic/editorial feel
const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Cinematic Portfolio",
  description: "A dark luxury creative portfolio built with Next.js 15.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans bg-background text-primary antialiased selection:bg-accent selection:text-primary relative min-h-[100dvh]`}>
        {children}
      </body>
    </html>
  );
}