"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Compass, Calculator, Clock, HelpCircle } from "lucide-react";

interface EmptyStateProps {
  onSelectPrompt: (prompt: string) => void;
}

const SUGGESTIONS = [
  {
    icon: Calculator,
    title: "Zakat Calculation",
    prompt: "How do I calculate Zakat on gold, silver, and liquid cash?",
    tag: "Finance",
  },
  {
    icon: Compass,
    title: "Course Catalog",
    prompt: "Which beginner courses are available for Tajweed and Quranic Arabic?",
    tag: "Learning",
  },
  {
    icon: Clock,
    title: "Prayer Times & Qibla",
    prompt: "How does the platform calculate Asr prayer time using Hanafi vs Shafi'i?",
    tag: "Utility",
  },
  {
    icon: HelpCircle,
    title: "Platform Help",
    prompt: "How do I submit an assignment and track my course certificates?",
    tag: "Help Docs",
  },
];

export function EmptyState({ onSelectPrompt }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center text-center px-4 py-8 sm:py-12 max-w-2xl mx-auto"
    >
      {/* Emblem Icon */}
      <div className="relative mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/20 via-emerald-600/10 to-transparent border border-emerald-500/30 text-emerald-400 shadow-xl shadow-emerald-500/10">
        <Sparkles className="h-8 w-8" />
        <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-emerald-400 animate-ping" />
        <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-emerald-400" />
      </div>

      {/* Islamic Welcome Banner */}
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-100">
        Assalamu Alaikum! How can I assist you?
      </h2>
      <p className="mt-2 text-sm text-stone-400 leading-relaxed max-w-lg">
        I am your Zufishan Platform Assistant. I can help you find courses, calculate zakat,
        explore utilities, and navigate platform documentation.
      </p>

      {/* Suggestion Chips Grid */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full text-left">
        {SUGGESTIONS.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <motion.button
              key={index}
              type="button"
              onClick={() => onSelectPrompt(item.prompt)}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-start gap-3 rounded-xl border border-stone-800 bg-stone-900/70 p-3.5 hover:border-emerald-500/50 hover:bg-stone-900 hover:shadow-lg hover:shadow-emerald-500/5 transition-all group"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:bg-emerald-500/20">
                <IconComponent className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-xs font-semibold text-stone-200 group-hover:text-emerald-300 transition-colors">
                    {item.title}
                  </span>
                  <span className="text-[10px] uppercase font-mono text-stone-400 px-1.5 py-0.5 rounded bg-stone-800">
                    {item.tag}
                  </span>
                </div>
                <p className="mt-1 text-xs text-stone-400 line-clamp-2 leading-snug">
                  {item.prompt}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Scope Disclaimer */}
      <p className="mt-6 text-[11px] text-stone-400">
        💡 Note: Questions regarding religious decrees (Fatwas) are safely routed to verified human scholars.
      </p>
    </motion.div>
  );
}
