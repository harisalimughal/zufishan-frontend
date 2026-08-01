"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { LogOut, Settings } from "lucide-react";

type UserProfileCardProps = {
  collapsed?: boolean;
};

export function UserProfileCard({ collapsed = false }: UserProfileCardProps) {
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
        className={`flex items-center gap-3 rounded-full border border-[#27272A] bg-black px-3 py-2 ${
          collapsed ? "justify-center" : ""
        }`}
      >
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#3B82F6] text-sm font-semibold text-white">
          U
        </div>
        {!collapsed && (
          <div className="hidden text-left sm:block">
            <p className="text-sm font-medium text-white">User</p>
            <p className="text-xs text-slate-400">Student</p>
          </div>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-44 rounded-xl border border-[#27272A] bg-black p-1.5 shadow-2xl z-50"
          >
            <Link
              href="/settings"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs text-slate-200 transition hover:bg-[#27272A] hover:text-white"
            >
              <Settings className="h-3.5 w-3.5" />
              Settings
            </Link>
            <button
              onClick={() => {
                console.log("Log out");
                setOpen(false);
              }}
              className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-xs text-red-400 transition hover:bg-[#27272A] hover:text-red-300"
            >
              <LogOut className="h-3.5 w-3.5" />
              Log out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
