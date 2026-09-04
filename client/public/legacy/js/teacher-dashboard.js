// =========================================================
// TEACHER DASHBOARD — in-memory demo data; nothing persists to a
// backend yet. Mirrors the shape of Section 6's entities (Course,
// LectureAsset, HifzLog, FatwaReview) closely enough that swapping
// these arrays for real API calls later should be a small diff.
// =========================================================

const TD_COURSES = [
  { id: 1, subjEn: 'Fiqh', subjUr: 'فقہ', nameEn: 'Hanafi Fiqh of Worship', nameUr: 'حنفی فقہ عبادات', enrolled: 128, status: 'published', wafaq: true, thumb: '' },
  { id: 2, subjEn: "Qur'an Tafsir", subjUr: 'تفسیر قرآن', nameEn: 'Tafsir of Juz Amma', nameUr: 'پارہ عم کی تفسیر', enrolled: 96, status: 'published', wafaq: false, thumb: 'b' },
  { id: 3, subjEn: 'Arabic · Nahw', subjUr: 'عربی · نحو', nameEn: 'Classical Arabic Grammar II', nameUr: 'کلاسیکی عربی گرامر ۲', enrolled: 54, status: 'review', wafaq: false, thumb: 'c' },
  { id: 4, subjEn: 'Hadith', subjUr: 'حدیث', nameEn: 'Riyad as-Saliheen — Selected Chapters', nameUr: 'ریاض الصالحین — منتخب ابواب', enrolled: 34, status: 'draft', wafaq: false, thumb: '' },
];

let TD_CONTENT_QUEUE = [
  { id: 1, nameEn: 'Ayah 1–20 — Surah Al-Baqarah Tafsir', nameUr: 'آیت ۱-۲۰ — سورہ البقرہ تفسیر', courseId: 2, source: 'uploaded', status: 'review' },
  { id: 2, nameEn: 'Live: Zuhr Fiqh Q&A — 24 Aug', nameUr: 'لائیو: ظہر فقہ سوال و جواب — ۲۴ اگست', courseId: 1, source: 'live', status: 'transcribing' },
  { id: 3, nameEn: 'Nahw Lesson 9 — Fa’il and Maf’ul', nameUr: 'نحو سبق ۹ — فاعل و مفعول', courseId: 3, source: 'uploaded', status: 'transcoding' },
  { id: 4, nameEn: 'Live: Friday Halaqa — 21 Aug', nameUr: 'لائیو: جمعہ حلقہ — ۲۱ اگست', courseId: 1, source: 'live', status: 'published' },
];

let TD_LIVE_CLASSES = [
  { id: 1, day: '04', month: 'SEP', nameEn: 'Tajweed Rules — Noon Sakinah', nameUr: 'تجوید کے قواعد — نون ساکن', courseId: 1, time: '8:00 PM PKT' },
  { id: 2, day: '07', month: 'SEP', nameEn: 'Zuhr Fiqh Q&A', nameUr: 'ظہر فقہ سوال و جواب', courseId: 1, time: '1:00 PM PKT' },
];

let TD_HIFZ_QUEUE = [
  { id: 1, studentEn: 'Ahmad Raza', studentUr: 'احمد رضا', type: 'sabaq', surahEn: 'Surah Al-Mulk, Ayah 1–10', surahUr: 'سورہ الملک، آیت ۱-۱۰' },
  { id: 2, studentEn: 'Zainab Bibi', studentUr: 'زینب بی بی', type: 'manzil', surahEn: "Juz 'Amma, full revision", surahUr: 'پارہ عم، مکمل دہرائی' },
  { id: 3, studentEn: 'Bilal Hussain', studentUr: 'بلال حسین', type: 'sabqi', surahEn: 'Surah Al-Qalam, Ayah 1–20', surahUr: 'سورہ القلم، آیت ۱-۲۰' },
];

