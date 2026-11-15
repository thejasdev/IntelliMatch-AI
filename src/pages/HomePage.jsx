import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Compass,
  Map,
  Layers,
  SearchCode,
  FileText,
  Briefcase,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Search,
  ChevronRight,
  Clock,
  BookOpen,
  Target,
  Award,
  Zap,
  X,
  ExternalLink,
} from "lucide-react";
import { ENGINEERING_DOMAINS } from "../data/jobRoles.js";
import { ROADMAP_DOMAINS, ROADMAP_YEARS, getRoadmapForDomainAndYear } from "../data/roadmaps.js";
import { CURATED_PROJECTS, getProjectsByFilter } from "../data/projects.js";
import { MATCHING_DEMO_SCENARIOS, getScenarioById } from "../data/matchingDemo.js";
import { RESUME_TEMPLATES_DATA } from "./TemplatesPage.jsx";
import ProjectBlueprintPreview from "../components/ProjectBlueprintPreview.jsx";

// Part 4 â€” Core Platform Quick-Access Cards (Modulus Layout Reference)
const QUICK_ACCESS_CARDS = [
  {
    id: "roadmaps",
    title: "Domains Roadmaps",
    desc: "Explore 5 core IT tracks and 4-year structured semester roadmaps.",
    icon: Map,
    circleStyle: "border-indigo-400/40 bg-indigo-950/60 text-indigo-300 group-hover:border-indigo-300",
    path: "/roadmaps",
    actionText: "View Roadmaps",
  },
  {
    id: "projects",
    title: "Projects Hub",
    desc: "Discover verified portfolio blueprints categorized by domain and difficulty.",
    icon: Layers,
    circleStyle: "border-cyan-400/40 bg-cyan-950/60 text-brand-cyan group-hover:border-cyan-300",
    path: "/projects",
    actionText: "Browse Projects",
  },
  {
    id: "templates",
    title: "Resume Templates",
    desc: "Access 5 tested, single-page vector PDFs with 100% selectable text.",
    icon: FileText,
    circleStyle: "border-purple-400/40 bg-purple-950/60 text-purple-300 group-hover:border-purple-300",
    path: "/templates",
    actionText: "Preview PDFs",
  },
  {
    id: "analyzer",
    title: "Resume Analyzer",
    desc: "Benchmark your resume against real job descriptions with ATS scoring.",
    icon: SearchCode,
    circleStyle: "border-sky-400/40 bg-sky-950/60 text-sky-300 group-hover:border-sky-300",
    path: "/analyzer",
    actionText: "Analyze Resume",
  },
  {
    id: "internships",
    title: "Internships",
    desc: "Discover entry-level roles and verified application portal pipelines.",
    icon: Briefcase,
    circleStyle: "border-emerald-400/40 bg-emerald-950/60 text-emerald-300 group-hover:border-emerald-300",
    path: "/internships",
    actionText: "Find Roles",
  },
];

const POPULAR_INTERNSHIP_ROLES = [
  "Software Engineering Intern",
  "Full Stack Developer",
  "AI / ML Engineer",
  "Cloud & DevOps Intern",
  "Data Analyst Intern",
  "Cybersecurity Analyst",
];

