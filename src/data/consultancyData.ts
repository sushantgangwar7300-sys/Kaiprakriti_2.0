import { ServiceItem, StandardItem, DesignDirection } from '../types';

export const ELEVEN_SERVICES: ServiceItem[] = [
  {
    id: 'ghg-accounting',
    number: '01',
    title: 'Measure what you actually emit',
    shortDesc: 'GHG inventory across Scope 1, 2, and 3 following the GHG Protocol Corporate Standard and ISO 14064-1.',
    fullDesc: 'Comprehensive greenhouse gas accounting across direct combustion (Scope 1), purchased grid electricity (Scope 2, location and market-based), and value chain emissions (Scope 3, 15 categories). We calculate actual emission factors tailored to Indian grid sub-regions and supply chain data rather than generic averages.',
    category: 'direct',
    standard: 'GHG Protocol & ISO 14064-1',
    standardCode: 'ISO 14064-1:2018',
    deliverables: [
      'Activity data collection template & boundary definition',
      'Scope 1, 2, and 3 activity calculation workbook with traceable formulas',
      'Inventory report audit-ready for third-party verification',
      'Year-on-year decarbonization baseline documentation'
    ],
    whySeparateNote: 'Kai Prakriti performs the quantitative calculation and documentation. When your lender or regulator demands ISO 14064-3 verification, we connect you to an accredited body. We never verify our own numbers.',
    keyMetric: 'Complete 15-category Scope 3 coverage'
  },
  {
    id: 'brsr-core',
    number: '02',
    title: 'BRSR, prepared to survive assessment',
    shortDesc: 'Full format across nine NGRBC principles and the auditable data trail behind BRSR Core attributes.',
    fullDesc: 'Preparation of the comprehensive Business Responsibility and Sustainability Report (BRSR) mandated by SEBI under Regulation 34(2)(f). We build the exact auditable data trail behind BRSR Core KPIs (Greenhouse gas footprint, water footprint, energy intensity, circularity, fair wages, gender diversity, and turnover).',
    category: 'direct',
    standard: 'SEBI LODR Reg. 34(2)(f)',
    standardCode: 'SEBI BRSR Core',
    deliverables: [
      'Full BRSR report covering Section A, B, and C across 9 NGRBC principles',
      'BRSR Core Assurance Trail document matching SEBI assurance provider specifications',
      'Internal data owner sign-off sheets for legal/secretarial sign-off',
      'XBRL taxonomy compliance alignment'
    ],
    whySeparateNote: 'SEBI mandates "reasonable assurance" by an independent third party for top listed companies. Kai Prakriti acts strictly on the client side to engineer the data foundation.',
    keyMetric: 'Covers all 9 SEBI Core attributes'
  },
  {
    id: 'brsr-lite',
    number: '03',
    title: 'Start reporting before required',
    shortDesc: 'BRSR Lite voluntary format from the MCA committee for unlisted MSMEs preparing for tier-1 supply chain asks.',
    fullDesc: 'Tier-1 suppliers to large listed corporations and multinational exporters face increasing requests for ESG disclosures. We implement the voluntary BRSR Lite framework recommended by the Ministry of Corporate Affairs, creating a lightweight yet rigorous reporting structure.',
    category: 'direct',
    standard: 'Voluntary MCA Framework',
    standardCode: 'MCA BRSR Lite',
    deliverables: [
      'Materiality assessment tailored to MSME operational scales',
      'Essential indicators data compilation',
      'Customer-facing ESG disclosure package ready for RFP/procurement bids',
      'Annual ESG readiness action plan'
    ],
    whySeparateNote: 'Direct consultancy deliverable designed to win commercial tenders and satisfy OEM vendor audits without exorbitant big-four overhead.',
    keyMetric: 'Streamlined 40-indicator framework'
  },
  {
    id: 'lca-product',
    number: '04',
    title: 'Product life cycle assessment',
    shortDesc: 'Tracing environmental load from raw material extraction to end of life under ISO 14040 and ISO 14044.',
    fullDesc: 'Granular cradle-to-gate or cradle-to-grave Life Cycle Assessment (LCA) for manufactured goods, components, and packaging. We model materials, transportation stages, manufacturing power consumption, and end-of-life disposal to quantify Global Warming Potential (GWP), eutrophication, and water depletion.',
    category: 'direct',
    standard: 'ISO 14040 & ISO 14044',
    standardCode: 'ISO 14044:2006',
    deliverables: [
      'SimaPro / openLCA-compatible life cycle inventory (LCI)',
      'Life Cycle Impact Assessment (LCIA) technical report',
      'Product Carbon Footprint (PCF) certificate preparation dossier',
      'Eco-design intervention roadmap'
    ],
    whySeparateNote: 'Preparation of the scientific LCA study is direct engineering work. Independent critical review under ISO 14071 is facilitated separately through an accredited reviewer panel.',
    keyMetric: 'Cradle-to-gate / Cradle-to-grave modeling'
  },
  {
    id: 'cbam-readiness',
    number: '05',
    title: 'CBAM data readiness & verification',
    shortDesc: 'Prepare embedded emissions data at installation level, then introduce you to accredited EU verification bodies.',
    fullDesc: 'The European Union Carbon Border Adjustment Mechanism (CBAM) imposes reporting and carbon tariff liabilities on exports of steel, aluminium, cement, fertilizer, hydrogen, and electricity. We compute specific embedded emissions (direct and indirect) per CN code at the physical production installation, and introduce you to recognized EU verifiers.',
    category: 'facilitated',
    standard: 'Regulation (EU) 2023/956',
    standardCode: 'EU CBAM 2023/956',
    deliverables: [
      'Installation boundary demarcation & precursor identification',
      'CBAM calculation sheet per ton of exported steel/aluminium product',
      'Completed CBAM Transitional Registry XML/Excel template',
      'Formal introduction to an accredited EU verifier with live accreditation verification'
    ],
    whySeparateNote: 'EU rules require verification by an accredited body under Implementing Regulation (EU) 2018/2067. Kai Prakriti prepares the dataset and arranges the accredited verifier with our introduction fee transparently noted.',
    keyMetric: 'Compliant with EU 2023/956 CN codes'
  },
  {
    id: 'zed-support',
    number: '06',
    title: 'ZED support without overclaim',
    shortDesc: 'Documentation and gap closure for the MSME Sustainable ZED certification scheme via QCI guidelines.',
    fullDesc: 'The Zero Defect Zero Effect (ZED) certification under the Ministry of MSME unlocks government subsidies, priority lending, and concessional interest rates. We guide MSMEs through Bronze, Silver, or Gold tier criteria, resolving environmental gaps and safety protocols without false promises.',
    category: 'direct',
    standard: 'MSME Sustainable ZED Scheme',
    standardCode: 'QCI / MoMSME ZED',
    deliverables: [
      'Factory diagnostic assessment against 20 ZED parameters',
      'Standard Operating Procedures (SOPs) and safety protocol documentation',
      'Energy conservation and waste recycling plan',
      'Self-assessment portal filing support and remote desktop audit assistance'
    ],
    whySeparateNote: 'Desktop verification and on-site assessment is conducted directly by QCI-empanelled assessment agencies. We act purely as your implementation advisor.',
    keyMetric: 'Bronze / Silver / Gold progression roadmap'
  },
  {
    id: 'iso-14064-training',
    number: '07',
    title: 'ISO 14064 training & implementation',
    shortDesc: 'Training and organizational implementation across Parts 1 & 2. Facilitated introductions for Part 3 verification.',
    fullDesc: 'Turn ISO 14064 standards into repeatable internal systems. We train plant heads, quality managers, and environmental directors on Part 1 (organizational inventories) and Part 2 (project-level reductions). When you seek formal certification, we introduce accredited Part 3 validation/verification bodies (VVBs).',
    category: 'hybrid',
    standard: 'ISO 14064 Parts 1, 2 & 3',
    standardCode: 'ISO 14064-1/2/3',
    deliverables: [
      'Multi-module internal auditor and practitioner training workshops',
      'Standardized GHG information management system (IMS) templates',
      'Internal pre-audit simulation and gap-remedy checklist',
      'Facilitated handoff to accredited VVB for Part 3 certification audit'
    ],
    whySeparateNote: 'ISO 14064-3 strictly forbids consulting organizations from issuing verification statements. We maintain a strict firebreak.',
    keyMetric: 'Hands-on internal auditor capability'
  },
  {
    id: 'carbon-pdd',
    number: '08',
    title: 'Carbon project PDD documentation',
    shortDesc: 'Write project design documents under India CCTS offset mechanisms, Verra VCS, or Gold Standard rules.',
    fullDesc: 'Turn biomass boilers, rooftop solar, agroforestry, biochar, or industrial energy efficiency initiatives into verified carbon credits. We author the complete Project Design Document (PDD), define additionality, establish baseline emissions, and design the monitoring plan according to approved methodologies.',
    category: 'direct',
    standard: 'India CCTS / Verra VCS / Gold Standard',
    standardCode: 'BEE CCTS / VCS / GS',
    deliverables: [
      'Full Project Design Document (PDD) with baseline calculations',
      'Additionality test analysis (financial, barrier, common practice)',
      'Digital monitoring, reporting, and verification (MRV) spreadsheet',
      'Stakeholder consultation documentation and environmental impact review'
    ],
    whySeparateNote: 'Project documentation must be validated by an accredited DOE (Designated Operational Entity) or VVB. We author the technical defense; the DOE verifies.',
    keyMetric: 'Full additionality & baseline defense'
  },
  {
    id: 'honest-verifier-match',
    number: '09',
    title: 'The right verifier, named honestly',
    shortDesc: 'Match your project to a BEE ACVA or VCS VVB with live accreditation. Introduction commission disclosed in writing.',
    fullDesc: 'Navigating the verification marketplace in India is fraught with expired accreditations, mismatched sectoral scopes, and hidden referral markups. We verify the active status of Accredited Carbon Verification Agencies (ACVA under BEE) or VCS VVBs and connect you directly. Our facilitator fee is stated as a distinct line item.',
    category: 'facilitated',
    standard: 'BEE / Verra / NABCB Schemes',
    standardCode: 'NABCB / ACVA Matrix',
    deliverables: [
      'Live accreditation verification report from NABCB/BEE/Verra registry',
      'Competitive quote comparison from 2-3 accredited bodies',
      'Direct contract facilitation between client and verifier',
      'Disclosed commission agreement on invoice'
    ],
    whySeparateNote: 'Facilitated service. Kai Prakriti receives a disclosed commission from the verifier or charges a transparent facilitation fee to the client.',
    keyMetric: 'Zero hidden kickbacks; 100% written disclosure'
  },
  {
    id: 'esg-team-training',
    number: '10',
    title: 'Training for ESG data owners',
    shortDesc: 'Practical upskilling for EHS, procurement, and finance teams mapping to GHG Protocol, ISO 14064, and BRSR.',
    fullDesc: 'ESG reports fail when shop-floor engineers and accountants do not understand what data to record. We deliver hands-on masterclasses for internal data owners, explaining electricity bill conversions, fugitive refrigerant logs, transport manifests, and supplier ESG data solicitation.',
    category: 'direct',
    standard: 'Corporate ESG Capacity Building',
    standardCode: 'NGRBC / GHG Protocol',
    deliverables: [
      'Role-specific training decks (EHS, Finance, HR, Supply Chain)',
      'Standardized data entry spreadsheets with built-in validation checks',
      'Interactive case studies based on client-specific manufacturing lines',
      'Post-training competency assessment and certificates'
    ],
    whySeparateNote: 'Pure educational and operational consulting deliverable that stays within your company for long-term self-sufficiency.',
    keyMetric: 'Empowers internal non-sustainability staff'
  },
  {
    id: 'capable-body-vetting',
    number: '11',
    title: 'Finding the capable body',
    shortDesc: 'Check sectoral scope and live status to prevent wasted time approaching incorrect verification bodies.',
    fullDesc: 'Not every verification body is accredited for every industrial sector. A verifier accredited for renewable energy may not hold accreditation for chemical processing or heavy metallurgy under EU CBAM or SEBI BRSR Core. We audit their accredited technical scopes before you waste months in dead-end negotiations.',
    category: 'facilitated',
    standard: 'Scheme Accreditation Rules',
    standardCode: 'ISO 14065 / IAF MD 6',
    deliverables: [
      'Accreditation scope certificate audit (NABCB, RvA, DAkkS, UKAS)',
      'Verifier auditor competency matrix validation',
      'Timeline and audit budget benchmark',
      'Direct introduction to active lead auditors'
    ],
    whySeparateNote: 'Facilitated advisory service with live registry checks. Protects clients from non-compliant audits rejected by stock exchanges or EU authorities.',
    keyMetric: 'Prevents accreditation disqualification'
  }
];

