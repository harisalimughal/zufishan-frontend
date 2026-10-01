// Generic i18n engine, shared by every page.
// Each page defines its own `window.translations = { en:{...}, ur:{...} }`
// dictionary (see js/i18n-zakat.js for an example), then includes this file.
// Elements needing translation get a data-i18n="key" attribute; this script
// swaps their textContent when the language changes.
//
// The chosen language is saved to localStorage so it carries over across
// page navigations and survives a refresh, instead of silently resetting
// to English every load. There are two independent language "zones":
//   - the public homepage, which remembers its own language and never
//     affects (or is affected by) the app
//   - the signed-in app — sign in, sign up, and every dashboard page
//     (course catalogue, practice hub, etc.) — which all share one
//     language, so toggling on any one of them carries to the rest
// Each zone is stored under its own key so switching language in one
// never leaks into the other.

const LANG_STORAGE_KEY = /homepage\.html$/.test(window.location.pathname)
  ? 'zf_lang_home'
  : 'zf_lang_app';

function getSavedLanguage(){
  try{
    return localStorage.getItem(LANG_STORAGE_KEY) || 'en';
  }catch(e){
    return 'en'; // storage unavailable (e.g. private browsing) — fall back quietly
  }
}

function saveLanguage(lang){
  try{
    localStorage.setItem(LANG_STORAGE_KEY, lang);
  }catch(e){
    // ignore — nothing we can do if storage is unavailable
  }
}

window.currentLang = window.currentLang || getSavedLanguage();

const SHARED_FALLBACKS = {
<<<<<<< HEAD
  en: {
    navAiAssistant: "AI Assistant",
    navServices: "Services", navShariaAudit: "Sharia Audit Advisory", navZakatMgmt: "Zakat Management",
    navTraining: "Corporate Trainings", navEnquiry: "Send an Enquiry"
  },
  ur: {
    navAiAssistant: "اے آئی معاون",
    navServices: "خدمات", navShariaAudit: "شرعی آڈٹ ایڈوائزری", navZakatMgmt: "زکوٰۃ مینجمنٹ",
    navTraining: "کارپوریٹ تربیت", navEnquiry: "دریافت بھیجیں"
  }
=======
  en: { navAiAssistant: "AI Assistant" },
  ur: { navAiAssistant: "اے آئی معاون" }
>>>>>>> 8c6d6378a9af0308b4d738bd4e00cfd084f01837
};

function setLanguage(lang, persist = true){
  document.documentElement.setAttribute('lang', lang === 'ur' ? 'ur' : 'en');
  document.documentElement.setAttribute('dir', lang === 'ur' ? 'rtl' : 'ltr');
  window.currentLang = lang;
  if(persist) saveLanguage(lang);

  const shared = SHARED_FALLBACKS[lang] || {};
  const dict = (window.translations && window.translations[lang]) ? { ...shared, ...window.translations[lang] } : shared;

  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n');
    const val = dict[key];
    if(val !== undefined) el.textContent = val;
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el=>{
    const key = el.getAttribute('data-i18n-html');
    const val = dict[key];
    if(val !== undefined) el.innerHTML = val;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{
    const key = el.getAttribute('data-i18n-placeholder');
    const val = dict[key];
    if(val !== undefined) el.setAttribute('placeholder', val);
  });

  // let page-specific scripts (e.g. dynamic results) re-render in the new language
  if(typeof window.onLanguageChange === 'function') window.onLanguageChange(lang);
}

function toggleLang(){
  setLanguage(window.currentLang === 'ur' ? 'en' : 'ur');
}

// Apply the current language immediately on every page load (not just after
// a manual toggle), so navigating between pages keeps the same language.
// This initial application is NOT persisted — it just renders whatever
// window.currentLang already is (saved preference, or a page-specific
// default like the homepage's forced English). Only an explicit toggleLang()
// click writes to storage.
if(window.translations){
  setLanguage(window.currentLang, false);
}
