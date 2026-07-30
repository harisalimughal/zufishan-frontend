'use client'

import { useState } from 'react'
import { achievementsData } from '../data/achievementsData'
import { Filter } from 'lucide-react'

// ============================================
// Badges Grid Component
// ============================================
function BadgesGrid({ achievements }: { achievements: typeof achievementsData }) {
  const displayAchievements = achievements.slice(0, 10)

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
      {displayAchievements.map((achievement) => {
        let statusText = ''
        let statusColor = ''
        
        if (achievement.status === 'earned') {
          statusText = 'Earned'
          statusColor = 'text-green-400'
        } else if (achievement.status === 'in-progress') {
          statusText = achievement.progress + '/' + achievement.total
          statusColor = 'text-yellow-400'
        } else if (achievement.status === 'locked') {
          statusText = 'Locked'
          statusColor = 'text-gray-500'
        }

        const progressPercentage = achievement.progress && achievement.total
          ? (achievement.progress / achievement.total) * 100
          : 0

        return (
          <div
            key={achievement.id}
            className="bg-[#1F2937] rounded-xl p-4 border border-[#27272A] hover:border-[#3B82F6] transition cursor-pointer flex flex-col h-[180px]"
          >
            <div className="flex flex-col items-center text-center flex-1">
              <div className="w-12 h-12 rounded-lg bg-[#220066] flex items-center justify-center text-2xl mb-2">
                {achievement.icon}
              </div>
              <h4 className="text-sm font-medium text-white truncate w-full">
                {achievement.title}
              </h4>
              <p className="text-[10px] text-gray-400 truncate w-full mt-0.5">
                {achievement.description}
              </p>
            </div>
            
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#27272A]">
              <span className={'text-[10px] font-medium ' + statusColor}>
                {statusText}
              </span>
              <span className="text-[10px] font-bold text-[#3B82F6] flex-shrink-0">
                +{achievement.xp} XP
              </span>
            </div>

            {achievement.status === 'in-progress' && achievement.progress && achievement.total && (
              <div className="mt-1.5">
                <div className="w-full h-1 bg-[#111827] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#3B82F6] transition-all duration-500"
                    style={{ width: progressPercentage + '%' }}
                  />
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

// ============================================
// Badges Show More Component
// ============================================
function BadgesShowMore({ showAll, setShowAll, totalCount, visibleCount }: { 
  showAll: boolean
  setShowAll: (value: boolean) => void
  totalCount: number
  visibleCount: number
}) {
  return (
    <button
      onClick={() => setShowAll(!showAll)}
      className="w-full mt-6 py-3 text-sm text-[#3B82F6] hover:text-blue-400 transition border border-[#27272A] rounded-xl hover:border-[#3B82F6] flex items-center justify-center gap-2"
    >
      {showAll ? 'Show Less' : 'Show More ▼'}
      <span className="text-xs text-gray-500">
        {!showAll && '(' + (totalCount - visibleCount) + ' more)'}
      </span>
    </button>
  )
}

// ============================================
// Main Badges Component
// ============================================
export function Badges() {
  const [filter, setFilter] = useState('all')
  const [showAll, setShowAll] = useState(false)

  const filterOptions = [
    { label: 'All Badges', value: 'all' },
    { label: 'Completion', value: 'completion' },
    { label: 'Consistency', value: 'consistency' },
    { label: 'Performance', value: 'performance' },
    { label: 'Participation', value: 'participation' },
    { label: 'Special', value: 'special' }
  ]

  const filteredAchievements = filter === 'all'
    ? achievementsData
    : achievementsData.filter(a => a.category === filter)

  const displayedAchievements = showAll
    ? filteredAchievements
    : filteredAchievements.slice(0, 10)

  return (
    <div className="bg-[#111827] border border-[#27272A] rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">All Badges</h3>
      
      {/* Filter Row - All in one line */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {filterOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setFilter(option.value)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition whitespace-nowrap ${
              filter === option.value
                ? 'bg-[#3B82F6] text-white'
                : 'bg-[#1F2937] text-gray-400 hover:text-white hover:bg-[#2A2A3A]'
            }`}
          >
            {option.label}
          </button>
        ))}
        
        {/* Filter Button - Just a button, no dropdown */}
        <button className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#1F2937] border border-[#27272A] text-xs text-gray-300 hover:text-white hover:border-[#3B82F6] transition whitespace-nowrap">
          <Filter size={14} />
          <span>Filter</span>
        </button>
      </div>
      
      <BadgesGrid achievements={displayedAchievements} />
      
      {filteredAchievements.length > 10 && (
        <BadgesShowMore
          showAll={showAll}
          setShowAll={setShowAll}
          totalCount={filteredAchievements.length}
          visibleCount={displayedAchievements.length}
        />
      )}

      {filteredAchievements.length === 0 && (
        <p className="text-center text-gray-400 py-8 text-sm">No achievements found for this filter.</p>
      )}
    </div>
  )
}