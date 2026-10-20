---
last_mapped_commit: 26a289080d5c74e019f574f0a1b69a67dc43bdb1
last_mapped_at: 2026-10-20
---
# Codebase Concerns

**Analysis Date:** 2026-10-20

## Tech Debt

**Monolithic Page Components:**
- Issue: `src/pages/HomePage.jsx` is over 1,400 lines (~68 KB), encapsulating editorial hero logic, 10-domain selector grids, journey timelines, project previews, and interactive accordions in a single monolithic file.
- Files: `src/pages/HomePage.jsx`
- Impact: Elevated risk of merge conflicts during parallel feature development; reduced code reusability across pages.
- Fix approach: Decompose `HomePage.jsx` into focused sub-components under `src/components/home/` (e.g., `HomeHero.jsx`, `DomainDirectory.jsx`, `CareerTimeline.jsx`, `TestimonialSection.jsx`).

**Redundant Dependency Baggage:**
- Issue: Both `bootstrap` (v5.3.3) and `react-bootstrap` (v2.10.9) are declared in `package.json` dependencies, but the entire active UI is designed with Tailwind CSS utility classes and Lucide icons.
- Files: `package.json`
- Impact: Unnecessary bloat in `node_modules` and potential CSS class collision if Bootstrap stylesheets were imported.
- Fix approach: Remove `bootstrap` and `react-bootstrap` from `package.json` once confirmed no residual imports remain.

**Legacy Static Site Clutter:**
- Issue: Pre-React static files and directories (`pages/*.html`, `css/`, `js/`, `_backup_pre_react/`) remain in the repository root alongside the active Vite `src/` hierarchy.
- Files: Root directories `pages/`, `css/`, `js/`, `_backup_pre_react/`
- Impact: Potential confusion for developers or automated tools mapping project architecture.
- Fix approach: Archive or remove legacy static assets to isolate the active Vite application.

## Known Bugs

**Non-Deterministic Resume ATS Scoring:**
- Symptoms: Re-running analysis on the exact same resume and job description produces varying match scores on consecutive clicks.
- Files: `src/pages/AnalyzerPage.jsx:96`
- Trigger: The score computation uses pseudo-random variance (`Math.floor(70 + Math.random() * 20)`).
- Workaround: Deterministic lexical hashing or actual keyword intersection count should be used to calculate repeatable scores.

**Volatile Form Submissions:**
- Symptoms: Feedback and contact form submissions (`ContactModal.jsx`, `FeedbackPage.jsx`) show success states, but form payload is discarded upon dialog close without persistent storage or transmission.
- Files: `src/components/ContactModal.jsx`, `src/pages/FeedbackPage.jsx`
- Trigger: User fills out form and submits.
- Workaround: Persist inquiries to browser `localStorage` or emit webhook payload when an API endpoint becomes available.

## Security Considerations

**Unvalidated Client-Side Resume File Parsing:**
- Risk: Uploaded files (`.pdf`, `.docx`, `.txt`) are captured in local state without binary parsing; text parsing falls back to mock domain data without sanitization.
- Files: `src/pages/AnalyzerPage.jsx:61-75`
- Current mitigation: Basic file existence check; text input is sanitized through React JSX rendering.
- Recommendations: Introduce client-side text extraction (e.g., via `pdfjs-dist` or backend worker) with strict file MIME and size validation before processing.

**PDF Iframe Rendering:**
- Risk: PDF templates are rendered inside an `<iframe>` directly using asset paths (`src/components/PdfPreviewModal.jsx:119`).
- Files: `src/components/PdfPreviewModal.jsx`
- Current mitigation: URL check ensures path points to trusted `/assets/resume-templates/`.
- Recommendations: Maintain restrictive `sandbox` attributes on `<iframe>` to prevent unwanted script execution from third-party documents.

## Performance Bottlenecks

**Continuous Multi-Layer CSS Animations:**
- Problem: `AmbientWaveBackground.jsx` runs multiple infinite CSS keyframe animations (`animate-wave-primary`, `animate-wave-secondary`, `animate-wave-tertiary`, `animate-orb-1`, `animate-orb-2`) simultaneously across the entire viewport.
- Files: `src/components/AmbientWaveBackground.jsx`, `src/index.css:254-378`
- Cause: Continuous compositing and repaint overhead on low-end mobile devices or integrated GPUs.
- Improvement path: Leverage `IntersectionObserver` or CSS `prefers-reduced-motion` to throttle or pause animations when the browser tab is blurred or when reduced-motion is requested.

## Fragile Areas

**Anchor Hash Navigation Race Condition:**
- Files: `src/App.jsx:23-41` (`ScrollToTop` helper)
- Why fragile: When navigating between different pages with an anchor (e.g. `/roadmaps#domains`), `document.querySelector(hash)` executes immediately on route change before the target DOM element has mounted in the view.
- Safe modification: Add a slight `requestAnimationFrame` or `MutationObserver` delay before invoking `target.scrollIntoView()`.
- Test coverage: Currently manual testing only.

## Scaling Limits

**Static Data Catalogue In-Memory Size:**
- Current capacity: ~10 domains, ~50 roles, ~20 projects stored across static JavaScript files in `data/`.
- Limit: Expanding to hundreds of real-time job listings or granular sub-tracks directly in JS arrays will bloat bundle size and increase initial page load time.
- Scaling path: Transition from static arrays to dynamic imports, chunked JSON, or a client-side search index (e.g., Fuse.js or indexedDB).

## Dependencies at Risk

**Zero Risk Currently:**
- Critical packages (`react`, `react-dom`, `react-router-dom`, `lucide-react`, `tailwindcss`, `vite`) are modern, stable releases without deprecation warnings.
- Unnecessary packages (`bootstrap`, `react-bootstrap`) should be pruned to keep the dependency footprint lean.

## Missing Critical Features

**Client-Side Persistence:**
- Problem: Candidate progress, bookmarked roadmaps, target roles, and analyzed resume results reset when refreshing the browser.
- Blocks: Long-term career tracking and personalized learning journeys across multiple user sessions.

**Real Resume Parsing Engine:**
- Problem: The resume analyzer simulates ATS evaluation with mock arrays rather than extracting actual candidate text tokens.
- Blocks: High-accuracy resume keyword auditing against live job descriptions.

## Test Coverage Gaps

**Zero Automated Test Coverage:**
- What's not tested: All page routing, ATS scoring heuristics, modal toggles, and data retrieval functions.
- Files: `src/App.jsx`, `src/pages/*.jsx`, `data/jobRoles.js`, `src/components/*.jsx`
- Risk: Regressions in navigation, layout breakage, or calculation discrepancies can go unnoticed without manual inspection before deployments.

---

*Concerns analysis: 2026-10-20*
