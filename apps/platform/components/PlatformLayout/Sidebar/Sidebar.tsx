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
  Compass,
  GraduationCap,
  LayoutDashboard,
  MessagesSquare,
  PanelLeftClose,
  PanelLeftOpen,
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
  Compass,
  GraduationCap,
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

type SidebarProps = {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
};

export function Sidebar({ collapsed = false, onToggleCollapse }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      <div className={`mb-8 flex items-center ${collapsed ? "justify-center" : "justify-between"}`}>
        {!collapsed && (
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
        )}
        {onToggleCollapse && (
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="hidden lg:flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-[#27272A] text-slate-300 hover:bg-[#1F2937] hover:text-white transition-colors"
          >
            {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
          </button>
        )}
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
              title={collapsed ? item.title : undefined}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                collapsed ? "justify-center" : ""
              } ${
                isActive
                  ? "bg-[#22066A] text-white"
                  : "text-slate-300 hover:bg-[#1F2937] hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              {!collapsed && <span>{item.title}</span>}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
