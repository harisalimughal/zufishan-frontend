"use client";

import React, { useState } from "react";
import ProductTabButton from "./ProductTabButton";
import { LayoutDashboard, BookOpen, Video, CalendarCheck, Bot, Monitor } from "lucide-react";

// 1. Direct Relative Imports (Adjust the "../" based on your exact depth)
import dashboardImg from "../../../public/images/product-preview/dashboard.avif";
import coursesImg from "../../../public/images/product-preview/courses.avif";
import liveImg from "../../../public/images/product-preview/live-classes.jpg";
import attendanceImg from "../../../public/images/product-preview/attendance.avif";
import aiImg from "../../../public/images/product-preview/ai-tutor.avif";

type TabType = "dashboard" | "courses" | "live" | "attendance" | "ai";

export function ProductPreview() {
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
    <section id="product-preview" className="bg-[#09090B] py-24 px-4 sm:px-6 lg:px-8 border-b border-[#27272A] font-sans antialiased">
      <div className="mx-auto max-w-6xl text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#3B82F6]/30 bg-[#111827] text-xs font-medium text-[#3B82F6] shadow-[0_0_15px_rgba(59,130,246,0.15)] mb-6 tracking-wide uppercase select-none">
          <Monitor size={14} className="text-[#3B82F6]" />
          PRODUCT PREVIEW
        </div>

        {/* Heading */}
        <h2 className="text-4xl font-medium tracking-tight text-white sm:text-5xl max-w-3xl mx-auto leading-tight">
          A platform designed <br /> for <span className="text-[#3B82F6]">real learning outcomes.</span>
        </h2>

        {/* Subtitle */}
        <p className="mx-auto mt-5 max-w-xl text-base font-normal text-[#A1A1AA] leading-relaxed">
          Here's a glimpse of your AI University dashboard. <br />
          Everything you need to learn, track, and grow — in one place.
        </p>

        {/* Navigation Pills */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
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
        </div>

        {/* Image Canvas Frame with Blue Neon Glow Effect */}
        <div className="mt-12 relative mx-auto max-w-5xl rounded-2xl border border-[#052E70] p-2 bg-[#111827]/40 shadow-[0_0_50px_rgba(59,130,246,0.25)] backdrop-blur-sm transition-all duration-300">
          <img
            src={tabImages[activeTab].src}
            alt={tabImages[activeTab].alt}
            className="w-full h-auto rounded-xl object-cover border border-[#27272A]/40 min-h-[320px] max-h-[580px]"
          />
        </div>
      </div>
    </section>
  );
}