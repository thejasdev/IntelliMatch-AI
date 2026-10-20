---
last_mapped_commit: 26a289080d5c74e019f574f0a1b69a67dc43bdb1
last_mapped_at: 2026-10-20
---
# Technology Stack

**Analysis Date:** 2026-10-20

## Languages

**Primary:**
- JavaScript (ES6+ / ESM) - Core application logic, React components, and data catalogues across `src/` and `data/`

**Secondary:**
- HTML5 / CSS3 - Semantic markup and responsive utility styling via Tailwind CSS and PostCSS in `index.html` and `src/index.css`

## Runtime

**Environment:**
- Node.js (v18+ recommended, development tested on Node.js v24)
- Browser environment: Modern evergreen browsers (Chrome, Edge, Firefox, Safari)

**Package Manager:**
- npm (package-lock.json present)
- Lockfile: `package-lock.json` present

## Frameworks

**Core:**
- React 18.3.1 (`react`, `react-dom`) - Component-based client-side UI rendering in `src/App.jsx` and `src/pages/`
- React Router DOM 6.29.0 (`react-router-dom`) - Client-side SPA routing across 9 primary platform routes

**UI & Design Tokens:**
- Tailwind CSS 3.4.17 (`tailwindcss`) - Utility-first styling with custom brand color tokens (`brand-navy`, `brand-slate`, `brand-cyan`, `brand-violet`) defined in `tailwind.config.js`
- PostCSS 8.5.3 (`postcss`, `autoprefixer`) - CSS processing pipeline in `postcss.config.js`
- Lucide React 0.475.0 (`lucide-react`) - Consistent icon library across navigation, cards, and interactive feedback
- React-Bootstrap 2.10.9 & Bootstrap 5.3.3 - Installed in `package.json` for auxiliary components

**Testing:**
- Not configured - No automated test runner (Jest/Vitest) currently installed in `package.json`

**Build/Dev:**
- Vite 5.4.14 (`vite`, `@vitejs/plugin-react`) - Fast ESM bundler, dev server on port 5173, and production bundling via Rollup

## Key Dependencies

**Critical:**
- `react` (v18.3.1) - Declarative UI state management and lifecycle hooks in `src/`
- `react-router-dom` (v6.29.0) - Route management (`BrowserRouter`, `Routes`, `Route`, `Link`, `NavLink`) in `src/App.jsx`
- `lucide-react` (v0.475.0) - High-quality SVG icon system used across all page headers, metrics, and timeline nodes

**Infrastructure:**
- `@vitejs/plugin-react` (v4.3.4) - Vite plugin providing Fast Refresh and JSX transformation
- `tailwindcss` (v3.4.17) - Tailwind engine compiling custom utility classes into `dist/assets/*.css`

## Configuration

**Environment:**
- Fully client-side SPA with self-contained mock data catalogues in `data/`
- No mandatory `.env` secrets required for frontend execution

**Build:**
- `vite.config.js` - Configures React plugin, server host binding, and default port 5173
- `tailwind.config.js` - Defines font families, custom keyframe animations, extended color palettes, and container widths
- `postcss.config.js` - Configures Tailwind CSS and Autoprefixer PostCSS plugins

## Platform Requirements

**Development:**
- Node.js 18+ and npm
- Local dev server accessible at `http://localhost:5173/` via `npm run dev`

**Production:**
- Static file hosting target (Vercel, Netlify, Cloudflare Pages, AWS S3/CloudFront, or Nginx)
- Production build output in `dist/` via `npm run build`

---

*Stack analysis: 2026-10-20*
