"use client";

import React, { useEffect, useState } from "react";
import {
  Bell,
  AlertTriangle,
  Info,
  Calendar,
  ShieldAlert,
  Megaphone,
  CheckCircle2,
} from "lucide-react";
import { achievementService, ActivityLogItem } from "@/services/achievementService";

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

export function AnnouncementsPage() {
  const [activeTab, setActiveTab] = useState<"important" | "general">("important");
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnnouncements() {
      try {
        const feed = await achievementService.getActivityFeed(20, 0);
        if (feed.activities && feed.activities.length > 0) {
          const mapped: Announcement[] = feed.activities.map((act: ActivityLogItem, idx: number) => {
            const isImportant = act.type.includes("ASSIGNMENT") || act.type.includes("PASSWORD");
            return {
              id: act.id,
              title: act.title,
              description: act.subtitle || `System activity recorded on ${new Date(act.createdAt).toLocaleDateString()}`,
              time: new Date(act.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              isUnread: idx < 2,
              category: isImportant ? "important" : "general",
              icon: isImportant ? ShieldAlert : Info,
              iconBg: isImportant ? "bg-rose-500/10 border-rose-500/20" : "bg-primary-500/10 border-primary-500/20",
              iconColor: isImportant ? "text-rose-400" : "text-primary-400",
            };
          });
          setAnnouncements(mapped);
        }
      } catch (err) {
        console.warn("Could not fetch live announcements:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchAnnouncements();
  }, []);

  const filteredAnnouncements = announcements.filter(
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
          Stay updated with live platform updates, course notices, and activity logs.
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
              ? "bg-primary-600 text-white border border-primary-500 shadow-sm"
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
                    <h3 className="text-sm font-semibold text-white group-hover:text-primary-400 transition-colors">
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