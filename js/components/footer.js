import { el } from "../utils/dom.js";
import { getNavItems } from "../navigation.js";

export function renderFooter() {
  const footer = document.getElementById("site-footer");
  if (!footer) {
    return;
  }

  const links = getNavItems().map((item) =>
    el("li", {}, [el("a", { href: item.href }, item.label)])
  );

  footer.replaceChildren(
    el("div", { class: "footer-inner" }, [
      el("div", {}, [
        el("div", { class: "footer-brand-title", style: "display: flex; align-items: center; gap: var(--space-3);" }, [
          el("span", { class: "brand-mark-wrap", style: "display: inline-flex;" }, [
            el("span", {
              innerHTML: `
                <svg width="28" height="24" viewBox="0 0 374 308" role="img" aria-hidden="true">
                  <defs>
                    <linearGradient id="footerRibbonGrad" x1="0%" y1="50%" x2="100%" y2="50%">
                      <stop offset="0%" stop-color="#4E34C8"/>
                      <stop offset="48%" stop-color="#6548E8"/>
                      <stop offset="100%" stop-color="#19C6E8"/>
                    </linearGradient>
                  </defs>
                  <path d="M 32 111 L 19 126 L 10 141 L 4 156 L 0 177 L 0 197 L 4 218 L 13 238 L 26 256 L 34 264 L 50 276 L 61 282 L 78 288 L 94 290 L 95 291 L 199 291 L 232 246 L 95 246 L 80 242 L 67 234 L 56 223 L 50 214 L 47 207 L 44 196 L 44 178 L 48 164 L 54 153 L 66 140 L 73 135 L 89 128 L 94 128 L 95 127 L 255 127 L 266 123 L 274 113 L 275 99 L 272 92 L 265 85 L 257 82 L 95 82 L 79 85 L 64 90 L 47 99 Z M 81 44 L 256 44 L 257 45 L 269 46 L 285 53 L 292 58 L 300 66 L 309 81 L 313 95 L 313 113 L 309 127 L 303 138 L 298 144 L 287 154 L 276 160 L 261 164 L 101 164 L 91 168 L 86 173 L 82 182 L 83 195 L 86 200 L 94 207 L 100 209 L 260 209 L 261 208 L 278 206 L 301 197 L 320 184 L 333 171 L 339 163 L 350 143 L 350 140 L 352 137 L 356 122 L 357 94 L 353 73 L 347 58 L 341 47 L 326 29 L 311 17 L 289 6 L 280 3 L 264 0 L 113 0 Z" transform="translate(8 8)" fill="url(#footerRibbonGrad)" fill-rule="evenodd"/>
                </svg>
              `,
            }),
          ]),
          el("span", { style: "font-family: var(--font-display); font-weight: 800; font-size: var(--font-size-lg); color: var(--color-text);" }, "IntelliMatch"),
        ]),
        el("p", { class: "footer-tagline" }, "Career Discovery & Readiness"),
        el(
          "p",
          { class: "footer-desc" },
          "Explore your path. Build your skills. Prepare for your next opportunity. An integrated career discovery, learning roadmap, and resume intelligence platform for engineering students and technology professionals."
        ),
        el(
          "div",
          { class: "footer-disclaimer" },
          "Disclaimer: Compatibility scores and skill gap analyses provided by IntelliMatch are algorithmic estimates intended for career preparation. They do not guarantee passing an employer's ATS, securing interviews, or obtaining employment."
        ),
      ]),
      el("div", {}, [
        el("h3", { class: "footer-col-title" }, "Platform Navigation"),
        el("ul", { class: "footer-links" }, links),
        el(
          "p",
          { class: "footer-desc", style: "font-size: 0.8rem; margin-top: var(--space-4);" },
          "Frontend architecture built with semantic HTML5, modern CSS3 custom properties, and modular Vanilla JavaScript."
        ),
      ]),
    ]),
    el("div", { class: "footer-bottom" }, [
      el(
        "span",
        {},
        `© ${new Date().getFullYear()} IntelliMatch — Career Discovery & Readiness Platform.`
      ),
      el("span", {}, "Portfolio-Ready Prototype • Light SaaS Design System"),
    ])
  );
}
