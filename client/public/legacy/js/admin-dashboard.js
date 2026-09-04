// =========================================================
// BOARD & ADMIN DASHBOARD — in-memory demo data; nothing persists to a
// backend yet. Covers Section 3.5's Trust & Governance layer: scholar
// credential review, vendor document review, content moderation, Fatwa
// multi-scholar sign-off oversight, and user-report escalation.
// =========================================================

let AD_SCHOLARS = [
  { id: 1, nameEn: 'Qari Hammad Yousuf', nameUr: 'قاری حماد یوسف', subjectEn: "Qur'an · Tajweed", subjectUr: 'قرآن · تجوید', credEn: 'Sanad from Jamia Ashrafia, Lahore', credUr: 'سند جامعہ اشرفیہ، لاہور' },
  { id: 2, nameEn: 'Ustaza Fatima Noor', nameUr: 'استاذہ فاطمہ نور', subjectEn: 'Arabic · Nahw/Sarf', subjectUr: 'عربی · نحو/صرف', credEn: 'Madrasa credential pending verification', credUr: 'مدرسہ سند زیر تصدیق' },
  { id: 3, nameEn: 'Mufti Kamran Ilyas', nameUr: 'مفتی کامران الیاس', subjectEn: 'Fiqh · Hanafi', subjectUr: 'فقہ · حنفی', credEn: 'Sanad + Dars-e-Nizami completion', credUr: 'سند + درس نظامی تکمیل' },
];

let AD_VENDORS = [
  { id: 1, nameEn: 'Zainab Traders', nameUr: 'زینب ٹریڈرز', categoryEn: 'Ehram & Kafan', categoryUr: 'احرام و کفن', sensitive: true },
  { id: 2, nameEn: 'Baraka Home Goods', nameUr: 'برکہ ہوم گڈز', categoryEn: 'Home & Prayer Accessories', categoryUr: 'گھریلو و عبادت کی اشیاء', sensitive: false },
];

let AD_MODERATION = [
  { id: 1, type: 'course', nameEn: 'Introduction to Seerah', nameUr: 'سیرت کا تعارف' },
  { id: 2, type: 'post', nameEn: 'Forum: Ruling on combining prayers while travelling', nameUr: 'فورم: سفر میں نماز جمع کرنے کا حکم' },
  { id: 3, type: 'listing', nameEn: 'Handwoven Prayer Mat — Bulk Listing', nameUr: 'ہاتھ سے بنی جائے نماز — تھوک لسٹنگ' },
  { id: 4, type: 'course', nameEn: 'Advanced Tajweed Rules', nameUr: 'اعلیٰ تجوید کے قواعد' },
];

let AD_FATWA_OVERSIGHT = [
  { id: 1, catEn: 'Zakat', catUr: 'زکوٰۃ', qEn: 'Is Zakat due on jewellery worn daily, or only on stored gold?', qUr: 'کیا روزانہ پہنے جانے والے زیورات پر زکوٰۃ واجب ہے یا صرف ذخیرہ شدہ سونے پر؟', signoffs: 1 },
  { id: 2, catEn: 'Fasting', catUr: 'روزہ', qEn: 'Does an accidental swallow while gargling break the fast?', qUr: 'کیا غرارے کرتے ہوئے غلطی سے پانی نگل جانے سے روزہ ٹوٹ جاتا ہے؟', signoffs: 2 },
];

let AD_REPORTS = [
  { id: 1, reasonKey: 'reportReasonMisinformation', targetEn: 'Forum post — "Zakat is only owed once in a lifetime"', targetUr: 'فورم پوسٹ — "زکوٰۃ صرف زندگی میں ایک بار واجب ہے"' },
  { id: 2, reasonKey: 'reportReasonSpam', targetEn: 'Marketplace listing — duplicate Tasbih counter posting', targetUr: 'مارکیٹ پلیس لسٹنگ — تسبیح کاؤنٹر کی نقل شدہ پوسٹنگ' },
];

function t(key) {
  const lang = window.currentLang || 'en';
  return (window.translations && window.translations[lang] && window.translations[lang][key]) || key;
}

