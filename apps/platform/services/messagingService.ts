import { apiClient } from "../lib/apiClient";

export interface DirectMessage {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  isRead: boolean;
  createdAt: string;
  sender?: any;
  receiver?: any;
}

export interface GroupMessage {
  id: string;
  channelId: string;
  senderId: string;
  content: string;
  createdAt: string;
  sender?: any;
}

export const messagingService = {
  // Direct Messages
  async getAllDirectMessages(): Promise<DirectMessage[]> {
    const data = await apiClient.get<any>("/messages");
    return Array.isArray(data) ? data : data.data || [];
  },

  async getConversation(userId: string, otherUserId: string): Promise<DirectMessage[]> {
    const data = await apiClient.get<any>(`/messages/conversation/${userId}/${otherUserId}`);
    return Array.isArray(data) ? data : data.data || [];
  },

  async sendDirectMessage(receiverId: string, content: string): Promise<DirectMessage> {
    const data = await apiClient.post<any>("/messages", { receiverId, content });
    return data.data || data;
  },

  async markMessageAsRead(id: string): Promise<DirectMessage> {
    const data = await apiClient.patch<any>(`/messages/${id}/read`);
    return data.data || data;
  },

  // Group Messages
  async getAllGroupMessages(): Promise<GroupMessage[]> {
    const data = await apiClient.get<any>("/group-messages");
    return Array.isArray(data) ? data : data.data || [];
  },

  async getChannelMessages(channelId: string): Promise<GroupMessage[]> {
    const data = await apiClient.get<any>(`/group-messages/channel/${channelId}`);
    return Array.isArray(data) ? data : data.data || [];
  },

  async sendGroupMessage(channelId: string, senderId: string, content: string): Promise<GroupMessage> {
    const data = await apiClient.post<any>("/group-messages", { channelId, senderId, content });
    return data.data || data;
  },
};
