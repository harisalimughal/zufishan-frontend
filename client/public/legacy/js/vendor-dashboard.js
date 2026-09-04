// =========================================================
// VENDOR DASHBOARD — in-memory demo data; nothing persists to a backend
// yet. Mirrors Section 6's Vendor / Product / Order entities closely
// enough that swapping these arrays for real API calls should be a
// small diff. Sensitive categories (Ehram/Kafan) route to an extra
// Advisory Board verification step per Section 3.3.
// =========================================================

const VD_PRODUCTS = [
  { id: 1, nameEn: 'Premium Ihram Set — 2 piece', nameUr: 'پریمیم احرام سیٹ — دو پیس', category: 'sensitive', status: 'live', stock: 24 },
  { id: 2, nameEn: 'Digital Tasbih Counter — 99 count', nameUr: 'ڈیجیٹل تسبیح کاؤنٹر — ۹۹ شمار', category: 'general', status: 'live', stock: 58 },
  { id: 3, nameEn: 'Kafan Cloth Set (Compliant)', nameUr: 'کفن کپڑا سیٹ (تعمیل شدہ)', category: 'sensitive', status: 'review', stock: 0 },
  { id: 4, nameEn: "Qur'an Stand — Walnut Finish", nameUr: 'قرآن اسٹینڈ — اخروٹ فنش', category: 'general', status: 'out', stock: 0 },
];

let VD_ORDERS = [
  { id: 1, type: 'goods', buyerEn: 'Ahmad Raza', buyerUr: 'احمد رضا', itemEn: 'Premium Ihram Set — 2 piece', itemUr: 'پریمیم احرام سیٹ — دو پیس', status: 'pending' },
  { id: 2, type: 'service', buyerEn: 'Bilal Hussain', buyerUr: 'بلال حسین', itemEn: 'Qurbani Booking — 10 Dhul Hijjah', itemUr: 'قربانی بکنگ — ۱۰ ذوالحجہ', status: 'pending' },
  { id: 3, type: 'goods', buyerEn: 'Zainab Bibi', buyerUr: 'زینب بی بی', itemEn: 'Digital Tasbih Counter — 99 count', itemUr: 'ڈیجیٹل تسبیح کاؤنٹر — ۹۹ شمار', status: 'confirmed' },
];

const VD_VERIFICATION_DOCS = [
  { id: 1, key: 'docBusinessReg', status: 'verified' },
  { id: 2, key: 'docTaxCert', status: 'verified' },
  { id: 3, key: 'docSampleCompliance', status: 'review' },
];

const VD_PAYOUT_BREAKDOWN = [
  { productId: 1, amount: 'Rs 52,000' },
  { productId: 2, amount: 'Rs 31,400' },
  { productId: 4, amount: 'Rs 13,000' },
];

let vdNextProductId = 5;

function t(key) {
  const lang = window.currentLang || 'en';
  return (window.translations && window.translations[lang] && window.translations[lang][key]) || key;
}

function L(item, base) {
  return (window.currentLang === 'ur') ? item[base + 'Ur'] : item[base + 'En'];
}

function vdProductById(id) {
  return VD_PRODUCTS.find(p => p.id === id);
}

function productPillLabel(status) {
  if (status === 'live') return { cls: 'live', label: t('statusLive') };
  if (status === 'review') return { cls: 'review', label: t('statusPendingReview') };
  return { cls: 'flagged', label: t('statusOutOfStock') };
}

function orderPillLabel(status) {
  const map = {
    pending: { cls: 'review', label: t('orderStatusPending') },
    confirmed: { cls: 'live', label: t('orderStatusConfirmed') },
    shipped: { cls: 'live', label: t('orderStatusShipped') },
    completed: { cls: 'draft', label: t('orderStatusCompleted') },
  };
  return map[status] || map.pending;
}

// ---------- stats ----------
function computeStats() {
  const activeListings = VD_PRODUCTS.filter(p => p.status === 'live').length;
  const openOrders = VD_ORDERS.filter(o => o.status === 'pending' || o.status === 'confirmed').length;
  return { activeListings, openOrders };
}

function renderStats() {
  const s = computeStats();
  document.getElementById('statListings').textContent = s.activeListings;
  document.getElementById('statOrders').textContent = s.openOrders;
}

// ---------- products ----------
function renderProducts() {
  const el = document.getElementById('productList');
  el.innerHTML = VD_PRODUCTS.map(p => {
    const pill = productPillLabel(p.status);
    return `
    <div class="td-course-row">
      <div class="td-course-thumb"></div>
      <div class="td-course-info">
        <div class="name">${L(p, 'name')}</div>
        <div class="meta">${t('stockCount').replace('{n}', p.stock)}</div>
      </div>
      <div class="td-course-badges">
        <span class="td-pill ${pill.cls}"><span class="sq"></span>${pill.label}</span>
        ${p.category === 'sensitive' ? `<span class="td-pill flagged">${t('extraVerification')}</span>` : ''}
      </div>
    </div>`;
  }).join('');
}

