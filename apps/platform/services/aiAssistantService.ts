import { apiClient } from "../lib/apiClient";
import type {
  ConversationHistoryData,
  ConversationListData,
  FeedbackRating,
  SendChatMessageData,
} from "../types/aiAssistant";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const aiAssistantService = {
  /**
   * Sends a user query to the AI Assistant.
   * Runs fiqhi guardrails, RAG retrieval, and LLM answer generation.
   */
  async sendMessage(
    message: string,
    conversationId?: string,
  ): Promise<SendChatMessageData> {
    const payload: { message: string; conversationId?: string } = { message };
    if (conversationId) {
      payload.conversationId = conversationId;
    }

    const response = await apiClient.post<ApiResponse<SendChatMessageData>>(
      "/v1/utilities/ai-assistant/chat",
      payload,
    );
    return response.data;
  },

  /**
   * Retrieves message history for a specific conversation thread.
   */
  async getConversationHistory(
    conversationId: string,
    page: number = 1,
    limit: number = 50,
  ): Promise<ConversationHistoryData> {
    const response = await apiClient.get<ApiResponse<ConversationHistoryData>>(
      `/v1/utilities/ai-assistant/history?conversationId=${encodeURIComponent(conversationId)}&page=${page}&limit=${limit}`,
    );
    return response.data;
  },

  /**
   * Retrieves the list of past conversation threads for the user.
   */
  async getConversations(
    page: number = 1,
    limit: number = 30,
  ): Promise<ConversationListData> {
    const response = await apiClient.get<ApiResponse<ConversationListData>>(
      `/v1/utilities/ai-assistant/history?page=${page}&limit=${limit}`,
    );
    return response.data;
  },

  /**
   * Submits helpful/unhelpful rating or feedback comment on an assistant message.
   */
  async submitFeedback(params: {
    messageId: string;
    rating: FeedbackRating;
    comment?: string;
  }): Promise<{ id: string; rating: string }> {
    const response = await apiClient.post<ApiResponse<{ id: string; rating: string }>>(
      "/v1/utilities/ai-assistant/feedback",
      {
        messageId: params.messageId,
        rating: params.rating,
        comment: params.comment,
      },
    );
    return response.data;
  },
};
