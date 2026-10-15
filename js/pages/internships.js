import { el, svgIcon } from "../utils/dom.js";
import { ICONS } from "../components/icons.js";
import { hrefFromRoot } from "../navigation.js";
import { ENGINEERING_DOMAINS, getRolesForDomain, getDomainById, findRoleById } from "../../data/jobRoles.js";
import { JOB_SOURCES, SAMPLE_MULTI_DOMAIN_JOBS } from "../../data/jobSources.js";

export function initInternshipsPage() {
  const root = document.getElementById("internships-root");
  if (!root) return;

  // Filter state (defaults optimized for Internships & Early Career)
  let keywordQuery = "";
  let locationQuery = "";
  let selectedDomain = "all";
  let selectedRole = "all";
  let selectedLevel = "all";
  let selectedArrangement = "all";
  let selectedType = "all"; // 'all', 'internship', 'full-time'

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
            <h1>Internships &amp; Opportunities Hub</h1>
            <p>Explore student internships, graduate traineeships, and early career roles across 10 engineering domains, or launch verified external platform searches.</p>
          </div>
          <div>
            <span class="badge badge-connected" title="Verified multi-source listings">
              <span class="status-dot"></span>
              Live External Platform Launchers Ready
            </span>
          </div>
        </div>
      </div>

      <!-- Quick Opportunity Type Segment Tabs -->
      <div class="card" style="margin-bottom: var(--space-6); padding: var(--space-3) var(--space-5);">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: var(--space-3);">
          <div style="font-size: var(--font-size-xs); font-weight: 700; color: var(--color-text-muted); text-transform: uppercase;">
            Filter by Program Type:
          </div>
          <div style="display: flex; gap: var(--space-2); flex-wrap: wrap;">
            <button
              type="button"
              class="tab-btn prog-tab-btn ${selectedType === "all" ? "is-active" : ""}"
              data-type="all"
            >
              All Opportunities (${SAMPLE_MULTI_DOMAIN_JOBS.length})
            </button>
            <button
              type="button"
              class="tab-btn prog-tab-btn ${selectedType === "internship" ? "is-active" : ""}"
              data-type="internship"
            >
              🎓 Student Internships &amp; Traineeships
            </button>
            <button
              type="button"
              class="tab-btn prog-tab-btn ${selectedType === "full-time" ? "is-active" : ""}"
              data-type="full-time"
            >
              💼 Full-Time Early Career
            </button>
          </div>
        </div>
      </div>

      <!-- External Search Launchers Strip -->
      <div class="card" style="margin-bottom: var(--space-6); background: linear-gradient(135deg, #ffffff 0%, var(--color-primary-light) 160%); border-color: rgba(101, 72, 232, 0.25);">
        <div class="card-body" style="padding: var(--space-5);">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--space-2); margin-bottom: var(--space-3);">
            <div style="display: flex; align-items: center; gap: var(--space-2);">
              <span class="badge badge-open-search">Real-Time Aggregators</span>
              <h3 style="margin: 0; font-size: var(--font-size-md); color: var(--color-text);">
                Launch Live Searches on Verified Platforms
              </h3>
            </div>
            <span style="font-size: var(--font-size-xs); color: var(--color-text-muted);">
              Opens actual current listings in a new tab.
            </span>
          </div>
          <div style="display: flex; flex-wrap: wrap; gap: var(--space-3); align-items: center;">
            <div style="flex: 1; min-width: 200px;">
              <input
                type="text"
                id="external-query-input"
                class="input"
                placeholder="Role or skills (e.g. Frontend Intern, Cloud, Python)..."
                value="${keywordQuery || 'Software Engineer Intern'}"
              />
            </div>
            <div style="width: 180px;">
              <input
                type="text"
                id="external-location-input"
                class="input"
                placeholder="Location (e.g. Remote, Bangalore, US)..."
                value="${locationQuery || 'Remote'}"
              />
            </div>
            <div style="display: flex; gap: var(--space-2); flex-wrap: wrap;">
              <button type="button" class="btn btn-secondary btn-sm launch-external-btn" data-source="internshala">
                Search Internshala ↗
              </button>
              <button type="button" class="btn btn-secondary btn-sm launch-external-btn" data-source="linkedin">
                Search LinkedIn ↗
              </button>
              <button type="button" class="btn btn-secondary btn-sm launch-external-btn" data-source="naukri">
                Search Naukri ↗
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Filters Panel -->
      <div class="card" style="margin-bottom: var(--space-6);">
        <div class="card-header" style="background: var(--color-surface-subtle); padding: var(--space-4) var(--space-6);">
          <h3 class="card-title" style="font-size: var(--font-size-md);">Benchmark Opportunities Directory</h3>
          <span style="font-size: var(--font-size-xs); color: var(--color-text-muted);">
            Showing ${filteredJobs.length} matching positions
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
                placeholder="Search by title, skill, or keyword (e.g. React, Docker, SQL, PyTorch)..."
                value="${keywordQuery}"
              />
            </div>
            <div class="form-group" style="margin: 0;">
              <label class="form-label" for="filter-location-input">Location</label>
              <input
                type="text"
                id="filter-location-input"
                class="input"
                placeholder="Location (e.g. Remote, Chicago, Hybrid)..."
                value="${locationQuery}"
              />
            </div>
          </div>

          <!-- Bottom Row: Domain, Role, Level, Arrangement -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)) auto; gap: var(--space-3); align-items: flex-end;">
            <div class="form-group" style="margin: 0;">
              <label class="form-label" for="filter-domain-select">Domain</label>
              <select id="filter-domain-select" class="select">
                <option value="all">All 10 Domains</option>
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
              <label class="form-label" for="filter-level-select">Experience Level</label>
              <select id="filter-level-select" class="select">
                <option value="all" ${selectedLevel === "all" ? "selected" : ""}>All Levels</option>
                <option value="internship" ${selectedLevel === "internship" ? "selected" : ""}>Internship</option>
                <option value="entry" ${selectedLevel === "entry" ? "selected" : ""}>Entry-Level</option>
                <option value="mid" ${selectedLevel === "mid" ? "selected" : ""}>Mid-Level</option>
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

            <div>
              <button type="button" class="btn btn-ghost btn-sm" id="reset-filters-btn" style="white-space: nowrap;">
                Reset Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Job List -->
      <div style="display: flex; flex-direction: column; gap: var(--space-4);">
        ${filteredJobs.length === 0 ? `
          <div class="card empty-state" style="padding: var(--space-8); text-align: center;">
            <h3>No roles matched your current filters</h3>
            <p style="color: var(--color-text-muted);">Try broadening your keywords or removing domain constraints.</p>
            <button type="button" class="btn btn-secondary btn-sm" id="empty-clear-btn">Clear Filters</button>
          </div>
        ` : filteredJobs.map((job) => `
          <article class="card" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div class="card-body" style="padding: var(--space-5) var(--space-6);">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: var(--space-3); margin-bottom: var(--space-2);">
                <div>
                  <div style="display: flex; align-items: center; gap: var(--space-2); margin-bottom: 4px; flex-wrap: wrap;">
                    <span class="badge ${job.jobType === "Internship" ? "badge-success" : "badge-purple"}" style="font-size: 0.72rem;">
                      ${job.jobType}
                    </span>
                    <span class="badge badge-surface" style="font-size: 0.72rem;">
                      ${job.experienceLevel}
                    </span>
                    <span class="badge badge-surface" style="font-size: 0.72rem;">
                      📍 ${job.location} • ${job.arrangement}
                    </span>
                  </div>
                  <h3 style="margin: 0 0 2px; font-size: var(--font-size-md); font-family: var(--font-display);">
                    ${job.title}
                  </h3>
                  <div style="font-size: var(--font-size-xs); color: var(--color-text-muted);">
                    <strong>${job.company}</strong> • <span style="color: var(--color-primary); font-weight: 600;">${job.domainName}</span> • Posted ${job.postedDate}
                  </div>
                </div>

                <div style="text-align: right;">
                  <span style="font-size: var(--font-size-xs); font-weight: 700; color: var(--color-text); display: block;">
                    ${job.salaryRange}
                  </span>
                  <span style="font-size: 0.72rem; color: var(--color-text-muted);">
                    Source: ${job.source}
                  </span>
                </div>
              </div>

              <p style="font-size: var(--font-size-xs); color: var(--color-text-muted); line-height: 1.55; margin-bottom: var(--space-4);">
                ${job.snippet}
              </p>

              <!-- Skills Tags -->
              <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: var(--space-3);">
                ${job.skills.map((s) => `
                  <span class="badge badge-purple" style="font-size: 0.72rem; padding: 2px 8px;">
                    ${s}
                  </span>
                `).join("")}
              </div>
            </div>

            <!-- Card Action Footer -->
            <div class="card-footer" style="padding: var(--space-3) var(--space-6); background: var(--color-surface-subtle); border-top: 1px solid var(--color-border-subtle); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--space-2);">
              <span style="font-size: 0.72rem; color: var(--color-text-muted);">
                Benchmark your resume against this posting's exact skill requirements.
              </span>
              <div style="display: flex; gap: var(--space-2);">
                <button
                  type="button"
                  class="btn btn-secondary btn-sm send-to-analyzer-btn"
                  data-job-id="${job.id}"
                >
                  Analyze with This Job →
                </button>
              </div>
            </div>
          </article>
        `).join("")}
      </div>
    `;

    bindEvents();
  }

  function bindEvents() {
    // Program type tabs
    root.querySelectorAll(".prog-tab-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        selectedType = btn.dataset.type;
        render();
      });
    });

    // Inputs
    root.querySelector("#filter-keyword-input")?.addEventListener("input", (e) => {
      keywordQuery = e.target.value;
      render();
    });

    root.querySelector("#filter-location-input")?.addEventListener("input", (e) => {
      locationQuery = e.target.value;
      render();
    });

    root.querySelector("#filter-domain-select")?.addEventListener("change", (e) => {
      selectedDomain = e.target.value;
      selectedRole = "all";
      render();
    });

    root.querySelector("#filter-role-select")?.addEventListener("change", (e) => {
      selectedRole = e.target.value;
      render();
    });

    root.querySelector("#filter-level-select")?.addEventListener("change", (e) => {
      selectedLevel = e.target.value;
      render();
    });

    root.querySelector("#filter-arrangement-select")?.addEventListener("change", (e) => {
      selectedArrangement = e.target.value;
      render();
    });

    // Reset
    const reset = () => {
      keywordQuery = "";
      locationQuery = "";
      selectedDomain = "all";
      selectedRole = "all";
      selectedLevel = "all";
      selectedArrangement = "all";
      selectedType = "all";
      render();
    };
    root.querySelector("#reset-filters-btn")?.addEventListener("click", reset);
    root.querySelector("#empty-clear-btn")?.addEventListener("click", reset);

    // External search launcher buttons
    root.querySelectorAll(".launch-external-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const sourceKey = btn.dataset.source;
        const source = JOB_SOURCES.find((s) => s.id === sourceKey);
        if (!source) return;

        const qInput = root.querySelector("#external-query-input");
        const lInput = root.querySelector("#external-location-input");
        const qVal = qInput?.value || keywordQuery || "Software Engineer Intern";
        const lVal = lInput?.value || locationQuery || "Remote";

        const url = source.searchUrlTemplate
          .replace("{query}", encodeURIComponent(qVal))
          .replace("{location}", encodeURIComponent(lVal));

        window.open(url, "_blank", "noopener,noreferrer");
      });
    });

    // Transfer job into Resume Analyzer
    root.querySelectorAll(".send-to-analyzer-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const jobId = btn.dataset.jobId;
        const job = SAMPLE_MULTI_DOMAIN_JOBS.find((j) => j.id === jobId);
        if (!job) return;

        const importedData = {
          roleTitle: job.title,
          company: job.company,
          domainId: job.domainId,
          text: `${job.title} at ${job.company}\n\nRequired Skills: ${job.skills.join(", ")}\n\nDescription: ${job.snippet}`,
        };

        try {
          sessionStorage.setItem("intellimatch_imported_job", JSON.stringify(importedData));
        } catch (e) {
          console.warn("Unable to save imported job to sessionStorage", e);
        }

        window.location.href = hrefFromRoot("pages/analyzer.html");
      });
    });
  }

  render();
}

