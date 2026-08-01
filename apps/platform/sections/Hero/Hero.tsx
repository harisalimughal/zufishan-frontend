"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Play, ChevronRight } from "lucide-react";
import { HeroButton } from "./HeroButton";
import { HeroStats } from "./HeroStats";
import { HeroVideoPreview } from "./HeroVideoPreview";
import { useTheme } from "../../lib/theme/ThemeContext";

const TYPE_LINE_1 = "The World’s First";
const TYPE_HIGHLIGHT = "AI-Powered";
const TYPE_SUFFIX = " University";
const TYPE_LINE_2 = TYPE_HIGHLIGHT + TYPE_SUFFIX;
const TYPE_TOTAL = TYPE_LINE_1.length + TYPE_LINE_2.length;

const STAR_POSITIONS = [
  { top: "12%", left: "18%", size: 2, delay: 0 },
  { top: "22%", left: "82%", size: 3, delay: 0.6 },
  { top: "8%", left: "55%", size: 2, delay: 1.2 },
  { top: "35%", left: "8%", size: 2, delay: 1.8 },
  { top: "40%", left: "92%", size: 3, delay: 0.3 },
  { top: "60%", left: "15%", size: 2, delay: 0.9 },
  { top: "18%", left: "35%", size: 2, delay: 1.5 },
  { top: "50%", left: "65%", size: 2, delay: 2.1 }
];

