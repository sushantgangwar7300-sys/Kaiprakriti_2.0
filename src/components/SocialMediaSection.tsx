import React from 'react';
import { ExternalLink, BookOpen, Linkedin, Instagram, Facebook } from 'lucide-react';

interface SocialMediaSectionProps {
  theme?: string;
  mode?: string;
}

export const SocialMediaSection: React.FC<SocialMediaSectionProps> = () => {
  const socialChannels = [
    {
      name: 'Medium',
      handle: '@kaiprakriti',
      subtitle: 'Long-Form Regulatory Essays & Carbon Methodologies',
      description: 'We syndicate our research papers on Medium. Read detailed breakdowns on SEBI BRSR Core, EU CBAM mathematical derivations, and MSME ZED implementation frameworks.',
      icon: BookOpen,
      badgeText: 'Primary Essay Publication',
      badgeColor: 'bg-[#3E6B48]/10 text-[#3E6B48] border-[#3E6B48]/30',
      actionText: 'Read On Medium',
      url: 'https://medium.com/@kaiprakriti',
    },
    {
      name: 'LinkedIn',
      handle: 'Kai Prakriti ESG Advisory',
      subtitle: 'Official Enterprise Network & Advisory Updates',
      description: 'Follow our executive regulatory briefings for CSOs, CFOs, and ESG committees. Get notifications when SEBI, BEE, or the EU Commission issue new compliance circulars.',
      icon: Linkedin,
      badgeText: 'Executive Regulatory Alert',
      badgeColor: 'bg-[#264143]/10 text-[#264143] border-[#264143]/30',
      actionText: 'Connect on LinkedIn',
      url: 'https://www.linkedin.com/company/kai-prakriti',
    },
    {
      name: 'Instagram',
      handle: '@kaiprakriti',
      subtitle: 'Visual Sustainability & Prakriti Design Philosophy',
      description: 'Infographics explaining complex environmental standards, field site audits at steel and chemical plants, and the roots of circular economy (प्रकृति-सतत-विकासः).',
      icon: Instagram,
      badgeText: 'Visual Infographics',
      badgeColor: 'bg-[#D96846]/10 text-[#D96846] border-[#D96846]/30',
      actionText: 'Follow on Instagram',
      url: 'https://instagram.com/kaiprakriti',
    },
    {
      name: 'Facebook',
      handle: 'Kai Prakriti Sustainability Community',
      subtitle: 'MSME Decarbonization Forum & Supplier Networks',
      description: 'A collaborative forum for Indian manufacturers, exporters, and engineering vendors discussing green public procurement, MSME ZED subsidies, and tier-1 vendor audits.',
      icon: Facebook,
      badgeText: 'MSME Supplier Group',
      badgeColor: 'bg-[#3E6B48]/10 text-[#3E6B48] border-[#3E6B48]/30',
      actionText: 'Join Discussion',
      url: 'https://facebook.com/kaiprakriti',
    },
  ];

  return (
    <section className="pt-12 border-t border-[#E7E3DC] space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-[#3E6B48] uppercase tracking-wider">
            Public Syndication
          </span>
          <h3 className="font-serif text-2xl font-bold text-[#264143]">
            Follow Kai Prakriti on Social Channels
          </h3>
          <p className="text-xs sm:text-sm text-[#264143]/70 mt-1">
            Read our published articles on Medium or follow our LinkedIn regulatory dispatches.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {socialChannels.map((channel) => {
          const Icon = channel.icon;
          return (
            <div
              key={channel.name}
              className="p-6 rounded-3xl border border-[#E7E3DC] bg-white shadow-2xs space-y-4 hover:border-[#D96846] transition-colors flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#FAF8F5] border border-[#E7E3DC] flex items-center justify-center text-[#264143]">
                      <Icon className="w-5 h-5 text-[#D96846]" />
                    </div>
                    <div>
                      <h4 className="font-serif text-base font-bold text-[#264143]">
                        {channel.name}
                      </h4>
                      <span className="text-xs text-[#264143]/60">{channel.handle}</span>
                    </div>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${channel.badgeColor}`}>
                    {channel.badgeText}
                  </span>
                </div>

                <p className="text-xs text-[#264143]/75 leading-relaxed">
                  {channel.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E7E3DC]">
                <a
                  href={channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D96846] hover:text-[#C45737]"
                >
                  <span>{channel.actionText}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
