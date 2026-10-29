import React, { useState, useEffect } from 'react';
import { PageId, ServiceCategory, ServiceItem } from '../types';
import { getStoredServices, isCatalogueUnlocked } from '../data/servicesStore';
import { Search, ArrowRight, CheckCircle2, ChevronRight, X, Lock, Sparkles, ShieldCheck, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { UnlockServicesModal } from '../components/UnlockServicesModal';
import { ServiceDetailModal } from '../components/ServiceDetailModal';
import { ComplianceRoadmap } from '../components/ComplianceRoadmap';
import { useLanguage } from '../context/LanguageContext';

interface ServicesPageProps {
  theme?: string;
  mode?: string;
  onNavigate: (page: PageId, extraParam?: string) => void;
  preselectedServiceId?: string;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onNavigate,
  preselectedServiceId,
}) => {
  const { language, t } = useLanguage();
  const [services, setServices] = useState<ServiceItem[]>(getStoredServices);
  const [isUnlocked, setIsUnlocked] = useState(isCatalogueUnlocked);
  const [isUnlockModalOpen, setIsUnlockModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<ServiceCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(() => {
    const list = getStoredServices();
    if (preselectedServiceId) {
      return list.find(s => s.id === preselectedServiceId) || null;
    }
    return null;
  });

  useEffect(() => {
    const handleServicesUpdate = (e: any) => {
      if (e.detail) setServices(e.detail);
      else setServices(getStoredServices());
    };
    const handleCatalogueUnlocked = () => {
      setIsUnlocked(true);
    };

    window.addEventListener('kai_prakriti_services_updated', handleServicesUpdate);
    window.addEventListener('kai_prakriti_catalogue_unlocked', handleCatalogueUnlocked);

    return () => {
      window.removeEventListener('kai_prakriti_services_updated', handleServicesUpdate);
      window.removeEventListener('kai_prakriti_catalogue_unlocked', handleCatalogueUnlocked);
    };
  }, []);

  // Filter services by category and query
  const filtered = services.filter(service => {
    const matchesTab = activeTab === 'all' || service.category === activeTab;
    const matchesSearch =
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.standard.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // If not unlocked, only 4 services are accessible
  const accessibleServices = isUnlocked ? filtered : filtered.slice(0, 4);
  const lockedServicesCount = Math.max(0, services.length - 4);

  return (
    <div className="bg-[#FAF8F5] text-[#264143] min-h-screen">
      
      {/* 1. Header with Clean Industrial Decarbonization & Clean Energy Infrastructure Background Image */}
      <section className="relative pt-14 pb-14 sm:pt-20 sm:pb-20 border-b border-[#E7E3DC] overflow-hidden">
        
        {/* Full Background Video: Clean Industrial Decarbonization & Renewable Infrastructure */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=2000&q=80"
            className="w-full h-full object-cover scale-105 opacity-25"
          >
            <source src="https://videos.pexels.com/video-files/3129957/3129957-uhd_2560_1440_25fps.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5]/95 via-[#FAF8F5]/85 to-[#FAF8F5]" />
          <div className="absolute inset-0 bg-[#264143]/5 mix-blend-multiply" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#3E6B48] uppercase tracking-wider bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#E7E3DC] shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#D96846]" />
            <span>Advisory Practices & Delivery Catalogue</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#264143]">
            Sovereign sustainability solutions built for regulatory certainty.
          </h1>

          <p className="text-sm sm:text-base text-[#264143]/75 font-normal max-w-2xl mx-auto leading-relaxed">
            From Scope 1–3 greenhouse gas accounting to SEBI BRSR Core assurance and EU CBAM exporter dossiers, explore our governed practices delivered with empirical mathematical rigor.
          </p>

          {/* Access Status Banner */}
          <div className="pt-3 flex items-center justify-center">
            {isUnlocked ? (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#3E6B48]/10 text-[#3E6B48] border border-[#3E6B48]/30 text-xs font-semibold shadow-2xs">
                <CheckCircle2 className="w-4 h-4" />
                <span>Enterprise Catalogue Unlocked: Viewing All {services.length} Practices</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white text-[#264143] border border-[#E7E3DC] text-xs font-semibold shadow-2xs">
                <Lock className="w-3.5 h-3.5 text-[#D96846]" />
                <span>Preview Mode: Showing 4 Core Practices. Fill Access Form To Unlock All {services.length}.</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. Filter & Search Controls */}
      <section className="py-4 sm:py-6 border-b border-[#E7E3DC] bg-white/95 sticky top-16 sm:top-20 z-20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
          
          {/* Segmented Filter Buttons */}
          <div className="flex items-center space-x-1 p-1 rounded-2xl border border-[#E7E3DC] bg-[#FAF8F5] text-xs font-medium w-full md:w-auto overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 sm:px-4 py-2 rounded-xl transition-all whitespace-nowrap shrink-0 ${
                activeTab === 'all'
                  ? 'bg-[#D96846] text-white font-semibold shadow-xs'
                  : 'text-[#264143] hover:text-[#D96846]'
              }`}
            >
              {language === 'en' ? `All Practices (${accessibleServices.length})` : `सभी सेवाएं (${accessibleServices.length})`}
            </button>

            <button
              onClick={() => setActiveTab('direct')}
              className={`px-3 sm:px-4 py-2 rounded-xl transition-all whitespace-nowrap shrink-0 ${
                activeTab === 'direct'
                  ? 'bg-[#D96846] text-white font-semibold shadow-xs'
                  : 'text-[#264143] hover:text-[#D96846]'
              }`}
            >
              {language === 'en' ? 'Direct Quantitative Work' : 'प्रत्यक्ष मात्रात्मक कार्य'}
            </button>

            <button
              onClick={() => setActiveTab('facilitated')}
              className={`px-3 sm:px-4 py-2 rounded-xl transition-all whitespace-nowrap shrink-0 ${
                activeTab === 'facilitated'
                  ? 'bg-[#D96846] text-white font-semibold shadow-xs'
                  : 'text-[#264143] hover:text-[#D96846]'
              }`}
            >
              {language === 'en' ? 'Facilitated Independent Verification' : 'स्वतंत्र सत्यापन सुविधा'}
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder={t.services.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#E7E3DC] bg-[#FAF8F5] text-xs text-[#264143] placeholder-slate-400 focus:outline-none focus:border-[#D96846] focus:bg-white transition-colors"
            />
          </div>

        </div>
      </section>

      {/* 3. Services Grid */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {accessibleServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.5,
                delay: (index % 2) * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                y: -5,
                transition: { duration: 0.2, ease: 'easeOut' },
              }}
              onClick={() => setSelectedService(service)}
              className="group cursor-pointer rounded-2xl sm:rounded-3xl border border-[#E7E3DC] bg-white p-5 sm:p-7 shadow-xs hover:border-[#D96846] hover:shadow-lg transition-all duration-200 flex flex-col justify-between space-y-5 sm:space-y-6 min-w-0"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-3 py-1 rounded-full font-semibold text-[#3E6B48] bg-[#3E6B48]/10 border border-[#3E6B48]/20">
                    {service.standardCode || service.standard}
                  </span>
                  <span className="text-[#264143]/40 font-mono text-xs">
                    0{index + 1}
                  </span>
                </div>

                {/* Service Image aligned strictly inside boundaries of tile */}
                {service.imageUrl && (
                  <div className="w-full h-44 rounded-2xl overflow-hidden relative border border-[#E7E3DC] shadow-2xs bg-[#FAF8F5]">
                    <img
                      src={service.imageUrl}
                      alt={service.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                    <div className="absolute bottom-2 left-3 text-[11px] text-white/90 font-medium truncate max-w-[90%]">
                      {service.keyMetric || service.standard}
                    </div>
                  </div>
                )}

                <h3 className="font-serif text-xl font-bold text-[#264143] group-hover:text-[#D96846] transition-colors leading-snug">
                  {service.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#264143]/75 leading-relaxed">
                  {service.shortDesc}
                </p>

                {/* Key Deliverable */}
                {service.deliverables && service.deliverables.length > 0 && (
                  <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E7E3DC] space-y-1">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[#264143]/60 block">
                      Core Technical Deliverable
                    </span>
                    <div className="text-xs text-[#264143] font-medium flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#3E6B48] shrink-0" />
                      <span>{service.deliverables[0]}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-[#E7E3DC] flex items-center justify-between text-xs font-semibold text-[#264143] group-hover:text-[#D96846] transition-colors">
                <span>Inspect full methodology</span>
                <ChevronRight className="w-4 h-4 text-[#D96846] group-hover:translate-x-1.5 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* 4. Gated Access Callout */}
        {!isUnlocked && (
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl border-2 border-dashed border-[#D96846]/40 bg-gradient-to-b from-[#FAF8F5] to-white p-8 sm:p-12 text-center space-y-5"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#D96846]/10 text-[#D96846] flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>

            <div className="max-w-xl mx-auto space-y-2">
              <h3 className="font-serif text-2xl font-bold text-[#264143]">
                {lockedServicesCount}+ Specialized Practices In The Full Catalogue
              </h3>
              <p className="text-xs sm:text-sm text-[#264143]/75 leading-relaxed">
                Unlock our complete engineering deliverables, including Product Life Cycle Assessment (ISO 14044), MSME ZED Certification, EU CBAM Exporter Submissions, and Independent Verifier Matching.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setIsUnlockModalOpen(true)}
                className="px-8 py-3.5 rounded-2xl bg-[#D96846] hover:bg-[#C45737] text-white text-xs font-semibold inline-flex items-center gap-2 shadow-sm transition-all"
              >
                <span>Unlock Full Enterprise Catalogue</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>

            <p className="text-[11px] text-[#264143]/50">
              Instant access upon submitting your company details • Zero spam
            </p>
          </motion.div>
        )}

      </section>

      {/* 5. Compliance Roadmap: Step-by-Step ESG Advisory Progression */}
      <ComplianceRoadmap onSelectService={(serviceId) => onNavigate('contact', serviceId)} />

      {/* 6. Service Detail Modal */}
      <ServiceDetailModal
        service={selectedService}
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        onConsult={(serviceId) => {
          setSelectedService(null);
          onNavigate('contact', serviceId);
        }}
      />

      {/* Unlock Catalogue Modal */}
      <UnlockServicesModal
        isOpen={isUnlockModalOpen}
        onClose={() => setIsUnlockModalOpen(false)}
        onUnlocked={() => setIsUnlocked(true)}
      />

    </div>
  );
};
