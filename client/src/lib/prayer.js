export const D2R = Math.PI / 180, R2D = 180 / Math.PI;
const dsin = d => Math.sin(d * D2R);
const dcos = d => Math.cos(d * D2R);
const dtan = d => Math.tan(d * D2R);
const darcsin = x => Math.asin(x) * R2D;
const darccos = x => Math.acos(Math.min(1, Math.max(-1, x))) * R2D;
const darctan2 = (y, x) => Math.atan2(y, x) * R2D;
const darccot = x => Math.atan2(1, x) * R2D;
const fixAngle = a => { a = a % 360; return a < 0 ? a + 360 : a; };
export const fixHour = h => { h = h % 24; return h < 0 ? h + 24 : h; };

export function julianDay(year, month, day){
  if(month <= 2){ year -= 1; month += 12; }
  const A = Math.floor(year / 100);
  const B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + B - 1524.5;
}

// Sun's declination and the equation of time (in hours) for a given Julian Day
export function sunPosition(jd){
  const D = jd - 2451545.0;
  const g = fixAngle(357.529 + 0.98560028 * D);
  const q = fixAngle(280.459 + 0.98564736 * D);
  const L = fixAngle(q + 1.915 * dsin(g) + 0.020 * dsin(2 * g));
  const e = 23.439 - 0.00000036 * D;
  const RA = darctan2(dcos(e) * dsin(L), dcos(L)) / 15;
  const eqt = q / 15 - fixHour(RA);
  const decl = darcsin(dsin(e) * dsin(L));
  return { decl, eqt };
}

// Hours between solar noon and the moment the sun reaches a given altitude
// (negative altitude = below the horizon, used for Fajr/Isha/sunset twilight angles)
export function hourAngleForAltitude(altitude, lat, decl){
  const num = dsin(altitude) - dsin(lat) * dsin(decl);
  const den = dcos(lat) * dcos(decl);
  return darccos(num / den) / 15;
}

// Great-circle bearing from (lat,lng) to the Kaaba
export function bearingToKaaba(lat, lng){
  const kaabaLat = 21.4225, kaabaLng = 39.8262;
  const y = dsin(kaabaLng - lng) * dcos(kaabaLat);
  const x = dcos(lat) * dsin(kaabaLat) - dsin(lat) * dcos(kaabaLat) * dcos(kaabaLng - lng);
  return fixAngle(darctan2(y, x));
}

const FAJR_ANGLE = 18, ISHA_ANGLE = 18; // University of Islamic Sciences, Karachi convention
const ASR_FACTOR = 2; // Hanafi (shadow = 2× object length) — the common default in Pakistan; Shafi'i/Maliki/Hanbali use 1

export function computePrayerTimes(date, lat, lng, timezone){
  const jd = julianDay(date.getFullYear(), date.getMonth() + 1, date.getDate());
  const { decl, eqt } = sunPosition(jd);

  const dhuhr = fixHour(12 - lng / 15 - eqt + timezone);
  const fajr = fixHour(dhuhr - hourAngleForAltitude(-FAJR_ANGLE, lat, decl));
  const sunriseOffset = hourAngleForAltitude(-0.833, lat, decl);
  const sunset = fixHour(dhuhr + sunriseOffset);
  const isha = fixHour(dhuhr + hourAngleForAltitude(-ISHA_ANGLE, lat, decl));
  const asrAltitude = darccot(ASR_FACTOR + Math.abs(dtan(lat - decl)));
  const asr = fixHour(dhuhr + hourAngleForAltitude(asrAltitude, lat, decl));

  return { fajr, dhuhr, asr, maghrib: sunset, isha };
}

export function hoursToClock(h, lang){
  const totalMin = Math.round(h * 60);
  let hh = Math.floor(totalMin / 60) % 24;
  const mm = totalMin % 60;
  const period = hh >= 12 ? (lang === 'ur' ? 'شام' : 'PM') : (lang === 'ur' ? 'صبح' : 'AM');
  let h12 = hh % 12; if(h12 === 0) h12 = 12;
  return `${h12}:${String(mm).padStart(2,'0')} ${period}`;
}

