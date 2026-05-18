"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useAudio } from "@/context/AudioContext";

export default function DashboardPage() {
  // 1. All State and Hooks go here at the top
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("purchases");
  
  // Connect to the Global Audio Player
  const { playTrack, currentTrack, isPlaying } = useAudio();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        // Strict client-side security bounce
        window.location.href = "/login";
      } else {
        setUserEmail(session.user.email || "Client");
        setLoading(false);
      }
    };

    checkSession();
  }, [supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="w-8 h-8 rounded-full border border-[#7c3aed] border-t-transparent animate-spin" />
      </div>
    );
  }

  // 2. The main render block
  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 px-4 md:px-8 pb-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white uppercase tracking-widest mb-2">Client Portal</h1>
            <p className="text-[#a1a1aa] text-xs uppercase tracking-[0.2em]">Logged in as: <span className="text-[#7c3aed]">{userEmail}</span></p>
          </div>
          <button onClick={handleSignOut} className="text-[#a1a1aa] text-[10px] uppercase tracking-widest hover:text-red-500 transition-colors border border-white/10 px-4 py-2 rounded hover:border-red-500/50 bg-[#111]">
            Sign Out
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-64 flex flex-col gap-2">
            <button onClick={() => setActiveTab("purchases")} className={`text-left px-4 py-4 text-[10px] uppercase tracking-[0.2em] font-bold rounded transition-all ${activeTab === "purchases" ? "bg-[#7c3aed] text-white" : "text-[#a1a1aa] hover:bg-white/5 hover:text-white"}`}>Arsenal & Licenses</button>
            <button onClick={() => setActiveTab("settings")} className={`text-left px-4 py-4 text-[10px] uppercase tracking-[0.2em] font-bold rounded transition-all ${activeTab === "settings" ? "bg-[#7c3aed] text-white" : "text-[#a1a1aa] hover:bg-white/5 hover:text-white"}`}>Account Settings</button>
            <button onClick={() => setActiveTab("billing")} className={`text-left px-4 py-4 text-[10px] uppercase tracking-[0.2em] font-bold rounded transition-all ${activeTab === "billing" ? "bg-[#7c3aed] text-white" : "text-[#a1a1aa] hover:bg-white/5 hover:text-white"}`}>Billing & Cards</button>
          </div>

          <div className="flex-1 bg-[#111] border border-white/10 rounded-xl p-6 md:p-8 shadow-2xl min-h-[500px]">
            
            {/* PURCHASES TAB (With the active Play button) */}
            {activeTab === "purchases" && (
              <div className="animate-in fade-in duration-500">
                <h2 className="text-white text-sm font-bold uppercase tracking-widest mb-6 border-b border-white/10 pb-4">Order History</h2>
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-black/50 border border-white/5 rounded-lg gap-4">
                  <div>
                    <h3 className="text-white font-bold text-sm">DARK KNIGHT - UNLIMITED LEASE</h3>
                    <p className="text-[#a1a1aa] text-[10px] uppercase tracking-widest mt-1">Order #WB-9921 • May 18, 2026</p>
                  </div>
                  <div className="flex items-center gap-3 w-full md:w-auto">
                    
                    {/* The Play Button */}
                    <button 
                      onClick={() => playTrack({
                        id: "dark-knight-1",
                        title: "DARK KNIGHT",
                        artist: "WENON BONT",
                        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
                      })}
                      className="flex-1 md:flex-none text-center bg-[#7c3aed] text-white text-[10px] uppercase tracking-widest px-4 py-2 rounded font-bold hover:bg-[#6d28d9] transition-colors flex items-center justify-center gap-2"
                    >
                      {currentTrack?.id === "dark-knight-1" && isPlaying ? "PAUSE AUDIO" : "PLAY AUDIO"}
                    </button>

                    <button className="flex-1 md:flex-none text-center border border-white/20 text-white text-[10px] uppercase tracking-widest px-4 py-2 rounded hover:bg-white hover:text-black transition-colors">
                      Download
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* SETTINGS TAB */}
            {activeTab === "settings" && (
              <div className="animate-in fade-in duration-500 max-w-lg">
                <h2 className="text-white text-sm font-bold uppercase tracking-widest mb-6 border-b border-white/10 pb-4">Personal Information</h2>
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-white text-[10px] uppercase tracking-widest font-bold">Email Address</label>
                    <input type="email" disabled value={userEmail || ""} className="bg-black/50 border border-white/10 text-white/50 px-4 py-3 rounded text-sm cursor-not-allowed" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-white text-[10px] uppercase tracking-widest font-bold">New Password</label>
                    <input type="password" placeholder="••••••••" className="bg-black/50 border border-white/10 text-white px-4 py-3 rounded outline-none focus:border-[#7c3aed] transition-colors text-sm" />
                  </div>
                  <button className="mt-4 bg-white text-black text-[10px] tracking-[0.3em] uppercase font-bold py-4 rounded hover:bg-[#7c3aed] hover:text-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]">Save Changes</button>
                </div>
              </div>
            )}

            {/* BILLING TAB */}
            {activeTab === "billing" && (
              <div className="animate-in fade-in duration-500">
                <h2 className="text-white text-sm font-bold uppercase tracking-widest mb-6 border-b border-white/10 pb-4">Payment Methods</h2>
                <div className="p-6 border border-dashed border-white/20 bg-black/30 rounded-lg text-center flex flex-col items-center justify-center min-h-[200px]">
                  <p className="text-[#a1a1aa] text-xs uppercase tracking-widest mb-4">No cards currently linked to this account.</p>
                  <button className="border border-[#7c3aed] text-[#7c3aed] text-[10px] uppercase tracking-widest font-bold px-6 py-3 rounded hover:bg-[#7c3aed] hover:text-white transition-colors">+ Add New Card</button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
