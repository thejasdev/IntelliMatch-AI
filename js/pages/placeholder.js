import { el } from "../utils/dom.js";
import { getCurrentPageId, getPageMeta, hrefFromRoot } from "../navigation.js";

const PLACEHOLDER_COPY = {
  analyzer: {
    summary:
      "This workspace will let you select a PDF or DOCX resume, add a job description, and review a clearly labelled demo analysis.",
    next: "Phase 2 will add the upload form, validation, loading state, and demo results. No real parsing or model scoring is available yet.",
  },
  templates: {
    summary:
      "This page will present three ATS-friendly templates: Classic Professional, Technical Projects, and Data & Analytics.",
    next: "Phase 2 will add previews, a resume editor, and an on-screen print-friendly view. Template selection will not invent achievements.",
  },
  dashboard: {
    summary: "The dashboard will summarize saved resumes, analyses, and recent activity using labelled demo data.",
    next: "Phase 2 will add empty states and sample records. Nothing here is a real user account.",
  },
  "job-search": {
    summary: "Job Search will list sample roles you can send into Resume Analyzer as a target job description.",
    next: "Phase 2 will add filters and a job-detail view. Live job-board scraping is not part of this frontend.",
  },
  feedback: {
    summary: "Feedback will collect a category, rating, and message with local validation.",
    next: "Phase 2 will demonstrate local submission only. Messages will not be sent to a server.",
  },
  about: {
    summary: "About will describe the project purpose, intended NLP/ML workflow, and current prototype limits.",
    next: "Phase 2 will complete this page with honest academic language and no invented company claims.",
  },
};

export function initPlaceholderPage() {
  const root = document.getElementById("placeholder-root");
  if (!root) {
    return;
  }

  const pageId = getCurrentPageId();
  const meta = getPageMeta(pageId);
  const copy = PLACEHOLDER_COPY[pageId];

  if (!copy) {
    return;
  }

  root.replaceChildren(
    el("article", { class: "card empty-state" }, [
      el("span", { class: "badge badge-planned" }, [el("span", { class: "status-dot" }, []), "Coming in Phase 2"]),
      el("h1", {}, `${meta.title} is not built yet`),
      el("p", {}, copy.summary),
      el("p", {}, copy.next),
      el("div", { class: "hero-actions" }, [
        el("a", { class: "btn btn-primary", href: hrefFromRoot("index.html") }, "Back to Home"),
        el("a", { class: "btn btn-secondary", href: hrefFromRoot("pages/about.html") }, "Project notes"),
      ]),
    ])
  );
}
