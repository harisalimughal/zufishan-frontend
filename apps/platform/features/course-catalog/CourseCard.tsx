"use client";

import Link from "next/link";
import { Bookmark, BookOpen, Check, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import type { MouseEvent } from "react";

import type { Course, CourseLevel } from "./types";
import { CourseVisualHeader } from "./CourseVisual";
import { isCourseRegistered, registerCourse } from "../my-courses/storage";

type CourseCardProps = {
  course: Course;
};

const levelStyles: Record<CourseLevel, string> = {
  Beginner: "bg-emerald-400",
  Intermediate: "bg-amber-400",
  Advanced: "bg-red-400",
};

function getInitials(name: string) {
  return name
    .replace(/\([^)]*\)/g, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

export function CourseCard({ course }: CourseCardProps) {
  const [registered, setRegistered] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    setRegistered(isCourseRegistered(course.id));
  }, [course.id]);

  function handleRegister() {
    const updatedCourses = registerCourse(course);
    setRegistered(updatedCourses.some((item) => item.id === course.id));
  }

  function handleBookmark(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    setIsBookmarked((prev) => !prev);
  }

  return (
    <article className="group flex h-full w-full min-w-0 flex-col overflow-hidden rounded-xl border border-[#1F2937] bg-[#0D1422] transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700 hover:shadow-xl">
      <CourseVisualHeader course={course} />

      <div className="flex flex-1 flex-col justify-between p-4 sm:p-4">
        <div>
          <h3 className="line-clamp-2 text-base font-semibold leading-snug text-white">
            {course.title}
          </h3>

          <p className="mt-1 line-clamp-2 text-xs text-zinc-400">
            {course.subtitle}
          </p>

          <div className="mt-3 flex items-center gap-2">
            <div className="grid size-6 shrink-0 place-items-center rounded-full border border-amber-700/40 bg-gradient-to-br from-amber-700 to-[#18181B] text-[9px] font-semibold text-white">
              {getInitials(course.instructor)}
            </div>

            <span className="truncate text-xs text-zinc-400">
              {course.instructor}
            </span>
          </div>

          <div className="mt-3 flex items-center justify-between gap-2 text-xs">
            <div className="flex min-w-0 items-center gap-1">
              <span className="text-amber-400">★</span>
              <span className="font-medium text-amber-300">{course.rating}</span>
              <span className="truncate text-zinc-500">({course.reviews})</span>
            </div>

            <span className="shrink-0 text-xs text-zinc-500">
              {course.students} students
            </span>
          </div>
        </div>

        <div>
          <div className="mt-3 flex items-center justify-between border-t border-[#1F2937] pt-3">
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <span
                className={["size-2 rounded-full", levelStyles[course.level]].join(
                  " "
                )}
              />
              {course.level}
            </div>

            <button
              type="button"
              aria-label={`Bookmark ${course.title}`}
              aria-pressed={isBookmarked}
              onClick={handleBookmark}
              className={[
                "rounded-md p-1.5 transition hover:bg-[#1F2937]",
                isBookmarked ? "text-blue-400" : "text-zinc-500 hover:text-white",
              ].join(" ")}
            >
              <Bookmark size={14} fill={isBookmarked ? "currentColor" : "none"} />
            </button>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2.5">
            <Link
              href={`/course-detail/${course.slug}`}
              className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-[#2B3547] bg-[#111827] px-2.5 text-xs font-medium text-zinc-300 transition hover:border-violet-500/60 hover:text-white"
            >
              <BookOpen size={14} />
              Details
            </Link>

            <button
              type="button"
              onClick={handleRegister}
              disabled={registered}
              className={[
                "inline-flex h-9 items-center justify-center gap-1.5 rounded-lg px-2.5 text-xs font-semibold transition",
                registered
                  ? "cursor-default border border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                  : "bg-violet-600 text-white hover:bg-violet-500",
              ].join(" ")}
            >
              {registered ? (
                <>
                  <Check size={14} />
                  Registered
                </>
              ) : (
                <>
                  <UserPlus size={14} />
                  Register
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}