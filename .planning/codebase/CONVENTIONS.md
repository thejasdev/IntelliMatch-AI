---
last_mapped_commit: 26a289080d5c74e019f574f0a1b69a67dc43bdb1
last_mapped_at: 2026-10-20
---
# Coding Conventions

**Analysis Date:** 2026-10-20

## Naming Patterns

**Files:**
- React Components and Pages: PascalCase with `.jsx` suffix (e.g., `Header.jsx`, `AmbientWaveBackground.jsx`, `AnalyzerPage.jsx`).
- Data Modules & Utilities: camelCase with `.js` suffix (e.g., `jobRoles.js`, `matchingDemo.js`).
- Static Assets & SVGs: kebab-case with descriptive names (e.g., `software-dev.svg`, `cloud-devops.svg`).

**Functions:**
- React Functional Components: PascalCase matching the file name (`export default function Header(...)`).
- Event Handlers: camelCase with `handle` prefix (`handleOpenContact`, `handleClosePdfPreview`, `handleRunAnalysis`, `handleTabChange`).
- Domain Helper & Accessor Functions: camelCase with action prefix (`getRolesForDomain()`, `getDomainStats()`, `calculateMatchScore()`).

**Variables:**
- Local State & References: camelCase (`selectedDomain`, `isAnalyzing`, `analysisResult`, `previewModal`).
- Boolean Flags: camelCase with interrogative prefix (`isOpen`, `isAvailable`, `isAnalyzing`, `hasScrolled`).
- Constant Dictionaries & Datasets: UPPER_SNAKE_CASE for module-level constants (`ENGINEERING_DOMAINS`, `DOMAIN_ROADMAPS`, `SAMPLE_JOB_DESCRIPTIONS`).

**Types:**
- JavaScript codebase without TypeScript; JSDoc annotations optional for complex data models.

## Code Style

**Formatting:**
- 2-space indentation throughout `.js` and `.jsx` files.
- Double quotes `"` for JSX attribute strings and JavaScript module imports.
- Trailing commas in multi-line object and array declarations.
- Semantic HTML tags (`<main>`, `<header>`, `<footer>`, `<nav>`, `<section>`, `<article>`).

**Linting:**
- No strict ESLint or Biome config file currently present in project root.
- Code conforms to standard React 18 ESM idioms and clean JSX syntax without syntax warnings in Vite build.

## Import Organization

**Order:**
1. React Core & Hooks (`import React, { useState, useEffect, useMemo } from "react";`)
2. Routing & External Libraries (`import { Routes, Route, Link, useLocation } from "react-router-dom";`, `import { ArrowRight, Sparkles } from "lucide-react";`)
3. Layout & Shared Components (`import Header from "./components/Header.jsx";`, `import LogoMark from "./components/LogoMark.jsx";`)
4. Data Catalogues & Utilities (`import { ENGINEERING_DOMAINS, getRolesForDomain } from "../../data/jobRoles.js";`)

**Path Aliases:**
- Explicit relative paths (e.g., `./components/Header.jsx`, `../../data/jobRoles.js`).
- No `@/` or `~` alias configured in `vite.config.js`. Always use explicit relative paths with extensions (`.jsx`, `.js`).

## Error Handling

**Patterns:**
- Defensive fallback values for lookups: `const role = availableRoles.find(...) || availableRoles[0];`
- Safe asset URL validation in `PdfPreviewModal.jsx`: checks `resolvedUrl.startsWith("http")` vs `/assets/` before attempting to render `<iframe>`.
- Catch-all navigation fallback: `<Route path="*" element={<Navigate to="/" replace />} />` prevents broken URLs.
- Graceful empty state rendering when list filters yield zero results (e.g. "No internships found matching your criteria" in `InternshipsPage.jsx`).

## Logging

**Framework:** Native browser `console`.

**Patterns:**
- Minimal console logging in production code.
- Errors during file drop or preview fallback log with `console.warn` or show user-facing notification dialogues.

## Comments

**When to Comment:**
- Section delimiters in large page components (e.g., `{/* 1. Global Persistent Video Layer */}`, `{/* Left Column: Editorial Headline */}`).
- Explanations for non-obvious CSS workarounds or scroll synchronization logic (e.g. `ScrollToTop` handling of hash anchors in `src/App.jsx:23-41`).
- Preserving design attribution and media licenses in asset headers.

**JSDoc/TSDoc:**
- Sparsely used; self-documenting prop names and data structures preferred.

## Function Design

**Size:**
- Standard UI components kept under 150 lines (`LogoMark.jsx` 40 lines, `PdfPreviewModal.jsx` 140 lines).
- Large view pages (such as `HomePage.jsx` at ~1,400 lines) contain inline section layouts; new features should extract section sub-components to maintain modularity.

**Parameters:**
- Destructured props with sensible defaults: `function PdfPreviewModal({ isOpen, onClose, file, title, badge, isAvailable })`.
- Single handler props for parent notifications: `onOpenContact`, `onPreviewPdf`.

**Return Values:**
- React components consistently return clean JSX markup enclosed in a single root element or React fragment `<>`.

## Module Design

**Exports:**
- Primary page/component files use `export default function ComponentName()`.
- Shared constants and data collections use named exports (`export const ENGINEERING_DOMAINS = [...]`, `export function getRolesForDomain(...)`).

**Barrel Files:**
- Not used. Components and data are imported directly from their respective source files (e.g., `import Header from "./components/Header.jsx"`).

---

*Convention analysis: 2026-10-20*
