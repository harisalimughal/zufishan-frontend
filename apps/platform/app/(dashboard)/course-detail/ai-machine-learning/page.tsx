import { CourseDetailLayout } from "../components/CourseDetailLayout";

const aiCourse = {
  title: "AI & Machine Learning Basics",
  subtitle: "Build Intelligent Systems",
  description: "Understand artificial intelligence and machine learning concepts and create practical predictive models.",
  category: "AI & ML",
  instructor: "Prof. Ava (AI)",
  instructorRole: "Machine Learning Specialist",
  rating: 4.9,
  ratings: "1.5K ratings",
  students: "9.3K",
  level: "Intermediate",
  duration: "12 Weeks",
  totalLessons: 44,
  liveClasses: 20,
  certificate: true,
  language: "English",
  updatedAt: "July 5, 2026",
  badge: "Bestseller",
  progress: 61,
  completedLessons: 27,
  attendedClasses: 13,
  submittedAssignments: 6,
  outcomes: [
    "Understand major AI concepts",
    "Prepare datasets for modelling",
    "Train machine-learning models",
    "Evaluate model performance",
    "Build an end-to-end AI project"
  ],
  curriculum: [
    {
      id: 1,
      title: "Introduction to AI",
      duration: "50 min",
      completed: true,
      lessons: [
        { id: 1, title: "What is Artificial Intelligence?", duration: "13:15", completed: true },
        { id: 2, title: "AI Applications", duration: "18:15", completed: true },
        { id: 3, title: "Machine Learning Overview", duration: "23:15", completed: true }
      ],
    },
    {
      id: 2,
      title: "Data Preparation",
      duration: "1h",
      completed: true,
      lessons: [
        { id: 1, title: "Data Collection", duration: "13:15", completed: true },
        { id: 2, title: "Cleaning and Preprocessing", duration: "18:15", completed: true },
        { id: 3, title: "Feature Engineering", duration: "23:15", completed: true }
      ],
    },
    {
      id: 3,
      title: "Supervised Learning",
      duration: "1h 20m",
      completed: false,
      lessons: [
        { id: 1, title: "Regression", duration: "13:15" },
        { id: 2, title: "Classification", duration: "18:15" },
        { id: 3, title: "Model Evaluation", duration: "23:15" }
      ],
    },
    {
      id: 4,
      title: "Unsupervised Learning",
      duration: "1h 10m",
      completed: false,
      lessons: [
        { id: 1, title: "Clustering", duration: "13:15" },
        { id: 2, title: "Dimensionality Reduction", duration: "18:15" },
        { id: 3, title: "Practical Case Study", duration: "23:15" }
      ],
    }
  ],
};

export default function Page() {
  return <CourseDetailLayout course={aiCourse} />;
}
