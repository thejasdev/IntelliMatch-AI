import { el, svgIcon } from "../utils/dom.js";
import { ICONS } from "../components/icons.js";

/**
 * IntelliMatch AI — Five Reusable Resume Templates Catalogue
 * Centralized source of truth for template metadata, layout characteristics, and file paths.
 */
export const RESUME_TEMPLATES_CATALOGUE = [
  {
    id: "clean-professional",
    name: "Clean Professional",
    filename: "clean-professional.pdf",
    style: "Classic Minimalist",
    targetAudience: "Software Developers & Technology Professionals",
    verifiedPages: 1,
    description: "A clean, professional resume layout with a clear content hierarchy, conventional sections and restrained styling for a wide range of engineering and technology roles.",
    features: [
      "Rigid single-column hierarchy for reliable ATS keyword parsing",
      "Standard Education, Experience, Projects, and Skills flow",
      "Single-page discipline with small-caps section headers"
    ]
  },
  {
    id: "experience-focused",
    name: "Experience Focused",
    filename: "experience-focused.pdf",
    style: "Corporate Chronological",
    targetAudience: "Working Professionals, QA & Mid-Level Engineers",
    verifiedPages: 1,
    description: "A structured resume layout that gives professional experience, responsibilities and achievements prominent placement. Suitable for candidates with relevant internships or work experience.",
    features: [
      "Prominent career summary and testing/automation toolchains",
      "Reverse-chronological employment history with measurable outcomes",
      "Dedicated credentials and cloud certifications section"
    ]
  },
  {
    id: "fresher-project-focused",
    name: "Fresher & Project Focused",
    filename: "fresher-project-focused.pdf",
    style: "Student Project-Centric",
    targetAudience: "College Students, Freshers & Developer Interns",
    verifiedPages: 1,
    description: "A student-friendly resume layout that emphasizes education, technical skills, academic projects, internships and achievements.",
    features: [
      "Balanced layout connecting coursework, internships, and capstone projects",
      "Structured tabular technical skills matrix (Languages, Tools, Databases)",
      "Highlights extracurricular student leadership and certifications"
    ]
  },
  {
    id: "technical-projects",
    name: "Technical Projects",
    filename: "technical-projects.pdf",
    style: "Technical High-Density",
    targetAudience: "Full-Stack, Backend & Systems Developers",
    verifiedPages: 1,
    description: "A technical resume layout designed to give projects, tools, technologies and implementation details clear visibility.",
    features: [
      "High-density project showcase with tech stack tags and impact metrics",
      "3-tier categorized skills matrix: Languages, Technologies, and Concepts",
      "Clean modern sans-serif typography with FontAwesome contact links"
    ]
  },
  {
    id: "traditional-academic",
    name: "Traditional Academic",
    filename: "traditional-academic.pdf",
    style: "Academic Comprehensive",
    targetAudience: "Engineering Graduates, Researchers & Formal Placements",
    verifiedPages: 2,
    description: "A conventional academic-style resume layout emphasizing education, coursework, projects and related achievements.",
    features: [
      "Classic serif typography with formal academic progression timeline",
      "Separate Major & Mini engineering project sections with technical scope",
      "Comprehensive 2-page structure including symposiums and seminars"
    ]
  }
];

/**
 * Computes the accessible URL for a resume template PDF.
 * - Under HTTP/HTTPS, uses an absolute root path (`/assets/resume-templates/...`)
 *   which avoids directory-nesting discrepancies on web servers.
 * - Under file:// protocol, calculates the relative path based on location depth.
 */
export function getTemplatePdfUrl(filename) {
  const cleanFilename = encodeURIComponent(filename.trim());
  if (window.location.protocol.startsWith("http")) {
    return `/assets/resume-templates/${cleanFilename}`;
  }
  const isNested = window.location.pathname.replace(/\\/g, "/").includes("/pages/");
  return isNested
    ? `../assets/resume-templates/${cleanFilename}`
    : `assets/resume-templates/${cleanFilename}`;
}

