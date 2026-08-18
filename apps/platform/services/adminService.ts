import { apiClient } from "../lib/apiClient";

export type AdminRole = "STUDENT" | "TUTOR" | "ADMIN";

export interface AdminUser {
  id: string;
  email: string;
  fullName: string;
  role: AdminRole;
  avatarUrl?: string | null;
  bio?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AdminStats {
  totalUsers: number;
  totalAdmins: number;
  totalStudents: number;
}

interface ListUsersResponse {
  success: boolean;
  data: { users: AdminUser[]; total: number };
}

interface GetUserResponse {
  success: boolean;
  data: AdminUser;
}

interface StatsResponse {
  success: boolean;
  data: AdminStats;
}

export const adminService = {
  getUsers: async (): Promise<AdminUser[]> => {
    const res = await apiClient.get<ListUsersResponse>("/admin/users");
    return res.data.users;
  },

  getUser: async (id: string): Promise<AdminUser> => {
    const res = await apiClient.get<GetUserResponse>(`/admin/users/${id}`);
    return res.data;
  },

  getStats: async (): Promise<AdminStats> => {
    const res = await apiClient.get<StatsResponse>("/admin/stats");
    return res.data;
  },

  deleteUser: async (id: string): Promise<void> => {
    await apiClient.delete(`/admin/users/${id}`);
  },
};
