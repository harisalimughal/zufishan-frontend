"use client";

import { useState, useEffect, useRef } from "react";
import {
  Mic, MicOff, Video, VideoOff, Hand, MonitorUp,
  FileText, Circle, MoreHorizontal, PhoneOff,
  Send, Download, ThumbsUp, Smile, ChevronLeft,
  Users, MoreVertical, X, Volume2, VolumeX
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface ChatMessage {
  id: number;
  name: string;
  time: string;
  avatar: string;
  avatarColor: string;
  message: string;
  isAI: boolean;
  attachment?: { name: string; size: string; color: string };
  likes?: number;
}

interface Reaction {
  emoji: string;
  count: number;
}

interface StudentEntry {
  id: string;
  label: string;
  color: string;
  muted: boolean;
}

interface QAItem {
  name: string;
  time: string;
  avatar: string;
  avatarColor: string;
  question: string;
}

type TabType = "Chat" | "People" | "Notes" | "Q&A";

// ─── Constants ───────────────────────────────────────────────────────────────

const JOINING_NAMES: string[] = [
  "Ali Hassan", "Maria Garcia", "John Smith", "Priya Patel", "Chen Wei",
  "Fatima Al-Zahra", "David Kim", "Ananya Roy", "Omar Khalid", "Sofia Rossi",
  "James Wilson", "Yuki Tanaka", "Carlos Mendez", "Aisha Noor", "Ryan Park",
  "Emma Johnson", "Liam Brown", "Noah Davis", "Olivia Wilson", "Ethan Moore",
];

const AVATAR_COLORS: string[] = [
  "#6D5DFC", "#EC4899", "#F59E0B", "#22C55E", "#3B82F6",
  "#EF4444", "#8B5CF6", "#06B6D4", "#F97316", "#10B981",
];

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 1, name: "Sarah Khan", time: "08:12 AM",
    avatar: "SK", avatarColor: "#EC4899", isAI: false,
    message: "Professor, can you explain the difference between classification and regression with an example?",
  },
  {
    id: 2, name: "Prof. Lucas (AI)", time: "08:13 AM",
    avatar: "PL", avatarColor: "#6D5DFC", isAI: true,
    message: "Great question, Sarah! Classification predicts discrete categories, while regression predicts continuous values. Let me show you an example.",
    attachment: { name: "Classification_vs_Regression.pdf", size: "1.2 MB", color: "#EF4444" },
    likes: 15,
  },
  {
    id: 3, name: "Michael Thomas", time: "08:14 AM",
    avatar: "MT", avatarColor: "#F59E0B", isAI: false,
    message: "That makes sense now, thank you! 🙌",
  },
  {
    id: 4, name: "Priya Mehta", time: "08:15 AM",
    avatar: "PM", avatarColor: "#22C55E", isAI: false,
    message: "Can you share the supervised learning cheat sheet?",
  },
  {
    id: 5, name: "Prof. Lucas (AI)", time: "08:15 AM",
    avatar: "PL", avatarColor: "#6D5DFC", isAI: true,
    message: "Sure! Here you go 👇",
    attachment: { name: "Supervised_Learning_CheatSheet.pdf", size: "842 KB", color: "#6D5DFC" },
    likes: 21,
  },
];

const QA_ITEMS: QAItem[] = [
  { name: "Alex Johnson", time: "08:16 AM", avatar: "AJ", avatarColor: "#8B5CF6", question: "When should we use regularization in a model?" },
  { name: "Sofia Rossi", time: "08:17 AM", avatar: "SR", avatarColor: "#06B6D4", question: "Is a random forest always better than a single decision tree?" },
];

const BOTTOM_STUDENTS: StudentEntry[] = [
  { id: "you", label: "You", color: "#6D5DFC", muted: false },
  { id: "sarah", label: "Sarah K.", color: "#EC4899", muted: true },
  { id: "michael", label: "Michael T.", color: "#F59E0B", muted: true },
  { id: "priya", label: "Priya M.", color: "#22C55E", muted: true },
  { id: "james", label: "James L.", color: "#3B82F6", muted: true },
];

