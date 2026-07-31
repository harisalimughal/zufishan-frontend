"use client";

import { useEffect, useRef, useState } from "react";
import { Bell } from "lucide-react";

const mockNotifications = [
  { title: "New assignment posted in Database 101", time: "5m ago" },
  { title: "Prof. Lucas replied to your question", time: "32m ago" },
  { title: "Live class starts in 30 minutes", time: "1h ago" },
  { title: "Your weekly progress report is ready", time: "3h ago" },
];

export function Notifications() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="rounded-full border border-[#27272A] bg-black p-2 text-slate-300 transition hover:bg-[#27272A] hover:text-white"
      >
        <Bell className="h-4 w-4" />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-72 rounded-xl border border-[#27272A] bg-black p-2 shadow-2xl z-50">
          <p className="px-2 py-1.5 text-xs font-semibold text-white">Notifications</p>
          <div className="space-y-1">
            {mockNotifications.map((notification, index) => (
              <div
                key={index}
                className="rounded-lg px-2 py-2 transition hover:bg-[#27272A]"
              >
                <p className="text-xs text-slate-200">{notification.title}</p>
                <p className="mt-0.5 text-[10px] text-slate-500">{notification.time}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
