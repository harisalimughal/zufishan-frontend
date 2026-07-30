import { CourseDetailLayout } from "../components/CourseDetailLayout";

const pythonCourse = {
  title: "Python Programming",
  subtitle: "Master Python from Scratch",
  description: "Learn Python syntax, control flow, functions, object-oriented programming, files, APIs and practical development.",
  category: "Programming",
  instructor: "Prof. Ethan (AI)",
  instructorRole: "Python Software Engineer",
  rating: 4.8,
  ratings: "980 ratings",
  students: "7.2K",
  level: "Beginner",
  duration: "10 Weeks",
  totalLessons: 40,
  liveClasses: 18,
  certificate: true,
  language: "English",
  updatedAt: "June 12, 2026",
  progress: 46,
  completedLessons: 18,
  attendedClasses: 8,
  submittedAssignments: 4,
  outcomes: [
    "Write clean Python programs",
    "Use functions and modules",
    "Apply object-oriented programming",
    "Work with files and APIs",
    "Build complete Python projects"
  ],
  curriculum: [
    {
      id: 1,
      title: "Introduction to Python",
      duration: "45 min",
      completed: true,
      lessons: [
        { id: 1, title: "Python Overview", duration: "13:15", completed: true },
        { id: 2, title: "Installing Python", duration: "18:15", completed: true },
        { id: 3, title: "Your First Python Program", duration: "23:15", completed: true }
      ],
    },
    {
      id: 2,
      title: "Variables and Data Types",
      duration: "1h",
      completed: true,
      lessons: [
        { id: 1, title: "Variables and Assignment", duration: "13:15", completed: true },
        { id: 2, title: "Strings and Numbers", duration: "18:15", completed: true },
        { id: 3, title: "Lists, Tuples and Dictionaries", duration: "23:15", completed: true }
      ],
    },
    {
      id: 3,
      title: "Control Flow",
      duration: "1h 15m",
      completed: false,
      lessons: [
        { id: 1, title: "Conditional Statements", duration: "13:15" },
        { id: 2, title: "For Loops", duration: "18:15" },
        { id: 3, title: "While Loops", duration: "23:15" }
      ],
    },
    {
      id: 4,
      title: "Functions and Modules",
      duration: "1h 20m",
      completed: false,
      lessons: [
        { id: 1, title: "Creating Functions", duration: "13:15" },
        { id: 2, title: "Arguments and Return Values", duration: "18:15" },
        { id: 3, title: "Using Python Modules", duration: "23:15" }
      ],
    }
  ],
};

export default function Page() {
  return <CourseDetailLayout course={pythonCourse} />;
}
