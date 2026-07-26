"use client";

import Link from "next/link";
import {
  Bookmark,
  BookOpen,
  Check,
  UserPlus,
} from "lucide-react";
import { useEffect, useState } from "react";

import type {
  Course,
  CourseLevel,
} from "./types";
import { CourseVisualHeader } from "./CourseVisual";
import {
  isCourseRegistered,
  registerCourse,
} from "../my-courses/storage";

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

  useEffect(() => {
    setRegistered(isCourseRegistered(course.id));
  }, [course.id]);

  function handleRegister() {
    const updatedCourses = registerCourse(course);

    setRegistered(
      updatedCourses.some(
        (item) => item.id === course.id,
      ),
    );
  }

  return (
    <article className="group flex min-w-0 flex-col overflow-hidden rounded-lg border border-[#1F2937] bg-[#0D1422] transition duration-300 hover:-translate-y-0.5 hover:border-zinc-700 hover:shadow-[0_12px_28px_rgba(0,0,0,0.35)]">
      <CourseVisualHeader course={course} />

      <div className="flex flex-1 flex-col px-2.5 pb-2.5 pt-2">
        <h3 className="line-clamp-1 text-[11px] font-semibold leading-4 text-white">
          {course.title}
        </h3>

        <p className="mt-0.5 line-clamp-1 text-[8px] leading-4 text-zinc-500">
          {course.subtitle}
        </p>

        <div className="mt-1.5 flex items-center gap-1.5">
          <div className="grid size-5 shrink-0 place-items-center rounded-full border border-amber-700/40 bg-gradient-to-br from-amber-700 to-[#18181B] text-[7px] font-semibold text-white">
            {getInitials(course.instructor)}
          </div>

          <span className="line-clamp-1 min-w-0 text-[8px] text-zinc-400">
            {course.instructor}
          </span>
        </div>

        <div className="mt-1.5 flex items-center justify-between gap-2 text-[8px]">
          <div className="flex min-w-0 items-center gap-1">
            <span className="text-amber-400">★</span>
            <span className="font-medium text-amber-300">
              {course.rating}
            </span>
            <span className="truncate text-zinc-500">
              ({course.reviews})
            </span>
          </div>

          <span className="shrink-0 text-zinc-500">
            {course.students} students
          </span>
        </div>

        <div className="mt-2 flex items-center justify-between border-t border-[#1F2937] pt-2">
          <div className="flex items-center gap-1.5 text-[8px] text-zinc-400">
            <span
              className={[
                "size-1.5 rounded-full",
                levelStyles[course.level],
              ].join(" ")}
            />
            {course.level}
          </div>

          <button
            type="button"
            aria-label={`Bookmark ${course.title}`}
            className="rounded text-zinc-500 transition hover:text-white"
          >
            <Bookmark size={11} />
          </button>
        </div>

        <div className="mt-2 grid grid-cols-2 gap-1.5">
          <Link
            href={`/course-detail/${course.slug}`}
            className="inline-flex h-7 items-center justify-center gap-1 rounded-md border border-[#2B3547] bg-[#111827] px-2 text-[8px] font-medium text-zinc-300 transition hover:border-violet-500/60 hover:text-white"
          >
            <BookOpen size={10} />
            Details
          </Link>

          <button
            type="button"
            onClick={handleRegister}
            disabled={registered}
            className={[
              "inline-flex h-7 items-center justify-center gap-1 rounded-md px-2 text-[8px] font-semibold transition",
              registered
                ? "cursor-default border border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                : "bg-violet-700 text-white hover:bg-violet-600",
            ].join(" ")}
          >
            {registered ? (
              <>
                <Check size={10} />
                Registered
              </>
            ) : (
              <>
                <UserPlus size={10} />
                Register
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
