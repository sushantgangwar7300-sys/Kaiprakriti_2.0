import React, { useState, useEffect, useRef } from 'react';
import { PageId, ServiceItem, BlogPost } from '../types';
import { ArrowRight, CheckCircle2, ShieldCheck, Scale, FileText, ChevronRight, Lock, Sparkles, Mail } from 'lucide-react';
import { getStoredServices, isCatalogueUnlocked } from '../data/servicesStore';
import { INITIAL_BLOG_POSTS } from '../data/blogData';
import { UnlockServicesModal } from '../components/UnlockServicesModal';
import { KaiPrakritiEmblem } from '../components/KaiPrakritiEmblem';
import { useLanguage } from '../context/LanguageContext';

interface HomePageProps {
  onNavigate: (page: PageId, extraParam?: string) => void;
}

interface HeroSlide {
  id: string;
  number: string;
  kicker: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  serviceId: string;
  videoSrc: string;
  poster: string;
  highlights: string[];
  ctaLabel: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'brsr',
    number: '01',
    kicker: 'SEBI BRSR Core',
    badge: 'SEBI LODR 34(2)(f) • Value Chain ESG',
    title: 'BRSR, Prepared to Survive Assessment',
    subtitle: 'Business Responsibility & Sustainability Reporting',
    description: 'Full format across nine NGRBC principles and the rigorous auditable data trail behind BRSR Core attributes. Engineered for Top 1000 listed entities and Tier-1 suppliers.',
    serviceId: 'brsr-core',
    videoSrc: 'https://videos.pexels.com/video-files/3129957/3129957-uhd_2560_1440_25fps.mp4',
    poster: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80',
    highlights: ['9 NGRBC Core Principles', 'Audit-Ready Data Trail', 'Value Chain Scope 3', 'Zero Conflict of Interest'],
    ctaLabel: 'Explore BRSR Advisory',
  },
  {
    id: 'ghg',
    number: '02',
    kicker: 'GHG Scope 1-3',
    badge: 'ISO 14064-1 & GHG Protocol',
    title: 'Measure What You Actually Emit',
    subtitle: 'Corporate Greenhouse Gas Accounting',
    description: 'Comprehensive greenhouse gas accounting across direct combustion (Scope 1), purchased grid electricity (Scope 2), and value chain emissions (Scope 3, 15 categories) with traceable formula workbooks.',
    serviceId: 'ghg-accounting',
    videoSrc: 'https://videos.pexels.com/video-files/37711545/15992625_2560_1440_30fps.mp4',
    poster: 'https://images.pexels.com/videos/37711545/pictures/preview-0.jpg',
    highlights: ['Primary Meter & Invoice Data', 'CEA Sub-Region Factors', 'Complete 15 Scope 3 Categories', 'Audit-Ready Workbooks'],
    ctaLabel: 'Explore GHG Accounting',
  },
  {
    id: 'zed',
    number: '03',
    kicker: 'ZED MSME',
    badge: 'Ministry of MSME • QCI Guidelines',
    title: 'ZED Support Without Overclaim',
    subtitle: 'Zero Defect Zero Effect Certification Handholding',
    description: 'Complete documentation, gap closure, and dedicated handholding for the MSME Sustainable ZED certification scheme. Unlock up to 80% Ministry subsidies and concessional interest.',
    serviceId: 'zed-support',
    videoSrc: 'https://videos.pexels.com/video-files/2887463/2887463-uhd_2560_1440_24fps.mp4',
    poster: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=2000&q=80',
    highlights: ['Bronze, Silver & Gold Tiers', 'Up to 80% Government Subsidy', 'Concessional Bank Lending', 'Shop-Floor Safety & Waste'],
    ctaLabel: 'Explore ZED Handholding',
  },
  {
    id: 'cbam',
    number: '04',
    kicker: 'EU CBAM',
    badge: 'Regulation (EU) 2023/956 Compliance',
    title: 'CBAM Data Readiness & Verification',
    subtitle: 'EU Carbon Border Adjustment Mechanism',
    description: 'Prepare embedded emissions data at installation level for exported steel, aluminium, cement, and fertilizers, then connect to accredited EU verification bodies.',
    serviceId: 'cbam-readiness',
    videoSrc: 'https://videos.pexels.com/video-files/855564/855564-hd_1920_1080_24fps.mp4',
    poster: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=2000&q=80',
    highlights: ['Per-CN Code Specific Emissions', 'Installation Boundary Tracking', 'EU Registry Ready Dossier', 'Accredited EU Verifier Network'],
    ctaLabel: 'Explore CBAM Consulting',
  },
];

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { language, t } = useLanguage();
  const [allServices, setAllServices] = useState<ServiceItem[]>(getStoredServices);
  const [isUnlocked, setIsUnlocked] = useState(isCatalogueUnlocked);
  const [isUnlockModalOpen, setIsUnlockModalOpen] = useState(false);

  // 6-second auto-advancing slide state
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const activeSlide = HERO_SLIDES[currentSlideIndex];
  const videoRef = useRef<HTMLVideoElement>(null);

  // Safe play handler for video to prevent browser unhandled rejections
  const safePlay = (video: HTMLVideoElement) => {
    try {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    } catch (_) {}
  };

  // 6-second slide timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [currentSlideIndex]);

  // Video playback runs automatically without any pause click
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    safePlay(video);
  }, [currentSlideIndex]);

  // Blogs from local storage or defaults
  const [blogs, setBlogs] = useState<BlogPost[]>(() => {
    try {
      const stored = localStorage.getItem('kai_prakriti_blogs_v2');
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return INITIAL_BLOG_POSTS;
  });

  useEffect(() => {
    const handleServicesUpdate = (e: any) => {
      if (e.detail) setAllServices(e.detail);
      else setAllServices(getStoredServices());
    };
    const handleCatalogueUnlocked = () => {
      setIsUnlocked(true);
    };
    const handleBlogsUpdate = (e: any) => {
      if (e.detail) setBlogs(e.detail);
    };

    window.addEventListener('kai_prakriti_services_updated', handleServicesUpdate);
    window.addEventListener('kai_prakriti_catalogue_unlocked', handleCatalogueUnlocked);
    window.addEventListener('kai_prakriti_blogs_updated', handleBlogsUpdate);

    return () => {
      window.removeEventListener('kai_prakriti_services_updated', handleServicesUpdate);
      window.removeEventListener('kai_prakriti_catalogue_unlocked', handleCatalogueUnlocked);
      window.removeEventListener('kai_prakriti_blogs_updated', handleBlogsUpdate);
    };
  }, []);

  const featuredServices = allServices.slice(0, 3);
  const recentBlogs = blogs.slice(0, 3);

  const handleExploreServicesClick = () => {
    if (isUnlocked) {
      onNavigate('services');
    } else {
      setIsUnlockModalOpen(true);
    }
  };

  return (
    <div className="bg-[#FAF8F5] text-[#264143] overflow-x-hidden min-h-screen">
      
      {/* 1. Hero Section with 6-Second Auto-Advancing Background Video & Flash Cards */}
      <section className="relative pt-6 sm:pt-10 lg:pt-14 pb-12 sm:pb-16 lg:pb-20 border-b border-[#E7E3DC] overflow-hidden">
        
        {/* Full-Bleed Background Video (Auto-Playing Without Pausing) */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <video
            ref={videoRef}
            key={activeSlide.videoSrc}
            autoPlay
            loop
            muted
            playsInline
            poster={activeSlide.poster}
            className="w-full h-full object-cover scale-105 transition-opacity duration-1000 opacity-90"
          >
            <source src={activeSlide.videoSrc} type="video/mp4" />
          </video>

          {/* Calibrated Overlay using Slate-Teal and Warm Stone Gradients */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5]/95 via-[#FAF8F5]/85 to-[#FAF8F5]/70 sm:bg-gradient-to-r sm:from-[#FAF8F5]/98 sm:via-[#FAF8F5]/80 sm:to-transparent lg:from-[#FAF8F5]/95 lg:via-[#FAF8F5]/65 lg:to-transparent" />
          <div className="absolute inset-0 bg-[#264143]/5 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-transparent to-[#FAF8F5]/30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
          
          {/* Main Hero Header and Copy */}
          <div className="max-w-4xl space-y-4 sm:space-y-5">
            <h1 className="font-serif text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#264143] leading-[1.15]">
              {activeSlide.title}
            </h1>

            <p className="text-xs sm:text-base lg:text-lg text-[#264143]/90 font-normal leading-relaxed max-w-3xl bg-white/60 sm:bg-transparent backdrop-blur-[2px] sm:backdrop-blur-none rounded-2xl p-2 sm:p-0">
              {activeSlide.description}
            </p>

            {/* Action Buttons in Terracotta and Slate-Teal */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <button
                onClick={() => onNavigate('services', activeSlide.serviceId)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all bg-[#D96846] hover:bg-[#C45737] active:bg-[#B34A2C] text-white shadow-xs hover:shadow-md flex items-center justify-center gap-2 group shrink-0"
              >
                <span>{activeSlide.ctaLabel}</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate('contact', activeSlide.serviceId)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all border border-[#E7E3DC] hover:border-[#264143] bg-white/95 backdrop-blur-xs text-[#264143] hover:bg-[#FAF8F5] active:bg-slate-100 shadow-2xs flex items-center justify-center gap-2 shrink-0"
              >
                <span>Request Scoping Consultation</span>
              </button>
            </div>

            {/* Specific Service Highlights */}
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
              {activeSlide.highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 border border-[#E7E3DC] shadow-2xs text-[#264143] text-[11px]"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#3E6B48] shrink-0" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>

          </div>

          {/* 2. Four Interactive Flash Cards (Slides Every 6 Seconds) */}
          <div className="space-y-3 pt-4 sm:pt-6">
            <div className="flex items-center justify-between text-xs text-[#264143]/80">
              <span className="font-semibold uppercase tracking-wider text-[11px] text-[#3E6B48]">
                Featured Sovereign Practices (Auto-Advancing)
              </span>
              <span className="text-[11px] font-mono text-[#264143]/60">
                Click any flash card to switch directly
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {HERO_SLIDES.map((slide, idx) => {
                const isActive = currentSlideIndex === idx;
                return (
                  <div
                    key={slide.id}
                    onClick={() => setCurrentSlideIndex(idx)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setCurrentSlideIndex(idx);
                      }
                    }}
                    className={`relative text-left p-4 sm:p-5 rounded-2xl sm:rounded-3xl border transition-all cursor-pointer overflow-hidden ${
                      isActive
                        ? 'bg-white border-[#D96846] shadow-md ring-2 ring-[#D96846]/15'
                        : 'bg-white/85 hover:bg-white border-[#E7E3DC] hover:border-[#D96846]/50 shadow-2xs hover:shadow-xs'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-lg border ${
                            isActive
                              ? 'bg-[#3E6B48]/10 text-[#3E6B48] border-[#3E6B48]/30'
                              : 'bg-slate-50 text-[#264143]/60 border-[#E7E3DC]'
                          }`}
                        >
                          {slide.kicker}
                        </span>
                        <span className="text-xs font-mono font-bold text-[#D96846]">
                          {slide.number}
                        </span>
                      </div>

                      <h3 className={`font-serif text-sm sm:text-base font-bold leading-tight ${
                        isActive ? 'text-[#D96846]' : 'text-[#264143]'
                      }`}>
                        {slide.subtitle}
                      </h3>

                      <p className="text-[11px] text-[#264143]/70 line-clamp-2 leading-relaxed">
                        {slide.description}
                      </p>

                      <div className="pt-2 flex items-center justify-between text-[11px] font-semibold text-[#D96846]">
                        <span>View Practice</span>
                        <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isActive ? 'translate-x-1' : ''}`} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* 2. Startup Realism: Our Direct Engineering Philosophy */}
      <section className="py-12 sm:py-16 bg-white border-b border-[#E7E3DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-2.5 sm:space-y-3">
            <span className="text-xs font-semibold text-[#3E6B48] uppercase tracking-wider">
              Our Startup Commitment
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#264143] tracking-tight">
              An agile practice built on transparent science, not boilerplate software.
            </h2>
            <p className="text-xs sm:text-sm text-[#264143]/75 leading-relaxed">
              We are an emerging sustainability consultancy founded by passionate engineers and regulatory researchers. We do not sell generic automated dashboards with opaque carbon proxies; every inventory is computed directly from primary meter data, utility invoices, and stoichiometric formulas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 pt-8 sm:pt-10 max-w-5xl mx-auto">
            <div className="p-5 rounded-2xl sm:rounded-3xl bg-[#FAF8F5] border border-[#E7E3DC] space-y-2">
              <div className="w-8 h-8 rounded-xl bg-[#3E6B48]/15 text-[#3E6B48] flex items-center justify-center font-bold text-sm">
                01
              </div>
              <h3 className="font-serif font-bold text-sm text-[#264143]">Primary Data Precision</h3>
              <p className="text-xs text-[#264143]/70 leading-relaxed">
                We trace every kilowatt-hour and litre of diesel directly to your supplier documentation, avoiding punitive EU and SEBI penalties.
              </p>
            </div>

            <div className="p-5 rounded-2xl sm:rounded-3xl bg-[#FAF8F5] border border-[#E7E3DC] space-y-2">
              <div className="w-8 h-8 rounded-xl bg-[#D96846]/15 text-[#D96846] flex items-center justify-center font-bold text-sm">
                02
              </div>
              <h3 className="font-serif font-bold text-sm text-[#264143]">Zero Self-Review Conflict</h3>
              <p className="text-xs text-[#264143]/70 leading-relaxed">
                We engineer the accounting files. When your lender requires third-party assurance, an independent accredited body audits it.
              </p>
            </div>

            <div className="p-5 rounded-2xl sm:rounded-3xl bg-[#FAF8F5] border border-[#E7E3DC] space-y-2">
              <div className="w-8 h-8 rounded-xl bg-[#E99F4C]/20 text-[#E99F4C] flex items-center justify-center font-bold text-sm">
                03
              </div>
              <h3 className="font-serif font-bold text-sm text-[#264143]">Practitioner-Led Delivery</h3>
              <p className="text-xs text-[#264143]/70 leading-relaxed">
                Direct hands-on engineering by dedicated sustainability professionals, with zero handoffs to untested junior pools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Services */}
      <section className="py-12 sm:py-20 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
            <div className="max-w-2xl space-y-1.5 sm:space-y-2">
              <span className="text-xs font-semibold text-[#3E6B48] uppercase tracking-wider">
                Advisory Practices
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#264143] tracking-tight">
                Core regulatory solutions for modern enterprises.
              </h2>
              <p className="text-[#264143]/75 text-xs sm:text-sm leading-relaxed">
                Showing 3 of {allServices.length} sovereign practices. Complete the quick consultation form to unlock the full enterprise catalogue.
              </p>
            </div>

            <button
              onClick={handleExploreServicesClick}
              className="w-full sm:w-auto px-5 py-3 rounded-2xl text-xs font-semibold transition-all bg-[#D96846] hover:bg-[#C45737] text-white shadow-xs flex items-center justify-center gap-2 shrink-0"
            >
              <span>Explore Our Services ({allServices.length} Total)</span>
              {!isUnlocked && <Lock className="w-3.5 h-3.5 text-white/80" />}
            </button>
          </div>

          {/* 3 Featured Services Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {featuredServices.map((service, idx) => (
              <div
                key={service.id}
                onClick={() => onNavigate('services', service.id)}
                className="group cursor-pointer p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-[#E7E3DC] bg-white hover:border-[#D96846] hover:shadow-md active:bg-slate-50 transition-all duration-200 flex flex-col justify-between space-y-4 sm:space-y-5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[11px] font-semibold text-[#3E6B48] bg-[#3E6B48]/10 px-3 py-1 rounded-full border border-[#3E6B48]/20">
                      {service.standardCode || service.standard}
                    </span>
                    <span className="text-[#264143]/40 font-mono text-xs">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#264143] group-hover:text-[#D96846] transition-colors leading-snug">
                    {service.title}
                  </h3>

                  <p className="text-xs text-[#264143]/75 leading-relaxed">
                    {service.shortDesc}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#E7E3DC] flex items-center justify-between text-xs font-semibold text-[#264143] group-hover:text-[#D96846] transition-colors">
                  <span>View practice details</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D96846] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

          {/* Gated Catalogue Callout Banner */}
          <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#E7E3DC] bg-gradient-to-r from-white via-[#FAF8F5] to-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 shadow-2xs">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#264143]">
                <Sparkles className="w-4 h-4 text-[#E99F4C] shrink-0" />
                <span>Looking for EU CBAM, Product LCA, or MSME ZED?</span>
              </div>
              <p className="text-xs text-[#264143]/70 max-w-xl">
                Our complete 11+ practice catalogue includes installation-level CBAM formulas, cradle-to-grave ISO 14044 LCA, and third-party accredited verifier matching.
              </p>
            </div>

            <button
              onClick={handleExploreServicesClick}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[#264143] hover:bg-black text-white text-xs font-semibold flex items-center justify-center gap-2 shrink-0 transition-colors shadow-xs"
            >
              {!isUnlocked ? (
                <>
                  <Lock className="w-3.5 h-3.5 text-[#E99F4C]" />
                  <span>Unlock Complete Catalogue</span>
                </>
              ) : (
                <>
                  <span>Browse All Practices</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </>
              )}
            </button>
          </div>

        </div>
      </section>

      {/* 4. The Two-Line Independence Model */}
      <section className="py-12 sm:py-20 bg-white border-t border-[#E7E3DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2 sm:space-y-3">
            <span className="text-xs font-semibold text-[#3E6B48] uppercase tracking-wider">
              {t.roles.badge}
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#264143] tracking-tight">
              {t.roles.title}
            </h2>
            <p className="text-[#264143]/75 text-xs sm:text-sm leading-relaxed">
              {t.roles.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 max-w-5xl mx-auto">
            
            {/* Role 1: Direct Work */}
            <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#E7E3DC] bg-[#FAF8F5] space-y-4 sm:space-y-5">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#3E6B48]/10 text-[#3E6B48] border border-[#3E6B48]/30">
                  {t.roles.role1Badge}
                </span>
                <span className="text-xs text-[#264143]/50 font-medium">{t.roles.role1Sub}</span>
              </div>

              <h3 className="font-serif text-lg sm:text-2xl font-bold text-[#264143]">
                {t.roles.role1Title}
              </h3>

              <p className="text-xs sm:text-sm text-[#264143]/75 leading-relaxed">
                {t.roles.role1Desc}
              </p>

              <ul className="space-y-2.5 text-xs text-[#264143]/85">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#3E6B48] shrink-0 mt-0.5" />
                  <span>{t.roles.role1Point1}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#3E6B48] shrink-0 mt-0.5" />
                  <span>{t.roles.role1Point2}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#3E6B48] shrink-0 mt-0.5" />
                  <span>{t.roles.role1Point3}</span>
                </li>
              </ul>
            </div>

            {/* Role 2: Facilitated Verification */}
            <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#E7E3DC] bg-[#FAF8F5] space-y-4 sm:space-y-5">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#D96846]/10 text-[#D96846] border border-[#D96846]/30">
                  {t.roles.role2Badge}
                </span>
                <span className="text-xs text-[#264143]/50 font-medium">{t.roles.role2Sub}</span>
              </div>

              <h3 className="font-serif text-lg sm:text-2xl font-bold text-[#264143]">
                {t.roles.role2Title}
              </h3>

              <p className="text-xs sm:text-sm text-[#264143]/75 leading-relaxed">
                {t.roles.role2Desc}
              </p>

              <ul className="space-y-2.5 text-xs text-[#264143]/85">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D96846] shrink-0 mt-0.5" />
                  <span>{t.roles.role2Point1}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D96846] shrink-0 mt-0.5" />
                  <span>{t.roles.role2Point2}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D96846] shrink-0 mt-0.5" />
                  <span>{t.roles.role2Point3}</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* 5. Recent Insights & Thought Leadership */}
      <section className="py-12 sm:py-20 bg-[#FAF8F5] border-t border-[#E7E3DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 border-b border-[#E7E3DC] pb-4 sm:pb-6">
            <div className="space-y-1 sm:space-y-2">
              <span className="text-xs font-semibold text-[#3E6B48] uppercase tracking-wider">
                Industry Insights & Blog
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#264143] tracking-tight">
                Latest regulatory analysis & updates.
              </h2>
            </div>

            <button
              onClick={() => onNavigate('blog')}
              className="text-xs sm:text-sm font-semibold text-[#D96846] hover:text-[#C45737] inline-flex items-center gap-1 group self-start md:self-auto"
            >
              <span>View all articles on Blog page</span>
              <ArrowRight className="w-4 h-4 text-[#D96846] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-8">
            {recentBlogs.map((blog) => (
              <div
                key={blog.id}
                onClick={() => onNavigate('blog', blog.slug)}
                className="group cursor-pointer space-y-3.5 p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-[#E7E3DC] bg-white hover:border-[#D96846] hover:shadow-xs active:bg-slate-50 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="text-xs text-[#264143]/60 font-medium">
                    <span className="text-[#3E6B48] font-semibold">{blog.category}</span>
                    <span className="mx-2">·</span>
                    <span>{blog.readTime}</span>
                  </div>

                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#264143] group-hover:text-[#D96846] transition-colors line-clamp-2 leading-snug">
                    {blog.title}
                  </h3>

                  <p className="text-xs text-[#264143]/75 leading-relaxed line-clamp-3">
                    {blog.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E7E3DC] text-xs font-semibold text-[#264143] flex items-center justify-between">
                  <span>Read full analysis</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#D96846] group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Call To Action Banner in Deep Slate-Teal with Official Contact Emails */}
      <section className="py-12 sm:py-20 bg-[#264143] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5 sm:space-y-6">
          
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#E99F4C] uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#E99F4C]" />
            <span>{language === 'en' ? 'Direct Advisory Scoping' : 'प्रत्यक्ष परामर्श स्कोपिंग'}</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
            {language === 'en'
              ? 'Bring clarity, rigor, and peace of mind to your sustainability strategy.'
              : 'अपनी स्थिरता रणनीति में स्पष्टता, सटीकता और मानसिक शांति लाएं।'}
          </h2>

          <p className="text-xs sm:text-base text-[#FAF8F5]/80 font-light max-w-2xl mx-auto leading-relaxed">
            {language === 'en'
              ? 'Schedule a confidential 30-minute scoping discussion with our senior sustainability advisors. We will review your reporting obligations and outline a clear roadmap.'
              : 'हमारे वरिष्ठ स्थिरता सलाहकारों के साथ एक गोपनीय 30-मिनट की चर्चा निर्धारित करें। हम आपकी रिपोर्टिंग जिम्मेदारियों की समीक्षा करेंगे और एक स्पष्ट कार्ययोजना तैयार करेंगे।'}
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all bg-[#D96846] hover:bg-[#C45737] active:bg-[#B34A2C] text-white shadow-md flex items-center justify-center gap-2"
            >
              <span>{language === 'en' ? 'Schedule Scoping Discussion' : 'रणनीतिक चर्चा तय करें'}</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>

            <button
              onClick={handleExploreServicesClick}
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all border border-white/30 hover:border-white text-white hover:bg-white/10 active:bg-white/20 flex items-center justify-center"
            >
              {language === 'en' ? 'View Service Catalogue' : 'सेवा कैटलॉग देखें'}
            </button>
          </div>

          {/* Official Contact Email */}
          <div className="pt-6 sm:pt-8 border-t border-white/15 flex items-center justify-center text-xs text-[#FAF8F5]/80">
            <div className="flex items-center gap-2 text-center">
              <Mail className="w-4 h-4 text-[#E99F4C] shrink-0" />
              <span>
                {language === 'en' ? 'Official Correspondence: ' : 'आधिकारिक संपर्क ईमेल: '}
                <a
                  href="mailto:operations@kaiprakriti.com"
                  className="text-white font-medium hover:underline ml-1"
                >
                  operations@kaiprakriti.com
                </a>
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* Unlock Catalogue Modal */}
      <UnlockServicesModal
        isOpen={isUnlockModalOpen}
        onClose={() => setIsUnlockModalOpen(false)}
        onUnlocked={() => {
          setIsUnlocked(true);
          onNavigate('services');
        }}
      />

    </div>
  );
};
