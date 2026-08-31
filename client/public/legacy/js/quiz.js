// =========================================================
// LESSON QUIZ — self-check quiz for the Makharij al-Huruf lesson,
// with a certificate reveal on a passing score (in-memory only).
// =========================================================

const QUIZ_QUESTIONS = [
  {
    q: { en:'How many articulation points (makharij) are traditionally recognised?', ur:'روایتی طور پر کتنے مخارج تسلیم کیے جاتے ہیں؟' },
    options: [
      { en:'Five', ur:'پانچ' }, { en:'Seventeen', ur:'سترہ' }, { en:'Twenty-eight', ur:'اٹھائیس' }
    ],
    correct: 1,
    explain: { en:'There are seventeen commonly recognised makharij, grouped into five broader regions.', ur:'سترہ مخارج عام طور پر تسلیم کیے جاتے ہیں، جو پانچ بڑے علاقوں میں تقسیم ہیں۔' }
  },
  {
    q: { en:'Which makhraj do the three madd letters originate from?', ur:'تین مد کے حروف کس مخرج سے نکلتے ہیں؟' },
    options: [
      { en:'Al-Halq (the throat)', ur:'الحلق (گلا)' }, { en:'Al-Jawf (the open space)', ur:'الجوف (خالی جگہ)' }, { en:'Ash-Shafatayn (the lips)', ur:'الشفتین (ہونٹ)' }
    ],
    correct: 1,
    explain: { en:'Al-Jawf, the empty space of the mouth and throat, is where the madd letters originate.', ur:'الجوف، منہ اور گلے کی خالی جگہ، وہ مقام ہے جہاں سے مد کے حروف نکلتے ہیں۔' }
  },
  {
    q: { en:'What comes right after mastering makharij, according to this lesson?', ur:'اس سبق کے مطابق مخارج کے بعد کیا سیکھا جاتا ہے؟' },
    options: [
      { en:'Sifaat (letter characteristics)', ur:'صفات (حروف کی خصوصیات)' }, { en:'Tarteel speed drills', ur:'ترتیل کی رفتار کی مشقیں' }, { en:'Qira\u2019at differences', ur:'قراءات کے فرق' }
    ],
    correct: 0,
    explain: { en:'Precise makharij is described as the foundation before moving on to sifaat, the characteristics of each letter.', ur:'درست مخارج کو صفات کی طرف بڑھنے سے پہلے بنیاد قرار دیا گیا ہے۔' }
  }
];

let quizIndex = 0;
let quizScore = 0;
let quizAnswered = false;

function ql(){ return window.currentLang || 'en'; }
function qt(key){ return (window.translations && window.translations[ql()] && window.translations[ql()][key]) || key; }

function renderQuiz(){
  const box = document.getElementById('quizContainer');
  if(quizIndex >= QUIZ_QUESTIONS.length){
    renderQuizResult();
    return;
  }
  const item = QUIZ_QUESTIONS[quizIndex];
  quizAnswered = false;
  box.innerHTML = `
    <div class="quiz-progress">${qt('questionLabel')} ${quizIndex+1} / ${QUIZ_QUESTIONS.length}</div>
    <div class="quiz-question">${item.q[ql()] || item.q.en}</div>
    <div id="quizOpts">
      ${item.options.map((o,i)=>`<button class="quiz-opt" data-i="${i}">${o[ql()] || o.en}</button>`).join('')}
    </div>
    <div id="quizFeedback"></div>
    <button class="btn btn-primary sm" id="quizNextBtn" style="display:none; margin-top:6px;">${qt('nextQuestion')}</button>
  `;
  box.querySelectorAll('.quiz-opt').forEach(btn=>{
    btn.addEventListener('click', ()=> answerQuiz(parseInt(btn.getAttribute('data-i'),10)));
  });
}

function answerQuiz(choice){
  if(quizAnswered) return;
  quizAnswered = true;
  const item = QUIZ_QUESTIONS[quizIndex];
  const isCorrect = choice === item.correct;
  if(isCorrect) quizScore++;

  document.querySelectorAll('.quiz-opt').forEach((btn,i)=>{
    btn.disabled = true;
    if(i === item.correct) btn.classList.add('correct');
    if(i === choice && !isCorrect) btn.classList.add('incorrect');
  });

  const fb = document.getElementById('quizFeedback');
  fb.className = 'quiz-feedback ' + (isCorrect ? 'correct' : 'incorrect');
  fb.textContent = (isCorrect ? qt('correctFeedback') : qt('incorrectFeedback')) + ' ' + (item.explain[ql()] || item.explain.en);

  const nextBtn = document.getElementById('quizNextBtn');
  nextBtn.style.display = 'inline-flex';
  nextBtn.textContent = (quizIndex === QUIZ_QUESTIONS.length - 1) ? qt('seeResults') : qt('nextQuestion');
  nextBtn.onclick = () => { quizIndex++; renderQuiz(); };
}

function renderQuizResult(){
  const box = document.getElementById('quizContainer');
  const total = QUIZ_QUESTIONS.length;
  const passed = quizScore >= Math.ceil(total * 0.6);
  box.innerHTML = `
    <div class="quiz-score-hero">
      <div class="big">${quizScore} / ${total}</div>
      <p class="pcard-note">${passed ? qt('passedNote') : qt('tryAgainNote')}</p>
      ${!passed ? `<button class="btn btn-ghost sm" id="quizRetryBtn">${qt('retryQuiz')}</button>` : ''}
    </div>
    ${passed ? `
      <div class="certificate-box">
        <div class="tilemark" style="margin:0 auto 10px;"><i></i><i></i><i></i><i></i></div>
        <div class="cert-title">${qt('certTitle')}</div>
        <div class="cert-name">Ahmad Raza</div>
        <div class="cert-sub">${qt('certLessonLine')}</div>
        <div class="cert-sub" style="margin-top:8px;">${qt('certDate')} ${new Date().toLocaleDateString(ql()==='ur'?'ur':'en-GB',{day:'numeric',month:'long',year:'numeric'})}</div>
      </div>` : ''}
  `;
  const retry = document.getElementById('quizRetryBtn');
  if(retry) retry.addEventListener('click', ()=>{ quizIndex = 0; quizScore = 0; renderQuiz(); });
}

const _prevOnLangChange = window.onLanguageChange;
window.onLanguageChange = function(lang){
  if(typeof _prevOnLangChange === 'function') _prevOnLangChange(lang);
  renderQuiz();
};

document.addEventListener('DOMContentLoaded', renderQuiz);
