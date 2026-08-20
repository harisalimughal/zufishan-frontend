"use client";

import { AssignmentData } from "@/services/assignmentService";

interface AssignmentListProps {
  assignments: AssignmentData[];
  onEdit: (assignment: AssignmentData) => void;
  onDelete: (assignment: AssignmentData) => void;
}

export function AssignmentList({ assignments, onEdit, onDelete }: AssignmentListProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[#27272A] bg-[#111827]">
      <table className="w-full">
        <thead className="border-b border-[#27272A]">
          <tr>
            {["Title", "Course", "Due Date", "Points", "Actions"].map((h) => (
              <th
                key={h}
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-400"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#27272A]">
          {assignments.map((assignment) => (
            <tr key={assignment.id} className="transition-colors hover:bg-[#1F2937]">
              <td className="px-6 py-4 font-medium text-white">{assignment.title}</td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-300">
                {assignment.course?.title || "—"}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-300">
                {new Date(assignment.dueDate).toLocaleDateString()}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-300">
                {assignment.totalPoints}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium space-x-3">
                <button onClick={() => onEdit(assignment)} className="text-[#10b981] hover:text-primary-400">
                  Edit
                </button>
                <button onClick={() => onDelete(assignment)} className="text-red-400 hover:text-red-300">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {assignments.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-slate-400">No assignments yet</p>
        </div>
      )}
    </div>
  );
}
