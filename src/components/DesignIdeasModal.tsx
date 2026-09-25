import React, { useState } from 'react';
import { DESIGN_DIRECTIONS } from '../data/consultancyData';
import { KaiPrakritiEmblem } from './KaiPrakritiEmblem';
import { X, CheckCircle2, Sparkles, BookOpen, Layers, ShieldCheck, FileText, ArrowRight, Copy, Check } from 'lucide-react';
import { DesignThemeId } from '../types';

interface DesignIdeasModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: DesignThemeId;
  onSelectTheme: (id: DesignThemeId) => void;
}

export const DesignIdeasModal: React.FC<DesignIdeasModalProps> = ({
  isOpen,
  onClose,
  currentTheme,
  onSelectTheme,
}) => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      <div
        className="relative w-full max-w-5xl bg-[#12141A] text-white rounded-2xl border border-white/20 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-white/5">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                Kai Prakriti Design Strategy & Architectural Ideas
              </h2>
              <p className="font-mono text-xs text-white/60">
                Synthesis of Logo Emblem (Input 1) + ESG Prototype & 11 Services (Input 2)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-6 space-y-8 text-sm">
          
          {/* Section 1: Analysis of the 2 Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Input 1 Analysis */}
            <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Input 1: The Circular Emblem
                </span>
                <span className="font-mono text-[11px] text-white/40">Visual Identity</span>
              </div>
              <div className="flex items-center gap-4 pt-1">
                <KaiPrakritiEmblem size="sm" theme="verdant" />
                <div>
                  <h4 className="font-serif font-bold text-white text-base">प्रकृति-सतत-विकासः</h4>
                  <p className="font-mono text-[11px] text-white/70">Continuous Sustainable Development</p>
                </div>
              </div>
              <p className="text-white/80 text-xs leading-relaxed">
                The logo contains two intertwined metaphors: an <strong>organic botanical leaf</strong> (representing <em>Prakriti</em>, biosphere and nature) intersected by a <strong>four-node connected graph</strong> (representing <em>Satat Vikas</em>, empirical data, coordinate math, and emissions measurement).
              </p>
              <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-lg text-emerald-300 text-xs font-mono">
                💡 <strong>Design Takeaway:</strong> The website should balance organic warmth with data precision. Avoid pure SaaS clichés; embrace botanical greens, warm paper canvases, and coordinate lines.
              </div>
            </div>

            {/* Input 2 Analysis */}
            <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-purple-400 uppercase tracking-widest font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-400"></span> Input 2: The HTML Prototype
                </span>
                <span className="font-mono text-[11px] text-white/40">Business Architecture</span>
              </div>
              <h4 className="font-serif font-bold text-white text-base">
                "We measure it. Someone independent verifies it."
              </h4>
              <p className="text-white/80 text-xs leading-relaxed">
                Your HTML draft introduces a revolutionary commercial proposition for Indian ESG: <strong>Two distinct revenue lines</strong> (Direct Measurement vs Facilitated Introduction) with 11 concrete services across GHG Protocol, SEBI BRSR Core, EU CBAM, and MSME ZED.
              </p>
              <div className="p-3 bg-purple-950/40 border border-purple-500/30 rounded-lg text-purple-300 text-xs font-mono">
                💡 <strong>Design Takeaway:</strong> Your website's UI must visually manifest this split. Every service card, fee discussion, and invoice reference must clearly differentiate Direct Work from Facilitated Work.
              </div>
            </div>
          </div>

          {/* Section 2: Three Distinct Design Directions to Explore */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-lg font-bold text-white">Three Curated Aesthetic Directions</h3>
                <p className="font-sans text-xs text-white/60">
                  Click any direction to instantly preview it across the live website:
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {DESIGN_DIRECTIONS.map((dir) => {
                const isActive = currentTheme === dir.id;
                return (
                  <div
                    key={dir.id}
                    onClick={() => onSelectTheme(dir.id)}
                    className={`cursor-pointer p-4 rounded-xl border transition-all duration-200 flex flex-col justify-between ${
                      isActive
                        ? 'bg-white/10 border-emerald-400 shadow-lg shadow-emerald-500/10'
                        : 'bg-white/[0.02] border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                          {dir.title}
                          {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                        </span>
                        <span className="font-mono text-[10px] text-white/40 uppercase">
                          {dir.id}
                        </span>
                      </div>
                      <p className="text-xs text-white/80 line-clamp-2">{dir.subtitle}</p>
                      <p className="text-[11px] text-white/60 line-clamp-3">{dir.whyItWorks}</p>
                    </div>

                    {/* Color Swatch Strip */}
                    <div className="pt-4 mt-3 border-t border-white/10">
                      <div className="flex items-center space-x-1.5 mb-2">
                        {dir.swatches.map((s, idx) => (
                          <div
                            key={idx}
                            className="w-5 h-5 rounded-full border border-black/30 shadow-xs cursor-pointer relative group"
                            style={{ backgroundColor: s.hex }}
                            onClick={(e) => {
                              e.stopPropagation();
                              copyHex(s.hex);
                            }}
                            title={`${s.name} (${s.hex}) - Click to copy`}
                          >
                            <span className="opacity-0 group-hover:opacity-100 absolute -top-6 left-1/2 -translate-x-1/2 bg-black text-[9px] font-mono px-1 py-0.5 rounded text-white whitespace-nowrap pointer-events-none transition-opacity">
                              {s.hex}
                            </span>
                          </div>
                        ))}
                      </div>
                      <button
                        className={`w-full py-1.5 px-3 rounded-lg text-xs font-mono font-bold transition-colors ${
                          isActive
                            ? 'bg-emerald-500 text-zinc-950'
                            : 'bg-white/5 hover:bg-white/15 text-white/80'
                        }`}
                      >
                        {isActive ? 'Current Active Theme' : 'Apply This Direction'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 3: Strategic Design Ideas & Recommendations */}
          <div className="space-y-4 pt-2">
            <h3 className="font-serif text-lg font-bold text-white">5 Key Design Ideas for your Consultancy Website</h3>

            <div className="space-y-3">
              {/* Idea 1 */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex items-start space-x-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-white text-sm">
                    1. The "Dual-Pillar Interface" for Direct vs. Facilitated Work
                  </h4>
                  <p className="text-xs text-white/70 mt-1 leading-relaxed">
                    Most consultancies obscure whether they are measuring or certifying. Kai Prakriti's biggest competitive moat is <strong>zero conflict of interest</strong>. Use color-coded pill tags throughout your site:
                    <span className="inline-block mx-1 px-2 py-0.5 bg-emerald-500/20 text-emerald-300 font-mono text-[10px] rounded border border-emerald-500/30">Direct Work</span> for calculations you perform, and 
                    <span className="inline-block mx-1 px-2 py-0.5 bg-amber-500/20 text-amber-300 font-mono text-[10px] rounded border border-amber-500/30">Facilitated Work</span> for introductions to accredited bodies with disclosed fees.
                  </p>
                </div>
              </div>

              {/* Idea 2 */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex items-start space-x-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 mt-0.5">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-white text-sm">
                    2. Dynamic Logo Integration as a Regulatory Seal
                  </h4>
                  <p className="text-xs text-white/70 mt-1 leading-relaxed">
                    Rather than just placing the logo in the top-left corner, feature the circular emblem as an <strong>authenticity watermark and section seal</strong>. The circular geometry with Sanskrit text (*प्रकृति-सतत-विकासः*) reinforces cultural authority, grounding cutting-edge carbon math in ancient stewardship philosophy.
                  </p>
                </div>
              </div>

              {/* Idea 3 */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex items-start space-x-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 mt-0.5">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-white text-sm">
                    3. Interactive "Sample Invoice" on the Landing Page
                  </h4>
                  <p className="text-xs text-white/70 mt-1 leading-relaxed">
                    Prospective clients (CFOs and EHS Heads) are notoriously suspicious of greenwashing and hidden referral markups. Display an interactive sample invoice on your website showing exactly how Kai Prakriti bills: Direct Work clearly stated, Facilitated Work commission transparently noted with zero client markup.
                  </p>
                </div>
              </div>

              {/* Idea 4 */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex items-start space-x-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 mt-0.5">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-white text-sm">
                    4. Tri-Font Typographic Hierarchy
                  </h4>
                  <p className="text-xs text-white/70 mt-1 leading-relaxed">
                    Use <strong>Fraunces</strong> for editorial prestige in headlines (optical sizing, humanist serif), paired with <strong>Overpass</strong> for body text clarity and <strong>IBM Plex Mono</strong> for regulatory standards (e.g. <code>ISO 14064-1:2018</code>, <code>EU 2023/956</code>, <code>SEBI BRSR Core</code>). This signals institutional authority.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Copied feedback toast */}
          {copiedHex && (
            <div className="fixed bottom-6 right-6 bg-emerald-500 text-zinc-950 font-mono text-xs px-3 py-2 rounded-lg shadow-lg flex items-center gap-1.5 font-bold">
              <Check className="w-4 h-4" /> Copied {copiedHex} to clipboard!
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-white/10 bg-white/5 flex items-center justify-between">
          <span className="font-mono text-xs text-white/50">
            Current Active Direction: <strong className="text-emerald-400 uppercase">{currentTheme}</strong>
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-emerald-500 text-zinc-950 font-mono text-xs font-bold hover:bg-emerald-400 transition-colors"
          >
            Explore Live Site
          </button>
        </div>
      </div>
    </div>
  );
};
