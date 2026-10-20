<!-- GSD:project-start source:PROJECT.md -->

## Project

**IntelliMatch AI — Career Discovery & Readiness**

IntelliMatch AI is a modern, interactive web application built with React, Vite, and Tailwind CSS designed to empower engineering students to discover technology domains, follow progressive skill roadmaps, build portfolio-grade capstones, and prepare for competitive technical internships and employment. The platform provides structured exploration across 10 specialized engineering domains with client-side ATS resume benchmarking, curated project blueprints, and downloadable templates.

**Core Value:** Provide engineering students with an institutional, structured, and visually compelling bridge between university studies and industry-ready career paths across 10 technology domains.

### Constraints

- **Tech Stack**: React 18, Vite 5, Tailwind CSS 3.4.17, PostCSS, Lucide React icons.
- **Zero-Dependency Constraint**: No new packages in `package.json`; strictly utilize existing dependencies and native CSS transitions.
- **Preservation Guarantee**: Never discard, replace, or reset working routes, components, data catalogues, or static PDF assets.
- **Design Tokens**: Muted midnight navy (`#181727`, `#1A1B2F`), wave blue (`#314F81`, `#146FE8`), electric cyan (`#19C6E8`), ice white (`#F5F9FF`), and translucent glass (`rgba(36, 38, 62, 0.72)`).

<!-- GSD:project-end -->

<!-- GSD:stack-start source:codebase/STACK.md -->

## Technology Stack

## Languages

- JavaScript (ES6+ / ESM) - Core application logic, React components, and data catalogues across `src/` and `data/`
- HTML5 / CSS3 - Semantic markup and responsive utility styling via Tailwind CSS and PostCSS in `index.html` and `src/index.css`

## Runtime

- Node.js (v18+ recommended, development tested on Node.js v24)
- Browser environment: Modern evergreen browsers (Chrome, Edge, Firefox, Safari)
- npm (package-lock.json present)
- Lockfile: `package-lock.json` present

## Frameworks

- React 18.3.1 (`react`, `react-dom`) - Component-based client-side UI rendering in `src/App.jsx` and `src/pages/`
- React Router DOM 6.29.0 (`react-router-dom`) - Client-side SPA routing across 9 primary platform routes
- Tailwind CSS 3.4.17 (`tailwindcss`) - Utility-first styling with custom brand color tokens (`brand-navy`, `brand-slate`, `brand-cyan`, `brand-violet`) defined in `tailwind.config.js`
- PostCSS 8.5.3 (`postcss`, `autoprefixer`) - CSS processing pipeline in `postcss.config.js`
- Lucide React 0.475.0 (`lucide-react`) - Consistent icon library across navigation, cards, and interactive feedback
- React-Bootstrap 2.10.9 & Bootstrap 5.3.3 - Installed in `package.json` for auxiliary components
- Not configured - No automated test runner (Jest/Vitest) currently installed in `package.json`
- Vite 5.4.14 (`vite`, `@vitejs/plugin-react`) - Fast ESM bundler, dev server on port 5173, and production bundling via Rollup

## Key Dependencies

- `react` (v18.3.1) - Declarative UI state management and lifecycle hooks in `src/`
- `react-router-dom` (v6.29.0) - Route management (`BrowserRouter`, `Routes`, `Route`, `Link`, `NavLink`) in `src/App.jsx`
- `lucide-react` (v0.475.0) - High-quality SVG icon system used across all page headers, metrics, and timeline nodes
- `@vitejs/plugin-react` (v4.3.4) - Vite plugin providing Fast Refresh and JSX transformation
- `tailwindcss` (v3.4.17) - Tailwind engine compiling custom utility classes into `dist/assets/*.css`

## Configuration

- Fully client-side SPA with self-contained mock data catalogues in `data/`
- No mandatory `.env` secrets required for frontend execution
- `vite.config.js` - Configures React plugin, server host binding, and default port 5173
- `tailwind.config.js` - Defines font families, custom keyframe animations, extended color palettes, and container widths
- `postcss.config.js` - Configures Tailwind CSS and Autoprefixer PostCSS plugins

## Platform Requirements

