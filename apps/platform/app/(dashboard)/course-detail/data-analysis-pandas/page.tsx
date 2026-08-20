import { CourseDetailLayout } from "../components/CourseDetailLayout";

const pandasCourse = {
  title: "Seerah: The Life of the Prophet ﷺ",
  subtitle: "A Chronological Journey Through the Prophetic Biography",
  description: "Study the life of Prophet Muhammad ﷺ from birth through Makkah and Madinah, drawing lessons for modern life.",
  category: "Hadith & Seerah",
  instructor: "Ustaz Khalid Farooq",
  instructorRole: "Seerah Instructor",
  rating: 4.7,
  ratings: "732 ratings",
  students: "5.4K",
  level: "Beginner",
  duration: "8 Weeks",
  totalLessons: 30,
  liveClasses: 14,
  certificate: true,
  language: "English",
  updatedAt: "June 28, 2026",
  progress: 58,
  completedLessons: 17,
  attendedClasses: 9,
  submittedAssignments: 4,
  outcomes: [
    "Trace the major events of the Makkan period",
    "Understand the Hijrah and its significance",
    "Trace the major events of the Madinan period",
    "Draw practical lessons from the Prophet's ﷺ character",
    "Build a timeline of the Prophetic biography"
  ],
  curriculum: [
    {
      id: 1,
      title: "Before Prophethood",
      duration: "45 min",
      completed: true,
      lessons: [
        { id: 1, title: "Makkah Before Islam", duration: "13:15", completed: true },
        { id: 2, title: "Birth and Early Life", duration: "18:15", completed: true },
        { id: 3, title: "The First Revelation", duration: "23:15", completed: true }
      ],
    },
    {
      id: 2,
      title: "The Makkan Period",
      duration: "1h",
      completed: true,
      lessons: [
        { id: 1, title: "Early Muslims and Persecution", duration: "13:15", completed: true },
        { id: 2, title: "The Boycott of Banu Hashim", duration: "18:15", completed: true },
        { id: 3, title: "Al-Isra wal-Mi'raj", duration: "23:15", completed: true }
      ],
    },
    {
      id: 3,
      title: "The Hijrah",
      duration: "1h 10m",
      completed: false,
      lessons: [
        { id: 1, title: "Preparations for Hijrah", duration: "13:15" },
        { id: 2, title: "The Journey to Madinah", duration: "18:15" },
        { id: 3, title: "Building the First Muslim Community", duration: "23:15" }
      ],
    },
    {
      id: 4,
      title: "The Madinan Period",
      duration: "1h",
      completed: false,
      lessons: [
        { id: 1, title: "Major Battles", duration: "13:15" },
        { id: 2, title: "Treaties and Diplomacy", duration: "18:15" },
        { id: 3, title: "The Farewell Sermon", duration: "23:15" }
      ],
    }
  ],
};

export default function Page() {
  return <CourseDetailLayout course={pandasCourse} />;
}
