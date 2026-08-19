"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowLeft,
  BarChart2,
  Bell,
  BookOpen,
  Bot,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  Settings,
  TrendingUp,
  Tv,
  Users,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const navigationItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/courses", label: "Courses", icon: BookOpen },
  { href: "/admin/assignments", label: "Assignments", icon: ClipboardList },
  { href: "/admin/live-classes", label: "Live Classes", icon: Tv },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart2 },
  { href: "/admin/announcements", label: "Announcements", icon: Bell },
  { href: "/admin/ai-professor", label: "AI Professors", icon: Bot },
  { href: "/admin/reports", label: "Reports", icon: TrendingUp },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <aside className="flex h-screen w-64 flex-shrink-0 flex-col border-r border-[#27272A] bg-black">
      <div className="flex items-center gap-2 border-b border-[#27272A] px-6 py-5">
        <span className="text-xl">⚡</span>
        <span className="text-lg font-bold text-white">Ranenla Admin</span>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[#22066A] text-white"
                      : "text-slate-300 hover:bg-[#1F2937] hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 border-t border-[#27272A] pt-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 transition-colors hover:bg-[#1F2937] hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 flex-shrink-0" />
            Back to Platform
          </Link>
        </div>
      </nav>

      <div className="border-t border-[#27272A] p-4">
        <div className="mb-2 flex items-center gap-3 rounded-lg bg-[#111827] px-3 py-2.5">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#3B82F6] text-sm font-semibold text-white">
            {(user?.fullName || "A").charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-white">{user?.fullName}</p>
            <p className="truncate text-xs text-slate-400">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={() => logout()}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-slate-400 transition-colors hover:bg-[#1F2937] hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
