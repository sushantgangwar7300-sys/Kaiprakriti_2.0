import React, { useState } from 'react';
import { PageId } from '../types';
import { KaiPrakritiEmblem } from './KaiPrakritiEmblem';
import { Menu, X, ArrowRight, Lock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  const navItems: { id: PageId; label: string }[] = [
    { id: 'home', label: t.nav.home },
    { id: 'services', label: t.nav.services },
    { id: 'about', label: t.nav.about },
    { id: 'blog', label: t.nav.blog },
    { id: 'contact', label: t.nav.contact },
  ];

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#183327] border-b border-[#2D4F3E]/60 text-[#FAF8F5] transition-colors shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-3 sm:gap-4">
        
        {/* Zone 1: Official Logo (Cleanly Aligned, Prominently Visible on Calming Sage Header) */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center group text-left focus:outline-none min-w-0 shrink"
          aria-label="Kai Prakriti Home"
        >
          <div className="flex items-center gap-2.5 sm:gap-3 px-2 sm:px-2.5 py-1.5 rounded-2xl transition-all group-hover:bg-white/10">
            <div className="shrink-0 bg-white rounded-xl p-1 shadow-sm flex items-center justify-center">
              {/* 34px on small mobile, 42px on sm+ */}
              <div className="sm:hidden">
                <KaiPrakritiEmblem size={34} theme="relax" circularBorder={true} />
              </div>
              <div className="hidden sm:block">
                <KaiPrakritiEmblem size={42} theme="relax" circularBorder={true} />
              </div>
            </div>
            <div className="min-w-0 pr-1">
              <span className="font-serif text-base sm:text-lg lg:text-xl font-bold tracking-tight text-white block leading-tight truncate">
                Kai Prakriti
              </span>
              <span className="text-[10px] sm:text-xs text-[#E99F4C] font-semibold tracking-wide block truncate">
                {t.nav.subtitle}
              </span>
            </div>
          </div>
        </button>

        {/* Zone 2: Navigation Links (Relaxing Sage & Cream Aesthetic) */}
        <nav className="hidden lg:flex items-center space-x-3 xl:space-x-6 text-xs xl:text-sm font-medium text-[#FAF8F5]/85">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`transition-colors py-1.5 relative font-medium whitespace-nowrap ${
                  isActive
                    ? 'text-white font-bold'
                    : 'text-[#FAF8F5]/80 hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E99F4C] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Desktop Actions (Management Lock + Let's Talk CTA in Terracotta) */}
        <div className="hidden lg:flex items-center space-x-2 xl:space-x-3 shrink-0">
          <button
            onClick={() => handleNavClick('admin')}
            className={`px-2.5 xl:px-3 py-2 rounded-xl border transition-all text-xs font-semibold flex items-center gap-1.5 ${
              currentPage === 'admin' || currentPage === 'admin-login'
                ? 'bg-white text-[#183327] border-white'
                : 'border-white/20 text-[#FAF8F5] bg-white/10 hover:bg-white/20 hover:border-white/40'
            }`}
            title="Management Console"
          >
            <Lock className="w-3.5 h-3.5 text-white" />
            <span>{t.nav.admin}</span>
          </button>

          <button
            onClick={() => handleNavClick('contact')}
            className="px-4 xl:px-5 py-2 xl:py-2.5 rounded-xl text-xs xl:text-sm font-semibold transition-all bg-[#D96846] hover:bg-[#C45737] active:bg-[#B34A2C] text-white shadow-xs hover:shadow-sm flex items-center gap-1.5 sm:gap-2 group whitespace-nowrap"
          >
            <span>{t.nav.letsTalk}</span>
            <ArrowRight className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-white group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Action & Hamburger Toggle */}
        <div className="flex lg:hidden items-center space-x-1.5 sm:space-x-2 shrink-0">
          <button
            onClick={() => handleNavClick('admin')}
            className="p-2 sm:p-2.5 rounded-xl border border-white/20 text-white bg-white/10 active:bg-white/20 transition-colors"
            title="Admin Console"
            aria-label="Admin Console"
          >
            <Lock className="w-4 h-4 text-white" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 sm:p-2.5 rounded-xl border border-white/20 text-white hover:bg-white/20 bg-white/10 active:bg-white/25 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#E99F4C]" /> : <Menu className="w-5 h-5 text-white" />}
          </button>
        </div>

      </div>

      {/* Mobile Nav Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#2D4F3E] bg-[#142A20] px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-in slide-in-from-top-2 duration-200 text-white">
          <div className="space-y-1.5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left py-2.5 px-4 rounded-xl text-sm font-medium transition-all ${
                  currentPage === item.id
                    ? 'bg-white/15 text-[#E99F4C] font-bold border border-white/20'
                    : 'text-[#FAF8F5]/85 hover:bg-white/10 active:bg-white/15'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-[#2D4F3E]">
            <button
              onClick={() => handleNavClick('contact')}
              className="w-full py-3.5 px-4 rounded-xl bg-[#D96846] active:bg-[#C45737] text-white text-center text-sm font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <span>{t.nav.scheduleConsult}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
