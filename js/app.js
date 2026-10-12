import { initState } from "./state.js";
import { getCurrentPageId } from "./navigation.js";
import { bindSidebarControls, renderSidebar } from "./components/sidebar.js";
import { renderHeader } from "./components/header.js";
import { renderFooter } from "./components/footer.js";
import { initHomePage } from "./pages/home.js";
import { initPlaceholderPage } from "./pages/placeholder.js";

function boot() {
  const pageId = getCurrentPageId();
  initState(pageId);
  renderHeader();
  renderSidebar();
  renderFooter();
  bindSidebarControls();

  if (pageId === "home") {
    initHomePage();
  } else {
    initPlaceholderPage();
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
