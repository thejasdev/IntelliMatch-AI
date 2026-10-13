import { el, svgIcon } from "../utils/dom.js";
import { ICONS } from "../components/icons.js";
import { hrefFromRoot } from "../navigation.js";
import { ENGINEERING_DOMAINS, getRolesForDomain } from "../../data/jobRoles.js";

const DEMO_ANALYSES = [
  {
    id: "AN-104",
    role: "Senior Full-Stack Software Engineer",
    domainId: "software-dev",
    domainName: "Software Development",
    company: "Apex Digital Systems",
    date: "Today, 10:14 AM",
    score: 87,
    status: "Strong Match",
    statusClass: "badge-available",
  },
  {
    id: "AN-103",
    role: "Cloud Infrastructure & DevOps Engineer",
    domainId: "cloud-devops",
    domainName: "Cloud, DevOps and Infrastructure",
    company: "Stratus Cloud Networks",
    date: "Yesterday",
    score: 83,
    status: "Good Match",
    statusClass: "badge-available",
  },
  {
    id: "AN-102",
    role: "Machine Learning & AI Engineer",
    domainId: "ai-ml",
    domainName: "AI and Machine Learning",
    company: "Neural Horizons Labs",
    date: "Oct 11, 2026",
    score: 72,
    status: "Skill Gap Identified",
    statusClass: "badge-planned",
  },
  {
    id: "AN-101",
    role: "Cybersecurity & SOC Analyst",
    domainId: "cybersecurity",
    domainName: "Cybersecurity",
    company: "Vanguard Defense Corp",
    date: "Oct 08, 2026",
    score: 79,
    status: "Good Match",
    statusClass: "badge-available",
  },
];

const SAVED_RESUMES = [
  {
    name: "Alex_Morgan_Software_Engineer.pdf",
    domain: "Software Development",
    updated: "Oct 12, 2026",
    size: "142 KB",
    template: "Technical Projects",
  },
  {
    name: "Alex_Morgan_Cloud_DevOps.docx",
    domain: "Cloud, DevOps & Infra",
    updated: "Oct 08, 2026",
    size: "98 KB",
    template: "Cloud & Infrastructure",
  },
];

