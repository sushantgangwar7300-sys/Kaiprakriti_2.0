import React, { useEffect, useRef } from 'react';
import { DesignThemeId } from '../types';
import { KaiPrakritiEmblem } from './KaiPrakritiEmblem';
import { ArrowDown, ShieldCheck, ArrowUpRight, Sparkles, Scale, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  theme: DesignThemeId;
  onOpenDesignGuide: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  theme,
  onOpenDesignGuide,
}) => {
  const isDark = theme === 'vibrant';
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;

    try {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    } catch (_) {}

    return () => {
      if (video) {
        try {
          video.pause();
        } catch (_) {}
      }
    };
  }, []);

  return (
    <section className="relative pt-12 pb-20 px-4 sm:px-6 overflow-hidden">
      {/* Scenic Aerial Wind Turbines Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          poster="https://images.pexels.com/videos/37711545/pictures/preview-0.jpg"
          className="w-full h-full object-cover scale-105 opacity-25"
        >
          <source
            src="https://videos.pexels.com/video-files/37711545/15992625_2560_1440_30fps.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-[#0E1513] dark:via-[#0E1513]/80 dark:to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Main Grid: Left Emblem Showcase + Right Core Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Living Circular Emblem Badge */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center text-center">
            <div className="relative group cursor-pointer" onClick={onOpenDesignGuide}>
              {/* Subtle background glow */}
              <div
                className="absolute inset-0 rounded-full blur-2xl opacity-40 group-hover:opacity-70 transition-opacity"
                style={{
                  backgroundColor: isDark ? '#23E391' : '#2D7A4D',
                }}
              />
              <div className="relative p-3 rounded-full border-2 border-[#3E6B48]/30 bg-white/60 dark:bg-black/40 backdrop-blur-xs transition-transform duration-300 group-hover:scale-105 shadow-sm">
                <KaiPrakritiEmblem size="xl" theme="relax" circularBorder={true} />
              </div>
            </div>

            {/* Click to inspect badge */}
            <button
              onClick={onOpenDesignGuide}
              className="mt-6 inline-flex items-center gap-1.5 font-mono text-[11px] px-3.5 py-1.5 rounded-full border border-current opacity-70 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/10 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
              <span>Click emblem to inspect brand symbolism</span>
            </button>
          </div>

          {/* Right Column: High-Impact Headline & Core Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="font-mono text-xs font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-full border inline-flex items-center gap-1.5"
                style={{
                  borderColor: isDark ? '#23E391' : '#2D7A4D',
                  color: isDark ? '#23E391' : '#2D7A4D',
                  backgroundColor: isDark ? 'rgba(35, 227, 145, 0.1)' : 'rgba(45, 122, 77, 0.08)',
                }}
              >
                <span>KAIPRAKRITI</span>
                <span>•</span>
                <span>ESG & CARBON ADVISORY</span>
              </span>

              <span className="font-mono text-xs opacity-60">
                प्रकृति-सतत-विकासः
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight leading-[1.1]">
              We measure it.{' '}
              <span
                className="inline-block"
                style={{ color: isDark ? '#23E391' : '#2D7A4D' }}
              >
                Someone independent verifies it.
              </span>
            </h1>

            <p className="text-base sm:text-xl opacity-90 leading-relaxed font-light max-w-2xl">
              Kai Prakriti is a sustainability consultancy in India. We do the quantitative measurement and reporting work ourselves, and connect you to accredited verifiers when rules require someone independent.
              <strong className="block mt-2 font-semibold">
                We never verify our own work.
              </strong>
            </p>

            {/* Key Differentiators / Duality Tags */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-mono text-xs">
              <div className="p-3.5 rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] flex items-center space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <div>
                  <strong className="block text-[11px] uppercase">DIRECT MEASUREMENT:</strong>
                  <span className="opacity-75 text-[11px]">GHG Scope 1-3, BRSR, LCA, ZED</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] flex items-center space-x-2.5">
                <Scale className="w-4 h-4 text-amber-500 shrink-0" />
                <div>
                  <strong className="block text-[11px] uppercase">FACILITATED VERIFICATION:</strong>
                  <span className="opacity-75 text-[11px]">BEE ACVA, EU CBAM, ISO 14064-3</span>
                </div>
              </div>
            </div>

            {/* Call to Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="#services"
                className="px-7 py-3.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-all bg-emerald-600 hover:bg-emerald-500 text-white shadow-md flex items-center gap-2"
              >
                <span>Explore The 11 Services</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </a>

              <a
                href="#structural-split"
                className="px-6 py-3.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-all border border-current hover:bg-black/5 dark:hover:bg-white/10 flex items-center gap-1.5"
              >
                <span>How We Split The Revenue Lines</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>

        {/* Institutional Metrics Banner */}
        <div className="mt-16 pt-8 border-t border-black/10 dark:border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center font-mono">
          <div className="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
            <span className="font-serif text-3xl sm:text-4xl font-bold block" style={{ color: isDark ? '#23E391' : '#2D7A4D' }}>
              11
            </span>
            <span className="text-xs opacity-70 uppercase tracking-wider block mt-1">
              Governed Services
            </span>
          </div>

          <div className="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
            <span className="font-serif text-3xl sm:text-4xl font-bold block" style={{ color: isDark ? '#23E391' : '#2D7A4D' }}>
              2
            </span>
            <span className="text-xs opacity-70 uppercase tracking-wider block mt-1">
              Transparent Lines on Invoice
            </span>
          </div>

          <div className="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
            <span className="font-serif text-3xl sm:text-4xl font-bold block" style={{ color: isDark ? '#23E391' : '#2D7A4D' }}>
              6
            </span>
            <span className="text-xs opacity-70 uppercase tracking-wider block mt-1">
              Governed Regimes Mapped
            </span>
          </div>

          <div className="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
            <span className="font-serif text-3xl sm:text-4xl font-bold block text-emerald-500">
              0%
            </span>
            <span className="text-xs opacity-70 uppercase tracking-wider block mt-1">
              Self-Audit Conflict of Interest
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
