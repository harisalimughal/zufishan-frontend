'use client'

import { Send, Mic } from 'lucide-react'

interface ChatInputProps {
  input: string
  setInput: (value: string) => void
  handleSend: () => void
  handleVoice?: () => void
  isRecording?: boolean
}

const LISTEN_BAR_HEIGHTS = [4, 9, 6, 11, 5, 8]

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
            placeholder={isRecording ? 'Listening…' : 'Ask anything about your course...'}
            disabled={isRecording}
            className="w-full bg-[#111827] border border-[#27272A] rounded-xl px-5 py-3 outline-none focus:border-[#3B82F6] transition text-white placeholder-gray-500 text-sm disabled:opacity-70"
          />
          {isRecording && (
            <div className="absolute inset-y-0 right-4 flex items-center gap-[3px]">
              {LISTEN_BAR_HEIGHTS.map((h, i) => (
                <span
                  key={i}
                  className="w-[3px] rounded-full bg-red-500 animate-bounce"
                  style={{ height: h, animationDelay: `${i * 100}ms` }}
                />
              ))}
            </div>
          )}
        </div>
        <button
          onClick={handleVoice}
          disabled={!handleVoice || isRecording}
          className={`px-4 rounded-xl transition-all duration-300 flex items-center justify-center flex-shrink-0 ${
            isRecording
              ? 'bg-red-500 shadow-lg shadow-red-500/20'
              : 'bg-[#27272A] hover:bg-[#3a3a3e]'
          }`}
        >
          <Mic size={18} className={`${isRecording ? 'text-white animate-pulse' : 'text-gray-400'}`} />
        </button>
        <button
          onClick={handleSend}
          className="bg-[#3B82F6] px-6 rounded-xl hover:bg-blue-600 transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 flex-shrink-0"
          disabled={!input?.trim() || isRecording}
        >
          <Send size={18} className="text-white" />
        </button>
      </div>

      <div className="flex items-center justify-center">
        <p className="text-[10px] text-gray-500 text-center">
          {isRecording ? 'Listening… speak now' : 'Renanla Tutor can make mistakes. Please verify important information.'}
        </p>
      </div>
    </div>
  )
}