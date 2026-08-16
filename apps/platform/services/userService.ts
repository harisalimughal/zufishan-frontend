import { apiClient } from "../lib/apiClient";

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  role: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
  preferences?: {
    theme: string;
    language: string;
    notificationsEnabled: boolean;
  };
}

export interface UpdateProfileInput {
  fullName?: string;
  email?: string;
  avatarUrl?: string;
  bio?: string;
}

export interface UpdatePreferencesInput {
  theme?: string;
  language?: string;
  notificationsEnabled?: boolean;
}

export const userService = {
  async getProfile(): Promise<UserProfile> {
    const data = await apiClient.get<any>("/auth/me");
    return data.data || data;
  },

  async updateProfile(input: UpdateProfileInput): Promise<UserProfile> {
    const data = await apiClient.put<any>("/users/profile", input);
    return data.data || data;
  },

  async updatePreferences(input: UpdatePreferencesInput): Promise<any> {
    const data = await apiClient.put<any>("/users/preferences", input);
    return data.data || data;
  },

  async changePassword(input: { currentPassword?: string; newPassword?: string }): Promise<any> {
    const data = await apiClient.put<any>("/users/password", input);
    return data.data || data;
  },
};
