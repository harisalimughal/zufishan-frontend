import { Sparkles, ArrowRight } from 'lucide-react'

const recommendations = [
  {
    title: "SQL Practice Quiz",
    description: "Test your SQL knowledge",
    details: "12 Questions",
    icon: "📝"
  },
  {
    title: "Database Normalization Guide",
    description: "Complete normalization tutorial",
    details: "15 min read",
    icon: "📖"
  },
  {
    title: "ER Diagram Basics",
    description: "Learn to design ER diagrams",
    details: "8 min video",
    icon: "📐"
  }
]

export function SidebarRecommendations() {
  return (
    <div className="flex-shrink-0">
      {/* Header with View All button on the right */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-300 flex items-center gap-1.5">
          <Sparkles size={15} className="text-yellow-400" />
          Recommended for You
        </h3>
        <button className="text-[10px] text-primary-400 hover:text-primary-300 transition-colors duration-300 flex items-center gap-1">
          <span>View all</span>
          <ArrowRight size={12} />
        </button>
      </div>
      
      <div className="space-y-2">
        {recommendations.map((rec, index) => (
          <div
            key={index}
            className="bg-[#1a1a2e] rounded-lg p-3"
          >
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded bg-[#2a2a4a] flex items-center justify-center flex-shrink-0">
                <span className="text-sm">{rec.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-200 text-sm">
                  {rec.title}
                </h4>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  {rec.description}
                </p>
                <span className="text-[10px] text-gray-500 mt-1 block">
                  {rec.details}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}