"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useTheme } from "../../lib/theme/ThemeContext";

interface HeroButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
  icon?: ReactNode;
}

export function HeroButton({
  children,
  onClick,
  variant = "primary",
  className = "",
  icon
}: HeroButtonProps) {
  const { isDarkMode } = useTheme();

  if (variant === "primary") {
    return (
      <motion.button
        whileHover={{ scale: 1.03, translateY: -1 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className={`relative inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-white text-base font-semibold bg-gradient-to-r from-[#10b981] to-[#059669] shadow-[0_0_24px_rgba(16,185,129,0.35)] hover:shadow-[0_0_36px_rgba(16,185,129,0.6),_0_0_16px_rgba(5,150,105,0.4)] transition-all duration-300 cursor-pointer ${className}`}
      >
        {icon && <span className="inline-flex items-center justify-center">{icon}</span>}
        <span>{children}</span>
      </motion.button>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.03, translateY: -1 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-base font-semibold bg-transparent border transition-all duration-300 cursor-pointer ${
        isDarkMode
          ? "text-white border-[#27272A] hover:border-gray-500 hover:bg-white/5"
          : "text-zinc-900 border-zinc-300 hover:border-zinc-400 hover:bg-zinc-100"
      } ${className}`}
    >
      <span>{children}</span>
      {icon && <span className="inline-flex items-center justify-center">{icon}</span>}
    </motion.button>
  );
}
