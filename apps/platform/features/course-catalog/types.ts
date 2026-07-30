import type { LucideIcon } from "lucide-react";

export type CourseCategoryName =
  | "Programming"
  | "Data Science"
  | "AI & ML"
  | "Database"
  | "Business"
  | "Cloud Computing";

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
