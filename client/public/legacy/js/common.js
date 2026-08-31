// Shared across pages that don't use the full app-shell (currently just the
// public homepage). Language toggling itself lives in js/i18n.js — this file
// used to define its own bare-bones toggleLang() that only flipped the
// dir="rtl"/"ltr" attribute without translating any text or saving the
// choice. Because it was loaded *after* i18n.js, it silently overwrote the
// real toggleLang() and caused the "RTL layout but English text" bug.
// Intentionally left empty now — i18n.js's toggleLang() is the only one.
