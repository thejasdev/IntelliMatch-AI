import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Briefcase,
  Search,
  MapPin,
  Building2,
  ExternalLink,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { SAMPLE_MULTI_DOMAIN_JOBS, JOB_SOURCES } from "../../data/jobSources.js";
import { ENGINEERING_DOMAINS } from "../../data/jobRoles.js";

export default function InternshipsPage() {
  const [selectedDomain, setSelectedDomain] = useState("all");
  const [selectedArrangement, setSelectedArrangement] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredJobs = useMemo(() => {
    let list = SAMPLE_MULTI_DOMAIN_JOBS;
    if (selectedDomain !== "all") {
      list = list.filter((j) => j.domainId === selectedDomain);
    }
    if (selectedArrangement !== "all") {
      list = list.filter((j) => j.arrangement.toLowerCase() === selectedArrangement.toLowerCase());
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.company.toLowerCase().includes(q) ||
          j.location.toLowerCase().includes(q) ||
          j.skills.some((s) => s.toLowerCase().includes(q))
      );
    }
    return list;
  }, [selectedDomain, selectedArrangement, searchQuery]);

  return (
    <div className="space-y-8 pt-6 sm:pt-8 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* 1. Unified Page Header — Styled after the master Home hero */}
      <section
        className="relative overflow-hidden rounded-3xl text-white border border-white/15 px-6 sm:px-10 lg:px-12 py-8 sm:py-10 lg:py-12 shadow-2xl backdrop-blur-md"
        style={{
          background:
            "linear-gradient(145deg, rgba(20, 24, 48, 0.55) 0%, rgba(14, 18, 36, 0.7) 100%)",
        }}
      >
        {/* Subtle atmospheric depth glow accents matching hero */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute -top-12 -left-12 w-96 h-96 bg-brand-violet/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-brand-cyan/15 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Top 2-Column Grid matching Home hero */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start lg:items-center">
          {/* Left Column: Pill badge + Two-tone display title */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-4 sm:space-y-5 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-medium text-[#38BDF8] bg-[#1E293B]/70 border border-white/20">
              <Sparkles size={12} className="text-[#38BDF8]" />
              <span className="uppercase tracking-wider">Career Opportunities</span>
            </div>

            <h1 className="font-hero font-extrabold text-white text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[1.08] tracking-[-0.03em] m-0">
              <span className="block text-white">Internships </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#6E56CF] via-[#818CF8] to-[#38BDF8]">
                &amp; Entry-Level Roles
              </span>
            </h1>
          </div>

          {/* Right Column: OVERVIEW label + description */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-2 text-left lg:border-l lg:border-white/10 lg:pl-8 lg:py-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.15em] text-[#38BDF8] block mb-2">
              OVERVIEW
            </span>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed m-0 font-normal">
              Discover student internships, graduate traineeships, and entry-level engineering roles across
              10 technical domains, or launch verified external platform searches.
            </p>
          </div>
        </div>

        {/* External Sources Search Bar inside the same frame */}
        <div className="relative z-10 mt-8 pt-6 border-t border-slate-800/80 space-y-3">
          <div className="text-xs sm:text-[13px] font-bold uppercase tracking-wider text-slate-300">
            Verified External Search Portals:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {JOB_SOURCES.filter((s) => s.buildSearchUrl).map((source) => (
              <a
                key={source.id}
                href={source.buildSearchUrl ? source.buildSearchUrl("", "") : "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-brand-cyan/40 hover:bg-white/[0.06] transition-all flex items-center justify-between group"
              >
                <div>
                  <span className="text-xs sm:text-[13px] font-bold text-brand-slate block group-hover:text-brand-cyan transition-colors">
                    {source.name}
                  </span>
                  <span className="text-[11px] sm:text-xs text-brand-muted">{source.status || "Open Search"}</span>
                </div>
                <ExternalLink size={15} className="text-brand-cyan" />
              </a>
            ))}
          </div>
        </div>
      </section>

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
              placeholder="Search by role, company or skill..."
              className="w-full pl-9 pr-3.5 py-2.5 text-xs rounded-xl border border-brand-border bg-brand-surface text-brand-slate placeholder:text-brand-muted focus:outline-none focus:border-brand-cyan"
            />
          </div>

          {/* Domain Filter */}
          <div className="md:col-span-4">
            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-brand-border bg-brand-surface text-brand-slate focus:outline-none focus:border-brand-cyan font-medium"
            >
              <option value="all">All 10 Domains</option>
              {ENGINEERING_DOMAINS.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          {/* Arrangement Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedArrangement}
              onChange={(e) => setSelectedArrangement(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-brand-border bg-brand-surface text-brand-slate focus:outline-none focus:border-brand-cyan font-medium"
            >
              <option value="all">All Work Modes</option>
              <option value="remote">Remote Only</option>
              <option value="hybrid">Hybrid</option>
              <option value="onsite">On-Site</option>
            </select>
          </div>
        </div>
      </div>

      {/* Opportunity Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="im-card im-card-lift p-6 flex flex-col justify-between group"
          >
            <div className="space-y-3.5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-heading font-bold text-base sm:text-lg text-brand-slate m-0 group-hover:text-brand-cyan transition-colors">
                    {job.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs sm:text-[13px] text-brand-muted mt-1">
                    <span className="flex items-center gap-1 font-semibold text-brand-cyan">
                      <Building2 size={14} /> {job.company}
                    </span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <MapPin size={14} /> {job.location}
                    </span>
                  </div>
                </div>

                <span className="text-[11px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full bg-brand-surface text-brand-cyan border border-brand-border capitalize whitespace-nowrap">
                  {job.arrangement}
                </span>
              </div>

              <p className="text-xs sm:text-[13px] text-brand-muted leading-relaxed m-0">{job.snippet}</p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {(job.skills || []).map((s) => (
                  <span
                    key={s}
                    className="text-[11px] sm:text-xs px-2.5 py-0.5 rounded bg-brand-surface text-brand-slate border border-brand-border/70"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-5 border-t border-brand-border/60 flex items-center justify-between">
              <span className="text-xs sm:text-[13px] font-semibold text-brand-cyan">{job.jobType || job.experienceLevel || "Full-Time"}</span>

              <Link
                to="/analyzer"
                className="text-xs sm:text-[13px] font-semibold text-brand-cyan hover:underline inline-flex items-center gap-1"
              >
                <span>Analyze Match</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
