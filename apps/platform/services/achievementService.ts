import { apiClient } from "../lib/apiClient";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  xpPoints: number;
  isUnlocked?: boolean;
  unlockedAt?: string | null;
}

export interface ActivityLogItem {
  id: string;
  userId: string;
  title: string;
  subtitle?: string;
  type: string;
  createdAt: string;
}

export interface AchievementStats {
  unlocked: number;
  total: number;
  progress: number;
}

export interface AchievementsResponse {
  achievements: Achievement[];
  stats: AchievementStats;
}

export const achievementService = {
  async getAchievements(): Promise<AchievementsResponse> {
    const data = await apiClient.get<any>("/achievements");
    return data.data || data;
  },

  async getActivityFeed(limit: number = 20, offset: number = 0): Promise<{ activities: ActivityLogItem[]; pagination: any }> {
    const data = await apiClient.get<any>(`/achievements/activity-feed?limit=${limit}&offset=${offset}`);
    return data.data || data;
  },

  async checkAndAward(): Promise<{ newlyUnlocked: Achievement[]; totalUnlocked: number }> {
    const data = await apiClient.post<any>("/achievements/check");
    return data.data || data;
  },
};
