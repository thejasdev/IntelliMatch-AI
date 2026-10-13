import { ICONS } from "./icons.js";
import { el, svgIcon } from "../utils/dom.js";
import { getNavItems, getCurrentPageId, hrefFromRoot } from "../navigation.js";
import { getState, setSidebarOpen } from "../state.js";

function closeSidebarIfMobile() {
  if (window.matchMedia("(max-width: 768px)").matches) {
    setSidebarOpen(false);
    syncSidebarDom();
  }
}

export function syncSidebarDom() {
  const sidebar = document.getElementById("sidebar");
  const backdrop = document.getElementById("sidebar-backdrop");
  const toggle = document.getElementById("menu-toggle");
  const isOpen = getState().sidebarOpen;

  if (sidebar) {
    sidebar.classList.toggle("is-open", isOpen);
    sidebar.setAttribute("aria-hidden", String(!isOpen && window.matchMedia("(max-width: 768px)").matches));
  }

  if (backdrop) {
    backdrop.classList.toggle("is-visible", isOpen);
    backdrop.hidden = !isOpen;
  }

  if (toggle) {
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.replaceChildren(
      svgIcon(isOpen ? ICONS.close : ICONS.menu, "nav-icon"),
      el("span", { class: "visually-hidden" }, isOpen ? "Close navigation" : "Open navigation")
    );
  }
}

export function renderSidebar() {
  const sidebar = document.getElementById("sidebar");
  if (!sidebar) {
    return;
  }

  const currentPage = getCurrentPageId();
  const navLinks = getNavItems().map((item) =>
    el(
      "a",
      {
        class: `nav-link${item.id === currentPage ? " is-active" : ""}`,
        href: item.href,
        "aria-current": item.id === currentPage ? "page" : null,
        onClick: closeSidebarIfMobile,
      },
      [svgIcon(ICONS[item.icon]), el("span", {}, item.label)]
    )
  );

  const brandMark = el("span", { class: "brand-mark", "aria-hidden": "true" }, "IM");

  const brandLink = el(
    "a",
    {
      class: "sidebar-brand",
      href: hrefFromRoot("index.html"),
      "aria-label": "IntelliMatch AI home",
    },
    [
      brandMark,
      el("span", { class: "brand-text" }, [
        el("span", { class: "brand-name" }, "IntelliMatch AI"),
        el("span", { class: "brand-tag" }, "Semantic Career Matcher"),
      ]),
    ]
  );

  sidebar.replaceChildren(
    brandLink,
    el("hr", { class: "sidebar-divider" }),
    el(
      "nav",
      { class: "sidebar-nav", "aria-label": "Primary" },
      [
        el("span", { class: "sidebar-section-label" }, "Platform"),
        ...navLinks,
      ]
    ),
    el("div", { class: "sidebar-footer-card" }, [
      el("h4", {}, "Frontend Prototype"),
      el("p", {}, "Interactive SaaS interface with purple theme & modular demo data."),
      el("span", { class: "badge badge-purple" }, [
        el("span", { class: "status-dot" }),
        "v1.2 Active",
      ]),
    ])
  );

  syncSidebarDom();
}

export function bindSidebarControls() {
  const backdrop = document.getElementById("sidebar-backdrop");
  if (backdrop) {
    backdrop.addEventListener("click", () => {
      setSidebarOpen(false);
      syncSidebarDom();
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && getState().sidebarOpen) {
      setSidebarOpen(false);
      syncSidebarDom();
      document.getElementById("menu-toggle")?.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (!window.matchMedia("(max-width: 768px)").matches) {
      setSidebarOpen(false);
    }
    syncSidebarDom();
  });
}