function L(item, base) {
  return (window.currentLang === 'ur') ? item[base + 'Ur'] : item[base + 'En'];
}

// ---------- stats ----------
function renderStats() {
  document.getElementById('statScholars').textContent = AD_SCHOLARS.length;
  document.getElementById('statVendors').textContent = AD_VENDORS.length;
  document.getElementById('statModeration').textContent = AD_MODERATION.length;
  document.getElementById('statReports').textContent = AD_REPORTS.length;
}

// ---------- scholar verification ----------
function renderScholars() {
  const el = document.getElementById('scholarList');
  if (AD_SCHOLARS.length === 0) {
    el.innerHTML = `<div class="empty-state"><h3>${t('scholarsEmpty')}</h3><p>${t('scholarsEmptyNote')}</p></div>`;
    return;
  }
  el.innerHTML = AD_SCHOLARS.map(s => `
    <div class="td-review-item" data-id="${s.id}">
      <div class="td-review-top">
        <div>
          <div class="td-review-name">${L(s, 'name')}</div>
          <div class="td-review-meta">${L(s, 'subject')}</div>
        </div>
      </div>
      <div class="td-review-text">${L(s, 'cred')}</div>
      <div class="td-review-actions">
        <button class="btn xs btn-approve" data-action="approve" data-id="${s.id}">${t('approveBtn')}</button>
        <button class="btn xs btn-flag" data-action="reject" data-id="${s.id}">${t('rejectBtn')}</button>
      </div>
    </div>`).join('');

  el.querySelectorAll('[data-action]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.getAttribute('data-id'), 10);
      const item = AD_SCHOLARS.find(x => x.id === id);
      if (!item) return;
      const action = btn.getAttribute('data-action');
      const name = L(item, 'name');
      AD_SCHOLARS = AD_SCHOLARS.filter(x => x.id !== id);
      renderAll();
      showToast((action === 'approve' ? t('scholarApprovedToast') : t('scholarRejectedToast')).replace('{name}', name));
    });
  });
}

// ---------- vendor verification ----------
function renderVendors() {
  const el = document.getElementById('vendorList');
  if (AD_VENDORS.length === 0) {
    el.innerHTML = `<div class="empty-state"><h3>${t('vendorsEmpty')}</h3><p>${t('vendorsEmptyNote')}</p></div>`;
    return;
  }
  el.innerHTML = AD_VENDORS.map(v => `
    <div class="td-review-item" data-id="${v.id}">
      <div class="td-review-top">
        <div>
          <div class="td-review-name">${L(v, 'name')}</div>
          <div class="td-review-meta">${L(v, 'category')}</div>
        </div>
        ${v.sensitive ? `<span class="td-pill flagged">${t('extraVerification')}</span>` : ''}
      </div>
      <div class="td-review-actions">
        <button class="btn xs btn-approve" data-action="approve" data-id="${v.id}">${t('approveBtn')}</button>
        <button class="btn xs btn-flag" data-action="reject" data-id="${v.id}">${t('rejectBtn')}</button>
      </div>
    </div>`).join('');

  el.querySelectorAll('[data-action]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.getAttribute('data-id'), 10);
      const item = AD_VENDORS.find(x => x.id === id);
      if (!item) return;
      const action = btn.getAttribute('data-action');
      const name = L(item, 'name');
      AD_VENDORS = AD_VENDORS.filter(x => x.id !== id);
      renderAll();
      showToast((action === 'approve' ? t('vendorApprovedToast') : t('vendorRejectedToast')).replace('{name}', name));
    });
  });
}

// ---------- content moderation ----------
function moderationTypeLabel(type) {
  if (type === 'course') return t('typeCourse');
  if (type === 'post') return t('typePost');
  return t('typeListing');
}

