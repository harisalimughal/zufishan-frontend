// Sidebar/topbar shell — language toggling lives in js/i18n.js
// (loaded before this file on pages that use real translations).
//
// This shell only lives on the logged-in dashboard pages (never on the
// homepage, login, or signup). The sidebar is a push drawer that stays
// exactly as the user last left it: open by default, and only the
// hamburger button toggles it — no auto-closing on nav clicks, overlay
// clicks, or Esc.
//
// The "sidebar-open" class is written directly into the .app element in
// each page's HTML (not added here on load) so the sidebar is already in
// its open position on first paint — no slide-in animation when you land
// on or navigate between pages. This script only handles the toggle click.

function toggleSidebar(){
  const app = document.querySelector('.app');
  if(app) {
    app.classList.toggle('sidebar-open');
    try { localStorage.setItem('zf_sidebar_open', String(app.classList.contains('sidebar-open'))); } catch(e) {}
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector('.app');
  if(!app) return;

  try {
    const saved = localStorage.getItem('zf_sidebar_open');
    if(saved === 'false') app.classList.remove('sidebar-open');
  } catch(e) {}

  const toggleBtn = document.getElementById('sidebarToggle');
  if(toggleBtn) toggleBtn.addEventListener('click', toggleSidebar);
});
