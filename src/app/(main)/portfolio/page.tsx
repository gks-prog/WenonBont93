"use client";

import { useState } from "react";

const CATEGORIES = ["All", "Commercials", "Music Videos", "Film Score", "Sound Design"];
const PROJECTS = [
  { title: "Cyber-Punk 2077", client: "CD Projekt Red", category: "Film Score", img: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=1200", span: "md:col-span-2 md:row-span-2" },
  { title: "Ghost in the Shell", client: "Paramount", category: "Sound Design", img: "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=800", span: "md:col-span-1 md:row-span-1" },
  { title: "Liquid Motion", client: "Nike Architecture", category: "Commercials", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800", span: "md:col-span-1 md:row-span-1" },
  { title: "A24: Midsommar", client: "A24", category: "Film Score", img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800", span: "md:col-span-1 md:row-span-2" },
];

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = activeFilter === "All" 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === activeFilter);

  return (
    <main className="pt-32 pb-20 bg-[#0a0a0a] min-h-screen px-[clamp(1.5rem,5vw,3rem)]">
      <div className="max-w-[1440px] mx-auto">
        <header className="mb-20">
          <h1 className="text-5xl md:text-8xl font-bold text-white tracking-tighter mb-8">PORTFOLIO.</h1>
          <div className="flex flex-wrap gap-4 md:gap-8 border-b border-white/10 pb-6">
            {CATEGORIES.map(cat => (
              <button 
                key={cat} 
                onClick={() => setActiveFilter(cat)}
                className={`text-[10px] tracking-[0.3em] uppercase font-bold transition-colors ${activeFilter === cat ? "text-white border-b border-[#7c3aed] pb-1" : "text-[#a1a1aa] hover:text-[#7c3aed]"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[350px] gap-6">
          {filteredProjects.map((project, i) => (
            <div key={i} className={`group relative overflow-hidden rounded-sm bg-[#111111] border border-white/5 ${project.span}`}>
              <img src={project.img} alt={project.title} className="absolute inset-0 w-full h-full object-cover opacity-50 transition-transform duration-1000 group-hover:scale-110 group-hover:opacity-30" />
              <div className="absolute inset-0 p-10 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/20 to-transparent">
                <span className="text-[#7c3aed] text-[10px] font-bold tracking-[0.3em] uppercase mb-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-500">{project.category}</span>
                <h3 className="text-3xl font-bold text-white tracking-tighter">{project.title}</h3>
                <p className="text-[#a1a1aa] text-xs tracking-widest uppercase mt-1">{project.client}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
