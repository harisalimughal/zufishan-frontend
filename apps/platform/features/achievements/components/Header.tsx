'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Trophy, Database, ChevronDown, Coins, HelpCircle, X } from 'lucide-react'

// ============================================
// Header Logo Component
// ============================================
function HeaderLogo() {
  return (
    <div className="flex items-center gap-3 flex-shrink-0">
      <div className="w-10 h-10 rounded-xl bg-[#220066] flex items-center justify-center">
        <Trophy className="text-[#3B82F6]" size={24} />
      </div>
      <div>
        <h1 className="text-lg font-bold text-white">Achievements</h1>
        <p className="text-gray-400 text-[10px]">Celebrate your milestones and keep growing!</p>
      </div>
    </div>
  )
}

// ============================================
// Header Dropdown Component
// ============================================
interface HeaderDropdownProps {
  selectedCourse: string
  setSelectedCourse: (value: string) => void
}

function HeaderDropdown({ selectedCourse, setSelectedCourse }: HeaderDropdownProps) {
  return (
    <div className="w-full sm:flex-1 flex justify-center px-0 sm:px-4">
      <div className="relative w-full sm:w-[220px]">
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="w-full bg-[#111827] border border-[#27272A] rounded-lg pl-10 pr-8 py-2 text-white focus:outline-none focus:border-[#3B82F6] transition text-sm appearance-none cursor-pointer"
        >
          <option>All Courses</option>
          <option>Database 101</option>
          <option>Operating Systems</option>
          <option>React</option>
          <option>Data Structures</option>
          <option>Algorithms</option>
        </select>
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <Database size={16} className="text-[#3B82F6]" />
        </div>
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <ChevronDown size={16} className="text-gray-400" />
        </div>
      </div>
    </div>
  )
}

// ============================================
// Header Points Component
// ============================================
function HeaderPoints() {
  const [showHowItWorks, setShowHowItWorks] = useState(false)

  return (
    <div className="flex items-center gap-3 flex-shrink-0">
      <div className="bg-[#111827] border border-[#27272A] rounded-xl px-4 py-2 flex items-center gap-2.5">
        <Coins className="text-yellow-400" size={20} />
        <div>
          <p className="text-[10px] text-gray-400 whitespace-nowrap">Total Points</p>
          <p className="font-bold text-white text-sm">1,250</p>
        </div>
      </div>

      {/* How it works button - replaces history icon */}
      <button
        onClick={() => setShowHowItWorks(true)}
        className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1F2937] border border-[#27272A] text-xs text-gray-300 hover:text-white hover:border-[#3B82F6] transition"
      >
        <HelpCircle size={16} className="text-[#3B82F6]" />
        <span>How it works</span>
      </button>

      <AnimatePresence>
        {showHowItWorks && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            onClick={() => setShowHowItWorks(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#111827] border border-[#27272A] rounded-2xl w-full max-w-md p-6 relative shadow-2xl"
            >
              <button
                onClick={() => setShowHowItWorks(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <X size={18} />
              </button>
              <h3 className="text-base font-semibold text-white mb-2">How Achievements Work</h3>
              <p className="text-xs text-gray-400 mb-3">
                You earn badges and XP by staying active across your courses — attending live classes, submitting assignments, and keeping up your streak.
              </p>
              <ul className="space-y-1.5 text-xs text-gray-400 list-disc list-inside">
                <li>Complete course activities to unlock new badges</li>
                <li>Each badge awards XP that adds to your total points</li>
                <li>Some badges track progress and unlock automatically once complete</li>
                <li>Climb the leaderboard by earning more XP than other students</li>
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ============================================
// Main Header Component
// ============================================
export function Header() {
  const [selectedCourse, setSelectedCourse] = useState('All Courses')

  return (
    <header className="border-b border-[#27272A] bg-black px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center gap-3 sm:justify-between flex-shrink-0">
      <HeaderLogo />
      <HeaderDropdown 
        selectedCourse={selectedCourse}
        setSelectedCourse={setSelectedCourse}
      />
      <HeaderPoints />
    </header>
  )
}