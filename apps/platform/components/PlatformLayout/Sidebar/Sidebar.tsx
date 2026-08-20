"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
/* eslint-disable @next/next/no-img-element */
import {
  Bot,
  BookOpen,
  CalendarDays,
  ChevronDown,
  ClipboardCheck,
  ClipboardList,
  Compass,
  GraduationCap,
  LayoutDashboard,
  Settings,
  Megaphone,
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
  Megaphone,
  Users,
  Settings
};

const EXPANDED_SECTIONS_KEY = "zufishan-sidebar-expanded-sections";

function getDefaultExpandedSections(): Record<string, boolean> {
  const labeledSections = sidebarSections.filter((s) => s.label);
  const defaults: Record<string, boolean> = {};
  labeledSections.forEach((section, index) => {
    defaults[section.label as string] = index === 0;
  });
  return defaults;
}

type SidebarProps = {
  collapsed?: boolean;
  onNavigate?: () => void;
};

export function Sidebar({ collapsed = false, onNavigate }: SidebarProps) {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(
    getDefaultExpandedSections
  );

  useEffect(() => {
    const stored = localStorage.getItem(EXPANDED_SECTIONS_KEY);
    if (!stored) return;
    try {
      setExpandedSections(JSON.parse(stored));
    } catch {
      // ignore malformed stored state
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(EXPANDED_SECTIONS_KEY, JSON.stringify(expandedSections));
  }, [expandedSections]);

  const toggleSection = (label: string) => {
    setExpandedSections((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* Fixed header: logo */}
      {!collapsed && (
        <div className="flex flex-shrink-0 items-center px-6">
          <img
            src="/Zufishan-logo-transparent-dark.svg"
            alt="Zufishan logo"
            className="h-12 w-auto object-contain"
          />
        </div>
      )}

      {/* Scrollable navigation */}
      <nav
        aria-label="Primary"
        className={`sidebar-nav mt-6 min-h-0 flex-1 overflow-y-auto ${collapsed ? "pl-3" : "pl-6"}`}
      >
        <div className="space-y-5">
          {sidebarSections.map((section, sectionIndex) => {
            const isExpanded = section.label ? expandedSections[section.label] ?? true : true;

            return (
              <div key={section.label ?? `section-${sectionIndex}`}>
                {section.label && !collapsed && (
                  <button
                    type="button"
                    onClick={() => toggleSection(section.label as string)}
                    className="mb-1.5 flex w-full items-center justify-between px-3 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    <span>{section.label}</span>
                    <ChevronDown
                      className={`h-3 w-3 flex-shrink-0 transition-transform ${isExpanded ? "" : "-rotate-90"}`}
                    />
                  </button>
                )}
                {section.label && collapsed && (
                  <div className="mx-3 mb-1.5 border-t border-[#27272A]" aria-hidden="true" />
                )}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="space-y-0.5 overflow-hidden"
                    >
                      {section.items.map((item) => {
                        const Icon = iconMap[item.icon] ?? LayoutDashboard;
                        const isActive =
                          pathname === item.href || pathname.startsWith(`${item.href}/`);

                        return (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              onClick={onNavigate}
                              title={collapsed ? item.title : undefined}
                              className={`flex h-9 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors ${
                                collapsed ? "justify-center" : ""
                              } ${
                                isActive
                                  ? "bg-[#064e3b] text-white"
                                  : "text-slate-300 hover:bg-[#1F2937] hover:text-white"
                              }`}
                            >
                              <Icon className="h-4 w-4 flex-shrink-0" />
                              {!collapsed && <span className="whitespace-nowrap">{item.title}</span>}
                            </Link>
                          </li>
                        );
                      })}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </nav>

      {/* Fixed footer: user profile */}
      <div className={`mt-4 flex-shrink-0 border-t border-[#27272A] pt-4 ${collapsed ? "px-3" : "px-6"}`}>
        <UserProfileCard collapsed={collapsed} />
      </div>
    </div>
  );
}
