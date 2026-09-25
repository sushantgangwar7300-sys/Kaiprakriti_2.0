import React, { useState } from 'react';
import { DesignThemeId, InquiryFormData } from '../types';
import { ELEVEN_SERVICES } from '../data/consultancyData';
import { Send, CheckCircle2, ShieldCheck, Mail, Building, User, HelpCircle } from 'lucide-react';

interface InquiryFormProps {
  theme: DesignThemeId;
  prefilledServiceId?: string;
}

export const InquiryForm: React.FC<InquiryFormProps> = ({
  theme,
  prefilledServiceId,
}) => {
  const [formData, setFormData] = useState<InquiryFormData>({
    name: '',
    email: '',
    company: '',
    companyType: 'SEBI Listed Entity',
    serviceId: prefilledServiceId || 'ghg-accounting',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Sync if prefilled changes
  React.useEffect(() => {
    if (prefilledServiceId) {
      setFormData((prev) => ({ ...prev, serviceId: prefilledServiceId }));
    }
  }, [prefilledServiceId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const isDark = theme === 'vibrant';
  const cardBg = isDark
    ? 'bg-[#1C153E] border-white/15 text-white'
    : theme === 'editorial'
    ? 'bg-white border-slate-300 text-slate-900'
    : 'bg-white border-[#E2ECE5] text-[#1E3A2F]';

  const inputBg = isDark
    ? 'bg-[#120D2B] border-white/20 text-white placeholder-white/40 focus:border-[#23E391]'
    : theme === 'editorial'
    ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-slate-800'
    : 'bg-[#FAF9F5] border-[#D6E5DB] text-[#1E3A2F] placeholder-[#4A5D54]/60 focus:border-[#2D7A4D]';

  return (
    <section id="contact" className="py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Context & Guarantees */}
          <div className="lg:col-span-5 space-y-6">
            <span
              className="font-mono text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full border inline-block"
              style={{
                borderColor: isDark ? '#23E391' : '#2D7A4D',
                color: isDark ? '#23E391' : '#2D7A4D',
                backgroundColor: isDark ? 'rgba(35, 227, 145, 0.1)' : 'rgba(45, 122, 77, 0.08)',
              }}
            >
              [ INQUIRIES & SCOPING ]
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
              Start a Scoping Conversation
            </h2>
            <p className="text-base opacity-80 leading-relaxed font-light">
              Whether your challenge is calculating full Scope 3 emissions under the GHG Protocol, building an auditable BRSR Core assurance trail, or securing live-accredited EU CBAM verification without broker markups, reach out directly.
            </p>

            {/* Guarantees Box */}
            <div className="p-6 rounded-2xl border space-y-3 font-mono text-xs" style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
              <div className="flex items-center gap-2 font-bold text-emerald-500">
                <ShieldCheck className="w-4 h-4" />
                <span>KAI PRAKRITI GOVERNANCE PROMISES:</span>
              </div>
              <ul className="space-y-2 opacity-80 font-sans text-xs">
                <li>• <strong>Zero self-audit conflict:</strong> We never issue assurance opinions on our own inventory sheets.</li>
                <li>• <strong>Disclosed commissions:</strong> Any verifier introduction fees are noted in writing.</li>
                <li>• <strong>Confidentiality:</strong> Complete NDA protection for proprietary manufacturing formulations and supplier matrices.</li>
              </ul>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className={`lg:col-span-7 p-8 sm:p-10 rounded-3xl border shadow-xl ${cardBg}`}>
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold">Scoping Request Received</h3>
                <p className="text-sm opacity-80 max-w-md mx-auto">
                  Thank you, <strong>{formData.name}</strong>. A Kai Prakriti senior ESG advisor will review your entity's requirements for <strong>{formData.company}</strong> and reach out within 24 business hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-full text-xs font-mono font-bold uppercase border border-current hover:bg-black/5 dark:hover:bg-white/10"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-mono text-xs uppercase opacity-75 mb-1.5 font-bold">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikramaditya Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl text-sm border focus:outline-none transition-all ${inputBg}`}
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs uppercase opacity-75 mb-1.5 font-bold">
                      Corporate Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="v.sharma@enterprise.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl text-sm border focus:outline-none transition-all ${inputBg}`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-mono text-xs uppercase opacity-75 mb-1.5 font-bold">
                      Company / Organization *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bharat Metallurgy Ltd."
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl text-sm border focus:outline-none transition-all ${inputBg}`}
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs uppercase opacity-75 mb-1.5 font-bold">
                      Enterprise Classification
                    </label>
                    <select
                      value={formData.companyType}
                      onChange={(e) => setFormData({ ...formData, companyType: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl text-sm border focus:outline-none transition-all ${inputBg}`}
                    >
                      <option>Top 1,000 SEBI Listed Entity</option>
                      <option>EU Exporter (CBAM Affected)</option>
                      <option>MSME Manufacturing Supplier</option>
                      <option>Carbon Offset Project Developer</option>
                      <option>Multinational / Financial Institution</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-xs uppercase opacity-75 mb-1.5 font-bold">
                    Primary Service Required
                  </label>
                  <select
                    value={formData.serviceId}
                    onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl text-sm border focus:outline-none transition-all ${inputBg}`}
                  >
                    {ELEVEN_SERVICES.map((svc) => (
                      <option key={svc.id} value={svc.id}>
                        Service {svc.number}: {svc.title} ({svc.category.toUpperCase()})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-xs uppercase opacity-75 mb-1.5 font-bold">
                    Project Scope / Specific Targets (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Provide facility locations, number of manufacturing installations, reporting deadlines, or specific verification requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl text-sm border focus:outline-none transition-all ${inputBg}`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-xl font-mono text-xs uppercase font-bold tracking-wider transition-all flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'Submitting Scope Inquiry...' : 'Submit Scoping Inquiry'}</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
