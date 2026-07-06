"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bot,
  BookOpen,
  CalendarDays,
  ClipboardCheck,
  ClipboardList,
  LayoutDashboard,
  MessagesSquare,
  Settings,
  TrendingUp,
  Trophy,
  Video,
  type LucideIcon
} from "lucide-react";
import { sidebarItems } from "../../../lib/navigation/sidebar-items";

const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  BookOpen,
  Video,
  CalendarDays,
  ClipboardCheck,
  ClipboardList,
  Bot,
  TrendingUp,
  Trophy,
  MessagesSquare,
  Settings
};

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      <div className="mb-8 flex items-center">
        <div className="flex items-center justify-center">
          <Image
            src="/Nexora-logo-black.png"
            alt="Nexora logo"
            width={180}
            height={80}
            className="h-12 w-auto object-contain"
            priority
          />
        </div>
      </div>

      <nav className="space-y-1">
        {sidebarItems.map((item: { title: string; href: string; icon: string }) => {
          const Icon = iconMap[item.icon] ?? LayoutDashboard;
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-[#22066A] text-white"
                  : "text-slate-300 hover:bg-[#1F2937] hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
