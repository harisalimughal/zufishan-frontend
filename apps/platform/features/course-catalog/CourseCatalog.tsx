"use client";

import {
  useMemo,
  useState,
} from "react";

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
  {
    id: "cloud-computing",
    label: "Cloud Computing",
    courseCount: 12,
    icon: Cloud,
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
    slug: "database-101",
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
    slug: "python-programming",
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
    slug: "ai-machine-learning",
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
    slug: "data-structures-algorithms",
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
    slug: "data-analysis-pandas",
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
    slug: "cloud-computing",
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
    slug: "business-analytics",
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
    slug: "deep-learning",
  },
];

const categoryMap: Record<string, CourseCategoryName> = {
  programming: "Programming",
  "data-science": "Data Science",
  "ai-ml": "AI & ML",
  database: "Database",
  business: "Business",
  "cloud-computing": "Cloud Computing",
};

type SortValue = "popular" | "rating" | "title";

export function CourseCatalog() {
  const [searchValue, setSearchValue] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortValue, setSortValue] = useState<SortValue>("popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredCourses = useMemo(() => {
    const search = searchValue.trim().toLowerCase();

    return courses
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

        return first.id - second.id;
      });
  }, [activeCategory, searchValue, sortValue]);

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
              className="h-10 min-w-[150px] rounded-lg border border-[#1F2937] bg-[#0D1422] px-3 text-xs font-medium text-zinc-300 outline-none transition focus:border-violet-500"
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
                    ? "bg-violet-700 text-white"
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
                    ? "bg-violet-700 text-white"
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
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
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