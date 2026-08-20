"use client";

import { CalendarEventData } from "@/services/calendarService";

interface LiveClassListProps {
  events: CalendarEventData[];
  onEdit: (event: CalendarEventData) => void;
  onDelete: (event: CalendarEventData) => void;
}

function getStatus(event: CalendarEventData): "live" | "scheduled" | "ended" {
  if (event.isLive) return "live";
  return new Date(event.endTime) < new Date() ? "ended" : "scheduled";
}

function statusBadge(status: "live" | "scheduled" | "ended") {
  switch (status) {
    case "live":
      return "bg-emerald-500/20 text-emerald-400";
    case "scheduled":
      return "bg-[#10b981]/20 text-[#10b981]";
    case "ended":
      return "bg-slate-500/20 text-slate-400";
  }
}

export function LiveClassList({ events, onEdit, onDelete }: LiveClassListProps) {
  return (
    <div className="space-y-3">
      {events.map((event) => {
        const status = getStatus(event);
        return (
          <div
            key={event.id}
            className="flex items-center gap-4 rounded-xl border border-[#27272A] bg-[#111827] px-5 py-4"
          >
            <div className="min-w-0 flex-1">
              <div className="font-semibold text-white">{event.title}</div>
              <div className="text-xs text-slate-400">
                {event.course?.title || "No course"} •{" "}
                {new Date(event.startTime).toLocaleString()}
              </div>
            </div>
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusBadge(status)}`}>
              {status}
            </span>
            <div className="flex gap-3 text-sm font-medium">
              <button onClick={() => onEdit(event)} className="text-[#10b981] hover:text-primary-400">
                Edit
              </button>
              <button onClick={() => onDelete(event)} className="text-red-400 hover:text-red-300">
                Delete
              </button>
            </div>
          </div>
        );
      })}

      {events.length === 0 && (
        <div className="rounded-xl border border-[#27272A] bg-[#111827] py-12 text-center">
          <p className="text-slate-400">No live classes scheduled</p>
        </div>
      )}
    </div>
  );
}
