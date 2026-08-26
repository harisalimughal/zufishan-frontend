// Shared across all pages — flips the document between LTR/English and RTL/Urdu.
function toggleLang(){
  const html = document.documentElement;
  html.setAttribute('dir', html.getAttribute('dir') === 'rtl' ? 'ltr' : 'rtl');
}
