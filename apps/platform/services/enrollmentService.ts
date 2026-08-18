import { apiClient } from "../lib/apiClient";
import { Course } from "./courseService";

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  progressPercent: number;
  status: "ACTIVE" | "COMPLETED" | "DROPPED";
  enrolledAt: string;
  updatedAt: string;
  course?: Course;
}

export interface ProgressSummary {
  summary: {
    totalEnrollments: number;
    completed: number;
    inProgress: number;
    dropped: number;
    averageProgress: number;
  };
  recentEnrollments: Enrollment[];
}

export const enrollmentService = {
  async getMyEnrollments(status?: string): Promise<{ enrollments: Enrollment[]; total: number }> {
    const url = status ? `/enrollments?status=${encodeURIComponent(status)}` : "/enrollments";
    const data = await apiClient.get<any>(url);
    return data.data || data;
  },

  async enrollInCourse(courseId: string): Promise<Enrollment> {
    const data = await apiClient.post<any>(`/enrollments/courses/${courseId}`);
    return data.data || data;
  },

  async updateProgress(courseId: string, progressPercent: number): Promise<Enrollment> {
    const data = await apiClient.patch<any>(`/enrollments/courses/${courseId}/progress`, { progressPercent });
    return data.data || data;
  },

  async getProgressSummary(): Promise<ProgressSummary> {
    const data = await apiClient.get<any>("/enrollments/progress/summary");
    return data.data || data;
  },
};
