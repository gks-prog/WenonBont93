const WORKS = [
  { title: "NIKE AIR", role: "Original Score", size: "md:col-span-2 md:row-span-2", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop" },
  { title: "PARIS FASHION WEEK", role: "Sound Design", size: "md:col-span-1 md:row-span-1", img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop" },
  { title: "NEON DEMON", role: "Co-Production", size: "md:col-span-1 md:row-span-1", img: "https://images.unsplash.com/photo-1604076913837-52ab5629fba9?q=80&w=800&auto=format&fit=crop" },
];

export function Portfolio() {
  return (
    <section id="portfolio" className="w-full section-padding bg-[#111111]">
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-16 md:mb-24 flex flex-col items-center text-center">
          <h2 className="text-[#7c3aed] text-xs font-bold tracking-[0.3em] uppercase mb-4">Selected Works</h2>
          <h3 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">CREATIVE <br/><span className="text-[#a1a1aa]">VISION.</span></h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[400px] gap-6">
          {WORKS.map((work, i) => (
            <div key={i} className={`group relative overflow-hidden bg-[#0a0a0a] rounded-sm ${work.size}`}>
              <img src={work.img} alt={work.title} className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-1000 group-hover:scale-105 group-hover:opacity-40" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/20 to-transparent">
                <span className="text-[#7c3aed] text-xs font-bold tracking-[0.2em] uppercase translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">{work.role}</span>
                <h4 className="text-3xl font-bold text-white tracking-tighter mt-2">{work.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
