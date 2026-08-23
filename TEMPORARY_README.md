# Zufishan Platform — Comprehensive Project & Folder Breakdown

> **Working Branch:** `Daily_Utilities&AI_Assistant`  
> **Module Owner:** Daily Utilities & AI Assistant  

---

## 1. Monorepo Architecture Overview (`nexora`)

This project is configured as an **npm Workspaces Monorepo**. It contains two main application projects (`apps/`) and four shared library packages (`packages/`).

```text
zufishan-frontend/
├── apps/
│   ├── platform/                   <-- Main Next.js 16 Web Application (Platform & Utilities)
│   ├── landing/                    <-- Marketing website application
│   └── public/                     <-- Static asset files (logos, favicons)
├── packages/
│   ├── ui/                         <-- Shared UI components (Buttons, Cards, Modals)
│   ├── hooks/                      <-- Shared React hooks (useMediaQuery, useLocalStorage)
│   ├── types/                      <-- Shared TypeScript definitions
│   └── utils/                      <-- Shared helper utilities (clsx, formatters)
├── components.json                 <-- UI component library configuration
├── package.json                    <-- Monorepo root workspace scripts & dependencies
├── tsconfig.base.json              <-- Base TypeScript path aliases (@/ui, @/hooks, etc.)
└── Noor_Ilm_Utilities_Roadmap.docx  <-- Execution roadmap document
```

---

## 2. Detailed Folder & File Breakdown

### 📁 Root Directory Files
- `package.json`: Contains root-level scripts (`npm run dev`, `npm run build`) that delegate execution to `@nexora/platform`.
- `tsconfig.json` & `tsconfig.base.json`: Configure TypeScript paths (e.g. `@/*` pointing to `apps/platform/` and `@nexora/ui` pointing to `packages/ui`).
- `tailwind.config.ts` & `postcss.config.mjs`: Styling setup using Tailwind CSS v4.
- `.env.example`: Template for environment variables (API URLs, keys).

---

### 📁 `apps/platform/` (Main Application Directory)

This is the primary Next.js app where **all your work for Daily Utilities & AI Assistant** will be built.

#### 1. `apps/platform/app/` (Next.js App Router)
- **`layout.tsx`**: Root HTML wrapper containing global font configuration, Theme providers, and metadata.
- **`globals.css`**: Global CSS styles, Tailwind directives, and custom scrollbar/color variables.
- **`(dashboard)/` (Route Group)**: Pages wrapped inside the `PlatformLayout` (Sidebar + Topbar + Notifications).
  - **`layout.tsx`**: Renders `<PlatformLayout>{children}</PlatformLayout>`.
  - **`dashboard/page.tsx`**: Main student/user dashboard.
  - **`course-catalog/page.tsx`**: Browse available courses.
  - **`my-courses/page.tsx`**: Enrolled course list.
  - **`live-classes/page.tsx`**: Scheduled live video sessions.
  - **`calendar/page.tsx`**: Academic and event calendar.
  - **`attendance/page.tsx`**: Student attendance records.
  - **`assignments/page.tsx`**: Assignment submissions and grades.
  - **`progress/page.tsx`**: Learning metrics and analytics.
  - **`achievements/page.tsx`**: Badges and certificates.
  - **`announcements/page.tsx`**: Platform notifications & updates.
  - **`group-chat/page.tsx`**: Discussion groups.
  - **`settings/page.tsx`**: User preferences & profile settings.
  - **`ai-tutor/page.tsx`**: AI study helper.
- **`admin/`**: Admin portal sub-routes.
- **`api/`**: Next.js API route handlers.
- **`login/`**: User login & authentication pages.

#### 2. `apps/platform/components/` (Layout & Reusable App Components)
- **`PlatformLayout/`**:
  - `Sidebar/Sidebar.tsx`: Collapsible left navigation bar rendering sections defined in `sidebar-items.ts`.
  - `Topbar/Topbar.tsx`: Header bar with search input, notifications trigger, and quick actions.
  - `Notifications/`: Dropdown panel for real-time notifications.
  - `UserProfileCard/`: User avatar, name, role, and logout menu in the sidebar footer.
- **`ComingSoon/ComingSoon.tsx`**: Fallback card for features currently under development.
- **`SplashScreen/`**: Initial app loading screen animation.

#### 3. `apps/platform/features/` (Modular Feature Code)
Each feature has its own folder containing its UI components, state management, and hooks:
- `dashboard/`: Components for the main dashboard (`StatsCards`, `GreetingHeader`, `ActivityFeed`, `TodaySchedule`).
- `course-catalog/`, `my-courses/`, `live-classes/`, `assignments/`, `calendar/`, etc.
- **`utilities/`** *(New folder we will create)*: Will hold components for Prayer Times, Qibla Compass, Hijri Calendar, Zakat Calculator, Azkar Library, Tasbih Counter, and AI Assistant.

#### 4. `apps/platform/lib/` (Navigation & Helpers)
- **`navigation/sidebar-items.ts`**: Array of sidebar items. We will register our **Utilities** menu items here.

#### 5. `apps/platform/mock-data/` & `services/`
- **`mock-data/`**: JSON/TS mock data files used before connecting to live backend endpoints.
- **`services/`**: API fetching functions (axios/fetch wrappers).

---

### 📁 `packages/` (Shared Code Libraries)
- **`packages/ui/`**: Reusable component primitives (Buttons, Cards, Badges, Modals, Form Controls).
- **`packages/hooks/`**: Custom hooks (e.g. `useMediaQuery`, `useLocalStorage`, `useDebounce`).
- **`packages/types/`**: Global TypeScript types & interfaces.
- **`packages/utils/`**: Helper functions (`cn()` class name merger, date formatters).

---

## 3. How to Start Working on Your Assignment

To implement **Daily Utilities & AI Assistant**, you will follow this step-by-step pattern:

1. **Add Sidebar Items**: Edit `apps/platform/lib/navigation/sidebar-items.ts` to add links to `/prayer-times`, `/qibla`, `/zakat`, `/azkar`, and `/ai-assistant`.
2. **Create Routes**: Add new page files under `apps/platform/app/(dashboard)/`:
   - `prayer-times/page.tsx`
   - `qibla/page.tsx`
   - `zakat/page.tsx`
   - `azkar/page.tsx`
   - `ai-assistant/page.tsx`
3. **Build Feature Components**: Create UI components inside `apps/platform/features/utilities/`.
4. **Import & Render**: Each page file imports its corresponding feature components from `@/features/utilities`.