export function initDashboardPage() {
  const root = document.getElementById("dashboard-root");
  if (!root) return;

  let showEmptyState = false;
  let selectedDomain = "all";
  let selectedRole = "all";

  function render() {
    const filteredAnalyses = DEMO_ANALYSES.filter((item) => {
      const matchDomain = selectedDomain === "all" || item.domainId === selectedDomain;
      return matchDomain;
    });

    const activeRoles = selectedDomain === "all" ? [] : getRolesForDomain(selectedDomain, false);

    root.innerHTML = `
      <div class="page-header-banner">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: var(--space-4);">
          <div>
            <h1>Candidate Career Dashboard</h1>
            <p>Monitor your resume evaluations, saved ATS templates, multi-domain skill gap tracking, and career readiness baselines.</p>
          </div>
          <div style="display: flex; gap: var(--space-2); align-items: center; flex-wrap: wrap;">
            <button type="button" class="btn btn-secondary btn-sm" id="toggle-state-btn">
              ${showEmptyState ? "Show Populated Activity (Demo)" : "Preview Fresh Empty State"}
            </button>
            <a class="btn btn-primary btn-sm" href="${hrefFromRoot("pages/analyzer.html")}">
              ${ICONS.analyzer}
              New Resume Analysis
            </a>
          </div>
        </div>
      </div>

      ${showEmptyState ? renderEmptyStateHtml() : renderDashboardContentHtml(filteredAnalyses, activeRoles)}
    `;

    document.getElementById("toggle-state-btn")?.addEventListener("click", () => {
      showEmptyState = !showEmptyState;
      render();
    });

    if (!showEmptyState) {
      bindDashboardEvents();
    }
  }

  function renderEmptyStateHtml() {
    return `
      <div class="card empty-state" style="margin: var(--space-8) auto; max-width: 620px;">
        <div class="empty-state-icon">
          ${ICONS.dashboard}
        </div>
        <span class="badge badge-purple">No Past Records</span>
        <h2>Your Career Dashboard is Fresh</h2>
        <p style="color: var(--color-text-muted); font-size: var(--font-size-sm); line-height: 1.6; max-width: 48ch;">
          You haven't analyzed a resume yet in this session. Upload your resume and evaluate it against any of the 10 supported engineering domains to populate your dashboard history.
        </p>
        <div style="display: flex; gap: var(--space-3); margin-top: var(--space-3); flex-wrap: wrap; justify-content: center;">
          <a class="btn btn-primary" href="${hrefFromRoot("pages/analyzer.html")}">
            Analyze First Resume
          </a>
          <a class="btn btn-secondary" href="${hrefFromRoot("pages/templates.html")}">
            Browse PDF Templates
          </a>
        </div>
      </div>
    `;
  }

  function renderDashboardContentHtml(filteredAnalyses, activeRoles) {
    return `
      <!-- Demonstration Analytics Notice Banner -->
      <div class="card" style="margin-bottom: var(--space-6); background: var(--color-primary-light); border-color: rgba(108, 76, 241, 0.25);">
        <div class="card-body" style="padding: var(--space-4) var(--space-6); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: var(--space-3);">
          <div style="display: flex; align-items: center; gap: var(--space-3);">
            <span class="badge badge-demo">Sample Session Analytics</span>
            <p style="margin: 0; font-size: var(--font-size-xs); color: var(--color-text); line-height: 1.5;">
              <strong>Data Notice:</strong> This dashboard displays demonstration activity and baseline indicators across engineering domains. Live user analytics will persist once connected to the FastAPI backend.
            </p>
          </div>
        </div>
      </div>

      <!-- Domain and Role Filter Bar -->
      <div class="card" style="margin-bottom: var(--space-6);">
        <div class="card-body" style="padding: var(--space-4) var(--space-5);">
          <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: var(--space-3);">
            <div style="display: flex; align-items: center; gap: var(--space-3); flex-wrap: wrap;">
              <span style="font-size: var(--font-size-xs); font-weight: 700; color: var(--color-text); text-transform: uppercase; letter-spacing: 0.04em;">
                Filter Career Track:
              </span>
              <div style="width: 220px;">
                <select id="dash-domain-filter" class="select" style="padding: 0.4rem 0.75rem; font-size: var(--font-size-xs);">
                  <option value="all">All 10 Domains</option>
                  ${ENGINEERING_DOMAINS.map(
                    (d) => `<option value="${d.id}" ${selectedDomain === d.id ? "selected" : ""}>${d.name}</option>`
                  ).join("")}
                </select>
              </div>
              <div style="width: 220px;">
                <select id="dash-role-filter" class="select" style="padding: 0.4rem 0.75rem; font-size: var(--font-size-xs);" ${selectedDomain === "all" ? "disabled" : ""}>
                  <option value="all">${selectedDomain === "all" ? "All Domain Roles" : "All Roles in Domain"}</option>
                  ${activeRoles.map(
                    (r) => `<option value="${r.id}" ${selectedRole === r.id ? "selected" : ""}>${r.title}</option>`
                  ).join("")}
                </select>
              </div>
            </div>
            <button type="button" class="btn btn-ghost btn-sm" id="dash-reset-filters-btn">
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      <!-- Stats Summary KPI Cards -->
      <div class="stats-grid">
        <div class="stat-card">
          <span class="stat-label">Benchmark Analyses</span>
          <span class="stat-value">${filteredAnalyses.length}</span>
          <span class="stat-trend" style="color: var(--color-primary);">Across Engineering</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">Average Match Score</span>
          <span class="stat-value">${filteredAnalyses.length > 0 ? Math.round(filteredAnalyses.reduce((a, b) => a + b.score, 0) / filteredAnalyses.length) : 0}%</span>
          <span class="stat-trend">↑ Good Alignment</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">Engineering Domains</span>
          <span class="stat-value">10</span>
          <span style="font-size: 0.75rem; color: var(--color-text-muted);">Catalogue Active</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">ATS PDF Templates</span>
          <span class="stat-value">6</span>
          <span style="font-size: 0.75rem; color: var(--color-success); font-weight: 600;">✓ Ready to Download</span>
        </div>
      </div>

      <!-- Main Content Grid -->
      <div style="display: grid; grid-template-columns: 2fr 1.1fr; gap: var(--space-6); margin-bottom: var(--space-8);" class="dash-tables-grid">
        <!-- Left: Recent Analyses Table -->
        <div class="card">
          <div class="card-header" style="background: var(--color-surface-subtle); padding: var(--space-4) var(--space-6);">
            <div>
              <h2 class="card-title" style="font-size: var(--font-size-md);">Recent Resume Analyses</h2>
              <span style="font-size: var(--font-size-xs); color: var(--color-text-muted);">
                Showing ${filteredAnalyses.length} demonstration evaluation logs
              </span>
            </div>
            <span class="badge badge-demo">Sample History</span>
          </div>
          <div class="table-responsive">
            <table class="custom-table">
              <thead>
                <tr>
                  <th>Target Role &amp; Domain</th>
                  <th>Date</th>
                  <th>Score</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${
                  filteredAnalyses.length === 0
                    ? `<tr><td colspan="5" style="text-align: center; color: var(--color-text-muted); padding: var(--space-6);">No benchmark records in selected domain.</td></tr>`
                    : filteredAnalyses.map((item) => `
                    <tr>
                      <td>
                        <strong style="color: var(--color-text);">${item.role}</strong>
                        <div style="font-size: 0.75rem; color: var(--color-text-muted);">${item.domainName} • ${item.company}</div>
                      </td>
                      <td style="font-size: var(--font-size-xs); color: var(--color-text-muted);">${item.date}</td>
                      <td>
                        <strong style="color: var(--color-primary); font-size: var(--font-size-md);">${item.score}%</strong>
                      </td>
                      <td>
                        <span class="badge ${item.statusClass}" style="font-size: 0.7rem;">${item.status}</span>
                      </td>
                      <td>
                        <a class="btn btn-secondary btn-sm" href="${hrefFromRoot("pages/analyzer.html")}" style="min-height: 32px; padding: 0.25rem 0.65rem;">
                          Re-run
                        </a>
                      </td>
                    </tr>
                  `).join("")
                }
              </tbody>
            </table>
          </div>
        </div>

        <!-- Right: Saved Resumes & Blueprints -->
        <div class="card">
          <div class="card-header" style="background: var(--color-surface-subtle); padding: var(--space-4) var(--space-6);">
            <div>
              <h2 class="card-title" style="font-size: var(--font-size-md);">Saved Resumes &amp; Blueprints</h2>
              <span style="font-size: var(--font-size-xs); color: var(--color-text-muted);">Session workspace documents</span>
            </div>
          </div>
          <div class="card-body" style="padding: var(--space-5);">
            <div style="display: flex; flex-direction: column; gap: var(--space-4);">
              ${SAVED_RESUMES.map((res) => `
                <div style="padding: var(--space-3) var(--space-4); border: 1px solid var(--color-border); border-radius: var(--radius-md); background: #ffffff;">
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px;">
                    <div>
                      <strong style="font-size: var(--font-size-xs); color: var(--color-text); display: block;">${res.name}</strong>
                      <span style="font-size: 0.72rem; color: var(--color-primary); font-weight: 600;">${res.domain}</span>
                    </div>
                    <span class="badge badge-purple" style="font-size: 0.65rem;">${res.template}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.72rem; color: var(--color-text-muted); margin-top: var(--space-2);">
                    <span>Updated ${res.updated} • ${res.size}</span>
                    <a class="btn btn-ghost btn-sm" href="${hrefFromRoot("pages/templates.html")}" style="min-height: 28px; padding: 0 6px;">
                      View Template
                    </a>
                  </div>
                </div>
              `).join("")}
            </div>

            <div style="margin-top: var(--space-5); padding-top: var(--space-4); border-top: 1px solid var(--color-border-subtle); text-align: center;">
              <a class="btn btn-primary btn-sm" href="${hrefFromRoot("pages/templates.html")}" style="width: 100%;">
                Browse PDF Template Library
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function bindDashboardEvents() {
    const domainFilter = document.getElementById("dash-domain-filter");
    const roleFilter = document.getElementById("dash-role-filter");
    const resetBtn = document.getElementById("dash-reset-filters-btn");

    domainFilter?.addEventListener("change", (e) => {
      selectedDomain = e.target.value;
      selectedRole = "all";
      render();
    });

    roleFilter?.addEventListener("change", (e) => {
      selectedRole = e.target.value;
      render();
    });

    resetBtn?.addEventListener("click", () => {
      selectedDomain = "all";
      selectedRole = "all";
      render();
    });
  }

  render();
}
