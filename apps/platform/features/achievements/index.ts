// ============================================
// PAGE EXPORTS
// ============================================
export { default as AchievementsPage } from './page';
export { default } from './page';

// ============================================
// TYPE EXPORTS
// ============================================
export * from './types';

// ============================================
// COMPONENT EXPORTS (from consolidated files)
// ============================================

// Header Component
export { Header } from './components/Header';

// Sidebar Components
export { Sidebar } from './components/Sidebar';

// Journey Components
export { Journey } from './components/Journey';

// Badges Components
export { Badges } from './components/Badges';

// ============================================
// DATA EXPORTS
// ============================================
export { achievementsData, journeyStats, filterOptions } from './data/achievementsData';
export type { Achievement, JourneyStats as JourneyStatsType,} from './data/achievementsData';