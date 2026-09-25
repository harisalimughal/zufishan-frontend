/**
 * Currency Auto-Detection Utility
 *
 * Detects the user's local currency based on:
 *   1. Reverse geocoding (Nominatim) country code → ISO 4217 currency
 *   2. Navigator.language fallback (en-PK → PKR, ar-SA → SAR, etc.)
 *   3. Final fallback → USD
 *
 * This is used by the Zakat Nisab feature to automatically show prices
 * in the user's local currency (PKR for Pakistan, SAR for Saudi Arabia, etc.)
 */

// ─── Country → Currency ISO 4217 map ─────────────────────────────────────────
// Covers all countries where Zakat is commonly calculated

const COUNTRY_TO_CURRENCY: Record<string, string> = {
  // South Asia
  PK: 'PKR',  // Pakistan — Pakistani Rupee
  IN: 'INR',  // India — Indian Rupee
  BD: 'BDT',  // Bangladesh — Bangladeshi Taka
  LK: 'LKR',  // Sri Lanka — Sri Lankan Rupee
  NP: 'NPR',  // Nepal — Nepalese Rupee
  AF: 'AFN',  // Afghanistan — Afghan Afghani

  // Middle East / GCC
  SA: 'SAR',  // Saudi Arabia — Saudi Riyal
  AE: 'AED',  // UAE — UAE Dirham
  KW: 'KWD',  // Kuwait — Kuwaiti Dinar
  QA: 'QAR',  // Qatar — Qatari Riyal
  BH: 'BHD',  // Bahrain — Bahraini Dinar
  OM: 'OMR',  // Oman — Omani Rial
  JO: 'JOD',  // Jordan — Jordanian Dinar
  EG: 'EGP',  // Egypt — Egyptian Pound
  IQ: 'IQD',  // Iraq — Iraqi Dinar
  IR: 'IRR',  // Iran — Iranian Rial
  SY: 'SYP',  // Syria — Syrian Pound
  LB: 'LBP',  // Lebanon — Lebanese Pound
  YE: 'YER',  // Yemen — Yemeni Rial
  LY: 'LYD',  // Libya — Libyan Dinar
  TN: 'TND',  // Tunisia — Tunisian Dinar
  DZ: 'DZD',  // Algeria — Algerian Dinar
  MA: 'MAD',  // Morocco — Moroccan Dirham
  PS: 'ILS',  // Palestine — Israeli New Shekel (de facto)

  // Southeast Asia
  MY: 'MYR',  // Malaysia — Malaysian Ringgit
  ID: 'IDR',  // Indonesia — Indonesian Rupiah
  SG: 'SGD',  // Singapore — Singapore Dollar
  BN: 'BND',  // Brunei — Brunei Dollar
  PH: 'PHP',  // Philippines — Philippine Peso
  TH: 'THB',  // Thailand — Thai Baht

  // Central Asia
  TR: 'TRY',  // Turkey — Turkish Lira
  AZ: 'AZN',  // Azerbaijan — Azerbaijani Manat
  KZ: 'KZT',  // Kazakhstan — Kazakhstani Tenge
  UZ: 'UZS',  // Uzbekistan — Uzbekistani Som
  TJ: 'TJS',  // Tajikistan — Tajikistani Somoni
  KG: 'KGS',  // Kyrgyzstan — Kyrgyzstani Som
  TM: 'TMT',  // Turkmenistan — Turkmenistani Manat

  // Africa
  NG: 'NGN',  // Nigeria — Nigerian Naira
  GH: 'GHS',  // Ghana — Ghanaian Cedi
  KE: 'KES',  // Kenya — Kenyan Shilling
  TZ: 'TZS',  // Tanzania — Tanzanian Shilling
  UG: 'UGX',  // Uganda — Ugandan Shilling
  SD: 'SDG',  // Sudan — Sudanese Pound
  ET: 'ETB',  // Ethiopia — Ethiopian Birr
  SO: 'SOS',  // Somalia — Somali Shilling
  SN: 'XOF',  // Senegal — West African CFA franc
  MR: 'MRU',  // Mauritania — Mauritanian Ouguiya

  // Europe
  GB: 'GBP',  // United Kingdom — British Pound
  DE: 'EUR',  // Germany — Euro
  FR: 'EUR',  // France — Euro
  NL: 'EUR',  // Netherlands — Euro
  BE: 'EUR',  // Belgium — Euro
  SE: 'SEK',  // Sweden — Swedish Krona
  NO: 'NOK',  // Norway — Norwegian Krone
  DK: 'DKK',  // Denmark — Danish Krone
  CH: 'CHF',  // Switzerland — Swiss Franc

  // Americas
  US: 'USD',  // USA — US Dollar
  CA: 'CAD',  // Canada — Canadian Dollar
  BR: 'BRL',  // Brazil — Brazilian Real
  AU: 'AUD',  // Australia — Australian Dollar
  NZ: 'NZD',  // New Zealand — NZ Dollar
}

