"use client";

import React, { useRef, useEffect } from "react";
import { Send, Loader2 } from "lucide-react";

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  onSend: () => void;
  isLoading: boolean;
  disabled?: boolean;
}

export function ChatInput({
  input,
  setInput,
  onSend,
  isLoading,
  disabled = false,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea height as content grows up to 160px
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        160,
      )}px`;
    }
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!isLoading && !disabled && input.trim()) {
        onSend();
      }
    }
  };

  return (
    <div className="border-t border-stone-800 bg-stone-900/80 p-3 sm:p-4 backdrop-blur-sm">
      <div className="relative flex items-end gap-2 rounded-2xl border border-stone-800 bg-stone-950 p-2 shadow-inner focus-within:border-emerald-500/60 focus-within:ring-1 focus-within:ring-emerald-500/40 transition-all">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question about courses, zakat, prayer times, or platform help..."
          rows={1}
          disabled={disabled || isLoading}
          aria-label="Ask Zufishan AI a question"
          className="max-h-40 min-h-[44px] flex-1 resize-none bg-transparent px-3 py-2 text-sm text-stone-100 placeholder-stone-400 focus:outline-none disabled:opacity-50"
        />

        <button
          type="button"
          onClick={onSend}
          disabled={disabled || isLoading || !input.trim()}
          aria-label="Send message"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-md shadow-emerald-700/20 hover:from-emerald-500 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 disabled:cursor-not-allowed disabled:opacity-40 transition-all active:scale-95"
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </button>
      </div>

      <div className="mt-1.5 flex items-center justify-between px-2 text-[11px] text-stone-400">
        <span>Press <kbd className="font-mono bg-stone-800 px-1 py-0.5 rounded text-[10px]">Enter</kbd> to send, <kbd className="font-mono bg-stone-800 px-1 py-0.5 rounded text-[10px]">Shift + Enter</kbd> for newline</span>
        <span>{input.length}/2000</span>
      </div>
    </div>
  );
}
