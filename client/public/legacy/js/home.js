// Homepage-only — fades/slides sections into view as they enter the viewport.
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

// Top-bar links (Learn, Daily Practice, Marketplace, Services, Verification):
// scroll so the section's content sits centred in the space under the sticky
// bar, instead of landing wherever the section's padding happens to fall.
// Registered once on `document` because pages are swapped in place.
(function () {
  if (window.__zfHomeNav) return;
  window.__zfHomeNav = true;

  // which block to centre for each link, and which card to briefly highlight
  var FOCUS = {
    '#learn': { block: '#learn .wrap' },
    '#practice': { block: '#learn .wrap', card: '#practice' },
    '#market': { block: '#learn .wrap', card: '#market' },
    '#services': { block: '#services .wrap' },
    '#trust': { block: '#trust .wrap' }
  };

  document.addEventListener('click', function (e) {
    var link = e.target.closest && e.target.closest('.navlinks a[href^="#"]');
    if (!link) return;
    var cfg = FOCUS[link.getAttribute('href')];
    var block = cfg && document.querySelector(cfg.block);
    if (!block) return;
    e.preventDefault();

    var bar = document.querySelector('nav');
    var barH = bar ? bar.offsetHeight : 0;
    var room = window.innerHeight - barH;
    var r = block.getBoundingClientRect();
    var top = r.top + window.scrollY - barH;
    // centre it when it fits on screen, otherwise sit just under the bar
    top -= r.height <= room ? (room - r.height) / 2 : 24;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });

    document.querySelectorAll('.pillar.flash').forEach(function (n) { n.classList.remove('flash'); });
    var card = cfg.card && document.querySelector(cfg.card);
    if (card) {
      card.classList.add('flash');
      setTimeout(function () { card.classList.remove('flash'); }, 1800);
    }
  });
})();