- Node.js 18+ and npm
- Local dev server accessible at `http://localhost:5173/` via `npm run dev`
- Static file hosting target (Vercel, Netlify, Cloudflare Pages, AWS S3/CloudFront, or Nginx)
- Production build output in `dist/` via `npm run build`

<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->

## Conventions

## Naming Patterns

- React Components and Pages: PascalCase with `.jsx` suffix (e.g., `Header.jsx`, `AmbientWaveBackground.jsx`, `AnalyzerPage.jsx`).
- Data Modules & Utilities: camelCase with `.js` suffix (e.g., `jobRoles.js`, `matchingDemo.js`).
- Static Assets & SVGs: kebab-case with descriptive names (e.g., `software-dev.svg`, `cloud-devops.svg`).
- React Functional Components: PascalCase matching the file name (`export default function Header(...)`).
- Event Handlers: camelCase with `handle` prefix (`handleOpenContact`, `handleClosePdfPreview`, `handleRunAnalysis`, `handleTabChange`).
- Domain Helper & Accessor Functions: camelCase with action prefix (`getRolesForDomain()`, `getDomainStats()`, `calculateMatchScore()`).
- Local State & References: camelCase (`selectedDomain`, `isAnalyzing`, `analysisResult`, `previewModal`).
- Boolean Flags: camelCase with interrogative prefix (`isOpen`, `isAvailable`, `isAnalyzing`, `hasScrolled`).
- Constant Dictionaries & Datasets: UPPER_SNAKE_CASE for module-level constants (`ENGINEERING_DOMAINS`, `DOMAIN_ROADMAPS`, `SAMPLE_JOB_DESCRIPTIONS`).
- JavaScript codebase without TypeScript; JSDoc annotations optional for complex data models.

## Code Style

- 2-space indentation throughout `.js` and `.jsx` files.
- Double quotes `"` for JSX attribute strings and JavaScript module imports.
- Trailing commas in multi-line object and array declarations.
- Semantic HTML tags (`<main>`, `<header>`, `<footer>`, `<nav>`, `<section>`, `<article>`).
- No strict ESLint or Biome config file currently present in project root.
- Code conforms to standard React 18 ESM idioms and clean JSX syntax without syntax warnings in Vite build.

## Import Organization

- Explicit relative paths (e.g., `./components/Header.jsx`, `../../data/jobRoles.js`).
- No `@/` or `~` alias configured in `vite.config.js`. Always use explicit relative paths with extensions (`.jsx`, `.js`).

## Error Handling

- Defensive fallback values for lookups: `const role = availableRoles.find(...) || availableRoles[0];`
- Safe asset URL validation in `PdfPreviewModal.jsx`: checks `resolvedUrl.startsWith("http")` vs `/assets/` before attempting to render `<iframe>`.
- Catch-all navigation fallback: `<Route path="*" element={<Navigate to="/" replace />} />` prevents broken URLs.
- Graceful empty state rendering when list filters yield zero results (e.g. "No internships found matching your criteria" in `InternshipsPage.jsx`).

## Logging

- Minimal console logging in production code.
- Errors during file drop or preview fallback log with `console.warn` or show user-facing notification dialogues.

## Comments

- Section delimiters in large page components (e.g., `{/* 1. Global Persistent Video Layer */}`, `{/* Left Column: Editorial Headline */}`).
- Explanations for non-obvious CSS workarounds or scroll synchronization logic (e.g. `ScrollToTop` handling of hash anchors in `src/App.jsx:23-41`).
- Preserving design attribution and media licenses in asset headers.
- Sparsely used; self-documenting prop names and data structures preferred.

## Function Design

- Standard UI components kept under 150 lines (`LogoMark.jsx` 40 lines, `PdfPreviewModal.jsx` 140 lines).
- Large view pages (such as `HomePage.jsx` at ~1,400 lines) contain inline section layouts; new features should extract section sub-components to maintain modularity.
- Destructured props with sensible defaults: `function PdfPreviewModal({ isOpen, onClose, file, title, badge, isAvailable })`.
- Single handler props for parent notifications: `onOpenContact`, `onPreviewPdf`.
- React components consistently return clean JSX markup enclosed in a single root element or React fragment `<>`.

## Module Design

