"use client";

import { useState, type FormEvent } from "react";
import { X } from "lucide-react";
import { CalendarEventData } from "@/services/calendarService";
import { Course } from "@/services/courseService";

export interface LiveClassFormInput {
  courseId: string;
  title: string;
  startTime: string;
  endTime: string;
  isLive: boolean;
  location?: string;
}

interface LiveClassFormModalProps {
  event?: CalendarEventData | null;
  courses: Course[];
  onClose: () => void;
  onSubmit: (input: LiveClassFormInput) => Promise<void>;
}

function toLocalInputValue(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function LiveClassFormModal({ event, courses, onClose, onSubmit }: LiveClassFormModalProps) {
  const [form, setForm] = useState<LiveClassFormInput>({
    courseId: event?.courseId || courses[0]?.id || "",
    title: event?.title || "",
    startTime: toLocalInputValue(event?.startTime),
    endTime: toLocalInputValue(event?.endTime),
    isLive: event?.isLive ?? false,
    location: event?.location || "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await onSubmit(form);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save live class");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-lg rounded-xl border border-[#27272A] bg-[#111827] p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">{event ? "Edit Live Class" : "Schedule Live Class"}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        {error && (
          <p className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-300">Course</label>
            <select
              required
              value={form.courseId}
              onChange={(e) => setForm((prev) => ({ ...prev, courseId: e.target.value }))}
              className="w-full rounded-lg border border-[#27272A] bg-black px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#10b981]"
            >
              {courses.length === 0 && <option value="">No courses yet — add one first</option>}
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-300">Title</label>
            <input
              required
              value={form.title}
              onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
              className="w-full rounded-lg border border-[#27272A] bg-black px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#10b981]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-300">Start</label>
              <input
                required
                type="datetime-local"
                value={form.startTime}
                onChange={(e) => setForm((prev) => ({ ...prev, startTime: e.target.value }))}
                className="w-full rounded-lg border border-[#27272A] bg-black px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#10b981]"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-300">End</label>
              <input
                required
                type="datetime-local"
                value={form.endTime}
                onChange={(e) => setForm((prev) => ({ ...prev, endTime: e.target.value }))}
                className="w-full rounded-lg border border-[#27272A] bg-black px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#10b981]"
              />
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm text-slate-300">
            <input
              type="checkbox"
              checked={form.isLive}
              onChange={(e) => setForm((prev) => ({ ...prev, isLive: e.target.checked }))}
              className="h-4 w-4 rounded border-[#27272A] bg-black"
            />
            Mark as currently live
          </label>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-300 hover:bg-[#1F2937]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !form.courseId}
              className="rounded-lg bg-[#10b981] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-600 disabled:opacity-60"
            >
              {isSubmitting ? "Saving…" : event ? "Save Changes" : "Schedule"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
