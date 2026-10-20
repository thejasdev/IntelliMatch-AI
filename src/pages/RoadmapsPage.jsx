import React, { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Map,
  Calendar,
  CheckCircle2,
  Clock,
  BookOpen,
  ArrowRight,
  Sparkles,
  Layers,
  Search,
  ExternalLink,
  FileText,
  Eye,
  Download,
  ChevronRight,
  Target,
} from "lucide-react";
import { ENGINEERING_DOMAINS, getRolesForDomain } from "../../data/jobRoles.js";
import { ROADMAP_DOMAINS, ROADMAP_YEARS, getRoadmapForDomainAndYear } from "../../data/roadmaps.js";
import { CURATED_PROJECTS } from "../../data/projects.js";

// Distinct role pathways for Data Science & Data Careers
const DATA_CAREER_PATHWAYS = [
  {
    id: "da-analyst",
    domainId: "data-analytics",
    title: "Data Analyst / BI Analyst",
    focus: "Descriptive & Diagnostic Analytics, Data Warehousing, KPI Dashboards",
    responsibilities: "Write advanced SQL, model star schemas in Snowflake/BigQuery, and deliver automated executive reporting dashboards in Power BI/Tableau.",
    coreSkills: ["Advanced SQL (Window Functions)", "Power BI / Tableau", "Python (Pandas)", "Data Modeling", "Statistical Variance"],
    suggestedTools: ["PostgreSQL", "Power BI", "Tableau", "Jupyter", "Excel Power Query"],
    sampleProject: "Automated Executive Sales KPI Dashboard & Data Mart",
  },
  {
    id: "da-scientist",
    domainId: "data-analytics",
    title: "Data Scientist",
    focus: "Predictive Analytics, Statistical Inference, Hypothesis Testing, Machine Learning",
    responsibilities: "Formulate hypothesis-driven experiments, engineer predictive features from behavioral logs, and validate machine learning models with A/B tests.",
    coreSkills: ["Python (Scikit-Learn, SciPy)", "Feature Engineering", "A/B Testing", "Statistical Inference", "SQL"],
    suggestedTools: ["Python", "Pandas", "Scikit-Learn", "Statsmodels", "Streamlit"],
    sampleProject: "Ecommerce Customer Cohort & Churn Exploration",
  },
  {
    id: "ai-mle",
    domainId: "ai-ml",
    title: "Machine Learning Engineer",
    focus: "Deep Learning, Transformer Architectures, Low-Latency Model Serving, MLOps",
    responsibilities: "Train and fine-tune neural network models, optimize GPU inference latency, containerize inference services with Docker, and track model drift.",
    coreSkills: ["PyTorch / TensorFlow", "FastAPI Serving", "Docker Containerization", "Hugging Face Transformers", "CUDA Basics"],
    suggestedTools: ["PyTorch", "Hugging Face", "Docker", "FastAPI", "MLflow"],
    sampleProject: "Production Low-Latency Transformer Serving & MLOps",
  },
  {
    id: "da-engineer",
    domainId: "data-analytics",
    title: "Data Engineer",
    focus: "Distributed Systems, Batch & Streaming ETL Orchestration, Lakehouse Architecture",
    responsibilities: "Build fault-tolerant batch and streaming ETL pipelines, automate workflow orchestration with Apache Airflow DAGs, and ensure data lake governance.",
    coreSkills: ["Apache Airflow", "Apache Spark", "SQL", "Python ETL", "Kafka", "Data Lakehouse"],
    suggestedTools: ["Apache Airflow", "Docker", "Apache Spark", "Kafka", "dbt"],
    sampleProject: "End-to-End Retail Demand Forecasting Pipeline",
  },
];