function renderModeration() {
  const el = document.getElementById('moderationList');
  if (AD_MODERATION.length === 0) {
    el.innerHTML = `<div class="empty-state"><h3>${t('moderationEmpty')}</h3><p>${t('moderationEmptyNote')}</p></div>`;
    return;
  }
  el.innerHTML = AD_MODERATION.map(m => `
    <div class="td-content-row" data-id="${m.id}">
      <div class="td-content-info">
        <div class="name">${L(m, 'name')}</div>
        <div class="meta"><span class="td-source-tag">${moderationTypeLabel(m.type)}</span></div>
      </div>
      <div class="td-review-actions">
        <button class="btn xs btn-approve" data-action="publish" data-id="${m.id}">${t('publishBtn')}</button>
        <button class="btn xs btn-flag" data-action="flag" data-id="${m.id}">${t('flagBtn')}</button>
      </div>
    </div>`).join('');

  el.querySelectorAll('[data-action]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.getAttribute('data-id'), 10);
      const item = AD_MODERATION.find(x => x.id === id);
      if (!item) return;
      const action = btn.getAttribute('data-action');
      const name = L(item, 'name');
      AD_MODERATION = AD_MODERATION.filter(x => x.id !== id);
      renderAll();
      showToast((action === 'publish' ? t('publishedToast') : t('moderationFlaggedToast')).replace('{name}', name));
    });
  });
}

// ---------- fatwa oversight ----------
function renderFatwaOversight() {
  const el = document.getElementById('fatwaOversightList');
  el.innerHTML = AD_FATWA_OVERSIGHT.map(item => {
    const dots = [0, 1, 2].map(i => `<span class="td-signoff-dot ${i < item.signoffs ? 'done' : ''}"></span>`).join('');
    const status = item.signoffs >= 3 ? t('statusAuthentic') : t('statusUnderReview');
    const cls = item.signoffs >= 3 ? 'live' : 'review';
    return `
    <div class="td-review-item">
      <div class="td-review-top">
        <div><span class="td-source-tag">${L(item, 'cat')}</span></div>
        <span class="td-pill ${cls}"><span class="sq"></span>${status}</span>
      </div>
      <div class="td-review-text">${L(item, 'q')}</div>
      <div class="td-signoff-track">${dots}<span class="td-signoff-label">${item.signoffs} / 3 ${t('signoffOf')}</span></div>
    </div>`;
  }).join('');
}

// ---------- user reports ----------
function renderReports() {
  const el = document.getElementById('reportsList');
  if (AD_REPORTS.length === 0) {
    el.innerHTML = `<div class="empty-state"><h3>${t('reportsEmpty')}</h3><p>${t('reportsEmptyNote')}</p></div>`;
    return;
  }
  el.innerHTML = AD_REPORTS.map(r => `
    <div class="td-review-item" data-id="${r.id}">
      <div class="td-review-top">
        <div><span class="td-source-tag">${t(r.reasonKey)}</span></div>
      </div>
      <div class="td-review-text">${L(r, 'target')}</div>
      <div class="td-review-actions">
        <button class="btn xs btn-flag" data-action="escalate" data-id="${r.id}">${t('escalateBtn')}</button>
        <button class="btn xs" data-action="dismiss" data-id="${r.id}">${t('dismissBtn')}</button>
      </div>
    </div>`).join('');

  el.querySelectorAll('[data-action]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.getAttribute('data-id'), 10);
      const action = btn.getAttribute('data-action');
      AD_REPORTS = AD_REPORTS.filter(x => x.id !== id);
      renderAll();
      showToast(action === 'escalate' ? t('reportEscalatedToast') : t('reportDismissedToast'));
    });
  });
}

// ---------- toast ----------
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = '';
  const dot = document.createElement('span'); dot.className = 'sq'; toast.appendChild(dot);
  toast.appendChild(document.createTextNode(msg));
  toast.classList.add('show');
  clearTimeout(window._adToastTimer);
  window._adToastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

// ---------- wire-up ----------
function renderAll() {
  renderStats();
  renderScholars();
  renderVendors();
  renderModeration();
  renderFatwaOversight();
  renderReports();
}

window.onLanguageChange = renderAll;

document.addEventListener('DOMContentLoaded', () => {
  renderAll();
});
