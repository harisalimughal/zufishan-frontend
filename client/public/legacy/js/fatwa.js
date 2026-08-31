// =========================================================
// FATWA Q&A — full list, filters, ask-a-question flow (in-memory demo)
// =========================================================

let FATWAS = [
  { id:'f1', cat:'zakat', status:'answered', q:'Is Zakat due on jewellery worn daily, or only on stored gold?',
    scholar:'Mufti Aslam Qureshi', answer:'Zakat is due on gold and silver regardless of whether it is worn or stored, according to the majority view, once it reaches the nisab threshold and a lunar year has passed.', madhab:'Hanafi view shown — some scholars in the Shafi\u2019i school exempt jewellery in customary personal use.' },
  { id:'f2', cat:'salah', status:'pending', q:'Can Taraweeh be shortened due to illness?', scholar:null, answer:null, madhab:null },
  { id:'f3', cat:'salah', status:'answered', q:'Does traveling for less than 3 days still count as a journey for shortening prayers?',
    scholar:'Shaykh Imran Farooq', answer:'Most scholars set the distance (roughly 80km+) rather than the number of days as the criterion for a journey that permits shortening prayers, so a short trip can still qualify if it meets the distance.', madhab:'Distance-based view shown — duration-based opinions also exist among the Hanafi jurists.' },
  { id:'f4', cat:'marriage', status:'answered', q:'Is a verbal agreement enough for Nikah, or is a written contract required?',
    scholar:'Mufti Aslam Qureshi', answer:'A verbal declaration and acceptance with two witnesses fulfils the religious requirement; a written contract is strongly recommended for legal protection but is not itself the ruling condition.', madhab:'Agreed upon across the major schools regarding the core pillars of Nikah.' },
  { id:'f5', cat:'general', status:'pending', q:'Is it permissible to take out a loan with an admin fee that is not interest-based?', scholar:null, answer:null, madhab:null },
  { id:'f6', cat:'zakat', status:'answered', q:'Do I pay Zakat on money I\u2019ve lent to a family member and expect back?',
    scholar:'Shaykh Imran Farooq', answer:'If you are confident the loan will be repaid, most scholars say you should include it in your Zakat calculation each year, similar to cash you hold.', madhab:'Views differ on loans considered unlikely to be repaid — those are typically excluded until received.' }
];

let activeCat = 'all';
let activeStatus = 'all';
let postCounter = 1;

function t(key){
  const lang = window.currentLang || 'en';
  return (window.translations && window.translations[lang] && window.translations[lang][key]) || key;
}
function catLabel(cat){
  const map = { zakat:t('catZakat'), salah:t('catSalah'), marriage:t('catMarriage'), general:t('catGeneral') };
  return map[cat] || cat;
}

function renderList(){
  const list = document.getElementById('fatwaFullList');
  const items = FATWAS.filter(f => (activeCat==='all'||f.cat===activeCat) && (activeStatus==='all'||f.status===activeStatus));
  if(items.length === 0){
    list.innerHTML = `<div class="empty-state"><h3>${t('noResultsHeading')}</h3><p>${t('noResultsNote')}</p></div>`;
    return;
  }
  list.innerHTML = items.map(f => `
    <div class="fatwa-card">
      <div class="fatwa-meta-row">
        <span class="category-tag">${catLabel(f.cat)}</span>
        <span class="status-badge ${f.status==='pending'?'pending':''}"><span class="sq"></span>${f.status==='answered'?t('authentic'):t('underReview')}</span>
      </div>
      <div class="fq-row"><div class="fq-text">${escapeHtml(f.q)}</div></div>
      ${f.status==='answered' ? `
        <div class="answer-block">
          <div class="scholar">${f.scholar}</div>
          <div class="answer-text">${escapeHtml(f.answer)}</div>
          <div class="madhab-line">${escapeHtml(f.madhab)}</div>
        </div>` : `<p class="pcard-note">${t('pendingNote')}</p>`}
    </div>`).join('');
}

function escapeHtml(str){
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function openFatwaModal(){ document.getElementById('fatwaModal').classList.add('open'); document.getElementById('fatwaInput').focus(); }
function closeFatwaModal(){ document.getElementById('fatwaModal').classList.remove('open'); }

function submitFatwaQuestion(){
  const input = document.getElementById('fatwaInput');
  const cat = document.getElementById('fatwaCat').value;
  const text = input.value.trim();
  if(!text) return;
  FATWAS.unshift({ id:'new'+(postCounter++), cat, status:'pending', q:text, scholar:null, answer:null, madhab:null });
  input.value = '';
  closeFatwaModal();
  activeStatus = 'all'; activeCat = 'all';
  syncChipUI();
  renderList();
}

function syncChipUI(){
  document.querySelectorAll('.filter-chip[data-group="cat"]').forEach(c=>c.classList.toggle('active', c.dataset.value===activeCat));
  document.querySelectorAll('.filter-chip[data-group="status"]').forEach(c=>c.classList.toggle('active', c.dataset.value===activeStatus));
}

window.onLanguageChange = renderList;

document.addEventListener('DOMContentLoaded', () => {
  renderList();
  document.querySelectorAll('.filter-chip[data-group="cat"]').forEach(chip=>{
    chip.addEventListener('click', ()=>{ activeCat = chip.dataset.value; syncChipUI(); renderList(); });
  });
  document.querySelectorAll('.filter-chip[data-group="status"]').forEach(chip=>{
    chip.addEventListener('click', ()=>{ activeStatus = chip.dataset.value; syncChipUI(); renderList(); });
  });
  document.getElementById('askQuestionBtn').addEventListener('click', openFatwaModal);
  document.getElementById('fatwaModalClose').addEventListener('click', closeFatwaModal);
  document.getElementById('fatwaSubmitBtn').addEventListener('click', submitFatwaQuestion);
});
