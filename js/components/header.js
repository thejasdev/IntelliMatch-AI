import { ICONS } from "./icons.js";
import { el, svgIcon } from "../utils/dom.js";
import { getCurrentPageId, getPageMeta } from "../navigation.js";
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

  header.replaceChildren(
    toggle,
    el("div", { class: "header-copy" }, [
      el("p", { class: "header-kicker" }, meta.kicker),
      el("p", { class: "header-title" }, meta.title),
    ]),
    el(
      "span",
      {
        class: "badge badge-demo",
        title: "This frontend runs locally with no backend, live scoring, or account data.",
      },
      [el("span", { class: "status-dot" }, []), "Prototype"]
    )
  );
}
