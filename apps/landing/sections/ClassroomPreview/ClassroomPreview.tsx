"use client";

import { useState, useEffect, useRef } from "react";
import {
  Mic,
  MicOff,
  Hand,
  MessageCircle,
  FileText,
  Users,
  Video,
  VideoOff,
  MonitorUp,
  MoreHorizontal,
  Send,
  LogOut,
  File,
  X,
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
  attachment?: { name: string; size: string };
}

interface Student {
  id: string;
  label: string;
  color: string;
}

interface FeaturePill {
  icon: React.ElementType;
  label: string;
  modalTitle: string;
  modalDesc: string;
  modalPoints: string[];
  accentColor: string;
}

type TabType = "Chat" | "People" | "Notes";

// ─── Feature Pills ────────────────────────────────────────────────────────────

const FEATURE_PILLS: FeaturePill[] = [
  {
    icon: Mic,
    label: "AI Professors",
    modalTitle: "Meet Your AI Professor",
    modalDesc: "Nexora's AI Professors are powered by advanced language models trained on academic content. They teach, respond, and adapt — just like a real professor.",
    modalPoints: [
      "🎓 Teaches live classes in real time",
      "💬 Answers your questions instantly",
      "📊 Adapts explanations to your level",
      "🔁 Available 24/7 for review sessions",
    ],
    accentColor: "#6D5DFC",
  },
  {
    icon: Hand,
    label: "Raise Hand",
    modalTitle: "Raise Your Hand",
    modalDesc: "Just like in a real classroom, you can raise your hand to get the professor's attention. The AI Professor will acknowledge you and call on you.",
    modalPoints: [
      "✋ Signal the professor you have a question",
      "📋 Get added to the question queue",
      "🔔 Receive a notification when called on",
      "🎤 Unmute automatically when acknowledged",
    ],
    accentColor: "#6D5DFC",
  },
  {
    icon: MessageCircle,
    label: "Live Q&A",
    modalTitle: "Live Q&A Sessions",
    modalDesc: "Ask questions in real time and get instant responses from the AI Professor. Other students can upvote questions they also want answered.",
    modalPoints: [
      "⚡ Get answers instantly during class",
      "👍 Upvote questions from other students",
      "📌 Pin important Q&A for later review",
      "📁 Full Q&A saved after every class",
    ],
    accentColor: "#6D5DFC",
  },
  {
    icon: FileText,
    label: "Smart Notes",
    modalTitle: "AI-Powered Smart Notes",
    modalDesc: "Nexora automatically generates structured notes from every class. Never miss a key point — focus on learning while we handle the note-taking.",
    modalPoints: [
      "📝 Auto-generated from every lecture",
      "🏷️ Organized by topic and timestamp",
      "📤 Export as PDF anytime",
      "🔍 Searchable across all your classes",
    ],
    accentColor: "#6D5DFC",
  },
  {
    icon: Users,
    label: "Collaborative Learning",
    modalTitle: "Learn Together",
    modalDesc: "Connect with classmates from around the world. Form study groups, collaborate on projects, and learn from each other's perspectives.",
    modalPoints: [
      "🌍 Students from 50+ countries",
      "👥 Form study groups after class",
      "🤝 Peer review and group projects",
      "🏆 Leaderboards and team challenges",
    ],
    accentColor: "#6D5DFC",
  },
];

// ─── Constants ───────────────────────────────────────────────────────────────

const JOINING_NAMES = [
  "Ali Hassan", "Maria Garcia", "John Smith", "Priya Patel", "Chen Wei",
  "Fatima Al-Zahra", "David Kim", "Ananya Roy", "Omar Khalid", "Sofia Rossi",
  "James Wilson", "Yuki Tanaka", "Carlos Mendez", "Aisha Noor", "Ryan Park",
  "Emma Johnson", "Liam Brown", "Noah Davis", "Olivia Wilson", "Ethan Moore",
];

