import React from 'react';
import { PageId } from '../types';
import { KaiPrakritiEmblem } from './KaiPrakritiEmblem';
import { ESGMotionLandscape } from './ESGMotionLandscape';
import { Linkedin, Instagram, Facebook, BookOpen, Mail, MapPin, Lock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onNavigate?: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { language, t } = useLanguage();

  return (
    <footer className="relative overflow-hidden bg-black text-white border-t border-neutral-800 pt-12 pb-10 sm:pt-16 sm:pb-14 text-xs">
      {/* Ambient Motion Landscape (Confined Strictly within the Footer Boundary) */}
      <ESGMotionLandscape className="opacity-15 absolute inset-0 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        
        {/* Top Section: 4 High-Contrast White-on-Black Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10">
          
          {/* Column 1: Brand & Logo IN FORWARD (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Elevated Forward Logo Badge (Clean Matte Contrast) */}
            <div className="flex items-center space-x-3.5">
              <div 
                className="relative z-20 shrink-0 bg-white p-2 sm:p-2.5 rounded-xl border border-neutral-300 shadow-sm cursor-pointer hover:opacity-95 transition-opacity"
                onClick={() => onNavigate?.('home')}
                title="Kai Prakriti Official Emblem"
              >
                <div className="sm:hidden">
                  <KaiPrakritiEmblem size={42} theme="verdant" inverted={false} circularBorder={true} />
                </div>
                <div className="hidden sm:block">
                  <KaiPrakritiEmblem size={48} theme="verdant" inverted={false} circularBorder={true} />
                </div>
              </div>
              <div>
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white block">
                  Kai Prakriti
                </span>
                <span className="text-[11px] sm:text-xs text-neutral-300 font-semibold tracking-wide block">
                  {t.nav.subtitle}
                </span>
              </div>
            </div>

            <p className="text-white leading-relaxed text-xs max-w-sm pt-1">
              {t.footer.tagline}
            </p>

            {/* Matte Social Channels */}
            <div className="flex items-center space-x-2.5 pt-2">
              <a
                href="https://medium.com/@kaiprakriti"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-neutral-900 hover:bg-white text-white hover:text-black border border-neutral-800 hover:border-white flex items-center justify-center transition-colors"
                title="Medium Publication"
              >
                <BookOpen className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/kaiprakriti-esg-advisory/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-neutral-900 hover:bg-white text-white hover:text-black border border-neutral-800 hover:border-white flex items-center justify-center transition-colors"
                title="LinkedIn — Kai Prakriti ESG Advisory"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/kaiprakriti"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-neutral-900 hover:bg-white text-white hover:text-black border border-neutral-800 hover:border-white flex items-center justify-center transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com/kaiprakriti"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-neutral-900 hover:bg-white text-white hover:text-black border border-neutral-800 hover:border-white flex items-center justify-center transition-colors"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Governance & Core Services (3 cols) — Pure White Links */}
          <div className="lg:col-span-3 space-y-3">
            <span className="font-bold text-white uppercase tracking-wider text-[11px] block border-b border-neutral-800 pb-1.5">
              Core Advisory Practices
            </span>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate?.('services')}
                  className="text-white hover:text-neutral-300 transition-colors text-left font-medium block py-0.5"
                >
                  • Scope 1, 2 & Scope 3 GHG Accounting
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('services')}
                  className="text-white hover:text-neutral-300 transition-colors text-left font-medium block py-0.5"
                >
                  • SEBI BRSR Core Assurance Filing
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('services')}
                  className="text-white hover:text-neutral-300 transition-colors text-left font-medium block py-0.5"
                >
                  • EU CBAM Exporter Readiness & Specific Emissions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('services')}
                  className="text-white hover:text-neutral-300 transition-colors text-left font-medium block py-0.5"
                >
                  • Product LCA (ISO 14040/44) & EPDs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('services')}
                  className="text-white hover:text-neutral-300 transition-colors text-left font-medium block py-0.5"
                >
                  • Independent Accredited Verifier Facilitation
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Navigation & Insights (2 cols) — Pure White Links */}
          <div className="lg:col-span-2 space-y-3">
            <span className="font-bold text-white uppercase tracking-wider text-[11px] block border-b border-neutral-800 pb-1.5">
              Explore
            </span>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate?.('home')}
                  className="text-white hover:text-neutral-300 transition-colors text-left font-medium block py-0.5"
                >
                  • Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('about')}
                  className="text-white hover:text-neutral-300 transition-colors text-left font-medium block py-0.5"
                >
                  • About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('services')}
                  className="text-white hover:text-neutral-300 transition-colors text-left font-medium block py-0.5"
                >
                  • Service Catalogue
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('blog')}
                  className="text-white hover:text-neutral-300 transition-colors text-left font-medium block py-0.5"
                >
                  • Regulatory Insights & Blog
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('contact')}
                  className="text-white hover:text-neutral-300 transition-colors text-left font-medium block py-0.5"
                >
                  • Schedule Scoping
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Official Contact Email & Address (3 cols) — White on Black */}
          <div className="lg:col-span-3 space-y-3">
            <span className="font-bold text-white uppercase tracking-wider text-[11px] block border-b border-neutral-800 pb-1.5">
              Official Correspondence
            </span>
            
            <div className="space-y-3.5">
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold">
                    Advisory & Engagement
                  </div>
                  <a
                    href="mailto:Kaiprakriti@gmail.com"
                    className="text-white font-bold underline underline-offset-4 hover:text-neutral-300 text-sm tracking-wide block transition-colors mt-0.5"
                  >
                    Kaiprakriti@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <MapPin className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <span className="text-xs leading-relaxed text-white">
                  NCR & New Delhi, India • Serving national enterprises and international exporters.
                </span>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate?.('admin')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-white font-medium text-xs transition-colors"
                >
                  <Lock className="w-3 h-3 text-white" />
                  <span>Admin Portal</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Section: Legal, Regulatory Firewall */}
        <div className="pt-8 border-t border-neutral-800 space-y-4">
          
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-[11px] text-neutral-300 leading-relaxed">
            <strong className="text-white font-bold">{t.footer.firewallTitle}</strong> {t.footer.firewallText}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white">
            <div>
              © {new Date().getFullYear()} Kai Prakriti. {t.footer.rights}
            </div>
            <div className="flex items-center gap-4 text-neutral-400">
              <span className="text-neutral-600">•</span>
              <span className="text-neutral-300 font-medium">Strict Independence Assured</span>
              <span className="text-neutral-600">•</span>
              <span className="text-neutral-300 font-medium">SEBI & GHG Protocol Compliant</span>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
};
