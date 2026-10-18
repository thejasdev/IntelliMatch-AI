import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Menu, Sparkles, MessageSquare } from "lucide-react";

const PAGE_META = {
  "/": null, // On Home, headline appears immediately near the top without duplicate Overview title
  "/roadmaps": { kicker: "Structured Curriculum", title: "Domains & Learning Roadmaps" },
  "/projects": { kicker: "Portfolio Lab", title: "Projects Hub & Blueprints" },
  "/templates": { kicker: "Career Documents", title: "ATS Resume Templates" },
  "/analyzer": { kicker: "Intelligence Workspace", title: "Resume Analyzer" },
  "/internships": { kicker: "Opportunities & Jobs", title: "Jobs & Internships" },
  "/dashboard": { kicker: "Candidate Portal", title: "Career Dashboard" },
  "/feedback": { kicker: "Community Support", title: "Platform Feedback" },
  "/about": { kicker: "Institutional Mission", title: "About IntelliMatch" },
};

export default function Header({ onMenuClick, onOpenMobile, onOpenContact }) {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const currentMeta = PAGE_META[location.pathname] || (isHome ? null : {
    kicker: "Platform Workspace",
    title: "IntelliMatch",
  });

  return (
    <header
      className="sticky top-0 z-30 flex items-center justify-between h-14 md:h-16 px-4 md:px-8 bg-[#181727]/80 border-b border-white/10 backdrop-blur-md transition-colors duration-200"
    >
      {/* Left: Mobile Toggle & Page Headings */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobile || onMenuClick}
          className="md:hidden p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
          aria-label="Open navigation menu"
        >
          <Menu size={20} />
        </button>

        {!isHome && currentMeta && (
          <div className="flex flex-col">
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-cyan">
              {currentMeta.kicker}
            </span>
            <h1 className="text-base md:text-xl font-bold font-heading text-white m-0 leading-tight">
              {currentMeta.title}
            </h1>
          </div>
        )}

        {isHome && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold tracking-wide uppercase text-brand-cyan">
              IntelliMatch Platform
            </span>
            <span className="hidden sm:inline-block text-xs text-[#CBD5E1] font-medium">
              • Career Discovery &amp; Readiness
            </span>
          </div>
        )}
      </div>

      {/* Right: Quick Action Buttons */}
      <div className="flex items-center gap-3">
        <Link
          to="/analyzer"
          className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-white/10 text-brand-cyan hover:bg-white/20 border border-white/15 shadow-xs transition-all duration-150"
        >
          <Sparkles size={14} />
          <span>Test Resume</span>
        </Link>

        <button
          type="button"
          onClick={onOpenContact}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-brand-violet to-brand-indigo hover:brightness-110 rounded-lg shadow-sm shadow-brand-indigo/30 transition-all duration-150"
        >
          <MessageSquare size={14} />
          <span>Contact Us</span>
        </button>
      </div>
    </header>
  );
}
