"use client";

import React from "react";
import { useTheme } from "../../lib/theme/ThemeContext";

interface WaitlistFeatureIconProps {
  label: string;
  sublabel: string;
  icon: React.ReactNode;
}

export default function WaitlistFeatureIcon({ label, sublabel, icon }: WaitlistFeatureIconProps) {
  const { isDarkMode } = useTheme();

  return (
    <div className="flex items-center gap-1 text-left">
      {/* Semi-transparent Circular Icon Wrapper matching the screenshot */}
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-[#10b981] shadow-[0_0_15px_rgba(16,185,129,0.1)] transition-colors duration-300 ${
          isDarkMode ? "bg-[#111827]/60" : "bg-zinc-100"
        }`}
      >
        {icon}
      </div>

      {/* Plain text block without mixed styles or sizes */}
      <div
        className={`text-xs font-normal tracking-tight leading-tight transition-colors duration-300 ${
          isDarkMode ? "text-zinc-300" : "text-zinc-600"
        }`}
      >
        <div>{label}</div>
        <div>{sublabel}</div>
      </div>
    </div>
  );
}