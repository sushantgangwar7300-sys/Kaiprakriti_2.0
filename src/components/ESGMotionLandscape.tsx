import React, { useState, useEffect } from 'react';

interface ESGMotionLandscapeProps {
  className?: string;
  enableLeaves?: boolean;
}

export const ESGMotionLandscape: React.FC<ESGMotionLandscapeProps> = ({
  className = '',
  enableLeaves = true,
}) => {
  // Pre-calculated deterministic leaves properties to avoid hydration mismatches
  const leaves = [
    { id: 1, left: '5%', delay: '0s', duration: '18s', size: 14, opacity: 0.65 },
    { id: 2, left: '12%', delay: '4s', duration: '22s', size: 18, opacity: 0.5 },
    { id: 3, left: '19%', delay: '8s', duration: '16s', size: 12, opacity: 0.7 },
    { id: 4, left: '26%', delay: '2s', duration: '24s', size: 16, opacity: 0.45 },
    { id: 5, left: '34%', delay: '6s', duration: '19s', size: 13, opacity: 0.6 },
    { id: 6, left: '42%', delay: '1s', duration: '15s', size: 17, opacity: 0.55 },
    { id: 7, left: '51%', delay: '9s', duration: '21s', size: 15, opacity: 0.5 },
    { id: 8, left: '58%', delay: '3s', duration: '17s', size: 12, opacity: 0.7 },
    { id: 9, left: '66%', delay: '7s', duration: '23s', size: 18, opacity: 0.4 },
    { id: 10, left: '74%', delay: '5s', duration: '14s', size: 13, opacity: 0.65 },
    { id: 11, left: '81%', delay: '11s', duration: '20s', size: 16, opacity: 0.5 },
    { id: 12, left: '88%', delay: '2.5s', duration: '16s', size: 14, opacity: 0.6 },
    { id: 13, left: '94%', delay: '8.5s', duration: '22s', size: 15, opacity: 0.55 },
    { id: 14, left: '98%', delay: '4.5s', duration: '19s', size: 12, opacity: 0.7 },
  ];

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none z-0 overflow-hidden select-none ${className}`}
    >
      <style>{`
        /* Continuous Wind Turbine Linear Rotations */
        @keyframes turbine-spin-fast {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes turbine-spin-mid {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes turbine-spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .turbine-blade-1 {
          transform-origin: 320px 220px;
          animation: turbine-spin-fast 5.5s linear infinite;
        }
        .turbine-blade-2 {
          transform-origin: 780px 185px;
          animation: turbine-spin-mid 6.5s linear infinite;
        }
        .turbine-blade-3 {
          transform-origin: 1240px 240px;
          animation: turbine-spin-slow 7.0s linear infinite;
        }

        /* Ambient Sun Pulse (8s ease-in-out scale 1.0 -> 1.12, opacity 0.6 -> 0.8) */
        @keyframes ambient-sun-pulse {
          0%, 100% {
            transform: scale(1.0);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.12);
            opacity: 0.8;
          }
        }
        .ambient-sun-element {
          transform-origin: center center;
          animation: ambient-sun-pulse 8s ease-in-out infinite;
        }

        /* Floating Falling Leaves (Diagonal translation 12vw, 540deg soft rotation) */
        @keyframes falling-leaf {
          0% {
            transform: translateY(-20px) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(calc(100% + 40px)) translateX(12vw) rotate(540deg);
            opacity: 0;
          }
        }
        .esg-floating-leaf {
          animation-name: falling-leaf;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform, opacity;
        }

        /* Accessibility: Strict prefers-reduced-motion pause overrides */
        @media (prefers-reduced-motion: reduce) {
          .turbine-blade-1,
          .turbine-blade-2,
          .turbine-blade-3,
          .ambient-sun-element,
          .esg-floating-leaf {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* 1. Ambient Sun Pulse in Top-Right Sky */}
      <div className="absolute -top-12 -right-12 sm:top-4 sm:right-24 w-80 h-80 sm:w-96 sm:h-96 pointer-events-none">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <defs>
            <radialGradient id="esg-sun-gradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#E99F4C" stopOpacity="0.35" />
              <stop offset="45%" stopColor="#E99F4C" stopOpacity="0.12" />
              <stop offset="75%" stopColor="#3E6B48" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#FAF8F5" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle
            cx="200"
            cy="200"
            r="180"
            fill="url(#esg-sun-gradient)"
            className="ambient-sun-element"
          />
        </svg>
      </div>

      {/* 2. Floating ESG Leaves (14 items, diagonal translation + 540deg rotation) */}
      {enableLeaves && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {leaves.map((leaf) => (
            <div
              key={leaf.id}
              className="esg-floating-leaf absolute top-0"
              style={{
                left: leaf.left,
                animationDelay: leaf.delay,
                animationDuration: leaf.duration,
                opacity: leaf.opacity,
              }}
            >
              <svg
                width={leaf.size}
                height={leaf.size}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.5 4.5C11.5 4.5 5 9.5 5 18.5C14 18.5 19 12 19 6C19 5.5 18.5 4.5 17.5 4.5Z"
                  fill="#3E6B48"
                  fillOpacity="0.45"
                  stroke="#264143"
                  strokeWidth="0.8"
                  strokeOpacity="0.3"
                />
                <path
                  d="M5 18.5C9 14.5 13.5 10 17.5 4.5"
                  stroke="#FAF8F5"
                  strokeWidth="0.8"
                  strokeOpacity="0.6"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          ))}
        </div>
      )}

      {/* 3. Ambient Fixed Background Landscape with Rolling Hills & 3 Wind Turbines */}
      <div className="absolute bottom-0 left-0 right-0 w-full h-44 sm:h-64 pointer-events-none opacity-40">
        <svg
          viewBox="0 0 1600 360"
          preserveAspectRatio="none"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="hill-back" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#A2B997" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#FAF8F5" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="hill-front" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#527E5C" stopOpacity="0.20" />
              <stop offset="100%" stopColor="#FAF8F5" stopOpacity="0.08" />
            </linearGradient>
          </defs>

          {/* Distant Ridge (Dual-Tone Sage Green Layer 1) */}
          <path
            d="M0,190 C320,130 540,240 850,160 C1160,80 1380,210 1600,170 L1600,360 L0,360 Z"
            fill="url(#hill-back)"
          />

          {/* Wind Turbine 1 (X=320, Y=220, Duration=5.5s) */}
          <g className="turbine-group-1">
            {/* Mast */}
            <line x1="320" y1="220" x2="320" y2="310" stroke="#3E6B48" strokeWidth="2.2" strokeOpacity="0.6" />
            <circle cx="320" cy="220" r="3.5" fill="#264143" fillOpacity="0.7" />
            {/* 3 Blades */}
            <g className="turbine-blade-1">
              <path d="M320,220 C320,200 323,175 320,165 C317,175 320,200 320,220 Z" fill="#3E6B48" fillOpacity="0.65" />
              <path d="M320,220 C337,230 358,243 368,247 C359,239 338,227 320,220 Z" fill="#3E6B48" fillOpacity="0.65" />
              <path d="M320,220 C303,230 282,243 272,247 C281,239 302,227 320,220 Z" fill="#3E6B48" fillOpacity="0.65" />
            </g>
          </g>

          {/* Wind Turbine 2 (X=780, Y=185, Duration=6.5s) */}
          <g className="turbine-group-2">
            <line x1="780" y1="185" x2="780" y2="295" stroke="#3E6B48" strokeWidth="2.4" strokeOpacity="0.6" />
            <circle cx="780" cy="185" r="4" fill="#264143" fillOpacity="0.7" />
            <g className="turbine-blade-2">
              <path d="M780,185 C780,162 783,135 780,120 C777,135 780,162 780,185 Z" fill="#3E6B48" fillOpacity="0.65" />
              <path d="M780,185 C800,196 825,212 837,217 C826,207 801,193 780,185 Z" fill="#3E6B48" fillOpacity="0.65" />
              <path d="M780,185 C760,196 735,212 723,217 C734,207 759,193 780,185 Z" fill="#3E6B48" fillOpacity="0.65" />
            </g>
          </g>

          {/* Wind Turbine 3 (X=1240, Y=240, Duration=7.0s) */}
          <g className="turbine-group-3">
            <line x1="1240" y1="240" x2="1240" y2="330" stroke="#3E6B48" strokeWidth="2.0" strokeOpacity="0.55" />
            <circle cx="1240" cy="240" r="3.2" fill="#264143" fillOpacity="0.7" />
            <g className="turbine-blade-3">
              <path d="M1240,240 C1240,222 1243,198 1240,188 C1237,198 1240,222 1240,240 Z" fill="#3E6B48" fillOpacity="0.6" />
              <path d="M1240,240 C1256,249 1275,261 1285,264 C1276,257 1257,246 1240,240 Z" fill="#3E6B48" fillOpacity="0.6" />
              <path d="M1240,240 C1224,249 1205,261 1195,264 C1204,257 1223,246 1240,240 Z" fill="#3E6B48" fillOpacity="0.6" />
            </g>
          </g>

          {/* Near Rolling Hill (Dual-Tone Sage Green Layer 2) */}
          <path
            d="M0,240 C280,260 510,190 790,230 C1080,270 1340,195 1600,225 L1600,360 L0,360 Z"
            fill="url(#hill-front)"
          />
        </svg>
      </div>
    </div>
  );
};

