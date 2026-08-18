"use client";

import { useState } from "react";
import {
  LayoutDashboard, Users, BookOpen, ClipboardList,
  Tv, BarChart2, Settings, Bell, Search, Plus,
  TrendingUp, TrendingDown, MoreHorizontal, Eye,
  Edit, Trash2, Check, X, ChevronDown, ChevronRight,
  AlertTriangle, UserCheck, UserX, BookMarked,
  GraduationCap, MessageSquare, Shield, LogOut,
  Filter, Download, RefreshCw, Send, Star, Bot,
  Mic, Globe, Brain, Zap, Save,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type AdminTab = "dashboard" | "users" | "courses" | "assignments" | "live-classes" | "analytics" | "announcements" | "settings" | "ai-professor";

interface User {
  id: number;
  name: string;
  email: string;
  role: "student" | "instructor" | "admin";
  status: "active" | "inactive" | "suspended";
  joined: string;
  courses: number;
  avatar: string;
  color: string;
}

interface Course {
  id: number;
  title: string;
  instructor: string;
  students: number;
  status: "active" | "draft" | "archived";
  category: string;
  rating: number;
  color: string;
}

interface Assignment {
  id: number;
  title: string;
  course: string;
  dueDate: string;
  submissions: number;
  total: number;
  status: "active" | "closed";
}

interface LiveClass {
  id: number;
  title: string;
  instructor: string;
  course: string;
  date: string;
  time: string;
  students: number;
  status: "live" | "scheduled" | "ended";
  color: string;
}

interface Announcement {
  id: number;
  title: string;
  message: string;
  target: "all" | "students" | "instructors";
  date: string;
  reads: number;
}

// ─── Mock Data ───────────────────────────────────────────────────────────────

const USERS: User[] = [
  { id: 1, name: "Harry Smith", email: "harry@nexora.edu", role: "student", status: "active", joined: "Sep 2024", courses: 5, avatar: "HS", color: "#6D5DFC" },
  { id: 2, name: "Prof. Lucas", email: "lucas@nexora.edu", role: "instructor", status: "active", joined: "Aug 2024", courses: 3, avatar: "PL", color: "#3B82F6" },
  { id: 3, name: "Sarah Khan", email: "sarah@nexora.edu", role: "student", status: "active", joined: "Sep 2024", courses: 4, avatar: "SK", color: "#EC4899" },
  { id: 4, name: "Prof. Ava", email: "ava@nexora.edu", role: "instructor", status: "active", joined: "Aug 2024", courses: 2, avatar: "PA", color: "#22C55E" },
  { id: 5, name: "Michael Thomas", email: "michael@nexora.edu", role: "student", status: "inactive", joined: "Oct 2024", courses: 3, avatar: "MT", color: "#F59E0B" },
  { id: 6, name: "Admin User", email: "admin@nexora.edu", role: "admin", status: "active", joined: "Jan 2024", courses: 0, avatar: "AU", color: "#EF4444" },
  { id: 7, name: "Priya Mehta", email: "priya@nexora.edu", role: "student", status: "active", joined: "Sep 2024", courses: 5, avatar: "PM", color: "#8B5CF6" },
  { id: 8, name: "James Lee", email: "james@nexora.edu", role: "student", status: "suspended", joined: "Sep 2024", courses: 2, avatar: "JL", color: "#06B6D4" },
];

const COURSES: Course[] = [
  { id: 1, title: "Database 101", instructor: "Prof. Lucas", students: 243, status: "active", category: "Computer Science", rating: 4.8, color: "#6D5DFC" },
  { id: 2, title: "AI Engineering", instructor: "Prof. Ava", students: 189, status: "active", category: "Artificial Intelligence", rating: 4.9, color: "#3B82F6" },
  { id: 3, title: "Python Programming", instructor: "Prof. Lucas", students: 312, status: "active", category: "Programming", rating: 4.7, color: "#F59E0B" },
  { id: 4, title: "Data Structures", instructor: "Prof. Ava", students: 156, status: "active", category: "Computer Science", rating: 4.6, color: "#22C55E" },
  { id: 5, title: "Math for CS", instructor: "Prof. Lucas", students: 98, status: "draft", category: "Mathematics", rating: 4.5, color: "#EC4899" },
  { id: 6, title: "Web Development", instructor: "Prof. Ava", students: 0, status: "draft", category: "Programming", rating: 0, color: "#8B5CF6" },
];

const ASSIGNMENTS: Assignment[] = [
  { id: 1, title: "ER Diagram Design", course: "Database 101", dueDate: "2026-08-12", submissions: 187, total: 243, status: "active" },
  { id: 2, title: "Neural Network Implementation", course: "AI Engineering", dueDate: "2026-08-12", submissions: 92, total: 189, status: "active" },
  { id: 3, title: "Python OOP Assignment", course: "Python Programming", dueDate: "2026-08-05", submissions: 312, total: 312, status: "closed" },
  { id: 4, title: "Sorting Algorithms", course: "Data Structures", dueDate: "2026-08-08", submissions: 148, total: 156, status: "closed" },
  { id: 5, title: "Calculus Problem Set 3", course: "Math for CS", dueDate: "2026-08-15", submissions: 12, total: 98, status: "active" },
];

const LIVE_CLASSES: LiveClass[] = [
  { id: 1, title: "Database 101 - Live", instructor: "Prof. Lucas", course: "Database 101", date: "Today", time: "08:00 AM", students: 198, status: "live", color: "#6D5DFC" },
  { id: 2, title: "AI Engineering - Session 12", instructor: "Prof. Ava", course: "AI Engineering", date: "Today", time: "10:00 AM", students: 0, status: "scheduled", color: "#3B82F6" },
  { id: 3, title: "Python Programming - Functions", instructor: "Prof. Lucas", course: "Python Programming", date: "Yesterday", time: "09:00 AM", students: 287, status: "ended", color: "#F59E0B" },
  { id: 4, title: "Data Structures - Trees", instructor: "Prof. Ava", course: "Data Structures", date: "Tomorrow", time: "11:00 AM", students: 0, status: "scheduled", color: "#22C55E" },
];

const ANNOUNCEMENTS: Announcement[] = [
  { id: 1, title: "Platform Maintenance", message: "The platform will be under maintenance on Sunday from 2-4 AM.", target: "all", date: "Aug 10, 2026", reads: 847 },
  { id: 2, title: "New Course Available", message: "Web Development course is now available for enrollment!", target: "students", date: "Aug 8, 2026", reads: 523 },
  { id: 3, title: "Grading Deadline", message: "Please submit all grades by August 15, 2026.", target: "instructors", date: "Aug 7, 2026", reads: 12 },
];

const AVATAR_COLORS = ["#6D5DFC", "#3B82F6", "#EC4899", "#22C55E", "#F59E0B", "#EF4444", "#8B5CF6", "#06B6D4"];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function StatCard({ label, value, change, color, icon: Icon }: { label: string; value: string; change: string; color: string; icon: React.ElementType }) {
  const isPositive = change.startsWith("+");
  return (
    <div style={{ background: "#111827", border: "1px solid #1F2937", borderRadius: 14, padding: "20px", flex: 1 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: `${color}18`, border: `1px solid ${color}33`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={18} color={color} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4, background: isPositive ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)", borderRadius: 999, padding: "3px 8px" }}>
          {isPositive ? <TrendingUp size={11} color="#22C55E" /> : <TrendingDown size={11} color="#EF4444" />}
          <span style={{ color: isPositive ? "#22C55E" : "#EF4444", fontSize: 11, fontWeight: 600 }}>{change}</span>
        </div>
      </div>
      <div style={{ color: "#fff", fontSize: 24, fontWeight: 800, lineHeight: 1 }}>{value}</div>
      <div style={{ color: "#6B7280", fontSize: 12, marginTop: 4 }}>{label}</div>
    </div>
  );
}

function AvatarCircle({ initials, color, size = 34 }: { initials: string; color: string; size?: number }) {
  return (
    <div style={{ width: size, height: size, minWidth: size, borderRadius: "50%", background: color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.33, fontWeight: 700, color: "#fff", flexShrink: 0 }}>
      {initials}
    </div>
  );
}

function Badge({ label, color, bg }: { label: string; color: string; bg: string }) {
  return (
    <span style={{ background: bg, color, fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 999, whiteSpace: "nowrap" as const }}>
      {label}
    </span>
  );
}

function getRoleBadge(role: string) {
  const map: Record<string, { color: string; bg: string }> = {
    admin: { color: "#EF4444", bg: "rgba(239,68,68,0.12)" },
    instructor: { color: "#3B82F6", bg: "rgba(59,130,246,0.12)" },
    student: { color: "#6D5DFC", bg: "rgba(109,93,252,0.12)" },
  };
  return map[role] || map.student;
}

function getStatusBadge(status: string) {
  const map: Record<string, { color: string; bg: string }> = {
    active: { color: "#22C55E", bg: "rgba(34,197,94,0.12)" },
    inactive: { color: "#6B7280", bg: "rgba(107,114,128,0.12)" },
    suspended: { color: "#EF4444", bg: "rgba(239,68,68,0.12)" },
    draft: { color: "#F59E0B", bg: "rgba(245,158,11,0.12)" },
    archived: { color: "#6B7280", bg: "rgba(107,114,128,0.12)" },
    live: { color: "#22C55E", bg: "rgba(34,197,94,0.12)" },
    scheduled: { color: "#6D5DFC", bg: "rgba(109,93,252,0.12)" },
    ended: { color: "#6B7280", bg: "rgba(107,114,128,0.12)" },
    closed: { color: "#6B7280", bg: "rgba(107,114,128,0.12)" },
  };
  return map[status] || map.active;
}

const NAV_ITEMS: { key: AdminTab; label: string; icon: React.ElementType }[] = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "users", label: "Users", icon: Users },
  { key: "courses", label: "Courses", icon: BookOpen },
  { key: "assignments", label: "Assignments", icon: ClipboardList },
  { key: "live-classes", label: "Live Classes", icon: Tv },
  { key: "analytics", label: "Analytics", icon: BarChart2 },
  { key: "announcements", label: "Announcements", icon: Bell },
  { key: "ai-professor", label: "AI Professors", icon: Bot },
  { key: "settings", label: "Settings", icon: Settings },
];

