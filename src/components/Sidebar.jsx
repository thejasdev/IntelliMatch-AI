import React from "react";
import { NavLink } from "react-router-dom";
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
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
} from "lucide-react";
import LogoMark from "./LogoMark";

const NAV_ITEMS = [
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

export default function Sidebar({
  collapsed,
  setCollapsed,
  onToggleCollapse,
  mobileOpen,
  setMobileOpen,
  onCloseMobile,
}) {
  const handleToggleCollapse = () => {
    if (onToggleCollapse) onToggleCollapse();
    else if (setCollapsed) setCollapsed(!collapsed);
  };

  const handleCloseMobile = () => {
    if (onCloseMobile) onCloseMobile();
    else if (setMobileOpen) setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-brand-inkDark/70 backdrop-blur-sm z-40 md:hidden transition-opacity duration-200"
          onClick={handleCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* Main Sidebar Shell: Translucent Midnight Navy Surface with Subtle Tech Glow */}
      <aside
        id="app-sidebar"
        aria-label="Main Navigation"
        className={`fixed inset-y-0 left-0 z-40 flex flex-col bg-[#141526]/80 backdrop-blur-xl text-white border-r border-white/12 shadow-2xl transition-[width,transform] duration-200 ease-in-out ${
          collapsed ? "w-20" : "w-72"
        } ${mobileOpen ? "translate-x-0 z-50" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Enlarge Brand Header (110–130px Height on Desktop with Spacious Composition) */}
        <div
          className={`relative border-b border-white/10 flex-shrink-0 ${
            collapsed
              ? "h-[120px] flex flex-col items-center justify-center px-2 py-3"
              : "h-[120px] flex items-center px-5 py-4"
          }`}
        >
          {collapsed ? (
            /* Collapsed Standalone Brand Composition */
            <div className="flex flex-col items-center justify-center gap-2">
              <NavLink
                to="/"
                onClick={handleCloseMobile}
                className="flex items-center justify-center group focus:outline-none"
                aria-label="IntelliMatch Home"
              >
                <LogoMark className="w-[48px] h-[40px] flex-shrink-0 brand-ribbon-glow" glow />
              </NavLink>
              <button
                type="button"
                onClick={handleToggleCollapse}
                className="hidden md:flex items-center justify-center w-7 h-7 rounded-md text-white/70 hover:text-white hover:bg-white/15 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-cyan/50"
                aria-label="Expand sidebar"
                title="Expand sidebar"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          ) : (
            /* Expanded Full Brand Header Composition */
            <div className="relative w-full h-full flex items-center justify-between">
              <NavLink
                to="/"
                onClick={handleCloseMobile}
                className="flex items-center gap-3.5 group focus:outline-none pr-7"
                aria-label="IntelliMatch Home"
              >
                <LogoMark className="w-[52px] h-[43px] flex-shrink-0 brand-ribbon-glow" glow />
                <div className="flex flex-col min-w-0">
                  <span className="font-heading font-extrabold text-[27px] leading-none tracking-tight flex items-center">
                    <span className="text-white">Intelli</span>
                    <span className="text-brand-cyan">Match</span>
                  </span>
                  <span className="text-[12px] font-semibold text-[#CBD5E1] tracking-[0.10em] uppercase mt-1.5 leading-[1.3] block">
                    CAREER DISCOVERY &amp;<br />READINESS
                  </span>
                </div>
              </NavLink>

              {/* Desktop Collapse Toggle */}
              <button
                type="button"
                onClick={handleToggleCollapse}
                className="hidden md:flex absolute -top-1 right-0 items-center justify-center w-7 h-7 rounded-md text-white/70 hover:text-white hover:bg-white/15 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-cyan/50"
                aria-label="Collapse sidebar"
                title="Collapse sidebar"
              >
                <ChevronLeft size={16} />
              </button>

              {/* Mobile Close Button */}
              <button
                type="button"
                onClick={handleCloseMobile}
                className="md:hidden absolute -top-1 right-0 flex items-center justify-center w-8 h-8 rounded-md text-white/70 hover:text-white hover:bg-white/15 focus:outline-none"
                aria-label="Close navigation drawer"
              >
                <X size={18} />
              </button>
            </div>
          )}
        </div>

        {/* Navigation Items (Exactly 9 in specified order) */}
        <nav className="flex-1 overflow-y-auto px-2.5 py-4 space-y-1.5 custom-scrollbar">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.id}
                to={item.path}
                end={item.path === "/"}
                onClick={handleCloseMobile}
                title={collapsed ? item.label : undefined}
                className={({ isActive }) =>
                  `relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-brand-cyan/50 ${
                    isActive
                      ? "bg-gradient-to-r from-brand-violet to-brand-indigo text-white font-semibold shadow-md shadow-brand-indigo/50 ring-1 ring-brand-cyan/30"
                      : "text-white/85 hover:bg-white/10 hover:text-white font-medium"
                  } ${collapsed ? "justify-center px-0" : ""}`
                }
              >
                <Icon size={18} className="flex-shrink-0 text-white" strokeWidth={2} />
                {!collapsed && <span className="truncate text-white">{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* Sidebar Footer Info Card (visible when expanded) */}
        {!collapsed && (
          <div className="p-3 m-3 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
              <span className="text-[11px] font-bold tracking-wider uppercase text-brand-cyan">
                Platform Ready
              </span>
            </div>
            <p className="text-[11px] text-white/70 leading-relaxed m-0">
              Explore 10 engineering tracks, follow curated roadmaps, and optimize your resume.
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
