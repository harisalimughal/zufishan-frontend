"use client";

import { useRef, useState } from 'react'
import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { ChatActions } from "./ChatActions";
import { ChatInput } from "./ChatInput";

export interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
  isToday?: boolean
}

const initialMessages: Message[] = [
  {
    id: '1',
    content: "Hi Harry! 😊\n\nI'm your Renanla Tutor. I can help you understand concepts, solve problems, explain topics, and much more. What would you like to learn today?",
    role: 'assistant',
    timestamp: new Date()
  }
]

const DUMMY_REPLIES = [
  `Great question! Let me break that down for you. 📚\n\nHere's what you need to know:\n\n✅ Key concepts explained\n✅ Real-world examples\n✅ Best practices\n\nWould you like me to dive deeper into any specific aspect?`,
  `Sure thing! Here's a quick summary:\n\n✅ Start with the core definition\n✅ Walk through a worked example\n✅ Common mistakes to avoid\n\nLet me know if you'd like a practice question on this.`,
  `Good one. Breaking it down step by step:\n\n✅ What it means\n✅ Why it matters\n✅ How it's used in practice\n\nWant me to quiz you on this next?`
]

const VOICE_QUESTIONS = [
  "Can you explain 3NF with an example?",
  "What's the difference between WHERE and HAVING?",
  "Explain the different SQL JOIN types.",
  "What is database normalization?"
]

export function ChatInterface() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [isTyping, setIsTyping] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const replyIndexRef = useRef(0)

  const sendMessage = (text: string) => {
    if (!text.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: text,
      role: 'user',
      timestamp: new Date(),
      isToday: true
    }
    setMessages(prev => [...prev, userMessage])
    setIsTyping(true)

    setTimeout(() => {
      const reply = DUMMY_REPLIES[replyIndexRef.current % DUMMY_REPLIES.length]
      replyIndexRef.current += 1
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: reply,
        role: 'assistant',
        timestamp: new Date(),
        isToday: true
      }
      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleSend = () => {
    if (!input.trim() || isRecording) return
    sendMessage(input)
    setInput('')
  }

  const handleVoice = () => {
    if (isRecording) return
    setInput('')
    setIsRecording(true)

    setTimeout(() => {
      const question = VOICE_QUESTIONS[Math.floor(Math.random() * VOICE_QUESTIONS.length)]
      setIsRecording(false)
      sendMessage(question)
    }, 2200)
  }

  return (
    <div className="bg-[#111827] border border-[#27272A] rounded-2xl overflow-hidden h-full flex flex-col">
      <ChatHeader />
      <div className="flex-1 min-h-0 relative">
        <ChatMessages messages={messages} isTyping={isTyping} onSuggestionClick={sendMessage} />
      </div>
      <ChatActions />
      <ChatInput
        input={input}
        setInput={setInput}
        handleSend={handleSend}
        handleVoice={handleVoice}
        isRecording={isRecording}
      />
    </div>
  )
}
