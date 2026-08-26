// =========================================================
// HIFZ TRACKER — in-memory demo data; nothing persists to a backend yet.
// =========================================================

const HIFZ_SURAHS = [
  { num:114, en:'An-Nas', ur:'الناس', ayahs:6, pct:100, daysSince:20 },
  { num:113, en:'Al-Falaq', ur:'الفلق', ayahs:5, pct:100, daysSince:2 },
  { num:112, en:'Al-Ikhlas', ur:'الإخلاص', ayahs:4, pct:100, daysSince:10 },
  { num:111, en:'Al-Masad', ur:'المسد', ayahs:5, pct:100, daysSince:5 },
  { num:110, en:'An-Nasr', ur:'النصر', ayahs:3, pct:100, daysSince:1 },
  { num:109, en:'Al-Kafirun', ur:'الكافرون', ayahs:6, pct:60, daysSince:null },
  { num:108, en:'Al-Kawthar', ur:'الكوثر', ayahs:3, pct:100, daysSince:15 },
  { num:107, en:'Al-Ma\u2019un', ur:'الماعون', ayahs:7, pct:20, daysSince:null },
  { num:106, en:'Quraysh', ur:'قريش', ayahs:4, pct:0, daysSince:null },
  { num:105, en:'Al-Fil', ur:'الفيل', ayahs:5, pct:0, daysSince:null },
  { num:104, en:'Al-Humazah', ur:'الهمزة', ayahs:9, pct:0, daysSince:null },
  { num:103, en:'Al-Asr', ur:'العصر', ayahs:3, pct:0, daysSince:null }
];

const REVISION_INTERVAL_DAYS = 7;
let streak = 12;
let loggedToday = false;

function t(key){
  const lang = window.currentLang || 'en';
  return (window.translations && window.translations[lang] && window.translations[lang][key]) || key;
}

function surahName(s){
  return (window.currentLang === 'ur') ? s.ur : s.en;
}

function computeStats(){
  const done = HIFZ_SURAHS.filter(s => s.pct === 100);
  const ayahsMemorized = HIFZ_SURAHS.reduce((sum,s)=> sum + Math.round(s.ayahs * (s.pct/100)), 0);
  const due = HIFZ_SURAHS.filter(s => s.pct === 100 && s.daysSince !== null && s.daysSince >= REVISION_INTERVAL_DAYS);
  return { doneCount: done.length, ayahsMemorized, dueCount: due.length };
}

function renderStats(){
  const stats = computeStats();
  document.getElementById('statStreak').textContent = streak;
  document.getElementById('statSurahs').textContent = stats.doneCount;
  document.getElementById('statAyahs').textContent = stats.ayahsMemorized;
  document.getElementById('statDue').textContent = stats.dueCount;
}

function statusOf(s){
  if(s.pct === 100 && s.daysSince !== null && s.daysSince >= REVISION_INTERVAL_DAYS) return 'due';
  if(s.pct === 100) return 'done';
  if(s.pct > 0) return 'progress';
  return 'new';
}

function renderGrid(){
  const grid = document.getElementById('surahGrid');
  grid.innerHTML = HIFZ_SURAHS.map(s => {
    const status = statusOf(s);
    const label = status === 'due' ? t('needsRevision') : status === 'done' ? t('memorized') : status === 'progress' ? t('inProgress') : t('notStarted');
    return `
    <div class="sp-chip ${status==='done'?'done':''} ${status==='due'?'due':''}" data-num="${s.num}">
      <div class="sp-num">${s.num}</div>
      <div class="sp-name">${surahName(s)}</div>
      <div class="sp-bar"><i style="width:${s.pct}%"></i></div>
      <div class="sp-status">${s.pct}% · ${label}</div>
    </div>`;
  }).join('');
  grid.querySelectorAll('.sp-chip').forEach(chip=>{
    chip.addEventListener('click', ()=>{
      document.getElementById('logSurahSelect').value = chip.getAttribute('data-num');
      document.getElementById('logPercent').value = HIFZ_SURAHS.find(s=>s.num==chip.getAttribute('data-num')).pct;
      document.getElementById('logPercent').nextElementSibling.textContent = document.getElementById('logPercent').value + '%';
    });
  });
}

function renderRevisionQueue(){
  const due = HIFZ_SURAHS.filter(s => s.pct === 100 && s.daysSince !== null && s.daysSince >= REVISION_INTERVAL_DAYS)
                         .sort((a,b)=> b.daysSince - a.daysSince);
  const list = document.getElementById('revisionList');
  if(due.length === 0){
    list.innerHTML = `<div class="empty-state"><h3>${t('allCaughtUp')}</h3><p>${t('allCaughtUpNote')}</p></div>`;
    return;
  }
  list.innerHTML = due.map(s => `
    <div class="revision-item overdue" data-num="${s.num}">
      <div>
        <div class="ri-name">${s.num}. ${surahName(s)}</div>
        <div class="ri-meta">${t('lastRevised')} ${s.daysSince} ${t('daysAgo')}</div>
      </div>
      <button class="btn btn-ghost sm mark-revised" data-num="${s.num}">${t('markRevised')}</button>
    </div>`).join('');
  list.querySelectorAll('.mark-revised').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const s = HIFZ_SURAHS.find(x=>x.num == btn.getAttribute('data-num'));
      s.daysSince = 0;
      renderAll();
      showToast(t('revisedToast').replace('{surah}', surahName(s)));
    });
  });
}

function populateLogSelect(){
  const sel = document.getElementById('logSurahSelect');
  sel.innerHTML = HIFZ_SURAHS.map(s => `<option value="${s.num}">${s.num}. ${surahName(s)}</option>`).join('');
}

function saveLog(){
  const num = document.getElementById('logSurahSelect').value;
  const pct = parseInt(document.getElementById('logPercent').value, 10);
  const s = HIFZ_SURAHS.find(x=>x.num == num);
  s.pct = pct;
  if(pct === 100) s.daysSince = 0;
  if(!loggedToday){ streak++; loggedToday = true; }
  renderAll();
  showToast(t('savedToast').replace('{surah}', surahName(s)));
}

function showToast(msg){
  const toast = document.getElementById('toast');
  toast.textContent = '';
  const dot = document.createElement('span'); dot.className='sq'; toast.appendChild(dot);
  toast.appendChild(document.createTextNode(msg));
  toast.classList.add('show');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(()=> toast.classList.remove('show'), 2600);
}

function renderAll(){
  renderStats();
  renderGrid();
  renderRevisionQueue();
  populateLogSelect();
}

window.onLanguageChange = renderAll;

document.addEventListener('DOMContentLoaded', () => {
  renderAll();
  const range = document.getElementById('logPercent');
  range.addEventListener('input', ()=>{ range.nextElementSibling.textContent = range.value + '%'; });
  document.getElementById('saveLogBtn').addEventListener('click', saveLog);
});
