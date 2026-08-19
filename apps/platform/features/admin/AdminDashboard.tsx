"use client";

import Link from "next/link";
import { AdminStats } from "@/services/adminService";

interface AdminDashboardProps {
  stats: AdminStats;
}

export function AdminDashboard({ stats }: AdminDashboardProps) {
  const tutors = stats.totalUsers - stats.totalAdmins - stats.totalStudents;

  const statCards = [
    { label: "Total Users", value: stats.totalUsers, color: "text-[#3B82F6]", icon: "👥" },
    { label: "Students", value: stats.totalStudents, color: "text-purple-400", icon: "🎓" },
    { label: "Tutors", value: tutors, color: "text-yellow-400", icon: "🎯" },
    { label: "Admins", value: stats.totalAdmins, color: "text-red-400", icon: "⚙️" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="mt-2 text-slate-400">Welcome back! Here&apos;s an overview of your platform.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="rounded-xl border border-[#27272A] bg-[#111827] p-6 transition-colors hover:border-[#3B82F6]/40"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  {card.label}
                </p>
                <p className={`mt-2 text-3xl font-bold ${card.color}`}>{card.value}</p>
              </div>
              <span className="text-4xl">{card.icon}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-[#27272A] bg-[#111827] p-8">
        <h2 className="mb-6 text-xl font-bold text-white">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            href="/admin/users"
            className="inline-block rounded-lg border border-[#27272A] p-4 transition-colors hover:border-[#3B82F6]/40 hover:bg-[#1F2937]"
          >
            <span className="mb-2 block text-2xl">👥</span>
            <p className="font-semibold text-white">Manage Users</p>
          </Link>
          <Link
            href="/admin/courses"
            className="inline-block rounded-lg border border-[#27272A] p-4 transition-colors hover:border-[#3B82F6]/40 hover:bg-[#1F2937]"
          >
            <span className="mb-2 block text-2xl">📚</span>
            <p className="font-semibold text-white">Manage Courses</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
