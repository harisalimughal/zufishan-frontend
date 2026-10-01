// =========================================================
// PRACTICE HUB — Tasbih counter, Qibla dial, Namaz timings, Fatwa Q&A
// State is persisted to localStorage so it survives a page refresh
// and carries over when you navigate to another page and back.
// (No backend yet — this is still just the current browser/device.)
//
// Prayer times and the Qibla bearing are both calculated live from
// coordinates using standard solar-position astronomy (the same
// approach used by most prayer-time calculators), not looked up from
// a static table — see computePrayerTimes() and bearingToKaaba().
// =========================================================

const PRACTICE_STORAGE_PREFIX = 'zf_practice_';

function safeGet(key, fallback){
  try{
    const raw = localStorage.getItem(PRACTICE_STORAGE_PREFIX + key);
    if(raw === null) return fallback;
    return JSON.parse(raw);
  }catch(e){
    return fallback; // storage disabled/unavailable (e.g. private browsing) — fall back silently
  }
}

function safeSet(key, value){
  try{
    localStorage.setItem(PRACTICE_STORAGE_PREFIX + key, JSON.stringify(value));
  }catch(e){
    // ignore — nothing we can do if storage is unavailable
  }
}

// ---- Digital Tasbih ----
const DHIKR_SET = [
  { key:'subhanAllah', en:'SubhanAllah', ur:'سبحان اللہ', target:33 },
  { key:'alhamdulillah', en:'Alhamdulillah', ur:'الحمدللہ', target:33 },
  { key:'allahuAkbar', en:'Allahu Akbar', ur:'اللہ اکبر', target:34 }
];
let dhikrIndex = safeGet('dhikrIndex', 0);
let tasbihCount = safeGet('tasbihCount', 0);

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
    if (window.zfApi && window.zfApi.getToken()) {
      window.zfApi.post('/v1/utilities/tasbih/sessions', {
        phrase: cell.en,
        count: cell.target,
        target: cell.target,
        sessionDate: new Date().toISOString(),
      }).catch(() => {});
    }
    dhikrIndex = (dhikrIndex + 1) % DHIKR_SET.length;
    tasbihCount = 0;
    if(navigator.vibrate) navigator.vibrate(30);
  }
  safeSet('tasbihCount', tasbihCount);
  safeSet('dhikrIndex', dhikrIndex);
  renderTasbih();
}

function resetTasbih(){
  tasbihCount = 0;
  dhikrIndex = 0;
  safeSet('tasbihCount', tasbihCount);
  safeSet('dhikrIndex', dhikrIndex);
  renderTasbih();
}

// =========================================================
// SOLAR ASTRONOMY — shared by both the Qibla bearing and the prayer
// time calculation below. Standard formulas (Meeus-style low-precision
// solar position); good to within a minute or two, which is the same
// order of accuracy real prayer-time apps operate at.
// =========================================================

const D2R = Math.PI / 180, R2D = 180 / Math.PI;
const dsin = d => Math.sin(d * D2R);
const dcos = d => Math.cos(d * D2R);
const dtan = d => Math.tan(d * D2R);
const darcsin = x => Math.asin(x) * R2D;
const darccos = x => Math.acos(Math.min(1, Math.max(-1, x))) * R2D;
const darctan2 = (y, x) => Math.atan2(y, x) * R2D;
const darccot = x => Math.atan2(1, x) * R2D;
const fixAngle = a => { a = a % 360; return a < 0 ? a + 360 : a; };
const fixHour = h => { h = h % 24; return h < 0 ? h + 24 : h; };

function julianDay(year, month, day){
  if(month <= 2){ year -= 1; month += 12; }
  const A = Math.floor(year / 100);
  const B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + B - 1524.5;
}

// Sun's declination and the equation of time (in hours) for a given Julian Day
function sunPosition(jd){
  const D = jd - 2451545.0;
  const g = fixAngle(357.529 + 0.98560028 * D);
  const q = fixAngle(280.459 + 0.98564736 * D);
  const L = fixAngle(q + 1.915 * dsin(g) + 0.020 * dsin(2 * g));
  const e = 23.439 - 0.00000036 * D;
  const RA = darctan2(dcos(e) * dsin(L), dcos(L)) / 15;
  const eqt = q / 15 - fixHour(RA);
  const decl = darcsin(dsin(e) * dsin(L));
  return { decl, eqt };
}

