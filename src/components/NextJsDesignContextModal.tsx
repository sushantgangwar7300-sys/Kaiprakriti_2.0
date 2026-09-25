import React, { useState } from 'react';
import { X, Copy, Check, FileCode, Layers, ShieldCheck, Sparkles, Terminal, BookOpen, ExternalLink } from 'lucide-react';

interface NextJsDesignContextModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NextJsDesignContextModal: React.FC<NextJsDesignContextModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, sectionId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionId);
    setTimeout(() => setCopiedSection(null), 2500);
  };

  const tailwindConfigSnippet = `// tailwind.config.ts (For Next.js App Router on kaiprakriti.com)
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sovereign: {
          950: "#060A14", // Deepest institutional background
          900: "#0B1120", // Card and container background
          850: "#0E1626", // Elevated surfaces & tables
          800: "#1E293B", // Ruling dividers and borders
        },
        electric: {
          emerald: "#10E7B2", // Sovereign Mint/Emerald for primary CTA
          teal: "#059669",
          cyan: "#06B6D4",    // Scope 2 & EU CBAM secondary accent
          gold: "#F59E0B",    // Statutory verification seal & BEE ACVA
        }
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        mono: ["var(--font-ibm-plex-mono)", "monospace"],
        sans: ["var(--font-plus-jakarta-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;`;

  const nextAppRouterStructure = `kaiprakriti-nextjs/
├── app/
│   ├── layout.tsx              # Root Layout: fonts (Fraunces, IBM Plex Mono), Navbar, Footer
│   ├── page.tsx                # Home: Hero (with reflective underline), 3D Leaf, ESG Estimator, Two-line split
│   ├── about/
│   │   └── page.tsx            # Brand heritage, Zero Self-Audit Firewall, Verifier network (BEE, DAkkS)
│   ├── services/
│   │   └── page.tsx            # The 11 Governed Services + Interactive Scope Calculator
│   ├── blog/
│   │   ├── page.tsx            # Knowledge repository, search, filter, Medium syndication links
│   │   └── [slug]/page.tsx     # Full article reader with reading time and citation notes
│   ├── contact/
│   │   └── page.tsx            # Corporate inquiry form, boundary setup, Supabase leads integration
│   ├── admin/
│   │   ├── login/page.tsx      # Admin authentication
│   │   └── dashboard/page.tsx  # Google Analytics 4 overview, Supabase lead table, Blog CRUD
│   └── api/
│       ├── leads/route.ts      # Server-side Supabase lead ingestion
│       └── gemini/route.ts     # ESG Copilot AI assistant endpoint
├── components/
│   ├── Navbar.tsx              # Institutional top bar, statutory badge, responsive mobile drawer
│   ├── Footer.tsx              # Statutory disclosures, Ashutosh Rathor (Dev) & Sushant Gangwar (Mgmt)
│   ├── Interactive3DLeaf.tsx   # Lightweight Three.js canvas with responsive non-overlapping layout
│   ├── ESGImpactEstimator.tsx  # Mathematical calculator (Scope 1, 2, 3 + CBAM savings)
│   └── KaiPrakritiEmblem.tsx   # SVG Sovereign Emblem with nature & growth symbolism
└── lib/
    ├── supabaseClient.ts       # Supabase client singleton
    └── esgCalculations.ts      # CEA Grid emission factors & CBAM cost avoidance logic`;

  const esgFormulaSnippet = `// lib/esgCalculations.ts (Mathematical Logic for ESG Estimator)
// CEA CO2 Baseline Database Ver 20.0 (Indian National Grid default: 0.716 kg CO2e / kWh = 0.716 tCO2e / MWh)
export const CEA_GRID_EMISSION_FACTOR = 0.716; // tCO2e per MWh

// Diesel combustion factor: 1 kL (1,000 Liters) diesel = ~2.68 tCO2e
export const DIESEL_EMISSION_FACTOR_PER_KL = 2.68;

// EU CBAM benchmark carbon certificate price estimate (~€85/tCO2e ≈ ₹7,650/tCO2e)
export const CBAM_CERTIFICATE_PRICE_INR = 7650;

// BEE CCTS Carbon Credit trading floor value estimate (~₹1,800/tCO2e)
export const BEE_CCTS_CREDIT_PRICE_INR = 1800;

export function calculateFootprint(inputs: {
  electricityMWh: number;
  dieselLitres: number;
  supplySpendCrores: number;
  scope3FactorPerCr: number;
}) {
  const scope1 = Math.round((inputs.dieselLitres * 2.68) / 1000);
  const scope2 = Math.round(inputs.electricityMWh * CEA_GRID_EMISSION_FACTOR);
  const scope3 = Math.round(inputs.supplySpendCrores * inputs.scope3FactorPerCr);
  return { scope1, scope2, scope3, total: scope1 + scope2 + scope3 };
}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl my-auto rounded-2xl sm:rounded-3xl border border-slate-700 bg-[#0B1120] text-slate-100 shadow-2xl p-4 sm:p-8 space-y-5 sm:space-y-6 max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4 sm:pb-5 gap-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 font-mono text-xs">
              <Terminal className="w-3.5 h-3.5" />
              <span>Next.js Architecture Context for kaiprakriti.com</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Next.js Migration & Design System Guide
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Complete specifications, directory hierarchy, Tailwind tokens, and calculation logic ready to copy directly into your production Next.js repository.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section 1: Next.js App Router Structure */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <FileCode className="w-4 h-4" />
              <span>1. Next.js (App Router) Directory Map</span>
            </h3>
            <button
              onClick={() => copyToClipboard(nextAppRouterStructure, 'structure')}
              className="px-2.5 py-1 rounded-lg border border-slate-700 text-xs font-mono flex items-center gap-1 text-slate-300 hover:text-white hover:bg-slate-800"
            >
              {copiedSection === 'structure' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Map</span>
                </>
              )}
            </button>
          </div>
          <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto leading-relaxed">
            {nextAppRouterStructure}
          </pre>
        </div>

        {/* Section 2: Tailwind Color Palette Tokens */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <Layers className="w-4 h-4" />
              <span>2. Sovereign Electric Tailwind Config (`tailwind.config.ts`)</span>
            </h3>
            <button
              onClick={() => copyToClipboard(tailwindConfigSnippet, 'tailwind')}
              className="px-2.5 py-1 rounded-lg border border-slate-700 text-xs font-mono flex items-center gap-1 text-slate-300 hover:text-white hover:bg-slate-800"
            >
              {copiedSection === 'tailwind' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Config</span>
                </>
              )}
            </button>
          </div>
          <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto leading-relaxed">
            {tailwindConfigSnippet}
          </pre>
        </div>

        {/* Section 3: ESG Estimator Mathematical Calculations */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>3. Statutory Calculation Library (`lib/esgCalculations.ts`)</span>
            </h3>
            <button
              onClick={() => copyToClipboard(esgFormulaSnippet, 'formulas')}
              className="px-2.5 py-1 rounded-lg border border-slate-700 text-xs font-mono flex items-center gap-1 text-slate-300 hover:text-white hover:bg-slate-800"
            >
              {copiedSection === 'formulas' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Formulas</span>
                </>
              )}
            </button>
          </div>
          <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto leading-relaxed">
            {esgFormulaSnippet}
          </pre>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <span className="font-mono text-xs text-slate-400">
            For live deployment at <strong className="text-emerald-400">kaiprakriti.com</strong>
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-md"
          >
            Close Guide
          </button>
        </div>

      </div>
    </div>
  );
};
