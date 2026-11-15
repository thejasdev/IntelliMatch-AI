import React from "react";
import { Sparkles, ArrowRight, Target, Compass, AlertCircle, CheckCircle2 } from "lucide-react";

export default function CareerRecommendationBanner({
  recommendation,
  academicYear = 1,
  onChangeAcademicYear,
}) {
  if (!recommendation) return null;

  const score = recommendation.readiness_score || 0;
  const matched = recommendation.matched_skills || [];
  const missing = recommendation.missing_skills || [];

  return (
    <div className="console-frame rounded-2xl p-5 sm:p-6 bg-gradient-to-r from-[#050B1B] via-[#091530] to-[#061224] border border-cyan-500/35 shadow-2xl space-y-4">
      {/* Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/15 text-cyan-300 flex items-center justify-center border border-cyan-400/30 shrink-0">
            <Compass size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-400">
                Layer 6 • Career Path Intelligence
              </span>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                AI Alignment Engine
              </span>
            </div>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-white m-0">
              Personalized Pathway for <strong className="text-cyan-300">{recommendation.role_title}</strong>
            </h3>
          </div>
        </div>

        {/* Academic Year Selector */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <span className="font-mono text-xs text-slate-300">Your Current Year:</span>
          <div className="inline-flex items-center bg-[#050916] p-1 rounded-xl border border-slate-800">
            {[1, 2, 3, 4].map((yr) => (
              <button
                key={yr}
                type="button"
                onClick={() => onChangeAcademicYear && onChangeAcademicYear(yr)}
                className={`px-2.5 py-1 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer ${
                  academicYear === yr
                    ? "bg-cyan-500 text-black shadow-xs"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Y{yr}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3-Column Intelligence Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Left: Readiness Gauge */}
        <div className="md:col-span-3 p-4 rounded-xl bg-[#050916]/90 border border-slate-800 text-center space-y-1">
          <span className="font-mono text-[10px] uppercase text-slate-400 block">
            Foundational Readiness
          </span>
          <div className="text-3xl font-bold font-mono text-cyan-300">
            {score}%
          </div>
          <span className="font-mono text-[11px] text-slate-400 block">
            {matched.length} of {recommendation.total_skills_evaluated || 12} Skills Matched
          </span>
        </div>

        {/* Middle: Recommended Starting Point & Milestone */}
        <div className="md:col-span-5 p-4 rounded-xl bg-[#050916]/90 border border-slate-800 space-y-1.5">
          <span className="font-mono text-[10px] uppercase text-amber-300 flex items-center gap-1">
            <Target size={12} />
            <span>Recommended Starting Milestone</span>
          </span>
          <h4 className="font-serif text-sm font-bold text-white m-0">
            {recommendation.recommended_milestone?.title || recommendation.recommended_starting_stage_name}
          </h4>
          <p className="font-sans text-xs text-slate-300 leading-tight m-0">
            {recommendation.explanation}
          </p>
        </div>

        {/* Right: Skill Gaps Focus */}
        <div className="md:col-span-4 p-4 rounded-xl bg-[#050916]/90 border border-slate-800 space-y-2">
          <span className="font-mono text-[10px] uppercase text-rose-300 flex items-center gap-1">
            <AlertCircle size={12} />
            <span>Priority Skill Gaps to Close:</span>
          </span>
          <div className="flex flex-wrap gap-1">
            {missing.slice(0, 4).map((sk, idx) => (
              <span
                key={idx}
                className="font-mono text-[10px] px-2 py-0.5 rounded bg-rose-500/15 text-rose-200 border border-rose-500/30"
              >
                {sk}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
