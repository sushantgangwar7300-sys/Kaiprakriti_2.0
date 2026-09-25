import React from 'react';
import { PageId } from '../types';
import { ShieldCheck, Award, Users, ArrowRight, ExternalLink, HeartHandshake, Sparkles, CheckCircle2, Mail } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const leadership = [
    {
      name: 'Ashutosh Rathor',
      role: 'Brand & Technical Architecture',
      bio: 'Architected the brand identity, computational standards taxonomy, and digital verification interfaces for Kai Prakriti. Focused on mathematical legibility of environmental data and digital MRV pipelines.',
      portfolioUrl: 'https://ashutoshrathor.me',
      image: '/src/assets/images/about_collaboration_1790157990288.jpg',
    },
    {
      name: 'Sushant Gangwar',
      role: 'Operations & Advisory Management',
      bio: 'Leads statutory compliance strategy, client advisory management, and institutional verifier partnerships across BEE, SEBI BRSR, and EU CBAM frameworks for Indian corporate exporters.',
      linkedinUrl: 'https://www.linkedin.com/in/sushant-gangwar-761a2921b/',
      image: '/src/assets/images/hero_consulting_team_1790157974785.jpg',
    },
    {
      name: 'Dr. Alok Vardhan',
      role: 'Chief Environmental Scientist',
      bio: 'Former technical member of industrial energy audit committees with 18+ years in thermal emissions modeling, stoichiometric LCA, and CEA sub-regional grid emission factors.',
      image: '/src/assets/images/industrial_transition_1790158017099.jpg',
    },
    {
      name: 'Meenakshi Iyer',
      role: 'Lead Regulatory & BRSR Specialist',
      bio: 'Chartered Corporate Secretary and sustainability reporting lead advising NSE/BSE listed boards on SEBI LODR Regulation 34(2)(f) and supply chain assurance trails.',
      image: '/src/assets/images/sustainable_enterprise_1790158004490.jpg',
    },
  ];

  const values = [
    {
      title: 'Integrity by Design',
      desc: 'We never verify our own calculations. Direct preparation and independent audit remain strictly separated on two transparent invoices.',
    },
    {
      title: 'Empirical Precision',
      desc: 'No vague industry averages. Every carbon baseline is built on primary utility records, fuel test receipts, and live formula workbooks.',
    },
    {
      title: 'Founder-Led Immersion',
      desc: 'We embed directly with your plant managers, engineers, and finance teams to solve complex compliance requirements with zero junior handoffs.',
    },
  ];

  return (
    <div className="bg-[#FAF8F5] text-[#264143] min-h-screen">
      
      {/* 1. Header (Relaxed, Environmental Aesthetic) */}
      <section className="pt-10 pb-10 sm:pt-16 sm:pb-16 border-b border-[#E7E3DC] bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#3E6B48] uppercase tracking-wider bg-[#3E6B48]/10 px-3.5 py-1.5 rounded-full border border-[#3E6B48]/20">
            <span className="w-2 h-2 rounded-full bg-[#D96846]" />
            <span>About Kai Prakriti</span>
          </div>

          <h1 className="font-serif text-2xl sm:text-5xl font-bold tracking-tight text-[#264143]">
            Sovereign science, empirical data, and uncompromised ethics.
          </h1>

          <p className="text-xs sm:text-base text-[#264143]/75 font-normal max-w-2xl mx-auto leading-relaxed">
            Founded to eliminate greenwashing and self-audit conflicts of interest in Indian corporate sustainability, Kai Prakriti delivers quantitative precision designed to withstand statutory audits.
          </p>
        </div>
      </section>

      {/* 2. Philosophy & Two-Line Firewall */}
      <section className="py-10 sm:py-16 bg-[#FAF8F5]">
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
                  className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-semibold bg-[#D96846] hover:bg-[#C45737] text-white inline-flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <span>Connect with our leadership</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-3 sm:space-y-4">
              {values.map((val, idx) => (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-[#E7E3DC] bg-white shadow-2xs space-y-1.5 sm:space-y-2"
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

      {/* 3. Leadership Team (Ashutosh Rathor & Sushant Gangwar) */}
      <section className="py-12 sm:py-20 bg-white border-t border-[#E7E3DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2 sm:space-y-3">
            <span className="text-xs font-semibold text-[#3E6B48] uppercase tracking-wider">
              Our Core Leadership
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#264143] tracking-tight">
              Direct engineering by committed practitioners.
            </h2>
            <p className="text-xs sm:text-sm text-[#264143]/75 leading-relaxed">
              We work directly with leadership and plant teams with zero junior handoffs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {leadership.map((member, idx) => (
              <div
                key={idx}
                className="rounded-2xl sm:rounded-3xl border border-[#E7E3DC] bg-[#FAF8F5] overflow-hidden flex flex-col justify-between"
              >
                <div className="p-4 sm:p-6 space-y-3">
                  <div className="aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100 mb-3 border border-[#E7E3DC]">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  <div>
                    <h3 className="font-serif text-base font-bold text-[#264143]">
                      {member.name}
                    </h3>
                    <p className="text-xs font-semibold text-[#3E6B48]">
                      {member.role}
                    </p>
                    <p className="text-xs text-[#264143]/70 leading-relaxed pt-2">
                      {member.bio}
                    </p>
                  </div>
                </div>

                <div className="p-4 sm:p-6 pt-0 border-t border-[#E7E3DC] mt-2">
                  {member.portfolioUrl && (
                    <a
                      href={member.portfolioUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D96846] hover:underline"
                    >
                      <span>Portfolio Website</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  {member.linkedinUrl && (
                    <a
                      href={member.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#264143] hover:underline"
                    >
                      <span>LinkedIn Profile</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Contact / CTA Banner */}
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
        </div>
      </section>

    </div>
  );
};
