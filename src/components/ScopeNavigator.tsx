import React, { useState } from 'react';
import { Compass, CheckCircle2, ArrowRight, Building2, Globe2, Factory, Zap, GraduationCap, Landmark } from 'lucide-react';

interface ScopeNavigatorProps {
  theme?: string;
  onApplyServices: (serviceIds: string[]) => void;
}

interface ScenarioOption {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  recommendedServiceIds: string[];
  directFocus: string;
  facilitatedFocus: string;
  statutoryDeadline: string;
  governingStandard: string;
}

const SCENARIOS: ScenarioOption[] = [
  {
    id: 'sebi-listed',
    title: 'Top 1,000 SEBI Listed Entity',
    subtitle: 'Mandatory BRSR Core reporting and reasonable assurance requirements.',
    icon: <Building2 className="w-5 h-5 text-emerald-400" />,
    recommendedServiceIds: ['ghg-accounting', 'brsr-core', 'honest-verifier-match'],
    directFocus: 'Scope 1, 2, 3 calculations + 9 NGRBC principle auditable data trail.',
    facilitatedFocus: 'Matching with independent assurance provider meeting SEBI board qualification criteria.',
    statutoryDeadline: 'Mandatory annual filing with stock exchanges (BSE/NSE)',
    governingStandard: 'SEBI LODR Regulation 34(2)(f)'
  },
  {
    id: 'eu-cbam-exporter',
    title: 'EU Exporter (Steel, Aluminium, Cement, Hydrogen)',
    subtitle: 'Subject to EU Carbon Border Adjustment Mechanism levies and verification.',
    icon: <Globe2 className="w-5 h-5 text-cyan-400" />,
    recommendedServiceIds: ['lca-product', 'cbam-readiness', 'capable-body-vetting'],
    directFocus: 'Installation-level direct & indirect embedded emissions calculation per CN code.',
    facilitatedFocus: 'Introduction to European accredited verification body (DAkkS, RvA, etc.).',
    statutoryDeadline: 'Quarterly reporting active; definitive certificate financial adjustment from 2026',
    governingStandard: 'Regulation (EU) 2023/956 & Implementing Reg. 2018/2067'
  },
  {
    id: 'msme-tier1',
    title: 'MSME Supplier in OEM Supply Chain',
    subtitle: 'Preparing for global customer sustainability questionnaires & ZED incentives.',
    icon: <Factory className="w-5 h-5 text-emerald-400" />,
    recommendedServiceIds: ['brsr-lite', 'zed-support', 'esg-team-training'],
    directFocus: 'Voluntary MCA BRSR Lite baseline + 20-point ZED gap closure.',
    facilitatedFocus: 'Coordination with Quality Council of India (QCI) empaneled assessment agencies.',
    statutoryDeadline: 'Customer procurement tender cycles & MoMSME subsidy windows',
    governingStandard: 'MCA BRSR Lite & QCI MSME Sustainable Scheme'
  },
  {
    id: 'carbon-offsets',
    title: 'Renewable / Biochar / Industrial Carbon Project',
    subtitle: 'Developing verified emission reduction credits for CCTS, Verra, or Gold Standard.',
    icon: <Zap className="w-5 h-5 text-amber-400" />,
    recommendedServiceIds: ['carbon-pdd', 'honest-verifier-match', 'iso-14064-training'],
    directFocus: 'Project Design Document (PDD) authoring, additionality proof, MRV methodology.',
    facilitatedFocus: 'Accredited Carbon Verification Agency (BEE ACVA) or VCS VVB validation.',
    statutoryDeadline: 'Project crediting period registration & annual issuance cycle',
    governingStandard: 'India CCTS Registry & Verra VCS Standard'
  },
  {
    id: 'corporate-capacity',
    title: 'Corporate EHS & Finance Upskilling',
    subtitle: 'Building in-house greenhouse gas accounting and sustainability management.',
    icon: <GraduationCap className="w-5 h-5 text-sky-400" />,
    recommendedServiceIds: ['ghg-accounting', 'iso-14064-training', 'esg-team-training'],
    directFocus: 'Internal auditor masterclasses + standardized information management spreadsheets.',
    facilitatedFocus: 'Optional Part 3 accredited mock validation review.',
    statutoryDeadline: 'Immediate operational onboarding',
    governingStandard: 'ISO 14064 Parts 1 & 2 / GHG Protocol'
  }
];

