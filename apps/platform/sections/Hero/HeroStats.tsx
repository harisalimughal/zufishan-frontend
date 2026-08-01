"use client";

import { motion } from "framer-motion";
import { User, Hand, BarChart3, GraduationCap } from "lucide-react";
import { useTheme } from "../../lib/theme/ThemeContext";

const benefits = [
  {
    icon: User,
    title: "AI Professors",
    description: "Learn from AI professors that teach, interact and adapt to you."
  },
  {
    icon: Hand,
    title: "Live Interaction",
    description: "Raise your hand, ask questions, and get real time answers."
  },
  {
    icon: BarChart3,
    title: "Stay Accountable",
    description: "Attendance, progress tracking and reminders keep you on track."
  },
  {
    icon: GraduationCap,
    title: "Personal AI Tutor",
    description: "Get personalized help anytime, even after class hours."
  }
];

export function HeroStats() {
  const { isDarkMode } = useTheme();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 max-w-6xl mx-auto w-full px-4 mb-20 text-left">
      {benefits.map((benefit, idx) => {
        const Icon = benefit.icon;
        return (
          <motion.div
            key={benefit.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            whileHover={{ 
              y: -4,
              transition: { type: "spring", stiffness: 400, damping: 15 }
            }}
            className="flex flex-col items-start space-y-4 group"
          >
            {/* Icon Wrapper */}
            <div className="flex items-center justify-center p-3 rounded-xl bg-[#6D5DFC]/10 border border-[#6D5DFC]/20 text-[#6D5DFC] group-hover:bg-[#6D5DFC]/20 group-hover:text-white shadow-[0_0_15px_rgba(109,93,252,0.15)] group-hover:shadow-[0_0_25px_rgba(109,93,252,0.4)] transition-all duration-150">
              <Icon className="w-6 h-6" />
            </div>

            {/* Content */}
            <div className="space-y-2">
              <h3 className={`text-lg font-bold tracking-tight transition-colors duration-300 ${isDarkMode ? "text-white" : "text-zinc-900"}`}>
                {benefit.title}
              </h3>
              <p className={`text-sm leading-relaxed font-sans transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-zinc-600"}`}>
                {benefit.description}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
