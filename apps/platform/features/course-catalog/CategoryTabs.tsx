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
    <div className="flex w-full max-w-full items-center gap-2 overflow-hidden">
      <div
        className={
          showAllCategories
            ? "w-full max-w-full"
            : "w-full max-w-full overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        }
      >
        <div
          className={
            showAllCategories ? "flex flex-wrap gap-2" : "flex w-max gap-2"
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
                  "flex h-11 shrink-0 items-center gap-2.5 rounded-lg border px-3 text-left transition-all duration-200",
                  isActive
                    ? "border-primary-600 bg-primary-950/30 shadow-[0_0_10px_rgba(5,150,105,0.12)]"
                    : "border-[#1F2937] bg-[#0D1422] hover:border-zinc-600 hover:bg-[#111827]",
                ].join(" ")}
              >
                <span
                  className={[
                    "grid size-7 shrink-0 place-items-center rounded-md transition",
                    isActive
                      ? "bg-primary-600/20 text-primary-400"
                      : "bg-[#111827] text-primary-400",
                  ].join(" ")}
                >
                  <Icon size={14} />
                </span>

                <span className="shrink-0">
                  <span className="block text-xs font-semibold text-white">
                    {category.label}
                  </span>
                  <span className="block text-[10px] text-zinc-500">
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
            ? "border-primary-500 bg-primary-950/30 text-white"
            : "border-[#27272A] bg-[#111827] text-zinc-400 hover:border-primary-500 hover:text-white",
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