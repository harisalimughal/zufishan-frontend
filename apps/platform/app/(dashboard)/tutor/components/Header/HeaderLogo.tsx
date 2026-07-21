import { Bot } from 'lucide-react'

export function HeaderLogo() {
  return (
    <div className="flex items-center gap-3 flex-shrink-0">
      <div className="w-10 h-10 rounded-xl bg-[#220066] flex items-center justify-center">
        <Bot className="text-[#3B82F6]" size={24} />
      </div>
      <div>
        <h1 className="text-lg font-bold text-white">
          AI Tutor
        </h1>
        <p className="text-gray-400 text-[10px]">
          Your 24/7 AI Learning Companion
        </p>
      </div>
    </div>
  )
}
