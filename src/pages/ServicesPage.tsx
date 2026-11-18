import React, { useState, useEffect } from 'react';
import { PageId, ServiceCategory, ServiceItem } from '../types';
import { getStoredServices } from '../data/servicesStore';
import { Search, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { ServiceFlashCard } from '../components/ServiceFlashCard';
import { ServiceDetailModal } from '../components/ServiceDetailModal';
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

    window.addEventListener('kai_prakriti_services_updated', handleServicesUpdate);

    return () => {
      window.removeEventListener('kai_prakriti_services_updated', handleServicesUpdate);
    };
  }, []);

  // Filter services by category and query - Zero barriers, all services accessible
  const filtered = services.filter(service => {
    const matchesTab = activeTab === 'all' || service.category === activeTab;
    const matchesSearch =
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.standard.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const accessibleServices = filtered;

  return (
    <div className="bg-[#060809] text-white min-h-screen">
      
      {/* 1. Header with Clean Industrial Decarbonization & Clean Energy Infrastructure Background */}
      <section className="relative pt-16 pb-16 sm:pt-24 sm:pb-24 border-b border-[#1E2628] overflow-hidden bg-[#080B0C]">
        
        {/* Full Background Video: Clean Industrial Decarbonization & Renewable Infrastructure */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=2000&q=80"
            className="w-full h-full object-cover scale-105 opacity-20"
          >
            <source src="https://videos.pexels.com/video-files/3129957/3129957-uhd_2560_1440_25fps.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#080B0C]/90 via-[#080B0C]/95 to-[#080B0C]" />
          
          {/* Subtle Ambient Golden Light Bloom */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-[#D4AF37]/10 via-[#F59E0B]/10 to-transparent blur-3xl pointer-events-none rounded-full" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#F5C26B] uppercase tracking-wider bg-[#0D1214] backdrop-blur-md px-4 py-1.5 rounded-full border border-[#D4AF37]/35 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#F5C26B]" />
            <span>Sovereign Advisory Practices • Full Catalogue Unlocked</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Sovereign sustainability solutions built for regulatory certainty.
          </h1>

          <p className="text-sm sm:text-base text-slate-300 font-normal max-w-2xl mx-auto leading-relaxed">
            From Scope 1–3 greenhouse gas accounting to SEBI BRSR Core assurance and EU CBAM exporter dossiers, explore all {services.length} practices delivered with stoichiometric empirical rigor.
          </p>

          {/* Real-time Status Badge */}
          <div className="pt-2 flex items-center justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#D4AF37]/10 text-[#F5C26B] border border-[#D4AF37]/30 text-xs font-semibold shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-[#F5C26B]" />
              <span>Full Access Active: All {services.length} Sovereign Practices Available With Complete Methodology</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Filter & Search Controls */}
      <section className="py-4 sm:py-6 border-b border-[#1E2628] bg-[#0A0E10]/95 sticky top-16 sm:top-20 z-20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
          
          {/* Segmented Filter Buttons */}
          <div className="flex items-center space-x-1 p-1 rounded-2xl border border-[#1E2628] bg-[#080B0C] text-xs font-medium w-full md:w-auto overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 sm:px-4 py-2 rounded-xl transition-all whitespace-nowrap shrink-0 ${
                activeTab === 'all'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#E99F4C] text-black font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {language === 'en' ? `All Practices (${accessibleServices.length})` : `सभी सेवाएं (${accessibleServices.length})`}
            </button>

            <button
              onClick={() => setActiveTab('direct')}
              className={`px-3.5 sm:px-4 py-2 rounded-xl transition-all whitespace-nowrap shrink-0 ${
                activeTab === 'direct'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#E99F4C] text-black font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {language === 'en' ? 'Direct Quantitative Work' : 'प्रत्यक्ष मात्रात्मक कार्य'}
            </button>

            <button
              onClick={() => setActiveTab('facilitated')}
              className={`px-3.5 sm:px-4 py-2 rounded-xl transition-all whitespace-nowrap shrink-0 ${
                activeTab === 'facilitated'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#E99F4C] text-black font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
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
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#1E2628] bg-[#080B0C] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37] focus:bg-[#0D1214] transition-colors"
            />
          </div>

        </div>
      </section>

      {/* 3. Services Grid Featuring Dark Luxury Flashcards with Golden Light Threads and Looping Images */}
      <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Flashcards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {accessibleServices.map((service, index) => (
            <ServiceFlashCard
              key={service.id}
              service={service}
              index={index}
              onSelect={setSelectedService}
            />
          ))}
        </div>

        {/* Informative Footer Banner */}
        <div className="p-6 sm:p-8 rounded-3xl border border-[#1E2628] bg-gradient-to-r from-[#080B0C] via-[#0D1214] to-[#080B0C] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-radial from-[#D4AF37]/5 via-transparent to-transparent pointer-events-none" />
          <div className="space-y-1.5 relative z-10 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-sm font-bold text-white">
              <Sparkles className="w-4 h-4 text-[#F5C26B]" />
              <span>Statutory Compliance & Traceable Engineering Workbooks</span>
            </div>
            <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
              Every practice includes full audit trails, ISO-aligned calculation workbooks, and direct advisory support led by accredited environmental engineers.
            </p>
          </div>
          <button
            onClick={() => onNavigate('contact')}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#E99F4C] hover:brightness-110 text-black text-xs font-bold transition-all shadow-md shrink-0 relative z-10"
          >
            Schedule Consultation
          </button>
        </div>

      </section>

      {/* 4. Service Detail Modal */}
      <ServiceDetailModal
        service={selectedService}
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        onConsult={(serviceId) => {
          setSelectedService(null);
          onNavigate('contact', serviceId);
        }}
      />

    </div>
  );
};
