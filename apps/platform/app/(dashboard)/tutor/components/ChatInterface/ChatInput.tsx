'use client'

import { Send, Mic } from 'lucide-react'

interface ChatInputProps {
  input: string
  setInput: (value: string) => void
  handleSend: () => void
  handleVoice?: () => void
  isRecording?: boolean
}

export function ChatInput({ 
  input, 
  setInput, 
  handleSend, 
  handleVoice, 
  isRecording = false 
}: ChatInputProps) {
  return (
    <div className="border-t border-[#27272A] p-5 flex flex-col gap-2 bg-[#09090B] flex-shrink-0">
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <input
            value={input || ''}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask anything about your course..."
            className="w-full bg-[#111827] border border-[#27272A] rounded-xl px-5 py-3 outline-none focus:border-[#3B82F6] transition text-white placeholder-gray-500 text-sm"
          />
        </div>
        <button 
          onClick={handleVoice}
          className={`px-4 rounded-xl transition-all duration-300 flex items-center justify-center flex-shrink-0 ${
            isRecording 
              ? 'bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/20' 
              : 'bg-[#27272A] hover:bg-[#3a3a3e]'
          }`}
          disabled={!handleVoice}
        >
          <Mic size={18} className={`${isRecording ? 'text-white animate-pulse' : 'text-gray-400'}`} />
        </button>
        <button 
          onClick={handleSend}
          className="bg-[#3B82F6] px-6 rounded-xl hover:bg-blue-600 transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 flex-shrink-0"
          disabled={!input?.trim()}
        >
          <Send size={18} className="text-white" />
        </button>
      </div>
      
      <div className="flex items-center justify-center">
        <p className="text-[10px] text-gray-500 text-center">
          AI Tutor can make mistakes. Please verify important information.
        </p>
      </div>
    </div>
  )
}