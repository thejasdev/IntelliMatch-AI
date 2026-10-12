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
        el("h2", { class: "footer-title" }, "Smart Resume AI"),
        el(
          "p",
          {},
          "A student project for resume analysis, job-description comparison, writing suggestions, and ATS-friendly templates. This is a resume-assistance tool and does not guarantee ATS selection, interviews, or hiring outcomes."
        ),
        el("p", { class: "footer-copy" }, `© ${new Date().getFullYear()} Smart Resume AI. Academic project.`),
      ]),
      el("div", {}, [
        el("h2", { class: "footer-title" }, "Navigate"),
        el("ul", { class: "footer-links" }, links),
        el(
          "p",
          { class: "footer-note" },
          "Analyzer, templates, dashboard, job search, and feedback pages are scaffolded in Phase 1 and will be fully built in later phases."
        ),
      ]),
    ])
  );
}
