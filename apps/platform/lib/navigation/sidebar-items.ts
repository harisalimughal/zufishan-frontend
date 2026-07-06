export type SidebarItem = {
  title: string;
  href: string;
  icon: string;
};

export const sidebarItems: SidebarItem[] = [
  { title: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
  { title: "My Courses", href: "/my-courses", icon: "BookOpen" },
  { title: "Live Classes", href: "/live-classes", icon: "Video" },
  { title: "Calendar", href: "/calendar", icon: "CalendarDays" },
  { title: "Attendance", href: "/attendance", icon: "ClipboardCheck" },
  { title: "Assignments", href: "/assignments", icon: "ClipboardList" },
  { title: "AI Tutor", href: "/ai-tutor", icon: "Bot" },
  { title: "Progress", href: "/progress", icon: "TrendingUp" },
  { title: "Achievements", href: "/achievements", icon: "Trophy" },
  { title: "Messages", href: "/messages", icon: "MessagesSquare" },
  { title: "Settings", href: "/settings", icon: "Settings" }
];
