import React from 'react';

interface NenufarLogoProps {
  variant?: 'full' | 'horizontal' | 'icon' | 'badge';
  className?: string;
  iconSize?: number;
  textColor?: string;
}

export const NenufarLogo: React.FC<NenufarLogoProps> = ({
  variant = 'full',
  className = '',
  iconSize = 42,
  textColor = 'text-stone-900',
}) => {
  // Exact vector reproduction of the Nenúfar lotus flower from the brand identity
  const LotusIcon = (
    <svg
      viewBox="0 0 160 110"
      width={iconSize}
      height={(iconSize * 110) / 160}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-300 hover:scale-105"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="nenufarPinkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fb7185" />
          <stop offset="50%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#db2777" />
        </linearGradient>
        <linearGradient id="nenufarPlumGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="50%" stopColor="#701a75" />
          <stop offset="100%" stopColor="#581c87" />
        </linearGradient>
      </defs>

      {/* Lotus Base / Lower Wide Petals (Rose / Pink) */}
      <path
        d="M 80 88 C 50 88, 22 75, 20 54 C 28 50, 48 58, 80 88 Z"
        stroke="url(#nenufarPinkGrad)"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 80 88 C 110 88, 138 75, 140 54 C 132 50, 112 58, 80 88 Z"
        stroke="url(#nenufarPinkGrad)"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Lower Inner Swirl (Plum) */}
      <path
        d="M 80 88 C 60 84, 40 70, 36 50 C 44 46, 62 58, 80 88 Z"
        stroke="url(#nenufarPlumGrad)"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 80 88 C 100 84, 120 70, 124 50 C 116 46, 98 58, 80 88 Z"
        stroke="url(#nenufarPlumGrad)"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Lateral Outer Petals Left & Right (Plum) */}
      <path
        d="M 80 88 C 58 65, 36 45, 30 25 C 44 26, 62 48, 80 88 Z"
        stroke="url(#nenufarPlumGrad)"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 80 88 C 102 65, 124 45, 130 25 C 116 26, 98 48, 80 88 Z"
        stroke="url(#nenufarPlumGrad)"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Mid Inner Petals Left & Right (Pink) */}
      <path
        d="M 80 88 C 66 60, 50 35, 52 14 C 64 18, 74 46, 80 88 Z"
        stroke="url(#nenufarPinkGrad)"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 80 88 C 94 60, 110 35, 108 14 C 96 18, 86 46, 80 88 Z"
        stroke="url(#nenufarPinkGrad)"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Center Symmetrical Upright Petal (Plum) */}
      <path
        d="M 80 88 C 72 58, 70 30, 80 10 C 90 30, 88 58, 80 88 Z"
        stroke="url(#nenufarPlumGrad)"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Small Lotus Base Accent Dot/Arch */}
      <path
        d="M 74 88 Q 80 91 86 88"
        stroke="url(#nenufarPinkGrad)"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );

  if (variant === 'icon') {
    return <div className={`inline-flex items-center justify-center ${className}`}>{LotusIcon}</div>;
  }

  if (variant === 'badge') {
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-pink-200/70 shadow-sm backdrop-blur-md ${className}`}>
        {LotusIcon}
        <span className="font-semibold text-xs text-stone-900 tracking-tight">nenúfar</span>
      </div>
    );
  }

  if (variant === 'horizontal') {
    return (
      <div className={`inline-flex items-center gap-3 ${className}`}>
        {LotusIcon}
        <div className="flex flex-col text-left">
          <span className={`font-display font-medium text-xl sm:text-2xl leading-none tracking-tight ${textColor}`}>
            nenúfar
          </span>
          <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.16em] uppercase text-pink-700/90 mt-0.5">
            Regalos Personalizados
          </span>
        </div>
      </div>
    );
  }

  // Default 'full' vertical lockup (matching the sticker perfectly)
  return (
    <div className={`inline-flex flex-col items-center text-center ${className}`}>
      <div className="mb-2">{LotusIcon}</div>
      <span className={`font-display font-medium text-2xl sm:text-3xl leading-none tracking-tight ${textColor}`}>
        nenúfar
      </span>
      <span className="text-[11px] sm:text-xs font-medium tracking-[0.18em] uppercase text-pink-700/90 mt-1">
        Regalos Personalizados
      </span>
    </div>
  );
};
