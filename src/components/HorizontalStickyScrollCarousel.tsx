import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ServiceItem } from '../types';
import { ArrowRight, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';

interface HorizontalStickyScrollCarouselProps {
  services: ServiceItem[];
  onSelectService: (service: ServiceItem) => void;
  onConsult: (serviceId: string) => void;
}

interface TiltCardProps {
  service: ServiceItem;
  index: number;
  onSelectService: (service: ServiceItem) => void;
  onConsult: (serviceId: string) => void;
}

const TiltCard: React.FC<TiltCardProps> = ({ service, index, onSelectService, onConsult }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState<string>('perspective(900px) rotateX(0deg) rotateY(0deg)');
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Calculate rotation (-8 to +8 degrees)
    const rotX = ((y - centerY) / centerY) * -7;
    const rotY = ((x - centerX) / centerX) * 7;
    setTiltStyle(`perspective(900px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTiltStyle('perspective(900px) rotateX(0deg) rotateY(0deg)');
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelectService(service)}
      initial={{ opacity: 0, y: 50, rotateX: 12, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.9, delay: (index % 4) * 0.08 }}
      style={{
        transform: tiltStyle,
      }}
      className="w-[300px] xs:w-[340px] sm:w-[380px] md:w-[420px] shrink-0 group cursor-pointer transition-transform duration-200 ease-out select-none"
    >
      <div className="h-full rounded-3xl border border-[#E7E3DC] bg-white/95 backdrop-blur-xl p-5 sm:p-6 shadow-xs hover:shadow-xl hover:border-[#3E6B48]/50 transition-all duration-300 flex flex-col justify-between space-y-4">
        
        <div className="space-y-3.5">
          {/* Tile Header: Standard Code and Practice Number */}
          <div className="flex items-center justify-between text-xs">
            <span className="px-3 py-1 rounded-full font-semibold text-[11px] text-[#3E6B48] bg-[#3E6B48]/10 border border-[#3E6B48]/20">
              {service.standardCode || service.standard}
            </span>
            <span className="font-mono text-xs font-bold text-[#D96846]">
              PRACTICE {service.number}
            </span>
          </div>

          {/* Service Image Aligned Inside Boundaries of Tile */}
          {service.imageUrl && (
            <div className="w-full h-40 sm:h-44 rounded-2xl overflow-hidden relative border border-[#E7E3DC]/60 bg-[#FAF8F5] shadow-2xs">
              <img
                src={service.imageUrl}
                alt={service.title}
                loading="lazy"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              <div className="absolute bottom-2.5 left-3 right-3 text-[10px] text-white/90 font-medium truncate">
                {service.keyMetric || service.standard}
              </div>
            </div>
          )}

          {/* Title & Short Description */}
          <div className="space-y-1.5">
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1E382E] group-hover:text-[#D96846] transition-colors leading-snug">
              {service.title}
            </h3>
            <p className="text-xs text-[#264143]/75 leading-relaxed line-clamp-3">
              {service.shortDesc}
            </p>
          </div>

          {/* Core Technical Deliverable */}
          {service.deliverables && service.deliverables.length > 0 && (
            <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E7E3DC] text-xs space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#3E6B48] block">
                Primary Deliverable
              </span>
              <div className="flex items-center gap-1.5 text-[#264143] font-medium truncate text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#3E6B48] shrink-0" />
                <span className="truncate">{service.deliverables[0]}</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer of Card with Action Link */}
        <div className="pt-3 border-t border-[#E7E3DC] flex items-center justify-between text-xs font-semibold text-[#1E382E] group-hover:text-[#D96846] transition-colors">
          <span>Inspect Methodology & Deliverables</span>
          <ChevronRight className="w-4 h-4 text-[#D96846] group-hover:translate-x-1.5 transition-transform" />
        </div>

      </div>
    </motion.div>
  );
};

export const HorizontalStickyScrollCarousel: React.FC<HorizontalStickyScrollCarouselProps> = ({
  services,
  onSelectService,
  onConsult,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll through the 300vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Map scroll progress across [0, 1] to horizontal translation ["0%", "-60%"]
  const xTranslation = useTransform(scrollYProgress, [0, 1], ['0%', '-60%']);

  return (
    <section
      ref={containerRef}
      className="relative h-[300vh] bg-[#F7F5F0] border-y border-[#E7E3DC]"
    >
      {/* Sticky Full-Screen Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-8 sm:py-12">
        
        {/* Section Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full shrink-0 space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3E6B48]/10 border border-[#3E6B48]/20 text-[#3E6B48] text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-[#E99F4C]" />
                <span className="uppercase tracking-wider text-[10px]">Interactive Horizontal Stream</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#1E382E] tracking-tight">
                Sovereign Practice Carousel
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#264143]/70 max-w-md">
              Scroll down or drag cursor across cards to explore governed ESG methodologies with real-time 3D tilt response.
            </p>
          </div>
        </div>

        {/* Horizontal Track Bound to Scroll */}
        <div className="w-full overflow-hidden my-auto py-4">
          <motion.div
            style={{ x: xTranslation }}
            className="flex items-stretch gap-5 sm:gap-6 px-4 sm:px-8 lg:px-12 w-max"
          >
            {services.map((service, idx) => (
              <TiltCard
                key={service.id}
                service={service}
                index={idx}
                onSelectService={onSelectService}
                onConsult={onConsult}
              />
            ))}
          </motion.div>
        </div>

        {/* Scroll Progress Bar at Bottom of Viewport */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full shrink-0 flex items-center justify-between gap-4 text-xs text-[#264143]/60">
          <span className="font-mono text-[11px]">
            Scroll to slide horizontally • Click any card for full scope
          </span>
          <div className="w-40 sm:w-64 h-1.5 bg-[#E7E3DC] rounded-full overflow-hidden">
            <motion.div
              style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
              className="h-full bg-[#3E6B48] rounded-full"
            />
          </div>
        </div>

      </div>
    </section>
  );
};
