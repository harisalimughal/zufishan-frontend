/**
 * Utility Service — Prayer Times
 *
 * Thin wrapper over apiClient that maps to:
 *   GET /v1/utilities/prayer-times
 *   GET /v1/utilities/qibla
 *
 * Keeps the frontend in sync with the backend's response shapes.
 */

import { apiClient } from '../lib/apiClient'

// ─── Types (mirror backend PrayerTimesResult) ─────────────────────────────────

export interface PrayerTimings {
  Fajr:      string
  Sunrise:   string
  Dhuhr:     string
  Asr:       string
  Maghrib:   string
  Isha:      string
  Midnight?: string
  Lastthird?: string
}

export interface HijriMonth {
  number: number
  en:     string
  ar:     string
}

export interface HijriDate {
  day:   number
  month: HijriMonth
  year:  number
}

export interface PrayerTimesMeta {
  timezone:            string
  calculationMethodId: number
  cached:              boolean
}

export interface PrayerTimesData {
  date:      string          // YYYY-MM-DD
  hijriDate: HijriDate
  method:    string
  asrMethod: number          // 0 = Standard, 1 = Hanafi
  location:  { latitude: number; longitude: number }
  timings:   PrayerTimings
  meta:      PrayerTimesMeta
}

export interface PrayerTimesResponse {
  success: boolean
  message: string
  data:    PrayerTimesData
}

// ─── Query params ──────────────────────────────────────────────────────────────

export interface PrayerTimesParams {
  lat:        number
  lng:        number
  method?:    string   // MWL | ISNA | Egypt | Karachi | Makkah | ...
  asrMethod?: 0 | 1   // 0 = Standard/Shafi'i, 1 = Hanafi
  date?:      string   // YYYY-MM-DD, omit for today
}

// ─── Types (mirror backend QiblaResult) ───────────────────────────────────────

export interface QiblaData {
  bearing:  number   // 0–360 degrees clockwise from true North
  cardinal: string   // e.g. "NW", "SE"
  location: { latitude: number; longitude: number }
  kaaba:    { latitude: number; longitude: number }
}

export interface QiblaResponse {
  success: boolean
  message: string
  data:    QiblaData
}

export interface QiblaParams {
  lat: number
  lng: number
}

// ─── Types (mirror backend HijriDateResponseData) ───────────────────────────────

export interface GregorianDetails {
  date: string
  day: number
  month: number
  year: number
  weekday: string
  formatted: string
}

export interface HijriMonthDetails {
  number: number
  en: string
  ar: string
}

export interface HijriDetails {
  day: number
  month: HijriMonthDetails
  year: number
  designation: string
  formatted: string
  provider: string
  effectiveAdjustment: number
}

export interface IslamicEvent {
  name: string
  nameAr?: string
  hijriDay: number
  hijriMonthNumber: number
  hijriMonthName: string
  hijriYear: number
  hijriFormatted: string
  daysRemaining: number
  category: string
  description: string
}

export interface HijriDateData {
  gregorian: GregorianDetails
  hijri: HijriDetails
  location?: {
    latitude?: number
    longitude?: number
    adjustment: number
    regionNote?: string
  }
  currentEvent: IslamicEvent | null
  monthEvents?: IslamicEvent[]
  nearbyEvents: IslamicEvent[]
}

export interface HijriDateResponse {
  success: boolean
  message: string
  data: HijriDateData
}

export interface HijriDateParams {
  date?: string
  lat?: number
  lng?: number
  adjustment?: number
}

// ─── Service ──────────────────────────────────────────────────────────────────

export const utilityService = {
  /**
   * Fetch prayer times from the backend.
   * The backend handles caching — no special logic needed on the frontend.
   */
  getPrayerTimes: async (params: PrayerTimesParams): Promise<PrayerTimesData> => {
    const searchParams = new URLSearchParams()
    searchParams.set('lat', String(params.lat))
    searchParams.set('lng', String(params.lng))
    if (params.method)    searchParams.set('method',    params.method)
    if (params.asrMethod !== undefined) searchParams.set('asrMethod', String(params.asrMethod))
    if (params.date)      searchParams.set('date',      params.date)

    const endpoint = `/v1/utilities/prayer-times?${searchParams.toString()}`
    const response = await apiClient.get<PrayerTimesResponse>(endpoint)
    return response.data
  },

  /**
   * Fetch Qibla direction bearing from the backend.
   * Pure math — no external API, instant response.
   */
  getQiblaDirection: async (params: QiblaParams): Promise<QiblaData> => {
    const searchParams = new URLSearchParams()
    searchParams.set('lat', String(params.lat))
    searchParams.set('lng', String(params.lng))

    const endpoint = `/v1/utilities/qibla?${searchParams.toString()}`
    const response = await apiClient.get<QiblaResponse>(endpoint)
    return response.data
  },

  /**
   * Fetch converted Hijri date and nearby Islamic events from the backend.
   * Supports location tracing and day adjustments.
   */
  getHijriDate: async (params?: HijriDateParams): Promise<HijriDateData> => {
    const searchParams = new URLSearchParams()
    if (params?.date) searchParams.set('date', params.date)
    if (params?.lat !== undefined) searchParams.set('lat', String(params.lat))
    if (params?.lng !== undefined) searchParams.set('lng', String(params.lng))
    if (params?.adjustment !== undefined) searchParams.set('adjustment', String(params.adjustment))

    const endpoint = `/v1/utilities/hijri-date?${searchParams.toString()}`
    const response = await apiClient.get<HijriDateResponse>(endpoint)
    return response.data
  },

  /**
   * Fetch Zakat Nisab rates for a given currency and methodology.
   * currency defaults to the user's local currency (auto-detected by the frontend).
   * methodology defaults to SOUTH_ASIAN (7.5 tola = 87.48g — Darul Uloom Deoband).
   */
  getNisabRate: async (params?: NisabRateParams): Promise<NisabRateData> => {
    const searchParams = new URLSearchParams()
    if (params?.currency)    searchParams.set('currency',    params.currency)
    if (params?.methodology) searchParams.set('methodology', params.methodology)

    const endpoint = `/v1/utilities/zakat/nisab-rate?${searchParams.toString()}`
    const response = await apiClient.get<NisabRateResponse>(endpoint)
    return response.data
  },
}


// ─── Zakat Nisab Types ────────────────────────────────────────────────────────

export type NisabMethodology = 'SOUTH_ASIAN' | 'AAOIFI'

export interface NisabRateParams {
  /** ISO 4217 currency code — auto-detected from location by frontend */
  currency?: string
  /**
   * SOUTH_ASIAN: 7.5 tola = 87.48g gold, 52.5 tola = 612.36g silver
   *              (Darul Uloom Deoband — default for Pakistan / India)
   * AAOIFI:      85g gold, 595g silver (international standard)
   */
  methodology?: NisabMethodology
}

export interface NisabMetalDetail {
  pricePerGram:     number
  nisabWeightGrams: number
  nisabWeightTola:  number
  nisabValue:       number
}

export interface NisabRateData {
  currency:          string
  gold:              NisabMetalDetail
  silver:            NisabMetalDetail
  lowerNisabValue:   number
  methodology:       NisabMethodology
  methodologyDetails: {
    name:        string
    description: string
    reference:   string
  }
  effectiveDate: string
  source:        string
  fetchedAt:     string
  isStale:       boolean
  staleDays?:    number
}

export interface NisabRateResponse {
  success: boolean
  message: string
  data:    NisabRateData
}


