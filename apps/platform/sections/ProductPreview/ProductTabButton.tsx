import React from "react";
import { LucideIcon } from "lucide-react";

interface ProductTabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  // This tells TypeScript we are passing a Lucide Icon component
  icon: LucideIcon; 
}

export default function ProductTabButton({ label, isActive, onClick, icon: Icon }: ProductTabButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
        isActive
          ? "bg-[#111827] text-white border-[#27272A]"
          : "text-[#A1A1AA] border-transparent hover:text-white hover:bg-[#111827]/50"
      }`}
    >
      <Icon 
        size={16} 
        className={isActive ? "text-[#3B82F6]" : "text-[#A1A1AA]"} 
      />
      {label}
    </button>
  );
}