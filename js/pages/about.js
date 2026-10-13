import { el, svgIcon } from "../utils/dom.js";
import { ICONS } from "../components/icons.js";
import { hrefFromRoot } from "../navigation.js";
import { ENGINEERING_DOMAINS } from "../../data/jobRoles.js";

export function initAboutPage() {
  const root = document.getElementById("about-root");
  if (!root) return;

  root.innerHTML = `
    <div class="page-header-banner">
      <h1>About IntelliMatch AI</h1>
      <p>AI-Powered Resume Analysis &amp; Semantic Job Matching Platform — empowering engineering students and professionals with multi-domain career intelligence, evidence-backed resume benchmarking, and ATS-friendly PDF templates.</p>
    </div>

    <div class="about-grid">
      <!-- 1. Mission and Target Users -->
      <article class="card about-card">
        <div style="display: flex; align-items: center; gap: var(--space-3); margin-bottom: var(--space-3);">
          <div style="color: var(--color-primary);">${ICONS.about}</div>
          <h2 style="font-size: var(--font-size-xl); margin: 0; color: var(--color-text);">
            Mission, Purpose &amp; Target Audience
          </h2>
        </div>
        <p style="line-height: 1.65; color: var(--color-text-muted); margin-bottom: var(--space-3);">
          Modern automated recruiting systems often leave candidates guessing why their applications fail to progress through screening pipelines. <strong>IntelliMatch AI</strong> was created to bring clarity, structure, and transparency to technical career preparation.
        </p>
        <p style="line-height: 1.65; color: var(--color-text-muted); margin-bottom: var(--space-4);">
          By comparing resume content directly against real-world job descriptions, candidates can uncover exact keyword gaps, evaluate contextual evidence within their project bullets, and align their resumes with industry standards across 10 specialized engineering disciplines.
        </p>
        <div style="background: var(--color-surface-subtle); border-radius: var(--radius-md); padding: var(--space-4); border: 1px solid var(--color-border);">
          <h4 style="margin: 0 0 var(--space-2); font-size: var(--font-size-sm); color: var(--color-text);">Target Users:</h4>
          <ul style="margin: 0; padding-left: var(--space-4); font-size: var(--font-size-xs); color: var(--color-text-muted); line-height: 1.6;">
            <li><strong>Engineering Students &amp; Recent Graduates:</strong> Seeking to translate coursework, capstone projects, and internships into industry-standard, ATS-conscious terminology.</li>
            <li><strong>Transitioning &amp; Mid-Level Engineers:</strong> Pivoting into new subfields (e.g. backend to cloud/DevOps, or software development to machine learning) who need to identify missing qualifications.</li>
            <li><strong>Senior Technical Professionals:</strong> Optimizing resume phrasing for high-impact metrics and executive recruiters without layout breakage.</li>
          </ul>
        </div>
      </article>

      <!-- 2. Core Feature Suite -->
      <article class="card about-card">
        <h2 style="font-size: var(--font-size-xl); margin-bottom: var(--space-3); color: var(--color-text);">
          Core Platform Capabilities
        </h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: var(--space-4); margin-top: var(--space-4);">
          <div class="tech-box">
            <h4>📄 Resume Analyzer</h4>
            <p>Upload PDF or DOCX resumes, select from 10 engineering domains and specific roles, paste target requirements, and receive structured match evaluations with writing recommendations.</p>
          </div>
          <div class="tech-box">
            <h4>📑 PDF Template Library</h4>
            <p>Access 6 verified, ATS-conscious single-page engineering PDF templates with selectable text, interactive modal preview, and instant downloads.</p>
          </div>
          <div class="tech-box">
            <h4>🔍 Semantic Job Search</h4>
            <p>Filter benchmark roles across 10 domains, explore integrated job sources (LinkedIn, Naukri, Internshala), or import job descriptions directly into the analyzer.</p>
          </div>
          <div class="tech-box">
            <h4>📊 Candidate Dashboard</h4>
            <p>Inspect career readiness baselines, track recent evaluation sessions by domain and role, and manage saved resume blueprints.</p>
          </div>
        </div>
      </article>

      <!-- 3. Supported Engineering Domains -->
      <article class="card about-card">
        <h2 style="font-size: var(--font-size-xl); margin-bottom: var(--space-2); color: var(--color-text);">
          Supported Engineering &amp; Technology Domains
        </h2>
        <p style="color: var(--color-text-muted); font-size: var(--font-size-xs); margin-bottom: var(--space-4);">
          Unlike single-domain AI tools, IntelliMatch AI features a centralized catalogue encompassing 10 technology disciplines:
        </p>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(210px, 1fr)); gap: var(--space-3);">
          ${ENGINEERING_DOMAINS.map(
            (d, idx) => `
            <div style="padding: var(--space-3); background: var(--color-surface-subtle); border-radius: var(--radius-sm); border: 1px solid var(--color-border);">
              <span style="font-size: 0.7rem; font-weight: 700; color: var(--color-primary); display: block; margin-bottom: 2px;">Domain ${idx + 1}</span>
              <strong style="font-size: var(--font-size-xs); color: var(--color-text); display: block;">${d.name}</strong>
              <span style="font-size: 0.72rem; color: var(--color-text-muted);">${d.roles.length} roles</span>
            </div>
          `
          ).join("")}
        </div>
      </article>

      <!-- 4. Architecture & Technical Roadmap -->
      <article class="card about-card">
        <h2 style="font-size: var(--font-size-xl); margin-bottom: var(--space-3); color: var(--color-text);">
          Technical Architecture &amp; Engineering Roadmap
        </h2>
        <p style="line-height: 1.65; color: var(--color-text-muted); margin-bottom: var(--space-4);">
          IntelliMatch AI is architected with clear decoupling between the client presentation layer and planned server-side intelligence:
        </p>
        <div class="tech-stack-grid">
          <div class="tech-box">
            <h4>Phase 1: SaaS Frontend (Current)</h4>
            <p>Built with semantic HTML5, modern CSS3 custom properties (purple and white palette), and modular Vanilla JavaScript ES6. Zero external framework dependencies.</p>
          </div>
          <div class="tech-box">
            <h4>Phase 2: FastAPI Microservice (Planned)</h4>
            <p>Python/FastAPI backend handling document text extraction (PDFMiner/PyMuPDF, python-docx), lexical parsing, and job provider connector feeds.</p>
          </div>
          <div class="tech-box">
            <h4>Phase 3: Semantic Embeddings (Planned)</h4>
            <p>Domain-fine-tuned Transformer models (Sentence-Transformers) computing true cosine similarity and semantic gap analysis beyond verbatim keyword counting.</p>
          </div>
        </div>
      </article>

      <!-- 5. Honest Limitations & Disclaimer -->
      <article class="card about-card" style="border-left: 5px solid var(--color-warning);">
        <h2 style="font-size: var(--font-size-xl); margin-bottom: var(--space-3); color: var(--color-text);">
          Current Prototype Scope &amp; Disclaimers
        </h2>
        <ul style="padding-left: var(--space-5); color: var(--color-text-muted); line-height: 1.65; margin-bottom: var(--space-4); display: flex; flex-direction: column; gap: var(--space-2); font-size: var(--font-size-xs);">
          <li>
            <strong>Frontend Demonstration Mode:</strong> All file validations, scoring breakdowns, and job listings run in client browser memory. No private resume text is stored on external servers in this phase.
          </li>
          <li>
            <strong>Honest Scoring Disclaimer:</strong> Match percentages and keyword gaps are educational career preparation estimates. They do not guarantee passing any specific employer's proprietary ATS or securing job interviews.
          </li>
          <li>
            <strong>External Job Search:</strong> Clicking external platform links (LinkedIn, Naukri, Internshala) launches official external search queries in a new tab. External listings are not scraped or imported into the prototype.
          </li>
          <li>
            <strong>Genuine PDF Assets:</strong> The 6 resume templates in the library are valid, downloadable vector PDF files created with ATS-tested layouts and fictional sample data.
          </li>
        </ul>
        <div style="display: flex; gap: var(--space-3); margin-top: var(--space-4); flex-wrap: wrap;">
          <a class="btn btn-primary btn-sm" href="${hrefFromRoot("pages/analyzer.html")}">Try Resume Analyzer</a>
          <a class="btn btn-secondary btn-sm" href="${hrefFromRoot("pages/templates.html")}">Download ATS Templates</a>
          <a class="btn btn-secondary btn-sm" href="${hrefFromRoot("pages/job-search.html")}">Search Jobs</a>
        </div>
      </article>
    </div>
  `;
}
