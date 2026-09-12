"use client";

import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { Menu, Plus, Sparkles, AlertTriangle } from "lucide-react";
import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";
import { EmptyState } from "./EmptyState";
import { ChatInput } from "./ChatInput";
import { ConversationSidebar } from "./ConversationSidebar";
import { aiAssistantService } from "../../../services/aiAssistantService";
import type {
  ChatMessage,
  ConversationThread,
  FeedbackRating,
} from "../../../types/aiAssistant";

const STORAGE_KEY = "zufishan_ai_active_conversation";

export function ChatInterface() {
  const [conversations, setConversations] = useState<ConversationThread[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);
  const [isSidebarLoading, setIsSidebarLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // 1. Initial Load: Fetch past conversations and restore active thread
  useEffect(() => {
    async function init() {
      setIsSidebarLoading(true);
      try {
        const listData = await aiAssistantService.getConversations();
        setConversations(listData.conversations || []);

        const savedId = localStorage.getItem(STORAGE_KEY);
        if (savedId) {
          loadConversation(savedId);
        }
      } catch (err) {
        console.warn("Could not load past conversations", err);
      } finally {
        setIsSidebarLoading(false);
      }
    }
    init();
  }, []);

  // 2. Load messages for a given conversation
  const loadConversation = async (conversationId: string) => {
    setActiveConversationId(conversationId);
    localStorage.setItem(STORAGE_KEY, conversationId);
    setIsHistoryLoading(true);
    setGeneralError(null);

    try {
      const historyData = await aiAssistantService.getConversationHistory(conversationId);
      const mapped: ChatMessage[] = (historyData.messages || []).map((m) => ({
        id: m.id,
        role: m.role.toLowerCase() as "user" | "assistant",
        content: m.content,
        createdAt: m.createdAt,
        status: "sent",
        scholarRedirect: m.isRedirected,
        scholarRedirectCategory: null,
        rating: (m.rating as FeedbackRating) || null,
        feedbackComment: m.feedbackComment || null,
        latencyMs: m.latencyMs,
        modelUsed: m.modelUsed,
      }));
      setMessages(mapped);
    } catch (err: unknown) {
      console.error("Failed to fetch conversation history", err);
      setGeneralError("Failed to load conversation history. It may have expired or been removed.");
      setActiveConversationId(null);
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setIsHistoryLoading(false);
    }
  };

  // 3. Start a new conversation
  const handleNewConversation = () => {
    setActiveConversationId(null);
    setMessages([]);
    setInput("");
    setGeneralError(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  // 4. Send Message Handler
  const handleSend = async (messageText?: string) => {
    const textToSend = (messageText || input).trim();
    if (!textToSend || isLoading) return;

    setInput("");
    setGeneralError(null);

    const userMessageId = `user-${Date.now()}`;
    const newUserMsg: ChatMessage = {
      id: userMessageId,
      role: "user",
      content: textToSend,
      createdAt: new Date(),
      status: "sent",
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setIsLoading(true);

    try {
      const res = await aiAssistantService.sendMessage(
        textToSend,
        activeConversationId || undefined,
      );

      // If this was the first turn of a new conversation, update active id
      if (!activeConversationId && res.conversationId) {
        setActiveConversationId(res.conversationId);
        localStorage.setItem(STORAGE_KEY, res.conversationId);

        // Refresh conversation list in background
        aiAssistantService.getConversations().then((data) => {
          setConversations(data.conversations || []);
        });
      }

      const assistantTurnId = `asst-${Date.now()}`;
      const newAssistantMsg: ChatMessage = {
        id: assistantTurnId,
        role: "assistant",
        content: res.message,
        createdAt: new Date(),
        status: "sent",
        scholarRedirect: res.scholarRedirect,
        scholarRedirectCategory: res.scholarRedirectCategory,
        originalQuestion: res.scholarRedirect ? textToSend : undefined,
        sources: res.sources,
      };

      setMessages((prev) => [...prev, newAssistantMsg]);
    } catch (err: unknown) {
      console.error("Error sending message", err);
      const errorMessage = err instanceof Error ? err.message : "Service unavailable";
      const errorTurnId = `err-${Date.now()}`;
      const errorMsg: ChatMessage = {
        id: errorTurnId,
        role: "assistant",
        content: "Sorry, I encountered an issue processing your request. Please check your connection and try again.",
        createdAt: new Date(),
        status: "error",
        error: errorMessage,
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // 5. Retry a failed message
  const handleRetry = (failedMsg: ChatMessage) => {
    const lastUserTurn = [...messages]
      .reverse()
      .find((m) => m.role === "user");
    if (lastUserTurn) {
      // Remove the error turn
      setMessages((prev) => prev.filter((m) => m.id !== failedMsg.id));
      handleSend(lastUserTurn.content);
    }
  };

  // 6. Submit feedback rating on assistant response
  const handleFeedback = async (
    messageId: string,
    rating: FeedbackRating,
    comment?: string,
  ) => {
    await aiAssistantService.submitFeedback({
      messageId,
      rating,
      comment,
    });

    // Optimistically update message state
    setMessages((prev) =>
      prev.map((m) =>
        m.id === messageId
          ? { ...m, rating, feedbackComment: comment || null }
          : m,
      ),
    );
  };

  const activeTitle =
    conversations.find((c) => c.id === activeConversationId)?.title ||
    "AI Platform Assistant";

  return (
    <div className="flex h-full w-full overflow-hidden rounded-2xl border border-stone-800 bg-stone-950 text-stone-100 shadow-2xl">
      {/* Sidebar with conversation persistence */}
      <ConversationSidebar
        conversations={conversations}
        activeConversationId={activeConversationId}
        onSelectConversation={loadConversation}
        onNewConversation={handleNewConversation}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isLoading={isSidebarLoading}
      />

      {/* Main Chat Container */}
      <div className="flex flex-1 flex-col min-w-0 h-full bg-gradient-to-b from-stone-900/60 to-stone-950">
        {/* Top Header */}
        <header className="flex h-16 items-center justify-between border-b border-stone-800/80 px-4 sm:px-6 bg-stone-950/80 backdrop-blur-md">
          <div className="flex items-center gap-3 min-w-0">
            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open conversation history"
              className="p-2 rounded-xl text-stone-400 hover:text-stone-100 hover:bg-stone-800 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2.5 min-w-0">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/30 text-emerald-400 shadow-sm">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <h1 className="text-sm font-semibold text-stone-100 truncate">
                  {activeTitle}
                </h1>
                <div className="flex items-center gap-1.5 text-[11px] text-stone-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>RAG Knowledge Base • Fiqh Protected</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleNewConversation}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-stone-800 bg-stone-900 hover:bg-stone-800 px-3 py-1.5 text-xs font-medium text-stone-200 transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>New Chat</span>
            </button>
          </div>
        </header>

        {/* Message Stream Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar">
          {/* General Error Banner */}
          {generalError && (
            <div className="mb-4 flex items-center justify-between gap-3 rounded-xl border border-rose-500/30 bg-rose-950/20 p-3 text-xs text-rose-300">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 shrink-0 text-rose-400" />
                <span>{generalError}</span>
              </div>
              <button
                type="button"
                onClick={handleNewConversation}
                className="underline hover:text-rose-100"
              >
                Reset
              </button>
            </div>
          )}

          {/* Loading History Skeleton */}
          {isHistoryLoading ? (
            <div className="flex flex-col items-center justify-center h-full text-stone-400 space-y-3">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
              <p className="text-xs">Loading conversation history...</p>
            </div>
          ) : messages.length === 0 ? (
            /* Empty State */
            <EmptyState onSelectPrompt={(prompt) => handleSend(prompt)} />
          ) : (
            /* Message List */
            <div className="space-y-4 max-w-3xl mx-auto w-full">
              <AnimatePresence initial={false}>
                {messages.map((message) => (
                  <MessageBubble
                    key={message.id}
                    message={message}
                    onRetry={handleRetry}
                    onFeedback={handleFeedback}
                  />
                ))}
              </AnimatePresence>

              {/* Typing / Reasoning Indicator */}
              {isLoading && <TypingIndicator />}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Bottom Chat Input */}
        <ChatInput
          input={input}
          setInput={setInput}
          onSend={() => handleSend()}
          isLoading={isLoading}
          disabled={isHistoryLoading}
        />
      </div>
    </div>
  );
}
