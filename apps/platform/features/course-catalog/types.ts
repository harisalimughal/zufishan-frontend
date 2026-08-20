import type { LucideIcon } from "lucide-react";

export type CourseCategoryName =
  | "Qur'an & Tajweed"
  | "Hadith & Seerah"
  | "Fiqh & Aqeedah"
  | "Arabic Language"
  | "Islamic Finance"
  | "Hifz Program";

export type CourseLevel =
  | "Beginner"
  | "Intermediate"
  | "Advanced";

export type CourseCategory = {
  id: string;
  label: string;
  courseCount: number;
  icon: LucideIcon;
};

export type Course = {
  id: number;
  title: string;
  subtitle: string;
  category: CourseCategoryName;
  instructor: string;
  rating: number;
  reviews: string;
  students: string;
  level: CourseLevel;
  badge?: "Bestseller" | "New";
  illustration:
    | "database"
    | "python"
    | "ai"
    | "code"
    | "analytics"
    | "cloud"
    | "business"
    | "network";
  slug: string;
};
