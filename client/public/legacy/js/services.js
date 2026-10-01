// =========================================================
// SERVICES pages — remembers which service the visitor was reading
// when they press "Send an enquiry", so the enquiry form can
// pre-select it. (Links are rewritten to clean routes by the app
// router, which drops query strings, so sessionStorage carries it.)
//
// Registered once on `document` and always runs the latest copy of
// init, because pages are swapped in place without a full reload.
// =========================================================
(function () {
  window.__zfServices = {
    init: function () {
      document.querySelectorAll('[data-enquire]').forEach(function (el) {
        if (el.dataset.bound) return;
        el.dataset.bound = '1';
        el.addEventListener('click', function () {
          try { sessionStorage.setItem('zf_enquiry_service', el.getAttribute('data-enquire') || ''); } catch (e) { /* storage unavailable */ }
        });
      });
    }
  };
  if (!window.__zfServicesListener) {
    window.__zfServicesListener = true;
    document.addEventListener('DOMContentLoaded', function () { window.__zfServices.init(); });
  }
})();
