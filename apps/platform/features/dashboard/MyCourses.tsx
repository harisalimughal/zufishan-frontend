import Image from "next/image";
import { ChevronRight } from "lucide-react";

type Course = {
  id: string;
  title: string;
  professor: string;
  progress: number;
  image: string;
  liveClassToday?: boolean;
};

const courses: Course[] = [
  {
    id: "1",
    title: "Database Fundamentals",
    professor: "Prof. Lucas (AI)",
    progress: 72,
    image: "/course-database.png",
    liveClassToday: true,
  },
  {
    id: "2",
    title: "AI Engineering Basics",
    professor: "Prof. Ava (AI)",
    progress: 48,
    image: "/course-ai-engineering.png",
  },
  {
    id: "3",
    title: "Python Programming",
    professor: "Prof. Ethan (AI)",
    progress: 35,
    image: "/course-python.png",
  },
  {
    id: "4",
    title: "Data Structures & Algorithms",
    professor: "Prof. Zoe (AI)",
    progress: 20,
    image: "/course-dsa.png",
  },
];

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#27272A]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#3B82F6] to-[#6D5DFB] transition-all duration-500"
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="shrink-0 text-xs font-medium text-gray-400">
        {value}%
      </span>
    </div>
  );
}

export function MyCourses() {
  return (
    <div>
      {/* Section Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">My Courses</h2>
        <button className="group flex items-center gap-1.5 rounded-lg border border-[#27272A] bg-transparent px-4 py-2 text-sm font-medium text-gray-300 transition-all duration-200 hover:border-gray-500 hover:text-white">
          View all courses
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* Course Cards */}
      <div className="space-y-3">
        {courses.map((course) => (
          <div
            key={course.id}
            className="group flex flex-col gap-4 rounded-xl border border-[#27272A] bg-[#111827] p-4 transition-all duration-300 hover:border-[#3B82F6]/30 sm:flex-row sm:items-center"
          >
            {/* Course Image */}
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg sm:h-[72px] sm:w-[72px]">
              <Image
                src={course.image}
                alt={course.title}
                fill
                className="object-cover"
                sizes="72px"
              />
            </div>

            {/* Course Info */}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-sm font-semibold text-white">
                  {course.title}
                </h3>
                {course.liveClassToday && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#3B82F6]/20 px-2.5 py-0.5 text-xs font-semibold text-[#3B82F6]">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#3B82F6]" />
                    Live Class Today
                  </span>
                )}
              </div>
              <p className="mt-0.5 text-xs text-gray-400">{course.professor}</p>

              {/* Progress Bar */}
              <div className="mt-3">
                <ProgressBar value={course.progress} />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex shrink-0 gap-2 sm:flex-col">
              <button className="rounded-lg border border-[#27272A] bg-transparent px-5 py-2 text-xs font-semibold text-gray-300 transition-all duration-200 hover:border-gray-500 hover:text-white">
                {course.liveClassToday ? "Join Class" : "Continue"}
              </button>
              <button className="rounded-lg border border-[#27272A] bg-transparent px-5 py-2 text-xs font-semibold text-gray-300 transition-all duration-200 hover:border-gray-500 hover:text-white">
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
