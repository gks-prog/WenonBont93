export default function Home() {
  return (
    <main className="min-h-[100dvh] w-full flex flex-col items-center justify-center section-padding relative overflow-hidden">
      
      {/* Subtle Cinematic Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-surface via-background to-background opacity-80 z-0" />
      
      <div className="relative z-10 flex flex-col items-center text-center max-w-[1440px] mx-auto w-full">
        
        <span 
          className="text-accent tracking-[0.2em] text-xs md:text-sm font-semibold uppercase mb-[clamp(1rem,3vh,2rem)] opacity-0 animate-fade-in-up"
          style={{ animationDelay: "100ms" }}
        >
          Project Architecture Initialized
        </span>
        
        <h1 
          className="text-fluid-display font-bold text-primary mb-[clamp(1.5rem,4vh,3rem)] opacity-0 animate-fade-in-up"
          style={{ animationDelay: "300ms" }}
        >
          LUXURY <br /> 
          <span className="text-secondary">FRAMEWORK.</span>
        </h1>
        
        <p 
          className="max-w-[min(100%,600px)] text-fluid-p text-secondary font-light mb-[clamp(2rem,6vh,4rem)] opacity-0 animate-fade-in-up"
          style={{ animationDelay: "500ms" }}
        >
          Next.js 15 infrastructure deployed. Tailwind CSS configured for cinematic typography, adaptive spacing, and fluid responsive layouts.
        </p>
        
        <div 
          className="opacity-0 animate-fade-in-up"
          style={{ animationDelay: "700ms" }}
        >
          <div className="px-10 py-4 bg-transparent border border-surface text-primary font-semibold hover:border-secondary transition-colors duration-300 rounded-sm cursor-default">
            Ready for Components
          </div>
        </div>

      </div>
    </main>
  );
}