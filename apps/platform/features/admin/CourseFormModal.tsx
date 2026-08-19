"use client";

import { useState, type FormEvent } from "react";
import { X } from "lucide-react";
import { Course, CourseInput } from "@/services/courseService";

interface CourseFormModalProps {
  course?: Course | null;
  onClose: () => void;
  onSubmit: (input: CourseInput) => Promise<void>;
}

const emptyForm: CourseInput = {
  title: "",
  detailSlug: "",
  description: "",
  instructorName: "",
  category: "",
  level: "Beginner",
};

export function CourseFormModal({ course, onClose, onSubmit }: CourseFormModalProps) {
  const [form, setForm] = useState<CourseInput>(
    course
      ? {
          title: course.title,
          detailSlug: course.detailSlug,
          description: course.description,
          instructorName: course.instructorName,
          category: course.category,
          level: course.level,
        }
      : emptyForm
  );
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof CourseInput) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await onSubmit(form);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save course");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-lg rounded-xl border border-[#27272A] bg-[#111827] p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">{course ? "Edit Course" : "Add Course"}</h2>
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
            <label className="mb-1 block text-sm font-medium text-slate-300">Title</label>
            <input
              required
              value={form.title}
              onChange={handleChange("title")}
              className="w-full rounded-lg border border-[#27272A] bg-black px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-300">
              Slug <span className="text-slate-500">(URL identifier, e.g. database-101)</span>
            </label>
            <input
              required
              value={form.detailSlug}
              onChange={handleChange("detailSlug")}
              className="w-full rounded-lg border border-[#27272A] bg-black px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-300">Description</label>
            <textarea
              required
              rows={3}
              value={form.description}
              onChange={handleChange("description")}
              className="w-full rounded-lg border border-[#27272A] bg-black px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-300">
              Professor / Instructor <span className="text-slate-500">(e.g. &quot;Prof. Lucas (AI)&quot;)</span>
            </label>
            <input
              required
              value={form.instructorName}
              onChange={handleChange("instructorName")}
              className="w-full rounded-lg border border-[#27272A] bg-black px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-300">Category</label>
              <input
                required
                value={form.category}
                onChange={handleChange("category")}
                className="w-full rounded-lg border border-[#27272A] bg-black px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-300">Level</label>
              <input
                value={form.level}
                onChange={handleChange("level")}
                className="w-full rounded-lg border border-[#27272A] bg-black px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
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
              disabled={isSubmitting}
              className="rounded-lg bg-[#3B82F6] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600 disabled:opacity-60"
            >
              {isSubmitting ? "Saving…" : course ? "Save Changes" : "Create Course"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
