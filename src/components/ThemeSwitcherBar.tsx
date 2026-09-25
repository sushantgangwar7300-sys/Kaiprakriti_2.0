import React from 'react';
import { DesignThemeId } from '../types';
import { DESIGN_DIRECTIONS } from '../data/consultancyData';
import { Sparkles, Palette, Check } from 'lucide-react';

interface ThemeSwitcherBarProps {
  currentTheme: DesignThemeId;
  onSelectTheme: (id: DesignThemeId) => void;
  onOpenDesignGuide: () => void;
}

export const ThemeSwitcherBar: React.FC<ThemeSwitcherBarProps> = ({
  currentTheme,
  onSelectTheme,
  onOpenDesignGuide,
}) => {
  return (
    <aside aria-label="Design Concept Explorer" className="sticky top-0 z-50 w-full border-b backdrop-blur-md transition-colors duration-300 bg-black/80 border-white/15 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Left: Indicator & Guide Trigger */}
        <div className="flex items-center space-x-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-mono text-[11px] font-semibold text-white/80 tracking-wide uppercase">
            DESIGN CONCEPT EXPLORER:
          </span>
          <span className="hidden md:inline font-sans text-white/50 text-[11px]">
            Switch live themes comparing your logo & prototype
          </span>
        </div>

        {/* Center: 3 Theme Buttons */}
        <div className="flex items-center space-x-1.5 p-1 bg-white/10 rounded-full border border-white/10">
          {DESIGN_DIRECTIONS.map((dir) => {
            const isActive = currentTheme === dir.id;
            return (
              <button
                key={dir.id}
                onClick={() => onSelectTheme(dir.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-zinc-950 font-bold shadow-sm'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
                title={dir.subtitle}
              >
                {/* Dot with swatch color */}
                <span
                  className="w-2.5 h-2.5 rounded-full border border-black/20"
                  style={{ backgroundColor: dir.swatches[0].hex }}
                />
                <span>{dir.title}</span>
                {isActive && <Check className="w-3 h-3 text-emerald-600 ml-0.5" />}
              </button>
            );
          })}
        </div>

        {/* Right: Design Ideas & Rationale Button */}
        <button
          onClick={onOpenDesignGuide}
          className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-400 text-zinc-950 font-mono font-bold rounded-full hover:brightness-110 transition-all text-xs shadow-sm hover:shadow-emerald-500/20"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>DESIGN IDEAS & BRAND RATIONALE</span>
        </button>
      </div>
    </aside>
  );
};
