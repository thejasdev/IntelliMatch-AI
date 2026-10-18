import React from "react";

/**
 * AmbientWaveBackground Component
 * Recreates the exact visual direction of Image 2 (Bondist Reference):
 * - Deep midnight navy base (#181727 / #1A1B2F / #1B1C30)
 * - Subtle blue/cyan ambient glows
 * - Broad, smooth, flowing wave ribbons sweeping horizontally across the screen
 * - Layered violet, steel-blue, electric-blue and bright-cyan colors
 * - Luminous cyan-blue highlight spine along the wave
 * - Soft blue/cyan under-glow beneath the flowing ribbons
 * - Thin geometric network lines on the left and right
 * - Small glowing cyan/violet connection nodes
 * - Restrained concentric radar-style reticle on the right
 * - Fixed at inset-0, z-0, pointer-events-none, scaling responsively behind all 9 views
 */
export default function AmbientWaveBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
      style={{
        background: `
          radial-gradient(ellipse 95% 45% at 50% 50%, rgba(20, 111, 232, 0.32) 0%, rgba(25, 198, 232, 0.16) 40%, transparent 75%),
          radial-gradient(circle at 18% 46%, rgba(101, 72, 232, 0.28) 0%, transparent 46%),
          radial-gradient(circle at 82% 28%, rgba(22, 132, 255, 0.28) 0%, rgba(25, 198, 232, 0.15) 35%, transparent 55%),
          radial-gradient(circle at 50% 12%, rgba(255, 255, 255, 0.05) 0%, transparent 35%),
          linear-gradient(180deg, #0c0f1e 0%, #11152a 40%, #181727 72%, #0e1121 100%)
        `,
      }}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Volumetric Diffuse Wave Gradient: Deep Steel to Royal Blue to Cyan */}
          <linearGradient id="waveVolumetricGrad" x1="0%" y1="0%" x2="100%" y2="80%">
            <stop offset="0%" stopColor="#354F82" stopOpacity="0.45" />
            <stop offset="25%" stopColor="#1e3a6c" stopOpacity="0.75" />
            <stop offset="55%" stopColor="#146FE8" stopOpacity="0.85" />
            <stop offset="80%" stopColor="#19C6E8" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#354F82" stopOpacity="0.35" />
          </linearGradient>

          {/* Layered Violet to Electric Blue Ribbon Gradient */}
          <linearGradient id="waveVioletSteelGrad" x1="0%" y1="30%" x2="100%" y2="70%">
            <stop offset="0%" stopColor="#6548E8" stopOpacity="0.4" />
            <stop offset="30%" stopColor="#354F82" stopOpacity="0.8" />
            <stop offset="65%" stopColor="#1684FF" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#19C6E8" stopOpacity="0.6" />
          </linearGradient>

          {/* Luminous Royal to Electric Blue Ribbon Gradient */}
          <linearGradient id="waveRoyalElectricGrad" x1="0%" y1="10%" x2="100%" y2="90%">
            <stop offset="0%" stopColor="#146FE8" stopOpacity="0.5" />
            <stop offset="40%" stopColor="#1684FF" stopOpacity="0.85" />
            <stop offset="75%" stopColor="#19C6E8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#146FE8" stopOpacity="0.4" />
          </linearGradient>

          {/* Bright Luminous Cyan Core Gradient */}
          <linearGradient id="waveBrightCyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1684FF" stopOpacity="0.7" />
            <stop offset="35%" stopColor="#19C6E8" stopOpacity="0.95" />
            <stop offset="70%" stopColor="#38BDF8" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#A5F3FC" stopOpacity="0.8" />
          </linearGradient>

          {/* Sharp Highlight Spine Gradient */}
          <linearGradient id="cyanSpineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#146FE8" stopOpacity="0.4" />
            <stop offset="25%" stopColor="#19C6E8" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#38BDF8" stopOpacity="1" />
            <stop offset="80%" stopColor="#19C6E8" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#6548E8" stopOpacity="0.4" />
          </linearGradient>

          {/* Volumetric Deep Blur Filter */}
          <filter id="waveVolumetricBlur" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="28" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Medium Flow Glow Filter */}
          <filter id="waveGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="15" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Intense Glow for Cyan Accent Vector */}
          <filter id="cyanHighlightGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Node Glow Filter */}
          <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. Volumetric Broad Diffuse Blue Underglow Ribbon */}
        <path
          d="M-120 570 C 340 470, 740 610, 1190 480 C 1560 380, 1840 410, 2080 430"
          stroke="url(#waveVolumetricGrad)"
          strokeWidth="120"
          strokeLinecap="round"
          filter="url(#waveVolumetricBlur)"
          opacity="0.65"
        />

        {/* 2. Layered Violet to Steel-Blue Ribbon */}
        <path
          d="M-100 550 C 330 460, 730 590, 1180 470 C 1550 370, 1830 400, 2080 420"
          stroke="url(#waveVioletSteelGrad)"
          strokeWidth="48"
          strokeLinecap="round"
          filter="url(#waveGlow)"
          opacity="0.75"
        />

        {/* 3. Luminous Royal to Electric-Blue Flowing Ribbon */}
        <path
          d="M-100 535 C 320 450, 720 575, 1170 460 C 1540 360, 1820 390, 2080 410"
          stroke="url(#waveRoyalElectricGrad)"
          strokeWidth="26"
          strokeLinecap="round"
          filter="url(#waveGlow)"
          opacity="0.85"
        />

        {/* 4. Bright Luminous Cyan Core Strand */}
        <path
          d="M-100 525 C 310 442, 715 562, 1165 450 C 1535 350, 1815 382, 2080 402"
          stroke="url(#waveBrightCyanGrad)"
          strokeWidth="10"
          strokeLinecap="round"
          filter="url(#cyanHighlightGlow)"
          opacity="0.95"
        />

        {/* 5. Razor-Sharp Luminous Cyan Spine (Key Characteristic of Reference Image 2) */}
        <path
          d="M-100 520 C 310 438, 710 558, 1160 446 C 1530 346, 1810 378, 2080 398"
          stroke="url(#cyanSpineGrad)"
          strokeWidth="3.2"
          strokeLinecap="round"
          filter="url(#cyanHighlightGlow)"
          opacity="0.95"
        />
        {/* Core brilliant white filament */}
        <path
          d="M-100 520 C 310 438, 710 558, 1160 446 C 1530 346, 1810 378, 2080 398"
          stroke="#FFFFFF"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeOpacity="0.9"
        />

        {/* 6. Multi-Strand Fluid Filament Light Trails (Reference Feature) */}
        <path
          d="M-80 490 C 350 405, 760 515, 1210 405 C 1580 315, 1850 345, 2080 365"
          stroke="rgba(25, 198, 232, 0.45)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M-80 565 C 330 485, 700 620, 1140 500 C 1510 405, 1790 435, 2080 455"
          stroke="rgba(20, 111, 232, 0.55)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M-80 600 C 350 525, 720 660, 1150 540 C 1520 445, 1800 470, 2080 490"
          stroke="rgba(101, 72, 232, 0.35)"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M-80 635 C 370 560, 740 695, 1170 575 C 1540 480, 1820 505, 2080 525"
          stroke="rgba(25, 198, 232, 0.30)"
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        {/* 7. Left Constellation Network (3D Wireframe Triangular Facets & Glowing Nodes) */}
        <polygon
          points="140,420 260,460 190,540"
          fill="rgba(25, 198, 232, 0.04)"
        />
        <polygon
          points="190,540 310,500 280,640"
          fill="rgba(101, 72, 232, 0.04)"
        />
        <polygon
          points="280,640 400,580 390,690"
          fill="rgba(20, 111, 232, 0.05)"
        />

        <g stroke="rgba(25, 198, 232, 0.28)" strokeWidth="1">
          <line x1="60" y1="480" x2="140" y2="420" />
          <line x1="140" y1="420" x2="260" y2="460" />
          <line x1="260" y1="460" x2="370" y2="400" />
          <line x1="140" y1="420" x2="80" y2="560" />
          <line x1="80" y1="560" x2="190" y2="540" />
          <line x1="190" y1="540" x2="310" y2="500" />
          <line x1="260" y1="460" x2="190" y2="540" />
          <line x1="260" y1="460" x2="310" y2="500" />
          <line x1="370" y1="400" x2="310" y2="500" />
          <line x1="80" y1="560" x2="160" y2="660" />
          <line x1="160" y1="660" x2="280" y2="640" />
          <line x1="190" y1="540" x2="280" y2="640" />
          <line x1="310" y1="500" x2="280" y2="640" />
          <line x1="310" y1="500" x2="400" y2="580" />
          <line x1="280" y1="640" x2="390" y2="690" />
          <line x1="390" y1="690" x2="400" y2="580" />
          <line x1="400" y1="580" x2="490" y2="620" />
          <line x1="370" y1="400" x2="490" y2="480" />
          <line x1="490" y1="480" x2="400" y2="580" />
          <line x1="60" y1="480" x2="80" y2="560" />
        </g>

        {/* Left Constellation Glowing Nodes */}
        <circle cx="60" cy="480" r="3" fill="#19C6E8" fillOpacity="0.8" />
        <circle cx="140" cy="420" r="3.5" fill="#6548E8" fillOpacity="0.9" />
        <circle cx="260" cy="460" r="4.5" fill="#19C6E8" filter="url(#nodeGlow)" />
        <circle cx="370" cy="400" r="3" fill="#6548E8" />
        <circle cx="80" cy="560" r="3" fill="#19C6E8" fillOpacity="0.75" />
        <circle cx="190" cy="540" r="4" fill="#1684FF" />
        <circle cx="310" cy="500" r="4.5" fill="#19C6E8" filter="url(#nodeGlow)" />
        <circle cx="160" cy="660" r="2.5" fill="#146FE8" />
        <circle cx="280" cy="640" r="3.5" fill="#6548E8" />
        <circle cx="390" cy="690" r="3" fill="#19C6E8" />
        <circle cx="400" cy="580" r="4" fill="#19C6E8" />
        <circle cx="490" cy="480" r="3" fill="#6548E8" />
        <circle cx="490" cy="620" r="2.5" fill="#1684FF" />

        {/* 8. Right Constellation Network (High-Tech 3D Polyhedral Constellation & Radar Reticle) */}
        <polygon
          points="1440,80 1560,60 1470,180"
          fill="rgba(25, 198, 232, 0.05)"
        />
        <polygon
          points="1560,60 1700,100 1640,200"
          fill="rgba(101, 72, 232, 0.04)"
        />
        <polygon
          points="1470,180 1540,230 1500,300"
          fill="rgba(20, 111, 232, 0.05)"
        />
        <polygon
          points="1540,230 1640,200 1610,320"
          fill="rgba(25, 198, 232, 0.06)"
        />
        <polygon
          points="1640,200 1750,220 1710,340"
          fill="rgba(101, 72, 232, 0.05)"
        />

        <g stroke="rgba(25, 198, 232, 0.28)" strokeWidth="1">
          {/* Top edge wireframe */}
          <line x1="1340" y1="150" x2="1440" y2="80" />
          <line x1="1440" y1="80" x2="1560" y2="60" />
          <line x1="1560" y1="60" x2="1700" y2="100" />
          <line x1="1700" y1="100" x2="1810" y2="70" />
          <line x1="1810" y1="70" x2="1870" y2="170" />

          {/* Internal cross facets */}
          <line x1="1340" y1="150" x2="1390" y2="210" />
          <line x1="1440" y1="80" x2="1470" y2="180" />
          <line x1="1560" y1="60" x2="1470" y2="180" />
          <line x1="1560" y1="60" x2="1540" y2="230" />
          <line x1="1560" y1="60" x2="1640" y2="200" />
          <line x1="1700" y1="100" x2="1640" y2="200" />
          <line x1="1700" y1="100" x2="1750" y2="220" />
          <line x1="1810" y1="70" x2="1750" y2="220" />
          <line x1="1810" y1="70" x2="1840" y2="260" />
          <line x1="1870" y1="170" x2="1840" y2="260" />

          {/* Radar Nexus Interconnects */}
          <line x1="1390" y1="210" x2="1470" y2="180" />
          <line x1="1470" y1="180" x2="1540" y2="230" />
          <line x1="1540" y1="230" x2="1640" y2="200" />
          <line x1="1640" y1="200" x2="1750" y2="220" />
          <line x1="1750" y1="220" x2="1840" y2="260" />

          {/* Lower facets */}
          <line x1="1340" y1="150" x2="1310" y2="300" />
          <line x1="1390" y1="210" x2="1310" y2="300" />
          <line x1="1390" y1="210" x2="1410" y2="320" />
          <line x1="1470" y1="180" x2="1500" y2="300" />
          <line x1="1540" y1="230" x2="1500" y2="300" />
          <line x1="1540" y1="230" x2="1610" y2="320" />
          <line x1="1640" y1="200" x2="1610" y2="320" />
          <line x1="1640" y1="200" x2="1710" y2="340" />
          <line x1="1750" y1="220" x2="1710" y2="340" />
          <line x1="1750" y1="220" x2="1800" y2="370" />
          <line x1="1840" y1="260" x2="1800" y2="370" />

          {/* Bottom anchoring lines */}
          <line x1="1310" y1="300" x2="1410" y2="320" />
          <line x1="1410" y1="320" x2="1500" y2="300" />
          <line x1="1500" y1="300" x2="1610" y2="320" />
          <line x1="1610" y1="320" x2="1710" y2="340" />
          <line x1="1710" y1="340" x2="1800" y2="370" />
          <line x1="1410" y1="320" x2="1460" y2="430" />
          <line x1="1500" y1="300" x2="1570" y2="410" />
          <line x1="1610" y1="320" x2="1570" y2="410" />
          <line x1="1610" y1="320" x2="1680" y2="430" />
          <line x1="1710" y1="340" x2="1680" y2="430" />
        </g>

        {/* 9. Concentric Radar-Style Target Reticle (Central Feature of Image 2) */}
        <circle
          cx="1540"
          cy="230"
          r="50"
          stroke="rgba(25, 198, 232, 0.55)"
          strokeWidth="1.4"
          strokeDasharray="4 4"
        />
        <circle
          cx="1540"
          cy="230"
          r="26"
          stroke="rgba(101, 72, 232, 0.75)"
          strokeWidth="1.6"
        />
        <circle
          cx="1540"
          cy="230"
          r="13"
          stroke="rgba(25, 198, 232, 0.65)"
          strokeWidth="1.2"
        />
        <circle
          cx="1540"
          cy="230"
          r="4.5"
          fill="#19C6E8"
          filter="url(#nodeGlow)"
        />

        {/* Right Constellation Glowing Nodes */}
        <circle cx="1340" cy="150" r="3" fill="#6548E8" fillOpacity="0.85" />
        <circle cx="1440" cy="80" r="3.5" fill="#19C6E8" />
        <circle cx="1560" cy="60" r="4.5" fill="#19C6E8" filter="url(#nodeGlow)" />
        <circle cx="1700" cy="100" r="3.5" fill="#6548E8" />
        <circle cx="1810" cy="70" r="3" fill="#19C6E8" fillOpacity="0.8" />
        <circle cx="1870" cy="170" r="3.5" fill="#1684FF" />
        <circle cx="1390" cy="210" r="3.5" fill="#19C6E8" />
        <circle cx="1470" cy="180" r="4" fill="#6548E8" />
        <circle cx="1640" cy="200" r="4.5" fill="#19C6E8" filter="url(#nodeGlow)" />
        <circle cx="1750" cy="220" r="4" fill="#1684FF" />
        <circle cx="1840" cy="260" r="3" fill="#6548E8" />
        <circle cx="1310" cy="300" r="3" fill="#146FE8" />
        <circle cx="1410" cy="320" r="3.5" fill="#19C6E8" />
        <circle cx="1500" cy="300" r="4" fill="#6548E8" />
        <circle cx="1610" cy="320" r="4.5" fill="#19C6E8" filter="url(#nodeGlow)" />
        <circle cx="1710" cy="340" r="3.5" fill="#1684FF" />
        <circle cx="1800" cy="370" r="3" fill="#19C6E8" />
        <circle cx="1460" cy="430" r="2.5" fill="#6548E8" />
        <circle cx="1570" cy="410" r="3" fill="#19C6E8" />
        <circle cx="1680" cy="430" r="2.5" fill="#1684FF" />

        {/* 10. Data Particle Scatter Points (Upper Right Matrix Tech Dots) */}
        <g fill="#19C6E8" fillOpacity="0.55">
          <circle cx="1740" cy="150" r="1.5" />
          <circle cx="1760" cy="170" r="1" />
          <circle cx="1780" cy="140" r="1.5" />
          <circle cx="1820" cy="190" r="1" />
          <circle cx="1860" cy="120" r="1.5" />
          <circle cx="1890" cy="150" r="1" />
          <circle cx="1910" cy="210" r="1.5" />
          <circle cx="1720" cy="70" r="1" />
          <circle cx="1660" cy="80" r="1.5" />
        </g>
      </svg>
    </div>
  );
}
