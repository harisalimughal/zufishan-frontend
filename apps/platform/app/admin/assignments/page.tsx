"use client";

import { useEffect, useState } from "react";
import { AssignmentList } from "@/features/admin/AssignmentList";
import { AssignmentFormModal, AssignmentFormInput } from "@/features/admin/AssignmentFormModal";
import { assignmentService, AssignmentData } from "@/services/assignmentService";
import { courseService, Course } from "@/services/courseService";

export default function AdminAssignmentsPage() {
  const [assignments, setAssignments] = useState<AssignmentData[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingAssignment, setEditingAssignment] = useState<AssignmentData | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    Promise.all([assignmentService.getAssignments(), courseService.getCourses()])
      .then(([assignmentsRes, coursesRes]) => {
        setAssignments(assignmentsRes);
        setCourses(coursesRes);
      })
      .catch((err) => setError(err?.message || "Failed to load assignments"))
      .finally(() => setIsLoading(false));
  }, []);

  const handleCreate = async (input: AssignmentFormInput) => {
    const created = await assignmentService.createAssignment(input);
    setAssignments((prev) => [created, ...prev]);
    setIsCreating(false);
  };

  const handleUpdate = async (input: AssignmentFormInput) => {
    if (!editingAssignment) return;
    const updated = await assignmentService.updateAssignment(editingAssignment.id, {
      title: input.title,
      description: input.description,
      dueDate: input.dueDate,
      totalPoints: input.totalPoints,
    });
    setAssignments((prev) => prev.map((a) => (a.id === updated.id ? { ...a, ...updated } : a)));
    setEditingAssignment(null);
  };

  const handleDelete = async (assignment: AssignmentData) => {
    if (!confirm(`Delete "${assignment.title}"? This cannot be undone.`)) return;
    try {
      await assignmentService.deleteAssignment(assignment.id);
      setAssignments((prev) => prev.filter((a) => a.id !== assignment.id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete assignment");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Assignments</h1>
          <p className="mt-2 text-slate-400">Create and manage assignments across all courses</p>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          disabled={courses.length === 0}
          className="rounded-lg bg-[#3B82F6] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600 disabled:opacity-60"
        >
          + Add Assignment
        </button>
      </div>

      {error && <p className="text-red-400">{error}</p>}
      {!isLoading && courses.length === 0 && (
        <p className="text-sm text-slate-500">Add a course first before creating assignments.</p>
      )}

      {isLoading ? (
        <p className="text-slate-400">Loading assignments…</p>
      ) : (
        <AssignmentList assignments={assignments} onEdit={setEditingAssignment} onDelete={handleDelete} />
      )}

      {isCreating && (
        <AssignmentFormModal courses={courses} onClose={() => setIsCreating(false)} onSubmit={handleCreate} />
      )}
      {editingAssignment && (
        <AssignmentFormModal
          assignment={editingAssignment}
          courses={courses}
          onClose={() => setEditingAssignment(null)}
          onSubmit={handleUpdate}
        />
      )}
    </div>
  );
}
