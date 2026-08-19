"use client";

import { useEffect, useState } from "react";
import { AnalyticsView } from "@/features/admin/AnalyticsView";
import { adminService, AdminStats } from "@/services/adminService";
import { courseService, Course } from "@/services/courseService";
import { assignmentService } from "@/services/assignmentService";

export default function AdminAnalyticsPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [assignmentCount, setAssignmentCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([adminService.getStats(), courseService.getCourses(), assignmentService.getAssignments()])
      .then(([statsRes, coursesRes, assignmentsRes]) => {
        setStats(statsRes);
        setCourses(coursesRes);
        setAssignmentCount(assignmentsRes.length);
      })
      .catch((err) => setError(err?.message || "Failed to load analytics"));
  }, []);

  if (error) return <p className="text-red-400">{error}</p>;
  if (!stats) return <p className="text-slate-400">Loading…</p>;

  return <AnalyticsView stats={stats} courses={courses} assignmentCount={assignmentCount} />;
}
