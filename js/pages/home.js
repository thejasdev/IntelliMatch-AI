import { ROADMAP_DOMAINS, ROADMAP_YEARS, getRoadmapForDomainAndYear } from "../../data/roadmaps.js";
import { CURATED_PROJECTS, getProjectsByFilter } from "../../data/projects.js";
import { MATCHING_DEMO_SCENARIOS, getScenarioById } from "../../data/matchingDemo.js";
import { ENGINEERING_DOMAINS } from "../../data/jobRoles.js";
import { JOB_SOURCES, SAMPLE_MULTI_DOMAIN_JOBS } from "../../data/jobSources.js";
import { hrefFromRoot } from "../navigation.js";

export function initHomePage() {
  initWorkspaceSwitcher();
  initResumeBuilder();
  initQuickContact();
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
      if (targetId && targetId !== "#" && targetId !== "#builder") {
        const elTarget = document.querySelector(targetId);
        if (elTarget) {
          e.preventDefault();
          elTarget.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });
}

/**
 * 6. Interactive Workspace View Switcher (Overview vs Resume Builder)
 */
export function switchWorkspaceView(viewName) {
  const overview = document.getElementById("workspace-overview");
  const builder = document.getElementById("workspace-builder");
  if (!overview || !builder) return;

  if (viewName === "builder") {
    overview.hidden = true;
    overview.classList.remove("is-active");
    builder.hidden = false;
    builder.classList.add("is-entering");
    requestAnimationFrame(() => {
      builder.classList.remove("is-entering");
      builder.classList.add("is-active");
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
    updateSidebarNavActive("builder");
  } else {
    builder.hidden = true;
    builder.classList.remove("is-active");
    overview.hidden = false;
    overview.classList.add("is-entering");
    requestAnimationFrame(() => {
      overview.classList.remove("is-entering");
      overview.classList.add("is-active");
    });
    updateSidebarNavActive("home");
  }
}

function updateSidebarNavActive(navId) {
  document.querySelectorAll(".sidebar-nav-pill").forEach((pill) => {
    const isTarget = pill.getAttribute("data-nav-id") === navId;
    pill.classList.toggle("is-active", isTarget);
    if (isTarget) pill.setAttribute("aria-current", "page");
    else pill.removeAttribute("aria-current");
  });
}

function initWorkspaceSwitcher() {
  window.switchWorkspaceView = switchWorkspaceView;

  // Buttons that trigger builder view
  const triggerBuilderIds = ["hero-btn-builder", "card-open-builder", "btn-get-started-cta"];
  triggerBuilderIds.forEach((id) => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.hash = "builder";
        switchWorkspaceView("builder");
      });
    }
  });

  // Back to overview button
  const backBtn = document.getElementById("btn-builder-back");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      window.location.hash = "";
      switchWorkspaceView("overview");
    });
  }

  // Handle URL hash changes
  window.addEventListener("hashchange", () => {
    if (window.location.hash === "#builder") {
      switchWorkspaceView("builder");
    } else {
      switchWorkspaceView("overview");
    }
  });

  // Check initial hash on load
  if (window.location.hash === "#builder") {
    switchWorkspaceView("builder");
  }
}

/**
 * 7. Interactive Smart Resume Builder Form
 */
