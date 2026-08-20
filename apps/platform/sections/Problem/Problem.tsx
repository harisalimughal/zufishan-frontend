"use client";

import { TrendingDown, UserX, MessageSquareOff, SlidersHorizontal } from "lucide-react";
import { useTheme } from "../../lib/theme/ThemeContext";

export const Problem = () => {
  const { isDarkMode } = useTheme();

  const problems = [
    {
      title: "Unverified Teachers",
      description:
        "Islamic knowledge is scattered across YouTube and WhatsApp groups, with no way to confirm who's actually teaching you.",
      stat: "0",
      statText: "standard ways to verify a teacher's credentials before you learn from them",
      source: "The everyday reality",
      icon: TrendingDown,
    },
    {
      title: "Utilities Cut Off From Scholarship",
      description:
        "Prayer time and Zakat apps exist, but none of them connect back to a real, accountable scholar.",
      stat: "Disconnected",
      statText: "utility apps with no link back to verified scholarship",
      source: "What daily users deal with",
      icon: UserX,
    },
    {
      title: "No Trusted Marketplace",
      description:
        "Halal goods and Islamic services are scattered across unverified sellers, with no shared trust layer.",
      stat: "Scattered",
      statText: "across sellers and pages with no verification badge",
      source: "What buyers deal with",
      icon: MessageSquareOff,
    },
    {
      title: "One Madhab Fits All",
      description:
        "Generic apps rarely respect the madhab-specific rulings that matter to how you actually practice.",
      stat: "Ignored",
      statText: "of the fiqh differences that matter to real households",
      source: "Where generic tools fall short",
      icon: SlidersHorizontal,
    },
  ];

  return (
    <section
      id="problem"
      className={`py-20 px-6 transition-colors duration-300 ${isDarkMode ? "bg-[#09090B]" : "bg-white"}`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-center mb-6">
          <div
            className={`px-4 py-2 rounded-full border shadow-sm flex items-center gap-2 transition-colors duration-300 ${
              isDarkMode
                ? "border-[#27272A] bg-[#111827] hover:border-gray-700"
                : "border-zinc-200 bg-white hover:border-zinc-300"
            }`}
          >
            <span className="text-base">🛈</span>
            <span className="text-xs font-semibold text-[#10b981] tracking-wide uppercase">THE PROBLEM</span>
          </div>
        </div>

        <div className="text-center max-w-3xl mx-auto">
          <h2 className={`text-4xl md:text-5xl font-bold leading-tight transition-colors duration-300 ${isDarkMode ? "text-white" : "text-zinc-900"}`}>
            Deen shouldn't
            <br />
            <span className="text-[#059669]">be this</span> fragmented.
          </h2>

          <p className={`mt-5 text-base leading-relaxed max-w-2xl mx-auto transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-zinc-600"}`}>
            Authentic Islamic knowledge, daily religious utilities and halal commerce all live
            in different places today, with no single trusted layer connecting them.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-7 mt-14 items-stretch">
          {problems.map((item) => {
            const IconComponent = item.icon;
            return (
            <div
              key={item.title}
              className="group relative h-full rounded-2xl transition-all duration-300 ease-out hover:-translate-y-3 hover:scale-[1.04]"
            >
              <div className="absolute inset-0 rounded-2xl border border-[#059669]/40 shadow-[0_0_22px_rgba(5,150,105,0.35),0_0_45px_rgba(5,150,105,0.18)] transition-all duration-300 group-hover:border-[#059669]/80 group-hover:shadow-[0_0_40px_rgba(5,150,105,0.55),0_0_70px_rgba(5,150,105,0.28)] pointer-events-none" />

              <div
                className={`relative h-full min-h-[350px] rounded-2xl border backdrop-blur-md p-6 overflow-hidden flex flex-col transition-colors duration-300 ${
                  isDarkMode ? "border-[#27272A] bg-[#111827]/40" : "border-zinc-200 bg-zinc-50"
                }`}
              >
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full bg-[#10b981]/15 blur-3xl pointer-events-none" />

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-44 h-44 rounded-full bg-[#059669]/20 blur-3xl" />
                </div>

                <div className="relative z-10 w-10 h-10 rounded-xl bg-[#10b981]/10 border border-[#10b981]/20 flex items-center justify-center text-[#059669] mb-5 transition-transform duration-300 group-hover:scale-110">
                  <IconComponent size={20} strokeWidth={1.8} />
                </div>

                <h3 className={`relative z-10 text-lg font-semibold mb-2 transition-colors duration-300 ${isDarkMode ? "text-white" : "text-zinc-900"}`}>
                  {item.title}
                </h3>

                <p className={`relative z-10 text-sm leading-6 transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-zinc-600"}`}>
                  {item.description}
                </p>

                <div className="relative z-10 mt-auto">
                  <div className={`border-t my-5 transition-colors duration-300 ${isDarkMode ? "border-[#27272A]" : "border-zinc-200"}`} />

                  <div className="flex items-start gap-4">
                    <span className="text-[#059669] text-4xl font-bold leading-none">
                      {item.stat}
                    </span>

                    <span className={`text-sm leading-6 transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-zinc-600"}`}>
                      {item.statText}
                    </span>
                  </div>

                  <p className={`text-xs mt-7 transition-colors duration-300 ${isDarkMode ? "text-gray-500" : "text-zinc-500"}`}>
                    Source: {item.source}
                  </p>
                </div>
              </div>
            </div>
          )})}
        </div>

        <div className="flex justify-center mt-10">
          <div className={`flex items-center gap-3 text-sm md:text-base transition-colors duration-300 ${isDarkMode ? "text-gray-300" : "text-zinc-700"}`}>
            <span
              className={`w-8 h-8 rounded-full border flex items-center justify-center text-[#059669] transition-colors duration-300 ${
                isDarkMode ? "bg-[#111827] border-[#27272A]" : "bg-zinc-100 border-zinc-200"
              }`}
            >
              ✦
            </span>

            <p>
              It's time for one trusted home for your Deen.
              <span className="text-[#059669]">
                {" "}
                Welcome to Zufishan.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};