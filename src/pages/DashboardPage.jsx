import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  FileCheck2,
  TrendingUp,
  Layers,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Download,
  CheckCircle2,
  FileText,
  Filter,
  BarChart3,
  Compass,
} from "lucide-react";
import { ENGINEERING_DOMAINS, getRolesForDomain } from "../../data/jobRoles.js";

const DEMO_ANALYSES = [
  {
    id: "AN-104",
    role: "Senior Full-Stack Software Engineer",
    domainId: "software-dev",
    domainName: "Software Development",
    company: "Apex Digital Systems",
    date: "Today, 10:14 AM",
    score: 87,
    status: "Strong Match",
    statusBadge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  },
  {
    id: "AN-103",
    role: "Cloud Infrastructure & DevOps Engineer",
    domainId: "cloud-devops",
    domainName: "Cloud, DevOps and Infrastructure",
    company: "Stratus Cloud Networks",
    date: "Yesterday",
    score: 83,
    status: "Good Match",
    statusBadge: "bg-blue-500/15 text-blue-300 border-blue-500/30",
  },
  {
    id: "AN-102",
    role: "Machine Learning & AI Engineer",
    domainId: "ai-ml",
    domainName: "AI and Machine Learning",
    company: "Neural Horizons Labs",
    date: "Oct 11, 2026",
    score: 72,
    status: "Skill Gap Identified",
    statusBadge: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  },
  {
    id: "AN-101",
    role: "Cybersecurity & SOC Analyst",
    domainId: "cybersecurity",
    domainName: "Cybersecurity",
    company: "Vanguard Defense Corp",
    date: "Oct 08, 2026",
    score: 79,
    status: "Good Match",
    statusBadge: "bg-blue-500/15 text-blue-300 border-blue-500/30",
  },
  {
    id: "AN-100",
    role: "Data Systems Architect & Pipeline Engineer",
    domainId: "data-engineering",
    domainName: "Data Engineering & Big Data",
    company: "InfiniData Lakehouse",
    date: "Oct 04, 2026",
    score: 68,
    status: "Skill Gap Identified",
    statusBadge: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  },
];

const SAVED_RESUMES = [
  {
    id: "res-1",
    name: "Alex_Morgan_Software_Engineer.pdf",
    domain: "Software Development",
    updated: "Oct 12, 2026",
    size: "142 KB",
    template: "Technical Projects",
    fileUrl: "/assets/resume-templates/technical-projects.pdf",
  },
  {
    id: "res-2",
    name: "Alex_Morgan_Cloud_DevOps.docx",
    domain: "Cloud, DevOps & Infra",
    updated: "Oct 08, 2026",
    size: "98 KB",
    template: "Clean Professional",
    fileUrl: "/assets/resume-templates/clean-professional.pdf",
  },
  {
    id: "res-3",
    name: "Alex_Morgan_Fresher_Core.pdf",
    domain: "General Engineering",
    updated: "Oct 01, 2026",
    size: "115 KB",
    template: "Fresher Project Focused",
    fileUrl: "/assets/resume-templates/fresher-project-focused.pdf",
  },
];

const DOMAIN_BENCHMARKS = [
  { domain: "Software Development", readiness: 87, color: "bg-brand-violet" },
  { domain: "Cloud & DevOps", readiness: 83, color: "bg-brand-cyan" },
  { domain: "Cybersecurity", readiness: 79, color: "bg-emerald-500" },
  { domain: "AI & Machine Learning", readiness: 72, color: "bg-indigo-500" },
  { domain: "Data Engineering", readiness: 68, color: "bg-amber-500" },
];

