"use client";

import React from "react";
import { Plus, MessageSquare, X, ChevronRight, Sparkles } from "lucide-react";
import type { ConversationThread } from "../../../types/aiAssistant";

interface ConversationSidebarProps {
  conversations: ConversationThread[];
  activeConversationId: string | null;
  onSelectConversation: (conversationId: string) => void;
  onNewConversation: () => void;
  isOpen: boolean;
  onClose: () => void;
  isLoading?: boolean;
}

export function ConversationSidebar({
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewConversation,
  isOpen,
  onClose,
  isLoading = false,
}: ConversationSidebarProps) {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-stone-800 bg-stone-950 p-4 transition-transform duration-300 ease-in-out lg:static lg:z-auto lg:w-72 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header with Brand & Close Button */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-800/80">
          <div className="flex items-center gap-2 text-stone-100">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">AI Assistant</h3>
              <p className="text-[11px] text-stone-400">Knowledge Assistant</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-stone-800 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* New Chat Button */}
        <div className="pt-4 pb-3">
          <button
            type="button"
            onClick={() => {
              onNewConversation();
              onClose();
            }}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 p-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-700/20 hover:from-emerald-500 hover:to-emerald-600 active:scale-[0.98] transition-all"
          >
            <Plus className="h-4 w-4" />
            <span>New Chat</span>
          </button>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 px-2 py-1.5">
            Recent Conversations
          </p>

          {isLoading ? (
            <div className="space-y-2 p-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-10 rounded-xl bg-stone-900 animate-pulse"
                />
              ))}
            </div>
          ) : conversations.length === 0 ? (
            <div className="px-3 py-6 text-center text-xs text-stone-400">
              No conversations yet. Start a new chat above!
            </div>
          ) : (
            conversations.map((thread) => {
              const isActive = thread.id === activeConversationId;
              return (
                <button
                  key={thread.id}
                  type="button"
                  onClick={() => {
                    onSelectConversation(thread.id);
                    onClose();
                  }}
                  className={`group flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-left text-xs transition-all ${
                    isActive
                      ? "bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 font-medium"
                      : "text-stone-400 hover:bg-stone-900 hover:text-stone-200"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <MessageSquare
                      className={`h-4 w-4 shrink-0 ${
                        isActive ? "text-emerald-400" : "text-stone-400 group-hover:text-stone-300"
                      }`}
                    />
                    <span className="truncate">{thread.title || "Untitled Chat"}</span>
                  </div>

                  <ChevronRight
                    className={`h-3 w-3 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity ${
                      isActive ? "opacity-100 text-emerald-400" : "text-stone-400"
                    }`}
                  />
                </button>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="border-t border-stone-800/80 pt-3 text-[11px] text-stone-400 flex items-center justify-between">
          <span>Protected Fiqh Guardrail</span>
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        </div>
      </aside>
    </>
  );
}
