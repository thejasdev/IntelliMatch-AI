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
  Building2,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { ENGINEERING_DOMAINS } from "../../data/jobRoles.js";
import { ROADMAP_DOMAINS, ROADMAP_YEARS, getRoadmapForDomainAndYear } from "../../data/roadmaps.js";
import { CURATED_PROJECTS, getProjectsByFilter } from "../../data/projects.js";
import { MATCHING_DEMO_SCENARIOS, getScenarioById } from "../../data/matchingDemo.js";
import { SAMPLE_MULTI_DOMAIN_JOBS } from "../../data/jobSources.js";
import { RESUME_TEMPLATES_DATA } from "./TemplatesPage.jsx";

// Part 4 — Core Platform Quick-Access Cards (Modulus Layout Reference)
const QUICK_ACCESS_CARDS = [
  {
    id: "roadmaps",
    title: "Domains Roadmaps",
    desc: "Explore 10 engineering tracks and 4-year structured semester roadmaps.",
    icon: Map,
    iconBg: "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30",
    path: "/roadmaps",
    actionText: "View Roadmaps",
  },
  {
    id: "projects",
    title: "Projects Hub",
    desc: "Discover verified portfolio blueprints categorized by domain and difficulty.",
    icon: Layers,
    iconBg: "bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30",
    path: "/projects",
    actionText: "Browse Projects",
  },
  {
    id: "templates",
    title: "Resume Templates",
    desc: "Access 5 tested, single-page vector PDFs with 100% selectable text.",
    icon: FileText,
    iconBg: "bg-brand-violet/20 text-brand-periwinkle border border-brand-violet/30",
    path: "/templates",
    actionText: "Preview PDFs",
  },
  {
    id: "analyzer",
    title: "Resume Analyzer",
    desc: "Benchmark your resume against real job descriptions with ATS scoring.",
    icon: SearchCode,
    iconBg: "bg-purple-500/20 text-purple-300 border border-purple-500/30",
    path: "/analyzer",
    actionText: "Analyze Resume",
  },
  {
    id: "internships",
    title: "Internships",
    desc: "Discover entry-level roles and verified application portal pipelines.",
    icon: Briefcase,
    iconBg: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
    path: "/internships",
    actionText: "Find Roles",
  },
];