export default function DashboardPage({ onOpenContact }) {
  const [showEmptyState, setShowEmptyState] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState("all");
  const [selectedRole, setSelectedRole] = useState("all");

  const activeRoles = useMemo(() => {
    if (selectedDomain === "all") return [];
    return getRolesForDomain(selectedDomain, false) || [];
  }, [selectedDomain]);

  const filteredAnalyses = useMemo(() => {
    return DEMO_ANALYSES.filter((item) => {
      if (selectedDomain !== "all" && item.domainId !== selectedDomain) return false;
      return true;
    });
  }, [selectedDomain]);

  const avgScore = useMemo(() => {
    if (filteredAnalyses.length === 0) return 0;
    const sum = filteredAnalyses.reduce((acc, curr) => acc + curr.score, 0);
    return Math.round(sum / filteredAnalyses.length);
  }, [filteredAnalyses]);

  const handleResetFilters = () => {
    setSelectedDomain("all");
    setSelectedRole("all");
  };

  return (
    <div className="space-y-8 pt-6 sm:pt-8 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Page Header Banner */}
      <div className="im-card p-6 md:p-8 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-surface border border-brand-border text-brand-violet text-xs font-semibold mb-2">
              <LayoutDashboard size={14} />
              <span>Candidate Intelligence Portal</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold font-heading text-brand-slate m-0">
              Career Readiness Dashboard
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-brand-muted max-w-2xl font-sans m-0">
              Monitor your resume ATS scores, benchmark evaluation logs across 10 technology disciplines,
              saved portfolio documents, and skill readiness baselines.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setShowEmptyState(!showEmptyState)}
              className="px-4 py-2 text-xs font-medium rounded-xl border border-brand-border bg-brand-surface hover:bg-brand-card text-brand-slate transition-colors shadow-xs"
            >
              {showEmptyState ? "Show Populated Demo" : "Preview Fresh Empty State"}
            </button>
            <Link
              to="/analyzer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-brand-violet hover:bg-brand-violetHover text-white transition-all shadow-xs"
            >
              <FileCheck2 size={16} />
              <span>New Resume Analysis</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {showEmptyState ? (
        /* Empty State Screen */
        <div className="im-card max-w-xl mx-auto my-12 p-8 sm:p-10 text-center rounded-2xl border border-dashed border-brand-border">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-brand-surface text-brand-violet flex items-center justify-center border border-brand-border">
            <LayoutDashboard size={32} />
          </div>
          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-brand-surface text-brand-muted border border-brand-border mb-3">
            No Previous Records
          </span>
          <h2 className="text-xl sm:text-2xl font-heading font-bold text-brand-slate m-0">
            Your Career Dashboard is Fresh
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-brand-muted font-sans leading-relaxed m-0">
            You haven't evaluated a resume yet in this active session. Upload your resume or paste a job
            description across any of our 10 engineering domains to populate your telemetry history.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              to="/analyzer"
              className="px-5 py-2.5 text-xs font-semibold rounded-xl bg-brand-violet text-white hover:bg-brand-violetHover transition-colors shadow-xs"
            >
              Analyze First Resume
            </Link>
            <Link
              to="/templates"
              className="px-5 py-2.5 text-xs font-semibold rounded-xl border border-brand-border bg-brand-surface text-brand-slate hover:bg-brand-card transition-colors shadow-xs"
            >
              Browse PDF Templates
            </Link>
          </div>
        </div>
      ) : (
        /* Populated Dashboard Content */
        <div className="space-y-6">
          {/* Demo Notice Banner */}
          <div className="p-4 rounded-xl border border-brand-violet/20 bg-brand-surface flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wider uppercase bg-brand-violet text-white">
                Demo Telemetry
              </span>
              <p className="text-xs sm:text-sm text-brand-slate m-0 leading-normal">
                <strong>Notice:</strong> This dashboard displays demonstration analytics and multi-domain
                baselines. Live candidate profiles and persistent historical analytics will link directly
                to the microservice in Phase 2.
              </p>
            </div>
            <button
              type="button"
              onClick={onOpenContact}
              className="text-xs font-semibold text-brand-violet hover:underline whitespace-nowrap"
            >
              Submit Inquiries
            </button>
          </div>

          {/* Filter Bar */}
          <div className="im-card p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-bold text-brand-slate uppercase tracking-wider flex items-center gap-1.5">
                <Filter size={14} className="text-brand-violet" />
                Filter Track:
              </span>
              <div className="min-w-[200px]">
                <select
                  id="dash-domain-select"
                  value={selectedDomain}
                  onChange={(e) => {
                    setSelectedDomain(e.target.value);
                    setSelectedRole("all");
                  }}
                  className="w-full text-xs py-2 px-3 rounded-xl border border-brand-border bg-brand-surface focus:outline-none focus:border-brand-violet text-brand-slate font-medium"
                >
                  <option value="all">All 10 Domains</option>
                  {ENGINEERING_DOMAINS.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="min-w-[200px]">
                <select
                  id="dash-role-select"
                  value={selectedRole}
                  disabled={selectedDomain === "all"}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full text-xs py-2 px-3 rounded-xl border border-brand-border bg-brand-surface focus:outline-none focus:border-brand-violet text-brand-slate font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="all">
                    {selectedDomain === "all" ? "All Domain Roles" : "All Roles in Domain"}
                  </option>
                  {activeRoles.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {(selectedDomain !== "all" || selectedRole !== "all") && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 text-xs text-brand-violet hover:underline font-medium transition-colors"
              >
                <RotateCcw size={14} />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          {/* KPI Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="im-card im-card-lift p-5">
              <span className="text-xs font-semibold text-brand-muted uppercase tracking-wider block">
                Logged Evaluations
              </span>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-3xl font-heading font-bold text-brand-slate">
                  {filteredAnalyses.length}
                </span>
                <span className="text-xs font-semibold text-brand-violet bg-brand-surface border border-brand-border px-2.5 py-0.5 rounded-full">
                  Across Engineering
                </span>
              </div>
              <span className="mt-2 text-xs text-brand-muted block">
                Based on target job descriptions
              </span>
            </div>

            <div className="im-card im-card-lift p-5">
              <span className="text-xs font-semibold text-brand-muted uppercase tracking-wider block">
                Average ATS Match
              </span>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-3xl font-heading font-bold text-brand-slate">
                  {avgScore}%
                </span>
                <span className="text-xs font-semibold text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <TrendingUp size={12} />
                  High Alignment
                </span>
              </div>
              <span className="mt-2 text-xs text-brand-muted block">
                Mean score of filtered logs
              </span>
            </div>

            <div className="im-card im-card-lift p-5">
              <span className="text-xs font-semibold text-brand-muted uppercase tracking-wider block">
                Active Domains
              </span>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-3xl font-heading font-bold text-brand-slate">10</span>
                <span className="text-xs font-semibold text-brand-cyan bg-brand-surface border border-brand-border px-2.5 py-0.5 rounded-full">
                  Full Spectrum
                </span>
              </div>
              <span className="mt-2 text-xs text-brand-muted block">
                40+ tech roles mapped
              </span>
            </div>

            <div className="im-card im-card-lift p-5">
              <span className="text-xs font-semibold text-brand-muted uppercase tracking-wider block">
                ATS PDF Templates
              </span>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-3xl font-heading font-bold text-brand-slate">5</span>
                <span className="text-xs font-semibold text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 size={12} />
                  Ready
                </span>
              </div>
              <span className="mt-2 text-xs text-brand-muted block">
                Vector PDFs with selectable text
              </span>
            </div>
          </div>

          {/* Split Grid: Recent Analyses & Saved Resumes */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: Recent Analyses */}
            <div className="lg:col-span-2 im-card overflow-hidden flex flex-col justify-between">
              <div>
                <div className="p-5 border-b border-brand-border bg-brand-surface flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-heading font-bold text-brand-slate m-0">
                      Recent Resume Analyses
                    </h2>
                    <p className="text-xs text-brand-muted mt-0.5 m-0">
                      Displaying {filteredAnalyses.length} evaluation sessions
                    </p>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-brand-violet/10 text-brand-violet border border-brand-violet/20">
                    Live Telemetry
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-brand-surface/70 border-b border-brand-border text-brand-muted uppercase tracking-wider">
                      <tr>
                        <th className="py-3 px-4 font-semibold">Target Role &amp; Domain</th>
                        <th className="py-3 px-4 font-semibold">Date</th>
                        <th className="py-3 px-4 font-semibold">Score</th>
                        <th className="py-3 px-4 font-semibold">Status</th>
                        <th className="py-3 px-4 font-semibold text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-border text-brand-slate">
                      {filteredAnalyses.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="py-8 text-center text-brand-muted">
                            No records found for the selected domain filter.
                          </td>
                        </tr>
                      ) : (
                        filteredAnalyses.map((item) => (
                          <tr key={item.id} className="hover:bg-brand-surface/40 transition-colors">
                            <td className="py-3.5 px-4">
                              <div className="font-semibold text-brand-slate">{item.role}</div>
                              <div className="text-[11px] text-brand-muted mt-0.5">
                                {item.domainName} &bull; <span className="text-brand-slate font-medium">{item.company}</span>
                              </div>
                            </td>
                            <td className="py-3.5 px-4 text-brand-muted whitespace-nowrap">
                              {item.date}
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="flex items-center gap-1.5">
                                <span className="font-bold text-sm text-brand-violet">
                                  {item.score}%
                                </span>
                                <div className="w-12 h-1.5 rounded-full bg-brand-surface overflow-hidden border border-brand-border">
                                  <div
                                    className="h-full bg-brand-violet rounded-full"
                                    style={{ width: `${item.score}%` }}
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <span
                                className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold border ${item.statusBadge}`}
                              >
                                {item.status}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-right whitespace-nowrap">
                              <Link
                                to="/analyzer"
                                className="inline-flex items-center gap-1 text-xs font-semibold text-brand-violet hover:text-brand-violetHover bg-brand-surface hover:bg-brand-violet/10 border border-brand-border px-2.5 py-1.5 rounded-lg transition-colors"
                              >
                                <span>Re-run</span>
                                <ArrowRight size={12} />
                              </Link>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="p-4 border-t border-brand-border bg-brand-surface flex items-center justify-between text-xs text-brand-muted">
                <span>Logged records are stored in memory for this session</span>
                <Link to="/analyzer" className="font-semibold text-brand-violet hover:underline">
                  Run fresh ATS scan &rarr;
                </Link>
              </div>
            </div>

            {/* Right 1 Col: Saved Resumes & Blueprints */}
            <div className="im-card overflow-hidden flex flex-col justify-between">
              <div>
                <div className="p-5 border-b border-brand-border bg-brand-surface">
                  <h2 className="text-base font-heading font-bold text-brand-slate m-0">
                    Saved Documents
                  </h2>
                  <p className="text-xs text-brand-muted mt-0.5 m-0">
                    Session resume drafts &amp; template blueprints
                  </p>
                </div>

                <div className="p-5 space-y-3">
                  {SAVED_RESUMES.map((res) => (
                    <div
                      key={res.id}
                      className="p-3.5 rounded-xl border border-brand-border bg-brand-surface hover:border-brand-violet/40 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <span className="text-xs font-semibold text-brand-slate truncate block">
                            {res.name}
                          </span>
                          <span className="text-[11px] text-brand-violet font-medium">
                            {res.domain}
                          </span>
                        </div>
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-brand-card text-brand-violet border border-brand-border whitespace-nowrap">
                          {res.template}
                        </span>
                      </div>

                      <div className="mt-3 pt-2 border-t border-brand-border/60 flex items-center justify-between text-[11px] text-brand-muted">
                        <span>Updated {res.updated} &bull; {res.size}</span>
                        <a
                          href={res.fileUrl}
                          download
                          className="inline-flex items-center gap-1 font-semibold text-brand-violet hover:underline"
                        >
                          <Download size={12} />
                          <span>Download</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 border-t border-brand-border bg-brand-surface">
                <Link
                  to="/templates"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-brand-violet text-white text-xs font-semibold hover:bg-brand-violetHover transition-colors shadow-xs"
                >
                  <FileText size={14} />
                  <span>Browse All 5 Resume Templates</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Section: Multi-Domain Career Readiness Overview */}
          <div className="im-card p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-base font-heading font-bold text-brand-slate flex items-center gap-2 m-0">
                  <BarChart3 size={18} className="text-brand-violet" />
                  Candidate Multi-Domain Readiness Benchmarks
                </h3>
                <p className="text-xs text-brand-muted mt-1 m-0">
                  Normalized ATS scoring across top technology disciplines according to your evaluated skills
                </p>
              </div>
              <Link
                to="/roadmaps"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-violet hover:underline"
              >
                <Compass size={14} />
                <span>Explore Skill Roadmaps</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {DOMAIN_BENCHMARKS.map((item) => (
                <div
                  key={item.domain}
                  className="p-4 rounded-xl border border-brand-border bg-brand-surface flex flex-col justify-between"
                >
                  <div>
                    <span className="text-xs font-bold text-brand-slate block truncate">
                      {item.domain}
                    </span>
                    <span className="text-[11px] text-brand-muted">Benchmark Match</span>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-baseline justify-between mb-1.5">
                      <span className="text-lg font-heading font-bold text-brand-slate">
                        {item.readiness}%
                      </span>
                      <span className="text-[10px] font-semibold text-emerald-400">
                        {item.readiness >= 80 ? "Target Ready" : "Growing"}
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-brand-border overflow-hidden">
                      <div
                        className={`h-full rounded-full ${item.color}`}
                        style={{ width: `${item.readiness}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
