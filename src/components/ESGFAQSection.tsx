import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, ShieldCheck, FileSpreadsheet, Scale, Clock, Sparkles } from 'lucide-react';

interface FAQItem {
  id: string;
  category: 'ghg' | 'brsr' | 'cbam' | 'assurance';
  question: string;
  answer: string;
  keyHighlight?: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'ghg-accuracy',
    category: 'ghg',
    question: 'How does Kai Prakriti calculate corporate GHG inventories instead of using software estimates?',
    answer: 'Unlike generic SaaS platforms that apply national expenditure spend proxies, our engineers collect granular primary activity data directly from your utility billing meters (HT/LT electricity), fuel delivery logbooks (diesel, coal, natural gas), and refrigerant maintenance registers. We apply sub-regional CEA (Central Electricity Authority) grid baseline factors and physical stoichiometric combustion formulas, creating a completely auditable Excel calculation workbook with cell-level traceable sources.',
    keyHighlight: 'Direct stoichiometric calculations and CEA sub-region emission factors with 100% auditable formulas.',
  },
  {
    id: 'brsr-core-readiness',
    category: 'brsr',
    question: 'What is the difference between standard BRSR and the mandatory BRSR Core assurance?',
    answer: 'While comprehensive BRSR under SEBI LODR 34(2)(f) covers qualitative management disclosures across all 9 NGRBC principles, BRSR Core focuses on nine specific measurable Key Performance Indicators (including GHG footprint, water consumption, circularity, employee diversity, and median wages). SEBI mandates that Top 250 and Top 1000 listed entities obtain "reasonable assurance" on BRSR Core KPIs from an independent assurance provider. Kai Prakriti prepares the comprehensive quantitative audit trail to ensure your assurance provider signs off without audit qualifications.',
    keyHighlight: 'Prepares auditable evidentiary dossiers matching SEBI assurance provider inspection specifications.',
  },
  {
    id: 'cbam-installation-rules',
    category: 'cbam',
    question: 'How do you support exporters affected by the EU Carbon Border Adjustment Mechanism (CBAM)?',
    answer: 'Under Regulation (EU) 2023/956, Indian exporters of steel, aluminium, cement, and fertilizers must quantify specific embedded direct and indirect emissions at the manufacturing installation level per CN code. Default regional values will soon be penalized. We delineate your facility boundaries, calculate specific emissions per metric tonne of finished goods, generate the EU Registry-compliant submission dossier, and connect you with recognized EU accredited verification bodies.',
    keyHighlight: 'Installation-level specific embedded emissions per CN code compliant with Regulation (EU) 2023/956.',
  },
  {
    id: 'independence-guarantee',
    category: 'assurance',
    question: 'Why does Kai Prakriti strictly refuse to verify its own GHG calculations?',
    answer: 'International auditing standards (ISO 14064-3, ISO 14065, and IAF MD 6) and regulatory authorities (SEBI, European Commission) prohibit consulting firms from auditing or providing assurance on their own calculations, as this constitutes an illegal self-review conflict of interest. Kai Prakriti operates strictly on the client side as your quantitative engineering advisor. When formal certification or regulatory filing is required, we facilitate direct introductions to accredited third-party verification bodies (BEE ACVA, Verra VVB, or accredited EU bodies) with transparent commission disclosures.',
    keyHighlight: 'Strict zero self-review firewall. We engineer the numbers; independent accredited bodies audit them.',
  },
  {
    id: 'typical-timelines',
    category: 'ghg',
    question: 'What is the typical timeframe for an enterprise ESG engagement from kickoff to audit sign-off?',
    answer: 'A standard Scope 1, 2, and 3 GHG inventory or BRSR Core engagement spans 6 to 10 weeks depending on entity complexity and facility count. Weeks 1–2 focus on boundary demarcation and the Data Request Matrix; Weeks 3–5 cover primary meter and fuel invoice ingestion; Weeks 6–7 involve stoichiometric model calculation and gap remediation; and Weeks 8–10 include pre-assurance review and facilitating the third-party assurance audit.',
    keyHighlight: 'Predictable 6–10 week delivery roadmap with designated milestones and primary data owner sign-offs.',
  },
  {
    id: 'msme-zed-scheme',
    category: 'assurance',
    question: 'Can MSMEs benefit from government subsidies for ESG and ZED certification?',
    answer: 'Yes. The Ministry of MSME Sustainable ZED certification scheme provides up to 80% government subsidies on assessment fees, alongside priority public procurement benefits and concessional bank lending interest rates. Kai Prakriti assists MSMEs in closing factory environmental gaps, drafting safety SOPs, and preparing the self-assessment documentation for QCI-empanelled desktop audits without overcharging or making exaggerated claims.',
    keyHighlight: 'Unlocks up to 80% Ministry of MSME subsidies and lower commercial loan interest rates.',
  },
];