export default function RoadmapsPage({ onPreviewPdf }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialDomain = searchParams.get("domain") || "software-dev";

  const [selectedDomainId, setSelectedDomainId] = useState(initialDomain);
  const [selectedYearId, setSelectedYearId] = useState("year-1");
  const [selectedRoleId, setSelectedRoleId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedMilestone, setExpandedMilestone] = useState(0);

  const selectedDomainMeta = useMemo(() => {
    return ENGINEERING_DOMAINS.find((d) => d.id === selectedDomainId) || ENGINEERING_DOMAINS[0];
  }, [selectedDomainId]);

  const domainRoles = useMemo(() => {
    return getRolesForDomain(selectedDomainId);
  }, [selectedDomainId]);

  // Set default role when domain changes
  React.useEffect(() => {
    if (domainRoles && domainRoles.length > 0) {
      if (selectedDomainId === "data-analytics") {
        setSelectedRoleId("da-analyst");
      } else if (selectedDomainId === "ai-ml") {
        setSelectedRoleId("ai-mle");
      } else {
        setSelectedRoleId(domainRoles[0].id);
      }
    }
  }, [selectedDomainId, domainRoles]);

  const activeRole = useMemo(() => {
    return domainRoles.find((r) => r.id === selectedRoleId) || domainRoles[0] || null;
  }, [domainRoles, selectedRoleId]);

  const currentRoadmap = useMemo(() => {
    return getRoadmapForDomainAndYear(selectedDomainId, selectedYearId);
  }, [selectedDomainId, selectedYearId]);

  const filteredRoadmapDomains = useMemo(() => {
    if (!searchQuery.trim()) return ROADMAP_DOMAINS;
    const q = searchQuery.toLowerCase().trim();
    return ROADMAP_DOMAINS.filter((d) => d.name.toLowerCase().includes(q));
  }, [searchQuery]);

  // Related curated projects for active domain
  const relatedDomainProjects = useMemo(() => {
    return CURATED_PROJECTS.filter((p) => p.domainId === selectedDomainId);
  }, [selectedDomainId]);

  // Genuine localStorage progress persistence
  const [milestoneProgress, setMilestoneProgress] = useState(() => {
    try {
      const saved = localStorage.getItem("intellimatch_milestone_progress");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const updateMilestoneStatus = (milestoneKey, status, e) => {
    e?.stopPropagation();
    setMilestoneProgress((prev) => {
      const updated = { ...prev, [milestoneKey]: status };
      try {
        localStorage.setItem("intellimatch_milestone_progress", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const handleDomainChange = (id) => {
    setSelectedDomainId(id);
    setSearchParams({ domain: id });
    setExpandedMilestone(0);
  };

  const handleTriggerHandbookPreview = () => {
    if (onPreviewPdf) {
      onPreviewPdf({
        file: null,
        title: `${selectedDomainMeta.name} — 4-Year Curriculum & Milestone Guide`,
        badge: "Curriculum Handbook",
        isAvailable: false,
        description: `Official comprehensive handbook covering all semester milestones and competencies for ${selectedDomainMeta.name}.`,
      });
    }
  };

  const isDataOrAi = selectedDomainId === "data-analytics" || selectedDomainId === "ai-ml";

  return (
    <div className="space-y-8 pt-6 sm:pt-8 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="im-card p-6 md:p-8 space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-violet">
          Engineering Curriculum
        </span>
        <h1 className="text-2xl md:text-3xl font-bold font-heading text-brand-slate m-0">
          Domains &amp; Learning Roadmaps
        </h1>
        <p className="text-sm text-brand-muted leading-relaxed m-0 max-w-3xl">
          A non-linear, multi-year learning progression from foundational programming to industry-grade
          competencies across 10 specialized engineering domains.
        </p>
      </div>

      {/* Domain Roadmap PDF Action Bar */}
      <div className="im-card p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-l-4 border-l-brand-violet">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-brand-violet/10 text-brand-violet flex items-center justify-center flex-shrink-0">
            <FileText size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base font-bold font-heading text-brand-slate m-0">
                {selectedDomainMeta.name} &mdash; Official Curriculum Handbook
              </h3>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                PDF in Prep
              </span>
            </div>
            <p className="text-xs text-brand-muted m-0 mt-0.5">
              Complete multi-year semester syllabus, milestones, competencies &amp; project blueprints.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-end flex-shrink-0">
          <button
            type="button"
            onClick={handleTriggerHandbookPreview}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-surface hover:bg-brand-violet hover:text-white text-brand-cyan text-xs font-semibold border border-brand-border transition-all shadow-xs"
          >
            <Eye size={14} />
            <span>Preview PDF</span>
          </button>

          <button
            type="button"
            onClick={handleTriggerHandbookPreview}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-surface hover:bg-brand-violet hover:text-white text-brand-cyan text-xs font-semibold border border-brand-border transition-all shadow-xs"
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
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* Main Layout: Domain Selector Sidebar + Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Domain List */}
        <div className="lg:col-span-4 im-card p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-brand-border">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-slate">
              Technical Domains
            </span>
            <span className="text-xs text-brand-muted font-medium">10 Tracks</span>
          </div>

          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter domains..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-brand-border bg-brand-surface text-brand-slate placeholder:text-brand-muted focus:outline-none focus:border-brand-violet"
            />
          </div>

          <div className="space-y-1.5 max-h-[540px] overflow-y-auto pr-1">
            {filteredRoadmapDomains.map((domain) => (
              <button
                key={domain.id}
                type="button"
                onClick={() => handleDomainChange(domain.id)}
                className={`w-full text-left p-3 rounded-xl text-xs font-medium transition-all flex items-center justify-between ${
                  selectedDomainId === domain.id
                    ? "bg-brand-violet text-white font-semibold shadow-xs"
                    : "text-brand-slate hover:bg-brand-surface hover:text-brand-cyan border border-transparent"
                }`}
              >
                <span className="truncate pr-2">{domain.name}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-md font-semibold whitespace-nowrap ${
                    selectedDomainId === domain.id
                      ? "bg-white/20 text-white"
                      : "bg-brand-surface text-brand-muted border border-brand-border"
                  }`}
                >
                  {domain.totalMilestones} Milestones
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Active Domain Curriculum */}
        <div className="lg:col-span-8 space-y-6">
          {/* Active Domain Overview Card */}
          <div className="im-card p-6 sm:p-7 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-brand-border">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-violet">
                  Selected Career Track
                </span>
                <h2 className="text-xl font-bold font-heading text-brand-slate m-0">
                  {selectedDomainMeta.name}
                </h2>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-brand-surface text-brand-cyan border border-brand-border w-fit">
                {domainRoles.length} Targeted Job Roles
              </span>
            </div>

            <p className="text-xs text-brand-muted leading-relaxed m-0">
              {selectedDomainMeta.description}
            </p>

            {/* Specialized Role Pathways Section (Distinct pathways for Data Careers) */}
            <div className="space-y-2.5 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-brand-slate uppercase tracking-wide">
                  {isDataOrAi ? "Specialized Data & AI Pathways:" : "Select Role Pathway:"}
                </span>
                <span className="text-[10px] text-brand-muted font-medium">Click role to align checkpoint relevance</span>
              </div>

              {isDataOrAi ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {DATA_CAREER_PATHWAYS.map((pathway) => {
                    const isSelected = selectedRoleId === pathway.id;
                    return (
                      <button
                        key={pathway.id}
                        type="button"
                        onClick={() => {
                          setSelectedRoleId(pathway.id);
                          if (pathway.domainId !== selectedDomainId) {
                            handleDomainChange(pathway.domainId);
                          }
                        }}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          isSelected
                            ? "bg-brand-surface border-brand-cyan shadow-sm ring-1 ring-brand-cyan/40"
                            : "bg-brand-card border-brand-border hover:border-brand-violet/40 hover:bg-brand-surface/70"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-xs font-bold ${isSelected ? "text-brand-cyan" : "text-brand-slate"}`}>
                            {pathway.title}
                          </span>
                          {isSelected && (
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-brand-cyan/20 text-brand-cyan">
                              Active
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-brand-muted leading-tight m-0 line-clamp-2">
                          {pathway.focus}
                        </p>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {domainRoles.map((role) => (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => setSelectedRoleId(role.id)}
                      className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all ${
                        selectedRoleId === role.id
                          ? "bg-brand-violet text-white font-semibold shadow-xs border-brand-violet"
                          : "bg-brand-surface text-brand-slate hover:bg-brand-card hover:text-brand-cyan border-brand-border"
                      }`}
                    >
                      <strong>{role.title}</strong>
                      {role.experienceLevel && <span className="opacity-80"> &bull; {role.experienceLevel}</span>}
                    </button>
                  ))}
                </div>
              )}

              {/* Active Role Responsibilities Summary */}
              {activeRole && (
                <div className="p-3.5 rounded-xl bg-brand-surface/80 border border-brand-border space-y-1.5 mt-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-brand-slate">
                    <span>Target Profile: <strong>{activeRole.title}</strong></span>
                    <span className="text-[11px] text-brand-cyan">Skills Focus</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {(activeRole.skills || []).map((s) => (
                      <span key={s} className="text-[10px] px-2 py-0.5 rounded bg-brand-card text-brand-slate border border-brand-border">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Academic Level / Year Tabs */}
          <div className="flex flex-wrap gap-2">
            {ROADMAP_YEARS.map((y) => (
              <button
                key={y.id}
                type="button"
                onClick={() => {
                  setSelectedYearId(y.id);
                  setExpandedMilestone(0);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedYearId === y.id
                    ? "bg-brand-violet text-white shadow-xs"
                    : "bg-brand-card text-brand-slate border border-brand-border hover:bg-brand-surface hover:text-brand-cyan"
                }`}
              >
                <span>{y.label}:</span> <span className="font-normal opacity-90">{y.stage}</span>
              </button>
            ))}
          </div>

          {/* Year Roadmap Timeline & Milestones */}
          <div className="im-card p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-brand-border">
              <div className="flex items-center gap-2.5">
                <Calendar size={18} className="text-brand-violet" />
                <h3 className="text-base font-bold font-heading text-brand-slate m-0">
                  {currentRoadmap?.yearLabel || currentRoadmap?.yearMeta?.label || "Foundations"} &mdash; {currentRoadmap?.stageLabel || currentRoadmap?.yearMeta?.stage || "Year 1"}
                </h3>
              </div>
              <span className="text-xs font-bold text-brand-muted">
                {(currentRoadmap?.milestones || []).length} Milestones
              </span>
            </div>

            <div className="p-4 rounded-xl bg-brand-surface border border-brand-border">
              <div className="text-[11px] font-bold uppercase tracking-wider text-brand-cyan mb-1">
                Semester Learning Objective
              </div>
              <p className="text-xs text-brand-slate leading-relaxed m-0 font-medium">
                {currentRoadmap?.overview || currentRoadmap?.domain?.overview || "Master fundamental concepts and engineering workflows for this academic stage."}
              </p>
            </div>

            {/* Connected Numbered Stepper (Image 5 Reference) */}
            <div className="p-4 sm:p-5 rounded-2xl bg-brand-surface/90 border border-brand-border space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-cyan">
                  Connected Milestones Pathway
                </span>
                <span className="text-[11px] text-brand-muted">
                  Click any checkpoint to view syllabus &amp; tools
                </span>
              </div>

              <div className="relative py-3">
                {/* Continuous Connecting Line for Desktop */}
                <div className="hidden sm:block absolute top-[28px] left-[6%] right-[6%] h-[3px] bg-gradient-to-r from-[#0B57D0] via-[#0284C7] to-[#8B5CF6] -z-0 opacity-70 rounded-full" />

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 relative z-10">
                  {(currentRoadmap?.milestones || []).map((m, idx) => {
                    const stepNum = String(idx + 1).padStart(2, "0");
                    const isExpanded = expandedMilestone === idx;
                    const statusKey = `${selectedDomainId}_${selectedYearId}_${m.id || idx}`;
                    const currentStatus = milestoneProgress[statusKey] || "Not Started";

                    return (
                      <button
                        key={m.id || idx}
                        type="button"
                        onClick={() => setExpandedMilestone(idx)}
                        className={`text-center p-3 rounded-xl transition-all flex flex-col items-center group cursor-pointer ${
                          isExpanded
                            ? "bg-brand-card/90 ring-1 ring-brand-cyan shadow-sm"
                            : "hover:bg-brand-card/50"
                        }`}
                      >
                        {/* Numbered Circle Node */}
                        <div
                          className={`w-11 h-11 rounded-full text-xs font-heading font-extrabold flex items-center justify-center shadow-md transition-all duration-200 mb-2 ring-4 ${
                            currentStatus === "Completed"
                              ? "bg-emerald-600 text-white ring-emerald-500/30"
                              : isExpanded
                              ? "bg-gradient-to-br from-[#0B57D0] to-[#0284C7] text-white ring-cyan-400/50 scale-110"
                              : "bg-brand-card text-brand-slate border border-brand-border ring-white/10 group-hover:scale-105"
                          }`}
                        >
                          {currentStatus === "Completed" ? "✓" : stepNum}
                        </div>
                        <span className="text-xs font-bold text-brand-slate line-clamp-1 group-hover:text-brand-cyan transition-colors">
                          {m.title}
                        </span>
                        <span className="text-[10px] text-brand-muted mt-0.5">
                          {m.timeframe || m.duration || `Checkpoint ${stepNum}`}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Interactive Connected Milestones List */}
            <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-brand-border">
              {(currentRoadmap?.milestones || []).map((milestone, idx) => {
                const isExpanded = expandedMilestone === idx;
                const statusKey = `${selectedDomainId}_${selectedYearId}_${milestone.id || idx}`;
                const currentStatus = milestoneProgress[statusKey] || "Not Started";
                const totalMilestones = (currentRoadmap?.milestones || []).length;

                return (
                  <div
                    key={milestone.id || idx}
                    className={`relative p-5 sm:p-6 rounded-2xl border transition-all duration-200 cursor-pointer ${
                      isExpanded
                        ? "bg-brand-surface border-brand-cyan shadow-card ring-1 ring-brand-cyan/20"
                        : "bg-brand-card border-brand-border hover:border-brand-cyan/40 hover:shadow-subtle"
                    }`}
                    onClick={() => setExpandedMilestone(isExpanded ? null : idx)}
                  >
                    {/* Timeline Node Indicator */}
                    <div
                      className={`absolute -left-[33px] sm:-left-[41px] top-5 w-7 h-7 rounded-full text-white text-[11px] font-heading font-bold flex items-center justify-center ring-4 ring-[#181727] shadow-sm transition-colors ${
                        currentStatus === "Completed"
                          ? "bg-emerald-600"
                          : currentStatus === "In Progress"
                          ? "bg-amber-500"
                          : "bg-gradient-to-br from-[#0B57D0] to-[#0284C7]"
                      }`}
                    >
                      {currentStatus === "Completed" ? "✓" : String(idx + 1).padStart(2, "0")}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-heading font-bold text-base text-brand-slate m-0">
                          {milestone.title}
                        </h4>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        {/* Status Pills */}
                        <div
                          className="flex items-center gap-1 p-0.5 bg-brand-surface rounded-lg border border-brand-border"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {["Not Started", "In Progress", "Completed"].map((st) => (
                            <button
                              key={st}
                              type="button"
                              onClick={(e) => updateMilestoneStatus(statusKey, st, e)}
                              className={`text-[10px] px-2 py-0.5 rounded font-semibold transition-all ${
                                currentStatus === st
                                  ? st === "Completed"
                                    ? "bg-emerald-600 text-white shadow-xs"
                                    : st === "In Progress"
                                    ? "bg-amber-500 text-white shadow-xs"
                                    : "bg-brand-violet text-white shadow-xs"
                                  : "text-brand-muted hover:text-brand-slate"
                              }`}
                            >
                              {st}
                            </button>
                          ))}
                        </div>

                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-brand-muted bg-brand-surface px-2.5 py-0.5 rounded-full border border-brand-border">
                          <Clock size={11} /> {milestone.timeframe || milestone.duration || "4-6 Weeks"}
                        </span>
                        <span className="text-[11px] font-semibold text-brand-cyan">
                          {isExpanded ? "Collapse" : "Expand Checkpoint"}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-brand-muted leading-relaxed m-0 mt-2">
                      {milestone.description}
                    </p>

                    <div className="space-y-1.5 pt-3">
                      <div className="text-[11px] font-bold text-brand-slate">Topics &amp; Competencies:</div>
                      <div className="flex flex-wrap gap-1.5">
                        {(milestone.topics || milestone.skills || []).map((t) => (
                          <span
                            key={t}
                            className="text-[11px] px-2.5 py-0.5 rounded-md bg-brand-surface text-brand-cyan font-medium border border-brand-border/80"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Detailed Checkpoint Fields (Visible when Expanded) */}
                    {isExpanded && (
                      <div className="pt-4 mt-4 border-t border-brand-border/70 space-y-4 text-xs">
                        {/* Why it Matters for Active Role */}
                        <div className="p-3.5 rounded-xl bg-brand-card border border-brand-border space-y-1">
                          <span className="font-bold text-brand-cyan uppercase text-[10px] tracking-wider block">
                            🎯 Why this matters for {activeRole?.title || "your target role"}:
                          </span>
                          <p className="text-brand-slate leading-relaxed m-0 font-medium">
                            Mastering {milestone.title} establishes the required proficiency in {(milestone.topics || milestone.skills || []).slice(0, 2).join(" and ")} that recruiters and interviewers look for when evaluating {activeRole?.title || "engineering candidates"}.
                          </p>
                        </div>

                        {/* Practical Task & Suggested Tools */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="p-3.5 rounded-xl bg-brand-card border border-brand-border space-y-1">
                            <span className="font-bold text-brand-slate uppercase text-[10px] tracking-wider block">
                              🛠️ Suggested Tooling &amp; Environment:
                            </span>
                            <span className="text-brand-muted">
                              {(milestone.topics || milestone.skills || []).slice(0, 3).join(", ")}, Git version control, and development IDE.
                            </span>
                          </div>

                          <div className="p-3.5 rounded-xl bg-brand-card border border-brand-border space-y-1">
                            <span className="font-bold text-brand-slate uppercase text-[10px] tracking-wider block">
                              📋 Practical Milestone Challenge:
                            </span>
                            <span className="text-brand-muted">
                              {milestone.task || "Complete hands-on engineering exercises, run unit tests, and commit clean documentation to your GitHub repository."}
                            </span>
                          </div>
                        </div>

                        {/* Completion Criteria Checklist */}
                        <div className="p-3.5 rounded-xl bg-brand-card border border-brand-border space-y-1.5">
                          <span className="font-bold text-brand-slate uppercase text-[10px] tracking-wider block">
                            ✅ Checkpoint Completion Criteria:
                          </span>
                          <ul className="list-disc pl-4 space-y-1 text-brand-muted m-0">
                            <li>Demonstrate fluency in {(milestone.topics || milestone.skills || []).slice(0, 2).join(", ")}.</li>
                            <li>Write clean, tested implementation for the milestone challenge.</li>
                            <li>Commit verifiable portfolio project code to your public GitHub profile.</li>
                          </ul>
                        </div>

                        {/* Related Projects Link */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-2 border-t border-brand-border/40">
                          <span className="text-brand-slate font-medium flex items-center gap-1.5">
                            <BookOpen size={13} className="text-brand-cyan" />
                            <span>
                              {relatedDomainProjects.length > 0
                                ? `Related blueprint: "${relatedDomainProjects[0].title}"`
                                : "Explore curated portfolio blueprints for this domain"}
                            </span>
                          </span>
                          <a
                            href={`/projects?domain=${selectedDomainId}`}
                            className="font-semibold text-brand-cyan hover:underline inline-flex items-center gap-1"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span>Browse Project Blueprints</span>
                            <ArrowRight size={13} />
                          </a>
                        </div>

                        {/* Previous / Next Checkpoint Navigation */}
                        <div className="flex items-center justify-between pt-2 border-t border-brand-border/40">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (idx > 0) setExpandedMilestone(idx - 1);
                            }}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                              idx === 0
                                ? "text-brand-muted/40 cursor-not-allowed"
                                : "text-brand-muted hover:text-white bg-brand-card hover:bg-brand-surface border border-brand-border"
                            }`}
                          >
                            <span>&larr; Previous Checkpoint</span>
                          </button>

                          <span className="text-[11px] text-brand-muted font-medium">
                            Checkpoint {idx + 1} of {totalMilestones}
                          </span>

                          <button
                            type="button"
                            disabled={idx === totalMilestones - 1}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (idx < totalMilestones - 1) setExpandedMilestone(idx + 1);
                            }}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                              idx === totalMilestones - 1
                                ? "text-brand-muted/40 cursor-not-allowed"
                                : "text-brand-cyan hover:text-white bg-brand-card hover:bg-brand-cyan/20 border border-brand-border"
                            }`}
                          >
                            <span>Next Checkpoint &rarr;</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