// ─── Language → Currency fallback map ────────────────────────────────────────
// Used when geolocation is denied and we only have navigator.language

const LOCALE_TO_CURRENCY: Record<string, string> = {
  'ur':    'PKR',  // Urdu → Pakistan
  'ur-PK': 'PKR',
  'hi':    'INR',  // Hindi → India
  'hi-IN': 'INR',
  'bn':    'BDT',  // Bengali → Bangladesh
  'bn-BD': 'BDT',
  'ar':    'SAR',  // Arabic (default) → Saudi Arabia
  'ar-SA': 'SAR',
  'ar-AE': 'AED',
  'ar-KW': 'KWD',
  'ar-QA': 'QAR',
  'ar-BH': 'BHD',
  'ar-OM': 'OMR',
  'ar-JO': 'JOD',
  'ar-EG': 'EGP',
  'ar-IQ': 'IQD',
  'ar-MA': 'MAD',
  'ar-DZ': 'DZD',
  'ar-TN': 'TND',
  'ms':    'MYR',  // Malay → Malaysia
  'ms-MY': 'MYR',
  'id':    'IDR',  // Indonesian → Indonesia
  'id-ID': 'IDR',
  'tr':    'TRY',  // Turkish → Turkey
  'tr-TR': 'TRY',
  'en-GB': 'GBP',
  'en-US': 'USD',
  'en-CA': 'CAD',
  'en-AU': 'AUD',
  'en-NZ': 'NZD',
}

// ─── Public API ───────────────────────────────────────────────────────────────

export interface LocationCurrency {
  currency:    string   // ISO 4217 code e.g. "PKR"
  countryCode: string   // ISO 3166-1 alpha-2 e.g. "PK"
  source:      'geolocation' | 'language' | 'fallback'
}

/**
 * Detect the user's local currency using available browser signals.
 *
 * Strategy:
 *   1. Reverse-geocode current GPS coordinates → country code → currency
 *   2. If denied/unavailable → parse navigator.language → currency
 *   3. Last resort → USD
 *
 * Never throws — always resolves with a currency.
 */
export async function detectLocalCurrency(): Promise<LocationCurrency> {
  // Strategy 1: Geolocation → Nominatim reverse geocode
  try {
    const coords = await getCurrentCoords()
    const countryCode = await reverseGeocodeCountry(coords.latitude, coords.longitude)
    if (countryCode) {
      const currency = COUNTRY_TO_CURRENCY[countryCode] ?? 'USD'
      return { currency, countryCode, source: 'geolocation' }
    }
  } catch {
    // Geolocation denied or failed — fall through
  }

  // Strategy 2: navigator.language
  const lang = navigator.language ?? ''
  const locale = lang.split('-').length >= 2
    ? lang                        // e.g. "en-PK"
    : lang

  // Try full locale first, then language-only
  const langCurrency =
    LOCALE_TO_CURRENCY[locale] ??
    LOCALE_TO_CURRENCY[lang.substring(0, 2) ?? ''] ??
    null

  if (langCurrency) {
    // Extract country code from locale if available
    const parts = locale.split('-')
    const countryCode = parts[1] ?? 'US'
    return { currency: langCurrency, countryCode, source: 'language' }
  }

  // Strategy 3: USD fallback
  return { currency: 'USD', countryCode: 'US', source: 'fallback' }
}

/**
 * Get currency symbol for display (e.g. PKR → "₨", USD → "$", SAR → "﷼")
 */
export function getCurrencySymbol(currencyCode: string): string {
  try {
    return (0).toLocaleString('en', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).replace(/\d/g, '').trim()
  } catch {
    return currencyCode
  }
}

/**
 * Format a monetary amount in the given currency with locale-aware formatting.
 * e.g. formatCurrencyAmount(6417.5, 'PKR') → "₨ 6,418"
 */
export function formatCurrencyAmount(amount: number, currencyCode: string, locale?: string): string {
  try {
    return new Intl.NumberFormat(locale ?? navigator.language ?? 'en', {
      style:                 'currency',
      currency:              currencyCode,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount)
  } catch {
    return `${currencyCode} ${amount.toLocaleString()}`
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getCurrentCoords(): Promise<GeolocationCoordinates> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) { reject(new Error('Geolocation not supported')); return }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve(pos.coords),
      (err) => reject(err),
      { timeout: 6000, maximumAge: 300_000 },
    )
  })
}

async function reverseGeocodeCountry(lat: number, lon: number): Promise<string | null> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
      { headers: { 'Accept-Language': 'en' } },
    )
    if (!res.ok) return null
    const data = await res.json() as { address?: { country_code?: string } }
    return data.address?.country_code?.toUpperCase() ?? null
  } catch {
    return null
  }
}
