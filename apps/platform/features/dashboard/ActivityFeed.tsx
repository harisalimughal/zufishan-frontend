import { Award, CheckCircle2, FileUp } from "lucide-react";
import type { ReactNode } from "react";

type ActivityItem = {
  id: string;
  icon: ReactNode;
  iconBg: string;
  title: string;
  subtitle?: string;
  time: string;
};

const activityItems: ActivityItem[] = [
  {
    id: "1",
    icon: <CheckCircle2 className="h-4 w-4 text-emerald-400" />,
    iconBg: "bg-emerald-500/20",
    title: 'You completed "SQL Basics Quiz"',
    time: "2 hours ago",
  },
  {
    id: "2",
    icon: <FileUp className="h-4 w-4 text-[#3B82F6]" />,
    iconBg: "bg-[#3B82F6]/20",
    title: "Prof. Lucas uploaded new notes",
    subtitle: "Database Normalization.pdf",
    time: "5 hours ago",
  },
  {
    id: "3",
    icon: <Award className="h-4 w-4 text-orange-400" />,
    iconBg: "bg-orange-500/20",
    title: 'You earned "Perfect Attendance" badge',
    time: "Yesterday",
  },
];

export function ActivityFeed() {
  return (
    <div className="rounded-xl border border-[#27272A] bg-[#111827] p-5">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">Activity Feed</h3>
        <button className="text-xs font-medium text-[#3B82F6] transition-colors hover:text-[#60A5FA]">
          View all
        </button>
      </div>

      {/* Activity Items */}
      <div className="space-y-4">
        {activityItems.map((item) => (
          <div key={item.id} className="flex items-start gap-3">
            {/* Icon */}
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${item.iconBg}`}
            >
              {item.icon}
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium leading-snug text-gray-300">
                {item.title}
              </p>
              {item.subtitle && (
                <p className="mt-0.5 text-[11px] text-gray-500">
                  {item.subtitle}
                </p>
              )}
              <p className="mt-1 text-[11px] text-gray-600">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