let TD_FATWA_QUEUE = [
  { id: 1, catEn: 'Zakat', catUr: 'زکوٰۃ', qEn: 'Is Zakat due on jewellery worn daily, or only on stored gold?', qUr: 'کیا روزانہ پہنے جانے والے زیورات پر زکوٰۃ واجب ہے یا صرف ذخیرہ شدہ سونے پر؟', signoffs: 1 },
  { id: 2, catEn: 'Fasting', catUr: 'روزہ', qEn: 'Does an accidental swallow while gargling break the fast?', qUr: 'کیا غرارے کرتے ہوئے غلطی سے پانی نگل جانے سے روزہ ٹوٹ جاتا ہے؟', signoffs: 2 },
];

const TD_PAYOUT_BREAKDOWN = [
  { courseId: 1, amount: 'Rs 41,200' },
  { courseId: 2, amount: 'Rs 28,600' },
  { courseId: 3, amount: 'Rs 14,500' },
];

let tdNextContentId = 5, tdNextLiveId = 3;

function t(key) {
  const lang = window.currentLang || 'en';
  return (window.translations && window.translations[lang] && window.translations[lang][key]) || key;
}

function L(item, base) {
  return (window.currentLang === 'ur') ? item[base + 'Ur'] : item[base + 'En'];
}

function tdCourseById(id) {
  return TD_COURSES.find(c => c.id === id);
}

function statusPillLabel(status) {
  if (status === 'published') return { cls: 'live', label: t('statusPublished') };
  if (status === 'review') return { cls: 'review', label: t('statusReview') };
  return { cls: 'draft', label: t('statusDraft') };
}

function pipelinePillLabel(status) {
  const map = {
    queued: { cls: 'draft', label: t('pipelineQueued') },
    transcoding: { cls: 'review', label: t('pipelineTranscoding') },
    transcribing: { cls: 'review', label: t('pipelineTranscribing') },
    review: { cls: 'review', label: t('pipelineReview') },
    published: { cls: 'live', label: t('pipelinePublished') },
  };
  return map[status] || map.queued;
}

function hifzTypeLabel(type) {
  return t('hifzType' + type.charAt(0).toUpperCase() + type.slice(1));
}

// ---------- stats ----------
function computeStats() {
  const activeCourses = TD_COURSES.filter(c => c.status === 'published').length;
  const totalStudents = TD_COURSES.reduce((sum, c) => sum + c.enrolled, 0);
  const pending = TD_HIFZ_QUEUE.length + TD_FATWA_QUEUE.filter(f => f.signoffs < 3).length;
  return { activeCourses, totalStudents, pending };
}

function renderStats() {
  const s = computeStats();
  document.getElementById('statCourses').textContent = s.activeCourses;
  document.getElementById('statStudents').textContent = s.totalStudents.toLocaleString();
  document.getElementById('statPending').textContent = s.pending;
}

// ---------- my courses ----------
function renderCourses() {
  const el = document.getElementById('courseList');
  el.innerHTML = TD_COURSES.map(c => {
    const pill = statusPillLabel(c.status);
    return `
    <div class="td-course-row">
      <div class="td-course-thumb ${c.thumb}"></div>
      <div class="td-course-info">
        <div class="subj">${L(c, 'subj')}</div>
        <div class="name">${L(c, 'name')}</div>
        <div class="meta">${t('studentsCount').replace('{n}', c.enrolled)}</div>
      </div>
      <div class="td-course-badges">
        <span class="td-pill ${pill.cls}"><span class="sq"></span>${pill.label}</span>
        ${c.wafaq ? `<span class="td-pill draft">${t('wafaqMapped')}</span>` : ''}
      </div>
    </div>`;
  }).join('');
}

// ---------- content & lecture repository ----------
function renderContentQueue() {
  const el = document.getElementById('contentList');
  if (TD_CONTENT_QUEUE.length === 0) {
    el.innerHTML = `<div class="empty-state"><h3>${t('hifzQueueEmpty')}</h3></div>`;
    return;
  }
  el.innerHTML = TD_CONTENT_QUEUE.map(item => {
    const pill = pipelinePillLabel(item.status);
    const course = tdCourseById(item.courseId);
    const sourceLabel = item.source === 'live' ? t('sourceLive') : t('sourceUploaded');
    return `
    <div class="td-content-row">
      <div class="td-content-info">
        <div class="name">${L(item, 'name')}</div>
        <div class="meta"><span class="td-source-tag">${sourceLabel}</span><span>${course ? L(course, 'name') : ''}</span></div>
      </div>
      <span class="td-pill ${pill.cls}"><span class="sq"></span>${pill.label}</span>
    </div>`;
  }).join('');
}

