// =========================================================
// MUSHAF — Qur'an reader
// Tajweed colour-coding here is a simplified teaching illustration
// (madd, ghunnah, qalqalah only) — not a substitute for a scholar-
// verified tajweed mus'haf. Audio is simulated word-by-word timing
// since no reciter audio files are bundled with this prototype.
// =========================================================

const SURAHS = {
  fatiha: {
    number: 1, nameAr: 'الفاتحة', nameEn: 'Al-Fatihah', meaning: { en:'The Opener', ur:'ابتدائیہ' },
    ayahs: [
      { words:[
          {ar:'بِسْمِ', cls:'', en:'In the name'},
          {ar:'اللَّهِ', cls:'', en:'of Allah'},
          {ar:'الرَّحْمَٰنِ', cls:'tw-madd', en:'the Most Compassionate'},
          {ar:'الرَّحِيمِ', cls:'tw-madd', en:'the Most Merciful'}
        ], translit:'Bismillāhir-Raḥmānir-Raḥīm',
        translation:{en:'In the name of Allah, the Most Compassionate, the Most Merciful.', ur:'اللہ کے نام سے جو نہایت مہربان، رحم کرنے والا ہے۔'} },
      { words:[
          {ar:'الْحَمْدُ', cls:'', en:'All praise'},
          {ar:'لِلَّهِ', cls:'', en:'is for Allah'},
          {ar:'رَبِّ', cls:'', en:'Lord'},
          {ar:'الْعَالَمِينَ', cls:'tw-madd', en:'of all the worlds'}
        ], translit:'Alḥamdu lillāhi rabbil-ʿālamīn',
        translation:{en:'All praise is for Allah, Lord of all the worlds.', ur:'تمام تعریفیں اللہ کے لیے ہیں جو تمام جہانوں کا رب ہے۔'} },
      { words:[
          {ar:'الرَّحْمَٰنِ', cls:'tw-madd', en:'the Most Compassionate'},
          {ar:'الرَّحِيمِ', cls:'tw-madd', en:'the Most Merciful'}
        ], translit:'Ar-Raḥmānir-Raḥīm',
        translation:{en:'The Most Compassionate, the Most Merciful.', ur:'نہایت مہربان، رحم کرنے والا۔'} },
      { words:[
          {ar:'مَالِكِ', cls:'tw-madd', en:'Master'},
          {ar:'يَوْمِ', cls:'', en:'of the Day'},
          {ar:'الدِّينِ', cls:'tw-madd', en:'of Judgment'}
        ], translit:'Māliki yawmid-dīn',
        translation:{en:'Master of the Day of Judgment.', ur:'روزِ جزا کا مالک۔'} },
      { words:[
          {ar:'إِيَّاكَ', cls:'tw-madd', en:'You alone'},
          {ar:'نَعْبُدُ', cls:'', en:'we worship'},
          {ar:'وَإِيَّاكَ', cls:'tw-madd', en:'and You alone'},
          {ar:'نَسْتَعِينُ', cls:'', en:'we ask for help'}
        ], translit:'Iyyāka naʿbudu wa iyyāka nastaʿīn',
        translation:{en:'You alone we worship, and You alone we ask for help.', ur:'ہم صرف تیری ہی عبادت کرتے ہیں اور صرف تجھی سے مدد مانگتے ہیں۔'} },
      { words:[
          {ar:'اهْدِنَا', cls:'', en:'Guide us'},
          {ar:'الصِّرَاطَ', cls:'tw-madd', en:'to the path'},
          {ar:'الْمُسْتَقِيمَ', cls:'tw-madd', en:'that is straight'}
        ], translit:'Ihdinaṣ-ṣirāṭal-mustaqīm',
        translation:{en:'Guide us to the straight path.', ur:'ہمیں سیدھے راستے کی ہدایت دے۔'} },
      { words:[
          {ar:'صِرَاطَ', cls:'tw-madd', en:'the path'},
          {ar:'الَّذِينَ', cls:'tw-madd', en:'of those'},
          {ar:'أَنْعَمْتَ', cls:'', en:'You blessed'},
          {ar:'عَلَيْهِمْ', cls:'', en:'upon them'},
          {ar:'غَيْرِ', cls:'', en:'not'},
          {ar:'الْمَغْضُوبِ', cls:'', en:'those who earned anger'},
          {ar:'عَلَيْهِمْ', cls:'', en:'upon them'},
          {ar:'وَلَا', cls:'', en:'and not'},
          {ar:'الضَّالِّينَ', cls:'tw-madd', en:'those who went astray'}
        ], translit:'Ṣirāṭal-ladhīna anʿamta ʿalayhim ghayril-maghḍūbi ʿalayhim wa laḍ-ḍāllīn',
        translation:{en:'The path of those You have blessed — not of those who earned anger, nor of those who went astray.', ur:'ان لوگوں کا راستہ جن پر تو نے انعام کیا، نہ کہ ان کا جن پر غضب ہوا اور نہ گمراہوں کا۔'} }
    ]
  },
  ikhlas: {
    number: 112, nameAr: 'الإخلاص', nameEn: 'Al-Ikhlas', meaning: { en:'Sincerity', ur:'خالص توحید' },
    ayahs: [
      { words:[
          {ar:'قُلْ', cls:'', en:'Say'},
          {ar:'هُوَ', cls:'', en:'He is'},
          {ar:'اللَّهُ', cls:'', en:'Allah'},
          {ar:'أَحَدٌ', cls:'', en:'the One'}
        ], translit:'Qul huwallāhu aḥad',
        translation:{en:'Say, "He is Allah, the One."', ur:'کہہ دیجیے: وہ اللہ ایک ہے۔'} },
      { words:[
          {ar:'اللَّهُ', cls:'', en:'Allah'},
          {ar:'الصَّمَدُ', cls:'', en:'the Eternal Refuge'}
        ], translit:'Allāhuṣ-ṣamad',
        translation:{en:'Allah, the Eternal Refuge.', ur:'اللہ بے نیاز ہے۔'} },
      { words:[
          {ar:'لَمْ', cls:'', en:'Not'},
          {ar:'يَلِدْ', cls:'tw-qalqalah', en:'did He beget'},
          {ar:'وَلَمْ', cls:'', en:'and not'},
          {ar:'يُولَدْ', cls:'tw-qalqalah', en:'was He begotten'}
        ], translit:'Lam yalid wa lam yūlad',
        translation:{en:'He neither begets nor is born.', ur:'نہ اس نے جنا اور نہ وہ جنا گیا۔'} },
      { words:[
          {ar:'وَلَمْ', cls:'', en:'and not'},
          {ar:'يَكُنْ', cls:'', en:'is there'},
          {ar:'لَهُ', cls:'', en:'for Him'},
          {ar:'كُفُوًا', cls:'', en:'any equivalent'},
          {ar:'أَحَدٌ', cls:'', en:'one'}
        ], translit:'Wa lam yakul-lahū kufuwan aḥad',
        translation:{en:'And there is none comparable to Him.', ur:'اور کوئی اس کا ہمسر نہیں۔'} }
    ]
  },
  kawthar: {
    number: 108, nameAr: 'الكوثر', nameEn: 'Al-Kawthar', meaning: { en:'Abundance', ur:'کثرت خیر' },
    ayahs: [
      { words:[
          {ar:'إِنَّا', cls:'tw-ghunnah', en:'Indeed We'},
          {ar:'أَعْطَيْنَاكَ', cls:'tw-madd', en:'have given you'},
          {ar:'الْكَوْثَرَ', cls:'', en:'abundance'}
        ], translit:'Innā aʿṭaynākal-kawthar',
        translation:{en:'Indeed, We have granted you abundance.', ur:'بے شک ہم نے تجھے کوثر عطا کی۔'} },
      { words:[
          {ar:'فَصَلِّ', cls:'', en:'So pray'},
          {ar:'لِرَبِّكَ', cls:'', en:'to your Lord'},
          {ar:'وَانْحَرْ', cls:'', en:'and sacrifice'}
        ], translit:'Fa ṣalli li rabbika wanḥar',
        translation:{en:'So pray to your Lord and sacrifice.', ur:'پس اپنے رب کے لیے نماز پڑھ اور قربانی کر۔'} },
      { words:[
          {ar:'إِنَّ', cls:'tw-ghunnah', en:'Indeed'},
          {ar:'شَانِئَكَ', cls:'tw-madd', en:'the one who hates you'},
          {ar:'هُوَ', cls:'', en:'he'},
          {ar:'الْأَبْتَرُ', cls:'', en:'is the one cut off'}
        ], translit:'Inna shāni’aka huwal-abtar',
        translation:{en:'Indeed, it is the one who hates you who is cut off.', ur:'بے شک تیرا دشمن ہی بے نام و نشان ہے۔'} }
    ]
  }
};

