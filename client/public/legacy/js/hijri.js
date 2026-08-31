// =========================================================
// HIJRI CALENDAR
// Uses the standard tabular ("civil") Islamic calendar algorithm for the
// date grid — a deterministic approximation used by most calendar apps.
// Actual observed dates can shift by a day depending on local moon
// sighting, which this widget flags rather than hides.
// =========================================================

const HIJRI_MONTH_NAMES = {
  en: ['Muharram','Safar',"Rabi' al-Awwal","Rabi' al-Thani","Jumada al-Awwal","Jumada al-Thani","Rajab","Sha'ban","Ramadan","Shawwal","Dhul-Qa'dah","Dhul-Hijjah"],
  ur: ['محرم','صفر','ربیع الاول','ربیع الثانی','جمادی الاول','جمادی الثانی','رجب','شعبان','رمضان','شوال','ذوالقعدہ','ذوالحجہ']
};

const HIJRI_EVENTS = {
  '1-1': { en:'Islamic New Year', ur:'اسلامی نیا سال' },
  '3-12': { en:'Mawlid al-Nabi ﷺ', ur:'میلاد النبی ﷺ' },
  '7-27': { en:"Isra & Mi'raj", ur:'اسراء و معراج' },
  '8-15': { en:"Shab-e-Barat", ur:'شب برات' },
  '9-1': { en:'Ramadan begins', ur:'رمضان کا آغاز' },
  '9-27': { en:"Laylat al-Qadr (observed)", ur:'لیلۃ القدر (روایتی رات)' },
  '10-1': { en:'Eid al-Fitr', ur:'عید الفطر' },
  '12-9': { en:'Day of Arafah', ur:'یوم عرفہ' },
  '12-10': { en:'Eid al-Adha', ur:'عید الاضحی' }
};

function gregorianToJDN(y, m, d){
  const a = Math.floor((14 - m) / 12);
  const y2 = y + 4800 - a;
  const m2 = m + 12 * a - 3;
  return d + Math.floor((153 * m2 + 2) / 5) + 365 * y2 + Math.floor(y2 / 4) - Math.floor(y2 / 100) + Math.floor(y2 / 400) - 32045;
}

function jdnToGregorian(jdn){
  let a = jdn + 32044;
  let b = Math.floor((4 * a + 3) / 146097);
  let c = a - Math.floor((146097 * b) / 4);
  let d = Math.floor((4 * c + 3) / 1461);
  let e = c - Math.floor((1461 * d) / 4);
  let m = Math.floor((5 * e + 2) / 153);
  const day = e - Math.floor((153 * m + 2) / 5) + 1;
  const month = m + 3 - 12 * Math.floor(m / 10);
  const year = 100 * b + d - 4800 + Math.floor(m / 10);
  return { year, month, day };
}

function islamicFromJDN(jdn){
  let l = jdn - 1948440 + 10632;
  const n = Math.floor((l - 1) / 10631);
  l = l - 10631 * n + 354;
  const j = Math.floor((10985 - l) / 5316) * Math.floor((50 * l) / 17719) + Math.floor(l / 5670) * Math.floor((43 * l) / 15238);
  l = l - Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) - Math.floor(j / 16) * Math.floor((15238 * j) / 43) + 29;
  const month = Math.floor((24 * l) / 709);
  const day = l - Math.floor((709 * month) / 24);
  const year = 30 * n + j - 30;
  return { year, month, day };
}

function islamicToJDN(year, month, day){
  return day + Math.ceil(29.5 * (month - 1)) + (year - 1) * 354 + Math.floor((3 + 11 * year) / 30) + 1948440 - 1;
}

let viewYear, viewMonth; // hijri

function t(key){
  const lang = window.currentLang || 'en';
  return (window.translations && window.translations[lang] && window.translations[lang][key]) || key;
}

function daysInHijriMonth(year, month){
  const start = islamicToJDN(year, month, 1);
  const nextMonth = month === 12 ? 1 : month + 1;
  const nextYear = month === 12 ? year + 1 : year;
  const end = islamicToJDN(nextYear, nextMonth, 1);
  return end - start;
}

