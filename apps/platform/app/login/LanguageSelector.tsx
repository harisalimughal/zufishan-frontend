"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface LanguageSelectorProps {
  isDarkMode: boolean;
}

export default function LanguageSelector({
  isDarkMode
}: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] =
    useState("English");

  const languages = [
    "English",
    "Spanish",
    "French",
    "German",
    "Arabic"
  ];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex
          items-center
          gap-2
          px-4
          h-11
          rounded-xl
          border
          text-sm
          font-medium
          transition-all
          duration-200
          ${
            isDarkMode
              ? "bg-[#111827] border-[#27272A] text-white"
              : "bg-white border-[#E5E7EB] text-[#09090B]"
          }
        `}
      >
        
        <span>{selectedLanguage}</span>
        <ChevronDown
    size={20}
    className={`text-[#3B82F6] transition-transform ${
      isOpen ? "rotate-180" : ""
    }`}
  />
      </button>

      {isOpen && (
        <div
          className={`
            absolute
            right-0
            mt-2
            w-40
            rounded-xl
            border
            overflow-hidden
            z-50
            shadow-xl
            ${
              isDarkMode
                ? "bg-[#111827] border-[#27272A]"
                : "bg-white border-[#E5E7EB]"
            }
          `}
        >
          {languages.map((language) => (
            <button
              key={language}
              type="button"
              onClick={() => {
                setSelectedLanguage(language);
                setIsOpen(false);
              }}
              className={`
                w-full
                px-4
                py-3
                text-left
                text-sm
                transition-colors
                ${
                  isDarkMode
                    ? "hover:bg-[#1F2937] text-white"
                    : "hover:bg-gray-100 text-[#09090B]"
                }
              `}
            >
              {language}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}