let currentSurah = 'fatiha';
let wordByWordOn = false;
let playing = false;
let playTimer = null;

function t(key){
  const lang = window.currentLang || 'en';
  return (window.translations && window.translations[lang] && window.translations[lang][key]) || key;
}

function renderSurahList(){
  const list = document.getElementById('surahList');
  const lang = window.currentLang || 'en';
  list.innerHTML = Object.entries(SURAHS).map(([id,s]) => `
    <div class="surah-item ${id===currentSurah?'active':''}" data-surah="${id}">
      <div class="surah-num">${s.number}</div>
      <div>
        <div class="surah-name-en">${s.nameEn}</div>
        <div class="surah-name-meta">${s.meaning[lang] || s.meaning.en} · ${s.ayahs.length} ${t('ayahsWord')}</div>
      </div>
    </div>`).join('');
  list.querySelectorAll('.surah-item').forEach(el=>{
    el.addEventListener('click', ()=> loadSurah(el.getAttribute('data-surah')));
  });
}

function wordHtml(w, ai, wi){
  return `<span class="word ${w.cls}" data-a="${ai}" data-w="${wi}">${w.ar}</span>`;
}

function renderReader(){
  const s = SURAHS[currentSurah];
  const lang = window.currentLang || 'en';
  document.getElementById('surahTitle').textContent = `${s.number}. ${s.nameEn}`;
  document.getElementById('surahSub').textContent = `${s.nameAr} · ${s.meaning[lang] || s.meaning.en}`;

  const list = document.getElementById('ayahList');
  list.innerHTML = s.ayahs.map((a, ai) => `
    <div class="ayah-row" data-ayah="${ai}">
      <div class="ayah-top">
        <div class="ayah-badge">${ai+1}</div>
        <div class="ayah-tools">
          <button class="ayah-tool bookmark-tool" data-a="${ai}">☆ <span data-i18n="bookmark">${t('bookmark')}</span></button>
          <button class="ayah-tool memorized-tool" data-a="${ai}">✓ <span data-i18n="markMemorized">${t('markMemorized')}</span></button>
        </div>
      </div>
      <div class="arabic-line" data-ayah-line="${ai}">${a.words.map((w,wi)=>wordHtml(w,ai,wi)).join(' ')}</div>
      <div class="word-gloss-row ${wordByWordOn?'on':''}" data-gloss="${ai}">
        ${a.words.map(w=>`<div class="gloss-item"><div class="ar">${w.ar}</div><div class="en">${w.en}</div></div>`).join('')}
      </div>
      <div class="translit-line">${a.translit}</div>
      <div class="translation-line">${a.translation[lang] || a.translation.en}</div>
    </div>`).join('');

  stopPlayback();
}

