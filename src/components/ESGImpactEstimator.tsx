import React, { useState, useId } from 'react';
import { PageId } from '../types';
import {
  Calculator,
  TrendingDown,
  ShieldCheck,
  Zap,
  Flame,
  Truck,
  Leaf,
  ArrowRight,
  Sparkles,
  Info,
  CheckCircle2,
  DollarSign,
  BarChart3,
  Award,
  ChevronRight
} from 'lucide-react';

interface ESGImpactEstimatorProps {
  onNavigateToContact?: (calculatedData?: string) => void;
}

interface SectorConfig {
  name: string;
  scope1Factor: number; // tCO2e per fuel unit
  scope2Factor: number; // kg CO2e per kWh (CEA grid default 0.716)
  scope3Factor: number; // tCO2e per Crore spend
  typicalReductionPotential: number; // percentage
  cbamApplicable: boolean;
}

const SECTOR_PROFILES: Record<string, SectorConfig> = {
  manufacturing: {
    name: 'Heavy Manufacturing & Capital Goods',
    scope1Factor: 2.68, // diesel/fuel tCO2e per kL
    scope2Factor: 0.716, // CEA Indian Grid Factor
    scope3Factor: 28.4, // tCO2e / Cr spend
    typicalReductionPotential: 34,
    cbamApplicable: true,
  },
  metals_steel: {
    name: 'Primary Steel & Non-Ferrous Metals (CBAM Covered)',
    scope1Factor: 3.12,
    scope2Factor: 0.716,
    scope3Factor: 42.0,
    typicalReductionPotential: 28,
    cbamApplicable: true,
  },
  auto_components: {
    name: 'Automotive Components (Tier-1 Supply Chain)',
    scope1Factor: 2.45,
    scope2Factor: 0.716,
    scope3Factor: 22.5,
    typicalReductionPotential: 38,
    cbamApplicable: false,
  },
  chemicals_pharma: {
    name: 'Chemicals, Polymers & Pharmaceuticals',
    scope1Factor: 2.85,
    scope2Factor: 0.716,
    scope3Factor: 31.2,
    typicalReductionPotential: 30,
    cbamApplicable: true,
  },
  textiles: {
    name: 'Textiles, Spinning & Apparel Export',
    scope1Factor: 2.3,
    scope2Factor: 0.716,
    scope3Factor: 19.8,
    typicalReductionPotential: 36,
    cbamApplicable: false,
  },
  it_services: {
    name: 'Commercial Facilities, Data Centers & Corporate HQ',
    scope1Factor: 1.8,
    scope2Factor: 0.716,
    scope3Factor: 12.0,
    typicalReductionPotential: 44,
    cbamApplicable: false,
  },
};

