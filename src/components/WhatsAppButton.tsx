import React from 'react';

export const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="0"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.04 7.23C8.84 7.23 8.5 7.3 8.22 7.6C7.94 7.9 7.15 8.64 7.15 10.15C7.15 11.66 8.25 13.11 8.4 13.31C8.55 13.51 10.55 16.6 13.62 17.92C14.35 18.23 14.92 18.42 15.37 18.57C16.1 18.8 16.77 18.77 17.3 18.69C17.89 18.6 19.11 17.95 19.37 17.23C19.62 16.5 19.62 15.88 19.55 15.75C19.47 15.62 19.28 15.54 18.98 15.4C18.69 15.25 17.25 14.54 16.98 14.44C16.71 14.34 16.52 14.29 16.32 14.59C16.13 14.88 15.55 15.54 15.37 15.75C15.2 15.95 15.02 15.98 14.73 15.83C14.43 15.69 13.49 15.38 12.38 14.39C11.51 13.61 10.92 12.65 10.77 12.36C10.63 12.07 10.75 11.91 10.9 11.76C11.03 11.63 11.2 11.41 11.35 11.24C11.5 11.07 11.55 10.95 11.65 10.75C11.75 10.55 11.7 10.38 11.63 10.23C11.55 10.08 10.97 8.65 10.73 8.07C10.5 7.51 10.26 7.58 10.08 7.58C9.9 7.57 9.7 7.57 9.5 7.57C9.3 7.57 9.04 7.23 9.04 7.23Z" />
  </svg>
);

export const WHATSAPP_PHONE_DISPLAY = '+91 7300513512';
export const WHATSAPP_PHONE_RAW = '917300513512';
export const WHATSAPP_URL = 'https://wa.me/917300513512?text=Hi';

export const WhatsAppFloatingButton: React.FC = () => {
  return (
    <aside
      aria-label="Direct WhatsApp Contact"
      className="fixed bottom-6 left-6 z-50 flex items-center group select-none"
    >
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with Kai Prakriti (+91 7300513512)"
        className="relative flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20BD5A] text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-[0_8px_25px_rgba(37,211,102,0.45)] hover:shadow-[0_12px_32px_rgba(37,211,102,0.6)] active:scale-95 transition-all duration-300 border-2 border-white/30"
      >
        {/* Pulsing beacon indicator */}
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-300 border-2 border-[#25D366]" />
        </span>

        <WhatsAppIcon className="w-6 h-6 fill-white shrink-0" />
        
        <div className="hidden sm:flex flex-col text-left leading-tight pr-1">
          <span className="text-[10px] font-medium text-white/90 uppercase tracking-wider">Direct WhatsApp</span>
          <span className="text-xs font-bold tracking-tight text-white">+91 7300513512</span>
        </div>

        {/* Hover Tooltip for mobile / desktop expanding hint */}
        <span className="absolute left-full ml-3 px-3 py-1.5 bg-neutral-900 text-white text-xs font-semibold rounded-xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 shadow-lg border border-neutral-700 hidden lg:block">
          Click to start chat with &quot;Hi&quot;
        </span>
      </a>
    </aside>
  );
};
