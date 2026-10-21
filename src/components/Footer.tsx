import React from 'react';
import { PageId } from '../types';
import { KaiPrakritiEmblem } from './KaiPrakritiEmblem';
import { Linkedin, Instagram, Facebook, BookOpen, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onNavigate?: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { language, t } = useLanguage();

  return (
    <footer className="bg-[#1F3335] text-[#E7E3DC] border-t border-[#E7E3DC]/10 pt-12 pb-10 sm:pt-16 sm:pb-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        
        {/* Top Section: 4 Clean Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10">
          
          {/* Column 1: Brand & Overview (4 cols) */}
          <div className="lg:col-span-4 space-y-3.5 sm:space-y-4">
            <div className="flex items-center space-x-3">
              <div className="shrink-0 bg-white/10 p-1.5 rounded-2xl border border-[#E7E3DC]/20">
                <div className="sm:hidden">
                  <KaiPrakritiEmblem size={38} theme="relax" inverted={true} circularBorder={true} />
                </div>
                <div className="hidden sm:block">
                  <KaiPrakritiEmblem size={46} theme="relax" inverted={true} circularBorder={true} />
                </div>
              </div>
              <div>
                <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-white block">
                  Kai Prakriti
                </span>
                <span className="text-[10px] sm:text-[11px] text-[#E99F4C] font-semibold block">
                  {t.nav.subtitle}
                </span>
              </div>
            </div>

            <p className="text-[#E7E3DC]/80 leading-relaxed text-xs max-w-sm">
              {t.footer.tagline}
            </p>

            {/* Social Channels */}
            <div className="flex items-center space-x-2.5 pt-1 sm:pt-2">
              <a
                href="https://medium.com/@kaiprakriti"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-xl bg-white/10 hover:bg-[#D96846] flex items-center justify-center text-white transition-colors"
                title="Medium Publication"
              >
                <BookOpen className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/kaiprakriti-esg-advisory/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-xl bg-white/10 hover:bg-[#D96846] flex items-center justify-center text-white transition-colors"
                title="LinkedIn — Kai Prakriti ESG Advisory"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/kaiprakriti"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-xl bg-white/10 hover:bg-[#D96846] flex items-center justify-center text-white transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com/kaiprakriti"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-xl bg-white/10 hover:bg-[#D96846] flex items-center justify-center text-white transition-colors"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Governance & Core Services (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <span className="font-semibold text-white uppercase tracking-wider text-[11px] block">
              Core Advisory Practices
            </span>
            <ul className="space-y-2 text-[#E7E3DC]/80">
              <li>
                <button
                  onClick={() => onNavigate?.('services')}
                  className="hover:text-white transition-colors text-left"
                >
                  Scope 1, 2, and Scope 3 GHG Accounting
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('services')}
                  className="hover:text-white transition-colors text-left"
                >
                  SEBI BRSR Core Assurance Filing
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('services')}
                  className="hover:text-white transition-colors text-left"
                >
                  EU CBAM Exporter Readiness & Specific Emissions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('services')}
                  className="hover:text-white transition-colors text-left"
                >
                  Product LCA (ISO 14040/44) & EPDs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('services')}
                  className="hover:text-white transition-colors text-left"
                >
                  Independent Accredited Verifier Facilitation
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Navigation & Insights (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <span className="font-semibold text-white uppercase tracking-wider text-[11px] block">
              Explore
            </span>
            <ul className="space-y-2 text-[#E7E3DC]/80">
              <li>
                <button
                  onClick={() => onNavigate?.('home')}
                  className="hover:text-white transition-colors text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('about')}
                  className="hover:text-white transition-colors text-left"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('services')}
                  className="hover:text-white transition-colors text-left"
                >
                  Service Catalogue
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('blog')}
                  className="hover:text-white transition-colors text-left"
                >
                  Regulatory Insights & Blog
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('contact')}
                  className="hover:text-white transition-colors text-left"
                >
                  Schedule Scoping
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Official Contact Email & Address (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <span className="font-semibold text-white uppercase tracking-wider text-[11px] block">
              Official Correspondence
            </span>
            
            <div className="space-y-3 text-[#E7E3DC]/80">
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#E99F4C] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] text-[#E7E3DC]/60 uppercase tracking-wider font-semibold">Advisory & Operations</div>
                  <a
                    href="mailto:operations@kaiprakriti.com"
                    className="text-white hover:underline font-medium break-all block"
                  >
                    operations@kaiprakriti.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <MapPin className="w-4 h-4 text-[#3E6B48] shrink-0 mt-0.5" />
                <span className="text-xs leading-relaxed">
                  NCR & New Delhi, India • Serving national enterprises and international exporters.
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Section: Legal, Regulatory Firewall */}
        <div className="pt-8 border-t border-white/10 space-y-4">
          
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-[11px] text-[#E7E3DC]/75 leading-relaxed">
            <strong className="text-white">{t.footer.firewallTitle}</strong> {t.footer.firewallText}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#E7E3DC]/70">
            <div>
              © {new Date().getFullYear()} Kai Prakriti. {t.footer.rights}
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
};
