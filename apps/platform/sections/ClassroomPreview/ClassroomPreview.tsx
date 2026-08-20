"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../lib/theme/ThemeContext";
import {
  Hand,
  FileText,
  Users,
  Mic,
  MicOff,
  Video,
  VideoOff,
  MonitorUp,
  MoreHorizontal,
  Send,
  LogOut,
  File,
  X,
  UserPlus,
  UserMinus,
  Volume2,
  VolumeX,
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

type TabType = "Chat" | "People" | "Notes";

// ─── Constants ───────────────────────────────────────────────────────────────

const JOINING_NAMES = [
  "Ali Hassan", "Maria Garcia", "John Smith", "Priya Patel", "Chen Wei",
  "Fatima Al-Zahra", "David Kim", "Ananya Roy", "Omar Khalid", "Sofia Rossi",
  "James Wilson", "Yuki Tanaka", "Carlos Mendez", "Aisha Noor", "Ryan Park",
  "Emma Johnson", "Liam Brown", "Noah Davis", "Olivia Wilson", "Ethan Moore",
];

const AVATAR_COLORS = [
  "#059669", "#EC4899", "#F59E0B", "#22C55E", "#10b981",
  "#EF4444", "#8B5CF6", "#06B6D4", "#F97316", "#10B981",
];

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 1,
    name: "Sarah Khan",
    time: "08:12 AM",
    avatar: "SK",
    avatarColor: "#059669",
    message: "Ustaz, can you explain the difference between Sunnah Mu'akkadah and Ghair Mu'akkadah?",
    isAI: false,
  },
  {
    id: 2,
    name: "Ustaz Ibrahim Malik",
    time: "08:13 AM",
    avatar: "L",
    avatarColor: "#34d399",
    message: "Great question, Sarah! Let me show you with a practical example.",
    isAI: true,
    attachment: { name: "Sunnah_Prayers_Guide.pdf", size: "1.2 MB" },
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
  { id: "you", label: "You", color: "#059669" },
  { id: "sarah", label: "Sarah K.", color: "#EC4899" },
  { id: "michael", label: "Michael T.", color: "#F59E0B" },
  { id: "priya", label: "Priya M.", color: "#22C55E" },
];

const TABS: TabType[] = ["Chat", "People", "Notes"];

const NOTES_CONTENT = [
  { title: "Fard Prayers", body: "The five daily prayers are obligatory (fard) on every adult, sane Muslim." },
  { title: "Sunnah Mu'akkadah", body: "Emphasized Sunnah prayers the Prophet ﷺ consistently performed, such as the two rak'ahs before Fajr." },
  { title: "Witr Prayer", body: "An odd-numbered prayer performed after Isha — highly recommended, and obligatory in the Hanafi madhab." },
];

