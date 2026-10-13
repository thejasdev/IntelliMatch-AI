import { el, svgIcon } from "../utils/dom.js";
import { ICONS } from "../components/icons.js";
import { hrefFromRoot } from "../navigation.js";
import {
  ENGINEERING_DOMAINS,
  getRolesForDomain,
  getDomainById,
  findRoleById,
  CUSTOM_ROLE_OPTION,
} from "../../data/jobRoles.js";

export function initAnalyzerPage() {
  const root = document.getElementById("analyzer-root");
  if (!root) return;

  // Selected State
  let selectedFile = null;
  let selectedDomainId = "software-dev";
  let selectedRoleId = "sw-eng";
  let customRoleName = "";

  // Check prefill from Job Search or direct link
  const prefilledJobText = sessionStorage.getItem("intellimatch_target_job") || "";
  const prefilledDomain = sessionStorage.getItem("intellimatch_target_domain") || "";
  const prefilledRole = sessionStorage.getItem("intellimatch_target_role") || "";
  sessionStorage.removeItem("intellimatch_target_job");
  sessionStorage.removeItem("intellimatch_target_domain");
  sessionStorage.removeItem("intellimatch_target_role");

  if (prefilledDomain && getDomainById(prefilledDomain)) {
    selectedDomainId = prefilledDomain;
  }
  if (prefilledRole) {
    selectedRoleId = prefilledRole;
  }

  function renderForm() {
    const currentDomain = getDomainById(selectedDomainId);
    const domainRoles = getRolesForDomain(selectedDomainId, true);

    root.innerHTML = `
      <div class="page-header-banner">
        <h1>Resume Analyzer</h1>
        <p>Compare your engineering resume against targeted job descriptions to identify skill matches, uncover keyword gaps, and review evidence-backed writing recommendations.</p>
      </div>

      <div class="card" style="margin-bottom: var(--space-8);">
        <div class="card-header" style="background: var(--color-surface-subtle);">
          <div style="display: flex; align-items: center; gap: var(--space-3);">
            <div style="color: var(--color-primary);">${ICONS.analyzer}</div>
            <h2 class="card-title" style="font-size: var(--font-size-md);">Resume Evaluation Form</h2>
          </div>
          <span class="badge badge-demo">Interactive Prototype</span>
        </div>
        <div class="card-body">
          <form id="analyzer-form" novalidate>
            <!-- Field 1: Resume Upload -->
            <div class="form-group" style="margin-bottom: var(--space-6);">
              <label class="form-label" for="file-input">
                <span>1. Resume File <span style="color: var(--color-error);">*</span></span>
                <span class="form-hint">Accepted: PDF or DOCX (Max 5MB)</span>
              </label>

              <div class="upload-dropzone" id="dropzone" tabindex="0" role="button" aria-label="Upload Resume File (PDF or DOCX)">
                <input type="file" id="file-input" accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document" style="display: none;" />
                <div class="upload-icon-wrap" aria-hidden="true">
                  ${ICONS.upload}
                </div>
                <div>
                  <p style="margin: 0; font-weight: 650; color: var(--color-text);">Drag &amp; drop your resume here, or browse</p>
                  <p style="margin: 4px 0 0; font-size: var(--font-size-xs); color: var(--color-text-muted);">PDF and DOCX formats supported. Processed locally in your browser.</p>
                </div>
                <button type="button" class="btn btn-secondary btn-sm" id="browse-btn">Choose Resume File</button>
                <div id="file-display" style="margin-top: var(--space-3); display: none;"></div>
              </div>
            </div>

            <!-- 2-Column Grid for Domain & Role -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-5); margin-bottom: var(--space-6);" class="domain-role-grid">
              <!-- Field 2: Select Engineering Domain -->
              <div class="form-group" style="margin: 0;">
                <label class="form-label" for="domain-select">
                  <span>2. Engineering Domain <span style="color: var(--color-error);">*</span></span>
                  <span class="form-hint">10 Domains Available</span>
                </label>
                <select id="domain-select" class="select" required>
                  ${ENGINEERING_DOMAINS.map(
                    (d) => `<option value="${d.id}" ${d.id === selectedDomainId ? "selected" : ""}>${d.name}</option>`
                  ).join("")}
                </select>
                <p id="domain-desc-hint" style="margin: 4px 0 0; font-size: var(--font-size-xs); color: var(--color-text-muted);">
                  ${currentDomain ? currentDomain.description : ""}
                </p>
              </div>

              <!-- Field 3: Select Job Role -->
              <div class="form-group" style="margin: 0;">
                <label class="form-label" for="role-select">
                  <span>3. Job Role <span style="color: var(--color-error);">*</span></span>
                  <span class="form-hint">Filtered by domain</span>
                </label>
                <select id="role-select" class="select" required>
                  ${domainRoles.map(
                    (r) => `<option value="${r.id}" ${r.id === selectedRoleId ? "selected" : ""}>${r.title}</option>`
                  ).join("")}
                </select>
                <div id="custom-role-container" style="display: ${selectedRoleId === "custom" ? "block" : "none"}; margin-top: var(--space-3);">
                  <input
                    type="text"
                    id="custom-role-input"
                    class="input"
                    placeholder="Enter custom role title (e.g., Lead Quantum Systems Engineer)..."
                    value="${customRoleName}"
                  />
                </div>
              </div>
            </div>

            <!-- Field 4: Job Description Textarea -->
            <div class="form-group" style="margin-bottom: var(--space-6);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-2);">
                <label class="form-label" for="job-desc-input" style="margin: 0;">
                  <span>4. Target Job Description <span style="color: var(--color-error);">*</span></span>
                </label>
                <div style="display: flex; align-items: center; gap: var(--space-2);">
                  <button type="button" class="btn btn-ghost btn-sm" id="load-sample-job-btn" title="Load representative job requirements for selected role">
                    Load Role Template
                  </button>
                  <button type="button" class="btn btn-ghost btn-sm" id="clear-job-btn" title="Clear job description text">
                    Clear Text
                  </button>
                  <span class="form-hint" id="char-counter" style="margin-left: 6px;">0 chars</span>
                </div>
              </div>
              <textarea
                id="job-desc-input"
                class="textarea"
                placeholder="Paste the target job description, responsibilities, or technical requirements here..."
                style="min-height: 160px; background: #ffffff; border: 1px solid var(--color-border); color: var(--color-text);"
              >${prefilledJobText}</textarea>
            </div>

            <!-- Inline Validation Alert -->
            <div id="analyzer-alert" style="display: none; padding: var(--space-3) var(--space-4); border-radius: var(--radius-md); font-size: var(--font-size-xs); background: var(--color-error-light); color: var(--color-error-on); border: 1px solid rgba(217, 75, 98, 0.3); margin-bottom: var(--space-5);" role="alert"></div>

            <!-- Field 5: Action Controls (Medium-sized purple button) -->
            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: var(--space-4); padding-top: var(--space-4); border-top: 1px solid var(--color-border-subtle);">
              <div style="font-size: var(--font-size-xs); color: var(--color-text-muted);">
                Files and descriptions are parsed strictly in browser memory.
              </div>
              <div style="display: flex; gap: var(--space-3);">
                <button type="button" class="btn btn-secondary btn-sm" id="reset-form-btn">
                  Reset Form
                </button>
                <button type="submit" class="btn btn-primary" id="analyze-submit-btn">
                  ${ICONS.analyzer}
                  Analyze Resume &amp; Calculate Match
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <!-- Results Container -->
      <div id="results-target"></div>
    `;

    bindFormEvents();
  }

  function bindFormEvents() {
    const fileInput = document.getElementById("file-input");
    const browseBtn = document.getElementById("browse-btn");
    const dropzone = document.getElementById("dropzone");
    const fileDisplay = document.getElementById("file-display");
    const domainSelect = document.getElementById("domain-select");
    const roleSelect = document.getElementById("role-select");
    const customRoleContainer = document.getElementById("custom-role-container");
    const customRoleInput = document.getElementById("custom-role-input");
    const jobInput = document.getElementById("job-desc-input");
    const charCounter = document.getElementById("char-counter");
    const loadSampleBtn = document.getElementById("load-sample-job-btn");
    const clearJobBtn = document.getElementById("clear-job-btn");
    const form = document.getElementById("analyzer-form");
    const alertEl = document.getElementById("analyzer-alert");
    const analyzeBtn = document.getElementById("analyze-submit-btn");
    const resetBtn = document.getElementById("reset-form-btn");
    const resultsTarget = document.getElementById("results-target");

    function updateCounter() {
      if (charCounter && jobInput) {
        charCounter.textContent = `${jobInput.value.length} chars`;
      }
    }
    updateCounter();
    jobInput?.addEventListener("input", updateCounter);

    // Domain change handler: reset incompatible role
    domainSelect?.addEventListener("change", (e) => {
      selectedDomainId = e.target.value;
      const domainObj = getDomainById(selectedDomainId);
      const roles = getRolesForDomain(selectedDomainId, true);

      // Select first valid role in new domain
      selectedRoleId = roles.length > 0 ? roles[0].id : "custom";
      customRoleName = "";

      // Re-populate role dropdown
      if (roleSelect) {
        roleSelect.innerHTML = roles
          .map((r) => `<option value="${r.id}" ${r.id === selectedRoleId ? "selected" : ""}>${r.title}</option>`)
          .join("");
      }

      // Update domain hint
      const hint = document.getElementById("domain-desc-hint");
      if (hint && domainObj) {
        hint.textContent = domainObj.description;
      }

      if (customRoleContainer) {
        customRoleContainer.style.display = selectedRoleId === "custom" ? "block" : "none";
      }
    });

    // Role change handler
    roleSelect?.addEventListener("change", (e) => {
      selectedRoleId = e.target.value;
      if (customRoleContainer) {
        customRoleContainer.style.display = selectedRoleId === "custom" ? "block" : "none";
        if (selectedRoleId === "custom") {
          customRoleInput?.focus();
        }
      }
    });

    customRoleInput?.addEventListener("input", (e) => {
      customRoleName = e.target.value;
    });

    // Load sample job description for selected role
    loadSampleBtn?.addEventListener("click", () => {
      const roleObj = findRoleById(selectedRoleId);
      if (roleObj && roleObj.sampleJob) {
        jobInput.value = roleObj.sampleJob;
      } else {
        const domainObj = getDomainById(selectedDomainId);
        jobInput.value = `${roleObj ? roleObj.title : "Engineering Specialist"} Role Requirements:
- 3+ years experience with modern technologies in ${domainObj ? domainObj.name : "engineering"}.
- Strong foundation in architecture, automated testing, and software design principles.
- Experience with cross-functional agile teams and production deployments.
- Good communication skills, technical documentation, and code review practices.`;
      }
      updateCounter();
      alertEl.style.display = "none";
    });

    clearJobBtn?.addEventListener("click", () => {
      jobInput.value = "";
      updateCounter();
      jobInput.focus();
    });

    // File selection handlers
    browseBtn?.addEventListener("click", (e) => {
      e.stopPropagation();
      fileInput?.click();
    });

    dropzone?.addEventListener("click", () => fileInput?.click());

    dropzone?.addEventListener("dragover", (e) => {
      e.preventDefault();
      dropzone.classList.add("dragover");
    });

    dropzone?.addEventListener("dragleave", () => {
      dropzone.classList.remove("dragover");
    });

    dropzone?.addEventListener("drop", (e) => {
      e.preventDefault();
      dropzone.classList.remove("dragover");
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        processSelectedFile(e.dataTransfer.files[0]);
      }
    });

    fileInput?.addEventListener("change", () => {
      if (fileInput.files && fileInput.files.length > 0) {
        processSelectedFile(fileInput.files[0]);
      }
    });

    function processSelectedFile(file) {
      const validExtensions = [".pdf", ".docx"];
      const ext = "." + file.name.split(".").pop().toLowerCase();
      const maxSizeBytes = 5 * 1024 * 1024; // 5MB

      if (!validExtensions.includes(ext)) {
        showAlert(`Unsupported file type (${ext}). Please select a valid PDF (.pdf) or Word document (.docx).`);
        selectedFile = null;
        fileInput.value = "";
        fileDisplay.style.display = "none";
        return;
      }

      if (file.size > maxSizeBytes) {
        showAlert(`File exceeds maximum size of 5MB (${(file.size / (1024 * 1024)).toFixed(2)} MB). Please select a smaller resume.`);
        selectedFile = null;
        fileInput.value = "";
        fileDisplay.style.display = "none";
        return;
      }

      selectedFile = file;
      hideAlert();

      fileDisplay.style.display = "block";
      fileDisplay.innerHTML = `
        <div class="file-info-badge" style="display: inline-flex; align-items: center; gap: var(--space-3); background: #ffffff; padding: var(--space-2) var(--space-4); border: 1px solid var(--color-primary); border-radius: var(--radius-md);">
          <span style="font-size: 1.1rem;">${ext === ".pdf" ? "📕" : "📘"}</span>
          <div style="text-align: left;">
            <div style="font-weight: 700; color: var(--color-text); font-size: var(--font-size-xs);">${file.name}</div>
            <div style="font-size: 0.72rem; color: var(--color-text-muted);">${(file.size / 1024).toFixed(1)} KB • Valid ${ext.toUpperCase().replace(".", "")} Document</div>
          </div>
          <button type="button" id="remove-file-action-btn" style="background: none; border: none; color: var(--color-error); cursor: pointer; padding: 4px; font-weight: bold; font-size: var(--font-size-sm);" title="Remove selected file">✕</button>
        </div>
      `;

      document.getElementById("remove-file-action-btn")?.addEventListener("click", (e) => {
        e.stopPropagation();
        selectedFile = null;
        fileInput.value = "";
        fileDisplay.style.display = "none";
      });
    }

    function showAlert(msg) {
      if (alertEl) {
        alertEl.textContent = msg;
        alertEl.style.display = "block";
        alertEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }

    function hideAlert() {
      if (alertEl) {
        alertEl.style.display = "none";
      }
    }

    // Reset Form
    resetBtn?.addEventListener("click", () => {
      selectedFile = null;
      if (fileInput) fileInput.value = "";
      if (fileDisplay) fileDisplay.style.display = "none";
      if (jobInput) jobInput.value = "";
      customRoleName = "";
      updateCounter();
      hideAlert();
      if (resultsTarget) resultsTarget.innerHTML = "";
    });

    // Form Submit & Analysis
    form?.addEventListener("submit", (e) => {
      e.preventDefault();

      // Validation 1: Resume file
      if (!selectedFile) {
        showAlert("Please upload or browse a resume file (PDF or DOCX) to proceed with analysis.");
        dropzone?.focus();
        return;
      }

      // Validation 2: Role selection
      if (selectedRoleId === "custom" && !customRoleName.trim()) {
        showAlert("Please enter a custom role title for your selected career path.");
        customRoleInput?.focus();
        return;
      }

      // Validation 3: Job description
      const jobText = jobInput.value.trim();
      if (!jobText || jobText.length < 25) {
        showAlert("Please provide a target job description (at least 25 characters) or click 'Load Role Template'.");
        jobInput.focus();
        return;
      }

      hideAlert();

      // Loading state
      analyzeBtn.disabled = true;
      analyzeBtn.innerHTML = `
        <span class="status-dot" style="animation: pulse 1s infinite;"></span>
        Evaluating Semantic Alignment...
      `;

      const roleDisplay = selectedRoleId === "custom"
        ? customRoleName.trim()
        : (findRoleById(selectedRoleId)?.title || "Software Specialist");
      const domainObj = getDomainById(selectedDomainId);

      setTimeout(() => {
        analyzeBtn.disabled = false;
        analyzeBtn.innerHTML = `
          ${ICONS.analyzer}
          Re-analyze Resume &amp; Calculate Match
        `;
        renderAnalysisResults(selectedFile.name, domainObj ? domainObj.name : "Engineering", roleDisplay, jobText);
        resultsTarget.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 700);
    });
  }

  function renderAnalysisResults(fileName, domainName, roleTitle, jobText) {
    const resultsTarget = document.getElementById("results-target");
    if (!resultsTarget) return;

    // Extract dynamic skills simulation based on domain and role
    const roleObj = findRoleById(selectedRoleId);
    const standardSkills = (roleObj && roleObj.skills) ? roleObj.skills : ["System Architecture", "Version Control", "Unit Testing", "Problem Solving"];

    const matchedSkills = standardSkills.slice(0, Math.min(5, standardSkills.length));
    const missingSkills = standardSkills.slice(Math.min(5, standardSkills.length));
    if (missingSkills.length === 0) {
      missingSkills.push("Automated Integration Pipelines", "Cloud Observability & Tracing");
    }

    resultsTarget.innerHTML = `
      <div class="results-container">
        <!-- Demo Banner Notice -->
        <div class="card" style="background: var(--color-primary-light); border-color: rgba(108, 76, 241, 0.3);">
          <div class="card-body" style="padding: var(--space-4) var(--space-6); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: var(--space-3);">
            <div style="display: flex; align-items: center; gap: var(--space-3);">
              <span class="badge badge-purple">Demonstration Analysis</span>
              <p style="margin: 0; font-size: var(--font-size-xs); color: var(--color-text);">
                <strong>Prototype Notice:</strong> These results showcase the multi-metric career intelligence model. Keyword coverage and simulated semantic alignment are informational estimations for career preparation.
              </p>
            </div>
            <button type="button" class="btn btn-secondary btn-sm" id="reset-results-btn">Start New Analysis</button>
          </div>
        </div>

        <!-- Overview Score Card -->
        <div class="score-overview-card">
          <div class="big-score-gauge">
            <span class="score-num">87%</span>
            <span class="score-lbl">Compatibility</span>
          </div>
          <div>
            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: var(--space-2); margin-bottom: var(--space-2);">
              <h2 style="font-size: var(--font-size-xl); margin: 0; color: var(--color-text);">
                Compatibility Evaluation: ${roleTitle}
              </h2>
              <span class="badge badge-available">Strong Alignment</span>
            </div>
            <p style="font-size: var(--font-size-sm); color: var(--color-text-muted); margin-bottom: var(--space-4); line-height: 1.5;">
              Evaluated <strong>${fileName}</strong> within <strong>${domainName}</strong> against target posting requirements. High overlap in core technical competencies and functional scope.
            </p>
            <div class="score-breakdown-bars">
              <div>
                <div style="display: flex; justify-content: space-between; font-size: var(--font-size-xs); font-weight: 600; margin-bottom: 3px;">
                  <span>1. Required Skills &amp; Keyword Coverage (Explicit Terms)</span>
                  <span style="color: var(--color-primary);">90%</span>
                </div>
                <div class="metric-bar-bg"><div class="metric-bar-fill" style="width: 90%;"></div></div>
              </div>
              <div>
                <div style="display: flex; justify-content: space-between; font-size: var(--font-size-xs); font-weight: 600; margin-bottom: 3px;">
                  <span>2. Relevant Experience Evidence (Contextual Metrics)</span>
                  <span style="color: var(--color-primary);">84%</span>
                </div>
                <div class="metric-bar-bg"><div class="metric-bar-fill" style="width: 84%;"></div></div>
              </div>
              <div>
                <div style="display: flex; justify-content: space-between; font-size: var(--font-size-xs); font-weight: 600; margin-bottom: 3px;">
                  <span>3. Contextual Semantic Fit (Domain Proximity)</span>
                  <span style="color: var(--color-primary);">88%</span>
                </div>
                <div class="metric-bar-bg"><div class="metric-bar-fill" style="width: 88%;"></div></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Detail Breakdown Grid -->
        <div class="results-detail-grid">
          <!-- Skills Found -->
          <div class="card">
            <div class="card-header" style="background: var(--color-success-light);">
              <h3 class="card-title" style="color: var(--color-success-on); font-size: var(--font-size-md);">
                ✓ Matched Core Skills (${matchedSkills.length + 3} Detected)
              </h3>
            </div>
            <div class="card-body">
              <p style="font-size: var(--font-size-xs); color: var(--color-text-muted); margin-bottom: var(--space-3);">
                These qualifications are explicitly identifiable in your resume and align directly with the posting requirements:
              </p>
              <div style="display: flex; flex-wrap: wrap; gap: var(--space-2);">
                ${matchedSkills.map((s) => `<span class="skill-tag match">✓ ${s}</span>`).join("")}
                <span class="skill-tag match">✓ Git &amp; Code Review</span>
                <span class="skill-tag match">✓ Technical Documentation</span>
                <span class="skill-tag match">✓ Agile Collaboration</span>
              </div>
            </div>
          </div>

          <!-- Missing Keywords / Skill Gaps -->
          <div class="card">
            <div class="card-header" style="background: var(--color-error-light);">
              <h3 class="card-title" style="color: var(--color-error-on); font-size: var(--font-size-md);">
                ✕ Skill &amp; Keyword Gaps (${missingSkills.length + 1} Recommended)
              </h3>
            </div>
            <div class="card-body">
              <p style="font-size: var(--font-size-xs); color: var(--color-text-muted); margin-bottom: var(--space-3);">
                These terms are emphasized in the posting but appear missing or unquantified in your resume bullets:
              </p>
              <div style="display: flex; flex-wrap: wrap; gap: var(--space-2);">
                ${missingSkills.map((s) => `<span class="skill-tag gap">✕ ${s}</span>`).join("")}
                <span class="skill-tag gap">✕ Multi-Region Disaster Recovery</span>
              </div>
              <p style="font-size: var(--font-size-xs); color: var(--color-text-muted); margin-top: var(--space-3);">
                <em>Action: If you have prior experience with these tools, integrate them into project bullet points with measurable outcomes.</em>
              </p>
            </div>
          </div>
        </div>

        <!-- Evidence-Based Writing Recommendations -->
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Evidence-Based Writing Recommendations</h3>
            <span class="badge badge-purple">Recruiter Tips</span>
          </div>
          <div class="card-body">
            <ul class="recommendation-list">
              <li class="rec-item">
                <strong>Quantify Engineering Impact:</strong>
                Transform generic task statements into metric-driven outcomes. For instance, replace <em>"Responsible for maintaining backend services"</em> with <em>"Architected high-throughput services handling 12k+ requests/sec, reducing p95 API response times by 38%."</em>
              </li>
              <li class="rec-item">
                <strong>Incorporate Production &amp; Scale Context:</strong>
                State database sizes, user concurrency, or infrastructure scale (e.g. <em>"Deployed containerized services to Kubernetes clusters supporting 200k daily active users."</em>).
              </li>
              <li class="rec-item">
                <strong>Bridge Missing Keywords with Real Projects:</strong>
                If you have used ${missingSkills[0] || "relevant tools"}, add a distinct bullet point detailing the exact project scope and business value delivered.
              </li>
            </ul>
          </div>
        </div>

        <!-- Scoring Methodology Transparency Notice -->
        <div class="card" style="border-left: 4px solid var(--color-primary);">
          <div class="card-body" style="padding: var(--space-5);">
            <h4 style="margin: 0 0 var(--space-2); font-size: var(--font-size-sm); color: var(--color-text);">
              Understanding the Scoring Methodology
            </h4>
            <p style="font-size: var(--font-size-xs); color: var(--color-text-muted); line-height: 1.6; margin: 0 0 var(--space-3);">
              The compatibility calculation evaluates three distinct dimensions:
              <strong>(1) Keyword Coverage</strong> (exact terminology present in text),
              <strong>(2) Relevant Evidence</strong> (verifiable project bullets with metrics and active verbs), and
              <strong>(3) Contextual Semantic Similarity</strong> (conceptual alignment between candidate background and role scope).
            </p>
            <p style="font-size: var(--font-size-xs); color: var(--color-text-muted); line-height: 1.6; margin: 0;">
              <strong>Disclaimer:</strong> Compatibility scores are informational estimations designed for candidate guidance. Real applicant tracking systems utilize proprietary parsing engines, and no score guarantees an interview invitation or hiring outcome.
            </p>
          </div>
        </div>

        <!-- Next Action: ATS Resume Templates -->
        <div class="card" style="background: var(--color-surface); border: 1px solid var(--color-border); box-shadow: var(--shadow-sm);">
          <div class="card-body" style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: var(--space-4);">
            <div>
              <h3 style="font-size: var(--font-size-md); margin-bottom: 4px; color: var(--color-text);">Next Step: Explore ATS-Friendly PDF Templates</h3>
              <p style="color: var(--color-text-muted); margin: 0; font-size: var(--font-size-xs);">Format your updated resume using one of our verified, downloadable single-page engineering templates.</p>
            </div>
            <a class="btn btn-primary" href="${hrefFromRoot("pages/templates.html")}">Browse PDF Templates</a>
          </div>
        </div>
      </div>
    `;

    document.getElementById("reset-results-btn")?.addEventListener("click", () => {
      resultsTarget.innerHTML = "";
      document.getElementById("analyzer-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  renderForm();
}