export default function HomePage({ onOpenContact, onPreviewPdf }) {
  // Domain Search & Filter State
  const [domainCategory, setDomainCategory] = useState("all");
  const [domainSearch, setDomainSearch] = useState("");

  // Roadmap Preview State
  const [roadmapYear, setRoadmapYear] = useState("year-1");
  const [roadmapDomain, setRoadmapDomain] = useState("software-dev");
  const [completedCheckpoints, setCompletedCheckpoints] = useState([0]);
  const [activeCheckpointIdx, setActiveCheckpointIdx] = useState(0);

  const toggleCheckpointComplete = (idx) => {
    setCompletedCheckpoints((prev) =>
      prev.includes(idx) ? prev.filter((item) => item !== idx) : [...prev, idx]
    );
  };

  // Opportunities & Verified Portals Query State
  const [selectedInternshipRole, setSelectedInternshipRole] = useState("Software Engineering Intern");

  // Project Lab Filter State
  const [projectDiff, setProjectDiff] = useState("all");
  const [projectDomain, setProjectDomain] = useState("all");

  // Matching Demo Scenario State
  const [selectedScenarioId, setSelectedScenarioId] = useState("scenario-sw");
  const [addedGapSkills, setAddedGapSkills] = useState([]);

  // Local Content Search State
  const [contentSearchQuery, setContentSearchQuery] = useState("");
  const [contentSearchCategory, setContentSearchCategory] = useState("all");

  // Filtered Domains
  const domainCategoryMap = {
    all: null,
    software: ["software-dev", "software-engineering"],
    data: ["data-analytics", "data-science", "ai-ml"],
    cloud: ["cloud-devops", "cybersecurity"],
  };

  const filteredDomains = useMemo(() => {
    let result = ENGINEERING_DOMAINS;
    const allowed = domainCategoryMap[domainCategory];
    if (allowed) {
      result = result.filter((d) => allowed.includes(d.id));
    }
    if (domainSearch.trim()) {
      const q = domainSearch.toLowerCase().trim();
      result = result.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q) ||
          d.roles.some((r) => r.title.toLowerCase().includes(q))
      );
    }
    return result;
  }, [domainCategory, domainSearch]);

  // Current Roadmap
  const currentRoadmap = useMemo(() => {
    return getRoadmapForDomainAndYear(roadmapDomain, roadmapYear);
  }, [roadmapDomain, roadmapYear]);

  // Filtered Projects
  const filteredProjects = useMemo(() => {
    return getProjectsByFilter({ difficulty: projectDiff, domain: projectDomain });
  }, [projectDiff, projectDomain]);

  // Matching Demo Scenario
  const currentScenario = useMemo(() => {
    return getScenarioById(selectedScenarioId) || MATCHING_DEMO_SCENARIOS[0];
  }, [selectedScenarioId]);

  // Local Content Search Indexed Items
  const localSearchIndex = useMemo(() => {
    const items = [];

    // 1. Engineering Domains
    ENGINEERING_DOMAINS.forEach((d) => {
      items.push({
        id: `domain-${d.id}`,
        category: "domain",
        categoryLabel: "Career Domain",
        title: d.name,
        subtitle: `${d.roles.length} Specialized Roles`,
        description: d.description,
        skills: d.roles.flatMap((r) => r.skills || []).slice(0, 4),
        path: `/roadmaps?domain=${d.id}`,
        badgeColor: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
      });

      // 2. Roles
      d.roles.forEach((r) => {
        items.push({
          id: `role-${r.id}`,
          category: "role",
          categoryLabel: "Career Role",
          title: r.title,
          subtitle: `Track: ${d.name}`,
          description: `Industry engineering role in ${d.name}. Essential skills include ${(r.skills || []).slice(0, 3).join(", ")}.`,
          skills: r.skills || [],
          path: `/roadmaps?domain=${d.id}`,
          badgeColor: "bg-brand-violet/15 text-brand-periwinkle border-brand-violet/30",
        });
      });
    });

    // 3. Roadmap Milestones
    ROADMAP_DOMAINS.forEach((rd) => {
      Object.entries(rd.years || {}).forEach(([yearKey, milestones]) => {
        (milestones || []).forEach((m, idx) => {
          items.push({
            id: `milestone-${m.id || `${rd.id}-${yearKey}-${idx}`}`,
            category: "milestone",
            categoryLabel: "Curriculum Milestone",
            title: m.title,
            subtitle: `${rd.name} â€¢ ${m.timeframe || yearKey}`,
            description: m.description || "",
            skills: m.skills || m.topics || [],
            path: `/roadmaps?domain=${rd.id}`,
            badgeColor: "bg-brand-cyan/15 text-brand-cyan border-brand-cyan/30",
          });
        });
      });
    });

    // 4. Projects
    CURATED_PROJECTS.forEach((p) => {
      items.push({
        id: `project-${p.id}`,
        category: "project",
        categoryLabel: "Project Blueprint",
        title: p.title,
        subtitle: `${p.difficulty} â€¢ ${p.domain || p.domainId}`,
        description: p.deliverable || p.description || "",
        skills: p.skills || [],
        path: `/projects?id=${p.id}&domain=${p.domainId}`,
        badgeColor: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
      });
    });

    // 5. Resume Templates
    RESUME_TEMPLATES_DATA.forEach((t) => {
      items.push({
        id: `template-${t.id}`,
        category: "template",
        categoryLabel: "Resume Template",
        title: t.title,
        subtitle: t.layoutStyle,
        description: `${t.bestFor}. ${t.description}`,
        skills: t.features || [],
        path: `/templates`,
        badgeColor: "bg-purple-500/15 text-purple-300 border-purple-500/30",
      });
    });

    return items;
  }, []);

  // Filtered Local Search Results
  const localSearchResults = useMemo(() => {
    const q = contentSearchQuery.toLowerCase().trim();
    if (!q && contentSearchCategory === "all") return [];
    return localSearchIndex.filter((item) => {
      const matchCat =
        contentSearchCategory === "all" ||
        item.category === contentSearchCategory ||
        item.category.startsWith(contentSearchCategory) ||
        (contentSearchCategory === "domains" && item.category === "domain") ||
        (contentSearchCategory === "roles" && item.category === "role") ||
        (contentSearchCategory === "roadmaps" && item.category === "milestone") ||
        (contentSearchCategory === "projects" && item.category === "project") ||
        (contentSearchCategory === "templates" && item.category === "template");
      if (!matchCat) return false;
      if (!q) return true;
      const inTitle = item.title.toLowerCase().includes(q);
      const inDesc = (item.description || "").toLowerCase().includes(q);
      const inSubtitle = (item.subtitle || "").toLowerCase().includes(q);
      const inSkills = (item.skills || []).some((s) => s.toLowerCase().includes(q));
      return inTitle || inDesc || inSubtitle || inSkills;
    });
  }, [contentSearchQuery, contentSearchCategory, localSearchIndex]);

  return (
    <div className="space-y-8 sm:space-y-10 pt-6 sm:pt-8 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* 1. Large Editorial Two-Column Hero Composition (Image 1 Reference) */}
      <section
        className="relative overflow-hidden rounded-3xl text-white border border-white/15 px-6 sm:px-10 lg:px-14 py-10 sm:py-14 lg:py-16 shadow-2xl backdrop-blur-md"
        style={{
          background:
            "linear-gradient(145deg, rgba(20, 24, 48, 0.55) 0%, rgba(14, 18, 36, 0.7) 100%)",
        }}
      >
        {/* Subtle atmospheric depth glow accents */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute -top-12 -left-12 w-96 h-96 bg-brand-violet/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-brand-cyan/15 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Editorial Two-Column Grid Layout (Image 1) */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start lg:items-center">
          
          {/* Left Column (Wider, ~7 cols): Large, bold typography & secondary line */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-4 sm:space-y-6 text-left">
            {/* Top kicker specification */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-medium text-[#38BDF8] bg-[#1E293B]/70 border border-white/20">
              <Sparkles size={12} className="text-[#38BDF8]" />
              <span className="uppercase tracking-wider">§ 01 — Career Discovery &amp; Readiness</span>
            </div>

            {/* Prominent Large Headline across lines */}
            <h1 className="font-hero font-extrabold text-white text-[clamp(2.75rem,5.5vw,5rem)] leading-[1.08] tracking-[-0.03em] m-0">
              <span className="block text-white">Find Your Path.</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#6E56CF] via-[#818CF8] to-[#38BDF8]">
                Build Your Future.
              </span>
            </h1>

            {/* Secondary line beneath main heading (Preserved with Source Serif 4 via font-hero-subheading) */}
            <p className="font-hero-subheading font-semibold text-lg sm:text-xl lg:text-2xl text-slate-300 m-0 tracking-tight">
              Career Discovery &amp; Readiness
            </p>
          </div>

          {/* Right Column (Narrower, ~5 cols): Abstract, supporting description & actions */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-6 text-left lg:border-l lg:border-white/10 lg:pl-8 lg:py-2">
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.15em] text-[#38BDF8] block mb-2">
                OVERVIEW
              </span>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed m-0 font-normal">
                Explore technology careers, follow structured learning roadmaps, build practical projects and prepare for opportunities that match your goals.
              </p>
            </div>

            {/* Actions: Prominent Image-1-style Explore CTA + Roadmaps & Analyzer */}
            <div className="space-y-4 pt-1">
              {/* Primary Image 1 CTA */}
              <div>
                <a
                  href="#domains"
                  className="inline-flex items-stretch rounded-xl overflow-hidden shadow-lg group focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/50"
                >
                  <span className="bg-[#0B57D0] group-hover:bg-[#1D6CE5] text-white px-4 py-3 flex items-center justify-center transition-colors">
                    <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
                  </span>
                  <span className="bg-[#0F172A] group-hover:bg-[#1E293B] text-white px-5 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors border-y border-r border-slate-700/80 flex items-center">
                    Explore Career Domains
                  </span>
                </a>
              </div>

              {/* Secondary Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Link
                  to="/roadmaps"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-200 hover:text-white px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-600/60 shadow-sm transition-all"
                >
                  <span>View Learning Roadmaps</span>
                </Link>

                <Link
                  to="/analyzer"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#38BDF8] hover:text-cyan-200 px-3 py-2 transition-colors"
                >
                  <span>Open Resume Analyzer</span>
                  <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Platform Quick-Access Cards (Redesigned with Image 2 Circular Badge & Layout) */}
      <section className="space-y-3.5 pt-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs sm:text-[13px] font-bold uppercase tracking-wider text-brand-cyan flex items-center gap-2">
            <Sparkles size={14} className="text-brand-cyan" />
            <span>Core Platform Workspaces</span>
          </span>
          <span className="text-xs text-slate-400 font-medium">5 Immediate Capabilities</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 items-stretch">
          {QUICK_ACCESS_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.id}
                to={card.path}
                className="h-full rounded-2xl border border-blue-500/25 hover:border-cyan-400/50 bg-[#0E162B]/85 hover:bg-[#131D38]/95 p-4 sm:p-5 flex flex-col justify-between group shadow-lg hover:shadow-cyan-950/25 transition-all duration-300 hover:-translate-y-1 backdrop-blur-md"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    {/* Small circular icon badge near the top (Image 2 reference) */}
                    <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full border ${card.circleStyle} flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-300`}>
                      <Icon size={20} strokeWidth={2.1} />
                    </div>
                    <ChevronRight size={15} className="text-slate-500 group-hover:text-brand-cyan group-hover:translate-x-0.5 transition-all" />
                  </div>

                  <div>
                    <h3 className="font-heading font-bold text-[15px] sm:text-base text-white group-hover:text-brand-cyan transition-colors m-0 tracking-tight">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-slate-300/85 leading-relaxed mt-1.5 m-0 line-clamp-3">
                      {card.desc}
                    </p>
                  </div>
                </div>

                <div>
                  {/* Thin divider */}
                  <div className="my-3 sm:my-3.5 border-t border-slate-700/60 group-hover:border-blue-500/30 transition-colors" />

                  {/* Clear bottom action label with arrow */}
                  <div className="w-full py-2 px-3 rounded-xl bg-blue-600/20 group-hover:bg-[#0B57D0] text-cyan-300 group-hover:text-white border border-blue-500/30 group-hover:border-blue-400/60 flex items-center justify-between text-xs font-semibold shadow-xs transition-all duration-200">
                    <span>{card.actionText}</span>
                    <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. Four-Stage Career Journey (Discover a Domain -> Follow a Roadmap -> Build Projects -> Prepare for Opportunities) */}
      <section className="space-y-6 pt-2">
        <div className="max-w-3xl">
          <span className="text-xs sm:text-[13px] font-bold uppercase tracking-wider text-brand-violet">
            Four Connected Stages
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold font-heading text-white m-0 mt-1.5 leading-snug">
            Discover a Domain &rarr; Follow a Roadmap &rarr; Build Projects &rarr; Prepare for Opportunities
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2 m-0 leading-relaxed">
            A structured path guiding engineering students from technical exploration to verified industry readiness.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              stage: "Discover a Domain",
              icon: Compass,
              title: "Career Explorer",
              desc: "Survey 5 core IT domains and understand industry role expectations.",
              linkText: "Explore Domains",
              href: "#domains",
            },
            {
              stage: "Follow a Roadmap",
              icon: Map,
              title: "Learning Roadmaps",
              desc: "Progress step-by-step through semester curricula and recommended resources.",
              linkText: "View Roadmaps",
              href: "/roadmaps",
            },
            {
              stage: "Build Projects",
              icon: Layers,
              title: "Projects Hub",
              desc: "Apply concepts into portfolio-grade, deliverable software projects.",
              linkText: "Browse Projects",
              href: "/projects",
            },
            {
              stage: "Prepare for Opportunities",
              icon: SearchCode,
              title: "Resume & Readiness",
              desc: "Benchmark your resume against job postings and explore internships.",
              linkText: "Prepare Resume",
              href: "/analyzer",
            },
          ].map((card, i) => {
            const Icon = card.icon;
            return (
              <div
                key={card.stage}
                className="bg-[#0E162B]/85 hover:bg-[#131D38]/90 border border-blue-500/25 hover:border-blue-400/50 rounded-3xl p-7 sm:p-8 flex flex-col items-center text-center justify-between shadow-xl transition-all duration-300 group hover:-translate-y-1 backdrop-blur-md"
              >
                <div className="w-full flex flex-col items-center">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#38BDF8] bg-blue-950/70 px-3.5 py-1 rounded-full border border-blue-500/30 shadow-xs mb-3">
                    Stage 0{i + 1}
                  </span>
                  
                  <div className="w-14 h-14 rounded-full bg-blue-950/80 text-[#38BDF8] shadow-inner border border-blue-500/30 flex items-center justify-center my-2 group-hover:scale-110 transition-transform duration-300">
                    <Icon size={24} strokeWidth={2.2} />
                  </div>

                  <div className="space-y-1.5 my-2">
                    <span className="text-xs sm:text-[13px] font-semibold text-slate-400 block uppercase tracking-wide">
                      {card.stage}
                    </span>
                    <h3 className="font-heading font-bold text-lg sm:text-xl text-white m-0">
                      {card.title}
                    </h3>
                  </div>

                  <p className="text-[13px] sm:text-sm text-slate-300 leading-relaxed m-0 mt-1 max-w-[240px]">
                    {card.desc}
                  </p>
                </div>

                <div className="pt-5 mt-3 w-full flex justify-center">
                  {card.href.startsWith("#") ? (
                    <a
                      href={card.href}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#0B57D0] hover:bg-[#1D6CE5] text-white text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg inline-flex items-center justify-center gap-1.5 group/btn transition-all duration-200"
                    >
                      <span>{card.linkText}</span>
                      <ArrowRight size={13} className="group-hover/btn:translate-x-0.5 transition-transform" />
                    </a>
                  ) : (
                    <Link
                      to={card.href}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#0B57D0] hover:bg-[#1D6CE5] text-white text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg inline-flex items-center justify-center gap-1.5 group/btn transition-all duration-200"
                    >
                      <span>{card.linkText}</span>
                      <ArrowRight size={13} className="group-hover/btn:translate-x-0.5 transition-transform" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Explore Technology Careers (10 Supported Domains — Image 3 Reference) */}
      <section id="domains" className="space-y-6 pt-2">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-xl">
            <span className="text-xs sm:text-[13px] font-bold uppercase tracking-wider text-[#8B7FF5]">
              5 Core IT Tracks
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-white m-0 mt-1.5 leading-tight">
              Explore Technology Domains
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2 m-0 leading-relaxed">
              Investigate domain overviews, core tech stacks, and specialized job role trajectories.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted" />
            <input
              type="text"
              value={domainSearch}
              onChange={(e) => setDomainSearch(e.target.value)}
              placeholder="Search domains or roles..."
              className="w-full pl-9 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-brand-border bg-brand-card text-brand-slate placeholder:text-brand-muted focus:outline-none focus:border-brand-violet focus:ring-2 focus:ring-brand-violet/20"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: "all", label: "All 5 Core Domains" },
            { id: "software", label: "Software & Web" },
            { id: "data", label: "Data & AI" },
            { id: "cloud", label: "Cloud & Security" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setDomainCategory(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                domainCategory === tab.id
                  ? "bg-blue-500/20 text-cyan-300 border border-cyan-400/45 shadow-sm shadow-cyan-500/10 font-semibold"
                  : "bg-slate-900/70 text-slate-300 border border-slate-800 hover:bg-slate-800/90 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Domain Cards Grid — Image-Led Discovery Cards (Harmonized with Dark Background) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDomains.map((domain) => (
            <div
              key={domain.id}
              className="rounded-3xl flex flex-col justify-between group shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border border-blue-500/25 hover:border-blue-400/50 bg-[#0E162B]/90 hover:bg-[#121B36]/95 backdrop-blur-md"
            >
              {/* Top Image Container */}
              <div className="relative w-full h-48 bg-slate-950 overflow-hidden border-b border-blue-500/20">
                <img
                  src={`/assets/domains/${domain.id}.svg`}
                  alt={`${domain.name} track`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3.5 right-3.5">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#0B132B]/90 text-cyan-300 shadow-sm border border-blue-500/30 whitespace-nowrap backdrop-blur-md">
                    {domain.roles.length} Roles
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 bg-[#0E162B]/90 hover:bg-[#121B36]/95 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#38BDF8] block">
                    Engineering Track
                  </span>
                  <h3 className="font-heading font-bold text-xl sm:text-[22px] text-white m-0 group-hover:text-cyan-200 transition-colors">
                    {domain.name}
                  </h3>
                  <p className="text-[13px] sm:text-sm text-slate-300 leading-relaxed m-0 line-clamp-2">
                    {domain.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {domain.roles.slice(0, 3).map((r) => (
                      <span
                        key={r.id}
                        className="text-xs px-2.5 py-1 rounded-lg bg-[#18223B] text-slate-200 font-medium border border-blue-500/20"
                      >
                        {r.title}
                      </span>
                    ))}
                    {domain.roles.length > 3 && (
                      <span className="text-xs px-2.5 py-1 rounded-lg bg-blue-950/70 text-[#38BDF8] font-semibold border border-blue-500/30">
                        +{domain.roles.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-700/60 flex items-center justify-between">
                  <Link
                    to={`/roadmaps?domain=${domain.id}`}
                    className="text-xs sm:text-sm font-bold text-[#38BDF8] hover:text-cyan-200 hover:underline inline-flex items-center gap-1 group/btn"
                  >
                    <span>View Roadmaps</span>
                    <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to={`/projects?domain=${domain.id}`}
                    className="text-xs sm:text-sm text-slate-400 hover:text-white font-medium inline-flex items-center gap-1"
                  >
                    <span>Projects &rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Interactive Learning Roadmaps Preview */}
      <section id="roadmaps" className="space-y-6 pt-2">
        <div className="max-w-2xl">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-2">
            STRUCTURED CURRICULUM
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Interactive Learning Roadmaps
          </h2>
          <p className="font-sans text-sm sm:text-base text-slate-300 mt-2.5 max-w-2xl leading-relaxed">
            Select an academic year and engineering domain to review curated semester milestones.
          </p>
        </div>

        <div className="console-frame rounded-2xl p-6 sm:p-8 bg-[#050916]/95 border border-slate-800/90 shadow-2xl relative overflow-hidden space-y-6">
          {/* Top-Edge Specular Light Sweep */}
          <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent animate-beam-sweep" />

          {/* Controls Bar: 12-col grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pb-6 border-b border-slate-800/80 items-end">
            {/* Left 7 Cols: Interactive 4-Year Academic Stage Tabs */}
            <div className="lg:col-span-7">
              <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-400 mb-2.5">
                1. Select Academic Year &amp; Stage
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {ROADMAP_YEARS.map((y) => {
                  const isActive = roadmapYear === y.id;
                  return (
                    <button
                      key={y.id}
                      type="button"
                      onClick={() => {
                        setRoadmapYear(y.id);
                        setActiveCheckpointIdx(0);
                      }}
                      className={`px-3 py-2.5 rounded-xl font-sans text-xs font-semibold text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
                        isActive
                          ? "bg-gradient-to-r from-blue-600/30 via-indigo-600/25 to-cyan-500/25 text-white border border-cyan-400/50 shadow-md shadow-cyan-500/10"
                          : "bg-[#080E20] text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-200"
                      }`}
                    >
                      <span className="font-mono text-[10px] text-cyan-400">{y.badge || `Stage ${y.id.replace("year-", "")}`}</span>
                      <span className="truncate max-w-full text-slate-200">{y.stage}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right 5 Cols: Interactive Career Track Selector (Matched to Obsidian-Navy Theme) */}
            <div className="lg:col-span-5">
              <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-400 mb-2.5">
                2. Select Engineering Career Track
              </label>
              <div className="relative">
                <select
                  value={roadmapDomain}
                  onChange={(e) => {
                    setRoadmapDomain(e.target.value);
                    setActiveCheckpointIdx(0);
                  }}
                  className="w-full appearance-none bg-[#080E20] text-white font-sans text-sm font-medium rounded-xl px-4 py-3 pr-10 border border-cyan-500/30 hover:border-cyan-400/60 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all cursor-pointer shadow-inner"
                >
                  {ROADMAP_DOMAINS.map((dom, idx) => {
                    const domId = dom.id || dom.value || dom;
                    const domLabel = dom.name || dom.label || dom.title || String(dom);
                    return (
                      <option key={domId || idx} value={domId} className="bg-[#080E20] text-slate-100">
                        {domLabel}
                      </option>
                    );
                  })}
                </select>
                <span className="pointer-events-none absolute inset-y-0 right-3.5 flex items-center text-cyan-400">
                  ▼
                </span>
              </div>
            </div>
          </div>

          {/* Quick Domain Switcher Chips for Instant 1-Click Exploration */}
          <div className="flex items-center gap-2 overflow-x-auto py-4 border-b border-slate-800/80 no-scrollbar">
            <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400 shrink-0 mr-1">
              Quick Track:
            </span>
            {ROADMAP_DOMAINS.map((dom, idx) => {
              const domId = dom.id || dom.value || dom;
              const domLabel = dom.name || dom.label || dom.title || String(dom);
              const isActive = roadmapDomain === domId;
              return (
                <button
                  key={domId || idx}
                  type="button"
                  onClick={() => {
                    setRoadmapDomain(domId);
                    setActiveCheckpointIdx(0);
                  }}
                  className={`px-3 py-1.5 rounded-lg font-sans text-xs font-medium shrink-0 transition-all cursor-pointer ${
                    isActive
                      ? "bg-blue-500/20 text-cyan-300 border border-cyan-400/45 shadow-sm"
                      : "bg-[#080E20] text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-200"
                  }`}
                >
                  {domLabel}
                </button>
              );
            })}
          </div>

          {/* Year Focus & Interactive Progress Telemetry Banner */}
          <div className="bg-[#080E20] border border-blue-500/25 rounded-xl p-4 my-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center text-cyan-300 font-mono text-xs shrink-0">
                🎯
              </span>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-400 block">
                  ACTIVE STAGE OBJECTIVE
                </span>
                <p className="font-sans text-xs sm:text-sm text-slate-200 font-medium mt-0.5">
                  {currentRoadmap?.focus ||
                    currentRoadmap?.yearFocus ||
                    currentRoadmap?.overview ||
                    "Build reliable, scalable applications from foundational concepts up to production systems."}
                </p>
              </div>
            </div>

            {/* Simulated Milestone Readiness Meter */}
            <div className="flex items-center gap-3 shrink-0 bg-[#050916] px-3.5 py-2 rounded-lg border border-slate-800/90">
              <div className="text-right">
                <span className="block font-mono text-[10px] uppercase text-slate-400">
                  Stage Progress
                </span>
                <span className="font-mono text-xs font-bold text-emerald-400 tabular-nums">
                  {Math.round(
                    (completedCheckpoints.length /
                      Math.max(1, (currentRoadmap?.milestones || []).length)) *
                      100
                  )}
                  % Completed
                </span>
              </div>
              <div className="w-20 h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  style={{
                    width: `${Math.round(
                      (completedCheckpoints.length /
                        Math.max(1, (currentRoadmap?.milestones || []).length)) *
                        100
                    )}%`,
                  }}
                  className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-300"
                />
              </div>
            </div>
          </div>

          {/* Connected Horizontal Timeline Conduit (Desktop) */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-6 relative mb-5 px-4">
            <div className="absolute top-1/2 left-16 right-16 -translate-y-1/2 h-0.5 bg-slate-800 z-0" />
            <div
              style={{
                width:
                  activeCheckpointIdx === 0
                    ? "18%"
                    : activeCheckpointIdx === 1
                    ? "50%"
                    : "84%",
              }}
              className="absolute top-1/2 left-16 -translate-y-1/2 h-0.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 z-0 transition-all duration-500"
            />
            {(currentRoadmap?.milestones || []).map((milestone, idx) => {
              const isCompleted = completedCheckpoints.includes(idx);
              const isActive = activeCheckpointIdx === idx;
              return (
                <div key={idx} className="relative z-10 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setActiveCheckpointIdx(idx)}
                    className={`group flex items-center gap-2.5 px-3.5 py-1.5 rounded-full font-mono text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30 scale-105"
                        : isCompleted
                        ? "bg-emerald-950 text-emerald-300 border border-emerald-500/50"
                        : "bg-[#080E20] text-slate-400 border border-slate-700 hover:border-cyan-400/50 hover:text-white"
                    }`}
                  >
                    <span>{isCompleted ? "✓" : `0${idx + 1}`}</span>
                    <span className="text-[11px] font-medium">
                      {`Step 0${idx + 1}`}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>

          {/* 3 Interactive Milestone Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {(currentRoadmap?.milestones || []).map((milestone, idx) => {
              const isCompleted = completedCheckpoints.includes(idx);
              const isActive = activeCheckpointIdx === idx;
              const skills = milestone.skills || milestone.topics || milestone.competencies || [];

              return (
                <div
                  key={milestone.title || idx}
                  onClick={() => setActiveCheckpointIdx(idx)}
                  className={`precision-card rounded-xl p-5 flex flex-col justify-between cursor-pointer transition-all duration-200 ${
                    isActive
                      ? "bg-[#0B142C] border-cyan-400/60 shadow-xl shadow-cyan-500/10 -translate-y-1"
                      : "bg-[#080E20] border-slate-800/90 hover:border-blue-500/40"
                  }`}
                >
                  <div>
                    {/* Top Checkpoint & Duration Telemetry Bar */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span
                        className={`px-2.5 py-1 rounded-md font-mono text-[11px] font-semibold uppercase tracking-wider ${
                          isActive
                            ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40"
                            : "bg-blue-500/10 text-blue-300 border border-blue-500/25"
                        }`}
                      >
                        {`CHECKPOINT 0${idx + 1}`}
                      </span>
                      <span className="font-mono text-xs text-slate-400 tabular-nums">
                        ⏱ {milestone.duration || milestone.timeframe || `Semester ${(idx % 2) + 1} • 4–6 Weeks`}
                      </span>
                    </div>

                    {/* Milestone Heading & Description */}
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-white leading-snug mb-2.5">
                      {milestone.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                      {milestone.description}
                    </p>
                  </div>

                  {/* Bottom Competencies & Interactive Complete Toggle */}
                  <div className="pt-4 border-t border-slate-800/90">
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400 font-semibold">
                        KEY COMPETENCIES:
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleCheckpointComplete(idx);
                        }}
                        className={`px-2 py-0.5 rounded font-mono text-[10px] transition-colors cursor-pointer ${
                          isCompleted
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                            : "bg-slate-900 text-slate-400 border border-slate-700 hover:text-cyan-300 hover:border-cyan-500/40"
                        }`}
                      >
                        {isCompleted ? "✓ Completed" : "+ Mark Complete"}
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2.5 py-1 rounded-md font-mono text-[11px] bg-[#050916] text-cyan-200/90 border border-cyan-500/20"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer Action Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-6 mt-6 border-t border-slate-800/80">
            <span className="font-sans text-xs sm:text-sm text-slate-400">
              Click any checkpoint card to inspect or mark your milestone completion across all 4 engineering years.
            </span>
            <Link
              to="/roadmaps"
              className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm font-semibold text-cyan-300 hover:text-cyan-200 transition-colors"
            >
              <span>Explore Complete Roadmap Matrix</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Projects Hub Preview Section */}
      <section className="space-y-6 pt-2">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-xl">
            <span className="text-xs sm:text-[13px] font-bold uppercase tracking-wider text-[#8B7FF5]">
              Learn by Building
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold font-heading text-white m-0 mt-1.5 leading-tight">
              Projects Hub Blueprints
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2 m-0 leading-relaxed">
              Bridge academic concepts and engineering deliverables through curated portfolio projects.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {["all", "beginner", "intermediate", "advanced"].map((diff) => (
              <button
                key={diff}
                type="button"
                onClick={() => setProjectDiff(diff)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium capitalize transition-all ${
                  projectDiff === diff
                    ? "bg-brand-violet text-white shadow-xs font-semibold"
                    : "bg-brand-card text-brand-slate border border-brand-border hover:bg-brand-surface"
                }`}
              >
                {diff === "all" ? "All Levels" : diff}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid — Image-Led Project Portfolio (Harmonized with Domain Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(filteredProjects || []).slice(0, 3).map((project) => (
            <div
              key={project.id}
              className="rounded-3xl flex flex-col justify-between group shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border border-blue-500/25 hover:border-blue-400/50 bg-[#0E162B]/90 hover:bg-[#121B36]/95 backdrop-blur-md"
            >
              {/* 1. Project-Specific Visual Preview (Approx 16:9 Aspect Ratio) */}
              <div className="relative w-full h-48 overflow-hidden border-b border-slate-800/80 bg-[#070B16]">
                <ProjectBlueprintPreview project={project} />

                {/* Preserve Existing Difficulty Pill Badge in Top-Right */}
                {project.difficulty && (
                  <span
                    className={`absolute top-3 right-3 z-10 px-3 py-1 rounded-full font-mono text-xs font-semibold backdrop-blur-md border ${
                      project.difficulty === "beginner" || project.difficulty === "Beginner"
                        ? "bg-emerald-950/90 text-emerald-300 border-emerald-500/40"
                        : project.difficulty === "intermediate" || project.difficulty === "Intermediate"
                        ? "bg-amber-950/90 text-amber-300 border-amber-500/40"
                        : "bg-purple-950/90 text-purple-300 border-purple-500/40"
                    }`}
                  >
                    {project.difficulty}
                  </span>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  {/* 2. Difficulty badge & estimated duration */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#38BDF8]">
                      {ENGINEERING_DOMAINS.find((d) => d.id === project.domainId)?.name || project.domain || "Engineering Project"}
                    </span>
                    <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                      <Clock size={12} /> {project.estimatedHours || "Self-Paced"}
                    </span>
                  </div>

                  {/* 3. Project title */}
                  <h3 className="font-heading font-bold text-lg sm:text-xl text-white m-0 group-hover:text-cyan-200 transition-colors">
                    {project.title}
                  </h3>

                  {/* 4. Existing project description */}
                  <p className="text-[13px] sm:text-sm text-slate-300 leading-relaxed m-0 line-clamp-2">
                    {project.description || project.deliverable || ""}
                  </p>

                  {/* 5. Existing deliverables or learning outcomes */}
                  <div className="space-y-1.5 pt-1">
                    <div className="text-xs font-bold text-slate-200">Deliverables:</div>
                    <ul className="text-xs sm:text-[13px] text-slate-300 space-y-1 pl-4 m-0 list-disc">
                      {(Array.isArray(project.deliverables)
                        ? project.deliverables
                        : (project.deliverable ? [project.deliverable] : [])
                      ).slice(0, 2).map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* 6. Inspect Blueprint action & 7. Technology or skill info */}
                <div className="pt-4 border-t border-slate-700/60 flex items-center justify-between">
                  <Link
                    to={`/projects?id=${project.id}`}
                    className="text-xs sm:text-sm font-bold text-[#38BDF8] hover:text-cyan-200 hover:underline inline-flex items-center gap-1 group/btn"
                  >
                    <span>Inspect Blueprint</span>
                    <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                  <span className="text-xs text-slate-400 font-medium">{project.skills.slice(0, 2).join(", ")}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-2">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-card border border-brand-border text-brand-cyan hover:bg-brand-surface text-xs sm:text-sm font-semibold shadow-xs transition-all"
          >
            <span>Browse All {CURATED_PROJECTS.length} Project Blueprints</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* 6. Resume-to-Job Matching Interactive Demonstration (Clearly Labeled Sample Scenario) */}
      <section className="py-12">
        {/* Section Header — Matches "Projects Hub Blueprints" Exactly (Outside the Card Box) */}
        <div className="mb-8">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-2">
            ALGORITHMIC INTELLIGENCE PREVIEW
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Resume-to-Job Semantic Matching
          </h2>
          <p className="font-sans text-sm sm:text-base text-slate-300 mt-2.5 max-w-2xl leading-relaxed">
            Interactive simulation illustrating how keyword coverage, experience evaluation, and ATS benchmarking work on sample resumes.
          </p>
        </div>

        {/* Interactive Workspace Container Below the Heading */}
        {(() => {
          const currentRole = currentScenario;
          const baseScore = Number(currentRole.overallScore || currentRole.score || currentRole.matchScore || 86);
          const liveScore = Math.min(99, baseScore + addedGapSkills.length * 5);
          const activeMatchedKeywords = [
            ...(currentRole.matchedSkills || []),
            ...addedGapSkills,
          ];
          const remainingSkillGaps = (currentRole.missingSkills || []).filter(
            (gap) => !addedGapSkills.includes(gap)
          );
          const radius = 52;
          const circumference = 2 * Math.PI * radius;
          const strokeDashoffset = circumference - (liveScore / 100) * circumference;
          const beforeBullet =
            currentRole.sampleBulletOptimization?.original ||
            currentRole.beforeBullet ||
            "Built REST APIs for user registration and login.";
          const afterBullet =
            currentRole.sampleBulletOptimization?.optimized ||
            currentRole.afterBullet ||
            "Architected high-throughput Node.js authentication endpoints with JWT and bcrypt, reducing login latency by 32% across 45k+ monthly users.";

          return (
            <div className="console-frame rounded-2xl p-6 sm:p-8 bg-[#050916]/95 border border-slate-800/90 shadow-2xl relative overflow-hidden">
              {/* Top-Edge Specular Light Sweep */}
              <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent animate-beam-sweep" />

              {/* Interactive Obsidian-Navy Sample Role Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 pb-6 border-b border-slate-800/90">
                <span className="font-mono text-xs uppercase tracking-wider text-slate-400 mr-1">
                  Sample Role:
                </span>
                {MATCHING_DEMO_SCENARIOS.map((role) => {
                  const isSelected = selectedScenarioId === role.id;
                  return (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => {
                        setSelectedScenarioId(role.id);
                        setAddedGapSkills([]);
                      }}
                      className={`group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-sans text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? "bg-gradient-to-r from-blue-600/25 via-indigo-600/20 to-cyan-500/20 text-cyan-200 border border-cyan-400/50 shadow-lg shadow-cyan-500/10 -translate-y-0.5"
                          : "bg-[#091022] text-slate-300 border border-slate-800/90 hover:bg-[#0D1730] hover:border-blue-500/40 hover:text-white"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full transition-colors ${
                          isSelected ? "bg-cyan-400 shadow-[0_0_8px_#22d3ee]" : "bg-slate-600 group-hover:bg-slate-400"
                        }`}
                      />
                      <span>{role.roleTitle}</span>
                    </button>
                  );
                })}
              </div>

            {/* Semantic Matching Interactive Workspace Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-6">
              {/* Left Column: Animated SVG Match Score Gauge & Sub-Metrics */}
              <div className="lg:col-span-4 bg-[#080E20] border border-slate-800/90 rounded-xl p-5 flex flex-col items-center justify-between shadow-inner">
                <div className="w-full flex items-center justify-between mb-2">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400">
                    Semantic Score
                  </span>
                  <span className="font-mono text-[11px] text-cyan-400">
                    ATS Engine v2.4
                  </span>
                </div>

                {/* Fixed SVG Radial Gauge with Real Numeric Percentage */}
                <div className="relative w-36 h-36 flex items-center justify-center my-2">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
                    <defs>
                      <linearGradient id="scoreRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#22D3EE" />
                        <stop offset="50%" stopColor="#3B82F6" />
                        <stop offset="100%" stopColor="#818CF8" />
                      </linearGradient>
                    </defs>
                    <circle
                      cx="64"
                      cy="64"
                      r={radius}
                      stroke="rgba(30, 41, 59, 0.8)"
                      strokeWidth="10"
                      fill="transparent"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r={radius}
                      stroke="url(#scoreRingGrad)"
                      strokeWidth="10"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      fill="transparent"
                      className="transition-all duration-500 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="font-mono text-3xl font-extrabold text-white tabular-nums">
                      {liveScore}%
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-300 mt-0.5">
                      MATCH SCORE
                    </span>
                  </div>
                </div>

                {/* Populated Status Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{liveScore >= 90 ? "ATS Benchmark: Excellent" : "ATS Benchmark: Strong Match"}</span>
                </div>

                {/* Sub-Metric Breakdown Bars */}
                <div className="w-full space-y-2 mt-4 pt-3 border-t border-slate-800/80">
                  <div>
                    <div className="flex justify-between font-mono text-[11px] text-slate-300 mb-1">
                      <span>Keyword Coverage</span>
                      <span className="text-cyan-300 tabular-nums">{liveScore}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden">
                      <div
                        style={{ width: `${liveScore}%` }}
                        className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between font-mono text-[11px] text-slate-300 mb-1">
                      <span>Role Impact Alignment</span>
                      <span className="text-indigo-300 tabular-nums">{Math.min(98, liveScore - 2)}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden">
                      <div
                        style={{ width: `${Math.min(98, liveScore - 2)}%` }}
                        className="h-full bg-gradient-to-r from-indigo-400 to-violet-500 transition-all duration-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right 8 Columns: Matched Keywords, Interactive Skill Gaps & Optimization Diff */}
              <div className="lg:col-span-8 flex flex-col justify-between gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Matched Keywords Card */}
                  <div className="bg-[#080E20] border border-emerald-500/25 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 font-sans text-sm font-semibold text-emerald-300">
                        <span className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-xs">
                          ✓
                        </span>
                        <span>Matched Keywords ({activeMatchedKeywords.length})</span>
                      </div>
                      {addedGapSkills.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setAddedGapSkills([])}
                          className="font-mono text-[11px] text-slate-400 hover:text-cyan-300 underline cursor-pointer"
                        >
                          Reset Demo
                        </button>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {activeMatchedKeywords.map((kw, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-lg font-mono text-xs bg-emerald-950/60 text-emerald-200 border border-emerald-500/35 shadow-sm"
                        >
                          ✓ {kw}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Interactive Skill Gaps Card (Click a gap to simulate adding it) */}
                  <div className="bg-[#080E20] border border-amber-500/25 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 font-sans text-sm font-semibold text-amber-300">
                        <span className="w-5 h-5 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-xs">
                          ✦
                        </span>
                        <span>Skill Gaps ({remainingSkillGaps.length})</span>
                      </div>
                      <span className="font-mono text-[10px] text-amber-300/80">
                        Click to simulate +5%
                      </span>
                    </div>

                    {remainingSkillGaps.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {remainingSkillGaps.map((gap, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setAddedGapSkills((prev) => [...prev, gap])}
                            className="group px-3 py-1.5 rounded-lg font-mono text-xs bg-amber-950/40 text-amber-200 border border-amber-500/35 hover:bg-emerald-950/60 hover:text-emerald-200 hover:border-emerald-400/50 transition-all cursor-pointer flex items-center gap-1.5"
                          >
                            <span className="text-amber-400 group-hover:text-emerald-300 font-bold">+</span>
                            <span>{gap}</span>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="rounded-lg bg-emerald-950/30 border border-emerald-500/30 p-2.5 font-mono text-xs text-emerald-300">
                        ✓ All target role skill gaps resolved in simulation!
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Verb & Metrics Optimization Tip Card */}
                <div className="bg-[#080E20] border border-cyan-500/25 rounded-xl p-4 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold uppercase tracking-wider text-cyan-300">
                      💡 ACTION VERB &amp; METRICS OPTIMIZATION TIP
                    </span>
                    <span className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-400/30 font-mono text-[10px] text-cyan-300">
                      ATS Impact Rewrite
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-rose-950/25 border border-rose-500/20 font-sans text-xs sm:text-sm text-slate-300">
                    <span className="font-mono text-xs font-semibold text-rose-300 mr-1.5">Before:</span>
                    "{beforeBullet}"
                  </div>

                  <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30 font-sans text-xs sm:text-sm text-emerald-200">
                    <span className="font-mono text-xs font-semibold text-emerald-400 mr-1.5">Optimized:</span>
                    "{afterBullet}"
                  </div>
                </div>

                {/* Bottom CTA Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                  <span className="font-sans text-xs sm:text-sm text-slate-400">
                    Ready to test your actual resume with ATS parsing?
                  </span>
                  <Link
                    to="/analyzer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-sans text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 hover:brightness-110 shadow-lg shadow-blue-600/25 transition-all"
                  >
                    <span>Launch Live Analyzer</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </section>

      {/* 7. Career-Readiness Tools & Local Content Search */}
      <section className="space-y-8 pt-2">
        <div className="max-w-2xl">
          <span className="text-xs sm:text-[13px] font-bold uppercase tracking-wider text-brand-violet">
            Section 7 • Readiness &amp; Intelligence
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold font-heading text-white m-0 mt-1.5 leading-tight">
            Career-Readiness Tools &amp; Content Search
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2 m-0 leading-relaxed">
            Focused applications to benchmark career materials, explore curriculum resources, and instant search across the entire IntelliMatch catalogue.
          </p>
        </div>

        {/* 3 Focused Career Workspaces — Dark Navy Cards Matching Image 4 Reference */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tool 1 — ATS Resume Templates */}
          <div className="rounded-3xl p-7 sm:p-8 bg-[#0D152A]/95 hover:bg-[#111C38] border border-blue-500/25 hover:border-blue-400/50 shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between text-center group">
            <div>
              {/* Top Pill Tag */}
              <div className="flex justify-center">
                <span className="px-3.5 py-1 text-[11px] font-bold rounded-full border border-purple-400/30 text-purple-200 uppercase tracking-wider bg-purple-950/40">
                  TOOL 01
                </span>
              </div>

              {/* Circular Icon Badge */}
              <div className="w-14 h-14 rounded-full border border-purple-400/40 bg-purple-950/70 text-purple-300 flex items-center justify-center mx-auto my-4 shadow-md group-hover:scale-105 transition-transform">
                <FileText size={24} />
              </div>

              {/* Kicker & Title */}
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                DOCUMENT LIBRARY
              </span>
              <h3 className="font-heading font-bold text-xl sm:text-[22px] text-white m-0 group-hover:text-cyan-200 transition-colors">
                ATS Resume Templates
              </h3>

              {/* Description */}
              <p className="text-[13px] sm:text-sm text-slate-300 leading-relaxed m-0 mt-2.5">
                Access 5 tested, single-page PDF templates with selectable text, distinct layout philosophies, and verified ATS compatibility.
              </p>
            </div>

            {/* Bottom Royal Blue Pill Action Button (Image 4 Reference) */}
            <div className="pt-6">
              <Link
                to="/templates"
                className="w-full py-3 px-5 rounded-full bg-[#0B57D0] hover:bg-[#1D6CE5] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-md shadow-blue-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Browse 5 PDF Templates</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          {/* Tool 2 — Resume Analyzer */}
          <div className="rounded-3xl p-7 sm:p-8 bg-[#0D152A]/95 hover:bg-[#111C38] border border-blue-500/25 hover:border-blue-400/50 shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between text-center group">
            <div>
              {/* Top Pill Tag */}
              <div className="flex justify-center">
                <span className="px-3.5 py-1 text-[11px] font-bold rounded-full border border-sky-400/30 text-sky-200 uppercase tracking-wider bg-sky-950/40">
                  TOOL 02
                </span>
              </div>

              {/* Circular Icon Badge */}
              <div className="w-14 h-14 rounded-full border border-sky-400/40 bg-sky-950/70 text-sky-300 flex items-center justify-center mx-auto my-4 shadow-md group-hover:scale-105 transition-transform">
                <SearchCode size={24} />
              </div>

              {/* Kicker & Title */}
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                ALGORITHMIC ATS EVALUATION
              </span>
              <h3 className="font-heading font-bold text-xl sm:text-[22px] text-white m-0 group-hover:text-cyan-200 transition-colors">
                Resume Analyzer
              </h3>

              {/* Description */}
              <p className="text-[13px] sm:text-sm text-slate-300 leading-relaxed m-0 mt-2.5">
                Upload your resume, select from 10 technical domains, and benchmark missing skills, keyword frequency, and recruiter readiness.
              </p>
            </div>

            {/* Bottom Royal Blue Pill Action Button (Image 4 Reference) */}
            <div className="pt-6">
              <Link
                to="/analyzer"
                className="w-full py-3 px-5 rounded-full bg-[#0B57D0] hover:bg-[#1D6CE5] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-md shadow-blue-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Open Resume Analyzer</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          {/* Tool 3 — Internships & Jobs */}
          <div className="rounded-3xl p-7 sm:p-8 bg-[#0D152A]/95 hover:bg-[#111C38] border border-blue-500/25 hover:border-blue-400/50 shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between text-center group">
            <div>
              {/* Top Pill Tag */}
              <div className="flex justify-center">
                <span className="px-3.5 py-1 text-[11px] font-bold rounded-full border border-emerald-400/30 text-emerald-200 uppercase tracking-wider bg-emerald-950/40">
                  TOOL 03
                </span>
              </div>

              {/* Circular Icon Badge */}
              <div className="w-14 h-14 rounded-full border border-emerald-400/40 bg-emerald-950/70 text-emerald-300 flex items-center justify-center mx-auto my-4 shadow-md group-hover:scale-105 transition-transform">
                <Briefcase size={24} />
              </div>

              {/* Kicker & Title */}
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                STUDENT &amp; GRADUATE PIPELINES
              </span>
              <h3 className="font-heading font-bold text-xl sm:text-[22px] text-white m-0 group-hover:text-cyan-200 transition-colors">
                Internships &amp; Jobs
              </h3>

              {/* Description */}
              <p className="text-[13px] sm:text-sm text-slate-300 leading-relaxed m-0 mt-2.5">
                Explore student internships, entry-level roles, and graduate opportunities across 5 core IT tracks with verified external sources.
              </p>
            </div>

            {/* Bottom Royal Blue Pill Action Button (Image 4 Reference) */}
            <div className="pt-6">
              <Link
                to="/internships"
                className="w-full py-3 px-5 rounded-full bg-[#0B57D0] hover:bg-[#1D6CE5] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-md shadow-blue-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Explore Opportunities</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>

        {/* Local Content Search Header — Standardized Unboxed Header Matching "Projects Hub Blueprints" */}
        <div className="pt-6">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-2">
            INSTANT LOCAL CONTENT SEARCH
          </p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Query Real IntelliMatch Resources
              </h2>
              <p className="font-sans text-sm sm:text-base text-slate-300 mt-2.5 max-w-2xl leading-relaxed">
                Search across all 5 core Software & IT domains, career roles, curriculum milestones, project blueprints, and ATS templates.
              </p>
            </div>

            {/* Live Match Counter */}
            {(contentSearchQuery.trim() || contentSearchCategory !== "all") && (
              <span className="font-mono text-xs font-semibold px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-400/30 w-fit shrink-0">
                {localSearchResults.length} Matching Results
              </span>
            )}
          </div>
        </div>

        {/* Local Content Search Workspace (Real-time in-memory index querying domains, roles, milestones, projects, templates) */}
        <div className="console-frame rounded-2xl p-6 sm:p-8 bg-[#050916]/95 border border-slate-800/90 shadow-2xl relative overflow-hidden space-y-6">
          {/* Top-Edge Specular Light Sweep */}
          <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent animate-beam-sweep" />

          {/* Search Input Bar */}
          <div className="relative">
            <div className="bg-[#080E20] border border-slate-700/80 focus-within:border-cyan-400/70 focus-within:ring-2 focus-within:ring-cyan-500/15 rounded-xl px-4 py-3.5 flex items-center justify-between gap-3 transition-all shadow-inner">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <Search size={18} className="text-cyan-400/80 shrink-0" />
                <input
                  type="text"
                  value={contentSearchQuery}
                  onChange={(e) => setContentSearchQuery(e.target.value)}
                  placeholder="Search by topic, skill, role, project, or template (e.g. Python, SQL, React, Docker, Machine Learning)..."
                  className="w-full bg-transparent text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
                />
              </div>
              {contentSearchQuery && (
                <button
                  type="button"
                  onClick={() => setContentSearchQuery("")}
                  className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                  aria-label="Clear search query"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 pt-5 pb-5 border-b border-slate-800/90">
            <span className="font-mono text-xs uppercase tracking-wider text-slate-400 mr-1">
              Filter By:
            </span>
            {[
              { id: "all", label: "All Resources", icon: "◈" },
              { id: "domain", label: "Domains (10)", icon: "⬡" },
              { id: "role", label: "Roles (50+)", icon: "◎" },
              { id: "milestone", label: "Roadmaps", icon: "⊶" },
              { id: "project", label: "Projects", icon: "⚡" },
              { id: "template", label: "Templates", icon: "▤" },
            ].map((filter) => {
              const isActive = contentSearchCategory === filter.id;
              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setContentSearchCategory(filter.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-sans text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-cyan-500/20 to-blue-600/25 text-cyan-300 border border-cyan-400/50 shadow-md shadow-cyan-500/10 -translate-y-0.5"
                      : "bg-[#091022] text-slate-300 border border-slate-800/90 hover:bg-[#0E1834] hover:border-blue-500/40 hover:text-white"
                  }`}
                >
                  <span className={isActive ? "text-cyan-400" : "text-slate-500"}>
                    {filter.icon}
                  </span>
                  <span>{filter.label}</span>
                </button>
              );
            })}
          </div>

          {/* Popular Search Queries Panel */}
          <div className="bg-[#080E20] border border-slate-800/90 rounded-xl p-4 sm:p-5 mt-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3.5">
              <span className="font-mono text-xs uppercase tracking-widest text-slate-300 font-semibold">
                POPULAR SEARCH QUERIES:
              </span>
              <span className="font-mono text-[11px] text-cyan-400/80">
                Click any tag to filter live resources
              </span>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {[
                "Full Stack",
                "Python",
                "Data Science",
                "Machine Learning",
                "Cloud & DevOps",
                "Cybersecurity",
                "SQL",
                "ATS Templates",
              ].map((tag) => {
                const isSelected =
                  (contentSearchQuery || "").toLowerCase() === tag.toLowerCase();
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      setContentSearchQuery(isSelected ? "" : tag);
                    }}
                    className={`group inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-mono text-xs font-medium transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? "bg-gradient-to-r from-indigo-600/30 to-cyan-500/25 text-cyan-200 border border-cyan-400/50 shadow-md shadow-cyan-500/10 -translate-y-0.5"
                        : "bg-[#0C142C] text-slate-300 border border-blue-500/20 hover:bg-[#111C3D] hover:border-cyan-400/45 hover:text-cyan-300 active:scale-95"
                    }`}
                  >
                    <span
                      className={`font-bold transition-transform duration-150 ${
                        isSelected
                          ? "text-cyan-300 rotate-45"
                          : "text-blue-400 group-hover:text-cyan-300"
                      }`}
                    >
                      +
                    </span>
                    <span>{tag}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Live Interactive Results Tray */}
          {(contentSearchQuery.trim() || contentSearchCategory !== "all") && (
            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wider text-slate-300 font-semibold">
                  Matching Resources ({localSearchResults.length}):
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setContentSearchQuery("");
                    setContentSearchCategory("all");
                  }}
                  className="font-mono text-xs text-cyan-400 hover:underline cursor-pointer"
                >
                  Clear Search
                </button>
              </div>

              {localSearchResults.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {localSearchResults.slice(0, 9).map((result) => (
                    <Link
                      key={result.id}
                      to={result.path}
                      className="p-4 rounded-xl border border-slate-800 bg-[#0B1328] hover:border-cyan-400/40 hover:bg-[#0E1834] transition-all flex flex-col justify-between group shadow-sm hover:shadow-cyan-950/20"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border ${result.badgeColor}`}>
                            {result.categoryLabel}
                          </span>
                          <span className="text-[11px] font-mono text-slate-400">{result.subtitle}</span>
                        </div>
                        <h4 className="font-heading font-bold text-sm sm:text-base text-white m-0 group-hover:text-cyan-300 transition-colors">
                          {result.title}
                        </h4>
                        <p className="text-xs text-slate-300 leading-relaxed m-0 line-clamp-2">
                          {result.description}
                        </p>
                        {result.skills && result.skills.length > 0 && (
                          <div className="flex flex-wrap gap-1 pt-1">
                            {result.skills.slice(0, 3).map((s) => (
                              <span
                                key={s}
                                className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-cyan-400">
                        <span>View Resource</span>
                        <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="p-8 rounded-xl bg-[#080E20] border border-slate-800 text-center space-y-2">
                  <p className="text-sm font-semibold text-white m-0">
                    No resources found matching "{contentSearchQuery}"
                  </p>
                  <p className="text-xs text-slate-400 m-0">
                    Try searching for core technologies like Python, React, SQL, AWS, Docker, or reset the category filter.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setContentSearchQuery("");
                      setContentSearchCategory("all");
                    }}
                    className="mt-2 px-4 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-cyan-300 hover:bg-slate-800"
                  >
                    Reset Search Filter
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* 8. Opportunities (Internships & Entry-Level Engineering Roles Preview) */}
      <section className="space-y-6 pt-2">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-2">
              SECTION 8 • INDUSTRY PIPELINES
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Opportunities &amp; Internships Preview
            </h2>
            <p className="font-sans text-sm sm:text-base text-slate-300 mt-2.5 max-w-2xl leading-relaxed">
              Discover student internships, entry-level engineering roles, and graduate opportunities across 5 core IT tracks.
            </p>
          </div>

          <Link
            to="/internships"
            className="inline-flex items-center gap-1.5 font-mono text-xs sm:text-sm font-semibold text-cyan-300 hover:text-cyan-200 hover:underline self-start md:self-end transition-colors"
          >
            <span>View All Opportunities Portal</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* Quick Role Search Switcher */}
        <div className="flex items-center gap-2 overflow-x-auto py-2 border-b border-slate-800/80 no-scrollbar">
          <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400 shrink-0 mr-1">
            Target Role Query:
          </span>
          {POPULAR_INTERNSHIP_ROLES.map((role) => {
            const isActive = selectedInternshipRole === role;
            return (
              <button
                key={role}
                type="button"
                onClick={() => setSelectedInternshipRole(role)}
                className={`px-3 py-1.5 rounded-lg font-sans text-xs font-medium shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? "bg-blue-500/20 text-cyan-300 border border-cyan-400/50 shadow-sm"
                    : "bg-[#080E20] text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-200"
                }`}
              >
                {role}
              </button>
            );
          })}
        </div>

        {/* 3 Verified External Portal Cards (Matching TOOL 01 / 02 / 03 Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              id: "PORTAL 01",
              eyebrow: "GLOBAL & INDIA NETWORK",
              name: "LinkedIn Jobs",
              description:
                "Search verified student internships, campus hiring drives, and entry-level engineering roles with direct recruiter filters and company links.",
              ctaText: "Search on LinkedIn",
              pillStyle: "bg-purple-950/60 border-purple-400/40 text-purple-200",
              iconCircleStyle: "bg-purple-950/50 border-purple-500/40 text-purple-300",
              icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              ),
              getUrl: (role) =>
                `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(
                  role || "Software Engineer Intern"
                )}&location=India`,
            },
            {
              id: "PORTAL 02",
              eyebrow: "INDIA CAMPUS & FRESHERS",
              name: "Naukri",
              description:
                "Explore fresh graduate engineering roles, off-campus drives, and IT traineeships across top Indian technology hubs and product teams.",
              ctaText: "Search on Naukri",
              pillStyle: "bg-sky-950/60 border-sky-400/40 text-sky-200",
              iconCircleStyle: "bg-sky-950/50 border-sky-500/40 text-sky-300",
              icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              ),
              getUrl: (role) =>
                `https://www.naukri.com/${(role || "software-engineer-intern")
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")}-jobs`,
            },
            {
              id: "PORTAL 03",
              eyebrow: "STUDENT & GRADUATE PIPELINES",
              name: "Internshala",
              description:
                "Find stipend-backed summer internships, semester-long technical projects, and pre-placement offer (PPO) opportunities across 5 core tracks.",
              ctaText: "Search on Internshala",
              pillStyle: "bg-emerald-950/60 border-emerald-400/40 text-emerald-200",
              iconCircleStyle: "bg-emerald-950/50 border-emerald-500/40 text-emerald-300",
              icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              ),
              getUrl: (role) =>
                `https://internshala.com/internships/keywords-${encodeURIComponent(
                  role || "Software Engineer Intern"
                )}`,
            },
          ].map((portal) => (
            <div
              key={portal.id}
              className="rounded-[24px] bg-[#060B19]/95 border border-slate-600/70 hover:border-slate-400/80 p-7 sm:p-8 flex flex-col items-center text-center justify-between shadow-2xl transition-all duration-200 hover:-translate-y-1"
            >
              <div className="flex flex-col items-center w-full">
                {/* Top Centered Pill Badge (Matches TOOL 01 / 02 / 03) */}
                <span
                  className={`px-4 py-1 rounded-full border font-mono text-xs font-semibold uppercase tracking-wider mb-6 ${portal.pillStyle}`}
                >
                  {portal.id}
                </span>

                {/* Centered Circular Tinted Icon (Matches TOOL 01 / 02 / 03) */}
                <div
                  className={`w-14 h-14 rounded-full border flex items-center justify-center mb-6 ${portal.iconCircleStyle}`}
                >
                  {portal.icon}
                </div>

                {/* Centered Uppercase Category Label */}
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400 mb-2">
                  {portal.eyebrow}
                </p>

                {/* Centered Bold White Serif Heading */}
                <h3 className="font-serif text-2xl sm:text-[28px] font-bold text-white tracking-tight mb-3.5">
                  {portal.name}
                </h3>

                {/* Centered Readable 3-Line Description */}
                <p className="font-sans text-sm text-slate-300 leading-relaxed max-w-sm mb-8">
                  {portal.description}
                </p>
              </div>

              {/* Full-Width Solid Royal Blue Pill CTA Button (Matches Browse 5 PDF Templates / Open Resume Analyzer / Explore Opportunities) */}
              <a
                href={portal.getUrl(
                  typeof selectedInternshipRole !== "undefined"
                    ? selectedInternshipRole
                    : "Software Engineer Intern"
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-full bg-[#185ADB] hover:bg-[#2563EB] text-white font-sans text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 transition-all"
              >
                <span>{portal.ctaText}</span>
                <span>→</span>
              </a>
            </div>
          ))}
        </div>

        <div className="text-center pt-2">
          <Link
            to="/internships"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#080E20] border border-cyan-500/30 text-cyan-300 hover:border-cyan-400/60 hover:text-white text-xs sm:text-sm font-semibold shadow-xs transition-all"
          >
            <span>Launch Verified Search Portals (LinkedIn, Naukri, Internshala)</span>
            <ExternalLink size={15} />
          </Link>
        </div>
      </section>

      {/* 9. Closing Call-to-Action (Deep Navy Logo Mesh Accent Surface) */}
      <section className="rounded-3xl bg-logo-ink-mesh text-white p-8 sm:p-12 relative overflow-hidden border border-brand-border/20 shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-violet/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-cyan/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-white m-0">
              Ready to Accelerate Your Career Preparation?
            </h2>
            <p className="text-sm sm:text-base text-white/85 m-0">
              Follow structured roadmaps, build real engineering projects, and test your resume with
              algorithmic ATS scoring.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <Link
              to="/analyzer"
              className="px-6 py-3 rounded-xl bg-logo-gradient text-white text-xs sm:text-sm font-semibold shadow-brand hover:brightness-110 active:scale-[0.98] transition-all"
            >
              Test Resume Analyzer
            </Link>
            <Link
              to="/templates"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs sm:text-sm font-semibold backdrop-blur-sm transition-all"
            >
              Download PDF Templates
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
