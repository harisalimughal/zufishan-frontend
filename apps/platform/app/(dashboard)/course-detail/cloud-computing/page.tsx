import { CourseDetailLayout } from "../components/CourseDetailLayout";

const cloudCourse = {
  title: "Cloud Computing Essentials",
  subtitle: "AWS, Azure & Cloud Fundamentals",
  description: "Learn cloud services, deployment models, storage, networking, virtualisation and cloud security.",
  category: "Cloud Computing",
  instructor: "Prof. Mia (AI)",
  instructorRole: "Cloud Solutions Architect",
  rating: 4.6,
  ratings: "643 ratings",
  students: "4.8K",
  level: "Beginner",
  duration: "9 Weeks",
  totalLessons: 34,
  liveClasses: 15,
  certificate: true,
  language: "English",
  updatedAt: "May 30, 2026",
  progress: 29,
  completedLessons: 10,
  attendedClasses: 5,
  submittedAssignments: 2,
  outcomes: [
    "Explain cloud service models",
    "Compare AWS and Azure",
    "Deploy basic cloud resources",
    "Understand cloud networking",
    "Apply foundational cloud security"
  ],
  curriculum: [
    {
      id: 1,
      title: "Cloud Fundamentals",
      duration: "45 min",
      completed: true,
      lessons: [
        { id: 1, title: "What is Cloud Computing?", duration: "13:15", completed: true },
        { id: 2, title: "Service Models", duration: "18:15", completed: true },
        { id: 3, title: "Deployment Models", duration: "23:15", completed: true }
      ],
    },
    {
      id: 2,
      title: "Compute and Storage",
      duration: "1h",
      completed: true,
      lessons: [
        { id: 1, title: "Virtual Machines", duration: "13:15", completed: true },
        { id: 2, title: "Object Storage", duration: "18:15", completed: true },
        { id: 3, title: "Managed Databases", duration: "23:15", completed: true }
      ],
    },
    {
      id: 3,
      title: "Cloud Networking",
      duration: "1h 10m",
      completed: false,
      lessons: [
        { id: 1, title: "Virtual Networks", duration: "13:15" },
        { id: 2, title: "Load Balancers", duration: "18:15" },
        { id: 3, title: "DNS and CDN", duration: "23:15" }
      ],
    },
    {
      id: 4,
      title: "Cloud Security",
      duration: "1h",
      completed: false,
      lessons: [
        { id: 1, title: "Identity and Access", duration: "13:15" },
        { id: 2, title: "Encryption", duration: "18:15" },
        { id: 3, title: "Monitoring and Compliance", duration: "23:15" }
      ],
    }
  ],
};

export default function Page() {
  return <CourseDetailLayout course={cloudCourse} />;
}
