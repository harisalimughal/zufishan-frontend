"use client";

import { motion } from "framer-motion";
import type { ElementType } from "react";

interface FooterSocialButtonProps {
  href: string;
  icon: ElementType;
  label: string;
}

export function FooterSocialButton({ href, icon: Icon, label }: FooterSocialButtonProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      whileHover={{ scale: 1.1, rotate: 4 }}
      whileTap={{ scale: 0.95 }}
      className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#111827] border border-[#27272A] text-gray-400 hover:text-white hover:border-[#3B82F6]/50 hover:bg-[#3B82F6]/10 shadow-lg transition-colors duration-300 cursor-pointer"
    >
      <Icon className="w-4 h-4" />
    </motion.a>
  );
}
