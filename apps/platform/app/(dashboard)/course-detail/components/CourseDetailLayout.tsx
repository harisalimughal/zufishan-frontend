"use client";

import Link from "next/link";
import {
  Award,
  BookOpen,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  Clock3,
  Globe2,
  GraduationCap,
  ListVideo,
  Play,
  Share2,
  Star,
  Users,
} from "lucide-react";
import { useState } from "react";

import { enrollmentService } from "@/services/enrollmentService";
import type { CourseDetailData } from "../types";

type CourseDetailLayoutProps = {
  course: CourseDetailData;
};

const tabs = ["Curriculum", "About", "Instructors", "Reviews", "Q&A"];

export function CourseDetailLayout({ course }: CourseDetailLayoutProps) {
  const [activeTab, setActiveTab] = useState("Curriculum");
  const [openModules, setOpenModules] = useState<number[]>([1]);

  function toggleModule(moduleId: number) {
    setOpenModules((current) =>
      current.includes(moduleId)
        ? current.filter((id) => id !== moduleId)
        : [...current, moduleId],
    );
  }

  return (
    <main className="min-h-screen bg-[#050914] text-white">
      <div className="mx-auto w-full max-w-[1600px] px-3 py-3 sm:px-4 lg:px-5">
        <div className="mb-3 flex items-center gap-1.5 overflow-x-auto whitespace-nowrap text-[9px] text-zinc-500">
          <Link href="/course-catalog" className="hover:text-white">
            Course Catalog
          </Link>
          <ChevronRight size={11} />
          <span>{course.category}</span>
          <ChevronRight size={11} />
          <span className="text-zinc-300">{course.title}</span>
        </div>

        <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_300px]">
          <div className="min-w-0 space-y-3">
            <section className="rounded-xl border border-[#172033] bg-[#08101d] p-3">
              <div className="grid gap-4 md:grid-cols-[220px_minmax(0,1fr)]">
                <div className="relative flex min-h-[160px] items-center justify-center overflow-hidden rounded-lg border border-violet-500/10 bg-gradient-to-br from-violet-950 via-indigo-950 to-[#070b13]">
                  <BookOpen size={70} className="text-violet-400" />
                  <button
                    type="button"
                    aria-label={`Preview ${course.title}`}
                    className="absolute bottom-4 left-1/2 grid size-10 -translate-x-1/2 place-items-center rounded-full bg-white text-[#0b1020]"
                  >
                    <Play size={16} fill="currentColor" />
                  </button>
                  <span className="absolute bottom-1 text-[8px] text-zinc-300">
                    Preview Course
                  </span>
                </div>

                <div>
                  {course.badge && (
                    <span className="inline-flex rounded bg-violet-600 px-2 py-1 text-[8px] font-semibold">
                      {course.badge}
                    </span>
                  )}

                  <h1 className="mt-2 text-xl font-semibold sm:text-2xl">
                    {course.title}
                  </h1>
                  <p className="mt-1 text-[11px] text-zinc-300">
                    {course.subtitle}
                  </p>
                  <p className="mt-3 text-[9px] leading-5 text-zinc-500">
                    {course.description}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-4">
                    <div>
                      <p className="text-[9px] font-medium">{course.instructor}</p>
                      <p className="text-[8px] text-zinc-500">
                        {course.instructorRole}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 text-[9px]">
                      <Star size={12} className="fill-amber-400 text-amber-400" />
                      <span className="text-amber-300">{course.rating}</span>
                      <span className="text-zinc-500">({course.ratings})</span>
                    </div>

                    <div className="flex items-center gap-1 text-[9px] text-zinc-500">
                      <Users size={12} />
                      {course.students} students
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2 border-t border-[#172033] pt-3">
                <button
                  type="button"
                  className="inline-flex h-9 items-center gap-2 rounded-md bg-violet-700 px-4 text-[9px]"
                >
                  <CalendarDays size={13} />
                  Join Next Class
                </button>

                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await enrollmentService.enrollInCourse(String(course.id || "1"));
                      alert(`Successfully enrolled in ${course.title}!`);
                    } catch (err: any) {
                      alert(err.response?.data?.message || err.message || "Enrolled in course successfully!");
                    }
                  }}
                  className="inline-flex h-9 items-center gap-2 rounded-md border border-[#293247] bg-[#0d1524] px-4 text-[9px]"
                >
                  <BookOpen size={13} />
                  Register Course
                </button>

                <button
                  type="button"
                  className="inline-flex h-9 items-center gap-2 rounded-md border border-[#293247] bg-[#0d1524] px-4 text-[9px]"
                >
                  <Share2 size={13} />
                  Share
                </button>
              </div>
            </section>

            <section className="overflow-hidden rounded-xl border border-[#172033] bg-[#08101d]">
              <div className="flex overflow-x-auto border-b border-[#172033] px-3">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={[
                      "relative shrink-0 px-4 py-3 text-[9px]",
                      activeTab === tab ? "text-white" : "text-zinc-500",
                    ].join(" ")}
                  >
                    {tab}
                    {activeTab === tab && (
                      <span className="absolute inset-x-2 bottom-0 h-0.5 bg-violet-500" />
                    )}
                  </button>
                ))}
              </div>

              {activeTab === "Curriculum" ? (
                <div className="p-3">
                  <div className="mb-3 flex items-center justify-between">
                    <h2 className="text-[10px] font-semibold">
                      Course Curriculum
                    </h2>
                    <button
                      type="button"
                      onClick={() =>
                        setOpenModules(
                          openModules.length === course.curriculum.length
                            ? []
                            : course.curriculum.map((module) => module.id),
                        )
                      }
                      className="text-[8px] text-violet-400"
                    >
                      {openModules.length === course.curriculum.length
                        ? "Collapse All"
                        : "Expand All"}
                    </button>
                  </div>

                  <div className="space-y-2">
                    {course.curriculum.map((module, moduleIndex) => {
                      const isOpen = openModules.includes(module.id);

                      return (
                        <div
                          key={module.id}
                          className="overflow-hidden rounded-lg border border-[#182237] bg-[#0b1422]"
                        >
                          <button
                            type="button"
                            onClick={() => toggleModule(module.id)}
                            className="flex w-full items-center gap-3 px-3 py-3 text-left"
                          >
                            <span className="grid size-5 shrink-0 place-items-center rounded-full bg-violet-500/20 text-[8px] text-violet-300">
                              {module.completed ? <Check size={11} /> : moduleIndex + 1}
                            </span>

                            <span className="min-w-0 flex-1 truncate text-[9px] font-medium">
                              Module {moduleIndex + 1}: {module.title}
                            </span>

                            <span className="hidden text-[8px] text-zinc-500 sm:block">
                              {module.lessons.length} Lessons
                            </span>
                            <span className="hidden w-14 text-right text-[8px] text-zinc-500 sm:block">
                              {module.duration}
                            </span>
                            <ChevronDown
                              size={13}
                              className={isOpen ? "rotate-180" : ""}
                            />
                          </button>

                          {isOpen && (
                            <div className="border-t border-[#182237] px-3 py-2">
                              {module.lessons.map((lesson, lessonIndex) => (
                                <div
                                  key={`${module.id}-${lesson.id}`}
                                  className="flex items-center gap-3 px-2 py-2"
                                >
                                  <span className="grid size-4 shrink-0 place-items-center rounded-full bg-violet-600/25 text-violet-300">
                                    <Play size={7} fill="currentColor" />
                                  </span>
                                  <span className="min-w-0 flex-1 truncate text-[8px] text-zinc-300">
                                    {moduleIndex + 1}.{lessonIndex + 1} {lesson.title}
                                  </span>
                                  <span className="text-[7px] text-zinc-500">
                                    {lesson.duration}
                                  </span>
                                  {lesson.completed && (
                                    <Check size={12} className="text-emerald-400" />
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="min-h-[300px] p-5">
                  <h2 className="text-sm font-semibold">{activeTab}</h2>
                  <p className="mt-2 text-[10px] text-zinc-500">
                    Dummy {activeTab.toLowerCase()} content.
                  </p>
                </div>
              )}
            </section>
          </div>

          <aside className="space-y-3">
            <section className="rounded-xl border border-[#172033] bg-[#08101d] p-4">
              <h2 className="text-[10px] font-semibold">Course Overview</h2>
              <div className="mt-3 space-y-3">
                <OverviewRow icon={GraduationCap} label="Level" value={course.level} />
                <OverviewRow icon={Clock3} label="Duration" value={course.duration} />
                <OverviewRow
                  icon={BookOpen}
                  label="Lessons"
                  value={String(course.totalLessons)}
                />
                <OverviewRow
                  icon={ListVideo}
                  label="Live Classes"
                  value={String(course.liveClasses)}
                />
                <OverviewRow
                  icon={Award}
                  label="Certificate"
                  value={course.certificate ? "Yes" : "No"}
                />
                <OverviewRow icon={Globe2} label="Language" value={course.language} />
                <OverviewRow
                  icon={CalendarDays}
                  label="Last Updated"
                  value={course.updatedAt}
                />
              </div>
            </section>

            <section className="rounded-xl border border-[#172033] bg-[#08101d] p-4">
              <h2 className="text-[10px] font-semibold">Your Progress</h2>

              <div className="mt-4 flex items-center gap-4">
                <div
                  className="grid size-20 place-items-center rounded-full"
                  style={{
                    background: `conic-gradient(#7c3aed ${
                      course.progress * 3.6
                    }deg, #182237 0deg)`,
                  }}
                >
                  <div className="grid size-16 place-items-center rounded-full bg-[#08101d]">
                    <span className="text-xl font-semibold">{course.progress}%</span>
                  </div>
                </div>

                <div className="space-y-3 text-[8px] text-zinc-400">
                  <p>
                    Completed: {course.completedLessons} / {course.totalLessons}
                  </p>
                  <p>
                    Live Classes: {course.attendedClasses} / {course.liveClasses}
                  </p>
                  <p>
                    Assignments: {course.submittedAssignments} / 7
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="mt-4 h-9 w-full rounded-md bg-violet-700 text-[9px]"
              >
                Continue Learning
              </button>
            </section>

            <section className="rounded-xl border border-[#172033] bg-[#08101d] p-4">
              <h2 className="text-[10px] font-semibold">What you&apos;ll learn</h2>
              <ul className="mt-3 space-y-2">
                {course.outcomes.map((outcome) => (
                  <li
                    key={outcome}
                    className="flex gap-2 text-[8px] leading-4 text-zinc-400"
                  >
                    <Check size={11} className="mt-0.5 shrink-0 text-emerald-400" />
                    {outcome}
                  </li>
                ))}
              </ul>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}

type OverviewRowProps = {
  icon: typeof Clock3;
  label: string;
  value: string;
};

function OverviewRow({ icon: Icon, label, value }: OverviewRowProps) {
  return (
    <div className="flex items-center gap-2 text-[8px]">
      <Icon size={11} className="text-zinc-500" />
      <span className="flex-1 text-zinc-500">{label}</span>
      <span className="font-medium text-zinc-200">{value}</span>
    </div>
  );
}
