import { initState } from "./state.js";
import { getCurrentPageId } from "./navigation.js";
import { bindSidebarControls, renderSidebar } from "./components/sidebar.js";
import { renderHeader } from "./components/header.js";
import { renderFooter } from "./components/footer.js";
import { initHomePage } from "./pages/home.js";
import { initAnalyzerPage } from "./pages/analyzer.js";
import { initTemplatesPage } from "./pages/templates.js";
import { initDashboardPage } from "./pages/dashboard.js";
import { initJobSearchPage } from "./pages/job-search.js";
import { initFeedbackPage } from "./pages/feedback.js";
import { initAboutPage } from "./pages/about.js";
import { initPlaceholderPage } from "./pages/placeholder.js";

const PAGE_INITIALIZERS = {
  home: initHomePage,
  analyzer: initAnalyzerPage,
  templates: initTemplatesPage,
  dashboard: initDashboardPage,
  "job-search": initJobSearchPage,
  feedback: initFeedbackPage,
  about: initAboutPage,
};

function boot() {
  const pageId = getCurrentPageId();
  initState(pageId);
  renderHeader();
  renderSidebar();
  renderFooter();
  bindSidebarControls();

  const initPage = PAGE_INITIALIZERS[pageId] || initPlaceholderPage;
  initPage();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
