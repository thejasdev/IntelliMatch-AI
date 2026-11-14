import React from "react";

export default function PageConsoleHeader({
  eyebrow,
  titleWhite,
  titleGradient,
  overviewText,
  overviewExtra,
  children,
  className = "",
}) {
  return (
    <section className={`console-frame relative overflow-hidden rounded-3xl p-6 sm:px-10 lg:px-12 py-8 sm:py-10 lg:py-12 text-white mb-8 ${className}`}>
      {/* Specular Beam Sweep at top edge */}
      <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent animate-beam-sweep" />

      {/* Subtle depth lighting accents matching hero */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -top-12 -left-12 w-96 h-96 bg-brand-violet/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-brand-cyan/15 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Top 2-Column Grid matching Home hero */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start lg:items-center">
        {/* Left Column: Pill badge + Two-tone display title */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-4 sm:space-y-5 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-medium text-cyan-300 bg-blue-500/10 border border-cyan-400/30">
            <span>✦</span>
            <span className="uppercase tracking-wider">{eyebrow}</span>
          </div>

          <h1 className="font-hero font-extrabold text-white text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[1.08] tracking-[-0.03em] m-0">
            <span className="block text-white">{titleWhite} </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#6E56CF] via-[#818CF8] to-[#38BDF8]">
              {titleGradient}
            </span>
          </h1>
        </div>

        {/* Right Column: OVERVIEW label + description */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-2 text-left lg:border-l lg:border-white/10 lg:pl-8 lg:py-2">
          <span className="text-[11px] font-mono font-bold uppercase tracking-[0.15em] text-[#38BDF8] block mb-2">
            OVERVIEW
          </span>
          <p className="font-sans text-sm sm:text-base text-slate-300 leading-relaxed m-0 font-normal">
            {overviewText}
          </p>
          {overviewExtra && <div className="pt-2">{overviewExtra}</div>}
        </div>
      </div>

      {/* Lower Row Inside the SAME Large Outer Outline */}
      {children && (
        <div className="relative z-10 border-t border-slate-800/80 pt-6 mt-8">
          {children}
        </div>
      )}
    </section>
  );
}

