"use client";

import { useState } from "react";
import { ShieldCheck, Headphones, Award } from "lucide-react"

import LoginSidebar from "./LoginSidebar";
import LoginForm from "./LoginForm";
import SignUpModal from "./SignUpModal";
import ThemeToggle from "./ThemeToggle";
import LanguageSelector from "./LanguageSelector";

export default function LoginPage() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div
      className={`min-h-screen flex transition-colors duration-300 ${isDarkMode
          ? "bg-[#09090B] text-white"
          : "bg-[#F8FAFC] text-[#09090B]"
        }`}
    >
      {/* LEFT SIDE */}
      <LoginSidebar isDarkMode={isDarkMode} />

      {/* RIGHT SIDE */}
      <div className="flex-1 flex flex-col relative justify-center py-12">

        {/* TOP RIGHT CONTROLS */}
        <div className="absolute top-6 right-15 z-40 flex items-center gap-5">
          <ThemeToggle
            isDarkMode={isDarkMode}
            onToggle={toggleTheme}
          />
          <LanguageSelector isDarkMode={isDarkMode} />
        </div>

        {/* INNER VERTICAL CONTENT BLOCK */}
        {/* Wrapping the Form and Badges inside this single max-w-md block forces them to stay grouped! */}
        <div className="max-w-xl w-full mx-auto px-3 space-y-8 mt-12">

          {/* LOGIN FORM */}
          <LoginForm
            isDarkMode={isDarkMode}
            onOpenSignUp={() => setIsSignUpOpen(true)}
          />

          {/* TRUST BADGES */}
          <div className={`grid grid-cols-3 gap-4 border-t pt-7 text-center w-full transition-colors duration-300 ${isDarkMode ? "border-[#1C1C21]" : "border-gray-200"
            }`}>
            <div className="flex flex-col items-center">
              <ShieldCheck size={26} className="text-[#6366F1] mb-1" />
              <h5 className={`text-[11px] font-bold ${isDarkMode ? "text-gray-200" : "text-black"}`}>
                Secure & Encrypted
              </h5>
              <p className="text-[10px] text-gray-500 mt-0.5">Your data is 100% safe</p>
            </div>

            <div className="flex flex-col items-center">
              <Award size={26} className="text-[#6366F1] mb-1" />
              <h5 className={`text-[11px] font-bold ${isDarkMode ? "text-gray-200" : "text-black"}`}>
                Trusted by Students
              </h5>
              <p className="text-[10px] text-gray-500 mt-0.5">Loved by 12k+ learners</p>
            </div>

            <div className="flex flex-col items-center">
              <Headphones size={26} className="text-[#6366F1] mb-1" />
              <h5 className={`text-[11px] font-bold ${isDarkMode ? "text-gray-200" : "text-black"}`}>
                24/7 Support
              </h5>
              <p className="text-[10px] text-gray-500 mt-0.5">We're here to help</p>
            </div>
          </div>

          {/* COPYRIGHT MESSAGE */}
          <div className="text-center -pt-2">
            <p className={`text-[11px] tracking-wide ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>
              &copy; {new Date().getFullYear()} AI University. All rights reserved.
            </p>
          </div>

        </div>
      </div>

      {/* SIGNUP MODAL */}
      <SignUpModal
        isOpen={isSignUpOpen}
        onClose={() => setIsSignUpOpen(false)}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}