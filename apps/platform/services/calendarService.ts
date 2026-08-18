import { apiClient } from "../lib/apiClient";

export interface CalendarEventData {
  id: string;
  userId: string;
  courseId?: string | null;
  title: string;
  startTime: string;
  endTime: string;
  type: "CLASS" | "ASSIGNMENT" | "EXAM" | "AI_SESSION" | "OTHER";
  location?: string | null;
  isLive?: boolean;
  createdAt: string;
  course?: any;
}

export interface CreateCalendarEventInput {
  userId: string;
  courseId?: string;
  title: string;
  startTime: string;
  endTime: string;
  type?: "CLASS" | "ASSIGNMENT" | "EXAM" | "AI_SESSION" | "OTHER";
  location?: string;
  isLive?: boolean;
}

export const calendarService = {
  async getAllEvents(): Promise<CalendarEventData[]> {
    const data = await apiClient.get<any>("/calendar-events");
    return Array.isArray(data) ? data : data.data || [];
  },

  async getUserEvents(userId: string): Promise<CalendarEventData[]> {
    const data = await apiClient.get<any>(`/calendar-events/user/${userId}`);
    return Array.isArray(data) ? data : data.data || [];
  },

  async getEventById(id: string): Promise<CalendarEventData> {
    const data = await apiClient.get<any>(`/calendar-events/${id}`);
    return data.data || data;
  },

  async createEvent(input: CreateCalendarEventInput): Promise<CalendarEventData> {
    const data = await apiClient.post<any>("/calendar-events", input);
    return data.data || data;
  },

  async updateEvent(id: string, input: Partial<CreateCalendarEventInput>): Promise<CalendarEventData> {
    const data = await apiClient.put<any>(`/calendar-events/${id}`, input);
    return data.data || data;
  },

  async deleteEvent(id: string): Promise<{ message: string }> {
    return apiClient.delete<{ message: string }>(`/calendar-events/${id}`);
  },
};
