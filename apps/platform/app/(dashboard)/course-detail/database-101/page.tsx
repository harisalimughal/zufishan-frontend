import { CourseDetailLayout } from "../components/CourseDetailLayout";

const databaseCourse = {
  title: "Database 101",
  subtitle: "From Basics to Advanced SQL",
  description: "Learn database fundamentals, design, SQL, normalisation and advanced concepts through practical examples.",
  category: "Database",
  instructor: "Prof. Lucas (AI)",
  instructorRole: "Database Systems Expert",
  rating: 4.9,
  ratings: "1.2K ratings",
  students: "8.5K",
  level: "Beginner",
  duration: "8 Weeks",
  totalLessons: 32,
  liveClasses: 16,
  certificate: true,
  language: "English",
  updatedAt: "May 20, 2026",
  badge: "Bestseller",
  progress: 72,
  completedLessons: 23,
  attendedClasses: 11,
  submittedAssignments: 5,
  outcomes: [
    "Design and model relational databases",
    "Write efficient SQL queries",
    "Understand database normalisation",
    "Use joins, subqueries and views",
    "Optimise indexes and performance"
  ],
  curriculum: [
    {
      id: 1,
      title: "Introduction to Databases",
      duration: "40 min",
      completed: true,
      lessons: [
        { id: 1, title: "What is a Database?", duration: "13:15", completed: true },
        { id: 2, title: "Database Types", duration: "18:15", completed: true },
        { id: 3, title: "Relational Database Concepts", duration: "23:15", completed: true }
      ],
    },
    {
      id: 2,
      title: "Entity Relationship Modelling",
      duration: "55 min",
      completed: true,
      lessons: [
        { id: 1, title: "Entities and Attributes", duration: "13:15", completed: true },
        { id: 2, title: "Relationships and Cardinality", duration: "18:15", completed: true },
        { id: 3, title: "Creating ER Diagrams", duration: "23:15", completed: true }
      ],
    },
    {
      id: 3,
      title: "SQL Fundamentals",
      duration: "1h 10m",
      completed: false,
      lessons: [
        { id: 1, title: "SELECT Statements", duration: "13:15" },
        { id: 2, title: "INSERT, UPDATE and DELETE", duration: "18:15" },
        { id: 3, title: "Filtering and Sorting", duration: "23:15" }
      ],
    },
    {
      id: 4,
      title: "Normalisation",
      duration: "1h",
      completed: false,
      lessons: [
        { id: 1, title: "What is Normalisation?", duration: "13:15" },
        { id: 2, title: "1NF, 2NF and 3NF", duration: "18:15" },
        { id: 3, title: "BCNF and Practical Examples", duration: "23:15" }
      ],
    }
  ],
};

export default function Page() {
  return <CourseDetailLayout course={databaseCourse} />;
}
