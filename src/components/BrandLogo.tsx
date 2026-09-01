import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
  variant?: 'full' | 'inline';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showTagline = true,
  className = '',
  variant = 'full'
}) => {
  const iconSizes = {
    sm: 'w-7 h-4',
    md: 'w-11 h-6',
    lg: 'w-16 h-8',
    xl: 'w-22 h-11'
  };

  const titleSizes = {
    sm: 'text-sm font-black tracking-wide',
    md: 'text-lg font-black tracking-wide',
    lg: 'text-2xl font-black tracking-wide',
    xl: 'text-3xl font-black tracking-wide'
  };

  const badgeSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
    xl: 'w-6 h-6'
  };

  const subSizes = {
    sm: 'text-[8px] tracking-widest',
    md: 'text-[10px] tracking-[0.18em]',
    lg: 'text-xs tracking-[0.22em]',
    xl: 'text-sm tracking-[0.25em]'
  };

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      {/* Sleek sports car silhouette with glowing cyan stroke matching the poster */}
      {variant === 'full' && (
        <div className="relative flex items-center justify-center -mb-0.5">
          <svg
            viewBox="0 0 200 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`${iconSizes[size]} text-[#00E5FF] drop-shadow-[0_0_10px_rgba(0,229,255,0.7)] transition-transform duration-300 hover:scale-105`}
          >
            {/* Aerodynamic roofline & body curves */}
            <path
              d="M 12 38 C 38 35, 55 27, 80 16 C 105 5, 135 5, 160 20 C 175 29, 185 33, 195 36"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {/* Lower aerodynamic side sweep */}
            <path
              d="M 28 42 C 45 40, 60 36, 70 34 C 95 34, 120 34, 145 38 C 160 41, 175 42, 185 41"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Wheel arch accent lines */}
            <path
              d="M 38 40 C 46 34, 56 34, 64 40"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M 148 40 C 156 34, 166 34, 174 40"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Cabin window contour */}
            <path
              d="M 85 22 C 105 13, 130 13, 148 24 C 132 25, 105 25, 85 22 Z"
              fill="currentColor"
              fillOpacity="0.25"
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>
        </div>
      )}

      {/* Main Brand Title with Official Cyan Checkmark Badge */}
      <div className="flex items-center justify-center gap-1.5 mt-0.5">
        <h1 className={`font-['Plus_Jakarta_Sans',sans-serif] text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-[#38BDF8] to-[#22D3EE] drop-shadow-[0_0_12px_rgba(0,229,255,0.4)] ${titleSizes[size]}`}>
          Empire Auto Spa
        </h1>

        {/* Verified Studio Checkmark Badge in Cyan */}
        <div className={`relative flex items-center justify-center rounded-full bg-gradient-to-br from-[#00E5FF] to-[#0284C7] p-0.5 shadow-[0_0_10px_rgba(0,229,255,0.6)] ${badgeSizes[size]}`}>
          <svg
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full text-black stroke-[3]"
          >
            <path
              d="M4 8.5L6.5 11L12 5.5"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Tagline matching the image: "PPF, Ceramic Coatings, Detailing" */}
      {showTagline && (
        <div className="flex items-center justify-center gap-2 mt-0.5">
          <p className={`font-['Outfit',sans-serif] font-semibold text-[#38BDF8]/90 tracking-widest uppercase ${subSizes[size]}`}>
            PPF, Ceramic Coatings, Detailing
          </p>
        </div>
      )}
    </div>
  );
};
