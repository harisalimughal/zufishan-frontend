"use client";

import React from "react";
import { 
  Users, 
  MessageSquareText, 
  GraduationCap, 
  ChartNoAxesColumn 
} from "lucide-react";

interface LoginSidebarProps {
  isDarkMode: boolean;
}

export default function LoginSidebar({ isDarkMode }: LoginSidebarProps) {
  const features = [
    {
      icon: GraduationCap,
      title: "AI Professors",
      description: "Learn from AI-powered experts"
    },
    {
      icon: MessageSquareText,
      title: "24/7 AI Tutor",
      description: "Get instant help anytime, anywhere"
    },
    {
      icon: Users,
      title: "Live Interactive Classes",
      description: "Engage, ask, and grow together"
    },
    {
      icon: ChartNoAxesColumn,
      title: "Track & Achieve",
      description: "Monitor progress and earn achievements"
    }
  ];

  return (
    <div
      className="
        hidden
        lg:flex
        lg:w-[43%]
        flex-col
        justify-between
        p-14
        relative
        overflow-hidden
        border-r
        min-h-screen
      "
      style={{
        backgroundImage: "url('/uni.png')",
        backgroundSize: "cover",
        backgroundPosition: "top",
        borderColor: isDarkMode ? "#27272A" : "#E4E4E7"
      }}
    >
      {/* Background Mask Tint Overlay */}
      <div
        className={`
          absolute inset-0 transition-colors duration-300
          ${isDarkMode 
            ? "bg-black/50" 
            : "bg-white/60"
        }
        `}
      />

      <div className="relative z-10 space-y-5"> 
        {/* Logo Block */}
        <div className="flex items-center gap-1">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-34 h-34 object-contain"
          />

          <div>
            <h2
              className={`text-5xl font-medium transition-colors duration-300 ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              <span className="text-[#3B82F6]">AI</span> University
            </h2>

            <p className={`text-lg transition-colors duration-300 ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}>
              Learn. Interact. Grow.
            </p>
          </div>
        </div>

        {/* Hero Text Block */}
        <div className="max-w-md">
          <h1
            className={`text-4xl font-medium leading-tight transition-colors duration-300 ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            The World's First <br />
            <span className="whitespace-nowrap">
              <span className="text-[#3B82F6]">AI-Powered</span> University
            </span>
          </h1>
        </div>

        <p
          className={`
            mt-5
            text-lg
            leading-relaxed
            transition-colors duration-300
            ${isDarkMode ? "text-[#A1A1AA]" : "text-gray-600"}
          `}
        >
          Experience personalized learning, 24/7 AI support,<br />
          and interactive live classes like never before.
        </p>

        {/* Features Mapping Section */}
        <div className="mt-10 space-y-6">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={feature.title}
                className="flex gap-4 items-start"
              >
                {/* Dynamically Styled Lucide Icon Containers */}
                <div
                  className={`
                    w-10
                    h-10
                    rounded-full
                    flex
                    items-center
                    justify-center
                    shrink-0
                    transition-colors duration-300
                    ${isDarkMode ? "bg-[#3B82F6] text-white" : "bg-[#3B82F6]/30 text-black"}
                  `}
                >
                  <IconComponent size={20} strokeWidth={2} />
                </div>

                <div>
                  <h4
                    className={`
                      font-semibold
                      transition-colors duration-300
                      ${isDarkMode ? "text-white" : "text-black"}
                    `}
                  >
                    {feature.title}
                  </h4>

                  <p
                    className={`
                      text-sm
                      transition-colors duration-300
                      ${isDarkMode ? "text-[#A1A1AA]" : "text-gray-600"}
                    `}
                  >
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Student Count Card (Premium Frosted Glassmorphism with custom glows) */}
      <div className={`border p-8 rounded-3xl flex flex-col gap-4 relative z-10 backdrop-blur-md transition-all duration-300 max-w-sm -translate-y-6 ${
          isDarkMode 
            ? "bg-[#0A0A0F]/30 border-white/50 shadow-[0_0_25px_rgba(255,255,255,0.15)]" 
            : "bg-white/40 border-[#18181B]/15 shadow-[0_0_20px_rgba(24,24,27,0.08)]"
        }`}
      >
        <div className="flex -space-x-3 items-center">
          <div className={`w-10 h-10 rounded-full border-2 bg-cover bg-center transition-colors duration-300 ${isDarkMode ? "border-[#1c1c24]" : "border-white"}`} style={{ backgroundImage: "url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80')" }} />
          <div className={`w-10 h-10 rounded-full border-2 bg-cover bg-center transition-colors duration-300 ${isDarkMode ? "border-[#1c1c24]" : "border-white"}`} style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80')" }} />
          <div className={`w-10 h-10 rounded-full border-2 bg-cover bg-center transition-colors duration-300 ${isDarkMode ? "border-[#1c1c24]" : "border-white"}`} style={{ backgroundImage: "url('https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80')" }} />
          <div className={`w-10 h-10 rounded-full border-2 bg-cover bg-center transition-colors duration-300 ${isDarkMode ? "border-[#1c1c24]" : "border-white"}`} style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80')" }} />
          <div className={`w-10 h-10 rounded-full border-2 bg-[#3B82F6] flex items-center justify-center text-xs font-bold text-white shadow-lg transition-colors duration-300 ${isDarkMode ? "border-[#1c1c24]" : "border-white"}`}>+12K</div>
        </div>
        <div>
          <p className={`text-sm font-medium tracking-wide transition-colors duration-300 ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>
            Join 12,000+ students learning the future
          </p>
        </div>
      </div>
    </div>
  );
}