function loadSurah(id){
  currentSurah = id;
  renderSurahList();
  renderReader();
}

function toggleWordByWord(){
  wordByWordOn = document.getElementById('wbwToggle').checked;
  document.querySelectorAll('.word-gloss-row').forEach(el => el.classList.toggle('on', wordByWordOn));
}

// ---- Playback simulation: steps through each word at a fixed pace ----
function flatWords(){
  const s = SURAHS[currentSurah];
  const flat = [];
  s.ayahs.forEach((a, ai) => a.words.forEach((w, wi) => flat.push({ai, wi})));
  return flat;
}

function startPlayback(){
  const flat = flatWords();
  let i = 0;
  playing = true;
  updatePlayButton();
  document.getElementById('playStatus').textContent = t('reciting');
  playTimer = setInterval(() => {
    document.querySelectorAll('.word.playing').forEach(el => el.classList.remove('playing'));
    if(i >= flat.length){ stopPlayback(); return; }
    const {ai, wi} = flat[i];
    const el = document.querySelector(`.word[data-a="${ai}"][data-w="${wi}"]`);
    if(el){
      el.classList.add('playing');
      el.scrollIntoView({block:'nearest', behavior:'smooth'});
    }
    i++;
  }, 650);
}

function stopPlayback(){
  playing = false;
  clearInterval(playTimer);
  document.querySelectorAll('.word.playing').forEach(el => el.classList.remove('playing'));
  updatePlayButton();
  const status = document.getElementById('playStatus');
  if(status) status.textContent = t('pausedStatus');
}

function updatePlayButton(){
  const btn = document.getElementById('playBtn');
  if(btn) btn.textContent = playing ? '❚❚' : '▶';
}

function togglePlayback(){
  if(playing) stopPlayback(); else startPlayback();
}

window.onLanguageChange = function(){
  renderSurahList();
  renderReader();
};

document.addEventListener('DOMContentLoaded', () => {
  renderSurahList();
  renderReader();
  document.getElementById('wbwToggle')?.addEventListener('change', toggleWordByWord);
  document.getElementById('playBtn')?.addEventListener('click', togglePlayback);
  document.getElementById('qariSelect')?.addEventListener('change', function(){
    document.getElementById('playNote').textContent = `${t('previewFor')} ${this.options[this.selectedIndex].text}`;
  });
  document.getElementById('ayahList')?.addEventListener('click', (e) => {
    const bm = e.target.closest('.bookmark-tool');
    const mm = e.target.closest('.memorized-tool');
    if(bm){ bm.classList.toggle('on'); bm.firstChild.textContent = bm.classList.contains('on') ? '★ ' : '☆ '; }
    if(mm){ mm.classList.toggle('on'); }
  });
});