const AI_REPLIES = [
  "Great question! Let me elaborate on that concept for you.",
  "That's exactly the right way to think about it! Here's more detail...",
  "Excellent observation! In machine learning theory, this is a fundamental concept.",
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

// ─── Main Component ──────────────────────────────────────────────────────────

export function ClassroomPreview() {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState<TabType>("Chat");
  const [raiseHandActive, setRaiseHandActive] = useState(false);
  const [micActive, setMicActive] = useState(true);
  const [cameraActive, setCameraActive] = useState(true);
  const [chatInput, setChatInput] = useState("");
  const [pulse, setPulse] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [isTyping, setIsTyping] = useState(false);
  const [isLeft, setIsLeft] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);

  // ── Real student tracking ──
  const [presentStudents, setPresentStudents] = useState<string[]>(["You"]);
  const [joinNotification, setJoinNotification] = useState<{ name: string; type: "join" | "leave" } | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const nextIdRef = useRef(4);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const notifTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Pulse animation
  useEffect(() => {
    const timer = setInterval(() => setPulse((p) => !p), 1200);
    return () => clearInterval(timer);
  }, []);

  // Auto scroll chat (scoped to chat container only, not the whole page)
  useEffect(() => {
    const el = chatEndRef.current;
    if (el?.parentElement) {
      el.parentElement.scrollTop = el.parentElement.scrollHeight;
    }
  }, [messages, isTyping]);

  // ── Real student join/leave simulation ──
  useEffect(() => {
    const scheduleNext = () => {
      const delay = 2500 + Math.random() * 4000; // 2.5s to 6.5s between events
      timerRef.current = setTimeout(() => {
        setPresentStudents((current) => {
          const canLeave = current.filter((n) => n !== "You");
          const shouldLeave = canLeave.length >= 3 && Math.random() < 0.25;

          if (shouldLeave) {
            const name = canLeave[Math.floor(Math.random() * canLeave.length)];
            // Clear old notif timer
            if (notifTimerRef.current) clearTimeout(notifTimerRef.current);
            setJoinNotification({ name, type: "leave" });
            notifTimerRef.current = setTimeout(() => setJoinNotification(null), 2500);
            return current.filter((n) => n !== name);
          } else {
            const remaining = JOINING_NAMES.filter((n) => !current.includes(n));
            if (remaining.length === 0) return current;
            const name = remaining[Math.floor(Math.random() * remaining.length)];
            if (notifTimerRef.current) clearTimeout(notifTimerRef.current);
            setJoinNotification({ name, type: "join" });
            notifTimerRef.current = setTimeout(() => setJoinNotification(null), 2500);
            return [...current, name];
          }
        });
        scheduleNext();
      }, delay);
    };

    scheduleNext();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (notifTimerRef.current) clearTimeout(notifTimerRef.current);
    };
  }, []);

  const studentCount = presentStudents.length;

  // ── Chat ──
  const handleSend = () => {
    const text = chatInput.trim();
    if (!text || isLeft) return;
    const userMsg: ChatMessage = { id: nextIdRef.current++, name: "You", time: getTime(), avatar: "Y", avatarColor: "#059669", message: text, isAI: false };
    setMessages((prev) => [...prev, userMsg]);
    setChatInput("");
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const aiMsg: ChatMessage = { id: nextIdRef.current++, name: "Ustaz Ibrahim Malik", time: getTime(), avatar: "L", avatarColor: "#34d399", message: getRandomReply(), isAI: true };
      setMessages((prev) => [...prev, aiMsg]);
    }, 1800);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => { if (e.key === "Enter") handleSend(); };
  const handleLeave = () => { setIsLeft(true); setMicActive(false); setCameraActive(false); setRaiseHandActive(false); };
  const handleRejoin = () => { setIsLeft(false); setMicActive(true); setCameraActive(true); };

  if (isLeft) {
    return (
      <section style={{ background: isDarkMode ? "#09090B" : "#FFFFFF", padding: "96px 24px", fontFamily: "'Inter', 'Geist', sans-serif", minHeight: 400, display: "flex", alignItems: "center", justifyContent: "center", transition: "background-color 0.3s ease" }}>
        <div style={{ textAlign: "center" as const }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>👋</div>
          <h3 style={{ color: isDarkMode ? "#fff" : "#18181B", fontSize: 24, fontWeight: 700, marginBottom: 8, transition: "color 0.3s ease" }}>You left the class</h3>
          <p style={{ color: isDarkMode ? "#A1A1AA" : "#52525B", marginBottom: 24, transition: "color 0.3s ease" }}>Fiqh of Salah — Live Halaqa is still in session</p>
          <button onClick={handleRejoin} style={{ background: "#059669", border: "none", borderRadius: 10, padding: "12px 28px", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Rejoin Class</button>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="classroom-preview" style={{ background: isDarkMode ? "#09090B" : "#FFFFFF", padding: "64px 24px", fontFamily: "'Inter', 'Geist', sans-serif", transition: "background-color 0.3s ease" }}>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}
        >
          <div
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: isDarkMode ? "#111827" : "#FFFFFF",
              border: `1px solid ${isDarkMode ? "#27272A" : "#E4E4E7"}`,
              borderRadius: 999, padding: "8px 16px",
              boxShadow: isDarkMode ? "none" : "0 1px 2px rgba(0,0,0,0.05)",
              transition: "background-color 0.3s ease, border-color 0.3s ease",
            }}
          >
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#059669", boxShadow: pulse ? "0 0 8px 2px #059669" : "none", transition: "box-shadow 0.6s ease" }} />
            <span style={{ color: "#10b981", fontSize: 12, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" as const }}>Live Classroom Preview</span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ textAlign: "center" as const, marginBottom: 32 }}
        >
          <h2 style={{ color: isDarkMode ? "#FFFFFF" : "#18181B", fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 800, letterSpacing: "-0.02em", margin: 0, transition: "color 0.3s ease" }}>
            Just like a{" "}
            <span style={{ background: "linear-gradient(135deg, #059669, #34d399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>real halaqa.</span>
          </h2>
        </motion.div>

        {/* Classroom Card */}
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>

          {/* Join/Leave Notification */}
          <div style={{ height: 36, marginBottom: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {joinNotification && (
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: joinNotification.type === "join" ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)",
                border: `1px solid ${joinNotification.type === "join" ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"}`,
                borderRadius: 999, padding: "6px 14px",
                color: joinNotification.type === "join" ? "#22C55E" : "#EF4444",
                fontSize: 12, fontWeight: 500,
                animation: "fadeIn 0.3s ease",
              }}>
                {joinNotification.type === "join"
                  ? <UserPlus size={13} />
                  : <UserMinus size={13} />
                }
                {joinNotification.type === "join"
                  ? `${joinNotification.name} joined the class`
                  : `${joinNotification.name} left the class`
                }
              </div>
            )}
          </div>

          <div style={{ background: "#111827", border: "1px solid #27272A", borderRadius: 16, overflow: "hidden", boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(5,150,105,0.08)" }}>

            {/* Top Bar */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 18px", borderBottom: "1px solid #27272A", background: "#0D1117" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22C55E", boxShadow: pulse ? "0 0 6px #22C55E" : "none", transition: "box-shadow 0.6s" }} />
                  <span style={{ color: "#22C55E", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em" }}>LIVE</span>
                </div>
                <span style={{ color: "#FFFFFF", fontWeight: 700, fontSize: 14 }}>Fiqh of Salah — Live Halaqa</span>
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
            <div className="flex flex-col lg:flex-row lg:h-[520px]">

              {/* Professor Video */}
              <div className="relative bg-black overflow-hidden h-56 sm:h-72 lg:h-auto lg:flex-1">
                <iframe
                  key={isVideoMuted ? "muted" : "unmuted"}
                  src={`https://player.cloudinary.com/embed/?cloud_name=lgyepgcr&public_id=Renanla-Tutor_uyw0sh&profile=cld-default&autoplay=true&muted=${isVideoMuted}&loop=true&controls=false`}
                  title="Zufishan Tutor live class preview"
                  style={{ position: "absolute" as const, top: 0, left: 0, width: "100%", height: "100%", border: "none", opacity: cameraActive ? 1 : 0, transition: "opacity 0.4s" }}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  tabIndex={-1}
                />
                <button
                  type="button"
                  onClick={() => setIsVideoMuted((v) => !v)}
                  aria-label={isVideoMuted ? "Unmute video" : "Mute video"}
                  style={{ position: "absolute" as const, bottom: 12, right: 12, zIndex: 2, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                >
                  {isVideoMuted ? <VolumeX size={14} color="#fff" /> : <Volume2 size={14} color="#fff" />}
                </button>
                {!cameraActive && (
                  <div style={{ position: "absolute" as const, inset: 0, background: "#0a0a14", display: "flex", flexDirection: "column" as const, alignItems: "center", justifyContent: "center", gap: 12 }}>
                    <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(5,150,105,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <VideoOff size={28} color="#059669" />
                    </div>
                    <span style={{ color: "#A1A1AA", fontSize: 13 }}>Camera is off</span>
                  </div>
                )}
                <div style={{ position: "absolute" as const, top: 12, left: 12, background: "rgba(5,150,105,0.85)", borderRadius: 6, padding: "3px 10px", fontSize: 10, fontWeight: 700, color: "#fff", letterSpacing: "0.08em", textTransform: "uppercase" as const, zIndex: 2, backdropFilter: "blur(4px)" }}>Verified Ustaz</div>
                <div style={{ position: "absolute" as const, bottom: 48, left: 12, zIndex: 2, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", borderRadius: 8, padding: "6px 10px" }}>
                  <div style={{ color: "#FFFFFF", fontWeight: 700, fontSize: 14, lineHeight: 1 }}>Ibrahim</div>
                  <div style={{ color: "#34d399", fontSize: 11, marginTop: 2 }}>Verified Ustaz · Fiqh & Hadith</div>
                </div>
                {!micActive && (
                  <div style={{ position: "absolute" as const, top: 12, right: 12, background: "rgba(239,68,68,0.85)", borderRadius: 6, padding: "4px 8px", display: "flex", alignItems: "center", gap: 4, zIndex: 2 }}>
                    <MicOff size={11} color="#fff" />
                    <span style={{ color: "#fff", fontSize: 10, fontWeight: 600 }}>Muted</span>
                  </div>
                )}
                
              </div>

              {/* Chat Panel */}
              <div
                className="flex h-80 lg:h-auto w-full lg:w-[248px] flex-shrink-0 flex-col border-t border-[#27272A] lg:border-t-0 lg:border-l"
                style={{ background: "#0D1117" }}
              >
                <div style={{ display: "flex", borderBottom: "1px solid #27272A", padding: "0 12px" }}>
                  {TABS.map((tab) => (
                    <button key={tab} onClick={() => setActiveTab(tab)}
                      style={{ background: "none", border: "none", borderBottom: activeTab === tab ? "2px solid #059669" : "2px solid transparent", padding: "10px 8px", marginBottom: -1, fontSize: 12, fontWeight: 600, color: activeTab === tab ? "#34d399" : "#A1A1AA", cursor: "pointer", transition: "color 0.2s", fontFamily: "inherit", whiteSpace: "nowrap" as const }}
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
                              <span style={{ color: msg.isAI ? "#34d399" : "#FFFFFF", fontSize: 11, fontWeight: 700 }}>{msg.name}</span>
                              <span style={{ color: "#3F3F46", fontSize: 10 }}>{msg.time}</span>
                            </div>
                            <div style={{ color: "#A1A1AA", fontSize: 11, lineHeight: 1.55 }}>{msg.message}</div>
                            {msg.attachment && (
                              <div style={{ marginTop: 6, background: "rgba(5,150,105,0.12)", border: "1px solid rgba(5,150,105,0.25)", borderRadius: 6, padding: "5px 10px", display: "flex", alignItems: "center", gap: 6 }}>
                                <File size={11} color="#34d399" />
                                <span style={{ color: "#34d399", fontSize: 10, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const }}>{msg.attachment.name}</span>
                                <span style={{ color: "#3F3F46", fontSize: 10, marginLeft: "auto", flexShrink: 0 }}>{msg.attachment.size}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                      {isTyping && (
                        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                          <AvatarCircle initials="L" color="#34d399" size={28} />
                          <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                            {[0, 1, 2].map((i) => (
                              <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "#34d399", animation: `bounce 1s ease-in-out ${i * 0.15}s infinite`, opacity: 0.7 }} />
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
                      {/* Professor always first */}
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <AvatarCircle initials="L" color="#34d399" size={28} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ color: "#34d399", fontSize: 12, fontWeight: 600 }}>Ustaz Ibrahim Malik</div>
                          <div style={{ color: "#A1A1AA", fontSize: 10 }}>Verified Ustaz</div>
                        </div>
                        <span style={{ background: "rgba(5,150,105,0.2)", color: "#34d399", fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 4 }}>Ustaz</span>
                      </div>
                      {/* All present students dynamically */}
                      {presentStudents.map((name) => (
                        <div key={name} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                          <AvatarCircle initials={getInitials(name)} color={getColor(name)} size={28} />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ color: "#FFFFFF", fontSize: 12, fontWeight: 600 }}>{name}</div>
                            <div style={{ color: "#A1A1AA", fontSize: 10 }}>Student</div>
                          </div>
                          {name === "You" && (
                            <span style={{ background: "rgba(5,150,105,0.15)", color: "#34d399", fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 4 }}>You</span>
                          )}
                        </div>
                      ))}
                    </>
                  )}

                  {/* NOTES TAB */}
                  {activeTab === "Notes" && (
                    <>
                      <div style={{ color: "#34d399", fontSize: 11, fontWeight: 600, marginBottom: 4 }}>📝 Fiqh of Salah — Live Halaqa — Today&apos;s Notes</div>
                      {NOTES_CONTENT.map((note) => (
                        <div key={note.title} style={{ background: "rgba(5,150,105,0.08)", border: "1px solid rgba(5,150,105,0.2)", borderRadius: 8, padding: "10px 12px" }}>
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
                      style={{ background: chatInput.trim() ? "#059669" : "rgba(5,150,105,0.3)", border: "none", borderRadius: 8, width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", cursor: chatInput.trim() ? "pointer" : "not-allowed", flexShrink: 0, transition: "background 0.2s" }}>
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
          @keyframes fadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }
        `}</style>
      </section>
    </>
  );
}