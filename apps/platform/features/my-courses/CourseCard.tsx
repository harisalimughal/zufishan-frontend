import {
  BarChart3,
  Binary,
  Bookmark,
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
  CourseLevel,
} from "./types";

type CourseCardProps = {
  course: Course;
};

type CategoryStyle = {
  badge: string;
  background: string;
  primary: string;
  secondary: string;
  border: string;
};

const categoryStyles: Record<
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

const categoryIconMap: Record<
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

const levelStyles: Record<CourseLevel, string> = {
  Beginner: "bg-emerald-400",
  Intermediate: "bg-amber-400",
  Advanced: "bg-red-400",
};

function getInitials(name: string) {
  return name
    .replace(/\([^)]*\)/g, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

function DatabaseIllustration({
  primary,
  secondary,
}: {
  primary: string;
  secondary: string;
}) {
  return (
    <>
      <Database
        size={58}
        strokeWidth={1.3}
        className={`relative z-10 ${primary}`}
      />

      <Server
        size={17}
        className={`absolute left-[19%] top-[24%] ${secondary}`}
      />

      <Binary
        size={17}
        className={`absolute right-[18%] top-[26%] ${secondary}`}
      />

      <Database
        size={16}
        className={`absolute bottom-[22%] left-[17%] ${secondary}`}
      />

      <Network
        size={16}
        className={`absolute bottom-[19%] right-[19%] ${secondary}`}
      />

      <span className="absolute left-[27%] top-1/2 h-px w-9 bg-purple-500/25" />
      <span className="absolute right-[27%] top-1/2 h-px w-9 bg-purple-500/25" />
    </>
  );
}

function PythonIllustration() {
  return (
    <>
      <div className="relative z-10 flex items-center">
        <span className="grid size-11 translate-x-1 place-items-center rounded-xl rounded-br-sm bg-[#3776AB] text-lg font-bold text-yellow-300 shadow-lg">
          P
        </span>

        <span className="grid size-11 -translate-x-1 translate-y-3 place-items-center rounded-xl rounded-tl-sm bg-[#FFD343] text-lg font-bold text-[#3776AB] shadow-lg">
          y
        </span>
      </div>

      <Code2
        size={17}
        className="absolute left-[17%] top-[23%] text-emerald-400/25"
      />

      <Binary
        size={18}
        className="absolute right-[18%] top-[25%] text-emerald-400/25"
      />

      <Server
        size={17}
        className="absolute bottom-[19%] left-[20%] text-emerald-400/20"
      />
    </>
  );
}

function AiIllustration({
  primary,
  secondary,
}: {
  primary: string;
  secondary: string;
}) {
  return (
    <>
      <BrainCircuit
        size={65}
        strokeWidth={1.2}
        className={`relative z-10 ${primary}`}
      />

      <Binary
        size={16}
        className={`absolute left-[18%] top-[25%] ${secondary}`}
      />

      <Network
        size={18}
        className={`absolute right-[18%] top-[23%] ${secondary}`}
      />

      <Sparkles
        size={15}
        className={`absolute bottom-[20%] right-[22%] ${secondary}`}
      />
    </>
  );
}

function CodeIllustration({
  primary,
  secondary,
}: {
  primary: string;
  secondary: string;
}) {
  return (
    <>
      <Code2
        size={67}
        strokeWidth={1.5}
        className={`relative z-10 ${primary}`}
      />

      <Binary
        size={15}
        className={`absolute left-[18%] top-[25%] ${secondary}`}
      />

      <Code2
        size={16}
        className={`absolute right-[17%] bottom-[20%] ${secondary}`}
      />

      <span className="absolute bottom-[28%] left-[18%] h-px w-10 bg-violet-500/25" />
      <span className="absolute right-[18%] top-[29%] h-px w-10 bg-violet-500/25" />
    </>
  );
}

function AnalyticsIllustration({
  primary,
  secondary,
}: {
  primary: string;
  secondary: string;
}) {
  return (
    <>
      <BarChart3
        size={63}
        strokeWidth={1.3}
        className={`relative z-10 ${primary}`}
      />

      <Network
        size={19}
        className={`absolute right-[16%] top-[23%] ${secondary}`}
      />

      <BarChart3
        size={17}
        className={`absolute left-[17%] top-[25%] ${secondary}`}
      />

      <span className="absolute bottom-[20%] left-[15%] h-px w-[70%] bg-cyan-500/20" />
    </>
  );
}

function CloudIllustration({
  primary,
  secondary,
}: {
  primary: string;
  secondary: string;
}) {
  return (
    <>
      <Cloud
        size={67}
        strokeWidth={1.4}
        className={`relative z-10 fill-blue-600/30 ${primary}`}
      />

      <Cloud
        size={22}
        className={`absolute left-[16%] top-[23%] ${secondary}`}
      />

      <Cloud
        size={20}
        className={`absolute right-[15%] top-[26%] ${secondary}`}
      />

      <Server
        size={17}
        className={`absolute bottom-[20%] right-[20%] ${secondary}`}
      />
    </>
  );
}

function BusinessIllustration({
  primary,
  secondary,
}: {
  primary: string;
  secondary: string;
}) {
  return (
    <>
      <BarChart3
        size={62}
        strokeWidth={1.4}
        className={`relative z-10 ${primary}`}
      />

      <BriefcaseBusiness
        size={18}
        className={`absolute left-[17%] top-[23%] ${secondary}`}
      />

      <Network
        size={18}
        className={`absolute right-[17%] top-[26%] ${secondary}`}
      />

      <span className="absolute bottom-[20%] left-[14%] h-px w-[72%] bg-cyan-500/20" />
    </>
  );
}

function NetworkIllustration({
  primary,
  secondary,
}: {
  primary: string;
  secondary: string;
}) {
  return (
    <>
      <Network
        size={67}
        strokeWidth={1.2}
        className={`relative z-10 ${primary}`}
      />

      <span className="absolute left-[18%] top-[23%] size-2 rounded-full bg-violet-400/40" />
      <span className="absolute right-[18%] top-[24%] size-2 rounded-full bg-violet-400/40" />
      <span className="absolute bottom-[20%] left-[20%] size-2 rounded-full bg-violet-400/30" />

      <Sparkles
        size={16}
        className={`absolute bottom-[18%] right-[18%] ${secondary}`}
      />
    </>
  );
}

function CourseIllustration({
  course,
  primary,
  secondary,
}: {
  course: Course;
  primary: string;
  secondary: string;
}) {
  switch (course.illustration) {
    case "database":
      return (
        <DatabaseIllustration
          primary={primary}
          secondary={secondary}
        />
      );

    case "python":
      return <PythonIllustration />;

    case "ai":
      return (
        <AiIllustration
          primary={primary}
          secondary={secondary}
        />
      );

    case "code":
      return (
        <CodeIllustration
          primary={primary}
          secondary={secondary}
        />
      );

    case "analytics":
      return (
        <AnalyticsIllustration
          primary={primary}
          secondary={secondary}
        />
      );

    case "cloud":
      return (
        <CloudIllustration
          primary={primary}
          secondary={secondary}
        />
      );

    case "business":
      return (
        <BusinessIllustration
          primary={primary}
          secondary={secondary}
        />
      );

    case "network":
      return (
        <NetworkIllustration
          primary={primary}
          secondary={secondary}
        />
      );

    default:
      return null;
  }
}

export function CourseCard({
  course,
}: CourseCardProps) {
  const styles =
    categoryStyles[course.category];

  const CategoryIcon =
    categoryIconMap[course.category];

  return (
    <article className="group flex min-w-0 flex-col overflow-hidden rounded-lg border border-[#1F2937] bg-[#0D1422] transition duration-300 hover:-translate-y-0.5 hover:border-zinc-700 hover:shadow-[0_12px_28px_rgba(0,0,0,0.35)]">
      <div
        className={[
          "relative flex h-[116px] items-center justify-center overflow-hidden bg-gradient-to-br",
          styles.background,
        ].join(" ")}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_55%)]" />

        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#0D1422]/70 to-transparent" />

        <div
          className={[
            "absolute left-1/2 top-1/2 size-24 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl",
            styles.primary.replace("text-", "bg-"),
            "opacity-20",
          ].join(" ")}
        />

        <CourseIllustration
          course={course}
          primary={styles.primary}
          secondary={styles.secondary}
        />

        {course.badge && (
          <span
            className={[
              "absolute left-2 top-2 rounded px-1.5 py-0.5 text-[8px] font-semibold text-[#111827]",
              course.badge === "New"
                ? "bg-emerald-400"
                : "bg-amber-300",
            ].join(" ")}
          >
            {course.badge}
          </span>
        )}

        <span
          className={[
            "absolute bottom-2 left-2 inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[7px] font-medium backdrop-blur-sm",
            styles.badge,
          ].join(" ")}
        >
          <CategoryIcon size={8} />
          {course.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col px-2.5 pb-2.5 pt-2">
        <h3 className="line-clamp-1 text-[11px] font-semibold leading-4 text-white">
          {course.title}
        </h3>

        <p className="mt-0.5 line-clamp-1 text-[8px] leading-4 text-zinc-500">
          {course.subtitle}
        </p>

        <div className="mt-1.5 flex items-center gap-1.5">
          <div className="grid size-5 shrink-0 place-items-center rounded-full border border-amber-700/40 bg-gradient-to-br from-amber-700 to-[#18181B] text-[7px] font-semibold text-white">
            {getInitials(course.instructor)}
          </div>

          <span className="line-clamp-1 min-w-0 text-[8px] text-zinc-400">
            {course.instructor}
          </span>
        </div>

        <div className="mt-1.5 flex items-center justify-between gap-2 text-[8px]">
          <div className="flex min-w-0 items-center gap-1">
            <span className="text-amber-400">★</span>

            <span className="font-medium text-amber-300">
              {course.rating}
            </span>

            <span className="truncate text-zinc-500">
              ({course.reviews})
            </span>
          </div>

          <span className="shrink-0 text-zinc-500">
            {course.students} students
          </span>
        </div>

        <div className="mt-2 flex items-center justify-between border-t border-[#1F2937] pt-2">
          <div className="flex items-center gap-1.5 text-[8px] text-zinc-400">
            <span
              className={[
                "size-1.5 rounded-full",
                levelStyles[course.level],
              ].join(" ")}
            />

            {course.level}
          </div>

          <button
            type="button"
            aria-label={`Bookmark ${course.title}`}
            className="rounded text-zinc-500 transition hover:text-white"
          >
            <Bookmark size={11} />
          </button>
        </div>
      </div>
    </article>
  );
}