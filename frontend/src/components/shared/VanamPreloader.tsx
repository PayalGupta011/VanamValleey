import React, { useEffect, useState } from 'react';

interface VanamPreloaderProps {
  /** If true, runs as an initial page load splash with auto-fadeout after ~2.3s */
  isInitialSplash?: boolean;
  onFinish?: () => void;
}

export const VanamPreloader: React.FC<VanamPreloaderProps> = ({
  isInitialSplash = true,
  onFinish,
}) => {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  useEffect(() => {
    if (!isInitialSplash) return;

    // Lock background scroll during preloader
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    // Run smooth animation for 2.3 seconds, then 0.6s fade-out
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      const removeTimer = setTimeout(() => {
        setIsRemoved(true);
        document.documentElement.style.overflow = prevHtmlOverflow;
        document.body.style.overflow = prevBodyOverflow;
        if (onFinish) onFinish();
      }, 600);

      return () => clearTimeout(removeTimer);
    }, 2300);

    return () => {
      clearTimeout(timer);
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
    };
  }, [isInitialSplash, onFinish]);

  if (isRemoved) return null;

  return (
    <div
      className="vanam-preloader-backdrop"
      style={{
        position: isInitialSplash ? 'fixed' : 'relative',
        inset: isInitialSplash ? 0 : 'auto',
        zIndex: isInitialSplash ? 99999 : 1,
        width: '100%',
        minHeight: isInitialSplash ? '100vh' : '65vh',
        height: isInitialSplash ? '100vh' : 'auto',
        background: 'radial-gradient(circle at 50% 48%, #FCFAF6 0%, #F8F3EA 55%, #F1E8DC 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        opacity: isFadingOut ? 0 : 1,
        transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: isFadingOut ? 'none' : 'auto',
        boxSizing: 'border-box',
        padding: '1rem',
      }}
    >
      {/* Central Circular Glass-Like Composition */}
      <div
        className="vanam-preloader-stage"
        style={{
          position: 'relative',
          width: 'clamp(320px, 86vw, 420px)',
          height: 'clamp(320px, 86vw, 420px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Static Luminous Glass Ring Background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '1.5px solid rgba(247, 214, 176, 0.55)',
            boxShadow:
              '0 0 35px rgba(247, 214, 176, 0.35), inset 0 0 25px rgba(255, 255, 255, 0.75)',
            backgroundColor: 'rgba(255, 255, 255, 0.22)',
            backdropFilter: 'blur(4px)',
            pointerEvents: 'none',
          }}
        />

        {/* Rotating Circular Arc & Glowing Golden Light Indicator */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
        >
          <svg
            viewBox="0 0 420 420"
            style={{
              width: '100%',
              height: '100%',
              overflow: 'visible',
              animation: 'vanamArcSpin 2.6s linear infinite',
              transformOrigin: '210px 210px',
            }}
          >
            <defs>
              {/* Forest Green Gradient Arc */}
              <linearGradient id="vanamArcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#A4D65E" stopOpacity="0.15" />
                <stop offset="35%" stopColor="#439A52" stopOpacity="0.75" />
                <stop offset="75%" stopColor="#0B5D3D" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#00382B" stopOpacity="1" />
              </linearGradient>

              {/* Glowing Golden Light Indicator Filter */}
              <filter id="vanamGoldGlow" x="-60%" y="-60%" width="220%" height="220%">
                <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#FFE27A" floodOpacity="1" />
                <feDropShadow dx="0" dy="0" stdDeviation="9" floodColor="#D4A85A" floodOpacity="0.85" />
              </filter>
            </defs>

            {/* Arc: from top-left (41, 112) arching gracefully over top to top-right (386, 127) */}
            <path
              d="M 41.13 112.50 A 195 195 0 0 1 386.73 127.59"
              stroke="url(#vanamArcGrad)"
              strokeWidth="5.5"
              strokeLinecap="round"
              fill="none"
            />

            {/* Golden Glowing Orb Indicator at moving endpoint */}
            <circle
              cx="386.73"
              cy="127.59"
              r="7.5"
              fill="#FFF6C2"
              stroke="#D4A85A"
              strokeWidth="1.8"
              filter="url(#vanamGoldGlow)"
            />
          </svg>
        </div>

        {/* STATIC CENTRAL CONTENT (DOES NOT ROTATE) */}
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '1.5rem',
            userSelect: 'none',
          }}
        >
          {/* Original Official Vanam Valley Logo (Image 1) */}
          <div
            style={{
              marginBottom: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src="/vanam-original-logo-transparent.png"
              alt="Vanam Valley Balaghat"
              style={{
                width: 'clamp(180px, 48vw, 225px)',
                height: 'auto',
                display: 'block',
                objectFit: 'contain',
              }}
            />
          </div>

          {/* Minimal Gold Divider Lines with House & Leaf Icon */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              margin: '6px 0 12px 0',
              width: '100%',
              maxWidth: '220px',
            }}
          >
            {/* Left Gold Line */}
            <div
              style={{
                flex: 1,
                height: '1px',
                background: 'linear-gradient(90deg, transparent 0%, #B88B4A 100%)',
                opacity: 0.85,
              }}
            />

            {/* House Roof + Leaf Icon */}
            <svg
              width="44"
              height="30"
              viewBox="0 0 44 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ flexShrink: 0 }}
            >
              {/* Gold Pitch Roof */}
              <path
                d="M10 18 L22 7 L34 18"
                stroke="#B88B4A"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* 4 Window Squares */}
              <rect x="20" y="11.5" width="1.8" height="1.8" fill="#B88B4A" rx="0.3" />
              <rect x="22.5" y="11.5" width="1.8" height="1.8" fill="#B88B4A" rx="0.3" />
              <rect x="20" y="14" width="1.8" height="1.8" fill="#B88B4A" rx="0.3" />
              <rect x="22.5" y="14" width="1.8" height="1.8" fill="#B88B4A" rx="0.3" />
              {/* Natural Green Leaf */}
              <path
                d="M10.5 21.5 C16 21 21.5 18 33 17.5 C29 22.5 20.5 24.5 13 22 Z"
                fill="#2E7D4E"
              />
              {/* Leaf Stem */}
              <path
                d="M10.5 21.5 C13 21.5 20 20 30 18"
                stroke="#1B5E34"
                strokeWidth="0.6"
                strokeLinecap="round"
              />
            </svg>

            {/* Right Gold Line */}
            <div
              style={{
                flex: 1,
                height: '1px',
                background: 'linear-gradient(90deg, #B88B4A 0%, transparent 100%)',
                opacity: 0.85,
              }}
            />
          </div>

          {/* Loading Message: EXACT TEXT FROM REFERENCE */}
          <div
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 'clamp(11px, 1.4vw, 12.5px)',
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#00382B',
              marginBottom: '10px',
            }}
          >
            YOUR PROPERTY IS LOADING...
          </div>

          {/* Four Small Green Loading Dots with Sequential Pulse */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            {[0, 1, 2, 3].map((dotIdx) => (
              <span
                key={dotIdx}
                className="vanam-pulse-dot"
                style={{
                  width: '6.5px',
                  height: '6.5px',
                  borderRadius: '50%',
                  backgroundColor: '#004B3C',
                  display: 'inline-block',
                  animation: `vanamDotPulse 1.4s infinite ease-in-out both`,
                  animationDelay: `${dotIdx * 0.18}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Subtle Green-Gold Ground Reflection beneath circular composition */}
      <div
        style={{
          width: 'clamp(240px, 60vw, 320px)',
          height: '14px',
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(247, 214, 176, 0.85) 0%, rgba(212, 168, 90, 0.4) 40%, rgba(0, 56, 43, 0.12) 70%, transparent 85%)',
          filter: 'blur(4px)',
          marginTop: '-6px',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

