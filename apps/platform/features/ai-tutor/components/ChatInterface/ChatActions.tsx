import { Lightbulb, HelpCircle, FileText, Brain, MoreHorizontal } from 'lucide-react'

const quickActions = [
  { label: "Explain a Topic", icon: Lightbulb },
  { label: "Solve a Problem", icon: HelpCircle },
  { label: "Generate SQL", icon: FileText },
  { label: "Quiz Me", icon: Brain },
  { label: "More", icon: MoreHorizontal }
]

export function ChatActions() {
  return (
    <div className="px-5 py-3 border-t border-[#27272A] flex flex-wrap gap-2 flex-shrink-0">
      {quickActions.map((action) => (
        <button
          key={action.label}
          className="px-4 py-2 rounded-full bg-[#1F2937] text-xs text-gray-300 hover:bg-[#3B82F6] hover:text-white transition-all duration-300 flex items-center gap-2 border border-[#27272A] hover:border-[#3B82F6]"
        >
          <action.icon size={14} />
          {action.label}
        </button>
      ))}
    </div>
  )
}
