import React, { useState } from "react";
import {
  Sparkles,
  Layers,
  Cpu,
  CheckCircle2,
  HelpCircle,
  Briefcase,
  Terminal,
  ArrowRight,
} from "lucide-react";

export default function DomainExplorerPanel({ domainData, isDataOrAi = false }) {
  const [activeTab, setActiveTab] = useState("overview"); // overview | applications | work | tech

  if (!domainData) return null;

  const tabs = [
    { id: "overview", label: "Overview & Impact", icon: Sparkles },
    { id: "applications", label: "Real-World Applications", icon: Layers },
    { id: "work", label: "Inside Professional Work", icon: Briefcase },
    { id: "tech", label: "Core Technologies & Stack", icon: Terminal },
  ];

  return (
    <div className="console-frame rounded-2xl p-5 sm:p-6 bg-[#050916]/95 border border-slate-800/90 shadow-2xl space-y-4">
      {/* Header with Domain metadata & Tab Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-cyan-400">
              Layer 1 • Domain Exploration
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-400/30">
              5 Core IT Tracks
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-white m-0">
            {domainData.name || domainData.title}
          </h2>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#080E20] p-1 rounded-xl border border-slate-800 self-start">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600/30 to-cyan-500/30 text-cyan-200 border border-cyan-400/50 shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Icon size={13} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab 1: Overview & Impact */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 pt-1">
          <div className="md:col-span-7 space-y-3">
            <span className="font-mono text-xs uppercase tracking-wider text-slate-400 block">
              Domain Scope &amp; Industrial Relevance
            </span>
            <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed m-0">
              {domainData.overview || domainData.description}
            </p>
            <div className="p-3.5 rounded-xl bg-[#080E20] border border-cyan-500/20 text-xs text-slate-300 space-y-1">
              <strong className="text-cyan-300 block font-mono">Why Companies Hire Freshers in This Track:</strong>
              <p className="m-0 leading-relaxed">
                {domainData.why_it_matters ||
                  "Companies prioritize structured problem-solving, clean code hygiene, and verified project deliverables over raw syntax memorization."}
              </p>
            </div>
          </div>

          <div className="md:col-span-5 p-4 rounded-xl bg-[#070C1B] border border-slate-800/90 space-y-2.5">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-indigo-300 block">
              Track Highlights
            </span>
            <ul className="space-y-2 font-sans text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Milestones:</strong> {domainData.milestone_count || 8} progressive semester milestones</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Roles Covered:</strong> {domainData.roles?.length || 4} targeted career pathways</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Industry Readiness:</strong> 4-Year progressive curriculum from 1st Year to Fresher Hiring Bar</span>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Tab 2: Real-World Applications */}
      {activeTab === "applications" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
          {(domainData.applications && domainData.applications.length > 0
            ? domainData.applications
            : [
                { title: "High-Throughput Systems", description: "Scalable platforms handling high concurrent user demand." },
                { title: "Enterprise Intelligence", description: "Analytical reporting systems delivering business decision support." },
                { title: "Distributed Microservices", description: "Low-latency REST and streaming event pipelines." },
                { title: "Cloud Infrastructure", description: "Automated container orchestration and zero-downtime deployment." },
              ]
          ).map((app, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-[#080E20] border border-slate-800/90 space-y-1.5 hover:border-cyan-500/40 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-[10px] font-bold flex items-center justify-center">
                  0{idx + 1}
                </span>
                <h4 className="font-serif text-sm font-bold text-white m-0">
                  {app.title}
                </h4>
              </div>
              <p className="font-sans text-xs text-slate-300 leading-relaxed m-0">
                {app.description}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Inside Professional Work */}
      {activeTab === "work" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
          {(domainData.professional_work && domainData.professional_work.length > 0
            ? domainData.professional_work
            : [
                { title: "Architectural Planning", description: "Designing database models, API interfaces, and system boundaries." },
                { title: "Writing Production Code", description: "Implementing features with unit and integration test coverage." },
                { title: "Optimizing Performance", description: "Profiling query execution and reducing latency bottlenecks." },
                { title: "CI/CD & Pull Requests", description: "Reviewing code changes and maintaining automated build workflows." },
              ]
          ).map((work, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-[#080E20] border border-slate-800/90 space-y-1.5"
            >
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 font-mono text-[10px] font-bold flex items-center justify-center">
                  0{idx + 1}
                </span>
                <h4 className="font-serif text-sm font-bold text-white m-0">
                  {work.title}
                </h4>
              </div>
              <p className="font-sans text-xs text-slate-300 leading-relaxed m-0">
                {work.description}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Core Technologies & Stack */}
      {activeTab === "tech" && (
        <div className="space-y-2.5 pt-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {(domainData.technologies && domainData.technologies.length > 0
              ? domainData.technologies
              : [
                  { name: "SQL", description: "Universal language of relational databases.", why_it_matters: "Tested in all junior technical assessments." },
                  { name: "Python", description: "Scripting and computational automation.", why_it_matters: "Primary tool for data manipulation and backend services." },
                  { name: "Docker", description: "Isolated containerization standard.", why_it_matters: "Guarantees reproducible dev and production environments." },
                ]
            ).map((tech, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-[#080E20] border border-slate-800/90 space-y-1 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-cyan-300">
                    {tech.name}
                  </span>
                  <span className="font-mono text-[10px] text-slate-400">Core Tool</span>
                </div>
                <p className="font-sans text-xs text-slate-300 leading-snug m-0">
                  {tech.description}
                </p>
                {tech.why_it_matters && (
                  <p className="font-sans text-[11px] text-slate-400 leading-tight m-0 pt-1 border-t border-slate-800">
                    <strong className="text-slate-300">Why it matters:</strong> {tech.why_it_matters}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
