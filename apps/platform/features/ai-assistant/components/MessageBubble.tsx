"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  User,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  Clock,
  BookOpen,
  Copy,
  Check,
  AlertCircle,
} from "lucide-react";
import { ScholarRedirectCard } from "./ScholarRedirectCard";
import type { ChatMessage, FeedbackRating } from "../../../types/aiAssistant";

interface MessageBubbleProps {
  message: ChatMessage;
  onRetry?: (message: ChatMessage) => void;
  onFeedback?: (messageId: string, rating: FeedbackRating, comment?: string) => Promise<void>;
}

export function MessageBubble({
  message,
  onRetry,
  onFeedback,
}: MessageBubbleProps) {
  const [copied, setCopied] = useState(false);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [activeRating, setActiveRating] = useState<FeedbackRating | null>(
    message.rating || null,
  );
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [feedbackComment, setFeedbackComment] = useState("");

  const isUser = message.role === "user";

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRatingClick = async (rating: FeedbackRating) => {
    if (activeRating === rating || feedbackLoading) return;

    setActiveRating(rating);
    if (rating === "thumbs_down") {
      setShowCommentBox(true);
    } else {
      setShowCommentBox(false);
    }

    if (onFeedback) {
      setFeedbackLoading(true);
      try {
        await onFeedback(message.id, rating);
      } catch (err) {
        console.error("Failed to submit feedback", err);
      } finally {
        setFeedbackLoading(false);
      }
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackComment.trim() || !onFeedback) return;

    setFeedbackLoading(true);
    try {
      await onFeedback(message.id, activeRating || "thumbs_down", feedbackComment);
      setShowCommentBox(false);
    } catch (err) {
      console.error("Failed to submit comment", err);
    } finally {
      setFeedbackLoading(false);
    }
  };

  // If this turn was classified as a Fiqhi religious question, render the dedicated Scholar Card
  if (message.scholarRedirect) {
    return (
      <div className="w-full my-3">
        <ScholarRedirectCard
          originalQuestion={message.originalQuestion}
          category={message.scholarRedirectCategory}
          message={message.content}
        />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`flex items-start gap-3 w-full my-2.5 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {/* Assistant Avatar */}
      {!isUser && (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 shadow-sm shadow-emerald-500/10 mt-1">
          <Sparkles className="h-4 w-4" />
        </div>
      )}

      {/* Bubble Container */}
      <div
        className={`relative flex flex-col max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3.5 shadow-md ${
          isUser
            ? "rounded-tr-sm bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-emerald-900/10"
            : message.status === "error"
            ? "rounded-tl-sm border border-rose-500/40 bg-rose-950/30 text-stone-100"
            : "rounded-tl-sm border border-stone-800 bg-stone-900/95 text-stone-100 shadow-black/20"
        }`}
      >
        {/* Error Header */}
        {message.status === "error" && (
          <div className="flex items-center gap-2 mb-2 text-rose-400 text-xs font-semibold">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>Delivery Failed: {message.error || "Unable to reach assistant"}</span>
          </div>
        )}

        {/* Message Content */}
        <div className="whitespace-pre-wrap break-words text-sm sm:text-[14.5px] leading-relaxed select-text">
          {message.content}
        </div>

        {/* Sources citations pills (assistant only) */}
        {!isUser && message.sources && message.sources.length > 0 && (
          <div className="mt-3.5 pt-2.5 border-t border-stone-800/80">
            <div className="flex items-center gap-1.5 text-xs text-stone-400 mb-2 font-medium">
              <BookOpen className="h-3.5 w-3.5 text-emerald-400" />
              <span>Approved Sources:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {message.sources.map((source, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 rounded-md bg-stone-800/80 px-2 py-1 text-xs text-stone-300 border border-stone-700/60"
                  title={source.title}
                >
                  <span className="truncate max-w-[200px]">{source.title}</span>
                  <span className="text-[10px] uppercase text-emerald-400/80 font-mono">
                    [{source.sourceType}]
                  </span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Message Footer: Timestamp, Latency & Actions */}
        <div
          className={`mt-2 flex flex-wrap items-center justify-between gap-2 text-[11px] ${
            isUser ? "text-emerald-100/70" : "text-stone-400"
          }`}
        >
          <div className="flex items-center gap-2">
            <span>
              {new Date(message.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            {!isUser && message.latencyMs !== undefined && message.latencyMs !== null && (
              <span className="flex items-center gap-1 text-[10px] text-stone-400">
                <Clock className="h-3 w-3" />
                <span>{message.latencyMs}ms</span>
              </span>
            )}
          </div>

          {/* Copy & Feedback controls (assistant only) */}
          {!isUser && message.status !== "error" && (
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleCopy}
                title="Copy text"
                className="p-1 rounded hover:bg-stone-800 text-stone-400 hover:text-stone-200 transition-colors"
                aria-label="Copy message"
              >
                {copied ? (
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </button>

              <button
                type="button"
                onClick={() => handleRatingClick("thumbs_up")}
                disabled={feedbackLoading}
                title="Helpful response"
                className={`p-1 rounded transition-colors ${
                  activeRating === "thumbs_up"
                    ? "bg-emerald-500/20 text-emerald-400 font-semibold"
                    : "hover:bg-stone-800 text-stone-400 hover:text-stone-200"
                }`}
                aria-label="Thumbs up"
              >
                <ThumbsUp className="h-3.5 w-3.5" />
              </button>

              <button
                type="button"
                onClick={() => handleRatingClick("thumbs_down")}
                disabled={feedbackLoading}
                title="Needs improvement"
                className={`p-1 rounded transition-colors ${
                  activeRating === "thumbs_down"
                    ? "bg-rose-500/20 text-rose-400 font-semibold"
                    : "hover:bg-stone-800 text-stone-400 hover:text-stone-200"
                }`}
                aria-label="Thumbs down"
              >
                <ThumbsDown className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          {/* Retry Button for Failed Messages */}
          {message.status === "error" && onRetry && (
            <button
              type="button"
              onClick={() => onRetry(message)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-rose-600/30 hover:bg-rose-600/50 text-rose-200 px-2.5 py-1 text-xs font-medium transition-colors"
            >
              <RefreshCw className="h-3 w-3" />
              <span>Retry</span>
            </button>
          )}
        </div>

        {/* Optional Comment Box when thumbs down */}
        {!isUser && showCommentBox && (
          <form
            onSubmit={handleCommentSubmit}
            className="mt-3 pt-2.5 border-t border-stone-800 flex flex-col gap-2"
          >
            <label className="text-xs text-stone-400">
              How can this response be improved?
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={feedbackComment}
                onChange={(e) => setFeedbackComment(e.target.value)}
                placeholder="Optional feedback comment..."
                maxLength={500}
                className="flex-1 rounded-lg border border-stone-700 bg-stone-950 px-3 py-1.5 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                disabled={feedbackLoading || !feedbackComment.trim()}
                className="rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 text-xs font-medium transition-colors disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </form>
        )}
      </div>

      {/* User Avatar */}
      {isUser && (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-stone-800 text-stone-300 border border-stone-700 shadow-sm mt-1">
          <User className="h-4 w-4" />
        </div>
      )}
    </motion.div>
  );
}
