'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import { motion, useSpring, useTransform } from 'framer-motion'
import { MapPin, RefreshCw, AlertCircle, WifiOff, Loader2, Compass, RotateCcw, Info, CheckCircle2 } from 'lucide-react'
import { utilityService, type QiblaData } from '../../services/utilityService'

// ─── Heading normalisation ────────────────────────────────────────────────────
// Prevents 359° → 0° jump by always taking the shortest arc.

function shortestArc(current: number, target: number): number {
  let diff = ((target - current) % 360 + 540) % 360 - 180
  return current + diff
}

function normaliseHeading(raw: number): number {
  return ((raw % 360) + 360) % 360
}

// ─── Device Orientation hook ──────────────────────────────────────────────────

type OrientationState =
  | { status: 'idle' }
  | { status: 'requesting' }
  | { status: 'active'; heading: number }
  | { status: 'denied' }
  | { status: 'unsupported' }

function useDeviceOrientation() {
  const [state, setState] = useState<OrientationState>({ status: 'idle' })
  const prevHeadingRef = useRef<number>(0)
  const listenerRef = useRef<((e: DeviceOrientationEvent) => void) | null>(null)

  const handleEvent = useCallback((e: DeviceOrientationEvent) => {
    // iOS: webkitCompassHeading. Android: 360 - alpha
    const raw = (e as any).webkitCompassHeading != null
      ? (e as any).webkitCompassHeading
      : e.alpha != null
        ? normaliseHeading(360 - e.alpha)
        : null

    if (raw == null) return
    const continuous = shortestArc(prevHeadingRef.current, normaliseHeading(raw))
    prevHeadingRef.current = continuous
    setState({ status: 'active', heading: continuous })
  }, [])

  const request = useCallback(async () => {
    if (!('DeviceOrientationEvent' in window)) {
      setState({ status: 'unsupported' }); return
    }
    setState({ status: 'requesting' })
    // iOS 13+ requires explicit permission
    const DO = DeviceOrientationEvent as any
    if (typeof DO.requestPermission === 'function') {
      try {
        const res = await DO.requestPermission()
        if (res !== 'granted') { setState({ status: 'denied' }); return }
      } catch {
        setState({ status: 'denied' }); return
      }
    }
    listenerRef.current = handleEvent
    window.addEventListener('deviceorientationabsolute', handleEvent as any, true)
    window.addEventListener('deviceorientation', handleEvent as any, true)
  }, [handleEvent])

  const stop = useCallback(() => {
    if (listenerRef.current) {
      window.removeEventListener('deviceorientationabsolute', listenerRef.current as any, true)
      window.removeEventListener('deviceorientation', listenerRef.current as any, true)
    }
    setState({ status: 'idle' })
  }, [])

  useEffect(() => () => stop(), [stop])

  return { state, request, stop }
}

// ─── Animated Compass ─────────────────────────────────────────────────────────

interface CompassProps {
  qiblaBearing: number        // static bearing from API (0-360)
  deviceHeading: number | null // live device heading, or null = static mode
  isAligned: boolean
  isLoading: boolean
}

