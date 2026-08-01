"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { useTheme } from "../../lib/theme/ThemeContext";

interface ProductTabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  // This tells TypeScript we are passing a Lucide Icon component
  icon: LucideIcon;
}

export default function ProductTabButton({ label, isActive, onClick, icon: Icon }: ProductTabButtonProps) {
  const { isDarkMode } = useTheme();

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.03, translateY: -1 }}
      whileTap={{ scale: 0.98 }}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
        isDarkMode
          ? isActive
            ? "bg-[#111827] text-white border-[#27272A]"
            : "text-[#A1A1AA] border-transparent hover:text-white hover:bg-[#111827]/50"
          : isActive
            ? "bg-zinc-100 text-zinc-900 border-zinc-200"
            : "text-zinc-500 border-transparent hover:text-zinc-900 hover:bg-zinc-100/70"
      }`}
    >
      <Icon
        size={16}
        className={isActive ? "text-[#3B82F6]" : isDarkMode ? "text-[#A1A1AA]" : "text-zinc-500"}
      />
      {label}
    </motion.button>
  );
}
