"use client";

import { useEffect, useMemo, useState } from "react";
import { courseService } from "@/services/courseService";

import {
  BarChart3,
  BrainCircuit,
  BriefcaseBusiness,
  Cloud,
  Code2,
  Database,
  Grid2X2,
  Layers3,
  List,
} from "lucide-react";

import { CategoryTabs } from "./CategoryTabs";
import { CourseCard } from "./CourseCard";
import { CourseSearch } from "./CourseSearch";

import type {
  Course,
  CourseCategory,
  CourseCategoryName,
} from "./types";

const defaultCourses: Course[] = [
  {
    id: 1,
    title: "Tajweed Foundations",
    subtitle: "From Makharij to Advanced Recitation Rules",
    category: "Qur'an & Tajweed",
    instructor: "Ustaz Ibrahim Malik",
    rating: 4.9,
    reviews: "1.2K",
    students: "8.5K",
    level: "Beginner",
    badge: "Bestseller",
    illustration: "database",
    slug: "database-101",
  },
  {
    id: 2,
    title: "Qur'anic Arabic for Beginners",
    subtitle: "Read and Understand Qur'anic Arabic from Scratch",
    category: "Arabic Language",
    instructor: "Ustaz Yusuf Rahman",
    rating: 4.8,
    reviews: "980",
    students: "7.2K",
    level: "Beginner",
    illustration: "python",
    slug: "python-programming",
  },
  {
    id: 3,
    title: "Hadith Sciences: An Introduction",
    subtitle: "Understanding Sanad, Matn and Authentication",
    category: "Hadith & Seerah",
    instructor: "Ustaza Maryam Siddiqui",
    rating: 4.9,
    reviews: "1.5K",
    students: "9.3K",
    level: "Intermediate",
    badge: "Bestseller",
    illustration: "ai",
    slug: "ai-machine-learning",
  },
  {
    id: 4,
    title: "Fiqh of Worship: Salah & Purification",
    subtitle: "Master the Rulings of Salah From Wudu to Witr",
    category: "Fiqh & Aqeedah",
    instructor: "Ustaza Amina Yusuf",
    rating: 4.8,
    reviews: "821",
    students: "6.1K",
    level: "Intermediate",
    badge: "New",
    illustration: "code",
    slug: "data-structures-algorithms",
  },
  {
    id: 5,
    title: "Seerah: The Life of the Prophet ﷺ",
    subtitle: "A Chronological Journey Through the Prophetic Biography",
    category: "Hadith & Seerah",
    instructor: "Ustaz Khalid Farooq",
    rating: 4.7,
    reviews: "732",
    students: "5.4K",
    level: "Beginner",
    illustration: "analytics",
    slug: "data-analysis-pandas",
  },
];

const categoryMap: Record<string, CourseCategoryName> = {
  programming: "Qur'an & Tajweed",
  "data-science": "Hadith & Seerah",
  "ai-ml": "Fiqh & Aqeedah",
  database: "Arabic Language",
  business: "Islamic Finance",
  "cloud-computing": "Hifz Program",
};

type SortValue = "popular" | "rating" | "title";

