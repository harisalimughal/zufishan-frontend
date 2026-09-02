'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, MapPin, RefreshCw, Loader2, AlertCircle, WifiOff, Sparkles } from 'lucide-react'
import { utilityService, type HijriDateData, type IslamicEvent } from '../../services/utilityService'

// ─── Constants ────────────────────────────────────────────────────────────────

const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const HIJRI_MONTHS = [
  'Muharram','Safar',"Rabi' al-Awwal","Rabi' al-Thani",
  "Jumada al-Awwal","Jumada al-Thani","Rajab","Sha'ban",
  'Ramadan','Shawwal',"Dhu al-Qi'dah","Dhu al-Hijjah",
]

// Category → colour token
const CATEGORY_COLORS: Record<string, string> = {
  Holiday: '#f59e0b',
  Fasting: '#10b981',
  Hajj: '#8b5cf6',
  'Special Night': '#6366f1',
  Commemoration: '#ec4899',
}

function categoryColor(cat: string) { return CATEGORY_COLORS[cat] ?? '#6b7280' }

// ─── Build calendar grid for a Hijri month ─────────────────────────────────────
// A Hijri month has 29 or 30 days. We don't know the Gregorian weekday
// of Hijri 1 without converting — so we derive it from the API response.
// The API returns today's gregorian weekday index (0=Sun). We use the
// current Hijri day to back-calculate the weekday of day 1.

function buildGrid(hijriDay: number, gregorianWeekday: number, monthDays: number) {
  // weekday of day 1 in this month
  const day1Weekday = ((gregorianWeekday - (hijriDay - 1)) % 7 + 7) % 7
  const cells: Array<number | null> = Array(day1Weekday).fill(null)
  for (let d = 1; d <= monthDays; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)
  return cells
}

// ─── Swipe hook ────────────────────────────────────────────────────────────────

function useSwipe(onLeft: () => void, onRight: () => void) {
  const startX = useRef<number | null>(null)
  const onTouchStart = (e: React.TouchEvent) => { startX.current = e.touches[0].clientX }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current === null) return
    const dx = e.changedTouches[0].clientX - startX.current
    if (dx < -50) onLeft()
    else if (dx > 50) onRight()
    startX.current = null
  }
  return { onTouchStart, onTouchEnd }
}

// ─── Day cell ─────────────────────────────────────────────────────────────────

function DayCell({
  day, isToday, isSelected, event, isRamadan, isEid,
  onSelect, tabIndex,
}: {
  day: number | null; isToday: boolean; isSelected: boolean
  event?: IslamicEvent; isRamadan: boolean; isEid: boolean
  onSelect: (d: number) => void; tabIndex: number
}) {
  if (day === null)
    return <div className="aspect-square" />

  const hasBg = isEid ? 'bg-amber-500/20 border-amber-500/50'
    : isRamadan ? 'bg-emerald-900/30 border-emerald-700/30'
    : isToday ? 'bg-emerald-600/25 border-emerald-500/60'
    : isSelected ? 'bg-[#1C2537] border-[#374151]'
    : 'border-transparent hover:bg-[#1C2537]/60'

  return (
    <button
      tabIndex={tabIndex}
      aria-label={`Hijri day ${day}${event ? `, ${event.name}` : ''}`}
      onClick={() => onSelect(day)}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onSelect(day)}
      className={`relative aspect-square flex flex-col items-center justify-center rounded-xl border text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 ${hasBg}`}
    >
      <span className={isToday ? 'text-emerald-400' : isEid ? 'text-amber-300' : 'text-gray-200'}>
        {day}
      </span>
      {event && (
        <span
          className="absolute bottom-1 h-1.5 w-1.5 rounded-full"
          style={{ background: categoryColor(event.category) }}
        />
      )}
      {isRamadan && !event && (
        <span className="absolute bottom-1 h-1 w-1 rounded-full bg-emerald-600/70" />
      )}
    </button>
  )
}

