import React from 'react';
import { PageId } from '../types';
import { ShieldCheck, Award, ArrowRight, CheckCircle2, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const { language, t } = useLanguage();

  const values = language === 'en' ? [
    {
      title: 'Integrity by Design',
      desc: 'We never verify our own calculations. Direct preparation and independent audit remain strictly separated on two transparent invoices.',
    },
    {
      title: 'Empirical Precision',
      desc: 'No vague industry averages. Every carbon baseline is built on primary utility records, fuel test receipts, and live formula workbooks.',
    },
    {
      title: 'Practitioner-Led Immersion',
      desc: 'We embed directly with your plant managers, engineers, and finance teams to solve complex compliance requirements with zero junior handoffs.',
    },
  ] : [
    {
      title: 'नीति-आधारित सत्यनिष्ठा',
      desc: 'हम कभी भी अपनी गणनाओं का स्वयं सत्यापन नहीं करते। प्रत्यक्ष तैयारी और स्वतंत्र ऑडिट दो पारदर्शी चालानों पर पूरी तरह अलग रहते हैं।',
    },
    {
      title: 'अनुभवजन्य सटीकता',
      desc: 'कोई अनुमानित उद्योग औसत नहीं। प्रत्येक कार्बन बेसलाइन प्राथमिक बिजली बिलों, ईंधन परीक्षण रसीदों और लाइव फॉर्मूला वर्कबुक्स पर आधारित है।',
    },
    {
      title: 'विशेषज्ञों द्वारा प्रत्यक्ष मार्गदर्शन',
      desc: 'हम जटिल अनुपालन आवश्यकताओं को हल करने के लिए सीधे आपके प्लांट प्रबंधकों, इंजीनियरों और वित्त टीमों के साथ काम करते हैं।',
    },
  ];

  const assurancePillars = language === 'en' ? [
    {
      title: 'Two-Line Independence Firewall',
      desc: 'Preparation and statutory verification are kept under separate operational and financial boundaries, complying with AA1000 and ISO 14064-3 ethical codes.',
    },
    {
      title: 'Primary Data Accounting',
      desc: 'Every Scope 1, 2, and 3 baseline is derived directly from continuous utility logs, metered flow data, and stoichiometric chemical balances.',
    },
    {
      title: 'Accredited Verifier Facilitation',
      desc: 'When mandatory compliance requires third-party certification, we facilitate matching with accredited statutory verification bodies without conflicts of interest.',
    },
  ] : [
    {
      title: 'दोहरी स्वतंत्रता सुरक्षा दीवार',
      desc: 'तैयारी और वैधानिक सत्यापन को AA1000 और ISO 14064-3 नैतिक संहिताओं का पालन करते हुए अलग-अलग परिचालन और वित्तीय सीमाओं में रखा जाता है।',
    },
    {
      title: 'प्राथमिक डेटा लेखांकन',
      desc: 'प्रत्येक स्कोप 1, 2, और 3 बेसलाइन सीधे निरंतर उपयोगिता लॉग, मीटर डेटा और रासायनिक संतुलन से तैयार की जाती है।',
    },
    {
      title: 'मान्यता प्राप्त सत्यापनकर्ता सुविधा',
      desc: 'जब अनिवार्य अनुपालन के लिए तीसरे पक्ष के प्रमाणन की आवश्यकता होती है, तो हम बिना किसी विरोधाभास के मान्यता प्राप्त निकायों के साथ समन्वय करते हैं।',
    },
  ];

  return (
    <div className="bg-[#FAF8F5] text-[#264143] min-h-screen">
      
      {/* 1. Header with Corporate Sustainability Leadership Background Image */}
      <section className="relative pt-14 pb-14 sm:pt-20 sm:pb-20 border-b border-[#E7E3DC] overflow-hidden">
        
        {/* Related Background Image: Corporate Sustainability Boardroom & Biophilic Architecture */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80"
            alt="Corporate Sustainability Leadership Architecture"
            className="w-full h-full object-cover scale-105 opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5]/95 via-[#FAF8F5]/85 to-[#FAF8F5]" />
          <div className="absolute inset-0 bg-[#264143]/5 mix-blend-multiply" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#3E6B48] uppercase tracking-wider bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#E7E3DC] shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#D96846]" />
            <span>{t.about.badge}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#264143]">
            {t.about.title}
          </h1>

          <p className="text-xs sm:text-base text-[#264143]/75 font-normal max-w-2xl mx-auto leading-relaxed">
            {t.about.subtitle}
          </p>
        </div>
      </section>

      {/* 2. Philosophy & Core Foundations */}
      <section className="py-12 sm:py-18 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
            <div className="lg:col-span-6 space-y-4 sm:space-y-6">
              <span className="text-xs font-semibold text-[#3E6B48] uppercase tracking-wider">
                Why We Founded Kai Prakriti
              </span>
              <h2 className="font-serif text-xl sm:text-3xl font-bold text-[#264143] tracking-tight">
                Corporate sustainability needed scientific rigor, not generic marketing decks.
              </h2>
              <p className="text-xs sm:text-sm text-[#264143]/75 leading-relaxed">
                Too many enterprises are sold software dashboards that generate high-level proxies, leaving leadership exposed when regulators and buyers request verifiable proof. 
              </p>
              <p className="text-xs sm:text-sm text-[#264143]/75 leading-relaxed">
                Kai Prakriti takes the opposite approach: we do the quantitative heavy lifting on shop floors, boilers, kilns, and supply chain manifests to generate audit-ready models traceable to CEA and IPCC databases.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('contact')}
                  className="w-full sm:w-auto px-6 py-3 rounded-2xl text-xs font-semibold bg-[#D96846] hover:bg-[#C45737] text-white inline-flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <span>Connect with our advisory practice</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-3 sm:space-y-4">
              {values.map((val, idx) => (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-[#E7E3DC] bg-white shadow-2xs space-y-1.5 sm:space-y-2 hover:border-[#D96846]/50 transition-colors"
                >
                  <h3 className="font-serif text-sm sm:text-base font-bold text-[#264143]">
                    {val.title}
                  </h3>
                  <p className="text-xs text-[#264143]/75 leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 3. Ethical Independence & Governance Safeguards */}
      <section className="py-12 sm:py-20 bg-white border-t border-[#E7E3DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2 sm:space-y-3">
            <span className="text-xs font-semibold text-[#3E6B48] uppercase tracking-wider">
              Governance & Integrity Safeguards
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#264143] tracking-tight">
              An institutional firewall guarding your reputation.
            </h2>
            <p className="text-xs sm:text-sm text-[#264143]/75 leading-relaxed">
              Our firm is strictly built around statutory independence standards so your disclosures stand up in boardrooms, credit committees, and regulatory filings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {assurancePillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl sm:rounded-3xl border border-[#E7E3DC] bg-[#FAF8F5] space-y-3 flex flex-col justify-between hover:border-[#3E6B48]/40 transition-colors"
              >
                <div className="space-y-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#3E6B48]/10 text-[#3E6B48] flex items-center justify-center font-bold text-xs">
                    0{idx + 1}
                  </div>
                  <h3 className="font-serif text-base font-bold text-[#264143]">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-[#264143]/75 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Contact / CTA Banner in Deep Slate-Teal */}
      <section className="py-12 sm:py-20 bg-[#264143] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4 sm:space-y-6">
          <h2 className="font-serif text-2xl sm:text-4xl font-bold">
            Ready to partner with an honest, science-led team?
          </h2>
          <p className="text-xs sm:text-sm text-[#FAF8F5]/80 max-w-xl mx-auto font-light leading-relaxed">
            Let&apos;s discuss how Kai Prakriti can support your upcoming SEBI, CBAM, or GHG Protocol reporting milestones.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl text-xs font-semibold bg-[#D96846] hover:bg-[#C45737] text-white inline-flex items-center justify-center gap-2 shadow-md transition-colors"
            >
              <span>Schedule Scoping Conversation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="pt-4 flex items-center justify-center gap-2 text-xs text-[#FAF8F5]/80">
            <Mail className="w-4 h-4 text-[#E99F4C] shrink-0" />
            <span>
              Official Inquiries:{' '}
              <a href="mailto:operations@kaiprakriti.com" className="text-white font-medium hover:underline">
                operations@kaiprakriti.com
              </a>
            </span>
          </div>
        </div>
      </section>

    </div>
  );
};
