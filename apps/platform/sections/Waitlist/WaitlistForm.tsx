"use client";

import React, { useState, FormEvent } from "react";
import { User, Mail, GraduationCap, Sliders, ArrowRight, Check } from "lucide-react";

export default function WaitlistForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    userType: "student",
    focusArea: "",
    agreeToUpdates: true,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Full Name */}
        <div className="flex flex-col text-left">
          <label htmlFor="fullName" className="text-xs font-medium text-[#A1A1AA] mb-1.5">
            Full Name
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#A1A1AA]">
              <User size={16} />
            </span>
            <input
              id="fullName"
              type="text"
              required
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full rounded-lg border border-[#27272A] bg-[#09090B] pl-9 pr-4 py-2.5 text-sm text-white placeholder-[#52525B] transition-colors focus:border-[#3B82F6] focus:outline-none"
            />
          </div>
        </div>

        {/* Email Address */}
        <div className="flex flex-col text-left">
          <label htmlFor="email" className="text-xs font-medium text-[#A1A1AA] mb-1.5">
            Email Address
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#A1A1AA]">
              <Mail size={16} />
            </span>
            <input
              id="email"
              type="email"
              required
              placeholder="Enter your email address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full rounded-lg border border-[#27272A] bg-[#09090B] pl-9 pr-4 py-2.5 text-sm text-white placeholder-[#52525B] transition-colors focus:border-[#3B82F6] focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* User Type */}
        <div className="flex flex-col text-left">
          <label htmlFor="userType" className="text-xs font-medium text-[#A1A1AA] mb-1.5">
            I am a
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#A1A1AA]">
              <GraduationCap size={16} />
            </span>
            <select
              id="userType"
              value={formData.userType}
              onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
              className="w-full appearance-none rounded-lg border border-[#27272A] bg-[#09090B] pl-9 pr-8 py-2.5 text-sm text-white transition-colors focus:border-[#3B82F6] focus:outline-none cursor-pointer"
            >
              <option value="student">Student</option>
              <option value="educator">Educator</option>
              <option value="professional">Professional</option>
            </select>
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-[#52525B]">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
            </span>
          </div>
        </div>

        {/* Focus Area */}
        <div className="flex flex-col text-left">
          <label htmlFor="focusArea" className="text-xs font-medium text-[#A1A1AA] mb-1.5">
            My focus area (optional)
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#A1A1AA]">
              <Sliders size={16} />
            </span>
            <select
              id="focusArea"
              value={formData.focusArea}
              onChange={(e) => setFormData({ ...formData, focusArea: e.target.value })}
              className="w-full appearance-none rounded-lg border border-[#27272A] bg-[#09090B] pl-9 pr-8 py-2.5 text-sm text-white transition-colors focus:border-[#3B82F6] focus:outline-none cursor-pointer"
            >
              <option value="">Select your focus area</option>
              <option value="programming">Programming & Dev</option>
              <option value="ai">AI & Machine Learning</option>
              <option value="data">Data Science</option>
              <option value="business">Business</option>
            </select>
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-[#52525B]">
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
            className="peer h-4 w-4 appearance-none rounded border border-[#27272A] bg-[#09090B] checked:bg-[#513BF6] checked:border-[#3B82F6] focus:ring-0 focus:ring-offset-0 cursor-pointer transition-colors"
          />
          <Check size={10} className="absolute left-0.5 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" />
        </div>
        <label htmlFor="agreeToUpdates" className="text-xs text-[#A1A1AA] cursor-pointer select-none font-normal">
          I agree to receive updates about AI University.
        </label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#513BF6] px-4 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-[#432EE3] active:scale-[0.99]"
      >
        Join the Waitlist
        <ArrowRight size={16} />
      </button>
    </form>
  );
}