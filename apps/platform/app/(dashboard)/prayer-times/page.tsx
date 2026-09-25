import type { Metadata } from 'next'
import { PrayerTimesFeature } from '../../../features/utilities/PrayerTimesFeature'

export const metadata: Metadata = {
  title: 'Prayer Times — Zufishan',
  description:
    'Accurate daily prayer times for your location. Supports all major Islamic calculation methods and Hanafi / Shafi\'i Asr madhab.',
}

/**
 * /prayer-times route
 *
 * Server component shell — renders the client feature component inside the
 * existing (dashboard) PlatformLayout wrapper.
 */
export default function PrayerTimesPage() {
  return (
    <main className="flex flex-col gap-6 px-4 py-6 md:px-6">
      <PrayerTimesFeature />
    </main>
  )
}
