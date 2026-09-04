// =========================================================
// PASSWORD VISIBILITY TOGGLE — the small eye icon inside password
// fields on login.html and signup.html. Shared here so both pages
// (and any future password field) get identical behaviour/markup.
// =========================================================

function togglePasswordVisibility(btn) {
  const wrap = btn.closest('.password-field');
  if (!wrap) return;
  const input = wrap.querySelector('input');
  if (!input) return;
  const nowShowing = input.type === 'password';
  input.type = nowShowing ? 'text' : 'password';
  btn.classList.toggle('showing', nowShowing);
  btn.setAttribute('aria-label', nowShowing ? 'Hide password' : 'Show password');
}
