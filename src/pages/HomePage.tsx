import React, { useState, useEffect, useRef } from 'react';
import { PageId, ServiceItem, BlogPost } from '../types';
import { ArrowRight, CheckCircle2, ShieldCheck, Scale, FileText, ChevronRight, Lock, Sparkles, Mail, Play, Pause, Wind } from 'lucide-react';
import { getStoredServices, isCatalogueUnlocked } from '../data/servicesStore';
import { INITIAL_BLOG_POSTS } from '../data/blogData';
import { UnlockServicesModal } from '../components/UnlockServicesModal';
import { KaiPrakritiEmblem } from '../components/KaiPrakritiEmblem';

interface HomePageProps {
  onNavigate: (page: PageId, extraParam?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [allServices, setAllServices] = useState<ServiceItem[]>(getStoredServices);
  const [isUnlocked, setIsUnlocked] = useState(isCatalogueUnlocked);
  const [isUnlockModalOpen, setIsUnlockModalOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Safe playback handler to prevent AbortError uncaught promise rejections
  const safePlayVideo = (video: HTMLVideoElement) => {
    try {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsVideoPlaying(true);
          })
          .catch((err) => {
            // AbortError is expected when unmounting or when pause() interrupts play()
            if (err?.name !== 'AbortError' && err?.name !== 'NotAllowedError') {
              console.debug('Video playback status:', err);
            }
          });
      }
    } catch (_) {}
  };

  const toggleVideoPlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      safePlayVideo(video);
    } else {
      try {
        video.pause();
        setIsVideoPlaying(false);
      } catch (_) {}
    }
  };

  // Manage video lifecycle and safely handle unmounting / autoplay
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;

    const handlePlay = () => setIsVideoPlaying(true);
    const handlePause = () => setIsVideoPlaying(false);

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    // Initial safe play call
    safePlayVideo(video);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      try {
        video.pause();
      } catch (_) {}
    };
  }, []);

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

  // Display only the first 3 or 4 services on the home page as requested
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
      
      {/* 1. Hero Section with Scenic Aerial Wind Turbines Background Video */}
      <section className="relative pt-6 sm:pt-12 lg:pt-16 pb-12 sm:pb-16 lg:pb-20 border-b border-[#E7E3DC] overflow-hidden">
        
        {/* Scenic Aerial Wind Turbines Video Background (Pexels 37711545) */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <video
            ref={videoRef}
            loop
            muted
            playsInline
            poster="https://images.pexels.com/videos/37711545/pictures/preview-0.jpg"
            className="w-full h-full object-cover scale-105 transition-opacity duration-1000 opacity-95"
          >
            <source
              src="https://videos.pexels.com/video-files/37711545/15992625_2560_1440_30fps.mp4"
              type="video/mp4"
            />
          </video>

          {/* Crisp, Calibrated Horizon Gradient: Protects Left Copy While Keeping Wind Turbines Fully Clear */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5]/98 via-[#FAF8F5]/85 to-[#FAF8F5]/50 sm:bg-gradient-to-r sm:from-[#FAF8F5]/95 sm:via-[#FAF8F5]/65 sm:to-transparent lg:from-[#FAF8F5]/95 lg:via-[#FAF8F5]/50 lg:to-transparent" />
          <div className="absolute inset-0 bg-[#264143]/5 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-transparent to-[#FAF8F5]/40" />
        </div>

        {/* Ambient Video Control Badge */}
        <div className="absolute bottom-3 left-4 sm:bottom-4 sm:left-6 lg:left-8 z-20 flex items-center gap-1.5 sm:gap-2">
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/85 text-[#264143] border border-[#E7E3DC] shadow-xs backdrop-blur-md text-[11px] font-mono">
            <span className="w-2 h-2 rounded-full bg-[#3E6B48] animate-pulse" />
            <span>Renewable Wind Grid Aerial</span>
          </div>
          <button
            onClick={toggleVideoPlayback}
            className="px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-full bg-white/90 hover:bg-white active:bg-slate-100 text-[#264143] border border-[#E7E3DC] shadow-sm backdrop-blur-md text-[11px] font-medium flex items-center gap-1.5 sm:gap-2 transition-all cursor-pointer"
            title={isVideoPlaying ? 'Pause scenic wind turbines background video' : 'Play scenic wind turbines background video'}
          >
            <Wind className="w-3.5 h-3.5 text-[#3E6B48]" />
            {isVideoPlaying ? (
              <>
                <Pause className="w-3 h-3 text-[#D96846]" />
                <span className="text-[11px]">Pause<span className="hidden sm:inline"> Video</span></span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-[#3E6B48]" />
                <span className="text-[11px]">Play<span className="hidden sm:inline"> Video</span></span>
              </>
            )}
          </button>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-14 items-center">
            
            {/* Left Narrative: High legibility & refined spacing */}
            <div className="lg:col-span-8 space-y-4 sm:space-y-5">
              
              <div className="inline-flex items-center gap-2 sm:gap-2.5 text-[10px] sm:text-xs font-semibold text-[#264143] uppercase tracking-wider bg-white/95 backdrop-blur-md px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full border border-[#E7E3DC] shadow-xs max-w-full">
                <div className="shrink-0">
                  <KaiPrakritiEmblem size={24} theme="relax" circularBorder={true} />
                </div>
                <span className="w-1.5 h-1.5 rounded-full bg-[#D96846] shrink-0" />
                <span className="text-[#3E6B48] font-bold truncate">
                  <span className="hidden xs:inline">Specialized </span>Sovereign Sustainability Practice
                </span>
              </div>

              <h1 className="font-serif text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-[#264143] leading-[1.18] sm:leading-[1.12]">
                Sovereign carbon accounting &amp; ESG advisory for growing enterprises.
              </h1>

              <p className="text-xs sm:text-base lg:text-lg text-[#264143]/90 font-normal leading-relaxed max-w-2xl bg-white/50 sm:bg-transparent backdrop-blur-[2px] sm:backdrop-blur-none rounded-xl p-2 sm:p-0">
                We help leadership teams navigate Scope 1–3 GHG footprints, SEBI BRSR Core disclosures, and EU CBAM reporting with empirical mathematical rigor and a strict zero self-audit firewall.
              </p>

              {/* Action Buttons - Stacked on Mobile, Row on Larger Screens */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <button
                  onClick={handleExploreServicesClick}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all bg-[#D96846] hover:bg-[#C45737] active:bg-[#B34A2C] text-white shadow-xs hover:shadow-md flex items-center justify-center gap-2 group shrink-0"
                >
                  <span>Explore Our Services</span>
                  {!isUnlocked ? (
                    <Lock className="w-3.5 h-3.5 text-white/80" />
                  ) : (
                    <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                  )}
                </button>

                <button
                  onClick={() => onNavigate('contact')}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all border border-[#E7E3DC] hover:border-[#264143] bg-white/95 backdrop-blur-xs text-[#264143] hover:bg-[#FBF9F5] active:bg-slate-100 shadow-xs flex items-center justify-center gap-2 shrink-0"
                >
                  <span>Contact Our Advisory</span>
                </button>
              </div>

              {/* Trust & Scientific Method Foundation (Honest Startup Reality: No Fake Clients) */}
              <div className="pt-4 sm:pt-6 border-t border-[#E7E3DC]/80 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 text-xs text-[#264143]">
                <div className="flex items-center gap-2 bg-white/85 backdrop-blur-xs px-3.5 py-2.5 rounded-xl border border-[#E7E3DC]/70 shadow-2xs min-w-0">
                  <CheckCircle2 className="w-4 h-4 text-[#3E6B48] shrink-0" />
                  <span className="font-semibold truncate">100% Primary Data Led</span>
                </div>
                <div className="flex items-center gap-2 bg-white/85 backdrop-blur-xs px-3.5 py-2.5 rounded-xl border border-[#E7E3DC]/70 shadow-2xs min-w-0">
                  <CheckCircle2 className="w-4 h-4 text-[#3E6B48] shrink-0" />
                  <span className="font-semibold truncate">Zero Self-Audit Conflict</span>
                </div>
                <div className="flex items-center gap-2 bg-white/85 backdrop-blur-xs px-3.5 py-2.5 rounded-xl border border-[#E7E3DC]/70 shadow-2xs min-w-0">
                  <CheckCircle2 className="w-4 h-4 text-[#3E6B48] shrink-0" />
                  <span className="font-semibold truncate">SEBI &amp; EU CBAM Aligned</span>
                </div>
              </div>

            </div>

            {/* Right Side: Unobstructed view of the aerial wind turbines landscape */}
            <div className="lg:col-span-4 hidden lg:block" />

          </div>

        </div>
      </section>

      {/* 2. Startup Realism: Our Direct Engineering Philosophy (No Fake Clients / Testimonials) */}
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
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-[#E7E3DC] space-y-2">
              <div className="w-8 h-8 rounded-xl bg-[#3E6B48]/15 text-[#3E6B48] flex items-center justify-center font-bold text-sm">
                01
              </div>
              <h3 className="font-serif font-bold text-sm text-[#264143]">Primary Data Precision</h3>
              <p className="text-xs text-[#264143]/70 leading-relaxed">
                We trace every kilowatt-hour and litre of diesel directly to your supplier documentation, avoiding punitive EU and SEBI penalties.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-[#E7E3DC] space-y-2">
              <div className="w-8 h-8 rounded-xl bg-[#D96846]/15 text-[#D96846] flex items-center justify-center font-bold text-sm">
                02
              </div>
              <h3 className="font-serif font-bold text-sm text-[#264143]">Zero Self-Review Conflict</h3>
              <p className="text-xs text-[#264143]/70 leading-relaxed">
                We engineer the accounting files. When your lender requires third-party assurance, an independent accredited body audits it.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-[#E7E3DC] space-y-2">
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

      {/* 3. Featured Services (Only 3-4 Shown + Gated Unlock Button) */}
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
          <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#E7E3DC] bg-gradient-to-r from-white via-[#FAF8F5] to-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
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
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[#264143] hover:bg-black text-white text-xs font-semibold flex items-center justify-center gap-2 shrink-0 transition-colors"
            >
              {!isUnlocked ? (
                <>
                  <Lock className="w-3.5 h-3.5 text-[#E99F4C]" />
                  <span>Unlock Complete Catalogue</span>
                </>
              ) : (
                <>
                  <span>Browse All Practices</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#E99F4C]" />
                </>
              )}
            </button>
          </div>

        </div>
      </section>

      {/* 4. The Two-Line Independence Model (Transparent Professional Ethics) */}
      <section className="py-12 sm:py-20 bg-white border-t border-[#E7E3DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2 sm:space-y-3">
            <span className="text-xs font-semibold text-[#3E6B48] uppercase tracking-wider">
              Our Professional Ethics Code
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#264143] tracking-tight">
              We calculate it. Someone independent verifies it.
            </h2>
            <p className="text-[#264143]/75 text-xs sm:text-sm leading-relaxed">
              We never audit our own numbers. To protect your business from greenwashing accusations and regulatory scrutiny, our advisory work is strictly divided into two distinct roles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 max-w-5xl mx-auto">
            
            {/* Role 1: Direct Work */}
            <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#E7E3DC] bg-[#FAF8F5] space-y-4 sm:space-y-5">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#3E6B48]/10 text-[#3E6B48] border border-[#3E6B48]/30">
                  Role 1: Direct Work
                </span>
                <span className="text-xs text-[#264143]/50 font-medium">Billed by Kai Prakriti</span>
              </div>

              <h3 className="font-serif text-lg sm:text-2xl font-bold text-[#264143]">
                We perform the engineering and quantitative accounting.
              </h3>

              <p className="text-xs sm:text-sm text-[#264143]/75 leading-relaxed">
                Our environmental engineers gather primary activity records, utility invoices, freight logs, and fuel receipts to calculate mathematically verified carbon baselines.
              </p>

              <ul className="space-y-2.5 text-xs text-[#264143]/85">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#3E6B48] shrink-0 mt-0.5" />
                  <span>Primary data collection from shop floors and utility meters</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#3E6B48] shrink-0 mt-0.5" />
                  <span>Transparent emission factors traceable to CEA and IPCC databases</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#3E6B48] shrink-0 mt-0.5" />
                  <span>Preparation of full audit defense dossiers for external verifiers</span>
                </li>
              </ul>
            </div>

            {/* Role 2: Facilitated Verification */}
            <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#E7E3DC] bg-[#FAF8F5] space-y-4 sm:space-y-5">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#D96846]/10 text-[#D96846] border border-[#D96846]/30">
                  Role 2: Facilitated Verification
                </span>
                <span className="text-xs text-[#264143]/50 font-medium">Accredited Third Party</span>
              </div>

              <h3 className="font-serif text-lg sm:text-2xl font-bold text-[#264143]">
                An accredited third party audits our work.
              </h3>

              <p className="text-xs sm:text-sm text-[#264143]/75 leading-relaxed">
                When statutory rules demand independent assurance, we coordinate with accredited verifiers (BEE ACVA, DAkkS, RvA). We never issue certification opinions on our own calculations.
              </p>

              <ul className="space-y-2.5 text-xs text-[#264143]/85">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D96846] shrink-0 mt-0.5" />
                  <span>100% written disclosure of any introductory arrangement</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D96846] shrink-0 mt-0.5" />
                  <span>Pre-vetted audit teams holding active statutory accreditations</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D96846] shrink-0 mt-0.5" />
                  <span>Guaranteed compliance with AA1000 and ISO 14064-3 independence</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* 5. Recent Insights & Thought Leadership (Requested Blog Section) */}
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

      {/* 6. Call To Action Banner with Official Contact Emails */}
      <section className="py-12 sm:py-20 bg-[#264143] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5 sm:space-y-6">
          
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#E99F4C] uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#E99F4C]" />
            <span>Direct Advisory Scoping</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
            Bring clarity, rigor, and peace of mind to your sustainability strategy.
          </h2>

          <p className="text-xs sm:text-base text-[#FAF8F5]/80 font-light max-w-2xl mx-auto leading-relaxed">
            Schedule a confidential 30-minute scoping discussion with our senior sustainability advisors. We will review your reporting obligations and outline a clear roadmap.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all bg-[#D96846] hover:bg-[#C45737] active:bg-[#B34A2C] text-white shadow-md flex items-center justify-center gap-2"
            >
              <span>Schedule Scoping Discussion</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>

            <button
              onClick={handleExploreServicesClick}
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all border border-white/30 hover:border-white text-white hover:bg-white/10 active:bg-white/20 flex items-center justify-center"
            >
              View Service Catalogue
            </button>
          </div>

          {/* Official Contact Email */}
          <div className="pt-6 sm:pt-8 border-t border-white/15 flex items-center justify-center text-xs text-[#FAF8F5]/80">
            <div className="flex items-center gap-2 text-center">
              <Mail className="w-4 h-4 text-[#E99F4C] shrink-0" />
              <span>
                Official Correspondence:{' '}
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
