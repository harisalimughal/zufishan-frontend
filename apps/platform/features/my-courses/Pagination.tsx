"use client";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <nav className="mt-3 flex items-center justify-center gap-1">
      <button
        type="button"
        aria-label="Previous page"
        disabled={currentPage === 1}
        onClick={() =>
          onPageChange(currentPage - 1)
        }
        className="grid size-6 place-items-center rounded-md border border-[#1F2937] bg-[#0D1422] text-zinc-500 disabled:opacity-40"
      >
        <ChevronLeft size={11} />
      </button>

      {[1, 2, 3].map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          className={[
            "grid size-6 place-items-center rounded-md text-[8px]",
            page === currentPage
              ? "bg-violet-700 text-white"
              : "text-zinc-400 hover:bg-[#111827]",
          ].join(" ")}
        >
          {page}
        </button>
      ))}

      <span className="px-1 text-[8px] text-zinc-600">
        ...
      </span>

      <button
        type="button"
        onClick={() => onPageChange(totalPages)}
        className={[
          "grid size-6 place-items-center rounded-md text-[8px]",
          currentPage === totalPages
            ? "bg-violet-700 text-white"
            : "text-zinc-400 hover:bg-[#111827]",
        ].join(" ")}
      >
        {totalPages}
      </button>

      <button
        type="button"
        aria-label="Next page"
        disabled={currentPage === totalPages}
        onClick={() =>
          onPageChange(currentPage + 1)
        }
        className="grid size-6 place-items-center rounded-md border border-[#1F2937] bg-[#0D1422] text-zinc-400 disabled:opacity-40"
      >
        <ChevronRight size={11} />
      </button>
    </nav>
  );
}