const AVATAR_COLORS = [
  "#6D5DFC", "#EC4899", "#F59E0B", "#22C55E", "#3B82F6",
  "#EF4444", "#8B5CF6", "#06B6D4", "#F97316", "#10B981",
];

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 1,
    name: "Sarah Khan",
    time: "08:12 AM",
    avatar: "SK",
    avatarColor: "#6D5DFC",
    message: "Professor, can you explain the difference between 2NF and 3NF with an example?",
    isAI: false,
  },
  {
    id: 2,
    name: "AI Professor Lucas",
    time: "08:13 AM",
    avatar: "L",
    avatarColor: "#A78BFA",
    message: "Great question, Sarah! Let me show you with a practical example.",
    isAI: true,
    attachment: { name: "Normalization_Example.pdf", size: "1.2 MB" },
  },
  {
    id: 3,
    name: "James Lee",
    time: "08:14 AM",
    avatar: "JL",
    avatarColor: "#22C55E",
    message: "This makes so much sense now, thank you! 🔥",
    isAI: false,
  },
];

const BOTTOM_STUDENTS: Student[] = [
  { id: "you", label: "You", color: "#6D5DFC" },
  { id: "sarah", label: "Sarah K.", color: "#EC4899" },
  { id: "michael", label: "Michael T.", color: "#F59E0B" },
  { id: "priya", label: "Priya M.", color: "#22C55E" },
];

const TABS: TabType[] = ["Chat", "People", "Notes"];

const NOTES_CONTENT = [
  { title: "1NF – Atomic Values", body: "Each column must contain atomic (indivisible) values. No repeating groups." },
  { title: "2NF – Remove Partial Dependencies", body: "Must be in 1NF. Every non-key attribute must depend on the whole primary key." },
  { title: "3NF – Remove Transitive Dependencies", body: "Must be in 2NF. No transitive dependency of non-key attributes on the primary key." },
];