export const ESGImpactEstimator: React.FC<ESGImpactEstimatorProps> = ({
  onNavigateToContact,
}) => {
  const electricityInputId = useId();
  const fuelInputId = useId();
  const spendInputId = useId();

  // User input states
  const [selectedSector, setSelectedSector] = useState<string>('manufacturing');
  const [annualElectricityMWh, setAnnualElectricityMWh] = useState<number>(4500); // MWh / yr
  const [annualDieselLitres, setAnnualDieselLitres] = useState<number>(180000); // Litres / yr
  const [annualSupplySpendCr, setAnnualSupplySpendCr] = useState<number>(45); // ₹ Crores / yr
  
  // Decarbonization levers toggled by user
  const [leverSolarPPA, setLeverSolarPPA] = useState<boolean>(true); // ~40% Scope 2 reduction
  const [leverWasteHeat, setLeverWasteHeat] = useState<boolean>(true); // ~25% Scope 1 reduction
  const [leverSupplierEngage, setLeverSupplierEngage] = useState<boolean>(true); // ~18% Scope 3 reduction
  const [leverEnergyEfficiency, setLeverEnergyEfficiency] = useState<boolean>(false); // ~12% overall

  const sector = SECTOR_PROFILES[selectedSector];

  // Mathematical Calculations grounded in GHG Protocol & CEA Indian Grid Baseline
  // Scope 1: Diesel fuel combustion (1 liter diesel = ~2.68 kg CO2e = 0.00268 tCO2e)
  const baselineScope1 = Math.round((annualDieselLitres * sector.scope1Factor) / 1000);

  // Scope 2: Electricity (1 MWh = 1,000 kWh * 0.716 kg CO2e / 1000 = 0.716 tCO2e per MWh)
  const baselineScope2 = Math.round(annualElectricityMWh * sector.scope2Factor);

  // Scope 3: Upstream supply chain spend (Category 1 purchased goods proxy)
  const baselineScope3 = Math.round(annualSupplySpendCr * sector.scope3Factor);

  const baselineTotal = baselineScope1 + baselineScope2 + baselineScope3;

  // Reductions computed from active levers
  let scope1ReductionPct = 0;
  if (leverWasteHeat) scope1ReductionPct += 0.22;
  if (leverEnergyEfficiency) scope1ReductionPct += 0.10;

  let scope2ReductionPct = 0;
  if (leverSolarPPA) scope2ReductionPct += 0.45;
  if (leverEnergyEfficiency) scope2ReductionPct += 0.12;

  let scope3ReductionPct = 0;
  if (leverSupplierEngage) scope3ReductionPct += 0.20;
  if (leverEnergyEfficiency) scope3ReductionPct += 0.05;

  const reducedScope1 = Math.round(baselineScope1 * (1 - Math.min(scope1ReductionPct, 0.60)));
  const reducedScope2 = Math.round(baselineScope2 * (1 - Math.min(scope2ReductionPct, 0.85)));
  const reducedScope3 = Math.round(baselineScope3 * (1 - Math.min(scope3ReductionPct, 0.50)));

  const projectedTotal = reducedScope1 + reducedScope2 + reducedScope3;
  const avoidedTons = baselineTotal - projectedTotal;
  const reductionPercentage = baselineTotal > 0 ? Math.round((avoidedTons / baselineTotal) * 100) : 0;

  // Cost avoidance:
  // 1. BEE CCTS Carbon Credit Value estimate (~₹1,800/tCO2e)
  // 2. EU CBAM certificate exposure (~€85/tCO2e ~ ₹7,800/tCO2e for applicable exporters)
  const domesticSavingsLakhs = Math.round((avoidedTons * 1800) / 100000);
  const cbamSavingsLakhs = sector.cbamApplicable
    ? Math.round((avoidedTons * 7600) / 100000)
    : Math.round((avoidedTons * 2400) / 100000);

  // SEBI BRSR Core Readiness Score (computed based on metric availability)
  const auditReadinessScore = Math.min(
    95,
    65 + (leverSolarPPA ? 10 : 0) + (leverWasteHeat ? 10 : 0) + (leverSupplierEngage ? 10 : 0)
  );

  const handleTransferToContact = () => {
    const summaryString = `ESG Estimator Baseline: ${baselineTotal} tCO2e (S1: ${baselineScope1}, S2: ${baselineScope2}, S3: ${baselineScope3}). Target Decarbonization: -${reductionPercentage}% (-${avoidedTons} tCO2e). Est. Avoidance: ₹${domesticSavingsLakhs}L - ₹${cbamSavingsLakhs}L. Sector: ${sector.name}`;
    if (onNavigateToContact) {
      onNavigateToContact(summaryString);
    }
  };

  return (
    <section id="esg-estimator" className="relative py-16 px-4 sm:px-6 max-w-7xl mx-auto">
      
      {/* Container with sovereign dark canvas and high-contrast styling */}
      <div className="rounded-3xl border border-slate-800 bg-[#0A0F1D] p-6 sm:p-10 lg:p-12 shadow-2xl space-y-10 relative overflow-hidden">
        
        {/* Subtle sovereign geometric grid background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `radial-gradient(#10E7B2 0.75px, transparent 0.75px), radial-gradient(#06B6D4 0.75px, #0A0F1D 0.75px)`,
            backgroundSize: '32px 32px',
            backgroundPosition: '0 0, 16px 16px',
          }}
        />

        {/* 1. Header & Statutory Taxonomy Banner */}
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 font-mono text-xs font-semibold tracking-wider uppercase shadow-[0_0_15px_rgba(16,231,178,0.15)]">
            <Calculator className="w-3.5 h-3.5 text-emerald-400" />
            <span>Statutory Estimation Engine • GHG Protocol & CEA Ver 20.0</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-100">
            Enterprise ESG Impact & Carbon Reduction Estimator
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
            Input basic operational parameters to model your corporate baseline across <strong>Scope 1, 2, and 3</strong>. Calculate empirical emission reductions, financial carbon compliance cost avoidance (BEE CCTS & EU CBAM), and audit assurance readiness.
          </p>
        </div>

        {/* 2. Interactive Calculator Grid: Inputs on Left, Real-Time Computations on Right */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Business Operational Inputs */}
          <div className="lg:col-span-6 space-y-6 rounded-2xl border border-slate-800/90 bg-[#0D1527] p-6 sm:p-7 shadow-lg">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-serif text-lg font-bold text-slate-100 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-emerald-400" />
                <span>Operational Parameters</span>
              </h3>
              <span className="font-mono text-[11px] text-slate-400 uppercase">Step 1 of 2</span>
            </div>

            {/* Sector Selector */}
            <div className="space-y-1.5">
              <label htmlFor="sector-selector" className="block font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                Industry & Regulatory Regime
              </label>
              <select
                id="sector-selector"
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-slate-100 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
              >
                {Object.entries(SECTOR_PROFILES).map(([key, config]) => (
                  <option key={key} value={key} className="bg-slate-900 text-slate-100">
                    {config.name} {config.cbamApplicable ? '• [EU CBAM Target]' : ''}
                  </option>
                ))}
              </select>
              {sector.cbamApplicable && (
                <span className="text-[11px] font-mono text-amber-400 block mt-1">
                  ⚡ Covered under EU CBAM Regulation (EU) 2023/956 definitive filing rules.
                </span>
              )}
            </div>

            {/* Electricity Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between font-mono text-xs">
                <label htmlFor={electricityInputId} className="flex items-center gap-1.5 text-slate-300 font-bold uppercase">
                  <Zap className="w-3.5 h-3.5 text-sky-400" />
                  <span>Annual Grid Electricity</span>
                </label>
                <span className="font-bold text-sky-400 text-sm">
                  {annualElectricityMWh.toLocaleString()} MWh / yr
                </span>
              </div>
              <input
                id={electricityInputId}
                type="range"
                min="500"
                max="25000"
                step="250"
                value={annualElectricityMWh}
                onChange={(e) => setAnnualElectricityMWh(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between font-mono text-[10px] text-slate-500">
                <span>500 MWh (Small Plant)</span>
                <span>10,000 MWh</span>
                <span>25,000 MWh (Industrial Cluster)</span>
              </div>
            </div>

            {/* Direct Fuel Combustion Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between font-mono text-xs">
                <label htmlFor={fuelInputId} className="flex items-center gap-1.5 text-slate-300 font-bold uppercase">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>Direct Fuel / Diesel Usage</span>
                </label>
                <span className="font-bold text-amber-400 text-sm">
                  {annualDieselLitres.toLocaleString()} Litres / yr
                </span>
              </div>
              <input
                id={fuelInputId}
                type="range"
                min="10000"
                max="1000000"
                step="10000"
                value={annualDieselLitres}
                onChange={(e) => setAnnualDieselLitres(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between font-mono text-[10px] text-slate-500">
                <span>10,000 L</span>
                <span>500,000 L</span>
                <span>1,000,000 L (High Thermal)</span>
              </div>
            </div>

            {/* Supply Chain Spend */}
            <div className="space-y-2">
              <div className="flex items-center justify-between font-mono text-xs">
                <label htmlFor={spendInputId} className="flex items-center gap-1.5 text-slate-300 font-bold uppercase">
                  <Truck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Annual Supply Chain Spend</span>
                </label>
                <span className="font-bold text-emerald-400 text-sm">
                  ₹{annualSupplySpendCr} Crores / yr
                </span>
              </div>
              <input
                id={spendInputId}
                type="range"
                min="5"
                max="250"
                step="5"
                value={annualSupplySpendCr}
                onChange={(e) => setAnnualSupplySpendCr(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between font-mono text-[10px] text-slate-500">
                <span>₹5 Cr (MSME Tier-1)</span>
                <span>₹100 Cr</span>
                <span>₹250 Cr (Enterprise)</span>
              </div>
            </div>

            {/* Decarbonization Intervention Levers */}
            <div className="pt-3 border-t border-slate-800 space-y-3">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300 block">
                Simulate Decarbonization Interventions
              </span>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-mono text-xs">
                <label className={`p-2.5 rounded-xl border cursor-pointer flex items-center gap-2.5 transition-all ${leverSolarPPA ? 'border-emerald-500/60 bg-emerald-500/10 text-emerald-300' : 'border-slate-800 bg-slate-900/50 text-slate-400'}`}>
                  <input
                    type="checkbox"
                    checked={leverSolarPPA}
                    onChange={(e) => setLeverSolarPPA(e.target.checked)}
                    className="accent-emerald-400 rounded"
                  />
                  <span>Solar Open Access / PPA (-45% S2)</span>
                </label>

                <label className={`p-2.5 rounded-xl border cursor-pointer flex items-center gap-2.5 transition-all ${leverWasteHeat ? 'border-amber-500/60 bg-amber-500/10 text-amber-300' : 'border-slate-800 bg-slate-900/50 text-slate-400'}`}>
                  <input
                    type="checkbox"
                    checked={leverWasteHeat}
                    onChange={(e) => setLeverWasteHeat(e.target.checked)}
                    className="accent-amber-400 rounded"
                  />
                  <span>Waste Heat Recovery (-22% S1)</span>
                </label>

                <label className={`p-2.5 rounded-xl border cursor-pointer flex items-center gap-2.5 transition-all ${leverSupplierEngage ? 'border-emerald-500/60 bg-emerald-500/10 text-emerald-300' : 'border-slate-800 bg-slate-900/50 text-slate-400'}`}>
                  <input
                    type="checkbox"
                    checked={leverSupplierEngage}
                    onChange={(e) => setLeverSupplierEngage(e.target.checked)}
                    className="accent-emerald-400 rounded"
                  />
                  <span>Tier-1 Supplier Audits (-20% S3)</span>
                </label>

                <label className={`p-2.5 rounded-xl border cursor-pointer flex items-center gap-2.5 transition-all ${leverEnergyEfficiency ? 'border-sky-500/60 bg-sky-500/10 text-sky-300' : 'border-slate-800 bg-slate-900/50 text-slate-400'}`}>
                  <input
                    type="checkbox"
                    checked={leverEnergyEfficiency}
                    onChange={(e) => setLeverEnergyEfficiency(e.target.checked)}
                    className="accent-sky-400 rounded"
                  />
                  <span>IE4 Motors & Smart VFDs (-10%)</span>
                </label>
              </div>
            </div>

          </div>

          {/* Right Column: Empirical Impact Computations & Financial Avoidance */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Main Result Card */}
            <div className="rounded-2xl border border-emerald-500/40 bg-[#0E1A29] p-6 sm:p-7 shadow-xl space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-emerald-400 font-bold block">
                    Calculated Carbon Trajectory
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-100">
                    Projected Emissions Reduction
                  </h3>
                </div>

                <div className="inline-flex items-baseline gap-1 text-emerald-400 font-mono">
                  <span className="font-serif text-3xl sm:text-4xl font-extrabold text-emerald-400">
                    -{reductionPercentage}%
                  </span>
                  <span className="text-xs font-bold uppercase">reduction</span>
                </div>
              </div>

              {/* Baseline vs. Reduced Metric Bars */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between font-mono text-xs text-slate-300 mb-1.5">
                    <span>Baseline Annual Footprint</span>
                    <strong className="text-slate-100">{baselineTotal.toLocaleString()} tCO2e / yr</strong>
                  </div>
                  <div className="w-full h-3.5 rounded-full bg-slate-800 overflow-hidden flex">
                    <div
                      className="h-full bg-amber-500"
                      style={{ width: `${baselineTotal > 0 ? (baselineScope1 / baselineTotal) * 100 : 0}%` }}
                      title={`Scope 1: ${baselineScope1} tCO2e`}
                    />
                    <div
                      className="h-full bg-sky-500"
                      style={{ width: `${baselineTotal > 0 ? (baselineScope2 / baselineTotal) * 100 : 0}%` }}
                      title={`Scope 2: ${baselineScope2} tCO2e`}
                    />
                    <div
                      className="h-full bg-emerald-500"
                      style={{ width: `${baselineTotal > 0 ? (baselineScope3 / baselineTotal) * 100 : 0}%` }}
                      title={`Scope 3: ${baselineScope3} tCO2e`}
                    />
                  </div>
                  <div className="flex justify-between font-mono text-[10px] text-slate-400 mt-1">
                    <span className="text-amber-400">Scope 1: {baselineScope1} t</span>
                    <span className="text-sky-400">Scope 2: {baselineScope2} t</span>
                    <span className="text-emerald-400">Scope 3: {baselineScope3} t</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-mono text-xs text-emerald-400 mb-1.5">
                    <span className="font-bold">Post-Intervention Optimized State</span>
                    <strong>{projectedTotal.toLocaleString()} tCO2e / yr</strong>
                  </div>
                  <div className="w-full h-3.5 rounded-full bg-slate-800 overflow-hidden flex">
                    <div
                      className="h-full bg-emerald-400 transition-all duration-500"
                      style={{ width: `${baselineTotal > 0 ? (projectedTotal / baselineTotal) * 100 : 0}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between font-mono text-[11px] text-slate-400 mt-1">
                    <span className="text-emerald-400 font-bold">
                      Avoided: {avoidedTons.toLocaleString()} tCO2e / yr
                    </span>
                    <span>Target: 2026-2028 Horizon</span>
                  </div>
                </div>
              </div>

              {/* Economic & Assurance Impact Grid */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800 font-mono">
                <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/70">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 uppercase">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Est. Cost Avoidance</span>
                  </div>
                  <div className="font-serif text-2xl font-bold text-slate-100 mt-1">
                    ₹{domesticSavingsLakhs} - ₹{cbamSavingsLakhs} L
                  </div>
                  <span className="text-[10px] text-emerald-400 block mt-0.5">
                    Annual CCTS / CBAM exposure
                  </span>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/70">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 uppercase">
                    <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                    <span>SEBI / ISO Audit Readiness</span>
                  </div>
                  <div className="font-serif text-2xl font-bold text-slate-100 mt-1">
                    {auditReadinessScore}%
                  </div>
                  <span className="text-[10px] text-sky-400 block mt-0.5">
                    Reasonable Assurance Grade
                  </span>
                </div>
              </div>

              {/* Transfer CTA Button */}
              <div className="pt-2">
                <button
                  onClick={handleTransferToContact}
                  className="w-full py-3.5 px-6 rounded-xl font-mono text-xs font-bold uppercase tracking-wider bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
                >
                  <span>Transfer Calculations to Formal Scoping Portal</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </button>

                <p className="text-[11px] font-mono text-slate-400 text-center mt-2.5">
                  Transferring pre-populates your installation boundary and service selection on the Contact page.
                </p>
              </div>

            </div>

            {/* Statutory Compliance Seal */}
            <div className="p-4 rounded-2xl border border-slate-800 bg-slate-900/40 flex items-start gap-3 text-xs text-slate-300 font-sans">
              <Award className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <strong className="block font-mono text-[11px] text-slate-200 uppercase">
                  Statutory Non-Assurance Guarantee
                </strong>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  These mathematical reductions constitute technical preparation (Line 1). Kai Prakriti calculates your audit trail; verification statements must be rendered independently by an accredited BEE ACVA or DAkkS body (Line 2).
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
