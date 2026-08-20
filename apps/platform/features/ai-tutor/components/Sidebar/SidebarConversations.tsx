import { Clock, ArrowRight } from 'lucide-react'

const recentConversations = [
  { 
    title: "Explain normalization in DBMS", 
    date: "Yesterday",
    icon: "📚"
  },
  { 
    title: "What is an index in SQL?", 
    date: "Yesterday",
    icon: "🔍"
  },
  { 
    title: "Difference between DELETE and TRUNCATE", 
    date: "2 days ago",
    icon: "🗑️"
  },
  { 
    title: "Write a query to find 2nd highest salary", 
    date: "3 days ago",
    icon: "📊"
  },
  { 
    title: "Explain ACID properties", 
    date: "3 days ago",
    icon: "⚡"
  }
]

export function SidebarConversations() {
  return (
    <div className="flex-shrink-0 mb-3 pb-3 border-b border-[#2a4a6a]">
      {/* Header with View All button on the right */}
      <div className="flex items-center justify-between mb-2.5">
        <h3 className="text-sm font-semibold text-white flex items-center gap-1.5">
          <Clock size={15} className="text-[#10b981]" />
          Recent Conversations
        </h3>
        <button className="text-[10px] text-[#10b981] hover:text-primary-400 transition-colors duration-300 flex items-center gap-1 group">
          <span>View all</span>
          <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
      
      <div className="space-y-1.5">
        {recentConversations.map((conv, index) => (
          <div
            key={index}
            className="flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-[#1a2a4a] transition cursor-pointer group"
          >
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <span className="text-sm flex-shrink-0">{conv.icon}</span>
              <span className="text-xs text-gray-300 truncate group-hover:text-white transition">
                {conv.title}
              </span>
            </div>
            <span className="text-[10px] text-gray-500 flex-shrink-0 ml-2">
              {conv.date}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}