// =========================================================
// MARKETPLACE — filter chips + an in-memory cart (no checkout backend yet)
// =========================================================

const PRODUCTS = [
  { id:'p1', cat:'books', emoji:'📗', name:{en:'Illustrated Seerah for Children',ur:'بچوں کے لیے مصور سیرت'}, vendor:'Noor Books Co.', verified:true, sensitive:false, price:1450 },
  { id:'p2', cat:'books', emoji:'📘', name:{en:'Tajweed Rules Handbook',ur:'قواعدِ تجوید ہینڈ بک'}, vendor:'Al-Furqan Publications', verified:true, sensitive:false, price:980 },
  { id:'p3', cat:'prayer', emoji:'🧭', name:{en:'Travel Prayer Mat & Qibla Compass Set',ur:'سفری جائے نماز اور قبلہ کمپاس سیٹ'}, vendor:'Barakah Essentials', verified:true, sensitive:false, price:2200 },
  { id:'p4', cat:'prayer', emoji:'📿', name:{en:'Hand-carved Wooden Tasbih (99 beads)',ur:'دستکاری لکڑی کی تسبیح (99 دانے)'}, vendor:'Anwar Crafts', verified:false, sensitive:false, price:650 },
  { id:'p5', cat:'ritual', emoji:'🤍', name:{en:'Premium Ihram Set (2-piece)',ur:'پریمیم احرام سیٹ (2 حصے)'}, vendor:'Hijaz Textiles', verified:true, sensitive:true, price:3600 },
  { id:'p6', cat:'ritual', emoji:'🕊️', name:{en:'Kafan Cloth Set — Sunnah Specification',ur:'کفن کا کپڑا سیٹ — سنت کے مطابق'}, vendor:'Hijaz Textiles', verified:true, sensitive:true, price:4200 },
  { id:'p7', cat:'gifts', emoji:'🎁', name:{en:'Eid Gift Box — Dates, Attar & Card',ur:'عید گفٹ باکس — کھجور، عطر اور کارڈ'}, vendor:'Barakah Essentials', verified:true, sensitive:false, price:2750 },
  { id:'p8', cat:'gifts', emoji:'🖋️', name:{en:'Engraved Ayat al-Kursi Wall Art',ur:'کندہ آیت الکرسی وال آرٹ'}, vendor:'Anwar Crafts', verified:false, sensitive:false, price:3100 },
  { id:'p9', cat:'books', emoji:'📕', name:{en:'40 Hadith for Young Learners',ur:'نوجوان طلبہ کے لیے 40 احادیث'}, vendor:'Noor Books Co.', verified:true, sensitive:false, price:850 },
  { id:'p10', cat:'prayer', emoji:'🕋', name:{en:'Digital Tasbih Counter Ring',ur:'ڈیجیٹل تسبیح کاؤنٹر رنگ'}, vendor:'Anwar Crafts', verified:false, sensitive:false, price:1100 },
  { id:'p11', cat:'ritual', emoji:'🧴', name:{en:'Zamzam-scented Attar (12ml)',ur:'زم زم خوشبو عطر (12ml)'}, vendor:'Hijaz Textiles', verified:true, sensitive:false, price:1300 },
  { id:'p12', cat:'gifts', emoji:'🧣', name:{en:'Embroidered Prayer Shawl',ur:'کڑھائی والی نماز شال'}, vendor:'Barakah Essentials', verified:true, sensitive:false, price:1950 }
];

let activeCat = 'all';
const cart = {}; // id -> qty

function fmtPrice(n){ return 'PKR ' + n.toLocaleString('en-US'); }

function lang(){ return window.currentLang || 'en'; }

