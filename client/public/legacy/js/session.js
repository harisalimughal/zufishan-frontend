// =========================================================
// SESSION — carries who's "signed in" from the login page into the
// dashboard/profile pages, so the sidebar chip, greeting and account
// fields show the real signed-in person instead of always showing the
// same static demo data. There's no backend yet, so this uses the same
// localStorage-only pattern already used for the sidebar-open preference
// in app-shell.js.
//
// Load this file LAST on every page (after any page-specific script) so
// it can safely wrap whatever that page already assigned to
// window.onLanguageChange, without the two stepping on each other.
// =========================================================

(function () {
  const SESSION_KEY = 'zf_session';

  // Fallback identity per role when the person didn't sign in with a
  // real-looking email (e.g. typed a phone number, or the field was
  // left as a demo value) — keeps the dashboard from ever looking blank.
  const DEMO = {
    learner: { name: 'Ahmad Raza', roleLabel: 'Learner', email: 'ahmad.raza@example.com' },
    teacher: { name: 'Mufti Abdul Rahman', roleLabel: 'Verified Ustaz', email: 'abdul.rahman@example.com' },
    vendor: { name: 'Zainab Traders', roleLabel: 'Verified Vendor', email: 'zainab.traders@example.com' },
    admin: { name: 'Dr. Imran Siddiqui', roleLabel: 'Advisory Board · Admin', email: 'imran.siddiqui@example.com' },
  };

  function isEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v || '');
  }

  function nameFromEmail(email) {
    const handle = email.split('@')[0];
    return handle
      .replace(/[._-]+/g, ' ')
      .trim()
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }

  function saveSession(role, identifier, explicitName) {
    const demo = DEMO[role] || DEMO.learner;
    const trimmed = (identifier || '').trim();
    const email = isEmail(trimmed) ? trimmed : demo.email;
    const derivedName = isEmail(trimmed) ? nameFromEmail(trimmed) : '';
    const cleanExplicitName = (explicitName || '').trim();
    const session = {
      role,
      roleLabel: demo.roleLabel,
      name: cleanExplicitName || derivedName || demo.name,
      email,
    };
    try { localStorage.setItem(SESSION_KEY, JSON.stringify(session)); } catch (e) { /* storage unavailable */ }
    return session;
  }

  function getSession() {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function clearSession() {
    try { localStorage.removeItem(SESSION_KEY); } catch (e) { /* storage unavailable */ }
    if (window.zfApi && window.zfApi.clearToken) {
      window.zfApi.clearToken();
    }
  }

  async function syncBackendSession() {
    if (!window.zfApi || !window.zfApi.getToken()) return;
    try {
      const res = await window.zfApi.get('/auth/me');
      if (res.ok && res.data && (res.data.data || res.data.user)) {
        const user = res.data.data || res.data.user;
        const current = getSession() || {};
        const fullName = [user.firstName, user.lastName].filter(Boolean).join(' ') || user.name || current.name;
        const updated = {
          ...current,
          name: fullName || current.name,
          email: user.email || current.email,
          role: user.role ? user.role.toLowerCase() : current.role,
        };
        try { localStorage.setItem(SESSION_KEY, JSON.stringify(updated)); } catch (e) {}
        applySessionToPage();
      }
    } catch (e) {
      // offline / quiet fallback
    }
  }

  function applySessionToPage() {
    const session = getSession();
    if (!session) return;
    document.querySelectorAll('[data-session="name"]').forEach((el) => {
      if ('value' in el) el.value = session.name; else el.textContent = session.name;
    });
    document.querySelectorAll('[data-session="role"]').forEach((el) => {
      el.textContent = session.roleLabel;
    });
    document.querySelectorAll('[data-session="email"]').forEach((el) => {
      if ('value' in el) el.value = session.email; else el.textContent = session.email;
    });
    // Greetings like "Assalamu Alaikum, Mufti Abdul Rahman" — swap just the
    // trailing name rather than replacing the whole sentence, so it keeps
    // working across both languages without needing its own i18n key.
    document.querySelectorAll('[data-session="greeting"]').forEach((el) => {
      el.textContent = el.textContent.replace(/Ahmad Raza|Mufti Abdul Rahman|Zainab Traders|Dr\. Imran Siddiqui|احمد رضا|مفتی عبدالرحمٰن|زینب ٹریڈرز|ڈاکٹر عمران صدیقی/, session.name);
    });
  }

  // Compose with whatever the page's own script already registered for
  // language-change re-rendering (community.js, hifz.js, etc.), so
  // toggling اردو/EN re-applies the signed-in name instead of wiping it
  // back to the static demo text baked into the translations dictionary.
  const previousOnLanguageChange = window.onLanguageChange;
  window.onLanguageChange = function (lang) {
    if (typeof previousOnLanguageChange === 'function') previousOnLanguageChange(lang);
    applySessionToPage();
  };

  window.zfSession = { save: saveSession, get: getSession, clear: clearSession, apply: applySessionToPage, sync: syncBackendSession };

  document.addEventListener('DOMContentLoaded', () => {
    applySessionToPage();
    syncBackendSession();
  });
})();
