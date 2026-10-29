import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  ShieldCheck,
  FileText,
  Scale,
  Sparkles,
  ClipboardCheck,
  Building2,
  Clock,
  Play,
  Pause,
  Zap,
} from 'lucide-react';

export interface RoadmapStage {
  id: number;
  stageNumber: string;
  title: string;
  shortDesc: string;
  durationWeeks: string;
  regulatoryStandard: string;
  deliverables: string[];
  kaiPrakritiRole: string;
  clientRole: string;
  auditCheckpoint: string;
  keyMetric: string;
}

const ROADMAP_STAGES: RoadmapStage[] = [
  {
    id: 1,
    stageNumber: '01',
    title: 'Preliminary Scoping & Boundary Materiality',
    shortDesc: 'Establishing legal entity reporting boundaries, operational control, and framework materiality triage.',
    durationWeeks: 'Weeks 1 – 2',
    regulatoryStandard: 'SEBI LODR 34(2)(f) • GHG Protocol Corporate Standard • GRI 102',
    deliverables: [
      'Organizational Boundary Charter (Operational vs Financial Control under GHG Protocol)',
      'Materiality Triage Matrix across 9 NGRBC Core Principles',
      'Scope 3 Upstream & Downstream Category Applicability Filter (All 15 Categories)',
      'Facility Data Request Matrix (DRM) with automated validation scripts',
    ],
    kaiPrakritiRole: 'Conduct executive materiality interviews, map facility hierarchies, identify joint ventures, and configure required regulatory boundary parameters.',
    clientRole: 'Provide plant site listings, subsidiary ownership structures, and designate single points of contact (SPOCs).',
    auditCheckpoint: 'Formal boundary sign-off ensuring no emission source or manufacturing subsidiary is omitted.',
    keyMetric: 'Boundary Definition & 15-Category Scope 3 Filter',
  },
  {
    id: 2,
    stageNumber: '02',
    title: 'Primary Activity Data Ingestion & Fuel Audits',
    shortDesc: 'Collecting verified utility billing data, fuel logbooks, and supplier activity records to eliminate secondary proxies.',
    durationWeeks: 'Weeks 3 – 5',
    regulatoryStandard: 'ISO 14064-1:2018 Clause 5 • CEA CO2 Baseline Database Ver. 20.0',
    deliverables: [
      'Primary Meter Ledger for High-Tension (HT) & Low-Tension Grid Feeds',
      'Combustion Fuel Invoices (Diesel, Coal, Natural Gas, Biomass) with GC/NCV testing',
      'Refrigerant GWP Inventory & Fugitive Emission Leakage Calculations',
      'Tier-1 Supplier Scope 3 Questionnaire Tracking Worksheets',
    ],
    kaiPrakritiRole: 'Audit primary invoices against physical meter logs, calibrate flow instruments, and normalize multi-unit fuel data into metric tonnes.',
    clientRole: 'Upload utility bills, logistics manifests, purchase registers, and calibrated meter test certificates.',
    auditCheckpoint: '100% auditable documentation trail supporting every kilowatt-hour and fuel entry.',
    keyMetric: 'Zero Proxies: 100% Primary Invoice Traceability',
  },
  {
    id: 3,
    stageNumber: '03',
    title: 'Stoichiometric Calculation & Model Formulation',
    shortDesc: 'Computing Scope 1, 2, and 15 Scope 3 categories with traceable open-formula workbooks and statutory grid factors.',
    durationWeeks: 'Weeks 6 – 8',
    regulatoryStandard: 'IPCC 2006/2019 Refinement • EU CBAM Regulation (EU) 2023/956',
    deliverables: [
      'Complete Traceable Emission Formula Workbook (OpenXML format, zero hidden macros)',
      'Sub-Regional Indian Grid Emission Factor Attribution (CEA Version 20.0)',
      'Specific Embedded Emissions Model for Steel, Aluminium, Fertilizer exports per CN code',
      'Scope 2 Location-Based vs Market-Based Dual Reporting Dossier',
    ],
    kaiPrakritiRole: 'Engineer formula workbooks with zero opaque software approximations. Apply exact stoichiometric combustion equations.',
    clientRole: 'Review interim inventory balance sheets and sign off on production volume baselines.',
    auditCheckpoint: 'Mathematical reproducibility: Any external auditor can verify emissions starting directly from raw meter vouchers.',
    keyMetric: 'Complete Open-Formula Workbook Transparency',
  },
  {
    id: 4,
    stageNumber: '04',
    title: 'Internal Governance Review & Pre-Assurance',
    shortDesc: 'Simulating statutory assurance protocols, stress-testing evidence files, and closing regulatory compliance gaps.',
    durationWeeks: 'Weeks 9 – 10',
    regulatoryStandard: 'ISO 14064-3 • SEBI BRSR Core Assurance Provider Specifications',
    deliverables: [
      'Mock Assurance Gap Remediation Report with prioritized risk matrix',
      'Assurance Evidence Locker with hyperlinked source vouchers for every KPI',
      'Internal Controls & Measurement Uncertainty Assessment',
      'Draft Director BRSR Disclosure Table for statutory Board review',
    ],
    kaiPrakritiRole: 'Stress-test all formula cells, audit defense files, and cross-reference documentation against statutory SEBI and EU norms.',
    clientRole: 'Internal Audit & ESG committee review of pre-assurance findings and approval of draft figures.',
    auditCheckpoint: 'Zero self-review conflict guarantee: Kai Prakriti prepares accounting, independent auditor verifies.',
    keyMetric: 'Pre-Assurance Simulation with Zero Open Audit Findings',
  },
  {
    id: 5,
    stageNumber: '05',
    title: 'Third-Party Verification Facilitation & Filing',
    shortDesc: 'Facilitating external accredited auditor review, defending data trails, and completing statutory portal submission.',
    durationWeeks: 'Weeks 11 – 12',
    regulatoryStandard: 'IAASB ISAE 3410 / ISAE 3000 • BSE/NSE Statutory Portals',
    deliverables: [
      'Facilitated Auditor Walkthrough & Sample Defense Dossier',
      'Accredited Third-Party Assurance Statement (Limited or Reasonable)',
      'Final Board-Ready BRSR Core / CBAM Statutory Package',
      'Year-on-Year Decarbonization Baseline Roadmap & Capex Prioritization',
    ],
    kaiPrakritiRole: 'Lead auditor inquiry defense, provide transparent formula explanations, and interface with the accredited VVB verification team.',
    clientRole: 'Board Audit Committee approval, signature by Director/CEO, and final upload to stock exchange / CBAM portal.',
    auditCheckpoint: 'Issuance of clean, unqualified Independent Assurance Opinion with zero compliance warnings.',
    keyMetric: 'Clean Unqualified Assurance Opinion & Portal Filing',
  },
];

