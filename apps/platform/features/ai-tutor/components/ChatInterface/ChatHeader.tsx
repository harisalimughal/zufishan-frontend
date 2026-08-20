import { Bot } from 'lucide-react'

export function ChatHeader() {
  return (
    <div className="border-b border-[#27272A] p-6 flex items-center gap-4 flex-shrink-0">
      <div className="w-14 h-14 rounded-full bg-[#220066] flex items-center justify-center">
        <Bot className="text-[#10b981]" size={30} />
      </div>
      <div className="flex-1">
        <h2 className="text-xl font-bold text-white">
          Hi Harry! 👋
        </h2>
        <p className="text-gray-400 text-sm">
          I&apos;m your Renanla Tutor. Ask anything about databases.
        </p>
      </div>
    </div>
  )
}