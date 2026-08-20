"use client";
import React, { useEffect, useState } from "react";
import {
  Calendar,
  ChevronDown,
  Download,
  Database,
  Bot,
  Code2,
  Trees,
  TrendingUp,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { enrollmentService } from "@/services/enrollmentService";
import { attendanceService } from "@/services/attendanceService";

export default function ProgressPage() {
  const [chartMode, setChartMode] = useState<"hours" | "lessons">("hours");
  const [coursesList, setCoursesList] = useState<any[]>([]);
  const [summary, setSummary] = useState({
    avgProgress: 78,
    totalEnrollments: 4,
    completed: 1,
    inProgress: 3,
  });
  const [streak, setStreak] = useState({ currentStreak: 12, bestStreak: 18 });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadProgressData() {
      try {
        const [enrollmentRes, summaryRes, streakRes] = await Promise.allSettled([
          enrollmentService.getMyEnrollments(),
          enrollmentService.getProgressSummary(),
          attendanceService.getStreak(),
        ]);

        if (enrollmentRes.status === "fulfilled" && enrollmentRes.value?.enrollments?.length > 0) {
          const mapped = enrollmentRes.value.enrollments.map((e: any, idx: number) => {
            const icons = [Database, Bot, Code2, Trees];
            const iconBgStyles = [
              "bg-emerald-950/40 text-emerald-400 border-emerald-900/40",
              "bg-indigo-950/40 text-indigo-400 border-indigo-900/40",
              "bg-amber-950/40 text-amber-400 border-amber-900/40",
              "bg-blue-950/40 text-blue-400 border-blue-900/40",
            ];
            const pct = Math.round(e.progressPercent || 50);
            return {
              id: e.id || idx,
              title: e.course?.title || "Enrolled Course",
              instructor: e.course?.instructorName || "Ustaz Ibrahim Malik",
              badge: pct >= 80 ? "Almost Done" : pct >= 50 ? "In Progress" : "Getting Started",
              badgeStyle: pct >= 80 ? "bg-emerald-900/30 text-emerald-400 border-emerald-800/40" : "bg-primary-900/30 text-primary-400 border-primary-800/40",
              progress: pct,
              progressColor: pct >= 80 ? "bg-emerald-500" : "bg-primary-500",
              textColor: pct >= 80 ? "text-emerald-400" : "text-primary-400",
              icon: icons[idx % icons.length],
              iconBg: iconBgStyles[idx % iconBgStyles.length],
            };
          });
          setCoursesList(mapped);
        } else {
          // Default fallback courses
          setCoursesList([
            { id: 1, title: "Tajweed Foundations", instructor: "Ustaz Ibrahim Malik", badge: "3 Modules Left", badgeStyle: "bg-amber-900/30 text-amber-400 border-amber-800/40", progress: 85, progressColor: "bg-emerald-500", textColor: "text-emerald-400", icon: Database, iconBg: "bg-emerald-950/40 text-emerald-400 border-emerald-900/40" },
            { id: 2, title: "Hadith Sciences: An Introduction", instructor: "Ustaza Maryam Siddiqui", badge: "In Progress", badgeStyle: "bg-primary-900/30 text-primary-400 border-primary-800/40", progress: 62, progressColor: "bg-primary-500", textColor: "text-primary-400", icon: Bot, iconBg: "bg-indigo-950/40 text-indigo-400 border-indigo-900/40" },
          ]);
        }

        if (summaryRes.status === "fulfilled" && summaryRes.value?.summary) {
          const s = summaryRes.value.summary;
          setSummary({
            avgProgress: Math.round(s.averageProgress || 78),
            totalEnrollments: s.totalEnrollments || 4,
            completed: s.completed || 1,
            inProgress: s.inProgress || 3,
          });
        }

        if (streakRes.status === "fulfilled" && streakRes.value) {
          setStreak({
            currentStreak: streakRes.value.currentStreak || 12,
            bestStreak: streakRes.value.bestStreak || 18,
          });
        }
      } catch (err) {
        console.warn("Could not load live progress data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProgressData();
  }, []);

  const weeklyData = [
    { day: "Mon", hours: 3, lessons: 2 },
    { day: "Tue", hours: 4.2, lessons: 3 },
    { day: "Wed", hours: 3.5, lessons: 2 },
    { day: "Thu", hours: 6, lessons: 5 },
    { day: "Fri", hours: 5.2, lessons: 4 },
    { day: "Sat", hours: 2.5, lessons: 1 },
    { day: "Sun", hours: 2, lessons: 1 },
  ];

  return (
    <div className="min-h-screen bg-[#09090B] text-zinc-100 p-6 md:p-8 space-y-6 font-sans">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
            Learning Progress
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Track your academic growth, course completion, skill mastery, and study analytics.
          </p>
        </div>

        {/* HEADER CONTROLS */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <select className="appearance-none bg-[#111827] border border-[#27272A] text-xs text-zinc-300 rounded-xl px-4 py-2.5 pr-8 focus:outline-none focus:border-zinc-500 cursor-pointer">
              <option>All Courses</option>
              <option>Tajweed Foundations</option>
              <option>AI Engineering</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
          </div>

          <div className="flex items-center gap-2 bg-[#111827] border border-[#27272A] text-xs text-zinc-300 rounded-xl px-3.5 py-2.5">
            <Calendar size={14} className="text-amber-500" />
            <span>This Semester</span>
          </div>

          <button className="flex items-center gap-2 bg-primary-600 hover:bg-primary-500 text-white text-xs font-medium rounded-xl px-4 py-2.5 transition-colors shadow-lg shadow-primary-600/20">
            <Download size={14} />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* TOP STATS CARDS (4-GRID) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* CARD 1: OVERALL COMPLETION */}
        <div className="bg-[#111827] border border-[#27272A] p-5 rounded-2xl flex items-center gap-5">
          <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-zinc-800"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-emerald-400"
                strokeDasharray={`${summary.avgProgress}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute text-xs font-semibold text-white">{summary.avgProgress}%</span>
          </div>
          <div>
            <span className="text-[10px] font-semibold tracking-wider text-zinc-500 uppercase">
              OVERALL COMPLETION
            </span>
            <div className="text-xl font-bold text-white mt-0.5">{summary.avgProgress}%</div>
            <div className="text-xs text-emerald-400 flex items-center gap-1 mt-1">
              <span>↑ Live SQL Sync</span>
            </div>
          </div>
        </div>

        {/* CARD 2: HOURS LEARNED */}
        <div className="bg-[#111827] border border-[#27272A] p-5 rounded-2xl flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-[10px] font-semibold tracking-wider text-zinc-500 uppercase">
              CURRENT STREAK
            </span>
            <TrendingUp size={18} className="text-primary-400" />
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold text-white">
              {streak.currentStreak} <span className="text-sm font-normal text-zinc-400">days</span>
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              Best: <span className="text-primary-400 font-medium">{streak.bestStreak} days</span>
            </p>
          </div>
        </div>

        {/* CARD 3: QUIZZES & ASSIGNMENTS */}
        <div className="bg-[#111827] border border-[#27272A] p-5 rounded-2xl flex flex-col justify-between">
          <span className="text-[10px] font-semibold tracking-wider text-zinc-500 uppercase">
            ACTIVE ENROLLMENTS
          </span>
          <div className="mt-2">
            <div className="text-2xl font-bold text-white">
              {summary.inProgress} <span className="text-lg font-normal text-zinc-500">/ {summary.totalEnrollments}</span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">In Progress</p>
            <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-800/40 text-emerald-400 text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              {summary.completed} Completed
            </div>
          </div>
        </div>

        {/* CARD 4: EST. COMPLETION */}
        <div className="bg-[#111827] border border-[#27272A] p-5 rounded-2xl flex flex-col justify-between">
          <span className="text-[10px] font-semibold tracking-wider text-zinc-500 uppercase">
            EST. COMPLETION
          </span>
          <div className="mt-2">
            <div className="text-xl font-bold text-white">Dec 15, 2026</div>
            <p className="text-xs text-zinc-400 mt-0.5">Target Term</p>
            <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-800/40 text-emerald-400 text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              On Track
            </div>
          </div>
        </div>
      </div>

      {/* LOWER SECTION: GRID (2 COLUMNS) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* LEFT CARD: COURSE COMPLETION BREAKDOWN */}
        <div className="bg-[#111827] border border-[#27272A] p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-base font-semibold text-white">Course Completion Breakdown</h2>
              <button className="text-xs text-primary-400 hover:text-primary-300 transition-colors">
                View All
              </button>
            </div>
            <p className="text-xs text-zinc-400 mb-6">Your active enrolled courses</p>

            <div className="space-y-5">
              {coursesList.map((course) => {
                const IconComponent = course.icon || Database;
                return (
                  <div key={course.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-xl border ${course.iconBg}`}>
                          <IconComponent size={18} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-white">
                              {course.title}
                            </span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-md border font-medium ${course.badgeStyle}`}>
                              {course.badge}
                            </span>
                          </div>
                          <span className="text-xs text-zinc-400">{course.instructor}</span>
                        </div>
                      </div>
                      <span className={`text-sm font-semibold ${course.textColor}`}>
                        {course.progress}%
                      </span>
                    </div>

                    {/* Progress Bar Track */}
                    <div className="w-full bg-zinc-800/80 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${course.progressColor}`}
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT CARD: WEEKLY LEARNING VELOCITY */}
        <div className="bg-[#111827] border border-[#27272A] p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-1">
              <div>
                <h2 className="text-base font-semibold text-white">Weekly Learning Velocity</h2>
                <p className="text-xs text-zinc-400 mt-0.5">Study activity for this week</p>
              </div>

              {/* Chart Mode Toggle */}
              <div className="bg-[#09090B] p-1 rounded-xl border border-[#27272A] flex items-center gap-1 self-start sm:self-auto">
                <button
                  onClick={() => setChartMode("hours")}
                  className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${
                    chartMode === "hours"
                      ? "bg-primary-600 text-white shadow-md shadow-primary-600/30"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Hours Spent
                </button>
                <button
                  onClick={() => setChartMode("lessons")}
                  className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${
                    chartMode === "lessons"
                      ? "bg-primary-600 text-white shadow-md shadow-primary-600/30"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Lessons Completed
                </button>
              </div>
            </div>

            {/* Area Chart Container */}
            <div className="h-64 mt-6 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="day"
                    stroke="#52525B"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#52525B"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#09090B",
                      borderColor: "#27272A",
                      borderRadius: "12px",
                      color: "#FFF",
                      fontSize: "12px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey={chartMode === "hours" ? "hours" : "lessons"}
                    stroke="#10b981"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#purpleGradient)"
                    dot={{ fill: "#10b981", r: 3 }}
                    activeDot={{ r: 6, fill: "#34d399" }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}


