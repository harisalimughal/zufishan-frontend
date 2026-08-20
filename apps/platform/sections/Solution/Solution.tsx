// apps/landing/sections/Solution/Solution.tsx
"use client";

import { motion } from "framer-motion";
import { GraduationCap, Clock, ShoppingBag, ShieldCheck } from 'lucide-react';
import liveClassesImg from "../../../public/images/product-preview/live-classes.jpg";
import attendanceImg from "../../../public/images/product-preview/attendance.png";
import aiTutorImg from "../../../public/images/product-preview/ai-tutor.avif";
import { useTheme } from "../../lib/theme/ThemeContext";

export function Solution() {
  const { isDarkMode } = useTheme();

  const cards = [
    {
      icon: GraduationCap,
      title: "Verified Scholars",
      description: "Every teacher's credentials are reviewed by our Advisory Board before they earn a Verified Ustaz badge.",
      image: "/professor.png",
      imageAlt: "AI Professors feature",
    },
    {
      icon: Clock,
      title: "Daily Religious Utilities",
      description: "Accurate prayer times, Qibla direction and a Zakat calculator, cached for offline so they're always ready.",
      image: liveClassesImg.src,
      imageAlt: "Live Interaction feature",
    },
    {
      icon: ShoppingBag,
      title: "Halal Marketplace",
      description: "Browse verified vendors for Islamic goods and book trusted services like Qurbani and Nikah officiants.",
      image: attendanceImg.src,
      imageAlt: "Stay Accountable feature",
    },
    {
      icon: ShieldCheck,
      title: "Multi-Scholar Trust",
      description: "Every Fatwa is reviewed by at least three independent, verified scholars before it's published.",
      image: aiTutorImg.src,
      imageAlt: "Personal AI Tutor feature",
    },
  ];

  return (
    <section
      id="solution"
      className="py-20 px-4 font-inter transition-colors duration-300"
      style={{ backgroundColor: isDarkMode ? '#09090B' : '#FFFFFF' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Centered Text Div */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span
            className={`inline-block px-4 py-2 text-xs font-semibold text-[#10b981] tracking-wide uppercase rounded-full mb-4 border shadow-sm transition-colors duration-300 ${
              isDarkMode
                ? "border-[#27272A] bg-[#111827] hover:border-gray-700"
                : "border-zinc-200 bg-white hover:border-zinc-300"
            }`}
          >
            THE SOLUTION
          </span>
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 font-geist transition-colors duration-300 ${isDarkMode ? "text-white" : "text-zinc-900"}`}>
            One platform built for <span style={{ color: '#10b981' }}>how you practice your Deen</span>.
          </h2>
          <p className={`text-lg max-w-2xl mx-auto transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-zinc-600"}`}>
            Verified scholarship, daily utilities and a trusted marketplace — brought together into one dependable platform for the Ummah.
          </p>
        </motion.div>

        {/* 4 Cards in Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => {
            const IconComponent = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="group p-6 rounded-xl border transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/10"
                style={{
                  backgroundColor: isDarkMode ? '#111827' : '#FAFAFA',
                  borderColor: isDarkMode ? '#27272A' : '#E4E4E7'
                }}
              >
                <div
                  className="w-14 h-14 rounded-xl mb-4 flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
                  style={{ backgroundColor: '#022c22' }}
                >
                  <IconComponent size={26} strokeWidth={1.6} className="text-white" />
                </div>
                <h3 className={`text-xl font-bold mb-3 font-geist group-hover:text-primary-400 transition-colors ${isDarkMode ? "text-white" : "text-zinc-900"}`}>
                  {card.title}
                </h3>
                <p className={`mb-4 text-sm leading-relaxed transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-zinc-600"}`}>
                  {card.description}
                </p>
                <div className="relative w-full h-32 rounded-lg overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={card.image}
                    alt={card.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <p className={`text-lg font-medium font-geist transition-colors duration-300 ${isDarkMode ? "text-gray-300" : "text-zinc-700"}`}>
            It&apos;s not just an app. It&apos;s a trusted <span style={{ color: '#10b981' }}>digital home</span> for your Deen.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