export default function HomePage({ onOpenContact, onPreviewPdf }) {
  // Domain Search & Filter State
  const [domainCategory, setDomainCategory] = useState("all");
  const [domainSearch, setDomainSearch] = useState("");

  // Roadmap Preview State
  const [roadmapYear, setRoadmapYear] = useState("year-1");
  const [roadmapDomain, setRoadmapDomain] = useState("software-dev");

  // Project Lab Filter State
  const [projectDiff, setProjectDiff] = useState("all");
  const [projectDomain, setProjectDomain] = useState("all");

  // Matching Demo Scenario State
  const [selectedScenarioId, setSelectedScenarioId] = useState("scenario-sw");

  // Local Content Search State
  const [contentSearchQuery, setContentSearchQuery] = useState("");
  const [contentSearchCategory, setContentSearchCategory] = useState("all");

  // Filtered Domains
  const domainCategoryMap = {
    all: null,
    software: ["software-dev", "emerging-tech"],
    data: ["data-analytics", "ai-ml"],
    cloud: ["cloud-devops", "cybersecurity"],
    systems: ["networking-it", "qa-testing", "embedded-systems", "enterprise-tech"],
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
            subtitle: `${rd.name} • ${m.timeframe || yearKey}`,
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
        subtitle: `${p.difficulty} • ${p.domain || p.domainId}`,
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
    if (!contentSearchQuery.trim()) return [];
    const q = contentSearchQuery.toLowerCase().trim();
    return localSearchIndex.filter((item) => {
      const matchCat = contentSearchCategory === "all" || item.category === contentSearchCategory;
      if (!matchCat) return false;
      const inTitle = item.title.toLowerCase().includes(q);
      const inDesc = item.description.toLowerCase().includes(q);
      const inSubtitle = item.subtitle.toLowerCase().includes(q);
      const inSkills = item.skills.some((s) => s.toLowerCase().includes(q));
      return inTitle || inDesc || inSubtitle || inSkills;
    });
  }, [contentSearchQuery, contentSearchCategory, localSearchIndex]);

  return (
    <div className="space-y-8 sm:space-y-10 pt-6 sm:pt-8 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* 1. Modulus-Inspired Centered Hero Composition */}
      <section
        className="relative overflow-hidden rounded-3xl text-white border border-white/12 px-6 py-10 sm:py-14 lg:py-16 shadow-2xl text-center backdrop-blur-md"
        style={{
          background:
            "linear-gradient(145deg, rgba(32, 34, 60, 0.45) 0%, rgba(22, 23, 42, 0.55) 100%)",
        }}
      >
        {/* Subtle translucent atmospheric depth accents */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-brand-violet/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-brand-cyan/15 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Centered Modulus Content Composition */}
        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          {/* Top Kicker Pill */}
          <div
            className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full text-sm font-medium text-[#38BDF8] shadow-xs"
            style={{
              background: "rgba(51, 52, 70, 0.55)",
              border: "1px solid rgba(255, 255, 255, 0.32)",
            }}
          >
            <span>✨ AI-Powered Career Discovery &amp; Readiness Platform</span>
          </div>

          {/* Centered Oversized Headline with Restrained Entrance Transition */}
          <h1 className="font-hero font-extrabold text-white text-[clamp(2.75rem,5.2vw,4.5rem)] leading-[1.12] tracking-[-0.025em] m-0 animate-hero-heading">
            <span className="text-[#FFFFFF]">Find Your Path. </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6E56CF] to-[#9B8AFB]">
              Build
            </span>
            <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A5B4FC] via-[#7DD3FC] to-[#19C6E8]">
              {" "}Your Future.
            </span>
          </h1>

          {/* Centered Supporting Copy with Restrained Coordinated Entrance */}
          <p className="text-sm sm:text-base md:text-lg text-[#D1D5EA] leading-relaxed max-w-[68ch] mx-auto m-0 font-normal animate-hero-subtext">
            Explore technology careers, follow structured learning roadmaps, build practical projects
            and prepare for opportunities that match your goals.
          </p>

          {/* Centered 3 Working Actions with Restrained Natural Timing */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-3 animate-hero-actions">
            <a
              href="#domains"
              className="inline-flex items-center gap-2 px-3 py-3 text-sm sm:text-base font-semibold text-white hover:text-brand-cyan transition-colors"
            >
              <span>Explore Career Domains</span>
              <ArrowRight size={18} />
            </a>

            <Link
              to="/roadmaps"
              className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-white rounded-xl shadow-lg transition-all duration-200 hover:border-brand-cyan hover:shadow-brand-hover hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: "#333446",
                border: "1px solid rgba(255, 255, 255, 0.42)",
                borderRadius: "12px",
                padding: "14px 28px",
              }}
            >
              <span>View Learning Roadmaps</span>
            </Link>

            <Link
              to="/analyzer"
              className="inline-flex items-center gap-1.5 px-3 py-3 text-sm sm:text-base font-semibold text-[#19C6E8] hover:text-[#93C5FD] transition-colors"
            >
              <span>Open Resume Analyzer</span>
              <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Platform Quick-Access Cards (Modulus-Style Row Directly Below Hero with ~2.5px Hover Lift) */}
      <section className="space-y-3 pt-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-slate flex items-center gap-1.5">
            <Sparkles size={13} className="text-brand-violet" />
            <span>Core Platform Workspaces</span>
          </span>
          <span className="text-[11px] text-brand-muted font-medium">5 Immediate Capabilities</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {QUICK_ACCESS_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.id}
                to={card.path}
                className="im-card im-card-lift p-4 sm:p-4.5 flex flex-col justify-between group"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className={`w-9 h-9 rounded-xl ${card.iconBg} flex items-center justify-center transition-transform group-hover:scale-105`}>
                      <Icon size={18} />
                    </div>
                    <ChevronRight size={14} className="text-brand-muted group-hover:text-brand-cyan group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-sm text-brand-slate m-0 group-hover:text-brand-cyan transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-[11px] text-brand-muted leading-relaxed mt-1 m-0 line-clamp-2">
                      {card.desc}
                    </p>
                  </div>
                </div>
                <div className="pt-2.5 mt-2 border-t border-brand-border/60 flex items-center justify-between text-[11px] font-semibold text-brand-cyan">
                  <span>{card.actionText}</span>
                  <span>&rarr;</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. Four-Stage Career Journey (Discover a Domain → Follow a Roadmap → Build Projects → Prepare for Opportunities) */}
      <section className="space-y-6 pt-2">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-violet">
            Four Connected Stages
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-brand-slate m-0 mt-1">
            Discover a Domain &rarr; Follow a Roadmap &rarr; Build Projects &rarr; Prepare for Opportunities
          </h2>
          <p className="text-sm text-brand-muted mt-2 m-0">
            A structured path guiding engineering students from technical exploration to verified industry readiness.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              stage: "Discover a Domain",
              icon: Compass,
              title: "Career Explorer",
              desc: "Survey 10 technical domains and understand industry role expectations.",
              linkText: "Explore Domains",
              href: "#domains",
              color: "text-brand-periwinkle bg-brand-violet/20 border border-brand-violet/30",
            },
            {
              stage: "Follow a Roadmap",
              icon: Map,
              title: "Learning Roadmaps",
              desc: "Progress step-by-step through semester curricula and recommended resources.",
              linkText: "View Roadmaps",
              href: "/roadmaps",
              color: "text-indigo-300 bg-indigo-500/20 border border-indigo-500/30",
            },
            {
              stage: "Build Projects",
              icon: Layers,
              title: "Projects Hub",
              desc: "Apply concepts into portfolio-grade, deliverable software projects.",
              linkText: "Browse Projects",
              href: "/projects",
              color: "text-brand-cyan bg-brand-cyan/20 border border-brand-cyan/30",
            },
            {
              stage: "Prepare for Opportunities",
              icon: SearchCode,
              title: "Resume & Readiness",
              desc: "Benchmark your resume against job postings and explore internships.",
              linkText: "Prepare Resume",
              href: "/analyzer",
              color: "text-emerald-300 bg-emerald-500/20 border border-emerald-500/30",
            },
          ].map((card, i) => {
            const Icon = card.icon;
            return (
              <div
                key={card.stage}
                className="im-card im-card-lift p-6 flex flex-col justify-between group transition-all duration-200"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-cyan bg-brand-surface px-2.5 py-0.5 rounded-full border border-brand-border">
                      Stage {i + 1}
                    </span>
                    <div className={`w-9 h-9 rounded-xl ${card.color} flex items-center justify-center flex-shrink-0`}>
                      <Icon size={18} />
                    </div>
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-brand-muted block uppercase tracking-wide">
                      {card.stage}
                    </span>
                    <h3 className="font-heading font-bold text-base text-brand-slate m-0 mt-0.5">
                      {card.title}
                    </h3>
                  </div>
                  <p className="text-xs text-brand-muted leading-relaxed m-0">{card.desc}</p>
                </div>
                <div className="pt-4 mt-3 border-t border-brand-border/60">
                  {card.href.startsWith("#") ? (
                    <a
                      href={card.href}
                      className="text-xs font-semibold text-brand-cyan hover:text-white inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>{card.linkText}</span>
                      <ChevronRight size={14} />
                    </a>
                  ) : (
                    <Link
                      to={card.href}
                      className="text-xs font-semibold text-brand-cyan hover:text-white inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>{card.linkText}</span>
                      <ChevronRight size={14} />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>


      {/* 3. Explore Technology Careers (10 Supported Domains) */}
      <section id="domains" className="space-y-6 pt-2">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-violet">
              10 Specialized Tracks
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-brand-slate m-0 mt-1">
              Explore Technology Domains
            </h2>
            <p className="text-sm text-brand-muted mt-2 m-0">
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
              className="w-full pl-9 pr-3.5 py-2.5 text-xs rounded-xl border border-brand-border bg-brand-card text-brand-slate placeholder:text-brand-muted focus:outline-none focus:border-brand-violet focus:ring-2 focus:ring-brand-violet/20"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: "all", label: "All 10 Domains" },
            { id: "software", label: "Software & Web" },
            { id: "data", label: "Data & AI" },
            { id: "cloud", label: "Cloud & Security" },
            { id: "systems", label: "Systems & Hardware" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setDomainCategory(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                domainCategory === tab.id
                  ? "bg-brand-violet text-white shadow-xs font-semibold"
                  : "bg-brand-card text-brand-slate border border-brand-border hover:bg-brand-surface hover:text-brand-violet"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Domain Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDomains.map((domain) => (
            <div
              key={domain.id}
              className="im-card p-6 flex flex-col justify-between group hover:border-brand-violet/50 transition-all duration-200"
            >
              <div className="space-y-3.5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-heading font-bold text-base text-brand-slate m-0">
                    {domain.name}
                  </h3>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-brand-surface text-brand-violet border border-brand-border whitespace-nowrap">
                    {domain.roles.length} Roles
                  </span>
                </div>
                <p className="text-xs text-brand-muted leading-relaxed m-0 line-clamp-2">
                  {domain.description}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {domain.roles.slice(0, 3).map((r) => (
                    <span
                      key={r.id}
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-brand-surface text-brand-slate border border-brand-border/70"
                    >
                      {r.title}
                    </span>
                  ))}
                  {domain.roles.length > 3 && (
                    <span className="text-[11px] px-2.5 py-1 rounded-lg bg-brand-violet/10 text-brand-violet font-semibold border border-brand-violet/20">
                      +{domain.roles.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-brand-border/60 flex items-center justify-between">
                <Link
                  to={`/roadmaps?domain=${domain.id}`}
                  className="text-xs font-semibold text-brand-violet hover:underline inline-flex items-center gap-1"
                >
                  <span>View Roadmaps</span>
                  <ChevronRight size={13} />
                </Link>
                <Link
                  to={`/projects?domain=${domain.id}`}
                  className="text-xs text-brand-muted hover:text-brand-slate font-medium"
                >
                  Projects &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Interactive Learning Roadmaps Preview */}
      <section id="roadmaps" className="space-y-6 pt-2">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-violet">
            Structured Curriculum
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-brand-slate m-0 mt-1">
            Interactive Learning Roadmaps
          </h2>
          <p className="text-sm text-brand-muted mt-2 m-0">
            Select an academic year and engineering domain to review curated semester milestones.
          </p>
        </div>

        <div className="im-card p-6 md:p-8 space-y-6">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-brand-border">
            <div className="flex flex-wrap items-center gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-muted mb-1">
                  College Level
                </label>
                <select
                  value={roadmapYear}
                  onChange={(e) => setRoadmapYear(e.target.value)}
                  className="px-3.5 py-2 text-xs font-medium rounded-xl border border-brand-border bg-brand-surface text-brand-slate focus:outline-none focus:border-brand-violet"
                >
                  {ROADMAP_YEARS.map((y) => (
                    <option key={y.id} value={y.id}>
                      {y.label}: {y.stage}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-muted mb-1">
                  Career Track
                </label>
                <select
                  value={roadmapDomain}
                  onChange={(e) => setRoadmapDomain(e.target.value)}
                  className="px-3.5 py-2 text-xs font-medium rounded-xl border border-brand-border bg-brand-surface text-brand-slate focus:outline-none focus:border-brand-violet"
                >
                  {ROADMAP_DOMAINS.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="text-right sm:self-end">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-violet/10 text-brand-violet border border-brand-violet/20">
                {currentRoadmap?.yearLabel || currentRoadmap?.yearMeta?.label || "Foundations"} &bull; {currentRoadmap?.stageLabel || currentRoadmap?.yearMeta?.stage || "Year 1"}
              </span>
            </div>
          </div>

          {/* Overview Banner */}
          <div className="p-4 rounded-xl bg-brand-surface border border-brand-border">
            <p className="text-xs text-brand-slate leading-relaxed m-0 font-medium">
              <span className="font-bold text-brand-slate">Year Focus:</span> {currentRoadmap?.overview || currentRoadmap?.domain?.overview || "Master key fundamentals and competencies for this academic year."}
            </p>
          </div>

          {/* Milestones Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(currentRoadmap?.milestones || []).map((m, idx) => (
              <div
                key={m.id || idx}
                className="p-5 rounded-xl border border-brand-border bg-brand-surface/60 hover:border-brand-violet/40 hover:bg-brand-surface transition-all duration-150 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-brand-violet bg-brand-card px-2.5 py-0.5 rounded-md border border-brand-border">
                    Milestone {idx + 1}
                  </span>
                  <span className="text-[11px] text-brand-muted font-medium">{m.duration || m.timeframe || ""}</span>
                </div>
                <h4 className="font-heading font-bold text-sm text-brand-slate m-0">{m.title}</h4>
                <p className="text-xs text-brand-muted leading-relaxed m-0">{m.description}</p>
                <div className="pt-2 flex flex-wrap gap-1">
                  {(m.topics || m.skills || []).map((t) => (
                    <span
                      key={t}
                      className="text-[10px] px-2 py-0.5 rounded bg-brand-card text-brand-slate border border-brand-border/60"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer CTA */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs border-t border-brand-border">
            <span className="text-brand-muted">
              Interactive roadmap milestone preview. Explore all tracks across all 4 engineering years.
            </span>
            <Link
              to="/roadmaps"
              className="inline-flex items-center gap-1.5 font-semibold text-brand-violet hover:underline"
            >
              <span>Explore Complete Roadmap Matrix</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Projects Hub Preview Section */}
      <section className="space-y-6 pt-2">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-violet">
              Learn by Building
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-brand-slate m-0 mt-1">
              Projects Hub Blueprints
            </h2>
            <p className="text-sm text-brand-muted mt-2 m-0">
              Bridge academic concepts and engineering deliverables through curated portfolio projects.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {["all", "beginner", "intermediate", "advanced"].map((diff) => (
              <button
                key={diff}
                type="button"
                onClick={() => setProjectDiff(diff)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium capitalize transition-all ${
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

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {(filteredProjects || []).slice(0, 3).map((project) => (
            <div
              key={project.id}
              className="im-card p-6 flex flex-col justify-between group hover:border-brand-violet/40 transition-all duration-200"
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
                  <span className="text-[11px] text-brand-muted font-medium">{project.estimatedHours || "Self-Paced"}</span>
                </div>

                <h3 className="font-heading font-bold text-base text-brand-slate m-0">
                  {project.title}
                </h3>
                <p className="text-xs text-brand-muted leading-relaxed m-0">
                  {project.description || project.deliverable || ""}
                </p>

                <div className="space-y-1.5 pt-1">
                  <div className="text-[11px] font-bold text-brand-slate">Deliverables:</div>
                  <ul className="text-xs text-brand-muted space-y-1 pl-4 m-0 list-disc">
                    {(Array.isArray(project.deliverables)
                      ? project.deliverables
                      : (project.deliverable ? [project.deliverable] : [])
                    ).slice(0, 2).map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-brand-border/60 flex items-center justify-between">
                <Link
                  to={`/projects?id=${project.id}`}
                  className="text-xs font-semibold text-brand-violet hover:underline inline-flex items-center gap-1"
                >
                  <span>Inspect Blueprint</span>
                  <ChevronRight size={13} />
                </Link>
                <span className="text-[11px] text-brand-muted">{project.skills.slice(0, 2).join(", ")}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-2">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-card border border-brand-border text-brand-violet hover:bg-brand-surface text-xs font-semibold shadow-xs transition-all"
          >
            <span>Browse All {CURATED_PROJECTS.length} Project Blueprints</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* 6. Resume-to-Job Matching Interactive Demonstration (Clearly Labeled Sample Scenario) */}
      <section className="space-y-6 pt-2">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-violet">
            Algorithmic Intelligence Preview
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-brand-slate m-0 mt-1">
            Resume-to-Job Semantic Matching
          </h2>
          <p className="text-sm text-brand-muted mt-2 m-0">
            Interactive simulation illustrating how keyword coverage, experience evaluation, and ATS
            benchmarking work on sample resumes.
          </p>
        </div>

        <div className="im-card p-6 md:p-8 space-y-6">
          {/* Scenario Buttons */}
          <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-brand-border">
            <span className="text-xs font-bold text-brand-slate mr-2">Sample Role:</span>
            {MATCHING_DEMO_SCENARIOS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSelectedScenarioId(s.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  selectedScenarioId === s.id
                    ? "bg-brand-violet text-white shadow-xs font-semibold"
                    : "bg-brand-surface text-brand-slate hover:bg-brand-violet/10 hover:text-brand-violet border border-brand-border"
                }`}
              >
                {s.roleTitle}
              </button>
            ))}
          </div>

          {/* Scenario Results Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Score Wheel */}
            <div className="lg:col-span-4 p-6 rounded-2xl bg-brand-surface border border-brand-border flex flex-col items-center text-center space-y-3">
              <div className="w-28 h-28 rounded-full border-4 border-brand-violet flex flex-col items-center justify-center bg-brand-card shadow-xs">
                <span className="text-3xl font-bold font-heading text-brand-violet">
                  {currentScenario.matchScore}%
                </span>
                <span className="text-[10px] font-semibold text-brand-muted uppercase">Match Score</span>
              </div>

              <div>
                <h4 className="font-heading font-bold text-base text-brand-slate m-0">
                  {currentScenario.candidateName}
                </h4>
                <p className="text-xs text-brand-muted m-0">{currentScenario.candidateBackground}</p>
              </div>

              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                <CheckCircle2 size={12} /> {currentScenario.overallVerdict}
              </span>
            </div>

            {/* Analysis Details */}
            <div className="lg:col-span-8 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/25">
                  <div className="text-xs font-bold text-emerald-300 mb-2 flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-emerald-400" />
                    <span>Matched Keywords ({(currentScenario.matchedSkills || []).length})</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {(currentScenario.matchedSkills || []).map((s) => (
                      <span key={s} className="text-[11px] px-2 py-0.5 rounded bg-brand-card text-emerald-300 font-medium border border-emerald-500/30">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/25">
                  <div className="text-xs font-bold text-amber-300 mb-2 flex items-center gap-1.5">
                    <Sparkles size={14} className="text-amber-400" />
                    <span>Skill Gaps ({(currentScenario.missingSkills || []).length})</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {(currentScenario.missingSkills || []).map((s) => (
                      <span key={s} className="text-[11px] px-2 py-0.5 rounded bg-brand-card text-amber-300 font-medium border border-amber-500/30">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bullet Optimization Tip */}
              <div className="p-4 rounded-xl bg-brand-surface border border-brand-border space-y-2">
                <div className="text-xs font-bold text-brand-cyan uppercase tracking-wide">
                  💡 Action Verb &amp; Metrics Optimization Tip
                </div>
                <div className="text-xs space-y-1">
                  <div className="text-rose-300">
                    <span className="font-bold">Before:</span> <em>"{currentScenario.sampleBulletOptimization?.original || ""}"</em>
                  </div>
                  <div className="text-emerald-300">
                    <span className="font-bold">Optimized:</span> <strong>"{currentScenario.sampleBulletOptimization?.optimized || ""}"</strong>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-brand-muted">Ready to test your actual resume with ATS parsing?</span>
                <Link
                  to="/analyzer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-violet text-white font-semibold hover:bg-brand-violetHover shadow-xs transition-colors"
                >
                  <span>Launch Live Analyzer</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Career-Readiness Tools & Local Content Search */}
      <section className="space-y-8 pt-2">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-violet">
            Section 7 • Readiness &amp; Intelligence
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-brand-slate m-0 mt-1">
            Career-Readiness Tools &amp; Content Search
          </h2>
          <p className="text-sm text-brand-muted mt-2 m-0">
            Focused applications to benchmark career materials, explore curriculum resources, and instant search across the entire IntelliMatch catalogue.
          </p>
        </div>

        {/* 3 Focused Career Workspaces */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Tool 1 */}
          <div className="im-card im-card-lift p-6 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-brand-violet/20 text-brand-periwinkle border border-brand-violet/30 flex items-center justify-center">
                <FileText size={24} />
              </div>
              <h3 className="font-heading font-bold text-lg text-brand-slate m-0">
                ATS Resume Templates
              </h3>
              <p className="text-xs text-brand-muted leading-relaxed m-0">
                Access 5 tested, single-page PDF templates with selectable text, distinct layout philosophies, and verified ATS compatibility.
              </p>
            </div>
            <div className="pt-6 mt-4 border-t border-brand-border/60">
              <Link
                to="/templates"
                className="w-full py-2.5 px-4 rounded-xl bg-brand-surface hover:bg-brand-violet hover:text-white text-brand-cyan text-xs font-semibold flex items-center justify-center gap-1.5 border border-brand-border transition-colors"
              >
                <span>Browse 5 PDF Templates</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Tool 2 */}
          <div className="im-card im-card-lift p-6 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center justify-center">
                <SearchCode size={24} />
              </div>
              <h3 className="font-heading font-bold text-lg text-brand-slate m-0">
                Resume Analyzer
              </h3>
              <p className="text-xs text-brand-muted leading-relaxed m-0">
                Upload your resume, select from 10 technical domains, and benchmark missing skills, keyword frequency, and recruiter readiness.
              </p>
            </div>
            <div className="pt-6 mt-4 border-t border-brand-border/60">
              <Link
                to="/analyzer"
                className="w-full py-2.5 px-4 rounded-xl bg-brand-violet hover:bg-brand-violetHover text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
              >
                <span>Open Resume Analyzer</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Tool 3 */}
          <div className="im-card im-card-lift p-6 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-brand-cyan border border-cyan-500/30 flex items-center justify-center">
                <Briefcase size={24} />
              </div>
              <h3 className="font-heading font-bold text-lg text-brand-slate m-0">
                Internships &amp; Jobs
              </h3>
              <p className="text-xs text-brand-muted leading-relaxed m-0">
                Explore student internships, entry-level roles, and graduate opportunities across 10 engineering tracks with verified external sources.
              </p>
            </div>
            <div className="pt-6 mt-4 border-t border-brand-border/60">
              <Link
                to="/internships"
                className="w-full py-2.5 px-4 rounded-xl bg-brand-surface hover:bg-brand-violet hover:text-white text-brand-slate text-xs font-semibold flex items-center justify-center gap-1.5 border border-brand-border transition-colors"
              >
                <span>Explore Opportunities</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* Local Content Search (Real-time in-memory index querying domains, roles, milestones, projects, templates) */}
        <div className="im-card p-6 sm:p-8 space-y-6 border-t-2 border-t-brand-cyan">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-cyan mb-1">
                <Search size={14} />
                <span>Instant Local Content Search</span>
              </div>
              <h3 className="text-xl font-bold font-heading text-brand-slate m-0">
                Query Real IntelliMatch Resources
              </h3>
              <p className="text-xs text-brand-muted mt-1 m-0">
                Search across all 10 engineering domains, career roles, curriculum milestones, project blueprints, and ATS templates.
              </p>
            </div>

            {/* Live Match Counter */}
            {contentSearchQuery.trim() && (
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-brand-surface text-brand-cyan border border-brand-border w-fit">
                {localSearchResults.length} Matching Results
              </span>
            )}
          </div>

          {/* Search Input Bar */}
          <div className="relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" />
            <input
              type="text"
              value={contentSearchQuery}
              onChange={(e) => setContentSearchQuery(e.target.value)}
              placeholder="Search by topic, skill, role, project, or template (e.g. Python, SQL, React, Docker, Machine Learning)..."
              className="w-full pl-11 pr-10 py-3 text-xs sm:text-sm rounded-xl border border-brand-border bg-brand-surface text-brand-slate placeholder:text-brand-muted focus:outline-none focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 transition-all"
            />
            {contentSearchQuery && (
              <button
                type="button"
                onClick={() => setContentSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-muted hover:text-white p-1 rounded-lg"
                aria-label="Clear search query"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-brand-border">
            <span className="text-xs font-bold text-brand-slate mr-1">Filter By:</span>
            {[
              { id: "all", label: "All Resources" },
              { id: "domain", label: "Domains (10)" },
              { id: "role", label: "Roles (50+)" },
              { id: "milestone", label: "Roadmaps" },
              { id: "project", label: "Projects" },
              { id: "template", label: "Templates" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setContentSearchCategory(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  contentSearchCategory === tab.id
                    ? "bg-brand-cyan/20 text-brand-cyan font-semibold border border-brand-cyan/40 shadow-xs"
                    : "bg-brand-surface text-brand-slate border border-brand-border hover:bg-brand-card hover:text-brand-cyan"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Quick Keyword Suggestion Chips (Shown when query is empty) */}
          {!contentSearchQuery.trim() && (
            <div className="p-4 rounded-xl bg-brand-surface border border-brand-border space-y-2">
              <span className="text-[11px] font-bold text-brand-slate uppercase tracking-wider block">
                Popular Search Queries:
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  "Full Stack",
                  "Python",
                  "Data Science",
                  "Machine Learning",
                  "Cloud & DevOps",
                  "Cybersecurity",
                  "SQL",
                  "ATS Templates",
                ].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setContentSearchQuery(tag)}
                    className="text-xs px-3 py-1 rounded-lg bg-brand-card hover:bg-brand-cyan/15 hover:text-brand-cyan text-brand-slate border border-brand-border transition-colors font-medium"
                  >
                    + {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results Display */}
          {contentSearchQuery.trim() && (
            <div className="space-y-3 pt-2">
              {localSearchResults.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {localSearchResults.slice(0, 9).map((result) => (
                    <Link
                      key={result.id}
                      to={result.path}
                      className="p-4 rounded-xl border border-brand-border bg-brand-surface/70 hover:border-brand-cyan/40 hover:bg-brand-surface transition-all flex flex-col justify-between group"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${result.badgeColor}`}>
                            {result.categoryLabel}
                          </span>
                          <span className="text-[11px] text-brand-muted">{result.subtitle}</span>
                        </div>
                        <h4 className="font-heading font-bold text-sm text-brand-slate m-0 group-hover:text-brand-cyan transition-colors">
                          {result.title}
                        </h4>
                        <p className="text-xs text-brand-muted leading-relaxed m-0 line-clamp-2">
                          {result.description}
                        </p>
                        {result.skills && result.skills.length > 0 && (
                          <div className="flex flex-wrap gap-1 pt-1">
                            {result.skills.slice(0, 3).map((s) => (
                              <span
                                key={s}
                                className="text-[10px] px-2 py-0.5 rounded bg-brand-card text-brand-slate border border-brand-border/60"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="pt-3 mt-3 border-t border-brand-border/60 flex items-center justify-between text-xs font-semibold text-brand-cyan">
                        <span>View Resource</span>
                        <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="p-8 rounded-xl bg-brand-surface border border-brand-border text-center space-y-2">
                  <p className="text-sm font-semibold text-brand-slate m-0">
                    No resources found matching "{contentSearchQuery}"
                  </p>
                  <p className="text-xs text-brand-muted m-0">
                    Try searching for core technologies like Python, React, SQL, AWS, Docker, or reset the category filter.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setContentSearchQuery("");
                      setContentSearchCategory("all");
                    }}
                    className="mt-2 px-4 py-1.5 rounded-xl bg-brand-card border border-brand-border text-xs font-semibold text-brand-cyan hover:bg-brand-surface"
                  >
                    Reset Search Filter
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Semantic Matching Demonstration Preview */}
        <div className="im-card p-6 md:p-8 space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-violet">
              Algorithmic Intelligence Preview
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-brand-slate m-0 mt-1">
              Resume-to-Job Semantic Matching
            </h3>
            <p className="text-sm text-brand-muted mt-2 m-0">
              Interactive simulation illustrating how keyword coverage, experience evaluation, and ATS
              benchmarking work on sample candidate profiles.
            </p>
          </div>

          {/* Scenario Buttons */}
          <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-brand-border">
            <span className="text-xs font-bold text-brand-slate mr-2">Sample Role:</span>
            {MATCHING_DEMO_SCENARIOS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSelectedScenarioId(s.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  selectedScenarioId === s.id
                    ? "bg-brand-violet text-white shadow-xs font-semibold"
                    : "bg-brand-surface text-brand-slate hover:bg-brand-violet/10 hover:text-brand-violet border border-brand-border"
                }`}
              >
                {s.roleTitle}
              </button>
            ))}
          </div>

          {/* Scenario Results Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Score Wheel */}
            <div className="lg:col-span-4 p-6 rounded-2xl bg-brand-surface border border-brand-border flex flex-col items-center text-center space-y-3">
              <div className="w-28 h-28 rounded-full border-4 border-brand-violet flex flex-col items-center justify-center bg-brand-card shadow-xs">
                <span className="text-3xl font-bold font-heading text-brand-violet">
                  {currentScenario.matchScore}%
                </span>
                <span className="text-[10px] font-semibold text-brand-muted uppercase">Match Score</span>
              </div>

              <div>
                <h4 className="font-heading font-bold text-base text-brand-slate m-0">
                  {currentScenario.candidateName}
                </h4>
                <p className="text-xs text-brand-muted m-0">{currentScenario.candidateBackground}</p>
              </div>

              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                <CheckCircle2 size={12} /> {currentScenario.overallVerdict}
              </span>
            </div>

            {/* Analysis Details */}
            <div className="lg:col-span-8 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/25">
                  <div className="text-xs font-bold text-emerald-300 mb-2 flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-emerald-400" />
                    <span>Matched Keywords ({(currentScenario.matchedSkills || []).length})</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {(currentScenario.matchedSkills || []).map((s) => (
                      <span key={s} className="text-[11px] px-2 py-0.5 rounded bg-brand-card text-emerald-300 font-medium border border-emerald-500/30">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/25">
                  <div className="text-xs font-bold text-amber-300 mb-2 flex items-center gap-1.5">
                    <Sparkles size={14} className="text-amber-400" />
                    <span>Skill Gaps ({(currentScenario.missingSkills || []).length})</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {(currentScenario.missingSkills || []).map((s) => (
                      <span key={s} className="text-[11px] px-2 py-0.5 rounded bg-brand-card text-amber-300 font-medium border border-amber-500/30">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bullet Optimization Tip */}
              <div className="p-4 rounded-xl bg-brand-surface border border-brand-border space-y-2">
                <div className="text-xs font-bold text-brand-cyan uppercase tracking-wide">
                  💡 Action Verb &amp; Metrics Optimization Tip
                </div>
                <div className="text-xs space-y-1">
                  <div className="text-rose-300">
                    <span className="font-bold">Before:</span> <em>"{currentScenario.sampleBulletOptimization?.original || ""}"</em>
                  </div>
                  <div className="text-emerald-300">
                    <span className="font-bold">Optimized:</span> <strong>"{currentScenario.sampleBulletOptimization?.optimized || ""}"</strong>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-brand-muted">Ready to test your actual resume with ATS parsing?</span>
                <Link
                  to="/analyzer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-violet text-white font-semibold hover:bg-brand-violetHover shadow-xs transition-colors"
                >
                  <span>Launch Live Analyzer</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Opportunities (Internships & Entry-Level Engineering Roles Preview) */}
      <section className="space-y-6 pt-2">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-cyan">
              Section 8 • Industry Pipelines
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-brand-slate m-0 mt-1">
              Opportunities &amp; Internships Preview
            </h2>
            <p className="text-sm text-brand-muted mt-2 m-0">
              Discover student internships, entry-level engineering roles, and graduate opportunities across 10 engineering tracks.
            </p>
          </div>

          <Link
            to="/internships"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-cyan hover:underline self-start md:self-end"
          >
            <span>View All Opportunities Portal</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* 3 Real Sample Opportunities */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {SAMPLE_MULTI_DOMAIN_JOBS.slice(0, 3).map((job) => (
            <div
              key={job.id}
              className="im-card im-card-lift p-6 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    {job.arrangement}
                  </span>
                  <span className="text-[11px] text-brand-muted font-medium">{job.experienceLevel}</span>
                </div>

                <div>
                  <h3 className="font-heading font-bold text-base text-brand-slate m-0 group-hover:text-brand-cyan transition-colors">
                    {job.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-brand-cyan font-medium mt-1">
                    <Building2 size={13} />
                    <span>{job.company}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-brand-muted mt-0.5">
                    <MapPin size={12} />
                    <span>{job.location}</span>
                  </div>
                </div>

                <p className="text-xs text-brand-muted leading-relaxed m-0 line-clamp-2">
                  {job.snippet}
                </p>

                <div className="flex flex-wrap gap-1 pt-1">
                  {(job.skills || []).slice(0, 3).map((s) => (
                    <span
                      key={s}
                      className="text-[10px] px-2 py-0.5 rounded bg-brand-surface text-brand-slate border border-brand-border"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-brand-border/60 flex items-center justify-between">
                <Link
                  to="/internships"
                  className="text-xs font-semibold text-brand-cyan hover:underline inline-flex items-center gap-1"
                >
                  <span>Explore Role in Portal</span>
                  <ChevronRight size={13} />
                </Link>
                <span className="text-[10px] text-brand-muted">{job.jobType}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-2">
          <Link
            to="/internships"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-card border border-brand-border text-brand-cyan hover:bg-brand-surface text-xs font-semibold shadow-xs transition-all"
          >
            <span>Launch Verified Search Portals (LinkedIn, Naukri, Internshala)</span>
            <ExternalLink size={14} />
          </Link>
        </div>
      </section>

      {/* 9. Closing Call-to-Action (Deep Navy Logo Mesh Accent Surface) */}
      <section className="rounded-3xl bg-logo-ink-mesh text-white p-8 sm:p-12 relative overflow-hidden border border-brand-border/20 shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-violet/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-cyan/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white m-0">
              Ready to Accelerate Your Career Preparation?
            </h2>
            <p className="text-sm text-white/80 m-0">
              Follow structured roadmaps, build real engineering projects, and test your resume with
              algorithmic ATS scoring.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <Link
              to="/analyzer"
              className="px-6 py-3 rounded-xl bg-logo-gradient text-white text-xs font-semibold shadow-brand hover:brightness-110 active:scale-[0.98] transition-all"
            >
              Test Resume Analyzer
            </Link>
            <Link
              to="/templates"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-semibold backdrop-blur-sm transition-all"
            >
              Download PDF Templates
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
