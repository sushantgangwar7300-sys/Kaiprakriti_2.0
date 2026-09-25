import React, { useState } from 'react';
import { PageId } from '../types';
import { KaiPrakritiEmblem } from './KaiPrakritiEmblem';
import { Menu, X, ArrowRight, Lock, Code2 } from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenNextJsContext?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenNextJsContext,
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        
        {/* Zone 1: Official Logo (Responsive, crisp circular mark) */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center space-x-2.5 sm:space-x-3.5 group text-left focus:outline-none min-w-0"
        >
          <div className="group-hover:scale-105 transition-transform shrink-0">
            {/* 42px on small mobile, 52px on sm+ */}
            <div className="sm:hidden">
              <KaiPrakritiEmblem size={42} theme="relax" circularBorder={true} />
            </div>
            <div className="hidden sm:block">
              <KaiPrakritiEmblem size={52} theme="relax" circularBorder={true} />
            </div>
          </div>
          <div className="min-w-0">
            <span className="font-serif text-lg sm:text-2xl font-bold tracking-tight text-[#264143] block leading-tight">
              Kai Prakriti
            </span>
            <span className="text-[10px] sm:text-xs text-[#3E6B48] font-semibold tracking-wide block truncate max-w-[130px] xs:max-w-none">
              Sustainability & ESG Advisory
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links (Relaxed, Environmental Aesthetic) */}
        <nav className="hidden md:flex items-center space-x-5 lg:space-x-8 text-sm font-medium text-[#264143]/80">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`transition-colors py-1 relative font-medium ${
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

        {/* Zone 3: Desktop Actions */}
        <div className="hidden md:flex items-center space-x-2.5 lg:space-x-3">
          {onOpenNextJsContext && (
            <button
              onClick={onOpenNextJsContext}
              className="p-2 rounded-xl border border-[#E7E3DC] text-[#264143]/70 hover:text-[#264143] hover:border-[#264143]/30 bg-white/60 hover:bg-white transition-all text-xs flex items-center gap-1.5"
              title="Next.js Context for live site"
            >
              <Code2 className="w-4 h-4 text-[#3E6B48]" />
              <span className="hidden xl:inline text-xs font-semibold">Next.js Context</span>
            </button>
          )}

          <button
            onClick={() => handleNavClick('admin')}
            className={`p-2 sm:px-3 sm:py-2 rounded-xl border transition-all text-xs font-semibold flex items-center gap-1.5 ${
              currentPage === 'admin' || currentPage === 'admin-login'
                ? 'bg-[#264143] text-white border-[#264143]'
                : 'border-[#E7E3DC] text-[#264143] bg-white/60 hover:bg-white hover:border-[#264143]/30'
            }`}
            title="Management Console"
          >
            <Lock className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">Admin</span>
          </button>

          <button
            onClick={() => handleNavClick('contact')}
            className="px-4 lg:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all bg-[#D96846] hover:bg-[#C45737] text-white shadow-xs hover:shadow-sm flex items-center gap-1.5 sm:gap-2 group whitespace-nowrap"
          >
            <span>Let&apos;s Talk</span>
            <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Action & Hamburger Toggle */}
        <div className="flex md:hidden items-center space-x-1.5 sm:space-x-2">
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
        <div className="md:hidden border-t border-[#E7E3DC] bg-[#FBF9F5]/98 backdrop-blur-md px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-2 duration-200">
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

          <div className="pt-3 border-t border-[#E7E3DC] space-y-2.5">
            {onOpenNextJsContext && (
              <button
                onClick={() => {
                  onOpenNextJsContext();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 px-3.5 rounded-xl border border-[#E7E3DC] text-xs font-semibold text-[#264143] bg-white flex items-center justify-center gap-2"
              >
                <Code2 className="w-4 h-4 text-[#3E6B48]" />
                <span>Next.js Architecture Context</span>
              </button>
            )}

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
