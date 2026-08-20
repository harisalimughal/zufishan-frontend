"use client";

import { motion } from "framer-motion";
import type { ElementType } from "react";
import { useTheme } from "../../lib/theme/ThemeContext";

interface FooterSocialButtonProps {
  href: string;
  icon: ElementType;
  label: string;
}

export function FooterSocialButton({ href, icon: Icon, label }: FooterSocialButtonProps) {
  const { isDarkMode } = useTheme();

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      whileHover={{ scale: 1.1, rotate: 4 }}
      whileTap={{ scale: 0.95 }}
      className={`inline-flex items-center justify-center w-10 h-10 rounded-full border hover:border-[#10b981]/50 hover:bg-[#10b981]/10 shadow-lg transition-colors duration-300 cursor-pointer ${
        isDarkMode
          ? "bg-[#111827] border-[#27272A] text-gray-400 hover:text-white"
          : "bg-zinc-100 border-zinc-200 text-zinc-500 hover:text-zinc-900"
      }`}
    >
      <Icon className="w-4 h-4" />
    </motion.a>
  );
}
