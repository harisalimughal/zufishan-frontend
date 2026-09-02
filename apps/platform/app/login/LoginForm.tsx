"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import SocialLoginButtons from "./SocialLoginButtons";

interface LoginFormProps {
  isDarkMode: boolean;
  onOpenSignUp: () => void;
}

export default function LoginForm({
  isDarkMode,
  onOpenSignUp
}: LoginFormProps) {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setError("");

    const userEmail = email.trim() || "demo@zufishan.com";
    const userPassword = password || "demo123";

    setLoading(true);
    try {
      await login(userEmail, userPassword);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`
        w-full
        max-w-xl
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
      {/* Badge */}
      <div className="mb-5">
        <span
          className="
            px-1
            py-1
            text-lg
            font-medium
            text-[#10b981]
          "
        >
          Welcome Back 👋
        </span>
      </div>

      {/* Heading */}
      <div className="mb-8">
        <h1
          className={`
            text-3xl
            font-medium
            tracking-tight
            ${
              isDarkMode
                ? "text-white"
                : "text-[#09090B]"
            }
          `}
        >
          Login to your account
        </h1>

        <p
          className={`
            mt-2
            text-base
            ${
              isDarkMode
                ? "text-[#A1A1AA]"
                : "text-gray-500"
            }
          `}
        >
          Access your personalized learning
          experience.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div
          className="
            mb-4
            rounded-xl
            border
            border-red-500/30
            bg-red-500/10
            p-3
            text-sm
            text-red-400
          "
        >
          {error}
        </div>
      )}

      {/* Form */}
      <form
        onSubmit={handleLogin}
        className="space-y-5"
      >
        {/* Email */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Email Address
          </label>

          <div className="relative">
            <Mail
              size={16}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-gray-500
              "
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
                py-3.5
                outline-none
                transition
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
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-medium">
              Password
            </label>

            <button
              type="button"
              className="
                text-xs
                text-[#10b981]
                hover:underline
              "
            >
              Forgot Password?
            </button>
          </div>

          <div className="relative">
            <Lock
              size={16}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-gray-500
              "
            />

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Enter password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className={`
                w-full
                rounded-xl
                border
                pl-11
                pr-11
                py-3.5
                outline-none
                transition
                ${
                  isDarkMode
                    ? "bg-[#09090B] border-[#27272A] text-white"
                    : "bg-white border-[#E5E7EB] text-black"
                }
              `}
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                text-gray-500
              "
            >
              {showPassword ? (
                <EyeOff size={16} />
              ) : (
                <Eye size={16} />
              )}
            </button>
          </div>
        </div>

        {/* Remember Me */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) =>
                setRememberMe(
                  e.target.checked
                )
              }
            />

            Remember me
          </label>

          <button
            type="button"
            className="
              text-sm
              text-[#10b981]
              hover:underline
            "
          >
            Need Help?
          </button>
        </div>

        {/* Login */}
        <button
          type="submit"
          disabled={loading}
          className="
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-[#10b981]
            py-3.5
            font-medium
            text-white
            transition
            hover:bg-[#059669]
            disabled:opacity-60
            disabled:cursor-not-allowed
          "
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Logging in…
            </>
          ) : (
            <>
              Login
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center">
        <div className="h-px flex-1 bg-[#27272A]" />

        <span
          className="
            px-4
            text-xs
            uppercase
            tracking-widest
            text-[#A1A1AA]
          "
        >
          OR
        </span>

        <div className="h-px flex-1 bg-[#27272A]" />
      </div>

      {/* Social Buttons */}
      <SocialLoginButtons
        isDarkMode={isDarkMode}
      />

      {/* Sign Up */}
      <div className="mt-8 text-center">
        <p
          className={`
            text-sm
            ${
              isDarkMode
                ? "text-[#A1A1AA]"
                : "text-gray-500"
            }
          `}
        >
          Don't have an account?
        </p>

        <button
          type="button"
          onClick={onOpenSignUp}
          className="
            mt-2
            font-medium
            text-[#10b981]
            hover:underline
          "
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}