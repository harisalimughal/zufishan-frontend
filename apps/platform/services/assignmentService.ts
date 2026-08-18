import { apiClient } from "../lib/apiClient";

export interface AssignmentData {
  id: string;
  courseId: string;
  title: string;
  description: string;
  dueDate: string;
  totalPoints: number;
}

export const assignmentService = {
  async getAssignments(): Promise<AssignmentData[]> {
    const data = await apiClient.get<any>("/assignments");
    return Array.isArray(data) ? data : data.data || [];
  },

  async getAssignmentById(id: string): Promise<AssignmentData> {
    const data = await apiClient.get<any>(`/assignments/${id}`);
    return data.data || data;
  },

  async submitAssignment(assignmentId: string, fileUrl: string): Promise<any> {
    return apiClient.post<any>(`/assignments/${assignmentId}/submit`, { fileUrl });
  },

  async createAssignment(input: { courseId: string; title: string; description: string; dueDate: string; totalPoints?: number }): Promise<AssignmentData> {
    const data = await apiClient.post<any>("/assignments", input);
    return data.data || data;
  },
};
