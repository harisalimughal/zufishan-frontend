export type SidebarItem = {
  title: string;
  href: string;
  icon: string;
};

export type SidebarSection = {
  /** Section heading label. `null` renders items without a heading. */
  label: string | null;
  items: SidebarItem[];
};

export const sidebarSections: SidebarSection[] = [
  {
    label: null,
    items: [{ title: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" }]
  },
  {
    label: "Learning",
    items: [
      { title: "Course Catalog", href: "/course-catalog", icon: "Compass" },
      { title: "My Courses", href: "/my-courses", icon: "GraduationCap" },
      { title: "Live Classes", href: "/live-classes", icon: "Video" },
      { title: "AI Tutor", href: "/ai-tutor", icon: "Bot" }
    ]
  },
  {
    label: "Academics",
    items: [
      { title: "Calendar", href: "/calendar", icon: "CalendarDays" },
      { title: "Attendance", href: "/attendance", icon: "ClipboardCheck" },
      { title: "Assignments", href: "/assignments", icon: "ClipboardList" }
    ]
  },
  {
    label: "Progress",
    items: [
      { title: "Progress", href: "/progress", icon: "TrendingUp" },
      { title: "Achievements", href: "/achievements", icon: "Trophy" }
    ]
  },
  {
    label: "Communication",
    items: [
      { title: "Announcements", href: "/announcements", icon: "Megaphone" },
      { title: "Group Chat", href: "/group-chat", icon: "Users" }
    ]
  },
  {
    label: "System",
    items: [
      { title: "Settings", href: "/settings", icon: "Settings" }
    
    ]
  }
];
