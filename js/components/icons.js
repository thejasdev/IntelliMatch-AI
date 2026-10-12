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
  brand: svg('<rect x="5" y="3.5" width="14" height="17" rx="2"/><path d="M9 8h6M9 12h6M9 16h3"/><path d="M16.5 6.5 18 5l.8 1.7L20.5 7l-1.7.8L18 9.5l-.8-1.7L15.5 7l1.7-.5z"/>'),
  menu: svg('<path d="M4 7h16M4 12h16M4 17h16"/>'),
  close: svg('<path d="m6 6 12 12M18 6 6 18"/>'),
  fileScan: svg('<path d="M7 3.5h7l4 4V20a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 20V5A1.5 1.5 0 0 1 7 3.5z"/><path d="M14 3.5V8h4.5"/><circle cx="11" cy="14" r="2.4"/><path d="m13 16 1.8 1.8"/>'),
  layout: svg('<rect x="4" y="5" width="16" height="14" rx="2"/><path d="M4 10h16M10 10v9"/>'),
  match: svg('<path d="M8 8h.01M16 16h.01"/><path d="M9.5 9.5 14.5 14.5"/><circle cx="8" cy="8" r="3.2"/><circle cx="16" cy="16" r="3.2"/>'),
};
