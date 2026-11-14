# Requirements: IntelliMatch AI — Career Discovery & Readiness

**Defined:** 2026-10-20
**Core Value:** Provide engineering students with an institutional, structured, and visually compelling bridge between university studies and industry-ready career paths across 10 technology domains.

## v1 Requirements (Frontend Refinement Milestone)

Requirements for the current refinement milestone. Each maps to roadmap phases.

### Navigation & Header Surfaces

- [x] **NAV-01**: Correct overly bright/white navbar surfaces and conflicting light headers to harmonize with the midnight-navy (`#181727`), wave-blue, and cyan background palette.
- [x] **NAV-02**: Preserve horizontal navigation layout, official logo mark, all 9 platform destinations, and prominent Resume Analyzer action button.
- [x] **NAV-03**: Fix "More" navigation dropdown positioning, clipping, stacking order (z-index), background opacity, and text contrast so the entire dropdown appears directly below its trigger and remains clearly readable above the Home hero.

### Home Hero Composition

- [x] **HERO-01**: Transform the current centered hero into a large, editorial-style, two-column layout inspired by the reference design.
- [x] **HERO-02**: Prominently display headline on the left column with natural line breaks, preserving exact copy: "Find Your Path. Build Your Future." and secondary line "Career Discovery & Readiness".
- [x] **HERO-03**: Neatly align supporting description and functional CTAs (Explore Domains, Launch Roadmaps, Open Resume Analyzer) in the right column.
- [x] **HERO-04**: Preserve the midnight-navy motion background, high-readability text hierarchy, and subtle light-colored border.

### Domain Cards & Content Surfaces

- [x] **CARD-01**: Harmonize existing domain-card container surfaces, titles, descriptions, role badges, borders, and buttons with the dark background theme.
- [x] **CARD-02**: Preserve all 10 domain datasets, role inventories, layout structure, and click-through navigation to roadmaps without unnecessary structural redesign.

### Semantic Matching Interactive Demonstration

- [x] **MATCH-01**: Identify and eliminate the root cause of duplicated Resume-to-Job Semantic Matching section on the Home page.
- [x] **MATCH-02**: Preserve exactly one clean, fully functional instance with interactive role scenario buttons, circular match score wheel, matched/missing keyword chips, and bullet optimization tips.

### Cross-Surface Quality & Cohesion

- [x] **COHESION-01**: Audit and harmonize visual consistency across all 9 platform destinations (`/`, `/roadmaps`, `/projects`, `/templates`, `/analyzer`, `/internships`, `/dashboard`, `/feedback`, `/about`) against unified dark design tokens.
- [x] **COHESION-02**: Verify responsive layout integrity and keyboard navigation accessibility across desktop and mobile viewports.

---

## Established Capabilities (Validated Baseline)

The following capabilities are confirmed implemented in the existing codebase:

- ✓ **BASE-01**: React 18.3 SPA architecture with Vite 5 and client-side routing across 9 destinations
- ✓ **BASE-02**: Animated Watermark-Free SVG/CSS Motion Graphics Background (`AmbientWaveBackground.jsx`)
- ✓ **BASE-03**: 10 Engineering Domains Taxonomy & Role Data Catalogues (`data/jobRoles.js`)
- ✓ **BASE-04**: 4-Tier Progressive Domain Roadmaps (`data/roadmaps.js`, `RoadmapsPage.jsx`)
- ✓ **BASE-05**: Curated Engineering Projects Blueprints & Filters (`data/projects.js`, `ProjectsPage.jsx`)
- ✓ **BASE-06**: 5 Downloadable Verified ATS-Friendly PDF Resume Templates (`public/assets/resume-templates/`, `TemplatesPage.jsx`)
- ✓ **BASE-07**: Reusable PDF Preview Modal with Direct Download Capability (`PdfPreviewModal.jsx`)
- ✓ **BASE-08**: Client-Side ATS Resume Analyzer & Scoring Simulation (`AnalyzerPage.jsx`)
- ✓ **BASE-09**: Curated Opportunities & External Job Board Directory (`InternshipsPage.jsx`, `data/jobSources.js`)
- ✓ **BASE-10**: Candidate Profile & Career Readiness Dashboard (`DashboardPage.jsx`)
- ✓ **BASE-11**: Contact Inquiry & User Feedback Modals (`ContactModal.jsx`, `FeedbackPage.jsx`)
- ✓ **BASE-12**: Institutional Footer with Disclosures and Domain Quick Links (`Footer.jsx`)

---

## Out of Scope

Explicitly excluded to protect project velocity and respect strict constraints.

| Feature | Reason |
|---------|--------|
| External animation packages (GSAP, Framer Motion, AOS, Three.js) | Strict zero-dependency rule; use native CSS transitions and existing keyframes |
| Rebuilding or scaffolding application from scratch | Brownfield preservation rule; enhance existing React components |
| Remote backend / database connections | Client-side execution model preserved for current milestone |
| Unsolicited redesigns of established domain taxonomies | Preserve core engineering content and roadmap structures |

---

## Traceability

Which phases cover which requirements.

| Requirement | Phase | Status |
|-------------|-------|--------|
| NAV-01 | Phase 1 | Completed |
| NAV-02 | Phase 1 | Completed |
| NAV-03 | Phase 1 | Completed |
| HERO-01 | Phase 2 | Completed |
| HERO-02 | Phase 2 | Completed |
| HERO-03 | Phase 2 | Completed |
| HERO-04 | Phase 2 | Completed |
| CARD-01 | Phase 3 | Completed |
| CARD-02 | Phase 3 | Completed |
| MATCH-01 | Phase 3 | Completed |
| MATCH-02 | Phase 3 | Completed |
| COHESION-01 | Phase 4 | Completed |
| COHESION-02 | Phase 4 | Completed |

**Coverage:**
- v1 requirements: 13 total
- Mapped to phases: 13
- Unmapped: 0 ✓

---
*Requirements defined: 2026-10-20*
*Last updated: 2026-10-20 after initialization*

