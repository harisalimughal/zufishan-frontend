import { Coins, History } from 'lucide-react'

export function HeaderPoints() {
  return (
    <div className="flex items-center gap-3 flex-shrink-0">
      <div className="bg-[#111827] border border-[#27272A] rounded-xl px-4 py-2 flex items-center gap-2.5">
        <Coins className="text-yellow-400" size={20} />
        <div>
          <p className="text-[10px] text-gray-400 whitespace-nowrap">
            AI Tutor Points
          </p>
          <p className="font-bold text-white text-sm">
            1,250
          </p>
        </div>
      </div>

      <div className="w-10 h-10 rounded-full bg-[#1F2937] border border-[#27272A] flex items-center justify-center hover:bg-[#2A2A3A] transition cursor-pointer group">
        <History size={20} className="text-gray-400 group-hover:text-[#10b981] transition" />
      </div>
    </div>
  )
}
