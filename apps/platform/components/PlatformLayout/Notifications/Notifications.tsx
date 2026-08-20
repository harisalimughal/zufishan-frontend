"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, Activity } from "lucide-react";
import { achievementService, ActivityLogItem } from "@/services/achievementService";

export function Notifications() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<ActivityLogItem[]>([]);
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

  useEffect(() => {
    async function loadNotifications() {
      try {
        const res = await achievementService.getActivityFeed(5, 0);
        if (res.activities) {
          setNotifications(res.activities);
        }
      } catch (err) {
        console.warn("Could not fetch live notifications:", err);
      }
    }
    loadNotifications();
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="relative rounded-full border border-[#27272A] bg-black p-2 text-slate-300 transition hover:bg-[#27272A] hover:text-white"
      >
        <Bell className="h-4 w-4" />
        {notifications.length > 0 && (
          <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-primary-500 animate-pulse" />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-72 rounded-xl border border-[#27272A] bg-black p-2 shadow-2xl z-50"
          >
            <p className="px-2 py-1.5 text-xs font-semibold text-white flex items-center justify-between">
              <span>Activity Notifications</span>
              <span className="text-[10px] text-zinc-500 font-normal">Live Sync</span>
            </p>
            <div className="space-y-1 max-h-64 overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-lg px-2 py-2 transition hover:bg-[#27272A]"
                  >
                    <p className="text-xs text-slate-200">{item.title}</p>
                    {item.subtitle && (
                      <p className="mt-0.5 text-[11px] text-slate-400">{item.subtitle}</p>
                    )}
                    <p className="mt-0.5 text-[10px] text-slate-500">
                      {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                ))
              ) : (
                <div className="py-4 text-center text-xs text-zinc-500 flex flex-col items-center gap-1">
                  <Activity size={16} className="text-zinc-600" />
                  <span>No recent activity logs</span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