interface ESGFAQSectionProps {
  onScheduleClick?: () => void;
}

export const ESGFAQSection: React.FC<ESGFAQSectionProps> = ({ onScheduleClick }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'ghg' | 'brsr' | 'cbam' | 'assurance'>('all');
  const [openFaqId, setOpenFaqId] = useState<string | null>('ghg-accuracy');

  const filteredFaqs = activeTab === 'all' ? FAQ_ITEMS : FAQ_ITEMS.filter((f) => f.category === activeTab);

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-[#E7E3DC]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3E6B48]/10 border border-[#3E6B48]/20 text-[#3E6B48] text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5 text-[#3E6B48]" />
            <span className="uppercase tracking-wider text-[10px]">Authoritative Advisory Answers</span>
          </div>
          
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#1E382E] tracking-tight">
            Frequently Asked Technical & Regulatory Questions
          </h2>
          
          <p className="text-xs sm:text-sm text-[#264143]/75 leading-relaxed">
            Essential clarity on Scope 1–3 boundaries, SEBI BRSR Core mandatory assurance, EU CBAM exporter dossiers, and our transparent independence firewall.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {[
            { id: 'all', label: 'All Inquiries' },
            { id: 'ghg', label: 'GHG Scope 1-3' },
            { id: 'brsr', label: 'SEBI BRSR Core' },
            { id: 'cbam', label: 'EU CBAM Exporters' },
            { id: 'assurance', label: 'Assurance & Governance' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#1E382E] text-white shadow-xs'
                  : 'bg-[#FAF8F5] text-[#264143]/75 hover:bg-[#E7E3DC]/60 border border-[#E7E3DC]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;

            return (
              <div
                key={faq.id}
                className="rounded-2xl border border-[#E7E3DC] bg-[#FAF8F5]/80 overflow-hidden transition-colors hover:border-[#3E6B48]/40"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 text-left cursor-pointer focus:outline-none"
                >
                  <span className="font-serif text-sm sm:text-base font-bold text-[#1E382E] leading-snug">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-[#E7E3DC] bg-white transition-transform duration-200 ${isOpen ? 'rotate-180 bg-[#3E6B48]/10 border-[#3E6B48]/30' : ''}`}>
                    <ChevronDown className="w-4 h-4 text-[#1E382E]" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="faq-content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-[#264143]/80 leading-relaxed border-t border-[#E7E3DC]/60 space-y-3">
                        <p>{faq.answer}</p>
                        
                        {faq.keyHighlight && (
                          <div className="p-3 rounded-xl bg-white border border-[#3E6B48]/20 flex items-start gap-2 text-xs text-[#1E382E]">
                            <ShieldCheck className="w-4 h-4 text-[#3E6B48] shrink-0 mt-0.5" />
                            <span className="font-medium">{faq.keyHighlight}</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Footer Callout */}
        <div className="p-6 rounded-3xl bg-[#FAF8F5] border border-[#E7E3DC] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="font-serif font-bold text-sm text-[#1E382E]">
              Have a specific regulatory audit question?
            </h4>
            <p className="text-xs text-[#264143]/70">
              Speak directly with our senior sustainability engineers to evaluate your entity's reporting obligations.
            </p>
          </div>
          {onScheduleClick && (
            <button
              type="button"
              onClick={onScheduleClick}
              className="px-5 py-2.5 rounded-xl bg-[#D96846] hover:bg-[#C45737] text-white text-xs font-semibold shrink-0 cursor-pointer transition-colors shadow-2xs"
            >
              Ask an ESG Engineer
            </button>
          )}
        </div>

      </div>
    </section>
  );
};
