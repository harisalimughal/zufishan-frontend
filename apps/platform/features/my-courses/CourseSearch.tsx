"use client";

import {
  Bell,
  Filter,
  Search,
  Square,
} from "lucide-react";

type CourseSearchProps = {
  searchValue: string;
  onSearchChange: (value: string) => void;
};

export function CourseSearch({
  searchValue,
  onSearchChange,
}: CourseSearchProps) {
  return (
    <div className="flex w-full items-center gap-2 lg:w-auto">
      <label className="relative min-w-0 flex-1 lg:w-[205px] xl:w-[250px]">
        <Search
          size={13}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
        />

        <input
          type="search"
          value={searchValue}
          onChange={(event) =>
            onSearchChange(event.target.value)
          }
          placeholder="Search courses, topics, or professors..."
          className="h-8 w-full rounded-lg border border-[#1F2937] bg-[#0D1422] pl-8 pr-3 text-[8px] text-white outline-none placeholder:text-zinc-600 focus:border-blue-500"
        />
      </label>

      <button
        type="button"
        className="hidden h-8 items-center gap-1.5 rounded-lg border border-[#1F2937] bg-[#0D1422] px-2.5 text-[8px] text-zinc-300 transition hover:text-white sm:flex"
      >
        <Filter size={11} />
        Filters
      </button>

      <button
        type="button"
        aria-label="Notifications"
        className="relative grid size-8 shrink-0 place-items-center rounded-full border border-[#1F2937] bg-[#0D1422] text-zinc-400 hover:text-white"
      >
        <Bell size={13} />

        <span className="absolute -right-0.5 -top-0.5 grid size-3.5 place-items-center rounded-full bg-violet-600 text-[7px] text-white">
          3
        </span>
      </button>

      <button
        type="button"
        aria-label="Open menu"
        className="hidden size-8 shrink-0 place-items-center rounded-full border border-[#1F2937] bg-[#0D1422] text-zinc-400 hover:text-white xl:grid"
      >
        <Square size={12} />
      </button>
    </div>
  );
}