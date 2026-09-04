// Ustaz Profile — separate from the learner profile.js so credential
// fields (madrasa, subjects, madhab) never bleed into the learner's page.

function t(key){
  const lang = window.currentLang || 'en';
  return (window.translations && window.translations[lang] && window.translations[lang][key]) || key;
}

document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b === btn));
    document.querySelectorAll('.tab-panel').forEach(p => {
      p.classList.toggle('active', p.dataset.panel === btn.dataset.tab);
    });
  });
});

function showToast(msg){
  const toast = document.getElementById('toast');
  if(!toast) return;
  toast.textContent = '';
  const dot = document.createElement('span'); dot.className='sq'; toast.appendChild(dot);
  toast.appendChild(document.createTextNode(msg));
  toast.classList.add('show');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(()=> toast.classList.remove('show'), 2600);
}

const FIELD_IDS = ['fFullName','fEmail','fPhone','fCity','fMadrasa','fSubjects','fMadhab'];

function loadSavedProfile(){
  if(!window.zfStore) return;
  const saved = window.zfStore.get('zf_teacher_profile', null);
  if(!saved) return;
  FIELD_IDS.forEach(id => {
    const el = document.getElementById(id);
    if(el && saved[id] !== undefined) el.value = saved[id];
  });
  if(saved.fFullName) document.getElementById('phName').textContent = saved.fFullName;
}

function collectFields(){
  const data = {};
  FIELD_IDS.forEach(id => {
    const el = document.getElementById(id);
    if(el) data[id] = el.value;
  });
  return data;
}

function saveProfile(){
  const data = collectFields();
  if(window.zfStore) window.zfStore.set('zf_teacher_profile', data);
  if(data.fFullName) document.getElementById('phName').textContent = data.fFullName;
  showToast(t('savedToast'));
}

document.addEventListener('DOMContentLoaded', () => {
  loadSavedProfile();
  const saveAccountBtn = document.getElementById('saveAccountBtn');
  const saveCredentialsBtn = document.getElementById('saveCredentialsBtn');
  const updatePasswordBtn = document.getElementById('updatePasswordBtn');
  if(saveAccountBtn) saveAccountBtn.addEventListener('click', saveProfile);
  if(saveCredentialsBtn) saveCredentialsBtn.addEventListener('click', saveProfile);
  if(updatePasswordBtn) updatePasswordBtn.addEventListener('click', () => showToast(t('savedToast')));
});