// ─── AI Professor Tab ────────────────────────────────────────────────────────

interface AIProfessor {
  id: number;
  name: string;
  avatar: string;
  avatarColor: string;
  voice: string;
  language: string;
  personality: string;
  teachingStyle: string;
  behaviour: string;
  avatarProviderId: string;
  voiceProviderId: string;
  status: "active" | "draft";
  courses: number;
}

const INITIAL_PROFESSORS: AIProfessor[] = [
  {
    id: 1, name: "Prof. Lucas", avatar: "PL", avatarColor: "#6D5DFC",
    voice: "Professional Male English", language: "English",
    personality: "Patient, encouraging, academic",
    teachingStyle: "Interactive, examples-first, structured",
    behaviour: "Explains concepts, checks understanding, answers questions",
    avatarProviderId: "avatar_lucas_001", voiceProviderId: "voice_en_male_001",
    status: "active", courses: 3,
  },
  {
    id: 2, name: "Prof. Ava", avatar: "PA", avatarColor: "#EC4899",
    voice: "Professional Female English", language: "English",
    personality: "Enthusiastic, detail-oriented, supportive",
    teachingStyle: "Problem-solving, step-by-step, visual",
    behaviour: "Motivates students, provides hints, resumes lesson after Q&A",
    avatarProviderId: "avatar_ava_001", voiceProviderId: "voice_en_female_001",
    status: "active", courses: 2,
  },
];

const VOICES = ["Professional Male English", "Professional Female English", "Professional Male Urdu", "Professional Female Urdu", "Neutral English", "Friendly English"];
const LANGUAGES = ["English", "Urdu", "Arabic", "French", "Spanish", "Chinese"];
const PERSONALITIES = ["Patient, encouraging, academic", "Enthusiastic, detail-oriented, supportive", "Strict, precise, formal", "Friendly, casual, motivating", "Calm, methodical, thorough"];
const TEACHING_STYLES = ["Interactive, examples-first, structured", "Problem-solving, step-by-step, visual", "Lecture-based, theory-first", "Socratic method, question-driven", "Project-based, hands-on"];
const BEHAVIOURS = ["Explains concepts, checks understanding, answers questions", "Motivates students, provides hints, resumes lesson after Q&A", "Focuses on curriculum, minimal off-topic discussion", "Encourages participation, celebrates progress", "Strict pacing, covers all material systematically"];
const AVATAR_COLORS_LIST = ["#6D5DFC", "#EC4899", "#3B82F6", "#22C55E", "#F59E0B", "#EF4444", "#8B5CF6", "#06B6D4"];