// Hours between solar noon and the moment the sun reaches a given altitude
// (negative altitude = below the horizon, used for Fajr/Isha/sunset twilight angles)
function hourAngleForAltitude(altitude, lat, decl){
  const num = dsin(altitude) - dsin(lat) * dsin(decl);
  const den = dcos(lat) * dcos(decl);
  return darccos(num / den) / 15;
}

// Great-circle bearing from (lat,lng) to the Kaaba
function bearingToKaaba(lat, lng){
  const kaabaLat = 21.4225, kaabaLng = 39.8262;
  const y = dsin(kaabaLng - lng) * dcos(kaabaLat);
  const x = dcos(lat) * dsin(kaabaLat) - dsin(lat) * dcos(kaabaLat) * dcos(kaabaLng - lng);
  return fixAngle(darctan2(y, x));
}

const FAJR_ANGLE = 18, ISHA_ANGLE = 18; // University of Islamic Sciences, Karachi convention
const ASR_FACTOR = 2; // Hanafi (shadow = 2× object length) — the common default in Pakistan; Shafi'i/Maliki/Hanbali use 1

function computePrayerTimes(date, lat, lng, timezone){
  const jd = julianDay(date.getFullYear(), date.getMonth() + 1, date.getDate());
  const { decl, eqt } = sunPosition(jd);

  const dhuhr = fixHour(12 - lng / 15 - eqt + timezone);
  const fajr = fixHour(dhuhr - hourAngleForAltitude(-FAJR_ANGLE, lat, decl));
  const sunriseOffset = hourAngleForAltitude(-0.833, lat, decl);
  const sunset = fixHour(dhuhr + sunriseOffset);
  const isha = fixHour(dhuhr + hourAngleForAltitude(-ISHA_ANGLE, lat, decl));
  const asrAltitude = darccot(ASR_FACTOR + Math.abs(dtan(lat - decl)));
  const asr = fixHour(dhuhr + hourAngleForAltitude(asrAltitude, lat, decl));

  return { fajr, dhuhr, asr, maghrib: sunset, isha };
}

function hoursToClock(h, lang){
  const totalMin = Math.round(h * 60);
  let hh = Math.floor(totalMin / 60) % 24;
  const mm = totalMin % 60;
  const period = hh >= 12 ? (lang === 'ur' ? 'شام' : 'PM') : (lang === 'ur' ? 'صبح' : 'AM');
  let h12 = hh % 12; if(h12 === 0) h12 = 12;
  return `${h12}:${String(mm).padStart(2,'0')} ${period}`;
}

// ---- Locations: five preset cities plus whatever the browser reports ----
const CITY_COORDS = {
  peshawar:   { label:{en:'Peshawar',ur:'پشاور'}, lat:34.0151, lng:71.5249, tz:5 },
  karachi:    { label:{en:'Karachi',ur:'کراچی'}, lat:24.8607, lng:67.0011, tz:5 },
  lahore:     { label:{en:'Lahore',ur:'لاہور'}, lat:31.5497, lng:74.3436, tz:5 },
  islamabad:  { label:{en:'Islamabad',ur:'اسلام آباد'}, lat:33.6844, lng:73.0479, tz:5 },
  dubai:      { label:{en:'Dubai',ur:'دبئی'}, lat:25.2048, lng:55.2708, tz:4 }
};

let currentLocation = (() => {
  const savedCity = safeGet('currentCity', 'peshawar');
  if(CITY_COORDS[savedCity]) return { ...CITY_COORDS[savedCity], key: savedCity };
  const custom = safeGet('customLocation', null);
  return custom || { ...CITY_COORDS.peshawar, key: 'peshawar' };
})();

function setLocation(loc, save){
  currentLocation = loc;
  if(save){
    if(loc.key) safeSet('currentCity', loc.key);
    else { safeSet('currentCity', null); safeSet('customLocation', loc); }
  }
  renderPrayerTimes();
  renderQibla();
}

