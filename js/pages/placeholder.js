import { el } from "../utils/dom.js";
import { getCurrentPageId, getPageMeta, hrefFromRoot } from "../navigation.js";

const PLACEHOLDER_COPY = {
  analyzer: {
    summary:
      "This workspace lets you select a PDF or DOCX resume, add a job description, and review a clearly labelled demo analysis.",
    next: "Review your skills, keyword gaps, and actionable writing recommendations.",
  },
  templates: {
    summary:
      "This page presents three ATS-friendly templates: Classic Professional, Technical Projects, and Data & Analytics.",
    next: "Preview layouts and export your resume.",
  },
  dashboard: {
    summary: "The dashboard summarizes saved resumes, analyses, and recent activity using demo records.",
    next: "Track your career preparation progress.",
  },
  "job-search": {
    summary: "Job Search lists sample roles you can send directly into Resume Analyzer.",
    next: "Match your skills with target postings.",
  },
  feedback: {
    summary: "Feedback collects suggestions and ratings with local demo validation.",
    next: "Help improve IntelliMatch AI.",
  },
  about: {
    summary: "About describes the project purpose, architecture, and current prototype scope.",
    next: "IntelliMatch AI career platform documentation.",
  },
};

export function initPlaceholderPage() {
  const root = document.getElementById("placeholder-root");
  if (!root) {
    return;
  }

  const pageId = getCurrentPageId();
  const meta = getPageMeta(pageId);
  const copy = PLACEHOLDER_COPY[pageId] || {
    summary: "This page is part of the IntelliMatch AI platform.",
    next: "Explore available features using the sidebar.",
  };

  root.replaceChildren(
    el("article", { class: "card empty-state" }, [
      el("span", { class: "badge badge-purple" }, [el("span", { class: "status-dot" }), "IntelliMatch AI Workspace"]),
      el("h1", {}, `${meta.title}`),
      el("p", {}, copy.summary),
      el("p", {}, copy.next),
      el("div", { class: "hero-actions" }, [
        el("a", { class: "btn btn-primary", href: hrefFromRoot("index.html") }, "Back to Home"),
        el("a", { class: "btn btn-secondary", href: hrefFromRoot("pages/about.html") }, "About Project"),
      ]),
    ])
  );
}
