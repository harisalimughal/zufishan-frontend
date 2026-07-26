"use client";

import {
  useMemo,
  useState,
} from "react";

import {
  BarChart3,
  BrainCircuit,
  BriefcaseBusiness,
  Code2,
  Database,
  Grid2X2,
  Layers3,
  List,
} from "lucide-react";

import { CategoryTabs } from "./CategoryTabs";
import { CourseCard } from "./CourseCard";
import { CourseSearch } from "./CourseSearch";
import { Pagination } from "./Pagination";

import type {
  Course,
  CourseCategory,
  CourseCategoryName,
} from "./types";

const categories: CourseCategory[] = [
  {
    id: "all",
    label: "All Courses",
    courseCount: 120,
    icon: Layers3,
  },
  {
    id: "programming",
    label: "Programming",
    courseCount: 28,
    icon: Code2,
  },
  {
    id: "data-science",
    label: "Data Science",
    courseCount: 24,
    icon: BarChart3,
  },
  {
    id: "ai-ml",
    label: "AI & ML",
    courseCount: 18,
    icon: BrainCircuit,
  },
  {
    id: "database",
    label: "Database",
    courseCount: 16,
    icon: Database,
  },
  {
    id: "business",
    label: "Business",
    courseCount: 14,
    icon: BriefcaseBusiness,
  },
];

const courses: Course[] = [
  {
    id: 1,
    title: "Database 101",
    subtitle: "From Basics to Advanced SQL",
    category: "Database",
    instructor: "Prof. Lucas (AI)",
    rating: 4.9,
    reviews: "1.2K",
    students: "8.5K",
    level: "Beginner",
    badge: "Bestseller",
    illustration: "database",
  },
  {
    id: 2,
    title: "Python Programming",
    subtitle: "Master Python from Scratch",
    category: "Programming",
    instructor: "Prof. Ethan (AI)",
    rating: 4.8,
    reviews: "980",
    students: "7.2K",
    level: "Beginner",
    illustration: "python",
  },
  {
    id: 3,
    title: "AI & Machine Learning Basics",
    subtitle: "Build Intelligent Systems",
    category: "AI & ML",
    instructor: "Prof. Ava (AI)",
    rating: 4.9,
    reviews: "1.5K",
    students: "9.3K",
    level: "Intermediate",
    badge: "Bestseller",
    illustration: "ai",
  },
  {
    id: 4,
    title: "Data Structures & Algorithms",
    subtitle: "Ace Your Coding Interviews",
    category: "Programming",
    instructor: "Prof. Zoe (AI)",
    rating: 4.8,
    reviews: "821",
    students: "6.1K",
    level: "Intermediate",
    badge: "New",
    illustration: "code",
  },
  {
    id: 5,
    title: "Data Analysis with Pandas",
    subtitle: "Analyze Data Like a Pro",
    category: "Data Science",
    instructor: "Prof. Noah (AI)",
    rating: 4.7,
    reviews: "732",
    students: "5.4K",
    level: "Beginner",
    illustration: "analytics",
  },
  {
    id: 6,
    title: "Cloud Computing Essentials",
    subtitle: "AWS, Azure & Cloud Fundamentals",
    category: "Cloud Computing",
    instructor: "Prof. Mia (AI)",
    rating: 4.6,
    reviews: "643",
    students: "4.8K",
    level: "Beginner",
    illustration: "cloud",
  },
  {
    id: 7,
    title: "Business Analytics",
    subtitle: "Data-Driven Decision Making",
    category: "Business",
    instructor: "Prof. James (AI)",
    rating: 4.7,
    reviews: "589",
    students: "3.9K",
    level: "Intermediate",
    illustration: "business",
  },
  {
    id: 8,
    title: "Deep Learning Fundamentals",
    subtitle: "Neural Networks & Beyond",
    category: "AI & ML",
    instructor: "Prof. Ava (AI)",
    rating: 4.9,
    reviews: "1.1K",
    students: "6.7K",
    level: "Advanced",
    illustration: "network",
  },
];

const categoryMap: Record<
  string,
  CourseCategoryName
> = {
  programming: "Programming",
  "data-science": "Data Science",
  "ai-ml": "AI & ML",
  database: "Database",
  business: "Business",
};

type SortValue =
  | "popular"
  | "rating"
  | "title";

export function CourseCatalog() {
  const [searchValue, setSearchValue] =
    useState("");

  const [activeCategory, setActiveCategory] =
    useState("all");

  const [sortValue, setSortValue] =
    useState<SortValue>("popular");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [viewMode, setViewMode] =
    useState<"grid" | "list">("grid");

  const filteredCourses = useMemo(() => {
    const search = searchValue
      .trim()
      .toLowerCase();

    return courses
      .filter((course) => {
        const selectedCategory =
          categoryMap[activeCategory];

        const matchesCategory =
          activeCategory === "all" ||
          course.category === selectedCategory;

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
          return first.title.localeCompare(
            second.title,
          );
        }

        return first.id - second.id;
      });
  }, [
    activeCategory,
    searchValue,
    sortValue,
  ]);

  return (
    <section className="min-h-screen min-w-0 bg-[#050914] text-white">
      <div className="mx-auto w-full max-w-[1600px] px-3 py-3 sm:px-4 lg:px-5">
        <header className="flex flex-col gap-3 border-b border-[#101827] pb-3 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="text-[17px] font-semibold leading-5 tracking-tight">
              Course Catalog
            </h1>

            <p className="mt-1 text-[9px] text-zinc-500">
              Explore expert-led courses and start
              your learning journey.
            </p>
          </div>

          <CourseSearch
            searchValue={searchValue}
            onSearchChange={setSearchValue}
          />
        </header>

        <div className="mt-3">
          <CategoryTabs
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={(category) => {
              setActiveCategory(category);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <h2 className="text-[11px] font-semibold text-zinc-100">
            All Courses{" "}
            <span className="font-normal text-zinc-500">
              (120)
            </span>
          </h2>

          <div className="flex items-center gap-2">
            <span className="hidden text-[8px] text-zinc-600 sm:block">
              Sort by
            </span>

            <select
              value={sortValue}
              onChange={(event) =>
                setSortValue(
                  event.target.value as SortValue,
                )
              }
              className="h-7 min-w-[104px] rounded-md border border-[#1F2937] bg-[#0D1422] px-2 text-[8px] text-zinc-300 outline-none"
            >
              <option value="popular">
                Popular
              </option>

              <option value="rating">
                Highest Rating
              </option>

              <option value="title">
                Course Name
              </option>
            </select>

            <div className="flex rounded-md border border-[#1F2937] bg-[#0D1422] p-0.5">
              <button
                type="button"
                onClick={() =>
                  setViewMode("grid")
                }
                className={[
                  "grid size-6 place-items-center rounded",
                  viewMode === "grid"
                    ? "bg-violet-700 text-white"
                    : "text-zinc-500",
                ].join(" ")}
              >
                <Grid2X2 size={11} />
              </button>

              <button
                type="button"
                onClick={() =>
                  setViewMode("list")
                }
                className={[
                  "grid size-6 place-items-center rounded",
                  viewMode === "list"
                    ? "bg-violet-700 text-white"
                    : "text-zinc-500",
                ].join(" ")}
              >
                <List size={12} />
              </button>
            </div>
          </div>
        </div>

        <div
          className={[
            "mt-3 grid gap-2.5",
             viewMode === "grid"
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            : "grid-cols-1 sm:grid-cols-2"
          ].join(" ")}
        >
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
            />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={10}
          onPageChange={setCurrentPage}
        />
      </div>
    </section>
  );
}