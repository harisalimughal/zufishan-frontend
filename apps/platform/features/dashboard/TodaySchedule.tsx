import Link from "next/link";

type ScheduleItem = {
  id: string;
  time: string;
  title: string;
  professor: string;
  isLive: boolean;
  dotColor?: string;
};

const scheduleItems: ScheduleItem[] = [
  {
    id: "1",
    time: "08:00",
    title: "Database 101",
    professor: "Prof. Lucas (AI)",
    isLive: true,
    dotColor: "bg-[#3B82F6]",
  },
  {
    id: "2",
    time: "11:00 AM",
    title: "AI Engineering Basics",
    professor: "Prof. Ava (AI)",
    isLive: false,
    dotColor: "bg-emerald-400",
  },
  {
    id: "3",
    time: "03:00 PM",
    title: "AI Tutor Session",
    professor: "AI Tutor",
    isLive: false,
    dotColor: "bg-amber-400",
  },
];

export function TodaySchedule() {
  return (
    <div className="rounded-xl border border-[#27272A] bg-[#111827] p-5">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">
          Today&apos;s Schedule
        </h3>
        <Link href="/calendar" className="text-xs font-medium text-[#3B82F6] transition-colors hover:text-[#60A5FA]">
          View calendar
        </Link>
      </div>

      {/* Schedule Items */}
      <div className="space-y-3">
        {scheduleItems.map((item) => (
          <div
            key={item.id}
            className="group flex items-center gap-3 rounded-lg p-2.5 transition-all duration-200 hover:bg-[#1F2937]"
          >
            {/* Status Indicator */}
            <div className="flex flex-col items-center">
              <div
                className={`h-2.5 w-2.5 rounded-full ${item.dotColor ?? "bg-[#3B82F6]"} ${
                  item.isLive ? "animate-pulse shadow-sm shadow-blue-500/50" : ""
                }`}
              />
            </div>

            {/* Time */}
            <div className="w-14 shrink-0">
              {item.isLive ? (
                <span className="inline-flex rounded bg-[#3B82F6]/20 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#3B82F6]">
                  LIVE
                </span>
              ) : (
                <span className="text-xs text-gray-400">{item.time}</span>
              )}
              {item.isLive && (
                <div className="mt-0.5 text-[10px] text-gray-500">
                  {item.time}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium text-white">
                {item.title}
              </p>
              <p className="truncate text-[11px] text-gray-500">
                {item.professor}
              </p>
            </div>

            {/* Join Button */}
            <Link
              href="/live-classes"
              className="shrink-0 rounded-lg border border-[#27272A] bg-transparent px-4 py-1.5 text-xs font-semibold text-gray-300 transition-all duration-200 hover:border-gray-500 hover:text-white"
            >
              Join
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
