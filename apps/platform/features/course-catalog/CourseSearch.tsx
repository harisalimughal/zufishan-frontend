"use client";

import { Bell, Filter, Search, Square } from "lucide-react";

type CourseSearchProps = {
  searchValue: string;
  onSearchChange: (value: string) => void;
};

export function CourseSearch({
  searchValue,
  onSearchChange,
}: CourseSearchProps) {
  return (
    <div className="flex w-full max-w-full min-w-0 items-center gap-2 md:w-auto">
      <label className="relative min-w-0 flex-1 md:w-[260px] lg:w-[300px]">
        <Search
          size={16}
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
        />

        <input
          type="search"
          value={searchValue}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search courses..."
          className="h-10 w-full min-w-0 rounded-lg border border-[#1F2937] bg-[#0D1422] pl-10 pr-3 text-xs font-medium text-white outline-none placeholder:text-zinc-500 transition focus:border-violet-500"
        />
      </label>

      <button
        type="button"
        className="hidden h-10 shrink-0 items-center gap-2 rounded-lg border border-[#1F2937] bg-[#0D1422] px-3 text-xs font-medium text-zinc-300 transition hover:border-zinc-700 hover:text-white sm:flex"
      >
        <Filter size={14} />
        Filters
      </button>

      <button
        type="button"
        aria-label="Notifications"
        className="relative grid size-10 shrink-0 place-items-center rounded-lg border border-[#1F2937] bg-[#0D1422] text-zinc-400 transition hover:border-zinc-700 hover:text-white"
      >
        <Bell size={16} />
        <span className="absolute -right-1 -top-1 grid size-4 place-items-center rounded-full bg-violet-600 text-[9px] font-bold text-white">
          3
        </span>
      </button>

      <button
        type="button"
        aria-label="Open menu"
        className="hidden size-10 shrink-0 place-items-center rounded-lg border border-[#1F2937] bg-[#0D1422] text-zinc-400 transition hover:border-zinc-700 hover:text-white xl:grid"
      >
        <Square size={15} />
      </button>
    </div>
  );
}