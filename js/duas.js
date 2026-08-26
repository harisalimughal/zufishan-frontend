// =========================================================
// DUA & AZKAR LIBRARY
// Audio "play" is a simulated toggle (no audio files bundled with this
// prototype) — it demonstrates the interaction, not real playback.
// =========================================================

const DUA_CATEGORIES = ['morning','evening','travel','ease','distress','home'];

const DUAS = [
  { id:'d1', cat:'morning', title:{en:'Upon Waking Up',ur:'صبح بیدار ہوتے وقت'},
    ar:'اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ',
    translit:'Allāhumma bika aṣbaḥnā wa bika amsaynā, wa bika naḥyā wa bika namūtu wa ilaykan-nushūr',
    translation:{en:'O Allah, by You we enter the morning and by You we enter the evening; by You we live and by You we die, and to You is the return.', ur:'اے اللہ! تیرے ہی سبب ہم نے صبح کی اور تیرے ہی سبب شام کی، تیرے ہی سبب ہم زندہ رہتے اور مرتے ہیں، اور تیری ہی طرف لوٹنا ہے۔'},
    source:'Sunan al-Tirmidhi' },
  { id:'d2', cat:'evening', title:{en:'Upon Entering the Evening',ur:'شام کے وقت'},
    ar:'اللَّهُمَّ بِكَ أَمْسَيْنَا وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ الْمَصِيرُ',
    translit:'Allāhumma bika amsaynā wa bika aṣbaḥnā, wa bika naḥyā wa bika namūtu wa ilaykal-maṣīr',
    translation:{en:'O Allah, by You we enter the evening and by You we enter the morning; by You we live and by You we die, and to You is the final return.', ur:'اے اللہ! تیرے ہی سبب ہم نے شام کی اور تیرے ہی سبب صبح کی، تیرے ہی سبب ہم زندہ رہتے اور مرتے ہیں، اور تیری ہی طرف بازگشت ہے۔'},
    source:'Sunan al-Tirmidhi' },
  { id:'d3', cat:'travel', title:{en:'Beginning a Journey',ur:'سفر شروع کرتے وقت'},
    ar:'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَىٰ رَبِّنَا لَمُنْقَلِبُونَ',
    translit:'Subḥānal-ladhī sakhkhara lanā hādhā wa mā kunnā lahū muqrinīn, wa innā ilā rabbinā lamunqalibūn',
    translation:{en:'Glory to Him who has made this subservient to us, for we could never have done it ourselves. And indeed, to our Lord we will return.', ur:'پاک ہے وہ ذات جس نے اسے ہمارے تابع کیا، ورنہ ہم اسے قابو میں نہ لا سکتے تھے، اور بے شک ہم اپنے رب کی طرف لوٹنے والے ہیں۔'},
    source:'Qur\u2019an 43:13\u201314' },
  { id:'d4', cat:'ease', title:{en:'For Ease Before a Task or Exam',ur:'کام یا امتحان سے پہلے آسانی کے لیے'},
    ar:'رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي',
    translit:'Rabbish-raḥ lī ṣadrī wa yassir lī amrī',
    translation:{en:'My Lord, expand my chest for me and ease my task for me.', ur:'اے میرے رب! میرا سینہ کھول دے اور میرا کام میرے لیے آسان کر دے۔'},
    source:'Qur\u2019an 20:25\u201326' },
  { id:'d5', cat:'distress', title:{en:'In Times of Distress',ur:'پریشانی کے وقت'},
    ar:'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ',
    translit:'Ḥasbunallāhu wa niʿmal-wakīl',
    translation:{en:'Allah is sufficient for us, and He is the best disposer of affairs.', ur:'ہمارے لیے اللہ کافی ہے اور وہ بہترین کارساز ہے۔'},
    source:'Qur\u2019an 3:173' },
  { id:'d6', cat:'home', title:{en:'Before Eating',ur:'کھانے سے پہلے'},
    ar:'اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ',
    translit:'Allāhumma bārik lanā fīmā razaqtanā wa qinā ʿadhāban-nār',
    translation:{en:'O Allah, bless what You have provided us, and protect us from the punishment of the Fire.', ur:'اے اللہ! جو رزق تو نے ہمیں دیا اس میں برکت دے اور ہمیں آگ کے عذاب سے بچا۔'},
    source:'Sunan Ibn Mājah' },
  { id:'d7', cat:'home', title:{en:'Entering and Leaving the Home',ur:'گھر میں داخل ہوتے اور نکلتے وقت'},
    ar:'بِسْمِ اللَّهِ وَلَجْنَا وَبِسْمِ اللَّهِ خَرَجْنَا وَعَلَىٰ رَبِّنَا تَوَكَّلْنَا',
    translit:'Bismillāhi walajnā wa bismillāhi kharajnā wa ʿalā rabbinā tawakkalnā',
    translation:{en:'In the name of Allah we enter, in the name of Allah we leave, and upon our Lord we depend.', ur:'اللہ کے نام سے ہم داخل ہوئے اور اللہ کے نام سے نکلے اور اپنے رب پر ہی بھروسہ کیا۔'},
    source:'Sunan Abī Dāwūd' }
];

