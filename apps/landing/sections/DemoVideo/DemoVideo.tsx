"use client";

import { useState, useEffect } from "react";
import {
  Play,
  ChevronRight,
  Clock,
  Users,
  Star,
} from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────

// Using YouTube embed — most reliable, no source errors
// This is a free AI/education demo video. Replace YOUTUBE_ID with your own video ID.
const YOUTUBE_ID = "ABcjJAavSxE"; // Replace with your actual YouTube video ID

const CHAPTERS = [
  { time: "0:00", label: "Introduction to Nexora" },
  { time: "0:28", label: "Live AI Professor in Action" },
  { time: "1:02", label: "Real-Time Q&A Demo" },
  { time: "1:35", label: "Smart Notes & Attendance" },
  { time: "2:10", label: "Student Dashboard" },
];

const STATS = [
  { icon: Users, value: "12,000+", label: "Students Enrolled" },
  { icon: Star, value: "4.9/5", label: "Average Rating" },
  { icon: Clock, value: "2 min", label: "Watch Time" },
];

function timeToSeconds(timeStr: string): number {
  const [m, s] = timeStr.split(":").map(Number);
  return m * 60 + s;
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function DemoVideo() {
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [pulse, setPulse] = useState(true);
  const [startTime, setStartTime] = useState(0);
  const [iframeKey, setIframeKey] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setPulse((p) => !p), 1200);
    return () => clearInterval(t);
  }, []);

  const handlePlay = () => {
    setHasStarted(true);
  };

  const handleChapterClick = (timeStr: string) => {
    const seconds = timeToSeconds(timeStr);
    setStartTime(seconds);
    setIframeKey((k) => k + 1); // force iframe reload at new time
    setHasStarted(true);
  };

  const embedUrl = `https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&start=${startTime}&rel=0&modestbranding=1&showinfo=0`;

  return (
    <section
      style={{
        background: "#09090B",
        padding: "96px 24px",
        fontFamily: "'Inter', 'Geist', sans-serif",
      }}
    >
      {/* ── Badge ── */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
        <div
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(109,93,252,0.12)",
            border: "1px solid rgba(109,93,252,0.35)",
            borderRadius: 999, padding: "6px 16px",
          }}
        >
          <div
            style={{
              width: 7, height: 7, borderRadius: "50%",
              background: "#6D5DFC",
              boxShadow: pulse ? "0 0 8px 2px #6D5DFC" : "none",
              transition: "box-shadow 0.6s ease",
            }}
          />
          <span style={{
            color: "#A78BFA", fontSize: 11, fontWeight: 600,
            letterSpacing: "0.12em", textTransform: "uppercase" as const,
          }}>
            Product Demo
          </span>
        </div>
      </div>

      {/* ── Headline ── */}
      <div style={{ textAlign: "center" as const, marginBottom: 16 }}>
        <h2 style={{
          color: "#FFFFFF",
          fontSize: "clamp(2rem, 5vw, 3.2rem)",
          fontWeight: 800, lineHeight: 1.15,
          letterSpacing: "-0.02em", margin: 0,
        }}>
          See Nexora in action.
          <br />
          <span style={{
            background: "linear-gradient(135deg, #6D5DFC, #A78BFA)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            2 minutes that change everything.
          </span>
        </h2>
        <p style={{
          color: "#A1A1AA", fontSize: 16, lineHeight: 1.7,
          marginTop: 16, maxWidth: 520,
          marginLeft: "auto", marginRight: "auto",
        }}>
          Watch how Nexora&apos;s AI Professor teaches a live class, answers student
          questions, and tracks attendance — all in real time.
        </p>
      </div>

      {/* ── Stats Row ── */}
      <div style={{
        display: "flex", flexWrap: "wrap" as const,
        justifyContent: "center", gap: 24, marginBottom: 48,
      }}>
        {STATS.map(({ icon: Icon, value, label }) => (
          <div key={label} style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid #27272A",
            borderRadius: 999, padding: "8px 18px",
          }}>
            <Icon size={14} color="#A78BFA" />
            <span style={{ color: "#FFFFFF", fontSize: 13, fontWeight: 700 }}>{value}</span>
            <span style={{ color: "#A1A1AA", fontSize: 13 }}>{label}</span>
          </div>
        ))}
      </div>

      {/* ── Video + Chapters Layout ── */}
      <div style={{
        maxWidth: 960, margin: "0 auto",
        display: "flex", gap: 20, alignItems: "flex-start",
      }}>

        {/* ── Video Player ── */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            borderRadius: 16, overflow: "hidden",
            border: "1px solid #27272A",
            boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(109,93,252,0.08)",
            position: "relative" as const,
            background: "#000",
            aspectRatio: "16/9",
          }}>

            {/* Thumbnail / Play overlay — shown before user clicks play */}
            {(!mounted || !hasStarted) ? (
              <div
                style={{
                  position: "absolute" as const, inset: 0,
                  background: "linear-gradient(135deg, #0a0a1a 0%, #111827 100%)",
                  display: "flex", flexDirection: "column" as const,
                  alignItems: "center", justifyContent: "center",
                  cursor: "pointer", gap: 16,
                }}
                onClick={handlePlay}
              >
                {/* Decorative glow */}
                <div style={{
                  position: "absolute" as const, inset: 0,
                  background: "radial-gradient(ellipse at 50% 50%, rgba(109,93,252,0.15) 0%, transparent 70%)",
                  pointerEvents: "none",
                }} />

                {/* Play button */}
                <div style={{
                  width: 80, height: 80, borderRadius: "50%",
                  background: "rgba(109,93,252,0.9)",
                  backdropFilter: "blur(8px)",
                  border: "2px solid rgba(167,139,250,0.5)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 0 50px rgba(109,93,252,0.6)",
                  zIndex: 2,
                }}>
                  <Play size={34} color="#fff" fill="#fff" style={{ marginLeft: 5 }} />
                </div>

                {/* Label */}
                <div style={{ zIndex: 2, textAlign: "center" as const }}>
                  <div style={{ color: "#FFFFFF", fontSize: 16, fontWeight: 700 }}>
                    Watch Demo
                  </div>
                  <div style={{ color: "#A1A1AA", fontSize: 13, marginTop: 4 }}>
                    2 min · AI-powered live classroom
                  </div>
                </div>

                {/* Decorative lines */}
                <div style={{
                  position: "absolute" as const, bottom: 20, left: 20, right: 20,
                  display: "flex", gap: 6,
                }}>
                  {[60, 80, 45, 90, 55, 70, 85, 40, 75, 65].map((h, i) => (
                    <div key={i} style={{
                      flex: 1, height: h * 0.4,
                      background: `rgba(109,93,252,${0.2 + (h / 100) * 0.3})`,
                      borderRadius: 3,
                    }} />
                  ))}
                </div>
              </div>
            ) : (
              /* YouTube iframe — loads only after user clicks play */
              <iframe
                key={iframeKey}
                src={embedUrl}
                style={{
                  position: "absolute" as const,
                  top: 0, left: 0,
                  width: "100%", height: "100%",
                  border: "none",
                }}
                allow="autoplay; encrypted-media; fullscreen"
                allowFullScreen
              />
            )}
          </div>


        </div>

        {/* ── Chapters Panel ── */}
        <div style={{
          width: 220, flexShrink: 0,
          background: "#111827",
          border: "1px solid #27272A",
          borderRadius: 14, overflow: "hidden",
        }}>
          <div style={{
            padding: "12px 16px",
            borderBottom: "1px solid #27272A",
            color: "#FFFFFF", fontSize: 12, fontWeight: 700,
            letterSpacing: "0.05em",
          }}>
            Chapters
          </div>
          {CHAPTERS.map((chapter, i) => (
            <button
              key={chapter.time}
              onClick={() => handleChapterClick(chapter.time)}
              style={{
                width: "100%", background: "none", border: "none",
                borderBottom: i < CHAPTERS.length - 1 ? "1px solid #1F2937" : "none",
                padding: "12px 16px",
                display: "flex", alignItems: "center", gap: 10,
                cursor: "pointer", textAlign: "left" as const,
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(109,93,252,0.1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "none";
              }}
            >
              <div style={{
                width: 28, height: 28, borderRadius: "50%",
                background: "rgba(109,93,252,0.15)",
                border: "1px solid rgba(109,93,252,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <ChevronRight size={14} color="#A78BFA" />
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ color: "#FFFFFF", fontSize: 11, fontWeight: 600, lineHeight: 1.3 }}>
                  {chapter.label}
                </div>
                <div style={{ color: "#A1A1AA", fontSize: 10, marginTop: 2 }}>
                  {chapter.time}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div style={{ textAlign: "center" as const, marginTop: 48 }}>
        <p style={{ color: "#A1A1AA", fontSize: 14, marginBottom: 20 }}>
          Ready to experience it yourself?
        </p>
        <button style={{
          background: "linear-gradient(135deg, #6D5DFC, #A78BFA)",
          border: "none", borderRadius: 12,
          padding: "14px 36px",
          color: "#fff", fontSize: 15, fontWeight: 700,
          cursor: "pointer", fontFamily: "inherit",
          boxShadow: "0 8px 32px rgba(109,93,252,0.35)",
          letterSpacing: "0.01em",
        }}>
          Join the Waitlist →
        </button>
      </div>
    </section>
  );
}