"use client";

import React from "react";

interface WaitlistFeatureIconProps {
  label: string;
  sublabel: string;
  icon: React.ReactNode;
}

export default function WaitlistFeatureIcon({ label, sublabel, icon }: WaitlistFeatureIconProps) {
  return (
    <div className="flex items-center gap-1 text-left">
      {/* Semi-transparent Circular Icon Wrapper matching the screenshot */}
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#111827]/60 text-[#3B82F6] shadow-[0_0_15px_rgba(59,130,246,0.1)]">
        {icon}
      </div>
      
      {/* Plain text block without mixed styles or sizes */}
      <div className="text-xs font-normal text-zinc-300 tracking-tight leading-tight">
        <div>{label}</div>
        <div>{sublabel}</div>
      </div>
    </div>
  );
}