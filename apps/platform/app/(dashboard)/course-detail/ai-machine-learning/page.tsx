import { CourseDetailLayout } from "../components/CourseDetailLayout";

const aiCourse = {
  title: "Hadith Sciences: An Introduction",
  subtitle: "Understanding Sanad, Matn and Authentication",
  description: "An introduction to the science of Hadith — how narrations are graded, verified and preserved through chains of narration (isnad).",
  category: "Hadith & Seerah",
  instructor: "Ustaza Maryam Siddiqui",
  instructorRole: "Hadith Sciences Instructor",
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
    "Understand the structure of a Hadith (sanad & matn)",
    "Distinguish Sahih, Hasan and Da'if narrations",
    "Trace a chain of narration (isnad)",
    "Recognise the major Hadith collections",
    "Apply Hadith terminology correctly"
  ],
  curriculum: [
    {
      id: 1,
      title: "Introduction to Hadith Sciences",
      duration: "50 min",
      completed: true,
      lessons: [
        { id: 1, title: "What is a Hadith?", duration: "13:15", completed: true },
        { id: 2, title: "Why Hadith Sciences Matter", duration: "18:15", completed: true },
        { id: 3, title: "Sanad and Matn Explained", duration: "23:15", completed: true }
      ],
    },
    {
      id: 2,
      title: "Grading Narrations",
      duration: "1h",
      completed: true,
      lessons: [
        { id: 1, title: "Sahih (Authentic)", duration: "13:15", completed: true },
        { id: 2, title: "Hasan (Good)", duration: "18:15", completed: true },
        { id: 3, title: "Da'if (Weak)", duration: "23:15", completed: true }
      ],
    },
    {
      id: 3,
      title: "The Six Books (Kutub al-Sittah)",
      duration: "1h 20m",
      completed: false,
      lessons: [
        { id: 1, title: "Sahih al-Bukhari", duration: "13:15" },
        { id: 2, title: "Sahih Muslim", duration: "18:15" },
        { id: 3, title: "The Remaining Four Books", duration: "23:15" }
      ],
    },
    {
      id: 4,
      title: "Applying Hadith in Daily Life",
      duration: "1h 10m",
      completed: false,
      lessons: [
        { id: 1, title: "Hadith on Worship", duration: "13:15" },
        { id: 2, title: "Hadith on Character", duration: "18:15" },
        { id: 3, title: "Case Study: Verifying a Narration", duration: "23:15" }
      ],
    }
  ],
};

export default function Page() {
  return <CourseDetailLayout course={aiCourse} />;
}
