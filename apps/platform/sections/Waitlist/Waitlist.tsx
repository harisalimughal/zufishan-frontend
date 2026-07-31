"use client";

import React from "react";
import WaitlistFeatureIcon from "./WaitlistFeatureIcon";
import WaitlistForm from "./WaitlistForm";
import { Gift, Tag, Star, Bell, Shield, ArrowUpRight, Mail, GraduationCap, Sparkle } from "lucide-react";

export function Waitlist() {
  return (
    <section id="waitlist" className="bg-[#09090B] py-24 px-4 sm:px-6 lg:px-8 border-t border-[#27272A] font-sans antialiased">
      <div className="mx-auto max-w-6xl text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#3B82F6]/30 bg-[#111827] text-xs font-medium text-[#3B82F6] shadow-[0_0_15px_rgba(59,130,246,0.15)] mb-6 tracking-wide uppercase select-none">
          <Sparkle size={12} className="text-[#3B82F6]" />
          JOIN THE WAITLIST
        </div>

        {/* Heading */}
        <h2 className="text-4xl font-medium tracking-tight text-white sm:text-5xl max-w-3xl mx-auto leading-tight">
          Be among the first to <br />
          experience <span className="text-[#3B82F6]">AI University.</span>
        </h2>

        {/* Subtitle */}
        <p className="mx-auto mt-6 max-w-xl text-base font-normal text-[#A1A1AA] leading-relaxed">
          Join our waitlist and get early access, exclusive updates, <br />
          and special benefits when we launch.
        </p>

        {/* Quick Value Pillars with Vertical Divider Lines */}
<div className="mt-12 grid grid-cols-2 gap-y-8 sm:grid-cols-4 max-w-5xl mx-auto border-b border-[#27272A]/40 pb-10 sm:divide-x sm:divide-[#27272A]/40">
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
</div>

        {/* Combined Main Card Container */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-5xl mx-auto text-left rounded-2xl border border-[#052E70] bg-[#111827]/40 p-6 sm:p-8 shadow-[0_0_50px_rgba(59,130,246,0.25)] backdrop-blur-sm">
          
          {/* Left Form Wrapper */}
          <div className="lg:col-span-3 space-y-4">
            <div>
              <h3 className="text-xl font-medium text-white tracking-tight">Join the Waitlist</h3>
              <p className="text-xs font-normal text-[#A1A1AA] mt-1">Fill in your details and we'll be in touch soon.</p>
            </div>
            <WaitlistForm />
            
            {/* Social Proof */}
            <div className="pt-4 flex items-center gap-3 border-t border-[#27272A]/60">
              <div className="flex -space-x-2 overflow-hidden">
                <div className="inline-block h-7 w-7 rounded-full ring-2 ring-[#111827] bg-zinc-800 text-white text-[9px] font-bold flex items-center justify-center">U1</div>
                <div className="inline-block h-7 w-7 rounded-full ring-2 ring-[#111827] bg-zinc-700 text-white text-[9px] font-bold flex items-center justify-center">U2</div>
                <div className="inline-block h-7 w-7 rounded-full ring-2 ring-[#111827] bg-zinc-600 text-white text-[9px] font-bold flex items-center justify-center">U3</div>
                <div className="inline-block h-7 w-7 rounded-full ring-2 ring-[#111827] bg-zinc-500 text-white text-[9px] font-bold flex items-center justify-center">U4</div>
                <div className="inline-block h-7 w-7 rounded-full ring-2 ring-[#111827] bg-[#27272A] text-[#3B82F6] text-[9px] font-bold flex items-center justify-center">2K+</div>
              </div>
              <p className="text-xs font-normal text-[#A1A1AA]">
                Over <span className="text-blue-500 font-bold">2,847+</span> future students already joined
              </p>
            </div>
          </div>

          {/* Right Explanation Column */}
          <div className="lg:col-span-2 flex flex-col justify-between gap-8 lg:border-l lg:border-[#27272A]/60 lg:pl-8 pt-6 lg:pt-0">
            <div className="space-y-6">
              <h4 className="text-sm font-medium text-white tracking-wide ">What happens next?</h4>
              
              <div className="flex gap-3">
                <div className="text-[#3B82F6] mt-0.5"><Mail size={16} /></div>
                <div>
                  <h5 className="text-xs font-bold text-zinc-200">Confirm your email</h5>
                  <p className="text-[11px] font-normal text-[#A1A1AA] mt-0.5 leading-relaxed">We'll send you a confirmation email with all the details.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="text-[#3B82F6] mt-0.5"><ArrowUpRight size={16} /></div>
                <div>
                  <h5 className="text-xs font-bold text-zinc-200">Get early access</h5>
                  <p className="text-[11px] font-normal text-[#A1A1AA] mt-0.5 leading-relaxed">Be the first to explore the platform before the official launch.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="text-[#3B82F6] mt-0.5"><Star size={16} /></div>
                <div>
                  <h5 className="text-xs font-bold text-zinc-200">Shape the future</h5>
                  <p className="text-[11px] font-normal text-[#A1A1AA] mt-0.5 leading-relaxed">Share your feedback and help us build the best learning experience.</p>
                </div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="rounded-xl bg-[#09090B]/60 border border-[#27272A] p-4 space-y-3">
              <p className="text-xs font-normal italic text-[#A1A1AA] leading-relaxed">
                "AI University is going to change the way we learn forever. I can't wait!"
              </p>
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 text-[#3B82F6] flex items-center justify-center">
                  <GraduationCap size={12} />
                </div>
                <div>
                  <h5 className="text-[11px] font-bold text-zinc-200">Sarah Khan</h5>
                  <p className="text-[9px] font-normal text-[#A1A1AA]">Computer Science Student</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Privacy Note */}
        <p className="mt-8 text-xs font-normal text-zinc-300 inline-flex items-center gap-1.5 justify-center select-none">
          <Shield size={12} className="text-zinc-300" />
          We respect your <span className="text-[#3B82F6] cursor-pointer hover:underline font-medium">privacy</span>. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}