let activeCat = 'all';
let playingId = null;

function t(key){
  const lang = window.currentLang || 'en';
  return (window.translations && window.translations[lang] && window.translations[lang][key]) || key;
}
function catLabel(cat){
  const map = { morning:t('catMorning'), evening:t('catEvening'), travel:t('catTravel'), ease:t('catEase'), distress:t('catDistress'), home:t('catHome') };
  return map[cat] || cat;
}

function renderCats(){
  const panel = document.getElementById('duaCats');
  const counts = { all: DUAS.length };
  DUA_CATEGORIES.forEach(c => counts[c] = DUAS.filter(d=>d.cat===c).length);
  const rows = [['all', t('catAll')], ...DUA_CATEGORIES.map(c=>[c, catLabel(c)])];
  panel.innerHTML = rows.map(([val,label]) => `
    <div class="dua-cat-opt ${activeCat===val?'active':''}" data-cat="${val}">
      <span>${label}</span><span class="count">${counts[val]}</span>
    </div>`).join('');
  panel.querySelectorAll('.dua-cat-opt').forEach(el=>{
    el.addEventListener('click', ()=>{ activeCat = el.getAttribute('data-cat'); renderList(); renderCats(); });
  });
}

function renderList(){
  const lang = window.currentLang || 'en';
  const list = document.getElementById('duaList');
  const items = DUAS.filter(d => activeCat==='all' || d.cat===activeCat);
  list.innerHTML = items.map(d => `
    <div class="dua-card">
      <div class="dua-card-head">
        <div>
          <div class="dua-occasion">${catLabel(d.cat)}</div>
          <div class="dua-title">${d.title[lang] || d.title.en}</div>
        </div>
        <button class="dua-play ${playingId===d.id?'playing':''}" data-id="${d.id}">${playingId===d.id?'❚❚':'▶'}</button>
      </div>
      <div class="dua-arabic">${d.ar}</div>
      <div class="dua-translit">${d.translit}</div>
      <div class="dua-translation">${d.translation[lang] || d.translation.en}</div>
      <div class="dua-source">${d.source}</div>
    </div>`).join('');

  list.querySelectorAll('.dua-play').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const id = btn.getAttribute('data-id');
      playingId = (playingId === id) ? null : id;
      renderList();
    });
  });
}

window.onLanguageChange = function(){ renderCats(); renderList(); renderTasbihDua(); };

// ---- Digital Tasbih embedded per PRD §3.2 (adjustable target, own daily count) ----
const TASBIH_PHRASES = { subhanAllah:{en:'SubhanAllah',ur:'سبحان اللہ'} };
let tasbihTargetDua = 33;
let tasbihCountDua = 0;

function renderTasbihDua(){
  const lang = window.currentLang || 'en';
  document.getElementById('tasbihLabelDua').textContent = TASBIH_PHRASES.subhanAllah[lang];
  document.getElementById('tasbihCountDua').textContent = tasbihCountDua;
  document.getElementById('tasbihTargetHint').textContent = tasbihTargetDua;
  const pct = Math.min(100, Math.round((tasbihCountDua / tasbihTargetDua) * 100));
  document.getElementById('tasbihRingDua').style.setProperty('--pct', pct);
}

document.addEventListener('DOMContentLoaded', () => {
  renderCats();
  renderList();
  renderTasbihDua();

  document.querySelectorAll('#tasbihTargetGroup button').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      tasbihTargetDua = parseInt(btn.getAttribute('data-target'), 10);
      document.querySelectorAll('#tasbihTargetGroup button').forEach(b=>b.classList.toggle('active', b===btn));
      tasbihCountDua = 0;
      renderTasbihDua();
    });
  });
  document.getElementById('tasbihTapDua').addEventListener('click', ()=>{
    tasbihCountDua++;
    if(tasbihCountDua >= tasbihTargetDua){
      tasbihCountDua = 0;
      if(navigator.vibrate) navigator.vibrate(30);
    }
    renderTasbihDua();
  });
  document.getElementById('tasbihResetDua').addEventListener('click', ()=>{
    tasbihCountDua = 0;
    renderTasbihDua();
  });
});
