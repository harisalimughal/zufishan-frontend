import { CourseDetailLayout } from "../components/CourseDetailLayout";

const databaseCourse = {
  title: "Tajweed Foundations",
  subtitle: "From Makharij to Advanced Recitation Rules",
  description: "Learn the foundational rules of Tajweed — correct pronunciation (makharij), articulation points, and recitation rules — through guided practice and live correction.",
  category: "Qur'an & Tajweed",
  instructor: "Ustaz Ibrahim Malik",
  instructorRole: "Certified Tajweed Instructor",
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
    "Pronounce Arabic letters from their correct makharij",
    "Apply the rules of Idgham, Ikhfa and Iqlab",
    "Recite with correct madd (elongation) durations",
    "Read Qur'anic script fluently with tashkeel",
    "Build a consistent daily recitation habit"
  ],
  curriculum: [
    {
      id: 1,
      title: "Introduction to Tajweed",
      duration: "40 min",
      completed: true,
      lessons: [
        { id: 1, title: "What is Tajweed?", duration: "13:15", completed: true },
        { id: 2, title: "Why Tajweed Matters", duration: "18:15", completed: true },
        { id: 3, title: "The Makharij (Articulation Points)", duration: "23:15", completed: true }
      ],
    },
    {
      id: 2,
      title: "Makharij al-Huruf",
      duration: "55 min",
      completed: true,
      lessons: [
        { id: 1, title: "Throat Letters (Halq)", duration: "13:15", completed: true },
        { id: 2, title: "Tongue Letters (Lisan)", duration: "18:15", completed: true },
        { id: 3, title: "Lip Letters (Shafawi)", duration: "23:15", completed: true }
      ],
    },
    {
      id: 3,
      title: "Rules of Noon Sakinah & Tanween",
      duration: "1h 10m",
      completed: false,
      lessons: [
        { id: 1, title: "Idhar (Clear Pronunciation)", duration: "13:15" },
        { id: 2, title: "Idgham (Merging)", duration: "18:15" },
        { id: 3, title: "Ikhfa (Concealment)", duration: "23:15" }
      ],
    },
    {
      id: 4,
      title: "Rules of Madd (Elongation)",
      duration: "1h",
      completed: false,
      lessons: [
        { id: 1, title: "Natural Madd", duration: "13:15" },
        { id: 2, title: "Secondary Madd Types", duration: "18:15" },
        { id: 3, title: "Practical Recitation Examples", duration: "23:15" }
      ],
    }
  ],
};

export default function Page() {
  return <CourseDetailLayout course={databaseCourse} />;
}
