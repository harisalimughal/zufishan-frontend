"use client";

import { useEffect, useState, use } from "react";
import { courseService } from "@/services/courseService";
import { CourseDetailLayout } from "../components/CourseDetailLayout";
import { CourseDetailData } from "../types";

const defaultDetailFallback: CourseDetailData = {
  title: "Course Overview",
  subtitle: "Master Key Concepts & Practical Skills",
  description: "Learn syntax, fundamentals, functions, architecture, and practical development.",
  category: "Qur'an & Tajweed",
  instructor: "Ustaz Ibrahim Malik",
  instructorRole: "Lead Instructor",
  rating: 4.8,
  ratings: "500+ ratings",
  students: "1.2K",
  level: "Beginner",
  duration: "8 Weeks",
  totalLessons: 32,
  liveClasses: 12,
  certificate: true,
  language: "English",
  updatedAt: "August 2026",
  progress: 25,
  completedLessons: 8,
  attendedClasses: 4,
  submittedAssignments: 2,
  outcomes: [
    "Write clean, modular code",
    "Use core programming patterns",
    "Build real-world applications",
    "Understand database and API integration"
  ],
  curriculum: [
    {
      id: 1,
      title: "Fundamentals & Overview",
      duration: "45 min",
      completed: true,
      lessons: [
        { id: 1, title: "Course Overview", duration: "10:15", completed: true },
        { id: 2, title: "Environment Setup", duration: "15:30", completed: true }
      ]
    },
    {
      id: 2,
      title: "Core Mechanics & Architecture",
      duration: "1h 15m",
      completed: false,
      lessons: [
        { id: 1, title: "Data Structures & Control Flow", duration: "20:15" },
        { id: 2, title: "Functions & API Integration", duration: "25:00" }
      ]
    }
  ]
};

export default function DynamicCourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const [courseDetail, setCourseDetail] = useState<CourseDetailData>(defaultDetailFallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCourse() {
      try {
        const liveCourse = await courseService.getCourseBySlug(slug);
        if (liveCourse) {
          const modulesData = await courseService.getCourseModules(liveCourse.id);
          
          const curriculum = modulesData && modulesData.length > 0
            ? modulesData.map((m: any, idx: number) => ({
                id: idx + 1,
                title: m.title || `Module ${idx + 1}`,
                duration: "1h",
                completed: idx === 0,
                lessons: (m.lessons || []).map((l: any, lIdx: number) => ({
                  id: lIdx + 1,
                  title: l.title || `Lesson ${lIdx + 1}`,
                  duration: l.duration || "15 mins",
                  completed: lIdx === 0,
                })),
              }))
            : defaultDetailFallback.curriculum;

          setCourseDetail({
            ...defaultDetailFallback,
            title: liveCourse.title,
            subtitle: liveCourse.description || defaultDetailFallback.subtitle,
            description: liveCourse.description || defaultDetailFallback.description,
            category: liveCourse.category || defaultDetailFallback.category,
            instructor: liveCourse.instructorName || defaultDetailFallback.instructor,
            rating: liveCourse.rating || 4.8,
            students: `${liveCourse.totalStudents || 120}`,
            level: (liveCourse.level as any) || "Beginner",
            curriculum,
          });
        }
      } catch (err) {
        console.warn("Could not load dynamic course details from API:", err);
      } finally {
        setLoading(false);
      }
    }

    loadCourse();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050914] text-white">
        <div className="text-sm font-medium text-zinc-400">Loading course details...</div>
      </div>
    );
  }

  return <CourseDetailLayout course={courseDetail} />;
}