function AIProfessorTab() {
  const [professors, setProfessors] = useState<AIProfessor[]>(INITIAL_PROFESSORS);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingProfessor, setEditingProfessor] = useState<AIProfessor | null>(null);
  const [selectedProfessor, setSelectedProfessor] = useState<AIProfessor | null>(null);

  // Form state
  const [name, setName] = useState("");
  const [avatarInitials, setAvatarInitials] = useState("");
  const [avatarColor, setAvatarColor] = useState("#6D5DFC");
  const [voice, setVoice] = useState(VOICES[0]);
  const [language, setLanguage] = useState(LANGUAGES[0]);
  const [personality, setPersonality] = useState(PERSONALITIES[0]);
  const [teachingStyle, setTeachingStyle] = useState(TEACHING_STYLES[0]);
  const [behaviour, setBehaviour] = useState(BEHAVIOURS[0]);
  const [avatarProviderId, setAvatarProviderId] = useState("");
  const [voiceProviderId, setVoiceProviderId] = useState("");

  const inputStyle = { width: "100%", background: "#1F2937", border: "1px solid #374151", borderRadius: 8, padding: "9px 12px", color: "#fff", fontSize: 13, outline: "none", fontFamily: "inherit", boxSizing: "border-box" as const, colorScheme: "dark" as const };
  const labelStyle = { color: "#9CA3AF", fontSize: 11, display: "block" as const, marginBottom: 5 };

  const resetForm = () => {
    setName(""); setAvatarInitials(""); setAvatarColor("#6D5DFC");
    setVoice(VOICES[0]); setLanguage(LANGUAGES[0]);
    setPersonality(PERSONALITIES[0]); setTeachingStyle(TEACHING_STYLES[0]);
    setBehaviour(BEHAVIOURS[0]); setAvatarProviderId(""); setVoiceProviderId("");
    setEditingProfessor(null);
  };

  const handleOpenCreate = () => { resetForm(); setShowForm(true); };

  const handleEdit = (prof: AIProfessor) => {
    setEditingProfessor(prof);
    setName(prof.name); setAvatarInitials(prof.avatar); setAvatarColor(prof.avatarColor);
    setVoice(prof.voice); setLanguage(prof.language); setPersonality(prof.personality);
    setTeachingStyle(prof.teachingStyle); setBehaviour(prof.behaviour);
    setAvatarProviderId(prof.avatarProviderId); setVoiceProviderId(prof.voiceProviderId);
    setShowForm(true); setSelectedProfessor(null);
  };

  const handleSave = () => {
    if (!name.trim()) return;
    if (editingProfessor) {
      setProfessors((prev) => prev.map((p) => p.id === editingProfessor.id ? { ...p, name, avatar: avatarInitials || name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2), avatarColor, voice, language, personality, teachingStyle, behaviour, avatarProviderId, voiceProviderId } : p));
    } else {
      setProfessors((prev) => [...prev, { id: Date.now(), name, avatar: avatarInitials || name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2), avatarColor, voice, language, personality, teachingStyle, behaviour, avatarProviderId, voiceProviderId, status: "draft", courses: 0 }]);
    }
    setShowForm(false); resetForm();
  };

  const handleDelete = (id: number) => {
    setProfessors((prev) => prev.filter((p) => p.id !== id));
    setSelectedProfessor(null);
  };

  const handleToggleStatus = (id: number) => {
    setProfessors((prev) => prev.map((p) => p.id === id ? { ...p, status: p.status === "active" ? "draft" : "active" } : p));
  };

  return (
    <>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <h1 style={{ color: "#fff", fontSize: 20, fontWeight: 800, margin: "0 0 2px 0" }}>AI Professor Management</h1>
          <p style={{ color: "#6B7280", fontSize: 13, margin: 0 }}>Create and configure AI teaching identities for your courses.</p>
        </div>
        <button onClick={handleOpenCreate} style={{ display: "flex", alignItems: "center", gap: 6, background: "#6D5DFC", border: "none", borderRadius: 8, padding: "9px 16px", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
          <Plus size={14} /> Create AI Professor
        </button>
      </div>

      {/* Professor Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16, marginBottom: 24 }}>
        {professors.map((prof) => (
          <div key={prof.id} style={{ background: "#111827", border: "1px solid #1F2937", borderRadius: 14, padding: "20px", position: "relative" as const }}>
            {/* Status badge */}
            <div style={{ position: "absolute" as const, top: 16, right: 16 }}>
              <span style={{ background: prof.status === "active" ? "rgba(34,197,94,0.12)" : "rgba(107,114,128,0.12)", border: `1px solid ${prof.status === "active" ? "rgba(34,197,94,0.3)" : "rgba(107,114,128,0.3)"}`, borderRadius: 999, padding: "3px 10px", color: prof.status === "active" ? "#22C55E" : "#6B7280", fontSize: 11, fontWeight: 600 }}>
                {prof.status === "active" ? "Active" : "Draft"}
              </span>
            </div>

            {/* Avatar + Name */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: `linear-gradient(135deg, ${prof.avatarColor}, ${prof.avatarColor}99)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 800, color: "#fff", flexShrink: 0 }}>
                {prof.avatar}
              </div>
              <div>
                <div style={{ color: "#fff", fontSize: 16, fontWeight: 700 }}>{prof.name}</div>
                <div style={{ color: "#6B7280", fontSize: 11, marginTop: 2 }}>Teaching {prof.courses} course{prof.courses !== 1 ? "s" : ""}</div>
              </div>
            </div>

            {/* Config details */}
            <div style={{ display: "flex", flexDirection: "column" as const, gap: 8, marginBottom: 16 }}>
              {[
                { icon: Mic, label: "Voice", value: prof.voice },
                { icon: Globe, label: "Language", value: prof.language },
                { icon: Brain, label: "Personality", value: prof.personality },
                { icon: Zap, label: "Teaching Style", value: prof.teachingStyle },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                  <Icon size={13} color="#6B7280" style={{ flexShrink: 0, marginTop: 1 }} />
                  <div style={{ minWidth: 0 }}>
                    <span style={{ color: "#6B7280", fontSize: 10, fontWeight: 600 }}>{label}: </span>
                    <span style={{ color: "#9CA3AF", fontSize: 11 }}>{value}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setSelectedProfessor(prof)} style={{ flex: 1, background: "rgba(109,93,252,0.1)", border: "1px solid rgba(109,93,252,0.25)", borderRadius: 8, padding: "7px", color: "#A78BFA", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
                <Eye size={13} /> View
              </button>
              <button onClick={() => handleEdit(prof)} style={{ flex: 1, background: "#1F2937", border: "1px solid #374151", borderRadius: 8, padding: "7px", color: "#E4E4E7", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
                <Edit size={13} /> Edit
              </button>
              <button onClick={() => handleToggleStatus(prof.id)} style={{ background: "none", border: "1px solid #374151", borderRadius: 8, padding: "7px 10px", cursor: "pointer", color: "#6B7280", display: "flex", alignItems: "center" }}>
                {prof.status === "active" ? <X size={13} /> : <Check size={13} />}
              </button>
              <button onClick={() => handleDelete(prof.id)} style={{ background: "rgba(239,68,68,0.1)", border: "none", borderRadius: 8, padding: "7px 10px", cursor: "pointer", display: "flex", alignItems: "center" }}>
                <Trash2 size={13} color="#EF4444" />
              </button>
            </div>
          </div>
        ))}

        {/* Empty card to create new */}
        <div onClick={handleOpenCreate} style={{ background: "rgba(109,93,252,0.04)", border: "2px dashed rgba(109,93,252,0.2)", borderRadius: 14, padding: "20px", display: "flex", flexDirection: "column" as const, alignItems: "center", justifyContent: "center", gap: 10, cursor: "pointer", minHeight: 200, transition: "all 0.15s" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(109,93,252,0.5)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(109,93,252,0.2)"; }}
        >
          <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(109,93,252,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Plus size={22} color="#6D5DFC" />
          </div>
          <div style={{ color: "#6D5DFC", fontSize: 13, fontWeight: 600 }}>Create New AI Professor</div>
          <div style={{ color: "#6B7280", fontSize: 11, textAlign: "center" as const }}>Configure name, voice, personality and teaching style</div>
        </div>
      </div>

      {/* Create/Edit Form Modal */}
      {showForm && (
        <div onClick={() => { setShowForm(false); resetForm(); }} style={{ position: "fixed" as const, inset: 0, zIndex: 100, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "#111827", border: "1px solid #374151", borderRadius: 20, padding: 28, width: 560, maxHeight: "90vh", overflowY: "auto" as const }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(109,93,252,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Bot size={18} color="#A78BFA" />
                </div>
                <span style={{ color: "#fff", fontSize: 16, fontWeight: 700 }}>{editingProfessor ? "Edit AI Professor" : "Create AI Professor"}</span>
              </div>
              <button onClick={() => { setShowForm(false); resetForm(); }} style={{ background: "none", border: "none", color: "#6B7280", cursor: "pointer", fontSize: 20 }}>×</button>
            </div>

            {/* Avatar Preview */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, background: "#1F2937", borderRadius: 12, padding: "16px", marginBottom: 20 }}>
              <div style={{ width: 60, height: 60, borderRadius: "50%", background: `linear-gradient(135deg, ${avatarColor}, ${avatarColor}99)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 800, color: "#fff", flexShrink: 0 }}>
                {avatarInitials || (name ? name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) : "AI")}
              </div>
              <div>
                <div style={{ color: "#fff", fontSize: 14, fontWeight: 700 }}>{name || "Professor Name"}</div>
                <div style={{ color: "#6B7280", fontSize: 11, marginTop: 2 }}>{language} • {voice}</div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column" as const, gap: 14 }}>

              {/* Name */}
              <div>
                <label style={labelStyle}>Professor Name *</label>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Dr. Sara" style={inputStyle} />
              </div>

              {/* Avatar initials + color */}
              <div style={{ display: "flex", gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Avatar Initials</label>
                  <input value={avatarInitials} onChange={(e) => setAvatarInitials(e.target.value.toUpperCase().slice(0, 2))} placeholder="e.g. DS" maxLength={2} style={inputStyle} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Avatar Color</label>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" as const, marginTop: 4 }}>
                    {AVATAR_COLORS_LIST.map((c) => (
                      <div key={c} onClick={() => setAvatarColor(c)} style={{ width: 26, height: 26, borderRadius: "50%", background: c, cursor: "pointer", border: avatarColor === c ? "2px solid #fff" : "2px solid transparent", transition: "border 0.15s" }} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Voice */}
              <div>
                <label style={labelStyle}>Voice</label>
                <select value={voice} onChange={(e) => setVoice(e.target.value)} style={inputStyle}>
                  {VOICES.map((v) => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>

              {/* Language */}
              <div>
                <label style={labelStyle}>Language</label>
                <select value={language} onChange={(e) => setLanguage(e.target.value)} style={inputStyle}>
                  {LANGUAGES.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>

              {/* Personality */}
              <div>
                <label style={labelStyle}>Personality</label>
                <select value={personality} onChange={(e) => setPersonality(e.target.value)} style={inputStyle}>
                  {PERSONALITIES.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>

              {/* Teaching Style */}
              <div>
                <label style={labelStyle}>Teaching Style</label>
                <select value={teachingStyle} onChange={(e) => setTeachingStyle(e.target.value)} style={inputStyle}>
                  {TEACHING_STYLES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              {/* Behaviour */}
              <div>
                <label style={labelStyle}>Behaviour</label>
                <select value={behaviour} onChange={(e) => setBehaviour(e.target.value)} style={inputStyle}>
                  {BEHAVIOURS.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>

              {/* Provider IDs */}
              <div style={{ display: "flex", gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Avatar Provider ID</label>
                  <input value={avatarProviderId} onChange={(e) => setAvatarProviderId(e.target.value)} placeholder="e.g. avatar_001" style={inputStyle} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Voice Provider ID</label>
                  <input value={voiceProviderId} onChange={(e) => setVoiceProviderId(e.target.value)} placeholder="e.g. voice_en_001" style={inputStyle} />
                </div>
              </div>

              {/* Save button */}
              <button onClick={handleSave} disabled={!name.trim()} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: name.trim() ? "#6D5DFC" : "rgba(109,93,252,0.3)", border: "none", borderRadius: 10, padding: 12, color: "#fff", fontSize: 14, fontWeight: 600, cursor: name.trim() ? "pointer" : "not-allowed", fontFamily: "inherit", marginTop: 4 }}>
                <Save size={15} /> {editingProfessor ? "Save Changes" : "Create AI Professor"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Detail Modal */}
      {selectedProfessor && (
        <div onClick={() => setSelectedProfessor(null)} style={{ position: "fixed" as const, inset: 0, zIndex: 100, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "#111827", border: `1px solid ${selectedProfessor.avatarColor}44`, borderRadius: 20, padding: 28, width: 480, maxHeight: "85vh", overflowY: "auto" as const }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <span style={{ color: "#fff", fontSize: 16, fontWeight: 700 }}>AI Professor Details</span>
              <button onClick={() => setSelectedProfessor(null)} style={{ background: "none", border: "none", color: "#6B7280", cursor: "pointer", fontSize: 20 }}>×</button>
            </div>

            {/* Avatar */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
              <div style={{ width: 70, height: 70, borderRadius: "50%", background: `linear-gradient(135deg, ${selectedProfessor.avatarColor}, ${selectedProfessor.avatarColor}99)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 800, color: "#fff" }}>
                {selectedProfessor.avatar}
              </div>
              <div>
                <div style={{ color: "#fff", fontSize: 18, fontWeight: 700 }}>{selectedProfessor.name}</div>
                <span style={{ background: selectedProfessor.status === "active" ? "rgba(34,197,94,0.12)" : "rgba(107,114,128,0.12)", border: `1px solid ${selectedProfessor.status === "active" ? "rgba(34,197,94,0.3)" : "rgba(107,114,128,0.3)"}`, borderRadius: 999, padding: "3px 10px", color: selectedProfessor.status === "active" ? "#22C55E" : "#6B7280", fontSize: 11, fontWeight: 600 }}>
                  {selectedProfessor.status}
                </span>
              </div>
            </div>

            {/* Config table */}
            <div style={{ background: "#1F2937", borderRadius: 12, overflow: "hidden", marginBottom: 20 }}>
              {[
                { label: "Voice", value: selectedProfessor.voice, icon: Mic },
                { label: "Language", value: selectedProfessor.language, icon: Globe },
                { label: "Personality", value: selectedProfessor.personality, icon: Brain },
                { label: "Teaching Style", value: selectedProfessor.teachingStyle, icon: Zap },
                { label: "Behaviour", value: selectedProfessor.behaviour, icon: Bot },
                { label: "Avatar Provider ID", value: selectedProfessor.avatarProviderId || "Not set", icon: Eye },
                { label: "Voice Provider ID", value: selectedProfessor.voiceProviderId || "Not set", icon: Mic },
              ].map(({ label, value, icon: Icon }, i) => (
                <div key={label} style={{ display: "flex", gap: 12, padding: "12px 16px", borderBottom: i < 6 ? "1px solid #374151" : "none", alignItems: "flex-start" }}>
                  <Icon size={14} color="#6B7280" style={{ flexShrink: 0, marginTop: 1 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ color: "#6B7280", fontSize: 11, fontWeight: 600 }}>{label}</div>
                    <div style={{ color: "#E4E4E7", fontSize: 12, marginTop: 2 }}>{value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => handleEdit(selectedProfessor)} style={{ flex: 1, background: "#6D5DFC", border: "none", borderRadius: 10, padding: "10px", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                <Edit size={14} /> Edit Professor
              </button>
              <button onClick={() => handleDelete(selectedProfessor.id)} style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 10, padding: "10px 16px", color: "#EF4444", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6 }}>
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function AdminPanel() {
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [users, setUsers] = useState<User[]>(USERS);
  const [courses, setCourses] = useState<Course[]>(COURSES);
  const [announcements, setAnnouncements] = useState<Announcement[]>(ANNOUNCEMENTS);
  const [search, setSearch] = useState<string>("");
  const [showAddUser, setShowAddUser] = useState<boolean>(false);
  const [showAddCourse, setShowAddCourse] = useState<boolean>(false);
  const [showAddAnnouncement, setShowAddAnnouncement] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Add user form
  const [newUserName, setNewUserName] = useState<string>("");
  const [newUserEmail, setNewUserEmail] = useState<string>("");
  const [newUserRole, setNewUserRole] = useState<"student" | "instructor" | "admin">("student");

  // Add course form
  const [newCourseTitle, setNewCourseTitle] = useState<string>("");
  const [newCourseInstructor, setNewCourseInstructor] = useState<string>("Prof. Lucas");
  const [newCourseCategory, setNewCourseCategory] = useState<string>("Computer Science");

  // Add announcement form
  const [newAnnTitle, setNewAnnTitle] = useState<string>("");
  const [newAnnMessage, setNewAnnMessage] = useState<string>("");
  const [newAnnTarget, setNewAnnTarget] = useState<"all" | "students" | "instructors">("all");

  // Admin settings
  const [adminName, setAdminName] = useState<string>("Admin User");
  const [adminEmail, setAdminEmail] = useState<string>("admin@nexora.edu");
  const [maintenanceMode, setMaintenanceMode] = useState<boolean>(false);
  const [allowRegistration, setAllowRegistration] = useState<boolean>(true);
  const [emailNotifications, setEmailNotifications] = useState<boolean>(true);

  const inputStyle = { width: "100%", background: "#1F2937", border: "1px solid #374151", borderRadius: 8, padding: "9px 12px", color: "#fff", fontSize: 13, outline: "none", fontFamily: "inherit", boxSizing: "border-box" as const, colorScheme: "dark" as const };
  const labelStyle = { color: "#9CA3AF", fontSize: 11, display: "block" as const, marginBottom: 5 };

  const handleAddUser = () => {
    if (!newUserName.trim() || !newUserEmail.trim()) return;
    const initials = newUserName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
    const newUser: User = {
      id: Date.now(), name: newUserName, email: newUserEmail, role: newUserRole,
      status: "active", joined: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      courses: 0, avatar: initials, color: AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)],
    };
    setUsers((prev) => [newUser, ...prev]);
    setNewUserName(""); setNewUserEmail(""); setShowAddUser(false);
  };

  const handleAddCourse = () => {
    if (!newCourseTitle.trim()) return;
    const newCourse: Course = {
      id: Date.now(), title: newCourseTitle, instructor: newCourseInstructor,
      students: 0, status: "draft", category: newCourseCategory, rating: 0,
      color: AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)],
    };
    setCourses((prev) => [newCourse, ...prev]);
    setNewCourseTitle(""); setShowAddCourse(false);
  };

  const handleAddAnnouncement = () => {
    if (!newAnnTitle.trim() || !newAnnMessage.trim()) return;
    const newAnn: Announcement = {
      id: Date.now(), title: newAnnTitle, message: newAnnMessage, target: newAnnTarget,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }), reads: 0,
    };
    setAnnouncements((prev) => [newAnn, ...prev]);
    setNewAnnTitle(""); setNewAnnMessage(""); setShowAddAnnouncement(false);
  };

  const handleDeleteUser = (id: number) => setUsers((prev) => prev.filter((u) => u.id !== id));
  const handleDeleteCourse = (id: number) => setCourses((prev) => prev.filter((c) => c.id !== id));
  const handleDeleteAnnouncement = (id: number) => setAnnouncements((prev) => prev.filter((a) => a.id !== id));

  const toggleUserStatus = (id: number) => {
    setUsers((prev) => prev.map((u) => u.id === id ? { ...u, status: u.status === "active" ? "suspended" : "active" } : u));
  };

  const filteredUsers = users.filter((u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));
  const filteredCourses = courses.filter((c) => c.title.toLowerCase().includes(search.toLowerCase()));

  function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
    return (
      <button onClick={() => onChange(!checked)} style={{ width: 44, height: 24, borderRadius: 12, border: "none", cursor: "pointer", background: checked ? "#6D5DFC" : "#374151", position: "relative" as const, transition: "background 0.2s", flexShrink: 0 }}>
        <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#fff", position: "absolute" as const, top: 3, left: checked ? 23 : 3, transition: "left 0.2s" }} />
      </button>
    );
  }

  return (
    <div style={{ display: "flex", height: "100vh", background: "#0D1117", fontFamily: "'Inter', 'Geist', sans-serif", color: "#fff", overflow: "hidden" }}>

      {/* ── Sidebar ── */}
      <div style={{ width: 220, background: "#111827", borderRight: "1px solid #1F2937", display: "flex", flexDirection: "column" as const, flexShrink: 0 }}>
        {/* Logo */}
        <div style={{ padding: "20px 16px", borderBottom: "1px solid #1F2937" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 8, background: "linear-gradient(135deg, #6D5DFC, #A78BFA)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Shield size={17} color="#fff" />
            </div>
            <div>
              <div style={{ color: "#fff", fontWeight: 800, fontSize: 13 }}>Ranenla Admin</div>
              <div style={{ color: "#6B7280", fontSize: 10 }}>Control Panel</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <div style={{ flex: 1, padding: "12px 8px", overflowY: "auto" as const }}>
          {NAV_ITEMS.map(({ key, label, icon: Icon }) => (
            <button key={key} onClick={() => setActiveTab(key)}
              style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 8, border: "none", marginBottom: 2, background: activeTab === key ? "rgba(109,93,252,0.15)" : "none", color: activeTab === key ? "#A78BFA" : "#6B7280", fontSize: 13, fontWeight: activeTab === key ? 600 : 400, cursor: "pointer", fontFamily: "inherit", textAlign: "left" as const, transition: "all 0.15s" }}
              onMouseEnter={(e) => { if (activeTab !== key) (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.04)"; }}
              onMouseLeave={(e) => { if (activeTab !== key) (e.currentTarget as HTMLButtonElement).style.background = "none"; }}
            >
              <Icon size={16} color={activeTab === key ? "#A78BFA" : "#6B7280"} />
              {label}
              {activeTab === key && <ChevronRight size={13} color="#A78BFA" style={{ marginLeft: "auto" }} />}
            </button>
          ))}
        </div>

        {/* Admin user */}
        <div style={{ padding: "12px 16px", borderTop: "1px solid #1F2937", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#EF4444", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff", flexShrink: 0 }}>A</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ color: "#fff", fontSize: 12, fontWeight: 600 }}>Admin</div>
            <div style={{ color: "#6B7280", fontSize: 10 }}>Super Admin</div>
          </div>
          <LogOut size={14} color="#6B7280" style={{ cursor: "pointer" }} />
        </div>
      </div>

      {/* ── Main Content ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" as const, overflow: "hidden" }}>

        {/* ── Top Bar ── */}
        <div style={{ padding: "14px 24px", borderBottom: "1px solid #1F2937", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
          <div style={{ flex: 1, position: "relative" as const }}>
            <Search size={14} color="#6B7280" style={{ position: "absolute" as const, left: 12, top: "50%", transform: "translateY(-50%)" }} />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search users, courses..." style={{ ...inputStyle, paddingLeft: 34, width: "100%", maxWidth: 360 }} />
          </div>
          <button style={{ display: "flex", alignItems: "center", gap: 5, background: "#1F2937", border: "1px solid #374151", borderRadius: 8, padding: "7px 12px", color: "#E4E4E7", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>
            <RefreshCw size={13} /> Refresh
          </button>
          <button style={{ display: "flex", alignItems: "center", gap: 5, background: "#1F2937", border: "1px solid #374151", borderRadius: 8, padding: "7px 12px", color: "#E4E4E7", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>
            <Download size={13} /> Export
          </button>
        </div>

        {/* ── Page Content ── */}
        <div style={{ flex: 1, overflowY: "auto" as const, padding: "24px" }}>

          {/* ── DASHBOARD ── */}
          {activeTab === "dashboard" && (
            <>
              <div style={{ marginBottom: 20 }}>
                <h1 style={{ color: "#fff", fontSize: 20, fontWeight: 800, margin: 0 }}>Dashboard Overview</h1>
                <p style={{ color: "#6B7280", fontSize: 12, margin: "4px 0 0" }}>Welcome back, Admin. Here's what's happening today.</p>
              </div>

              {/* Stats */}
              <div style={{ display: "flex", gap: 14, marginBottom: 24, flexWrap: "wrap" as const }}>
                <StatCard label="Total Users" value="1,247" change="+12%" color="#6D5DFC" icon={Users} />
                <StatCard label="Active Courses" value="6" change="+2%" color="#3B82F6" icon={BookOpen} />
                <StatCard label="Live Classes Today" value="4" change="+1%" color="#22C55E" icon={Tv} />
                <StatCard label="Assignments Due" value="5" change="-3%" color="#F59E0B" icon={ClipboardList} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>

                {/* Recent Users */}
                <div style={{ background: "#111827", border: "1px solid #1F2937", borderRadius: 14, padding: "20px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                    <h3 style={{ color: "#fff", fontSize: 14, fontWeight: 700, margin: 0 }}>Recent Users</h3>
                    <button onClick={() => setActiveTab("users")} style={{ background: "none", border: "none", color: "#6D5DFC", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>View all</button>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" as const, gap: 10 }}>
                    {users.slice(0, 5).map((user) => (
                      <div key={user.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <AvatarCircle initials={user.avatar} color={user.color} size={32} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ color: "#E4E4E7", fontSize: 12, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const }}>{user.name}</div>
                          <div style={{ color: "#6B7280", fontSize: 10 }}>{user.role} • {user.joined}</div>
                        </div>
                        <Badge label={user.status} {...getStatusBadge(user.status)} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Courses */}
                <div style={{ background: "#111827", border: "1px solid #1F2937", borderRadius: 14, padding: "20px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                    <h3 style={{ color: "#fff", fontSize: 14, fontWeight: 700, margin: 0 }}>Courses Overview</h3>
                    <button onClick={() => setActiveTab("courses")} style={{ background: "none", border: "none", color: "#6D5DFC", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>View all</button>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" as const, gap: 10 }}>
                    {courses.slice(0, 5).map((course) => (
                      <div key={course.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 32, height: 32, borderRadius: 8, background: `${course.color}22`, border: `1px solid ${course.color}33`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <BookMarked size={14} color={course.color} />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ color: "#E4E4E7", fontSize: 12, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const }}>{course.title}</div>
                          <div style={{ color: "#6B7280", fontSize: 10 }}>{course.students} students</div>
                        </div>
                        <Badge label={course.status} {...getStatusBadge(course.status)} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Live Classes */}
                <div style={{ background: "#111827", border: "1px solid #1F2937", borderRadius: 14, padding: "20px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                    <h3 style={{ color: "#fff", fontSize: 14, fontWeight: 700, margin: 0 }}>Live Classes</h3>
                    <button onClick={() => setActiveTab("live-classes")} style={{ background: "none", border: "none", color: "#6D5DFC", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>View all</button>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" as const, gap: 10 }}>
                    {LIVE_CLASSES.map((cls) => (
                      <div key={cls.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px", background: "#1F2937", borderRadius: 8, borderLeft: `3px solid ${cls.color}` }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ color: "#E4E4E7", fontSize: 12, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const }}>{cls.title}</div>
                          <div style={{ color: "#6B7280", fontSize: 10 }}>{cls.date} • {cls.time}</div>
                        </div>
                        <Badge label={cls.status} {...getStatusBadge(cls.status)} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Announcements */}
                <div style={{ background: "#111827", border: "1px solid #1F2937", borderRadius: 14, padding: "20px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                    <h3 style={{ color: "#fff", fontSize: 14, fontWeight: 700, margin: 0 }}>Announcements</h3>
                    <button onClick={() => setActiveTab("announcements")} style={{ background: "none", border: "none", color: "#6D5DFC", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>View all</button>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" as const, gap: 10 }}>
                    {announcements.map((ann) => (
                      <div key={ann.id} style={{ padding: "10px", background: "#1F2937", borderRadius: 8 }}>
                        <div style={{ color: "#E4E4E7", fontSize: 12, fontWeight: 600, marginBottom: 4 }}>{ann.title}</div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <span style={{ color: "#6B7280", fontSize: 10 }}>{ann.date}</span>
                          <span style={{ color: "#6B7280", fontSize: 10 }}>{ann.reads} reads</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ── USERS ── */}
          {activeTab === "users" && (
            <>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                <div>
                  <h1 style={{ color: "#fff", fontSize: 20, fontWeight: 800, margin: 0 }}>User Management</h1>
                  <p style={{ color: "#6B7280", fontSize: 12, margin: "4px 0 0" }}>{users.length} total users</p>
                </div>
                <button onClick={() => setShowAddUser(true)} style={{ display: "flex", alignItems: "center", gap: 6, background: "#6D5DFC", border: "none", borderRadius: 8, padding: "9px 16px", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                  <Plus size={14} /> Add User
                </button>
              </div>

              <div style={{ background: "#111827", border: "1px solid #1F2937", borderRadius: 14, overflow: "hidden" }}>
                {/* Table header */}
                <div style={{ display: "grid", gridTemplateColumns: "2fr 2fr 1fr 1fr 1fr 1fr", gap: 0, padding: "12px 20px", borderBottom: "1px solid #1F2937", background: "#0D1117" }}>
                  {["User", "Email", "Role", "Status", "Courses", "Actions"].map((h) => (
                    <div key={h} style={{ color: "#6B7280", fontSize: 11, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.05em" }}>{h}</div>
                  ))}
                </div>
                {filteredUsers.map((user) => (
                  <div key={user.id} style={{ display: "grid", gridTemplateColumns: "2fr 2fr 1fr 1fr 1fr 1fr", gap: 0, padding: "14px 20px", borderBottom: "1px solid #1F2937", alignItems: "center", transition: "background 0.15s" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = "#131d2e"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = "none"; }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <AvatarCircle initials={user.avatar} color={user.color} size={32} />
                      <div>
                        <div style={{ color: "#E4E4E7", fontSize: 13, fontWeight: 600 }}>{user.name}</div>
                        <div style={{ color: "#6B7280", fontSize: 10 }}>Joined {user.joined}</div>
                      </div>
                    </div>
                    <div style={{ color: "#9CA3AF", fontSize: 12 }}>{user.email}</div>
                    <div><Badge label={user.role} {...getRoleBadge(user.role)} /></div>
                    <div><Badge label={user.status} {...getStatusBadge(user.status)} /></div>
                    <div style={{ color: "#9CA3AF", fontSize: 12 }}>{user.courses}</div>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button onClick={() => toggleUserStatus(user.id)} style={{ background: "none", border: "1px solid #374151", borderRadius: 6, padding: "4px 8px", cursor: "pointer", display: "flex", alignItems: "center" }}>
                        {user.status === "active" ? <UserX size={13} color="#EF4444" /> : <UserCheck size={13} color="#22C55E" />}
                      </button>
                      <button onClick={() => handleDeleteUser(user.id)} style={{ background: "none", border: "1px solid #374151", borderRadius: 6, padding: "4px 8px", cursor: "pointer", display: "flex", alignItems: "center" }}>
                        <Trash2 size={13} color="#EF4444" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ── COURSES ── */}
          {activeTab === "courses" && (
            <>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                <div>
                  <h1 style={{ color: "#fff", fontSize: 20, fontWeight: 800, margin: 0 }}>Course Management</h1>
                  <p style={{ color: "#6B7280", fontSize: 12, margin: "4px 0 0" }}>{courses.length} total courses</p>
                </div>
                <button onClick={() => setShowAddCourse(true)} style={{ display: "flex", alignItems: "center", gap: 6, background: "#6D5DFC", border: "none", borderRadius: 8, padding: "9px 16px", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                  <Plus size={14} /> Add Course
                </button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                {filteredCourses.map((course) => (
                  <div key={course.id} style={{ background: "#111827", border: "1px solid #1F2937", borderRadius: 14, padding: "18px", borderTop: `3px solid ${course.color}` }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
                      <div style={{ width: 38, height: 38, borderRadius: 10, background: `${course.color}22`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <BookMarked size={18} color={course.color} />
                      </div>
                      <div style={{ display: "flex", gap: 6 }}>
                        <Badge label={course.status} {...getStatusBadge(course.status)} />
                        <button onClick={() => handleDeleteCourse(course.id)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}>
                          <Trash2 size={14} color="#EF4444" />
                        </button>
                      </div>
                    </div>
                    <div style={{ color: "#fff", fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{course.title}</div>
                    <div style={{ color: "#6B7280", fontSize: 11, marginBottom: 12 }}>{course.instructor} • {course.category}</div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 4, color: "#9CA3AF", fontSize: 12 }}>
                        <GraduationCap size={13} /> {course.students} students
                      </div>
                      {course.rating > 0 && (
                        <div style={{ display: "flex", alignItems: "center", gap: 4, color: "#F59E0B", fontSize: 12 }}>
                          <Star size={12} fill="#F59E0B" /> {course.rating}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ── ASSIGNMENTS ── */}
          {activeTab === "assignments" && (
            <>
              <div style={{ marginBottom: 20 }}>
                <h1 style={{ color: "#fff", fontSize: 20, fontWeight: 800, margin: 0 }}>Assignment Management</h1>
                <p style={{ color: "#6B7280", fontSize: 12, margin: "4px 0 0" }}>{ASSIGNMENTS.length} total assignments</p>
              </div>
              <div style={{ background: "#111827", border: "1px solid #1F2937", borderRadius: 14, overflow: "hidden" }}>
                <div style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 1fr 1.5fr 1fr", padding: "12px 20px", borderBottom: "1px solid #1F2937", background: "#0D1117" }}>
                  {["Assignment", "Course", "Due Date", "Submissions", "Status"].map((h) => (
                    <div key={h} style={{ color: "#6B7280", fontSize: 11, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.05em" }}>{h}</div>
                  ))}
                </div>
                {ASSIGNMENTS.map((a) => {
                  const pct = Math.round((a.submissions / a.total) * 100);
                  return (
                    <div key={a.id} style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 1fr 1.5fr 1fr", padding: "14px 20px", borderBottom: "1px solid #1F2937", alignItems: "center" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = "#131d2e"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = "none"; }}
                    >
                      <div style={{ color: "#E4E4E7", fontSize: 13, fontWeight: 600 }}>{a.title}</div>
                      <div style={{ color: "#9CA3AF", fontSize: 12 }}>{a.course}</div>
                      <div style={{ color: "#9CA3AF", fontSize: 12 }}>{a.dueDate}</div>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                          <div style={{ flex: 1, height: 4, background: "#1F2937", borderRadius: 999 }}>
                            <div style={{ height: "100%", width: `${pct}%`, background: pct === 100 ? "#22C55E" : "#6D5DFC", borderRadius: 999 }} />
                          </div>
                          <span style={{ color: "#9CA3AF", fontSize: 10, whiteSpace: "nowrap" as const }}>{a.submissions}/{a.total}</span>
                        </div>
                        <div style={{ color: "#6B7280", fontSize: 10 }}>{pct}% submitted</div>
                      </div>
                      <Badge label={a.status} {...getStatusBadge(a.status)} />
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* ── LIVE CLASSES ── */}
          {activeTab === "live-classes" && (
            <>
              <div style={{ marginBottom: 20 }}>
                <h1 style={{ color: "#fff", fontSize: 20, fontWeight: 800, margin: 0 }}>Live Classes</h1>
                <p style={{ color: "#6B7280", fontSize: 12, margin: "4px 0 0" }}>Monitor and manage all live sessions.</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column" as const, gap: 12 }}>
                {LIVE_CLASSES.map((cls) => (
                  <div key={cls.id} style={{ background: "#111827", border: "1px solid #1F2937", borderRadius: 14, padding: "18px 20px", display: "flex", alignItems: "center", gap: 16, borderLeft: `3px solid ${cls.color}` }}>
                    <div style={{ width: 44, height: 44, borderRadius: 10, background: `${cls.color}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Tv size={20} color={cls.color} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ color: "#fff", fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{cls.title}</div>
                      <div style={{ color: "#6B7280", fontSize: 12 }}>{cls.instructor} • {cls.course} • {cls.date} at {cls.time}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      {cls.status === "live" && (
                        <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#22C55E", fontSize: 12 }}>
                          <Users size={13} /> {cls.students} watching
                        </div>
                      )}
                      <Badge label={cls.status} {...getStatusBadge(cls.status)} />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ── ANALYTICS ── */}
          {activeTab === "analytics" && (
            <>
              <div style={{ marginBottom: 20 }}>
                <h1 style={{ color: "#fff", fontSize: 20, fontWeight: 800, margin: 0 }}>Analytics</h1>
                <p style={{ color: "#6B7280", fontSize: 12, margin: "4px 0 0" }}>Platform performance and insights.</p>
              </div>
              <div style={{ display: "flex", gap: 14, marginBottom: 20, flexWrap: "wrap" as const }}>
                <StatCard label="Total Students" value="1,198" change="+8%" color="#6D5DFC" icon={GraduationCap} />
                <StatCard label="Total Instructors" value="24" change="+2%" color="#3B82F6" icon={Users} />
                <StatCard label="Course Completion Rate" value="78%" change="+5%" color="#22C55E" icon={TrendingUp} />
                <StatCard label="Avg. Grade" value="B+" change="+3%" color="#F59E0B" icon={Star} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                {/* Top Courses */}
                <div style={{ background: "#111827", border: "1px solid #1F2937", borderRadius: 14, padding: "20px" }}>
                  <h3 style={{ color: "#fff", fontSize: 14, fontWeight: 700, margin: "0 0 16px 0" }}>Top Courses by Enrollment</h3>
                  {courses.filter((c) => c.students > 0).sort((a, b) => b.students - a.students).map((course) => (
                    <div key={course.id} style={{ marginBottom: 12 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                        <span style={{ color: "#E4E4E7", fontSize: 12 }}>{course.title}</span>
                        <span style={{ color: "#9CA3AF", fontSize: 12 }}>{course.students}</span>
                      </div>
                      <div style={{ height: 6, background: "#1F2937", borderRadius: 999 }}>
                        <div style={{ height: "100%", width: `${(course.students / 312) * 100}%`, background: course.color, borderRadius: 999 }} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* User Breakdown */}
                <div style={{ background: "#111827", border: "1px solid #1F2937", borderRadius: 14, padding: "20px" }}>
                  <h3 style={{ color: "#fff", fontSize: 14, fontWeight: 700, margin: "0 0 16px 0" }}>User Breakdown</h3>
                  {[
                    { label: "Students", value: users.filter((u) => u.role === "student").length, color: "#6D5DFC" },
                    { label: "Instructors", value: users.filter((u) => u.role === "instructor").length, color: "#3B82F6" },
                    { label: "Admins", value: users.filter((u) => u.role === "admin").length, color: "#EF4444" },
                    { label: "Active", value: users.filter((u) => u.status === "active").length, color: "#22C55E" },
                    { label: "Suspended", value: users.filter((u) => u.status === "suspended").length, color: "#F59E0B" },
                  ].map(({ label, value, color }) => (
                    <div key={label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #1F2937" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: color }} />
                        <span style={{ color: "#9CA3AF", fontSize: 12 }}>{label}</span>
                      </div>
                      <span style={{ color: "#E4E4E7", fontSize: 13, fontWeight: 700 }}>{value}</span>
                    </div>
                  ))}
                </div>

                {/* Assignment Submission Stats */}
                <div style={{ background: "#111827", border: "1px solid #1F2937", borderRadius: 14, padding: "20px", gridColumn: "1 / -1" }}>
                  <h3 style={{ color: "#fff", fontSize: 14, fontWeight: 700, margin: "0 0 16px 0" }}>Assignment Submission Rates</h3>
                  {ASSIGNMENTS.map((a) => {
                    const pct = Math.round((a.submissions / a.total) * 100);
                    return (
                      <div key={a.id} style={{ marginBottom: 14 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                          <span style={{ color: "#E4E4E7", fontSize: 12, fontWeight: 500 }}>{a.title}</span>
                          <span style={{ color: "#9CA3AF", fontSize: 12 }}>{a.submissions}/{a.total} ({pct}%)</span>
                        </div>
                        <div style={{ height: 8, background: "#1F2937", borderRadius: 999 }}>
                          <div style={{ height: "100%", width: `${pct}%`, background: pct >= 90 ? "#22C55E" : pct >= 60 ? "#6D5DFC" : "#F59E0B", borderRadius: 999, transition: "width 0.5s" }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {/* ── ANNOUNCEMENTS ── */}
          {activeTab === "announcements" && (
            <>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                <div>
                  <h1 style={{ color: "#fff", fontSize: 20, fontWeight: 800, margin: 0 }}>Announcements</h1>
                  <p style={{ color: "#6B7280", fontSize: 12, margin: "4px 0 0" }}>Send announcements to users.</p>
                </div>
                <button onClick={() => setShowAddAnnouncement(true)} style={{ display: "flex", alignItems: "center", gap: 6, background: "#6D5DFC", border: "none", borderRadius: 8, padding: "9px 16px", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                  <Plus size={14} /> New Announcement
                </button>
              </div>
              <div style={{ display: "flex", flexDirection: "column" as const, gap: 12 }}>
                {announcements.map((ann) => (
                  <div key={ann.id} style={{ background: "#111827", border: "1px solid #1F2937", borderRadius: 14, padding: "18px 20px" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                          <Bell size={15} color="#6D5DFC" />
                          <span style={{ color: "#fff", fontSize: 14, fontWeight: 700 }}>{ann.title}</span>
                          <Badge label={`To: ${ann.target}`} color="#A78BFA" bg="rgba(109,93,252,0.12)" />
                        </div>
                        <div style={{ color: "#9CA3AF", fontSize: 13, lineHeight: 1.6 }}>{ann.message}</div>
                      </div>
                      <button onClick={() => handleDeleteAnnouncement(ann.id)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", marginLeft: 12, flexShrink: 0 }}>
                        <Trash2 size={15} color="#EF4444" />
                      </button>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, color: "#6B7280", fontSize: 11 }}>
                      <span>{ann.date}</span>
                      <span>•</span>
                      <span>{ann.reads} reads</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ── SETTINGS ── */}
          {activeTab === "settings" && (
            <>
              <div style={{ marginBottom: 20 }}>
                <h1 style={{ color: "#fff", fontSize: 20, fontWeight: 800, margin: 0 }}>Admin Settings</h1>
                <p style={{ color: "#6B7280", fontSize: 12, margin: "4px 0 0" }}>Configure platform settings.</p>
              </div>

              {/* Admin Profile */}
              <div style={{ background: "#111827", border: "1px solid #1F2937", borderRadius: 14, padding: "20px 24px", marginBottom: 20 }}>
                <h3 style={{ color: "#fff", fontSize: 14, fontWeight: 700, margin: "0 0 16px 0" }}>Admin Profile</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div>
                    <label style={labelStyle}>Name</label>
                    <input value={adminName} onChange={(e) => setAdminName(e.target.value)} style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Email</label>
                    <input value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} style={inputStyle} />
                  </div>
                </div>
                <button style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 6, background: "#6D5DFC", border: "none", borderRadius: 8, padding: "9px 16px", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                  <Check size={14} /> Save Profile
                </button>
              </div>

              {/* Platform Settings */}
              <div style={{ background: "#111827", border: "1px solid #1F2937", borderRadius: 14, padding: "20px 24px", marginBottom: 20 }}>
                <h3 style={{ color: "#fff", fontSize: 14, fontWeight: 700, margin: "0 0 4px 0" }}>Platform Settings</h3>
                <div style={{ height: 1, background: "#1F2937", margin: "12px 0" }} />
                {[
                  { label: "Maintenance Mode", desc: "Put the platform in maintenance mode. Users will see a maintenance page.", checked: maintenanceMode, onChange: setMaintenanceMode },
                  { label: "Allow New Registrations", desc: "Allow new users to register on the platform.", checked: allowRegistration, onChange: setAllowRegistration },
                  { label: "Email Notifications", desc: "Send email notifications to users for important updates.", checked: emailNotifications, onChange: setEmailNotifications },
                ].map(({ label, desc, checked, onChange }) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", borderBottom: "1px solid #1F2937" }}>
                    <div>
                      <div style={{ color: "#E4E4E7", fontSize: 13, fontWeight: 500 }}>{label}</div>
                      <div style={{ color: "#6B7280", fontSize: 11, marginTop: 2 }}>{desc}</div>
                    </div>
                    <Toggle checked={checked} onChange={onChange} />
                  </div>
                ))}
              </div>

              {/* Danger Zone */}
              <div style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 14, padding: "20px 24px" }}>
                <h3 style={{ color: "#EF4444", fontSize: 14, fontWeight: 700, margin: "0 0 4px 0", display: "flex", alignItems: "center", gap: 8 }}>
                  <AlertTriangle size={15} /> Danger Zone
                </h3>
                <div style={{ height: 1, background: "rgba(239,68,68,0.2)", margin: "12px 0" }} />
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ color: "#E4E4E7", fontSize: 13, fontWeight: 500 }}>Reset All Data</div>
                    <div style={{ color: "#6B7280", fontSize: 11, marginTop: 2 }}>This will permanently delete all platform data. This action cannot be undone.</div>
                  </div>
                  <button style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 8, padding: "9px 16px", color: "#EF4444", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", flexShrink: 0, marginLeft: 16 }}>
                    Reset Platform
                  </button>
                </div>
              </div>
            </>
          )}
          {/* ══ AI PROFESSOR ══ */}
          {activeTab === "ai-professor" && (
            <AIProfessorTab />
          )}

        </div>
      </div>

      {/* ── Add User Modal ── */}
      {showAddUser && (
        <div onClick={() => setShowAddUser(false)} style={{ position: "fixed" as const, inset: 0, zIndex: 100, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "#111827", border: "1px solid #374151", borderRadius: 20, padding: 24, width: 380 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <span style={{ color: "#fff", fontSize: 16, fontWeight: 700 }}>Add User</span>
              <button onClick={() => setShowAddUser(false)} style={{ background: "none", border: "none", color: "#6B7280", cursor: "pointer", fontSize: 20 }}>×</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column" as const, gap: 14 }}>
              <div><label style={labelStyle}>Full Name *</label><input value={newUserName} onChange={(e) => setNewUserName(e.target.value)} placeholder="e.g. John Smith" style={inputStyle} /></div>
              <div><label style={labelStyle}>Email *</label><input value={newUserEmail} onChange={(e) => setNewUserEmail(e.target.value)} placeholder="john@nexora.edu" style={inputStyle} /></div>
              <div>
                <label style={labelStyle}>Role</label>
                <select value={newUserRole} onChange={(e) => setNewUserRole(e.target.value as "student" | "instructor" | "admin")} style={inputStyle}>
                  <option value="student">Student</option>
                  <option value="instructor">Instructor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <button onClick={handleAddUser} disabled={!newUserName.trim() || !newUserEmail.trim()} style={{ background: newUserName.trim() ? "#6D5DFC" : "rgba(109,93,252,0.3)", border: "none", borderRadius: 10, padding: 11, color: "#fff", fontSize: 13, fontWeight: 600, cursor: newUserName.trim() ? "pointer" : "not-allowed", fontFamily: "inherit" }}>
                Add User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Add Course Modal ── */}
      {showAddCourse && (
        <div onClick={() => setShowAddCourse(false)} style={{ position: "fixed" as const, inset: 0, zIndex: 100, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "#111827", border: "1px solid #374151", borderRadius: 20, padding: 24, width: 380 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <span style={{ color: "#fff", fontSize: 16, fontWeight: 700 }}>Add Course</span>
              <button onClick={() => setShowAddCourse(false)} style={{ background: "none", border: "none", color: "#6B7280", cursor: "pointer", fontSize: 20 }}>×</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column" as const, gap: 14 }}>
              <div><label style={labelStyle}>Course Title *</label><input value={newCourseTitle} onChange={(e) => setNewCourseTitle(e.target.value)} placeholder="e.g. Machine Learning" style={inputStyle} /></div>
              <div>
                <label style={labelStyle}>Instructor</label>
                <select value={newCourseInstructor} onChange={(e) => setNewCourseInstructor(e.target.value)} style={inputStyle}>
                  <option>Prof. Lucas</option>
                  <option>Prof. Ava</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Category</label>
                <select value={newCourseCategory} onChange={(e) => setNewCourseCategory(e.target.value)} style={inputStyle}>
                  {["Computer Science", "Artificial Intelligence", "Programming", "Mathematics", "Data Science"].map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <button onClick={handleAddCourse} disabled={!newCourseTitle.trim()} style={{ background: newCourseTitle.trim() ? "#6D5DFC" : "rgba(109,93,252,0.3)", border: "none", borderRadius: 10, padding: 11, color: "#fff", fontSize: 13, fontWeight: 600, cursor: newCourseTitle.trim() ? "pointer" : "not-allowed", fontFamily: "inherit" }}>
                Add Course
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Add Announcement Modal ── */}
      {showAddAnnouncement && (
        <div onClick={() => setShowAddAnnouncement(false)} style={{ position: "fixed" as const, inset: 0, zIndex: 100, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "#111827", border: "1px solid #374151", borderRadius: 20, padding: 24, width: 420 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <span style={{ color: "#fff", fontSize: 16, fontWeight: 700 }}>New Announcement</span>
              <button onClick={() => setShowAddAnnouncement(false)} style={{ background: "none", border: "none", color: "#6B7280", cursor: "pointer", fontSize: 20 }}>×</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column" as const, gap: 14 }}>
              <div><label style={labelStyle}>Title *</label><input value={newAnnTitle} onChange={(e) => setNewAnnTitle(e.target.value)} placeholder="Announcement title" style={inputStyle} /></div>
              <div>
                <label style={labelStyle}>Send To</label>
                <select value={newAnnTarget} onChange={(e) => setNewAnnTarget(e.target.value as "all" | "students" | "instructors")} style={inputStyle}>
                  <option value="all">All Users</option>
                  <option value="students">Students Only</option>
                  <option value="instructors">Instructors Only</option>
                </select>
              </div>
              <div><label style={labelStyle}>Message *</label><textarea value={newAnnMessage} onChange={(e) => setNewAnnMessage(e.target.value)} placeholder="Write your announcement..." rows={4} style={{ ...inputStyle, resize: "vertical" as const }} /></div>
              <button onClick={handleAddAnnouncement} disabled={!newAnnTitle.trim() || !newAnnMessage.trim()} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: newAnnTitle.trim() ? "#6D5DFC" : "rgba(109,93,252,0.3)", border: "none", borderRadius: 10, padding: 11, color: "#fff", fontSize: 13, fontWeight: 600, cursor: newAnnTitle.trim() ? "pointer" : "not-allowed", fontFamily: "inherit" }}>
                <Send size={14} /> Send Announcement
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}