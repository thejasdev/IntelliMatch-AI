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
        el("div", { class: "footer-brand-title" }, [
          el("span", { class: "monogram", "aria-hidden": "true" }, "IM"),
          el("span", {}, "IntelliMatch AI"),
        ]),
        el("p", { class: "footer-tagline" }, "Match Your Skills. Improve Your Resume. Move Forward."),
        el(
          "p",
          { class: "footer-desc" },
          "An intelligent career-assistance platform designed to analyze resumes against job descriptions, identify relevant skills and keyword gaps, provide evidence-based writing suggestions, and offer editable ATS-friendly resume templates."
        ),
        el(
          "div",
          { class: "footer-disclaimer" },
          "Disclaimer: Compatibility scores and skill gap analyses provided by IntelliMatch AI are algorithmic estimates intended for career preparation. They do not guarantee passing an employer's ATS, securing interviews, or obtaining employment."
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
        `© ${new Date().getFullYear()} IntelliMatch AI — AI-Powered Resume Analysis & Semantic Job Matching Platform.`
      ),
      el("span", {}, "Academic Project • Light SaaS Purple Theme"),
    ])
  );
}
