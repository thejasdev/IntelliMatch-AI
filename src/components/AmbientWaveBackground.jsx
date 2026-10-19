import React, { useState, useEffect } from "react";

/**
 * AmbientWaveBackground Component
 * Original, Watermark-Free Motion-Graphics Background for IntelliMatch AI:
 * - 100% vector SVG waves and constellation network animated with CSS keyframes
 * - Deep midnight-navy, electric cyan, sapphire blue, and violet lighting
 * - Zero watermarks, zero third-party video artifacts, crisp at all display resolutions
 * - Hardware-accelerated GPU transforms (translate3d) with zero continuous JS event loops
 * - Fixed full-viewport layer: pointer-events-none, z-0 behind navbar, cards, and page content
 * - Graceful static fallback respecting prefers-reduced-motion
 */
export default function AmbientWaveBackground() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e) => {
      setPrefersReducedMotion(e.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleMotionChange);
    } else {
      mediaQuery.addListener(handleMotionChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleMotionChange);
      } else {
        mediaQuery.removeListener(handleMotionChange);
      }
    };
  }, []);

  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden z-0 select-none"
      aria-hidden="true"
    >
      {/* 1. Deep Midnight-Navy Base Atmospheric Foundation */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: `
            radial-gradient(ellipse 90% 55% at 50% 45%, rgba(20, 111, 232, 0.16) 0%, rgba(25, 198, 232, 0.08) 40%, transparent 75%),
            radial-gradient(circle at 15% 35%, rgba(101, 72, 232, 0.18) 0%, transparent 45%),
            radial-gradient(circle at 85% 25%, rgba(22, 132, 255, 0.16) 0%, transparent 45%),
            linear-gradient(180deg, #090B17 0%, #10132B 35%, #181727 75%, #0B0D1B 100%)
          `,
        }}
      />

      {/* 2. Soft Slowly Shifting Ambient Lighting Orbs */}
      {!prefersReducedMotion && (
        <>
          <div
            className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full blur-[110px] pointer-events-none animate-orb-1"
            style={{
              background:
                "radial-gradient(circle, rgba(101, 72, 232, 0.32) 0%, rgba(78, 52, 200, 0.14) 50%, transparent 75%)",
            }}
          />
          <div
            className="absolute top-1/4 -right-40 w-[680px] h-[680px] rounded-full blur-[125px] pointer-events-none animate-orb-2"
            style={{
              background:
                "radial-gradient(circle, rgba(25, 198, 232, 0.28) 0%, rgba(20, 111, 232, 0.14) 50%, transparent 75%)",
            }}
          />
          <div
            className="absolute -bottom-36 left-1/3 w-[620px] h-[620px] rounded-full blur-[120px] pointer-events-none animate-orb-1"
            style={{
              background:
                "radial-gradient(circle, rgba(20, 111, 232, 0.22) 0%, rgba(101, 72, 232, 0.12) 50%, transparent 75%)",
            }}
          />
        </>
      )}

      {/* 3. Original Flowing Multi-Layered Vector Waves (Zero Watermark) */}
      <div className="absolute inset-0 w-full h-full">
        {/* Layer A: Deep Sapphire & Violet Background Harmonic Wave */}
        <svg
          className={`absolute bottom-0 left-0 w-[115%] h-[68%] min-w-[1200px] opacity-75 ${
            !prefersReducedMotion ? "animate-wave-tertiary" : ""
          }`}
          viewBox="0 0 1600 600"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveGradDeep" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4E34C8" stopOpacity="0.45" />
              <stop offset="45%" stopColor="#146FE8" stopOpacity="0.35" />
              <stop offset="85%" stopColor="#19C6E8" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#181727" stopOpacity="0.85" />
            </linearGradient>
          </defs>
          <path
            d="M -100 240 C 260 380, 580 180, 940 310 C 1280 430, 1460 220, 1700 290 L 1700 650 L -100 650 Z"
            fill="url(#waveGradDeep)"
          />
        </svg>

        {/* Layer B: Secondary Violet-to-Cyan Harmonic Ribbon Wave */}
        <svg
          className={`absolute bottom-0 -left-[5%] w-[115%] h-[62%] min-w-[1200px] opacity-80 ${
            !prefersReducedMotion ? "animate-wave-secondary" : ""
          }`}
          viewBox="0 0 1600 600"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveGradMid" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6548E8" stopOpacity="0.55" />
              <stop offset="30%" stopColor="#146FE8" stopOpacity="0.48" />
              <stop offset="70%" stopColor="#1684FF" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#19C6E8" stopOpacity="0.38" />
            </linearGradient>
            <linearGradient id="waveStrokeMid" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8B7FF5" stopOpacity="0.75" />
              <stop offset="50%" stopColor="#1684FF" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#19C6E8" stopOpacity="0.95" />
            </linearGradient>
          </defs>
          <path
            d="M -100 310 C 280 180, 620 390, 990 240 C 1310 110, 1490 320, 1700 220 L 1700 650 L -100 650 Z"
            fill="url(#waveGradMid)"
          />
          <path
            d="M -100 310 C 280 180, 620 390, 990 240 C 1310 110, 1490 320, 1700 220"
            fill="none"
            stroke="url(#waveStrokeMid)"
            strokeWidth="2.5"
            strokeOpacity="0.65"
          />
        </svg>

        {/* Layer C: Primary Flowing Cyan & Electric Light Wave Spine */}
        <svg
          className={`absolute bottom-0 left-0 w-[112%] h-[56%] min-w-[1200px] opacity-90 ${
            !prefersReducedMotion ? "animate-wave-primary" : ""
          }`}
          viewBox="0 0 1600 600"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveGradFore" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#146FE8" stopOpacity="0.42" />
              <stop offset="40%" stopColor="#1684FF" stopOpacity="0.38" />
              <stop offset="75%" stopColor="#19C6E8" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.35" />
            </linearGradient>
            <linearGradient id="waveSpineGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8B7FF5" stopOpacity="0.5" />
              <stop offset="35%" stopColor="#146FE8" stopOpacity="0.8" />
              <stop offset="70%" stopColor="#19C6E8" stopOpacity="1" />
              <stop offset="100%" stopColor="#EAF3FF" stopOpacity="0.9" />
            </linearGradient>
            <filter id="glowEffect" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Underlay body */}
          <path
            d="M -100 270 C 240 390, 580 210, 920 340 C 1240 450, 1480 250, 1700 320 L 1700 650 L -100 650 Z"
            fill="url(#waveGradFore)"
          />

          {/* Multi-contour harmonic lines simulating ribbon thickness */}
          <path
            d="M -100 266 C 240 386, 580 206, 920 336 C 1240 446, 1480 246, 1700 316"
            fill="none"
            stroke="url(#waveSpineGlow)"
            strokeWidth="3"
            filter="url(#glowEffect)"
            strokeOpacity="0.9"
          />
          <path
            d="M -100 274 C 240 394, 580 214, 920 344 C 1240 454, 1480 254, 1700 324"
            fill="none"
            stroke="rgba(25, 198, 232, 0.45)"
            strokeWidth="1.5"
          />
          <path
            d="M -100 284 C 240 404, 580 224, 920 354 C 1240 464, 1480 264, 1700 334"
            fill="none"
            stroke="rgba(101, 72, 232, 0.35)"
            strokeWidth="1"
          />
        </svg>

        {/* Layer D: Atmospheric Constellation Network with Twinkling Nodes */}
        <svg
          className="absolute inset-0 w-full h-full opacity-85"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <radialGradient id="nodeGlowCyan" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="35%" stopColor="#19C6E8" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#19C6E8" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="nodeGlowViolet" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="35%" stopColor="#8B7FF5" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#6548E8" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Connected Network Web Lines */}
          <g
            className={!prefersReducedMotion ? "animate-constellation" : ""}
            stroke="rgba(25, 198, 232, 0.22)"
            strokeWidth="1"
            strokeDasharray="4 3"
          >
            {/* Cluster 1: Left atmospheric web */}
            <line x1="120" y1="180" x2="260" y2="230" />
            <line x1="260" y1="230" x2="190" y2="340" />
            <line x1="190" y1="340" x2="340" y2="390" />
            <line x1="260" y1="230" x2="340" y2="390" />
            <line x1="340" y1="390" x2="480" y2="310" />

            {/* Cluster 2: Center-top web */}
            <line x1="560" y1="140" x2="680" y2="200" />
            <line x1="680" y1="200" x2="790" y2="150" />
            <line x1="680" y1="200" x2="740" y2="280" />
            <line x1="740" y1="280" x2="890" y2="230" />

            {/* Cluster 3: Right constellation web */}
            <line x1="1020" y1="160" x2="1140" y2="210" />
            <line x1="1140" y1="210" x2="1280" y2="180" />
            <line x1="1140" y1="210" x2="1210" y2="330" />
            <line x1="1210" y1="330" x2="1360" y2="290" />
            <line x1="1210" y1="330" x2="1080" y2="410" />
          </g>

          {/* Network Star Nodes with Staggered Twinkle */}
          <g>
            {/* Nodes Group 1 */}
            <g className={!prefersReducedMotion ? "animate-node-twinkle-1" : ""}>
              <circle cx="120" cy="180" r="3" fill="#19C6E8" />
              <circle cx="120" cy="180" r="8" fill="url(#nodeGlowCyan)" />

              <circle cx="790" cy="150" r="3.5" fill="#FFFFFF" />
              <circle cx="790" cy="150" r="9" fill="url(#nodeGlowCyan)" />

              <circle cx="1280" cy="180" r="3" fill="#19C6E8" />
              <circle cx="1280" cy="180" r="8" fill="url(#nodeGlowCyan)" />

              <circle cx="340" cy="390" r="2.5" fill="#8B7FF5" />
            </g>

            {/* Nodes Group 2 */}
            <g className={!prefersReducedMotion ? "animate-node-twinkle-2" : ""}>
              <circle cx="260" cy="230" r="3.5" fill="#FFFFFF" />
              <circle cx="260" cy="230" r="9" fill="url(#nodeGlowCyan)" />

              <circle cx="680" cy="200" r="3.5" fill="#8B7FF5" />
              <circle cx="680" cy="200" r="9" fill="url(#nodeGlowViolet)" />

              <circle cx="1140" cy="210" r="3.5" fill="#FFFFFF" />
              <circle cx="1140" cy="210" r="9" fill="url(#nodeGlowCyan)" />

              <circle cx="890" cy="230" r="3" fill="#19C6E8" />
            </g>

            {/* Nodes Group 3 */}
            <g className={!prefersReducedMotion ? "animate-node-twinkle-3" : ""}>
              <circle cx="190" cy="340" r="2.5" fill="#19C6E8" />
              <circle cx="480" cy="310" r="3" fill="#8B7FF5" />
              <circle cx="560" cy="140" r="2.5" fill="#38BDF8" />
              <circle cx="740" cy="280" r="3" fill="#19C6E8" />
              <circle cx="1020" cy="160" r="2.5" fill="#19C6E8" />
              <circle cx="1210" cy="330" r="3.5" fill="#8B7FF5" />
              <circle cx="1360" cy="290" r="3" fill="#38BDF8" />
              <circle cx="1080" cy="410" r="2.5" fill="#19C6E8" />
            </g>
          </g>
        </svg>
      </div>

      {/* 4. Balanced Optical Readability Scrim Overlay */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(9, 11, 23, 0.42) 0%, rgba(16, 19, 43, 0.28) 45%, rgba(9, 11, 23, 0.52) 100%)",
        }}
      />
    </div>
  );
}
