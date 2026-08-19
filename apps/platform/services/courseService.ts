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

export interface CourseInput {
  title: string;
  detailSlug: string;
  description: string;
  instructorName: string;
  category: string;
  level?: string;
  bannerUrl?: string;
  icon?: string;
  iconBg?: string;
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

  async getCourseBySlug(slug: string): Promise<Course | null> {
    try {
      const data = await apiClient.get<any>(`/courses/slug/${encodeURIComponent(slug)}`);
      return data.data || data;
    } catch {
      const courses = await this.getCourses();
      return courses.find((c) => c.detailSlug === slug || c.id === slug) || null;
    }
  },

  async getCourseModules(courseId: string): Promise<any[]> {
    const data = await apiClient.get<any>(`/courses/${courseId}/modules`);
    return Array.isArray(data) ? data : data.data || [];
  },

  async deleteCourseResource(id: string): Promise<{ message: string }> {
    return apiClient.delete<{ message: string }>(`/resources/${id}`);
  },

  async createCourse(input: CourseInput): Promise<Course> {
    return apiClient.post<Course>("/courses", input);
  },

  async updateCourse(id: string, input: Partial<CourseInput>): Promise<Course> {
    return apiClient.patch<Course>(`/courses/${id}`, input);
  },

  async deleteCourse(id: string): Promise<{ message: string }> {
    return apiClient.delete<{ message: string }>(`/courses/${id}`);
  },
};
