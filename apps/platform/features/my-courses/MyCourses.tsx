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

export function MyCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(true);

  const loadCourses = useCallback(() => {
    setCourses(getRegisteredCourses());
    setLoading(false);
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
      <section className="min-h-screen bg-[#050914] p-4 text-white">
        <p className="text-sm text-zinc-400">
          Loading your courses...
        </p>
      </section>
    );
  }

  return (
    <section className="min-h-screen min-w-0 bg-[#050914] text-white">
      <div className="mx-auto w-full max-w-[1600px] px-3 py-3 sm:px-4 lg:px-5">
        <header className="flex flex-col gap-3 border-b border-[#101827] pb-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <GraduationCap
                size={19}
                className="text-violet-400"
              />
              <h1 className="text-[17px] font-semibold tracking-tight">
                My Courses
              </h1>
            </div>

            <p className="mt-1 text-[9px] text-zinc-500">
              Access your registered courses.
            </p>
          </div>

          <div className="relative w-full md:max-w-[280px]">
            <Search
              size={13}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
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
              className="h-9 w-full rounded-lg border border-[#1F2937] bg-[#0D1422] pl-9 pr-3 text-[9px] text-white outline-none placeholder:text-zinc-600 focus:border-violet-500/50"
            />
          </div>
        </header>

        <div className="mt-4 flex items-center justify-between">
          <h2 className="text-[11px] font-semibold text-zinc-200">
            Registered Courses
          </h2>

          <span className="rounded-md border border-violet-500/20 bg-violet-500/10 px-2 py-1 text-[8px] text-violet-300">
            {courses.length} registered
          </span>
        </div>

        {filteredCourses.length > 0 ? (
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredCourses.map((course) => (
              <article
                key={course.id}
                className="flex min-w-0 flex-col overflow-hidden rounded-xl border border-[#1F2937] bg-[#0D1422] transition hover:-translate-y-0.5 hover:border-violet-500/30"
              >
                <CourseVisualHeader
                  course={course}
                  heightClassName="h-28"
                  registered
                />

                <div className="flex flex-1 flex-col p-3">
                  <h3 className="line-clamp-1 text-[11px] font-semibold">
                    {course.title}
                  </h3>

                  <p className="mt-1 line-clamp-1 text-[8px] text-zinc-500">
                    {course.subtitle}
                  </p>

                  <div className="mt-3 flex items-center justify-between text-[8px]">
                    <span className="line-clamp-1 text-zinc-400">
                      {course.instructor}
                    </span>
                    <span className="text-amber-300">
                      ★ {course.rating}
                    </span>
                  </div>

                  <div className="mt-auto grid grid-cols-[1fr_auto] gap-2 pt-4">
                    <Link
                      href={`/course-detail/${course.slug}`}
                      className="inline-flex h-8 items-center justify-center gap-1 rounded-md bg-violet-700 px-3 text-[8px] font-semibold text-white hover:bg-violet-600"
                    >
                      <CheckCircle2 size={11} />
                      Start Course
                    </Link>

                    <button
                      type="button"
                      aria-label={`Remove ${course.title}`}
                      onClick={() => handleRemove(course.id)}
                      className="grid size-8 place-items-center rounded-md border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20"
                    >
                      <Trash2 size={11} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-5 flex min-h-[360px] flex-col items-center justify-center rounded-xl border border-dashed border-[#263246] bg-[#0D1422]/60 px-4 text-center">
            <BookOpen size={30} className="text-violet-400" />
            <h2 className="mt-4 text-sm font-semibold">
              No registered courses
            </h2>
            <p className="mt-2 text-[9px] text-zinc-500">
              Register a course from the catalog.
            </p>
            <Link
              href="/course-catalog"
              className="mt-4 rounded-md bg-violet-700 px-4 py-2 text-[9px] font-semibold"
            >
              Browse Course Catalog
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
