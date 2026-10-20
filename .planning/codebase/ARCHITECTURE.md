---
last_mapped_commit: 26a289080d5c74e019f574f0a1b69a67dc43bdb1
last_mapped_at: 2026-10-20
---
<!-- refreshed: 2026-10-20 -->

# Architecture

**Analysis Date:** 2026-10-20

## System Overview

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                             Browser Client (SPA)                            │
│                             `index.html`                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                          Application Root & Entry                           │
│                     `src/main.jsx` -> `src/App.jsx`                         │
├──────────────────────┬──────────────────────┬───────────────────────────────┤
│    Persistent UI     │   Routing Manager    │       Global Modals           │
│ `AmbientWaveBg.jsx`  │  `react-router-dom`  │  `ContactModal.jsx`           │
│ `Header.jsx`         │  `<Routes>` (9 views)│  `PdfPreviewModal.jsx`        │
│ `Footer.jsx`         │  `<ScrollToTop />`   │                               │
└──────────┬───────────┴──────────┬───────────┴───────────────┬───────────────┘
           │                      │                           │
           ▼                      ▼                           ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           Page Views (`src/pages/`)                         │
│  `HomePage.jsx`           `RoadmapsPage.jsx`        `ProjectsPage.jsx`      │
│  `AnalyzerPage.jsx`       `TemplatesPage.jsx`       `InternshipsPage.jsx`   │
│  `DashboardPage.jsx`      `FeedbackPage.jsx`        `AboutPage.jsx`         │
└─────────────────────────────────────┬───────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                      Data Catalogues (`data/*.js`)                          │
│  `jobRoles.js`       `jobSources.js`     `matchingDemo.js`                  │
│  `projects.js`       `roadmaps.js`                                          │
└─────────────────────────────────────┬───────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                   Static Assets & Templates (`public/assets/`)              │
│  `domains/*.svg`     `resume-templates/*.pdf`   `branding/*`                │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Component Responsibilities

| Component | Responsibility | File |
|-----------|----------------|------|
| `App` | Root component managing global layout, modal states (`contactOpen`, `previewModal`), and route declarations | `src/App.jsx` |
| `Header` | Full-width editorial navigation header with brand mark, platform routes, and contact triggers | `src/components/Header.jsx` |
| `Footer` | Platform footer with system disclosures, domain quick links, and institutional copyright | `src/components/Footer.jsx` |
| `AmbientWaveBackground` | Pure CSS/SVG multi-layer animated ambient background (watermark-free motion graphics) | `src/components/AmbientWaveBackground.jsx` |
| `PdfPreviewModal` | Reusable modal dialog for previewing ATS resume PDF templates and downloading documents | `src/components/PdfPreviewModal.jsx` |
| `ContactModal` | Interactive contact & inquiry modal with mock dispatch state | `src/components/ContactModal.jsx` |
| `HomePage` | Editorial hero, 10-domain selection grid, career timeline, ATS highlights, and platform showcases | `src/pages/HomePage.jsx` |
| `AnalyzerPage` | Client-side ATS benchmark tool calculating skill match scores, missing keywords, and writing tips | `src/pages/AnalyzerPage.jsx` |
| `RoadmapsPage` | Interactive career pathway explorer featuring 10 engineering domains and 4-tier milestone roadmaps | `src/pages/RoadmapsPage.jsx` |
| `ProjectsPage` | Portfolio project directory with difficulty tags, tech stack badges, and implementation specs | `src/pages/ProjectsPage.jsx` |
| `TemplatesPage` | Downloadable ATS-tested resume templates with real-time preview modals | `src/pages/TemplatesPage.jsx` |
| `DashboardPage` | Candidate readiness overview with simulated target role matching and portfolio checklist | `src/pages/DashboardPage.jsx` |
| `InternshipsPage` | Curated listing of engineering internship opportunities and hiring board directories | `src/pages/InternshipsPage.jsx` |
| `FeedbackPage` | User feedback collection form with category selection and submission feedback | `src/pages/FeedbackPage.jsx` |
| `AboutPage` | Project institutional background, mission, architecture specifications, and engineering disclosures | `src/pages/AboutPage.jsx` |

## Pattern Overview

**Overall:** Component-Driven Client-Side Single Page Application (SPA).

**Key Characteristics:**
- **Zero Backend Reliance:** All application logic, job roles, roadmaps, and matching algorithms execute locally in browser memory.
- **Translucent Layered Glass UI:** Dark navy foundation (`#181727`) overlaid with continuous CSS/SVG animated ambient waves and glassmorphic card containers (`im-card`).
- **Data Catalogues via ESM:** Structured datasets exported as standalone JavaScript objects and helper functions in `data/`, imported directly into page components.
- **Declarative Navigation:** URL-driven state powered by `react-router-dom` with deep-linkable domain anchors (`#domains`, `#journey`).

## Layers

**1. Presentation Layer (`src/components/`, `src/pages/`):**
- Purpose: Render accessible, responsive UI with Tailwind utility classes and custom animations.
- Location: `src/pages/` and `src/components/`
- Contains: React functional components, hooks (`useState`, `useEffect`, `useMemo`), Lucide SVG icons.
- Depends on: `data/` catalogues, Tailwind utility tokens in `src/index.css`.
- Used by: Browser runtime via `src/App.jsx`.

**2. State & Modal Orchestration Layer (`src/App.jsx`):**
- Purpose: Coordinate cross-cutting dialog state (`PdfPreviewModal`, `ContactModal`) and scroll restoration (`ScrollToTop`).
- Location: `src/App.jsx`
- Contains: React root state and router provider outlet.
- Depends on: React Router DOM.
- Used by: Child route components via prop handlers (`onOpenContact`, `onPreviewPdf`).

