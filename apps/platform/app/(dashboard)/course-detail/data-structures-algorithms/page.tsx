import { CourseDetailLayout } from "../components/CourseDetailLayout";

const dsaCourse = {
  title: "Data Structures & Algorithms",
  subtitle: "Ace Your Coding Interviews",
  description: "Master arrays, linked lists, stacks, queues, trees, graphs, sorting and algorithmic problem solving.",
  category: "Programming",
  instructor: "Prof. Zoe (AI)",
  instructorRole: "Algorithms Instructor",
  rating: 4.8,
  ratings: "821 ratings",
  students: "6.1K",
  level: "Intermediate",
  duration: "10 Weeks",
  totalLessons: 38,
  liveClasses: 16,
  certificate: true,
  language: "English",
  updatedAt: "July 18, 2026",
  badge: "New",
  progress: 35,
  completedLessons: 13,
  attendedClasses: 6,
  submittedAssignments: 3,
  outcomes: [
    "Select suitable data structures",
    "Analyse algorithm complexity",
    "Implement searching and sorting",
    "Solve tree and graph problems",
    "Prepare for coding interviews"
  ],
  curriculum: [
    {
      id: 1,
      title: "Algorithm Analysis",
      duration: "45 min",
      completed: true,
      lessons: [
        { id: 1, title: "Time Complexity", duration: "13:15", completed: true },
        { id: 2, title: "Space Complexity", duration: "18:15", completed: true },
        { id: 3, title: "Big O Notation", duration: "23:15", completed: true }
      ],
    },
    {
      id: 2,
      title: "Linear Data Structures",
      duration: "1h",
      completed: true,
      lessons: [
        { id: 1, title: "Arrays", duration: "13:15", completed: true },
        { id: 2, title: "Linked Lists", duration: "18:15", completed: true },
        { id: 3, title: "Stacks and Queues", duration: "23:15", completed: true }
      ],
    },
    {
      id: 3,
      title: "Trees and Graphs",
      duration: "1h 20m",
      completed: false,
      lessons: [
        { id: 1, title: "Binary Trees", duration: "13:15" },
        { id: 2, title: "Graph Representation", duration: "18:15" },
        { id: 3, title: "Traversal Algorithms", duration: "23:15" }
      ],
    },
    {
      id: 4,
      title: "Searching and Sorting",
      duration: "1h 15m",
      completed: false,
      lessons: [
        { id: 1, title: "Binary Search", duration: "13:15" },
        { id: 2, title: "Merge Sort", duration: "18:15" },
        { id: 3, title: "Quick Sort", duration: "23:15" }
      ],
    }
  ],
};

export default function Page() {
  return <CourseDetailLayout course={dsaCourse} />;
}
