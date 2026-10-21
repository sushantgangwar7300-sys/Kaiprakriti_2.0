import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { getStoredServices } from '../data/servicesStore';
import { saveLead } from '../data/leadStore';
import { Mail, Phone, MapPin, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ContactPageProps {
  theme?: string;
  mode?: string;
  onNavigate: (page: PageId) => void;
  prefilledServiceId?: string;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onNavigate,
  prefilledServiceId,
}) => {
  const { language, t } = useLanguage();
  const [services] = useState(getStoredServices);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    companyType: 'corporate',
    serviceId: prefilledServiceId || 'ghg-accounting',
    estimatedBudget: 'Under Scoping',
    targetDeadline: 'Q4 2026',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [createdLeadId, setCreatedLeadId] = useState('');

  useEffect(() => {
    if (prefilledServiceId) {
      setFormData(prev => ({ ...prev, serviceId: prefilledServiceId }));
    }
  }, [prefilledServiceId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.company) return;

    const lead = saveLead({
      name: formData.name,
      company: formData.company,
      email: formData.email,
      phone: formData.phone || '+91 Not Provided',
      companyType: formData.companyType,
      serviceId: formData.serviceId,
      status: 'new',
      estimatedBudget: formData.estimatedBudget,
      targetDeadline: formData.targetDeadline,
      message: formData.message || 'Scoping inquiry submitted via contact portal.',
      notes: ['Direct web inquiry submitted'],
      source: 'Contact Page Inquiry Portal',
    });

    setCreatedLeadId(lead.id);
    setIsSubmitted(true);
  };

  return (
    <div className="bg-[#FAF8F5] text-[#264143] min-h-screen">
      
      {/* 1. Header with Architectural Consultation Headquarters Background Image */}
      <section className="relative pt-14 pb-14 sm:pt-20 sm:pb-20 border-b border-[#E7E3DC] overflow-hidden">
        
        {/* Related Background Image: Corporate Headquarters & Sustainability Consultation Center */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80"
            alt="Corporate Advisory Center"
            className="w-full h-full object-cover scale-105 opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5]/95 via-[#FAF8F5]/85 to-[#FAF8F5]" />
          <div className="absolute inset-0 bg-[#264143]/5 mix-blend-multiply" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#3E6B48] uppercase tracking-wider bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#E7E3DC] shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#D96846]" />
            <span>{t.contact.badge}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#264143]">
            {t.contact.title}
          </h1>

          <p className="text-xs sm:text-base text-[#264143]/75 font-normal max-w-2xl mx-auto leading-relaxed">
            {t.contact.subtitle}
          </p>
        </div>
      </section>

      {/* 2. Main Contact Form & Details Grid */}
      <section className="py-12 sm:py-18 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16">
            
            {/* Left: Direct Information & Official Emails */}
            <div className="lg:col-span-5 space-y-6 sm:space-y-8 min-w-0">
              <div className="space-y-2 sm:space-y-3">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#264143]">
                  Direct Advisory Correspondence
                </h3>
                <p className="text-xs sm:text-sm text-[#264143]/75 leading-relaxed">
                  Our specialized sustainability practice assists emerging exporters and domestic enterprises with sovereign carbon accounting and audit readiness.
                </p>
              </div>

              <div className="space-y-5 text-xs sm:text-sm">
                
                {/* Official Contact Email */}
                <div className="flex items-start gap-3.5 p-4 sm:p-5 rounded-2xl bg-white border border-[#E7E3DC] shadow-2xs">
                  <div className="w-10 h-10 rounded-xl bg-[#3E6B48]/10 flex items-center justify-center text-[#3E6B48] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#264143]/60 font-semibold uppercase tracking-wider block">Official Advisory Correspondence</span>
                    <a
                      href="mailto:operations@kaiprakriti.com"
                      className="font-bold text-sm sm:text-base text-[#264143] hover:text-[#D96846] transition-colors break-all block"
                    >
                      operations@kaiprakriti.com
                    </a>
                    <span className="text-[11px] text-[#264143]/70 block mt-0.5">
                      Direct scoping discussions, proposal requests & institutional engagements.
                    </span>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-[#E7E3DC] shadow-2xs">
                  <div className="w-9 h-9 rounded-xl bg-[#264143]/10 flex items-center justify-center text-[#264143] shrink-0">
                    <MapPin className="w-4 h-4 text-[#3E6B48]" />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#264143]/60 font-semibold uppercase tracking-wider block">Advisory Base</span>
                    <span className="text-[#264143] font-medium leading-relaxed block">
                      NCR & New Delhi, India • Serving manufacturing facilities, industrial clusters, and corporate hubs.
                    </span>
                  </div>
                </div>

              </div>

              <div className="p-6 rounded-3xl bg-white border border-[#E7E3DC] space-y-2.5 shadow-2xs">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#3E6B48]">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Strict Statutory Independence Policy</span>
                </div>
                <p className="text-xs text-[#264143]/70 leading-relaxed">
                  Kai Prakriti operates strictly on the preparer side. In accordance with AA1000 and ISO 14064-3 independence rules, we never charge audit certification fees for our own calculations.
                </p>
              </div>
            </div>

            {/* Right: Lead Capture Form */}
            <div className="lg:col-span-7 min-w-0">
              {isSubmitted ? (
                <div className="p-6 sm:p-12 rounded-2xl sm:rounded-3xl border border-[#3E6B48]/30 bg-white text-center space-y-4 shadow-sm animate-fadeIn">
                  <div className="w-14 h-14 rounded-2xl bg-[#3E6B48]/10 text-[#3E6B48] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8 text-[#3E6B48]" />
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-[#264143]">
                    Thank you, {formData.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#264143]/75 max-w-md mx-auto leading-relaxed">
                    Your scoping request has been received (Ref: #{createdLeadId.slice(0, 8)}). Our senior advisory leadership will review your requirements and reach out within 24 business hours.
                  </p>

                  <div className="pt-4">
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          name: '',
                          company: '',
                          email: '',
                          phone: '',
                          companyType: 'corporate',
                          serviceId: 'ghg-accounting',
                          estimatedBudget: 'Under Scoping',
                          targetDeadline: 'Q4 2026',
                          message: '',
                        });
                      }}
                      className="px-6 py-3 rounded-xl text-xs font-semibold bg-[#264143] text-white hover:bg-black transition-colors"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="p-5 sm:p-10 rounded-2xl sm:rounded-3xl border border-[#E7E3DC] bg-white shadow-xs space-y-5 sm:space-y-6"
                >
                  <div className="space-y-1">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#264143]">
                      {language === 'en' ? 'Request a Scoping Discussion' : 'परामर्श चर्चा का अनुरोध करें'}
                    </h3>
                    <p className="text-xs text-[#264143]/70">
                      {language === 'en' 
                        ? 'Please provide your details below and our advisory team will prepare tailored initial benchmarks.'
                        : 'कृपया नीचे अपना विवरण दर्ज करें और हमारी टीम प्रारंभिक बेंचमार्क तैयार करेगी।'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#264143]">
                        {t.contact.formName} *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={language === 'en' ? "e.g. Priya Sharma" : "उदा. प्रिया शर्मा"}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#E7E3DC] rounded-xl text-[#264143] placeholder-slate-400 focus:outline-none focus:border-[#D96846] focus:bg-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#264143]">
                        {t.contact.formCompany} *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={language === 'en' ? "e.g. Apex Precision Alloys" : "उदा. एपेक्स प्रिसिजन अलॉयज"}
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#E7E3DC] rounded-xl text-[#264143] placeholder-slate-400 focus:outline-none focus:border-[#D96846] focus:bg-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#264143]">
                        {t.contact.formEmail} *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="name@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#E7E3DC] rounded-xl text-[#264143] placeholder-slate-400 focus:outline-none focus:border-[#D96846] focus:bg-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#264143]">
                        {t.contact.formPhone}
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#E7E3DC] rounded-xl text-[#264143] placeholder-slate-400 focus:outline-none focus:border-[#D96846] focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#264143]">
                      {t.contact.formService}
                    </label>
                    <select
                      value={formData.serviceId}
                      onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#E7E3DC] rounded-xl text-[#264143] focus:outline-none focus:border-[#D96846] focus:bg-white"
                    >
                      {services.map(s => (
                        <option key={s.id} value={s.id}>
                          {s.title} ({s.standardCode || s.standard})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#264143]">
                      {t.contact.formMessage}
                    </label>
                    <textarea
                      rows={4}
                      placeholder={language === 'en' ? "Share manufacturing locations, fuel types, or specific compliance deadlines..." : "विनिर्माण स्थान, ईंधन प्रकार, या विशिष्ट समय सीमाएं साझा करें..."}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#E7E3DC] rounded-xl text-[#264143] placeholder-slate-400 focus:outline-none focus:border-[#D96846] focus:bg-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#D96846] hover:bg-[#C45737] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors"
                  >
                    <span>{t.contact.formSubmit}</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
