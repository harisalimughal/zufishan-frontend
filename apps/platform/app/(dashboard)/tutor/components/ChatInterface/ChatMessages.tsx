'use client'

import { useState, useRef, useEffect } from 'react'
import { Bot, User, Sparkles, ThumbsUp, Copy } from 'lucide-react'

interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
  isToday?: boolean
}

const initialMessages: Message[] = [
  {
    id: '1',
    content: "Hi Harry! 🎉\n\nI'm your AI Tutor. I can help you understand concepts, solve problems, explain topics, and much more. What would you like to learn today?",
    role: 'assistant',
    timestamp: new Date()
  },
  {
    id: '2',
    content: "Explain 3NF with example",
    role: 'user',
    timestamp: new Date()
  },
  {
    id: '3',
    content: "How does a foreign key work in a relational database?",
    role: 'user',
    timestamp: new Date()
  },
  {
    id: '4',
    content: `Great question! 👩‍🎓

A foreign key is a field (or combination of fields) in one table that refers to the primary key in another table. It helps to:
• Maintain referential integrity
• Prevent invalid data
• Establish relationships between tables

Example:

| ID (PK) | Name    | DeptID (FK) |
|---------|---------|-------------|
| 1       | Alice   | 10          |
| 2       | Bob     | 20          |
| 3       | Charlie | 10          |

Departments Table

| DeptID (PK) | DeptName    |
|-------------|-------------|
| 10          | Computer Science |
| 20          | Information Systems |

Here, DeptID in Students table is a foreign key that refers to DeptID in Departments table.

Let me know if you'd like a SQL example! 😊`,
    role: 'assistant',
    timestamp: new Date(),
    isToday: true
  }
]

const suggestionButtons = [
  "Explain 3NF with example",
  "Difference between WHERE and HAVING",
  "SQL JOIN types",
  "More suggestions"
]

export function ChatMessages() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [isTyping, setIsTyping] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const handleSuggestionClick = (suggestion: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content: suggestion,
      role: 'user',
      timestamp: new Date(),
      isToday: true
    }
    setMessages(prev => [...prev, userMessage])
    
    setIsTyping(true)
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `Great choice! Let me explain "${suggestion}" in detail for you. 📚\n\nHere's what you need to know:\n\n✅ Key concepts explained\n✅ Real-world examples\n✅ Best practices\n\nWould you like me to dive deeper into any specific aspect?`,
        role: 'assistant',
        timestamp: new Date(),
        isToday: true
      }
      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <div 
      ref={scrollContainerRef}
      className="absolute inset-0 overflow-y-auto px-6 py-4 space-y-6 scrollbar-thin scrollbar-thumb-[#27272A] scrollbar-track-transparent"
      style={{ 
        overscrollBehavior: 'contain',
        scrollBehavior: 'smooth'
      }}
    >
      {messages.map((msg, index) => (
        <div key={msg.id}>
          {msg.role === 'user' ? (
            <div className="flex justify-end">
              <div className="bg-[#3B82F6] px-5 py-3 rounded-2xl max-w-lg flex items-start gap-3 shadow-lg shadow-blue-500/10">
                <User size={18} className="mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white whitespace-pre-wrap text-sm">
                    {msg.content}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex">
              <div className="bg-[#1F2937] border border-[#27272A] rounded-2xl p-5 max-w-2xl w-full flex gap-4">
                <Bot className="text-[#3B82F6] mt-1 flex-shrink-0" size={20} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="font-semibold text-white flex items-center gap-2">
                      AI Tutor
                      <Sparkles size={15} className="text-yellow-400" />
                    </h3>
                    {msg.isToday && (
                      <span className="text-xs text-gray-500">Today</span>
                    )}
                  </div>
                  <div className="text-gray-300 whitespace-pre-wrap text-sm leading-relaxed">
                    {msg.content.split('\n').map((line, i) => {
                      if (line.startsWith('•')) {
                        return (
                          <div key={i} className="flex items-start gap-2 mt-1">
                            <span className="text-[#3B82F6] mt-0.5">•</span>
                            <span>{line.substring(1).trim()}</span>
                          </div>
                        )
                      }
                      if (line.startsWith('✅')) {
                        return (
                          <div key={i} className="flex items-start gap-2 mt-0.5">
                            <span className="text-green-400 mt-0.5">✅</span>
                            <span>{line.substring(1).trim()}</span>
                          </div>
                        )
                      }
                      if (line.includes('|')) {
                        return (
                          <div key={i} className="mt-2 overflow-x-auto">
                            <pre className="text-xs bg-[#111827] p-2 rounded-lg border border-[#27272A] font-mono">
                              {line}
                            </pre>
                          </div>
                        )
                      }
                      if (line.trim().startsWith('**')) {
                        return (
                          <p key={i} className="font-semibold text-white mt-2">
                            {line.replace(/\*\*/g, '')}
                          </p>
                        )
                      }
                      return line ? <p key={i} className="mb-1">{line}</p> : <br key={i} />
                    })}
                  </div>
                  
                  {index === messages.length - 1 && msg.role === 'assistant' && (
                    <div className="mt-4 pt-3 border-t border-[#27272A]">
                      <div className="flex flex-wrap gap-2">
                        {suggestionButtons.map((suggestion, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="px-3 py-1.5 rounded-full bg-[#220066] text-xs text-gray-300 hover:bg-[#3B82F6] hover:text-white transition-all duration-300 border border-transparent hover:border-[#3B82F6]"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2 mt-4 pt-3 border-t border-[#27272A]">
                    <button className="p-1.5 rounded-lg hover:bg-[#111827] transition group">
                      <ThumbsUp size={14} className="text-gray-400 group-hover:text-white transition" />
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-[#111827] transition group">
                      <Copy size={14} className="text-gray-400 group-hover:text-white transition" />
                    </button>
                    <span className="text-xs text-gray-500 ml-auto">Today</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
      {isTyping && (
        <div className="flex">
          <div className="bg-[#1F2937] border border-[#27272A] rounded-2xl p-5 flex gap-4">
            <Bot className="text-[#3B82F6]" size={20} />
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-[#3B82F6] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 bg-[#3B82F6] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 bg-[#3B82F6] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}