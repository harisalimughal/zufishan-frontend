import {
  BarChart3,
  Binary,
  BrainCircuit,
  BriefcaseBusiness,
  Cloud,
  Code2,
  Database,
  Network,
  Server,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import type {
  Course,
  CourseCategoryName,
} from "./types";

export type CategoryStyle = {
  badge: string;
  background: string;
  primary: string;
  secondary: string;
  border: string;
};

export const categoryStyles: Record<
  CourseCategoryName,
  CategoryStyle
> = {
  Programming: {
    badge: "bg-violet-500/15 text-violet-300",
    background:
      "from-[#190B3F] via-[#120A2D] to-[#09090B]",
    primary: "text-violet-400",
    secondary: "text-violet-500/40",
    border: "border-violet-500/20",
  },
  "Data Science": {
    badge: "bg-cyan-500/15 text-cyan-300",
    background:
      "from-[#07333A] via-[#08272E] to-[#09090B]",
    primary: "text-cyan-400",
    secondary: "text-cyan-500/40",
    border: "border-cyan-500/20",
  },
  "AI & ML": {
    badge: "bg-blue-500/15 text-blue-300",
    background:
      "from-[#062B68] via-[#071D46] to-[#09090B]",
    primary: "text-blue-400",
    secondary: "text-blue-500/40",
    border: "border-blue-500/20",
  },
  Database: {
    badge: "bg-purple-500/15 text-purple-300",
    background:
      "from-[#31116B] via-[#1E0A4A] to-[#09090B]",
    primary: "text-purple-400",
    secondary: "text-purple-500/40",
    border: "border-purple-500/20",
  },
  Business: {
    badge: "bg-cyan-500/15 text-cyan-300",
    background:
      "from-[#05384B] via-[#08242F] to-[#09090B]",
    primary: "text-cyan-400",
    secondary: "text-cyan-500/40",
    border: "border-cyan-500/20",
  },
  "Cloud Computing": {
    badge: "bg-indigo-500/15 text-indigo-300",
    background:
      "from-[#082454] via-[#071A3D] to-[#09090B]",
    primary: "text-blue-400",
    secondary: "text-blue-500/40",
    border: "border-blue-500/20",
  },
};

export const categoryIconMap: Record<
  CourseCategoryName,
  LucideIcon
> = {
  Programming: Code2,
  "Data Science": BarChart3,
  "AI & ML": BrainCircuit,
  Database,
  Business: BriefcaseBusiness,
  "Cloud Computing": Cloud,
};

const illustrationIconMap: Record<
  Course["illustration"],
  LucideIcon
> = {
  database: Database,
  python: Code2,
  ai: BrainCircuit,
  code: Code2,
  analytics: BarChart3,
  cloud: Cloud,
  business: BriefcaseBusiness,
  network: Network,
};

export function CourseIllustration({
  course,
  iconSize = 52,
}: {
  course: Course;
  iconSize?: number;
}) {
  const styles = categoryStyles[course.category] || categoryStyles.Programming;
  const IllustrationIcon =
    illustrationIconMap[course.illustration] || Code2;

  return (
    <>
      <IllustrationIcon
        size={iconSize}
        strokeWidth={1.3}
        className={`relative z-10 ${styles.primary}`}
      />

      <Binary
        size={12}
        className="absolute left-[18%] top-[24%] text-white/10"
      />

      <Server
        size={12}
        className="absolute bottom-[20%] right-[18%] text-white/10"
      />

      <Sparkles
        size={10}
        className="absolute right-[19%] top-[24%] text-white/10"
      />
    </>
  );
}

export function CourseVisualHeader({
  course,
  heightClassName = "h-[96px]",
  registered = false,
}: {
  course: Course;
  heightClassName?: string;
  registered?: boolean;
}) {
  const styles = categoryStyles[course.category] || categoryStyles.Programming;
  const CategoryIcon = categoryIconMap[course.category] || Code2;

  return (
    <div
      className={[
        "relative flex items-center justify-center overflow-hidden rounded-t-xl bg-gradient-to-br",
        heightClassName,
        styles.background,
      ].join(" ")}
    >
      <CourseIllustration course={course} />

      {course.badge && !registered && (
        <span
          className={[
            "absolute left-2 top-2 rounded-md px-2 py-0.5 text-[9px] font-semibold text-[#111827]",
            course.badge === "New"
              ? "bg-emerald-400"
              : "bg-amber-300",
          ].join(" ")}
        >
          {course.badge}
        </span>
      )}

      {registered && (
        <span className="absolute left-2 top-2 rounded-md bg-emerald-500/15 px-2 py-0.5 text-[9px] font-semibold text-emerald-300">
          Registered
        </span>
      )}

      <span
        className={[
          "absolute bottom-2 left-2 inline-flex items-center gap-1 rounded-md px-2 py-1 text-[9px] font-medium backdrop-blur-sm",
          styles.badge,
        ].join(" ")}
      >
        <CategoryIcon size={10} />
        {course.category}
      </span>
    </div>
  );
}