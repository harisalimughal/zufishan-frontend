import { Clock, GraduationCap, Sparkles, Database, Code } from 'lucide-react'

export function SidebarStudyAssistant() {
  return (
    <div className="flex-shrink-0 mb-3 pb-3 border-b border-[#2a4a6a]">
      <h2 className="text-sm font-semibold text-white mb-2.5 flex items-center gap-1.5">
        <Sparkles size={15} className="text-[#3B82F6]" />
        Your Study Assistant
      </h2>
      
      <div className="space-y-2.5">
        <div className="flex items-start gap-2.5">
          <div className="w-6 h-6 rounded-lg bg-[#0d1b3e] flex items-center justify-center flex-shrink-0 mt-0.5">
            <Clock size={13} className="text-[#3B82F6]" />
          </div>
          <div>
            <h3 className="text-xs font-medium text-white">24/7 Availability</h3>
            <p className="text-[10px] text-gray-400">Learn anytime, anywhere</p>
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <div className="w-6 h-6 rounded-lg bg-[#0d1b3e] flex items-center justify-center flex-shrink-0 mt-0.5">
            <GraduationCap size={13} className="text-[#3B82F6]" />
          </div>
          <div>
            <h3 className="text-xs font-medium text-white">Personalized Help</h3>
            <p className="text-[10px] text-gray-400">Tailored explanations just for you</p>
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <div className="w-6 h-6 rounded-lg bg-[#0d1b3e] flex items-center justify-center flex-shrink-0 mt-0.5">
            <Database size={13} className="text-[#3B82F6]" />
          </div>
          <div>
            <h3 className="text-xs font-medium text-white">Step-by-Step Solutions</h3>
            <p className="text-[10px] text-gray-400">Detailed breakdowns for better understanding</p>
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <div className="w-6 h-6 rounded-lg bg-[#0d1b3e] flex items-center justify-center flex-shrink-0 mt-0.5">
            <Code size={13} className="text-[#3B82F6]" />
          </div>
          <div>
            <h3 className="text-xs font-medium text-white">Multiple Formats</h3>
            <p className="text-[10px] text-gray-400">Text, examples, analogies &amp; more</p>
          </div>
        </div>
      </div>
    </div>
  )
}