# IntelliMatch AI

Frontend prototype for **IntelliMatch AI**, an academic project for resume analysis, job-description matching, writing suggestions, and ATS-friendly templates.

This repository currently contains **Phase 1**: the shared application shell and Home page. There is no Python backend, database, live scoring, or paid AI API.

## Prerequisites

- A current desktop browser (Chrome, Edge, Firefox, or Safari)
- Python 3, or any other static file server

JavaScript modules (`import` / `export`) are blocked when you open HTML files with `file://`. A local HTTP server is required.

## How to run

From this project folder:

```bash
python -m http.server 8000
```

Then open [http://localhost:8000/](http://localhost:8000/).

Alternative if Python is unavailable:

```bash
npx --yes serve -l 8000
```

## Folder structure

```
index.html                 Home page
pages/                     Other routes (Phase 2 placeholders)
css/                       Design tokens, layout, components, Home styles
js/app.js                  Boots the shared shell
js/navigation.js           Nav items and path helpers
js/state.js                Sidebar and page state
js/components/             Sidebar, header, footer
js/pages/                  Page-specific scripts
```

## Implemented in Phase 1

- Dark sidebar with Smart Resume AI branding
- Seven navigation items, including **Resume Templates** (not Resume Builder)
- Active Home state
- Responsive drawer navigation
- Home hero, quick actions, how-it-works, features, score methodology, CTA, footer
- Honest placeholders on destination pages

## Demo limitations

- No resume parsing or model predictions
- No accounts, passwords, or server storage
- Destination pages explain that they arrive in Phase 2
- The header badge marks this as a frontend prototype

## Planned later

A FastAPI backend may provide analysis, templates, and export. Browser code will call HTTP APIs only. Secrets and PostgreSQL will not live in the frontend.

## Next phase

Phase 2: Resume Analyzer, Resume Templates, Dashboard, Job Search, Feedback, and About.
