"use client";

import React from "react";
import { Moon, Sun } from "lucide-react";

interface ThemeToggleProps {
  isDarkMode: boolean;
  onToggle: () => void;
}

export default function ThemeToggle({
  isDarkMode,
  onToggle
}: ThemeToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label="Toggle Theme"
      className={`
        flex
        items-center
        justify-center
        w-11
        h-11
        rounded-xl
        border
        transition-all
        duration-200
        hover:scale-105
        ${
          isDarkMode
            ? "bg-[#111827] border-[#27272A] text-white"
            : "bg-white border-[#E5E7EB] text-[#09090B]"
        }
      `}
    >
      {isDarkMode ? (
        <Moon size={18} />
      ) : (
        <Sun size={18} />
      )}
    </button>
  );
}