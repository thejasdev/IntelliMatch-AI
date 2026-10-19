import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Map,
  Layers,
  FileText,
  SearchCode,
  Briefcase,
  LayoutDashboard,
  MessageSquare,
  Info,
  ChevronDown,
  Sparkles,
  Menu,
  X,
  Search,
  ArrowRight,
} from "lucide-react";
import LogoMark from "./LogoMark.jsx";
import { ENGINEERING_DOMAINS } from "../../data/jobRoles.js";
import { CURATED_PROJECTS } from "../../data/projects.js";

// Primary visible navigation destinations on desktop
const PRIMARY_NAV = [
  { id: "home", label: "Home", path: "/", icon: Home },
  { id: "roadmaps", label: "Domains Roadmaps", path: "/roadmaps", icon: Map },
  { id: "projects", label: "Projects Hub", path: "/projects", icon: Layers },
  { id: "templates", label: "Resume Templates", path: "/templates", icon: FileText },
  { id: "internships", label: "Internships", path: "/internships", icon: Briefcase },
];

// Secondary destinations organized in the More dropdown
const MORE_NAV = [
  { id: "analyzer", label: "Resume Analyzer", path: "/analyzer", icon: SearchCode, kicker: "ATS Scanner" },
  { id: "dashboard", label: "Dashboard", path: "/dashboard", icon: LayoutDashboard, kicker: "Candidate Portal" },
  { id: "feedback", label: "Feedback", path: "/feedback", icon: MessageSquare, kicker: "Community Support" },
  { id: "about", label: "About", path: "/about", icon: Info, kicker: "Platform Mission" },
];

