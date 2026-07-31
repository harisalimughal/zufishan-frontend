export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  xp: number
  status: 'earned' | 'locked' | 'in-progress'
  earnedDate?: string
  category?: string
  progress?: number
  total?: number
}

export interface JourneyStats {
  earned: number
  total: number
  currentLevel: number
  nextLevel: number
  currentXp: number
  nextLevelXp: number
  xpToNextLevel: number
}

export const journeyStats: JourneyStats = {
  earned: 28,
  total: 50,
  currentLevel: 7,
  nextLevel: 8,
  currentXp: 1250,
  nextLevelXp: 1800,
  xpToNextLevel: 550
}

export const achievementsData: Achievement[] = [
  { 
    id: '1', 
    title: 'Perfect Attendance', 
    description: 'Maintain 100% attendance across 10 consecutive classes', 
    icon: '/perfect-attendance.svg', 
    xp: 200, 
    status: 'earned', 
    earnedDate: 'May 20, 2024', 
    category: 'completion' 
  },
  { 
    id: '2', 
    title: 'Code Starter', 
    description: 'Successfully submit your first programming assignment', 
    icon: '/code-starter.svg', 
    xp: 200, 
    status: 'earned', 
    earnedDate: 'May 18, 2024', 
    category: 'completion' 
  },
  { 
    id: '3', 
    title: 'Quick Learner', 
    description: 'Complete 5 lessons within a single day', 
    icon: '/quick-learner.svg', 
    xp: 100, 
    status: 'earned', 
    earnedDate: 'May 17, 2024', 
    category: 'performance' 
  },
  { 
    id: '4', 
    title: 'Active Participant', 
    description: 'Engage in 10 meaningful class discussions', 
    icon: '/active-partpiciant.svg', 
    xp: 150, 
    status: 'earned', 
    earnedDate: 'May 15, 2024', 
    category: 'participation' 
  },
  { 
    id: '5', 
    title: 'Top Performer', 
    description: 'Achieve a score of 90% or higher on any assessment', 
    icon: '/top-performer.svg', 
    xp: 160, 
    status: 'earned', 
    earnedDate: 'May 12, 2024', 
    category: 'performance' 
  },
  { 
    id: '6', 
    title: '30 Day Streak', 
    description: 'Maintain consistent daily learning for 30 consecutive days', 
    icon: '/30days-streak.svg', 
    xp: 100, 
    status: 'in-progress', 
    progress: 18, 
    total: 30, 
    category: 'consistency' 
  },
  { 
    id: '7', 
    title: 'Knowledge Explorer', 
    description: 'Successfully complete 3 distinct courses', 
    icon: '/knowledge-explorer.svg', 
    xp: 300, 
    status: 'in-progress', 
    progress: 1, 
    total: 3, 
    category: 'completion' 
  },
  { 
    id: '8', 
    title: 'Assignment Master', 
    description: 'Submit 20 assignments on or before the deadline', 
    icon: '/assigment-master.svg', 
    xp: 200, 
    status: 'in-progress', 
    progress: 7, 
    total: 20, 
    category: 'performance' 
  },
  { 
    id: '9', 
    title: 'Helper', 
    description: 'Provide valuable assistance to 25 peers', 
    icon: '/Helper.svg', 
    xp: 200, 
    status: 'in-progress', 
    progress: 5, 
    total: 25, 
    category: 'participation' 
  },
  { 
    id: '10', 
    title: 'Course Champion', 
    description: 'Complete all modules within a single course', 
    icon: '/course-champion.svg', 
    xp: 150, 
    status: 'in-progress', 
    progress: 40, 
    total: 100, 
    category: 'completion' 
  }
];
export const filterOptions = [
  { label: 'All Badges', value: 'all' },
  { label: 'Completion', value: 'completion' },
  { label: 'Consistency', value: 'consistency' },
  { label: 'Performance', value: 'performance' },
  { label: 'Participation', value: 'participation' },
  { label: 'Special', value: 'special' }
]
