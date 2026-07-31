"use client";

import { Bell, Filter, Search, Square } from "lucide-react";
import { useState } from "react";

type CourseSearchProps = {
  searchValue: string;
  onSearchChange: (value: string) => void;
};

const filterLevels = ["Beginner", "Intermediate", "Advanced"];

export function CourseSearch({
  searchValue,
  onSearchChange,
}: CourseSearchProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

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

      <div className="relative hidden sm:block">
        <button
          type="button"
          onClick={() => setShowFilters((prev) => !prev)}
          aria-expanded={showFilters}
          className="flex h-10 shrink-0 items-center gap-2 rounded-lg border border-[#1F2937] bg-[#0D1422] px-3 text-xs font-medium text-zinc-300 transition hover:border-zinc-700 hover:text-white"
        >
          <Filter size={14} />
          Filters
        </button>

        {showFilters && (
          <div className="absolute right-0 top-full z-20 mt-2 w-56 rounded-lg border border-[#27272A] bg-[#111827] p-3 shadow-xl">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
              Level
            </p>
            <div className="flex flex-wrap gap-1.5">
              {filterLevels.map((level) => (
                <span
                  key={level}
                  className="cursor-pointer rounded-full border border-[#27272A] bg-[#0D1117] px-2.5 py-1 text-[11px] text-gray-300 transition hover:border-violet-500 hover:text-white"
                >
                  {level}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="relative">
        <button
          type="button"
          aria-label="Notifications"
          onClick={() => setShowNotifications((prev) => !prev)}
          aria-expanded={showNotifications}
          className="relative grid size-10 shrink-0 place-items-center rounded-lg border border-[#1F2937] bg-[#0D1422] text-zinc-400 transition hover:border-zinc-700 hover:text-white"
        >
          <Bell size={16} />
          <span className="absolute -right-1 -top-1 grid size-4 place-items-center rounded-full bg-violet-600 text-[9px] font-bold text-white">
            3
          </span>
        </button>

        {showNotifications && (
          <div className="absolute right-0 top-full z-20 mt-2 w-52 rounded-lg border border-[#27272A] bg-[#111827] p-3 text-xs text-gray-300 shadow-xl">
            No new notifications
          </div>
        )}
      </div>

      <div className="relative hidden xl:block">
        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setShowMenu((prev) => !prev)}
          aria-expanded={showMenu}
          className="grid size-10 shrink-0 place-items-center rounded-lg border border-[#1F2937] bg-[#0D1422] text-zinc-400 transition hover:border-zinc-700 hover:text-white"
        >
          <Square size={15} />
        </button>

        {showMenu && (
          <div className="absolute right-0 top-full z-20 mt-2 w-40 rounded-lg border border-[#27272A] bg-[#111827] py-1.5 text-xs text-gray-300 shadow-xl">
            <p className="px-3 py-1.5 transition hover:bg-[#1F2937] hover:text-white">
              Settings
            </p>
            <p className="px-3 py-1.5 transition hover:bg-[#1F2937] hover:text-white">
              Help &amp; Support
            </p>
            <p className="px-3 py-1.5 transition hover:bg-[#1F2937] hover:text-white">
              Sign out
            </p>
          </div>
        )}
      </div>
    </div>
  );
}