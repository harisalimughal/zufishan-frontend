"use client";

import React, { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, GraduationCap, Sliders, ArrowRight, Check, PartyPopper } from "lucide-react";
import { useTheme } from "../../lib/theme/ThemeContext";

export default function WaitlistForm() {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    userType: "student",
    focusArea: "",
    agreeToUpdates: true,
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setErrorMessage(data?.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setErrorMessage("Network error. Please try again.");
      setStatus("error");
    }
  };

  const inputClasses = `w-full rounded-lg border pl-9 pr-4 py-2.5 text-sm transition-colors focus:border-[#3B82F6] focus:outline-none ${
    isDarkMode
      ? "border-[#27272A] bg-[#09090B] text-white placeholder-[#52525B]"
      : "border-zinc-300 bg-white text-zinc-900 placeholder-zinc-400"
  }`;

  const selectClasses = `w-full appearance-none rounded-lg border pl-9 pr-8 py-2.5 text-sm transition-colors focus:border-[#3B82F6] focus:outline-none cursor-pointer ${
    isDarkMode
      ? "border-[#27272A] bg-[#09090B] text-white"
      : "border-zinc-300 bg-white text-zinc-900"
  }`;

  const labelClasses = `text-xs font-medium mb-1.5 transition-colors duration-300 ${isDarkMode ? "text-[#A1A1AA]" : "text-zinc-600"}`;
  const iconClasses = `absolute inset-y-0 left-0 flex items-center pl-3 transition-colors duration-300 ${isDarkMode ? "text-[#A1A1AA]" : "text-zinc-400"}`;
  const chevronClasses = `absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none transition-colors duration-300 ${isDarkMode ? "text-[#52525B]" : "text-zinc-400"}`;

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex flex-col items-center gap-3 rounded-xl border p-8 text-center transition-colors duration-300 ${
          isDarkMode ? "border-emerald-500/20 bg-emerald-500/10" : "border-emerald-200 bg-emerald-50"
        }`}
      >
        <PartyPopper className="text-emerald-400" size={28} />
        <p className={`text-base font-semibold ${isDarkMode ? "text-white" : "text-zinc-900"}`}>
          You&apos;re on the list!
        </p>
        <p className={`text-sm ${isDarkMode ? "text-[#A1A1AA]" : "text-zinc-600"}`}>
          We&apos;ll email you as soon as it&apos;s your turn.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Full Name */}
        <div className="flex flex-col text-left">
          <label htmlFor="fullName" className={labelClasses}>
            Full Name
          </label>
          <div className="relative">
            <span className={iconClasses}>
              <User size={16} />
            </span>
            <input
              id="fullName"
              type="text"
              required
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className={inputClasses}
            />
          </div>
        </div>

        {/* Email Address */}
        <div className="flex flex-col text-left">
          <label htmlFor="email" className={labelClasses}>
            Email Address
          </label>
          <div className="relative">
            <span className={iconClasses}>
              <Mail size={16} />
            </span>
            <input
              id="email"
              type="email"
              required
              placeholder="Enter your email address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={inputClasses}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* User Type */}
        <div className="flex flex-col text-left">
          <label htmlFor="userType" className={labelClasses}>
            I am a
          </label>
          <div className="relative">
            <span className={iconClasses}>
              <GraduationCap size={16} />
            </span>
            <select
              id="userType"
              value={formData.userType}
              onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
              className={selectClasses}
            >
              <option value="student">Student</option>
              <option value="educator">Educator</option>
              <option value="professional">Professional</option>
            </select>
            <span className={chevronClasses}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
            </span>
          </div>
        </div>

        {/* Focus Area */}
        <div className="flex flex-col text-left">
          <label htmlFor="focusArea" className={labelClasses}>
            My focus area (optional)
          </label>
          <div className="relative">
            <span className={iconClasses}>
              <Sliders size={16} />
            </span>
            <select
              id="focusArea"
              value={formData.focusArea}
              onChange={(e) => setFormData({ ...formData, focusArea: e.target.value })}
              className={selectClasses}
            >
              <option value="">Select your focus area</option>
              <option value="programming">Programming & Dev</option>
              <option value="ai">AI & Machine Learning</option>
              <option value="data">Data Science</option>
              <option value="business">Business</option>
            </select>
            <span className={chevronClasses}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
            </span>
          </div>
        </div>
      </div>

      {/* Checkbox */}
      <div className="flex items-center gap-2 text-left pt-1">
        <div className="relative flex items-center">
          <input
            id="agreeToUpdates"
            type="checkbox"
            checked={formData.agreeToUpdates}
            onChange={(e) => setFormData({ ...formData, agreeToUpdates: e.target.checked })}
            className={`peer h-4 w-4 appearance-none rounded border checked:bg-[#513BF6] checked:border-[#3B82F6] focus:ring-0 focus:ring-offset-0 cursor-pointer transition-colors ${
              isDarkMode ? "border-[#27272A] bg-[#09090B]" : "border-zinc-300 bg-white"
            }`}
          />
          <Check size={10} className="absolute left-0.5 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" />
        </div>
        <label htmlFor="agreeToUpdates" className={`text-xs cursor-pointer select-none font-normal transition-colors duration-300 ${isDarkMode ? "text-[#A1A1AA]" : "text-zinc-600"}`}>
          I agree to receive updates about AI University.
        </label>
      </div>

      {/* Submit */}
      <motion.button
        type="submit"
        disabled={status === "submitting"}
        whileHover={{ scale: 1.03, translateY: -1 }}
        whileTap={{ scale: 0.98 }}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#513BF6] px-4 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-[#432EE3] disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? "Joining..." : "Join the Waitlist"}
        {status !== "submitting" && <ArrowRight size={16} />}
      </motion.button>

      <AnimatePresence>
        {status === "error" && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-xs font-semibold text-red-500 text-center"
          >
            {errorMessage}
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}