// ─── Selected day detail panel ─────────────────────────────────────────────────

function DayDetail({ day, hijriMonth, hijriYear, event }: {
  day: number; hijriMonth: number; hijriYear: number; event?: IslamicEvent
}) {
  const monthName = HIJRI_MONTHS[hijriMonth - 1] ?? ''
  const isRamadan = hijriMonth === 9
  const isEid = (hijriMonth === 10 && day <= 3) || (hijriMonth === 12 && day >= 10 && day <= 13)

  return (
    <motion.div
      key={`detail-${day}`}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl border p-4 space-y-2 ${
        isEid ? 'border-amber-500/30 bg-amber-500/10' :
        isRamadan ? 'border-emerald-700/40 bg-emerald-900/20' :
        'border-[#27272A] bg-[#111827]'
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className={`text-2xl font-black ${isEid ? 'text-amber-300' : 'text-white'}`}>
            {day} {monthName} {hijriYear} AH
          </p>
          {isEid && <p className="text-xs text-amber-400 mt-0.5 font-semibold flex items-center gap-1"><Sparkles className="h-3 w-3" /> Eid al-{hijriMonth === 10 ? 'Fitr' : 'Adha'}</p>}
          {isRamadan && !isEid && <p className="text-xs text-emerald-400 mt-0.5">🌙 Ramadan Mubarak</p>}
        </div>
      </div>

      {event ? (
        <div className="rounded-xl p-3 border" style={{ borderColor: `${categoryColor(event.category)}40`, background: `${categoryColor(event.category)}12` }}>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full" style={{ background: categoryColor(event.category) }} />
            <span className="text-xs font-bold text-white">{event.name}</span>
            <span className="ml-auto text-[10px] font-semibold px-1.5 py-0.5 rounded-md" style={{ color: categoryColor(event.category), background: `${categoryColor(event.category)}22` }}>{event.category}</span>
          </div>
          {event.nameAr && <p className="text-xs text-gray-400 mt-1 font-serif text-right">{event.nameAr}</p>}
          <p className="text-xs text-gray-400 mt-1">{event.description}</p>
        </div>
      ) : (
        <p className="text-xs text-gray-500">No Islamic event on this day.</p>
      )}
    </motion.div>
  )
}

// ─── Main Feature ─────────────────────────────────────────────────────────────

export function HijriDateFeature() {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null)
  const [cityName, setCityName] = useState('')
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [monthOffset, setMonthOffset] = useState(0)   // 0 = current month
  const [slideDir, setSlideDir] = useState<'left' | 'right'>('left')
  const [isOffline, setIsOffline] = useState(false)

  useEffect(() => {
    setIsOffline(!navigator.onLine)
    const on = () => setIsOffline(false)
    const off = () => setIsOffline(true)
    window.addEventListener('online', on)
    window.addEventListener('offline', off)
    return () => { window.removeEventListener('online', on); window.removeEventListener('offline', off) }
  }, [])

  useEffect(() => {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(pos => {
      setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude })
      fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`)
        .then(r => r.json())
        .then(d => {
          const city = d.address?.city || d.address?.town || d.address?.village || ''
          const country = d.address?.country || ''
          if (city) setCityName(country ? `${city}, ${country}` : city)
        }).catch(() => {})
    }, () => {}, { timeout: 8000 })
  }, [])

  // Compute target Gregorian date from monthOffset
  const targetDate = useCallback(() => {
    const d = new Date()
    d.setMonth(d.getMonth() + monthOffset)
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-01`
  }, [monthOffset])

  const { data, isLoading, isError, error, refetch } = useQuery<HijriDateData, Error>({
    queryKey: ['hijri-date-cal', targetDate(), coords],
    queryFn: () => utilityService.getHijriDate({ date: targetDate(), lat: coords?.lat, lng: coords?.lng }),
    staleTime: 1000 * 60 * 60,
    enabled: !isOffline,
  })

  const goNext = () => { setSlideDir('left'); setMonthOffset(o => o + 1); setSelectedDay(null) }
  const goPrev = () => { setSlideDir('right'); setMonthOffset(o => o - 1); setSelectedDay(null) }
  const goToday = () => { setSlideDir(monthOffset > 0 ? 'right' : 'left'); setMonthOffset(0); setSelectedDay(null) }
  const swipe = useSwipe(goNext, goPrev)

  // Build event lookup by hijri day
  const eventByDay = useCallback(() => {
    const map: Record<number, IslamicEvent> = {}
    if (!data) return map
    for (const evt of data.nearbyEvents) {
      if (evt.hijriMonthNumber === data.hijri.month.number) {
        map[evt.hijriDay] = evt
      }
    }
    if (data.currentEvent && monthOffset === 0) {
      map[data.hijri.day] = data.currentEvent as IslamicEvent
    }
    return map
  }, [data, monthOffset])

  const eventMap = eventByDay()

  const hijriMonth = data?.hijri.month.number ?? 1
  const hijriYear = data?.hijri.year ?? 1448
  const isRamadanMonth = hijriMonth === 9

  // Approximate days in this hijri month (29 or 30)
  const monthDays = (hijriMonth % 2 === 1 && hijriMonth !== 11) ? 30 : 29

  // Build grid — need weekday of day 1
  const gWeekday = data ? new Date(data.gregorian.date + 'T00:00:00Z').getUTCDay() : 0
  const grid = data ? buildGrid(data.hijri.day, gWeekday, monthDays) : []

  const todayHijriDay = monthOffset === 0 ? (data?.hijri.day ?? -1) : -1

  return (
    <div className="mx-auto max-w-lg space-y-5 px-1">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Hijri Calendar</h1>
          <p className="mt-0.5 text-xs text-gray-400">Islamic lunar calendar, location-aware</p>
        </div>
        <div className="flex gap-2">
          <button onClick={goToday} disabled={monthOffset === 0}
            className="rounded-lg border border-[#374151] bg-[#1C2537] px-3 py-1.5 text-xs font-semibold text-gray-300 hover:text-white disabled:opacity-40 transition-all">
            Today
          </button>
          <button onClick={() => refetch()} disabled={isLoading}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#374151] bg-[#1C2537] text-gray-400 hover:text-white disabled:opacity-50 transition-all">
            <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </motion.div>

      {/* Location bar */}
      {cityName && (
        <div className="flex items-center gap-2 rounded-lg border border-[#27272A] bg-[#111827] px-3.5 py-2">
          <MapPin className="h-3.5 w-3.5 text-[#10b981] shrink-0" />
          <span className="text-xs text-gray-300">{cityName}</span>
          {data?.location?.regionNote && (
            <span className="ml-auto text-[10px] text-gray-500 truncate">{data.location.regionNote}</span>
          )}
        </div>
      )}

      {/* Main area */}
      {isOffline ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-gray-800 bg-[#111827] py-12 text-center">
          <WifiOff className="h-8 w-8 text-gray-500" />
          <p className="text-sm text-gray-400">You are offline</p>
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 py-12 text-center">
          <AlertCircle className="h-8 w-8 text-red-400" />
          <p className="text-sm text-red-400">Failed to load calendar</p>
          <p className="text-xs text-gray-500">{error?.message}</p>
          <button onClick={() => refetch()} className="mt-2 rounded-lg bg-red-500/20 px-4 py-2 text-xs text-red-400 hover:bg-red-500/30">Retry</button>
        </div>
      ) : isLoading && !data ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-[#27272A] bg-[#111827] py-16 text-center">
          <Loader2 className="h-7 w-7 animate-spin text-[#10b981]" />
          <p className="text-xs text-gray-400">Loading Hijri calendar…</p>
        </div>
      ) : data ? (
        <div className="space-y-4" {...swipe}>

          {/* Month navigation */}
          <div className={`rounded-2xl border p-4 ${isRamadanMonth ? 'border-emerald-700/40 bg-gradient-to-br from-emerald-950/60 to-[#111827]' : 'border-[#27272A] bg-[#111827]'}`}>

            <div className="flex items-center justify-between mb-4">
              <button onClick={goPrev} aria-label="Previous month"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#374151] text-gray-400 hover:text-white hover:border-emerald-500/40 transition-all">
                <ChevronLeft className="h-4 w-4" />
              </button>

              <div className="text-center">
                <AnimatePresence mode="wait">
                  <motion.div key={`${hijriMonth}-${hijriYear}`}
                    initial={{ opacity: 0, x: slideDir === 'left' ? 24 : -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: slideDir === 'left' ? -24 : 24 }}
                    transition={{ duration: 0.22 }}>
                    <p className="text-base font-bold text-white">{HIJRI_MONTHS[hijriMonth - 1]} {hijriYear} AH</p>
                    <p className="text-xs text-gray-400">{data.gregorian.formatted}</p>
                    {isRamadanMonth && <p className="text-[10px] text-emerald-400 mt-0.5 font-semibold">🌙 Ramadan</p>}
                  </motion.div>
                </AnimatePresence>
              </div>

              <button onClick={goNext} aria-label="Next month"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#374151] text-gray-400 hover:text-white hover:border-emerald-500/40 transition-all">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Weekday row */}
            <div className="grid grid-cols-7 mb-1">
              {WEEKDAY_LABELS.map(d => (
                <div key={d} className="text-center text-[10px] font-semibold text-gray-500 py-1">{d}</div>
              ))}
            </div>

            {/* Calendar grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`grid-${hijriMonth}-${hijriYear}`}
                initial={{ opacity: 0, x: slideDir === 'left' ? 30 : -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: slideDir === 'left' ? -30 : 30 }}
                transition={{ duration: 0.22 }}
                className="grid grid-cols-7 gap-1"
              >
                {grid.map((day, idx) => (
                  <DayCell
                    key={idx}
                    day={day}
                    isToday={day === todayHijriDay}
                    isSelected={day === selectedDay}
                    event={day !== null ? eventMap[day] : undefined}
                    isRamadan={isRamadanMonth && day !== null}
                    isEid={(hijriMonth === 10 && day !== null && day <= 3) || (hijriMonth === 12 && day !== null && day >= 10 && day <= 13)}
                    onSelect={d => setSelectedDay(prev => prev === d ? null : d)}
                    tabIndex={day !== null ? 0 : -1}
                  />
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Legend */}
            <div className="mt-4 flex flex-wrap gap-3 border-t border-[#27272A] pt-3">
              {Object.entries(CATEGORY_COLORS).map(([cat, color]) => (
                <div key={cat} className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full" style={{ background: color }} />
                  <span className="text-[10px] text-gray-500">{cat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Selected day detail */}
          <AnimatePresence>
            {selectedDay !== null && (
              <DayDetail
                day={selectedDay}
                hijriMonth={hijriMonth}
                hijriYear={hijriYear}
                event={eventMap[selectedDay]}
              />
            )}
          </AnimatePresence>

          {/* Upcoming events strip */}
          {data.nearbyEvents.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Upcoming Events</p>
              {data.nearbyEvents.slice(0, 5).map((evt, i) => (
                <motion.div key={evt.name + i}
                  initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-center gap-3 rounded-xl border border-[#27272A] bg-[#111827] px-4 py-2.5"
                >
                  <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ background: categoryColor(evt.category) }} />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-white truncate">{evt.name}</p>
                    <p className="text-[10px] text-gray-500">{evt.hijriFormatted}</p>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 shrink-0 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                    {evt.daysRemaining === 0 ? 'Today' : `${evt.daysRemaining}d`}
                  </span>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      ) : null}
    </div>
  )
}
