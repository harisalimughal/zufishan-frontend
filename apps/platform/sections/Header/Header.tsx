"use client";

import Link from "next/link";

export default function Header() {
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
    <header className="w-full bg-[#09090B] border-b border-[#27272A]">
      <nav className="max-w-7xl mx-auto px-8 h-[86px] flex items-center justify-between">

        {/* Logo */}
        <a href="/" className="flex items-center">
          <img
            src="/Nexora-logo-white-transparent.png"
            alt="AI University Logo"
            className="h-[170px] w-[190px] object-contain"
          />


        </a>
        {/* Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <a href="#problem" onClick={(e) => handleSmoothScroll(e, "problem")} className="hover:text-white transition">
            Problem
          </a>
          <a href="#solution" onClick={(e) => handleSmoothScroll(e, "solution")} className="hover:text-white transition">
            Solution
          </a>
          <a href="#product-preview" onClick={(e) => handleSmoothScroll(e, "product-preview")} className="hover:text-white transition">
            Product Preview
          </a>
          <a href="#classroom-preview" onClick={(e) => handleSmoothScroll(e, "classroom-preview")} className="hover:text-white transition">
            Live Classroom
          </a>
        </div>

        {/* Buttons */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/login"
            className="text-sm font-medium text-gray-300 hover:text-white transition"
          >
            Log in
          </Link>

          <a
            href="#waitlist"
            onClick={(e) => handleSmoothScroll(e, "waitlist")}
            className="px-6 py-3 rounded-full text-white text-sm font-semibold bg-gradient-to-r from-[#3B82F6] to-[#6D5DFB] hover:opacity-90 transition"
          >
            Join Waitlist
          </a>
        </div>

      </nav>
    </header>
  );
}