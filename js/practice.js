// =========================================================
// PRACTICE HUB — Tasbih counter, Qibla dial, location, Fatwa Q&A
// All state is in-memory for this session (no backend yet).
// =========================================================

// ---- Digital Tasbih ----
const DHIKR_SET = [
  { key:'subhanAllah', en:'SubhanAllah', ur:'سبحان اللہ', target:33 },
  { key:'alhamdulillah', en:'Alhamdulillah', ur:'الحمدللہ', target:33 },
  { key:'allahuAkbar', en:'Allahu Akbar', ur:'اللہ اکبر', target:34 }
];
let dhikrIndex = 0;
let tasbihCount = 0;

function renderTasbih(){
  const cell = DHIKR_SET[dhikrIndex];
  const lang = window.currentLang || 'en';
  document.getElementById('tasbihCount').textContent = tasbihCount;
  document.getElementById('tasbihLabel').textContent = lang === 'ur' ? cell.ur : cell.en;
  const ring = document.getElementById('tasbihRing');
  if(ring){
    const pct = Math.min(100, Math.round((tasbihCount / cell.target) * 100));
    ring.style.setProperty('--pct', pct + '%');
  }
}

function tapTasbih(){
  tasbihCount++;
  const cell = DHIKR_SET[dhikrIndex];
  if(tasbihCount >= cell.target){
    // move to next dhikr in the cycle once the target is reached
    dhikrIndex = (dhikrIndex + 1) % DHIKR_SET.length;
    tasbihCount = 0;
    if(navigator.vibrate) navigator.vibrate(30);
  }
  renderTasbih();
}

function resetTasbih(){
  tasbihCount = 0;
  dhikrIndex = 0;
  renderTasbih();
}

// ---- Qibla dial ----
// Static reference: Peshawar, Pakistan → Kaaba bearing is ~257–262° (WSW),
// kept as the default until the browser gives us a real position.
let qiblaDeg = 259;

function setQiblaDeg(deg){
  qiblaDeg = Math.round(deg);
  const needle = document.getElementById('dialNeedle');
  if(needle) needle.style.transform = `translate(-50%,-100%) rotate(${qiblaDeg}deg)`;
  const label = document.getElementById('qiblaDegLabel');
  if(label){
    const lang = window.currentLang || 'en';
    const compass = compassPoint(qiblaDeg, lang);
    label.textContent = `${qiblaDeg}° ${compass}`;
  }
}

function compassPoint(deg, lang){
  const pointsEn = ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW'];
  const pointsUr = ['شمال','شمال شمال مشرق','شمال مشرق','مشرق شمال مشرق','مشرق','مشرق جنوب مشرق','جنوب مشرق','جنوب جنوب مشرق','جنوب','جنوب جنوب مغرب','جنوب مغرب','مغرب جنوب مغرب','مغرب','مغرب شمال مغرب','شمال مغرب','شمال شمال مغرب'];
  const idx = Math.round(deg / 22.5) % 16;
  return lang === 'ur' ? pointsUr[idx] : pointsEn[idx];
}

// Very rough great-circle bearing to the Kaaba from a lat/lng, used only
// to react to "use my location" — this is a UI demo, not a certified qibla source.
function bearingToKaaba(lat, lng){
  const kaabaLat = 21.4225 * Math.PI/180, kaabaLng = 39.8262 * Math.PI/180;
  const φ1 = lat * Math.PI/180, λ1 = lng * Math.PI/180;
  const y = Math.sin(kaabaLng - λ1) * Math.cos(kaabaLat);
  const x = Math.cos(φ1)*Math.sin(kaabaLat) - Math.sin(φ1)*Math.cos(kaabaLat)*Math.cos(kaabaLng - λ1);
  let brng = Math.atan2(y, x) * 180/Math.PI;
  return (brng + 360) % 360;
}

function locateForQibla(){
  const btn = document.getElementById('qiblaLocateBtn');
  if(!navigator.geolocation){
    flashNote(btn, window.currentLang === 'ur' ? 'مقام دستیاب نہیں' : 'Location unavailable');
    return;
  }
  const original = btn.textContent;
  btn.textContent = window.currentLang === 'ur' ? 'تلاش ہو رہا ہے…' : 'Locating…';
  navigator.geolocation.getCurrentPosition(
    pos => {
      const deg = bearingToKaaba(pos.coords.latitude, pos.coords.longitude);
      setQiblaDeg(deg);
      btn.textContent = original;
    },
    () => { btn.textContent = original; flashNote(btn, window.currentLang === 'ur' ? 'اجازت نہیں ملی' : 'Permission denied'); },
    { timeout: 8000 }
  );
}

function flashNote(el, text){
  const original = el.textContent;
  el.textContent = text;
  setTimeout(()=>{ el.textContent = original; }, 1800);
}

