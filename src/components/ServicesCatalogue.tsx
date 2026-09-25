import React, { useState } from 'react';
import { ServiceItem, ServiceCategory } from '../types';
import { ELEVEN_SERVICES } from '../data/consultancyData';
import { Search, Filter, ArrowUpRight, CheckCircle2, X, FileCheck2, Scale, ExternalLink, Landmark } from 'lucide-react';

interface ServicesCatalogueProps {
  theme?: string;
  onSelectServiceForInquiry?: (serviceId: string) => void;
}

export const ServicesCatalogue: React.FC<ServicesCatalogueProps> = ({
  onSelectServiceForInquiry,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | ServiceCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeServiceModal, setActiveServiceModal] = useState<ServiceItem | null>(null);

  // Filter logic
  const filteredServices = ELEVEN_SERVICES.filter((svc) => {
    const matchesCategory =
      selectedFilter === 'all' ||
      (selectedFilter === 'direct' && svc.category === 'direct') ||
      (selectedFilter === 'facilitated' && svc.category === 'facilitated') ||
      (selectedFilter === 'hybrid' && svc.category === 'hybrid');

    const matchesSearch =
      svc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      svc.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      svc.standard.toLowerCase().includes(searchQuery.toLowerCase()) ||
      svc.standardCode.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="services" className="py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 border-b border-slate-800 pb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 font-mono text-xs font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 mb-3">
              <Landmark className="w-3.5 h-3.5 text-emerald-400" />
              <span>THE ELEVEN GOVERNED SERVICES</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Governed Services Catalogue
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-2 font-light max-w-2xl">
              From mathematical carbon accounting and LCA modeling to accredited European and Indian verification introductions with zero conflict of interest.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search BRSR, CBAM, Scope 3..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2.5 rounded-xl text-xs font-mono border border-slate-700 bg-slate-900 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8 font-mono text-xs">
          <span className="text-slate-400 text-[11px] uppercase mr-2 flex items-center gap-1 font-semibold">
            <Filter className="w-3.5 h-3.5 text-slate-400" /> Filter by Type:
          </span>
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-4 py-1.5 rounded-xl transition-all ${
              selectedFilter === 'all'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
                : 'border border-slate-700 bg-slate-900/60 text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            All Services ({ELEVEN_SERVICES.length})
          </button>
          <button
            onClick={() => setSelectedFilter('direct')}
            className={`px-4 py-1.5 rounded-xl transition-all ${
              selectedFilter === 'direct'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
                : 'border border-slate-700 bg-slate-900/60 text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            Direct Advisory (7)
          </button>
          <button
            onClick={() => setSelectedFilter('facilitated')}
            className={`px-4 py-1.5 rounded-xl transition-all ${
              selectedFilter === 'facilitated'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-md'
                : 'border border-slate-700 bg-slate-900/60 text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            Facilitated Verification (3)
          </button>
          <button
            onClick={() => setSelectedFilter('hybrid')}
            className={`px-4 py-1.5 rounded-xl transition-all ${
              selectedFilter === 'hybrid'
                ? 'bg-cyan-400 text-slate-950 font-bold shadow-md'
                : 'border border-slate-700 bg-slate-900/60 text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            Hybrid (1)
          </button>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((svc) => {
            const isDirect = svc.category === 'direct';
            const isFacilitated = svc.category === 'facilitated';

            return (
              <div
                key={svc.id}
                className="p-7 rounded-2xl border border-slate-800 bg-[#0B1120] transition-all duration-200 flex flex-col justify-between group shadow-lg hover:border-emerald-500/50 hover:shadow-emerald-500/5"
              >
                <div>
                  {/* Top Metadata */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`font-mono text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase border ${
                        isDirect
                          ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                          : isFacilitated
                          ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                          : 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
                      }`}
                    >
                      {svc.category}
                    </span>
                    <span className="font-mono text-xs text-slate-400 font-bold">
                      #{svc.number}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-xl font-bold text-white mb-2.5 tracking-tight group-hover:text-emerald-400 transition-colors">
                    {svc.title}
                  </h3>

                  {/* Short description */}
                  <p className="text-sm text-slate-300 leading-relaxed mb-6 font-light">
                    {svc.shortDesc}
                  </p>
                </div>

                {/* Bottom Standard & Scope trigger */}
                <div className="pt-4 border-t border-slate-800/80 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Standard:</span>
                    <span className="font-semibold text-[11px] text-slate-200 truncate max-w-[170px]" title={svc.standard}>
                      {svc.standardCode}
                    </span>
                  </div>

                  <button
                    onClick={() => setActiveServiceModal(svc)}
                    className="w-full py-2.5 px-3 rounded-xl border border-slate-700 bg-slate-900/80 font-mono text-xs font-bold text-slate-200 hover:text-white hover:border-emerald-500/50 flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>View Methodology & Deliverables</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {filteredServices.length === 0 && (
          <div className="text-center py-16 p-8 border border-slate-800 rounded-2xl bg-slate-900/40">
            <p className="font-serif text-lg text-slate-300">No services match your query "{searchQuery}".</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedFilter('all');
              }}
              className="mt-3 text-xs font-mono text-emerald-400 underline font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Service Details Modal */}
        {activeServiceModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="relative w-full max-w-2xl rounded-2xl border border-slate-700 bg-[#0A0F1D] text-slate-100 p-6 sm:p-8 shadow-2xl space-y-6">
              
              {/* Header */}
              <div className="flex items-start justify-between border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center space-x-2 mb-1.5">
                    <span className="font-mono text-xs px-2.5 py-0.5 rounded-full font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Service {activeServiceModal.number} • {activeServiceModal.category}
                    </span>
                    <span className="font-mono text-xs text-slate-400">
                      {activeServiceModal.standardCode}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-white">
                    {activeServiceModal.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveServiceModal(null)}
                  className="p-1.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Description */}
              <div>
                <h4 className="font-mono text-xs uppercase text-slate-400 tracking-wider mb-1 font-bold">
                  Detailed Scope & Methodology
                </h4>
                <p className="text-sm leading-relaxed text-slate-300 font-light">
                  {activeServiceModal.fullDesc}
                </p>
              </div>

              {/* Deliverables List */}
              <div className="space-y-2">
                <h4 className="font-mono text-xs uppercase text-slate-400 tracking-wider font-bold">
                  Tangible Deliverables
                </h4>
                <div className="space-y-2">
                  {activeServiceModal.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-2.5 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Why Separate Note */}
              <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-950/20 text-amber-200 text-xs">
                <div className="flex items-center gap-1.5 font-bold font-mono uppercase mb-1 text-amber-300">
                  <Scale className="w-4 h-4 text-amber-400" />
                  <span>Ethical Firebreak & Verification Rule</span>
                </div>
                <p className="leading-relaxed text-amber-200/90 font-light">
                  {activeServiceModal.whySeparateNote}
                </p>
              </div>

              {/* Footer action */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
                <span className="font-mono text-xs text-slate-400">
                  Governing Standard: <strong className="text-slate-200">{activeServiceModal.standard}</strong>
                </span>
                <button
                  onClick={() => {
                    const svcId = activeServiceModal.id;
                    setActiveServiceModal(null);
                    if (onSelectServiceForInquiry) {
                      onSelectServiceForInquiry(svcId);
                    }
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors shadow-md"
                >
                  Request Scoping for this Service →
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
