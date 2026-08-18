"use client";

import Link from "next/link";
import {
  BookOpen,
  CheckCircle2,
  GraduationCap,
  Search,
  Trash2,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import type { Course } from "../course-catalog/types";
import { CourseVisualHeader } from "../course-catalog/CourseVisual";
import {
  getRegisteredCourses,
  REGISTERED_COURSES_EVENT,
  removeRegisteredCourse,
} from "./storage";

import { courseService } from "@/services/courseService";
import { enrollmentService } from "@/services/enrollmentService";

export function MyCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(true);

  const loadCourses = useCallback(async () => {
    const local = getRegisteredCourses();
    let backendCourses: Course[] = [];

    try {
      const res = await enrollmentService.getMyEnrollments();
      if (res && res.enrollments && res.enrollments.length > 0) {
        backendCourses = res.enrollments
          .filter((e) => e.course)
          .map((e, idx) => ({
            id: typeof e.course!.id === "number" ? e.course!.id : idx + 100,
            title: e.course!.title,
            subtitle: e.course!.description || "Enrolled Course",
            category: (e.course!.category as any) || "Programming",
            instructor: e.course!.instructorName || "Prof. Lucas (AI)",
            rating: e.course!.rating || 4.8,
            reviews: "500+",
            students: `${e.course!.totalStudents || 0}`,
            level: (e.course!.level as any) || "Beginner",
            illustration: "code",
            slug: e.course!.detailSlug || `course-${e.course!.id}`,
          }));
      }
    } catch (err) {
      // Backend enrollment optional fallback
    }

    if (local && local.length > 0) {
      const combined = [...local];
      for (const bc of backendCourses) {
        if (!combined.some((c) => c.slug === bc.slug)) {
          combined.push(bc);
        }
      }
      setCourses(combined);
      setLoading(false);
      return;
    }

    if (backendCourses.length > 0) {
      setCourses(backendCourses);
      setLoading(false);
      return;
    }

    try {
      const liveData = await courseService.getCourses();
      if (liveData && liveData.length > 0) {
        const mapped: Course[] = liveData.map((c, idx) => ({
          id: typeof c.id === "number" ? c.id : idx + 1,
          title: c.title,
          subtitle: c.description || "Interactive AI Course",
          category: (c.category as any) || "Programming",
          instructor: c.instructorName || "Prof. Lucas (AI)",
          rating: c.rating || 4.8,
          reviews: "500+",
          students: `${c.totalStudents || 0}`,
          level: (c.level as any) || "Beginner",
          illustration: c.category?.toLowerCase().includes("data") ? "analytics" : "code",
          slug: c.detailSlug || `course-${c.id}`,
        }));
        setCourses(mapped);
      } else {
        setCourses([]);
      }
    } catch (err) {
      console.warn("Could not fetch live courses for MyCourses:", err);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCourses();

    window.addEventListener(
      REGISTERED_COURSES_EVENT,
      loadCourses,
    );
    window.addEventListener("storage", loadCourses);
    window.addEventListener("focus", loadCourses);

    return () => {
      window.removeEventListener(
        REGISTERED_COURSES_EVENT,
        loadCourses,
      );
      window.removeEventListener("storage", loadCourses);
      window.removeEventListener("focus", loadCourses);
    };
  }, [loadCourses]);

  const filteredCourses = useMemo(() => {
    const search = searchValue.trim().toLowerCase();

    if (!search) {
      return courses;
    }

    return courses.filter((course) => {
      return (
        course.title.toLowerCase().includes(search) ||
        course.subtitle.toLowerCase().includes(search) ||
        course.category.toLowerCase().includes(search)
      );
    });
  }, [courses, searchValue]);

  function handleRemove(courseId: number) {
    setCourses(removeRegisteredCourse(courseId));
  }

  if (loading) {
    return (
      <section className="min-h-screen bg-[#050914] p-6 text-white">
        <p className="text-sm text-zinc-400">
          Loading your courses...
        </p>
      </section>
    );
  }

  return (
    <section className="min-h-screen min-w-0 bg-[#050914] text-white">
      <div className="mx-auto w-full max-w-[1700px] px-4 py-4 sm:px-5 lg:px-6">
        <header className="flex flex-col gap-4 border-b border-[#101827] pb-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <GraduationCap
                size={24}
                className="text-violet-400"
              />
              <h1 className="text-2xl font-semibold tracking-tight">
                My Courses
              </h1>
            </div>

            <p className="mt-2 text-sm text-zinc-400">
              Access and manage your registered learning paths.
            </p>
          </div>

          <div className="relative w-full md:w-[320px]">
            <Search
              size={16}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
            />

            <input
              id="my-courses-search"
              name="myCoursesSearch"
              type="search"
              value={searchValue}
              onChange={(event) =>
                setSearchValue(event.target.value)
              }
              placeholder="Search my courses..."
              className="h-10 w-full rounded-lg border border-[#1F2937] bg-[#0D1422] pl-10 pr-4 text-xs font-medium text-white outline-none placeholder:text-zinc-500 transition focus:border-violet-500"
            />
          </div>
        </header>

        <div className="mt-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-zinc-100">
            Registered Courses
          </h2>

          <span className="rounded-lg border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-300">
            {courses.length} registered
          </span>
        </div>

        {filteredCourses.length > 0 ? (
          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course, idx) => (
              <article
                key={`${course.id}_${idx}`}
                className="group flex h-full w-full min-w-0 flex-col overflow-hidden rounded-xl border border-[#1F2937] bg-[#0D1422] transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700 hover:shadow-xl"
              >
                <CourseVisualHeader
                  course={course}
                  heightClassName="h-36"
                  registered
                />

                <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
                  <div>
                    <h3 className="line-clamp-2 text-base font-semibold leading-snug text-white">
                      {course.title}
                    </h3>

                    <p className="mt-1 line-clamp-2 text-xs text-zinc-400">
                      {course.subtitle}
                    </p>

                    <div className="mt-3 flex items-center justify-between text-xs">
                      <span className="truncate text-zinc-400">
                        {course.instructor}
                      </span>
                      <span className="font-medium text-amber-300">
                        ★ {course.rating}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-[1fr_auto] gap-2.5 pt-4 border-t border-[#1F2937]">
                    <Link
                      href={`/course-detail/${course.slug}`}
                      className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-violet-600 px-3 text-xs font-semibold text-white transition hover:bg-violet-500"
                    >
                      <CheckCircle2 size={14} />
                      Start Course
                    </Link>

                    <button
                      type="button"
                      aria-label={`Remove ${course.title}`}
                      onClick={() => handleRemove(course.id)}
                      className="grid size-9 place-items-center rounded-lg border border-red-500/20 bg-red-500/10 text-red-400 transition hover:bg-red-500/20 hover:border-red-500/40"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-8 flex min-h-[380px] flex-col items-center justify-center rounded-xl border border-dashed border-[#1F2937] bg-[#0D1422]/60 px-4 text-center">
            <BookOpen size={36} className="text-violet-400" />
            <h2 className="mt-4 text-base font-semibold text-white">
              No registered courses found
            </h2>
            <p className="mt-1 text-xs text-zinc-400">
              Browse the catalog and register for courses to display them here.
            </p>
            <Link
              href="/course-catalog"
              className="mt-5 rounded-lg bg-violet-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-violet-500"
            >
              Browse Course Catalog
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}