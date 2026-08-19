"use client";

import { Course } from "@/services/courseService";

interface CourseListProps {
  courses: Course[];
  onEdit: (course: Course) => void;
  onDelete: (course: Course) => void;
}

export function CourseList({ courses, onEdit, onDelete }: CourseListProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[#27272A] bg-[#111827]">
      <table className="w-full">
        <thead className="border-b border-[#27272A]">
          <tr>
            {["Title", "Professor", "Category", "Level", "Students", "Actions"].map((h) => (
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
          {courses.map((course) => (
            <tr key={course.id} className="transition-colors hover:bg-[#1F2937]">
              <td className="px-6 py-4">
                <div className="font-medium text-white">{course.title}</div>
                <div className="text-xs text-slate-500">{course.detailSlug}</div>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-300">
                {course.instructorName}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-300">{course.category}</td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-300">{course.level}</td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-300">
                {course.totalStudents}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium space-x-3">
                <button onClick={() => onEdit(course)} className="text-[#3B82F6] hover:text-blue-400">
                  Edit
                </button>
                <button
                  onClick={() => onDelete(course)}
                  className="text-red-400 hover:text-red-300"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {courses.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-slate-400">No courses yet</p>
        </div>
      )}
    </div>
  );
}
