// Lesson player — tabs, play/pause toggle, mark-complete toggle.
// Video/audio playback itself is out of scope for this static mock;
// these handlers just drive the visual state.

document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b === btn));
    document.querySelectorAll('.tab-panel').forEach(p => {
      p.classList.toggle('active', p.dataset.panel === btn.dataset.tab);
    });
  });
});

let isPlaying = false;
function togglePlay(){
  isPlaying = !isPlaying;
  const playBtn = document.getElementById('vpPlayBtn');
  const playIcon = document.getElementById('vpPlayIcon');
  const pauseSvg = '<svg viewBox="0 0 24 24" fill="#fff"><rect x="6" y="5" width="4" height="14"/><rect x="14" y="5" width="4" height="14"/></svg>';
  const playSvg = '<svg viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z"/></svg>';

  if(playBtn) playBtn.style.display = isPlaying ? 'none' : 'flex';
  if(playIcon) playIcon.innerHTML = isPlaying ? pauseSvg : playSvg;
}

function toggleComplete(el){
  const done = el.classList.toggle('is-done');
  const label = el.querySelector('span[data-i18n]');
  if(done){
    el.style.borderColor = 'var(--azure)';
    el.style.color = 'var(--azure)';
    if(label && window.translations){
      label.textContent = window.translations[window.currentLang || 'en'].completedLabel || 'Completed';
      label.setAttribute('data-i18n','completedLabel');
    }
  } else {
    el.style.borderColor = '';
    el.style.color = '';
    if(label && window.translations){
      label.textContent = window.translations[window.currentLang || 'en'].markComplete || 'Mark Complete';
      label.setAttribute('data-i18n','markComplete');
    }
  }
}
