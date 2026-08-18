"use client";

import { journeyStats } from '../data/achievementsData'

// ============================================
// Journey Stats Component
// ============================================
function JourneyStatsComponent({ stats }: { stats: typeof journeyStats }) {
  const statCards = [
    { 
      label: 'Achievements Earned', 
      value: stats.earned + ' / ' + stats.total,
    },
    { 
      label: 'Current Level', 
      value: 'Level ' + stats.currentLevel,
    }
  ]

  return (
    <div className="grid grid-cols-2 gap-3 h-full">
      {statCards.map((stat, index) => (
        <div key={index} className="bg-[#1F2937] rounded-xl p-4 border border-[#27272A] hover:border-[#3B82F6] transition flex flex-col justify-center">
          <p className="text-2xl font-bold text-white">{stat.value}</p>
          <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  )
}

// ============================================
// Journey Level Info Component
// ============================================
function JourneyLevelInfo({ stats }: { stats: typeof journeyStats }) {
  const progressPercentage = (stats.currentXp / stats.nextLevelXp) * 100

  return (
    <div className="bg-[#1F2937] rounded-xl p-4 border border-[#27272A] hover:border-[#3B82F6] transition h-full flex flex-col justify-center">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-400">Next Level</span>
        <span className="text-sm font-semibold text-white">Level {stats.nextLevel}</span>
      </div>
      <div className="flex items-center justify-between text-xs text-gray-400 mt-2">
        <span>{stats.currentXp.toLocaleString()} XP</span>
        <span>{stats.nextLevelXp.toLocaleString()} XP</span>
      </div>
      <div className="w-full h-2 bg-[#111827] rounded-full overflow-hidden mt-1.5">
        <div 
          className="h-full rounded-full bg-gradient-to-r from-[#3B82F6] to-purple-500 transition-all duration-500" 
          style={{ width: progressPercentage + '%' }} 
        />
      </div>
      <div className="flex items-center gap-1.5 mt-3 flex-wrap">
        <span className="text-sm flex-shrink-0">🔥</span>
        <span className="text-sm text-gray-400 flex-shrink-0">Keep going!</span>
        <span className="text-sm text-[#3B82F6] font-medium truncate min-w-0 flex-1 text-right">
          {stats.xpToNextLevel.toLocaleString()} XP to reach Level {stats.nextLevel}
        </span>
      </div>
    </div>
  )
}

// ============================================
// Main Journey Component
// ============================================
export function Journey() {
  return (
    <div className="bg-[#111827] border border-[#27272A] rounded-2xl p-6">
      <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <span>🏆</span>
        Your Achievement Journey
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <JourneyStatsComponent stats={journeyStats} />
        </div>
        <div className="md:col-span-1">
          <JourneyLevelInfo stats={journeyStats} />
        </div>
      </div>
    </div>
  )
}