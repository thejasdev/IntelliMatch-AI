import { ICONS } from "./icons.js";
import { el, svgIcon } from "../utils/dom.js";
import { getCurrentPageId, hrefFromRoot } from "../navigation.js";
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
  if (!sidebar) return;

  const currentPage = getCurrentPageId();

  // Ensure floating expand button exists in DOM
  ensureFloatingExpandButton();

  // Restore desktop collapsed state from localStorage
  const isCollapsed = localStorage.getItem("intellimatch_sidebar_collapsed") === "true";
  if (isCollapsed && window.innerWidth > 768) {
    sidebar.classList.add("is-collapsed");
    const floatingBtn = document.getElementById("sidebar-floating-toggle");
    if (floatingBtn) floatingBtn.classList.add("is-visible");
  }

  // Restore custom sidebar width if stored
  const savedWidth = localStorage.getItem("intellimatch_sidebar_width");
  if (savedWidth && window.innerWidth > 768) {
    document.documentElement.style.setProperty("--sidebar-width", `${savedWidth}px`);
  }

  // 7 Stacked Primary Pill Navigation Buttons from Master Prompt
  const primaryPills = [
    {
      id: "home",
      label: "HOME",
      icon: "home",
      href: hrefFromRoot("index.html"),
      action: "home",
    },
    {
      id: "analyzer",
      label: "RESUME ANALYZER",
      icon: "analyzer",
      href: hrefFromRoot("pages/analyzer.html"),
    },
    {
      id: "builder",
      label: "RESUME BUILDER",
      icon: "builder",
      href: currentPage === "home" ? "#builder" : hrefFromRoot("index.html#builder"),
      action: "builder",
    },
    {
      id: "dashboard",
      label: "DASHBOARD",
      icon: "dashboard",
      href: hrefFromRoot("pages/dashboard.html"),
    },
    {
      id: "job-search",
      label: "JOB SEARCH",
      icon: "briefcase",
      href: hrefFromRoot("pages/job-search.html"),
    },
    {
      id: "feedback",
      label: "FEEDBACK",
      icon: "feedback",
      href: hrefFromRoot("pages/feedback.html"),
    },
    {
      id: "about",
      label: "ABOUT",
      icon: "about",
      href: hrefFromRoot("pages/about.html"),
    },
  ];

  // Secondary Curriculum & Templates Section
  const secondaryItems = [
    {
      id: "roadmaps",
      label: "Domains Roadmaps",
      icon: "roadmap",
      href: hrefFromRoot("pages/roadmaps.html"),
    },
    {
      id: "projects",
      label: "Projects Hub",
      icon: "project",
      href: hrefFromRoot("pages/projects.html"),
    },
    {
      id: "templates",
      label: "Resume Templates",
      icon: "templates",
      href: hrefFromRoot("pages/templates.html"),
    },
    {
      id: "internships",
      label: "Internships & Trainees",
      icon: "briefcase",
      href: hrefFromRoot("pages/internships.html"),
    },
  ];

  // Render Primary Pill Buttons
  const primaryNavElements = primaryPills.map((item) => {
    const isPillActive =
      item.id === currentPage && !(item.id === "home" && window.location.hash === "#builder");

    const a = el(
      "a",
      {
        class: `sidebar-nav-pill${isPillActive ? " is-active" : ""}`,
        href: item.href,
        "data-nav-id": item.id,
        "aria-current": isPillActive ? "page" : null,
      },
      [svgIcon(ICONS[item.icon], "nav-icon"), el("span", { class: "nav-label" }, item.label)]
    );

    a.addEventListener("click", (e) => {
      closeSidebarIfMobile();

      // Handle interactive workspace view switching on home page
      if (currentPage === "home") {
        if (item.action === "builder") {
          e.preventDefault();
          window.location.hash = "builder";
          if (window.switchWorkspaceView) {
            window.switchWorkspaceView("builder");
          }
          updateActivePill("builder");
        } else if (item.action === "home") {
          e.preventDefault();
          window.location.hash = "";
          if (window.switchWorkspaceView) {
            window.switchWorkspaceView("overview");
          }
          updateActivePill("home");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    });

    return a;
  });

  // Render Secondary Links
  const secondaryNavElements = secondaryItems.map((item) => {
    const isSecActive = item.id === currentPage;
    return el(
      "a",
      {
        class: `sidebar-secondary-link${isSecActive ? " is-active" : ""}`,
        href: item.href,
        "aria-current": isSecActive ? "page" : null,
        onClick: closeSidebarIfMobile,
      },
      [svgIcon(ICONS[item.icon], "nav-icon-sm"), el("span", {}, item.label)]
    );
  });

  // Approved connected-ribbon IntelliMatch vector symbol with float animation
  const brandMarkSvgHtml = `
    <svg class="brand-mark-svg" width="38" height="32" viewBox="0 0 374 308" role="img" aria-hidden="true">
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

  const brandMark = el("div", { class: "brand-mark-wrap floating-brand-mark" });
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

  // Collapse toggle button « inside header
  const collapseBtn = el(
    "button",
    {
      class: "sidebar-collapse-btn",
      id: "sidebar-collapse-btn",
      type: "button",
      "aria-label": "Collapse sidebar",
      title: "Collapse sidebar",
    },
    [svgIcon(ICONS.collapse, "collapse-icon")]
  );

  collapseBtn.addEventListener("click", () => {
    toggleDesktopSidebar(true);
  });

  const headerRow = el("div", { class: "sidebar-header-row" }, [brandLink, collapseBtn]);

  // Glowing Gradient Divider Bar (#4E34C8 -> #6548E8 -> #19C6E8)
  const glowDivider = el("div", { class: "sidebar-glow-divider" });

  // Draggable Resize Handle
  const resizeHandle = el("div", {
    class: "sidebar-resize-handle",
    id: "sidebar-resize-handle",
    title: "Drag to resize sidebar width",
  });

  initResizeHandle(resizeHandle);

  sidebar.replaceChildren(
    headerRow,
    glowDivider,
    el("nav", { class: "sidebar-nav", "aria-label": "Primary Platform Navigation" }, [
      el("div", { class: "sidebar-nav-group primary-pills-group" }, primaryNavElements),
      el("div", { class: "sidebar-nav-divider" }),
      el("span", { class: "sidebar-section-label" }, "Curriculum & Assets"),
      el("div", { class: "sidebar-nav-group secondary-links-group" }, secondaryNavElements),
    ]),
    el("div", { class: "sidebar-footer-card" }, [
      el("h4", {}, "Career Readiness"),
      el("p", {}, "10 engineering domains, roadmaps, project blueprints & ATS resume benchmarks."),
      el("span", { class: "badge badge-purple" }, [
        el("span", { class: "status-dot" }),
        "IntelliMatch Platform",
      ]),
    ]),
    resizeHandle
  );
}

function updateActivePill(activeId) {
  const pills = document.querySelectorAll(".sidebar-nav-pill");
  pills.forEach((p) => {
    if (p.getAttribute("data-nav-id") === activeId) {
      p.classList.add("is-active");
      p.setAttribute("aria-current", "page");
    } else {
      p.classList.remove("is-active");
      p.removeAttribute("aria-current");
    }
  });
}

function ensureFloatingExpandButton() {
  if (document.getElementById("sidebar-floating-toggle")) return;

  const btn = el(
    "button",
    {
      id: "sidebar-floating-toggle",
      class: "sidebar-floating-toggle",
      type: "button",
      "aria-label": "Expand sidebar",
      title: "Expand sidebar",
    },
    [svgIcon(ICONS.expand, "expand-icon")]
  );

  btn.addEventListener("click", () => {
    toggleDesktopSidebar(false);
  });

  document.body.appendChild(btn);
}

function toggleDesktopSidebar(collapse) {
  const sidebar = document.getElementById("sidebar");
  const floatingBtn = document.getElementById("sidebar-floating-toggle");
  if (!sidebar) return;

  if (collapse) {
    sidebar.classList.add("is-collapsed");
    if (floatingBtn) floatingBtn.classList.add("is-visible");
    localStorage.setItem("intellimatch_sidebar_collapsed", "true");
  } else {
    sidebar.classList.remove("is-collapsed");
    if (floatingBtn) floatingBtn.classList.remove("is-visible");
    localStorage.setItem("intellimatch_sidebar_collapsed", "false");
  }
}

function initResizeHandle(handle) {
  let isDragging = false;
  let startX = 0;
  let startWidth = 270;

  handle.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX;
    const currentWidthStr = getComputedStyle(document.documentElement).getPropertyValue("--sidebar-width");
    startWidth = parseInt(currentWidthStr, 10) || 270;
    document.body.classList.add("is-resizing-sidebar");
    e.preventDefault();
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const delta = e.clientX - startX;
    let newWidth = startWidth + delta;

    if (newWidth < 160) {
      toggleDesktopSidebar(true);
      isDragging = false;
      document.body.classList.remove("is-resizing-sidebar");
      return;
    }

    newWidth = Math.max(220, Math.min(420, newWidth));
    document.documentElement.style.setProperty("--sidebar-width", `${newWidth}px`);
    localStorage.setItem("intellimatch_sidebar_width", newWidth);
  });

  window.addEventListener("mouseup", () => {
    if (isDragging) {
      isDragging = false;
      document.body.classList.remove("is-resizing-sidebar");
    }
  });
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
