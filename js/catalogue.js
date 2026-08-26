// Course catalogue — filter chip interactivity.
// "subject" chips are single-select (All Subjects clears the rest).
// "extra" chips (Free Preview / Live Classes / Urdu) are independent toggles,
// ANDed together with the active subject filter.

let activeSubject = 'all';
const activeExtras = new Set();

document.querySelectorAll('.filter-chip[data-group="subject"]').forEach(chip => {
  chip.addEventListener('click', () => {
    activeSubject = chip.dataset.value;
    document.querySelectorAll('.filter-chip[data-group="subject"]').forEach(c => {
      c.classList.toggle('active', c === chip);
    });
    applyFilters();
  });
});

document.querySelectorAll('.filter-chip[data-group="extra"]').forEach(chip => {
  chip.addEventListener('click', () => {
    const val = chip.dataset.value;
    if (activeExtras.has(val)) {
      activeExtras.delete(val);
      chip.classList.remove('active');
    } else {
      activeExtras.add(val);
      chip.classList.add('active');
    }
    applyFilters();
  });
});

function applyFilters(){
  const cards = document.querySelectorAll('.course-card-lg');
  let visibleCount = 0;

  cards.forEach(card => {
    const matchesSubject = activeSubject === 'all' || card.dataset.subject === activeSubject;
    const matchesFree = !activeExtras.has('free') || card.dataset.free === 'true';
    const matchesLive = !activeExtras.has('live') || card.dataset.live === 'true';
    const matchesUrdu = !activeExtras.has('urdu') || card.dataset.urdu === 'true';

    const visible = matchesSubject && matchesFree && matchesLive && matchesUrdu;
    card.style.display = visible ? '' : 'none';
    if (visible) visibleCount++;
  });

  const noResults = document.getElementById('noResults');
  if (noResults) noResults.style.display = visibleCount === 0 ? 'block' : 'none';
}
