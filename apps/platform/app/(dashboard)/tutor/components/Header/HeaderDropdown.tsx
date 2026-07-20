import { Database, ChevronDown } from 'lucide-react'

interface HeaderDropdownProps {
  selectedCourse: string
  setSelectedCourse: (value: string) => void
}

export function HeaderDropdown({ selectedCourse, setSelectedCourse }: HeaderDropdownProps) {
  return (
    <div className="flex-1 flex justify-center px-4">
      <div className="relative w-[220px]">
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="w-full bg-[#111827] border border-[#27272A] rounded-lg pl-10 pr-8 py-2 text-white focus:outline-none focus:border-[#3B82F6] transition text-sm appearance-none cursor-pointer"
        >
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
