import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ServiceItem } from '../types';
import { Plus, CheckCircle2, ArrowRight, ShieldCheck, Scale, FileText } from 'lucide-react';

interface ExpandableServiceAccordionProps {
  services: ServiceItem[];
  onConsult: (serviceId: string) => void;
  onOpenModal?: (service: ServiceItem) => void;
}

export const InteractiveExpandableServiceTile: React.FC<ExpandableServiceAccordionProps> = ({
  services,
  onConsult,
  onOpenModal,
}) => {
  const [openServiceId, setOpenServiceId] = useState<string | null>(services[0]?.id || null);

  const toggleService = (id: string) => {
    setOpenServiceId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-4 max-w-5xl mx-auto">
      {services.map((service, index) => {
        const isOpen = openServiceId === service.id;

        return (
          <div
            key={service.id}
            className="backdrop-blur-xl bg-white/90 border border-[#E7E3DC] rounded-3xl overflow-hidden shadow-xs hover:border-[#3E6B48]/40 transition-colors"
          >
            {/* Trigger Row: Min-height 80px, monospace practice number, display title, standard code pill, and circular toggle button */}
            <button
              type="button"
              onClick={() => toggleService(service.id)}
              aria-expanded={isOpen}
              className="w-full min-h-[80px] px-5 sm:px-8 py-4 sm:py-5 flex items-center justify-between gap-4 text-left cursor-pointer focus:outline-none transition-colors hover:bg-[#FAF8F5]/80"
            >
              <div className="flex items-center gap-3 sm:gap-6 min-w-0">
                {/* Monospace Practice Number */}
                <span className="font-mono text-xs sm:text-sm font-bold text-[#D96846] bg-[#D96846]/10 px-2.5 py-1 rounded-lg shrink-0">
                  {service.number}
                </span>

                {/* Display Title & Standard Code Pill */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 min-w-0">
                  <h3 className="font-serif text-base sm:text-xl font-bold text-[#1E382E] truncate">
                    {service.title}
                  </h3>
                  <span className="inline-block text-[11px] font-semibold text-[#3E6B48] bg-[#3E6B48]/10 px-2.5 py-0.5 rounded-full border border-[#3E6B48]/20 shrink-0 w-max">
                    {service.standardCode || service.standard}
                  </span>
                </div>
              </div>

              {/* Toggle Micro-interaction: Round secondary button with Lucide Plus that rotates 45° on active state over 200ms */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border transition-all duration-200 ${
                  isOpen
                    ? 'bg-[#3E6B48]/10 border-[#3E6B48]/30'
                    : 'bg-[#FAF8F5] border-[#E7E3DC] hover:bg-[#E7E3DC]/40'
                }`}
              >
                <Plus
                  className={`w-5 h-5 text-[#1E382E] transition-transform duration-200 ${
                    isOpen ? 'rotate-45 text-[#3E6B48]' : 'text-[#264143]/70'
                  }`}
                />
              </div>
            </button>

            {/* Expansion Animation: AnimatePresence wrapper with initial/animate/exit height and opacity over 0.35s easeInOut */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-[#E7E3DC] px-5 sm:px-8 py-6 bg-[#FAF8F5]/60 space-y-6">
                    
                    {/* Interior Content: Two-column grid with image, deliverables, and primary action */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                      
                      {/* Left Column (5 cols): Contained Image & Scope Description */}
                      <div className="lg:col-span-5 space-y-4">
                        {service.imageUrl && (
                          <div className="w-full h-44 rounded-2xl overflow-hidden relative border border-[#E7E3DC] shadow-xs">
                            <img
                              src={service.imageUrl}
                              alt={service.title}
                              loading="lazy"
                              className="w-full h-full object-cover object-center"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                            <div className="absolute bottom-2.5 left-3 text-[11px] text-white font-medium bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-md">
                              {service.keyMetric || service.standard}
                            </div>
                          </div>
                        )}

                        <p className="text-xs sm:text-sm text-[#264143]/80 leading-relaxed">
                          {service.fullDesc || service.shortDesc}
                        </p>
                      </div>

                      {/* Right Column (7 cols): Staggered Deliverables List & Actions */}
                      <div className="lg:col-span-7 space-y-5">
                        <div className="space-y-2">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[#3E6B48] block">
                            Key Practice Deliverables & Work Products:
                          </span>
                          
                          <div className="space-y-2.5">
                            {service.deliverables.map((item, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: 12 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.25, delay: idx * 0.05 }}
                                className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white border border-[#E7E3DC] shadow-2xs text-xs text-[#264143]"
                              >
                                <CheckCircle2 className="w-4 h-4 text-[#3E6B48] shrink-0 mt-0.5" />
                                <span className="font-medium leading-relaxed">{item}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Two-Line Independence Governance Note */}
                        {service.whySeparateNote && (
                          <div className="p-3.5 rounded-xl bg-[#3E6B48]/5 border border-[#3E6B48]/20 text-xs text-[#1E382E] space-y-1">
                            <span className="font-bold text-[11px] uppercase tracking-wider text-[#D96846] block">
                              Assurance Independence Guarantee:
                            </span>
                            <p className="text-[11px] text-[#264143]/80 leading-relaxed">
                              {service.whySeparateNote}
                            </p>
                          </div>
                        )}

                        {/* Action Row */}
                        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                          <motion.button
                            type="button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => onConsult(service.id)}
                            className="px-6 py-3 rounded-2xl bg-[#D96846] hover:bg-[#C45737] text-white text-xs font-semibold shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
                          >
                            <span>Request Practice Scoping</span>
                            <ArrowRight className="w-3.5 h-3.5 text-white" />
                          </motion.button>

                          {onOpenModal && (
                            <button
                              type="button"
                              onClick={() => onOpenModal(service)}
                              className="px-5 py-3 rounded-2xl border border-[#E7E3DC] bg-white hover:bg-[#FAF8F5] text-[#1E382E] text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
                            >
                              <span>View Full Standard Dossier</span>
                            </button>
                          )}
                        </div>

                      </div>

                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
