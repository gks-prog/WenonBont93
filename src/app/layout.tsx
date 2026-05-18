import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// IMPORT THE NEW FILES:
import { AudioProvider } from "@/context/AudioContext";
import { GlobalPlayer } from "@/components/ui/GlobalPlayer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Audio Licensing",
  description: "Secure Audio Licensing Portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* WRAP THE APP IN THE AUDIO PROVIDER */}
        <AudioProvider>
          {children}
          {/* MOUNT THE GLOBAL PLAYER AT THE BOTTOM */}
          <GlobalPlayer />
        </AudioProvider>
      </body>
    </html>
  );
}
