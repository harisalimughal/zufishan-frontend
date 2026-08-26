// Generic i18n engine, shared by every page.
// Each page defines its own `window.translations = { en:{...}, ur:{...} }`
// dictionary (see js/i18n-zakat.js for an example), then includes this file.
// Elements needing translation get a data-i18n="key" attribute; this script
// swaps their textContent when the language changes.

window.currentLang = window.currentLang || 'en';

function setLanguage(lang){
  document.documentElement.setAttribute('lang', lang === 'ur' ? 'ur' : 'en');
  document.documentElement.setAttribute('dir', lang === 'ur' ? 'rtl' : 'ltr');
  window.currentLang = lang;

  if(window.translations && window.translations[lang]){
    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const key = el.getAttribute('data-i18n');
      const val = window.translations[lang][key];
      if(val !== undefined) el.textContent = val;
    });
    document.querySelectorAll('[data-i18n-html]').forEach(el=>{
      const key = el.getAttribute('data-i18n-html');
      const val = window.translations[lang][key];
      if(val !== undefined) el.innerHTML = val;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{
      const key = el.getAttribute('data-i18n-placeholder');
      const val = window.translations[lang][key];
      if(val !== undefined) el.setAttribute('placeholder', val);
    });
  }

  // let page-specific scripts (e.g. dynamic results) re-render in the new language
  if(typeof window.onLanguageChange === 'function') window.onLanguageChange(lang);
}

function toggleLang(){
  setLanguage(window.currentLang === 'ur' ? 'en' : 'ur');
}
