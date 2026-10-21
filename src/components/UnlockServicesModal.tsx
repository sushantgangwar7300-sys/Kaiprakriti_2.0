import React, { useState } from 'react';
import { X, Lock, CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { saveLead } from '../data/leadStore';
import { unlockCatalogue } from '../data/servicesStore';

interface UnlockServicesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUnlocked: () => void;
}

export const UnlockServicesModal: React.FC<UnlockServicesModalProps> = ({
  isOpen,
  onClose,
  onUnlocked,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [focusArea, setFocusArea] = useState('ghg-accounting');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isReturning, setIsReturning] = useState(false);
  const [returningEmail, setReturningEmail] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !company) return;

    // Save as high-intent lead in Admin CRM
    saveLead({
      name,
      company,
      email,
      phone: phone || '+91 Not Provided',
      companyType: 'corporate',
      serviceId: focusArea,
      status: 'new',
      estimatedBudget: 'Under Evaluation',
      targetDeadline: 'Immediate 2026',
      message: `User unlocked full services catalogue. Primary focus: ${focusArea}`,
      notes: ['Auto-registered via Gated Services Catalogue on website'],
      source: 'Services Catalogue Gate',
    });

    unlockCatalogue({ name, email, company, phone });
    setIsSubmitted(true);
    setTimeout(() => {
      onUnlocked();
      onClose();
    }, 1200);
  };

  const handleReturningSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!returningEmail) return;

    unlockCatalogue({ name: 'Returning Client', email: returningEmail, company: 'Enterprise Client' });
    setIsSubmitted(true);
    setTimeout(() => {
      onUnlocked();
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-3xl border border-[#E7E3DC] bg-[#FBF9F5] p-5 sm:p-8 shadow-2xl relative">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full hover:bg-black/5 text-[#264143]/60 hover:text-[#264143] transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-4 animate-in zoom-in-95 duration-300">
            <div className="w-14 h-14 rounded-2xl bg-[#3E6B48]/10 text-[#3E6B48] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#264143]">
              Catalogue Unlocked!
            </h3>
            <p className="text-xs text-[#264143]/70 max-w-sm mx-auto leading-relaxed">
              Welcome! You now have unrestricted access to all sovereign ESG, Scope 1–3 GHG accounting, and EU CBAM advisory practices.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            
            {/* Header */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#D96846]/10 text-[#D96846] border border-[#D96846]/30">
                <Lock className="w-3 h-3" />
                <span>Enterprise Service Catalogue</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#264143] tracking-tight">
                Unlock Complete Advisory Practices
              </h3>
              <p className="text-xs text-[#264143]/70 leading-relaxed">
                As a specialized startup practice, we share our granular engineering methods, delivery scopes, and emission factor databases directly with genuine enterprise leaders. Fill out the brief form below to view all services instantly.
              </p>
            </div>

            {/* Toggle Returning vs New */}
            <div className="flex items-center justify-between pt-1 text-xs">
              <span className="text-[#264143]/60">Already filled this before?</span>
              <button
                type="button"
                onClick={() => setIsReturning(!isReturning)}
                className="font-semibold text-[#D96846] hover:underline"
              >
                {isReturning ? '← Register New Entity' : 'Enter Email to Re-open'}
              </button>
            </div>

            {isReturning ? (
              <form onSubmit={handleReturningSubmit} className="space-y-3.5 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-[#264143] mb-1">
                    Corporate Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="sushant@enterprise.com"
                    value={returningEmail}
                    onChange={(e) => setReturningEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E3DC] bg-white text-xs text-[#264143] focus:outline-none focus:border-[#D96846]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#264143] hover:bg-black text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <span>Re-open All Services</span>
                  <ArrowRight className="w-4 h-4 text-[#E99F4C]" />
                </button>
              </form>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5 pt-2 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-[#264143] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Anil Verma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E3DC] bg-white text-[#264143] focus:outline-none focus:border-[#D96846]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#264143] mb-1">
                      Company / Organization *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Apex Manufacturing Ltd."
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E3DC] bg-white text-[#264143] focus:outline-none focus:border-[#D96846]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-[#264143] mb-1">
                      Corporate Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="a.verma@apex.in"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E3DC] bg-white text-[#264143] focus:outline-none focus:border-[#D96846]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#264143] mb-1">
                      Phone Number (WhatsApp)
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98200 12345"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E3DC] bg-white text-[#264143] focus:outline-none focus:border-[#D96846]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-[#264143] mb-1">
                    Primary Practice of Interest
                  </label>
                  <select
                    value={focusArea}
                    onChange={(e) => setFocusArea(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7E3DC] bg-white text-[#264143] focus:outline-none focus:border-[#D96846]"
                  >
                    <option value="ghg-accounting">Scope 1, 2, and 15-category Scope 3 GHG Accounting</option>
                    <option value="brsr-core">SEBI BRSR Core Assurance Filing Preparation</option>
                    <option value="cbam-readiness">EU CBAM Specific Embedded Emissions for Exporters</option>
                    <option value="lca-product">Product Life Cycle Assessment (ISO 14040/44)</option>
                    <option value="zed-support">MSME ZED Bronze/Silver/Gold Certification</option>
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#D96846] hover:bg-[#C45737] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-all"
                  >
                    <span>Submit & Unlock All Services Instantly</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </button>
                </div>

                <p className="text-[11px] text-[#264143]/50 text-center">
                  Your information is kept confidential. Zero spam. Directly received by our advisory leadership.
                </p>
              </form>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
