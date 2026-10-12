const state = {
  page: "home",
  sidebarOpen: false,
  demoMode: true,
};

export function initState(pageId) {
  state.page = pageId || "home";
  state.sidebarOpen = false;
  return state;
}

export function getState() {
  return state;
}

export function setSidebarOpen(isOpen) {
  state.sidebarOpen = Boolean(isOpen);
  document.body.classList.toggle("nav-open", state.sidebarOpen);
  return state.sidebarOpen;
}

export function toggleSidebar() {
  return setSidebarOpen(!state.sidebarOpen);
}
