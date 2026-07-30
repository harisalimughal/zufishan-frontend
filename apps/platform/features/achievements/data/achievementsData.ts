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
  { id: '1', title: 'Perfect Attendance', description: 'Attend 10 classes without any absence', icon: '🎯', xp: 200, status: 'earned', earnedDate: 'May 20, 2024', category: 'completion' },
  { id: '2', title: 'Code Starter', description: 'Submit your first assignment', icon: '💻', xp: 200, status: 'earned', earnedDate: 'May 18, 2024', category: 'completion' },
  { id: '3', title: 'Quick Learner', description: 'Complete 5 lessons in a day', icon: '📚', xp: 100, status: 'earned', earnedDate: 'May 17, 2024', category: 'performance' },
  { id: '4', title: 'Active Participant', description: 'Ask or answer 10 questions in class', icon: '💬', xp: 150, status: 'earned', earnedDate: 'May 15, 2024', category: 'participation' },
  { id: '5', title: 'Top Performer', description: 'Score above 90% in any assessment', icon: '⭐', xp: 160, status: 'earned', earnedDate: 'May 12, 2024', category: 'performance' },
  { id: '6', title: '30 Day Streak', description: 'Maintain daily learning for 30 days', icon: '🔥', xp: 100, status: 'in-progress', progress: 18, total: 30, category: 'consistency' },
  { id: '7', title: 'Knowledge Explorer', description: 'Complete 3 different courses', icon: '🌍', xp: 300, status: 'in-progress', progress: 1, total: 3, category: 'completion' },
  { id: '8', title: 'Assignment Master', description: 'Submit 20 assignments with on-time', icon: '📝', xp: 200, status: 'in-progress', progress: 7, total: 20, category: 'performance' },
  { id: '9', title: 'Helper', description: 'Help 25 peers by answering questions', icon: '🤝', xp: 200, status: 'in-progress', progress: 5, total: 25, category: 'participation' },
  { id: '10', title: 'Course Champion', description: 'Complete all modules in a course', icon: '🏆', xp: 150, status: 'in-progress', progress: 40, total: 100, category: 'completion' },
  { id: '11', title: 'Bug Hunter', description: 'Find and report 10 bugs in the system', icon: '🐛', xp: 250, status: 'locked', category: 'special' },
  { id: '12', title: 'Community Star', description: 'Help 50 peers in the community', icon: '🌟', xp: 350, status: 'locked', category: 'special' }
]

export const filterOptions = [
  { label: 'All Badges', value: 'all' },
  { label: 'Completion', value: 'completion' },
  { label: 'Consistency', value: 'consistency' },
  { label: 'Performance', value: 'performance' },
  { label: 'Participation', value: 'participation' },
  { label: 'Special', value: 'special' }
]
