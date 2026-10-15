import { ROADMAP_DOMAINS, ROADMAP_YEARS, getRoadmapForDomainAndYear } from "../../data/roadmaps.js";
import { CURATED_PROJECTS, getProjectsByFilter } from "../../data/projects.js";
import { MATCHING_DEMO_SCENARIOS, getScenarioById } from "../../data/matchingDemo.js";
import { ENGINEERING_DOMAINS } from "../../data/jobRoles.js";
import { JOB_SOURCES, SAMPLE_MULTI_DOMAIN_JOBS } from "../../data/jobSources.js";
import { hrefFromRoot } from "../navigation.js";

export function initHomePage() {
  initDomainDirectoryFilter();
  initRoadmapPreview();
  initProjectLab();
  initMatchingDemo();
  initSmoothScrollLinks();
}

/**
 * 1. Technology Careers Directory Filter
 */
function initDomainDirectoryFilter() {
  const container = document.getElementById("domains-directory-container");
  const tabBtns = document.querySelectorAll(".domain-category-tab");
  if (!container || tabBtns.length === 0) return;

  const domainCategoryMap = {
    all: null,
    software: ["software-dev", "emerging-tech"],
    data: ["data-analytics", "ai-ml"],
    cloud: ["cloud-devops", "cybersecurity"],
    systems: ["networking-it", "qa-testing", "embedded-systems", "enterprise-tech"],
  };

  function renderDomains(categoryKey = "all") {
    const allowedIds = domainCategoryMap[categoryKey];
    const filtered = allowedIds
      ? ENGINEERING_DOMAINS.filter((d) => allowedIds.includes(d.id))
      : ENGINEERING_DOMAINS;

    container.innerHTML = filtered
      .map((domain) => {
        const topRoles = domain.roles.slice(0, 5);
        return `
          <article class="domain-item-card" data-domain-id="${domain.id}">
            <div>
              <div class="domain-item-header">
                <div class="domain-icon-badge" aria-hidden="true">
                  ${getDomainEmoji(domain.id)}
                </div>
                <div>
                  <h3>${domain.name}</h3>
                  <span style="font-size: 0.72rem; color: var(--color-primary); font-weight: 700;">
                    ${domain.roles.length} Specialized Roles
                  </span>
                </div>
              </div>
              <p>${domain.description}</p>
              <div class="domain-roles-chips">
                ${topRoles.map((r) => `<span class="domain-role-tag">${r.title}</span>`).join("")}
                ${domain.roles.length > 5 ? `<span class="domain-role-tag" style="background: var(--color-primary-light); color: var(--color-primary); font-weight: 700;">+${domain.roles.length - 5} more</span>` : ""}
              </div>
            </div>
            <div style="display: flex; gap: var(--space-2); margin-top: var(--space-3); padding-top: var(--space-3); border-top: 1px solid var(--color-border-subtle);">
              <a class="btn btn-secondary btn-sm" href="${hrefFromRoot("pages/analyzer.html")}" style="flex: 1;">
                Analyze Resume
              </a>
              <a class="btn btn-primary btn-sm" href="${hrefFromRoot("pages/internships.html")}" style="flex: 1;">
                Find Roles
              </a>
            </div>
          </article>
        `;
      })
      .join("");
  }

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabBtns.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      const category = btn.dataset.category || "all";
      renderDomains(category);
    });
  });

  renderDomains("all");
}

function getDomainEmoji(domainId) {
  const emojiMap = {
    "software-dev": "💻",
    "data-analytics": "📊",
    "ai-ml": "🧠",
    "cloud-devops": "☁️",
    cybersecurity: "🛡️",
    "networking-it": "🌐",
    "qa-testing": "🧪",
    "embedded-systems": "⚡",
    "enterprise-tech": "🏢",
    "emerging-tech": "✨",
  };
  return emojiMap[domainId] || "💼";
}

/**
 * 2. Interactive Learning Roadmap Preview
 */
