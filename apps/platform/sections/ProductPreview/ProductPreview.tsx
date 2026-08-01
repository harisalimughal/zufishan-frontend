"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import ProductTabButton from "./ProductTabButton";
import { LayoutDashboard, BookOpen, Video, CalendarCheck, Bot, Monitor } from "lucide-react";
import { useTheme } from "../../lib/theme/ThemeContext";

// 1. Direct Relative Imports (Adjust the "../" based on your exact depth)
import dashboardImg from "../../../public/images/product-preview/dashboard.png";
import coursesImg from "../../../public/images/product-preview/courses.png";
import liveImg from "../../../public/images/product-preview/live-classes.jpg";
import attendanceImg from "../../../public/images/product-preview/attendance.png";
import aiImg from "../../../public/images/product-preview/ai-tutor.avif";

type TabType = "dashboard" | "courses" | "live" | "attendance" | "ai";

export function ProductPreview() {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");

  // 2. Map the imported objects instead of strings
  const tabImages: Record<TabType, { src: string; alt: string }> = {
    dashboard: { src: dashboardImg.src, alt: "Dashboard view" },
    courses: { src: coursesImg.src, alt: "My Courses view" },
    live: { src: liveImg.src, alt: "Live Classes view" },
    attendance: { src: attendanceImg.src, alt: "Attendance view" },
    ai: { src: aiImg.src, alt: "AI Tutor view" }
  };

  return (
    <section
      id="product-preview"
      className={`py-24 px-4 sm:px-6 lg:px-8 border-b font-sans antialiased transition-colors duration-300 ${
        isDarkMode ? "bg-[#09090B] border-[#27272A]" : "bg-white border-zinc-200"
      }`}
    >
      <div className="mx-auto max-w-6xl text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold text-[#3B82F6] shadow-sm mb-6 tracking-wide uppercase select-none transition-colors duration-300 ${
            isDarkMode
              ? "border-[#27272A] bg-[#111827] hover:border-gray-700"
              : "border-zinc-200 bg-white hover:border-zinc-300"
          }`}
        >
          <Monitor size={14} className="text-[#3B82F6]" />
          PRODUCT PREVIEW
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`text-4xl font-medium tracking-tight sm:text-5xl max-w-3xl mx-auto leading-tight transition-colors duration-300 ${
            isDarkMode ? "text-white" : "text-zinc-900"
          }`}
        >
          A platform designed <br /> for <span className="text-[#3B82F6]">real learning outcomes.</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`mx-auto mt-5 max-w-xl text-base font-normal leading-relaxed transition-colors duration-300 ${
            isDarkMode ? "text-[#A1A1AA]" : "text-zinc-600"
          }`}
        >
          Here's a glimpse of your AI University dashboard. <br />
          Everything you need to learn, track, and grow — in one place.
        </motion.p>

        {/* Navigation Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
          <ProductTabButton
            label="Dashboard"
            isActive={activeTab === "dashboard"}
            onClick={() => setActiveTab("dashboard")}
            icon={LayoutDashboard}
          />
          <ProductTabButton
            label="My Courses"
            isActive={activeTab === "courses"}
            onClick={() => setActiveTab("courses")}
            icon={BookOpen}
          />
          <ProductTabButton
            label="Live Classes"
            isActive={activeTab === "live"}
            onClick={() => setActiveTab("live")}
            icon={Video}
          />
          <ProductTabButton
            label="Attendance"
            isActive={activeTab === "attendance"}
            onClick={() => setActiveTab("attendance")}
            icon={CalendarCheck}
          />
          <ProductTabButton
            label="AI Tutor"
            isActive={activeTab === "ai"}
            onClick={() => setActiveTab("ai")}
            icon={Bot}
          />
        </motion.div>

        {/* Image Canvas Frame with Blue Neon Glow Effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={`mt-12 relative mx-auto max-w-5xl rounded-2xl border p-2 shadow-[0_0_50px_rgba(59,130,246,0.25)] backdrop-blur-sm transition-all duration-300 ${
            isDarkMode ? "border-[#052E70] bg-[#111827]/40" : "border-blue-200 bg-blue-50/60"
          }`}
        >
          {activeTab === "live" ? (
            <video
              key="live-classes-video"
              src="https://res.cloudinary.com/lgyepgcr/video/upload/v1785494731/Prof._Jane_-_Renanla_i1us2z.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-auto rounded-xl object-cover border border-[#27272A]/40 min-h-[320px] max-h-[580px]"
            />
          ) : (
            <img
              src={tabImages[activeTab].src}
              alt={tabImages[activeTab].alt}
              className="w-full h-auto rounded-xl object-cover border border-[#27272A]/40 min-h-[320px] max-h-[580px]"
            />
          )}
        </motion.div>
      </div>
    </section>
  );
}