function renderProducts(){
  const grid = document.getElementById('productGrid');
  const items = PRODUCTS.filter(p => activeCat === 'all' || p.cat === activeCat);
  grid.innerHTML = items.map(p => `
    <div class="product-card" data-id="${p.id}">
      <div class="product-thumb" style="background:${thumbColor(p.cat)}">${p.emoji}</div>
      <div class="product-body">
        <div class="product-cat">${catLabel(p.cat)}</div>
        <div class="product-name">${p.name[lang()] || p.name.en}</div>
        <div class="vendor-row">${p.vendor} ${p.verified ? `<span class="verified-badge">✓ ${t('verified')}</span>` : ''}</div>
        ${p.sensitive ? `<div class="sensitive-badge"><span class="sq"></span>${t('ritualSensitive')}</div>` : ''}
        <div class="product-foot">
          <span class="price">${fmtPrice(p.price)}</span>
          <button class="add-btn" data-id="${p.id}">${t('addToCart')}</button>
        </div>
      </div>
    </div>`).join('');

  grid.querySelectorAll('.add-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      addToCart(btn.getAttribute('data-id'));
      btn.textContent = t('added');
      btn.classList.add('added');
      setTimeout(()=>{ btn.textContent = t('addToCart'); btn.classList.remove('added'); }, 1200);
    });
  });
}

function thumbColor(cat){
  const map = { books:'#EDE6D8', prayer:'#F4EFE3', ritual:'#E7E1D3', gifts:'#F7F1E3' };
  return map[cat] || '#EDE6D8';
}
function catLabel(cat){
  const map = { books: t('catBooks'), prayer: t('catPrayer'), ritual: t('catRitual'), gifts: t('catGifts') };
  return map[cat] || cat;
}
function t(key){
  return (window.translations && window.translations[lang()] && window.translations[lang()][key]) || key;
}

function addToCart(id){
  cart[id] = (cart[id] || 0) + 1;
  renderCart();
}
function removeFromCart(id){
  delete cart[id];
  renderCart();
}
function cartCount(){
  return Object.values(cart).reduce((a,b)=>a+b, 0);
}
function cartTotal(){
  return Object.entries(cart).reduce((sum,[id,qty])=>{
    const p = PRODUCTS.find(x=>x.id===id);
    return sum + (p ? p.price*qty : 0);
  }, 0);
}

function renderCart(){
  document.getElementById('cartCount').textContent = cartCount();
  const list = document.getElementById('cartItems');
  const ids = Object.keys(cart);
  if(ids.length === 0){
    list.innerHTML = `<div class="empty-state"><h3>${t('cartEmpty')}</h3><p>${t('cartEmptyNote')}</p></div>`;
  } else {
    list.innerHTML = ids.map(id=>{
      const p = PRODUCTS.find(x=>x.id===id);
      return `<div class="cart-line">
        <div>
          <div class="cl-name">${p.name[lang()] || p.name.en}</div>
          <div class="cl-meta">${cart[id]} × ${fmtPrice(p.price)}</div>
        </div>
        <button class="remove-line" data-id="${id}">✕</button>
      </div>`;
    }).join('');
    list.querySelectorAll('.remove-line').forEach(btn=>{
      btn.addEventListener('click', ()=> removeFromCart(btn.getAttribute('data-id')));
    });
  }
  document.getElementById('cartTotal').textContent = fmtPrice(cartTotal());
}

function openCart(){ document.getElementById('cartDrawer').classList.add('open'); document.getElementById('cartOverlay').classList.add('open'); }
function closeCart(){ document.getElementById('cartDrawer').classList.remove('open'); document.getElementById('cartOverlay').classList.remove('open'); }

window.onLanguageChange = function(){
  renderProducts();
  renderCart();
};

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  renderCart();

  document.querySelectorAll('.filter-chip[data-group="cat"]').forEach(chip=>{
    chip.addEventListener('click', ()=>{
      activeCat = chip.dataset.value;
      document.querySelectorAll('.filter-chip[data-group="cat"]').forEach(c=>c.classList.toggle('active', c===chip));
      renderProducts();
    });
  });

  document.getElementById('cartToggle').addEventListener('click', openCart);
  document.getElementById('cartClose').addEventListener('click', closeCart);
  document.getElementById('cartOverlay').addEventListener('click', closeCart);
  document.getElementById('checkoutBtn').addEventListener('click', ()=>{
    alert(t('checkoutNote'));
  });
});
