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
      {/* Header Banner */}
      <div className="im-card p-6 md:p-8 space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-violet">
          Career Opportunities
        </span>
        <h1 className="text-2xl md:text-3xl font-bold font-heading text-brand-slate m-0">
          Internships &amp; Entry-Level Roles
        </h1>
        <p className="text-sm text-brand-muted leading-relaxed m-0 max-w-3xl">
          Discover student internships, graduate traineeships, and entry-level engineering roles across
          10 technical domains, or launch verified external platform searches.
        </p>
      </div>

      {/* External Sources Search Bar */}
      <div className="im-card p-5 sm:p-6 space-y-3">
        <div className="text-xs font-bold uppercase tracking-wider text-brand-slate">
          Verified External Search Portals:
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {JOB_SOURCES.filter((s) => s.buildSearchUrl).map((source) => (
            <a
              key={source.id}
              href={source.buildSearchUrl ? source.buildSearchUrl("", "") : "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl bg-brand-surface border border-brand-border hover:border-brand-cyan/40 hover:shadow-subtle transition-all flex items-center justify-between group"
            >
              <div>
                <span className="text-xs font-bold text-brand-slate block group-hover:text-brand-cyan transition-colors">
                  {source.name}
                </span>
                <span className="text-[11px] text-brand-muted">{source.status || "Open Search"}</span>
              </div>
              <ExternalLink size={14} className="text-brand-cyan" />
            </a>
          ))}
        </div>
      </div>

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
                  <h3 className="font-heading font-bold text-base text-brand-slate m-0 group-hover:text-brand-cyan transition-colors">
                    {job.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-brand-muted mt-1">
                    <span className="flex items-center gap-1 font-semibold text-brand-cyan">
                      <Building2 size={13} /> {job.company}
                    </span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <MapPin size={13} /> {job.location}
                    </span>
                  </div>
                </div>

                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-brand-surface text-brand-cyan border border-brand-border capitalize whitespace-nowrap">
                  {job.arrangement}
                </span>
              </div>

              <p className="text-xs text-brand-muted leading-relaxed m-0">{job.snippet}</p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {(job.skills || []).map((s) => (
                  <span
                    key={s}
                    className="text-[11px] px-2 py-0.5 rounded bg-brand-surface text-brand-slate border border-brand-border/70"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-5 border-t border-brand-border/60 flex items-center justify-between">
              <span className="text-xs font-semibold text-brand-cyan">{job.jobType || job.experienceLevel || "Full-Time"}</span>

              <Link
                to="/analyzer"
                className="text-xs font-semibold text-brand-cyan hover:underline inline-flex items-center gap-1"
              >
                <span>Analyze Match</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
