import React from "react";

export default function BackgroundAtmosphere() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 overflow-hidden bg-[#030611] pointer-events-none select-none"
    >
      {/* 1. Radial-Masked 1px Architectural Micro-Grid */}
      <div className="absolute inset-0 bg-architectural-grid" />

      {/* 2. Restrained Deep Atmospheric Lighting */}
      <div className="absolute -top-48 -left-40 w-[40rem] h-[40rem] rounded-full bg-blue-600/12 blur-[140px]" />
      <div className="absolute top-1/4 -right-32 w-[36rem] h-[36rem] rounded-full bg-indigo-500/10 blur-[150px]" />
      <div className="absolute -bottom-32 left-1/3 w-[44rem] h-[30rem] rounded-full bg-cyan-500/8 blur-[160px]" />

      {/* 3. Animated SVG Telemetry Ribbons & Constellation Network */}
      <svg
        className="absolute inset-0 w-full h-full opacity-60"
        viewBox="0 0 1440 900"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="staticTrack" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1E293B" stopOpacity="0" />
            <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#1E293B" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="pulseCyanViolet" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22D3EE" stopOpacity="0" />
            <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.95" />
            <stop offset="85%" stopColor="#818CF8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#818CF8" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Base Static Wave Tracks */}
        <path
          d="M-120 280 C 340 120, 760 460, 1560 220"
          stroke="url(#staticTrack)"
          strokeWidth="1.25"
        />
        <path
          d="M-120 580 C 420 720, 920 320, 1560 510"
          stroke="url(#staticTrack)"
          strokeWidth="1.25"
        />

        {/* Animated Luminous Telemetry Pulses Gliding Along Tracks */}
        <path
          d="M-120 280 C 340 120, 760 460, 1560 220"
          stroke="url(#pulseCyanViolet)"
          strokeWidth="2"
          strokeLinecap="round"
          className="animate-telemetry-primary"
        />
        <path
          d="M-120 580 C 420 720, 920 320, 1560 510"
          stroke="url(#pulseCyanViolet)"
          strokeWidth="1.75"
          strokeLinecap="round"
          className="animate-telemetry-secondary"
        />

        {/* Constellation Network Lines */}
        <g stroke="#38BDF8" strokeOpacity="0.12" strokeWidth="1" strokeDasharray="3 3">
          <line x1="210" y1="160" x2="370" y2="245" />
          <line x1="370" y1="245" x2="530" y2="185" />
          <line x1="990" y1="210" x2="1170" y2="305" />
          <line x1="1170" y1="305" x2="1290" y2="195" />
        </g>

        {/* Constellation Telemetry Nodes */}
        <g>
          <circle cx="210" cy="160" r="2" fill="#67E8F9" fillOpacity="0.6" />
          <circle cx="370" cy="245" r="2.5" fill="#38BDF8" fillOpacity="0.8" />
          <circle cx="370" cy="245" r="7" stroke="#38BDF8" strokeOpacity="0.2" />
          <circle cx="530" cy="185" r="2" fill="#818CF8" fillOpacity="0.6" />
          <circle cx="990" cy="210" r="2" fill="#67E8F9" fillOpacity="0.6" />
          <circle cx="1170" cy="305" r="2.5" fill="#38BDF8" fillOpacity="0.8" />
          <circle cx="1170" cy="305" r="7" stroke="#38BDF8" strokeOpacity="0.2" />
          <circle cx="1290" cy="195" r="2" fill="#818CF8" fillOpacity="0.6" />
        </g>
      </svg>
    </div>
  );
}

