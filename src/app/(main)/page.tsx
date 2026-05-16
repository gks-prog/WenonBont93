"use client";

const COURSES = [
  { id: 1, title: "THE DARK TRAP MASTERCLASS", duration: "4.5 Hours", modules: 12, price: "$99", image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800" },
  { id: 2, title: "CINEMATIC SCORING FOR BRANDS", duration: "6 Hours", modules: 18, price: "$149", image: "https://images.unsplash.com/photo-1518814441584-1845fbb1f20d?q=80&w=800" }
];

export default function CoursesPage() {
  return (
    <main className="pt-32 pb-20 bg-[#0a0a0a] min-h-screen">
      <div className="max-w-[1440px] mx-auto px-[clamp(1.5rem,5vw,3rem)]">
        <div className="mb-20">
          <h1 className="text-5xl md:text-8xl font-bold text-white tracking-tighter">SONIC<br/><span className="text-[#a1a1aa]">EDUCATION.</span></h1>
          <p className="text-[#a1a1aa] mt-6 max-w-xl text-sm leading-relaxed tracking-wide">Learn the exact techniques used to score global commercials and produce chart-topping dark trap anthems.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {COURSES.map((course) => (
            <div key={course.id} className="group relative bg-[#111111] rounded-2xl overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-500">
              <div className="aspect-video relative overflow-hidden">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover opacity-70 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-[#7c3aed] transition-colors">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="white" className="ml-1"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-white tracking-tight">{course.title}</h3>
                  <span className="text-xl font-bold text-white">{course.price}</span>
                </div>
                <div className="flex gap-4 text-[#a1a1aa] text-xs uppercase tracking-widest font-bold mb-8">
                  <span>{course.modules} Modules</span>
                  <span>•</span>
                  <span>{course.duration}</span>
                </div>
                <button className="w-full py-4 bg-white/5 border border-white/10 text-white text-[10px] tracking-[0.2em] uppercase font-bold hover:bg-white hover:text-black transition-all rounded-lg">
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
