import { el, svgIcon } from "../utils/dom.js";
import { ICONS } from "../components/icons.js";
import { hrefFromRoot } from "../navigation.js";
import { ENGINEERING_DOMAINS } from "../../data/jobRoles.js";

export const RESUME_TEMPLATES_CATALOGUE = [
  {
    id: "classic-prof",
    name: "Classic Professional",
    filename: "classic-professional-template.pdf",
    domainId: "enterprise-tech",
    domainName: "Enterprise and Business Technology",
    targetRole: "Engineering & Operations Lead",
    style: "Chronological",
    experienceLevel: "Mid to Senior Level",
    verifiedPages: 1,
    description: "A timeless, single-column chronological layout preferred by recruiters in enterprise operations, finance, and traditional corporate tech sectors.",
    features: [
      "Rigid single-column hierarchy for reliable ATS parsing",
      "Executive summary with clear business impact metrics",
      "Conventional reverse-chronological employment timeline"
    ]
  },
  {
    id: "technical-proj",
    name: "Technical Projects",
    filename: "technical-projects-template.pdf",
    domainId: "software-dev",
    domainName: "Software Development",
    targetRole: "Senior Systems & Software Engineer",
    style: "Technical / Project-Centric",
    experienceLevel: "Mid to Senior Level",
    verifiedPages: 1,
    description: "Built specifically for systems architects and backend developers. Highlights low-level architecture, technical projects, concurrency, and performance benchmarks.",
    features: [
      "Dedicated Technical Projects section with GitHub repositories",
      "Categorized language, storage, and distributed systems stacks",
      "Metrics-oriented achievement bullets (latency, throughput, scale)"
    ]
  },
  {
    id: "data-analytics-tmpl",
    name: "Data and Analytics",
    filename: "data-analytics-template.pdf",
    domainId: "data-analytics",
    domainName: "Data and Analytics",
    targetRole: "Data Scientist & Analytics Engineer",
    style: "Quantitative & Analytical",
    experienceLevel: "Entry to Senior Level",
    verifiedPages: 1,
    description: "Tailored for data scientists, ML practitioners, and business analysts. Emphasizes statistical experimentation, data pipelines, and measurable business ROI.",
    features: [
      "Highlights A/B testing, statistical modeling, and ML libraries",
      "Showcases data stack tools (Snowflake, dbt, Airflow, Tableau)",
      "Calls out revenue preservation and cost-reduction achievements"
    ]
  },
  {
    id: "cloud-infra-tmpl",
    name: "Cloud and Infrastructure",
    filename: "cloud-infrastructure-template.pdf",
    domainId: "cloud-devops",
    domainName: "Cloud, DevOps and Infrastructure",
    targetRole: "Cloud Architect & DevOps / SRE Specialist",
    style: "DevOps & Systems",
    experienceLevel: "Mid to Senior Level",
    verifiedPages: 1,
    description: "Designed for cloud architects, SREs, and DevOps professionals. Features container orchestration, multi-cloud deployments, and Infrastructure as Code.",
    features: [
      "Detailed competencies across AWS, Azure, GCP, and Kubernetes",
      "Prominent Infrastructure as Code (Terraform, Helm, GitOps)",
      "Dedicated certifications block for CKA, AWS Professional"
    ]
  },
  {
    id: "cybersecurity-tmpl",
    name: "Cybersecurity",
    filename: "cybersecurity-template.pdf",
    domainId: "cybersecurity",
    domainName: "Cybersecurity",
    targetRole: "Cybersecurity Analyst & Threat Operations",
    style: "Security & Threat Operations",
    experienceLevel: "Entry to Mid Level",
    verifiedPages: 1,
    description: "Engineered for security analysts, penetration testers, and SOC engineers. Emphasizes threat modeling, SIEM tooling, incident response, and compliance frameworks.",
    features: [
      "Clear breakdown of SIEM, offensive testing, and EDR tools",
      "Demonstrates compliance familiarity (SOC 2, ISO 27001, NIST)",
      "Highlights incident triage metrics (MTTD/MTTR reductions)"
    ]
  },
  {
    id: "software-eng-tmpl",
    name: "Software Engineering",
    filename: "software-engineering-template.pdf",
    domainId: "software-dev",
    domainName: "Software Development",
    targetRole: "Full-Stack Software Engineer",
    style: "Full-Stack Engineering",
    experienceLevel: "All Experience Levels",
    verifiedPages: 1,
    description: "All-purpose engineering resume balanced for modern frontend, backend, and cloud developers. Tested for high readability and ATS keyword extraction.",
    features: [
      "Equally balanced across frontend, backend, and databases",
      "Clean separation of programming languages and libraries",
      "Includes live portfolio and open-source project references"
    ]
  }
];