const INITIAL_REACTIONS: Reaction[] = [
  { emoji: "👋", count: 12 },
  { emoji: "👍", count: 25 },
  { emoji: "❤️", count: 18 },
  { emoji: "👏", count: 7 },
  { emoji: "🎉", count: 5 },
];

const AI_REPLIES: string[] = [
  "Great question! Let me elaborate on that concept for you.",
  "That's exactly the right way to think about it! Here's more detail...",
  "Excellent observation! In machine learning theory, this is a fundamental concept.",
  "I'm glad you asked! This is a common area of confusion. Let me clarify.",
  "Perfect timing — we were just about to cover that in the next slide!",
];

const TABS: TabType[] = ["Chat", "People", "Notes", "Q&A"];

const NOTES_CONTENT = [
  { title: "Labeled Data", body: "Every training example has a known correct output. The model learns to map inputs to these labels." },
  { title: "Regression", body: "Predicts continuous values, such as a price or a temperature, from the input features." },
  { title: "Classification", body: "Predicts a discrete category, such as spam or not spam, from the input features." },
];

const WAVE_HEIGHTS = [3, 6, 4, 7, 5];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getTime(): string {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function getRandomReply(): string {
  return AI_REPLIES[Math.floor(Math.random() * AI_REPLIES.length)];
}

function getInitials(name: string): string {
  return name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2);
}

function getColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

// ─── Avatar ──────────────────────────────────────────────────────────────────