const AI_REPLIES = [
  "Great question! Let me elaborate on that concept for you.",
  "That's exactly the right way to think about it! Here's more detail...",
  "Excellent observation! In database theory, this is a fundamental concept.",
  "I'm glad you asked! This is a common area of confusion. Let me clarify.",
  "Perfect timing — we were just about to cover that in the next slide!",
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getTime(): string {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function getRandomReply(): string {
  return AI_REPLIES[Math.floor(Math.random() * AI_REPLIES.length)];
}

function getInitials(name: string): string {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

function getColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function AvatarCircle({ initials, color, size = 32 }: { initials: string; color: string; size?: number }) {
  return (
    <div style={{ width: size, height: size, minWidth: size, borderRadius: "50%", background: color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.34, fontWeight: 700, color: "#fff", flexShrink: 0 }}>
      {initials}
    </div>
  );
}

function FeatureModal({ pill, onClose }: { pill: FeaturePill; onClose: () => void }) {
  const Icon = pill.icon;
  return (
    <div onClick={onClose} style={{ position: "fixed" as const, inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: "#111827", border: `1px solid ${pill.accentColor}44`, borderRadius: 20, padding: "32px", maxWidth: 440, width: "100%", boxShadow: `0 0 60px ${pill.accentColor}22, 0 32px 80px rgba(0,0,0,0.6)`, position: "relative" as const }}>
        <button onClick={onClose} style={{ position: "absolute" as const, top: 16, right: 16, background: "rgba(255,255,255,0.06)", border: "1px solid #27272A", borderRadius: 8, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#A1A1AA" }}>
          <X size={16} />
        </button>
        <div style={{ width: 56, height: 56, borderRadius: 14, background: `${pill.accentColor}22`, border: `1px solid ${pill.accentColor}44`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
          <Icon size={26} color={pill.accentColor} />
        </div>
        <h3 style={{ color: "#FFFFFF", fontSize: 20, fontWeight: 800, margin: "0 0 10px 0", letterSpacing: "-0.01em" }}>{pill.modalTitle}</h3>
        <p style={{ color: "#A1A1AA", fontSize: 14, lineHeight: 1.7, margin: "0 0 20px 0" }}>{pill.modalDesc}</p>
        <div style={{ display: "flex", flexDirection: "column" as const, gap: 10 }}>
          {pill.modalPoints.map((point) => (
            <div key={point} style={{ background: `${pill.accentColor}0f`, border: `1px solid ${pill.accentColor}22`, borderRadius: 10, padding: "10px 14px", color: "#E4E4E7", fontSize: 13, lineHeight: 1.5 }}>{point}</div>
          ))}
        </div>
        <button onClick={onClose} style={{ marginTop: 24, width: "100%", background: `linear-gradient(135deg, ${pill.accentColor}, ${pill.accentColor}cc)`, border: "none", borderRadius: 12, padding: "13px", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Got it!</button>
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function ClassroomPreview() {
  const [activeTab, setActiveTab] = useState<TabType>("Chat");
  const [raiseHandActive, setRaiseHandActive] = useState(false);
  const [micActive, setMicActive] = useState(true);
  const [cameraActive, setCameraActive] = useState(true);
  const [chatInput, setChatInput] = useState("");
  const [pulse, setPulse] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [isTyping, setIsTyping] = useState(false);
  const [isLeft, setIsLeft] = useState(false);
  const [activePill, setActivePill] = useState<FeaturePill | null>(null);

  // ── Real student tracking (notification banner removed, count still live) ──
  const [presentStudents, setPresentStudents] = useState<string[]>(["You"]);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const nextIdRef = useRef(4);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Pulse animation
  useEffect(() => {
    const timer = setInterval(() => setPulse((p) => !p), 1200);
    return () => clearInterval(timer);
  }, []);

  // Auto scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // ── Real student join/leave simulation (silent, no banner) ──
  useEffect(() => {
    const scheduleNext = () => {
      const delay = 2500 + Math.random() * 4000; // 2.5s to 6.5s between events
      timerRef.current = setTimeout(() => {
        setPresentStudents((current) => {
          const canLeave = current.filter((n) => n !== "You");
          const shouldLeave = canLeave.length >= 3 && Math.random() < 0.25;

          if (shouldLeave) {
            const name = canLeave[Math.floor(Math.random() * canLeave.length)];
            return current.filter((n) => n !== name);
          } else {
            const remaining = JOINING_NAMES.filter((n) => !current.includes(n));
            if (remaining.length === 0) return current;
            const name = remaining[Math.floor(Math.random() * remaining.length)];
            return [...current, name];
          }
        });
        scheduleNext();
      }, delay);
    };

    scheduleNext();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const studentCount = presentStudents.length;

  // ── Chat ──
  const handleSend = () => {
    const text = chatInput.trim();
    if (!text || isLeft) return;
    const userMsg: ChatMessage = { id: nextIdRef.current++, name: "You", time: getTime(), avatar: "Y", avatarColor: "#6D5DFC", message: text, isAI: false };
    setMessages((prev) => [...prev, userMsg]);
    setChatInput("");
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const aiMsg: ChatMessage = { id: nextIdRef.current++, name: "AI Professor Lucas", time: getTime(), avatar: "L", avatarColor: "#A78BFA", message: getRandomReply(), isAI: true };
      setMessages((prev) => [...prev, aiMsg]);
    }, 1800);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => { if (e.key === "Enter") handleSend(); };
  const handleLeave = () => { setIsLeft(true); setMicActive(false); setCameraActive(false); setRaiseHandActive(false); };
  const handleRejoin = () => { setIsLeft(false); setMicActive(true); setCameraActive(true); };

  if (isLeft) {
    return (
      <section style={{ background: "#09090B", padding: "96px 24px", fontFamily: "'Inter', 'Geist', sans-serif", minHeight: 400, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" as const }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>👋</div>
          <h3 style={{ color: "#fff", fontSize: 24, fontWeight: 700, marginBottom: 8 }}>You left the class</h3>
          <p style={{ color: "#A1A1AA", marginBottom: 24 }}>Database 101 is still in session</p>
          <button onClick={handleRejoin} style={{ background: "#6D5DFC", border: "none", borderRadius: 10, padding: "12px 28px", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Rejoin Class</button>
        </div>
      </section>
    );
  }

  return (
    <>
      {activePill && <FeatureModal pill={activePill} onClose={() => setActivePill(null)} />}

      <section style={{ background: "#09090B", padding: "96px 24px", fontFamily: "'Inter', 'Geist', sans-serif" }}>

        {/* Badge */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(109,93,252,0.12)", border: "1px solid rgba(109,93,252,0.35)", borderRadius: 999, padding: "6px 16px" }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#6D5DFC", boxShadow: pulse ? "0 0 8px 2px #6D5DFC" : "none", transition: "box-shadow 0.6s ease" }} />
            <span style={{ color: "#A78BFA", fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" as const }}>Live Classroom Preview</span>
          </div>
        </div>

        {/* Headline */}
        <div style={{ textAlign: "center" as const, marginBottom: 20 }}>
          <h2 style={{ color: "#FFFFFF", fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 800, lineHeight: 1.15, letterSpacing: "-0.02em", margin: 0 }}>
            Experience real learning.<br />Just like a{" "}
            <span style={{ background: "linear-gradient(135deg, #6D5DFC, #A78BFA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>real classroom.</span>
          </h2>
          <p style={{ color: "#A1A1AA", fontSize: 16, lineHeight: 1.7, marginTop: 16, maxWidth: 520, marginLeft: "auto", marginRight: "auto" }}>
            Join live classes, interact with AI professors, ask questions,<br />and learn with students from around the world.
          </p>
        </div>

        {/* Feature Pills */}
        <div style={{ display: "flex", flexWrap: "wrap" as const, justifyContent: "center", gap: 28, marginBottom: 52 }}>
          {FEATURE_PILLS.map((pill) => {
            const Icon = pill.icon;
            return (
              <button key={pill.label} onClick={() => setActivePill(pill)}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  background: "transparent",
                  border: "none",
                  padding: "4px 0",
                  color: "#A1A1AA", fontSize: 13, fontWeight: 400,
                  cursor: "pointer", fontFamily: "inherit", transition: "color 0.2s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#E4E4E7"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#A1A1AA"; }}
              >
                <Icon size={14} color={pill.accentColor} strokeWidth={2} />
                {pill.label}
              </button>
            );
          })}
        </div>

        {/* Classroom Card */}
        <div style={{ maxWidth: 900, margin: "0 auto" }}>

          <div style={{ background: "#111827", border: "1px solid #27272A", borderRadius: 16, overflow: "hidden", boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(109,93,252,0.08)" }}>

            {/* Top Bar */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 18px", borderBottom: "1px solid #27272A", background: "#0D1117" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22C55E", boxShadow: pulse ? "0 0 6px #22C55E" : "none", transition: "box-shadow 0.6s" }} />
                  <span style={{ color: "#22C55E", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em" }}>LIVE</span>
                </div>
                <span style={{ color: "#FFFFFF", fontWeight: 700, fontSize: 14 }}>Database 101</span>
                <span style={{ color: "#A1A1AA", fontSize: 12 }}>08:00 AM – 09:30 AM</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5, color: "#A1A1AA", fontSize: 12 }}>
                  <Users size={13} />
                  <span>{studentCount} {studentCount === 1 ? "Student" : "Students"}</span>
                </div>
                <div style={{ display: "flex", gap: 5 }}>
                  {(["#EF4444", "#F59E0B", "#22C55E"] as const).map((c) => (
                    <div key={c} style={{ width: 11, height: 11, borderRadius: "50%", background: c }} />
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div style={{ display: "flex", height: 380 }}>

              {/* Professor Video */}
              <div style={{ flex: 1, position: "relative" as const, background: "#000", overflow: "hidden" }}>
                <iframe
                  src="https://www.youtube.com/embed/HXV3zeQKqGY?autoplay=1&mute=1&loop=1&playlist=HXV3zeQKqGY&controls=0&modestbranding=1&rel=0&showinfo=0"
                  style={{ position: "absolute" as const, top: 0, left: 0, width: "100%", height: "100%", border: "none", opacity: cameraActive ? 1 : 0, transition: "opacity 0.4s" }}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
                {!cameraActive && (
                  <div style={{ position: "absolute" as const, inset: 0, background: "#0a0a14", display: "flex", flexDirection: "column" as const, alignItems: "center", justifyContent: "center", gap: 12 }}>
                    <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(109,93,252,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <VideoOff size={28} color="#6D5DFC" />
                    </div>
                    <span style={{ color: "#A1A1AA", fontSize: 13 }}>Camera is off</span>
                  </div>
                )}
                <div style={{ position: "absolute" as const, top: 12, left: 12, background: "rgba(109,93,252,0.85)", borderRadius: 6, padding: "3px 10px", fontSize: 10, fontWeight: 700, color: "#fff", letterSpacing: "0.08em", textTransform: "uppercase" as const, zIndex: 2, backdropFilter: "blur(4px)" }}>AI Professor</div>
                <div style={{ position: "absolute" as const, bottom: 48, left: 12, zIndex: 2, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", borderRadius: 8, padding: "6px 10px" }}>
                  <div style={{ color: "#FFFFFF", fontWeight: 700, fontSize: 14, lineHeight: 1 }}>Lucas</div>
                  <div style={{ color: "#A78BFA", fontSize: 11, marginTop: 2 }}>Database Systems Expert</div>
                </div>
                {!micActive && (
                  <div style={{ position: "absolute" as const, top: 12, right: 12, background: "rgba(239,68,68,0.85)", borderRadius: 6, padding: "4px 8px", display: "flex", alignItems: "center", gap: 4, zIndex: 2 }}>
                    <MicOff size={11} color="#fff" />
                    <span style={{ color: "#fff", fontSize: 10, fontWeight: 600 }}>Muted</span>
                  </div>
                )}
              </div>

              {/* Chat Panel */}
              <div style={{ width: 248, background: "#0D1117", borderLeft: "1px solid #27272A", display: "flex", flexDirection: "column" as const, flexShrink: 0 }}>
                <div style={{ display: "flex", borderBottom: "1px solid #27272A", padding: "0 12px" }}>
                  {TABS.map((tab) => (
                    <button key={tab} onClick={() => setActiveTab(tab)}
                      style={{ background: "none", border: "none", borderBottom: activeTab === tab ? "2px solid #6D5DFC" : "2px solid transparent", padding: "10px 8px", marginBottom: -1, fontSize: 12, fontWeight: 600, color: activeTab === tab ? "#A78BFA" : "#A1A1AA", cursor: "pointer", transition: "color 0.2s", fontFamily: "inherit", whiteSpace: "nowrap" as const }}
                    >
                      {tab}
                      {tab === "People" && <span style={{ marginLeft: 4, color: "#A1A1AA", fontWeight: 400 }}>({studentCount})</span>}
                    </button>
                  ))}
                </div>

                <div style={{ flex: 1, overflowY: "auto" as const, padding: "12px", display: "flex", flexDirection: "column" as const, gap: 14 }}>

                  {/* CHAT TAB */}
                  {activeTab === "Chat" && (
                    <>
                      {messages.map((msg) => (
                        <div key={msg.id} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                          <AvatarCircle initials={msg.avatar} color={msg.avatarColor} size={28} />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 3 }}>
                              <span style={{ color: msg.isAI ? "#A78BFA" : "#FFFFFF", fontSize: 11, fontWeight: 700 }}>{msg.name}</span>
                              <span style={{ color: "#3F3F46", fontSize: 10 }}>{msg.time}</span>
                            </div>
                            <div style={{ color: "#A1A1AA", fontSize: 11, lineHeight: 1.55 }}>{msg.message}</div>
                            {msg.attachment && (
                              <div style={{ marginTop: 6, background: "rgba(109,93,252,0.12)", border: "1px solid rgba(109,93,252,0.25)", borderRadius: 6, padding: "5px 10px", display: "flex", alignItems: "center", gap: 6 }}>
                                <File size={11} color="#A78BFA" />
                                <span style={{ color: "#A78BFA", fontSize: 10, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const }}>{msg.attachment.name}</span>
                                <span style={{ color: "#3F3F46", fontSize: 10, marginLeft: "auto", flexShrink: 0 }}>{msg.attachment.size}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                      {isTyping && (
                        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                          <AvatarCircle initials="L" color="#A78BFA" size={28} />
                          <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                            {[0, 1, 2].map((i) => (
                              <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "#A78BFA", animation: `bounce 1s ease-in-out ${i * 0.15}s infinite`, opacity: 0.7 }} />
                            ))}
                          </div>
                        </div>
                      )}
                      <div ref={chatEndRef} />
                    </>
                  )}

                  {/* PEOPLE TAB */}
                  {activeTab === "People" && (
                    <>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <AvatarCircle initials="L" color="#A78BFA" size={28} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ color: "#A78BFA", fontSize: 12, fontWeight: 600 }}>AI Professor Lucas</div>
                          <div style={{ color: "#A1A1AA", fontSize: 10 }}>Professor</div>
                        </div>
                        <span style={{ background: "rgba(109,93,252,0.2)", color: "#A78BFA", fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 4 }}>AI</span>
                      </div>
                      {presentStudents.map((name) => (
                        <div key={name} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                          <AvatarCircle initials={getInitials(name)} color={getColor(name)} size={28} />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ color: "#FFFFFF", fontSize: 12, fontWeight: 600 }}>{name}</div>
                            <div style={{ color: "#A1A1AA", fontSize: 10 }}>Student</div>
                          </div>
                          {name === "You" && (
                            <span style={{ background: "rgba(109,93,252,0.15)", color: "#A78BFA", fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 4 }}>You</span>
                          )}
                        </div>
                      ))}
                    </>
                  )}

                  {/* NOTES TAB */}
                  {activeTab === "Notes" && (
                    <>
                      <div style={{ color: "#A78BFA", fontSize: 11, fontWeight: 600, marginBottom: 4 }}>📝 Database 101 — Today&apos;s Notes</div>
                      {NOTES_CONTENT.map((note) => (
                        <div key={note.title} style={{ background: "rgba(109,93,252,0.08)", border: "1px solid rgba(109,93,252,0.2)", borderRadius: 8, padding: "10px 12px" }}>
                          <div style={{ color: "#FFFFFF", fontSize: 11, fontWeight: 700, marginBottom: 4 }}>{note.title}</div>
                          <div style={{ color: "#A1A1AA", fontSize: 10, lineHeight: 1.6 }}>{note.body}</div>
                        </div>
                      ))}
                    </>
                  )}
                </div>

                {activeTab === "Chat" && (
                  <div style={{ borderTop: "1px solid #27272A", padding: "10px 12px", display: "flex", alignItems: "center", gap: 8 }}>
                    <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="Ask a question..."
                      style={{ flex: 1, background: "rgba(255,255,255,0.04)", border: "1px solid #27272A", borderRadius: 8, padding: "7px 10px", color: "#fff", fontSize: 11, outline: "none", fontFamily: "inherit", minWidth: 0 }} />
                    <button onClick={handleSend} disabled={!chatInput.trim()}
                      style={{ background: chatInput.trim() ? "#6D5DFC" : "rgba(109,93,252,0.3)", border: "none", borderRadius: 8, width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", cursor: chatInput.trim() ? "pointer" : "not-allowed", flexShrink: 0, transition: "background 0.2s" }}>
                      <Send size={13} color="#fff" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Controls */}
            <div style={{ borderTop: "1px solid #27272A", padding: "10px 18px", background: "#0D1117", display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" as const }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                {BOTTOM_STUDENTS.map((s, i) => (
                  <div key={s.id} style={{ marginLeft: i === 0 ? 0 : -8, width: 30, height: 30, borderRadius: "50%", background: s.color, border: "2px solid #0D1117", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "#fff", zIndex: BOTTOM_STUDENTS.length - i, position: "relative" as const }}>
                    {s.id === "you" ? "Y" : s.label[0]}
                  </div>
                ))}
                {studentCount > 4 && (
                  <div style={{ marginLeft: -8, width: 30, height: 30, borderRadius: "50%", background: "#1F2937", border: "2px solid #0D1117", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "#A1A1AA", fontWeight: 600, position: "relative" as const, zIndex: 0 }}>
                    +{studentCount - 4}
                  </div>
                )}
              </div>
              <span style={{ color: "#A1A1AA", fontSize: 11, marginRight: "auto" }}>Students</span>

              <button onClick={() => setMicActive((v) => !v)} style={{ background: micActive ? "rgba(255,255,255,0.05)" : "rgba(239,68,68,0.12)", border: `1px solid ${micActive ? "#27272A" : "rgba(239,68,68,0.4)"}`, borderRadius: 8, padding: "6px 10px", color: micActive ? "#A1A1AA" : "#EF4444", fontSize: 11, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 5, fontFamily: "inherit", transition: "all 0.2s" }}>
                {micActive ? <Mic size={14} /> : <MicOff size={14} color="#EF4444" />} Mic
              </button>
              <button onClick={() => setCameraActive((v) => !v)} style={{ background: cameraActive ? "rgba(255,255,255,0.05)" : "rgba(239,68,68,0.12)", border: `1px solid ${cameraActive ? "#27272A" : "rgba(239,68,68,0.4)"}`, borderRadius: 8, padding: "6px 10px", color: cameraActive ? "#A1A1AA" : "#EF4444", fontSize: 11, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 5, fontFamily: "inherit", transition: "all 0.2s" }}>
                {cameraActive ? <Video size={14} /> : <VideoOff size={14} color="#EF4444" />} Camera
              </button>
              <button onClick={() => setRaiseHandActive((v) => !v)} style={{ background: raiseHandActive ? "rgba(245,158,11,0.15)" : "rgba(255,255,255,0.05)", border: `1px solid ${raiseHandActive ? "rgba(245,158,11,0.4)" : "#27272A"}`, borderRadius: 8, padding: "6px 10px", color: raiseHandActive ? "#F59E0B" : "#A1A1AA", fontSize: 11, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 5, transition: "all 0.2s", fontFamily: "inherit" }}>
                <Hand size={14} color={raiseHandActive ? "#F59E0B" : "#A1A1AA"} /> Raise Hand
              </button>
              <button style={{ background: "rgba(255,255,255,0.05)", border: "1px solid #27272A", borderRadius: 8, padding: "6px 10px", color: "#A1A1AA", fontSize: 11, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 5, fontFamily: "inherit" }}>
                <MonitorUp size={14} /> Share Screen
              </button>
              <button style={{ background: "rgba(255,255,255,0.05)", border: "1px solid #27272A", borderRadius: 8, padding: "6px 10px", color: "#A1A1AA", fontSize: 11, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 5, fontFamily: "inherit" }}>
                <MoreHorizontal size={14} /> More
              </button>
              <button onClick={handleLeave} style={{ background: "#EF4444", border: "none", borderRadius: 8, padding: "7px 16px", color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 5, fontFamily: "inherit" }}>
                <LogOut size={13} /> Leave
              </button>
            </div>
          </div>

          {/* Raise Hand Notification */}
          {raiseHandActive && (
            <div style={{ marginTop: 16, background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)", borderRadius: 10, padding: "12px 18px", display: "flex", alignItems: "center", gap: 10, color: "#F59E0B", fontSize: 13, fontWeight: 500 }}>
              <Hand size={16} color="#F59E0B" />
              Your hand is raised — the professor will call on you shortly.
              <button onClick={() => setRaiseHandActive(false)} style={{ marginLeft: "auto", background: "none", border: "none", color: "#F59E0B", cursor: "pointer", display: "flex", alignItems: "center", fontFamily: "inherit" }}>
                <X size={16} />
              </button>
            </div>
          )}
        </div>

        <style>{`
          @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
        `}</style>
      </section>
    </>
  );
}