function AnimatedCompass({ qiblaBearing, deviceHeading, isAligned, isLoading }: CompassProps) {
  // In static mode: needle points to qiblaBearing
  // In live mode:   rotate the dial so device heading = top, needle points toward Qibla
  //   needleAngle = qiblaBearing - deviceHeading
  const targetAngle = deviceHeading !== null
    ? normaliseHeading(qiblaBearing - deviceHeading)
    : qiblaBearing

  const springAngle = useSpring(targetAngle, { stiffness: 80, damping: 18 })

  useEffect(() => {
    springAngle.set(targetAngle)
  }, [targetAngle, springAngle])

  const SIZE = 280
  const CX = SIZE / 2
  const R = CX - 10

  return (
    <div className="relative mx-auto select-none" style={{ width: SIZE, height: SIZE }}>
      {/* Glow when aligned */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{ boxShadow: isAligned ? '0 0 40px 8px rgba(16,185,129,0.35)' : '0 0 0 0 transparent' }}
        transition={{ duration: 0.5 }}
      />

      {/* Outer ring */}
      <svg width={SIZE} height={SIZE} className="absolute inset-0">
        <defs>
          <filter id="needleGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <radialGradient id="dialBg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1C2537" />
            <stop offset="100%" stopColor="#0D1117" />
          </radialGradient>
        </defs>

        {/* Background disc */}
        <circle cx={CX} cy={CX} r={R} fill="url(#dialBg)" stroke="#27272A" strokeWidth="2" />

        {/* Tick marks */}
        {Array.from({ length: 72 }, (_, i) => {
          const deg = i * 5
          const isMajor = deg % 45 === 0
          const isMid = deg % 15 === 0
          const inner = isMajor ? R - 16 : isMid ? R - 9 : R - 4
          const rad = (deg - 90) * Math.PI / 180
          return (
            <line
              key={i}
              x1={CX + R * Math.cos(rad)} y1={CX + R * Math.sin(rad)}
              x2={CX + inner * Math.cos(rad)} y2={CX + inner * Math.sin(rad)}
              stroke={isMajor ? '#4B5563' : '#27272A'} strokeWidth={isMajor ? 2 : 1}
            />
          )
        })}

        {/* Cardinal labels */}
        {[['N','#ef4444'], ['E','#6B7280'], ['S','#6B7280'], ['W','#6B7280']].map(([dir, color], i) => {
          const rad = (i * 90 - 90) * Math.PI / 180
          const lr = R - 26
          return (
            <text key={dir}
              x={CX + lr * Math.cos(rad)} y={CX + lr * Math.sin(rad) + 4}
              textAnchor="middle" fontSize="11" fontWeight="bold" fill={color}
            >{dir}</text>
          )
        })}
      </svg>

      {/* Rotating needle */}
      <motion.div
        className="absolute inset-0"
        style={{ rotate: springAngle }}
      >
        <svg width={SIZE} height={SIZE} className="absolute inset-0">
          {/* North (dark) */}
          <polygon points={`${CX},${CX - R + 24} ${CX - 8},${CX} ${CX + 8},${CX}`} fill="#374151" />
          {/* Qibla / South (green) */}
          <polygon
            points={`${CX},${CX + R - 24} ${CX - 8},${CX} ${CX + 8},${CX}`}
            fill={isAligned ? '#34d399' : '#10b981'}
            filter="url(#needleGlow)"
          />
        </svg>
      </motion.div>

      {/* Centre hub */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className={`flex h-11 w-11 items-center justify-center rounded-full border-2 shadow-lg transition-colors duration-300 ${
          isAligned ? 'bg-emerald-900/60 border-emerald-400' : 'bg-[#111827] border-[#374151]'
        }`}>
          {isLoading
            ? <Loader2 className="h-4 w-4 animate-spin text-[#10b981]" />
            : isAligned
              ? <CheckCircle2 className="h-5 w-5 text-emerald-400" />
              : <Compass className="h-4 w-4 text-[#10b981]" />
          }
        </div>
      </div>

      {/* Alignment triangle at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 pointer-events-none">
        <svg width="16" height="12">
          <polygon points="8,0 0,12 16,12" fill={isAligned ? '#34d399' : '#374151'} />
        </svg>
      </div>
    </div>
  )
}

// ─── Help panel ───────────────────────────────────────────────────────────────

function HelpPanel({ isLive }: { isLive: boolean }) {
  const [open, setOpen] = useState(false)
  const steps = isLive
    ? [
        'Hold your device flat, parallel to the ground.',
        'Slowly rotate your whole body until the green needle points straight up toward the ▲ triangle.',
        'You are now facing the Qibla direction.',
        'If the needle jumps, move away from metal objects and recalibrate by moving the device in a figure-8.',
      ]
    : [
        'Your device does not have a compass sensor.',
        `The number shown is the Qibla bearing in degrees clockwise from true North.`,
        'Use a physical compass: rotate until you face that many degrees from North.',
        'You can also use a compass app on another device.',
      ]

  return (
    <div className="rounded-xl border border-[#27272A] bg-[#111827] overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex w-full items-center justify-between px-4 py-3 text-xs font-semibold text-gray-400 hover:text-white transition-colors"
      >
        <span className="flex items-center gap-2"><Info className="h-3.5 w-3.5" /> How to use</span>
        <RotateCcw className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="overflow-hidden"
      >
        <ol className="px-4 pb-4 space-y-2">
          {steps.map((s, i) => (
            <li key={i} className="flex gap-2 text-xs text-gray-400">
              <span className="flex-shrink-0 flex h-4 w-4 items-center justify-center rounded-full bg-[#10b981]/20 text-[#10b981] font-bold text-[9px]">{i + 1}</span>
              {s}
            </li>
          ))}
        </ol>
      </motion.div>
    </div>
  )
}

// ─── State screens ────────────────────────────────────────────────────────────

function Banner({ icon, color, title, body, action }: {
  icon: React.ReactNode; color: string; title: string; body: string
  action?: { label: string; onClick: () => void }
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center gap-4 rounded-xl border px-6 py-10 text-center ${color}`}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-current/10">{icon}</div>
      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className="mt-1 text-xs text-gray-500">{body}</p>
      </div>
      {action && (
        <button onClick={action.onClick}
          className="flex items-center gap-2 rounded-lg bg-current/10 px-4 py-2 text-xs font-semibold hover:bg-current/20 transition-colors">
          {action.label}
        </button>
      )}
    </motion.div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function QiblaFeature() {
  // ── Location ──────────────────────────────────────────────────────────────
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null)
  const [cityName, setCityName] = useState('')
  const [geoError, setGeoError] = useState<'denied' | 'unavailable' | null>(null)
  const [isOffline, setIsOffline] = useState(false)

  // ── Orientation ───────────────────────────────────────────────────────────
  const { state: orientState, request: requestOrientation } = useDeviceOrientation()
  const liveHeading = orientState.status === 'active' ? orientState.heading : null

  // ── Online/offline ────────────────────────────────────────────────────────
  useEffect(() => {
    setIsOffline(!navigator.onLine)
    const on = () => setIsOffline(false)
    const off = () => setIsOffline(true)
    window.addEventListener('online', on)
    window.addEventListener('offline', off)
    return () => { window.removeEventListener('online', on); window.removeEventListener('offline', off) }
  }, [])

  // ── Geolocation ───────────────────────────────────────────────────────────
  const requestLocation = useCallback(() => {
    setGeoError(null)
    if (!navigator.geolocation) { setGeoError('unavailable'); return }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude, lng = pos.coords.longitude
        setCoords({ lat, lng })
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
          .then(r => r.json())
          .then(d => {
            const city = d.address?.city || d.address?.town || d.address?.village || ''
            const country = d.address?.country || ''
            if (city) setCityName(country ? `${city}, ${country}` : city)
          })
          .catch(() => {})
      },
      (err) => setGeoError(err.code === err.PERMISSION_DENIED ? 'denied' : 'unavailable'),
      { timeout: 10_000, enableHighAccuracy: false },
    )
  }, [])

  useEffect(() => { requestLocation() }, [requestLocation])

  // ── Qibla API ─────────────────────────────────────────────────────────────
  const { data, isLoading, isError, error, refetch } = useQuery<QiblaData, Error>({
    queryKey: ['qibla', coords],
    queryFn: () => utilityService.getQiblaDirection(coords!),
    enabled: !!coords && !isOffline,
    staleTime: Infinity,
  })

  // ── Alignment detection ───────────────────────────────────────────────────
  // Aligned = device heading is within ±5° of Qibla bearing
  const isAligned = !!data && liveHeading !== null &&
    Math.abs(normaliseHeading(data.bearing - normaliseHeading(liveHeading))) < 5

  // ── Compass permission button ─────────────────────────────────────────────
  const compassAvailable = 'DeviceOrientationEvent' in (typeof window !== 'undefined' ? window : {})
  const needsPermission = orientState.status === 'idle' || orientState.status === 'denied' || orientState.status === 'unsupported' || orientState.status === 'requesting'

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div className="mx-auto max-w-md space-y-5 px-1">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Qibla Direction</h1>
          <p className="mt-0.5 text-xs text-gray-400">Great-circle bearing toward the Kaaba, Makkah</p>
        </div>
        <button onClick={() => refetch()} disabled={isLoading || !coords}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1C2537] border border-[#374151] text-gray-400 hover:text-white hover:border-[#10b981]/50 transition-all disabled:opacity-50">
          <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </motion.div>

      {/* Location bar */}
      {coords && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="flex items-center gap-2 rounded-lg border border-[#27272A] bg-[#111827] px-3.5 py-2.5">
          <MapPin className="h-4 w-4 text-[#10b981] shrink-0" />
          <p className="text-xs text-gray-400 truncate">
            {cityName && <span className="font-semibold text-white mr-1">{cityName} &bull;</span>}
            <span className="tabular-nums">{coords.lat.toFixed(4)}°N, {coords.lng.toFixed(4)}°E</span>
          </p>
        </motion.div>
      )}

      {/* Main content */}
      {isOffline ? (
        <Banner icon={<WifiOff className="h-7 w-7 text-gray-400" />}
          color="border-gray-500/20 bg-gray-500/10 text-gray-400"
          title="You are offline"
          body="Qibla direction will load when your connection is restored." />

      ) : geoError === 'denied' ? (
        <Banner icon={<MapPin className="h-7 w-7 text-amber-400" />}
          color="border-amber-500/20 bg-amber-500/10 text-amber-400"
          title="Location access denied"
          body="Allow browser location access to calculate your Qibla direction."
          action={{ label: 'Allow Location', onClick: requestLocation }} />

      ) : geoError === 'unavailable' ? (
        <Banner icon={<AlertCircle className="h-7 w-7 text-red-400" />}
          color="border-red-500/20 bg-red-500/10 text-red-400"
          title="Location unavailable"
          body="Unable to determine your location. Please try again."
          action={{ label: 'Retry', onClick: requestLocation }} />

      ) : isError ? (
        <Banner icon={<AlertCircle className="h-7 w-7 text-red-400" />}
          color="border-red-500/20 bg-red-500/10 text-red-400"
          title="Could not calculate Qibla"
          body={(error as Error)?.message ?? 'Failed to fetch Qibla direction.'}
          action={{ label: 'Retry', onClick: () => refetch() }} />

      ) : !coords && !geoError ? (
        <div className="flex items-center justify-center gap-3 py-16 text-gray-500">
          <Loader2 className="h-5 w-5 animate-spin text-[#10b981]" />
          <span className="text-sm">Detecting your location…</span>
        </div>

      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }} className="space-y-5">

          {/* Compass card */}
          <div className="rounded-2xl border border-[#27272A] bg-[#111827] py-8 flex flex-col items-center gap-6">
            <AnimatedCompass
              qiblaBearing={data?.bearing ?? 0}
              deviceHeading={liveHeading}
              isAligned={isAligned}
              isLoading={isLoading}
            />

            {/* Alignment badge */}
            {liveHeading !== null && (
              <motion.div
                animate={{ scale: isAligned ? [1, 1.06, 1] : 1 }}
                transition={{ duration: 0.4 }}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors duration-300 ${
                  isAligned
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : 'bg-[#1C2537] text-gray-500 border border-[#374151]'
                }`}
              >
                {isAligned ? '✓ Facing Qibla' : 'Rotate to align with Qibla'}
              </motion.div>
            )}

            {/* Bearing readout */}
            {data && (
              <div className="text-center">
                <p className="text-5xl font-black tabular-nums text-white tracking-tight">
                  {data.bearing.toFixed(1)}°
                </p>
                <p className="mt-1 text-sm text-[#10b981] font-semibold">{data.cardinal} — from true North</p>
                {liveHeading !== null && (
                  <p className="mt-1 text-xs text-gray-500 tabular-nums">
                    Device heading: {normaliseHeading(liveHeading).toFixed(0)}°
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Compass permission / status strip */}
          {compassAvailable && needsPermission && orientState.status !== 'unsupported' && (
            <motion.button
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
              onClick={requestOrientation}
              className="w-full flex items-center justify-center gap-2 rounded-xl border border-[#10b981]/30 bg-[#10b981]/10 py-3 text-sm font-semibold text-[#10b981] hover:bg-[#10b981]/20 transition-colors"
            >
              <Compass className="h-4 w-4" />
              {orientState.status === 'requesting' ? 'Requesting compass…' : 'Enable live compass'}
            </motion.button>
          )}

          {orientState.status === 'denied' && (
            <p className="text-center text-xs text-amber-400">
              Compass permission denied. Using static bearing. Check browser site settings to re-enable.
            </p>
          )}
          {orientState.status === 'unsupported' && (
            <p className="text-center text-xs text-gray-500">
              No compass sensor detected on this device. Using static bearing mode.
            </p>
          )}

          {/* Stats row */}
          {data && (
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Qibla Bearing', value: `${data.bearing.toFixed(1)}°` },
                { label: 'Cardinal', value: data.cardinal },
                { label: 'Device Heading', value: liveHeading !== null ? `${normaliseHeading(liveHeading).toFixed(0)}°` : '—' },
              ].map(({ label, value }) => (
                <div key={label} className="rounded-lg bg-[#111827] border border-[#27272A] p-3 text-center">
                  <p className="text-[9px] text-gray-500 uppercase tracking-wide">{label}</p>
                  <p className="mt-1 text-base font-bold text-white tabular-nums">{value}</p>
                </div>
              ))}
            </div>
          )}

          {/* Help */}
          {data && <HelpPanel isLive={liveHeading !== null} />}
        </motion.div>
      )}
    </div>
  )
}
