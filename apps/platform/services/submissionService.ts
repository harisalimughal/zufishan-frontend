import { apiClient } from "../lib/apiClient";

export interface Submission {
  id: string;
  assignmentId: string;
  userId: string;
  content?: string;
  fileUrl?: string;
  status: "PENDING" | "GRADED";
  score?: number | null;
  feedback?: string | null;
  submittedAt: string;
  updatedAt: string;
  assignment?: any;
  user?: any;
}

export const submissionService = {
  async getAllSubmissions(): Promise<Submission[]> {
    const data = await apiClient.get<any>("/submissions");
    return Array.isArray(data) ? data : data.data || [];
  },

  async getSubmissionById(id: string): Promise<Submission> {
    const data = await apiClient.get<any>(`/submissions/${id}`);
    return data.data || data;
  },

  async getSubmissionsByAssignment(assignmentId: string): Promise<Submission[]> {
    const data = await apiClient.get<any>(`/submissions/assignment/${assignmentId}`);
    return Array.isArray(data) ? data : data.data || [];
  },

  async createSubmission(payload: { assignmentId: string; content?: string; fileUrl?: string }): Promise<Submission> {
    const data = await apiClient.post<any>("/submissions", payload);
    return data.data || data;
  },

  async updateSubmission(id: string, payload: { content?: string; fileUrl?: string }): Promise<Submission> {
    const data = await apiClient.patch<any>(`/submissions/${id}`, payload);
    return data.data || data;
  },

  async deleteSubmission(id: string): Promise<{ message: string }> {
    return apiClient.delete<{ message: string }>(`/submissions/${id}`);
  },
};
