import { ROADMAP_DOMAINS, ROADMAP_YEARS, getRoadmapForDomainAndYear } from "../../data/roadmaps.js";
import { ICONS } from "../components/icons.js";
import { hrefFromRoot } from "../navigation.js";

const PROGRESS_STORAGE_KEY = "intellimatch_roadmap_progress";

function getCompletedMilestones() {
  try {
    const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch (e) {
    return new Set();
  }
}

function saveCompletedMilestones(set) {
  try {
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(Array.from(set)));
  } catch (e) {
    console.warn("Unable to save progress to localStorage", e);
  }
}

export function initRoadmapsPage() {
  const root = document.getElementById("roadmaps-root");
  if (!root) return;

  const urlParams = new URLSearchParams(window.location.search);
  let selectedDomain = urlParams.get("domain") || "software-dev";
  let selectedYear = urlParams.get("year") || "year-1";
  let searchQuery = "";

  // Ensure domain exists
  if (!ROADMAP_DOMAINS.some((d) => d.id === selectedDomain)) {
    selectedDomain = "software-dev";
  }

  const completedSet = getCompletedMilestones();

  function render() {
    const { domain, milestones, yearMeta } = getRoadmapForDomainAndYear(selectedDomain, selectedYear);

    // Filter milestones by search query if user typed anything
    const filteredMilestones = milestones.filter((m) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        m.title.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        m.skills.some((s) => s.toLowerCase().includes(q)) ||
        m.task.toLowerCase().includes(q)
      );
    });

    // Compute progress for this specific year
    const totalCount = milestones.length;
    const completedCount = milestones.filter((m) => completedSet.has(m.id)).length;
    const progressPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    root.innerHTML = `
      <div class="page-header-banner">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: var(--space-4);">
          <div>
            <h1>Domains &amp; Learning Roadmaps</h1>
            <p>Non-linear, multi-year engineering curricula designed to guide students from foundational syntax to production-grade architecture.</p>
          </div>
          <div style="display: flex; gap: var(--space-2); align-items: center; flex-wrap: wrap;">
            <span class="badge badge-connected" title="Curated multi-year curricula">
              <span class="status-dot"></span>
              5 Structured Engineering Tracks
            </span>
            <a class="btn btn-secondary btn-sm" href="${hrefFromRoot("pages/projects.html")}">
              ${ICONS.project}
              Explore Projects Hub
            </a>
          </div>
        </div>
      </div>

      <!-- Domain Selection Strip -->
      <div class="card" style="margin-bottom: var(--space-6); padding: var(--space-3) var(--space-5);">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: var(--space-3);">
          <div style="font-size: var(--font-size-xs); font-weight: 700; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">
            Choose Engineering Domain:
          </div>
          <div class="tab-list" role="tablist" style="display: flex; gap: var(--space-2); flex-wrap: wrap;">
            ${ROADMAP_DOMAINS.map((d) => `
              <button
                type="button"
                class="tab-btn domain-picker-tab ${d.id === selectedDomain ? "is-active" : ""}"
                data-domain="${d.id}"
                role="tab"
                aria-selected="${d.id === selectedDomain ? "true" : "false"}"
              >
                ${d.name}
              </button>
            `).join("")}
          </div>
        </div>
      </div>

      <!-- Year Stage Selector and Search Controls -->
      <div class="card" style="margin-bottom: var(--space-6); padding: var(--space-5);">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--space-4); margin-bottom: var(--space-4);">
          <!-- Year Navigation Tabs -->
          <div style="display: flex; gap: var(--space-2); flex-wrap: wrap;">
            ${ROADMAP_YEARS.map((y) => `
              <button
                type="button"
                class="tab-btn year-picker-tab ${y.id === selectedYear ? "is-active" : ""}"
                data-year="${y.id}"
              >
                <strong>${y.stage}</strong>
                <span style="font-size: 0.72rem; opacity: 0.85; margin-left: 4px;">(${y.id.replace("year-", "Y")})</span>
              </button>
            `).join("")}
          </div>

          <!-- Quick Search Input -->
          <div style="min-width: 240px; flex: 1; max-width: 380px;">
            <input
              type="text"
              id="roadmap-search-input"
              class="input"
              placeholder="Search concepts (e.g. Docker, Redis, SQL)..."
              value="${searchQuery}"
              style="padding: 0.45rem 0.85rem; font-size: var(--font-size-xs);"
            />
          </div>
        </div>

        <!-- Stage Meta and Progress Strip -->
        <div style="background: var(--color-surface-subtle); padding: var(--space-4) var(--space-5); border-radius: var(--radius-md); border: 1px solid var(--color-border-subtle); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--space-3);">
          <div>
            <div style="display: flex; align-items: center; gap: var(--space-2); margin-bottom: 4px;">
              <span class="badge badge-purple">${yearMeta.label}</span>
              <span style="font-size: var(--font-size-xs); font-weight: 600; color: var(--color-text);">
                ${domain.name}
              </span>
            </div>
            <p style="margin: 0; font-size: var(--font-size-xs); color: var(--color-text-muted); max-width: 65ch;">
              ${domain.overview}
            </p>
          </div>

          <div style="min-width: 200px;">
            <div style="display: flex; justify-content: space-between; font-size: 0.72rem; font-weight: 600; color: var(--color-text); margin-bottom: 6px;">
              <span>Curriculum Progress</span>
              <span>${completedCount} / ${totalCount} Done (${progressPct}%)</span>
            </div>
            <div style="width: 100%; height: 8px; background: rgba(0,0,0,0.08); border-radius: 999px; overflow: hidden;">
              <div style="width: ${progressPct}%; height: 100%; background: linear-gradient(90deg, var(--color-primary), var(--color-accent)); transition: width 300ms ease;"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Milestones List -->
      <div style="display: flex; flex-direction: column; gap: var(--space-4);">
        ${filteredMilestones.length === 0 ? `
          <div class="card empty-state" style="padding: var(--space-8); text-align: center;">
            <h3>No milestones match "${searchQuery}"</h3>
            <p style="color: var(--color-text-muted);">Try a different keyword or clear the search to view all ${yearMeta.label} competencies.</p>
            <button type="button" class="btn btn-secondary btn-sm" id="clear-search-btn">Clear Search</button>
          </div>
        ` : filteredMilestones.map((milestone, idx) => {
          const isDone = completedSet.has(milestone.id);
          return `
            <article class="card" style="border-left: 4px solid ${isDone ? "var(--color-success)" : "var(--color-primary)"};">
              <div class="card-body" style="padding: var(--space-5) var(--space-6);">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: var(--space-3); margin-bottom: var(--space-3);">
                  <div style="display: flex; align-items: center; gap: var(--space-3);">
                    <span style="display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; border-radius: 50%; background: ${isDone ? "var(--color-success-light)" : "var(--color-primary-light)"}; color: ${isDone ? "var(--color-success)" : "var(--color-primary)"}; font-weight: 700; font-size: 0.8rem;">
                      ${isDone ? "✓" : idx + 1}
                    </span>
                    <div>
                      <h3 style="margin: 0; font-size: var(--font-size-md); color: var(--color-text);">
                        ${milestone.title}
                      </h3>
                      <span style="font-size: 0.72rem; color: var(--color-text-muted);">
                        ${milestone.timeframe}
                      </span>
                    </div>
                  </div>

                  <!-- Completion Checkbox Action -->
                  <div>
                    <label style="display: inline-flex; align-items: center; gap: 8px; font-size: var(--font-size-xs); font-weight: 600; cursor: pointer; user-select: none;">
                      <input
                        type="checkbox"
                        class="milestone-toggle-check"
                        data-id="${milestone.id}"
                        ${isDone ? "checked" : ""}
                        style="width: 16px; height: 16px; cursor: pointer;"
                      />
                      <span>${isDone ? "Completed" : "Mark as Complete"}</span>
                    </label>
                  </div>
                </div>

                <p style="font-size: var(--font-size-sm); color: var(--color-text-muted); line-height: 1.6; margin-bottom: var(--space-4);">
                  ${milestone.description}
                </p>

                <!-- Core Skills Tag Cloud -->
                <div style="margin-bottom: var(--space-4);">
                  <span style="font-size: 0.68rem; font-weight: 700; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 6px;">
                    Required Competencies:
                  </span>
                  <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                    ${milestone.skills.map((s) => `
                      <span class="badge badge-purple" style="font-size: 0.72rem; padding: 2px 8px;">
                        ${s}
                      </span>
                    `).join("")}
                  </div>
                </div>

                <!-- Capstone Task Deliverable Block -->
                <div style="background: var(--color-surface-subtle); padding: var(--space-3) var(--space-4); border-radius: var(--radius-sm); border: 1px dashed var(--color-border); margin-bottom: var(--space-4);">
                  <div style="display: flex; align-items: flex-start; gap: var(--space-2);">
                    <div style="color: var(--color-accent); font-weight: 700; font-size: 0.9rem;">📌</div>
                    <div>
                      <strong style="font-size: var(--font-size-xs); color: var(--color-text);">Hands-On Milestone Task:</strong>
                      <p style="margin: 2px 0 0; font-size: var(--font-size-xs); color: var(--color-text-muted); line-height: 1.5;">
                        ${milestone.task}
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Action Footer -->
                <div style="display: flex; justify-content: flex-end; gap: var(--space-2); flex-wrap: wrap;">
                  <a class="btn btn-secondary btn-sm" href="${hrefFromRoot(`pages/projects.html?domain=${selectedDomain}`)}">
                    Find Related Projects →
                  </a>
                  <a class="btn btn-primary btn-sm" href="${hrefFromRoot("pages/analyzer.html")}">
                    Benchmark Resume on This Track
                  </a>
                </div>
              </div>
            </article>
          `;
        }).join("")}
      </div>
    `;

    bindEvents();
  }

  function bindEvents() {
    // Domain selection
    root.querySelectorAll(".domain-picker-tab").forEach((btn) => {
      btn.addEventListener("click", () => {
        selectedDomain = btn.dataset.domain;
        render();
      });
    });

    // Year selection
    root.querySelectorAll(".year-picker-tab").forEach((btn) => {
      btn.addEventListener("click", () => {
        selectedYear = btn.dataset.year;
        render();
      });
    });

    // Search input
    const searchInput = root.querySelector("#roadmap-search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        searchQuery = e.target.value;
        render();
        // Restore focus to input
        const updatedInput = root.querySelector("#roadmap-search-input");
        if (updatedInput) {
          updatedInput.focus();
          updatedInput.setSelectionRange(searchQuery.length, searchQuery.length);
        }
      });
    }

    // Clear search
    const clearBtn = root.querySelector("#clear-search-btn");
    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        searchQuery = "";
        render();
      });
    }

    // Toggle milestone completion
    root.querySelectorAll(".milestone-toggle-check").forEach((chk) => {
      chk.addEventListener("change", (e) => {
        const id = e.target.dataset.id;
        if (e.target.checked) {
          completedSet.add(id);
        } else {
          completedSet.delete(id);
        }
        saveCompletedMilestones(completedSet);
        render();
      });
    });
  }

  render();
}

