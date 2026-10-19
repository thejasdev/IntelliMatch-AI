import React, { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  Layers,
  Search,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  Code2,
  ExternalLink,
  BookOpen,
  FileText,
  Eye,
  Download,
  X,
  ChevronRight,
  ShieldAlert,
  Cpu,
} from "lucide-react";
import { CURATED_PROJECTS, getProjectsByFilter } from "../../data/projects.js";
import { ENGINEERING_DOMAINS } from "../../data/jobRoles.js";

export default function ProjectsPage({ onPreviewPdf }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialDomain = searchParams.get("domain") || "all";
  const initialId = searchParams.get("id");

  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedDomain, setSelectedDomain] = useState(initialDomain);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeProjectGuide, setActiveProjectGuide] = useState(
    initialId ? CURATED_PROJECTS.find((p) => p.id === initialId) : null
  );

  const selectedDomainMeta = useMemo(() => {
    if (selectedDomain === "all") return null;
    return ENGINEERING_DOMAINS.find((d) => d.id === selectedDomain);
  }, [selectedDomain]);

  const filteredProjects = useMemo(() => {
    let list = getProjectsByFilter({
      difficulty: selectedDifficulty,
      domain: selectedDomain,
    });
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          (p.description && p.description.toLowerCase().includes(q)) ||
          (p.deliverable && p.deliverable.toLowerCase().includes(q)) ||
          p.skills.some((s) => s.toLowerCase().includes(q))
      );
    }
    return list;
  }, [selectedDifficulty, selectedDomain, searchQuery]);

  const handleDomainChange = (e) => {
    const val = e.target.value;
    setSelectedDomain(val);
    setSearchParams(val === "all" ? {} : { domain: val });
  };

  const handleTriggerHandbookPreview = () => {
    if (onPreviewPdf) {
      const domainName = selectedDomainMeta?.name || "All Engineering Domains";
      onPreviewPdf({
        file: null,
        title: `${domainName} — Complete Project Handbook & Implementation Blueprint`,
        badge: "Projects Handbook",
        isAvailable: false,
        description: `Official comprehensive project guide with architecture schemas, step-by-step phases, and testing criteria for ${domainName}.`,
      });
    }
  };

  return (
    <div className="space-y-8 pt-6 sm:pt-8 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="im-card p-6 md:p-8 space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-violet">
          Portfolio &amp; Engineering Lab
        </span>
        <h1 className="text-2xl md:text-3xl font-bold font-heading text-brand-slate m-0">
          Projects Hub &amp; Blueprints
        </h1>
        <p className="text-sm text-brand-muted leading-relaxed m-0 max-w-3xl">
          Translate theoretical algorithms and concepts into verified, tangible engineering deliverables.
          Categorized by practical difficulty, domain architecture, and recruiter relevance.
        </p>
      </div>

      {/* Projects Handbook Action Bar */}
      <div className="im-card p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-l-4 border-l-brand-cyan">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-brand-cyan/15 text-brand-cyan flex items-center justify-center flex-shrink-0">
            <FileText size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base font-bold font-heading text-brand-slate m-0">
                {selectedDomainMeta ? selectedDomainMeta.name : "All Engineering Domains"} &mdash; Complete Projects Guide
              </h3>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                Handbook in Prep
              </span>
            </div>
            <p className="text-xs text-brand-muted m-0 mt-0.5">
              Detailed architecture diagrams, API schemas, verification checklists, and GitHub templates.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-end flex-shrink-0">
          <button
            type="button"
            onClick={handleTriggerHandbookPreview}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-surface hover:bg-brand-violet hover:text-white text-brand-violet text-xs font-semibold border border-brand-border transition-all shadow-xs"
          >
            <Eye size={14} />
            <span>Preview Full PDF</span>
          </button>

          <button
            type="button"
            onClick={handleTriggerHandbookPreview}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-surface hover:bg-brand-violet hover:text-white text-brand-violet text-xs font-semibold border border-brand-border transition-all shadow-xs"
          >
            <ExternalLink size={14} />
            <span>Open in Tab</span>
          </button>

          <button
            type="button"
            onClick={handleTriggerHandbookPreview}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-violet hover:bg-brand-violetHover text-white text-xs font-semibold shadow-xs transition-all"
          >
            <Download size={14} />
            <span>Download Full PDF</span>
          </button>
        </div>
      </div>

      {/* Domain Overview Header Card (Before Project Cards) */}
      {selectedDomainMeta ? (
        <div className="im-card p-6 sm:p-7 space-y-4 border-t-2 border-t-brand-violet">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-brand-border">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-violet">
                Domain Track Architecture
              </span>
              <h2 className="text-xl font-bold font-heading text-brand-slate m-0">
                {selectedDomainMeta.name} Track Overview
              </h2>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-brand-surface text-brand-violet border border-brand-border w-fit">
              {filteredProjects.length} Curated Project Blueprints
            </span>
          </div>

          <p className="text-xs sm:text-sm text-brand-slate leading-relaxed m-0 font-normal">
            {selectedDomainMeta.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-brand-surface border border-brand-border space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-slate">
                Target Engineering Roles:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedDomainMeta.roles.map((r) => (
                  <span
                    key={r.id}
                    className="text-[11px] px-2 py-0.5 rounded bg-brand-card text-brand-slate border border-brand-border"
                  >
                    {r.title}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-brand-surface border border-brand-border space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-slate">
                Core Competency Focus:
              </span>
              <p className="text-xs text-brand-muted m-0">
                Emphasis on industry-standard deployment, automated testing, production architecture,
                and scalable implementation suitable for recruiter evaluation.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="im-card p-6 space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-brand-violet">
            Portfolio Strategy
          </span>
          <h3 className="text-base font-bold font-heading text-brand-slate m-0">
            Selecting Strategic Projects for Your Resume
          </h3>
          <p className="text-xs text-brand-muted leading-relaxed m-0">
            Recruiters prioritize completed end-to-end deliverables over unfinished complex ideas.
            Start with Beginner or Intermediate blueprints to master the tech stack before attempting advanced distributed systems.
          </p>
        </div>
      )}

      {/* Filter Toolbar */}
      <div className="im-card p-4 sm:p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Search bar */}
          <div className="md:col-span-5 relative">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects, skills or technologies..."
              className="w-full pl-9 pr-3.5 py-2.5 text-xs rounded-xl border border-brand-border bg-brand-surface text-brand-slate placeholder:text-brand-muted focus:outline-none focus:border-brand-violet"
            />
          </div>

          {/* Domain Filter Dropdown */}
          <div className="md:col-span-4">
            <select
              value={selectedDomain}
              onChange={handleDomainChange}
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-brand-border bg-brand-surface text-brand-slate focus:outline-none focus:border-brand-violet font-medium"
            >
              <option value="all">All 10 Technical Domains</option>
              {ENGINEERING_DOMAINS.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          {/* Results Count */}
          <div className="md:col-span-3 text-right">
            <span className="text-xs font-semibold text-brand-muted">
              Showing <strong className="text-brand-slate">{filteredProjects.length}</strong> Blueprints
            </span>
          </div>
        </div>

        {/* Difficulty Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-brand-border">
          <span className="text-xs font-bold text-brand-slate mr-2">Difficulty:</span>
          {[
            { id: "all", label: "All Levels" },
            { id: "beginner", label: "Beginner" },
            { id: "intermediate", label: "Intermediate" },
            { id: "advanced", label: "Advanced" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedDifficulty(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium capitalize transition-all ${
                selectedDifficulty === tab.id
                  ? "bg-brand-violet text-white shadow-xs font-semibold"
                  : "bg-brand-surface text-brand-slate border border-brand-border hover:bg-brand-card hover:text-brand-violet"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="im-card im-card-lift p-6 flex flex-col justify-between group"
          >
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <span
                  className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full capitalize ${
                    project.difficulty === "beginner" || project.difficulty === "Beginner"
                      ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                      : project.difficulty === "intermediate" || project.difficulty === "Intermediate"
                      ? "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                      : "bg-purple-500/15 text-purple-300 border border-purple-500/30"
                  }`}
                >
                  {project.difficulty}
                </span>

                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-brand-muted">
                  <Clock size={12} /> {project.estimatedHours || "Self-Paced"}
                </span>
              </div>

              <div>
                <h3 className="font-heading font-bold text-base text-brand-slate m-0 group-hover:text-brand-cyan transition-colors">
                  {project.title}
                </h3>
                <span className="text-[11px] font-semibold text-brand-cyan block mt-0.5">
                  {ENGINEERING_DOMAINS.find((d) => d.id === project.domainId)?.name || project.domain || project.domainId}
                </span>
              </div>

              <p className="text-xs text-brand-muted leading-relaxed m-0">
                {project.description || project.deliverable || ""}
              </p>

              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-bold text-brand-slate block">Expected Deliverable:</span>
                <ul className="text-xs text-brand-muted space-y-1 pl-4 m-0 list-disc">
                  {(Array.isArray(project.deliverables)
                    ? project.deliverables
                    : (project.deliverable ? [project.deliverable] : [])
                  ).slice(0, 2).map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>

              <div className="pt-1">
                <span className="text-[11px] font-bold text-brand-slate block mb-1">
                  Skills &amp; Technologies:
                </span>
                <div className="flex flex-wrap gap-1">
                  {(project.skills || []).map((s) => (
                    <span
                      key={s}
                      className="text-[10px] px-2 py-0.5 rounded bg-brand-surface text-brand-cyan font-medium border border-brand-border/80"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 mt-5 border-t border-brand-border/60 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setActiveProjectGuide(project)}
                className="text-xs font-semibold text-brand-cyan hover:underline inline-flex items-center gap-1"
              >
                <span>View Project Guide</span>
                <ChevronRight size={13} />
              </button>

              <Link
                to="/analyzer"
                className="text-xs text-brand-muted hover:text-white font-medium"
              >
                Benchmark &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* View Project Guide Modal with Complete Structured Sections */}
      {activeProjectGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="im-card w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden shadow-dropdown border border-brand-border">
            {/* Modal Header */}
            <div className="p-6 border-b border-brand-border flex items-start justify-between bg-brand-surface/90">
              <div>
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full capitalize bg-brand-violet text-white">
                    {activeProjectGuide.difficulty}
                  </span>
                  <span className="text-xs text-brand-cyan font-semibold">
                    {ENGINEERING_DOMAINS.find((d) => d.id === activeProjectGuide.domainId)?.name || activeProjectGuide.domain}
                  </span>
                  <span className="text-xs text-brand-muted font-medium">
                    &bull; Est: {activeProjectGuide.estimatedHours || "Self-Paced"}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-lg sm:text-xl text-brand-slate m-0">
                  {activeProjectGuide.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveProjectGuide(null)}
                className="p-1.5 rounded-lg text-brand-muted hover:text-brand-slate hover:bg-brand-card transition-colors"
                aria-label="Close Project Guide"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5 text-xs">
              {/* 1. Problem and Purpose */}
              <div className="space-y-1.5">
                <span className="font-bold text-brand-cyan uppercase tracking-wide flex items-center gap-1.5">
                  <Sparkles size={13} />
                  <span>Problem Statement &amp; Purpose:</span>
                </span>
                <p className="text-brand-slate leading-relaxed m-0 font-medium">
                  {activeProjectGuide.description || activeProjectGuide.deliverable}
                </p>
                {activeProjectGuide.highlights && (
                  <p className="text-brand-muted leading-relaxed m-0 italic">
                    Why it matters: {activeProjectGuide.highlights}
                  </p>
                )}
              </div>

              {/* 2. Main Features & Deliverables */}
              <div className="space-y-1.5">
                <span className="font-bold text-brand-slate uppercase tracking-wide block">
                  Core Deliverables &amp; Features:
                </span>
                <ul className="list-disc pl-4 space-y-1 text-brand-muted m-0">
                  {(Array.isArray(activeProjectGuide.deliverables)
                    ? activeProjectGuide.deliverables
                    : (activeProjectGuide.deliverable ? [activeProjectGuide.deliverable] : [])
                  ).map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                  <li>Clean GitHub repository structure with architectural diagram and README.</li>
                </ul>
              </div>

              {/* 3. Prerequisites */}
              {activeProjectGuide.prerequisites && (
                <div className="p-3.5 rounded-xl bg-brand-surface border border-brand-border space-y-1">
                  <span className="font-bold text-brand-slate uppercase tracking-wide block">
                    Technical Prerequisites:
                  </span>
                  <p className="text-brand-muted m-0">{activeProjectGuide.prerequisites}</p>
                </div>
              )}

              {/* 4. Tool Choices & Tech Stack */}
              <div className="space-y-1.5">
                <span className="font-bold text-brand-slate uppercase tracking-wide block">
                  Recommended Tooling &amp; Stack:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(activeProjectGuide.skills || []).map((s) => (
                    <span
                      key={s}
                      className="text-[11px] px-2.5 py-1 rounded-md bg-brand-surface text-brand-cyan font-medium border border-brand-border"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* 5. Setup and Implementation Milestones */}
              <div className="space-y-2">
                <span className="font-bold text-brand-slate uppercase tracking-wide block">
                  Implementation Milestones:
                </span>
                <div className="space-y-2">
                  <div className="p-3 rounded-xl bg-brand-card border border-brand-border flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-brand-violet text-white font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                      1
                    </div>
                    <div>
                      <div className="font-semibold text-brand-slate">Architecture &amp; Scaffolding</div>
                      <div className="text-brand-muted">Initialize repository, configure build toolchains, establish folder structure and dependencies.</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-brand-card border border-brand-border flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-brand-violet text-white font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                      2
                    </div>
                    <div>
                      <div className="font-semibold text-brand-slate">Core Logic &amp; Integration</div>
                      <div className="text-brand-muted">Implement core data structures, algorithms, external API endpoints, and component logic.</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-brand-card border border-brand-border flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-brand-violet text-white font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                      3
                    </div>
                    <div>
                      <div className="font-semibold text-brand-slate">Testing, Benchmarking &amp; Deployment</div>
                      <div className="text-brand-muted">Write unit and integration tests, measure throughput/latency, and deploy to a public hosting environment.</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 6. Testing, Validation & Limitations */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-brand-surface border border-brand-border space-y-1">
                  <span className="font-bold text-brand-slate uppercase tracking-wide block">
                    Testing &amp; Validation:
                  </span>
                  <p className="text-brand-muted m-0 leading-relaxed">
                    Write automated unit tests targeting core logic, mock external APIs, and verify edge-case error handling with 80%+ code coverage.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-brand-surface border border-brand-border space-y-1">
                  <span className="font-bold text-brand-slate uppercase tracking-wide block">
                    Scope &amp; Honest Limitations:
                  </span>
                  <p className="text-brand-muted m-0 leading-relaxed">
                    Designed as a self-contained portfolio prototype. Production multi-region scaling and enterprise SSO would require cloud infrastructure setup.
                  </p>
                </div>
              </div>

              {/* 7. Recommended Resume Bullet Point */}
              <div className="space-y-1.5">
                <span className="font-bold text-brand-cyan uppercase tracking-wide block">
                  Recommended Resume Bullet Point:
                </span>
                <div className="p-3.5 rounded-xl bg-brand-surface border border-brand-cyan/30 text-brand-slate font-medium leading-relaxed">
                  &bull; Engineered <strong>{activeProjectGuide.title}</strong> using {activeProjectGuide.skills.slice(0, 3).join(", ")}, delivering {activeProjectGuide.deliverable ? activeProjectGuide.deliverable.toLowerCase().slice(0, 80) + "..." : "production features"} with automated test coverage and containerized deployment.
                </div>
              </div>

              {/* 8. Related Roadmap Milestones Link */}
              <div className="p-3.5 rounded-xl bg-brand-card border border-brand-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <BookOpen size={16} className="text-brand-cyan" />
                  <span className="text-brand-slate font-medium">
                    Aligned with {ENGINEERING_DOMAINS.find((d) => d.id === activeProjectGuide.domainId)?.name || "Domain"} Roadmap
                  </span>
                </div>
                <Link
                  to={`/roadmaps?domain=${activeProjectGuide.domainId}`}
                  className="font-semibold text-brand-cyan hover:underline inline-flex items-center gap-1"
                  onClick={() => setActiveProjectGuide(null)}
                >
                  <span>View Domain Roadmap</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-brand-border flex items-center justify-between bg-brand-surface/90">
              <button
                type="button"
                onClick={() => setActiveProjectGuide(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-brand-muted hover:text-brand-slate"
              >
                Close
              </button>

              <div className="flex items-center gap-2">
                <Link
                  to="/analyzer"
                  onClick={() => setActiveProjectGuide(null)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-violet hover:bg-brand-violetHover text-white text-xs font-semibold shadow-xs"
                >
                  <span>Benchmark in Resume Analyzer</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
