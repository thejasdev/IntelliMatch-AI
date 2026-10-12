export const NAV_ITEMS = [
  { id: "home", label: "Home", hrefFromRoot: "index.html", icon: "home" },
  { id: "analyzer", label: "Resume Analyzer", hrefFromRoot: "pages/analyzer.html", icon: "analyzer" },
  { id: "templates", label: "Resume Templates", hrefFromRoot: "pages/templates.html", icon: "templates" },
  { id: "dashboard", label: "Dashboard", hrefFromRoot: "pages/dashboard.html", icon: "dashboard" },
  { id: "job-search", label: "Job Search", hrefFromRoot: "pages/job-search.html", icon: "jobs" },
  { id: "feedback", label: "Feedback", hrefFromRoot: "pages/feedback.html", icon: "feedback" },
  { id: "about", label: "About", hrefFromRoot: "pages/about.html", icon: "about" },
];

export const PAGE_META = {
  home: {
    kicker: "Overview",
    title: "Home",
  },
  analyzer: {
    kicker: "Workspace",
    title: "Resume Analyzer",
  },
  templates: {
    kicker: "Workspace",
    title: "Resume Templates",
  },
  dashboard: {
    kicker: "Overview",
    title: "Dashboard",
  },
  "job-search": {
    kicker: "Workspace",
    title: "Job Search",
  },
  feedback: {
    kicker: "Support",
    title: "Feedback",
  },
  about: {
    kicker: "Project",
    title: "About",
  },
};

export function isNestedPage() {
  return window.location.pathname.includes("/pages/");
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
