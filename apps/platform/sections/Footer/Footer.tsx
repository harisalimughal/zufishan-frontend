"use client";
/* eslint-disable @next/next/no-img-element */

import { Github, Linkedin, Youtube } from "lucide-react";
import { FooterLinkColumn } from "./FooterLinkColumn";
import { FooterSocialButton } from "./FooterSocialButton";
import { FooterNewsletter } from "./FooterNewsletter";

// Custom SVG for Discord Brand Icon
const DiscordIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 127.14 96.36" fill="currentColor" {...props}>
    <path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,52.88,6.83,77.19,77.19,0,0,0,49.58,0,105.15,105.15,0,0,0,19.14,8.07C-3,41.15-.39,73.42,1.25,78A105.86,105.86,0,0,0,32,96.36a77.7,77.7,0,0,0,6.63-10.85,68.43,68.43,0,0,1-10.43-5c.87-.64,1.71-1.32,2.51-2a75.76,75.76,0,0,0,72.48,0c.8,0.71,1.64,1.39,2.51,2a68.43,68.43,0,0,1-10.43,5A77.7,77.7,0,0,0,94.8,96.36,105.86,105.86,0,0,0,125.53,78C127.87,41.15,120.33,8.07,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.88,46,53.88,53,48.72,65.69,42.45,65.69Zm42,0C78.18,65.69,73,60,73,53S78.18,40.36,84.47,40.36,95.9,46,95.9,53,90.75,65.69,84.47,65.69Z" />
  </svg>
);

// Custom SVG for X (formerly Twitter) Brand Icon
const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const productLinks = [
  { label: "Features", href: "#features" },
  { label: "Classroom Live", href: "#classroom" },
  { label: "Demo Video", href: "#demo" },
  { label: "Waitlist", href: "#waitlist" },
  { label: "Pricing Model", href: "#pricing" }
];

const resourceLinks = [
  { label: "Documentation", href: "#" },
  { label: "Help Center", href: "#" },
  { label: "API Reference", href: "#" },
  { label: "Campus Blog", href: "#" },
  { label: "System Status", href: "#" }
];

const legalLinks = [
  { label: "Terms of Service", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Cookie Policy", href: "#" },
  { label: "Security Info", href: "#" }
];

export function Footer() {
  return (
    <footer className="relative bg-[#09090B] text-white border-t border-[#27272A] overflow-hidden pt-20 px-6 sm:px-12 md:px-16 lg:px-24">
      {/* Subtle Background Glows */}
      <div className="absolute -bottom-48 left-1/4 w-[600px] h-[300px] bg-[#3B82F6]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-48 right-1/4 w-[500px] h-[250px] bg-[#6D5DFC]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 pb-16">
          
          {/* Brand Identity & Newsletter Block (Spans 2 columns on desktop) */}
          <div className="lg:col-span-2 flex flex-col items-start space-y-6 ">
            <div className="flex items-center gap-2.5">
              <img 
                src="/Nexora-logo-white-transparent.png" 
                alt="Nexora Logo" 
                className="h-10 w-auto select-none"
              />
            </div>
            
            <p className="text-sm text-gray-400 leading-relaxed font-sans max-w-sm text-left">
              Nexora is the world&apos;s first AI-powered virtual university, delivering live-simulated classrooms, personalized academic mentorship, and automated smart notes for students globally.
            </p>

            {/* Newsletter Subscription component */}
            <FooterNewsletter />

            {/* System Status Indicator */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111827] border border-[#27272A] text-xs text-gray-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-mono text-[10px] tracking-wide text-gray-300">
                All Systems Operational
              </span>
            </div>
          </div>

          {/* Structured Link Columns (Spans 3 columns on desktop) */}
          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12">
            <FooterLinkColumn title="Product" links={productLinks} />
            <FooterLinkColumn title="Resources" links={resourceLinks} />
            <div className="col-span-2 md:col-span-1">
              <FooterLinkColumn title="Legal" links={legalLinks} />
            </div>
          </div>

        </div>

        {/* Bottom Social / Copyright Bar */}
        <div className="border-t border-[#27272A] py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Copyright Statement */}
          <p className="text-xs text-gray-500 font-sans">
            &copy; {new Date().getFullYear()} Nexora Technologies Inc. All rights reserved.
          </p>

          {/* Social Network Icon Grid */}
          <div className="flex items-center gap-3">
            <FooterSocialButton 
              href="https://github.com" 
              icon={Github} 
              label="GitHub" 
            />
            <FooterSocialButton 
              href="https://discord.com" 
              icon={DiscordIcon} 
              label="Discord" 
            />
            <FooterSocialButton 
              href="https://twitter.com" 
              icon={XIcon} 
              label="Twitter / X" 
            />
            <FooterSocialButton 
              href="https://linkedin.com" 
              icon={Linkedin} 
              label="LinkedIn" 
            />
            <FooterSocialButton 
              href="https://youtube.com" 
              icon={Youtube} 
              label="YouTube" 
            />
          </div>

        </div>

      </div>
    </footer>
  );
}