**3. Static Business Data Layer (`data/`):**
- Purpose: Serve domain-specific knowledge models (engineering competencies, project blueprints, roadmap stages).
- Location: `data/`
- Contains: Immutable JS arrays, domain mappings, and accessor functions (e.g. `getRolesForDomain()`).
- Depends on: None (Vanilla ESM).
- Used by: `src/pages/*.jsx` and `src/components/*.jsx`.

## Data Flow

### Primary Request Path (Resume Benchmark Flow)

1. User selects target domain & role in `AnalyzerPage` (`src/pages/AnalyzerPage.jsx:40-58`).
2. `getRolesForDomain()` resolves competencies from data catalogue (`data/jobRoles.js`).
3. User uploads or pastes resume content; click triggers `handleRunAnalysis` (`src/pages/AnalyzerPage.jsx:80-123`).
4. Client-side heuristic simulates lexical parsing against role skills array, scoring match percentage and computing missing skills.
5. React updates local state (`setAnalysisResult`), rendering score gauge, keyword tags, and action items.

### Secondary Flow (PDF Template Preview & Download)

1. User triggers "Preview Template" on `TemplatesPage` or `HomePage` (`src/pages/TemplatesPage.jsx:110`).
2. Prop callback invokes `handleOpenPdfPreview` in parent `App` (`src/App.jsx:63-73`).
3. Global state activates `PdfPreviewModal` with asset URL pointing to `public/assets/resume-templates/*.pdf`.
4. User inspects document preview iframe and downloads file directly via browser file download.

**State Management:**
- Component-local state via React `useState` and `useMemo`.
- Shared application state (e.g., active modals) managed at the root `App.jsx` level and passed through props.
- No global state container (Redux, Zustand, Recoil) is required or installed.

## Key Abstractions

**Engineering Domain Model:**
- Purpose: Unified taxonomy for all 10 supported engineering careers (Software Dev, AI/ML, Cloud DevOps, Data Analytics, Cybersecurity, Embedded IoT, Mobile, Systems, QA Automation, Web Dev).
- Examples: `data/jobRoles.js`, `data/roadmaps.js`, `public/assets/domains/*.svg`
- Pattern: Domain ID key (`id: "software-dev"`) used consistently across asset paths, role catalogues, and roadmap trees.

**Roadmap Tier Hierarchy:**
- Purpose: 4-step progressive career acceleration path (Foundations -> Core Competencies -> Advanced Specialization -> Production Readiness).
- Examples: `data/roadmaps.js`, `src/pages/RoadmapsPage.jsx`
- Pattern: Recursive milestone nodes with skills, projects, and estimated duration.

## Entry Points

**HTML Entry Point:**
- Location: `index.html`
- Triggers: Browser document request to root URL (`/`).
- Responsibilities: Loads fonts (`Inter`, `Source Serif 4`, `Manrope`), mounts `#root` div, and loads `src/main.jsx`.

**React Bootstrap Entry Point:**
- Location: `src/main.jsx`
- Triggers: Vite bundle execution.
- Responsibilities: Wraps `<App />` in `<BrowserRouter>` and mounts into `#root` DOM element using `ReactDOM.createRoot`.

## Architectural Constraints

- **Threading:** Single-threaded JavaScript event loop; mock analysis executes synchronously with a short `setTimeout` (850ms) to emulate computation.
- **Global state:** No external global store; root layout state in `src/App.jsx` handles global modal visibility.
- **Zero-Dependency Constraint:** Strictly no new external libraries or backend frameworks beyond existing `react`, `react-router-dom`, `lucide-react`, `tailwindcss`, and `bootstrap`.
- **Circular imports:** None detected. Unidirectional dependency flow: `main.jsx` -> `App.jsx` -> `pages/` & `components/` -> `data/`.

## Anti-Patterns

### Mega-Component File Size

**What happens:** Core pages like `HomePage.jsx` (~1,400 lines) encapsulate multiple distinct sections (hero, domain grid, journey timeline, FAQ, testimonials) in a single file with embedded helper sub-components.
**Why it's wrong:** Increases merge conflict risk and makes code reuse across routes cumbersome.
**Do this instead:** Refactor self-contained sections into discrete components under `src/components/home/` (e.g. `HomeHero.jsx`, `DomainGrid.jsx`, `CareerTimeline.jsx`).

### Prop Drilling Modal Handlers

**What happens:** `onOpenContact` and `onPreviewPdf` handlers are passed down from `App.jsx` across multiple page and sub-component layers.
**Why it's wrong:** Adds boilerplate props to intermediate components that do not directly consume them.
**Do this instead:** Use React's built-in `createContext` / `useContext` hook to create a lightweight `ModalContext`.

## Error Handling

**Strategy:** Graceful client-side fallback with defensive parameter checks and default props.

**Patterns:**
- Safe array fallback when querying catalogues (e.g. `availableRoles.find(...) || availableRoles[0]`).
- PDF preview modal checks file availability and displays fallback messaging if the target asset is missing (`src/components/PdfPreviewModal.jsx:32-48`).
- Wildcard route catch-all (`<Route path="*" element={<Navigate to="/" replace />} />`) in `src/App.jsx:128` prevents 404 dead ends.

## Cross-Cutting Concerns

**Logging:** Local browser console output during development; production builds suppress unnecessary logging.
**Validation:** Basic client-side form input validation for required fields before dispatch simulation in `ContactModal.jsx` and `AnalyzerPage.jsx`.
**Authentication:** Not implemented; completely open access for candidate career discovery.

---

*Architecture analysis: 2026-10-20*
