import { CourseDetailLayout } from "../components/CourseDetailLayout";

const businessCourse = {
  title: "Business Analytics",
  subtitle: "Data-Driven Decision Making",
  description: "Use metrics, dashboards and analytical thinking to make stronger business decisions.",
  category: "Business",
  instructor: "Prof. James (AI)",
  instructorRole: "Business Analytics Consultant",
  rating: 4.7,
  ratings: "589 ratings",
  students: "3.9K",
  level: "Intermediate",
  duration: "8 Weeks",
  totalLessons: 28,
  liveClasses: 12,
  certificate: true,
  language: "English",
  updatedAt: "April 26, 2026",
  progress: 67,
  completedLessons: 19,
  attendedClasses: 8,
  submittedAssignments: 5,
  outcomes: [
    "Define useful business metrics",
    "Analyse business performance",
    "Build effective dashboards",
    "Interpret trends and forecasts",
    "Present data-driven insights"
  ],
  curriculum: [
    {
      id: 1,
      title: "Business Analytics Foundations",
      duration: "45 min",
      completed: true,
      lessons: [
        { id: 1, title: "Analytics Overview", duration: "13:15", completed: true },
        { id: 2, title: "Business Questions", duration: "18:15", completed: true },
        { id: 3, title: "Data Sources", duration: "23:15", completed: true }
      ],
    },
    {
      id: 2,
      title: "Metrics and KPIs",
      duration: "55 min",
      completed: true,
      lessons: [
        { id: 1, title: "Choosing KPIs", duration: "13:15", completed: true },
        { id: 2, title: "Performance Measurement", duration: "18:15", completed: true },
        { id: 3, title: "Benchmarking", duration: "23:15", completed: true }
      ],
    },
    {
      id: 3,
      title: "Dashboard Design",
      duration: "1h",
      completed: false,
      lessons: [
        { id: 1, title: "Visual Hierarchy", duration: "13:15" },
        { id: 2, title: "Chart Selection", duration: "18:15" },
        { id: 3, title: "Executive Dashboards", duration: "23:15" }
      ],
    },
    {
      id: 4,
      title: "Forecasting and Decisions",
      duration: "1h 10m",
      completed: false,
      lessons: [
        { id: 1, title: "Trend Analysis", duration: "13:15" },
        { id: 2, title: "Forecasting Basics", duration: "18:15" },
        { id: 3, title: "Decision Models", duration: "23:15" }
      ],
    }
  ],
};

export default function Page() {
  return <CourseDetailLayout course={businessCourse} />;
}
