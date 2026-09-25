# Zufishan Frontend — Documentation

Project documentation will live here as the product is built screen by screen.

---

## Prayer Times Feature — Phase 2 (2026-08-27)

### Kya banaya?

Frontend mein Prayer Times ka poora UI implement kiya gaya. Yeh feature automatically user ki location detect karta hai aur backend se prayer times fetch karta hai.

### Files Created / Modified

| File | Status | Description |
| :--- | :--- | :--- |
| `components/ReactQueryProvider.tsx` | CREATED | React Query ka QueryClientProvider |
| `app/layout.tsx` | MODIFIED | ReactQueryProvider root layout mein add kiya |
| `services/utilityService.ts` | CREATED | Prayer times API call wrapper |
| `features/utilities/PrayerTimesFeature.tsx` | CREATED | Full prayer times UI component |
| `app/(dashboard)/prayer-times/page.tsx` | CREATED | Next.js page route |
| `lib/navigation/sidebar-items.ts` | MODIFIED | Utilities section add kiya |

### Feature Details

- **Auto Geolocation**: Browser se automatically latitude/longitude milti hai.
- **6 Prayer Cards**: Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha — har ek ka unique color gradient.
- **Next Prayer**: Current time ke baad wala prayer animated ring ke saath highlight hota hai.
- **Calculation Settings**: Method (MWL, Karachi, ISNA, etc.) aur Asr madhab (Standard/Hanafi) user choose kar sakta hai.
- **Error States**: Offline, location denied, location unavailable, API error — sab handle hain.
- **Loading Skeleton**: Data load hone se pehle placeholder cards dikhte hain.
- **Cached Badge**: Agar data PostgreSQL cache se aaya to "Cached" indicator show hota hai.
- **Framer Motion**: Sab cards animate ho ke aate hain.

### Backend API

```
GET /api/v1/utilities/prayer-times
  ?lat=24.8607
  &lng=67.0011
  &method=Karachi
  &asrMethod=0      (0=Standard, 1=Hanafi)
  &date=2026-08-27  (optional, default=today)
```