export const GOVERNED_STANDARDS: StandardItem[] = [
  {
    id: 'ghg-proto',
    code: 'GHG Protocol',
    name: 'Corporate Accounting & Reporting Standard',
    authority: 'WRI & WBCSD',
    scope: 'Scope 1, 2, and 15 categories of Scope 3',
    keyRequirement: 'Rigorous calculation boundaries, activity data collection, emission factor selection',
    status: 'Global Benchmark'
  },
  {
    id: 'iso-14064',
    code: 'ISO 14064-1:2018',
    name: 'Specification with guidance at organizational level',
    authority: 'International Organization for Standardization',
    scope: 'Direct, indirect emissions, removals & quantification',
    keyRequirement: 'Verification by independent bodies accredited under ISO 14065',
    status: 'International Standard'
  },
  {
    id: 'sebi-brsr',
    code: 'SEBI BRSR Core',
    name: 'Business Responsibility and Sustainability Reporting',
    authority: 'Securities and Exchange Board of India (SEBI)',
    scope: 'Mandatory for top 1,000 listed entities in India',
    keyRequirement: 'Reasonable assurance by independent providers on 9 Core attributes',
    status: 'Mandatory Statutory'
  },
  {
    id: 'eu-cbam',
    code: 'EU CBAM 2023/956',
    name: 'Carbon Border Adjustment Mechanism',
    authority: 'European Commission (DG TAXUD)',
    scope: 'Steel, aluminium, cement, fertilizers, hydrogen exports',
    keyRequirement: 'Accredited verifier audit per Regulation (EU) 2018/2067',
    status: 'Active Transition / Definitives 2026'
  },
  {
    id: 'msme-zed',
    code: 'MSME ZED',
    name: 'Zero Defect Zero Effect Certification Scheme',
    authority: 'Ministry of MSME & Quality Council of India (QCI)',
    scope: 'Indian Manufacturing Micro, Small, and Medium Enterprises',
    keyRequirement: 'Desktop & site assessment by QCI empaneled agencies',
    status: 'Government Incentive Scheme'
  },
  {
    id: 'carbon-ccts',
    code: 'India CCTS & Verra',
    name: 'Carbon Credit Trading Scheme & Voluntary Standards',
    authority: 'Bureau of Energy Efficiency (BEE) & Verra / Gold Standard',
    scope: 'Obligated and non-obligated decarbonization projects',
    keyRequirement: 'Independent validation and verification by BEE ACVA or VCS VVB',
    status: 'National & Global Carbon Registry'
  }
];