// ---- Change location (prayer times) ----
const CITY_TIMES = {
  peshawar:   { label:{en:'Peshawar',ur:'پشاور'}, fajr:'4:52 AM', zuhr:'12:31 PM', asr:'4:48 PM', maghrib:'7:02 PM', isha:'8:24 PM', next:'zuhr' },
  karachi:    { label:{en:'Karachi',ur:'کراچی'}, fajr:'5:12 AM', zuhr:'12:22 PM', asr:'4:12 PM', maghrib:'6:52 PM', isha:'8:10 PM', next:'zuhr' },
  lahore:     { label:{en:'Lahore',ur:'لاہور'}, fajr:'4:41 AM', zuhr:'12:18 PM', asr:'4:34 PM', maghrib:'6:56 PM', isha:'8:16 PM', next:'zuhr' },
  islamabad:  { label:{en:'Islamabad',ur:'اسلام آباد'}, fajr:'4:47 AM', zuhr:'12:24 PM', asr:'4:41 PM', maghrib:'6:59 PM', isha:'8:20 PM', next:'zuhr' },
  dubai:      { label:{en:'Dubai',ur:'دبئی'}, fajr:'4:36 AM', zuhr:'12:19 PM', asr:'3:44 PM', maghrib:'6:36 PM', isha:'8:04 PM', next:'zuhr' }
};
let currentCity = 'peshawar';

function renderPrayerTimes(){
  const c = CITY_TIMES[currentCity];
  const lang = window.currentLang || 'en';
  document.getElementById('prayerCityLabel').textContent = c.label[lang];
  ['fajr','zuhr','asr','maghrib','isha'].forEach(k=>{
    document.getElementById('time-'+k).textContent = c[k];
    document.getElementById('cell-'+k).classList.toggle('active', k === c.next);
  });
  document.querySelectorAll('.next-tag').forEach(t=>t.remove());
  const activeCell = document.getElementById('cell-'+c.next);
  if(activeCell){
    const tag = document.createElement('div');
    tag.className = 'next-tag';
    tag.setAttribute('data-i18n','nextTag');
    tag.textContent = window.translations?.[lang]?.nextTag || 'Next';
    activeCell.appendChild(tag);
  }
}

function openLocationModal(){ document.getElementById('locationModal').classList.add('open'); }
function closeLocationModal(){ document.getElementById('locationModal').classList.remove('open'); }
function chooseCity(city){
  currentCity = city;
  renderPrayerTimes();
  closeLocationModal();
}

// ---- Fatwa Q&A: ask a question ----
let fatwaQuestions = [];

function openFatwaModal(){ document.getElementById('fatwaModal').classList.add('open'); document.getElementById('fatwaInput').focus(); }
function closeFatwaModal(){ document.getElementById('fatwaModal').classList.remove('open'); }

function submitFatwaQuestion(){
  const input = document.getElementById('fatwaInput');
  const text = input.value.trim();
  if(!text) return;
  fatwaQuestions.unshift(text);
  renderFatwaList();
  input.value = '';
  closeFatwaModal();
}

function renderFatwaList(){
  const list = document.getElementById('fatwaMini');
  const extra = fatwaQuestions.map(q => `
    <div class="fq-row">
      <div class="fq-text">${escapeHtml(q)}</div>
      <span class="status-badge pending"><span class="sq"></span><span data-i18n="underReview">${window.translations?.[window.currentLang]?.underReview || 'Under Review'}</span></span>
    </div>`).join('');
  // keep the two seeded rows, prepend anything the learner just asked
  const seeded = list.querySelectorAll('.fq-row[data-seeded]');
  list.innerHTML = extra + Array.from(seeded).map(n=>n.outerHTML).join('');
}

function escapeHtml(str){
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ---- Re-render dynamic bits whenever the language toggles ----
window.onLanguageChange = function(lang){
  renderTasbih();
  setQiblaDeg(qiblaDeg);
  renderPrayerTimes();
  renderFatwaList();
};

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.fq-row').forEach(r => r.setAttribute('data-seeded','1'));
  renderTasbih();
  setQiblaDeg(qiblaDeg);
  renderPrayerTimes();

  document.getElementById('tasbihBtn')?.addEventListener('click', tapTasbih);
  document.getElementById('tasbihResetBtn')?.addEventListener('click', resetTasbih);
  document.getElementById('qiblaLocateBtn')?.addEventListener('click', locateForQibla);
  document.getElementById('changeLocationBtn')?.addEventListener('click', openLocationModal);
  document.getElementById('locationModalClose')?.addEventListener('click', closeLocationModal);
  document.querySelectorAll('[data-city]').forEach(btn=>{
    btn.addEventListener('click', ()=>chooseCity(btn.getAttribute('data-city')));
  });
  document.getElementById('askQuestionBtn')?.addEventListener('click', openFatwaModal);
  document.getElementById('fatwaModalClose')?.addEventListener('click', closeFatwaModal);
  document.getElementById('fatwaSubmitBtn')?.addEventListener('click', submitFatwaQuestion);
  document.getElementById('notifyToggle')?.addEventListener('change', function(){
    localStorageSafeSet('prayerNotify', this.checked ? '1' : '0');
  });
});

function localStorageSafeSet(){ /* no browser storage in this prototype; no-op placeholder */ }
