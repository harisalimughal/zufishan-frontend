"use client";
/* eslint-disable @next/next/no-img-element */

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Sparkles,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Hand,
  FileText,
  MoreHorizontal,
  Send,
  Check
} from "lucide-react";

interface ChatMessage {
  id: string;
  user: string;
  time: string;
  text: string;
  avatarColor: string;
  isAI?: boolean;
  diagram?: boolean;
}

const initialMessages: ChatMessage[] = [
  {
    id: "1",
    user: "Sarah",
    time: "08:15 AM",
    text: "Professor, can you explain normalization with an example?",
    avatarColor: "bg-blue-500"
  },
  {
    id: "2",
    user: "AI Professor Lucas",
    time: "08:16 AM",
    text: "Great question, Sarah! Let me show you a practical example using a Students table...",
    avatarColor: "bg-[#6D5DFC]",
    isAI: true,
    diagram: true
  },
  {
    id: "3",
    user: "James",
    time: "08:17 AM",
    text: "That makes sense, thank you! 🤝",
    avatarColor: "bg-emerald-500"
  }
];

export function HeroVideoPreview() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [activeTab, setActiveTab] = useState<"Chat" | "People" | "Notes">("Chat");
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [professorSpeech, setProfessorSpeech] = useState(
    "In Third Normal Form (3NF), all attributes must depend only on the primary key, eliminating transitive dependency."
  );

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat to bottom (scoped to chat container only)
  useEffect(() => {
    const el = chatEndRef.current;
    if (el?.parentElement) {
      el.parentElement.scrollTop = el.parentElement.scrollHeight;
    }
  }, [messages]);

  // Periodic lecture speech changes to simulate a live class
  useEffect(() => {
    const speeches = [
      "In Third Normal Form (3NF), all attributes must depend only on the primary key, eliminating transitive dependency.",
      "Look at the database diagram in the chat. Note how the Enrollments table acts as a bridge.",
      "If we have student_id determining major, and major determining major_advisor, that is transitive!",
      "To resolve this, we decompose the table so that every non-key column depends solely on the key.",
      "Nexora's AI automatically compiles these diagrams and summaries in your 'Notes' tab in real time."
    ];
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % speeches.length;
      setProfessorSpeech(speeches[idx]);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      user: "You",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: inputValue,
      avatarColor: "bg-[#3B82F6]"
    };

    setMessages((prev) => [...prev, userMsg]);
    const userQuestion = inputValue;
    setInputValue("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        user: "AI Professor Lucas",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: `Regarding "${userQuestion}": In our schema, we ensure referential integrity by linking foreign keys directly. Let me add this to your notes.`,
        avatarColor: "bg-[#6D5DFC]",
        isAI: true
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 150, damping: 20 }}
      className="relative max-w-5xl mx-auto w-full px-4 mb-16 group"
    >
      {/* Background Glow Ring */}
      <div className="absolute -inset-2 bg-gradient-to-r from-[#3B82F6]/40 via-[#6D5DFC]/30 to-[#A78BFA]/45 rounded-2xl blur-3xl opacity-75 pointer-events-none transition-opacity duration-300 group-hover:opacity-95" />

      {/* Main Glassmorphic Panel */}
      <div className="relative flex flex-col w-full rounded-2xl bg-[#09090B]/90 border border-[#27272A] shadow-[0_0_50px_rgba(0,0,0,0.85),_0_0_30px_rgba(59,130,246,0.15)] group-hover:shadow-[0_0_50px_rgba(0,0,0,0.85),_0_0_40px_rgba(109,93,252,0.25)] group-hover:border-[#3B82F6]/30 transition-all duration-500 overflow-hidden">
        {/* Card Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-5 py-4 bg-[#111827]/30 border-b border-[#27272A] backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/10 border border-red-500/20 text-red-500 uppercase tracking-wider">
              Live
            </span>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-white leading-none flex items-center gap-1.5">
                Database 101
              </h4>
              <span className="text-[10.5px] text-gray-500">Today, 08:00 AM - 09:30 AM</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium text-gray-400 self-end sm:self-auto">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live Class</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full text-[11px]">
              <Users className="w-3.5 h-3.5 text-gray-400" />
              <span>243</span>
            </div>
          </div>
        </div>

        {/* Classroom Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 h-[650px]">

          {/* Left Block - Professor webcam feed & screen space */}
          <div className="lg:col-span-2 min-h-[420px] sm:min-h-[480px] lg:min-h-0 relative flex flex-col justify-between p-5 bg-gradient-to-b from-transparent to-black/40 border-b lg:border-b-0 lg:border-r border-[#27272A] overflow-hidden group">

            {/* The main video container */}
            <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden z-0">
              <img
                src="/professor.png"
                alt="AI Professor Lucas lecturing"
                className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/40" />
            </div>

            {/* Top Indicator overlay */}
            <div className="relative z-10 flex justify-between w-full">
              <div className="px-3.5 py-1.5 bg-black/60 border border-white/10 rounded-full text-[11px] text-white font-semibold flex items-center gap-2 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-[#3B82F6]" />
                <span>AI Professor Lucas</span>
                <span className="w-3.5 h-3.5 rounded-full bg-[#3B82F6]/20 border border-[#3B82F6]/30 flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 text-white" />
                </span>
              </div>
            </div>

            {/* Bottom Section: Speech Subtitles overlay & Controls */}
            <div className="relative z-10 w-full space-y-4 mt-auto">

              {/* Live transcript bubble */}
              <div className="w-full bg-black/75 border border-white/10 rounded-2xl p-3 sm:p-4 backdrop-blur-md">
                <p className="text-xs sm:text-sm font-medium text-gray-100 text-center leading-relaxed">
                  &ldquo;{professorSpeech}&rdquo;
                </p>
              </div>

              {/* Feed Controls Bar */}
              <div className="flex items-center justify-between gap-3 w-full bg-black/40 border border-white/5 rounded-xl px-4 py-2.5 backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsMicOn(!isMicOn)}
                    className={`p-2 rounded-lg border transition-all duration-200 cursor-pointer ${isMicOn
                      ? "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                      : "bg-red-500/10 border-red-500/20 text-red-500 hover:bg-red-500/20"
                      }`}
                  >
                    {isMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => setIsVideoOn(!isVideoOn)}
                    className={`p-2 rounded-lg border transition-all duration-200 cursor-pointer ${isVideoOn
                      ? "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                      : "bg-red-500/10 border-red-500/20 text-red-500 hover:bg-red-500/20"
                      }`}
                  >
                    {isVideoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsHandRaised(!isHandRaised)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-xs font-semibold transition-all duration-200 cursor-pointer ${isHandRaised
                      ? "bg-[#6D5DFC] border-[#6D5DFC] text-white hover:opacity-90"
                      : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                      }`}
                  >
                    <Hand className="w-3.5 h-3.5" />
                    <span>{isHandRaised ? "Hand Raised" : "Raise Hand"}</span>
                  </button>

                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-xs font-semibold text-gray-300 hover:bg-white/10 transition-all cursor-pointer">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Notes</span>
                  </button>

                  <button className="p-2 rounded-lg border border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 transition-all cursor-pointer">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Block - Sidebar Panel (Chat, People, Notes) */}
          <div className="flex flex-col bg-[#111827]/20 backdrop-blur-md justify-between h-full">

            {/* Sidebar Tabs */}
            <div className="flex border-b border-[#27272A] px-3 bg-[#111827]/10">
              {(["Chat", "People", "Notes"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3 text-xs font-bold transition-all relative cursor-pointer ${activeTab === tab ? "text-[#3B82F6]" : "text-gray-500 hover:text-gray-300"
                    }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3B82F6]"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Tab Contents */}
            <div className="flex-1 min-h-0 p-4 overflow-y-auto space-y-4">
              {activeTab === "Chat" && (
                <>
                  <div className="space-y-4">
                    {messages.map((msg) => (
                      <div key={msg.id} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white ${msg.avatarColor}`}>
                              {msg.user[0]}
                            </div>
                            <span className="text-[11px] font-bold text-gray-200">{msg.user}</span>
                            {msg.isAI && (
                              <span className="px-1 py-0.5 rounded text-[8px] bg-[#6D5DFC]/10 border border-[#6D5DFC]/20 text-[#A78BFA] font-mono font-bold scale-90">
                                PROFESSOR
                              </span>
                            )}
                          </div>
                          <span className="text-[9px] text-gray-500">{msg.time}</span>
                        </div>

                        <div className="pl-7 pr-2">
                          <div className={`p-3 rounded-2xl text-xs leading-relaxed ${msg.isAI ? "bg-[#6D5DFC]/10 text-gray-200 border border-[#6D5DFC]/25" : "bg-white/5 text-gray-300"
                            }`}>
                            <p>{msg.text}</p>

                            {/* Visual Database Schema Diagram if specified */}
                            {msg.diagram && (
                              <div className="mt-4 p-3 bg-black/60 border border-white/5 rounded-xl space-y-3 font-mono text-[9px]">
                                <div className="grid grid-cols-3 gap-2 items-center text-center">
                                  {/* Table Students */}
                                  <div className="border border-white/10 rounded p-1 bg-white/5">
                                    <div className="font-bold border-b border-white/10 pb-0.5 mb-1 text-blue-400">Students</div>
                                    <div className="text-[8px] text-gray-400">id (PK)<br />name<br />email</div>
                                  </div>

                                  {/* Arrow */}
                                  <div className="flex flex-col items-center text-gray-600 font-bold">
                                    <span>→</span>
                                    <span className="text-[7px]">1:N</span>
                                  </div>

                                  {/* Table Enrollments */}
                                  <div className="border border-white/10 rounded p-1 bg-white/5">
                                    <div className="font-bold border-b border-white/10 pb-0.5 mb-1 text-purple-400">Enrollments</div>
                                    <div className="text-[8px] text-gray-400">student_id (FK)<br />course_id (FK)<br />grade</div>
                                  </div>
                                </div>

                                <div className="flex justify-center items-center text-gray-600 font-bold -my-1.5">
                                  <span className="rotate-90">←</span>
                                </div>

                                <div className="grid grid-cols-3 gap-2 items-center text-center">
                                  <div className="col-span-2"></div>
                                  {/* Table Courses */}
                                  <div className="border border-white/10 rounded p-1 bg-white/5">
                                    <div className="font-bold border-b border-white/10 pb-0.5 mb-1 text-emerald-400">Courses</div>
                                    <div className="text-[8px] text-gray-400">id (PK)<br />credits</div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={chatEndRef} />
                  </div>
                </>
              )}

              {activeTab === "People" && (
                <div className="space-y-3 text-left">
                  <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Queue (Raised Hands)</div>
                  {isHandRaised ? (
                    <div className="flex items-center justify-between p-2 rounded-lg bg-[#6D5DFC]/10 border border-[#6D5DFC]/20">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#3B82F6] flex items-center justify-center text-[10px] font-bold text-white">Y</span>
                        <span className="text-xs font-semibold text-gray-300">You</span>
                      </div>
                      <span className="text-[10px] text-[#A78BFA] font-bold flex items-center gap-1">
                        <Hand className="w-3 h-3" /> Acknowledged
                      </span>
                    </div>
                  ) : (
                    <div className="text-xs text-gray-500 italic p-2 bg-white/5 border border-white/5 rounded-lg">No hands raised currently.</div>
                  )}

                  <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mt-4 mb-2">Classroom Attendees (243)</div>
                  <div className="space-y-2">
                    {["Sarah", "James", "Elena Rostova", "Liam Patel", "Sofia Wang"].map((name, i) => (
                      <div key={name} className="flex items-center gap-2 p-1.5 hover:bg-white/5 rounded transition-colors">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white ${i === 0 ? "bg-blue-500" : i === 1 ? "bg-emerald-500" : "bg-gray-600"
                          }`}>
                          {name[0]}
                        </div>
                        <span className="text-xs text-gray-300">{name}</span>
                        {name === "Sarah" && <span className="text-[9px] text-gray-500 ml-auto">Active</span>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "Notes" && (
                <div className="space-y-3 text-left font-sans text-xs">
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-2">
                    <h5 className="font-bold text-[#3B82F6]">Live AI Summary: Normalization</h5>
                    <p className="text-gray-400 leading-relaxed text-[11px]">
                      The class is currently exploring normalization levels with a focus on Third Normal Form (3NF).
                    </p>
                    <ul className="list-disc list-inside text-gray-500 text-[10.5px] space-y-1 pt-1.5 border-t border-white/5">
                      <li>First Normal Form (1NF): Atomic values</li>
                      <li>Second Normal Form (2NF): Full functional dependency</li>
                      <li>Third Normal Form (3NF): Non-transitive dependency</li>
                    </ul>
                  </div>

                  <div className="p-3 bg-black/30 border border-white/5 rounded-lg text-center text-gray-500 text-[11px]">
                    💾 Notes will auto-sync to your dashboard after class.
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Bottom Input Area — always rendered to preserve height */}
            <form
              onSubmit={handleSendMessage}
              className={`p-3 border-t border-[#27272A] bg-black/40 flex items-center gap-2 transition-opacity duration-150 ${activeTab === "Chat"
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
                }`}
            >
              <input
                type="text"
                placeholder="Ask a question..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                tabIndex={activeTab === "Chat" ? 0 : -1}
                className="flex-1 bg-white/5 border border-[#27272A] rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 transition-colors"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                tabIndex={activeTab === "Chat" ? 0 : -1}
                className={`p-2.5 rounded-xl transition-all duration-300 cursor-pointer ${inputValue.trim()
                  ? "bg-[#3B82F6] text-white hover:opacity-90"
                  : "bg-white/5 text-gray-600 cursor-not-allowed"
                  }`}
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
