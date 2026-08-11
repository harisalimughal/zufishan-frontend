import { apiClient } from "../lib/apiClient";

export interface Course {
  id: string;
  title: string;
  detailSlug: string;
  description: string;
  instructorName: string;
  category: string;
  level: string;
  bannerUrl?: string;
  icon?: string;
  iconBg?: string;
  rating: number;
  totalStudents: number;
  liveClassToday?: boolean;
}

export interface CourseResource {
  id: string;
  courseId: string;
  title: string;
  fileUrl: string;
  fileType: string;
  uploadedAt: string;
}

export const courseService = {
  async getCourses(): Promise<Course[]> {
    const data = await apiClient.get<any>("/courses");
    return Array.isArray(data) ? data : data.data || [];
  },

  async getCourseById(id: string): Promise<Course> {
    const data = await apiClient.get<any>(`/courses/${id}`);
    return data.data || data;
  },

  async getCourseResources(courseId: string): Promise<CourseResource[]> {
    const data = await apiClient.get<any>(`/courses/${courseId}/resources`);
    return Array.isArray(data) ? data : data.data || [];
  },

  async createCourseResource(
    courseId: string,
    resource: { title: string; fileUrl: string; fileType?: string }
  ): Promise<CourseResource> {
    const data = await apiClient.post<any>(`/courses/${courseId}/resources`, resource);
    return data.data || data;
  },

  async deleteCourseResource(id: string): Promise<{ message: string }> {
    return apiClient.delete<{ message: string }>(`/resources/${id}`);
  },
};
