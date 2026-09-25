import { BlogPost } from '../types';

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: 'SEBI BRSR Core Mandate: Why Enterprises Must Decouple GHG Accounting from Assurance',
    slug: 'sebi-brsr-core-decoupling-ghg-accounting-assurance',
    excerpt: 'Under SEBI LODR Regulation 34(2)(f), listed entities face mandatory reasonable assurance for BRSR Core attributes. Here is why using the same firm to calculate your metrics and verify them poses severe regulatory risks.',
    content: `The Securities and Exchange Board of India (SEBI) has established one of the world's most rigorous regulatory regimes for non-financial disclosures through the **Business Responsibility and Sustainability Reporting (BRSR) Core** framework.

### The Regulatory Backdrop
For the top listed entities on the National Stock Exchange (NSE) and Bombay Stock Exchange (BSE), compliance has shifted from voluntary reporting to statutory audit scrutiny. Nine specific ESG attributes—encompassing greenhouse gas intensity, water consumption, circular economy ratios, and fair living wages—must undergo **reasonable assurance**.

### The Conflict of Interest Trap
Many Indian conglomerates traditionally relied on single-vendor arrangements where a consulting firm calculated emissions and drafted the report, while an allied wing of the same entity issued an "independent verification letter." 

Under SEBI circular guidelines and international assurance standards (ISAE 3000 / ISO 14064-3):
1. **Self-Review Threat:** An assurance body cannot objectively test data schemas, emission factor models, or activity boundaries that its own consultants engineered.
2. **Statutory Penalties:** Filings flagged for conflict of interest face rejection by stock exchanges and reputational downgrades from global rating agencies (MSCI, DJSI, S&P Global).

### The Kai Prakriti Architecture
At Kai Prakriti, our charter enforces a **Zero Self-Audit Firewall**. We do the granular mathematical heavy-lifting—compiling raw utility bills, metering logs, logistics manifests, and supplier emissions into audit-proof workbooks. Once client data is locked and reconciled, we connect enterprises directly to independent, accredited assurance providers (BEE ACVA or ISO 14064-3 bodies) with zero undisclosed markups.`,
    author: 'Sushant Gangwar',
    authorRole: 'Head of ESG Advisory & Growth, Kai Prakriti',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    date: 'Sep 14, 2026',
    readTime: '6 min read',
    category: 'BRSR & SEBI',
    tags: ['SEBI', 'BRSR Core', 'ISAE 3000', 'Assurance', 'NGRBC'],
    mediumUrl: 'https://medium.com/@kaiprakriti/sebi-brsr-core-decoupling-ghg-accounting-from-assurance-2026',
    linkedinUrl: 'https://www.linkedin.com/pulse/sebi-brsr-core-mandate-why-enterprises-must-decouple-ghg-kai-prakriti',
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80',
    views: 3420,
    likes: 184,
    featured: true,
  },
  {
    id: 'post-2',
    title: 'EU CBAM 2026 Definitive Phase: How Indian Exporters Calculate Embedded Carbon',
    slug: 'eu-cbam-2026-definitive-phase-indian-exporters',
    excerpt: 'Regulation (EU) 2023/956 has transitioned from monitoring to direct financial liability. Discover the exact calculation formulas required for Indian steel, aluminium, and fertilizer shipments into Europe.',
    content: `The European Union's Carbon Border Adjustment Mechanism (CBAM) entered its definitive phase this year. For Indian manufacturers exporting iron, steel, aluminium, cement, hydrogen, and fertilizers, the grace period of quarterly estimates is over.

### What Has Changed in 2026?
European importers are now required to purchase **CBAM certificates** corresponding to the verified carbon price of embedded emissions in imported goods. 

If your Indian installation uses European default values, your European buyers face punitive carbon surcharges up to €95 per tonne of CO2e. Indian exporters with verified actual emissions enjoy a multi-million dollar price advantage.

### Key Computation Steps for Indian Steel Mills
- **Direct Emissions (Attributed):** Fuel consumption in blast furnaces, direct reduced iron (DRI) kilns, and ladle furnaces, calibrated against stoichiometric carbon balance equations.
- **Precursor Emissions:** Carbon embedded in raw iron ore pellets, pig iron, ferroalloys, and scrap.
- **Electricity Indirect Emissions:** Measured using sub-regional grid emission factors (Central Electricity Authority Baseline v19).

### Independent EU Accreditation Requirement
Under EU rules, the verification must be conducted by an accredited verifier under Commission Implementing Regulation (EU) 2018/2067 (DAkkS, RvA, or accredited European certifiers). Kai Prakriti prepares the complete MRV (Monitoring, Reporting, and Verification) dossier before facilitating the accredited audit.`,
    author: 'Ashutosh Rathor',
    authorRole: 'Brand & Technical Architecture, Kai Prakriti',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    date: 'Aug 28, 2026',
    readTime: '8 min read',
    category: 'EU CBAM',
    tags: ['CBAM', 'EU Regulation 2023/956', 'Steel Export', 'Embedded Carbon', 'MRV'],
    mediumUrl: 'https://medium.com/@kaiprakriti/eu-cbam-2026-definitive-phase-indian-exporters-guide',
    linkedinUrl: 'https://www.linkedin.com/pulse/eu-cbam-definitive-phase-embedded-carbon-calculations-kai-prakriti',
    coverImage: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=1200&auto=format&fit=crop&q=80',
    views: 2890,
    likes: 142,
    featured: true,
  },
  {
    id: 'post-3',
    title: 'Scope 3 Category 1 & 4 Calculations: Solving the Indian Supply Chain Data Deficit',
    slug: 'scope-3-category-1-4-indian-supply-chain',
    excerpt: 'Upstream purchased goods and transport often constitute over 70% of an industrial enterprise’s carbon footprint. Here is our hybrid spend-to-hybrid activity method tailored for Indian suppliers.',
    content: `Scope 3 emissions remain the most complex challenge for Indian CFOs and Chief Sustainability Officers. While Scope 1 (furnaces, company vehicles) and Scope 2 (grid electricity) can be metered with precision, Category 1 (Purchased Goods and Services) involves thousands of Tier-1 and Tier-2 suppliers.

### The Spend-Based Fallacy
Early ESG reports relied heavily on EEIO (Environmentally Extended Input-Output) spend-based factors. However, calculating emissions simply by multiplying procurement spend (in INR) by generic industry factors yields erratic results due to inflation, currency swings, and commodity price spikes.

### The Kai Prakriti Hybrid Architecture
We deploy a progressive three-tier data hierarchy:
1. **Tier 1 (High Spend / High Carbon Suppliers):** Direct primary energy and emission surveys with automated data validation.
2. **Tier 2 (Material Bill of Quantities):** Physical mass multipliers based on cradle-to-gate LCA databases (Ecoinvent, Gabi) localized for Indian blast furnace and coal-heavy industrial processes.
3. **Tier 3 (Residual Spend):** Inflation-adjusted economic emission factors with conservative confidence bounds.

This granular breakdown provides immediate actionable insights for sustainable procurement without alienating vital SME suppliers.`,
    author: 'Sushant Gangwar',
    authorRole: 'Head of ESG Advisory & Growth, Kai Prakriti',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    date: 'Aug 11, 2026',
    readTime: '5 min read',
    category: 'Scope 1-3 GHG',
    tags: ['Scope 3', 'GHG Protocol', 'Supply Chain', 'LCA', 'Decarbonization'],
    mediumUrl: 'https://medium.com/@kaiprakriti/scope-3-category-1-and-4-indian-supply-chain-solutions',
    linkedinUrl: 'https://www.linkedin.com/pulse/solving-the-indian-scope-3-supply-chain-deficit-kai-prakriti',
    coverImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&auto=format&fit=crop&q=80',
    views: 1980,
    likes: 96,
  },
  {
    id: 'post-4',
    title: 'MSME ZED Bronze vs. Gold: How Tier-1 Indian Vendors Win Global Supply Contracts',
    slug: 'msme-zed-bronze-vs-gold-tier-1-vendors',
    excerpt: 'The Zero Defect Zero Effect (ZED) scheme by QCI and the Ministry of MSME provides up to 80% government subsidies. Learn how to navigate the 20 parameters to secure Gold certification.',
    content: `The Ministry of MSME’s revamped ZED (Zero Defect Zero Effect) scheme is transforming Indian vendor qualification. Global OEMs (including Toyota, Bosch, Siemens, and Tata Motors) are increasingly requiring ZED ratings as mandatory procurement criteria.

### The Three Tiers of ZED
- **Bronze (5 Parameters):** Quality management, safety, energy conservation, waste management, and environment stewardship.
- **Silver (14 Parameters):** Adds daily work management, calibration, measurement systems, preventive maintenance, and natural resource stewardship.
- **Gold (20 Parameters):** Comprehensive enterprise benchmarking, life cycle assessment principles, CSR, supply chain transparency, and advanced technology adoption.

### Financial Subsidies & Benefits
- Micro enterprises receive up to **80% subsidy** on certification and assessment costs.
- Small enterprises receive **60% subsidy**; Medium enterprises receive **50%**.
- Commercial banks offer preferential credit ratings and concession on processing fees for ZED Gold certified plants.

Kai Prakriti guides MSME leadership through the gap analysis, documentation, and mock assessment before handing over the audit file to Quality Council of India (QCI) accredited desktop and on-site assessors.`,
    author: 'Ashutosh Rathor',
    authorRole: 'Brand & Technical Architecture, Kai Prakriti',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    date: 'Jul 22, 2026',
    readTime: '6 min read',
    category: 'MSME ZED',
    tags: ['MSME', 'ZED Scheme', 'QCI', 'Zero Defect Zero Effect', 'OEM Procurement'],
    mediumUrl: 'https://medium.com/@kaiprakriti/msme-zed-bronze-vs-gold-tier-1-vendors-guide',
    linkedinUrl: 'https://www.linkedin.com/pulse/msme-zed-certification-how-tier-1-vendors-win-global-contracts',
    coverImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&auto=format&fit=crop&q=80',
    views: 1650,
    likes: 88,
  }
];