export const DESIGN_DIRECTIONS: DesignDirection[] = [
  {
    id: 'verdant',
    title: 'Verdant Authority',
    subtitle: 'Nature & Scientific Precision (Directly inspired by the Logo Emblem)',
    aesthetic: 'Organic botanical depth paired with high-precision analytical geometry. Earthy paper canvas, deep forest green, dark slate measurement nodes, and crisp leaf accents.',
    primaryTone: 'Trustworthy, organic, grounded in real environmental science and Vedic sustainability philosophy.',
    background: 'bg-[#FAF9F5]',
    textPrimary: 'text-[#1E3A2F]',
    textMuted: 'text-[#4A5D54]',
    accent: 'text-[#2D7A4D]',
    accentBg: 'bg-[#2D7A4D]',
    cardBg: 'bg-white',
    cardBorder: 'border-[#E2ECE5]',
    headerBg: 'bg-[#FAF9F5]/90',
    pillDirect: 'bg-[#EBF5EE] text-[#1E3A2F] border-[#C3DEC9]',
    pillFacilitated: 'bg-[#F4EFE6] text-[#6B4B1B] border-[#E8DAC2]',
    fontNotes: 'Fraunces for authoritative titles + Overpass for dense UI + IBM Plex Mono for standards & IDs.',
    whyItWorks: 'Directly mirrors the physical leaf + data nodes in the Kai Prakriti logo. Evokes deep respect for nature (प्रकृति) backed by mathematical rigor (सतत विकास). Eliminates the tech-cliché purple look and feels like an elite climate research consultancy.',
    swatches: [
      { name: 'Forest Evergreen', hex: '#1E3A2F', role: 'Primary Brand & Headings' },
      { name: 'Leaf Emerald', hex: '#2D7A4D', role: 'Accent & Positive Status' },
      { name: 'Paper Canvas', hex: '#FAF9F5', role: 'Warm Earth Background' },
      { name: 'Slate Node', hex: '#1E293B', role: 'Measurement Data Points' },
      { name: 'Warm Amber Sand', hex: '#C28E3A', role: 'Facilitated Badge & Highlights' }
    ]
  },
  {
    id: 'vibrant',
    title: 'Sovereign Electric',
    subtitle: 'Elevated Evolution of your Initial HTML Concept',
    aesthetic: 'High-contrast nocturnal palette with deep twilight violet, rich royal indigo, luminous electric mint, and sharp glassmorphism.',
    primaryTone: 'Bold, tech-forward, high-conviction, tailored for global cross-border compliance and modern enterprise leaders.',
    background: 'bg-[#120D2B]',
    textPrimary: 'text-white',
    textMuted: 'text-[#A59FC7]',
    accent: 'text-[#23E391]',
    accentBg: 'bg-[#23E391]',
    cardBg: 'bg-[#1C153E]',
    cardBorder: 'border-white/10',
    headerBg: 'bg-[#120D2B]/85',
    pillDirect: 'bg-[#593EC5] text-white border-white/20',
    pillFacilitated: 'bg-[#23E391] text-[#120D2B] border-transparent font-bold',
    fontNotes: 'Fraunces Serif for regal display + Overpass Sans + IBM Plex Mono for technical contrast.',
    whyItWorks: 'Takes the visual energy of your initial prototype and refines the spacing, legibility, and contrast so it feels like a multi-million dollar sovereign ESG consultancy rather than a generic dark theme. The electric mint pops with immense clarity on dark purple.',
    swatches: [
      { name: 'Night Twilight', hex: '#120D2B', role: 'Main Background' },
      { name: 'Royal Indigo', hex: '#593EC5', role: 'Sub-headers & Card Accents' },
      { name: 'Electric Mint', hex: '#23E391', role: 'High-priority CTAs & Badges' },
      { name: 'Card Midnight', hex: '#1C153E', role: 'Card Container Surface' },
      { name: 'Ghost Violet', hex: '#312361', role: 'Borders & Dividers' }
    ]
  },
  {
    id: 'editorial',
    title: 'Institutional Swiss',
    subtitle: 'Pure Regulatory Trust & Uncompromising Transparency',
    aesthetic: 'Crisp monochrome with deep juniper slate, architectural gridlines, dense data tables, and razor-sharp border geometry.',
    primaryTone: 'Impartial, forensic, unyielding audit integrity. Evokes the uncompromising standards of Big-4 audit firms and statutory bodies.',
    background: 'bg-[#F4F4F6]',
    textPrimary: 'text-[#0F172A]',
    textMuted: 'text-[#525B6C]',
    accent: 'text-[#047857]',
    accentBg: 'bg-[#0F172A]',
    cardBg: 'bg-white',
    cardBorder: 'border-[#CBD5E1]',
    headerBg: 'bg-white/90',
    pillDirect: 'bg-[#F1F5F9] text-[#0F172A] border-[#94A3B8]',
    pillFacilitated: 'bg-[#FEF3C7] text-[#92400E] border-[#FCD34D]',
    fontNotes: 'Fraunces headline serif for intellectual prestige + Overpass + IBM Plex Mono for structured tables.',
    whyItWorks: 'Corporates and listed CFOs facing SEBI and EU CBAM inspections want uncompromising sobriety. This theme signals immediate legal competence and accounting hygiene.',
    swatches: [
      { name: 'Deep Graphite', hex: '#0F172A', role: 'Primary Typography' },
      { name: 'Alabaster Cool', hex: '#F4F4F6', role: 'Structured Background' },
      { name: 'Audit Card White', hex: '#FFFFFF', role: 'Card Fill' },
      { name: 'Forest Seal', hex: '#047857', role: 'Verification Accent' },
      { name: 'Rule Slate', hex: '#94A3B8', role: 'Hairline Gridlines' }
    ]
  }
];

