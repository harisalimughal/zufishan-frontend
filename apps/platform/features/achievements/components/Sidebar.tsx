'use client'

import Link from 'next/link'
import { Trophy, Award, Star, Zap, ArrowRight, Crown, Medal } from 'lucide-react'

// ============================================
// Sidebar Summary Component
// ============================================
function SidebarSummary() {
  const stats = [
    { icon: Trophy, label: 'Earned', value: '28', color: 'text-yellow-400' },
    { icon: Award, label: 'In Progress', value: '7', color: 'text-blue-400' },
    { icon: Star, label: 'Total XP', value: '1,250', color: 'text-purple-400' },
    { icon: Zap, label: 'Day Streak', value: '12', color: 'text-orange-400' }
  ]

  return (
    <div className="bg-[#111827] border border-[#27272A] rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-white">Achievements Summary</h3>
        <Link href="/progress" className="text-[10px] text-[#3B82F6] hover:text-blue-400 transition flex items-center gap-1 group">
          <span>View Progress Details</span>
          <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {stats.map((stat, index) => (
          <div key={index} className="bg-[#1F2937] rounded-lg p-2.5 flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#220066]/50 flex items-center justify-center flex-shrink-0">
              <stat.icon className={stat.color} size={14} />
            </div>
            <div>
              <p className="text-sm font-bold text-white">{stat.value}</p>
              <p className="text-[9px] text-gray-400">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ============================================
// Sidebar Recent Achievements Component
// ============================================
function SidebarRecentAchievements() {
  const recentAchievements = [
    { title: 'Perfect Attendance', description: 'Attend 10 classes without any absence', date: 'May 20, 2024', xp: '+200 XP', icon: '🎯' },
    { title: 'Code Starter', description: 'Submit your first assignment', date: 'May 18, 2024', xp: '+100 XP', icon: '💻' },
    { title: 'Quick Learner', description: 'Complete 5 lessons in a day', date: 'May 17, 2024', xp: '+150 XP', icon: '📚' }
  ]

  return (
    <div className="bg-[#111827] border border-[#27272A] rounded-xl p-4">
      <h3 className="text-sm font-semibold text-white mb-3">Recent Achievements</h3>
      <div className="space-y-3">
        {recentAchievements.map((item, index) => (
          <div key={index} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-[#1F2937] hover:bg-[#2A2A3A] transition border border-transparent hover:border-[#3B82F6]/30">
            <div className="w-8 h-8 rounded-lg bg-[#220066] flex items-center justify-center flex-shrink-0 text-base">{item.icon}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-medium text-white truncate">{item.title}</h4>
                  <p className="text-[10px] text-gray-400 truncate">{item.description}</p>
                </div>
                <span className="text-[10px] font-bold text-[#3B82F6] flex-shrink-0 whitespace-nowrap">
                  {item.xp}
                </span>
              </div>
              <p className="text-[9px] text-gray-500 mt-0.5">Earned - {item.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ============================================
// Sidebar Leaderboard Component
// ============================================
function SidebarLeaderboard() {
  const leaderboardData = [
    { rank: 1, name: 'Sarah Khan', xp: '1,850', isCurrentUser: false },
    { rank: 2, name: 'Michael Thomas', xp: '1,560', isCurrentUser: false },
    { rank: 3, name: 'Priya Mehta', xp: '1,410', isCurrentUser: false },
    { rank: 8, name: 'Harry Smith (You)', xp: '1,250', isCurrentUser: true }
  ]

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown size={14} className="text-yellow-400" />
    if (rank === 2) return <Medal size={14} className="text-gray-400" />
    if (rank === 3) return <Medal size={14} className="text-amber-600" />
    return <span className="text-xs font-medium text-gray-400">{rank}</span>
  }

  return (
    <div className="bg-[#111827] border border-[#27272A] rounded-xl p-4">
      <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
        <Trophy size={15} className="text-yellow-400" />
        Leaderboard
      </h3>
      <div className="space-y-1.5">
        <div className="grid grid-cols-12 gap-1 px-2 py-1.5 text-[10px] text-gray-400 border-b border-[#27272A]">
          <span className="col-span-2 text-center">#</span>
          <span className="col-span-6">Leader</span>
          <span className="col-span-4 text-right">XP</span>
        </div>
        {leaderboardData.map((item) => {
          const rowClass = item.isCurrentUser
            ? 'bg-[#220066] border border-[#3B82F6]/50'
            : 'hover:bg-[#1F2937]'

          const nameClass = item.isCurrentUser
            ? 'text-[#3B82F6]'
            : 'text-white'

          const xpClass = item.isCurrentUser
            ? 'text-[#3B82F6]'
            : 'text-white'

          return (
            <div
              key={item.rank}
              className={'grid grid-cols-12 gap-1 px-2 py-2 rounded-lg transition text-xs ' + rowClass}
            >
              <span className="col-span-2 flex items-center justify-center">
                {getRankIcon(item.rank)}
              </span>
              <span className={'col-span-6 font-medium truncate ' + nameClass}>
                {item.name}
              </span>
              <span className={'col-span-4 text-right font-bold ' + xpClass}>
                {item.xp} XP
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ============================================
// Main Sidebar Component
// ============================================
export function Sidebar() {
  return (
    <div className="bg-[#0a1628] border border-[#1a2a4a] rounded-2xl p-4 flex flex-col h-full space-y-4">
      <SidebarSummary />
      <SidebarRecentAchievements />
      <SidebarLeaderboard />
    </div>
  )
}