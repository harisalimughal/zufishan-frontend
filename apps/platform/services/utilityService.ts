/**
 * Utility Service — Prayer Times
 *
 * Thin wrapper over apiClient that maps to:
 *   GET /v1/utilities/prayer-times
 *
 * Keeps the frontend in sync with the backend's response shape
 * (defined in prayerTimes.service.ts → PrayerTimesResult).
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
}
