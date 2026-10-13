const svg = (paths) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;

export const ICONS = {
  home: svg('<path d="M4 11.5 12 4l8 7.5"/><path d="M6.5 10.5V20h11V10.5"/>'),
  analyzer: svg('<path d="M8 4h8a2 2 0 0 1 2 2v14l-3-2-3 2-3-2-3 2V6a2 2 0 0 1 2-2z"/><path d="M9 9h6M9 13h4"/>'),
  templates: svg('<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 9h8M8 13h5"/>'),
  dashboard: svg('<rect x="4" y="4" width="7" height="7" rx="1"/><rect x="13" y="4" width="7" height="4" rx="1"/><rect x="13" y="10" width="7" height="10" rx="1"/><rect x="4" y="13" width="7" height="7" rx="1"/>'),
  jobs: svg('<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/>'),
  feedback: svg('<path d="M5 6h14v10H8l-3 3V6z"/>'),
  about: svg('<circle cx="12" cy="12" r="8"/><path d="M12 11v5M12 8h.01"/>'),
  brand: svg('<path d="M7 4v16M17 4v16M7 9l5 4 5-4"/>'),
  menu: svg('<path d="M4 7h16M4 12h16M4 17h16"/>'),
  close: svg('<path d="m6 6 12 12M18 6 6 18"/>'),
  fileScan: svg('<path d="M7 3.5h7l4 4V20a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 20V5A1.5 1.5 0 0 1 7 3.5z"/><path d="M14 3.5V8h4.5"/><circle cx="11" cy="14" r="2.4"/><path d="m13 16 1.8 1.8"/>'),
  layout: svg('<rect x="4" y="5" width="16" height="14" rx="2"/><path d="M4 10h16M10 10v9"/>'),
  match: svg('<path d="M8 8h.01M16 16h.01"/><path d="M9.5 9.5 14.5 14.5"/><circle cx="8" cy="8" r="3.2"/><circle cx="16" cy="16" r="3.2"/>'),
  check: svg('<path d="m5 12 5 5L20 7"/>'),
  sparkle: svg('<path d="m12 3 2.5 5.5L20 11l-5.5 2.5L12 19l-2.5-5.5L4 11l5.5-2.5z"/>'),
  upload: svg('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>'),
  filter: svg('<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>'),
  search: svg('<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>'),
};
