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
  Users,
  Video,
  type LucideIcon
} from "lucide-react";
import { sidebarSections } from "../../../lib/navigation/sidebar-items";
import { UserProfileCard } from "../UserProfileCard";

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
  Users,
  Settings
};

type SidebarProps = {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
};

export function Sidebar({ collapsed = false, onToggleCollapse }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* Fixed header: logo + collapse toggle */}
      <div className={`flex flex-shrink-0 items-center ${collapsed ? "justify-center px-3" : "justify-between px-6"}`}>
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

      {/* Scrollable navigation */}
      <nav
        aria-label="Primary"
        className={`sidebar-nav mt-6 min-h-0 flex-1 overflow-y-auto ${collapsed ? "pl-3" : "pl-6"}`}
      >
        <div className="space-y-5">
          {sidebarSections.map((section, sectionIndex) => (
            <div key={section.label ?? `section-${sectionIndex}`}>
              {section.label && !collapsed && (
                <p className="mb-1.5 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  {section.label}
                </p>
              )}
              {section.label && collapsed && (
                <div className="mx-3 mb-1.5 border-t border-[#27272A]" aria-hidden="true" />
              )}
              <ul className="space-y-0.5">
                {section.items.map((item) => {
                  const Icon = iconMap[item.icon] ?? LayoutDashboard;
                  const isActive =
                    pathname === item.href || pathname.startsWith(`${item.href}/`);

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        title={collapsed ? item.title : undefined}
                        className={`flex h-9 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors ${
                          collapsed ? "justify-center" : ""
                        } ${
                          isActive
                            ? "bg-[#22066A] text-white"
                            : "text-slate-300 hover:bg-[#1F2937] hover:text-white"
                        }`}
                      >
                        <Icon className="h-4 w-4 flex-shrink-0" />
                        {!collapsed && <span className="whitespace-nowrap">{item.title}</span>}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </nav>

      {/* Fixed footer: user profile */}
      <div className={`mt-4 flex-shrink-0 border-t border-[#27272A] pt-4 ${collapsed ? "px-3" : "px-6"}`}>
        <UserProfileCard collapsed={collapsed} />
      </div>
    </div>
  );
}
