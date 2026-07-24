"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface SocialLoginButtonsProps {
  isDarkMode: boolean;
}

export default function SocialLoginButtons({
  isDarkMode
}: SocialLoginButtonsProps) {
  const router = useRouter();

  const handleSocialLogin = () => {
    router.push("/dashboard");
  };

  const buttonClasses = `
    w-full
    flex
    items-center
    justify-center
    gap-3
    rounded-xl
    border
    py-3.5
    text-sm
    font-medium
    transition-all
    duration-200
  `;

  return (
    <div className="space-y-3">
      {/* Google */}
      <button
        type="button"
        onClick={handleSocialLogin}
        className={`${buttonClasses} ${
          isDarkMode
            ? "bg-[#111827] border-[#27272A] text-white hover:bg-[#1F2937]"
            : "bg-white border-[#E5E7EB] text-[#09090B] hover:bg-gray-50"
        }`}
      >
        <svg
          className="h-5 w-5"
          viewBox="0 0 48 48"
        >
          <path
            fill="#FFC107"
            d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12S17.4 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"
          />
          <path
            fill="#FF3D00"
            d="M6.3 14.7l6.6 4.8C14.7 15 18.9 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34 6.1 29.3 4 24 4c-7.7 0-14.3 4.3-17.7 10.7z"
          />
          <path
            fill="#4CAF50"
            d="M24 44c5.2 0 9.8-2 13.3-5.2l-6.1-5.2c-2 1.5-4.5 2.4-7.2 2.4-5.2 0-9.6-3.3-11.2-8l-6.5 5C9.7 39.5 16.3 44 24 44z"
          />
          <path
            fill="#1976D2"
            d="M43.6 20.5H42V20H24v8h11.3c-.8 2.4-2.3 4.4-4.1 5.8l6.1 5.2C36.9 38.7 44 33 44 24c0-1.3-.1-2.4-.4-3.5z"
          />
        </svg>

        Continue with Google
      </button>

      {/* Microsoft */}
      <button
        type="button"
        onClick={handleSocialLogin}
        className={`${buttonClasses} ${
          isDarkMode
            ? "bg-[#111827] border-[#27272A] text-white hover:bg-[#1F2937]"
            : "bg-white border-[#E5E7EB] text-[#09090B] hover:bg-gray-50"
        }`}
      >
        <svg
          className="h-5 w-5"
          viewBox="0 0 23 23"
        >
          <path fill="#f35325" d="M0 0h11v11H0z" />
          <path fill="#81bc06" d="M12 0h11v11H12z" />
          <path fill="#05a6f0" d="M0 12h11v11H0z" />
          <path fill="#ffba08" d="M12 12h11v11H12z" />
        </svg>

        Continue with Microsoft
      </button>

      {/* Apple */}
      <button
        type="button"
        onClick={handleSocialLogin}
        className={`${buttonClasses} ${
          isDarkMode
            ? "bg-[#111827] border-[#27272A] text-white hover:bg-[#1F2937]"
            : "bg-white border-[#E5E7EB] text-[#09090B] hover:bg-gray-50"
        }`}
      >
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-.96.04-2.13.64-2.82 1.45-.6.7-1.13 1.84-.99 2.94.1 1 .1 2.15 1.14 2.15.98 0 2.02-.67 2.68-1.48z" />
        </svg>

        Continue with Apple
      </button>
    </div>
  );
}