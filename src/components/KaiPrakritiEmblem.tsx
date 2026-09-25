import React from 'react';

interface KaiPrakritiEmblemProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | number;
  className?: string;
  theme?: 'verdant' | 'relax' | 'editorial';
  variant?: 'full' | 'icon';
  circularBorder?: boolean;
  withBackground?: boolean;
  inverted?: boolean;
  onClick?: () => void;
}

export const KaiPrakritiEmblem: React.FC<KaiPrakritiEmblemProps> = ({
  size = 'md',
  className = '',
  theme = 'relax',
  variant = 'full',
  circularBorder = true,
  withBackground = false,
  inverted = false,
  onClick,
}) => {
  // Dimension mapping - larger defaults for clear visibility
  const dim = typeof size === 'number' ? size : {
    sm: 52,
    md: 68,
    lg: 140,
    xl: 220,
  }[size];

  // Original Logo Color Palette (from official reference image)
  const originalColors = {
    sanskritText: '#183B38',     // Deep dark pine/slate teal
    englishText: '#183B38',      // Deep dark pine/slate teal
    leafStroke: '#3A6E3F',       // Vibrant organic forest green
    leafFill: '#FFFFFF',         // Pure clean white interior
    node1: '#4B7354',            // Leaf base green node
    node2: '#26454B',            // Mid slate-teal node
    node3: '#213E44',            // Junction slate-teal node
    node4: '#1C373C',            // Upper outer branch node
    node5: '#4C5B6B',            // Lower outer branch node
    lineMain: '#26454B',         // Connecting vector line
    lineBranch1: '#213E44',      // Upper branch vector line
    lineBranch2: '#3D5460',      // Lower branch vector line
    wordmark: '#183B38',         // Deep dark slate teal
    dotColor: '#4A696A',         // Slate-teal equator separator dots
    circularBorder: '#213E44',   // Outer crisp boundary circle
  };

  const colors = inverted
    ? {
        sanskritText: '#FAF8F5',
        englishText: '#FAF8F5',
        leafStroke: '#74A87E',
        leafFill: '#264143',
        node1: '#74A87E',
        node2: '#FAF8F5',
        node3: '#FAF8F5',
        node4: '#FAF8F5',
        node5: '#CBD5E1',
        lineMain: '#FAF8F5',
        lineBranch1: '#FAF8F5',
        lineBranch2: '#CBD5E1',
        wordmark: '#FAF8F5',
        dotColor: '#A3B899',
        circularBorder: '#FAF8F5',
      }
    : originalColors;

  // If icon only (center leaf + data nodes)
  if (variant === 'icon') {
    return (
      <svg
        width={dim}
        height={dim}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`inline-block ${className}`}
        onClick={onClick}
      >
        {/* Soft Background if requested */}
        {withBackground && (
          <circle cx="50" cy="50" r="47" fill="#FAF8F5" />
        )}

        {/* Circular Border */}
        {circularBorder && (
          <circle
            cx="50"
            cy="50"
            r="47"
            stroke={colors.circularBorder}
            strokeWidth="2.5"
            fill="none"
          />
        )}

        {/* Organic Leaf shape */}
        <path
          d="M 28,68 C 22,46 38,22 66,18 C 70,36 68,58 46,72 C 37,78 30,76 28,68 Z"
          fill={colors.leafFill}
          stroke={colors.leafStroke}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Data Nodes & Connected Geometry */}
        <polyline
          points="36,60 48,46 58,48"
          stroke={colors.lineMain}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line
          x1="58"
          y1="48"
          x2="76"
          y2="28"
          stroke={colors.lineBranch1}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="58"
          y1="48"
          x2="74"
          y2="66"
          stroke={colors.lineBranch2}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="36" cy="60" r="3.5" fill={colors.node1} />
        <circle cx="48" cy="46" r="4" fill={colors.node2} />
        <circle cx="58" cy="48" r="4.5" fill={colors.node3} />
        <circle cx="76" cy="28" r="4" fill={colors.node4} />
        <circle cx="74" cy="66" r="4" fill={colors.node5} />
      </svg>
    );
  }

  // Full Circular Official Emblem matching the Original Logo exactly
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: dim, height: dim }}
      onClick={onClick}
    >
      <svg
        width={dim}
        height={dim}
        viewBox="0 0 320 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full transition-transform duration-300 hover:scale-[1.02]"
      >
        <defs>
          {/* Top arc for Devanagari Sanskrit: प्रकृति-सतत-विकासः */}
          <path
            id={`topArc-${dim}`}
            d="M 38,160 A 122,122 0 0,1 282,160"
            fill="none"
          />
          {/* Bottom arc for English: CONTINUOUS SUSTAINABLE DEVELOPMENT */}
          <path
            id={`bottomArc-${dim}`}
            d="M 44,160 A 116,116 0 0,0 276,160"
            fill="none"
          />
        </defs>

        {/* Soft Circular Background if requested */}
        {withBackground && (
          <circle cx="160" cy="160" r="154" fill="#FFFFFF" />
        )}

        {/* Clean Original Circular Border */}
        {circularBorder && (
          <circle
            cx="160"
            cy="160"
            r="153"
            stroke={colors.circularBorder}
            strokeWidth="3"
            fill="none"
          />
        )}

        {/* Sanskrit Upper Arc: प्रकृति-सतत-विकासः */}
        <text
          fill={colors.sanskritText}
          fontSize="24"
          fontWeight="700"
          letterSpacing="2.8"
          fontFamily="'Noto Sans Devanagari', 'Poppins', 'Segoe UI', system-ui, sans-serif"
        >
          <textPath
            href={`#topArc-${dim}`}
            startOffset="50%"
            textAnchor="middle"
          >
            प्रकृति-सतत-विकासः
          </textPath>
        </text>

        {/* Separator Dots (Equator Left and Right) */}
        <circle cx="34" cy="155" r="6" fill={colors.dotColor} />
        <circle cx="286" cy="155" r="6" fill={colors.dotColor} />

        {/* English Lower Arc: CONTINUOUS SUSTAINABLE DEVELOPMENT */}
        <text
          fill={colors.englishText}
          fontSize="11.5"
          fontWeight="800"
          letterSpacing="2.8"
          fontFamily="'Overpass', 'Montserrat', 'Inter', system-ui, sans-serif"
        >
          <textPath
            href={`#bottomArc-${dim}`}
            startOffset="50%"
            textAnchor="middle"
          >
            CONTINUOUS SUSTAINABLE DEVELOPMENT
          </textPath>
        </text>

        {/* Center Graphic: Organic Leaf + Measurement Graph Nodes */}
        <g transform="translate(160, 146)">
          {/* Leaf Contour (Nature / Prakriti) with clean white fill & forest green stroke */}
          <path
            d="M -38,24 C -50,-10 -24,-48 16,-54 C 24,-24 18,12 -14,34 C -26,42 -36,38 -38,24 Z"
            fill={colors.leafFill}
            stroke={colors.leafStroke}
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Connected Data Nodes & Vector Graph Lines */}
          {/* Line from Node 1 to Node 2 */}
          <line
            x1="-22"
            y1="12"
            x2="-5"
            y2="-8"
            stroke={colors.lineMain}
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Line from Node 2 to Node 3 */}
          <line
            x1="-5"
            y1="-8"
            x2="10"
            y2="-5"
            stroke={colors.lineMain}
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Upper Right Branch to Node 4 */}
          <line
            x1="10"
            y1="-5"
            x2="36"
            y2="-34"
            stroke={colors.lineBranch1}
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Lower Right Branch to Node 5 */}
          <line
            x1="10"
            y1="-5"
            x2="32"
            y2="20"
            stroke={colors.lineBranch2}
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* Measurement Circles / Nodes */}
          <circle cx="-22" cy="12" r="6" fill={colors.node1} />
          <circle cx="-5" cy="-8" r="6.5" fill={colors.node2} />
          <circle cx="10" cy="-5" r="7.5" fill={colors.node3} />
          <circle cx="36" cy="-34" r="6.5" fill={colors.node4} />
          <circle cx="32" cy="20" r="7" fill={colors.node5} />
        </g>

        {/* KAIPRAKRITI Wordmark below emblem center */}
        <text
          x="160"
          y="228"
          textAnchor="middle"
          fill={colors.wordmark}
          fontSize="19"
          fontWeight="900"
          letterSpacing="4"
          fontFamily="'Overpass', 'Montserrat', 'Inter', system-ui, sans-serif"
        >
          KAIPRAKRITI
        </text>
      </svg>
    </div>
  );
};
