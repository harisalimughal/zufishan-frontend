export interface SourceCitation {
  title: string;
  sourceType: string;
  url?: string;
  chunkIndex: number;
}

export type FeedbackRating =
  | "thumbs_up"
  | "thumbs_down"
  | "helpful"
  | "not_helpful"
  | "inappropriate";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: Date | string;
  status: "sent" | "pending" | "error";
  error?: string;
  scholarRedirect?: boolean;
  scholarRedirectCategory?: string | null;
  originalQuestion?: string;
  sources?: SourceCitation[];
  rating?: FeedbackRating | null;
  feedbackComment?: string | null;
  latencyMs?: number | null;
  modelUsed?: string | null;
}

export interface ConversationThread {
  id: string;
  title: string | null;
  createdAt: string;
  updatedAt: string;
  _count?: { logs: number };
}

export interface ConversationHistoryItem {
  id: string;
  role: "USER" | "ASSISTANT";
  content: string;
  modelUsed: string | null;
  latencyMs: number | null;
  rating: string | null;
  feedbackComment: string | null;
  isRedirected: boolean;
  isOutOfScope: boolean;
  createdAt: string;
}

export interface ConversationHistoryData {
  conversation: {
    id: string;
    title: string | null;
    createdAt: string;
    updatedAt: string;
  };
  messages: ConversationHistoryItem[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ConversationListData {
  conversations: ConversationThread[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface SendChatMessageData {
  conversationId: string;
  message: string;
  sources: SourceCitation[];
  scholarRedirect: boolean;
  scholarRedirectCategory: string | null;
  isAdversarialAttempt: boolean;
  rateLimitStatus: { used: number; limit: number };
}
