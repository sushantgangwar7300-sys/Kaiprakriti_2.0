import React, { useState } from 'react';
import { PageId } from '../types';
import { KaiPrakritiEmblem } from './KaiPrakritiEmblem';
import { Menu, X, ArrowRight, Lock } from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About Us' },
    { id: 'blog', label: 'Insights & Blog' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FBF9F5]/95 backdrop-blur-md border-b border-[#E7E3DC] text-[#264143] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        
        {/* Zone 1: Official Logo (Responsive, crisp circular mark) */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center space-x-2 sm:space-x-3 group text-left focus:outline-none min-w-0 shrink"
        >
          <div className="group-hover:scale-105 transition-transform shrink-0">
            {/* 38px on small mobile, 48px on sm+ */}
            <div className="sm:hidden">
              <KaiPrakritiEmblem size={38} theme="relax" circularBorder={true} />
            </div>
            <div className="hidden sm:block">
              <KaiPrakritiEmblem size={48} theme="relax" circularBorder={true} />
            </div>
          </div>
          <div className="min-w-0">
            <span className="font-serif text-base sm:text-xl lg:text-2xl font-bold tracking-tight text-[#264143] block leading-tight truncate">
              Kai Prakriti
            </span>
            <span className="text-[10px] sm:text-xs text-[#3E6B48] font-semibold tracking-wide block truncate">
              Sustainability & ESG Advisory
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links (Centric, Relaxed Environmental Aesthetic) */}
        <nav className="hidden lg:flex items-center space-x-3.5 xl:space-x-7 text-xs xl:text-sm font-medium text-[#264143]/80">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`transition-colors py-1 relative font-medium whitespace-nowrap ${
                  isActive
                    ? 'text-[#264143] font-bold'
                    : 'hover:text-[#D96846]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D96846] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Desktop Actions (Management Lock + Let's Talk CTA) */}
        <div className="hidden lg:flex items-center space-x-2 xl:space-x-3 shrink-0">
          <button
            onClick={() => handleNavClick('admin')}
            className={`px-2.5 xl:px-3 py-2 rounded-xl border transition-all text-xs font-semibold flex items-center gap-1.5 ${
              currentPage === 'admin' || currentPage === 'admin-login'
                ? 'bg-[#264143] text-white border-[#264143]'
                : 'border-[#E7E3DC] text-[#264143] bg-white/60 hover:bg-white hover:border-[#264143]/30'
            }`}
            title="Management Console"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Admin</span>
          </button>

          <button
            onClick={() => handleNavClick('contact')}
            className="px-3.5 xl:px-5 py-2 xl:py-2.5 rounded-xl text-xs xl:text-sm font-semibold transition-all bg-[#D96846] hover:bg-[#C45737] text-white shadow-xs hover:shadow-sm flex items-center gap-1.5 sm:gap-2 group whitespace-nowrap"
          >
            <span>Let&apos;s Talk</span>
            <ArrowRight className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-white group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Action & Hamburger Toggle */}
        <div className="flex lg:hidden items-center space-x-1.5 sm:space-x-2 shrink-0">
          <button
            onClick={() => handleNavClick('admin')}
            className="p-2 sm:p-2.5 rounded-xl border border-[#E7E3DC] text-[#264143] bg-white active:bg-slate-50 transition-colors"
            title="Admin Console"
            aria-label="Admin Console"
          >
            <Lock className="w-4 h-4" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 sm:p-2.5 rounded-xl border border-[#E7E3DC] text-[#264143] hover:bg-white bg-white/80 active:bg-slate-50 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#D96846]" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Nav Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E7E3DC] bg-[#FBF9F5]/98 backdrop-blur-md px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-2 duration-200">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`block w-full text-left py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                currentPage === item.id
                  ? 'bg-white text-[#D96846] font-bold shadow-xs border border-[#E7E3DC]'
                  : 'text-[#264143] hover:bg-white/70 active:bg-white'
              }`}
            >
              {item.label}
            </button>
          ))}

          <div className="pt-3 border-t border-[#E7E3DC]">
            <button
              onClick={() => handleNavClick('contact')}
              className="w-full py-3.5 px-4 rounded-xl bg-[#D96846] active:bg-[#C45737] text-white text-center text-sm font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <span>Schedule Strategic Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
