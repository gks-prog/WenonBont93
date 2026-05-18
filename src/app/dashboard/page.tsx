"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";

export default function DashboardPage() {
  // Removed strict <any> typing to prevent Vercel ESLint crashes
  const [user, setUser] = useState(null as any);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("purchases");
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    let isMounted = true;

    // 1. AGGRESSIVE CHECK: Grab the session the exact millisecond the page loads
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (isMounted) {
        if (session) {
          setUser(session.user);
          setLoading(false);
        } else {
          // If no session exists, forcefully boot to login
          router.replace("/login");
        }
      }
    };

    checkSession();

    // 2. PASSIVE LISTENER: Watch for logouts in the background
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (isMounted) {
        if (session) {
          setUser(session.user);
          setLoading(false);
        } else {
          router.replace("/login");
        }
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [supabase, router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="w-8 h-8 rounded-full border border-white/20 animate-pulse bg-white/10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 px-4 md:px-8 pb-12">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white uppercase tracking-widest mb-2">Client Portal</h1>
            <p className="text-[#a1a1aa] text-xs uppercase tracking-[0.2em]">Logged in as: <span className="text-[#7c3aed]">{user?.email}</span></p>
          </div>
          <button 
            onClick={handleSignOut}
            className="text-[#a1a1aa] text-[10px] uppercase tracking-widest hover:text-red-500 transition-colors border border-white/10 px-4 py-2 rounded hover:border-red-500/50 bg-[#111]"
          >
            Sign Out
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* SIDEBAR NAVIGATION */}
          <div className="lg:w-64 flex flex-col gap-2">
            <TabButton 
              active={activeTab === "purchases"} 
              onClick={() => setActiveTab("purchases")} 
              label="Arsenal & Licenses" 
            />
            <TabButton 
              active={activeTab === "settings"} 
              onClick={() => setActiveTab("settings")} 
              label="Account Settings" 
            />
            <TabButton 
              active={activeTab === "billing"} 
              onClick={() => setActiveTab("billing")} 
              label="Billing & Cards" 
            />
          </div>

          {/* MAIN CONTENT AREA */}
          <div className="flex-1 bg-[#111] border border-white/10 rounded-xl p-6 md:p-8 shadow-2xl min-h-[500px]">
            
            {/* PURCHASES TAB */}
            {activeTab === "purchases" && (
              <div className="animate-in fade-in duration-500">
                <h2 className="text-white text-sm font-bold uppercase tracking-widest mb-6 border-b border-white/10 pb-4">Order History</h2>
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-black/50 border border-white/5 rounded-lg gap-4">
                  <div>
                    <h3 className="text-white font-bold text-sm">DARK KNIGHT - UNLIMITED LEASE</h3>
                    <p className="text-[#a1a1aa] text-[10px] uppercase tracking-widest mt-1">Order #WB-9921 • May 18, 2026</p>
                  </div>
                  <div className="flex items-center gap-3 w-full md:w-auto">
                    <button className="flex-1 md:flex-none text-center bg-[#7c3aed] text-white text-[10px] uppercase tracking-widest px-4 py-2 rounded font-bold hover:bg-[#6d28d9] transition-colors">
                      Download Audio
                    </button>
                    <button className="flex-1 md:flex-none text-center border border-white/20 text-white text-[10px] uppercase tracking-widest px-4 py-2 rounded hover:bg-white hover:text-black transition-colors">
                      View License
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
                    <input type="email" disabled value={user?.email || ""} className="bg-black/50 border border-white/10 text-white/50 px-4 py-3 rounded text-sm cursor-not-allowed" />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-white text-[10px] uppercase tracking-widest font-bold">New Password</label>
                    <input type="password" placeholder="••••••••" className="bg-black/50 border border-white/10 text-white px-4 py-3 rounded outline-none focus:border-[#7c3aed] transition-colors text-sm" />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-white text-[10px] uppercase tracking-widest font-bold">Billing Address</label>
                    <textarea placeholder="123 Studio Lane..." className="bg-black/50 border border-white/10 text-white px-4 py-3 rounded outline-none focus:border-[#7c3aed] transition-colors text-sm min-h-[100px] resize-none" />
                  </div>

                  <button className="mt-4 bg-white text-black text-[10px] tracking-[0.3em] uppercase font-bold py-4 rounded hover:bg-[#7c3aed] hover:text-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* BILLING TAB */}
            {activeTab === "billing" && (
              <div className="animate-in fade-in duration-500">
                <h2 className="text-white text-sm font-bold uppercase tracking-widest mb-6 border-b border-white/10 pb-4">Payment Methods</h2>
                
                <div className="p-6 border border-dashed border-white/20 bg-black/30 rounded-lg text-center flex flex-col items-center justify-center min-h-[200px]">
                  <p className="text-[#a1a1aa] text-xs uppercase tracking-widest mb-4">No cards currently linked to this account.</p>
                  <button className="border border-[#7c3aed] text-[#7c3aed] text-[10px] uppercase tracking-widest font-bold px-6 py-3 rounded hover:bg-[#7c3aed] hover:text-white transition-colors">
                    + Add New Card
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`text-left px-4 py-4 text-[10px] uppercase tracking-[0.2em] font-bold rounded transition-all ${
        active 
          ? "bg-[#7c3aed] text-white shadow-[0_0_15px_rgba(124,58,237,0.3)]" 
          : "text-[#a1a1aa] hover:bg-white/5 hover:text-white"
      }`}
    >
      {label}
    </button>
  );
}
