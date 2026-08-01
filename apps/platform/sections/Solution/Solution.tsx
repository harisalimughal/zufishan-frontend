// apps/landing/sections/Solution/Solution.tsx
"use client";

import { motion } from "framer-motion";
import { Bot, Hand, BarChart3, GraduationCap } from 'lucide-react';
import liveClassesImg from "../../../public/images/product-preview/live-classes.jpg";
import attendanceImg from "../../../public/images/product-preview/attendance.png";
import aiTutorImg from "../../../public/images/product-preview/ai-tutor.avif";
import { useTheme } from "../../lib/theme/ThemeContext";

export function Solution() {
  const { isDarkMode } = useTheme();

  const cards = [
    {
      icon: Bot,
      title: "AI Professors",
      description: "Attend live classes taught by AI professors that explain, teach, and adapt to you.",
      image: "/professor.png",
      imageAlt: "AI Professors feature",
    },
    {
      icon: Hand,
      title: "Live Interaction",
      description: "Raise your hand, ask questions, and get real-time answers just like a real classroom.",
      image: liveClassesImg.src,
      imageAlt: "Live Interaction feature",
    },
    {
      icon: BarChart3,
      title: "Stay Accountable",
      description: "We track attendance, progress, and participation to keep you motivated and on track.",
      image: attendanceImg.src,
      imageAlt: "Stay Accountable feature",
    },
    {
      icon: GraduationCap,
      title: "Personal AI Tutor",
      description: "Get personalized help anytime, review concepts, and prepare better for every class.",
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
            className={`inline-block px-4 py-2 text-xs font-semibold text-[#3B82F6] tracking-wide uppercase rounded-full mb-4 border shadow-sm transition-colors duration-300 ${
              isDarkMode
                ? "border-[#27272A] bg-[#111827] hover:border-gray-700"
                : "border-zinc-200 bg-white hover:border-zinc-300"
            }`}
          >
            THE SOLUTION
          </span>
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 font-geist transition-colors duration-300 ${isDarkMode ? "text-white" : "text-zinc-900"}`}>
            An AI University built for <span style={{ color: '#3B82F6' }}>how you learn</span>.
          </h2>
          <p className={`text-lg max-w-2xl mx-auto transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-zinc-600"}`}>
            We combine the power of AI with proven learning principles to deliver real education outcomes.
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
                className="group p-6 rounded-xl border transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10"
                style={{
                  backgroundColor: isDarkMode ? '#111827' : '#FAFAFA',
                  borderColor: isDarkMode ? '#27272A' : '#E4E4E7'
                }}
              >
                <div
                  className="w-14 h-14 rounded-xl mb-4 flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
                  style={{ backgroundColor: '#220055' }}
                >
                  <IconComponent size={26} strokeWidth={1.6} className="text-white" />
                </div>
                <h3 className={`text-xl font-bold mb-3 font-geist group-hover:text-blue-400 transition-colors ${isDarkMode ? "text-white" : "text-zinc-900"}`}>
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
            It&apos;s not just online learning. It&apos;s the <span style={{ color: '#3B82F6' }}>next generation</span> of education.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