interface ComplianceRoadmapProps {
  onSelectService?: (serviceId: string) => void;
  className?: string;
}

export const ComplianceRoadmap: React.FC<ComplianceRoadmapProps> = ({
  onSelectService,
  className = '',
}) => {
  const [activeStageId, setActiveStageId] = useState<number>(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const [entityType, setEntityType] = useState<'top250' | 'top1000' | 'exporter' | 'msme'>('top1000');
  const [cursorLightPosition, setCursorLightPosition] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const activeStage = ROADMAP_STAGES.find((s) => s.id === activeStageId) || ROADMAP_STAGES[0];

  // Auto-advance step animation when playing
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveStageId((prev) => (prev >= 5 ? 1 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Handle cursor dragging / moving over the steps track to calculate light position
  const handleTrackMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const relativeX = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setCursorLightPosition(relativeX * 100);
  };

  const handleTrackMouseLeave = () => {
    setCursorLightPosition(null);
  };

  const handleStageSelect = (stageId: number) => {
    setActiveStageId(stageId);
  };

  const entityEstimates = {
    top250: {
      label: 'Top 250 Listed Entity',
      badge: 'Mandatory Reasonable Assurance',
      timeframe: '10 – 12 Weeks',
      frameworks: 'SEBI BRSR Core (Full 9 Attributes), Value Chain Scope 3, GHG Protocol',
      dataDepth: 'Multi-plant metering, sub-meter logbooks, Tier-1 vendor invoices',
    },
    top1000: {
      label: 'Top 1000 Listed Entity',
      badge: 'Mandatory Reporting & Limited Assurance',
      timeframe: '8 – 10 Weeks',
      frameworks: 'SEBI BRSR Comprehensive, Scope 1 & 2 Primary Data, ISO 14064-1',
      dataDepth: 'Corporate HQ, regional branches, manufacturing and logistics hubs',
    },
    exporter: {
      label: 'EU CBAM Exporter (Steel / Al / Fertilizers)',
      badge: 'EU Installation Verification Ready',
      timeframe: '6 – 8 Weeks',
      frameworks: 'EU Regulation 2023/956, Annex IV Specific Embedded Emissions',
      dataDepth: 'Furnace fuel consumption, production run stoichiometric data, precursor invoices',
    },
    msme: {
      label: 'Tier-1 MSME Supplier',
      badge: 'ZED Gold / EcoVadis Assurance',
      timeframe: '4 – 6 Weeks',
      frameworks: 'ZED Certification, Tier-1 Customer Scope 3 Supply Chain Assurance',
      dataDepth: 'Electricity utility bills, diesel generator logs, basic waste records',
    },
  };

  const selectedEntity = entityEstimates[entityType];

  // Calculate percentage of track completed for active stage
  const activePercent = ((activeStageId - 1) / 4) * 100;

  return (
    <section className={`py-16 sm:py-24 bg-[#FAF8F5] border-t border-[#E7E3DC] ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        
        {/* 1. Header with Regulatory Context and Walkthrough Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#E7E3DC] pb-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#3E6B48]/10 text-[#3E6B48] border border-[#3E6B48]/25">
              <ShieldCheck className="w-4 h-4 text-[#3E6B48]" />
              <span className="uppercase tracking-wider text-[10px]">Statutory Delivery Protocol • ISO 14064 & SEBI Compliant</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-[#1E382E]">
              ESG Advisory Engagement Roadmap
            </h2>
            <p className="text-xs sm:text-sm text-[#264143]/75 leading-relaxed">
              Step-by-step advisory progression from initial materiality assessment to clean, unqualified statutory audit sign-off. Click or drag cursor across steps to see the light flow between tiles.
            </p>
          </div>

          {/* Interactive Walkthrough & Entity Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            
            {/* Auto-Walkthrough Play/Pause Button */}
            <button
              type="button"
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`px-4 py-2.5 rounded-2xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs ${
                isAutoPlaying
                  ? 'bg-[#3E6B48] text-white border-[#3E6B48] ring-2 ring-[#3E6B48]/25'
                  : 'bg-white text-[#1E382E] border-[#E7E3DC] hover:border-[#3E6B48]/50 hover:bg-[#FAF8F5]'
              }`}
              title={isAutoPlaying ? 'Pause Automated Step Walkthrough' : 'Play Automated Step Walkthrough'}
            >
              {isAutoPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-white" />
                  <span>Pause Walkthrough</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-[#E99F4C]" />
                  <span>Play Step Walkthrough</span>
                </>
              )}
            </button>

            {/* Engagement Timeframe Calculator Selector */}
            <div className="p-2 sm:p-2.5 rounded-2xl bg-white border border-[#E7E3DC] shadow-2xs space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-semibold text-[#264143]">
                <span className="flex items-center gap-1.5 text-[#1E382E]">
                  <Clock className="w-3.5 h-3.5 text-[#D96846]" />
                  Entity Scale:
                </span>
                <span className="font-mono text-[#3E6B48] font-bold">
                  Est. {selectedEntity.timeframe}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-1 text-[10px]">
                {(['top250', 'top1000', 'exporter', 'msme'] as const).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setEntityType(key)}
                    className={`px-2 py-1 rounded-lg font-semibold transition-all cursor-pointer text-center ${
                      entityType === key
                        ? 'bg-[#1E382E] text-white shadow-2xs'
                        : 'bg-[#FAF8F5] text-[#264143]/70 hover:bg-slate-100'
                    }`}
                  >
                    {key === 'top250' ? 'Top 250' : key === 'top1000' ? 'Top 1000' : key === 'exporter' ? 'CBAM' : 'MSME'}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* 2. Interactive Step-by-Step Progress Track with Animated Light Pulse */}
        <div
          ref={trackRef}
          onMouseMove={handleTrackMouseMove}
          onMouseLeave={handleTrackMouseLeave}
          className="relative py-4 select-none"
        >
          {/* Background Connecting Pipe / Tube */}
          <div className="hidden lg:block absolute top-[68px] left-12 right-12 h-2 bg-[#E7E3DC] rounded-full z-0 overflow-hidden shadow-inner">
            {/* Luminous Active Progress Tube */}
            <motion.div
              className="h-full bg-gradient-to-r from-[#3E6B48] via-[#E99F4C] to-[#3E6B48] rounded-full relative"
              animate={{ width: `${activePercent}%` }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Travelling High-Intensity Laser Particle */}
              <motion.div
                className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white shadow-[0_0_15px_#E99F4C,0_0_25px_#3E6B48] border-2 border-[#E99F4C]"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
              />
            </motion.div>

            {/* Hover Cursor Light Preview */}
            {cursorLightPosition !== null && (
              <div
                className="absolute top-0 bottom-0 w-8 -translate-x-1/2 bg-white/70 blur-[2px] pointer-events-none transition-all duration-75"
                style={{ left: `${cursorLightPosition}%` }}
              />
            )}
          </div>

          {/* 5 Step Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 relative z-10">
            {ROADMAP_STAGES.map((stage) => {
              const isActive = activeStageId === stage.id;
              const isPast = activeStageId > stage.id;

              return (
                <div
                  key={stage.id}
                  onClick={() => handleStageSelect(stage.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') handleStageSelect(stage.id);
                  }}
                  className={`relative text-left p-4 sm:p-5 rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-3 group ${
                    isActive
                      ? 'bg-white border-[#3E6B48] ring-4 ring-[#3E6B48]/15 shadow-xl scale-[1.02]'
                      : isPast
                      ? 'bg-white/90 border-[#3E6B48]/40 hover:border-[#3E6B48] shadow-xs hover:shadow-md'
                      : 'bg-white/75 border-[#E7E3DC] hover:border-slate-300 shadow-2xs hover:bg-white'
                  }`}
                >
                  {/* Glowing Laser Border for Active Stage */}
                  {isActive && (
                    <motion.div
                      layoutId="roadmap-glow"
                      className="absolute inset-0 rounded-3xl border-2 border-[#3E6B48] pointer-events-none shadow-[0_0_20px_rgba(62,107,72,0.25)]"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}

                  {/* Header Row: Node Indicator with Light Pulse */}
                  <div className="flex items-center justify-between">
                    <div className="relative">
                      <span
                        className={`w-9 h-9 rounded-2xl flex items-center justify-center font-bold text-xs font-mono transition-all duration-300 ${
                          isActive
                            ? 'bg-[#3E6B48] text-white shadow-md shadow-[#3E6B48]/40 scale-110'
                            : isPast
                            ? 'bg-[#3E6B48]/20 text-[#3E6B48] border border-[#3E6B48]/30'
                            : 'bg-slate-100 text-[#264143]/60 border border-[#E7E3DC]'
                        }`}
                      >
                        {isPast ? <CheckCircle2 className="w-5 h-5 text-[#3E6B48]" /> : stage.stageNumber}
                      </span>

                      {/* Animated Pulse Ring on Active Node */}
                      {isActive && (
                        <span className="absolute -inset-1 rounded-2xl border border-[#3E6B48] animate-ping opacity-40 pointer-events-none" />
                      )}
                    </div>

                    <span className="text-[10px] font-mono font-bold text-[#E99F4C] bg-[#E99F4C]/10 px-2 py-0.5 rounded-md">
                      {stage.durationWeeks}
                    </span>
                  </div>

                  {/* Stage Title & Short Description */}
                  <div className="space-y-1">
                    <h4
                      className={`font-serif text-sm font-bold line-clamp-2 leading-snug transition-colors ${
                        isActive ? 'text-[#1E382E]' : 'text-[#264143]'
                      }`}
                    >
                      {stage.title}
                    </h4>
                    <p className="text-[11px] text-[#264143]/65 line-clamp-2 leading-relaxed">
                      {stage.shortDesc}
                    </p>
                  </div>

                  {/* Bottom Indicator / Light Travel Action */}
                  <div className="pt-2 border-t border-[#E7E3DC]/60 flex items-center justify-between text-[10px] font-semibold">
                    <span className={isActive ? 'text-[#3E6B48]' : 'text-[#264143]/50'}>
                      {isActive ? '● Active Step' : isPast ? '✓ Completed' : 'Next in Sequence'}
                    </span>
                    <ChevronRight
                      className={`w-3.5 h-3.5 transition-transform ${
                        isActive ? 'text-[#3E6B48] translate-x-1' : 'text-[#264143]/40'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Deep-Dive Stage Dossier Panel with Staggered Entrance */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStage.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="p-6 sm:p-8 rounded-3xl border border-[#E7E3DC] bg-white shadow-md space-y-6 relative overflow-hidden"
          >
            {/* Ambient Corner Accent */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-[#3E6B48]/10 via-[#E99F4C]/5 to-transparent rounded-full blur-2xl pointer-events-none" />

            {/* Dossier Header */}
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E7E3DC] pb-5">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-mono font-bold text-white bg-[#1E382E] px-2.5 py-0.5 rounded-lg shadow-2xs">
                    STAGE {activeStage.stageNumber} OF 05
                  </span>
                  <span className="text-[11px] font-semibold text-[#3E6B48] bg-[#3E6B48]/10 px-3 py-0.5 rounded-full border border-[#3E6B48]/30">
                    {activeStage.durationWeeks}
                  </span>
                  <span className="text-[11px] font-mono text-[#D96846] font-semibold bg-[#D96846]/10 px-2.5 py-0.5 rounded-md">
                    {activeStage.regulatoryStandard}
                  </span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1E382E]">
                  {activeStage.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#264143]/80 max-w-3xl leading-relaxed">
                  {activeStage.shortDesc}
                </p>
              </div>

              {/* Prev / Next Stage Controls (Propels the Light Pulse) */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  disabled={activeStageId === 1}
                  onClick={() => setActiveStageId((prev) => Math.max(1, prev - 1))}
                  className="px-3 py-2 rounded-xl border border-[#E7E3DC] text-[#264143] hover:bg-[#FAF8F5] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all flex items-center gap-1 text-xs font-semibold"
                  title="Previous Stage"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Prev</span>
                </button>
                <button
                  type="button"
                  disabled={activeStageId === 5}
                  onClick={() => setActiveStageId((prev) => Math.min(5, prev + 1))}
                  className="px-4 py-2 rounded-xl border border-[#3E6B48] bg-[#3E6B48] text-white hover:bg-[#315639] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all flex items-center gap-1.5 text-xs font-semibold shadow-xs"
                  title="Next Stage (Advances the light)"
                >
                  <span>Next Step</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 2-Column Content: Deliverables & Responsibilities */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Left Column: Key Deliverables */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF8F5] border border-[#E7E3DC] space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#1E382E] uppercase tracking-wider">
                  <FileText className="w-4 h-4 text-[#D96846]" />
                  <span>Primary Work Products in Stage {activeStage.stageNumber}</span>
                </div>

                <div className="space-y-2.5">
                  {activeStage.deliverables.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white border border-[#E7E3DC] flex items-start gap-2.5 text-xs text-[#264143] shadow-2xs"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#3E6B48] shrink-0 mt-0.5" />
                      <span className="font-medium leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#3E6B48]/10 border border-[#3E6B48]/20 text-[11px] font-semibold text-[#3E6B48]">
                    <Sparkles className="w-3.5 h-3.5 text-[#E99F4C]" />
                    <span>Verified Audit Trailing: {activeStage.keyMetric}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Split Responsibilities & Audit Assurance Checkpoint */}
              <div className="space-y-4 flex flex-col justify-between">
                
                {/* Kai Prakriti Role vs Client Role */}
                <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E7E3DC] space-y-3">
                  <span className="text-xs font-bold text-[#1E382E] uppercase tracking-wider block">
                    Execution Division of Responsibilities
                  </span>

                  <div className="space-y-2.5 text-xs">
                    <div className="p-3 rounded-xl bg-white border border-[#E7E3DC] space-y-1">
                      <span className="font-bold text-[#3E6B48] block">
                        Kai Prakriti Engineering Team:
                      </span>
                      <p className="text-[#264143]/80 leading-relaxed">
                        {activeStage.kaiPrakritiRole}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-white border border-[#E7E3DC] space-y-1">
                      <span className="font-bold text-[#D96846] block">
                        Enterprise Client SPOCs & Data Owners:
                      </span>
                      <p className="text-[#264143]/80 leading-relaxed">
                        {activeStage.clientRole}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Audit Assurance Checkpoint Callout */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-[#1E382E] to-[#142A20] text-white space-y-1.5 shadow-sm">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#E99F4C] uppercase tracking-wider">
                    <Scale className="w-4 h-4 text-[#E99F4C]" />
                    <span>Assurance Sign-Off Checkpoint</span>
                  </div>
                  <p className="text-xs text-white/90 leading-relaxed">
                    {activeStage.auditCheckpoint}
                  </p>
                </div>

              </div>

            </div>

            {/* Stage Action CTA */}
            <div className="relative z-10 pt-4 border-t border-[#E7E3DC] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="text-xs text-[#264143]/70">
                Scope your entity's requirements across all 5 engagement milestones with our senior partners.
              </div>

              {onSelectService && (
                <button
                  type="button"
                  onClick={() => onSelectService('ghg-accounting')}
                  className="px-6 py-3 rounded-2xl bg-[#D96846] hover:bg-[#C45737] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                >
                  <span>Request Full Engagement Scoping</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              )}
            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};