// ---------- upcoming live classes ----------
function renderLiveClasses() {
  const el = document.getElementById('liveList');
  if (TD_LIVE_CLASSES.length === 0) {
    el.innerHTML = `<div class="empty-state"><h3>${t('hifzQueueEmpty')}</h3></div>`;
    return;
  }
  el.innerHTML = TD_LIVE_CLASSES.map(item => {
    const course = tdCourseById(item.courseId);
    return `
    <div class="td-live-row">
      <div class="td-live-date"><div class="d">${item.day}</div><div class="m">${item.month}</div></div>
      <div class="td-live-info">
        <div class="name">${L(item, 'name')}</div>
        <div class="meta">${course ? L(course, 'name') : ''} · ${item.time}</div>
      </div>
    </div>`;
  }).join('');
}

// ---------- hifz review queue ----------
function renderHifzQueue() {
  const el = document.getElementById('hifzQueueList');
  if (TD_HIFZ_QUEUE.length === 0) {
    el.innerHTML = `<div class="empty-state"><h3>${t('hifzQueueEmpty')}</h3><p>${t('hifzQueueEmptyNote')}</p></div>`;
    return;
  }
  el.innerHTML = TD_HIFZ_QUEUE.map(item => `
    <div class="td-review-item" data-id="${item.id}">
      <div class="td-review-top">
        <div>
          <div class="td-review-name">${L(item, 'student')}</div>
          <div class="td-review-meta">${hifzTypeLabel(item.type)}</div>
        </div>
      </div>
      <div class="td-review-text">${L(item, 'surah')}</div>
      <div class="td-review-actions">
        <button class="btn xs btn-approve" data-action="approve" data-id="${item.id}">${t('approveBtn')}</button>
        <button class="btn xs btn-flag" data-action="flag" data-id="${item.id}">${t('flagBtn')}</button>
      </div>
    </div>`).join('');

  el.querySelectorAll('[data-action]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.getAttribute('data-id'), 10);
      const item = TD_HIFZ_QUEUE.find(x => x.id === id);
      if (!item) return;
      const action = btn.getAttribute('data-action');
      const name = L(item, 'student');
      TD_HIFZ_QUEUE = TD_HIFZ_QUEUE.filter(x => x.id !== id);
      renderAll();
      showToast((action === 'approve' ? t('approvedToast') : t('flaggedToast')).replace('{name}', name));
    });
  });
}

// ---------- fatwa sign-off queue ----------
function renderFatwaQueue() {
  const el = document.getElementById('fatwaQueueList');
  if (TD_FATWA_QUEUE.length === 0) {
    el.innerHTML = `<div class="empty-state"><h3>${t('fatwaQueueEmpty')}</h3><p>${t('fatwaQueueEmptyNote')}</p></div>`;
    return;
  }
  el.innerHTML = TD_FATWA_QUEUE.map(item => {
    const dots = [0, 1, 2].map(i => `<span class="td-signoff-dot ${i < item.signoffs ? 'done' : ''}"></span>`).join('');
    return `
    <div class="td-review-item" data-id="${item.id}">
      <div class="td-review-top">
        <div>
          <span class="category-tag">${L(item, 'cat')}</span>
        </div>
      </div>
      <div class="td-review-text">${L(item, 'q')}</div>
      <div class="td-signoff-track">${dots}<span class="td-signoff-label">${item.signoffs} / 3 ${t('signoffOf')}</span></div>
      <div class="td-review-actions" style="margin-top:10px;">
        <button class="btn xs btn-approve" data-action="signoff" data-id="${item.id}">${t('signoffBtn')}</button>
      </div>
    </div>`;
  }).join('');

  el.querySelectorAll('[data-action="signoff"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.getAttribute('data-id'), 10);
      const item = TD_FATWA_QUEUE.find(x => x.id === id);
      if (!item) return;
      item.signoffs += 1;
      if (item.signoffs >= 3) {
        TD_FATWA_QUEUE = TD_FATWA_QUEUE.filter(x => x.id !== id);
        renderAll();
        showToast(t('authenticToast'));
      } else {
        renderAll();
        showToast(t('signoffToast').replace('{count}', item.signoffs));
      }
    });
  });
}

