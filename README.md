# IntelliMatch AI — AI-Powered Resume Analysis & Semantic Job Matching Platform

> **Match Your Skills. Improve Your Resume. Move Forward.**

An intelligent career-assistance platform designed to analyze resumes against job descriptions, identify relevant skills and keyword gaps, provide evidence-based writing suggestions, and offer editable ATS-friendly resume templates.

---

## 🎨 Visual Identity & Design Tokens

IntelliMatch AI features a refined purple-and-white SaaS interface:

- **Primary Purple:** `#6C4CF1` (Actions, selected navigation, primary highlights)
- **Dark Purple:** `#4F35C7` (Button hover, active states)
- **Light Lavender:** `#F1EDFF` (Badges, subtle card highlights, selected nav background)
- **Page Background:** `#F8F9FC` (Workspace canvas)
- **Card Background:** `#FFFFFF` (Restrained shadows, rounded corners)
- **Primary Text:** `#202033` (High contrast, readable typography)
- **Secondary Text:** `#70748A` (Subtitles, hints, metadata)
- **Borders:** `#E7E8F0`
- **Success Teal:** `#0DAD91`
- **Warning Amber:** `#F2A93B`
- **Error Red:** `#D94B62`

All tokens are centralized in `css/variables.css`.

---

## 🚀 How to Run Locally

Prerequisites: A modern web browser and Python 3 (or any static HTTP file server). Since vanilla JavaScript modules (`import` / `export`) require HTTP origin, running via local server is required:

```bash
# Start local server on port 8000
python -m http.server 8000
```