export function Hero() {
  const { isDarkMode } = useTheme();
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    if (typed >= TYPE_TOTAL) return;
    const startDelay = typed === 0 ? 900 : 0;
    const timer = setTimeout(() => setTyped((v) => v + 1), startDelay + 45);
    return () => clearTimeout(timer);
  }, [typed]);

  const line1Typed = TYPE_LINE_1.slice(0, Math.min(typed, TYPE_LINE_1.length));
  const line2Typed = TYPE_LINE_2.slice(0, Math.max(0, typed - TYPE_LINE_1.length));
  const highlightTyped = line2Typed.slice(0, TYPE_HIGHLIGHT.length);
  const suffixTyped = line2Typed.slice(TYPE_HIGHLIGHT.length);
  const typingLine1 = typed <= TYPE_LINE_1.length;

  const handleScrollToWaitlist = () => {
    const waitlistSec = document.getElementById("waitlist");
    if (waitlistSec) {
      waitlistSec.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToDemo = () => {
    const demoVideoSec = document.getElementById("demo-video") || document.querySelector("section[style*='Product Demo']");
    if (demoVideoSec) {
      demoVideoSec.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className={`relative pt-6 pb-16 px-4 overflow-hidden flex flex-col items-center justify-center min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-[#09090B] text-white" : "bg-white text-zinc-900"
      }`}
    >

      {/* Top fade — blends the header seam into the hero */}
      {isDarkMode && (
        <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-[#09090B] via-[#09090B]/80 to-transparent pointer-events-none z-[1]" />
      )}

      {/* Animated Ambient Aurora Background */}
      <motion.div
        className="absolute top-0 left-1/2 w-[1200px] h-[500px] bg-gradient-to-b from-[#3B82F6]/20 via-[#6D5DFC]/10 to-transparent rounded-full blur-[140px] pointer-events-none"
        initial={{ x: "-50%" }}
        animate={{
          x: ["-55%", "-45%", "-55%"],
          scale: [1, 1.08, 1]
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -top-[10%] left-[5%] w-[450px] h-[450px] bg-[#3B82F6]/10 rounded-full blur-[120px] pointer-events-none"
        animate={{
          x: [0, 40, 0],
          y: [0, 30, 0],
          opacity: [0.6, 1, 0.6]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[30%] right-[5%] w-[400px] h-[400px] bg-[#6D5DFC]/10 rounded-full blur-[120px] pointer-events-none"
        animate={{
          x: [0, -30, 0],
          y: [0, -40, 0],
          opacity: [0.5, 0.9, 0.5]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute bottom-[5%] left-[35%] w-[350px] h-[350px] bg-[#A78BFA]/10 rounded-full blur-[120px] pointer-events-none"
        animate={{
          x: [0, 25, 0],
          y: [0, -20, 0],
          opacity: [0.4, 0.8, 0.4]
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Twinkling starfield (dark mode only) */}
      {isDarkMode &&
        STAR_POSITIONS.map((star, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-white pointer-events-none"
            style={{ top: star.top, left: star.left, width: star.size, height: star.size }}
            animate={{ opacity: [0.15, 0.9, 0.15] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: star.delay }}
          />
        ))}

      {/* Main Content Assembly */}
      <div className="relative max-w-6xl mx-auto flex flex-col items-center text-center z-10 w-full mt-10">

        {/* Glow Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border shadow-sm transition-colors duration-300 mb-8 cursor-pointer ${
            isDarkMode
              ? "bg-[#111827] border-[#27272A] hover:border-gray-700"
              : "bg-white border-zinc-200 hover:border-zinc-300"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-[#3B82F6]" />
          <span className="text-xs font-semibold text-[#3B82F6] tracking-wide uppercase">
            The Future of Education is Here
          </span>
        </motion.div>

        {/* Core Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className={`text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight max-w-5xl leading-[1.1] mb-6 font-sans bg-clip-text text-transparent bg-gradient-to-b ${
            isDarkMode ? "from-white via-white to-gray-400" : "from-zinc-900 via-zinc-900 to-zinc-500"
          }`}
        >
          {line1Typed}
          {typingLine1 && (
            <span
              aria-hidden="true"
              className={`inline-block w-[2px] -mb-1 ml-1 animate-pulse bg-current ${isDarkMode ? "text-white" : "text-zinc-900"}`}
              style={{ height: "0.8em" }}
            />
          )}
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] via-[#6D5DFC] to-[#A78BFA]">
            {highlightTyped}
          </span>
          {suffixTyped}
          {!typingLine1 && (
            <span
              aria-hidden="true"
              className={`inline-block w-[2px] -mb-1 ml-1 animate-pulse bg-current ${isDarkMode ? "text-white" : "text-zinc-900"}`}
              style={{ height: "0.8em" }}
            />
          )}
        </motion.h1>

        {/* Description Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed mb-10 font-sans ${
            isDarkMode ? "text-gray-400" : "text-zinc-600"
          }`}
        >
          Attend live classes taught by AI professors. <br className="hidden sm:block" />
          Ask questions naturally. Stay accountable. <br className="hidden sm:block" />
          Learn like you&apos;re in a real classroom.
        </motion.p>

        {/* Call to Actions (CTAs) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 mb-8 w-full sm:w-auto px-4 justify-center"
        >
          <Link href="/login">
            <HeroButton
              variant="primary"
              icon={<Play className="w-4 h-4 fill-white" />}
            >
              Try Product
            </HeroButton>
          </Link>

          <HeroButton
            variant="secondary"
            onClick={handleScrollToWaitlist}
            icon={<ChevronRight className="w-4 h-4 text-white" />}
          >
            Join Waitlist
          </HeroButton>
        </motion.div>

        {/* Waitlist Social Proof Block */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-3.5 mb-16"
        >
          {/* Overlapping Avatars */}
          <div className="flex -space-x-3.5">
            <img
              className={`inline-block h-8 w-8 rounded-full ring-2 object-cover ${isDarkMode ? "ring-[#09090B]" : "ring-white"}`}
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
              alt="Waitlist Member 1"
            />
            <img
              className={`inline-block h-8 w-8 rounded-full ring-2 object-cover ${isDarkMode ? "ring-[#09090B]" : "ring-white"}`}
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
              alt="Waitlist Member 2"
            />
            <img
              className={`inline-block h-8 w-8 rounded-full ring-2 object-cover ${isDarkMode ? "ring-[#09090B]" : "ring-white"}`}
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
              alt="Waitlist Member 3"
            />
            <div
              className={`inline-flex items-center justify-center h-8 w-8 rounded-full border text-[10px] font-bold ring-2 ${
                isDarkMode
                  ? "bg-[#111827] border-[#27272A] text-gray-300 ring-[#09090B]"
                  : "bg-zinc-100 border-zinc-200 text-zinc-600 ring-white"
              }`}
            >
              +2K
            </div>
          </div>

          {/* Caption text */}
          <span className={`text-xs font-sans ${isDarkMode ? "text-gray-400" : "text-zinc-600"}`}>
            Join <span className="text-[#3B82F6] font-bold">2,847+</span> students on the waitlist
          </span>
        </motion.div>

        {/* Reusable key benefits block */}
        <HeroStats />

        {/* Live Classroom Interactive Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="w-full"
        >
          <HeroVideoPreview />
        </motion.div>

        {/* Trusted Partners / Logos Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className={`w-full border-t pt-12 mt-4 flex flex-col items-center gap-6 ${
            isDarkMode ? "border-white/5" : "border-zinc-200"
          }`}
        >
          <span className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? "text-gray-500" : "text-zinc-500"}`}>
            Trusted by future students worldwide
          </span>

          {/* Logo grid */}
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 opacity-35">
            {/* Google Logo */}
            <span className={`text-sm font-semibold tracking-tight font-sans opacity-70 hover:opacity-100 transition-opacity ${isDarkMode ? "text-white" : "text-zinc-900"}`}>
              Google
            </span>
            {/* Microsoft Logo */}
            <div className="flex items-center gap-1.5 opacity-70 hover:opacity-100 transition-opacity">
              <div className="grid grid-cols-2 gap-0.5 w-3.5 h-3.5">
                <span className={`w-1.5 h-1.5 ${isDarkMode ? "bg-white/70" : "bg-zinc-700"}`} />
                <span className={`w-1.5 h-1.5 ${isDarkMode ? "bg-white/70" : "bg-zinc-700"}`} />
                <span className={`w-1.5 h-1.5 ${isDarkMode ? "bg-white/70" : "bg-zinc-700"}`} />
                <span className={`w-1.5 h-1.5 ${isDarkMode ? "bg-white/70" : "bg-zinc-700"}`} />
              </div>
              <span className={`text-sm font-semibold tracking-tight font-sans ${isDarkMode ? "text-white" : "text-zinc-900"}`}>
                Microsoft
              </span>
            </div>
            {/* NVIDIA Logo */}
            <span className={`text-sm font-bold tracking-tight font-sans opacity-70 hover:opacity-100 transition-opacity ${isDarkMode ? "text-white" : "text-zinc-900"}`}>
              NVIDIA
            </span>
            {/* Stripe Logo */}
            <span className={`text-sm font-extrabold tracking-tight font-sans opacity-70 hover:opacity-100 transition-opacity ${isDarkMode ? "text-white" : "text-zinc-900"}`}>
              stripe
            </span>
            {/* Notion Logo */}
            <span className={`text-sm font-bold tracking-tight font-mono opacity-70 hover:opacity-100 transition-opacity ${isDarkMode ? "text-white" : "text-zinc-900"}`}>
              N Notion
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}