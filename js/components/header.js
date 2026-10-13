import { ICONS } from "./icons.js";
import { el, svgIcon } from "../utils/dom.js";
import { getCurrentPageId, getPageMeta, hrefFromRoot } from "../navigation.js";
import { toggleSidebar } from "../state.js";
import { syncSidebarDom } from "./sidebar.js";

export function renderHeader() {
  const header = document.getElementById("header");
  if (!header) {
    return;
  }

  const pageId = getCurrentPageId();
  const meta = getPageMeta(pageId);

  const toggle = el(
    "button",
    {
      class: "icon-button menu-toggle",
      type: "button",
      id: "menu-toggle",
      "aria-controls": "sidebar",
      "aria-expanded": "false",
      onClick: () => {
        toggleSidebar();
        syncSidebarDom();
      },
    },
    [svgIcon(ICONS.menu, "nav-icon"), el("span", { class: "visually-hidden" }, "Open navigation")]
  );

  const headerLeft = el("div", { class: "header-left" }, [
    toggle,
    el("div", { class: "header-copy" }, [
      el("p", { class: "header-kicker" }, meta.kicker || "IntelliMatch AI"),
      el("h1", { class: "header-title" }, meta.title || "IntelliMatch AI"),
    ]),
  ]);

  const headerRight = el("div", { class: "header-right" }, [
    pageId === "home"
      ? el("div", { style: "display: flex; gap: var(--space-2);" }, [
          el(
            "a",
            {
              class: "btn btn-primary btn-sm",
              href: hrefFromRoot("pages/analyzer.html"),
            },
            [svgIcon(ICONS.analyzer, "nav-icon"), "Analyze Resume"]
          ),
          el(
            "a",
            {
              class: "btn btn-secondary btn-sm",
              href: hrefFromRoot("pages/templates.html"),
            },
            "Explore Templates"
          ),
        ])
      : el(
          "span",
          {
            class: "badge badge-demo",
            title: "This frontend prototype runs locally with demonstration data.",
          },
          [el("span", { class: "status-dot" }), "Frontend Prototype"]
        ),
  ]);

  header.replaceChildren(headerLeft, headerRight);
}
