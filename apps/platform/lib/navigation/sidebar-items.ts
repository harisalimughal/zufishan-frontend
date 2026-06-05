export type SidebarItem = {
  label: string;
  href: string;
  icon: string;
};

export const sidebarItems: SidebarItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
  { label: "My Courses", href: "/dashboard", icon: "BookOpen" },
  { label: "Live Classes", href: "/classroom", icon: "Video" },
  { label: "Course Catalog", href: "/catalog", icon: "Library" },
  { label: "Calendar", href: "/calendar", icon: "CalendarDays" },
  { label: "Attendance", href: "/attendance", icon: "ClipboardCheck" },
  { label: "Assignments", href: "/assignments", icon: "ClipboardList" },
  { label: "AI Tutor", href: "/tutor", icon: "Bot" },
  { label: "Progress", href: "/progress", icon: "TrendingUp" },
  { label: "Achievements", href: "/achievements", icon: "Trophy" },
  { label: "Messages", href: "/messages", icon: "MessagesSquare" },
  { label: "Settings", href: "/settings", icon: "Settings" }
];
