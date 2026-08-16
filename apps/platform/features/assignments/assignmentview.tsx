"use client";

import { useEffect, useState } from "react";
import { assignmentService, AssignmentData } from "@/services/assignmentService";
import { submissionService } from "@/services/submissionService";
import {
  Search, Filter, Plus, Clock, CheckCircle2, AlertCircle,
  ChevronDown, ChevronRight, Calendar, BookOpen, Upload,
  MoreHorizontal, Eye, Trash2, X, Paperclip, Send
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Assignment {
  id: number | string;
  title: string;
  course: string;
  courseColor: string;
  dueDate: string; // YYYY-MM-DD
  dueTime: string;
  status: "pending" | "submitted" | "graded" | "overdue";
  grade?: string;
  description: string;
  totalMarks: number;
  attachments?: string[];
  submittedFile?: string;
}

type FilterType = "all" | "due-today" | "past-due" | "upcoming" | "submitted" | "graded";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function toYMD(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function todayYMD(): string { return toYMD(new Date()); }

function addDays(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return toYMD(d);
}

function parseLocalDate(dateStr: string): Date {
  if (!dateStr) return new Date();
  const clean = dateStr.includes("T") ? dateStr.split("T")[0] : dateStr;
  const [y, m, d] = clean.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function formatDate(dateStr: string): string {
  return parseLocalDate(dateStr).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });
}

function getDaysLeft(dateStr: string): number {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const due = parseLocalDate(dateStr);
  return Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

function getDueLabel(assignment: Assignment): { label: string; color: string; bg: string } {
  if (assignment.status === "submitted") return { label: "Submitted", color: "#22C55E", bg: "rgba(34,197,94,0.12)" };
  if (assignment.status === "graded") return { label: `Graded: ${assignment.grade}`, color: "#6D5DFC", bg: "rgba(109,93,252,0.12)" };
  const days = getDaysLeft(assignment.dueDate);
  if (days < 0) return { label: `${Math.abs(days)}d overdue`, color: "#EF4444", bg: "rgba(239,68,68,0.12)" };
  if (days === 0) return { label: "Due Today", color: "#F59E0B", bg: "rgba(245,158,11,0.12)" };
  if (days === 1) return { label: "Due Tomorrow", color: "#F97316", bg: "rgba(249,115,22,0.12)" };
  return { label: `${days}d left`, color: "#6B7280", bg: "rgba(107,114,128,0.12)" };
}

// ─── Initial Data ─────────────────────────────────────────────────────────────

const INITIAL_ASSIGNMENTS: Assignment[] = [
  {
    id: 1, title: "ER Diagram Design", course: "Database 101", courseColor: "#6D5DFC",
    dueDate: todayYMD(), dueTime: "11:59 PM", status: "pending",
    description: "Design a complete ER diagram for a university management system. Include all entities, relationships, and cardinalities. Submit as a PDF file.",
    totalMarks: 20, attachments: ["ER_Diagram_Guidelines.pdf"],
  },
  {
    id: 2, title: "Neural Network Implementation", course: "AI Engineering", courseColor: "#3B82F6",
    dueDate: todayYMD(), dueTime: "11:59 PM", status: "pending",
    description: "Implement a simple neural network from scratch using Python. Train it on the MNIST dataset and achieve at least 90% accuracy.",
    totalMarks: 30, attachments: ["starter_code.zip", "dataset_instructions.pdf"],
  },
  {
    id: 3, title: "Normalization Quiz", course: "Database 101", courseColor: "#6D5DFC",
    dueDate: addDays(-2), dueTime: "11:59 PM", status: "overdue",
    description: "Complete the online quiz on database normalization covering 1NF, 2NF, 3NF and BCNF.",
    totalMarks: 10,
  },
  {
    id: 4, title: "Python OOP Assignment", course: "Python Programming", courseColor: "#F59E0B",
    dueDate: addDays(-5), dueTime: "11:59 PM", status: "submitted",
    description: "Implement a library management system using object-oriented programming concepts in Python.",
    totalMarks: 25, submittedFile: "library_system.py",
  },
];

const COURSE_FILTERS = ["All Courses", "Database 101", "AI Engineering", "Python Programming", "Data Structures", "Math for CS"];

// ─── Sub Components ──────────────────────────────────────────────────────────

function StatCard({ label, value, color, icon: Icon }: { label: string; value: number; color: string; icon: React.ElementType }) {
  return (
    <div style={{ background: "#111827", border: "1px solid #1F2937", borderRadius: 12, padding: "16px 20px", display: "flex", alignItems: "center", gap: 14, flex: 1 }}>
      <div style={{ width: 42, height: 42, borderRadius: 10, background: `${color}18`, border: `1px solid ${color}33`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon size={20} color={color} />
      </div>
      <div>
        <div style={{ color: "#fff", fontSize: 22, fontWeight: 800, lineHeight: 1 }}>{value}</div>
        <div style={{ color: "#6B7280", fontSize: 12, marginTop: 3 }}>{label}</div>
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function AssignmentsView() {
  const [assignments, setAssignments] = useState<Assignment[]>(INITIAL_ASSIGNMENTS);
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [courseFilter, setCourseFilter] = useState<string>("All Courses");
  const [search, setSearch] = useState<string>("");
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({ "Due Today": true, "Past Due": true, "Upcoming": true, "Submitted": true, "Graded": true });

  // Add assignment form
  const [newTitle, setNewTitle] = useState<string>("");
  const [newCourse, setNewCourse] = useState<string>("Database 101");
  const [newDate, setNewDate] = useState<string>(todayYMD());
  const [newDesc, setNewDesc] = useState<string>("");
  const [newMarks, setNewMarks] = useState<string>("20");

  useEffect(() => {
    async function loadLiveAssignments() {
      try {
        const live = await assignmentService.getAssignments();
        if (live && live.length > 0) {
          const mapped: Assignment[] = live.map((a: any) => ({
            id: a.id,
            title: a.title,
            course: a.course?.title || "Database 101",
            courseColor: "#6D5DFC",
            dueDate: a.dueDate ? toYMD(new Date(a.dueDate)) : todayYMD(),
            dueTime: "11:59 PM",
            status: "pending",
            description: a.description || "",
            totalMarks: a.totalPoints || 20,
          }));
          setAssignments(mapped);
        }
      } catch (err) {
        console.warn("Could not load assignments from backend live API:", err);
      }
    }

    loadLiveAssignments();
  }, []);

  const handleSubmit = async (id: number | string) => {
    try {
      await submissionService.createSubmission({
        assignmentId: String(id),
        fileUrl: "my_submission.pdf",
        content: "Submitted work via platform dashboard",
      });
    } catch (err) {
      try {
        await assignmentService.submitAssignment(String(id), "my_submission.pdf");
      } catch (e) {
        console.warn("API submission note:", e);
      }
    }
    setAssignments((prev) => prev.map((a) => a.id === id ? { ...a, status: "submitted", submittedFile: "my_submission.pdf" } : a));
    setSelectedAssignment(null);
  };

  const handleAddAssignment = async () => {
    if (!newTitle.trim() || !newDate) return;
    const newA: Assignment = {
      id: Date.now(), title: newTitle, course: newCourse,
      courseColor: { "Database 101": "#6D5DFC", "AI Engineering": "#3B82F6", "Python Programming": "#F59E0B", "Data Structures": "#22C55E", "Math for CS": "#EC4899" }[newCourse] || "#6D5DFC",
      dueDate: newDate, dueTime: "11:59 PM", status: "pending",
      description: newDesc || "No description provided.", totalMarks: Number(newMarks) || 20,
    };

    try {
      await assignmentService.createAssignment({
        courseId: newCourse === "Database 101" ? "db101" : "db101",
        title: newTitle,
        description: newDesc || "No description provided.",
        dueDate: new Date(newDate).toISOString(),
        totalPoints: Number(newMarks) || 20,
      });
    } catch (err) {
      console.warn("Could not save assignment to backend DB:", err);
    }

    setAssignments((prev) => [...prev, newA]);
    setNewTitle(""); setNewDesc(""); setNewMarks("20"); setShowAddModal(false);
  };

  const today = todayYMD();

  // Stats
  const dueToday = assignments.filter((a) => a.dueDate === today && a.status === "pending").length;
  const pastDue = assignments.filter((a) => a.dueDate < today && a.status === "overdue").length;
  const upcoming = assignments.filter((a) => a.dueDate > today && a.status === "pending").length;
  const submitted = assignments.filter((a) => a.status === "submitted" || a.status === "graded").length;

  // Filter
  const filtered = assignments.filter((a) => {
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) || a.course.toLowerCase().includes(search.toLowerCase());
    const matchCourse = courseFilter === "All Courses" || a.course === courseFilter;
    let matchFilter = true;
    if (activeFilter === "due-today") matchFilter = a.dueDate === today && a.status === "pending";
    else if (activeFilter === "past-due") matchFilter = a.dueDate < today && a.status === "overdue";
    else if (activeFilter === "upcoming") matchFilter = a.dueDate > today && a.status === "pending";
    else if (activeFilter === "submitted") matchFilter = a.status === "submitted";
    else if (activeFilter === "graded") matchFilter = a.status === "graded";
    return matchSearch && matchCourse && matchFilter;
  });

  // Group
  const groups: { label: string; items: Assignment[]; color: string }[] = [
    { label: "Due Today", items: filtered.filter((a) => a.dueDate === today && a.status === "pending"), color: "#F59E0B" },
    { label: "Past Due", items: filtered.filter((a) => a.dueDate < today && a.status === "overdue"), color: "#EF4444" },
    { label: "Upcoming", items: filtered.filter((a) => a.dueDate > today && a.status === "pending"), color: "#6D5DFC" },
    { label: "Submitted", items: filtered.filter((a) => a.status === "submitted"), color: "#22C55E" },
    { label: "Graded", items: filtered.filter((a) => a.status === "graded"), color: "#A78BFA" },
  ];

  const toggleSection = (label: string) => setExpandedSections((prev) => ({ ...prev, [label]: !prev[label] }));

  const inputStyle = { width: "100%", background: "#1F2937", border: "1px solid #374151", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 13, outline: "none", fontFamily: "inherit", boxSizing: "border-box" as const, colorScheme: "dark" as const };
  const labelStyle = { color: "#9CA3AF", fontSize: 11, display: "block" as const, marginBottom: 5 };

  const FILTER_BUTTONS: { key: FilterType; label: string }[] = [
    { key: "all", label: "All" },
    { key: "due-today", label: `Due Today (${dueToday})` },
    { key: "past-due", label: `Past Due (${pastDue})` },
    { key: "upcoming", label: `Upcoming (${upcoming})` },
    { key: "submitted", label: "Submitted" },
    { key: "graded", label: "Graded" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column" as const, height: "100%", background: "#0D1117", fontFamily: "'Inter', 'Geist', sans-serif", color: "#fff", overflow: "hidden" }}>

      {/* ── Header ── */}
      <div style={{ padding: "20px 24px 16px", borderBottom: "1px solid #1F2937", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <div>
            <h1 style={{ color: "#fff", fontSize: 22, fontWeight: 800, margin: 0 }}>Assignments</h1>
            <p style={{ color: "#6B7280", fontSize: 13, margin: "4px 0 0" }}>Track and manage all your assignments in one place.</p>
          </div>
          <button onClick={() => setShowAddModal(true)} style={{ display: "flex", alignItems: "center", gap: 6, background: "#6D5DFC", border: "none", borderRadius: 8, padding: "9px 16px", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
            <Plus size={15} /> Add Assignment
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" as const }}>
          <StatCard label="Due Today" value={dueToday} color="#F59E0B" icon={Clock} />
          <StatCard label="Past Due" value={pastDue} color="#EF4444" icon={AlertCircle} />
          <StatCard label="Upcoming" value={upcoming} color="#6D5DFC" icon={Calendar} />
          <StatCard label="Submitted" value={submitted} color="#22C55E" icon={CheckCircle2} />
        </div>

        {/* Search + Course Filter */}
        <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
          <div style={{ flex: 1, position: "relative" as const }}>
            <Search size={14} color="#6B7280" style={{ position: "absolute" as const, left: 12, top: "50%", transform: "translateY(-50%)" }} />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search assignments..." style={{ ...inputStyle, paddingLeft: 34 }} />
          </div>
          <div style={{ position: "relative" as const }}>
            <select value={courseFilter} onChange={(e) => setCourseFilter(e.target.value)} style={{ ...inputStyle, width: "auto", paddingRight: 32, appearance: "none", cursor: "pointer" }}>
              {["All Courses", ...Array.from(new Set(assignments.map((a) => a.course)))].map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <ChevronDown size={13} color="#6B7280" style={{ position: "absolute" as const, right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
          </div>
        </div>

        {/* Filter tabs */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" as const }}>
          {FILTER_BUTTONS.map(({ key, label }) => (
            <button key={key} onClick={() => setActiveFilter(key)}
              style={{ background: activeFilter === key ? "#6D5DFC" : "#1F2937", border: `1px solid ${activeFilter === key ? "#6D5DFC" : "#374151"}`, borderRadius: 999, padding: "5px 14px", color: activeFilter === key ? "#fff" : "#9CA3AF", fontSize: 12, fontWeight: activeFilter === key ? 600 : 400, cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s" }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Assignment List ── */}
      <div style={{ flex: 1, overflowY: "auto" as const, padding: "16px 24px" }}>
        {groups.every((g) => g.items.length === 0) ? (
          <div style={{ textAlign: "center" as const, padding: "60px 0", color: "#4B5563" }}>
            <BookOpen size={40} color="#374151" style={{ margin: "0 auto 12px" }} />
            <div style={{ fontSize: 15, fontWeight: 600 }}>No assignments found</div>
            <div style={{ fontSize: 12, marginTop: 4 }}>Try adjusting your filters</div>
          </div>
        ) : (
          groups.map(({ label, items, color }) => items.length === 0 ? null : (
            <div key={label} style={{ marginBottom: 24 }}>
              {/* Section header */}
              <button onClick={() => toggleSection(label)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer", padding: "8px 0", marginBottom: 10, fontFamily: "inherit" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: color, flexShrink: 0 }} />
                <span style={{ color: "#fff", fontSize: 14, fontWeight: 700 }}>{label}</span>
                <span style={{ background: `${color}22`, color, fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 999 }}>{items.length}</span>
                <div style={{ flex: 1, height: 1, background: "#1F2937", marginLeft: 8 }} />
                {expandedSections[label] ? <ChevronDown size={15} color="#6B7280" /> : <ChevronRight size={15} color="#6B7280" />}
              </button>

              {/* Assignment cards */}
              {expandedSections[label] && (
                <div style={{ display: "flex", flexDirection: "column" as const, gap: 10 }}>
                  {items.sort((a, b) => a.dueDate.localeCompare(b.dueDate)).map((assignment) => {
                    const { label: dueLabel, color: dueColor, bg: dueBg } = getDueLabel(assignment);
                    return (
                      <div
                        key={assignment.id}
                        onClick={() => setSelectedAssignment(assignment)}
                        style={{ background: "#111827", border: "1px solid #1F2937", borderLeft: `3px solid ${assignment.courseColor}`, borderRadius: 10, padding: "14px 18px", cursor: "pointer", transition: "all 0.15s", display: "flex", alignItems: "center", gap: 14 }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = `${assignment.courseColor}66`; (e.currentTarget as HTMLDivElement).style.background = "#131d2e"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "#1F2937"; (e.currentTarget as HTMLDivElement).style.background = "#111827"; }}
                      >
                        {/* Status icon */}
                        <div style={{ width: 36, height: 36, borderRadius: "50%", background: `${assignment.courseColor}18`, border: `1px solid ${assignment.courseColor}33`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          {assignment.status === "submitted" || assignment.status === "graded"
                            ? <CheckCircle2 size={18} color={assignment.courseColor} />
                            : assignment.status === "overdue"
                            ? <AlertCircle size={18} color="#EF4444" />
                            : <Clock size={18} color={assignment.courseColor} />
                          }
                        </div>

                        {/* Info */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                            <span style={{ color: "#fff", fontSize: 14, fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const }}>{assignment.title}</span>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" as const }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                              <div style={{ width: 6, height: 6, borderRadius: "50%", background: assignment.courseColor }} />
                              <span style={{ color: "#9CA3AF", fontSize: 11 }}>{assignment.course}</span>
                            </div>
                            <span style={{ color: "#374151", fontSize: 11 }}>•</span>
                            <span style={{ color: "#6B7280", fontSize: 11, display: "flex", alignItems: "center", gap: 3 }}>
                              <Calendar size={10} /> {formatDate(assignment.dueDate)} at {assignment.dueTime}
                            </span>
                            <span style={{ color: "#374151", fontSize: 11 }}>•</span>
                            <span style={{ color: "#6B7280", fontSize: 11 }}>{assignment.totalMarks} marks</span>
                            {assignment.attachments && (
                              <>
                                <span style={{ color: "#374151", fontSize: 11 }}>•</span>
                                <span style={{ color: "#6B7280", fontSize: 11, display: "flex", alignItems: "center", gap: 3 }}>
                                  <Paperclip size={10} /> {assignment.attachments.length} file{assignment.attachments.length > 1 ? "s" : ""}
                                </span>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Due badge */}
                        <div style={{ background: dueBg, border: `1px solid ${dueColor}33`, borderRadius: 999, padding: "4px 12px", color: dueColor, fontSize: 11, fontWeight: 700, flexShrink: 0, whiteSpace: "nowrap" as const }}>
                          {dueLabel}
                        </div>

                        {/* Arrow */}
                        <ChevronRight size={16} color="#374151" />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* ── Assignment Detail Modal ── */}
      {selectedAssignment && (
        <div onClick={() => setSelectedAssignment(null)} style={{ position: "fixed" as const, inset: 0, zIndex: 100, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "#111827", border: `1px solid ${selectedAssignment.courseColor}33`, borderRadius: 20, width: 520, maxHeight: "85vh", overflowY: "auto" as const, boxShadow: `0 0 60px ${selectedAssignment.courseColor}18` }}>

            {/* Modal header */}
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #1F2937", display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: selectedAssignment.courseColor }} />
                  <span style={{ color: selectedAssignment.courseColor, fontSize: 12, fontWeight: 600 }}>{selectedAssignment.course}</span>
                </div>
                <h2 style={{ color: "#fff", fontSize: 18, fontWeight: 800, margin: 0, lineHeight: 1.3 }}>{selectedAssignment.title}</h2>
              </div>
              <button onClick={() => setSelectedAssignment(null)} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid #27272A", borderRadius: 8, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, marginLeft: 12 }}>
                <X size={16} color="#A1A1AA" />
              </button>
            </div>

            {/* Modal body */}
            <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column" as const, gap: 16 }}>

              {/* Status + Due badge */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" as const }}>
                {(() => { const { label, color, bg } = getDueLabel(selectedAssignment); return (
                  <div style={{ background: bg, border: `1px solid ${color}33`, borderRadius: 999, padding: "5px 14px", color, fontSize: 12, fontWeight: 700 }}>{label}</div>
                ); })()}
                <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid #27272A", borderRadius: 999, padding: "5px 14px", color: "#9CA3AF", fontSize: 12 }}>
                  {selectedAssignment.totalMarks} Marks
                </div>
              </div>

              {/* Due date */}
              <div style={{ background: "#1F2937", borderRadius: 10, padding: "12px 16px", display: "flex", alignItems: "center", gap: 10 }}>
                <Calendar size={16} color="#6B7280" />
                <div>
                  <div style={{ color: "#9CA3AF", fontSize: 11 }}>Due Date</div>
                  <div style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>{formatDate(selectedAssignment.dueDate)} at {selectedAssignment.dueTime}</div>
                </div>
              </div>

              {/* Description */}
              <div>
                <div style={{ color: "#9CA3AF", fontSize: 12, fontWeight: 600, marginBottom: 8 }}>Description</div>
                <div style={{ color: "#D1D5DB", fontSize: 13, lineHeight: 1.7, background: "#1F2937", borderRadius: 10, padding: "12px 16px" }}>
                  {selectedAssignment.description}
                </div>
              </div>

              {/* Attachments */}
              {selectedAssignment.attachments && selectedAssignment.attachments.length > 0 && (
                <div>
                  <div style={{ color: "#9CA3AF", fontSize: 12, fontWeight: 600, marginBottom: 8 }}>Attachments</div>
                  <div style={{ display: "flex", flexDirection: "column" as const, gap: 6 }}>
                    {selectedAssignment.attachments.map((file) => (
                      <div key={file} style={{ background: "#1F2937", border: "1px solid #374151", borderRadius: 8, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
                        <Paperclip size={14} color="#6B7280" />
                        <span style={{ color: "#E4E4E7", fontSize: 12, flex: 1 }}>{file}</span>
                        <Eye size={14} color="#6D5DFC" style={{ cursor: "pointer" }} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Submitted file */}
              {selectedAssignment.submittedFile && (
                <div>
                  <div style={{ color: "#9CA3AF", fontSize: 12, fontWeight: 600, marginBottom: 8 }}>Your Submission</div>
                  <div style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.25)", borderRadius: 8, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
                    <CheckCircle2 size={14} color="#22C55E" />
                    <span style={{ color: "#22C55E", fontSize: 12, flex: 1 }}>{selectedAssignment.submittedFile}</span>
                  </div>
                </div>
              )}

              {/* Grade */}
              {selectedAssignment.grade && (
                <div style={{ background: "rgba(109,93,252,0.1)", border: "1px solid rgba(109,93,252,0.25)", borderRadius: 10, padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ color: "#A78BFA", fontSize: 13, fontWeight: 600 }}>Your Grade</span>
                  <span style={{ color: "#fff", fontSize: 20, fontWeight: 800 }}>{selectedAssignment.grade}</span>
                </div>
              )}

              {/* Submit button */}
              {selectedAssignment.status === "pending" && (
                <button onClick={() => handleSubmit(selectedAssignment.id)} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: selectedAssignment.courseColor, border: "none", borderRadius: 12, padding: "12px", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                  <Upload size={16} /> Submit Assignment
                </button>
              )}
              {selectedAssignment.status === "overdue" && (
                <button onClick={() => handleSubmit(selectedAssignment.id)} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "#EF4444", border: "none", borderRadius: 12, padding: "12px", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                  <Upload size={16} /> Submit Late
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Add Assignment Modal ── */}
      {showAddModal && (
        <div onClick={() => setShowAddModal(false)} style={{ position: "fixed" as const, inset: 0, zIndex: 100, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "#111827", border: "1px solid #374151", borderRadius: 20, padding: 24, width: 420, maxHeight: "90vh", overflowY: "auto" as const }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <span style={{ color: "#fff", fontSize: 16, fontWeight: 700 }}>Add Assignment</span>
              <button onClick={() => setShowAddModal(false)} style={{ background: "none", border: "none", color: "#6B7280", cursor: "pointer", fontSize: 20 }}>×</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column" as const, gap: 14 }}>
              <div>
                <label style={labelStyle}>Title *</label>
                <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="e.g. Lab Report 3" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Course</label>
                <select value={newCourse} onChange={(e) => setNewCourse(e.target.value)} style={inputStyle}>
                  {COURSE_FILTERS.slice(1).map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Due Date *</label>
                <input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Total Marks</label>
                <input type="number" value={newMarks} onChange={(e) => setNewMarks(e.target.value)} placeholder="20" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Description</label>
                <textarea value={newDesc} onChange={(e) => setNewDesc(e.target.value)} placeholder="Assignment instructions..." rows={3} style={{ ...inputStyle, resize: "vertical" as const }} />
              </div>
              <button onClick={handleAddAssignment} disabled={!newTitle.trim()} style={{ background: newTitle.trim() ? "#6D5DFC" : "rgba(109,93,252,0.3)", border: "none", borderRadius: 10, padding: 11, color: "#fff", fontSize: 13, fontWeight: 600, cursor: newTitle.trim() ? "pointer" : "not-allowed", fontFamily: "inherit" }}>
                Add Assignment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}