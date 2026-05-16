export function Hero() {
    return (
      // min-h-[100dvh] ensures the hero fits exactly to the mobile browser's visual viewport
      <section className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-background">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-surface via-background to-background opacity-80" />
        
        {/* section-padding ensures text never touches the physical screen edge on small devices */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto section-padding flex flex-col items-center text-center mt-12 md:mt-0">
          <span 
            className="text-accent tracking-[0.2em] text-xs md:text-sm font-semibold uppercase mb-[clamp(1rem,3vh,2rem)] opacity-0 animate-fade-in-up"
            style={{ animationDelay: "100ms" }}
          >
            Music Producer & Creative Artist
          </span>
          
          <h1 
            className="text-fluid-display font-bold text-primary mb-[clamp(1.5rem,4vh,3rem)] opacity-0 animate-fade-in-up"
            style={{ animationDelay: "300ms" }}
          >
            SOUNDSCAPES <br /> 
            <span className="text-secondary">REDEFINED.</span>
          </h1>
          
          <p 
            className="max-w-[min(100%,600px)] text-fluid-p text-secondary font-light mb-[clamp(2rem,6vh,4rem)] opacity-0 animate-fade-in-up mx-auto"
            style={{ animationDelay: "500ms" }}
          >
            Architecting luxury audio experiences. Explore the portfolio, license premium beats, and book studio sessions.
          </p>
          
          {/* Adaptive flex layout: column on mobile, row on larger screens */}
          <div 
            className="flex flex-col sm:flex-row gap-[clamp(1rem,2vw,1.5rem)] w-full sm:w-auto opacity-0 animate-fade-in-up"
            style={{ animationDelay: "700ms" }}
          >
            <button className="w-full sm:w-auto px-10 py-4 bg-primary text-background font-semibold hover:bg-accent hover:text-primary transition-colors duration-300 rounded-sm">
              Explore Beats
            </button>
            <button className="w-full sm:w-auto px-10 py-4 bg-transparent border border-surface text-primary font-semibold hover:border-secondary transition-colors duration-300 rounded-sm">
              Book Studio
            </button>
          </div>
        </div>
      </section>
    );
  }