// ---------- orders ----------
function renderOrders() {
  const el = document.getElementById('orderList');
  if (VD_ORDERS.length === 0) {
    el.innerHTML = `<div class="empty-state"><h3>${t('ordersEmpty')}</h3><p>${t('ordersEmptyNote')}</p></div>`;
    return;
  }
  el.innerHTML = VD_ORDERS.map(o => {
    const pill = orderPillLabel(o.status);
    const typeLabel = o.type === 'service' ? t('orderTypeService') : t('orderTypeGoods');
    const showAction = o.status === 'pending';
    const actionLabel = o.type === 'service' ? t('confirmBtn') : t('fulfillBtn');
    return `
    <div class="td-review-item" data-id="${o.id}">
      <div class="td-review-top">
        <div>
          <div class="td-review-name">${L(o, 'buyer')}</div>
          <div class="td-review-meta">${typeLabel}</div>
        </div>
        <span class="td-pill ${pill.cls}"><span class="sq"></span>${pill.label}</span>
      </div>
      <div class="td-review-text">${L(o, 'item')}</div>
      ${showAction ? `<div class="td-review-actions"><button class="btn xs btn-approve" data-action="advance" data-id="${o.id}">${actionLabel}</button></div>` : ''}
    </div>`;
  }).join('');

  el.querySelectorAll('[data-action="advance"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.getAttribute('data-id'), 10);
      const order = VD_ORDERS.find(x => x.id === id);
      if (!order) return;
      const name = L(order, 'buyer');
      order.status = order.type === 'service' ? 'confirmed' : 'shipped';
      renderAll();
      showToast((order.type === 'service' ? t('confirmedToast') : t('fulfilledToast')).replace('{name}', name));
    });
  });
}

// ---------- verification ----------
function renderVerification() {
  const el = document.getElementById('verificationList');
  el.innerHTML = VD_VERIFICATION_DOCS.map(doc => {
    const verified = doc.status === 'verified';
    return `
    <div class="td-payout-row">
      <span class="n">${t(doc.key)}</span>
      <span class="td-pill ${verified ? 'live' : 'review'}"><span class="sq"></span>${verified ? t('docStatusVerified') : t('docStatusInReview')}</span>
    </div>`;
  }).join('');
}

// ---------- payouts ----------
function renderPayouts() {
  const el = document.getElementById('payoutBreakdown');
  el.innerHTML = VD_PAYOUT_BREAKDOWN.map(row => {
    const product = vdProductById(row.productId);
    return `
    <div class="td-payout-row">
      <span class="n">${product ? L(product, 'name') : ''}</span>
      <span class="v">${row.amount}</span>
    </div>`;
  }).join('');
}

// ---------- toast ----------
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = '';
  const dot = document.createElement('span'); dot.className = 'sq'; toast.appendChild(dot);
  toast.appendChild(document.createTextNode(msg));
  toast.classList.add('show');
  clearTimeout(window._vdToastTimer);
  window._vdToastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

// ---------- modal ----------
function openModal(id) { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }

function handleAddProductSubmit() {
  const name = document.getElementById('productName').value.trim();
  const category = document.getElementById('productCategory').value;
  const price = document.getElementById('productPrice').value;
  if (!name || !price) { showToast(t('addProductMissing')); return; }

  VD_PRODUCTS.unshift({ id: vdNextProductId++, nameEn: name, nameUr: name, category, status: 'review', stock: 0 });

  document.getElementById('productName').value = '';
  document.getElementById('productPrice').value = '';
  closeModal('addProductModal');
  renderAll();
  showToast(category === 'sensitive' ? t('addProductToastSensitive') : t('addProductToast'));
}

// ---------- wire-up ----------
function renderAll() {
  renderStats();
  renderProducts();
  renderOrders();
  renderVerification();
  renderPayouts();
}

window.onLanguageChange = renderAll;

document.addEventListener('DOMContentLoaded', () => {
  renderAll();

  document.getElementById('addProductBtn').addEventListener('click', () => openModal('addProductModal'));
  document.getElementById('addProductLink').addEventListener('click', () => openModal('addProductModal'));
  document.getElementById('addProductModalClose').addEventListener('click', () => closeModal('addProductModal'));
  document.getElementById('addProductSubmitBtn').addEventListener('click', handleAddProductSubmit);

  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.classList.remove('open'); });
  });
});
