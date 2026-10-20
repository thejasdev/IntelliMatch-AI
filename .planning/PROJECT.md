# IntelliMatch AI — Career Discovery & Readiness

## What This Is

IntelliMatch AI is a modern, interactive web application built with React, Vite, and Tailwind CSS designed to empower engineering students to discover technology domains, follow progressive skill roadmaps, build portfolio-grade capstones, and prepare for competitive technical internships and employment. The platform provides structured exploration across 10 specialized engineering domains with client-side ATS resume benchmarking, curated project blueprints, and downloadable templates.

## Core Value

Provide engineering students with an institutional, structured, and visually compelling bridge between university studies and industry-ready career paths across 10 technology domains.

## Business Context

- **Customer**: Engineering undergraduates, self-taught developers, career transitioners, and university placement cells.
- **Revenue model**: Free open candidate access; potential future institutional placement partnerships.
- **Success metric**: Candidate progression through domain milestones, project completions, and verified ATS benchmark scores.
- **Strategy notes**: Editorial, media-inspired visual quality paired with actionable, curriculum-aligned engineering taxonomies.

## Requirements

### Validated

- ✓ React 18.3 SPA architecture with Vite 5 and client-side routing across 9 destinations — existing
- ✓ Animated Watermark-Free SVG/CSS Motion Graphics Background (`AmbientWaveBackground.jsx`) — existing
- ✓ 10 Engineering Domains Taxonomy & Role Data Catalogues (`data/jobRoles.js`) — existing
- ✓ 4-Tier Progressive Domain Roadmaps (`data/roadmaps.js`, `RoadmapsPage.jsx`) — existing
- ✓ Curated Engineering Projects Blueprints & Filters (`data/projects.js`, `ProjectsPage.jsx`) — existing
- ✓ 5 Downloadable Verified ATS-Friendly PDF Resume Templates (`public/assets/resume-templates/`, `TemplatesPage.jsx`) — existing
- ✓ Reusable PDF Preview Modal with Direct Download Capability (`PdfPreviewModal.jsx`) — existing
- ✓ Client-Side ATS Resume Analyzer & Scoring Simulation (`AnalyzerPage.jsx`) — existing
- ✓ Curated Opportunities & External Job Board Directory (`InternshipsPage.jsx`, `data/jobSources.js`) — existing
- ✓ Candidate Profile & Career Readiness Dashboard (`DashboardPage.jsx`) — existing
- ✓ Contact Inquiry & User Feedback Modals (`ContactModal.jsx`, `FeedbackPage.jsx`) — existing
- ✓ Institutional Footer with Disclosures and Domain Quick Links (`Footer.jsx`) — existing

### Active

- [ ] **NAV-01**: Correct overly white navbar and conflicting light surfaces to harmonize with the midnight navy (`#181727`), royal/steel blue, and cyan background while preserving all 9 destinations, logo mark, and Resume Analyzer CTA.
- [ ] **MORE-01**: Fix "More" navigation dropdown positioning, clipping, stacking order (z-index), background opacity, and text contrast so the entire dropdown appears directly beneath its trigger and remains fully readable above the hero.
- [ ] **HERO-01**: Redesign Home Hero into an editorial-style two-column composition inspired by the reference design, preserving the exact headline "Find Your Path. Build Your Future.", secondary tagline, CTA actions, motion graphics background, and subtle border.
- [ ] **CARD-01**: Harmonize existing domain-card surfaces, headings, descriptions, role badges, borders, and buttons with the dark background without altering domain data, role lists, or layout structure.
- [ ] **MATCH-01**: Resolve the root cause of duplicated Resume-to-Job Semantic Matching section on the Home page, preserving exactly one clean, fully working interactive scenario demonstration.

### Out of Scope

- External animation packages (GSAP, Framer Motion, AOS, Three.js) — strict zero-dependency constraint.
- Rebuilding or scaffolding a new project from scratch — brownfield preservation rule.
- Remote backend microservices / live database connections — reserved for future milestone.
- Unsolicited redesigns of established domain taxonomies or roadmap milestone structures.

## Context

IntelliMatch AI has undergone substantial frontend development across previous Antigravity sessions. The foundational architecture, routes, mock intelligence engines, and static data catalogues are operational in `src/` and `data/`. The completed codebase analysis in `.planning/codebase/` establishes the full technical baseline. The current objective is to bring these established assets under GSD planning and systematically execute the five pending visual and interaction refinements requested by the user.

## Constraints

- **Tech Stack**: React 18, Vite 5, Tailwind CSS 3.4.17, PostCSS, Lucide React icons.
- **Zero-Dependency Constraint**: No new packages in `package.json`; strictly utilize existing dependencies and native CSS transitions.
- **Preservation Guarantee**: Never discard, replace, or reset working routes, components, data catalogues, or static PDF assets.
- **Design Tokens**: Muted midnight navy (`#181727`, `#1A1B2F`), wave blue (`#314F81`, `#146FE8`), electric cyan (`#19C6E8`), ice white (`#F5F9FF`), and translucent glass (`rgba(36, 38, 62, 0.72)`).

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Pure SVG/CSS Ambient Wave | Avoid video codecs and eliminate watermarks while guaranteeing high frame rates | ✓ Good |
| In-Memory Data Catalogues | Enables rapid client-side search, filtering, and analysis without remote server latency | ✓ Good |
| Brownfield GSD Initialization | Preserves existing implementation baseline and targets only verified outstanding tasks | ✓ Good |
| Sequential Plan Execution | Safest wave execution mode for coordinated visual CSS and layout adjustments | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-10-20 after initialization*