// ---------- payouts ----------
function renderPayouts() {
  const el = document.getElementById('payoutBreakdown');
  el.innerHTML = TD_PAYOUT_BREAKDOWN.map(row => {
    const course = tdCourseById(row.courseId);
    return `
    <div class="td-payout-row">
      <span class="n">${course ? L(course, 'name') : ''}</span>
      <span class="v">${row.amount}</span>
    </div>`;
  }).join('');
}

// ---------- course <select> options (used by both modals) ----------
function populateCourseSelects() {
  const options = TD_COURSES.map(c => `<option value="${c.id}">${L(c, 'name')}</option>`).join('');
  document.getElementById('scheduleCourse').innerHTML = options;
  document.getElementById('uploadCourse').innerHTML = options;
}

// ---------- toast ----------
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = '';
  const dot = document.createElement('span'); dot.className = 'sq'; toast.appendChild(dot);
  toast.appendChild(document.createTextNode(msg));
  toast.classList.add('show');
  clearTimeout(window._tdToastTimer);
  window._tdToastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

// ---------- modals ----------
function openModal(id) { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }

function handleScheduleSubmit() {
  const title = document.getElementById('scheduleTitle').value.trim();
  const courseId = parseInt(document.getElementById('scheduleCourse').value, 10);
  const date = document.getElementById('scheduleDate').value;
  const time = document.getElementById('scheduleTime').value;
  if (!title || !date || !time) { showToast(t('scheduleMissing')); return; }

  const dt = new Date(date + 'T' + time);
  const day = String(dt.getDate()).padStart(2, '0');
  const month = dt.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const timeLabel = dt.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) + ' PKT';

  TD_LIVE_CLASSES.push({ id: tdNextLiveId++, day, month, nameEn: title, nameUr: title, courseId, time: timeLabel });
  TD_LIVE_CLASSES.sort((a, b) => (a.month + a.day).localeCompare(b.month + b.day));

  document.getElementById('scheduleTitle').value = '';
  document.getElementById('scheduleDate').value = '';
  document.getElementById('scheduleTime').value = '';
  closeModal('scheduleModal');
  renderAll();
  showToast(t('scheduleToast'));
}

function handleUploadSubmit() {
  const title = document.getElementById('uploadTitle').value.trim();
  const courseId = parseInt(document.getElementById('uploadCourse').value, 10);
  if (!title) { showToast(t('uploadMissing')); return; }

  TD_CONTENT_QUEUE.unshift({ id: tdNextContentId++, nameEn: title, nameUr: title, courseId, source: 'uploaded', status: 'queued' });

  document.getElementById('uploadTitle').value = '';
  document.getElementById('uploadFile').value = '';
  closeModal('uploadModal');
  renderAll();
  showToast(t('uploadToast'));
}

// ---------- wire-up ----------
function renderAll() {
  renderStats();
  renderCourses();
  renderContentQueue();
  renderLiveClasses();
  renderHifzQueue();
  renderFatwaQueue();
  renderPayouts();
  populateCourseSelects();
}

window.onLanguageChange = renderAll;

document.addEventListener('DOMContentLoaded', () => {
  renderAll();

  document.getElementById('scheduleLiveBtn').addEventListener('click', () => openModal('scheduleModal'));
  document.getElementById('scheduleModalClose').addEventListener('click', () => closeModal('scheduleModal'));
  document.getElementById('scheduleSubmitBtn').addEventListener('click', handleScheduleSubmit);

  document.getElementById('uploadLectureBtn').addEventListener('click', () => openModal('uploadModal'));
  document.getElementById('uploadModalClose').addEventListener('click', () => closeModal('uploadModal'));
  document.getElementById('uploadSubmitBtn').addEventListener('click', handleUploadSubmit);

  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.classList.remove('open'); });
  });
});
