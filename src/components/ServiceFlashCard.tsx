import React, { useState, useEffect } from 'react';
import { ServiceItem } from '../types';
import { CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ServiceFlashCardProps {
  service: ServiceItem;
  index: number;
  onSelect: (service: ServiceItem) => void;
  priority?: boolean;
}

export const ServiceFlashCard: React.FC<ServiceFlashCardProps> = ({
  service,
  index,
  onSelect,
}) => {
  // Array of images for looping carousel inside card
  const images = (service.galleryImages && service.galleryImages.length > 0)
    ? service.galleryImages
    : (service.imageUrl ? [service.imageUrl] : [
        'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80'
      ]);

  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-running image loop (cycles every 3.8 seconds continuously)
  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % images.length);
    }, 3800);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: 0.6,
        delay: (index % 3) * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{
        y: -6,
        transition: { duration: 0.25, ease: 'easeOut' },
      }}
      onClick={() => onSelect(service)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative cursor-pointer rounded-3xl bg-[#080B0C] border border-[#1E2628] hover:border-[#D4AF37]/50 p-5 sm:p-7 shadow-2xl transition-all duration-300 flex flex-col justify-between space-y-5 sm:space-y-6 overflow-hidden min-w-0"
      style={{
        boxShadow: isHovered
          ? '0 24px 48px -12px rgba(0, 0, 0, 0.8), 0 0 28px rgba(212, 175, 55, 0.18)'
          : '0 16px 36px -12px rgba(0, 0, 0, 0.6)',
      }}
    >
      {/* ====================================================================
          THREAD OF GOLDEN LIGHT BACKGROUND DESIGN
          ==================================================================== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        
        {/* Soft Golden Ambient Radial Aura */}
        <div
          className="absolute -top-20 -right-20 w-72 h-72 rounded-full blur-3xl transition-transform duration-700 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.16) 0%, rgba(233, 159, 76, 0.05) 50%, transparent 75%)',
            transform: isHovered ? 'scale(1.3) translate(-10px, 10px)' : 'scale(1)',
          }}
        />

        <div
          className="absolute -bottom-24 -left-20 w-80 h-80 rounded-full blur-3xl transition-opacity duration-700 pointer-events-none opacity-40 group-hover:opacity-70"
          style={{
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, rgba(62, 107, 72, 0.06) 60%, transparent 80%)',
          }}
        />

        {/* Golden Filament Waveform Paths */}
        <svg
          className="absolute inset-0 w-full h-full opacity-65 group-hover:opacity-100 transition-opacity duration-700"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 400 480"
        >
          <defs>
            {/* Golden Thread Gradient */}
            <linearGradient id={`goldThreadGrad-${service.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.05" />
              <stop offset="25%" stopColor="#F59E0B" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#FDE68A" stopOpacity="0.95" />
              <stop offset="75%" stopColor="#D97706" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.1" />
            </linearGradient>

            {/* Radiant Glow Filter */}
            <filter id={`threadGlow-${service.id}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Primary Radiant Golden Thread with Harmonic Waveform */}
          <path
            d="M -30,80 Q 90,160 190,100 T 360,150 T 440,60"
            fill="none"
            stroke={`url(#goldThreadGrad-${service.id})`}
            strokeWidth="1.75"
            filter={`url(#threadGlow-${service.id})`}
            className="transition-all duration-700"
          />

          {/* Secondary Delicate Golden Thread */}
          <path
            d="M -20,260 C 100,200 210,320 310,240 S 390,290 430,220"
            fill="none"
            stroke={`url(#goldThreadGrad-${service.id})`}
            strokeWidth="1"
            strokeDasharray="5 7"
            opacity="0.5"
          />

          {/* Delicate Top-Right Golden Geometric Flourish */}
          <circle cx="360" cy="40" r="1.5" fill="#FDE68A" opacity="0.8" />
          <line x1="330" y1="40" x2="390" y2="40" stroke="#D4AF37" strokeWidth="0.5" opacity="0.3" />
        </svg>

        {/* Subtle Luxury Corner Framing Hairline */}
        <div className="absolute top-0 right-0 w-24 h-24 border-t border-r border-[#D4AF37]/20 rounded-tr-3xl pointer-events-none group-hover:border-[#D4AF37]/50 transition-colors" />
        <div className="absolute bottom-0 left-0 w-24 h-24 border-b border-l border-[#D4AF37]/10 rounded-bl-3xl pointer-events-none group-hover:border-[#D4AF37]/35 transition-colors" />
      </div>

      {/* ====================================================================
          CARD BODY CONTENT
          ==================================================================== */}
      <div className="relative z-10 space-y-4">
        
        {/* Top Header Row: Standard Pill & Practice Number */}
        <div className="flex items-center justify-between text-xs">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-semibold text-[#F5C26B] bg-[#D4AF37]/10 border border-[#D4AF37]/30 shadow-2xs backdrop-blur-md">
            <Sparkles className="w-3 h-3 text-[#E99F4C]" />
            <span>{service.standardCode || service.standard}</span>
          </span>

          <span className="text-[#D4AF37]/60 font-mono text-xs tracking-wider font-semibold">
            0{index + 1}
          </span>
        </div>

        {/* ==================================================================
            IMAGE LOOP CONTAINER (Strictly Aligned Inside Card Boundaries)
            ================================================================== */}
        <div className="w-full h-44 sm:h-48 rounded-2xl overflow-hidden relative border border-[#2D3739] group-hover:border-[#D4AF37]/40 bg-[#0B0F10] shadow-md transition-colors duration-300">
          
          {/* Looping Image Carousel Layer */}
          <AnimatePresence mode="wait">
            <motion.img
              key={images[currentImgIndex]}
              src={images[currentImgIndex]}
              alt={`${service.title} - view ${currentImgIndex + 1}`}
              loading="lazy"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.75, ease: 'easeInOut' }}
              className="w-full h-full object-cover object-center"
            />
          </AnimatePresence>

          {/* Luxury Film Gradients Over Image */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080B0C] via-black/25 to-transparent opacity-85" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/30 pointer-events-none" />

          {/* Key Metric / Scope Overlay at Bottom Left */}
          <div className="absolute bottom-2.5 left-3.5 right-14 text-[11px] text-[#F3EFE6] font-medium truncate drop-shadow-sm flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E99F4C] animate-pulse shrink-0" />
            <span className="truncate">{service.keyMetric || service.standard}</span>
          </div>

          {/* Looping Indicator Progress Pills at Bottom Right */}
          {images.length > 1 && (
            <div className="absolute bottom-2.5 right-3 flex items-center space-x-1 bg-black/60 backdrop-blur-md px-2 py-1 rounded-full border border-white/10">
              {images.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImgIndex(dotIdx);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    dotIdx === currentImgIndex
                      ? 'w-4 bg-[#F5C26B]'
                      : 'w-1.5 bg-white/30 hover:bg-white/60'
                  }`}
                  aria-label={`Show image ${dotIdx + 1}`}
                />
              ))}
            </div>
          )}

          {/* Practice Badge in Top Right */}
          <div className="absolute top-2.5 right-3">
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md uppercase tracking-wider backdrop-blur-md border ${
              service.category === 'direct'
                ? 'bg-[#3E6B48]/30 text-[#86EFAC] border-[#3E6B48]/40'
                : 'bg-[#D96846]/30 text-[#FDBA74] border-[#D96846]/40'
            }`}>
              {service.category === 'direct' ? 'Direct Work' : 'Facilitated'}
            </span>
          </div>

        </div>

        {/* Title */}
        <h3 className="font-serif text-lg sm:text-xl font-bold text-white group-hover:text-[#F3C068] transition-colors leading-snug">
          {service.title}
        </h3>

        {/* Short Description */}
        <p className="text-xs sm:text-sm text-[#C8C3BA] leading-relaxed line-clamp-3">
          {service.shortDesc}
        </p>

        {/* Core Technical Deliverable Box */}
        {service.deliverables && service.deliverables.length > 0 && (
          <div className="p-3.5 rounded-2xl bg-[#0F1416]/90 border border-[#20282A] group-hover:border-[#D4AF37]/30 transition-colors space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-[#D4AF37] block">
                Primary Deliverable
              </span>
              <span className="text-[10px] text-white/40 font-mono">Verified</span>
            </div>
            <div className="text-xs text-[#EAE6DE] font-medium flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#34D399] shrink-0 mt-0.5" />
              <span className="line-clamp-2">{service.deliverables[0]}</span>
            </div>
          </div>
        )}

      </div>

      {/* ====================================================================
          CARD FOOTER ACTION
          ==================================================================== */}
      <div className="relative z-10 pt-3 border-t border-[#1C2426] flex items-center justify-between text-xs font-semibold text-[#F5C26B] group-hover:text-white transition-colors">
        <span>Inspect full methodology & audit trail</span>
        <div className="w-7 h-7 rounded-full bg-[#182022] group-hover:bg-[#D4AF37] group-hover:text-black flex items-center justify-center transition-all duration-200 text-[#F5C26B]">
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
    </motion.div>
  );
};
