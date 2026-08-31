const NISAB_GOLD = 322450; // PKR, illustrative — would be fetched live in production

let zCurrentStep = 1;
const zTotalSteps = 3;

function renderZakatTrack(){
  const track = document.getElementById('zkTrack');
  track.innerHTML = '';
  for(let i=1;i<=zTotalSteps;i++){
    const d = document.createElement('div');
    d.className = 'd' + (i < zCurrentStep ? ' done' : i === zCurrentStep ? ' current' : '');
    track.appendChild(d);
  }
}

function goStep(step){
  zCurrentStep = step;
  document.querySelectorAll('.zk-step').forEach(s=>{
    s.classList.toggle('active', parseInt(s.dataset.step) === step);
  });
  renderZakatTrack();
  if(step === 3) calcResult();
}

function num(id){
  const v = parseFloat(document.getElementById(id).value);
  return isNaN(v) ? 0 : v;
}

function calcTotal(){ /* live total could be shown inline; kept simple for now */ }

function calcResult(){
  const assets = num('zCash') + num('zGold') + num('zBusiness') + num('zInvest');
  const debts = num('zDebt');
  const net = Math.max(assets - debts, 0);
  const t = (window.translations && window.translations[window.currentLang || 'en']) || {};

  document.getElementById('netWealth').textContent = 'PKR ' + net.toLocaleString();

  const nisabText = document.getElementById('nisabText');
  const dueBox = document.getElementById('dueBox');
  const dueFigure = document.getElementById('dueFigure');
  const breakdown = document.getElementById('breakdown');

  if(net >= NISAB_GOLD){
    nisabText.textContent = t.aboveNisab || 'Above nisab — Zakat is due';
    dueBox.style.display = 'block';
    const due = net * 0.025;
    dueFigure.textContent = 'PKR ' + due.toLocaleString(undefined, {maximumFractionDigits:0});
  } else {
    nisabText.textContent = t.belowNisab || 'Below nisab — Zakat is not obligatory this year';
    dueBox.style.display = 'none';
  }

  breakdown.innerHTML = `
    <div class="row"><span>${t.rowAssets || 'Total assets'}</span><span>PKR ${assets.toLocaleString()}</span></div>
    <div class="row"><span>${t.rowDebts || 'Debts due this year'}</span><span>− PKR ${debts.toLocaleString()}</span></div>
    <div class="row total"><span>${t.rowNet || 'Net zakatable wealth'}</span><span>PKR ${net.toLocaleString()}</span></div>
  `;
}

// re-render the result numbers in the new language if the user is on step 3
window.onLanguageChange = function(){
  if(zCurrentStep === 3) calcResult();
};

renderZakatTrack();