Then visit:
👉 **[http://127.0.0.1:8000/index.html](http://127.0.0.1:8000/index.html)**

---

## 📁 Project Architecture

```
IntelliMatch AI/
├── index.html                   # Home page (Landing, Domains Showcase, Overview)
├── README.md                    # Platform documentation
├── LICENSE                      # Project license
├── assets/
│   └── resume-templates/        # 5 reusable ATS-tested PDF resume templates
│       ├── clean-professional.pdf
│       ├── technical-projects.pdf
│       ├── experience-focused.pdf
│       ├── fresher-project-focused.pdf
│       └── traditional-academic.pdf
├── data/
│   ├── jobRoles.js              # Centralized 10 engineering domains & role catalogue
│   └── jobSources.js            # Job sources status registry & connector blueprints
├── css/
│   ├── variables.css            # Centralized design tokens (Purple & White palette)
│   ├── base.css                 # Base resets, typography, and accessibility
│   ├── layout.css               # Shared layout shell: sidebar, header, footer
│   ├── components.css           # Buttons, modal dialogs, cards, badges, inputs
│   ├── responsive.css           # Mobile drawer navigation & viewport breakpoints
│   └── pages/
│       ├── home.css             # Hero, domains grid, how it works, feature grid
│       └── platform.css         # Analyzer, Templates, Dashboard, Job Search, Feedback, About
├── js/
│   ├── app.js                   # Application bootloader & page router
│   ├── navigation.js            # Route configurations & active state helpers
│   ├── state.js                 # Shared reactive drawer & app state
│   ├── components/
│   │   ├── sidebar.js           # "IM" monogram branding, primary purple active states
│   │   ├── header.js            # Responsive navigation toggle & action buttons
│   │   ├── footer.js            # Official IntelliMatch AI branding & ATS disclaimer
│   │   └── icons.js             # SVG icon library
│   ├── pages/
│   │   ├── home.js              # Home page controller
│   │   ├── analyzer.js          # Separate domain & role selectors, validation, analysis report
│   │   ├── templates.js         # Real PDF template library with modal preview & download
│   │   ├── dashboard.js         # Domain/role filters, KPI cards, empty state toggle
│   │   ├── job-search.js        # Multi-domain filters, external search launcher, connector blueprint
│   │   ├── feedback.js          # Star rating, exact category selector, optional email, local storage
│   │   ├── about.js             # Mission, 10 domains, architectural roadmap, and prototype scope
│   │   └── placeholder.js       # Fallback empty state handler
│   └── utils/
│       └── dom.js               # Lightweight DOM creation utilities
└── pages/
    ├── analyzer.html            # Resume Analyzer workspace
    ├── templates.html           # Resume Templates library
    ├── dashboard.html           # Candidate Career Dashboard
    ├── job-search.html          # Semantic Job Search
    ├── feedback.html            # Feedback & Rating form
    └── about.html               # About IntelliMatch AI
```

---

## 🛠️ Implemented Features

### 1. Unified Navigation & Layout
- **Custom IM Monogram:** Modern purple gradient monogram in the sidebar.
- **Seven Navigation Items:** Home, Resume Analyzer, Resume Templates, Dashboard, Job Search, Feedback, About (no separate Resume Builder sidebar item).
- **Active Page Highlighting:** Distinct purple text with light-purple pill background and accent indicator.
- **Mobile Drawer Navigation:** Accessible slide-over drawer with backdrop dismiss and keyboard Escape support.
- **Standardized Medium Buttons:** 44–52px height, 18–24px horizontal padding, tasteful hover states, never forced full-width on desktop.

### 2. Centralized Engineering Role Catalogue (`data/jobRoles.js`)
- Comprehensive starting catalogue covering **10 engineering domains**:
  1. Software Development (13 roles)
  2. Data and Analytics (11 roles)
  3. AI and Machine Learning (8 roles)
  4. Cloud, DevOps and Infrastructure (13 roles)
  5. Cybersecurity (12 roles)
  6. Networking and IT Support (9 roles)
  7. Testing and Quality Assurance (8 roles)
  8. Embedded Systems and Electronics (9 roles)
  9. Enterprise and Business Technology (8 roles)
  10. Emerging and Specialist Roles (7 roles)
- Reusable across Resume Analyzer, Job Search, Dashboard, and Templates.
- Includes `Other / Custom Role` option across all selectors.

### 3. Resume Analyzer (`pages/analyzer.html`)
- Strictly ordered evaluation form:
  1. **Resume Upload:** Drag-and-drop or browse, validating PDF and DOCX files (max 5MB), displaying file size and extension, with clear replace/remove action.
  2. **Select Engineering Domain:** Separate searchable domain selector. Changing domain automatically updates the role selector and clears incompatible selections.
  3. **Select Job Role:** Filtered role selector with `Other / Custom Role` support and dynamic custom title input.
  4. **Target Job Description:** Visually independent textarea with neutral border, character counter, role template loader, and clear button.
  5. **Analyze Button:** Medium-sized purple button labeled **"Analyze Resume & Calculate Match"**.
- Multi-metric evaluation simulation with big compatibility gauge, Required Skills Coverage, Experience Evidence, Contextual Semantic Fit, matched competencies, missing skill gaps, and before/after writing suggestions.
- Clear explanation of scoring methodology (keyword vs semantic vs evidence) and ATS disclaimer.

### 4. Resume Templates Library (`pages/templates.html`)
- **5 Reusable, Downloadable Vector PDF Files** in `assets/resume-templates/` with selectable text, clean typography, ATS single-page and two-page layouts, and neutral placeholder data:
  1. `clean-professional.pdf` (Clean Professional — Classic/Minimalist single-page format)
  2. `technical-projects.pdf` (Technical Projects — Technical/Project-heavy single-page format)
  3. `experience-focused.pdf` (Experience-Focused — Corporate/Chronological single-page format)
  4. `fresher-project-focused.pdf` (Fresher Project-Focused — Modern student single-page format)
  5. `traditional-academic.pdf` (Traditional Academic — Comprehensive two-page format)
- Every template card includes:
  - Verified Page Count badge (1 Page / 2 Pages)
  - Target audience, design style, and layout metadata
  - Key layout advantages list
  - **Preview PDF:** Opens an accessible modal with inline document viewer, new tab launcher, and zoom support
  - **Download PDF:** Direct link downloading the genuine corresponding PDF file
- Filtering by design style and page count with live text search.

### 5. Semantic Job Search (`pages/job-search.html`)
- Dedicated multi-domain job discovery supporting 10 engineering domains.
- Search filters: domain, job role, skills/keywords, location, experience level, internship/full-time, and work arrangement (remote/hybrid/on-site).
- **Job Sources Panel** with honest status labels:
  - `Connected` (real backend integration - clearly documented)
  - `Open Search` (LinkedIn Jobs, Naukri, Internshala)
  - `Demo` (Curated multi-domain benchmark listings)
  - `Setup Required` (Company Career Portals requiring partner webhook credentials)
- **Live External Search Launcher:** Encodes user query and location into verified platform search URLs opening in a new tab safely.
- **"Analyze with This Job"** action transferring job descriptions directly into Resume Analyzer.
- **FastAPI Connector Architecture Blueprint:** Documents `BaseJobProvider` interface for planned backend integration.

### 6. Candidate Dashboard (`pages/dashboard.html`)
- Career track filter by domain and role.
- Useful KPI cards (Benchmark Analyses, Average Match Score, Engineering Domains, ATS PDF Templates).
- Clean interactive **"Preview Fresh Empty State"** toggle.
- Recent evaluations table with domain badges and re-run shortcuts.
- Saved resume version list.

### 7. Feedback (`pages/feedback.html`)
- Category selector: Bug Report, Feature Request, UI/UX Suggestion, Analysis Quality, Other.
- Accessible 1–5 star rating control.
- Required feedback message with character counter.
- Optional email address field.
- Normal medium-sized **Submit Feedback** button.
- Local browser session storage logging with success toast notification.

### 8. About (`pages/about.html`)
- Comprehensive overview of mission, target users (students, career switchers, experienced engineers), core feature suite, 10 engineering domains, technical architecture, and honest prototype disclaimers.

---

## ⚠️ Prototype Limitations & Disclaimer

- **Frontend Demonstration Mode:** All analytical scores, sample job postings, and metrics are simulated demonstrations for UI/UX evaluation.
- **No Remote Storage or AI APIs:** No external AI API keys or backend databases are connected during this phase. Files remain strictly inside the user's local browser memory.
- **ATS Estimation Notice:** Compatibility scores are algorithmic approximations intended for career preparation and do not guarantee interview invitations or employer hiring outcomes.
