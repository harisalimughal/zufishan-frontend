document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b === btn));
    document.querySelectorAll('.tab-panel').forEach(p => {
      p.classList.toggle('active', p.dataset.panel === btn.dataset.tab);
    });
  });
});

function selectChip(el){
  el.parentElement.querySelectorAll('.lang-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
}
