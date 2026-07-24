"use client";

import { ChevronRight } from "lucide-react";

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
  return (
    <div className="flex items-center gap-2">
      <div className="min-w-0 flex-1 overflow-x-auto pb-1">
        <div className="flex min-w-max gap-2">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive =
              category.id === activeCategory;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() =>
                  onCategoryChange(category.id)
                }
                className={[
                  "flex h-[43px] min-w-[128px] items-center gap-2 rounded-lg border px-2.5 text-left transition",
                  "xl:min-w-0 xl:flex-1",
                  isActive
                    ? "border-violet-600 bg-violet-950/30 shadow-[0_0_15px_rgba(124,58,237,0.12)]"
                    : "border-[#1F2937] bg-[#0D1422] hover:border-zinc-700",
                ].join(" ")}
              >
                <span
                  className={[
                    "grid size-7 shrink-0 place-items-center rounded-md",
                    isActive
                      ? "bg-violet-600/20 text-violet-400"
                      : "bg-[#111827] text-blue-400",
                  ].join(" ")}
                >
                  <Icon size={14} />
                </span>

                <span className="min-w-0">
                  <span className="block truncate text-[9px] font-medium text-zinc-100">
                    {category.label}
                  </span>

                  <span className="mt-0.5 block text-[7px] text-zinc-500">
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
        className="hidden size-8 shrink-0 place-items-center rounded-full border border-[#27272A] bg-[#111827] text-zinc-400 hover:text-white sm:grid"
      >
        <ChevronRight size={14} />
      </button>
    </div>
  );
}