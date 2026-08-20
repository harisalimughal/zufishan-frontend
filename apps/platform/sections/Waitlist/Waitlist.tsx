"use client";
/* eslint-disable @next/next/no-img-element */

import React from "react";
import { motion } from "framer-motion";
import WaitlistFeatureIcon from "./WaitlistFeatureIcon";
import WaitlistForm from "./WaitlistForm";
import { Gift, Tag, Star, Bell, Shield, ArrowUpRight, Mail, GraduationCap, Sparkle } from "lucide-react";
import { useTheme } from "../../lib/theme/ThemeContext";

export function Waitlist() {
  const { isDarkMode } = useTheme();

  return (
    <section
      id="waitlist"
      className={`py-24 px-4 sm:px-6 lg:px-8 border-t font-sans antialiased transition-colors duration-300 ${
        isDarkMode ? "bg-[#09090B] border-[#27272A]" : "bg-white border-zinc-200"
      }`}
    >
      <div className="mx-auto max-w-6xl text-center">
        {/* Badge + Heading + Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold text-[#10b981] shadow-sm mb-6 tracking-wide uppercase select-none transition-colors duration-300 ${
              isDarkMode
                ? "border-[#27272A] bg-[#111827] hover:border-gray-700"
                : "border-zinc-200 bg-white hover:border-zinc-300"
            }`}
          >
            <Sparkle size={12} className="text-[#10b981]" />
            JOIN THE WAITLIST
          </div>

          {/* Heading */}
          <h2
            className={`text-4xl font-medium tracking-tight sm:text-5xl max-w-3xl mx-auto leading-tight transition-colors duration-300 ${
              isDarkMode ? "text-white" : "text-zinc-900"
            }`}
          >
            Be among the first to <br />
            experience <span className="text-[#10b981]">Zufishan.</span>
          </h2>

          {/* Subtitle */}
          <p
            className={`mx-auto mt-6 max-w-xl text-base font-normal leading-relaxed transition-colors duration-300 ${
              isDarkMode ? "text-[#A1A1AA]" : "text-zinc-600"
            }`}
          >
            Join our waitlist and get early access, exclusive updates, <br />
            and special benefits when we launch.
          </p>
        </motion.div>

        {/* Quick Value Pillars with Vertical Divider Lines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`mt-12 grid grid-cols-2 gap-y-8 sm:grid-cols-4 max-w-5xl mx-auto pb-10 border-b sm:divide-x transition-colors duration-300 ${
            isDarkMode ? "border-[#27272A]/40 sm:divide-[#27272A]/40" : "border-zinc-200 sm:divide-zinc-200"
          }`}
        >
          <div className="px-4">
            <WaitlistFeatureIcon label="Early access" sublabel="to the platform" icon={<Gift size={18} />} />
          </div>
          <div className="px-4 lg:pl-8">
            <WaitlistFeatureIcon label="Special launch" sublabel="pricing" icon={<Tag size={18} />} />
          </div>
          <div className="px-4 lg:pl-8">
            <WaitlistFeatureIcon label="Exclusive beta" sublabel="features" icon={<Star size={18} />} />
          </div>
          <div className="px-4 lg:pl-8">
            <WaitlistFeatureIcon label="Priority support" sublabel="& onboarding" icon={<Bell size={18} />} />
          </div>
        </motion.div>

        {/* Combined Main Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`mt-8 grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-5xl mx-auto text-left rounded-2xl border p-6 sm:p-8 shadow-[0_0_50px_rgba(16,185,129,0.25)] backdrop-blur-sm transition-colors duration-300 ${
            isDarkMode ? "border-[#064E3B] bg-[#111827]/40" : "border-primary-200 bg-primary-50/50"
          }`}
        >

          {/* Left Form Wrapper */}
          <div className="lg:col-span-3 space-y-4">
            <div>
              <h3 className={`text-xl font-medium tracking-tight transition-colors duration-300 ${isDarkMode ? "text-white" : "text-zinc-900"}`}>
                Join the Waitlist
              </h3>
              <p className={`text-xs font-normal mt-1 transition-colors duration-300 ${isDarkMode ? "text-[#A1A1AA]" : "text-zinc-600"}`}>
                Fill in your details and we'll be in touch soon.
              </p>
            </div>
            <WaitlistForm />

            {/* Social Proof */}
            <div className={`pt-4 flex items-center gap-3 border-t transition-colors duration-300 ${isDarkMode ? "border-[#27272A]/60" : "border-zinc-200"}`}>
              <div className="flex -space-x-2 overflow-hidden">
                <img
                  className={`inline-block h-7 w-7 rounded-full ring-2 object-cover ${isDarkMode ? "ring-[#111827]" : "ring-white"}`}
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80"
                  alt="Waitlist member"
                />
                <img
                  className={`inline-block h-7 w-7 rounded-full ring-2 object-cover ${isDarkMode ? "ring-[#111827]" : "ring-white"}`}
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80"
                  alt="Waitlist member"
                />
                <img
                  className={`inline-block h-7 w-7 rounded-full ring-2 object-cover ${isDarkMode ? "ring-[#111827]" : "ring-white"}`}
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80"
                  alt="Waitlist member"
                />
                <img
                  className={`inline-block h-7 w-7 rounded-full ring-2 object-cover ${isDarkMode ? "ring-[#111827]" : "ring-white"}`}
                  src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=100&q=80"
                  alt="Waitlist member"
                />
                <div className={`inline-block h-7 w-7 rounded-full ring-2 bg-[#10b981]/20 text-[#10b981] text-[9px] font-bold flex items-center justify-center ${isDarkMode ? "ring-[#111827]" : "ring-white"}`}>2K+</div>
              </div>
              <p className={`text-xs font-normal transition-colors duration-300 ${isDarkMode ? "text-[#A1A1AA]" : "text-zinc-600"}`}>
                Over <span className="text-primary-500 font-bold">2,847+</span> future students already joined
              </p>
            </div>
          </div>

          {/* Right Explanation Column */}
          <div className={`lg:col-span-2 flex flex-col justify-between gap-8 lg:border-l pt-6 lg:pt-0 lg:pl-8 transition-colors duration-300 ${isDarkMode ? "lg:border-[#27272A]/60" : "lg:border-zinc-200"}`}>
            <div className="space-y-6">
              <h4 className={`text-sm font-medium tracking-wide transition-colors duration-300 ${isDarkMode ? "text-white" : "text-zinc-900"}`}>What happens next?</h4>

              <div className="flex gap-3">
                <div className="text-[#10b981] mt-0.5"><Mail size={16} /></div>
                <div>
                  <h5 className={`text-xs font-bold transition-colors duration-300 ${isDarkMode ? "text-zinc-200" : "text-zinc-800"}`}>Confirm your email</h5>
                  <p className={`text-[11px] font-normal mt-0.5 leading-relaxed transition-colors duration-300 ${isDarkMode ? "text-[#A1A1AA]" : "text-zinc-600"}`}>We'll send you a confirmation email with all the details.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="text-[#10b981] mt-0.5"><ArrowUpRight size={16} /></div>
                <div>
                  <h5 className={`text-xs font-bold transition-colors duration-300 ${isDarkMode ? "text-zinc-200" : "text-zinc-800"}`}>Get early access</h5>
                  <p className={`text-[11px] font-normal mt-0.5 leading-relaxed transition-colors duration-300 ${isDarkMode ? "text-[#A1A1AA]" : "text-zinc-600"}`}>Be the first to explore the platform before the official launch.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="text-[#10b981] mt-0.5"><Star size={16} /></div>
                <div>
                  <h5 className={`text-xs font-bold transition-colors duration-300 ${isDarkMode ? "text-zinc-200" : "text-zinc-800"}`}>Shape the future</h5>
                  <p className={`text-[11px] font-normal mt-0.5 leading-relaxed transition-colors duration-300 ${isDarkMode ? "text-[#A1A1AA]" : "text-zinc-600"}`}>Share your feedback and help us build the best learning experience.</p>
                </div>
              </div>
            </div>

            {/* Testimonial */}
            <div className={`rounded-xl border p-4 space-y-3 transition-colors duration-300 ${isDarkMode ? "bg-[#09090B]/60 border-[#27272A]" : "bg-white border-zinc-200"}`}>
              <p className={`text-xs font-normal italic leading-relaxed transition-colors duration-300 ${isDarkMode ? "text-[#A1A1AA]" : "text-zinc-600"}`}>
                "Zufishan is exactly what our community has needed — scholarship, utilities and trust, all in one place."
              </p>
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-[#10b981]/10 border border-[#10b981]/20 text-[#10b981] flex items-center justify-center">
                  <GraduationCap size={12} />
                </div>
                <div>
                  <h5 className={`text-[11px] font-bold transition-colors duration-300 ${isDarkMode ? "text-zinc-200" : "text-zinc-800"}`}>Sarah Khan</h5>
                  <p className={`text-[9px] font-normal transition-colors duration-300 ${isDarkMode ? "text-[#A1A1AA]" : "text-zinc-600"}`}>Early Waitlist Member</p>
                </div>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Privacy Note */}
        <p className={`mt-8 text-xs font-normal inline-flex items-center gap-1.5 justify-center select-none transition-colors duration-300 ${isDarkMode ? "text-zinc-300" : "text-zinc-600"}`}>
          <Shield size={12} className={isDarkMode ? "text-zinc-300" : "text-zinc-600"} />
          We respect your <span className="text-[#10b981] cursor-pointer hover:underline font-medium">privacy</span>. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}
