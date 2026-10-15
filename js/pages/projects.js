import { CURATED_PROJECTS } from "../../data/projects.js";
import { ICONS } from "../components/icons.js";
import { hrefFromRoot } from "../navigation.js";

const SAVED_PROJECTS_KEY = "intellimatch_saved_projects";

function getSavedProjectIds() {
  try {
    const raw = localStorage.getItem(SAVED_PROJECTK_KEY_FALLBACK());
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch (e) {
    return new Set();
  }
}

function SAVED_PROJECTK_KEY_FALLBACK() {
  return SAVED_PROJECTS_KEY;
}

function saveProjectIds(set) {
  try {
    localStorage.setItem(SAVED_PROJECTS_KEY, JSON.stringify(Array.from(set)));
  } catch (e) {
    console.warn("Unable to save project bookmarks to localStorage", e);
  }
}

export function initProjectsPage() {
  const root = document.getElementById("projects-root");
  if (!root) return;

  const urlParams = new URLSearchParams(window.location.search);
  let selectedDomain = urlParams.get("domain") || "all";
  let selectedDifficulty = "all";
  let searchQuery = "";
  let viewMode = "all"; // 'all' or 'saved'

  const savedIds = getSavedProjectIds();

  const domainOptions = [
    { id: "all", name: "All Domains" },
    { id: "software-dev", name: "Software Development" },
    { id: "data-analytics", name: "Data and Analytics" },
    { id: "ai-ml", name: "AI & Machine Learning" },
    { id: "cloud-devops", name: "Cloud & DevOps" },
    { id: "cybersecurity", name: "Cybersecurity" },
  ];

  function render() {
    const filtered = CURATED_PROJECTS.filter((proj) => {
      // Saved filter
      if (viewMode === "saved" && !savedIds.has(proj.id)) {
        return false;
      }

      // Domain filter
      if (selectedDomain !== "all" && proj.domainId !== selectedDomain) {
        return false;
      }

      // Difficulty filter
      if (
        selectedDifficulty !== "all" &&
        proj.difficulty.toLowerCase() !== selectedDifficulty.toLowerCase()
      ) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = proj.title.toLowerCase().includes(q);
        const matchesDeliv = proj.deliverable.toLowerCase().includes(q);
        const matchesDomain = proj.domain.toLowerCase().includes(q);
        const matchesSkills = proj.skills.some((s) => s.toLowerCase().includes(q));
        const matchesHigh = proj.highlights.toLowerCase().includes(q);
        return matchesTitle || matchesDeliv || matchesDomain || matchesSkills || matchesHigh;
      }

      return true;
    });

    root.innerHTML = `
      <div class="page-header-banner">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: var(--space-4);">
          <div>
            <h1>Projects Hub &amp; Portfolio Lab</h1>
            <p>Curated engineering blueprints categorized by domain and difficulty to build concrete, portfolio-ready proof of competence.</p>
          </div>
          <div style="display: flex; gap: var(--space-2); align-items: center; flex-wrap: wrap;">
            <button
              type="button"
              class="tab-btn ${viewMode === "all" ? "is-active" : ""}"
              id="view-all-tab"
            >
              All Blueprints (${CURATED_PROJECTS.length})
            </button>
            <button
              type="button"
              class="tab-btn ${viewMode === "saved" ? "is-active" : ""}"
              id="view-saved-tab"
            >
              ★ Saved Blueprints (${savedIds.size})
            </button>
          </div>
        </div>
      </div>

      <!-- Filter Controls Strip -->
      <div class="card" style="margin-bottom: var(--space-6); padding: var(--space-4) var(--space-5);">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--space-4);">
          <!-- Difficulty Pills -->
          <div style="display: flex; align-items: center; gap: var(--space-2); flex-wrap: wrap;">
            <span style="font-size: var(--font-size-xs); font-weight: 700; color: var(--color-text-muted); text-transform: uppercase;">
              Difficulty:
            </span>
            <button type="button" class="tab-btn diff-pill-btn ${selectedDifficulty === "all" ? "is-active" : ""}" data-diff="all">All</button>
            <button type="button" class="tab-btn diff-pill-btn ${selectedDifficulty === "beginner" ? "is-active" : ""}" data-diff="beginner">Beginner</button>
            <button type="button" class="tab-btn diff-pill-btn ${selectedDifficulty === "intermediate" ? "is-active" : ""}" data-diff="intermediate">Intermediate</button>
            <button type="button" class="tab-btn diff-pill-btn ${selectedDifficulty === "advanced" ? "is-active" : ""}" data-diff="advanced">Advanced</button>
          </div>

          <!-- Domain Select & Search Query -->
          <div style="display: flex; align-items: center; gap: var(--space-3); flex-wrap: wrap; flex: 1; justify-content: flex-end;">
            <div style="width: 200px;">
              <select id="project-domain-select" class="select" style="padding: 0.45rem 0.85rem; font-size: var(--font-size-xs);">
                ${domainOptions.map((opt) => `
                  <option value="${opt.id}" ${selectedDomain === opt.id ? "selected" : ""}>${opt.name}</option>
                `).join("")}
              </select>
            </div>
            <div style="min-width: 220px; max-width: 320px; flex: 1;">
              <input
                type="text"
                id="project-search-input"
                class="input"
                placeholder="Search skills or title..."
                value="${searchQuery}"
                style="padding: 0.45rem 0.85rem; font-size: var(--font-size-xs);"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Active Filters Status Bar -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4); font-size: var(--font-size-xs); color: var(--color-text-muted);">
        <span>Showing <strong>${filtered.length}</strong> project blueprints</span>
        ${(selectedDomain !== "all" || selectedDifficulty !== "all" || searchQuery.trim() || viewMode === "saved") ? `
          <button type="button" class="btn btn-ghost btn-sm" id="reset-filters-btn" style="padding: 0 4px; font-size: var(--font-size-xs);">
            Reset All Filters ✕
          </button>
        ` : ""}
      </div>

      <!-- Projects Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: var(--space-5);">
        ${filtered.length === 0 ? `
          <div class="card empty-state" style="grid-column: 1 / -1; padding: var(--space-8); text-align: center;">
            <h3>No project blueprints found</h3>
            <p style="color: var(--color-text-muted);">
              ${viewMode === "saved" ? "You haven't saved any projects yet. Star a project to bookmark it here!" : "Try adjusting your search terms or filter criteria."}
            </p>
            <button type="button" class="btn btn-secondary btn-sm" id="empty-reset-btn">View All Blueprints</button>
          </div>
        ` : filtered.map((proj) => {
          const isSaved = savedIds.has(proj.id);
          return `
            <article class="card" style="display: flex; flex-direction: column; justify-content: space-between; position: relative;">
              <div class="card-body" style="padding: var(--space-5);">
                <!-- Top Badges Row -->
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-3);">
                  <div style="display: flex; gap: var(--space-2); align-items: center;">
                    <span class="badge ${proj.difficultyBadge || "badge-purple"}" style="font-size: 0.72rem;">
                      ${proj.difficulty}
                    </span>
                    <span style="font-size: 0.72rem; color: var(--color-text-muted); font-weight: 600;">
                      ⏱ ${proj.estimatedHours}
                    </span>
                  </div>
                  <!-- Bookmark Button -->
                  <button
                    type="button"
                    class="btn btn-ghost btn-sm toggle-save-btn"
                    data-id="${proj.id}"
                    title="${isSaved ? "Remove from saved" : "Save project"}"
                    style="padding: 2px 8px; font-size: 0.8rem; color: ${isSaved ? "var(--color-primary)" : "var(--color-text-muted)"};"
                  >
                    ${isSaved ? "★ Saved" : "☆ Save"}
                  </button>
                </div>

                <!-- Title & Domain -->
                <h3 style="margin: 0 0 var(--space-2); font-size: var(--font-size-md); font-family: var(--font-display); line-height: 1.4;">
                  ${proj.title}
                </h3>
                <span style="font-size: 0.72rem; color: var(--color-primary); font-weight: 700; display: block; margin-bottom: var(--space-3);">
                  ${proj.domain}
                </span>

                <!-- Concrete Deliverable -->
                <p style="font-size: var(--font-size-xs); color: var(--color-text); line-height: 1.55; margin-bottom: var(--space-4); background: var(--color-surface-subtle); padding: var(--space-3); border-radius: var(--radius-sm); border: 1px solid var(--color-border-subtle);">
                  <strong>Deliverable:</strong> ${proj.deliverable}
                </p>

                <!-- Prerequisites & Why Recruiters Care -->
                <div style="margin-bottom: var(--space-4); font-size: 0.72rem; color: var(--color-text-muted); line-height: 1.5;">
                  <div style="margin-bottom: 4px;"><strong>Prerequisites:</strong> ${proj.prerequisites}</div>
                  <div><strong>Portfolio Impact:</strong> ${proj.highlights}</div>
                </div>

                <!-- Skill Tags -->
                <div style="display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: var(--space-4);">
                  ${proj.skills.map((s) => `
                    <span class="badge badge-purple" style="font-size: 0.68rem; padding: 2px 6px;">
                      ${s}
                    </span>
                  `).join("")}
                </div>
              </div>

              <!-- Action Footer -->
              <div class="card-footer" style="padding: var(--space-3) var(--space-5); background: var(--color-surface-subtle); border-top: 1px solid var(--color-border-subtle); display: flex; justify-content: space-between; align-items: center; gap: var(--space-2);">
                <a
                  class="btn btn-secondary btn-sm"
                  href="${hrefFromRoot(`pages/roadmaps.html?domain=${proj.domainId}`)}"
                  title="View curriculum stage in Roadmaps"
                >
                  View Roadmap
                </a>
                <a
                  class="btn btn-primary btn-sm"
                  href="${hrefFromRoot("pages/analyzer.html")}"
                  title="Benchmark qualifications in Analyzer"
                >
                  Benchmark in Analyzer
                </a>
              </div>
            </article>
          `;
        }).join("")}
      </div>
    `;

    bindEvents();
  }

  function bindEvents() {
    // Mode toggles
    root.querySelector("#view-all-tab")?.addEventListener("click", () => {
      viewMode = "all";
      render();
    });
    root.querySelector("#view-saved-tab")?.addEventListener("click", () => {
      viewMode = "saved";
      render();
    });

    // Difficulty filter
    root.querySelectorAll(".diff-pill-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        selectedDifficulty = btn.dataset.diff;
        render();
      });
    });

    // Domain select
    const domainSelect = root.querySelector("#project-domain-select");
    if (domainSelect) {
      domainSelect.addEventListener("change", (e) => {
        selectedDomain = e.target.value;
        render();
      });
    }

    // Search input
    const searchInput = root.querySelector("#project-search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        searchQuery = e.target.value;
        render();
        const updated = root.querySelector("#project-search-input");
        if (updated) {
          updated.focus();
          updated.setSelectionRange(searchQuery.length, searchQuery.length);
        }
      });
    }

    // Reset buttons
    root.querySelector("#reset-filters-btn")?.addEventListener("click", resetAll);
    root.querySelector("#empty-reset-btn")?.addEventListener("click", resetAll);

    function resetAll() {
      selectedDomain = "all";
      selectedDifficulty = "all";
      searchQuery = "";
      viewMode = "all";
      render();
    }

    // Bookmark / Save toggles
    root.querySelectorAll(".toggle-save-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        if (savedIds.has(id)) {
          savedIds.delete(id);
        } else {
          savedIds.add(id);
        }
        saveProjectIds(savedIds);
        render();
      });
    });
  }

  render();
}

