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

export interface FilterOption {
  label: string
  value: string
}