function AvatarCircle({ initials, color, size = 36 }: { initials: string; color: string; size?: number }) {
  return (
    <div style={{
      width: size, height: size, minWidth: size, borderRadius: "50%",
      background: color, display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.33, fontWeight: 700, color: "#fff", flexShrink: 0,
    }}>
      {initials}
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function ClassroomPreview() {
  const [activeTab, setActiveTab] = useState<TabType>("Chat");
  const [raiseHandActive, setRaiseHandActive] = useState<boolean>(false);
  const [micActive, setMicActive] = useState<boolean>(false);
  const [cameraActive, setCameraActive] = useState<boolean>(true);
  const [chatInput, setChatInput] = useState<string>("");
  const [pulse, setPulse] = useState<boolean>(true);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isLeft, setIsLeft] = useState<boolean>(false);
  const [presentStudents, setPresentStudents] = useState<string[]>(["You"]);
  const [reactions, setReactions] = useState<Reaction[]>(INITIAL_REACTIONS);
  const [likedMessages, setLikedMessages] = useState<Set<number>>(new Set());
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(true);
  const [newQA, setNewQA] = useState<string>("");
  const [qaItems, setQaItems] = useState<QAItem[]>(QA_ITEMS);
  const [hasStarted, setHasStarted] = useState<boolean>(false);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const nextIdRef = useRef<number>(6);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-connect to class after a brief delay
  useEffect(() => {
    const t = setTimeout(() => setHasStarted(true), 3000);
    return () => clearTimeout(t);
  }, []);

  // Pulse animation
  useEffect(() => {
    const t = setInterval(() => setPulse((p) => !p), 1200);
    return () => clearInterval(t);
  }, []);

  // Auto scroll chat (scoped to the chat panel only, not the whole page)
  useEffect(() => {
    const el = chatEndRef.current;
    if (el?.parentElement) {
      el.parentElement.scrollTop = el.parentElement.scrollHeight;
    }
  }, [messages, isTyping]);

  // Live student join/leave
  useEffect(() => {
    const scheduleNext = () => {
      timerRef.current = setTimeout(() => {
        setPresentStudents((current) => {
          const canLeave = current.filter((n) => n !== "You");
          const shouldLeave = canLeave.length >= 3 && Math.random() < 0.25;
          if (shouldLeave) {
            const name = canLeave[Math.floor(Math.random() * canLeave.length)];
            return current.filter((n) => n !== name);
          }
          const remaining = JOINING_NAMES.filter((n) => !current.includes(n));
          if (remaining.length === 0) return current;
          const name = remaining[Math.floor(Math.random() * remaining.length)];
          return [...current, name];
        });
        scheduleNext();
      }, 2500 + Math.random() * 4000);
    };
    scheduleNext();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  const studentCount = presentStudents.length + 243;

  // Send chat message
  const handleSend = () => {
    const text = chatInput.trim();
    if (!text || isLeft) return;
    const userMsg: ChatMessage = {
      id: nextIdRef.current++, name: "You", time: getTime(),
      avatar: "Y", avatarColor: "#6D5DFC", message: text, isAI: false,
    };
    setMessages((prev) => [...prev, userMsg]);
    setChatInput("");
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const aiMsg: ChatMessage = {
        id: nextIdRef.current++, name: "Prof. Lucas (AI)", time: getTime(),
        avatar: "PL", avatarColor: "#6D5DFC", message: getRandomReply(), isAI: true, likes: 0,
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 1800);
  };

  // Like a message
  const handleLike = (id: number) => {
    if (likedMessages.has(id)) return;
    setLikedMessages((prev) => new Set([...prev, id]));
    setMessages((prev) => prev.map((m) => m.id === id ? { ...m, likes: (m.likes ?? 0) + 1 } : m));
  };

  // React with emoji
  const handleReaction = (emoji: string) => {
    setReactions((prev) => prev.map((r) => r.emoji === emoji ? { ...r, count: r.count + 1 } : r));
  };

  // Submit a Q&A question
  const handleAskQuestion = () => {
    const text = newQA.trim();
    if (!text) return;
    const newItem: QAItem = {
      name: "You", time: getTime(), avatar: "Y", avatarColor: "#6D5DFC", question: text,
    };
    setQaItems((prev) => [...prev, newItem]);
    setNewQA("");
  };

  const handleLeave = () => { setIsLeft(true); setMicActive(false); setCameraActive(false); setRaiseHandActive(false); setIsRecording(false); };
  const handleRejoin = () => { setIsLeft(false); };

  // ── Pre-join / connecting screen ──
  if (!hasStarted) {
    return (
      <section style={{ background: "#09090B", padding: "24px", fontFamily: "'Inter', 'Geist', sans-serif", minHeight: "calc(100vh - 120px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" as const, maxWidth: 420 }}>
          <div style={{ width: 64, height: 64, margin: "0 auto 20px", borderRadius: "50%", border: "3px solid #27272A", borderTopColor: "#6D5DFC", animation: "spin 0.8s linear infinite" }} />
          <h3 style={{ color: "#fff", fontSize: 20, fontWeight: 700, marginBottom: 6 }}>Connecting to class…</h3>
          <p style={{ color: "#A1A1AA", fontSize: 13 }}>Setting up your mic, camera and chat</p>
        </div>
      </section>
    );
  }

  // ── Left screen ──
  if (isLeft) {
    return (
      <section style={{ background: "#09090B", padding: "96px 24px", fontFamily: "'Inter', 'Geist', sans-serif", minHeight: 500, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" as const }}>
          <div style={{ fontSize: 52, marginBottom: 16 }}>👋</div>
          <h3 style={{ color: "#fff", fontSize: 24, fontWeight: 700, marginBottom: 8 }}>You left the class</h3>
          <p style={{ color: "#A1A1AA", marginBottom: 24 }}>Machine Learning 101 is still in session</p>
          <button onClick={handleRejoin} style={{ background: "#6D5DFC", border: "none", borderRadius: 10, padding: "12px 28px", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
            Rejoin Class
          </button>
        </div>
      </section>
    );
  }

  return (
    <>
      <section style={{ background: "#09090B", padding: "24px 24px 64px", fontFamily: "'Inter', 'Geist', sans-serif", overflowX: "hidden" as const }}>

        {/* ── Main Classroom UI ── */}
        <div style={{ maxWidth: 1400, width: "100%", margin: "0 auto", background: "#0D1117", borderRadius: 20, overflow: "hidden", border: "1px solid #1F2937", boxShadow: "0 40px 100px rgba(0,0,0,0.7)" }}>

          {/* ── Top Bar ── */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 20px", background: "#111827", borderBottom: "1px solid #1F2937" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <button style={{ background: "none", border: "none", cursor: "pointer", color: "#A1A1AA", display: "flex", alignItems: "center" }}>
                <ChevronLeft size={18} />
              </button>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>Machine Learning 101</span>
                  <span style={{ background: "#6D5DFC", color: "#fff", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 999, letterSpacing: "0.05em" }}>Live</span>
                </div>
                <div style={{ color: "#A1A1AA", fontSize: 11, marginTop: 1 }}>Prof. Lucas (AI)</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#22C55E", boxShadow: pulse ? "0 0 6px #22C55E" : "none", transition: "box-shadow 0.6s" }} />
                <span style={{ color: "#A1A1AA", fontSize: 12 }}>Live Class • 08:00 AM - 09:30 AM</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 5, color: "#A1A1AA", fontSize: 12 }}>
                <Users size={13} />
                <span>{studentCount} Students</span>
              </div>
            </div>
            <button style={{ background: "none", border: "none", cursor: "pointer", color: "#A1A1AA", display: "flex", alignItems: "center" }}>
              <MoreVertical size={18} />
            </button>
          </div>

          {/* ── Content Row ── */}
          <div className="flex flex-col lg:flex-row lg:h-[560px]">

            {/* ── Video Area ── */}
            <div className="relative bg-[#070B14] overflow-hidden min-w-0 h-56 sm:h-72 lg:h-auto lg:flex-1">
              <iframe
                key={isVideoMuted ? "muted" : "unmuted"}
                src={`https://player.cloudinary.com/embed/?cloud_name=lgyepgcr&public_id=Renanla-Tutor_uyw0sh&profile=cld-default&autoplay=true&muted=${isVideoMuted}&loop=true&controls=false`}
                title="Renanla Tutor live class preview"
                style={{ position: "absolute" as const, top: 0, left: 0, width: "100%", height: "100%", border: "none", opacity: cameraActive ? 1 : 0, transition: "opacity 0.4s" }}
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
              <button
                type="button"
                onClick={() => setIsVideoMuted((v) => !v)}
                aria-label={isVideoMuted ? "Unmute video" : "Mute video"}
                style={{ position: "absolute" as const, bottom: 14, right: 14, zIndex: 3, background: "rgba(10,15,30,0.75)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
              >
                {isVideoMuted ? <VolumeX size={16} color="#fff" /> : <Volume2 size={16} color="#fff" />}
              </button>
              {!cameraActive && (
                <div style={{ position: "absolute" as const, inset: 0, background: "#070B14", display: "flex", flexDirection: "column" as const, alignItems: "center", justifyContent: "center", gap: 12 }}>
                  <div style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg, #6D5DFC, #A78BFA)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 800, color: "#fff" }}>PL</div>
                  <span style={{ color: "#A1A1AA", fontSize: 13 }}>Prof. Lucas (AI)</span>
                </div>
              )}

              {/* AI Badge */}
              <div style={{ position: "absolute" as const, top: 14, left: 14, zIndex: 3 }}>
                <div style={{ background: "#6D5DFC", borderRadius: 6, padding: "3px 10px", fontSize: 10, fontWeight: 700, color: "#fff", letterSpacing: "0.08em", marginBottom: 6, display: "inline-block" }}>AI PROFESSOR</div>
                <div style={{ color: "#fff", fontWeight: 800, fontSize: 22, lineHeight: 1, textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}>Prof. Lucas</div>
                <div style={{ color: "#A78BFA", fontSize: 12, marginTop: 2, textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}>Machine Learning <span style={{ fontWeight: 700 }}>Expert</span></div>
              </div>

              {/* Talking indicator */}
              <div style={{ position: "absolute" as const, bottom: 14, left: 14, zIndex: 3, display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ display: "flex", gap: 2, alignItems: "flex-end" }}>
                  {WAVE_HEIGHTS.map((h, i) => (
                    <div key={i} style={{ width: 3, height: h, background: "#22C55E", borderRadius: 2, animation: `wave 0.8s ease-in-out ${i * 0.1}s infinite alternate` }} />
                  ))}
                </div>
                <span style={{ color: "#E5E5E5", fontSize: 12, textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}>Prof. Lucas is talking</span>
              </div>

              {/* Recording indicator */}
              {isRecording && (
                <div style={{ position: "absolute" as const, top: 14, right: 14, zIndex: 3, display: "flex", alignItems: "center", gap: 6, background: "rgba(239,68,68,0.2)", border: "1px solid rgba(239,68,68,0.4)", borderRadius: 999, padding: "4px 10px" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#EF4444", animation: "pulse 1s infinite" }} />
                  <span style={{ color: "#EF4444", fontSize: 11, fontWeight: 600 }}>REC</span>
                </div>
              )}
            </div>

            {/* ── Right Panel ── */}
            <div
              className="flex h-80 lg:h-auto w-full lg:w-[300px] flex-shrink-0 flex-col border-t border-[#1F2937] lg:border-t-0 lg:border-l"
              style={{ background: "#111827" }}
            >

              {/* Tabs */}
              <div style={{ display: "flex", borderBottom: "1px solid #1F2937" }}>
                {TABS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{ flex: 1, background: "none", border: "none", borderBottom: activeTab === tab ? "2px solid #6D5DFC" : "2px solid transparent", padding: "12px 4px", marginBottom: -1, fontSize: 11, fontWeight: 600, color: activeTab === tab ? "#A78BFA" : "#6B7280", cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" as const, transition: "color 0.2s" }}
                  >
                    {tab}{tab === "People" && <span style={{ marginLeft: 3, fontWeight: 400 }}>({studentCount})</span>}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div style={{ flex: 1, overflowY: "auto" as const, padding: "12px", display: "flex", flexDirection: "column" as const, gap: 14 }}>

                {/* CHAT */}
                {activeTab === "Chat" && (
                  <>
                    {messages.map((msg) => (
                      <div key={msg.id} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <AvatarCircle initials={msg.avatar} color={msg.avatarColor} size={32} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
                            <span style={{ color: msg.isAI ? "#A78BFA" : "#fff", fontSize: 13, fontWeight: 700 }}>{msg.name}</span>
                            <span style={{ color: "#4B5563", fontSize: 10 }}>{msg.time}</span>
                          </div>
                          {msg.isAI ? (
                            <div style={{ background: "rgba(109,93,252,0.12)", border: "1px solid rgba(109,93,252,0.2)", borderRadius: "4px 12px 12px 12px", padding: "10px 12px" }}>
                              <div style={{ color: "#E4E4E7", fontSize: 12, lineHeight: 1.6 }}>{msg.message}</div>
                              {msg.attachment && (
                                <div style={{ marginTop: 8, background: "#1F2937", borderRadius: 8, padding: "8px 10px", display: "flex", alignItems: "center", gap: 8 }}>
                                  <div style={{ width: 28, height: 28, borderRadius: 6, background: msg.attachment.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                    <FileText size={14} color="#fff" />
                                  </div>
                                  <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ color: "#E4E4E7", fontSize: 11, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const }}>{msg.attachment.name}</div>
                                    <div style={{ color: "#6B7280", fontSize: 10 }}>{msg.attachment.size}</div>
                                  </div>
                                  <Download size={14} color="#6B7280" style={{ cursor: "pointer", flexShrink: 0 }} />
                                </div>
                              )}
                              {msg.likes !== undefined && (
                                <button
                                  onClick={() => handleLike(msg.id)}
                                  style={{ marginTop: 8, background: "none", border: "none", display: "flex", alignItems: "center", gap: 4, cursor: "pointer", padding: 0, fontFamily: "inherit" }}
                                >
                                  <ThumbsUp size={12} color={likedMessages.has(msg.id) ? "#6D5DFC" : "#6B7280"} />
                                  <span style={{ color: likedMessages.has(msg.id) ? "#6D5DFC" : "#6B7280", fontSize: 11 }}>{msg.likes}</span>
                                </button>
                              )}
                            </div>
                          ) : (
                            <div style={{ color: "#D1D5DB", fontSize: 12, lineHeight: 1.6 }}>{msg.message}</div>
                          )}
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                        <AvatarCircle initials="PL" color="#6D5DFC" size={32} />
                        <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
                          {[0, 1, 2].map((i) => (
                            <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "#A78BFA", animation: `bounce 1s ease-in-out ${i * 0.15}s infinite`, opacity: 0.7 }} />
                          ))}
                        </div>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </>
                )}

                {/* PEOPLE */}
                {activeTab === "People" && (
                  <>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <AvatarCircle initials="PL" color="#6D5DFC" size={32} />
                      <div style={{ flex: 1 }}>
                        <div style={{ color: "#A78BFA", fontSize: 13, fontWeight: 600 }}>Prof. Lucas (AI)</div>
                        <div style={{ color: "#6B7280", fontSize: 11 }}>Professor</div>
                      </div>
                      <span style={{ background: "rgba(109,93,252,0.2)", color: "#A78BFA", fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 4 }}>AI</span>
                    </div>
                    {presentStudents.map((name) => (
                      <div key={name} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                        <AvatarCircle initials={getInitials(name)} color={getColor(name)} size={32} />
                        <div style={{ flex: 1 }}>
                          <div style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>{name}</div>
                          <div style={{ color: "#6B7280", fontSize: 11 }}>Student</div>
                        </div>
                        {name === "You" && (
                          <span style={{ background: "rgba(109,93,252,0.15)", color: "#A78BFA", fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 4 }}>You</span>
                        )}
                      </div>
                    ))}
                    <div style={{ color: "#4B5563", fontSize: 11, textAlign: "center" as const, marginTop: 4 }}>+ 243 more students online</div>
                  </>
                )}

                {/* NOTES */}
                {activeTab === "Notes" && (
                  <>
                    <div style={{ color: "#A78BFA", fontSize: 11, fontWeight: 600, marginBottom: 4 }}>📝 Machine Learning 101 — Today&apos;s Notes</div>
                    {NOTES_CONTENT.map((note) => (
                      <div key={note.title} style={{ background: "rgba(109,93,252,0.08)", border: "1px solid rgba(109,93,252,0.2)", borderRadius: 8, padding: "10px 12px" }}>
                        <div style={{ color: "#fff", fontSize: 12, fontWeight: 700, marginBottom: 4 }}>{note.title}</div>
                        <div style={{ color: "#9CA3AF", fontSize: 11, lineHeight: 1.6 }}>{note.body}</div>
                      </div>
                    ))}
                  </>
                )}

                {/* Q&A */}
                {activeTab === "Q&A" && (
                  <>
                    <div style={{ color: "#A78BFA", fontSize: 11, fontWeight: 600, marginBottom: 4 }}>❓ Student Questions</div>
                    {qaItems.map((item, idx) => (
                      <div key={idx} style={{ background: "#1F2937", borderRadius: 10, padding: "12px 14px" }}>
                        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
                          <AvatarCircle initials={item.avatar} color={item.avatarColor} size={26} />
                          <span style={{ color: "#fff", fontSize: 12, fontWeight: 600 }}>{item.name}</span>
                          <span style={{ color: "#4B5563", fontSize: 10, marginLeft: "auto" }}>{item.time}</span>
                        </div>
                        <div style={{ color: "#D1D5DB", fontSize: 12, lineHeight: 1.5 }}>{item.question}</div>
                      </div>
                    ))}
                    {/* Ask new question */}
                    <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
                      <input
                        value={newQA}
                        onChange={(e) => setNewQA(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleAskQuestion()}
                        placeholder="Ask a question..."
                        style={{ flex: 1, background: "#1F2937", border: "1px solid #374151", borderRadius: 8, padding: "8px 10px", color: "#fff", fontSize: 12, outline: "none", fontFamily: "inherit" }}
                      />
                      <button
                        onClick={handleAskQuestion}
                        disabled={!newQA.trim()}
                        style={{ background: newQA.trim() ? "#6D5DFC" : "rgba(109,93,252,0.3)", border: "none", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 12, fontWeight: 600, cursor: newQA.trim() ? "pointer" : "not-allowed", fontFamily: "inherit" }}
                      >
                        Ask
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Chat Input */}
              {activeTab === "Chat" && (
                <div style={{ borderTop: "1px solid #1F2937", padding: "10px 12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#1F2937", borderRadius: 10, padding: "8px 12px" }}>
                    <input
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
                      placeholder="Type your message..."
                      style={{ flex: 1, background: "none", border: "none", color: "#fff", fontSize: 12, outline: "none", fontFamily: "inherit" }}
                    />
                    <Smile size={16} color="#6B7280" style={{ cursor: "pointer", flexShrink: 0 }} />
                    <button
                      onClick={handleSend}
                      disabled={!chatInput.trim()}
                      style={{ background: chatInput.trim() ? "#6D5DFC" : "rgba(109,93,252,0.3)", border: "none", borderRadius: 8, width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", cursor: chatInput.trim() ? "pointer" : "not-allowed", flexShrink: 0 }}
                    >
                      <Send size={13} color="#fff" />
                    </button>
                  </div>
                </div>
              )}

              {/* Ask a Question footer */}
              {activeTab === "Chat" && (
                <div style={{ borderTop: "1px solid #1F2937", padding: "10px 12px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ color: "#fff", fontSize: 12, fontWeight: 600 }}>Ask a Question</span>
                    <button
                      onClick={() => setActiveTab("Q&A")}
                      style={{ background: "none", border: "none", color: "#6D5DFC", fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}
                    >
                      View all
                    </button>
                  </div>
                  {qaItems.slice(0, 1).map((item, idx) => (
                    <div key={idx} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <AvatarCircle initials={item.avatar} color={item.avatarColor} size={26} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <span style={{ color: "#9CA3AF", fontSize: 11, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const, display: "block" }}>{item.question}</span>
                      </div>
                      <button
                        onClick={() => setActiveTab("Q&A")}
                        style={{ background: "#6D5DFC", border: "none", borderRadius: 6, padding: "4px 10px", color: "#fff", fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", flexShrink: 0 }}
                      >
                        Ask
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── Student Thumbnails + Reactions ── */}
          <div style={{ background: "#111827", borderTop: "1px solid #1F2937", padding: "10px 20px", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" as const }}>
            {BOTTOM_STUDENTS.map((s) => (
              <div key={s.id} style={{ display: "flex", flexDirection: "column" as const, alignItems: "center", gap: 4 }}>
                <div style={{ width: 52, height: 52, borderRadius: 10, background: s.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "#fff", position: "relative" as const, border: s.id === "you" ? "2px solid #6D5DFC" : "2px solid transparent" }}>
                  {s.label[0]}
                  <div style={{ position: "absolute" as const, bottom: -4, right: -4, width: 16, height: 16, borderRadius: "50%", background: s.muted ? "#EF4444" : "#22C55E", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #111827" }}>
                    {s.muted ? <MicOff size={8} color="#fff" /> : <Mic size={8} color="#fff" />}
                  </div>
                </div>
                <span style={{ color: "#6B7280", fontSize: 10 }}>{s.label}</span>
              </div>
            ))}
            <div style={{ display: "flex", flexDirection: "column" as const, alignItems: "center", gap: 4 }}>
              <div style={{ width: 52, height: 52, borderRadius: 10, background: "#1F2937", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#A1A1AA" }}>
                +{studentCount - 5}
              </div>
              <span style={{ color: "#6B7280", fontSize: 10 }}>Students</span>
            </div>
            <div style={{ marginLeft: "auto", display: "flex", gap: 8, flexWrap: "wrap" as const }}>
              {reactions.map((r) => (
                <button
                  key={r.emoji}
                  onClick={() => handleReaction(r.emoji)}
                  style={{ background: "#1F2937", border: "1px solid #374151", borderRadius: 999, padding: "5px 10px", display: "flex", alignItems: "center", gap: 5, cursor: "pointer", fontFamily: "inherit", transition: "background 0.2s" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#374151"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#1F2937"; }}
                >
                  <span style={{ fontSize: 14 }}>{r.emoji}</span>
                  <span style={{ color: "#E4E4E7", fontSize: 12, fontWeight: 500 }}>{r.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* ── Bottom Controls ── */}
          <div style={{ background: "#0D1117", borderTop: "1px solid #1F2937", padding: "14px 28px", display: "flex", alignItems: "center", justifyContent: "center", gap: 20, flexWrap: "wrap" as const }}>

            {[
              {
                icon: micActive ? <Mic size={18} color="#A78BFA" /> : <MicOff size={18} color="#6B7280" />,
                label: micActive ? "Mute" : "Unmute",
                active: micActive,
                onClick: () => setMicActive((v) => !v),
              },
              {
                icon: cameraActive ? <Video size={18} color="#A78BFA" /> : <VideoOff size={18} color="#6B7280" />,
                label: cameraActive ? "Stop Video" : "Start Video",
                active: cameraActive,
                onClick: () => setCameraActive((v) => !v),
              },
              {
                icon: <Hand size={18} color={raiseHandActive ? "#fff" : "#6B7280"} />,
                label: "Raise Hand",
                active: raiseHandActive,
                highlight: raiseHandActive,
                onClick: () => setRaiseHandActive((v) => !v),
              },
              {
                icon: <MonitorUp size={18} color="#6B7280" />,
                label: "Share Screen",
                active: false,
                onClick: () => {},
              },
              {
                icon: <FileText size={18} color="#6B7280" />,
                label: "Smart Notes",
                active: false,
                onClick: () => setActiveTab("Notes"),
              },
              {
                icon: <Circle size={18} color={isRecording ? "#EF4444" : "#6B7280"} />,
                label: isRecording ? "Stop Rec" : "Record",
                active: isRecording,
                recordActive: isRecording,
                onClick: () => setIsRecording((v) => !v),
              },
              {
                icon: <MoreHorizontal size={18} color="#6B7280" />,
                label: "More",
                active: false,
                onClick: () => {},
              },
            ].map((ctrl) => (
              <div key={ctrl.label} style={{ display: "flex", flexDirection: "column" as const, alignItems: "center", gap: 6 }}>
                <button
                  onClick={ctrl.onClick}
                  style={{
                    width: 44, height: 44, borderRadius: "50%",
                    background: ctrl.highlight
                      ? "rgba(109,93,252,0.9)"
                      : ctrl.recordActive
                      ? "rgba(239,68,68,0.15)"
                      : ctrl.active
                      ? "rgba(109,93,252,0.15)"
                      : "#1F2937",
                    border: ctrl.highlight
                      ? "1px solid #6D5DFC"
                      : ctrl.recordActive
                      ? "1px solid rgba(239,68,68,0.4)"
                      : ctrl.active
                      ? "1px solid rgba(109,93,252,0.4)"
                      : "1px solid #374151",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", transition: "all 0.2s",
                  }}
                >
                  {ctrl.icon}
                </button>
                <span style={{ color: ctrl.highlight ? "#A78BFA" : "#6B7280", fontSize: 10 }}>{ctrl.label}</span>
              </div>
            ))}

            <button
              onClick={handleLeave}
              style={{ background: "#EF4444", border: "none", borderRadius: 999, padding: "12px 24px", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, fontFamily: "inherit", marginLeft: 8 }}
            >
              <PhoneOff size={16} />
              Leave Class
            </button>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
        @keyframes wave { from { transform: scaleY(0.5); } to { transform: scaleY(1.5); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </>
  );
}