"use client";

import Link from "next/link";
import { useState } from "react";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("purchases");

  const TABS = [
    { id: "purchases", label: "My Library" },
    { id: "courses", label: "Active Courses" },
    { id: "settings", label: "Account Settings" },
  ];

  return (
    <main className="min-h-screen bg-[#0a0a0a] flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-80 border-r border-white/5 bg-[#111111] flex flex-col">
        <div className="p-8 border-b border-white/5">
          <Link href="/" className="text-white font-bold text-xl tracking-tighter hover:text-[#7c3aed] transition-colors">WENON BONT</Link>
          <div className="mt-8 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#7c3aed]/20 border border-[#7c3aed]/50 flex items-center justify-center text-white font-bold">U</div>
            <div>
              <p className="text-white text-sm font-bold">User Account</p>
              <p className="text-[#a1a1aa] text-xs">client@example.com</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 flex flex-col gap-2">
          {TABS.map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-left px-6 py-4 rounded-lg text-xs tracking-widest uppercase font-bold transition-all ${activeTab === tab.id ? "bg-white/10 text-white" : "text-[#a1a1aa] hover:bg-white/5 hover:text-white"}`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/5">
          <Link href="/" className="w-full block text-left px-6 py-4 rounded-lg text-xs tracking-widest uppercase font-bold text-red-500/80 hover:bg-red-500/10 hover:text-red-500 transition-all">
            Sign Out
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <section className="flex-1 p-8 md:p-16">
        <h1 className="text-3xl font-bold text-white tracking-tighter mb-10">
          {TABS.find(t => t.id === activeTab)?.label.toUpperCase()}
        </h1>

        {activeTab === "purchases" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Mock Purchase Card */}
            <div className="bg-white/[0.02] border border-white/10 rounded-xl p-6 flex items-center gap-6">
              <div className="w-16 h-16 bg-[#111111] rounded-lg overflow-hidden">
                 <img src="https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=200" alt="Cover" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h4 className="text-white font-bold">CHROMA MELODY KIT</h4>
                <p className="text-[#a1a1aa] text-[10px] uppercase tracking-widest mt-1">Sample Pack</p>
              </div>
              <button className="text-[#7c3aed] hover:text-white transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              </button>
            </div>
          </div>
        )}

        {activeTab === "courses" && (
          <div className="text-center py-20 border border-white/5 border-dashed rounded-2xl">
            <p className="text-[#a1a1aa] text-sm uppercase tracking-widest font-bold">No active courses found.</p>
            <Link href="/courses" className="text-[#7c3aed] text-xs hover:text-white transition-colors mt-4 inline-block">Browse Education</Link>
          </div>
        )}

        {activeTab === "settings" && (
          <form className="max-w-xl flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase font-bold text-[#a1a1aa] tracking-[0.2em] ml-1">Display Name</label>
              <input type="text" defaultValue="User Account" className="bg-[#111111] border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-[#7c3aed]" />
            </div>
            <button type="button" className="w-fit py-4 px-8 bg-white text-black font-bold uppercase tracking-[0.2em] text-[10px] rounded-xl hover:bg-[#7c3aed] hover:text-white transition-all">Save Changes</button>
          </form>
        )}
      </section>
    </main>
  );
}
