"use client";

import { useState, useEffect } from "react";
import { calendarService } from "@/services/calendarService";
import {
  ChevronLeft, ChevronRight, Plus, RefreshCw,
  Monitor, MapPin, Wifi, Clock, CheckSquare, Trash2,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface CalendarEvent {
  id: number;
  title: string;
  subtitle: string;
  professor?: string;
  type: "live" | "lecture" | "tutorial" | "lab" | "study" | "tutor" | "custom";
  color: string;
  date: string; // YYYY-MM-DD local
  startHour: number;
  startMin: number;
  endHour: number;
  endMin: number;
  isOnline?: boolean;
}

interface Task {
  id: number;
  title: string;
  course: string;
  dueDate: string;
  completed: boolean;
}

interface MiniDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

// ✅ Fixed: use local time, not UTC
function toYMD(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function todayYMD(): string {
  return toYMD(new Date());
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function getMondayOfWeek(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  return d;
}

// ✅ Fixed: parse date string in local time
function parseLocalDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function formatDisplayDate(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function hourToPixels(hour: number, min: number): number {
  return (hour - 6) * 60 + min;
}

function eventHeight(sh: number, sm: number, eh: number, em: number): number {
  return (eh - sh) * 60 + (em - sm);
}

function getDueLabel(dateStr: string): { label: string; color: string } {
  const today = todayYMD();
  const tomorrow = toYMD(addDays(new Date(), 1));
  if (dateStr === today) return { label: "Due Today", color: "#EF4444" };
  if (dateStr === tomorrow) return { label: "Due Tomorrow", color: "#F59E0B" };
  const d = parseLocalDate(dateStr);
  return { label: `Due ${d.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`, color: "#6B7280" };
}

function getMiniCalendarDays(year: number, month: number): MiniDay[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const days: MiniDay[] = [];

  const startDow = firstDay.getDay();
  for (let i = startDow - 1; i >= 0; i--) {
    const d = new Date(year, month, -i);
    days.push({ date: d, isCurrentMonth: false, isToday: toYMD(d) === toYMD(today) });
  }
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const d = new Date(year, month, i);
    days.push({ date: d, isCurrentMonth: true, isToday: toYMD(d) === toYMD(today) });
  }
  const remaining = 42 - days.length;
  for (let i = 1; i <= remaining; i++) {
    const d = new Date(year, month + 1, i);
    days.push({ date: d, isCurrentMonth: false, isToday: toYMD(d) === toYMD(today) });
  }
  return days;
}

// ─── Initial Data ─────────────────────────────────────────────────────────────

function buildInitialEvents(): CalendarEvent[] {
  const monday = getMondayOfWeek(new Date());
  const week = Array.from({ length: 7 }, (_, i) => toYMD(addDays(monday, i)));
  let id = 1;
  const events: CalendarEvent[] = [];

  const templates = [
    { title: "Database 101", subtitle: "Live Class", professor: "Prof. Lucas", type: "live" as const, color: "#6D5DFC", dayOffset: 0, sh: 8, sm: 0, eh: 9, em: 30 },
    { title: "Python Programming", subtitle: "Lecture", professor: "Room 201", type: "lecture" as const, color: "#F59E0B", dayOffset: 0, sh: 10, sm: 0, eh: 11, em: 0 },
    { title: "Math for CS", subtitle: "Tutorial", professor: "Room 102", type: "tutorial" as const, color: "#EC4899", dayOffset: 0, sh: 13, sm: 0, eh: 14, em: 0 },
    { title: "DB Lab Session", subtitle: "Lab Practice", professor: "Lab 3", type: "lab" as const, color: "#6D5DFC", dayOffset: 0, sh: 18, sm: 0, eh: 19, em: 30 },
    { title: "AI Engineering", subtitle: "Live Class", professor: "Prof. Ava", type: "live" as const, color: "#3B82F6", dayOffset: 1, sh: 8, sm: 0, eh: 9, em: 30 },
    { title: "Data Structures", subtitle: "Lecture", professor: "Room 305", type: "lecture" as const, color: "#22C55E", dayOffset: 1, sh: 10, sm: 0, eh: 11, em: 0 },
    { title: "Study Group", subtitle: "AI Engineering", professor: "Online", type: "study" as const, color: "#3B82F6", dayOffset: 1, sh: 20, sm: 0, eh: 21, em: 0, isOnline: true },
    { title: "Database 101", subtitle: "Live Class", professor: "Prof. Lucas", type: "live" as const, color: "#6D5DFC", dayOffset: 2, sh: 8, sm: 0, eh: 9, em: 30 },
    { title: "Math for CS", subtitle: "Tutorial", professor: "Room 102", type: "tutorial" as const, color: "#EC4899", dayOffset: 2, sh: 13, sm: 0, eh: 14, em: 0 },
    { title: "AI Tutor Session", subtitle: "Ask doubts, get help", professor: "Online", type: "tutor" as const, color: "#8B5CF6", dayOffset: 2, sh: 14, sm: 30, eh: 15, em: 30, isOnline: true },
    { title: "DB Lab Session", subtitle: "Lab Practice", professor: "Lab 3", type: "lab" as const, color: "#6D5DFC", dayOffset: 2, sh: 18, sm: 0, eh: 19, em: 30 },
    { title: "AI Engineering", subtitle: "Live Class", professor: "Prof. Ava", type: "live" as const, color: "#3B82F6", dayOffset: 3, sh: 8, sm: 0, eh: 9, em: 30 },
    { title: "Python Programming", subtitle: "Lecture", professor: "Room 201", type: "lecture" as const, color: "#F59E0B", dayOffset: 3, sh: 10, sm: 0, eh: 11, em: 0 },
    { title: "Math for CS", subtitle: "Tutorial", professor: "Room 102", type: "tutorial" as const, color: "#EC4899", dayOffset: 3, sh: 13, sm: 0, eh: 14, em: 0 },
    { title: "DB Lab Session", subtitle: "Lab Practice", professor: "Lab 3", type: "lab" as const, color: "#6D5DFC", dayOffset: 3, sh: 18, sm: 0, eh: 19, em: 30 },
    { title: "Database 101", subtitle: "Live Class", professor: "Prof. Lucas", type: "live" as const, color: "#6D5DFC", dayOffset: 4, sh: 8, sm: 0, eh: 9, em: 30 },
    { title: "Data Structures", subtitle: "Lecture", professor: "Room 305", type: "lecture" as const, color: "#22C55E", dayOffset: 4, sh: 10, sm: 0, eh: 11, em: 0 },
    { title: "Math for CS", subtitle: "Tutorial", professor: "Room 102", type: "tutorial" as const, color: "#EC4899", dayOffset: 4, sh: 13, sm: 0, eh: 14, em: 0 },
    { title: "DB Lab Session", subtitle: "Lab Practice", professor: "Lab 3", type: "lab" as const, color: "#6D5DFC", dayOffset: 4, sh: 18, sm: 0, eh: 19, em: 30 },
  ];

  templates.forEach((t) => {
    if (week[t.dayOffset]) {
      events.push({ id: id++, title: t.title, subtitle: t.subtitle, professor: t.professor, type: t.type, color: t.color, date: week[t.dayOffset], startHour: t.sh, startMin: t.sm, endHour: t.eh, endMin: t.em, isOnline: t.isOnline });
    }
  });
  return events;
}

function buildInitialTasks(): Task[] {
  return [
    { id: 1, title: "Assignment: ER Diagram", course: "Database 101", dueDate: todayYMD(), completed: false },
    { id: 2, title: "Quiz: Normalization", course: "Database 101", dueDate: toYMD(addDays(new Date(), 1)), completed: false },
    { id: 3, title: "Project: Database Design", course: "Database 101", dueDate: toYMD(addDays(new Date(), 5)), completed: false },
  ];
}

const COURSE_COLORS: Record<string, string> = {
  "Database 101": "#6D5DFC",
  "AI Engineering": "#3B82F6",
  "Python Programming": "#F59E0B",
  "Data Structures": "#22C55E",
  "Math for CS": "#EC4899",
};

const HOURS = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
const DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// ─── EventBlock ──────────────────────────────────────────────────────────────

function EventBlock({ event, onClick }: { event: CalendarEvent; onClick: (e: CalendarEvent) => void }) {
  const top = hourToPixels(event.startHour, event.startMin);
  const height = Math.max(eventHeight(event.startHour, event.startMin, event.endHour, event.endMin) - 2, 20);
  return (
    <div
      onClick={() => onClick(event)}
      style={{ position: "absolute" as const, top, left: 2, right: 2, height, background: `${event.color}22`, border: `1px solid ${event.color}66`, borderLeft: `3px solid ${event.color}`, borderRadius: 6, padding: "4px 6px", cursor: "pointer", overflow: "hidden", zIndex: 1, transition: "opacity 0.15s" }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.opacity = "0.8"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.opacity = "1"; }}
    >
      <div style={{ color: event.color, fontSize: 10, fontWeight: 700, lineHeight: 1.3, whiteSpace: "nowrap" as const, overflow: "hidden", textOverflow: "ellipsis" }}>{event.title}</div>
      {height > 35 && <div style={{ color: `${event.color}cc`, fontSize: 9, lineHeight: 1.3, marginTop: 1 }}>{event.subtitle}</div>}
      {height > 50 && event.professor && (
        <div style={{ color: "#6B7280", fontSize: 9, marginTop: 1, display: "flex", alignItems: "center", gap: 3 }}>
          {event.isOnline ? <Wifi size={8} /> : event.type === "live" ? <Monitor size={8} /> : <MapPin size={8} />}
          {event.professor}
        </div>
      )}
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function CalendarView() {
  const [events, setEvents] = useState<CalendarEvent[]>(buildInitialEvents);
  const [tasks, setTasks] = useState<Task[]>(buildInitialTasks);
  const [weekStart, setWeekStart] = useState<Date>(() => getMondayOfWeek(new Date()));
  const [view, setView] = useState<"Week" | "Month">("Week");
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showAddTask, setShowAddTask] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [miniMonth, setMiniMonth] = useState<{ year: number; month: number }>({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  });

  // Add event form state
  const [newTitle, setNewTitle] = useState<string>("");
  const [newSubtitle, setNewSubtitle] = useState<string>("Custom Event");
  const [newDate, setNewDate] = useState<string>(todayYMD());
  const [newStart, setNewStart] = useState<string>("09:00");
  const [newEnd, setNewEnd] = useState<string>("10:00");
  const [newColor, setNewColor] = useState<string>("#6D5DFC");
  const [newProfessor, setNewProfessor] = useState<string>("");
  const [newIsOnline, setNewIsOnline] = useState<boolean>(false);

  // Add task form state
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const [newTaskCourse, setNewTaskCourse] = useState<string>("Database 101");
  const [newTaskDate, setNewTaskDate] = useState<string>(todayYMD());

  // Live clock
  useEffect(() => {
    const t = setInterval(() => setCurrentTime(new Date()), 30000);
    return () => clearInterval(t);
  }, []);

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const todayStr = todayYMD();
  const currentTimeTop = hourToPixels(currentTime.getHours(), currentTime.getMinutes());

  const goToToday = () => setWeekStart(getMondayOfWeek(new Date()));
  const prevWeek = () => setWeekStart((d) => addDays(d, -7));
  const nextWeek = () => setWeekStart((d) => addDays(d, 7));
  const weekLabel = `${formatDisplayDate(weekDays[0])} – ${formatDisplayDate(weekDays[6])}`;

  const upcomingEvents = events
    .filter((e) => e.date >= todayStr)
    .sort((a, b) => a.date.localeCompare(b.date) || a.startHour - b.startHour)
    .slice(0, 6);

  useEffect(() => {
    async function loadBackendEvents() {
      try {
        const live = await calendarService.getAllEvents();
        if (live && live.length > 0) {
          const mapped: CalendarEvent[] = live.map((e: any, idx: number) => {
            const startD = new Date(e.startTime);
            const endD = new Date(e.endTime);
            return {
              id: typeof e.id === "number" ? e.id : idx + 1000,
              title: e.title,
              subtitle: e.type || "Event",
              professor: e.location || undefined,
              type: "custom" as const,
              color: "#6D5DFC",
              date: toYMD(startD),
              startHour: startD.getHours(),
              startMin: startD.getMinutes(),
              endHour: endD.getHours(),
              endMin: endD.getMinutes(),
              isOnline: e.isLive || false,
            };
          });
          setEvents((prev) => [...prev, ...mapped]);
        }
      } catch (err) {
        // Fallback
      }
    }
    loadBackendEvents();
  }, []);

  const handleAddEvent = async () => {
    if (!newTitle.trim() || !newDate) return;
    const [sh, sm] = newStart.split(":").map(Number);
    const [eh, em] = newEnd.split(":").map(Number);
    if (eh < sh || (eh === sh && em <= sm)) {
      alert("End time must be after start time");
      return;
    }

    const startDate = new Date(`${newDate}T${newStart}:00`);
    const endDate = new Date(`${newDate}T${newEnd}:00`);

    try {
      await calendarService.createEvent({
        userId: "current-user",
        title: newTitle,
        startTime: startDate.toISOString(),
        endTime: endDate.toISOString(),
        location: newProfessor || undefined,
        isLive: newIsOnline,
      });
    } catch (err) {
      // Fallback
    }

    setEvents((prev) => [...prev, {
      id: Date.now(), title: newTitle, subtitle: newSubtitle || "Custom Event",
      professor: newProfessor || undefined, type: "custom", color: newColor,
      date: newDate,
      startHour: sh, startMin: sm, endHour: eh, endMin: em,
      isOnline: newIsOnline,
    }]);
    setWeekStart(getMondayOfWeek(parseLocalDate(newDate)));
    setNewTitle(""); setNewSubtitle("Custom Event"); setNewProfessor(""); setNewIsOnline(false);
    setShowAddModal(false);
  };

  const handleDeleteEvent = async (id: number) => {
    try {
      await calendarService.deleteEvent(String(id));
    } catch (err) {
      // Fallback
    }
    setEvents((prev) => prev.filter((e) => e.id !== id));
    setSelectedEvent(null);
  };

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return;
    setTasks((prev) => [...prev, {
      id: Date.now(), title: newTaskTitle, course: newTaskCourse,
      dueDate: newTaskDate, completed: false,
    }]);
    setNewTaskTitle(""); setShowAddTask(false);
  };

  const toggleTask = (id: number) => setTasks((prev) => prev.map((t) => t.id === id ? { ...t, completed: !t.completed } : t));
  const deleteTask = (id: number) => setTasks((prev) => prev.filter((t) => t.id !== id));

  const miniDays = getMiniCalendarDays(miniMonth.year, miniMonth.month);

  const inputStyle = { width: "100%", background: "#1F2937", border: "1px solid #374151", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 13, outline: "none", fontFamily: "inherit", boxSizing: "border-box" as const, colorScheme: "dark" as const };
  const labelStyle = { color: "#9CA3AF", fontSize: 11, display: "block" as const, marginBottom: 5 };

  return (
    <div style={{ display: "flex", height: "100%", background: "#0D1117", fontFamily: "'Inter', 'Geist', sans-serif", color: "#fff", overflow: "hidden", flexDirection: "column" as const }}>

      {/* ── Header ── */}
      <div style={{ padding: "16px 24px", borderBottom: "1px solid #1F2937", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div>
          <h1 style={{ color: "#fff", fontSize: 20, fontWeight: 800, margin: 0 }}>Calendar</h1>
          <p style={{ color: "#6B7280", fontSize: 12, margin: "2px 0 0" }}>Plan your schedule and never miss a class.</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button onClick={() => setShowAddTask(true)} style={{ display: "flex", alignItems: "center", gap: 5, background: "#1F2937", border: "1px solid #374151", borderRadius: 8, padding: "7px 12px", color: "#E4E4E7", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>
            <CheckSquare size={13} /> Add Task
          </button>
          <button style={{ display: "flex", alignItems: "center", gap: 5, background: "#1F2937", border: "1px solid #374151", borderRadius: 8, padding: "7px 12px", color: "#E4E4E7", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>
            <RefreshCw size={13} /> Sync
          </button>
          <button onClick={() => setShowAddModal(true)} style={{ display: "flex", alignItems: "center", gap: 5, background: "#6D5DFC", border: "none", borderRadius: 8, padding: "7px 14px", color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
            <Plus size={13} /> Add Event
          </button>
        </div>
      </div>

      {/* ── Body ── */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

        {/* ── Calendar Area ── */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" as const, overflow: "hidden" }}>

          {/* Week controls */}
          <div style={{ padding: "10px 20px", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid #1F2937", flexShrink: 0 }}>
            <button onClick={goToToday} style={{ background: "#1F2937", border: "1px solid #374151", borderRadius: 6, padding: "5px 12px", color: "#E4E4E7", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>Today</button>
            <div style={{ display: "flex", gap: 2 }}>
              <button onClick={prevWeek} style={{ background: "none", border: "none", cursor: "pointer", color: "#6B7280", display: "flex", padding: 4 }}><ChevronLeft size={16} /></button>
              <button onClick={nextWeek} style={{ background: "none", border: "none", cursor: "pointer", color: "#6B7280", display: "flex", padding: 4 }}><ChevronRight size={16} /></button>
            </div>
            <span style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>{weekLabel}</span>
            <div style={{ marginLeft: "auto", display: "flex", background: "#1F2937", borderRadius: 8, padding: 3 }}>
              {(["Week", "Month"] as const).map((v) => (
                <button key={v} onClick={() => setView(v)} style={{ background: view === v ? "#6D5DFC" : "none", border: "none", borderRadius: 6, padding: "4px 12px", color: view === v ? "#fff" : "#6B7280", fontSize: 12, fontWeight: view === v ? 600 : 400, cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s" }}>{v}</button>
              ))}
            </div>
          </div>

          {/* Day headers */}
          <div style={{ display: "flex", borderBottom: "1px solid #1F2937", flexShrink: 0 }}>
            <div style={{ width: 56, flexShrink: 0 }} />
            {weekDays.map((date, i) => {
              const isToday = toYMD(date) === todayStr;
              return (
                <div key={i} style={{ flex: 1, textAlign: "center" as const, padding: "8px 4px", borderLeft: "1px solid #1F2937" }}>
                  <div style={{ color: "#6B7280", fontSize: 10, fontWeight: 500, marginBottom: 3 }}>{DAY_NAMES[i]}</div>
                  <div style={{ width: 26, height: 26, borderRadius: "50%", background: isToday ? "#6D5DFC" : "none", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto", color: isToday ? "#fff" : "#E4E4E7", fontSize: 12, fontWeight: isToday ? 700 : 400 }}>
                    {date.getDate()}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Time grid */}
          <div style={{ flex: 1, overflowY: "auto" as const }}>
            <div style={{ display: "flex" }}>
              <div style={{ width: 56, flexShrink: 0 }}>
                {HOURS.map((h) => (
                  <div key={h} style={{ height: 60, borderBottom: "1px solid #1F2937", display: "flex", alignItems: "flex-start", justifyContent: "flex-end", paddingRight: 6, paddingTop: 3 }}>
                    <span style={{ color: "#4B5563", fontSize: 9 }}>{h === 12 ? "12 PM" : h > 12 ? `${h - 12} PM` : `${h} AM`}</span>
                  </div>
                ))}
              </div>
              {weekDays.map((date, dayIdx) => {
                const dateStr = toYMD(date);
                const isToday = dateStr === todayStr;
                const dayEvents = events.filter((e) => e.date === dateStr);
                return (
                  <div key={dayIdx} style={{ flex: 1, borderLeft: "1px solid #1F2937", position: "relative" as const, background: isToday ? "rgba(109,93,252,0.02)" : "none" }}>
                    {HOURS.map((h) => <div key={h} style={{ height: 60, borderBottom: "1px solid #1F293733" }} />)}
                    {isToday && currentTime.getHours() >= 6 && currentTime.getHours() <= 21 && (
                      <div style={{ position: "absolute" as const, top: currentTimeTop, left: 0, right: 0, zIndex: 5, display: "flex", alignItems: "center" }}>
                        <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#EF4444", flexShrink: 0, marginLeft: -3 }} />
                        <div style={{ flex: 1, height: 1, background: "#EF4444" }} />
                      </div>
                    )}
                    <div style={{ position: "absolute" as const, inset: 0 }}>
                      {dayEvents.map((event, idx) => <EventBlock key={`${event.id}_${dateStr}_${idx}`} event={event} onClick={setSelectedEvent} />)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Legend */}
          <div style={{ padding: "8px 20px", borderTop: "1px solid #1F2937", display: "flex", alignItems: "center", gap: 14, flexShrink: 0, flexWrap: "wrap" as const }}>
            <span style={{ color: "#6B7280", fontSize: 10, fontWeight: 600 }}>My Courses</span>
            {Object.entries(COURSE_COLORS).map(([name, color]) => (
              <div key={name} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: color }} />
                <span style={{ color: "#9CA3AF", fontSize: 10 }}>{name}</span>
              </div>
            ))}
            <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
              {[{ icon: Monitor, label: "Live Class" }, { icon: MapPin, label: "In-Person" }, { icon: Wifi, label: "Online" }].map(({ icon: Icon, label }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 3 }}>
                  <Icon size={10} color="#6B7280" />
                  <span style={{ color: "#6B7280", fontSize: 10 }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right Panel ── */}
        <div style={{ width: 256, background: "#111827", borderLeft: "1px solid #1F2937", display: "flex", flexDirection: "column" as const, overflowY: "auto" as const, flexShrink: 0 }}>

          {/* Mini Calendar */}
          <div style={{ padding: "14px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>
                {new Date(miniMonth.year, miniMonth.month).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </span>
              <div style={{ display: "flex", gap: 2 }}>
                <button onClick={() => setMiniMonth((m) => { const d = new Date(m.year, m.month - 1); return { year: d.getFullYear(), month: d.getMonth() }; })} style={{ background: "none", border: "none", cursor: "pointer", color: "#6B7280", display: "flex", padding: 2 }}><ChevronLeft size={13} /></button>
                <button onClick={() => setMiniMonth((m) => { const d = new Date(m.year, m.month + 1); return { year: d.getFullYear(), month: d.getMonth() }; })} style={{ background: "none", border: "none", cursor: "pointer", color: "#6B7280", display: "flex", padding: 2 }}><ChevronRight size={13} /></button>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 1, marginBottom: 3 }}>
              {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                <div key={i} style={{ textAlign: "center" as const, color: "#4B5563", fontSize: 9, fontWeight: 600, padding: "2px 0" }}>{d}</div>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 1 }}>
              {miniDays.map((d, i) => {
                const dateStr = toYMD(d.date);
                const isInWeek = weekDays.some((wd) => toYMD(wd) === dateStr);
                const hasEvents = events.some((e) => e.date === dateStr);
                return (
                  <div key={i} onClick={() => setWeekStart(getMondayOfWeek(d.date))}
                    style={{ textAlign: "center" as const, fontSize: 10, padding: "3px 1px", borderRadius: 4, cursor: "pointer", position: "relative" as const, background: d.isToday ? "#6D5DFC" : isInWeek && !d.isToday ? "rgba(109,93,252,0.15)" : "none", color: d.isToday ? "#fff" : isInWeek ? "#A78BFA" : d.isCurrentMonth ? "#9CA3AF" : "#374151", fontWeight: d.isToday ? 700 : 400 }}
                  >
                    {d.date.getDate()}
                    {hasEvents && !d.isToday && (
                      <div style={{ width: 3, height: 3, borderRadius: "50%", background: "#6D5DFC", margin: "0 auto" }} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Upcoming Events */}
          <div style={{ padding: "0 14px 14px", borderTop: "1px solid #1F2937" }}>
            <div style={{ padding: "12px 0 8px" }}>
              <span style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>Upcoming Events</span>
            </div>
            {upcomingEvents.length === 0
              ? <div style={{ color: "#4B5563", fontSize: 11, textAlign: "center" as const, padding: "12px 0" }}>No upcoming events</div>
              : (
                <div style={{ display: "flex", flexDirection: "column" as const, gap: 7 }}>
                  {upcomingEvents.map((event) => (
                    <div key={event.id} onClick={() => setSelectedEvent(event)}
                      style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", padding: 4, borderRadius: 6 }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.04)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = "none"; }}
                    >
                      <div style={{ width: 26, height: 26, borderRadius: 6, background: `${event.color}22`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <div style={{ width: 7, height: 7, borderRadius: "50%", background: event.color }} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ color: "#E4E4E7", fontSize: 11, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const }}>{event.title}</div>
                        <div style={{ color: "#6B7280", fontSize: 9 }}>
                          {event.date === todayStr ? "Today" : parseLocalDate(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })} • {event.startHour}:{String(event.startMin).padStart(2, "0")} {event.startHour >= 12 ? "PM" : "AM"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
          </div>

          {/* Tasks */}
          <div style={{ padding: "0 14px 14px", borderTop: "1px solid #1F2937" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0 8px" }}>
              <span style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>Tasks & Deadlines</span>
              <button onClick={() => setShowAddTask(true)} style={{ background: "none", border: "none", color: "#6D5DFC", fontSize: 10, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 2 }}>
                <Plus size={11} /> Add
              </button>
            </div>
            {tasks.length === 0
              ? <div style={{ color: "#4B5563", fontSize: 11, textAlign: "center" as const, padding: "12px 0" }}>No tasks</div>
              : (
                <div style={{ display: "flex", flexDirection: "column" as const, gap: 8 }}>
                  {tasks.map((task) => {
                    const { label, color } = getDueLabel(task.dueDate);
                    return (
                      <div key={task.id} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                        <button onClick={() => toggleTask(task.id)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, marginTop: 1, flexShrink: 0 }}>
                          <CheckSquare size={14} color={task.completed ? "#6D5DFC" : "#6B7280"} />
                        </button>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ color: task.completed ? "#4B5563" : "#E4E4E7", fontSize: 11, fontWeight: 600, textDecoration: task.completed ? "line-through" : "none", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const }}>{task.title}</div>
                          <div style={{ color: "#6B7280", fontSize: 9 }}>{task.course}</div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
                          <div style={{ background: `${color}22`, border: `1px solid ${color}44`, borderRadius: 4, padding: "1px 5px", color, fontSize: 8, fontWeight: 700, whiteSpace: "nowrap" as const }}>{label}</div>
                          <button onClick={() => deleteTask(task.id)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}>
                            <Trash2 size={11} color="#4B5563" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            <button onClick={() => setShowAddTask(true)} style={{ marginTop: 10, width: "100%", background: "none", border: "1px dashed #374151", borderRadius: 6, padding: 6, color: "#6B7280", fontSize: 11, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
              <Plus size={11} /> Add Task
            </button>
          </div>
        </div>
      </div>

      {/* ── Event Detail Modal ── */}
      {selectedEvent && (
        <div onClick={() => setSelectedEvent(null)} style={{ position: "fixed" as const, inset: 0, zIndex: 100, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "#111827", border: `1px solid ${selectedEvent.color}44`, borderRadius: 16, padding: 24, width: 340, boxShadow: `0 0 40px ${selectedEvent.color}22` }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: `${selectedEvent.color}22`, border: `1px solid ${selectedEvent.color}44`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: selectedEvent.color }} />
                </div>
                <div>
                  <div style={{ color: "#fff", fontSize: 15, fontWeight: 700 }}>{selectedEvent.title}</div>
                  <div style={{ color: selectedEvent.color, fontSize: 11 }}>{selectedEvent.subtitle}</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <button onClick={() => handleDeleteEvent(selectedEvent.id)} style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 6, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <Trash2 size={13} color="#EF4444" />
                </button>
                <button onClick={() => setSelectedEvent(null)} style={{ background: "none", border: "none", color: "#6B7280", cursor: "pointer", fontSize: 20 }}>×</button>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column" as const, gap: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#9CA3AF", fontSize: 12 }}>
                <Clock size={13} color="#6B7280" />
                {parseLocalDate(selectedEvent.date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })} • {selectedEvent.startHour}:{String(selectedEvent.startMin).padStart(2, "0")} – {selectedEvent.endHour}:{String(selectedEvent.endMin).padStart(2, "0")}
              </div>
              {selectedEvent.professor && (
                <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#9CA3AF", fontSize: 12 }}>
                  {selectedEvent.isOnline ? <Wifi size={13} color="#6B7280" /> : <MapPin size={13} color="#6B7280" />}
                  {selectedEvent.professor}
                </div>
              )}
            </div>
            {selectedEvent.type === "live" && (
              <button onClick={() => setSelectedEvent(null)} style={{ marginTop: 20, width: "100%", background: selectedEvent.color, border: "none", borderRadius: 10, padding: 10, color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                Join Class
              </button>
            )}
          </div>
        </div>
      )}

      {/* ── Add Event Modal ── */}
      {showAddModal && (
        <div onClick={() => setShowAddModal(false)} style={{ position: "fixed" as const, inset: 0, zIndex: 100, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "#111827", border: "1px solid #374151", borderRadius: 16, padding: 24, width: 380, maxHeight: "90vh", overflowY: "auto" as const }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <span style={{ color: "#fff", fontSize: 16, fontWeight: 700 }}>Add Event</span>
              <button onClick={() => setShowAddModal(false)} style={{ background: "none", border: "none", color: "#6B7280", cursor: "pointer", fontSize: 20 }}>×</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column" as const, gap: 14 }}>
              <div>
                <label style={labelStyle}>Event Title *</label>
                <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="e.g. Study Session" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Subtitle / Type</label>
                <input value={newSubtitle} onChange={(e) => setNewSubtitle(e.target.value)} placeholder="e.g. Live Class, Tutorial..." style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Date * (pick any date)</label>
                <input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} style={inputStyle} />
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Start Time *</label>
                  <input type="time" value={newStart} onChange={(e) => setNewStart(e.target.value)} style={inputStyle} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>End Time *</label>
                  <input type="time" value={newEnd} onChange={(e) => setNewEnd(e.target.value)} style={inputStyle} />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Location / Professor (optional)</label>
                <input value={newProfessor} onChange={(e) => setNewProfessor(e.target.value)} placeholder="e.g. Room 201 or Prof. Lucas" style={inputStyle} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input type="checkbox" id="online" checked={newIsOnline} onChange={(e) => setNewIsOnline(e.target.checked)} style={{ cursor: "pointer", accentColor: "#6D5DFC" }} />
                <label htmlFor="online" style={{ color: "#9CA3AF", fontSize: 12, cursor: "pointer" }}>Online event</label>
              </div>
              <div>
                <label style={labelStyle}>Color</label>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" as const }}>
                  {["#6D5DFC", "#3B82F6", "#F59E0B", "#22C55E", "#EC4899", "#EF4444", "#8B5CF6", "#06B6D4", "#F97316", "#10B981"].map((c) => (
                    <div key={c} onClick={() => setNewColor(c)} style={{ width: 22, height: 22, borderRadius: "50%", background: c, cursor: "pointer", border: newColor === c ? "2px solid #fff" : "2px solid transparent", transition: "border 0.15s" }} />
                  ))}
                </div>
              </div>
              <button onClick={handleAddEvent} disabled={!newTitle.trim() || !newDate} style={{ background: newTitle.trim() ? "#6D5DFC" : "rgba(109,93,252,0.3)", border: "none", borderRadius: 10, padding: 11, color: "#fff", fontSize: 13, fontWeight: 600, cursor: newTitle.trim() ? "pointer" : "not-allowed", fontFamily: "inherit", marginTop: 4 }}>
                Add Event
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Add Task Modal ── */}
      {showAddTask && (
        <div onClick={() => setShowAddTask(false)} style={{ position: "fixed" as const, inset: 0, zIndex: 100, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "#111827", border: "1px solid #374151", borderRadius: 16, padding: 24, width: 360 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <span style={{ color: "#fff", fontSize: 16, fontWeight: 700 }}>Add Task</span>
              <button onClick={() => setShowAddTask(false)} style={{ background: "none", border: "none", color: "#6B7280", cursor: "pointer", fontSize: 20 }}>×</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column" as const, gap: 14 }}>
              <div>
                <label style={labelStyle}>Task Title *</label>
                <input value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)} placeholder="e.g. Assignment: ER Diagram" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Course</label>
                <input value={newTaskCourse} onChange={(e) => setNewTaskCourse(e.target.value)} placeholder="e.g. Database 101" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Due Date * (pick any date)</label>
                <input type="date" value={newTaskDate} onChange={(e) => setNewTaskDate(e.target.value)} style={inputStyle} />
              </div>
              <button onClick={handleAddTask} disabled={!newTaskTitle.trim()} style={{ background: newTaskTitle.trim() ? "#6D5DFC" : "rgba(109,93,252,0.3)", border: "none", borderRadius: 10, padding: 11, color: "#fff", fontSize: 13, fontWeight: 600, cursor: newTaskTitle.trim() ? "pointer" : "not-allowed", fontFamily: "inherit" }}>
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}