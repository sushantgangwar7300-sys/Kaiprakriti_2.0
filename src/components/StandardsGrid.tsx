import React from 'react';
import { GOVERNED_STANDARDS } from '../data/consultancyData';
import { ShieldCheck, BookMarked, Award, Landmark } from 'lucide-react';

interface StandardsGridProps {
  theme?: string;
}

export const StandardsGrid: React.FC<StandardsGridProps> = () => {
  return (
    <section className="py-14 px-4 sm:px-6 border-y border-slate-800">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 font-mono text-xs font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-300">
            <Landmark className="w-3.5 h-3.5 text-emerald-400" />
            <span>STATUTORY TAXONOMIES & MANDATES</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Governed Standards We Operate Under
          </h2>

          <p className="text-slate-300 text-sm sm:text-base font-light">
            Every GHG inventory calculation, organizational boundary definition, and verifier facilitation strictly adheres to statutory authorities and global standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GOVERNED_STANDARDS.map((std) => (
            <div
              key={std.id}
              className="p-6 rounded-2xl border border-slate-800 bg-[#0B1120] text-slate-100 shadow-lg transition-all duration-300 hover:border-emerald-500/50 hover:shadow-emerald-500/5 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-emerald-300">
                  {std.code}
                </span>
                <span className="font-mono text-[10px] uppercase text-slate-400">
                  {std.status}
                </span>
              </div>

              <div>
                <h3 className="font-serif text-lg font-bold text-white">
                  {std.name}
                </h3>
                <div className="font-mono text-xs text-emerald-400 font-semibold mt-0.5">
                  Authority: {std.authority}
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-light">
                {std.keyRequirement}
              </p>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between font-mono text-[11px] text-slate-400">
                <span>Statutory Scope:</span>
                <span className="text-slate-200 font-medium truncate max-w-[200px]" title={std.scope}>{std.scope}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