export const SAMPLE_TRANSPARENT_INVOICE = {
  invoiceNumber: 'KP-2026-0842',
  client: 'Midwest Alloys & Forgings Ltd. (SEBI Listed / EU Exporter)',
  date: '19 September 2026',
  items: [
    {
      type: 'Direct Work (Fee for Time & Deliverable)',
      service: 'Service 01 & 05: GHG Scope 1, 2, 3 Inventory + CBAM Pre-Audit Dossier',
      hoursOrBasis: 'Installation-level LCA & inventory modeling',
      governance: 'ISO 14064-1 & EU CBAM 2023/956',
      amount: '₹ 4,80,000'
    },
    {
      type: 'Facilitated Work (Disclosed Introduction Commission)',
      service: 'Service 09: Accredited EU CBAM Verifier Matching & Verification Oversight',
      hoursOrBasis: 'Direct contractual tie-in with accredited German DAkkS body',
      governance: 'Regulation (EU) 2018/2067 live registry verified',
      amount: 'Disclosed Facilitation: ₹ 45,000 (Payable by Verifier, Nil Client Markup)'
    }
  ],
  ethicalDeclaration: 'Kai Prakriti certifies that we hold zero ownership, voting rights, or internal audit governance in the verification body chosen. Verification is performed by a wholly independent entity.'
};
