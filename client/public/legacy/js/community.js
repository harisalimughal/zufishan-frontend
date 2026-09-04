// =========================================================
// COMMUNITY — in-memory forum demo (no backend / persistence yet)
// =========================================================

const CATEGORIES = ['general','fiqh','hifz','announcements'];

let THREADS = [
  { id:'t1', author:'Ayesha K.', role:'Learner', cat:'hifz', time:'2h ago',
    body:'Any tips for retaining Juz 30 once you\u2019ve memorized it? I keep forgetting Surah Al-Ma\u2019un after a couple of weeks.',
    likes:14, liked:false, replies:6 },
  { id:'t2', author:'Ustadh Bilal', role:'Teacher', cat:'announcements', time:'1d ago',
    body:'New live Tajweed circle starts this Saturday after Asr. Limited to 20 seats — sign up from the course catalogue.',
    likes:41, liked:false, replies:12 },
  { id:'t3', author:'Fatima R.', role:'Learner', cat:'fiqh', time:'1d ago',
    body:'Question for the group: does traveling for less than 3 days still count as a journey for shortening prayers?',
    likes:9, liked:false, replies:8 },
  { id:'t4', author:'Hamza S.', role:'Learner', cat:'general', time:'2d ago',
    body:'Just finished the Zakat calculator on here — so much easier than the spreadsheet I was using before Ramadan.',
    likes:22, liked:false, replies:3 },
  { id:'t5', author:'Zainab A.', role:'Learner', cat:'hifz', time:'3d ago',
    body:'Started a 5am hifz habit this week using the streak tracker. Anyone else doing Fajr-time revision?',
    likes:17, liked:false, replies:9 }
];

let activeCat = 'all';
let postCounter = 1;

function t(key){
  const lang = window.currentLang || 'en';
  return (window.translations && window.translations[lang] && window.translations[lang][key]) || key;
}
function catLabel(cat){
  const map = { general:t('catGeneral'), fiqh:t('catFiqh'), hifz:t('catHifzDiscuss'), announcements:t('catAnnouncements') };
  return map[cat] || cat;
}

function renderCategoryPanel(){
  const panel = document.getElementById('catList');
  const counts = { all: THREADS.length };
  CATEGORIES.forEach(c => counts[c] = THREADS.filter(x=>x.cat===c).length);
  const rows = [['all', t('catAll')], ...CATEGORIES.map(c=>[c, catLabel(c)])];
  panel.innerHTML = rows.map(([val,label]) => `
    <div class="cat-opt ${activeCat===val?'active':''}" data-cat="${val}">
      <span>${label}</span><span class="count">${counts[val]}</span>
    </div>`).join('');
  panel.querySelectorAll('.cat-opt').forEach(el=>{
    el.addEventListener('click', ()=>{ activeCat = el.getAttribute('data-cat'); renderAll(); });
  });
}

function renderThreads(){
  const list = document.getElementById('threadList');
  const items = THREADS.filter(x => activeCat==='all' || x.cat===activeCat);
  if(items.length === 0){
    list.innerHTML = `<div class="empty-state"><h3>${t('noThreads')}</h3><p>${t('noThreadsNote')}</p></div>`;
    return;
  }
  list.innerHTML = items.map(th => `
    <div class="thread-card" data-id="${th.id}">
      <div class="thread-top">
        <div class="thread-av"></div>
        <div>
          <div class="thread-author">${th.author} <span style="font-weight:500; color:rgba(36,26,16,0.4);">· ${th.role}</span></div>
          <div class="thread-meta">${th.time}</div>
        </div>
        <span class="thread-cat-badge">${catLabel(th.cat)}</span>
      </div>
      <div class="thread-body">${escapeHtml(th.body)}</div>
      <div class="thread-actions">
        <button class="thread-action like-btn ${th.liked?'liked':''}" data-id="${th.id}">${th.liked?'♥':'♡'} <span class="like-count">${th.likes}</span></button>
        <button class="thread-action"><svg class="reply-icon" viewBox="0 0 20 20" width="15" height="15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 4.5C3 3.67157 3.67157 3 4.5 3H15.5C16.3284 3 17 3.67157 17 4.5V11.5C17 12.3284 16.3284 13 15.5 13H9.5L5.5 16.3V13H4.5C3.67157 13 3 12.3284 3 11.5V4.5Z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg> ${th.replies} ${t('replies')}</button>
      </div>
    </div>`).join('');

  list.querySelectorAll('.like-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const th = THREADS.find(x=>x.id===btn.getAttribute('data-id'));
      th.liked = !th.liked;
      th.likes += th.liked ? 1 : -1;
      renderThreads();
    });
  });
}

function escapeHtml(str){
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function submitPost(){
  const input = document.getElementById('postInput');
  const cat = document.getElementById('postCat').value;
  const text = input.value.trim();
  if(!text) return;
  THREADS.unshift({ id:'new'+(postCounter++), author: t('you'), role:t('learnerRole'), cat, time:t('justNow'), body:text, likes:0, liked:false, replies:0 });
  input.value = '';
  renderAll();
}

function renderAll(){
  renderCategoryPanel();
  renderThreads();
}

window.onLanguageChange = renderAll;

document.addEventListener('DOMContentLoaded', () => {
  renderAll();
  document.getElementById('postSubmitBtn').addEventListener('click', submitPost);
});
