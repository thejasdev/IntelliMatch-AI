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

  // Approved connected-ribbon IntelliMatch vector symbol
  const brandMarkSvgHtml = `
    <svg class="brand-mark-svg" width="36" height="30" viewBox="0 0 374 308" role="img" aria-hidden="true">
      <defs>
        <linearGradient id="sidebarRibbonGrad" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stop-color="#4E34C8"/>
          <stop offset="48%" stop-color="#6548E8"/>
          <stop offset="100%" stop-color="#19C6E8"/>
        </linearGradient>
      </defs>
      <path d="M 32 111 L 19 126 L 10 141 L 4 156 L 0 177 L 0 197 L 4 218 L 13 238 L 26 256 L 34 264 L 50 276 L 61 282 L 78 288 L 94 290 L 95 291 L 199 291 L 232 246 L 95 246 L 80 242 L 67 234 L 56 223 L 50 214 L 47 207 L 44 196 L 44 178 L 48 164 L 54 153 L 66 140 L 73 135 L 89 128 L 94 128 L 95 127 L 255 127 L 266 123 L 274 113 L 275 99 L 272 92 L 265 85 L 257 82 L 95 82 L 79 85 L 64 90 L 47 99 Z M 81 44 L 256 44 L 257 45 L 269 46 L 285 53 L 292 58 L 300 66 L 309 81 L 313 95 L 313 113 L 309 127 L 303 138 L 298 144 L 287 154 L 276 160 L 261 164 L 101 164 L 91 168 L 86 173 L 82 182 L 83 195 L 86 200 L 94 207 L 100 209 L 260 209 L 261 208 L 278 206 L 301 197 L 320 184 L 333 171 L 339 163 L 350 143 L 350 140 L 352 137 L 356 122 L 357 94 L 353 73 L 347 58 L 341 47 L 326 29 L 311 17 L 289 6 L 280 3 L 264 0 L 113 0 Z" transform="translate(8 8)" fill="url(#sidebarRibbonGrad)" fill-rule="evenodd"/>
    </svg>
  `;

  const brandMark = el("div", { class: "brand-mark-wrap" });
  brandMark.innerHTML = brandMarkSvgHtml;

  const brandLink = el(
    "a",
    {
      class: "sidebar-brand",
      href: hrefFromRoot("index.html"),
      "aria-label": "IntelliMatch — Career Discovery & Readiness",
    },
    [
      brandMark,
      el("span", { class: "brand-text" }, [
        el("span", { class: "brand-name" }, "IntelliMatch"),
        el("span", { class: "brand-tag" }, "Career Discovery & Readiness"),
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
      el("h4", {}, "Career Readiness"),
      el("p", {}, "Explore technology paths, follow learning roadmaps, and build real-world engineering projects."),
      el("span", { class: "badge badge-purple" }, [
        el("span", { class: "status-dot" }),
        "IntelliMatch Platform",
      ]),
    ])
  );
}

export function bindSidebarControls() {
  const backdrop = document.getElementById("sidebar-backdrop");
  if (backdrop) {
    backdrop.addEventListener("click", () => {
      setSidebarOpen(false);
      syncSidebarDom();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && getState().sidebarOpen) {
      setSidebarOpen(false);
      syncSidebarDom();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && getState().sidebarOpen) {
      setSidebarOpen(false);
      syncSidebarDom();
    }
  });
}
