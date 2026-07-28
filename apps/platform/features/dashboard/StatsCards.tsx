import {
  BookOpen,
  CalendarClock,
  CheckCircle,
  Flame,
  TrendingUp,
} from "lucide-react";

const stats = [
  {
    label: "Upcoming Class",
    value: "Database 101",
    subtitle: "08:00 AM – 09:30 AM",
    badge: "Starts in 1h 15m",
    icon: CalendarClock,
    iconBg: "bg-[#3B82F6]/20",
    iconColor: "text-[#3B82F6]",
  },
  {
    label: "Attendance",
    value: "96%",
    subtitle: "This Week",
    trend: "↑ 4% vs last week",
    icon: CheckCircle,
    iconBg: "bg-emerald-500/20",
    iconColor: "text-emerald-400",
  },
  {
    label: "Current Streak",
    value: "7 Days",
    subtitle: "Keep it going!",
    streakIcons: true,
    icon: Flame,
    iconBg: "bg-orange-500/20",
    iconColor: "text-orange-400",
  },
  {
    label: "Courses Enrolled",
    value: "4",
    subtitle: "2 in progress",
    extra: "2 upcoming",
    icon: BookOpen,
    iconBg: "bg-purple-500/20",
    iconColor: "text-purple-400",
  },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="group relative overflow-hidden rounded-xl border border-[#27272A] bg-[#111827] p-5 transition-all duration-300 hover:border-[#3B82F6]/40 hover:shadow-lg hover:shadow-[#3B82F6]/5"
          >
            {/* Subtle gradient overlay on hover */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#3B82F6]/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="relative flex items-start gap-4">
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${stat.iconBg}`}
              >
                <Icon className={`h-5 w-5 ${stat.iconColor}`} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                  {stat.label}
                </p>
                <p className="mt-1 text-xl font-bold text-white">
                  {stat.value}
                </p>
                <p className="mt-0.5 text-xs text-gray-500">{stat.subtitle}</p>

                {stat.badge && (
                  <span className="mt-2 inline-block rounded-full bg-[#3B82F6]/20 px-3 py-1 text-xs font-semibold text-[#3B82F6]">
                    {stat.badge}
                  </span>
                )}

                {stat.trend && (
                  <div className="mt-1.5 flex items-center gap-1 text-xs text-emerald-400">
                    <TrendingUp className="h-3 w-3" />
                    <span>{stat.trend}</span>
                  </div>
                )}

                {stat.streakIcons && (
                  <div className="mt-1.5 flex gap-0.5">
                    {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                      <span
                        key={day}
                        className={`text-sm ${day <= 6 ? "opacity-100" : "opacity-40"}`}
                      >
                        🔥
                      </span>
                    ))}
                  </div>
                )}

                {stat.extra && (
                  <p className="mt-0.5 text-xs text-gray-500">{stat.extra}</p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