function initResumeBuilder() {
  const addExpBtn = document.getElementById("btn-add-experience");
  const expContainer = document.getElementById("experience-list-container");
  const addProjBtn = document.getElementById("btn-add-project");
  const projContainer = document.getElementById("project-list-container");
  const summaryInput = document.getElementById("builder-summary");
  const summaryCounter = document.getElementById("builder-summary-counter");

  // Summary live counter
  if (summaryInput && summaryCounter) {
    summaryInput.addEventListener("input", () => {
      summaryCounter.textContent = `${summaryInput.value.length} chars`;
    });
  }

  // Add Experience
  if (addExpBtn && expContainer) {
    addExpBtn.addEventListener("click", () => {
      const count = expContainer.querySelectorAll(".experience-item").length + 1;
      const card = document.createElement("div");
      card.className = "builder-item-card experience-item";
      card.innerHTML = `
        <div class="builder-item-header">
          <span style="font-size: 0.8rem; font-weight: 700; color: var(--brand-violet);">Experience Entry #${count}</span>
          <button type="button" class="btn-remove-item">✕ Remove</button>
        </div>
        <div class="builder-grid-2col">
          <div class="builder-field">
            <label>Job Title / Role</label>
            <input type="text" class="builder-input exp-title" placeholder="e.g. Software Engineer Intern" />
          </div>
          <div class="builder-field">
            <label>Company / Organization</label>
            <input type="text" class="builder-input exp-company" placeholder="e.g. Tech Corp" />
          </div>
        </div>
        <div class="builder-grid-2col">
          <div class="builder-field">
            <label>Date Range</label>
            <input type="text" class="builder-input exp-period" placeholder="e.g. June 2025 – August 2025" />
          </div>
          <div class="builder-field">
            <label>Location</label>
            <input type="text" class="builder-input exp-location" placeholder="e.g. Bengaluru, India" />
          </div>
        </div>
        <div class="builder-field">
          <label>Accomplishments &amp; Responsibilities (One bullet per line)</label>
          <textarea class="builder-textarea exp-bullets" rows="3" placeholder="• Architected and deployed microservices...&#10;• Reduced latency by 20%..."></textarea>
        </div>
      `;
      card.querySelector(".btn-remove-item").addEventListener("click", () => card.remove());
      expContainer.appendChild(card);
    });
  }

  // Add Project
  if (addProjBtn && projContainer) {
    addProjBtn.addEventListener("click", () => {
      const count = projContainer.querySelectorAll(".project-item").length + 1;
      const card = document.createElement("div");
      card.className = "builder-item-card project-item";
      card.innerHTML = `
        <div class="builder-item-header">
          <span style="font-size: 0.8rem; font-weight: 700; color: var(--brand-cyan);">Project Entry #${count}</span>
          <button type="button" class="btn-remove-item">✕ Remove</button>
        </div>
        <div class="builder-grid-2col">
          <div class="builder-field">
            <label>Project Title</label>
            <input type="text" class="builder-input proj-title" placeholder="e.g. Cloud Cache Microservice" />
          </div>
          <div class="builder-field">
            <label>Technologies Used</label>
            <input type="text" class="builder-input proj-tech" placeholder="e.g. Go, Redis, Docker" />
          </div>
        </div>
        <div class="builder-grid-2col">
          <div class="builder-field">
            <label>Repository / Demo Link</label>
            <input type="text" class="builder-input proj-link" placeholder="e.g. https://github.com/..." />
          </div>
          <div class="builder-field">
            <label>Project Scope</label>
            <input type="text" class="builder-input proj-scope" placeholder="e.g. Distributed Systems Lab" />
          </div>
        </div>
        <div class="builder-field">
          <label>Key Deliverables &amp; Technical Highlights</label>
          <textarea class="builder-textarea proj-desc" rows="3" placeholder="• Built fault-tolerant in-memory cache...&#10;• Benchmarked 15k RPS throughput..."></textarea>
        </div>
      `;
      card.querySelector(".btn-remove-item").addEventListener("click", () => card.remove());
      projContainer.appendChild(card);
    });
  }

  // Preview ATS Resume Action
  const previewBtn = document.getElementById("btn-builder-preview");
  const previewModal = document.getElementById("resume-preview-modal");
  const previewClose = document.getElementById("resume-preview-close");
  const previewSheet = document.getElementById("resume-preview-sheet");
  const printBtn = document.getElementById("btn-print-resume");
  const copyBtn = document.getElementById("btn-copy-resume-text");

  function getBuilderData() {
    const name = document.getElementById("builder-name")?.value.trim() || "Candidate Name";
    const title = document.getElementById("builder-title")?.value.trim() || "Software Engineer";
    const email = document.getElementById("builder-email")?.value.trim() || "";
    const phone = document.getElementById("builder-phone")?.value.trim() || "";
    const location = document.getElementById("builder-location")?.value.trim() || "";
    const linkedin = document.getElementById("builder-linkedin")?.value.trim() || "";
    const portfolio = document.getElementById("builder-portfolio")?.value.trim() || "";
    const summary = document.getElementById("builder-summary")?.value.trim() || "";
    const degree = document.getElementById("builder-degree")?.value.trim() || "";
    const institution = document.getElementById("builder-institution")?.value.trim() || "";
    const gradYear = document.getElementById("builder-grad-year")?.value.trim() || "";
    const gpa = document.getElementById("builder-gpa")?.value.trim() || "";
    const skills = document.getElementById("builder-skills")?.value.trim() || "";

    const experiences = [];
    document.querySelectorAll(".experience-item").forEach((item) => {
      const expTitle = item.querySelector(".exp-title")?.value.trim();
      const expComp = item.querySelector(".exp-company")?.value.trim();
      const expPeriod = item.querySelector(".exp-period")?.value.trim();
      const expLoc = item.querySelector(".exp-location")?.value.trim();
      const expBullets = item.querySelector(".exp-bullets")?.value.trim();
      if (expTitle || expComp) {
        experiences.push({ title: expTitle, company: expComp, period: expPeriod, location: expLoc, bullets: expBullets });
      }
    });

    const projects = [];
    document.querySelectorAll(".project-item").forEach((item) => {
      const projTitle = item.querySelector(".proj-title")?.value.trim();
      const projTech = item.querySelector(".proj-tech")?.value.trim();
      const projLink = item.querySelector(".proj-link")?.value.trim();
      const projScope = item.querySelector(".proj-scope")?.value.trim();
      const projDesc = item.querySelector(".proj-desc")?.value.trim();
      if (projTitle) {
        projects.push({ title: projTitle, tech: projTech, link: projLink, scope: projScope, desc: projDesc });
      }
    });

    return { name, title, email, phone, location, linkedin, portfolio, summary, degree, institution, gradYear, gpa, skills, experiences, projects };
  }

  if (previewBtn && previewModal && previewSheet) {
    previewBtn.addEventListener("click", () => {
      const data = getBuilderData();

      const contacts = [
        data.email,
        data.phone,
        data.location,
        data.linkedin ? `<a href="${data.linkedin}" target="_blank" rel="noopener">LinkedIn</a>` : null,
        data.portfolio ? `<a href="${data.portfolio}" target="_blank" rel="noopener">Portfolio</a>` : null,
      ].filter(Boolean).join(" • ");

      const expHtml = data.experiences.length
        ? data.experiences.map((exp) => `
            <div style="margin-bottom: 0.85rem;">
              <div style="display: flex; justify-content: space-between; font-weight: 700; font-size: 0.875rem;">
                <span>${exp.title || "Role"} — <em>${exp.company || "Company"}</em></span>
                <span style="font-weight: 600; color: #4A5568; font-size: 0.8rem;">${exp.period || ""}</span>
              </div>
              ${exp.location ? `<div style="font-size: 0.75rem; color: #718096; margin-bottom: 2px;">${exp.location}</div>` : ""}
              <ul style="margin: 4px 0 0; padding-left: 1.25rem; font-size: 0.8rem; line-height: 1.5;">
                ${exp.bullets.split("\n").filter((b) => b.trim()).map((b) => `<li>${b.replace(/^[•\-\*]\s*/, "")}</li>`).join("")}
              </ul>
            </div>
          `).join("")
        : "<p style='font-size: 0.8rem; color: #718096;'>No work experience added.</p>";

      const projHtml = data.projects.length
        ? data.projects.map((proj) => `
            <div style="margin-bottom: 0.85rem;">
              <div style="display: flex; justify-content: space-between; font-weight: 700; font-size: 0.875rem;">
                <span>${proj.title} ${proj.tech ? `<span style="font-weight: 500; color: #4A5568; font-size: 0.78rem;">(${proj.tech})</span>` : ""}</span>
                ${proj.link ? `<a href="${proj.link}" target="_blank" rel="noopener" style="font-size: 0.78rem; color: var(--brand-violet);">Demo / Code ↗</a>` : ""}
              </div>
              <ul style="margin: 4px 0 0; padding-left: 1.25rem; font-size: 0.8rem; line-height: 1.5;">
                ${proj.desc.split("\n").filter((b) => b.trim()).map((b) => `<li>${b.replace(/^[•\-\*]\s*/, "")}</li>`).join("")}
              </ul>
            </div>
          `).join("")
        : "<p style='font-size: 0.8rem; color: #718096;'>No practical projects added.</p>";

      previewSheet.innerHTML = `
        <h1>${data.name}</h1>
        <div class="resume-sheet-headline">${data.title}</div>
        <div class="resume-sheet-contacts">${contacts}</div>

        ${data.summary ? `
          <div class="resume-sheet-section">
            <div class="resume-sheet-sec-title">Professional Summary</div>
            <p style="font-size: 0.8125rem; line-height: 1.55; margin: 0;">${data.summary}</p>
          </div>
        ` : ""}

        <div class="resume-sheet-section">
          <div class="resume-sheet-sec-title">Technical Competencies</div>
          <p style="font-size: 0.8125rem; line-height: 1.55; margin: 0;"><strong>Core Skills:</strong> ${data.skills || "Not specified"}</p>
        </div>

        <div class="resume-sheet-section">
          <div class="resume-sheet-sec-title">Work &amp; Internship Experience</div>
          ${expHtml}
        </div>

        <div class="resume-sheet-section">
          <div class="resume-sheet-sec-title">Engineering Projects &amp; Lab Blueprints</div>
          ${projHtml}
        </div>

        <div class="resume-sheet-section">
          <div class="resume-sheet-sec-title">Education &amp; Academic Credentials</div>
          <div style="display: flex; justify-content: space-between; font-size: 0.84rem; font-weight: 700;">
            <span>${data.degree}</span>
            <span style="font-weight: 600; color: #4A5568;">${data.gradYear}</span>
          </div>
          <div style="font-size: 0.8rem; color: #4A5568;">${data.institution} ${data.gpa ? `• ${data.gpa}` : ""}</div>
        </div>
      `;

      previewModal.hidden = false;
      previewModal.setAttribute("aria-hidden", "false");
    });
  }

  if (previewClose && previewModal) {
    previewClose.addEventListener("click", () => {
      previewModal.hidden = true;
      previewModal.setAttribute("aria-hidden", "true");
    });
  }

  if (printBtn) {
    printBtn.addEventListener("click", () => {
      window.print();
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      const data = getBuilderData();
      const plainText = `
${data.name.toUpperCase()}
${data.title}
${data.email} | ${data.phone} | ${data.location}
LinkedIn: ${data.linkedin} | Portfolio: ${data.portfolio}

PROFESSIONAL SUMMARY
${data.summary}

TECHNICAL SKILLS
${data.skills}

WORK EXPERIENCE
${data.experiences.map((e) => `${e.title} - ${e.company} (${e.period})\n${e.bullets}`).join("\n\n")}

PROJECTS
${data.projects.map((p) => `${p.title} (${p.tech})\n${p.desc}`).join("\n\n")}

EDUCATION
${data.degree} - ${data.institution} (${data.gradYear}) - ${data.gpa}
      `.trim();

      navigator.clipboard.writeText(plainText).then(() => {
        const orig = copyBtn.textContent;
        copyBtn.textContent = "Copied to Clipboard!";
        setTimeout(() => { copyBtn.textContent = orig; }, 2000);
      });
    });
  }

  // Export JSON/Text action
  const exportBtn = document.getElementById("btn-builder-export");
  if (exportBtn) {
    exportBtn.addEventListener("click", () => {
      const data = getBuilderData();
      const jsonStr = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${data.name.toLowerCase().replace(/\s+/g, "-")}-resume.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }

  // Reset form
  const resetBtn = document.getElementById("btn-builder-reset");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (confirm("Reset the builder form to default values?")) {
        document.getElementById("resume-builder-form")?.reset();
      }
    });
  }
}

/**
 * 8. Quick Contact Inquiry Modal
 */
function initQuickContact() {
  const trigger = document.getElementById("quick-contact-trigger");
  const modal = document.getElementById("quick-contact-modal");
  const closeBtn = document.getElementById("contact-modal-close");
  const form = document.getElementById("quick-contact-form");
  const feedback = document.getElementById("contact-feedback-msg");

  if (trigger && modal) {
    trigger.addEventListener("click", () => {
      modal.hidden = false;
      modal.setAttribute("aria-hidden", "false");
      if (feedback) feedback.style.display = "none";
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => {
      modal.hidden = true;
      modal.setAttribute("aria-hidden", "true");
    });
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.hidden = true;
        modal.setAttribute("aria-hidden", "true");
      }
    });
  }

  if (form && feedback) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      feedback.style.display = "block";
      setTimeout(() => {
        if (modal) {
          modal.hidden = true;
          modal.setAttribute("aria-hidden", "true");
        }
      }, 2200);
    });
  }
}

