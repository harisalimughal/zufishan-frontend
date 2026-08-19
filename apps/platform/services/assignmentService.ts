import { apiClient } from "../lib/apiClient";

export interface AssignmentData {
  id: string;
  courseId: string;
  title: string;
  description: string;
  dueDate: string;
  totalPoints: number;
  course?: { id: string; title: string };
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

  async updateAssignment(id: string, input: Partial<{ title: string; description: string; dueDate: string; totalPoints: number }>): Promise<AssignmentData> {
    const data = await apiClient.patch<any>(`/assignments/${id}`, input);
    return data.data || data;
  },

  async deleteAssignment(id: string): Promise<{ message: string }> {
    return apiClient.delete<{ message: string }>(`/assignments/${id}`);
  },
};
