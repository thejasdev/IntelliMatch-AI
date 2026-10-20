---
last_mapped_commit: 26a289080d5c74e019f574f0a1b69a67dc43bdb1
last_mapped_at: 2026-10-20
---
# External Integrations

**Analysis Date:** 2026-10-20

## APIs & External Services

**Current Integration State:**
- Local Mock & Client-Side Execution: The application currently operates as a self-contained, fully client-side Single Page Application (SPA). There are no active outbound runtime HTTP or WebSocket calls to remote third-party SaaS APIs.
- Planned Future Microservices: Architectural specifications in `src/pages/AboutPage.jsx` describe a target Python FastAPI microservice architecture (`PyMuPDF`, `python-docx`) for deep PDF parsing and live job portal API syndication, but no active SDK or remote client is currently initialized.

**External Link Providers:**
- Job Board & Internship Redirects - Hardcoded external links in `data/jobSources.js` directing candidates to external listing aggregators:
  - LinkedIn (`https://www.linkedin.com/jobs/`)
  - Indeed (`https://www.indeed.com/`)
  - Wellfound / AngelList (`https://wellfound.com/`)
  - Internshala (`https://internshala.com/`)
  - Y Combinator Work at a Startup (`https://www.workatastartup.com/`)

## Data Storage

**Databases:**
- None (Client-side in-memory data catalogues)
  - Connection: Not applicable
  - Client: ESM JavaScript modules in `data/` (`data/jobRoles.js`, `data/jobSources.js`, `data/matchingDemo.js`, `data/projects.js`, `data/roadmaps.js`)

**File Storage:**
- Local filesystem & static assets only:
  - Vector domain assets: `public/assets/domains/` (`ai-ml.svg`, `cloud-devops.svg`, `cybersecurity.svg`, `data-analytics.svg`, `embedded-iot.svg`, `mobile-app.svg`, `qa-automation.svg`, `software-dev.svg`, `systems-networking.svg`, `web-development.svg`)
  - Resume templates & downloadable PDFs: `public/assets/resume-templates/` (`ats-classic.pdf`, `software-engineer-ats.pdf`, `data-analyst-ats.pdf`, `cloud-devops-ats.pdf`, `embedded-systems-ats.pdf`, `cybersecurity-ats.pdf`, `product-manager-ats.pdf`)
  - Brand assets & favicons: `public/assets/branding/`, `public/favicon.ico`, `public/favicon.svg`

**Caching:**
- Browser native HTTP cache for static bundles generated in `dist/assets/`.
- No Redis, Memcached, or browser `localStorage` persistence layer is currently implemented.

## Authentication & Identity

**Auth Provider:**
- None / Public Access
  - Implementation: All 9 platform views (`/`, `/roadmaps`, `/projects`, `/templates`, `/analyzer`, `/internships`, `/dashboard`, `/feedback`, `/about`) are openly accessible without authentication gates.
  - User profile mock data in `src/pages/DashboardPage.jsx` renders static demo metrics ("Alex Chen", Career Readiness Score: 84%).

## Monitoring & Observability

**Error Tracking:**
- None configured (no Sentry, Bugsnag, or Datadog SDKs present in `package.json`).
- Errors surface via native browser Developer Tools console.

**Logs:**
- Standard browser `console.log` / `console.error` during development.
- No remote telemetry or APM log shipping.

## CI/CD & Deployment

**Hosting:**
- Static Single Page Application hosting compatible with Vercel, Netlify, Cloudflare Pages, GitHub Pages, or AWS S3/CloudFront.
- Production build command produces pre-bundled static HTML, CSS, and JS in `dist/`.

**CI Pipeline:**
- None detected in repository root (no `.github/workflows/` or `.gitlab-ci.yml` present).

## Environment Configuration

**Required env vars:**
- None required for baseline development or production build (`vite build` executes with zero mandatory environment flags).

**Secrets location:**
- No secrets stored in repository.
- `.gitignore` includes standard `.env`, `.env.local`, `.env.*.local` rules.

## Webhooks & Callbacks

**Incoming:**
- None (Static SPA client with no backend listener).

**Outgoing:**
- None. Contact form submissions in `src/components/ContactModal.jsx` and `src/pages/FeedbackPage.jsx` simulate dispatch using local React state and timeouts (`setTimeout`).

---

*Integration audit: 2026-10-20*
