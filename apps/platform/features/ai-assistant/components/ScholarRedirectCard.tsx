"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  GraduationCap,
  ArrowRight,
  ShieldAlert,
  BookOpen,
  CheckCircle2,
} from "lucide-react";

interface ScholarRedirectCardProps {
  originalQuestion?: string;
  category?: string | null;
  message?: string;
}

const CATEGORY_DISPLAY_MAP: Record<string, { label: string; icon: string }> = {
  PRAYER_WORSHIP: { label: "Prayer & Worship (Salah, Taharah, Sawm)", icon: "🕌" },
  FOOD_DRINK: { label: "Halal & Haram (Food, Drink, Consumption)", icon: "🍽️" },
  FINANCIAL: { label: "Islamic Finance, Zakat & Transactions", icon: "💰" },
  MARRIAGE_FAMILY: { label: "Marriage, Divorce & Family Rulings", icon: "🤝" },
  GENERAL_RULING: { label: "General Fiqh & Religious Rulings", icon: "📜" },
  ADVERSARIAL: { label: "Theological & Doctrinal Inquiry", icon: "⚖️" },
};

export function ScholarRedirectCard({
  originalQuestion,
  category,
  message,
}: ScholarRedirectCardProps) {
  const categoryInfo = category
    ? CATEGORY_DISPLAY_MAP[category] || { label: category, icon: "📖" }
    : { label: "General Fiqhi Ruling", icon: "📖" };

  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="relative overflow-hidden rounded-2xl border-2 border-amber-500/40 bg-gradient-to-br from-amber-950/40 via-stone-900/90 to-amber-900/20 p-5 sm:p-6 shadow-xl shadow-amber-500/5 text-stone-100"
    >
      {/* Subtle decorative Islamic arch geometric glow background */}
      <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

      {/* Header Banner: Unmistakable Scholar Routing Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-500/20 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 text-stone-950 shadow-md shadow-amber-500/20">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold tracking-wide text-amber-300 text-sm sm:text-base uppercase">
                Routed to a Scholar
              </span>
              <span className="rounded-full border border-amber-500/30 bg-amber-500/15 px-2 py-0.5 text-xs font-medium text-amber-200">
                Fiqhi Ruling
              </span>
            </div>
            <p className="text-xs text-stone-400">
              Preserving Religious Integrity • Human Verification Required
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 rounded-lg bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-300 border border-amber-500/20">
          <ShieldAlert className="h-4 w-4 text-amber-400" />
          <span>No AI-Generated Ruling</span>
        </div>
      </div>

      {/* Body: Reason & Original Question */}
      <div className="mt-4 space-y-3.5 text-sm text-stone-300 leading-relaxed">
        <p className="font-medium text-stone-200">
          {message ||
            "This inquiry involves a religious ruling (Fiqh) or Halal/Haram classification. The Zufishan AI Assistant does not issue religious decrees to ensure authentic scholarship is upheld."}
        </p>

        {originalQuestion && (
          <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-3.5">
            <span className="text-xs font-medium uppercase tracking-wider text-stone-400">
              Your Question:
            </span>
            <p className="mt-1 text-stone-200 italic font-serif text-sm sm:text-base">
              &ldquo;{originalQuestion}&rdquo;
            </p>
          </div>
        )}

        {/* Suggested Category Tag */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs font-medium text-stone-400">
            Suggested Category:
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/15 px-3 py-1 text-xs font-semibold text-amber-200">
            <span>{categoryInfo.icon}</span>
            <span>{categoryInfo.label}</span>
          </span>
        </div>

        {/* Scholar Principles List */}
        <div className="rounded-xl bg-stone-900/50 p-3 border border-stone-800/80">
          <p className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">
            Why scholar guidance is necessary:
          </p>
          <ul className="space-y-1.5 text-xs text-stone-300">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-amber-400 shrink-0" />
              <span>Fiqhi rulings depend on specific circumstances, context, and intent (Niyyah).</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-amber-400 shrink-0" />
              <span>Certified scholars provide verified answers according to traditional Usul al-Fiqh.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Action Button: Route directly to Fatwa / Scholar Flow */}
      <div className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-amber-500/20">
        <span className="text-xs text-stone-400">
          Ready to ask a qualified scholar?
        </span>

        <Link
          href={`/group-chat?category=${encodeURIComponent(category || "GENERAL_RULING")}&prompt=${encodeURIComponent(originalQuestion || "")}`}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-2.5 text-sm font-semibold text-stone-950 shadow-md shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500 transition-all focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-stone-900 active:scale-[0.98]"
        >
          <BookOpen className="h-4 w-4" />
          <span>Submit to Fatwa & Q&A Service</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.div>
  );
}
