import { Bell } from "lucide-react";

export function Notifications() {
  return (
    <button className="rounded-full border border-[#27272A] bg-black p-2 text-slate-300 transition hover:bg-[#27272A] hover:text-white">
      <Bell className="h-4 w-4" />
    </button>
  );
}