export const ScopeNavigator: React.FC<ScopeNavigatorProps> = ({
  onApplyServices,
}) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('sebi-listed');
  const activeScenario = SCENARIOS.find((s) => s.id === selectedScenarioId) || SCENARIOS[0];

  return (
    <section className="py-14 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto p-6 sm:p-10 rounded-3xl border border-slate-800 bg-[#0B1120] shadow-2xl space-y-8">
        
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-1.5 font-mono text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 mb-2">
            <Compass className="w-3.5 h-3.5 text-emerald-400" />
            <span>INTERACTIVE COMPLIANCE NAVIGATOR</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Map Your Regulatory Trigger to Clean Scope
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-2xl font-light">
            Select your enterprise profile to see which combination of Direct Work and Facilitated Verification you need to satisfy regulators.
          </p>
        </div>

        {/* Profile Selector Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {SCENARIOS.map((sc) => {
            const isSelected = sc.id === selectedScenarioId;
            return (
              <button
                key={sc.id}
                onClick={() => setSelectedScenarioId(sc.id)}
                className={`p-4 rounded-xl text-left border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-emerald-400 bg-slate-900 text-white shadow-lg shadow-emerald-500/10'
                    : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 rounded-lg bg-slate-800/80">
                      {sc.icon}
                    </div>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    )}
                  </div>
                  <h4 className="font-serif text-sm font-bold leading-snug mb-1 text-white">
                    {sc.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2 font-light">
                    {sc.subtitle}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-800 font-mono text-[10px] text-slate-400">
                  {sc.governingStandard}
                </div>
              </button>
            );
          })}
        </div>

        {/* Output Roadmap Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#070D1A] text-slate-100 border border-slate-700 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-4">
            <div>
              <span className="font-mono text-[10px] text-emerald-400 uppercase font-bold tracking-wider">
                RECOMMENDED COMPLIANCE ARCHITECTURE
              </span>
              <h3 className="font-serif text-2xl font-bold text-white mt-0.5">
                {activeScenario.title} Roadmap
              </h3>
            </div>
            <div className="text-left sm:text-right">
              <span className="font-mono text-[11px] bg-slate-800 text-slate-300 border border-slate-700 px-3 py-1 rounded-full font-bold">
                Deadline: {activeScenario.statutoryDeadline}
              </span>
            </div>
          </div>

          {/* Duality breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Direct Work */}
            <div className="p-5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-2">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-emerald-300">
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  DIRECT CONSULTANCY
                </span>
                <span className="text-[11px] text-slate-400">(Kai Prakriti Advisory)</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-sans font-light">
                {activeScenario.directFocus}
              </p>
            </div>

            {/* Facilitated Verification */}
            <div className="p-5 rounded-xl bg-amber-950/30 border border-amber-500/30 space-y-2">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-amber-300">
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  FACILITATED VERIFICATION
                </span>
                <span className="text-[11px] text-slate-400">(Independent Accredited Body)</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-sans font-light">
                {activeScenario.facilitatedFocus}
              </p>
            </div>

          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-between pt-2 gap-4">
            <div className="flex items-center space-x-2 text-xs font-mono text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Includes zero-conflict declaration & live accreditation scope audit</span>
            </div>
            <button
              onClick={() => {
                onApplyServices(activeScenario.recommendedServiceIds);
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              <span>Apply this Scoping to Contact Form</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