function renderCalendar(){
  const lang = window.currentLang || 'en';
  const todayJDN = gregorianToJDN(new Date().getFullYear(), new Date().getMonth()+1, new Date().getDate());
  const today = islamicFromJDN(todayJDN);

  document.getElementById('hijriMonthLabel').textContent = `${HIJRI_MONTH_NAMES[lang][viewMonth-1]} ${viewYear} AH`;
  const firstJDN = islamicToJDN(viewYear, viewMonth, 1);
  const firstGreg = jdnToGregorian(firstJDN);
  document.getElementById('gregSub').textContent = `${t('approxLabel')} ${new Date(firstGreg.year, firstGreg.month-1, firstGreg.day).toLocaleString(lang==='ur'?'ur':'en', {month:'long', year:'numeric'})}`;

  const numDays = daysInHijriMonth(viewYear, viewMonth);
  const startDow = new Date(firstGreg.year, firstGreg.month-1, firstGreg.day).getDay(); // 0=Sun

  const grid = document.getElementById('calGrid');
  const dowNames = lang === 'ur' ? ['اتوار','پیر','منگل','بدھ','جمعرات','جمعہ','ہفتہ'] : ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  let html = dowNames.map(d=>`<div class="cal-dow">${d}</div>`).join('');
  for(let i=0;i<startDow;i++) html += `<div class="cal-day empty"></div>`;

  for(let day=1; day<=numDays; day++){
    const jdn = islamicToJDN(viewYear, viewMonth, day);
    const g = jdnToGregorian(jdn);
    const isToday = (viewYear===today.year && viewMonth===today.month && day===today.day);
    const evt = HIJRI_EVENTS[`${viewMonth}-${day}`];
    html += `<div class="cal-day ${isToday?'today':''} ${evt?'event':''}" title="${evt ? (evt[lang]||evt.en) : ''}">
      ${evt ? '<span class="dot-mark"></span>' : ''}
      <div>${day}</div>
      <div class="greg">${g.month}/${g.day}</div>
    </div>`;
  }
  grid.innerHTML = html;
}

function renderEventList(){
  const lang = window.currentLang || 'en';
  const panel = document.getElementById('eventList');
  const items = Object.entries(HIJRI_EVENTS).map(([key, name]) => {
    const [m,d] = key.split('-').map(Number);
    return { m, d, name };
  }).sort((a,b)=> a.m-b.m || a.d-b.d);

  panel.innerHTML = items.map(ev => `
    <div class="event-item">
      <div class="event-date-chip"><div class="d">${ev.d}</div><div class="m">${HIJRI_MONTH_NAMES[lang][ev.m-1].slice(0,3)}</div></div>
      <div>
        <div class="event-name">${ev.name[lang] || ev.name.en}</div>
        <div class="event-sync">${t('syncNote')}</div>
        <button class="sync-btn" data-m="${ev.m}" data-d="${ev.d}">${t('addToDeviceCalendar')}</button>
      </div>
    </div>`).join('');

  panel.querySelectorAll('.sync-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      btn.textContent = t('added');
      setTimeout(()=>{ btn.textContent = t('addToDeviceCalendar'); }, 1500);
    });
  });
}

window.onLanguageChange = function(){ renderCalendar(); renderEventList(); };

document.addEventListener('DOMContentLoaded', () => {
  const todayJDN = gregorianToJDN(new Date().getFullYear(), new Date().getMonth()+1, new Date().getDate());
  const today = islamicFromJDN(todayJDN);
  viewYear = today.year;
  viewMonth = today.month;
  renderCalendar();
  renderEventList();

  document.getElementById('prevMonthBtn').addEventListener('click', ()=>{
    viewMonth--; if(viewMonth < 1){ viewMonth = 12; viewYear--; }
    renderCalendar();
  });
  document.getElementById('nextMonthBtn').addEventListener('click', ()=>{
    viewMonth++; if(viewMonth > 12){ viewMonth = 1; viewYear++; }
    renderCalendar();
  });
});
