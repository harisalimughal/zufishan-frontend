'use client'

import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Clock,
  MapPin,
  RefreshCw,
  AlertCircle,
  Sunrise,
  Sun,
  Sunset,
  Moon,
  Star,
  ChevronDown,
  Loader2,
  WifiOff,
} from 'lucide-react'
import { utilityService, type PrayerTimesData, type PrayerTimesParams } from '../../services/utilityService'

// ─── Constants ────────────────────────────────────────────────────────────────

const METHODS = [
  { value: 'MWL',       label: 'Muslim World League (MWL)' },
  { value: 'ISNA',      label: 'ISNA — North America' },
  { value: 'Egypt',     label: 'Egyptian General Authority' },
  { value: 'Karachi',   label: 'University of Islamic Sciences, Karachi' },
  { value: 'Makkah',    label: 'Umm Al-Qura, Makkah' },
  { value: 'Kuwait',    label: 'Kuwait' },
  { value: 'Qatar',     label: 'Qatar' },
  { value: 'Singapore', label: 'Singapore' },
  { value: 'Turkey',    label: 'Directorate of Religious Affairs, Turkey' },
  { value: 'Tehran',    label: 'Institute of Geophysics, Tehran' },
]

const PRAYER_META = [
  { key: 'Fajr',    label: 'Fajr',    arabicLabel: 'الفجر',    icon: Star,    gradient: 'from-indigo-500/20 to-purple-500/20', accent: 'text-indigo-400',  border: 'border-indigo-500/30' },
  { key: 'Sunrise', label: 'Sunrise', arabicLabel: 'الشروق',   icon: Sunrise, gradient: 'from-orange-500/20 to-yellow-500/20', accent: 'text-orange-400', border: 'border-orange-500/30' },
  { key: 'Dhuhr',   label: 'Dhuhr',   arabicLabel: 'الظهر',    icon: Sun,     gradient: 'from-yellow-500/20 to-amber-500/20',  accent: 'text-yellow-400', border: 'border-yellow-500/30' },
  { key: 'Asr',     label: 'Asr',     arabicLabel: 'العصر',    icon: Sun,     gradient: 'from-emerald-500/20 to-teal-500/20',  accent: 'text-emerald-400', border: 'border-emerald-500/30' },
  { key: 'Maghrib', label: 'Maghrib', arabicLabel: 'المغرب',   icon: Sunset,  gradient: 'from-rose-500/20 to-pink-500/20',     accent: 'text-rose-400',   border: 'border-rose-500/30' },
  { key: 'Isha',    label: 'Isha',    arabicLabel: 'العشاء',   icon: Moon,    gradient: 'from-blue-500/20 to-indigo-500/20',   accent: 'text-blue-400',   border: 'border-blue-500/30' },
] as const

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getNextPrayer(timings: PrayerTimesData['timings']): string | null {
  const now = new Date()
  const currentMinutes = now.getHours() * 60 + now.getMinutes()

  for (const prayer of ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'] as const) {
    const t = timings[prayer]
    if (!t) continue
    const [h, m] = t.split(':').map(Number)
    const prayerMinutes = h * 60 + m
    if (prayerMinutes > currentMinutes) return prayer
  }
  return 'Fajr' // wrap to next day
}

function formatHijriDate(hijri: PrayerTimesData['hijriDate']): string {
  if (!hijri || !hijri.month?.en) return ''
  return `${hijri.day} ${hijri.month.en} ${hijri.year} AH`
}

function formatGregorianDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00Z')
  return d.toLocaleDateString('en-US', {
    weekday: 'long',
    year:    'numeric',
    month:   'long',
    day:     'numeric',
    timeZone: 'UTC',
  })
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function PrayerCard({
  prayerKey,
  label,
  arabicLabel,
  Icon,
  time,
  gradient,
  accent,
  border,
  isNext,
  idx,
}: {
  prayerKey: string
  label: string
  arabicLabel: string
  Icon: React.ElementType
  time: string
  gradient: string
  accent: string
  border: string
  isNext: boolean
  idx: number
}) {
  return (
    <motion.div
      key={prayerKey}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: idx * 0.07 }}
      className={`relative overflow-hidden rounded-xl border p-4 bg-gradient-to-br ${gradient} ${border} transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}
    >
      {isNext && (
        <motion.div
          className="absolute inset-0 rounded-xl border-2 border-[#10b981]/60 pointer-events-none"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
      )}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-black/20 ${accent}`}>
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{label}</p>
            <p className="text-xs text-gray-400 font-arabic">{arabicLabel}</p>
          </div>
        </div>
        <div className="text-right">
          <p className={`text-xl font-bold tabular-nums ${accent}`}>{time}</p>
          {isNext && (
            <span className="text-[10px] font-semibold text-[#10b981] bg-[#10b981]/20 px-2 py-0.5 rounded-full">
              NEXT
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// ─── Settings Panel ───────────────────────────────────────────────────────────

function SettingsPanel({
  method,
  asrMethod,
  onMethodChange,
  onAsrMethodChange,
}: {
  method: string
  asrMethod: 0 | 1
  onMethodChange: (m: string) => void
  onAsrMethodChange: (a: 0 | 1) => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="rounded-xl border border-[#27272A] bg-[#111827] overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-5 py-3.5 text-sm font-semibold text-gray-300 hover:text-white transition-colors"
      >
        <span>Calculation Settings</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="settings-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-1 space-y-4 border-t border-[#27272A]">
              {/* Method */}
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1.5">
                  Calculation Method
                </label>
                <select
                  value={method}
                  onChange={(e) => onMethodChange(e.target.value)}
                  className="w-full rounded-lg bg-[#1C2537] border border-[#374151] text-white text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#10b981]/50"
                >
                  {METHODS.map((m) => (
                    <option key={m.value} value={m.value}>
                      {m.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Asr Method */}
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1.5">
                  Asr Calculation (Madhab)
                </label>
                <div className="flex gap-2">
                  {(['Standard (Shafi\'i)', 'Hanafi'] as const).map((label, i) => (
                    <button
                      key={i}
                      onClick={() => onAsrMethodChange(i as 0 | 1)}
                      className={`flex-1 rounded-lg py-2 text-xs font-semibold transition-all ${
                        asrMethod === i
                          ? 'bg-[#10b981] text-black shadow-lg shadow-[#10b981]/30'
                          : 'bg-[#1C2537] text-gray-400 border border-[#374151] hover:border-[#10b981]/50'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Error / Offline States ───────────────────────────────────────────────────

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-4 rounded-xl border border-red-500/20 bg-red-500/10 px-6 py-10 text-center"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500/20">
        <AlertCircle className="h-7 w-7 text-red-400" />
      </div>
      <div>
        <p className="text-sm font-semibold text-red-400">Could not load prayer times</p>
        <p className="mt-1 text-xs text-gray-500">{message}</p>
      </div>
      <button
        onClick={onRetry}
        className="flex items-center gap-2 rounded-lg bg-red-500/20 px-4 py-2 text-xs font-semibold text-red-400 hover:bg-red-500/30 transition-colors"
      >
        <RefreshCw className="h-3 w-3" />
        Retry
      </button>
    </motion.div>
  )
}

function LocationDenied({ onRetry }: { onRetry: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-4 rounded-xl border border-amber-500/20 bg-amber-500/10 px-6 py-10 text-center"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/20">
        <MapPin className="h-7 w-7 text-amber-400" />
      </div>
      <div>
        <p className="text-sm font-semibold text-amber-400">Location access denied</p>
        <p className="mt-1 text-xs text-gray-500">
          Allow browser location access to see accurate prayer times for your location.
        </p>
      </div>
      <button
        onClick={onRetry}
        className="flex items-center gap-2 rounded-lg bg-amber-500/20 px-4 py-2 text-xs font-semibold text-amber-400 hover:bg-amber-500/30 transition-colors"
      >
        <MapPin className="h-3 w-3" />
        Allow Location
      </button>
    </motion.div>
  )
}

function OfflineState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-4 rounded-xl border border-gray-500/20 bg-gray-500/10 px-6 py-10 text-center"
    >
      <WifiOff className="h-10 w-10 text-gray-500" />
      <div>
        <p className="text-sm font-semibold text-gray-400">You are offline</p>
        <p className="mt-1 text-xs text-gray-500">Prayer times will load when your connection is restored.</p>
      </div>
    </motion.div>
  )
}

// ─── Loading Skeleton ─────────────────────────────────────────────────────────

function LoadingSkeleton() {
  return (
    <div className="space-y-3 animate-pulse">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-[72px] rounded-xl bg-[#1C2537]/60" />
      ))}
    </div>
  )
}

// ─── Main Feature Component ───────────────────────────────────────────────────

export function PrayerTimesFeature() {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null)
  const [geoError, setGeoError] = useState<'denied' | 'unavailable' | null>(null)
  const [isOffline, setIsOffline] = useState(false)
  const [method, setMethod] = useState('Karachi')
  const [asrMethod, setAsrMethod] = useState<0 | 1>(0)

  // ── Detect offline state ──────────────────────────────────────────────────
  useEffect(() => {
    setIsOffline(!navigator.onLine)
    const onOnline  = () => setIsOffline(false)
    const onOffline = () => setIsOffline(true)
    window.addEventListener('online',  onOnline)
    window.addEventListener('offline', onOffline)
    return () => {
      window.removeEventListener('online',  onOnline)
      window.removeEventListener('offline', onOffline)
    }
  }, [])

  // ── Request geolocation ───────────────────────────────────────────────────
  const requestLocation = () => {
    setGeoError(null)
    if (!navigator.geolocation) {
      setGeoError('unavailable')
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => {
        if (err.code === err.PERMISSION_DENIED) setGeoError('denied')
        else setGeoError('unavailable')
      },
      { timeout: 10_000, enableHighAccuracy: false },
    )
  }

  useEffect(() => { requestLocation() }, [])

  // ── Query ─────────────────────────────────────────────────────────────────
  const params: PrayerTimesParams | null = coords
    ? { lat: coords.lat, lng: coords.lng, method, asrMethod }
    : null

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<PrayerTimesData, Error>({
    queryKey: ['prayer-times', params],
    queryFn:  () => utilityService.getPrayerTimes(params!),
    enabled:  !!params && !isOffline,
    staleTime: 10 * 60 * 1000, // 10 min
  })

  const nextPrayer = data ? getNextPrayer(data.timings) : null

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div className="mx-auto max-w-2xl space-y-5 px-1">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start justify-between"
      >
        <div>
          <h1 className="text-xl font-bold text-white">Prayer Times</h1>
          {data && (
            <p className="mt-0.5 text-xs text-gray-400">
              {formatGregorianDate(data.date)}
              {data.hijriDate?.year > 0 && (
                <> &bull; <span className="text-[#10b981]">{formatHijriDate(data.hijriDate)}</span></>
              )}
            </p>
          )}
        </div>

        {/* Refresh + cached badge */}
        <div className="flex items-center gap-2">
          {data?.meta.cached && (
            <span className="text-[10px] font-semibold text-gray-500 bg-[#1C2537] border border-[#374151] px-2 py-1 rounded-full">
              Cached
            </span>
          )}
          <button
            onClick={() => refetch()}
            disabled={isLoading}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1C2537] border border-[#374151] text-gray-400 hover:text-white hover:border-[#10b981]/50 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </motion.div>

      {/* Location info bar */}
      {coords && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 rounded-lg border border-[#27272A] bg-[#111827] px-3 py-2"
        >
          <MapPin className="h-3.5 w-3.5 text-[#10b981] shrink-0" />
          <p className="text-xs text-gray-400">
            {coords.lat.toFixed(4)}°N, {coords.lng.toFixed(4)}°E
            {data?.meta.timezone && (
              <> &bull; <span className="text-white">{data.meta.timezone}</span></>
            )}
          </p>
        </motion.div>
      )}

      {/* Settings accordion */}
      <SettingsPanel
        method={method}
        asrMethod={asrMethod}
        onMethodChange={setMethod}
        onAsrMethodChange={setAsrMethod}
      />

      {/* Content area */}
      {isOffline ? (
        <OfflineState />
      ) : geoError === 'denied' ? (
        <LocationDenied onRetry={requestLocation} />
      ) : geoError === 'unavailable' ? (
        <ErrorState
          message="Unable to determine your location. Please try again."
          onRetry={requestLocation}
        />
      ) : isLoading ? (
        <LoadingSkeleton />
      ) : isError ? (
        <ErrorState
          message={(error as Error)?.message ?? 'Failed to fetch prayer times.'}
          onRetry={() => refetch()}
        />
      ) : data ? (
        <div className="space-y-3">
          {PRAYER_META.map((pm, idx) => {
            const time = data.timings[pm.key as keyof typeof data.timings]
            if (!time) return null
            return (
              <PrayerCard
                key={pm.key}
                prayerKey={pm.key}
                label={pm.label}
                arabicLabel={pm.arabicLabel}
                Icon={pm.icon}
                time={time}
                gradient={pm.gradient}
                accent={pm.accent}
                border={pm.border}
                isNext={nextPrayer === pm.key}
                idx={idx}
              />
            )
          })}

          {/* Optional extras */}
          {(data.timings.Midnight || data.timings.Lastthird) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex gap-3"
            >
              {data.timings.Midnight && (
                <div className="flex-1 rounded-xl border border-[#27272A] bg-[#111827] p-3 text-center">
                  <p className="text-[10px] text-gray-500 uppercase tracking-wide">Midnight</p>
                  <p className="mt-1 text-sm font-bold text-gray-300 tabular-nums">{data.timings.Midnight}</p>
                </div>
              )}
              {data.timings.Lastthird && (
                <div className="flex-1 rounded-xl border border-[#27272A] bg-[#111827] p-3 text-center">
                  <p className="text-[10px] text-gray-500 uppercase tracking-wide">Last Third</p>
                  <p className="mt-1 text-sm font-bold text-gray-300 tabular-nums">{data.timings.Lastthird}</p>
                </div>
              )}
            </motion.div>
          )}
        </div>
      ) : !coords && !geoError ? (
        // Waiting for geolocation
        <div className="flex items-center justify-center gap-3 py-16 text-gray-500">
          <Loader2 className="h-5 w-5 animate-spin text-[#10b981]" />
          <span className="text-sm">Detecting your location…</span>
        </div>
      ) : null}
    </div>
  )
}
