"use client";

import { motion } from "framer-motion";
import {
  ClipboardList,
  Construction,
  MessagesSquare,
  Settings,
  TrendingUp,
  type LucideIcon
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  TrendingUp,
  ClipboardList,
  MessagesSquare,
  Settings
};

type ComingSoonProps = {
  title: string;
  description?: string;
  icon?: keyof typeof iconMap;
};

export function ComingSoon({ title, description, icon }: ComingSoonProps) {
  const Icon = (icon && iconMap[icon]) || Construction;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#27272A] bg-[#111827] text-[#10b981]">
        <Icon className="h-7 w-7" />
      </div>

      <div className="space-y-1.5">
        <h1 className="text-xl font-bold text-white">{title}</h1>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#10b981]/30 bg-[#10b981]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#10b981]">
          Coming Soon
        </span>
      </div>

      <p className="max-w-sm text-sm text-slate-400">
        {description ?? `We're building ${title.toLowerCase()} right now. Check back soon.`}
      </p>
    </motion.div>
  );
}
