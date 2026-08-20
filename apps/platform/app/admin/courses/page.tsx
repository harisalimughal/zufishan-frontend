"use client";

import { useEffect, useState } from "react";
import { CourseList } from "@/features/admin/CourseList";
import { CourseFormModal } from "@/features/admin/CourseFormModal";
import { courseService, Course, CourseInput } from "@/services/courseService";

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const loadCourses = () => {
    setIsLoading(true);
    courseService
      .getCourses()
      .then(setCourses)
      .catch((err) => setError(err?.message || "Failed to load courses"))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleCreate = async (input: CourseInput) => {
    const created = await courseService.createCourse(input);
    setCourses((prev) => [created, ...prev]);
    setIsCreating(false);
  };

  const handleUpdate = async (input: CourseInput) => {
    if (!editingCourse) return;
    const updated = await courseService.updateCourse(editingCourse.id, input);
    setCourses((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    setEditingCourse(null);
  };

  const handleDelete = async (course: Course) => {
    if (!confirm(`Delete "${course.title}"? This cannot be undone.`)) return;
    try {
      await courseService.deleteCourse(course.id);
      setCourses((prev) => prev.filter((c) => c.id !== course.id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete course");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Courses</h1>
          <p className="mt-2 text-slate-400">Manage courses and their assigned professors</p>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="rounded-lg bg-[#10b981] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-600"
        >
          + Add Course
        </button>
      </div>

      {error && <p className="text-red-400">{error}</p>}

      {isLoading ? (
        <p className="text-slate-400">Loading courses…</p>
      ) : (
        <CourseList courses={courses} onEdit={setEditingCourse} onDelete={handleDelete} />
      )}

      {isCreating && (
        <CourseFormModal onClose={() => setIsCreating(false)} onSubmit={handleCreate} />
      )}
      {editingCourse && (
        <CourseFormModal
          course={editingCourse}
          onClose={() => setEditingCourse(null)}
          onSubmit={handleUpdate}
        />
      )}
    </div>
  );
}