- Primary page/component files use `export default function ComponentName()`.
- Shared constants and data collections use named exports (`export const ENGINEERING_DOMAINS = [...]`, `export function getRolesForDomain(...)`).
- Not used. Components and data are imported directly from their respective source files (e.g., `import Header from "./components/Header.jsx"`).

<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->

## Architecture

## System Overview

```text

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

- **Zero Backend Reliance:** All application logic, job roles, roadmaps, and matching algorithms execute locally in browser memory.
- **Translucent Layered Glass UI:** Dark navy foundation (`#181727`) overlaid with continuous CSS/SVG animated ambient waves and glassmorphic card containers (`im-card`).
- **Data Catalogues via ESM:** Structured datasets exported as standalone JavaScript objects and helper functions in `data/`, imported directly into page components.
- **Declarative Navigation:** URL-driven state powered by `react-router-dom` with deep-linkable domain anchors (`#domains`, `#journey`).

## Layers

- Purpose: Render accessible, responsive UI with Tailwind utility classes and custom animations.
- Location: `src/pages/` and `src/components/`
- Contains: React functional components, hooks (`useState`, `useEffect`, `useMemo`), Lucide SVG icons.
- Depends on: `data/` catalogues, Tailwind utility tokens in `src/index.css`.
- Used by: Browser runtime via `src/App.jsx`.
- Purpose: Coordinate cross-cutting dialog state (`PdfPreviewModal`, `ContactModal`) and scroll restoration (`ScrollToTop`).
- Location: `src/App.jsx`
- Contains: React root state and router provider outlet.
- Depends on: React Router DOM.
- Used by: Child route components via prop handlers (`onOpenContact`, `onPreviewPdf`).
- Purpose: Serve domain-specific knowledge models (engineering competencies, project blueprints, roadmap stages).
- Location: `data/`
- Contains: Immutable JS arrays, domain mappings, and accessor functions (e.g. `getRolesForDomain()`).
- Depends on: None (Vanilla ESM).
- Used by: `src/pages/*.jsx` and `src/components/*.jsx`.

## Data Flow

### Primary Request Path (Resume Benchmark Flow)

### Secondary Flow (PDF Template Preview & Download)

- Component-local state via React `useState` and `useMemo`.
- Shared application state (e.g., active modals) managed at the root `App.jsx` level and passed through props.
- No global state container (Redux, Zustand, Recoil) is required or installed.

## Key Abstractions

- Purpose: Unified taxonomy for all 10 supported engineering careers (Software Dev, AI/ML, Cloud DevOps, Data Analytics, Cybersecurity, Embedded IoT, Mobile, Systems, QA Automation, Web Dev).
- Examples: `data/jobRoles.js`, `data/roadmaps.js`, `public/assets/domains/*.svg`
- Pattern: Domain ID key (`id: "software-dev"`) used consistently across asset paths, role catalogues, and roadmap trees.
- Purpose: 4-step progressive career acceleration path (Foundations -> Core Competencies -> Advanced Specialization -> Production Readiness).
- Examples: `data/roadmaps.js`, `src/pages/RoadmapsPage.jsx`
- Pattern: Recursive milestone nodes with skills, projects, and estimated duration.

## Entry Points

- Location: `index.html`
- Triggers: Browser document request to root URL (`/`).
- Responsibilities: Loads fonts (`Inter`, `Source Serif 4`, `Manrope`), mounts `#root` div, and loads `src/main.jsx`.
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

### Prop Drilling Modal Handlers

## Error Handling

- Safe array fallback when querying catalogues (e.g. `availableRoles.find(...) || availableRoles[0]`).
- PDF preview modal checks file availability and displays fallback messaging if the target asset is missing (`src/components/PdfPreviewModal.jsx:32-48`).
- Wildcard route catch-all (`<Route path="*" element={<Navigate to="/" replace />} />`) in `src/App.jsx:128` prevents 404 dead ends.

## Cross-Cutting Concerns

<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->

## Project Skills

No project skills found. Add skills to any of: `.agents/skills/`, `.agents/skills/`, `.cursor/skills/`, `.github/skills/`, or `.codex/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->

## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd-fast` for a trivial task inline, with no subagents and no PLAN.md
- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->

<!-- GSD:profile-start -->

## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
