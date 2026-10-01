// =========================================================
// ENQUIRY PAGE — validates the form, shows a confirmation and keeps
// a copy of the enquiry in this browser.
//
// There is no backend endpoint for enquiries yet, so submission is
// handled in submitEnquiry() below. When an API route exists, post
// `payload` there instead of (or as well as) saving it locally.
// =========================================================
(function () {
  var STORE_KEY = 'zf_enquiries';
  var PRESET_KEY = 'zf_enquiry_service';
  var VALID_SERVICES = ['audit', 'zakat', 'training', 'other'];

  function $(id) { return document.getElementById(id); }

  function submitEnquiry(payload) {
    var all = [];
    try { all = JSON.parse(localStorage.getItem(STORE_KEY) || '[]'); } catch (e) { all = []; }
    all.unshift(payload);
    try { localStorage.setItem(STORE_KEY, JSON.stringify(all.slice(0, 50))); } catch (e) { /* storage unavailable */ }
    return Promise.resolve(payload);
  }

  function makeRef() {
    var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789', out = '';
    for (var i = 0; i < 5; i++) out += chars.charAt(Math.floor(Math.random() * chars.length));
    return 'ENQ-' + out;
  }

  function setInvalid(wrapper, bad) { if (wrapper) wrapper.classList.toggle('invalid', !!bad); }

  function validate(form) {
    var ok = true;
    var service = form.querySelector('input[name="service"]:checked');
    setInvalid($('grpService'), !service);
    if (!service) ok = false;

    var checks = [
      ['enqName', function (v) { return v.trim().length > 1; }],
      ['enqEmail', function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); }],
      ['enqOrg', function (v) { return v.trim().length > 1; }],
      ['enqMsg', function (v) { return v.trim().length >= 10; }]
    ];
    var firstBad = null;
    checks.forEach(function (c) {
      var el = $(c[0]);
      var good = c[1](el.value);
      setInvalid(el.closest('.sv-field'), !good);
      el.setAttribute('aria-invalid', good ? 'false' : 'true');
      if (!good) { ok = false; if (!firstBad) firstBad = el; }
    });
    if (!service) { var r = form.querySelector('input[name="service"]'); if (r) firstBad = r; }
    if (!ok && firstBad) firstBad.focus();
    return ok;
  }

  window.__zfEnquiry = {
    init: function () {
      var form = $('enqForm');
      if (!form || form.dataset.bound) return;
      form.dataset.bound = '1';

      // pre-select the service the visitor came from
      var preset = null;
      try { preset = sessionStorage.getItem(PRESET_KEY); sessionStorage.removeItem(PRESET_KEY); } catch (e) { /* ignore */ }
      if (preset && VALID_SERVICES.indexOf(preset) > -1) {
        var radio = form.querySelector('input[name="service"][value="' + preset + '"]');
        if (radio) radio.checked = true;
      }

      // clear an error as soon as the person starts fixing it
      form.addEventListener('input', function (e) {
        var f = e.target.closest('.sv-field'); if (f) f.classList.remove('invalid');
      });
      form.addEventListener('change', function (e) {
        if (e.target.name === 'service') setInvalid($('grpService'), false);
      });

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!validate(form)) return;
        var payload = {
          ref: makeRef(),
          service: form.querySelector('input[name="service"]:checked').value,
          name: $('enqName').value.trim(),
          email: $('enqEmail').value.trim(),
          phone: $('enqPhone').value.trim(),
          org: $('enqOrg').value.trim(),
          orgType: $('enqType').value,
          message: $('enqMsg').value.trim(),
          sentAt: new Date().toISOString()
        };
        submitEnquiry(payload).then(function (saved) {
          $('enqRef').textContent = saved.ref;
          form.hidden = true; $('enqHead').hidden = true;
          var done = $('enqDone'); done.hidden = false;
          var h = done.querySelector('h2'); if (h) { h.setAttribute('tabindex', '-1'); h.focus(); }
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      });

      var again = $('enqAgain');
      if (again) again.addEventListener('click', function () {
        form.reset();
        form.querySelectorAll('.invalid').forEach(function (n) { n.classList.remove('invalid'); });
        $('enqDone').hidden = true; form.hidden = false; $('enqHead').hidden = false;
        var first = form.querySelector('input[name="service"]'); if (first) first.focus();
      });
    }
  };

  if (!window.__zfEnquiryListener) {
    window.__zfEnquiryListener = true;
    document.addEventListener('DOMContentLoaded', function () { window.__zfEnquiry.init(); });
  }
})();
