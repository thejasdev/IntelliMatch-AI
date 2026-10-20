# Roadmap: IntelliMatch AI — Career Discovery & Readiness

## Overview

This roadmap establishes the execution path for bringing the existing IntelliMatch AI brownfield application to complete visual and interactive polish. Structured across four focused phases, it prioritizes the user's latest outstanding requirements: navigation bar color harmonization, dropdown layering, editorial hero redesign, domain card surface blending, semantic matching duplication fix, and a comprehensive cross-surface quality audit.

## Phases

- [ ] **Phase 1: Navigation Bar & More Dropdown Harmonization** - Align navbar colors with dark midnight-navy theme and fix More dropdown positioning, stacking order, and contrast.
- [ ] **Phase 2: Editorial Two-Column Home Hero Redesign** - Implement large editorial two-column hero composition with natural line breaks, aligned CTAs, and framed border.
- [ ] **Phase 3: Domain Cards Color Harmonization & Semantic Matching Resolution** - Harmonize domain card surfaces with the dark background and eliminate duplicate semantic-matching content on the Home page.
- [ ] **Phase 4: Cross-Surface Consistency & Verification Audit** - Conduct comprehensive responsive layout verification and color token audit across all 9 platform destinations.

## Phase Details

### Phase 1: Navigation Bar & More Dropdown Harmonization
**Goal**: Harmonize header surfaces with the dark midnight-navy background and resolve all positioning, clipping, and z-index issues in the More dropdown menu.
**Depends on**: Nothing (first phase)
**Requirements**: NAV-01, NAV-02, NAV-03
**Success Criteria** (what must be TRUE):
  1. Header bar seamlessly integrates with the dark midnight-navy motion background without harsh bright surfaces.
  2. "More" dropdown opens cleanly below its trigger button without horizontal clipping on all viewports.
  3. "More" dropdown panel has high contrast, legible typography, and stacks cleanly above the hero section (z-index layering).
  4. All 9 platform routes, official logo mark, and Resume Analyzer CTA remain fully accessible and interactive.
**Plans**: 2 plans

Plans:
- [ ] 01-01: Header surface styling and dark theme token harmonization (`src/components/Header.jsx`, `src/index.css`).
- [ ] 01-02: More dropdown positioning, stacking context, keyboard navigation, and contrast refinement (`src/components/Header.jsx`).

### Phase 2: Editorial Two-Column Home Hero Redesign
**Goal**: Transform the centered Home hero into an authoritative, editorial-style two-column composition inspired by the reference design.
**Depends on**: Phase 1
**Requirements**: HERO-01, HERO-02, HERO-03, HERO-04
**Success Criteria** (what must be TRUE):
  1. Hero layout renders as a balanced, responsive two-column grid on desktop screens.
  2. Left column showcases large, bold headline “Find Your Path. Build Your Future.” with natural line breaks and secondary line “Career Discovery & Readiness”.
  3. Right column neatly houses the supporting description and functional action CTAs (Explore Domains, Launch Roadmaps, Open Resume Analyzer).
  4. Subtle light border frames the hero container against the continuous midnight-navy ambient wave background.
**Plans**: 2 plans

Plans:
- [ ] 02-01: Two-column editorial hero grid and typography structure implementation (`src/pages/HomePage.jsx`).
- [ ] 02-02: CTA button styling, responsive mobile breakpoint stacking, and border framing (`src/pages/HomePage.jsx`).

### Phase 3: Domain Cards Color Harmonization & Semantic Matching Resolution
**Goal**: Blend domain-card surfaces with the background theme and eliminate duplicate semantic-matching content on the Home page.
**Depends on**: Phase 2
**Requirements**: CARD-01, CARD-02, MATCH-01, MATCH-02
**Success Criteria** (what must be TRUE):
  1. Domain card surfaces, titles, descriptions, role badges, borders, and buttons match the dark theme without visual clash.
  2. All 10 domain cards preserve their content, role lists, and working navigation to `/roadmaps?domain=...`.
  3. The Resume-to-Job Semantic Matching section appears exactly ONCE on the Home page.
  4. The single semantic matching section remains fully interactive with role scenario switching, match score wheel, keyword chips, and writing tips.
**Plans**: 2 plans

Plans:
- [ ] 03-01: Domain card visual token harmonization (`src/pages/HomePage.jsx`, `src/index.css`).
- [ ] 03-02: Root-cause duplicate cleanup and interactive semantic matching demonstration refinement (`src/pages/HomePage.jsx`).

### Phase 4: Cross-Surface Consistency & Verification Audit
**Goal**: Verify visual harmony, dark theme cohesion, and responsive integrity across all 9 platform destinations.
**Depends on**: Phase 3
**Requirements**: COHESION-01, COHESION-02
**Success Criteria** (what must be TRUE):
  1. All 9 platform views (`/`, `/roadmaps`, `/projects`, `/templates`, `/analyzer`, `/internships`, `/dashboard`, `/feedback`, `/about`) display cohesive dark theme styling.
  2. No broken routes, broken anchor links, or missing PDF template preview triggers.
  3. Mobile drawer navigation and responsive breakpoints function smoothly across all screen sizes.
  4. Production build (`npm run build`) executes cleanly with zero syntax or bundling errors.
**Plans**: 1 plan

Plans:
- [ ] 04-01: Full platform navigation, modal dialogs, and responsive viewport verification audit.

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Navigation Bar & More Dropdown Harmonization | 0/2 | Not started | - |
| 2. Editorial Two-Column Home Hero Redesign | 0/2 | Not started | - |
| 3. Domain Cards Color Harmonization & Semantic Matching Resolution | 0/2 | Not started | - |
| 4. Cross-Surface Consistency & Verification Audit | 0/1 | Not started | - |

---
*Roadmap defined: 2026-10-20*
