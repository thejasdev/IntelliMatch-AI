/**
 * Navigation System — IntelliMatch
 * Manages platform routing, navigation items, page metadata, and root-relative path resolution.
 */

export const NAV_ITEMS = [
  { id: "home", label: "Home", hrefFromRoot: "index.html", icon: "home" },
  { id: "roadmaps", label: "Domains Roadmaps", hrefFromRoot: "pages/roadmaps.html", icon: "roadmap" },
  { id: "projects", label: "Projects Hub", hrefFromRoot: "pages/projects.html", icon: "project" },
  { id: "templates", label: "Resume Templates", hrefFromRoot: "pages/templates.html", icon: "templates" },
  { id: "analyzer", label: "Resume Analyzer", hrefFromRoot: "pages/analyzer.html", icon: "analyzer" },
  { id: "internships", label: "Internships", hrefFromRoot: "pages/internships.html", icon: "briefcase" },
  { id: "dashboard", label: "Dashboard", hrefFromRoot: "pages/dashboard.html", icon: "dashboard" },
  { id: "feedback", label: "Feedback", hrefFromRoot: "pages/feedback.html", icon: "feedback" },
  { id: "about", label: "About", hrefFromRoot: "pages/about.html", icon: "about" },
];

export const PAGE_META = {
  home: {
    kicker: "Platform",
    title: "Career Discovery & Readiness",
  },
  roadmaps: {
    kicker: "Curriculum",
    title: "Domains & Roadmaps",
  },
  projects: {
    kicker: "Portfolio Lab",
    title: "Projects Hub",
  },
  templates: {
    kicker: "Career Documents",
    title: "Resume Templates",
  },
  analyzer: {
    kicker: "Intelligence Workspace",
    title: "Resume Analyzer",
  },
  internships: {
    kicker: "Opportunities",
    title: "Internships & Jobs",
  },
  dashboard: {
    kicker: "Candidate Portal",
    title: "Dashboard",
  },
  feedback: {
    kicker: "Community Support",
    title: "Feedback",
  },
  about: {
    kicker: "Platform Architecture",
    title: "About IntelliMatch",
  },
};

export function isNestedPage() {
  const p = window.location.pathname.replace(/\\/g, "/");
  return p.includes("/pages/");
}

export function hrefFromRoot(pathFromRoot) {
  return isNestedPage() ? `../${pathFromRoot}` : pathFromRoot;
}

export function getNavItems() {
  return NAV_ITEMS.map((item) => ({
    ...item,
    href: hrefFromRoot(item.hrefFromRoot),
  }));
}

export function getPageMeta(pageId) {
  return PAGE_META[pageId] || PAGE_META.home;
}

export function getCurrentPageId() {
  return document.body.dataset.page || "home";
}