/**
 * Returns a fallback relative URL for situations where a root-relative path cannot resolve.
 */
export function getFallbackTemplatePdfUrl(filename) {
  const cleanFilename = encodeURIComponent(filename.trim());
  const isNested = window.location.pathname.replace(/\\/g, "/").includes("/pages/");
  return isNested
    ? `../assets/resume-templates/${cleanFilename}`
    : `assets/resume-templates/${cleanFilename}`;
}

export function initTemplatesPage() {
  const root = document.getElementById("templates-root");
  if (!root) return;

  let searchQuery = "";
  let selectedStyle = "all";
  let selectedPages = "all";

  function render() {
    const filtered = RESUME_TEMPLATES_CATALOGUE.filter((tmpl) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        tmpl.name.toLowerCase().includes(q) ||
        tmpl.targetAudience.toLowerCase().includes(q) ||
        tmpl.style.toLowerCase().includes(q) ||
        tmpl.description.toLowerCase().includes(q) ||
        tmpl.features.some((f) => f.toLowerCase().includes(q));

      const matchesStyle = selectedStyle === "all" || tmpl.style === selectedStyle;
      const matchesPages =
        selectedPages === "all" ||
        (selectedPages === "1" && tmpl.verifiedPages === 1) ||
        (selectedPages === "2" && tmpl.verifiedPages === 2);

      return matchesQuery && matchesStyle && matchesPages;
    });

    root.innerHTML = `
      <div class="page-header-banner">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: var(--space-4);">
          <div>
            <h1>ATS-Conscious Resume Templates</h1>
            <p>Explore, preview, and download five reusable PDF resume templates designed with clear content hierarchies, restrained typography, and verified single-page and two-page structures.</p>
          </div>
          <div>
            <span class="badge badge-connected" title="Verified reusable PDF documents">
              <span class="status-dot"></span>
              5 Reusable Templates Ready
            </span>
          </div>
        </div>
      </div>

      <!-- Information Banner -->
      <div class="card" style="margin-bottom: var(--space-6); background: var(--color-primary-light); border-color: rgba(101, 72, 232, 0.25);">
        <div class="card-body" style="padding: var(--space-4) var(--space-6); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: var(--space-3);">
          <div style="display: flex; align-items: center; gap: var(--space-3);">
            <div style="color: var(--color-primary);">${ICONS.templates}</div>
            <p style="margin: 0; font-size: var(--font-size-xs); color: var(--color-text); line-height: 1.5;">
              <strong>Template Library Notice:</strong> Each template is an authentic PDF document with selectable text and an ATS-conscious layout. You can preview each document inline or download it directly to format your career credentials.
            </p>
          </div>
        </div>
      </div>

      <!-- Search and Filter Bar -->
      <div class="card" style="margin-bottom: var(--space-6);">
        <div class="card-body" style="padding: var(--space-5);">
          <div style="display: grid; grid-template-columns: 2fr 1fr 1fr auto; gap: var(--space-3); align-items: center;">
            <div class="form-group" style="margin: 0;">
              <input
                type="text"
                id="template-search-input"
                class="input"
                placeholder="Search templates by name, style, audience, or keywords..."
                value="${searchQuery}"
              />
            </div>
            <div class="form-group" style="margin: 0;">
              <select id="template-style-filter" class="select">
                <option value="all">All Design Styles</option>
                <option value="Classic Minimalist" ${selectedStyle === "Classic Minimalist" ? "selected" : ""}>Classic Minimalist</option>
                <option value="Corporate Chronological" ${selectedStyle === "Corporate Chronological" ? "selected" : ""}>Corporate Chronological</option>
                <option value="Student Project-Centric" ${selectedStyle === "Student Project-Centric" ? "selected" : ""}>Student Project-Centric</option>
                <option value="Technical High-Density" ${selectedStyle === "Technical High-Density" ? "selected" : ""}>Technical High-Density</option>
                <option value="Academic Comprehensive" ${selectedStyle === "Academic Comprehensive" ? "selected" : ""}>Academic Comprehensive</option>
              </select>
            </div>
            <div class="form-group" style="margin: 0;">
              <select id="template-pages-filter" class="select">
                <option value="all" ${selectedPages === "all" ? "selected" : ""}>All Page Counts</option>
                <option value="1" ${selectedPages === "1" ? "selected" : ""}>Single Page (1 Page)</option>
                <option value="2" ${selectedPages === "2" ? "selected" : ""}>Multi-Page (2 Pages)</option>
              </select>
            </div>
            <button type="button" class="btn btn-secondary btn-sm" id="reset-template-filters-btn">Reset</button>
          </div>
        </div>
      </div>

      <!-- Results Count Bar -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <p style="margin: 0; font-size: var(--font-size-sm); color: var(--color-text-muted); font-weight: 600;">
          Showing ${filtered.length} of ${RESUME_TEMPLATES_CATALOGUE.length} Reusable Templates
        </p>
      </div>

      <!-- Template Cards Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: var(--space-6); margin-bottom: var(--space-10);">
        ${filtered.map((tmpl) => renderTemplateCard(tmpl)).join("")}
      </div>

      <!-- PDF Preview Modal Target -->
      <div id="pdf-modal-container"></div>
    `;

    bindFilterEvents();
    bindCardActions();
  }

  function renderTemplateCard(tmpl) {
    const pdfUrl = getTemplatePdfUrl(tmpl.filename);

    return `
      <article class="card card-hoverable" style="display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
        <div>
          <div class="card-header" style="background: var(--color-surface-subtle); border-bottom: 1px solid var(--color-border-subtle); padding: var(--space-4) var(--space-5);">
            <div>
              <span style="font-size: 0.72rem; font-weight: 700; color: var(--color-primary); text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 2px;">
                ${tmpl.style}
              </span>
              <h3 style="margin: 0; font-size: var(--font-size-md); font-weight: 700; color: var(--color-text);">
                ${tmpl.name}
              </h3>
            </div>
            <span class="badge ${tmpl.verifiedPages === 1 ? "badge-purple" : "badge-connected"}" style="font-size: 0.68rem;" title="Verified document length">
              ✓ ${tmpl.verifiedPages} Page${tmpl.verifiedPages > 1 ? "s" : ""} Verified
            </span>
          </div>

          <div class="card-body" style="padding: var(--space-5);">
            <div style="display: flex; flex-wrap: wrap; gap: var(--space-2); margin-bottom: var(--space-3);">
              <span class="skill-tag primary" style="font-size: 0.72rem;">${tmpl.style}</span>
              <span class="skill-tag" style="font-size: 0.72rem;">${tmpl.verifiedPages === 1 ? "Single Page" : "2 Pages"}</span>
            </div>

            <p style="font-size: var(--font-size-xs); font-weight: 600; color: var(--color-text); margin: 0 0 var(--space-2);">
              Recommended For: <span style="color: var(--color-primary);">${tmpl.targetAudience}</span>
            </p>

            <p style="font-size: var(--font-size-xs); color: var(--color-text-muted); line-height: 1.55; margin-bottom: var(--space-4);">
              ${tmpl.description}
            </p>

            <div style="background: var(--color-surface-subtle); border-radius: var(--radius-sm); padding: var(--space-3); margin-bottom: var(--space-4);">
              <span style="font-size: 0.7rem; font-weight: 700; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.04em; display: block; margin-bottom: 4px;">
                Key Layout Advantages
              </span>
              <ul style="list-style: none; padding: 0; margin: 0; font-size: 0.73rem; color: var(--color-text); display: flex; flex-direction: column; gap: 4px;">
                ${tmpl.features.map((f) => `<li>✓ ${f}</li>`).join("")}
              </ul>
            </div>
          </div>
        </div>

        <div style="padding: var(--space-4) var(--space-5); border-top: 1px solid var(--color-border); background: #ffffff; display: flex; gap: var(--space-3); justify-content: flex-end; align-items: center;">
          <button
            type="button"
            class="btn btn-secondary btn-sm preview-pdf-btn"
            data-id="${tmpl.id}"
            title="Preview ${tmpl.name} in interactive viewer"
          >
            ${ICONS.templates}
            Preview PDF
          </button>
          <a
            class="btn btn-primary btn-sm download-pdf-btn"
            href="${pdfUrl}"
            download="${tmpl.filename}"
            data-id="${tmpl.id}"
            title="Download ${tmpl.name} PDF"
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
    const styleFilter = document.getElementById("template-style-filter");
    const pagesFilter = document.getElementById("template-pages-filter");
    const resetBtn = document.getElementById("reset-template-filters-btn");

    searchInput?.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      render();
    });

    styleFilter?.addEventListener("change", (e) => {
      selectedStyle = e.target.value;
      render();
    });

    pagesFilter?.addEventListener("change", (e) => {
      selectedPages = e.target.value;
      render();
    });

    resetBtn?.addEventListener("click", () => {
      searchQuery = "";
      selectedStyle = "all";
      selectedPages = "all";
      render();
    });
  }

  function bindCardActions() {
    document.querySelectorAll(".preview-pdf-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const templateId = btn.dataset.id;
        openPdfPreviewModal(templateId);
      });
    });
  }

  async function openPdfPreviewModal(templateId) {
    const modalContainer = document.getElementById("pdf-modal-container");
    if (!modalContainer) return;

    // Look up template from centralized source of truth
    const template = RESUME_TEMPLATES_CATALOGUE.find((t) => t.id === templateId);
    if (!template) {
      console.error(`Template not found with id: ${templateId}`);
      return;
    }

    const primaryUrl = getTemplatePdfUrl(template.filename);
    const fallbackUrl = getFallbackTemplatePdfUrl(template.filename);

    // Initial modal render with loading indicator
    modalContainer.innerHTML = `
      <div class="modal-backdrop" id="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="modal-pdf-title">
        <div class="pdf-preview-modal" id="modal-dialog">
          <header class="pdf-preview-header">
            <div style="display: flex; align-items: center; gap: var(--space-3);">
              <span class="badge badge-purple">PDF Preview</span>
              <h2 id="modal-pdf-title" class="modal-title">${template.name}</h2>
            </div>
            <div style="display: flex; align-items: center; gap: var(--space-2);">
              <a
                class="btn btn-secondary btn-sm"
                id="modal-open-tab-btn"
                href="${primaryUrl}"
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
                title="Close preview (Esc)"
              >
                ✕
              </button>
            </div>
          </header>

          <div class="pdf-preview-body" id="pdf-viewer-container">
            <div id="pdf-loading-overlay" class="pdf-loading-state">
              <div class="pdf-loading-spinner"></div>
              <span>Loading ${template.name}...</span>
            </div>
            <iframe
              id="pdf-preview-iframe"
              class="pdf-preview-frame"
              src="${primaryUrl}#view=FitH"
              title="${template.name} PDF Document"
            >
              <p>Your browser does not support inline PDFs. <a href="${primaryUrl}" target="_blank">Click here to view the PDF.</a></p>
            </iframe>
          </div>

          <footer class="pdf-preview-footer">
            <div style="font-size: var(--font-size-xs); color: var(--color-text-muted);">
              File: <code id="modal-footer-filename">${template.filename}</code> • Verified ${template.verifiedPages} Page${template.verifiedPages > 1 ? "s" : ""}
            </div>
            <div style="display: flex; gap: var(--space-3);">
              <button type="button" class="btn btn-secondary btn-sm" id="close-modal-bottom-btn">Close</button>
              <a
                class="btn btn-primary btn-sm"
                id="modal-download-btn"
                href="${primaryUrl}"
                download="${template.filename}"
                title="Download ${template.name}"
              >
                Download PDF File
              </a>
            </div>
          </footer>
        </div>
      </div>
    `;

    const closeBtn = document.getElementById("close-pdf-modal-btn");
    const closeBottomBtn = document.getElementById("close-modal-bottom-btn");
    const backdrop = document.getElementById("modal-backdrop");
    const iframe = document.getElementById("pdf-preview-iframe");
    const loadingOverlay = document.getElementById("pdf-loading-overlay");
    const viewerContainer = document.getElementById("pdf-viewer-container");
    const openTabBtn = document.getElementById("modal-open-tab-btn");
    const downloadBtn = document.getElementById("modal-download-btn");

    function closeModal() {
      modalContainer.innerHTML = "";
    }

    closeBtn?.addEventListener("click", closeModal);
    closeBottomBtn?.addEventListener("click", closeModal);
    backdrop?.addEventListener("click", (e) => {
      if (e.target === backdrop) closeModal();
    });

    function escHandler(e) {
      if (e.key === "Escape") {
        closeModal();
        document.removeEventListener("keydown", escHandler);
      }
    }
    document.addEventListener("keydown", escHandler);

    // Verify accessibility and handle fallbacks / errors
    async function verifyAndLoadPdf() {
      let activeUrl = primaryUrl;
      let accessible = false;

      try {
        const headRes = await fetch(primaryUrl, { method: "HEAD" });
        if (headRes.ok) {
          accessible = true;
          activeUrl = primaryUrl;
        } else if (headRes.status === 404) {
          // Attempt fallback relative path
          const fallbackRes = await fetch(fallbackUrl, { method: "HEAD" });
          if (fallbackRes.ok) {
            accessible = true;
            activeUrl = fallbackUrl;
          }
        }
      } catch (err) {
        // In local/CORS environments where HEAD requests are restricted, assume primaryUrl is valid
        accessible = true;
      }

      if (accessible) {
        if (iframe && iframe.src !== activeUrl) {
          iframe.src = `${activeUrl}#view=FitH`;
        }
        if (openTabBtn) openTabBtn.href = activeUrl;
        if (downloadBtn) downloadBtn.href = activeUrl;

        // Hide loading indicator once iframe has signaled load
        iframe.onload = () => {
          if (loadingOverlay) {
            loadingOverlay.style.opacity = "0";
            setTimeout(() => {
              if (loadingOverlay) loadingOverlay.style.display = "none";
            }, 200);
          }
        };

        // Fallback safety timeout in case iframe doesn't fire load event
        setTimeout(() => {
          if (loadingOverlay && loadingOverlay.style.display !== "none") {
            loadingOverlay.style.display = "none";
          }
        }, 1500);
      } else {
        // Show styled error state
        if (viewerContainer) {
          viewerContainer.innerHTML = `
            <div class="pdf-error-state">
              <span class="pdf-error-icon">⚠️</span>
              <h3>PDF Document Not Found (404)</h3>
              <p>The system was unable to load <code>${template.filename}</code> at <code>${activeUrl}</code>. Please confirm the file exists in <code>assets/resume-templates/</code>.</p>
              <div class="pdf-error-actions">
                <button type="button" class="btn btn-secondary btn-sm" id="modal-retry-btn">Retry Preview</button>
                <a class="btn btn-primary btn-sm" href="${activeUrl}" target="_blank">Open Directly in New Tab</a>
              </div>
            </div>
          `;
          document.getElementById("modal-retry-btn")?.addEventListener("click", () => {
            openPdfPreviewModal(templateId);
          });
        }
      }
    }

    verifyAndLoadPdf();
  }

  render();
}
