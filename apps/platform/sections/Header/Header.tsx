"use client";

import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../lib/theme/ThemeContext";

export default function Header() {
  const { isDarkMode, toggleTheme } = useTheme();

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      // Avoid persisting #hash in URL so refreshes start at the top
      window.history.pushState(null, "", window.location.pathname);
    }
  };

  return (
    <header
      className={`w-full border-b transition-colors duration-300 ${
        isDarkMode ? "bg-[#09090B] border-transparent" : "bg-white border-zinc-200"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-8 h-[86px] flex items-center justify-between">

        {/* Logo */}
        <a href="/" className="flex items-center">
          <img
            src={isDarkMode ? "/Zufishan-logo-transparent-dark.svg" : "/Zufishan-logo-transparent-light.svg"}
            alt="Zufishan Logo"
            className="h-[110px] w-[190px] object-contain"
          />


        </a>
        {/* Menu */}
        <div
          className={`hidden md:flex items-center gap-8 text-base font-medium transition-colors duration-300 ${
            isDarkMode ? "text-gray-300" : "text-zinc-600"
          }`}
        >
          <a href="#problem" onClick={(e) => handleSmoothScroll(e, "problem")} className={`transition ${isDarkMode ? "hover:text-white" : "hover:text-black"}`}>
            The Problem
          </a>
          <a href="#solution" onClick={(e) => handleSmoothScroll(e, "solution")} className={`transition ${isDarkMode ? "hover:text-white" : "hover:text-black"}`}>
            Our Solution
          </a>
          <a href="#product-preview" onClick={(e) => handleSmoothScroll(e, "product-preview")} className={`transition ${isDarkMode ? "hover:text-white" : "hover:text-black"}`}>
            Platform Preview
          </a>
          <a href="#classroom-preview" onClick={(e) => handleSmoothScroll(e, "classroom-preview")} className={`transition ${isDarkMode ? "hover:text-white" : "hover:text-black"}`}>
            Live Halaqa
          </a>
        </div>

        {/* Buttons */}
        <div className="hidden md:flex items-center gap-5">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            className={`h-10 w-10 rounded-full border flex items-center justify-center transition-colors duration-300 ${
              isDarkMode
                ? "border-[#27272A] text-gray-300 hover:bg-[#1F2937] hover:text-white"
                : "border-zinc-200 text-zinc-600 hover:bg-zinc-100 hover:text-black"
            }`}
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <Link
            href="/dashboard"
            className={`text-sm font-medium transition ${
              isDarkMode ? "text-gray-300 hover:text-white" : "text-zinc-600 hover:text-black"
            }`}
          >
            Log in
          </Link>

          <a
            href="#waitlist"
            onClick={(e) => handleSmoothScroll(e, "waitlist")}
            className="px-6 py-3 rounded-full text-white text-sm font-semibold bg-gradient-to-r from-[#10b981] to-[#059669] hover:opacity-90 transition"
          >
            Join Waitlist
          </a>
        </div>

      </nav>
    </header>
  );
}