export function CourseCatalog() {
  const [searchValue, setSearchValue] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortValue, setSortValue] = useState<SortValue>("popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [courseList, setCourseList] = useState<Course[]>(defaultCourses);

  useEffect(() => {
    async function loadLiveCourses() {
      try {
        const liveData = await courseService.getCourses();
        if (liveData && liveData.length > 0) {
          const mapped: Course[] = liveData.map((c, idx) => ({
            id: typeof c.id === "number" ? c.id : idx + 1,
            title: c.title,
            subtitle: c.description || "Interactive AI Course",
            category: (c.category as CourseCategoryName) || "Qur'an & Tajweed",
            instructor: c.instructorName || "Ustaz Ibrahim Malik",
            rating: c.rating || 4.8,
            reviews: "500+",
            students: `${c.totalStudents || 0}`,
            level: (c.level as any) || "Beginner",
            illustration: c.category?.toLowerCase().includes("data") ? "analytics" : "code",
            slug: c.detailSlug || `course-${c.id}`,
          }));
          setCourseList(mapped);
        }
      } catch (err) {
        console.warn("Could not fetch live courses, using default catalog:", err);
      }
    }

    loadLiveCourses();
  }, []);

  const categories = useMemo<CourseCategory[]>(() => {
    return [
      {
        id: "all",
        label: "All Courses",
        courseCount: courseList.length,
        icon: Layers3,
      },
      {
        id: "programming",
        label: "Qur'an & Tajweed",
        courseCount: courseList.filter((c) => c.category === "Qur'an & Tajweed").length,
        icon: Code2,
      },
      {
        id: "data-science",
        label: "Hadith & Seerah",
        courseCount: courseList.filter((c) => c.category === "Hadith & Seerah").length,
        icon: BarChart3,
      },
      {
        id: "ai-ml",
        label: "Fiqh & Aqeedah",
        courseCount: courseList.filter((c) => c.category === "Fiqh & Aqeedah").length,
        icon: BrainCircuit,
      },
      {
        id: "database",
        label: "Arabic Language",
        courseCount: courseList.filter((c) => c.category === "Arabic Language").length,
        icon: Database,
      },
      {
        id: "business",
        label: "Islamic Finance",
        courseCount: courseList.filter((c) => c.category === "Islamic Finance").length,
        icon: BriefcaseBusiness,
      },
      {
        id: "cloud-computing",
        label: "Hifz Program",
        courseCount: courseList.filter((c) => c.category === "Hifz Program").length,
        icon: Cloud,
      },
    ];
  }, [courseList]);

  const filteredCourses = useMemo(() => {
    const search = searchValue.trim().toLowerCase();

    return courseList
      .filter((course) => {
        const selectedCategory = categoryMap[activeCategory];
        const matchesCategory =
          activeCategory === "all" || course.category === selectedCategory;

        const matchesSearch =
          !search ||
          course.title.toLowerCase().includes(search) ||
          course.subtitle.toLowerCase().includes(search) ||
          course.category.toLowerCase().includes(search);

        return matchesCategory && matchesSearch;
      })
      .sort((first, second) => {
        if (sortValue === "rating") {
          return second.rating - first.rating;
        }

        if (sortValue === "title") {
          return first.title.localeCompare(second.title);
        }

        return Number(first.id) - Number(second.id);
      });
  }, [activeCategory, courseList, searchValue, sortValue]);

  return (
    <section className="min-h-screen min-w-0 bg-[#050914] text-white">
      <div className="mx-auto w-full max-w-[1700px] px-4 py-4 sm:px-5 lg:px-6">
        <header className="flex flex-col gap-4 border-b border-[#101827] pb-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Course Catalog
            </h1>

            <p className="mt-2 text-sm text-zinc-400">
              Explore expert-led courses and start your learning journey.
            </p>
          </div>

          <CourseSearch
            searchValue={searchValue}
            onSearchChange={setSearchValue}
          />
        </header>

        <div className="mt-5">
          <CategoryTabs
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={(category) => {
              setActiveCategory(category);
            }}
          />
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-zinc-100">
            {activeCategory === "all"
              ? "All Courses"
              : categoryMap[activeCategory]}
            <span className="ml-1.5 font-normal text-zinc-500">
              ({filteredCourses.length})
            </span>
          </h2>

          <div className="flex items-center gap-2.5">
            <span className="hidden text-xs text-zinc-400 sm:block">
              Sort by
            </span>

            <select
              value={sortValue}
              onChange={(event) =>
                setSortValue(event.target.value as SortValue)
              }
              className="h-10 min-w-[150px] rounded-lg border border-[#1F2937] bg-[#0D1422] px-3 text-xs font-medium text-zinc-300 outline-none transition focus:border-primary-500"
            >
              <option value="popular">Popular</option>
              <option value="rating">Highest Rating</option>
              <option value="title">Course Name</option>
            </select>

            <div className="flex rounded-lg border border-[#1F2937] bg-[#0D1422] p-1">
              <button
                type="button"
                aria-label="Grid view"
                onClick={() => setViewMode("grid")}
                className={[
                  "grid size-8 place-items-center rounded-md transition",
                  viewMode === "grid"
                    ? "bg-primary-700 text-white"
                    : "text-zinc-500 hover:text-white",
                ].join(" ")}
              >
                <Grid2X2 size={15} />
              </button>

              <button
                type="button"
                aria-label="List view"
                onClick={() => setViewMode("list")}
                className={[
                  "grid size-8 place-items-center rounded-md transition",
                  viewMode === "list"
                    ? "bg-primary-700 text-white"
                    : "text-zinc-500 hover:text-white",
                ].join(" ")}
              >
                <List size={15} />
              </button>
            </div>
          </div>
        </div>

        {filteredCourses.length > 0 ? (
          <div
            className={
              viewMode === "grid"
                ? "mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
                : "mt-5 flex flex-col gap-4"
            }
          >
            {filteredCourses.map((course, index) => (
              <CourseCard key={`${course.id}_${index}`} course={course} index={index} />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-xl border border-[#1F2937] bg-[#0D1422] px-4 py-12 text-center">
            <p className="text-sm font-medium text-zinc-300">
              No courses found
            </p>

            <p className="mt-1 text-xs text-zinc-500">
              Try changing your search query or category filter.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}