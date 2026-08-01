"use client";

import { ChevronRight } from "lucide-react";
import { useState } from "react";

import type { CourseCategory } from "./types";

type CategoryTabsProps = {
  categories: CourseCategory[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
};

export function CategoryTabs({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryTabsProps) {
  const [showAllCategories, setShowAllCategories] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <div
        className={
          showAllCategories
            ? "min-w-0 flex-1"
            : "min-w-0 flex-1 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        }
      >
        <div
          className={
            showAllCategories ? "flex flex-wrap gap-2" : "flex min-w-max gap-2"
          }
        >
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = category.id === activeCategory;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => onCategoryChange(category.id)}
                className={[
                  "flex h-12 min-w-[155px] items-center gap-2 rounded-lg border px-3 text-left transition-all duration-200",
                  "xl:min-w-0 xl:flex-1",
                  isActive
                    ? "border-violet-600 bg-violet-950/30 shadow-[0_0_10px_rgba(124,58,237,0.12)]"
                    : "border-[#1F2937] bg-[#0D1422] hover:border-zinc-600 hover:bg-[#111827]",
                ].join(" ")}
              >
                <span
                  className={[
                    "grid size-8 shrink-0 place-items-center rounded-md transition",
                    isActive
                      ? "bg-violet-600/20 text-violet-400"
                      : "bg-[#111827] text-blue-400",
                  ].join(" ")}
                >
                  <Icon size={15} />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13px] font-semibold text-white">
                    {category.label}
                  </span>

                  <span className="block text-[11px] text-zinc-500">
                    {category.courseCount} Courses
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        aria-label="More categories"
        aria-expanded={showAllCategories}
        onClick={() => setShowAllCategories((prev) => !prev)}
        className={[
          "hidden size-8 shrink-0 place-items-center rounded-full border transition sm:grid",
          showAllCategories
            ? "border-violet-500 bg-violet-950/30 text-white"
            : "border-[#27272A] bg-[#111827] text-zinc-400 hover:border-violet-500 hover:text-white",
        ].join(" ")}
      >
        <ChevronRight
          size={14}
          className={["transition-transform", showAllCategories ? "rotate-180" : ""].join(
            " "
          )}
        />
      </button>
    </div>
  );
}