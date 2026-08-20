"use client";

import { useState, type FormEvent } from "react";
import { X } from "lucide-react";
import { AssignmentData } from "@/services/assignmentService";
import { Course } from "@/services/courseService";

export interface AssignmentFormInput {
  courseId: string;
  title: string;
  description: string;
  dueDate: string;
  totalPoints?: number;
}

interface AssignmentFormModalProps {
  assignment?: AssignmentData | null;
  courses: Course[];
  onClose: () => void;
  onSubmit: (input: AssignmentFormInput) => Promise<void>;
}

function toDateInputValue(iso?: string): string {
  if (!iso) return "";
  return iso.slice(0, 10);
}

export function AssignmentFormModal({ assignment, courses, onClose, onSubmit }: AssignmentFormModalProps) {
  const [form, setForm] = useState<AssignmentFormInput>({
    courseId: assignment?.courseId || courses[0]?.id || "",
    title: assignment?.title || "",
    description: assignment?.description || "",
    dueDate: toDateInputValue(assignment?.dueDate),
    totalPoints: assignment?.totalPoints ?? 100,
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
      setError(err instanceof Error ? err.message : "Failed to save assignment");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-lg rounded-xl border border-[#27272A] bg-[#111827] p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">{assignment ? "Edit Assignment" : "Add Assignment"}</h2>
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
              disabled={!!assignment}
              value={form.courseId}
              onChange={(e) => setForm((prev) => ({ ...prev, courseId: e.target.value }))}
              className="w-full rounded-lg border border-[#27272A] bg-black px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#10b981] disabled:opacity-60"
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

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-300">Description</label>
            <textarea
              required
              rows={3}
              value={form.description}
              onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
              className="w-full rounded-lg border border-[#27272A] bg-black px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#10b981]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-300">Due Date</label>
              <input
                required
                type="date"
                value={form.dueDate}
                onChange={(e) => setForm((prev) => ({ ...prev, dueDate: e.target.value }))}
                className="w-full rounded-lg border border-[#27272A] bg-black px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#10b981]"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-300">Total Points</label>
              <input
                type="number"
                min={1}
                value={form.totalPoints}
                onChange={(e) => setForm((prev) => ({ ...prev, totalPoints: Number(e.target.value) }))}
                className="w-full rounded-lg border border-[#27272A] bg-black px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#10b981]"
              />
            </div>
          </div>

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
              {isSubmitting ? "Saving…" : assignment ? "Save Changes" : "Create Assignment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
