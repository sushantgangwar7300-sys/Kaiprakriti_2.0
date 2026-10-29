import React from 'react';
import { ServiceItem } from '../types';
import { X, CheckCircle2, ArrowRight, ShieldCheck, Scale, FileText, ChevronRight } from 'lucide-react';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  isOpen: boolean;
  onClose: () => void;
  onConsult: (serviceId: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  isOpen,
  onClose,
  onConsult,
}) => {
  if (!isOpen || !service) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-5 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-[#E7E3DC] bg-[#FAF8F5] p-6 sm:p-8 shadow-2xl relative space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close service details"
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-black/5 text-[#264143]/60 hover:text-[#264143] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with Standard Code and Number */}
        <div className="space-y-2 pr-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-mono font-bold text-[#D96846] bg-[#D96846]/10 px-2.5 py-0.5 rounded-md">
              PRACTICE {service.number}
            </span>
            <span className="text-[11px] font-semibold text-[#3E6B48] bg-[#3E6B48]/10 px-3 py-0.5 rounded-full border border-[#3E6B48]/25">
              {service.standardCode || service.standard}
            </span>
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
              service.category === 'direct'
                ? 'bg-[#3E6B48]/10 text-[#3E6B48] border-[#3E6B48]/30'
                : service.category === 'facilitated'
                ? 'bg-[#D96846]/10 text-[#D96846] border-[#D96846]/30'
                : 'bg-[#E99F4C]/20 text-[#264143] border-[#E99F4C]/40'
            }`}>
              {service.category === 'direct' ? 'Direct Advisory Work' : service.category === 'facilitated' ? 'Facilitated Verification' : 'Hybrid Practice'}
            </span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#264143] leading-snug">
            {service.title}
          </h2>

          <p className="text-xs sm:text-sm text-[#264143]/80 leading-relaxed">
            {service.fullDesc || service.shortDesc}
          </p>
        </div>

        {/* Key Metric Highlight */}
        {service.keyMetric && (
          <div className="p-4 rounded-2xl bg-white border border-[#E7E3DC] flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#3E6B48]/15 text-[#3E6B48] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] text-[#264143]/60 uppercase tracking-wider font-semibold">
                Core Compliance Metric
              </div>
              <div className="text-xs sm:text-sm font-bold text-[#264143]">
                {service.keyMetric}
              </div>
            </div>
          </div>
        )}

        {/* Deliverables Section */}
        {service.deliverables && service.deliverables.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#264143] uppercase tracking-wider">
              <FileText className="w-4 h-4 text-[#D96846]" />
              <span>Standard Engagement Deliverables</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {service.deliverables.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-white border border-[#E7E3DC] flex items-start gap-2.5 text-xs text-[#264143]/85"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#3E6B48] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Why Separate Note (Zero Self-Review Conflict) */}
        {service.whySeparateNote && (
          <div className="p-4 rounded-2xl bg-[#3E6B48]/5 border border-[#3E6B48]/20 flex items-start gap-3 text-xs">
            <Scale className="w-4 h-4 text-[#3E6B48] shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <strong className="text-[#3E6B48] block">Statutory Assurance Integrity:</strong>
              <span className="text-[#264143]/80 leading-relaxed">{service.whySeparateNote}</span>
            </div>
          </div>
        )}

        {/* Modal Action CTA */}
        <div className="pt-3 border-t border-[#E7E3DC] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-3 rounded-xl text-xs font-semibold text-[#264143]/70 hover:text-[#264143] hover:bg-slate-100 transition-colors text-center cursor-pointer"
          >
            Close Details
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onConsult(service.id);
            }}
            className="px-6 py-3 rounded-xl text-xs font-semibold bg-[#D96846] hover:bg-[#C45737] text-white flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
          >
            <span>Request Scoping for this Practice</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
