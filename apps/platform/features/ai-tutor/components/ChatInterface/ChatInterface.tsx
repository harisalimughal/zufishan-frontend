'use client'

import { useState } from 'react'
import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { ChatActions } from "./ChatActions";
import { ChatInput } from "./ChatInput";

export function ChatInterface() {
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (!input.trim()) return
    console.log('Sending:', input)
    setInput('')
  }

  return (
    <div className="bg-[#111827] border border-[#27272A] rounded-2xl overflow-hidden h-full flex flex-col">
      <ChatHeader />
      <div className="flex-1 min-h-0 relative">
        <ChatMessages />
      </div>
      <ChatActions />
      <ChatInput 
        input={input}
        setInput={setInput}
        handleSend={handleSend}
      />
    </div>
  )
}