function initRoadmapPreview() {
  const container = document.getElementById("roadmap-milestones-target");
  const yearSelect = document.getElementById("roadmap-year-select");
  const domainSelect = document.getElementById("roadmap-domain-select");
  const metaBadge = document.getElementById("roadmap-stage-badge");
  const overviewText = document.getElementById("roadmap-overview-text");

  if (!container || !yearSelect || !domainSelect) return;

  function renderRoadmap() {
    const selectedYear = yearSelect.value || "year-1";
    const selectedDomain = domainSelect.value || "software-dev";

    const { domain, milestones, yearMeta } = getRoadmapForDomainAndYear(selectedDomain, selectedYear);

    if (metaBadge) {
      metaBadge.textContent = `${yearMeta.label} • ${yearMeta.badge}`;
    }
    if (overviewText) {
      overviewText.textContent = domain.overview;
    }

    container.innerHTML = milestones
      .map((m, idx) => `
        <div class="roadmap-milestone-card">
          <div>
            <div class="milestone-top">
              <span class="badge badge-purple" style="font-size: 0.68rem; font-weight: 700;">
                Milestone ${idx + 1}
              </span>
              <span class="milestone-timeframe">${m.timeframe}</span>
            </div>
            <h4 class="milestone-title">${m.title}</h4>
            <p class="milestone-desc">${m.description}</p>
            <div style="display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: var(--space-3);">
              ${m.skills.map((s) => `<span class="skill-tag" style="font-size: 0.7rem;">${s}</span>`).join("")}
            </div>
          </div>
          <div class="milestone-task-box">
            <strong>Recommended Practice Deliverable:</strong>
            ${m.task}
          </div>
        </div>
      `)
      .join("");
  }

  yearSelect.addEventListener("change", renderRoadmap);
  domainSelect.addEventListener("change", renderRoadmap);

  renderRoadmap();
}

/**
 * 3. Project Lab Preview
 */
function initProjectLab() {
  const container = document.getElementById("projects-gallery-target");
  const domainFilter = document.getElementById("project-domain-filter");
  const diffBtns = document.querySelectorAll(".project-diff-btn");

  if (!container) return;

  let activeDomain = "all";
  let activeDifficulty = "all";

  function renderProjects() {
    const projects = getProjectsByFilter(activeDomain, activeDifficulty);

    if (projects.length === 0) {
      container.innerHTML = `
        <div class="card empty-state" style="grid-column: 1 / -1; margin: var(--space-4) auto;">
          <p style="color: var(--color-text-muted); font-size: var(--font-size-sm);">
            No projects found for the selected combination. Try switching filters.
          </p>
        </div>
      `;
      return;
    }

    container.innerHTML = projects
      .map((proj) => `
        <article class="project-item-card">
          <div>
            <div class="project-meta-top">
              <span class="badge ${proj.difficultyBadge}" style="font-size: 0.7rem; font-weight: 700;">
                ${proj.difficulty} Level
              </span>
              <span style="font-size: 0.72rem; color: var(--color-text-muted); font-weight: 600;">
                ⏱️ ${proj.estimatedHours}
              </span>
            </div>
            <h3 class="project-title">${proj.title}</h3>
            <p class="project-deliverable-text">${proj.deliverable}</p>
            <div class="project-skills-wrap">
              ${proj.skills.map((s) => `<span class="skill-tag primary" style="font-size: 0.7rem;">${s}</span>`).join("")}
            </div>
          </div>
          <div class="project-footer-row">
            <span><strong>Prerequisites:</strong> ${proj.prerequisites}</span>
          </div>
        </article>
      `)
      .join("");
  }

  domainFilter?.addEventListener("change", (e) => {
    activeDomain = e.target.value;
    renderProjects();
  });

  diffBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      diffBtns.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      activeDifficulty = btn.dataset.diff || "all";
      renderProjects();
    });
  });

  renderProjects();
}

/**
 * 4. See How Job Matching Works (Interactive Simulation Card)
 */
