"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Eye, EyeOff, AlertCircle, Lock, Mail } from "lucide-react";

// ── env (replace with API call when backend is ready) ──
const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Store admin session
      localStorage.setItem("admin_authenticated", "true");
      localStorage.setItem("admin_email", email);
      router.push("/admin");
    } else {
      setError("Invalid email or password. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#09090B",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Inter', 'Geist', sans-serif",
      padding: "24px",
    }}>
      {/* Background glow */}
      <div style={{
        position: "fixed" as const,
        top: "20%",
        left: "50%",
        transform: "translateX(-50%)",
        width: 600,
        height: 600,
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(109,93,252,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ width: "100%", maxWidth: 420, position: "relative" as const }}>

        {/* Logo */}
        <div style={{ textAlign: "center" as const, marginBottom: 32 }}>
          <div style={{
            width: 64, height: 64, borderRadius: 16,
            background: "linear-gradient(135deg, #6D5DFC, #A78BFA)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 16px", boxShadow: "0 0 40px rgba(109,93,252,0.3)",
          }}>
            <Shield size={30} color="#fff" />
          </div>
          <h1 style={{ color: "#fff", fontSize: 24, fontWeight: 800, margin: "0 0 6px", letterSpacing: "-0.02em" }}>
            Admin Portal
          </h1>
          <p style={{ color: "#6B7280", fontSize: 14, margin: 0 }}>
            Sign in to access the Nexora Admin Panel
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: "#111827",
          border: "1px solid #1F2937",
          borderRadius: 20,
          padding: "32px",
          boxShadow: "0 32px 80px rgba(0,0,0,0.4)",
        }}>

          {/* Error message */}
          {error && (
            <div style={{
              display: "flex", alignItems: "center", gap: 10,
              background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)",
              borderRadius: 10, padding: "12px 14px", marginBottom: 20,
            }}>
              <AlertCircle size={16} color="#EF4444" style={{ flexShrink: 0 }} />
              <span style={{ color: "#EF4444", fontSize: 13 }}>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column" as const, gap: 16 }}>

            {/* Email */}
            <div>
              <label style={{ color: "#9CA3AF", fontSize: 12, fontWeight: 500, display: "block", marginBottom: 6 }}>
                Admin Email
              </label>
              <div style={{ position: "relative" as const }}>
                <Mail size={16} color="#6B7280" style={{ position: "absolute" as const, left: 12, top: "50%", transform: "translateY(-50%)" }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@nexora.edu"
                  style={{
                    width: "100%", background: "#1F2937", border: "1px solid #374151",
                    borderRadius: 10, padding: "11px 12px 11px 38px",
                    color: "#fff", fontSize: 14, outline: "none",
                    fontFamily: "inherit", boxSizing: "border-box" as const,
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = "#6D5DFC"; }}
                  onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = "#374151"; }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label style={{ color: "#9CA3AF", fontSize: 12, fontWeight: 500, display: "block", marginBottom: 6 }}>
                Password
              </label>
              <div style={{ position: "relative" as const }}>
                <Lock size={16} color="#6B7280" style={{ position: "absolute" as const, left: 12, top: "50%", transform: "translateY(-50%)" }} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  style={{
                    width: "100%", background: "#1F2937", border: "1px solid #374151",
                    borderRadius: 10, padding: "11px 40px 11px 38px",
                    color: "#fff", fontSize: 14, outline: "none",
                    fontFamily: "inherit", boxSizing: "border-box" as const,
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = "#6D5DFC"; }}
                  onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = "#374151"; }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  style={{ position: "absolute" as const, right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#6B7280", display: "flex" }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%", marginTop: 8,
                background: loading ? "rgba(109,93,252,0.5)" : "linear-gradient(135deg, #6D5DFC, #A78BFA)",
                border: "none", borderRadius: 10, padding: "12px",
                color: "#fff", fontSize: 14, fontWeight: 700,
                cursor: loading ? "not-allowed" : "pointer",
                fontFamily: "inherit", transition: "opacity 0.2s",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              }}
            >
              {loading ? (
                <>
                  <div style={{ width: 16, height: 16, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", animation: "spin 0.8s linear infinite" }} />
                  Signing in...
                </>
              ) : (
                <>
                  <Shield size={16} />
                  Sign in as Admin
                </>
              )}
            </button>
          </form>

          {/* Back to login */}
          <div style={{ textAlign: "center" as const, marginTop: 20 }}>
            <a href="/login" style={{ color: "#6B7280", fontSize: 13, textDecoration: "none" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#A78BFA"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#6B7280"; }}
            >
              ← Back to Student Login
            </a>
          </div>
        </div>

        {/* Security note */}
        <div style={{ textAlign: "center" as const, marginTop: 20 }}>
          <p style={{ color: "#4B5563", fontSize: 11 }}>
            🔒 This portal is restricted to authorized administrators only.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        input::placeholder { color: #4B5563; }
      `}</style>
    </div>
  );
}