import React from "react";

// Custom Technical SVG Icons for Roadmap Wave Nodes
function WaveNodeIcon({ index, isActive }) {
  const strokeColor = isActive ? "#FFFFFF" : index % 2 === 0 ? "#38BDF8" : "#A78BFA";

  switch (index % 6) {
    case 0: // Terminal & Code Foundations
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke={strokeColor} strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    case 1: // Architecture & Git Workflow
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke={strokeColor} strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    case 2: // Core System & Database Engine
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke={strokeColor} strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      );
    case 3: // Modern Frameworks & AI/Cloud Integration
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke={strokeColor} strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    case 4: // Testing, Security & Verification
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke={strokeColor} strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      );
    default: // Production Deployment & Launch
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke={strokeColor} strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
        </svg>
      );
  }
}

// Builds a 5-Step Industry-Aligned Wave from the Current Year's Milestones & Role Context
export function buildWaveSteps(milestones = [], selectedRoleTitle = "Engineer", yearNumber = 1) {
  const baseSteps = milestones.map((m, idx) => {
    const competencies = m.skills || m.topics || m.competencies || [];
    return {
      id: `step-${idx + 1}`,
      stepNum: `0${idx + 1}`,
      phaseLabel:
        idx === 0
          ? "Core Foundation"
          : idx === 1
          ? "System Implementation"
          : "Applied Deliverable",
      title: m.title || `Stage 0${idx + 1}`,
      duration: m.duration || m.semester || `Semester ${idx === 0 ? 1 : 2} • 4–6 Weeks`,
      description: m.description || "",
      bullets: [
        m.description
          ? m.description.split(".")[0] + "."
          : `Master core concepts required for ${selectedRoleTitle}.`,
        competencies.length > 0
          ? `Key stack: ${competencies.slice(0, 4).join(", ")}.`
          : `Build clean, verifiable implementations in Git.`,
      ],
      competencies,
      rawMilestone: m,
    };
  });

  // Enrich to a 5-Node Serpentine Wave so every year shows the complete end-to-end student flow:
  // 01 Concept & Setup -> 02 Core Engineering -> 03 Framework & Tooling -> 04 Testing & Quality -> 05 Portfolio Launch
  const roleName = selectedRoleTitle || "Target Role";
  if (baseSteps.length > 0 && baseSteps.length < 5) {
    const firstSkills = baseSteps[0]?.competencies || ["Core Stack", "Git"];
    const lastSkills = baseSteps[baseSteps.length - 1]?.competencies || ["Testing", "Deployment"];

    if (baseSteps.length === 3) {
      baseSteps.push(
        {
          id: "step-4",
          stepNum: "04",
          phaseLabel: "Verification & Quality",
          title:
            yearNumber === 1
              ? "Code Quality, Debugging & Problem Solving"
              : yearNumber === 2
              ? "API Testing, Validation & Performance Profiling"
              : yearNumber === 3
              ? "Automated CI/CD, Containers & Security Checks"
              : "System Scalability, Observability & Mock Interviews",
          duration: "2–3 Weeks • Industry Standard",
          description: `Validate your ${roleName} work using industry-grade testing, debugging, and code review standards expected from modern freshers.`,
          bullets: [
            `Write clean, modular code with edge-case validation and unit tests.`,
            `Benchmark performance and document architecture trade-offs for ${roleName}.`,
          ],
          competencies: [...lastSkills.slice(0, 2), "Debugging", "Unit Testing", "Code Review"],
          rawMilestone: baseSteps[2]?.rawMilestone || {},
        },
        {
          id: "step-5",
          stepNum: "05",
          phaseLabel: "Fresher Proof of Work",
          title:
            yearNumber === 1
              ? "GitHub Portfolio & Year-1 Capstone Mini-Build"
              : yearNumber === 2
              ? "End-to-End Deployed Module & Technical README"
              : yearNumber === 3
              ? "Production-Grade Project & Internship Readiness"
              : "Recruiter-Ready Capstone & Technical Walkthrough",
          duration: "Ongoing • Career Milestone",
          description: `Package your ${ firstSkills[0] || "technical" } skills into a verifiable public GitHub repository with architecture diagrams that recruiters can inspect.`,
          bullets: [
            `Publish documented source code, setup guide, and live demo link.`,
            `Align project outcomes directly with ${roleName} fresher hiring rubrics.`,
          ],
          competencies: ["GitHub Portfolio", "System README", "Live Demo", "Fresher Readiness"],
          rawMilestone: baseSteps[baseSteps.length - 1]?.rawMilestone || {},
        }
      );
    }
  }

  return baseSteps;
}

