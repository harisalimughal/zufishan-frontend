"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Play, ChevronRight } from "lucide-react";
import { HeroButton } from "./HeroButton";
import { HeroStats } from "./HeroStats";
import { HeroVideoPreview } from "./HeroVideoPreview";

export function Hero() {
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
    <section className="relative bg-[#09090B] text-white pt-6 pb-16 px-4 overflow-hidden flex flex-col items-center justify-center min-h-screen">

      {/* Premium Ambient Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[500px] bg-gradient-to-b from-[#3B82F6]/10 via-[#6D5DFC]/5 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -top-[10%] left-[5%] w-[450px] h-[450px] bg-[#3B82F6]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[30%] right-[5%] w-[400px] h-[400px] bg-[#6D5DFC]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Content Assembly */}
      <div className="relative max-w-6xl mx-auto flex flex-col items-center text-center z-10 w-full mt-10">

        {/* Glow Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#111827]/40 border border-[#27272A] hover:border-gray-700 transition-colors duration-300 mb-8 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#3B82F6]" />
          <span className="text-[11px] font-bold text-[#A78BFA] tracking-wider uppercase font-mono">
            The Future of Education is Here
          </span>
        </motion.div>

        {/* Core Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight max-w-5xl leading-[1.1] mb-6 font-sans bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-gray-400"
        >
          The World’s First <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] via-[#6D5DFC] to-[#A78BFA]">
            AI-Powered
          </span>{" "}
          University
        </motion.h1>

        {/* Description Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl leading-relaxed mb-10 font-sans"
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
              className="inline-block h-8 w-8 rounded-full ring-2 ring-[#09090B] object-cover"
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
              alt="Waitlist Member 1"
            />
            <img
              className="inline-block h-8 w-8 rounded-full ring-2 ring-[#09090B] object-cover"
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
              alt="Waitlist Member 2"
            />
            <img
              className="inline-block h-8 w-8 rounded-full ring-2 ring-[#09090B] object-cover"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
              alt="Waitlist Member 3"
            />
            <div className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-[#111827] border border-[#27272A] text-[10px] font-bold text-gray-300 ring-2 ring-[#09090B]">
              +2K
            </div>
          </div>

          {/* Caption text */}
          <span className="text-xs text-gray-400 font-sans">
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
          className="w-full border-t border-white/5 pt-12 mt-4 flex flex-col items-center gap-6"
        >
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
            Trusted by future students worldwide
          </span>

          {/* Logo grid */}
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 opacity-35">
            {/* Google Logo */}
            <span className="text-sm font-semibold tracking-tight text-white font-sans opacity-70 hover:opacity-100 transition-opacity">
              Google
            </span>
            {/* Microsoft Logo */}
            <div className="flex items-center gap-1.5 opacity-70 hover:opacity-100 transition-opacity">
              <div className="grid grid-cols-2 gap-0.5 w-3.5 h-3.5">
                <span className="bg-white/70 w-1.5 h-1.5" />
                <span className="bg-white/70 w-1.5 h-1.5" />
                <span className="bg-white/70 w-1.5 h-1.5" />
                <span className="bg-white/70 w-1.5 h-1.5" />
              </div>
              <span className="text-sm font-semibold tracking-tight text-white font-sans">
                Microsoft
              </span>
            </div>
            {/* NVIDIA Logo */}
            <span className="text-sm font-bold tracking-tight text-white font-sans opacity-70 hover:opacity-100 transition-opacity">
              NVIDIA
            </span>
            {/* Stripe Logo */}
            <span className="text-sm font-extrabold tracking-tight text-white font-sans opacity-70 hover:opacity-100 transition-opacity">
              stripe
            </span>
            {/* Notion Logo */}
            <span className="text-sm font-bold tracking-tight text-white font-mono opacity-70 hover:opacity-100 transition-opacity">
              N Notion
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}