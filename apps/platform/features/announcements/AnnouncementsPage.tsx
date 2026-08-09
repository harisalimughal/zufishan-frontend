"use client";

import React, { useState } from "react";
import {
  Bell,
  AlertTriangle,
  Info,
  Calendar,
  ShieldAlert,
  Megaphone,
  CheckCircle2,
} from "lucide-react";

interface Announcement {
  id: string;
  title: string;
  description: string;
  time: string;
  isUnread: boolean;
  category: "important" | "general";
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
}

const mockAnnouncements: Announcement[] = [
  {
    id: "1",
    title: "Midterm Examination Schedule Released",
    description:
      "The official examination schedule for Fall 2026 is now available. Please review your dates.",
    time: "10 min ago",
    isUnread: true,
    category: "important",
    icon: ShieldAlert,
    iconBg: "bg-rose-500/10 border-rose-500/20",
    iconColor: "text-rose-400",
  },
  {
    id: "2",
    title: "System Maintenance Notice",
    description:
      "Platform services will undergo scheduled maintenance tonight from 2:00 AM to 4:00 AM UTC.",
    time: "2 hrs ago",
    isUnread: true,
    category: "important",
    icon: AlertTriangle,
    iconBg: "bg-amber-500/10 border-amber-500/20",
    iconColor: "text-amber-400",
  },
  {
    id: "3",
    title: "Campus Hackathon 2026 Registration Open",
    description:
      "Register your team now for the annual 48-hour AI innovation hackathon. Prizes up to $5,000.",
    time: "Yesterday",
    isUnread: false,
    category: "general",
    icon: Megaphone,
    iconBg: "bg-indigo-500/10 border-indigo-500/20",
    iconColor: "text-indigo-400",
  },
  {
    id: "4",
    title: "Guest Lecture: Scalable Systems Architecture",
    description:
      "Join us this Thursday at 4 PM for a live session with senior infrastructure engineers.",
    time: "2 days ago",
    isUnread: false,
    category: "general",
    icon: Calendar,
    iconBg: "bg-emerald-500/10 border-emerald-500/20",
    iconColor: "text-emerald-400",
  },
  {
    id: "5",
    title: "Library Portal Upgrade Completed",
    description:
      "The digital research portal has been updated with faster search and direct journal access.",
    time: "3 days ago",
    isUnread: false,
    category: "general",
    icon: Info,
    iconBg: "bg-blue-500/10 border-blue-500/20",
    iconColor: "text-blue-400",
  },
];

export function AnnouncementsPage() {
  const [activeTab, setActiveTab] = useState<"important" | "general">("important");

  const filteredAnnouncements = mockAnnouncements.filter(
    (item) => item.category === activeTab
  );

  return (
    <div className="min-h-screen bg-[#09090B] text-zinc-100 p-6 md:p-8 space-y-6 font-sans">
      {/* HEADER SECTION */}
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
          Announcements
        </h1>
        <p className="text-sm text-zinc-400 mt-1">
          Stay updated with important platform updates, notices, and general news.
        </p>
      </div>

      {/* FILTER TABS */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setActiveTab("important")}
          className={`px-5 py-2 text-xs font-medium rounded-full transition-all flex items-center gap-2 ${
            activeTab === "important"
              ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm"
              : "bg-[#111827] text-zinc-400 border border-[#27272A] hover:text-white"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-amber-400"></span>
          Important
        </button>

        <button
          onClick={() => setActiveTab("general")}
          className={`px-5 py-2 text-xs font-medium rounded-full transition-all flex items-center gap-2 ${
            activeTab === "general"
              ? "bg-indigo-600 text-white border border-indigo-500 shadow-sm"
              : "bg-[#111827] text-zinc-400 border border-[#27272A] hover:text-white"
          }`}
        >
          General
        </button>
      </div>

      {/* ANNOUNCEMENTS LIST CONTAINER */}
      <div className="bg-[#111827] border border-[#27272A] rounded-2xl overflow-hidden divide-y divide-[#27272A]">
        {filteredAnnouncements.length > 0 ? (
          filteredAnnouncements.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                className="p-5 flex items-start gap-4 hover:bg-zinc-800/30 transition-colors group cursor-pointer"
              >
                {/* ICON BADGE */}
                <div
                  className={`p-3 rounded-full border shrink-0 ${item.iconBg} ${item.iconColor}`}
                >
                  <IconComponent size={20} />
                </div>

                {/* CONTENT */}
                <div className="flex-1 min-w-0 pr-4">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-white group-hover:text-indigo-400 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* RIGHT SIDE: TIME & UNREAD INDICATOR */}
                <div className="flex flex-col items-end gap-2 shrink-0 pt-0.5">
                  {item.isUnread ? (
                    <span
                      className="w-2.5 h-2.5 rounded-full bg-amber-500"
                      title="Unread announcement"
                    ></span>
                  ) : (
                    <span className="w-2.5 h-2.5 opacity-0"></span>
                  )}
                  <span className="text-xs text-zinc-500 font-medium">
                    {item.time}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-12 text-center text-zinc-500 text-sm flex flex-col items-center justify-center gap-2">
            <CheckCircle2 size={24} className="text-zinc-600" />
            <span>No {activeTab} announcements at this time.</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default AnnouncementsPage;