/**
 * 4. Kinetic Typography: Word Rotation & Marker Highlight
 */
interface KineticHeroTickerProps {
  phrases?: string[];
  intervalMs?: number;
  highlightWord?: string;
  className?: string;
}

export const KineticHeroTicker: React.FC<KineticHeroTickerProps> = ({
  phrases = [
    'BRSR Core Assurance',
    'Scope 1–3 GHG Accounting',
    'EU CBAM Verification Readiness',
    'ISO 14044 Life Cycle Assessment',
    'ZED MSME Gold Certification',
  ],
  intervalMs = 3200,
  className = '',
}) => {
  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % phrases.length);
        setIsTransitioning(false);
      }, 300);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [phrases.length, intervalMs]);

  return (
    <span
      className={`inline-block relative overflow-hidden align-baseline ${className}`}
      style={{ minHeight: '1.25em' }}
    >
      <style>{`
        /* Word Rotation: Vertical slide-and-fade ticker with cubic-bezier(0.16, 1, 0.3, 1) over 0.6s */
        .kinetic-phrase-enter {
          animation: phrase-slide-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes phrase-slide-in {
          0% {
            opacity: 0;
            transform: translateY(22px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .kinetic-phrase-enter {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
      <span
        key={index}
        className={`kinetic-phrase-enter inline-block text-[#D96846] font-serif font-bold ${
          isTransitioning ? 'opacity-0 translate-y-2' : ''
        }`}
      >
        {phrases[index]}
      </span>
    </span>
  );
};

/**
 * Text Highlight: Subtle marker-pen brush sweep expanding horizontal background-size from 0% to 100%
 */
interface KineticTextHighlightProps {
  children: React.ReactNode;
  color?: string;
  delayMs?: number;
  className?: string;
}

export const KineticTextHighlight: React.FC<KineticTextHighlightProps> = ({
  children,
  color = 'rgba(233, 159, 76, 0.28)',
  delayMs = 200,
  className = '',
}) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setActive(true), delayMs);
    return () => clearTimeout(timeout);
  }, [delayMs]);

  return (
    <span
      className={`inline relative bg-no-repeat transition-[background-size] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${className}`}
      style={{
        backgroundImage: `linear-gradient(120deg, ${color} 0%, ${color} 100%)`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '0% 90%',
        backgroundSize: active ? '100% 38%' : '0% 38%',
      }}
    >
      {children}
    </span>
  );
};
