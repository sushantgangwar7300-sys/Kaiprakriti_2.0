import React, { useState } from 'react';
import { SAMPLE_TRANSPARENT_INVOICE } from '../data/consultancyData';
import { Shield, Eye, ArrowUpRight, CheckCircle, FileSpreadsheet, Lock, Landmark } from 'lucide-react';

interface TwoRevenueLinesCardProps {
  theme?: string;
}

export const TwoRevenueLinesCard: React.FC<TwoRevenueLinesCardProps> = () => {
  const [showSampleInvoice, setShowSampleInvoice] = useState(false);

  return (
    <section className="relative py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10">
          <div className="lg:col-span-6 space-y-3">
            <span className="font-mono text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 inline-flex items-center gap-1.5 shadow-sm">
              <Landmark className="w-3.5 h-3.5 text-emerald-400" />
              <span>STRUCTURAL INTEGRITY FIREWALL</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              Two revenue lines, both stated directly on the invoice.
            </h2>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <p className="text-base sm:text-lg leading-relaxed text-slate-300 font-light">
              Most sustainability consultancies are deliberately vague about where advisory stops and independent certification starts. That ambiguity leads to audit rejections and regulatory penalties.
            </p>
            <p className="font-semibold text-base text-emerald-400">
              Kai Prakriti splits it cleanly: We tell you exactly which one you are buying before any contract is signed.
            </p>
          </div>
        </div>

        {/* The Two Split Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          {/* Direct Work Pillar */}
          <div className="p-7 sm:p-8 rounded-2xl border border-slate-800 bg-[#0B1120] shadow-xl transition-all hover:border-emerald-500/40 space-y-6">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-500 text-slate-950 font-bold">
                LINE 01: DIRECT ADVISORY
              </span>
              <span className="font-mono text-xs text-slate-400">Engineering & Carbon Accounting</span>
            </div>

            <div>
              <h3 className="font-serif text-2xl font-bold text-white mb-2">
                We do it ourselves.
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-light">
                Greenhouse gas inventories (Scope 1, 2, 3), SEBI BRSR Core disclosures, product life cycle assessments (LCA), ZED gap resolution, and internal corporate training. You pay a clear fee for our quantitative engineering and auditable workpapers.
              </p>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-200 font-mono">
              <li className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Fixed or milestone-based professional consultancy fee</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Full traceable Excel models with native formula cells & primary data</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Direct fiduciary accountability to your Board & ESG committee</span>
              </li>
            </ul>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Client Relationship:</span>
              <strong className="text-emerald-400">Client-Appointed Advisor</strong>
            </div>
          </div>

          {/* Facilitated Work Pillar */}
          <div className="p-7 sm:p-8 rounded-2xl border border-slate-800 bg-[#0B1120] shadow-xl transition-all hover:border-amber-500/40 space-y-6">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-500 text-slate-950 font-bold">
                LINE 02: FACILITATED VERIFICATION
              </span>
              <span className="font-mono text-xs text-slate-400">Accredited Introductions</span>
            </div>

            <div>
              <h3 className="font-serif text-2xl font-bold text-white mb-2">
                Independent accredited verifier.
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-light">
                Official statutory assurance (SEBI BRSR Core), EU CBAM verification, and ISO 14064-3 statements demand third-party independence. We verify live accredited scopes (BEE ACVA, VCS VVB, DAkkS, RvA) and manage introductions.
              </p>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-200 font-mono">
              <li className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Zero self-certification: We never audit our own calculations</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Introduction commission fully disclosed on invoice in writing</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Pre-vetted verifiers with active, unexpired accreditation credentials</span>
              </li>
            </ul>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Auditor Status:</span>
              <strong className="text-amber-400">Third-Party Independent Body</strong>
            </div>
          </div>

        </div>

        {/* Interactive Sample Invoice Toggle Button */}
        <div className="p-6 rounded-2xl border border-slate-800 bg-[#0E1626] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-bold text-white">
                Transparency in Practice: The Kai Prakriti Sample Invoice
              </h4>
              <p className="text-xs text-slate-300 font-sans mt-0.5">
                Inspect how we eliminate conflicts of interest by separating both lines before engagement.
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowSampleInvoice(!showSampleInvoice)}
            className="px-5 py-2.5 rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-all flex items-center gap-2 shrink-0 border border-slate-700 bg-slate-900 text-slate-200 hover:text-white hover:border-emerald-500/50"
          >
            <Eye className="w-4 h-4 text-emerald-400" />
            <span>{showSampleInvoice ? 'Hide Sample Invoice' : 'View Sample Invoice'}</span>
          </button>
        </div>

        {/* Live Sample Transparent Invoice Preview */}
        {showSampleInvoice && (
          <div className="mt-6 p-6 sm:p-8 rounded-2xl bg-[#090F1C] text-slate-100 border border-slate-700 shadow-2xl space-y-6 font-mono text-xs animate-fadeIn">
            <div className="flex flex-wrap items-start justify-between border-b border-slate-800 pb-4 gap-4">
              <div>
                <span className="text-[10px] text-emerald-400 uppercase font-bold tracking-widest block mb-1">
                  OFFICIAL BILLING SPECIFICATION
                </span>
                <h4 className="font-serif text-xl font-bold text-white">
                  Kai Prakriti Sustainability Advisory
                </h4>
                <p className="text-slate-400 text-xs">प्रकृति-सतत-विकास • GSTIN: 07AAACK1234P1Z9</p>
              </div>
              <div className="text-right">
                <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold rounded">
                  {SAMPLE_TRANSPARENT_INVOICE.invoiceNumber}
                </span>
                <p className="text-slate-400 text-[11px] mt-1">Date: {SAMPLE_TRANSPARENT_INVOICE.date}</p>
              </div>
            </div>

            {/* Billed to */}
            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
              <span className="text-slate-400 text-[10px] uppercase font-bold">CLIENT ENTITY:</span>
              <p className="font-bold text-slate-200 mt-0.5">{SAMPLE_TRANSPARENT_INVOICE.client}</p>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[11px] uppercase">
                    <th className="py-2.5 px-2">Line Classification</th>
                    <th className="py-2.5 px-2">Service Description</th>
                    <th className="py-2.5 px-2">Governing Rule</th>
                    <th className="py-2.5 px-2 text-right">Fee / Term</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-xs">
                  {SAMPLE_TRANSPARENT_INVOICE.items.map((item, idx) => (
                    <tr key={idx} className={idx === 1 ? 'bg-amber-500/5' : ''}>
                      <td className="py-3 px-2 font-bold">
                        <span className={`px-2 py-0.5 rounded text-[10px] ${
                          idx === 0 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}>
                          {item.type}
                        </span>
                      </td>
                      <td className="py-3 px-2 font-sans font-medium text-slate-200">{item.service}</td>
                      <td className="py-3 px-2 text-slate-400">{item.governance}</td>
                      <td className="py-3 px-2 text-right font-bold text-slate-100">{item.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Ethical Declaration */}
            <div className="p-4 bg-emerald-950/40 rounded-xl border border-emerald-500/30 text-emerald-200 flex items-start space-x-3">
              <Lock className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-[11px] uppercase tracking-wider text-emerald-300">
                  MANDATORY INDEPENDENCE DECLARATION:
                </strong>
                <p className="text-[11px] font-sans leading-relaxed text-emerald-100/90 mt-0.5">
                  {SAMPLE_TRANSPARENT_INVOICE.ethicalDeclaration}
                </p>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
