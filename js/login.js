// Login page — role-based form copy switching + basic client-side validation.
// Role copy lives in window.roleTranslations (js/i18n-login.js), keyed by language then role.

let currentActiveRole = 'learner';

function selectRole(role){
  currentActiveRole = role;
  document.querySelectorAll('.role-btn').forEach(b => b.classList.toggle('active', b.dataset.role === role));
  renderRoleCopy();
}

function renderRoleCopy(){
  const lang = window.currentLang || 'en';
  const d = (window.roleTranslations && window.roleTranslations[lang] && window.roleTranslations[lang][currentActiveRole])
    || window.roleTranslations.en[currentActiveRole];

  document.getElementById('formTitle').textContent = d.title;
  document.getElementById('formSub').textContent = d.sub;
  document.getElementById('idLabel').textContent = d.idLabel;
  document.getElementById('fieldNote').textContent = d.note;
  document.getElementById('submitBtn').textContent = d.submit;
  document.getElementById('signupNote').innerHTML = d.signup;
  document.getElementById('sideHeadline').textContent = d.sideHeadline;
  document.getElementById('sideBody').textContent = d.sideBody;
  const banner = document.getElementById('statusBanner');
  if (d.banner) {
    banner.classList.add('show');
    document.getElementById('statusText').textContent = d.banner;
  } else {
    banner.classList.remove('show');
  }
}

// re-render role copy in the new language whenever the toggle is used
window.onLanguageChange = function(){ renderRoleCopy(); };

document.querySelectorAll('.role-btn').forEach(btn => {
  btn.addEventListener('click', () => selectRole(btn.dataset.role));
});

function isValidEmail(v){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}
function isValidPhone(v){
  return /^[0-9+\-\s()]{7,}$/.test(v);
}

function handleSubmit(){
  const idInput = document.getElementById('identifier');
  const idError = document.getElementById('identifierError');
  const val = idInput.value.trim();

  const ok = currentActiveRole === 'learner'
    ? (isValidEmail(val) || isValidPhone(val))
    : isValidEmail(val);

  if (!ok) {
    idInput.classList.add('invalid');
    idError.classList.add('show');
    return false;
  }
  idInput.classList.remove('invalid');
  idError.classList.remove('show');

  if (currentActiveRole === 'learner') {
    window.location.href = 'course-catalogue.html';
  }
  return false;
}

renderRoleCopy();