export default function SerpentineRoadmapWave({
  milestones = [],
  selectedRoleTitle = "Software Engineer",
  yearNumber = 1,
  activeStepIndex = 0,
  onSelectStep,
}) {
  const waveSteps = buildWaveSteps(milestones, selectedRoleTitle, yearNumber);

  return (
    <div className="w-full">
      {/* DESKTOP ALTERNATING SERPENTINE WAVE (Matches Reference Image Structure) */}
      <div className="hidden lg:block relative py-8 px-4 select-none">
        {/* Continuous SVG Serpentine Wave Path Connecting All 5 Nodes */}
        <svg
          className="pointer-events-none absolute left-0 right-0 top-1/2 -translate-y-1/2 w-full h-56 z-0"
          viewBox="0 0 1200 220"
          fill="none"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.85" />
              <stop offset="25%" stopColor="#818CF8" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#22D3EE" stopOpacity="0.9" />
              <stop offset="75%" stopColor="#818CF8" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          {/* Outer Soft Glow Wave */}
          <path
            d="M 90 82 C 210 82, 240 148, 360 148 C 480 148, 510 82, 630 82 C 750 82, 780 148, 900 148 C 1020 148, 1050 82, 1130 82"
            stroke="url(#waveLineGrad)"
            strokeWidth="6"
            strokeOpacity="0.16"
            strokeLinecap="round"
          />

          {/* Crisp Primary Serpentine Conduit */}
          <path
            d="M 90 82 C 210 82, 240 148, 360 148 C 480 148, 510 82, 630 82 C 750 82, 780 148, 900 148 C 1020 148, 1050 82, 1130 82"
            stroke="url(#waveLineGrad)"
            strokeWidth="2.25"
            strokeDasharray="6 4"
            strokeLinecap="round"
          />
        </svg>

        {/* 5-Column Alternating Wave Grid */}
        <div className="relative z-10 grid grid-cols-5 gap-4 items-center">
          {waveSteps.map((step, idx) => {
            const isEven = idx % 2 === 0; // Even (0, 2, 4): Circle Upper, Text Below | Odd (1, 3): Text Upper, Circle Lower
            const isActive = activeStepIndex === idx;
            const ringAccent = isEven
              ? isActive
                ? "border-cyan-400 shadow-[0_0_28px_rgba(34,211,238,0.45)]"
                : "border-cyan-500/45 group-hover:border-cyan-400"
              : isActive
              ? "border-indigo-400 shadow-[0_0_28px_rgba(129,140,248,0.45)]"
              : "border-indigo-500/45 group-hover:border-indigo-400";

            const innerFill = isActive
              ? isEven
                ? "bg-gradient-to-br from-cyan-500 to-blue-600"
                : "bg-gradient-to-br from-indigo-500 to-violet-600"
              : isEven
              ? "bg-[#0B1630] group-hover:bg-[#102044]"
              : "bg-[#111332] group-hover:bg-[#191C46]";

            const dotColor = isEven ? "bg-cyan-400" : "bg-indigo-400";
            const badgeColor = isEven ? "text-cyan-300" : "text-indigo-300";

            return (
              <div
                key={step.id}
                onClick={() => onSelectStep && onSelectStep(idx, step)}
                className="group flex flex-col items-center cursor-pointer"
              >
                {/* TOP SLOT: For Odd Nodes (1, 3), Render Callout Text on Top + Stem Down to Circle */}
                <div className="h-44 flex flex-col justify-end items-center w-full px-1">
                  {!isEven ? (
                    <div
                      className={`w-full rounded-xl p-3.5 transition-all duration-200 border text-left ${
                        isActive
                          ? "bg-[#0D1836] border-indigo-400/60 shadow-lg shadow-indigo-500/10 -translate-y-1"
                          : "bg-[#080E20]/90 border-slate-800/90 group-hover:border-indigo-500/40"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className={`font-mono text-[10px] font-bold uppercase ${badgeColor}`}>
                          STEP {step.stepNum}
                        </span>
                        <span className="font-mono text-[9px] text-slate-400 truncate">
                          {step.phaseLabel}
                        </span>
                      </div>
                      <h4 className="font-serif text-xs sm:text-sm font-bold text-white leading-snug line-clamp-2 mb-1.5">
                        {step.title}
                      </h4>
                      <ul className="space-y-1">
                        {step.bullets.slice(0, 2).map((b, bIdx) => (
                          <li
                            key={bIdx}
                            className="font-sans text-[11px] text-slate-300 leading-tight flex items-start gap-1.5 line-clamp-2"
                          >
                            <span className="text-indigo-400 font-bold shrink-0">›</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    /* For Even Nodes (0, 2, 4), Render Short Phase Header Above the Upper Circle */
                    <div className="text-center mb-2">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-400 block">
                        STEP {step.stepNum}
                      </span>
                      <span className="font-serif text-xs font-bold text-white">
                        {step.phaseLabel}
                      </span>
                    </div>
                  )}
                </div>

                {/* VERTICAL STEM ABOVE NODE (For Odd Nodes) */}
                <div className="h-7 flex flex-col items-center justify-center">
                  {!isEven && (
                    <>
                      <span className={`w-2 h-2 rounded-full ${dotColor}`} />
                      <span className="w-px h-5 bg-gradient-to-b from-indigo-400/80 to-indigo-500/20" />
                    </>
                  )}
                </div>

                {/* CENTRAL DOUBLE-RING CIRCULAR ICON NODE (Alternates Vertical Offset Along the Wave) */}
                <div className={`relative flex items-center justify-center ${isEven ? "-translate-y-4" : "translate-y-4"}`}>
                  <div
                    className={`w-20 h-20 rounded-full bg-[#050916] border-2 ${ringAccent} p-1.5 flex items-center justify-center transition-all duration-300 group-hover:scale-105`}
                  >
                    <div
                      className={`w-full h-full rounded-full ${innerFill} border border-white/10 flex flex-col items-center justify-center transition-all`}
                    >
                      <WaveNodeIcon index={idx} isActive={isActive} />
                      <span className="font-mono text-[9px] font-bold text-slate-200 mt-0.5">
                        {step.stepNum}
                      </span>
                    </div>
                  </div>
                </div>

                {/* VERTICAL STEM BELOW NODE (For Even Nodes) */}
                <div className="h-7 flex flex-col items-center justify-center">
                  {isEven && (
                    <>
                      <span className="w-px h-5 bg-gradient-to-b from-cyan-500/20 to-cyan-400/80" />
                      <span className={`w-2 h-2 rounded-full ${dotColor}`} />
                    </>
                  )}
                </div>

                {/* BOTTOM SLOT: For Even Nodes (0, 2, 4), Render Callout Text Below Circle */}
                <div className="h-44 flex flex-col justify-start items-center w-full px-1">
                  {isEven ? (
                    <div
                      className={`w-full rounded-xl p-3.5 transition-all duration-200 border text-left ${
                        isActive
                          ? "bg-[#0D1836] border-cyan-400/60 shadow-lg shadow-cyan-500/10 translate-y-1"
                          : "bg-[#080E20]/90 border-slate-800/90 group-hover:border-cyan-500/40"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className={`font-mono text-[10px] font-bold uppercase ${badgeColor}`}>
                          STEP {step.stepNum}
                        </span>
                        <span className="font-mono text-[9px] text-slate-400 truncate">
                          {step.duration.split("•")[0]}
                        </span>
                      </div>
                      <h4 className="font-serif text-xs sm:text-sm font-bold text-white leading-snug line-clamp-2 mb-1.5">
                        {step.title}
                      </h4>
                      <ul className="space-y-1">
                        {step.bullets.slice(0, 2).map((b, bIdx) => (
                          <li
                            key={bIdx}
                            className="font-sans text-[11px] text-slate-300 leading-tight flex items-start gap-1.5 line-clamp-2"
                          >
                            <span className="text-cyan-400 font-bold shrink-0">›</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    /* For Odd Nodes (1, 3), Render Short Duration Tag Below the Lower Circle */
                    <div className="text-center mt-2">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-indigo-400 block">
                        STEP {step.stepNum}
                      </span>
                      <span className="font-serif text-xs font-bold text-white">
                        {step.phaseLabel}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MOBILE & TABLET CONNECTED TIMELINE VIEW */}
      <div className="lg:hidden space-y-3 py-2">
        {waveSteps.map((step, idx) => {
          const isActive = activeStepIndex === idx;
          return (
            <div
              key={step.id}
              onClick={() => onSelectStep && onSelectStep(idx, step)}
              className={`rounded-xl p-4 border transition-all cursor-pointer flex items-start gap-3.5 ${
                isActive
                  ? "bg-[#0D1836] border-cyan-400/60 shadow-lg"
                  : "bg-[#080E20] border-slate-800"
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-[#050916] border-2 border-cyan-400/50 flex items-center justify-center shrink-0">
                <WaveNodeIcon index={idx} isActive={isActive} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] uppercase text-cyan-300 font-bold">
                    STEP {step.stepNum} • {step.phaseLabel}
                  </span>
                  <span className="font-mono text-[10px] text-slate-400">
                    {step.duration}
                  </span>
                </div>
                <h4 className="font-serif text-sm font-bold text-white mt-0.5">
                  {step.title}
                </h4>
                <p className="font-sans text-xs text-slate-300 mt-1">
                  {step.bullets[0]}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
