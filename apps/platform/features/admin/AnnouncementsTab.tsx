"use client";

// Ported as-is from feature/adminpanel/muhammadkhan02 (intern-built prototype).
// Local mock state only — no Announcement model/endpoint exists on the backend yet.
// Do not wire this to a real API without a corresponding backend endpoint.

import { useState } from "react";
import { Bell, Plus, Send, Trash2 } from "lucide-react";

interface Announcement {
  id: number;
  title: string;
  message: string;
  target: "all" | "students" | "instructors";
  date: string;
  reads: number;
}

const ANNOUNCEMENTS: Announcement[] = [
  { id: 1, title: "Platform Maintenance", message: "The platform will be under maintenance on Sunday from 2-4 AM.", target: "all", date: "Aug 10, 2026", reads: 847 },
  { id: 2, title: "New Course Available", message: "Web Development course is now available for enrollment!", target: "students", date: "Aug 8, 2026", reads: 523 },
  { id: 3, title: "Grading Deadline", message: "Please submit all grades by August 15, 2026.", target: "instructors", date: "Aug 7, 2026", reads: 12 },
];

function Badge({ label, color, bg }: { label: string; color: string; bg: string }) {
  return (
    <span style={{ background: bg, color, fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 999, whiteSpace: "nowrap" as const }}>
      {label}
    </span>
  );
}

export function AnnouncementsTab() {
  const [announcements, setAnnouncements] = useState<Announcement[]>(ANNOUNCEMENTS);
  const [showAddAnnouncement, setShowAddAnnouncement] = useState(false);
  const [newAnnTitle, setNewAnnTitle] = useState("");
  const [newAnnMessage, setNewAnnMessage] = useState("");
  const [newAnnTarget, setNewAnnTarget] = useState<"all" | "students" | "instructors">("all");

  const inputStyle = { width: "100%", background: "#1F2937", border: "1px solid #374151", borderRadius: 8, padding: "9px 12px", color: "#fff", fontSize: 13, outline: "none", fontFamily: "inherit", boxSizing: "border-box" as const, colorScheme: "dark" as const };
  const labelStyle = { color: "#9CA3AF", fontSize: 11, display: "block" as const, marginBottom: 5 };

  const handleAddAnnouncement = () => {
    if (!newAnnTitle.trim() || !newAnnMessage.trim()) return;
    const newAnn: Announcement = {
      id: Date.now(), title: newAnnTitle, message: newAnnMessage, target: newAnnTarget,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }), reads: 0,
    };
    setAnnouncements((prev) => [newAnn, ...prev]);
    setNewAnnTitle(""); setNewAnnMessage(""); setShowAddAnnouncement(false);
  };

  const handleDeleteAnnouncement = (id: number) => setAnnouncements((prev) => prev.filter((a) => a.id !== id));

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <h1 style={{ color: "#fff", fontSize: 20, fontWeight: 800, margin: 0 }}>Announcements</h1>
          <p style={{ color: "#6B7280", fontSize: 12, margin: "4px 0 0" }}>Send announcements to users.</p>
        </div>
        <button onClick={() => setShowAddAnnouncement(true)} style={{ display: "flex", alignItems: "center", gap: 6, background: "#059669", border: "none", borderRadius: 8, padding: "9px 16px", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
          <Plus size={14} /> New Announcement
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column" as const, gap: 12 }}>
        {announcements.map((ann) => (
          <div key={ann.id} style={{ background: "#111827", border: "1px solid #1F2937", borderRadius: 14, padding: "18px 20px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <Bell size={15} color="#059669" />
                  <span style={{ color: "#fff", fontSize: 14, fontWeight: 700 }}>{ann.title}</span>
                  <Badge label={`To: ${ann.target}`} color="#34d399" bg="rgba(5,150,105,0.12)" />
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
              <button onClick={handleAddAnnouncement} disabled={!newAnnTitle.trim() || !newAnnMessage.trim()} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: newAnnTitle.trim() ? "#059669" : "rgba(5,150,105,0.3)", border: "none", borderRadius: 10, padding: 11, color: "#fff", fontSize: 13, fontWeight: 600, cursor: newAnnTitle.trim() ? "pointer" : "not-allowed", fontFamily: "inherit" }}>
                <Send size={14} /> Send Announcement
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
