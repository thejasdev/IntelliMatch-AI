import { el } from "../utils/dom.js";
import { hrefFromRoot } from "../navigation.js";

export function renderFooter() {
  const footer = document.getElementById("site-footer");
  if (!footer) return;

  const ribbonSvg = `
    <svg width="32" height="26" viewBox="0 0 374 308" role="img" aria-hidden="true">
      <defs>
        <linearGradient id="footerRibbonGrad" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stop-color="#4E34C8"/>
          <stop offset="48%" stop-color="#6548E8"/>
          <stop offset="100%" stop-color="#19C6E8"/>
        </linearGradient>
      </defs>
      <path d="M 32 111 L 19 126 L 10 141 L 4 156 L 0 177 L 0 197 L 4 218 L 13 238 L 26 256 L 34 264 L 50 276 L 61 282 L 78 288 L 94 290 L 95 291 L 199 291 L 232 246 L 95 246 L 80 242 L 67 234 L 56 223 L 50 214 L 47 207 L 44 196 L 44 178 L 48 164 L 54 153 L 66 140 L 73 135 L 89 128 L 94 128 L 95 127 L 255 127 L 266 123 L 274 113 L 275 99 L 272 92 L 265 85 L 257 82 L 95 82 L 79 85 L 64 90 L 47 99 Z M 81 44 L 256 44 L 257 45 L 269 46 L 285 53 L 292 58 L 300 66 L 309 81 L 313 95 L 313 113 L 309 127 L 303 138 L 298 144 L 287 154 L 276 160 L 261 164 L 101 164 L 91 168 L 86 173 L 82 182 L 83 195 L 86 200 L 94 207 L 100 209 L 260 209 L 261 208 L 278 206 L 301 197 L 320 184 L 333 171 L 339 163 L 350 143 L 350 140 L 352 137 L 356 122 L 357 94 L 353 73 L 347 58 L 341 47 L 326 29 L 311 17 L 289 6 L 280 3 L 264 0 L 113 0 Z" transform="translate(8 8)" fill="url(#footerRibbonGrad)" fill-rule="evenodd"/>
    </svg>
  `;

  footer.replaceChildren(
    el("div", { class: "footer-container" }, [
      // 4-Column Upper Grid
      el("div", { class: "footer-grid-4col" }, [
        // Column 1: Brand & Institutional Declaration
        el("div", { class: "footer-col footer-col-brand" }, [
          el("div", { class: "footer-brand-lockup" }, [
            el("span", { class: "brand-mark-wrap footer-mark", innerHTML: ribbonSvg }),
            el("div", { class: "footer-brand-headings" }, [
              el("span", { class: "footer-brand-name" }, "IntelliMatch"),
              el("span", { class: "footer-brand-tag" }, "Career Discovery & Readiness"),
            ]),
          ]),
          el("div", { class: "footer-location-badge" }, [
            el("span", { class: "location-dot" }),
            el("span", {}, "Bengaluru, Karnataka 560001, India"),
          ]),
          el(
            "p",
            { class: "footer-declaration" },
            "An integrated career discovery, learning roadmap, and resume intelligence platform for engineering students and technology professionals. Compatibility ratings and skill recommendations are algorithmic benchmarks for career preparation."
          ),
        ]),

        // Column 2: About & Curriculum
        el("div", { class: "footer-col" }, [
          el("h3", { class: "footer-col-title" }, "About & Explore"),
          el("ul", { class: "footer-links-list" }, [
            el("li", {}, [el("a", { href: hrefFromRoot("pages/about.html") }, "About IntelliMatch")]),
            el("li", {}, [el("a", { href: hrefFromRoot("pages/roadmaps.html") }, "Technology Roadmaps")]),
            el("li", {}, [el("a", { href: hrefFromRoot("pages/projects.html") }, "Projects Hub")]),
            el("li", {}, [el("a", { href: hrefFromRoot("pages/internships.html") }, "Jobs & Internships")]),
            el("li", {}, [el("a", { href: hrefFromRoot("index.html#explore-careers") }, "10 Engineering Domains")]),
          ]),
        ]),

        // Column 3: Platform Tools & Support
        el("div", { class: "footer-col" }, [
          el("h3", { class: "footer-col-title" }, "Readiness Tools"),
          el("ul", { class: "footer-links-list" }, [
            el("li", {}, [el("a", { href: hrefFromRoot("pages/analyzer.html") }, "Resume Analyzer")]),
            el("li", {}, [el("a", { href: hrefFromRoot("index.html#builder") }, "Resume Builder")]),
            el("li", {}, [el("a", { href: hrefFromRoot("pages/templates.html") }, "ATS Resume Templates")]),
            el("li", {}, [el("a", { href: hrefFromRoot("pages/dashboard.html") }, "Candidate Dashboard")]),
            el("li", {}, [el("a", { href: hrefFromRoot("pages/feedback.html") }, "Feedback & Support")]),
          ]),
        ]),

        // Column 4: Institutional & Legal
        el("div", { class: "footer-col" }, [
          el("h3", { class: "footer-col-title" }, "Institutional & Legal"),
          el("ul", { class: "footer-links-list" }, [
            el("li", {}, [el("a", { href: hrefFromRoot("pages/about.html#terms") }, "Terms of Service")]),
            el("li", {}, [el("a", { href: hrefFromRoot("pages/about.html#privacy") }, "Privacy Policy")]),
            el("li", {}, [el("a", { href: hrefFromRoot("pages/about.html#cookies") }, "Cookie Policy")]),
            el("li", {}, [el("a", { href: hrefFromRoot("pages/about.html#security") }, "Security & Verification")]),
            el("li", {}, [el("a", { href: hrefFromRoot("pages/about.html#integrity") }, "Academic Integrity")]),
          ]),
        ]),
      ]),

      // Persistent Bottom Bar with Mandatory Developer Attribution
      el("div", { class: "footer-bottom-declaration" }, [
        el(
          "div",
          { class: "footer-copyright" },
          "© 2026 IntelliMatch — Career Discovery & Readiness. All Rights Reserved."
        ),
        el("div", { class: "footer-attribution" }, [
          el("span", {}, "Developed by "),
          el("span", { class: "developer-name" }, "Thejas K S"),
        ]),
      ])
    ])
  );
}
