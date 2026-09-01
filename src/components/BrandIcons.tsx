import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

/**
 * Pixel-perfect authentic Google 'G' 4-color Vector Logo
 */
export const GoogleLogo: React.FC<IconProps> = ({ className = 'w-5 h-5', size }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      style={size ? { width: size, height: size } : undefined}
    >
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.04 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      />
    </svg>
  );
};

/**
 * Pixel-perfect authentic WhatsApp Green Chat Bubble Logo
 */
export const WhatsAppLogo: React.FC<IconProps> = ({ className = 'w-5 h-5', size }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      fill="currentColor"
    >
      <path
        fill="#25D366"
        d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 6.46 17.5 2 12.04 2Z"
      />
      <path
        fill="#FFFFFF"
        d="M17.5 14.88C17.2 14.73 15.72 14 15.45 13.9C15.17 13.8 14.97 13.75 14.78 14.05C14.58 14.35 14.02 15.02 13.85 15.22C13.68 15.42 13.5 15.44 13.2 15.29C12.9 15.14 11.95 14.83 10.82 13.82C9.94 13.04 9.35 12.07 9.17 11.77C9 11.47 9.15 11.31 9.3 11.16C9.43 11.03 9.6 10.81 9.75 10.63C9.9 10.46 9.95 10.33 10.05 10.13C10.15 9.93 10.1 9.76 10.03 9.61C9.95 9.46 9.38 8.06 9.15 7.5C8.92 6.96 8.69 7.03 8.52 7.03C8.36 7.02 8.18 7.02 8 7.02C7.82 7.02 7.52 7.09 7.27 7.36C7.02 7.63 6.32 8.29 6.32 9.63C6.32 10.97 7.3 12.26 7.43 12.44C7.57 12.61 9.35 15.36 12.08 16.54C12.73 16.82 13.23 16.98 13.63 17.11C14.28 17.32 14.88 17.29 15.35 17.22C15.87 17.14 16.96 16.56 17.19 15.91C17.41 15.26 17.41 14.71 17.35 14.61C17.29 14.51 17.1 14.44 16.8 14.29L17.5 14.88Z"
      />
    </svg>
  );
};

/**
 * Pixel-perfect authentic Instagram Multi-Color Gradient Camera Logo
 */
export const InstagramLogo: React.FC<IconProps> = ({ className = 'w-5 h-5', size }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      style={size ? { width: size, height: size } : undefined}
    >
      <defs>
        <radialGradient id="ig-grad" r="150%" cx="30%" cy="107%">
          <stop stopColor="#fdf497" offset="0%" />
          <stop stopColor="#fdf497" offset="5%" />
          <stop stopColor="#fd5949" offset="45%" />
          <stop stopColor="#d6249f" offset="60%" />
          <stop stopColor="#285AEB" offset="90%" />
        </radialGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="5.5" fill="url(#ig-grad)" />
      <rect
        x="6.2"
        y="6.2"
        width="11.6"
        height="11.6"
        rx="3.2"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="1.8"
      />
      <circle
        cx="12"
        cy="12"
        r="3"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="1.8"
      />
      <circle cx="15.8" cy="8.2" r="0.9" fill="#FFFFFF" />
    </svg>
  );
};

/**
 * Pixel-perfect authentic Facebook Blue Circle Logo
 */
export const FacebookLogo: React.FC<IconProps> = ({ className = 'w-5 h-5', size }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      style={size ? { width: size, height: size } : undefined}
    >
      <circle cx="12" cy="12" r="12" fill="#1877F2" />
      <path
        d="M14.5 12.5H12.5V20H9.5V12.5H8V9.8H9.5V8C9.5 6.2 10.6 5 12.7 5C13.6 5 14.4 5.1 14.4 5.1V7.2H13.4C12.4 7.2 12.1 7.8 12.1 8.5V9.8H14.5L14.5 12.5Z"
        fill="#FFFFFF"
      />
    </svg>
  );
};

/**
 * Pixel-perfect Google Maps Location Pin
 */
export const GoogleMapsPinLogo: React.FC<IconProps> = ({ className = 'w-5 h-5', size }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      style={size ? { width: size, height: size } : undefined}
    >
      <path
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
        fill="#EA4335"
      />
      <circle cx="12" cy="9" r="2.8" fill="#FFFFFF" />
    </svg>
  );
};
