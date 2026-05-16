import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full bg-[#0a0a0a] border-t border-white/5 pt-20 pb-10 px-[clamp(1.5rem,5vw,3rem)]">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-20">
          
          {/* Brand Column */}
          <div className="md:col-span-1">
            <h2 className="text-white font-bold text-2xl tracking-tighter mb-4">WENON BONT</h2>
            <p className="text-[#a1a1aa] text-sm leading-relaxed max-w-xs">
              Architecting luxury audio experiences. Premium instrumentals, sample packs, and scoring for forward-thinking artists and brands.
            </p>
          </div>

          {/* Links Column 1: Mapped to Actual Routes */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-[0.2em] uppercase mb-6">Navigation</h4>
            <ul className="flex flex-col gap-4 text-sm text-[#a1a1aa]">
              <li><Link href="/portfolio" className="hover:text-[#7c3aed] transition-colors">Portfolio</Link></li>
              <li><Link href="/beats" className="hover:text-[#7c3aed] transition-colors">Beat Store</Link></li>
              <li><Link href="/sample-packs" className="hover:text-[#7c3aed] transition-colors">Sample Packs</Link></li>
              <li><Link href="/login" className="hover:text-[#7c3aed] transition-colors">Login</Link></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-[0.2em] uppercase mb-6">Support</h4>
            <ul className="flex flex-col gap-4 text-sm text-[#a1a1aa]">
              <li><Link href="#" className="hover:text-white transition-colors">FAQs</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Licensing Info</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-[0.2em] uppercase mb-6">Contact</h4>
            <ul className="flex flex-col gap-4 text-sm text-[#a1a1aa]">
              <li>
                <a href="mailto:contact@wenonbont.com" className="flex items-center gap-2 hover:text-white transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  contact@wenonbont.com
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 hover:text-[#25D366] transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                  WhatsApp Support
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 hover:text-[#E1306C] transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  @wenonbont
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 text-xs text-[#a1a1aa]">
          <p>© {new Date().getFullYear()} WENON BONT. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Designed with precision.</p>
        </div>
      </div>
    </footer>
  );
}
