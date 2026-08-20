"use client";

import { motion } from "framer-motion";
import { GraduationCap, Clock, ShoppingBag, ShieldCheck } from "lucide-react";
import { useTheme } from "../../lib/theme/ThemeContext";

const benefits = [
  {
    icon: GraduationCap,
    title: "Verified Scholars",
    description: "Learn Qur'an, Hadith and Fiqh from Ulema whose credentials are reviewed before they teach."
  },
  {
    icon: Clock,
    title: "Daily Utilities",
    description: "Prayer times, Qibla direction and a Zakat calculator — cached for offline, ready every day."
  },
  {
    icon: ShoppingBag,
    title: "Halal Marketplace",
    description: "Shop verified vendors for Islamic goods, and book trusted services with confidence."
  },
  {
    icon: ShieldCheck,
    title: "Multi-Scholar Trust",
    description: "Every Fatwa is reviewed and co-signed by at least three verified scholars before publishing."
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
            <div className="flex items-center justify-center p-3 rounded-xl bg-[#059669]/10 border border-[#059669]/20 text-[#059669] group-hover:bg-[#059669]/20 group-hover:text-white shadow-[0_0_15px_rgba(5,150,105,0.15)] group-hover:shadow-[0_0_25px_rgba(5,150,105,0.4)] transition-all duration-150">
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
