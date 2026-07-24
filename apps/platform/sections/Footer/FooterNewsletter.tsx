"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";

export function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    // Simple email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("submitting");

    // Simulate network latency
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1500);
  };

  return (
    <div className="w-full max-w-sm text-left">
      <h4 className="text-xs font-extrabold text-gray-200 uppercase tracking-widest mb-3">
        Stay Updated
      </h4>
      <p className="text-sm text-gray-400 mb-4 leading-relaxed font-sans">
        Subscribe to our newsletter for product updates, study tips, and campus news.
      </p>

      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs font-semibold"
          >
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Awesome! You have successfully subscribed to Nexora. 🎉</span>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-2.5"
          >
            <div className="relative flex items-center gap-2">
              <input
                type="email"
                placeholder="Enter your email address"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                disabled={status === "submitting"}
                className="w-full bg-[#09090B] border border-[#27272A] hover:border-gray-700 focus:border-[#3B82F6] rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none transition-colors duration-300 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={status === "submitting" || !email.trim()}
                className="absolute right-2 p-2 rounded-lg bg-gradient-to-r from-[#3B82F6] to-[#6D5DFC] text-white hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Subscribe"
              >
                {status === "submitting" ? (
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
            
            {status === "error" && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[11px] text-red-400 font-semibold pl-1"
              >
                {errorMessage}
              </motion.p>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