function initMatchingDemo() {
  const container = document.getElementById("matching-demo-target");
  const scenarioBtns = document.querySelectorAll(".scenario-btn");
  if (!container || scenarioBtns.length === 0) return;

  function renderScenario(scenarioId) {
    const scenario = getScenarioById(scenarioId);

    container.innerHTML = `
      <div class="matching-result-display">
        <!-- Top Row: Score + Overview -->
        <div class="matching-result-top">
          <div class="matching-score-circle">
            <span class="score-num">${scenario.overallScore}%</span>
            <span class="score-lbl">Compatibility</span>
          </div>
          <div>
            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: var(--space-2); margin-bottom: 4px;">
              <h3 style="font-family: var(--font-display); font-size: var(--font-size-lg); margin: 0; color: var(--color-text);">
                Target Match: ${scenario.roleTitle}
              </h3>
              <span class="badge badge-available">Strong Alignment</span>
            </div>
            <p style="font-size: var(--font-size-xs); color: var(--color-text-muted); margin-bottom: var(--space-3);">
              Evaluating candidate <strong>${scenario.candidateProfile}</strong> against verified requirements at <strong>${scenario.company}</strong> (${scenario.domain}).
            </p>

            <!-- Dual Metric Bars -->
            <div style="display: grid; gap: var(--space-2);">
              <div>
                <div style="display: flex; justify-content: space-between; font-size: 0.72rem; font-weight: 600; margin-bottom: 2px;">
                  <span>1. Required Skills &amp; Keyword Coverage</span>
                  <span style="color: var(--color-primary); font-weight: 700;">${scenario.keywordCoverage}%</span>
                </div>
                <div class="metric-bar-bg">
                  <div class="metric-bar-fill" style="width: ${scenario.keywordCoverage}%;"></div>
                </div>
              </div>
              <div>
                <div style="display: flex; justify-content: space-between; font-size: 0.72rem; font-weight: 600; margin-bottom: 2px;">
                  <span>2. Contextual Semantic Fit &amp; Evidence</span>
                  <span style="color: var(--color-primary); font-weight: 700;">${scenario.semanticFit}%</span>
                </div>
                <div class="metric-bar-bg">
                  <div class="metric-bar-fill" style="width: ${scenario.semanticFit}%;"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Skills Breakdown Split -->
        <div class="matching-skills-split">
          <div class="matching-skills-col">
            <h4 style="color: var(--color-success-on);">✓ Matched Core Competencies (${scenario.matchedSkills.length})</h4>
            <div style="display: flex; flex-wrap: wrap; gap: 4px;">
              ${scenario.matchedSkills.map((s) => `<span class="skill-tag match" style="font-size: 0.72rem;">✓ ${s}</span>`).join("")}
            </div>
          </div>
          <div class="matching-skills-col">
            <h4 style="color: var(--color-error-on);">✕ Identified Blind Spots &amp; Keyword Gaps (${scenario.missingSkills.length})</h4>
            <div style="display: flex; flex-wrap: wrap; gap: 4px;">
              ${scenario.missingSkills.map((s) => `<span class="skill-tag gap" style="font-size: 0.72rem;">✕ ${s}</span>`).join("")}
            </div>
          </div>
        </div>

        <!-- Qualitative Analysis Explanation -->
        <div class="matching-rec-card">
          <strong>Analytical Evaluation:</strong>
          <p style="margin: 4px 0 0; color: var(--color-text); font-size: var(--font-size-xs); line-height: 1.55;">
            ${scenario.explanation}
          </p>
        </div>

        <!-- Recruiter Phrasing Optimization Tip -->
        <div style="background: #ffffff; border: 1px dashed var(--color-border); border-radius: var(--radius-md); padding: var(--space-4);">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
            <strong style="font-size: var(--font-size-xs); color: var(--color-primary); text-transform: uppercase; letter-spacing: 0.04em;">
              💡 Action Verb &amp; Metrics Optimization Tip
            </strong>
            <span class="badge badge-purple" style="font-size: 0.65rem;">Recruiter Rewrite</span>
          </div>
          <div style="display: grid; gap: 6px; font-size: 0.75rem;">
            <div><span style="color: var(--color-error); font-weight: 600;">Before:</span> <em>"${scenario.sampleBulletOptimization.original}"</em></div>
            <div><span style="color: var(--color-success); font-weight: 600;">After:</span> <strong>"${scenario.sampleBulletOptimization.optimized}"</strong></div>
          </div>
        </div>

        <!-- CTAs to Real Workspace -->
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--space-3); padding-top: var(--space-3); border-top: 1px solid var(--color-border-subtle);">
          <span style="font-size: 0.72rem; color: var(--color-text-muted);">
            Sample results illustrate analytical criteria. Ready to test your own resume?
          </span>
          <a class="btn btn-primary btn-sm" href="${hrefFromRoot("pages/analyzer.html")}">
            Analyze Your Resume Now →
          </a>
        </div>
      </div>
    `;
  }

  scenarioBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      scenarioBtns.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      const id = btn.dataset.scenario || "scenario-sw";
      renderScenario(id);
    });
  });

  renderScenario("scenario-sw");
}

/**
 * 5. Smooth Scroll Links
 */
function initSmoothScrollLinks() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId && targetId !== "#") {
        const elTarget = document.querySelector(targetId);
        if (elTarget) {
          e.preventDefault();
          elTarget.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });
}
