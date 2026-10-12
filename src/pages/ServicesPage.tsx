import React, { useState, useEffect } from 'react';
import { PageId, ServiceCategory, ServiceItem } from '../types';
import { getStoredServices, isCatalogueUnlocked } from '../data/servicesStore';
import { Search, ArrowRight, CheckCircle2, ChevronRight, X, Lock, Sparkles, ShieldCheck, Mail } from 'lucide-react';
import { UnlockServicesModal } from '../components/UnlockServicesModal';

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
      
      {/* 1. Header (Relaxed, Environmental Aesthetic) */}
      <section className="pt-14 pb-14 border-b border-[#E7E3DC] bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#3E6B48] uppercase tracking-wider bg-[#3E6B48]/10 px-3.5 py-1.5 rounded-full border border-[#3E6B48]/20">
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#3E6B48]/10 text-[#3E6B48] border border-[#3E6B48]/30 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Enterprise Catalogue Unlocked: Viewing All {services.length} Practices</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#D96846]/10 text-[#D96846] border border-[#D96846]/30 text-xs font-semibold">
                <Lock className="w-3.5 h-3.5" />
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
              All Practices ({accessibleServices.length})
            </button>

            <button
              onClick={() => setActiveTab('direct')}
              className={`px-3 sm:px-4 py-2 rounded-xl transition-all whitespace-nowrap shrink-0 ${
                activeTab === 'direct'
                  ? 'bg-[#D96846] text-white font-semibold shadow-xs'
                  : 'text-[#264143] hover:text-[#D96846]'
              }`}
            >
              Direct Quantitative Work
            </button>

            <button
              onClick={() => setActiveTab('facilitated')}
              className={`px-3 sm:px-4 py-2 rounded-xl transition-all whitespace-nowrap shrink-0 ${
                activeTab === 'facilitated'
                  ? 'bg-[#D96846] text-white font-semibold shadow-xs'
                  : 'text-[#264143] hover:text-[#D96846]'
              }`}
            >
              Facilitated Independent Verification
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search standards, frameworks..."
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
            <div
              key={service.id}
              onClick={() => setSelectedService(service)}
              className="group cursor-pointer rounded-2xl sm:rounded-3xl border border-[#E7E3DC] bg-white p-5 sm:p-7 shadow-xs hover:border-[#D96846] hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-5 sm:space-y-6 min-w-0"
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
                <ChevronRight className="w-4 h-4 text-[#D96846] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* 4. Gated Access Callout (When not yet unlocked) */}
        {!isUnlocked && (
          <div className="rounded-3xl border-2 border-dashed border-[#D96846]/40 bg-gradient-to-b from-[#FAF8F5] to-white p-8 sm:p-12 text-center space-y-5">
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
          </div>
        )}

      </section>

      {/* 5. Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl border border-[#E7E3DC] p-5 sm:p-8 bg-white shadow-2xl space-y-5 sm:space-y-6">
            
            <div className="flex items-start justify-between gap-3 sm:gap-4 border-b border-[#E7E3DC] pb-4">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-[#3E6B48] uppercase tracking-wider">
                  {selectedService.standard}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#264143]">
                  {selectedService.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedService(null)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-[#264143]/60 hover:text-[#264143] shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-[#264143]">
              <div>
                <h4 className="font-serif font-bold text-base text-[#264143] mb-1">
                  Scope of Technical Work
                </h4>
                <p className="text-xs leading-relaxed text-[#264143]/80">
                  {selectedService.fullDesc || selectedService.shortDesc}
                </p>
              </div>

              {selectedService.deliverables && selectedService.deliverables.length > 0 && (
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#264143] mb-2">
                    Key Client Deliverables
                  </h4>
                  <ul className="space-y-2 text-xs text-[#264143]/80">
                    {selectedService.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#3E6B48] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedService.whySeparateNote && (
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E7E3DC] space-y-1 text-xs">
                  <span className="font-bold text-[#D96846] block">
                    Zero Self-Review Independence Note:
                  </span>
                  <p className="text-[#264143]/80 leading-relaxed">
                    {selectedService.whySeparateNote}
                  </p>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-[#E7E3DC] flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <button
                onClick={() => setSelectedService(null)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-[#E7E3DC] text-xs font-semibold text-[#264143] text-center"
              >
                Close
              </button>

              <button
                onClick={() => {
                  const s = selectedService;
                  setSelectedService(null);
                  onNavigate('contact', s.id);
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#D96846] hover:bg-[#C45737] text-white text-xs font-semibold flex items-center justify-center gap-2"
              >
                <span>Request Scoping Discussion</span>
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Unlock Catalogue Modal */}
      <UnlockServicesModal
        isOpen={isUnlockModalOpen}
        onClose={() => setIsUnlockModalOpen(false)}
        onUnlocked={() => setIsUnlocked(true)}
      />

    </div>
  );
};