export function initTemplatesPage() {
  const root = document.getElementById("templates-root");
  if (!root) return;

  let searchQuery = "";
  let selectedDomain = "all";
  let selectedLevel = "all";
  let selectedStyle = "all";

  function render() {
    const filtered = RESUME_TEMPLATES_CATALOGUE.filter((tmpl) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        tmpl.name.toLowerCase().includes(q) ||
        tmpl.targetRole.toLowerCase().includes(q) ||
        tmpl.domainName.toLowerCase().includes(q) ||
        tmpl.style.toLowerCase().includes(q) ||
        tmpl.description.toLowerCase().includes(q);

      const matchesDomain = selectedDomain === "all" || tmpl.domainId === selectedDomain;
      const matchesLevel =
        selectedLevel === "all" ||
        tmpl.experienceLevel.toLowerCase().includes(selectedLevel.toLowerCase()) ||
        tmpl.experienceLevel === "All Experience Levels";
      const matchesStyle = selectedStyle === "all" || tmpl.style === selectedStyle;

      return matchesQuery && matchesDomain && matchesLevel && matchesStyle;
    });

    root.innerHTML = `
      <div class="page-header-banner">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: var(--space-4);">
          <div>
            <h1>ATS-Friendly Resume Templates</h1>
            <p>Explore and download genuine, ATS-conscious PDF resumes with selectable text, clean headings, and verified single-page formatting across engineering careers.</p>
          </div>
          <div>
            <span class="badge badge-connected" title="Verified vector PDFs with selectable text">
              <span class="status-dot"></span>
              6 Genuine PDFs Ready
            </span>
          </div>
        </div>
      </div>

      <!-- Information Banner -->
      <div class="card" style="margin-bottom: var(--space-6); background: var(--color-primary-light); border-color: rgba(108, 76, 241, 0.25);">
        <div class="card-body" style="padding: var(--space-4) var(--space-6); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: var(--space-3);">
          <div style="display: flex; align-items: center; gap: var(--space-3);">
            <div style="color: var(--color-primary);">${ICONS.templates}</div>
            <p style="margin: 0; font-size: var(--font-size-xs); color: var(--color-text); line-height: 1.5;">
              <strong>Template Library Notice:</strong> These templates are real, downloadable PDF files containing fictional sample data formatted specifically for ATS readability. Download and use them as structured blueprints for your own resume content.
            </p>
          </div>
        </div>
      </div>

      <!-- Search and Filter Bar -->
      <div class="card" style="margin-bottom: var(--space-6);">
        <div class="card-body" style="padding: var(--space-5);">
          <div style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr auto; gap: var(--space-3); align-items: center;">
            <div class="form-group" style="margin: 0;">
              <input
                type="text"
                id="template-search-input"
                class="input"
                placeholder="Search templates by role, domain, or keyword..."
                value="${searchQuery}"
              />
            </div>
            <div class="form-group" style="margin: 0;">
              <select id="template-domain-filter" class="select">
                <option value="all">All Domains</option>
                ${ENGINEERING_DOMAINS.map(
                  (d) => `<option value="${d.id}" ${selectedDomain === d.id ? "selected" : ""}>${d.name}</option>`
                ).join("")}
              </select>
            </div>
            <div class="form-group" style="margin: 0;">
              <select id="template-level-filter" class="select">
                <option value="all" ${selectedLevel === "all" ? "selected" : ""}>All Experience</option>
                <option value="entry" ${selectedLevel === "entry" ? "selected" : ""}>Entry Level</option>
                <option value="mid" ${selectedLevel === "mid" ? "selected" : ""}>Mid Level</option>
                <option value="senior" ${selectedLevel === "senior" ? "selected" : ""}>Senior Level</option>
              </select>
            </div>
            <div class="form-group" style="margin: 0;">
              <select id="template-style-filter" class="select">
                <option value="all">All Styles</option>
                <option value="Chronological" ${selectedStyle === "Chronological" ? "selected" : ""}>Chronological</option>
                <option value="Technical / Project-Centric" ${selectedStyle === "Technical / Project-Centric" ? "selected" : ""}>Technical Projects</option>
                <option value="Quantitative & Analytical" ${selectedStyle === "Quantitative & Analytical" ? "selected" : ""}>Quantitative</option>
                <option value="DevOps & Systems" ${selectedStyle === "DevOps & Systems" ? "selected" : ""}>DevOps & Systems</option>
                <option value="Security & Threat Operations" ${selectedStyle === "Security & Threat Operations" ? "selected" : ""}>Security</option>
                <option value="Full-Stack Engineering" ${selectedStyle === "Full-Stack Engineering" ? "selected" : ""}>Full-Stack</option>
              </select>
            </div>
            <button type="button" class="btn btn-secondary btn-sm" id="reset-template-filters-btn">Reset</button>
          </div>
        </div>
      </div>

      <!-- Results Count Bar -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <p style="margin: 0; font-size: var(--font-size-sm); color: var(--color-text-muted); font-weight: 600;">
          Showing ${filtered.length} of ${RESUME_TEMPLATES_CATALOGUE.length} ATS-Friendly Templates
        </p>
      </div>

      <!-- Template Cards Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: var(--space-6); margin-bottom: var(--space-10);">
        ${filtered.map((tmpl) => renderTemplateCard(tmpl)).join("")}
      </div>

      <!-- PDF Preview Modal Target -->
      <div id="pdf-modal-container"></div>
    `;

    bindFilterEvents();
    bindCardActions();
  }

  function renderTemplateCard(tmpl) {
    const pdfUrl = hrefFromRoot(`assets/resume-templates/${tmpl.filename}`);

    return `
      <article class="card card-hoverable" style="display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div class="card-header" style="background: var(--color-surface-subtle); border-bottom: 1px solid var(--color-border-subtle); padding: var(--space-4) var(--space-5);">
            <div>
              <span style="font-size: 0.72rem; font-weight: 700; color: var(--color-primary); text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 2px;">
                ${tmpl.domainName}
              </span>
              <h3 style="margin: 0; font-size: var(--font-size-md); font-weight: 700; color: var(--color-text);">
                ${tmpl.name}
              </h3>
            </div>
            <span class="badge badge-purple" style="font-size: 0.68rem;" title="Verified single-page length">
              ✓ ${tmpl.verifiedPages} Page Verified
            </span>
          </div>

          <div class="card-body" style="padding: var(--space-5);">
            <div style="display: flex; flex-wrap: wrap; gap: var(--space-2); margin-bottom: var(--space-3);">
              <span class="skill-tag primary" style="font-size: 0.72rem;">${tmpl.style}</span>
              <span class="skill-tag" style="font-size: 0.72rem;">${tmpl.experienceLevel}</span>
            </div>

            <p style="font-size: var(--font-size-xs); font-weight: 600; color: var(--color-text); margin: 0 0 var(--space-2);">
              Target: <span style="color: var(--color-primary);">${tmpl.targetRole}</span>
            </p>

            <p style="font-size: var(--font-size-xs); color: var(--color-text-muted); line-height: 1.55; margin-bottom: var(--space-4);">
              ${tmpl.description}
            </p>

            <div style="background: var(--color-surface-subtle); border-radius: var(--radius-sm); padding: var(--space-3); margin-bottom: var(--space-4);">
              <span style="font-size: 0.7rem; font-weight: 700; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.04em; display: block; margin-bottom: 4px;">
                Key ATS Advantages
              </span>
              <ul style="list-style: none; padding: 0; margin: 0; font-size: 0.73rem; color: var(--color-text); display: flex; flex-direction: column; gap: 4px;">
                ${tmpl.features.map((f) => `<li>✓ ${f}</li>`).join("")}
              </ul>
            </div>
          </div>
        </div>

        <div style="padding: var(--space-4) var(--space-5); border-top: 1px solid var(--color-border); background: #ffffff; display: flex; gap: var(--space-3); justify-content: flex-end;">
          <button
            type="button"
            class="btn btn-secondary btn-sm preview-pdf-btn"
            data-id="${tmpl.id}"
            data-filename="${tmpl.filename}"
            data-name="${tmpl.name}"
            title="Preview PDF in interactive viewer"
          >
            ${ICONS.templates}
            Preview PDF
          </button>
          <a
            class="btn btn-primary btn-sm"
            href="${pdfUrl}"
            download="${tmpl.filename}"
            title="Download ${tmpl.filename}"
          >
            ${ICONS.download || `
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
              </svg>
            `}
            Download PDF
          </a>
        </div>
      </article>
    `;
  }

  function bindFilterEvents() {
    const searchInput = document.getElementById("template-search-input");
    const domainFilter = document.getElementById("template-domain-filter");
    const levelFilter = document.getElementById("template-level-filter");
    const styleFilter = document.getElementById("template-style-filter");
    const resetBtn = document.getElementById("reset-template-filters-btn");

    searchInput?.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      render();
    });

    domainFilter?.addEventListener("change", (e) => {
      selectedDomain = e.target.value;
      render();
    });

    levelFilter?.addEventListener("change", (e) => {
      selectedLevel = e.target.value;
      render();
    });

    styleFilter?.addEventListener("change", (e) => {
      selectedStyle = e.target.value;
      render();
    });

    resetBtn?.addEventListener("click", () => {
      searchQuery = "";
      selectedDomain = "all";
      selectedLevel = "all";
      selectedStyle = "all";
      render();
    });
  }

  function bindCardActions() {
    document.querySelectorAll(".preview-pdf-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const filename = btn.dataset.filename;
        const name = btn.dataset.name;
        openPdfPreviewModal(name, filename);
      });
    });
  }

  function openPdfPreviewModal(name, filename) {
    const modalContainer = document.getElementById("pdf-modal-container");
    if (!modalContainer) return;

    const pdfUrl = hrefFromRoot(`assets/resume-templates/${filename}`);

    modalContainer.innerHTML = `
      <div class="modal-backdrop" id="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="modal-pdf-title">
        <div class="modal-dialog" style="max-width: 960px; height: 90vh;">
          <div class="modal-header">
            <div style="display: flex; align-items: center; gap: var(--space-3);">
              <span class="badge badge-purple">PDF Preview</span>
              <h2 id="modal-pdf-title" class="modal-title">${name}</h2>
            </div>
            <div style="display: flex; align-items: center; gap: var(--space-2);">
              <a
                class="btn btn-secondary btn-sm"
                href="${pdfUrl}"
                target="_blank"
                rel="noopener noreferrer"
                title="Open PDF in a dedicated browser tab"
              >
                Open in New Tab ↗
              </a>
              <button
                type="button"
                class="icon-button"
                id="close-pdf-modal-btn"
                aria-label="Close preview"
              >
                ✕
              </button>
            </div>
          </div>
          <div class="modal-body" style="padding: 0; background: #525659; display: flex; flex-direction: column;">
            <iframe
              src="${pdfUrl}#view=FitH"
              title="${name} PDF Document"
              style="width: 100%; height: 100%; border: none; flex: 1;"
            >
              <p>Your browser does not support inline PDFs. <a href="${pdfUrl}" target="_blank">Click here to view the PDF.</a></p>
            </iframe>
          </div>
          <div class="modal-footer" style="justify-content: space-between;">
            <div style="font-size: var(--font-size-xs); color: var(--color-text-muted);">
              File: <code>${filename}</code> • Genuine ATS-tested document with selectable text.
            </div>
            <div style="display: flex; gap: var(--space-3);">
              <button type="button" class="btn btn-secondary btn-sm" id="close-modal-bottom-btn">Close</button>
              <a class="btn btn-primary btn-sm" href="${pdfUrl}" download="${filename}">
                Download PDF File
              </a>
            </div>
          </div>
        </div>
      </div>
    `;

    const closeBtn = document.getElementById("close-pdf-modal-btn");
    const closeBottomBtn = document.getElementById("close-modal-bottom-btn");
    const backdrop = document.getElementById("modal-backdrop");

    function closeModal() {
      modalContainer.innerHTML = "";
    }

    closeBtn?.addEventListener("click", closeModal);
    closeBottomBtn?.addEventListener("click", closeModal);
    backdrop?.addEventListener("click", (e) => {
      if (e.target === backdrop) closeModal();
    });

    document.addEventListener("keydown", function escHandler(e) {
      if (e.key === "Escape") {
        closeModal();
        document.removeEventListener("keydown", escHandler);
      }
    });
  }

  render();
}
