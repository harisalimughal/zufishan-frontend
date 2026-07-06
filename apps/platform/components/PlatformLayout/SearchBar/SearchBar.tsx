import { Search } from "lucide-react";

export function SearchBar() {
  return (
    <label className="hidden items-center gap-2 rounded-full border border-[#27272A] bg-black px-3 py-2 text-sm text-slate-400 md:flex">
      <Search className="h-4 w-4" />
      <input
        className="w-36 bg-transparent outline-none"
        placeholder="Search"
        aria-label="Search"
      />
    </label>
  );
}