// ---- Qibla dial (driven by currentLocation, recalculated live + API sync) ----
function renderQibla(){
  const deg = Math.round(bearingToKaaba(currentLocation.lat, currentLocation.lng));
  applyQiblaDeg(deg);

  if (window.zfApi) {
    window.zfApi.get('/v1/utilities/qibla', {
      latitude: currentLocation.lat,
      longitude: currentLocation.lng,
    }).then(res => {
      if (res.ok && res.data && (res.data.data?.direction !== undefined || res.data.direction !== undefined)) {
        const liveDeg = Math.round(res.data.data?.direction ?? res.data.direction);
        applyQiblaDeg(liveDeg);
      }
    }).catch(() => {});
  }
}

function applyQiblaDeg(deg){
  const needle = document.getElementById('dialNeedle');
  if(needle) needle.style.transform = `translate(-50%,-100%) rotate(${deg}deg)`;
  const label = document.getElementById('qiblaDegLabel');
  if(label){
    const lang = window.currentLang || 'en';
    label.textContent = `${deg}° ${compassPoint(deg, lang)}`;
  }
}

function compassPoint(deg, lang){
  const pointsEn = ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW'];
  const pointsUr = ['شمال','شمال شمال مشرق','شمال مشرق','مشرق شمال مشرق','مشرق','مشرق جنوب مشرق','جنوب مشرق','جنوب جنوب مشرق','جنوب','جنوب جنوب مغرب','جنوب مغرب','مغرب جنوب مغرب','مغرب','مغرب شمال مغرب','شمال مغرب','شمال شمال مغرب'];
  const idx = Math.round(deg / 22.5) % 16;
  return lang === 'ur' ? pointsUr[idx] : pointsEn[idx];
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
      const loc = { label:{en:'Your Location',ur:'آپ کا مقام'}, lat:pos.coords.latitude, lng:pos.coords.longitude, tz: -new Date().getTimezoneOffset()/60, key:null };
      setLocation(loc, true);
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

// ---- Namaz timings, calculated for currentLocation on today's date ----
function renderPrayerTimes(){
  const lang = window.currentLang || 'en';
  const loc = currentLocation;
  document.getElementById('prayerCityLabel').textContent = loc.label[lang] || loc.label.en;

  const times = computePrayerTimes(new Date(), loc.lat, loc.lng, loc.tz);
  const order = ['fajr','dhuhr','asr','maghrib','isha'];
  const domKey = { fajr:'fajr', dhuhr:'zuhr', asr:'asr', maghrib:'maghrib', isha:'isha' };

  order.forEach(k => {
    document.getElementById('time-' + domKey[k]).textContent = hoursToClock(times[k], lang);
  });

  // "Next" = the first prayer later than the current time at this location;
  // if we're past Isha, the next one is tomorrow's Fajr.
  const nowUTCHours = new Date().getUTCHours() + new Date().getUTCMinutes()/60;
  const nowLocal = fixHour(nowUTCHours + loc.tz);
  let nextKey = order.find(k => times[k] > nowLocal);
  if(!nextKey) nextKey = 'fajr';

  document.querySelectorAll('.next-tag').forEach(t => t.remove());
  order.forEach(k => {
    const cell = document.getElementById('cell-' + domKey[k]);
    const isNext = domKey[k] === domKey[nextKey];
    cell.classList.toggle('active', isNext);
    if(isNext){
      const tag = document.createElement('div');
      tag.className = 'next-tag';
      tag.setAttribute('data-i18n', 'nextTag');
      tag.textContent = window.translations?.[lang]?.nextTag || 'Next';
      cell.appendChild(tag);
    }
  });

  // Live sync with backend prayer times API if reachable
  if (window.zfApi) {
    const todayStr = new Date().toISOString().slice(0, 10);
    window.zfApi.get('/v1/utilities/prayer-times', {
      latitude: loc.lat,
      longitude: loc.lng,
      method: 'Karachi',
      asrMethod: 1,
      date: todayStr,
    }).then(res => {
      const timings = res.ok && (res.data?.data?.timings || res.data?.timings);
      if (timings) {
        const apiMap = { fajr: timings.Fajr, dhuhr: timings.Dhuhr, asr: timings.Asr, maghrib: timings.Maghrib, isha: timings.Isha };
        order.forEach(k => {
          if (apiMap[k]) {
            const parts = apiMap[k].split(':');
            const h = parseInt(parts[0], 10) + parseInt(parts[1], 10) / 60;
            const el = document.getElementById('time-' + domKey[k]);
            if (el) el.textContent = hoursToClock(h, lang);
          }
        });
      }
    }).catch(() => {});
  }
}

function openLocationModal(){ document.getElementById('locationModal').classList.add('open'); }
function closeLocationModal(){ document.getElementById('locationModal').classList.remove('open'); }
function chooseCity(cityKey){
  setLocation({ ...CITY_COORDS[cityKey], key: cityKey }, true);
  closeLocationModal();
}

// ---- Fatwa Q&A: ask a question ----
let fatwaQuestions = safeGet('fatwaQuestions', []);

function openFatwaModal(){ document.getElementById('fatwaModal').classList.add('open'); document.getElementById('fatwaInput').focus(); }
function closeFatwaModal(){ document.getElementById('fatwaModal').classList.remove('open'); }

function submitFatwaQuestion(){
  const input = document.getElementById('fatwaInput');
  const text = input.value.trim();
  if(!text) return;
  fatwaQuestions.unshift(text);
  safeSet('fatwaQuestions', fatwaQuestions);
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
  renderQibla();
  renderPrayerTimes();
  renderFatwaList();
};

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.fq-row').forEach(r => r.setAttribute('data-seeded','1'));

  renderTasbih();
  renderQibla();
  renderPrayerTimes();
  if(fatwaQuestions.length) renderFatwaList();

  // Try to use the real device location automatically on first load so the
  // times/Qibla reflect where the learner actually is, unless they've
  // already picked a specific city on an earlier visit (respect that choice).
  if(!safeGet('locationChoiceMade', false) && navigator.geolocation){
    navigator.geolocation.getCurrentPosition(
      pos => {
        const loc = { label:{en:'Your Location',ur:'آپ کا مقام'}, lat:pos.coords.latitude, lng:pos.coords.longitude, tz: -new Date().getTimezoneOffset()/60, key:null };
        currentLocation = loc;
        safeSet('customLocation', loc);
        safeSet('currentCity', null);
        renderPrayerTimes();
        renderQibla();
      },
      () => { /* silently keep the Peshawar default if permission is denied */ },
      { timeout: 6000 }
    );
  }

  // Keep the "next" prayer indicator accurate as real time passes
  setInterval(renderPrayerTimes, 60000);

  const notifyToggle = document.getElementById('notifyToggle');
  if(notifyToggle) notifyToggle.checked = safeGet('notifyEnabled', true);

  document.getElementById('tasbihBtn')?.addEventListener('click', tapTasbih);
  document.getElementById('tasbihResetBtn')?.addEventListener('click', resetTasbih);
  document.getElementById('qiblaLocateBtn')?.addEventListener('click', () => { safeSet('locationChoiceMade', true); locateForQibla(); });
  document.getElementById('changeLocationBtn')?.addEventListener('click', openLocationModal);
  document.getElementById('locationModalClose')?.addEventListener('click', closeLocationModal);
  document.querySelectorAll('[data-city]').forEach(btn=>{
    btn.addEventListener('click', ()=>{ safeSet('locationChoiceMade', true); chooseCity(btn.getAttribute('data-city')); });
  });
  document.getElementById('askQuestionBtn')?.addEventListener('click', openFatwaModal);
  document.getElementById('fatwaModalClose')?.addEventListener('click', closeFatwaModal);
  document.getElementById('fatwaSubmitBtn')?.addEventListener('click', submitFatwaQuestion);
  notifyToggle?.addEventListener('change', function(){
    safeSet('notifyEnabled', this.checked);
  });

  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if(e.target === overlay) overlay.classList.remove('open');
    });
  });

  const dAiInput = document.getElementById('dashboardAiInput');
  const dAiBtn = document.getElementById('dashboardAiBtn');
  function submitDashboardAi() {
    const q = dAiInput?.value.trim();
    if (q) {
      sessionStorage.setItem('zf_initial_ai_query', q);
      window.location.href = '/ai-assistant';
    }
  }
  dAiBtn?.addEventListener('click', submitDashboardAi);
  dAiInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submitDashboardAi();
    }
  });
});
