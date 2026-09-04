// Signup page — role picker, multi-step flow rendering, and validation.
// Flow copy (title/sub/side text) lives in the translations dictionary
// (js/i18n-signup.js, keys flow<Role>Title/Sub/SideH/SideB) so it can
// switch language along with everything else on the page.

const flowSteps = { learner: 2, teacher: 2, vendor: 3, admin: 1 };

let currentRole = null;
let currentStep = 1;

function t(key){
  const lang = window.currentLang || 'en';
  const dict = (window.translations && window.translations[lang]) || {};
  return dict[key] !== undefined ? dict[key] : (window.translations && window.translations.en && window.translations.en[key]) || '';
}

function getFlowCopy(role){
  const cap = role.charAt(0).toUpperCase() + role.slice(1);
  return {
    title: t('flow' + cap + 'Title'),
    sub: t('flow' + cap + 'Sub'),
    sideHeadline: t('flow' + cap + 'SideH'),
    sideBody: t('flow' + cap + 'SideB')
  };
}

document.querySelectorAll('#roleGrid .role-btn').forEach(btn => {
  btn.addEventListener('click', () => startFlow(btn.dataset.role));
});

// If someone arrived via a role-specific link (e.g. the login page's
// "Create a learner account"), skip the "which role?" picker entirely —
// they already told us which one they want.
(function skipPickerIfRoleKnown(){
  const params = new URLSearchParams(window.location.search);
  const requestedRole = params.get('role');
  if (requestedRole && flowSteps.hasOwnProperty(requestedRole)) {
    startFlow(requestedRole);
  }
})();

function startFlow(role){
  currentRole = role;
  currentStep = 1;
  document.getElementById('pickerView').style.display = 'none';
  document.getElementById('flowView').style.display = 'block';
  renderFlowCopy();
  renderStep();
}

// re-render whichever role/step is currently showing, in the new language
window.onLanguageChange = function(){
  if(currentRole){
    renderFlowCopy();
    renderStep();
  }
};

function renderFlowCopy(){
  if(!currentRole) return;
  const d = getFlowCopy(currentRole);
  document.getElementById('formTitle').textContent = d.title;
  document.getElementById('formSub').textContent = d.sub;
  document.getElementById('sideHeadline').textContent = d.sideHeadline;
  document.getElementById('sideBody').textContent = d.sideBody;
}

function backToPicker(){
  document.getElementById('pickerView').style.display = 'block';
  document.getElementById('flowView').style.display = 'none';
}

function renderStep(){
  document.querySelectorAll('.step').forEach(s => {
    s.classList.toggle('active', s.dataset.flow === currentRole && parseInt(s.dataset.step) === currentStep);
  });
  const total = flowSteps[currentRole];
  const isFinal = currentStep >= total;
  const track = document.getElementById('stepTrack');
  const label = document.getElementById('stepLabel');
  if (isFinal || total <= 1) {
    track.style.display = 'none';
    label.style.display = 'none';
  } else {
    track.style.display = 'flex';
    label.style.display = 'block';
    track.innerHTML = '';
    for (let i = 1; i <= total; i++) {
      const dot = document.createElement('div');
      dot.className = 'dot' + (i < currentStep ? ' done' : i === currentStep ? ' current' : '');
      track.appendChild(dot);
    }
    label.textContent = t('stepLabel')
      .replace('{current}', currentStep)
      .replace('{total}', total);
  }
  document.getElementById('backNote').style.display = currentStep === 1 ? 'block' : 'none';
}

const DASHBOARD_ROUTES = { learner: '/profile', teacher: '/teacher-dashboard' };

function nextStep(){ currentStep++; renderStep(); }
function prevStep(){ currentStep--; renderStep(); }
function finishFlow(role){
  if (window.zfSession) {
    const nameInput = document.getElementById(role + 'Name');
    const emailInput = document.getElementById(role + 'Email');
    const name = nameInput ? nameInput.value.trim() : '';
    const identifier = emailInput ? emailInput.value.trim() : '';
    window.zfSession.save(role, identifier, name);
  }
  // Learner and Ustaz accounts are usable immediately, so skip the extra
  // "you're all set, now click through" confirmation screen and land
  // straight on their dashboard.
  const dashboard = DASHBOARD_ROUTES[role];
  if (dashboard) {
    window.location.href = dashboard;
    return;
  }
  currentStep = flowSteps[role];
  renderStep();
}

function isValidEmail(v){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}
function isValidPhone(v){
  return /^[0-9+\-\s()]{7,}$/.test(v);
}

function goNext(role){
  const emailInput = document.getElementById(role + 'Email');
  const passInput = document.getElementById(role + 'Password');
  const emailError = document.getElementById(role + 'EmailError');
  const passError = document.getElementById(role + 'PasswordError');

  let valid = true;
  const emailVal = emailInput.value.trim();
  const emailOk = role === 'learner'
    ? (isValidEmail(emailVal) || isValidPhone(emailVal))
    : isValidEmail(emailVal);

  if (!emailOk) {
    emailInput.classList.add('invalid');
    emailError.classList.add('show');
    valid = false;
  } else {
    emailInput.classList.remove('invalid');
    emailError.classList.remove('show');
  }

  if (passInput.value.length < 8) {
    passInput.classList.add('invalid');
    passError.classList.add('show');
    valid = false;
  } else {
    passInput.classList.remove('invalid');
    passError.classList.remove('show');
  }

  if (valid) nextStep();
}

function selectChip(el){
  el.parentElement.querySelectorAll('.lang-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
}
