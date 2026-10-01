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

  const passInput = document.getElementById('password');
  const passError = document.getElementById('passwordError');

  let valid = true;

  const ok = (currentActiveRole === 'learner')
    ? (isValidEmail(val) || isValidPhone(val))
    : isValidEmail(val);

  if (!ok) {
    idInput.classList.add('invalid');
    idError.classList.add('show');
    valid = false;
  } else {
    idInput.classList.remove('invalid');
    idError.classList.remove('show');
  }

  if (passInput.value.length < 8) {
    passInput.classList.add('invalid');
    passError.classList.add('show');
    valid = false;
  } else {
    passInput.classList.remove('invalid');
    passError.classList.remove('show');
  }

  if (!valid) return false;

  async function performLogin() {
    let token = null;
    let explicitName = null;
    if (window.zfApi && isValidEmail(val)) {
      try {
        const res = await window.zfApi.post('/auth/login', {
          email: val,
          password: passInput.value,
        });
        if (res.ok && res.data) {
          const resData = res.data.data || res.data;
          token = resData.token || resData.accessToken;
          if (token) window.zfApi.setToken(token);
          if (resData.user) {
            explicitName = [resData.user.firstName, resData.user.lastName].filter(Boolean).join(' ') || resData.user.name;
          }
        }
      } catch (e) {
        // Fall back gracefully to local session
      }
    }

    if (window.zfSession) window.zfSession.save(currentActiveRole, val, explicitName);

    if (currentActiveRole === 'learner') {
      window.location.href = '/profile';
    } else if (currentActiveRole === 'teacher') {
      window.location.href = '/teacher-dashboard';
    } else if (currentActiveRole === 'vendor') {
      window.location.href = '/vendor-dashboard';
    } else if (currentActiveRole === 'admin') {
      window.location.href = '/admin-dashboard';
    }
  }

  performLogin();
  return false;
}

renderRoleCopy();
