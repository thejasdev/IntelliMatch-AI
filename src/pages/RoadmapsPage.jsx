import React, { useState, useMemo, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Search,
  ExternalLink,
  FileText,
  Eye,
  Download,
  GitCompare,
  Sparkles,
  Layers,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { ENGINEERING_DOMAINS, getRolesForDomain, getDomainById } from "../data/jobRoles.js";
import { ROADMAP_DOMAINS, ROADMAP_YEARS } from "../data/roadmaps.js";
import PageConsoleHeader from "../components/PageConsoleHeader.jsx";
import InteractiveDomainRoadmap from "../components/InteractiveDomainRoadmap.jsx";
import DomainExplorerPanel from "../components/DomainExplorerPanel.jsx";
import InsideTheProfessionPanel from "../components/InsideTheProfessionPanel.jsx";
import RoleComparisonModal from "../components/RoleComparisonModal.jsx";
import SkillProgressionMatrix from "../components/SkillProgressionMatrix.jsx";
import CareerRecommendationBanner from "../components/CareerRecommendationBanner.jsx";
import {
  fetchDomainDetails,
  fetchRoleProfile,
  fetchRoleSkills,
  fetchRoleRoadmap,
  compareRoles,
  getCareerPathRecommendation,
} from "../services/careerService.js";

// Distinct role pathways for Data Science & Data Careers
const DATA_CAREER_PATHWAYS = [
  {
    id: "data-analyst",
    legacyId: "da-analyst",
    domainId: "data-science",
    title: "Data Analyst / BI Analyst",
    focus: "Descriptive & Diagnostic Analytics, Data Warehousing, KPI Dashboards",
    responsibilities: "Write advanced SQL, model star schemas in PostgreSQL/Snowflake, and deliver automated executive reporting dashboards in Power BI/Tableau.",
    coreSkills: ["Advanced SQL (Window Functions)", "Power BI / Tableau", "Python (Pandas)", "Data Modeling", "Statistical Variance"],
    suggestedTools: ["PostgreSQL", "Power BI", "Tableau", "Jupyter", "Excel Power Query"],
    sampleProject: "Automated Executive Sales KPI Dashboard & Data Mart",
  },
  {
    id: "data-scientist",
    legacyId: "da-scientist",
    domainId: "data-science",
    title: "Data Scientist",
    focus: "Predictive Analytics, Statistical Inference, Hypothesis Testing, Machine Learning",
    responsibilities: "Formulate hypothesis-driven experiments, engineer predictive features from behavioral logs, and validate machine learning models with A/B tests.",
    coreSkills: ["Python (Scikit-Learn, SciPy)", "Feature Engineering", "A/B Testing", "Statistical Inference", "SQL"],
    suggestedTools: ["Python", "Pandas", "Scikit-Learn", "Statsmodels", "Streamlit"],
    sampleProject: "Ecommerce Customer Cohort & Churn Exploration",
  },
  {
    id: "machine-learning-engineer",
    legacyId: "ai-mle",
    domainId: "data-science",
    title: "Machine Learning Engineer",
    focus: "Deep Learning, Transformer Architectures, Low-Latency Model Serving, MLOps",
    responsibilities: "Train and fine-tune neural network models, optimize GPU inference latency, containerize inference services with Docker, and track model drift.",
    coreSkills: ["PyTorch / TensorFlow", "FastAPI Serving", "Docker Containerization", "Hugging Face Transformers", "CUDA Basics"],
    suggestedTools: ["PyTorch", "Hugging Face", "Docker", "FastAPI", "MLflow"],
    sampleProject: "Production Low-Latency Transformer Serving & MLOps",
  },
  {
    id: "data-engineer",
    legacyId: "da-engineer",
    domainId: "data-science",
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
  const initialRole = searchParams.get("role") || "";

  const [selectedDomainId, setSelectedDomainId] = useState(initialDomain);
  const [selectedYearId, setSelectedYearId] = useState("year-1");
  const [selectedRoleId, setSelectedRoleId] = useState(initialRole);
  const [searchQuery, setSearchQuery] = useState("");

  // Layer state containers
  const [domainDetails, setDomainDetails] = useState(null);
  const [roleProfile, setRoleProfile] = useState(null);
  const [roleSkills, setRoleSkills] = useState(null);
  const [roleRoadmap, setRoleRoadmap] = useState(null);
  const [comparedRolesData, setComparedRolesData] = useState([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [knownSkills, setKnownSkills] = useState(["SQL Basics", "Git"]);
  const [recommendation, setRecommendation] = useState(null);

  const selectedDomainMeta = useMemo(() => {
    return getDomainById(selectedDomainId) || ENGINEERING_DOMAINS[0];
  }, [selectedDomainId]);

  const domainRoles = useMemo(() => {
    return getRolesForDomain(selectedDomainId);
  }, [selectedDomainId]);

  const isDataOrAi =
    selectedDomainId === "data-analytics" ||
    selectedDomainId === "data-science" ||
    selectedDomainId === "ai-ml";

  // Selected Academic Year Index (0-based)
  const selectedYearIndex = useMemo(() => {
    const idx = ROADMAP_YEARS.findIndex((y) => y.id === selectedYearId);
    return idx >= 0 ? idx : 0;
  }, [selectedYearId]);

  // Set default role when domain changes
  useEffect(() => {
    if (selectedDomainId === "data-analytics" || selectedDomainId === "data-science") {
      if (!selectedRoleId || (!selectedRoleId.includes("data") && !selectedRoleId.includes("machine"))) {
        setSelectedRoleId("data-analyst");
      }
    } else if (selectedDomainId === "ai-ml") {
      setSelectedRoleId("machine-learning-engineer");
    } else if (domainRoles && domainRoles.length > 0) {
      const match = domainRoles.find((r) => r.id === selectedRoleId);
      if (!match) {
        setSelectedRoleId(domainRoles[0]?.id || "software-engineer");
      }
    }
  }, [selectedDomainId, domainRoles, selectedRoleId]);

  // 1. Fetch Domain Details on Domain Change
  useEffect(() => {
    let isMounted = true;
    fetchDomainDetails(selectedDomainId).then((data) => {
      if (isMounted) setDomainDetails(data);
    });
    return () => {
      isMounted = false;
    };
  }, [selectedDomainId]);

  // 2. Fetch Role Profile, Skills, and Roadmap on Role Change
  useEffect(() => {
    if (!selectedRoleId) return;
    let isMounted = true;

    // Fetch Role Profile (Layer 2)
    fetchRoleProfile(selectedRoleId).then((prof) => {
      if (isMounted) setRoleProfile(prof);
    });

    // Fetch Role Skills (Layer 3)
    fetchRoleSkills(selectedRoleId).then((skData) => {
      if (isMounted) setRoleSkills(skData);
    });

    // Fetch Role Roadmap (Layer 4 & 5)
    fetchRoleRoadmap(selectedRoleId).then((rmData) => {
      if (isMounted) setRoleRoadmap(rmData);
    });

    return () => {
      isMounted = false;
    };
  }, [selectedRoleId]);

  // 3. Update Recommendation Engine (Layer 6) whenever skills, role, or year changes
  useEffect(() => {
    let isMounted = true;
    const payload = {
      domain_slug: selectedDomainId,
      role_slug: selectedRoleId || "data-analyst",
      academic_year: selectedYearIndex + 1,
      known_skills: knownSkills,
    };

    getCareerPathRecommendation(payload).then((rec) => {
      if (isMounted) setRecommendation(rec);
    });

    return () => {
      isMounted = false;
    };
  }, [selectedDomainId, selectedRoleId, selectedYearIndex, knownSkills]);

  // Handle open comparison modal
  const handleOpenComparison = useCallback(async () => {
    const rolesToCompare = isDataOrAi
      ? ["data-analyst", "data-scientist", "data-engineer"]
      : ["software-engineer", "sw-backend", "sw-frontend"];
    try {
      const data = await compareRoles(rolesToCompare);
      setComparedRolesData(data);
    } catch {
      // fallback handled in service
    }
    setIsCompareModalOpen(true);
  }, [isDataOrAi]);

  const activeRole = useMemo(() => {
    if (roleProfile) return roleProfile;
    if (!domainRoles || domainRoles.length === 0) return null;
    return (
      domainRoles.find((r) => r.id === selectedRoleId) ||
      domainRoles[0] ||
      null
    );
  }, [roleProfile, domainRoles, selectedRoleId]);

  const selectedDomainRoadmap = useMemo(() => {
    return (
      ROADMAP_DOMAINS.find(
        (d) =>
          d.id === selectedDomainId ||
          d.slug === selectedDomainId ||
          (selectedDomainId === "software-engineering" && d.id === "software-dev") ||
          (selectedDomainId === "data-science" && d.id === "data-analytics")
      ) || ROADMAP_DOMAINS[0] || { years: {} }
    );
  }, [selectedDomainId]);

  // Prepare Active Years Data: prefers live backend roadmap, falls back to local roadmap catalogue
  const yearsData = useMemo(() => {
    if (roleRoadmap?.stages && roleRoadmap.stages.length > 0) {
      return roleRoadmap.stages.map((st, idx) => ({
        yr: st.stage_name || `Year ${idx + 1}`,
        sub: st.stage_subtitle || `Year ${idx + 1} • Core Competencies`,
        focus: st.duration || "Semester Progression",
        milestones: (st.milestones || []).map((m) => ({
          ...m,
          duration: m.duration || "4–6 Weeks",
          skills: m.skills || m.concepts || [],
          challenge: m.exercises?.[0] || m.description,
          whyItMatters:
            m.why_it_matters ||
            `Recruiters hiring for ${activeRole?.title || "this role"} look for practical fluency in ${(m.skills || []).slice(0, 2).join(" and ")}.`,
          projects: m.projects || [],
        })),
      }));
    }

    // Local catalogue fallback
    return ROADMAP_YEARS.map((yr, idx) => {
      const milestones = selectedDomainRoadmap?.years?.[yr.id] || [];
      const subLabel = yr.label?.includes(":")
        ? yr.label.split(":")[1]?.trim()
        : yr.stage || "Core Stage";
      return {
        yr: yr.label || `Year ${idx + 1}`,
        sub: `${yr.stage || `Year ${idx + 1}`} • ${subLabel}`,
        focus: yr.focus || selectedDomainRoadmap?.overview || "",
        milestones: milestones.map((m) => ({
          ...m,
          duration: m.duration || m.timeframe || "4–6 Weeks",
          skills: m.skills || m.topics || m.competencies || [],
          challenge: m.task || m.challenge || "",
          whyItMatters:
            m.whyItMatters ||
            `Recruiters hiring for ${activeRole?.title || "this role"} look for practical fluency in ${(m.skills || []).slice(0, 2).join(" and ")}. Demonstrating this milestone proves you can contribute from Day 1.`,
          projects: [],
        })),
      };
    });
  }, [roleRoadmap, selectedDomainRoadmap, activeRole]);

  const allDomainSkills = useMemo(() => {
    const skillsFromRoadmap = yearsData.flatMap((y) =>
      (y.milestones || []).flatMap((m) => m.skills || [])
    );
    const skillsFromRole = activeRole?.skills || [];
    return Array.from(new Set([...skillsFromRole, ...skillsFromRoadmap])).slice(0, 16);
  }, [yearsData, activeRole]);

  const filteredRoadmapDomains = useMemo(() => {
    if (!searchQuery.trim()) return ROADMAP_DOMAINS;
    const q = searchQuery.toLowerCase().trim();
    return ROADMAP_DOMAINS.filter((d) => (d.title || d.name || "").toLowerCase().includes(q));
  }, [searchQuery]);

  const handleDomainChange = (id) => {
    setSelectedDomainId(id);
    setSearchParams({ domain: id });
  };

  const handleSelectRole = (roleSlug) => {
    setSelectedRoleId(roleSlug);
    setSearchParams({ domain: selectedDomainId, role: roleSlug });
  };

  const handleToggleSkill = (skillName) => {
    setKnownSkills((prev) =>
      prev.includes(skillName)
        ? prev.filter((s) => s !== skillName)
        : [...prev, skillName]
    );
  };

  const handleTriggerHandbookPreview = () => {
    if (onPreviewPdf) {
      const dName = selectedDomainMeta?.name || selectedDomainMeta?.title || "Official Curriculum";
      onPreviewPdf({
        file: null,
        title: `${dName} — 4-Year Curriculum & Milestone Guide`,
        badge: "Curriculum Handbook",
        isAvailable: false,
        description: `Official comprehensive handbook covering all semester milestones and competencies for ${dName}.`,
      });
    }
  };

  return (
    <div className="space-y-8 pt-6 sm:pt-8 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* 1. Master Page Console Header */}
      <PageConsoleHeader
        eyebrow="Engineering Curriculum & Career Intelligence"
        titleWhite="Domains"
        titleGradient="& Learning Roadmaps"
        overviewText="A connected 6-layer career readiness progression from foundational computing to industry-grade capstone competencies across 5 specialized Software & IT domains."
      >
        {/* PDF Curriculum Handbook Trigger */}
        <div className="console-subdeck p-4 sm:p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-l-4 border-l-brand-violet">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-brand-violet/10 text-brand-violet flex items-center justify-center flex-shrink-0">
              <FileText size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base sm:text-lg font-bold font-heading text-brand-slate m-0">
                  {selectedDomainMeta.name} &mdash; Official Curriculum Handbook
                </h3>
                <span className="text-[11px] sm:text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  PDF in Prep
                </span>
              </div>
              <p className="text-xs sm:text-[13px] text-brand-muted m-0 mt-0.5">
                Complete multi-year semester syllabus, milestones, competencies &amp; project blueprints.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-end flex-shrink-0">
            <button
              type="button"
              onClick={handleTriggerHandbookPreview}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-surface hover:bg-brand-violet hover:text-white text-brand-cyan text-xs sm:text-[13px] font-semibold border border-brand-border transition-all shadow-xs cursor-pointer"
            >
              <Eye size={14} />
              <span>Preview PDF</span>
            </button>

            <button
              type="button"
              onClick={handleTriggerHandbookPreview}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-surface hover:bg-brand-violet hover:text-white text-brand-cyan text-xs sm:text-[13px] font-semibold border border-brand-border transition-all shadow-xs cursor-pointer"
            >
              <ExternalLink size={14} />
              <span>Open in Tab</span>
            </button>

            <button
              type="button"
              onClick={handleTriggerHandbookPreview}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-violet hover:bg-brand-violetHover text-white text-xs sm:text-[13px] font-semibold shadow-xs transition-all cursor-pointer"
            >
              <Download size={14} />
              <span>Download PDF</span>
            </button>
          </div>
        </div>
      </PageConsoleHeader>

      {/* Main Layout: 5-Domain Track Sidebar + 6-Layer Career Cockpit */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Domain Selector Sidebar */}
        <div className="lg:col-span-4 console-frame rounded-2xl p-4 sm:p-5 bg-[#050916]/95 border border-slate-800/90 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-200">
              Technical Domains
            </span>
            <span className="font-mono text-xs text-cyan-400 font-semibold">5 Core Tracks</span>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter domains..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-800 bg-[#080E20] text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-500/20"
            />
          </div>

          {/* Domain Track Buttons (Zero Text Truncation) */}
          <div className="space-y-2.5">
            {filteredRoadmapDomains.map((domain) => {
              const isSelected =
                selectedDomainId === domain.id ||
                selectedDomainId === domain.slug ||
                (selectedDomainId === "software-engineering" && domain.id === "software-dev") ||
                (selectedDomainId === "software-dev" && domain.slug === "software-engineering") ||
                (selectedDomainId === "data-science" && domain.id === "data-analytics") ||
                (selectedDomainId === "data-analytics" && domain.slug === "data-science");
              return (
                <button
                  key={domain.id}
                  type="button"
                  onClick={() => handleDomainChange(domain.id)}
                  className={`w-full text-left rounded-2xl px-4 py-3.5 transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer border ${
                    isSelected
                      ? "bg-gradient-to-r from-[#0B1D3A] via-[#0D254C] to-[#0A2E46] border-cyan-400/60 shadow-lg shadow-cyan-500/10"
                      : "bg-[#070C1B]/90 border-slate-800/90 hover:bg-[#0B1328] hover:border-slate-700"
                  }`}
                >
                  <span
                    className={`font-sans text-sm font-semibold leading-snug ${
                      isSelected ? "text-white" : "text-slate-200"
                    }`}
                  >
                    {domain.title || domain.name}
                  </span>
                  <span
                    className={`shrink-0 px-3 py-1 rounded-full font-mono text-xs font-medium border ${
                      isSelected
                        ? "bg-cyan-500/20 text-cyan-200 border-cyan-400/50"
                        : "bg-[#050916] text-slate-300 border-slate-700/80"
                    }`}
                  >
                    {domain.milestoneCount || (domain.id.includes("software") ? 9 : 8)} Milestones
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Action: Side-by-Side Comparison Trigger */}
          <div className="pt-2 border-t border-slate-800/80">
            <button
              type="button"
              onClick={handleOpenComparison}
              className="w-full py-2.5 px-3 rounded-xl bg-blue-600/15 hover:bg-blue-600/25 border border-cyan-400/35 text-cyan-300 font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <GitCompare size={14} />
              <span>Compare Domain Roles Matrix</span>
            </button>
          </div>
        </div>

        {/* Right Column: 6-Layer Connected Career Intelligence Cockpit */}
        <div className="lg:col-span-8 space-y-6">
          {/* LAYER 1: Interactive Domain Explorer Panel (Overview, Real-World Apps, Work, Tech) */}
          <DomainExplorerPanel
            domainData={domainDetails || {
              name: selectedDomainMeta?.name,
              title: selectedDomainMeta?.title,
              description: selectedDomainMeta?.description,
              milestone_count: selectedDomainMeta?.milestoneCount || 8,
              roles: domainRoles,
            }}
            isDataOrAi={isDataOrAi}
          />

          {/* LAYER 2: Career Role Explorer & Inside the Profession */}
          <div className="console-frame rounded-2xl p-5 sm:p-6 bg-[#050916]/95 border border-slate-800/90 shadow-2xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
              <div>
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-cyan-400">
                  Layer 2 • Career Role Pathways
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-white m-0">
                  Choose Your Target Specialization
                </h3>
              </div>
              <button
                type="button"
                onClick={handleOpenComparison}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/35 text-cyan-200 border border-cyan-400/40 font-mono text-xs font-semibold cursor-pointer"
              >
                <GitCompare size={13} />
                <span>Compare Roles Side-by-Side</span>
              </button>
            </div>

            {/* Role Pathway Selector Chips */}
            {isDataOrAi ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {DATA_CAREER_PATHWAYS.map((pathway) => {
                  const isSelected =
                    selectedRoleId === pathway.id || selectedRoleId === pathway.legacyId;
                  return (
                    <button
                      key={pathway.id}
                      type="button"
                      onClick={() => handleSelectRole(pathway.id)}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? "bg-blue-500/20 border-cyan-400/60 shadow-md shadow-cyan-500/10 ring-1 ring-cyan-400/40"
                          : "bg-[#080E20] border-slate-800 hover:border-slate-700 hover:bg-[#0B142C]"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className={`text-xs sm:text-[13px] font-bold ${
                            isSelected ? "text-cyan-300" : "text-slate-200"
                          }`}
                        >
                          {pathway.title}
                        </span>
                        {isSelected && (
                          <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-400/20 text-cyan-300 border border-cyan-400/30">
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] sm:text-xs text-slate-400 leading-tight m-0 line-clamp-2">
                        {pathway.focus}
                      </p>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {domainRoles.map((role) => {
                  const isSelected = selectedRoleId === role.id;
                  return (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => handleSelectRole(role.id)}
                      className={`text-xs px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? "bg-blue-500/20 text-cyan-300 border-cyan-400/50 shadow-sm font-bold ring-1 ring-cyan-400/30"
                          : "bg-[#080E20] text-slate-300 border-slate-800 hover:bg-[#0B142C] hover:text-white"
                      }`}
                    >
                      <span>{role.title}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* LAYER 2 CONTINUED: Inside the Profession (Tasks, Tools, Deliverables) */}
          <InsideTheProfessionPanel roleProfile={roleProfile} />

          {/* LAYER 3: 4-Stage Interactive Skill Progression Matrix */}
          <SkillProgressionMatrix
            stagesData={roleSkills?.stages || []}
            knownSkills={knownSkills}
            onToggleSkill={handleToggleSkill}
            roleTitle={activeRole?.title || "Specialized Role"}
          />

          {/* LAYER 6: Career Path Intelligence Recommendation Engine */}
          <CareerRecommendationBanner
            recommendation={recommendation}
            academicYear={selectedYearIndex + 1}
            onChangeAcademicYear={(yr) => {
              setSelectedYearId(ROADMAP_YEARS[yr - 1]?.id || "year-1");
            }}
          />

          {/* LAYER 4 & 5: Role-Specific Interactive Roadmap & Projects Hub Context Bridge */}
          <InteractiveDomainRoadmap
            domainTitle={selectedDomainMeta?.name || selectedDomainMeta?.title || "Software Engineering & Full Stack"}
            selectedRoleTitle={activeRole?.title || selectedDomainMeta?.name || "Software Engineer"}
            domainSlug={selectedDomainId}
            roleSlug={selectedRoleId || "data-analyst"}
            yearsData={yearsData}
            activeYearIndex={selectedYearIndex}
            onSelectYear={(idx) => {
              setSelectedYearId(ROADMAP_YEARS[idx]?.id || "year-1");
            }}
            allDomainSkills={allDomainSkills}
          />
        </div>
      </div>

      {/* Role Comparison Modal (Layer 2 Comparison Matrix) */}
      <RoleComparisonModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        comparedRoles={
          comparedRolesData.length > 0
            ? comparedRolesData
            : DATA_CAREER_PATHWAYS.map((p) => ({
                id: p.id,
                slug: p.id,
                title: p.title,
                focus: p.focus,
                responsibilities: p.responsibilities,
                core_skills: p.coreSkills,
                tools: p.suggestedTools,
                deliverables: [p.sampleProject],
              }))
        }
        activeRoleId={selectedRoleId}
        onSelectRole={handleSelectRole}
      />
    </div>
  );
}
