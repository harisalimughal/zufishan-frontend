// =========================================================
// ZF-STORE — tiny shared localStorage helper.
// Every page that needs to remember something across navigation/reload
// (who's signed in, saved profile fields, Hifz progress) goes through
// this instead of touching localStorage directly, so the key names and
// JSON-safety live in one place.
// =========================================================

window.zfStore = {
  get(key, fallback){
    try{
      const raw = localStorage.getItem(key);
      return raw === null ? fallback : JSON.parse(raw);
    }catch(e){
      return fallback;
    }
  },
  set(key, value){
    try{
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    }catch(e){
      return false; // storage unavailable (e.g. private browsing) — fail quietly
    }
  }
};
