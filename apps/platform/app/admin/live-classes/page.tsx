"use client";

import { useEffect, useState } from "react";
import { LiveClassList } from "@/features/admin/LiveClassList";
import { LiveClassFormModal, LiveClassFormInput } from "@/features/admin/LiveClassFormModal";
import { calendarService, CalendarEventData } from "@/services/calendarService";
import { courseService, Course } from "@/services/courseService";
import { useAuth } from "@/context/AuthContext";

export default function AdminLiveClassesPage() {
  const { user } = useAuth();
  const [events, setEvents] = useState<CalendarEventData[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingEvent, setEditingEvent] = useState<CalendarEventData | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    Promise.all([calendarService.getAllEvents(), courseService.getCourses()])
      .then(([eventsRes, coursesRes]) => {
        setEvents(eventsRes.filter((e) => e.type === "CLASS"));
        setCourses(coursesRes);
      })
      .catch((err) => setError(err?.message || "Failed to load live classes"))
      .finally(() => setIsLoading(false));
  }, []);

  const handleCreate = async (input: LiveClassFormInput) => {
    if (!user) return;
    const created = await calendarService.createEvent({
      userId: user.id,
      courseId: input.courseId,
      title: input.title,
      startTime: new Date(input.startTime).toISOString(),
      endTime: new Date(input.endTime).toISOString(),
      type: "CLASS",
      isLive: input.isLive,
      location: input.location,
    });
    setEvents((prev) => [created, ...prev]);
    setIsCreating(false);
  };

  const handleUpdate = async (input: LiveClassFormInput) => {
    if (!editingEvent) return;
    const updated = await calendarService.updateEvent(editingEvent.id, {
      courseId: input.courseId,
      title: input.title,
      startTime: new Date(input.startTime).toISOString(),
      endTime: new Date(input.endTime).toISOString(),
      isLive: input.isLive,
      location: input.location,
    });
    setEvents((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
    setEditingEvent(null);
  };

  const handleDelete = async (event: CalendarEventData) => {
    if (!confirm(`Delete "${event.title}"? This cannot be undone.`)) return;
    try {
      await calendarService.deleteEvent(event.id);
      setEvents((prev) => prev.filter((e) => e.id !== event.id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete live class");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Live Classes</h1>
          <p className="mt-2 text-slate-400">Schedule and manage live class sessions</p>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          disabled={courses.length === 0}
          className="rounded-lg bg-[#3B82F6] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600 disabled:opacity-60"
        >
          + Schedule Live Class
        </button>
      </div>

      <p className="rounded-lg border border-yellow-500/30 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-300">
        Heads up: scheduled classes are only recorded on your own calendar right now — there&apos;s no backend
        concept yet of pushing this onto every enrolled student&apos;s calendar automatically.
      </p>

      {error && <p className="text-red-400">{error}</p>}
      {!isLoading && courses.length === 0 && (
        <p className="text-sm text-slate-500">Add a course first before scheduling a live class.</p>
      )}

      {isLoading ? (
        <p className="text-slate-400">Loading live classes…</p>
      ) : (
        <LiveClassList events={events} onEdit={setEditingEvent} onDelete={handleDelete} />
      )}

      {isCreating && (
        <LiveClassFormModal courses={courses} onClose={() => setIsCreating(false)} onSubmit={handleCreate} />
      )}
      {editingEvent && (
        <LiveClassFormModal
          event={editingEvent}
          courses={courses}
          onClose={() => setEditingEvent(null)}
          onSubmit={handleUpdate}
        />
      )}
    </div>
  );
}
