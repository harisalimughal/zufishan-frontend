import { Sparkles, ArrowRight } from 'lucide-react'

const recommendations = [
  {
    title: "SQL Practice Q&A",
    description: "Test your SQL knowledge",
    details: "12 Questions",
    icon: "📝"
  },
  {
    title: "Database Normalization",
    description: "Complete normalization",
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
      <div className="flex items-center justify-between mb-2.5">
        <h3 className="text-sm font-semibold text-white flex items-center gap-1.5">
          <Sparkles size={15} className="text-yellow-400" />
          Recommended for You
        </h3>
        <button className="text-[10px] text-[#3B82F6] hover:text-blue-400 transition-colors duration-300 flex items-center gap-1 group">
          <span>View all</span>
          <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
      
      <div className="space-y-2">
        {recommendations.map((rec, index) => (
          <div
            key={index}
            className="bg-[#1a2a4a] rounded-xl p-3 hover:bg-[#1e3a5f] transition cursor-pointer group border border-[#2a4a6a] hover:border-[#3B82F6]"
          >
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#0d1b3e] flex items-center justify-center flex-shrink-0">
                <span className="text-base">{rec.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-white text-xs group-hover:text-[#3B82F6] transition">
                  {rec.title}
                </h4>
                <p className="text-[10px] text-gray-300 mt-0.5">
                  {rec.description}
                </p>
                <div className="mt-1.5 inline-flex items-center">
                  <span className="text-[10px] bg-[#3B82F6] text-white px-2 py-0.5 rounded-full">
                    {rec.details}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}