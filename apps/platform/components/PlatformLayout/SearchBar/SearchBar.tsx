"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export function SearchBar() {
  const router = useRouter();
  const [value, setValue] = useState("");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      router.push("/course-catalog");
    }
  };

  return (
    <label className="hidden items-center gap-2 rounded-full border border-[#27272A] bg-black px-3 py-2 text-sm text-slate-400 md:flex">
      <Search className="h-4 w-4" />
      <input
        className="w-36 bg-transparent outline-none"
        placeholder="Search"
        aria-label="Search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </label>
  );
}
