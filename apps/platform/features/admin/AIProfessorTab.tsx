"use client";

// Ported as-is from feature/adminpanel/muhammadkhan02 (intern-built prototype).
// Local mock state only — no backend exists yet for AI Professor personas.
// Do not wire this to a real API without a corresponding backend endpoint.

import { useState } from "react";
import { Plus, Eye, Edit, Trash2, Check, X, Bot, Mic, Globe, Brain, Zap, Save } from "lucide-react";

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

export function AIProfessorTab() {
  const [professors, setProfessors] = useState<AIProfessor[]>(INITIAL_PROFESSORS);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingProfessor, setEditingProfessor] = useState<AIProfessor | null>(null);
  const [selectedProfessor, setSelectedProfessor] = useState<AIProfessor | null>(null);

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
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <h1 style={{ color: "#fff", fontSize: 20, fontWeight: 800, margin: "0 0 2px 0" }}>AI Professor Management</h1>
          <p style={{ color: "#6B7280", fontSize: 13, margin: 0 }}>Create and configure AI teaching identities for your courses.</p>
        </div>
        <button onClick={handleOpenCreate} style={{ display: "flex", alignItems: "center", gap: 6, background: "#6D5DFC", border: "none", borderRadius: 8, padding: "9px 16px", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
          <Plus size={14} /> Create AI Professor
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16, marginBottom: 24 }}>
        {professors.map((prof) => (
          <div key={prof.id} style={{ background: "#111827", border: "1px solid #1F2937", borderRadius: 14, padding: "20px", position: "relative" as const }}>
            <div style={{ position: "absolute" as const, top: 16, right: 16 }}>
              <span style={{ background: prof.status === "active" ? "rgba(34,197,94,0.12)" : "rgba(107,114,128,0.12)", border: `1px solid ${prof.status === "active" ? "rgba(34,197,94,0.3)" : "rgba(107,114,128,0.3)"}`, borderRadius: 999, padding: "3px 10px", color: prof.status === "active" ? "#22C55E" : "#6B7280", fontSize: 11, fontWeight: 600 }}>
                {prof.status === "active" ? "Active" : "Draft"}
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: `linear-gradient(135deg, ${prof.avatarColor}, ${prof.avatarColor}99)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 800, color: "#fff", flexShrink: 0 }}>
                {prof.avatar}
              </div>
              <div>
                <div style={{ color: "#fff", fontSize: 16, fontWeight: 700 }}>{prof.name}</div>
                <div style={{ color: "#6B7280", fontSize: 11, marginTop: 2 }}>Teaching {prof.courses} course{prof.courses !== 1 ? "s" : ""}</div>
              </div>
            </div>

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

        <div onClick={handleOpenCreate} style={{ background: "rgba(109,93,252,0.04)", border: "2px dashed rgba(109,93,252,0.2)", borderRadius: 14, padding: "20px", display: "flex", flexDirection: "column" as const, alignItems: "center", justifyContent: "center", gap: 10, cursor: "pointer", minHeight: 200, transition: "all 0.15s" }}>
          <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(109,93,252,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Plus size={22} color="#6D5DFC" />
          </div>
          <div style={{ color: "#6D5DFC", fontSize: 13, fontWeight: 600 }}>Create New AI Professor</div>
          <div style={{ color: "#6B7280", fontSize: 11, textAlign: "center" as const }}>Configure name, voice, personality and teaching style</div>
        </div>
      </div>

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
              <div>
                <label style={labelStyle}>Professor Name *</label>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Dr. Sara" style={inputStyle} />
              </div>

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

              <div>
                <label style={labelStyle}>Voice</label>
                <select value={voice} onChange={(e) => setVoice(e.target.value)} style={inputStyle}>
                  {VOICES.map((v) => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>

              <div>
                <label style={labelStyle}>Language</label>
                <select value={language} onChange={(e) => setLanguage(e.target.value)} style={inputStyle}>
                  {LANGUAGES.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>

              <div>
                <label style={labelStyle}>Personality</label>
                <select value={personality} onChange={(e) => setPersonality(e.target.value)} style={inputStyle}>
                  {PERSONALITIES.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>

              <div>
                <label style={labelStyle}>Teaching Style</label>
                <select value={teachingStyle} onChange={(e) => setTeachingStyle(e.target.value)} style={inputStyle}>
                  {TEACHING_STYLES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div>
                <label style={labelStyle}>Behaviour</label>
                <select value={behaviour} onChange={(e) => setBehaviour(e.target.value)} style={inputStyle}>
                  {BEHAVIOURS.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>

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

              <button onClick={handleSave} disabled={!name.trim()} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: name.trim() ? "#6D5DFC" : "rgba(109,93,252,0.3)", border: "none", borderRadius: 10, padding: 12, color: "#fff", fontSize: 14, fontWeight: 600, cursor: name.trim() ? "pointer" : "not-allowed", fontFamily: "inherit", marginTop: 4 }}>
                <Save size={15} /> {editingProfessor ? "Save Changes" : "Create AI Professor"}
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedProfessor && (
        <div onClick={() => setSelectedProfessor(null)} style={{ position: "fixed" as const, inset: 0, zIndex: 100, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "#111827", border: `1px solid ${selectedProfessor.avatarColor}44`, borderRadius: 20, padding: 28, width: 480, maxHeight: "85vh", overflowY: "auto" as const }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <span style={{ color: "#fff", fontSize: 16, fontWeight: 700 }}>AI Professor Details</span>
              <button onClick={() => setSelectedProfessor(null)} style={{ background: "none", border: "none", color: "#6B7280", cursor: "pointer", fontSize: 20 }}>×</button>
            </div>

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
