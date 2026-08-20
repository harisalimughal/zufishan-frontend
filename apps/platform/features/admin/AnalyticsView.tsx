"use client";

import { AdminStats } from "@/services/adminService";
import { Course } from "@/services/courseService";

interface AnalyticsViewProps {
  stats: AdminStats;
  courses: Course[];
  assignmentCount: number;
}

export function AnalyticsView({ stats, courses, assignmentCount }: AnalyticsViewProps) {
  const tutors = stats.totalUsers - stats.totalAdmins - stats.totalStudents;
  const maxStudents = Math.max(1, ...courses.map((c) => c.totalStudents));
  const topCourses = [...courses].sort((a, b) => b.totalStudents - a.totalStudents).slice(0, 10);

  const summaryCards = [
    { label: "Total Users", value: stats.totalUsers },
    { label: "Courses", value: courses.length },
    { label: "Assignments", value: assignmentCount },
    { label: "Tutors", value: tutors },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Analytics</h1>
        <p className="mt-2 text-slate-400">
          Live figures composed from real platform data — no separate analytics store yet.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map((card) => (
          <div key={card.label} className="rounded-xl border border-[#27272A] bg-[#111827] p-6">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-400">{card.label}</p>
            <p className="mt-2 text-3xl font-bold text-[#10b981]">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-[#27272A] bg-[#111827] p-8">
        <h2 className="mb-6 text-xl font-bold text-white">Enrollment by Course</h2>
        {topCourses.length === 0 ? (
          <p className="text-slate-400">No courses yet</p>
        ) : (
          <div className="space-y-4">
            {topCourses.map((course) => (
              <div key={course.id}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-white">{course.title}</span>
                  <span className="text-slate-400">{course.totalStudents} students</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-black">
                  <div
                    className="h-full rounded-full bg-[#10b981]"
                    style={{ width: `${(course.totalStudents / maxStudents) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
