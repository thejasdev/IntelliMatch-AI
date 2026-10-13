import { el, svgIcon } from "../utils/dom.js";
import { ICONS } from "../components/icons.js";
import { hrefFromRoot } from "../navigation.js";
import { ENGINEERING_DOMAINS, getRolesForDomain, getDomainById, findRoleById } from "../../data/jobRoles.js";
import { JOB_SOURCES, SAMPLE_MULTI_DOMAIN_JOBS } from "../../data/jobSources.js";

export function initJobSearchPage() {
  const root = document.getElementById("job-search-root");
  if (!root) return;

  // Filter state
  let keywordQuery = "";
  let locationQuery = "";
  let selectedDomain = "all";
  let selectedRole = "all";
  let selectedLevel = "all";
  let selectedArrangement = "all";
  let selectedType = "all";

  function render() {
    const filteredJobs = SAMPLE_MULTI_DOMAIN_JOBS.filter((job) => {
      const q = keywordQuery.toLowerCase().trim();
      const loc = locationQuery.toLowerCase().trim();

      const matchesKeyword =
        !q ||
        job.title.toLowerCase().includes(q) ||
        job.company.toLowerCase().includes(q) ||
        job.skills.some((s) => s.toLowerCase().includes(q)) ||
        job.snippet.toLowerCase().includes(q);

      const matchesLocation = !loc || job.location.toLowerCase().includes(loc);
      const matchesDomain = selectedDomain === "all" || job.domainId === selectedDomain;
      const matchesRole = selectedRole === "all" || job.roleId === selectedRole;
      const matchesLevel =
        selectedLevel === "all" ||
        job.experienceLevel.toLowerCase().includes(selectedLevel.toLowerCase());
      const matchesArrangement =
        selectedArrangement === "all" ||
        job.arrangement.toLowerCase() === selectedArrangement.toLowerCase();
      const matchesType =
        selectedType === "all" || job.jobType.toLowerCase() === selectedType.toLowerCase();

      return (
        matchesKeyword &&
        matchesLocation &&
        matchesDomain &&
        matchesRole &&
        matchesLevel &&
        matchesArrangement &&
        matchesType
      );
    });

    const activeRoles = selectedDomain === "all"
      ? []
      : getRolesForDomain(selectedDomain, false);

    root.innerHTML = `
      <div class="page-header-banner">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: var(--space-4);">
          <div>
            <h1>Semantic Job Search &amp; Career Discovery</h1>
            <p>Explore target job descriptions across 10 engineering domains, launch verified external platform searches, or import requirements directly into Resume Analyzer.</p>
          </div>
          <div>
            <span class="badge badge-demo">
              <span class="status-dot"></span>
              Multi-Domain Directory
            </span>
          </div>
        </div>
      </div>

      <!-- Job Sources Status Panel -->
      <div class="card" style="margin-bottom: var(--space-6);">
        <div class="card-header" style="background: var(--color-surface-subtle); padding: var(--space-4) var(--space-6);">
          <div style="display: flex; align-items: center; gap: var(--space-3);">
            <div style="color: var(--color-primary);">${ICONS.jobs}</div>
            <h2 class="card-title" style="font-size: var(--font-size-md);">Integrated Job Sources &amp; Providers</h2>
          </div>
          <span style="font-size: var(--font-size-xs); color: var(--color-text-muted);">
            Honest Provider Status &amp; Search Launchers
          </span>
        </div>
        <div class="card-body" style="padding: var(--space-5);">
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: var(--space-4);">
            ${JOB_SOURCES.map((source) => renderSourceCard(source)).join("")}
          </div>
        </div>
      </div>

      <!-- External Search Launcher Widget -->
      <div class="card" style="margin-bottom: var(--space-6); background: linear-gradient(135deg, #ffffff 0%, var(--color-primary-light) 160%); border-color: rgba(108, 76, 241, 0.25);">
        <div class="card-body" style="padding: var(--space-5);">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--space-2); margin-bottom: var(--space-3);">
            <h3 style="margin: 0; font-size: var(--font-size-md); color: var(--color-text);">
              Live External Search Launcher
            </h3>
            <span style="font-size: var(--font-size-xs); color: var(--color-text-muted);">
              Opens verified search results on official external platforms in a new tab.
            </span>
          </div>
          <div style="display: flex; flex-wrap: wrap; gap: var(--space-3); align-items: center;">
            <div style="flex: 1; min-width: 200px;">
              <input
                type="text"
                id="external-query-input"
                class="input"
                placeholder="Role or keywords (e.g. Cloud Engineer, React, PyTorch)..."
                value="${keywordQuery || 'Software Engineer'}"
              />
            </div>
            <div style="width: 180px;">
              <input
                type="text"
                id="external-location-input"
                class="input"
                placeholder="Location (e.g. Remote, India, US)..."
                value="${locationQuery || 'Remote'}"
              />
            </div>
            <div style="display: flex; gap: var(--space-2); flex-wrap: wrap;">
              <button type="button" class="btn btn-secondary btn-sm launch-external-btn" data-source="linkedin">
                Search LinkedIn ↗
              </button>
              <button type="button" class="btn btn-secondary btn-sm launch-external-btn" data-source="naukri">
                Search Naukri ↗
              </button>
              <button type="button" class="btn btn-secondary btn-sm launch-external-btn" data-source="internshala">
                Search Internshala ↗
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Multi-Domain Filters Card -->
      <div class="card" style="margin-bottom: var(--space-6);">
        <div class="card-header" style="background: var(--color-surface-subtle); padding: var(--space-4) var(--space-6);">
          <h3 class="card-title" style="font-size: var(--font-size-md);">Search &amp; Filter Roles</h3>
          <span style="font-size: var(--font-size-xs); color: var(--color-text-muted);">
            ${filteredJobs.length} matching benchmark roles found
          </span>
        </div>
        <div class="card-body" style="padding: var(--space-5);">
          <!-- Top Row: Search and Location -->
          <div style="display: grid; grid-template-columns: 2fr 1fr; gap: var(--space-4); margin-bottom: var(--space-4);">
            <div class="form-group" style="margin: 0;">
              <label class="form-label" for="filter-keyword-input">Keywords / Skills</label>
              <input
                type="text"
                id="filter-keyword-input"
                class="input"
                placeholder="Search by title, skill, or keyword (e.g. Python, Docker, SQL, Firmware)..."
                value="${keywordQuery}"
              />
            </div>
            <div class="form-group" style="margin: 0;">
              <label class="form-label" for="filter-location-input">Location</label>
              <input
                type="text"
                id="filter-location-input"
                class="input"
                placeholder="Location (e.g. Remote, San Francisco, Chicago)..."
                value="${locationQuery}"
              />
            </div>
          </div>

          <!-- Bottom Row: Domain, Role, Level, Arrangement, Type -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)) auto; gap: var(--space-3); align-items: flex-end;">
            <div class="form-group" style="margin: 0;">
              <label class="form-label" for="filter-domain-select">Domain</label>
              <select id="filter-domain-select" class="select">
                <option value="all">All Domains</option>
                ${ENGINEERING_DOMAINS.map(
                  (d) => `<option value="${d.id}" ${selectedDomain === d.id ? "selected" : ""}>${d.name}</option>`
                ).join("")}
              </select>
            </div>

            <div class="form-group" style="margin: 0;">
              <label class="form-label" for="filter-role-select">Job Role</label>
              <select id="filter-role-select" class="select" ${selectedDomain === "all" ? "disabled" : ""}>
                <option value="all">${selectedDomain === "all" ? "Select domain first" : "All Roles in Domain"}</option>
                ${activeRoles.map(
                  (r) => `<option value="${r.id}" ${selectedRole === r.id ? "selected" : ""}>${r.title}</option>`
                ).join("")}
              </select>
            </div>

            <div class="form-group" style="margin: 0;">
              <label class="form-label" for="filter-level-select">Experience</label>
              <select id="filter-level-select" class="select">
                <option value="all" ${selectedLevel === "all" ? "selected" : ""}>All Levels</option>
                <option value="internship" ${selectedLevel === "internship" ? "selected" : ""}>Internship</option>
                <option value="entry" ${selectedLevel === "entry" ? "selected" : ""}>Entry-Level</option>
                <option value="mid" ${selectedLevel === "mid" ? "selected" : ""}>Mid-Level</option>
                <option value="senior" ${selectedLevel === "senior" ? "selected" : ""}>Senior</option>
              </select>
            </div>

            <div class="form-group" style="margin: 0;">
              <label class="form-label" for="filter-arrangement-select">Work Mode</label>
              <select id="filter-arrangement-select" class="select">
                <option value="all" ${selectedArrangement === "all" ? "selected" : ""}>All Modes</option>
                <option value="remote" ${selectedArrangement === "remote" ? "selected" : ""}>Remote</option>
                <option value="hybrid" ${selectedArrangement === "hybrid" ? "selected" : ""}>Hybrid</option>
                <option value="on-site" ${selectedArrangement === "on-site" ? "selected" : ""}>On-Site</option>
              </select>
            </div>

            <div class="form-group" style="margin: 0;">
              <label class="form-label" for="filter-type-select">Job Type</label>
              <select id="filter-type-select" class="select">
                <option value="all" ${selectedType === "all" ? "selected" : ""}>All Types</option>
                <option value="full-time" ${selectedType === "full-time" ? "selected" : ""}>Full-Time</option>
                <option value="internship" ${selectedType === "internship" ? "selected" : ""}>Internship</option>
              </select>
            </div>

            <button type="button" class="btn btn-secondary btn-sm" id="reset-all-filters-btn" style="height: 42px;">
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      <!-- Curated Multi-Domain Benchmarks Section -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <div>
          <h2 style="font-size: var(--font-size-lg); margin: 0; color: var(--color-text);">
            Curated Benchmark Job Listings
          </h2>
          <p style="font-size: var(--font-size-xs); color: var(--color-text-muted); margin: 2px 0 0;">
            Clearly separated sample roles for testing compatibility scores in Resume Analyzer.
          </p>
        </div>
        <span class="badge badge-demo">Sample Listings</span>
      </div>

      <!-- Jobs List Grid -->
      <div class="jobs-list" style="margin-bottom: var(--space-10);">
        ${
          filteredJobs.length === 0
            ? renderEmptyJobsHtml()
            : filteredJobs.map((job) => renderJobCard(job)).join("")
        }
      </div>

      <!-- Future Connector Architecture Section -->
      <div class="card" style="margin-bottom: var(--space-8); border-left: 4px solid var(--color-primary);">
        <div class="card-body" style="padding: var(--space-6);">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: var(--space-3); margin-bottom: var(--space-3);">
            <div>
              <h3 style="margin: 0; font-size: var(--font-size-md); color: var(--color-text);">
                Backend Connector Architecture (FastAPI Blueprint)
              </h3>
              <p style="font-size: var(--font-size-xs); color: var(--color-text-muted); margin: 2px 0 0;">
                Prepared provider abstraction for future live platform integration.
              </p>
            </div>
            <span class="badge badge-planned">FastAPI Integration Ready</span>
          </div>
          <p style="font-size: var(--font-size-xs); color: var(--color-text); line-height: 1.6; margin-bottom: var(--space-3);">
            To ensure zero API key leakage in client code and respect platform terms of service, live ingestion will be hosted inside a secure Python/FastAPI microservice.
            Each provider implements an asynchronous interface:
          </p>
          <pre style="background: var(--color-surface-subtle); padding: var(--space-4); border-radius: var(--radius-md); font-size: 0.75rem; color: var(--color-text); overflow-x: auto; font-family: var(--font-mono);">
class BaseJobProvider(ABC):
    @abstractmethod
    async def search_jobs(self, query: str, location: str, filters: dict) -> list[dict]:
        """Queries authorized platform endpoints with rate-limiting and pagination."""
        pass

    @abstractmethod
    def normalize_job(self, source_record: dict) -> NormalizedJob:
        """Standardizes titles, engineering domains, required skills, and location models."""
        pass

    @abstractmethod
    def get_application_url(self, normalized_job: NormalizedJob) -> str:
        """Returns direct authorized listing URL without tracking injection."""
        pass</pre>
          <p style="font-size: var(--font-size-xs); color: var(--color-text-muted); margin: var(--space-3) 0 0; line-height: 1.5;">
            <em>Notice: Commercial job board API availability and permitted use cases vary. Where platforms prohibit scraping, IntelliMatch AI utilizes transparent external search links or official partner webhooks.</em>
          </p>
        </div>
      </div>

      <!-- Modal Target for Viewing Full Job Description -->
      <div id="job-detail-modal-container"></div>
    `;

    bindFilterEvents();
    bindJobCardActions();
    bindExternalLaunchers();
  }

  function renderSourceCard(source) {
    let badgeClass = "badge-demo";
    if (source.statusType === "open-search") badgeClass = "badge-open-search";
    if (source.statusType === "setup") badgeClass = "badge-setup";
    if (source.statusType === "connected") badgeClass = "badge-connected";

    return `
      <div style="padding: var(--space-4); border: 1px solid var(--color-border); border-radius: var(--radius-md); background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-2);">
            <strong style="font-size: var(--font-size-sm); color: var(--color-text);">${source.name}</strong>
            <span class="badge ${badgeClass}" style="font-size: 0.65rem;">${source.status}</span>
          </div>
          <p style="font-size: var(--font-size-xs); color: var(--color-text-muted); line-height: 1.45; margin: 0 0 var(--space-3);">
            ${source.description}
          </p>
        </div>
      </div>
    `;
  }

  function renderJobCard(job) {
    const domainObj = getDomainById(job.domainId);

    return `
      <article class="job-card" data-job-id="${job.id}">
        <div class="job-header">
          <div>
            <div style="display: flex; align-items: center; gap: var(--space-2); margin-bottom: 4px;">
              <span class="badge badge-purple" style="font-size: 0.68rem;">${domainObj ? domainObj.name : "Engineering"}</span>
              <span class="badge badge-demo" style="font-size: 0.68rem;">${job.sourcePlatform}</span>
            </div>
            <h3 class="job-title" style="margin: 0; font-size: var(--font-size-lg); color: var(--color-text);">${job.title}</h3>
            <div class="job-company" style="font-weight: 600; color: var(--color-primary);">${job.company}</div>
          </div>
          <div style="text-align: right;">
            <span class="skill-tag" style="font-weight: 600;">${job.experienceLevel}</span>
          </div>
        </div>

        <div class="job-meta-pills">
          <span class="job-pill">📍 ${job.location}</span>
          <span class="job-pill">💼 ${job.jobType}</span>
          <span class="job-pill">🏢 ${job.arrangement}</span>
        </div>

        <p class="job-desc-snippet">${job.snippet}</p>

        <div style="display: flex; flex-wrap: wrap; gap: var(--space-2);">
          ${job.skills.map((s) => `<span class="skill-tag">${s}</span>`).join("")}
        </div>

        <div class="job-actions-row">
          <button
            type="button"
            class="btn btn-secondary btn-sm view-job-details-btn"
            data-job-id="${job.id}"
          >
            View Full Requirements
          </button>
          <button
            type="button"
            class="btn btn-primary btn-sm send-to-analyzer-btn"
            data-job-id="${job.id}"
          >
            ${ICONS.analyzer}
            Analyze with This Job
          </button>
        </div>
      </article>
    `;
  }

  function renderEmptyJobsHtml() {
    return `
      <div class="card empty-state" style="margin: var(--space-6) auto;">
        <div class="empty-state-icon">${ICONS.jobs}</div>
        <span class="badge badge-purple">No Exact Match</span>
        <h3>No Benchmark Roles Found</h3>
        <p style="color: var(--color-text-muted); font-size: var(--font-size-sm); max-width: 42ch;">
          No sample roles match your current filter criteria. Try resetting filters or using the Live External Search Launcher above.
        </p>
        <button type="button" class="btn btn-secondary btn-sm" id="empty-reset-btn">Reset All Filters</button>
      </div>
    `;
  }

  function bindFilterEvents() {
    const kwInput = document.getElementById("filter-keyword-input");
    const locInput = document.getElementById("filter-location-input");
    const domainSelect = document.getElementById("filter-domain-select");
    const roleSelect = document.getElementById("filter-role-select");
    const levelSelect = document.getElementById("filter-level-select");
    const arrSelect = document.getElementById("filter-arrangement-select");
    const typeSelect = document.getElementById("filter-type-select");
    const resetBtn = document.getElementById("reset-all-filters-btn");
    const emptyResetBtn = document.getElementById("empty-reset-btn");

    kwInput?.addEventListener("input", (e) => {
      keywordQuery = e.target.value;
      render();
    });

    locInput?.addEventListener("input", (e) => {
      locationQuery = e.target.value;
      render();
    });

    domainSelect?.addEventListener("change", (e) => {
      selectedDomain = e.target.value;
      selectedRole = "all";
      render();
    });

    roleSelect?.addEventListener("change", (e) => {
      selectedRole = e.target.value;
      render();
    });

    levelSelect?.addEventListener("change", (e) => {
      selectedLevel = e.target.value;
      render();
    });

    arrSelect?.addEventListener("change", (e) => {
      selectedArrangement = e.target.value;
      render();
    });

    typeSelect?.addEventListener("change", (e) => {
      selectedType = e.target.value;
      render();
    });

    function resetFilters() {
      keywordQuery = "";
      locationQuery = "";
      selectedDomain = "all";
      selectedRole = "all";
      selectedLevel = "all";
      selectedArrangement = "all";
      selectedType = "all";
      render();
    }

    resetBtn?.addEventListener("click", resetFilters);
    emptyResetBtn?.addEventListener("click", resetFilters);
  }

  function bindJobCardActions() {
    // Send to Resume Analyzer
    document.querySelectorAll(".send-to-analyzer-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const jobId = btn.dataset.jobId;
        const job = SAMPLE_MULTI_DOMAIN_JOBS.find((j) => j.id === jobId);
        if (job) {
          sessionStorage.setItem("intellimatch_target_job", job.fullDescription);
          sessionStorage.setItem("intellimatch_target_domain", job.domainId);
          sessionStorage.setItem("intellimatch_target_role", job.roleId);
          window.location.href = hrefFromRoot("pages/analyzer.html");
        }
      });
    });

    // View Details Modal
    document.querySelectorAll(".view-job-details-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const jobId = btn.dataset.jobId;
        const job = SAMPLE_MULTI_DOMAIN_JOBS.find((j) => j.id === jobId);
        if (job) {
          openJobDetailModal(job);
        }
      });
    });
  }

  function bindExternalLaunchers() {
    const extKwInput = document.getElementById("external-query-input");
    const extLocInput = document.getElementById("external-location-input");

    document.querySelectorAll(".launch-external-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const sourceId = btn.dataset.source;
        const query = extKwInput ? extKwInput.value.trim() : "Software Engineer";
        const loc = extLocInput ? extLocInput.value.trim() : "Remote";

        const sourceObj = JOB_SOURCES.find((s) => s.id === sourceId);
        if (sourceObj && sourceObj.buildSearchUrl) {
          const url = sourceObj.buildSearchUrl(query, loc);
          window.open(url, "_blank", "noopener,noreferrer");
        }
      });
    });
  }

  function openJobDetailModal(job) {
    const modalContainer = document.getElementById("job-detail-modal-container");
    if (!modalContainer) return;

    modalContainer.innerHTML = `
      <div class="modal-backdrop" id="job-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="job-modal-title">
        <div class="modal-dialog" style="max-width: 720px;">
          <div class="modal-header">
            <div>
              <span class="badge badge-purple" style="margin-bottom: 4px;">${job.company}</span>
              <h2 id="job-modal-title" class="modal-title">${job.title}</h2>
            </div>
            <button type="button" class="icon-button" id="close-job-modal-btn" aria-label="Close dialog">✕</button>
          </div>
          <div class="modal-body">
            <div style="display: flex; gap: var(--space-2); margin-bottom: var(--space-4); flex-wrap: wrap;">
              <span class="job-pill">📍 ${job.location}</span>
              <span class="job-pill">💼 ${job.jobType}</span>
              <span class="job-pill">🏢 ${job.arrangement}</span>
              <span class="badge badge-demo">Sample Listing</span>
            </div>
            <h4 style="font-size: var(--font-size-sm); margin-bottom: var(--space-2); color: var(--color-text);">Job Description &amp; Requirements:</h4>
            <pre style="background: #ffffff; padding: var(--space-4); border: 1px solid var(--color-border); border-radius: var(--radius-md); font-size: var(--font-size-xs); line-height: 1.6; white-space: pre-wrap; font-family: var(--font-sans); color: var(--color-text);">${job.fullDescription}</pre>
          </div>
          <div class="modal-footer" style="justify-content: space-between;">
            <button type="button" class="btn btn-secondary btn-sm" id="close-job-modal-bottom-btn">Close</button>
            <button type="button" class="btn btn-primary btn-sm" id="modal-send-analyzer-btn">
              ${ICONS.analyzer}
              Analyze in Resume Analyzer
            </button>
          </div>
        </div>
      </div>
    `;

    const closeBtn = document.getElementById("close-job-modal-btn");
    const closeBottomBtn = document.getElementById("close-job-modal-bottom-btn");
    const backdrop = document.getElementById("job-modal-backdrop");
    const sendBtn = document.getElementById("modal-send-analyzer-btn");

    function closeModal() {
      modalContainer.innerHTML = "";
    }

    closeBtn?.addEventListener("click", closeModal);
    closeBottomBtn?.addEventListener("click", closeModal);
    backdrop?.addEventListener("click", (e) => {
      if (e.target === backdrop) closeModal();
    });

    sendBtn?.addEventListener("click", () => {
      sessionStorage.setItem("intellimatch_target_job", job.fullDescription);
      sessionStorage.setItem("intellimatch_target_domain", job.domainId);
      sessionStorage.setItem("intellimatch_target_role", job.roleId);
      window.location.href = hrefFromRoot("pages/analyzer.html");
    });
  }

  render();
}