// Complete 9 destinations for mobile drawer in canonical order
const ALL_MOBILE_NAV = [
  { id: "home", label: "Home", path: "/", icon: Home },
  { id: "roadmaps", label: "Domains Roadmaps", path: "/roadmaps", icon: Map },
  { id: "projects", label: "Projects Hub", path: "/projects", icon: Layers },
  { id: "templates", label: "Resume Templates", path: "/templates", icon: FileText },
  { id: "analyzer", label: "Resume Analyzer", path: "/analyzer", icon: SearchCode },
  { id: "internships", label: "Internships", path: "/internships", icon: Briefcase },
  { id: "dashboard", label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { id: "feedback", label: "Feedback", path: "/feedback", icon: MessageSquare },
  { id: "about", label: "About", path: "/about", icon: Info },
];

export default function Header({ onOpenContact }) {
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const moreRef = useRef(null);
  const searchInputRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Close menus on route change
  useEffect(() => {
    setMoreOpen(false);
    setMobileOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  // Click outside to close More dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (moreRef.current && !moreRef.current.contains(e.target)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Escape key to close menus and search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setMoreOpen(false);
        setMobileOpen(false);
        setSearchOpen(false);
      }
      // Keyboard shortcut Ctrl+K or / to open search
      if ((e.ctrlKey && e.key === "k") || (e.key === "/" && !searchOpen && document.activeElement.tagName !== "INPUT" && document.activeElement.tagName !== "TEXTAREA")) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [searchOpen]);

  // Auto-focus search input when opened
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    } else {
      setSearchQuery("");
    }
  }, [searchOpen]);

  // Lock body scroll while mobile drawer or search is open
  useEffect(() => {
    if (mobileOpen || searchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen, searchOpen]);

  const dropdownItemsRef = useRef([]);

  const handleDropdownKeyDown = (e, index) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = (index + 1) % MORE_NAV.length;
      dropdownItemsRef.current[next]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = (index - 1 + MORE_NAV.length) % MORE_NAV.length;
      dropdownItemsRef.current[prev]?.focus();
    }
  };

  // Check if current route is within the More dropdown
  const isMoreActive = MORE_NAV.some(
    (item) => item.path === location.pathname || (item.path !== "/" && location.pathname.startsWith(item.path))
  );

  // Search Results indexing
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    const results = [];

    // Domains
    ENGINEERING_DOMAINS.forEach((d) => {
      if (d.name.toLowerCase().includes(q) || d.description.toLowerCase().includes(q)) {
        results.push({
          id: `domain-${d.id}`,
          title: d.name,
          category: "Career Domain",
          subtitle: `${d.roles.length} Roles • Roadmaps available`,
          path: `/roadmaps?domain=${d.id}`,
        });
      }
      d.roles.forEach((r) => {
        if (r.title.toLowerCase().includes(q) || r.skills.some((s) => s.toLowerCase().includes(q))) {
          results.push({
            id: `role-${r.id}`,
            title: r.title,
            category: "Job Role",
            subtitle: `${d.name} • Skills: ${r.skills.slice(0, 3).join(", ")}`,
            path: `/roadmaps?domain=${d.id}&role=${r.id}`,
          });
        }
      });
    });

    // Projects
    CURATED_PROJECTS.forEach((p) => {
      if (p.title.toLowerCase().includes(q) || p.skills.some((s) => s.toLowerCase().includes(q))) {
        results.push({
          id: `proj-${p.id}`,
          title: p.title,
          category: "Project Blueprint",
          subtitle: `${p.difficulty.toUpperCase()} • ${p.skills.slice(0, 3).join(", ")}`,
          path: `/projects?id=${p.id}`,
        });
      }
    });

    return results.slice(0, 8);
  }, [searchQuery]);

  return (
    <>
      {/* Target Header Layout Inspired by Image 1: Elevated, Pill-Shaped Floating Bar with Light Surface */}
      <div className="sticky top-2 sm:top-3 z-40 px-3 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto transition-all">
        <header className="w-full bg-white/95 text-slate-800 backdrop-blur-2xl border border-slate-200/90 shadow-xl shadow-slate-950/10 rounded-full px-4 sm:px-7 h-18 sm:h-20 flex items-center justify-between gap-3 sm:gap-4">
          
          {/* 1. Left Section — Official IntelliMatch Logo, Wordmark & Tagline */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#0B57D0]/50 rounded-full p-1 -ml-1 flex-shrink-0"
            aria-label="IntelliMatch Home"
          >
            {/* Standalone Official Ribbon Symbol */}
            <LogoMark
              glow
              className="w-[42px] h-[34px] sm:w-[48px] sm:h-[39px] flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
            />

            {/* Vertically Aligned Text Group */}
            <div className="flex flex-col min-w-0">
              <span className="font-heading font-extrabold text-[22px] sm:text-[25px] leading-none tracking-tight flex items-center">
                <span className="text-[#0F172A] group-hover:text-slate-900 transition-colors">Intelli</span>
                <span className="text-[#0284C7]">Match</span>
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 tracking-[0.08em] uppercase leading-tight mt-1 whitespace-nowrap block">
                Career Discovery &amp; Readiness
              </span>
            </div>
          </Link>

          {/* 2. Center Section — Horizontal Navigation with Image 1's Blue Active Underline Indicator */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-2 xl:gap-4 flex-shrink-0"
          >
            {PRIMARY_NAV.map((item) => {
              return (
                <NavLink
                  key={item.id}
                  to={item.path}
                  end={item.path === "/"}
                  className={({ isActive }) =>
                    `relative py-2 px-2 text-xs xl:text-[14px] font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#0B57D0]/40 rounded-lg ${
                      isActive
                        ? "text-[#0B57D0] font-semibold after:absolute after:-bottom-0.5 after:left-2 after:right-2 after:h-[2.5px] after:bg-[#0B57D0] after:rounded-full"
                        : "text-slate-600 hover:text-[#0B57D0]"
                    }`
                  }
                >
                  <span>{item.label}</span>
                </NavLink>
              );
            })}

            {/* More Dropdown Menu */}
            <div className="relative" ref={moreRef}>
              <button
                type="button"
                onClick={() => setMoreOpen(!moreOpen)}
                aria-haspopup="true"
                aria-expanded={moreOpen}
                className={`relative py-2 px-2 text-xs xl:text-[14px] font-medium transition-colors duration-150 flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-[#0B57D0]/40 rounded-lg ${
                  moreOpen || isMoreActive
                    ? "text-[#0B57D0] font-semibold after:absolute after:-bottom-0.5 after:left-2 after:right-2 after:h-[2.5px] after:bg-[#0B57D0] after:rounded-full"
                    : "text-slate-600 hover:text-[#0B57D0]"
                }`}
              >
                <span>More</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${moreOpen ? "rotate-180 text-[#0B57D0]" : "text-slate-400"}`}
                />
              </button>

              {/* Dropdown Panel */}
              {moreOpen && (
                <div
                  className="absolute right-0 mt-3 w-64 bg-white/98 backdrop-blur-2xl border border-slate-200 rounded-2xl p-2 shadow-2xl z-50 flex flex-col space-y-1 animate-in fade-in duration-150"
                  role="menu"
                >
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#0284C7] border-b border-slate-100 mb-1">
                    Platform Tools &amp; Info
                  </div>
                  {MORE_NAV.map((subItem, index) => {
                    const SubIcon = subItem.icon;
                    const isSubActive = location.pathname === subItem.path;
                    return (
                      <NavLink
                        key={subItem.id}
                        ref={(el) => (dropdownItemsRef.current[index] = el)}
                        to={subItem.path}
                        role="menuitem"
                        tabIndex={0}
                        onKeyDown={(e) => handleDropdownKeyDown(e, index)}
                        onClick={() => setMoreOpen(false)}
                        className={`flex items-start gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#0B57D0]/40 ${
                          isSubActive
                            ? "bg-blue-50 text-[#0B57D0] font-semibold border border-blue-200"
                            : "text-slate-700 hover:text-[#0B57D0] hover:bg-slate-50"
                        }`}
                      >
                        <div className="p-1.5 rounded-lg bg-blue-50 text-[#0284C7] flex-shrink-0 mt-0.5">
                          <SubIcon size={16} />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-xs font-semibold text-slate-900">{subItem.label}</span>
                          <span className="text-[11px] text-slate-500">{subItem.kicker}</span>
                        </div>
                      </NavLink>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* 3. Right Section — Prominent Royal Blue Button, Search Control, Hamburger Menu */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Image 1 Primary Rounded CTA: Royal Blue Pill Button */}
            <Link
              to="/analyzer"
              className="inline-flex items-center gap-1.5 px-4 sm:px-6 py-2.5 text-xs sm:text-sm font-semibold rounded-full bg-[#0B57D0] hover:bg-[#0842A0] text-white shadow-md shadow-blue-500/20 transition-all hover:scale-105 active:scale-95"
            >
              <Sparkles size={14} className="text-cyan-200" />
              <span>Resume Analyzer</span>
            </Link>

            {/* Functional Search Control Icon Button (From Image 1) */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search platform resources (Ctrl+K)"
              className="p-2 sm:p-2.5 rounded-full text-slate-600 hover:text-[#0B57D0] hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0B57D0]/50"
            >
              <Search size={18} />
            </button>

            {/* Compact Menu / Hamburger Control (From Image 1) */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
              className="lg:hidden p-2 sm:p-2.5 rounded-full text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0B57D0]/50"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </header>
      </div>

      {/* 4. Quick Functional Search Modal Dialog */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => setSearchOpen(false)}
            aria-hidden="true"
          />

          <div
            className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10 flex flex-col animate-in fade-in zoom-in-95 duration-150"
            role="dialog"
            aria-modal="true"
            aria-label="Search Platform Resources"
          >
            {/* Search Input Bar */}
            <div className="p-4 border-b border-slate-100 flex items-center gap-3">
              <Search size={18} className="text-[#0B57D0] flex-shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search domains, roles, roadmaps, or projects (e.g. SDE, Cloud, Docker)..."
                className="w-full text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none bg-transparent"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X size={16} />
              </button>
            </div>

            {/* Search Results List */}
            <div className="max-h-80 overflow-y-auto p-2">
              {searchQuery.trim() === "" ? (
                <div className="p-6 text-center text-slate-400 text-xs">
                  Type to search across all 10 engineering tracks, 50+ roles, roadmaps, and projects.
                </div>
              ) : searchResults.length === 0 ? (
                <div className="p-6 text-center text-slate-500 text-xs">
                  No matching resources found for "{searchQuery}".
                </div>
              ) : (
                <div className="space-y-1">
                  {searchResults.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        navigate(item.path);
                        setSearchOpen(false);
                      }}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-blue-50 transition-colors flex items-center justify-between group"
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-[#0B57D0]">
                          {item.title}
                        </div>
                        <div className="text-[11px] text-slate-500">{item.subtitle}</div>
                      </div>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 group-hover:bg-blue-100 group-hover:text-[#0B57D0]">
                        {item.category}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span>Press <kbd className="font-mono bg-slate-200 px-1 py-0.5 rounded text-slate-700">ESC</kbd> to exit</span>
              <span>IntelliMatch Career Search</span>
            </div>
          </div>
        </div>
      )}

      {/* 5. Responsive Mobile Drawer / Modal Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <div
            className="fixed inset-y-0 right-0 w-full max-w-sm bg-white text-slate-900 shadow-2xl z-50 flex flex-col p-6 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Menu"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 focus:outline-none"
              >
                <LogoMark className="w-[40px] h-[33px] flex-shrink-0" />
                <div className="flex flex-col">
                  <span className="font-heading font-extrabold text-[20px] text-slate-900 leading-none">
                    Intelli<span className="text-[#0284C7]">Match</span>
                  </span>
                  <span className="text-[10px] font-semibold text-slate-500 tracking-wider uppercase mt-0.5">
                    Career Discovery
                  </span>
                </div>
              </Link>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
                aria-label="Close navigation menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* All 9 Platform Destinations in Exact Order */}
            <nav className="flex-1 space-y-1.5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#0284C7] px-3 py-1 mb-1">
                Platform Destinations
              </div>
              {ALL_MOBILE_NAV.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.id}
                    to={item.path}
                    end={item.path === "/"}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-150 focus:outline-none ${
                        isActive
                          ? "bg-blue-50 text-[#0B57D0] font-semibold border border-blue-200 shadow-xs"
                          : "text-slate-700 hover:text-[#0B57D0] hover:bg-slate-50"
                      }`
                    }
                  >
                    <Icon size={18} className="flex-shrink-0 text-[#0284C7]" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </nav>

            {/* Mobile Actions in Drawer Footer */}
            <div className="pt-4 mt-4 border-t border-slate-100 space-y-2">
              <Link
                to="/analyzer"
                onClick={() => setMobileOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-sm font-semibold bg-[#0B57D0] text-white shadow-md shadow-blue-500/20"
              >
                <Sparkles size={16} className="text-cyan-200" />
                <span>Launch Resume Analyzer</span>
              </Link>

              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  if (onOpenContact) onOpenContact();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200"
              >
                <MessageSquare size={16} />
                <span>Contact IntelliMatch</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
