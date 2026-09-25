"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.25 }}
      className="flex items-start gap-3 max-w-2xl text-stone-200"
    >
      {/* Assistant Avatar */}
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 shadow-sm shadow-emerald-500/10">
        <Sparkles className="h-4 w-4 animate-pulse" />
      </div>

      {/* Thinking Bubble */}
      <div className="rounded-2xl rounded-tl-sm border border-stone-800 bg-stone-900/90 px-4 py-3 text-sm shadow-lg">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-stone-400">
            Zufishan AI is reasoning...
          </span>
          <div className="flex items-center gap-1">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="h-1.5 w-1.5 rounded-full bg-emerald-400"
                animate={{
                  y: [0, -5, 0],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.18,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
