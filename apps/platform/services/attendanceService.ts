import { apiClient } from "../lib/apiClient";

export interface AttendanceRecord {
  id: string;
  userId: string;
  courseId: string;
  date: string;
  status: "PRESENT" | "ABSENT" | "LEAVE";
  timeSlot?: string;
  topic?: string;
  createdAt: string;
}

export interface AttendanceStats {
  total: number;
  present: number;
  absent: number;
  leave: number;
  attendanceRate: number;
}

export interface UserStreak {
  currentStreak: number;
  bestStreak: number;
  lastActiveDate: string | null;
}

export const attendanceService = {
  async getCourseAttendance(courseId: string, startDate?: string, endDate?: string): Promise<{ records: AttendanceRecord[]; stats: AttendanceStats }> {
    let url = `/attendance/courses/${courseId}`;
    const query: string[] = [];
    if (startDate) query.push(`startDate=${encodeURIComponent(startDate)}`);
    if (endDate) query.push(`endDate=${encodeURIComponent(endDate)}`);
    if (query.length > 0) url += `?${query.join("&")}`;

    const data = await apiClient.get<any>(url);
    return data.data || data;
  },

  async markAttendance(payload: { courseId: string; status: "PRESENT" | "ABSENT" | "LEAVE"; timeSlot?: string; topic?: string }): Promise<AttendanceRecord> {
    const data = await apiClient.post<any>("/attendance", payload);
    return data.data || data;
  },

  async getStreak(): Promise<UserStreak> {
    const data = await apiClient.get<any>("/attendance/streak");
    return data.data || data;
  },
};
