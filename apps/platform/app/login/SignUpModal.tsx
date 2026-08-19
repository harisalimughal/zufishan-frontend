"use client";

import React, { useState } from "react";
import { X, Mail, Lock, User, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ApiError } from "@/lib/apiClient";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

export default function SignUpModal({
  isOpen,
  onClose,
  isDarkMode
}: SignUpModalProps) {
  const router = useRouter();
  const { register } = useAuth();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsSubmitting(true);
    try {
      await register({ email, password, firstName, lastName });
      onClose();
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to create account");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div
        className={`
          w-full
          max-w-md
          rounded-3xl
          border
          p-8
          shadow-2xl
          ${
            isDarkMode
              ? "bg-[#111827] border-[#27272A]"
              : "bg-white border-[#E5E7EB]"
          }
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2
              className={`
                text-2xl
                font-bold
                ${
                  isDarkMode
                    ? "text-white"
                    : "text-[#09090B]"
                }
              `}
            >
              Create Account
            </h2>

            <p
              className={`
                text-sm
                mt-1
                ${
                  isDarkMode
                    ? "text-[#A1A1AA]"
                    : "text-gray-500"
                }
              `}
            >
              Join Ranenla today
            </p>
          </div>

          <button
            onClick={onClose}
            type="button"
            className={`
              p-2
              rounded-xl
              transition
              ${
                isDarkMode
                  ? "hover:bg-[#1F2937]"
                  : "hover:bg-gray-100"
              }
            `}
          >
            <X size={18} />
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSignUp}
          className="space-y-4"
        >
          {/* Name */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm mb-2">
                First Name
              </label>
              <div className="relative">
                <User
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <input
                  type="text"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className={`
                    w-full
                    rounded-xl
                    border
                    pl-11
                    pr-4
                    py-3
                    outline-none
                    ${
                      isDarkMode
                        ? "bg-[#09090B] border-[#27272A] text-white"
                        : "bg-white border-[#E5E7EB] text-black"
                    }
                  `}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2">
                Last Name
              </label>
              <div className="relative">
                <User
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <input
                  type="text"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className={`
                    w-full
                    rounded-xl
                    border
                    pl-11
                    pr-4
                    py-3
                    outline-none
                    ${
                      isDarkMode
                        ? "bg-[#09090B] border-[#27272A] text-white"
                        : "bg-white border-[#E5E7EB] text-black"
                    }
                  `}
                />
              </div>
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm mb-2">
              Email Address
            </label>

            <div className="relative">
              <Mail
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className={`
                  w-full
                  rounded-xl
                  border
                  pl-11
                  pr-4
                  py-3
                  outline-none
                  ${
                    isDarkMode
                      ? "bg-[#09090B] border-[#27272A] text-white"
                      : "bg-white border-[#E5E7EB] text-black"
                  }
                `}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm mb-2">
              Password
            </label>

            <div className="relative">
              <Lock
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                type="password"
                placeholder="Create password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className={`
                  w-full
                  rounded-xl
                  border
                  pl-11
                  pr-4
                  py-3
                  outline-none
                  ${
                    isDarkMode
                      ? "bg-[#09090B] border-[#27272A] text-white"
                      : "bg-white border-[#E5E7EB] text-black"
                  }
                `}
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm mb-2">
              Confirm Password
            </label>

            <div className="relative">
              <Lock
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                className={`
                  w-full
                  rounded-xl
                  border
                  pl-11
                  pr-4
                  py-3
                  outline-none
                  ${
                    isDarkMode
                      ? "bg-[#09090B] border-[#27272A] text-white"
                      : "bg-white border-[#E5E7EB] text-black"
                  }
                `}
              />
            </div>
          </div>

          {/* Create Account Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="
              w-full
              mt-2
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-[#3B82F6]
              py-3.5
              text-white
              font-medium
              hover:bg-[#2563EB]
              transition
              disabled:opacity-60
            "
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Creating account…
              </>
            ) : (
              <>
                Create Account
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}