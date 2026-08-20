import { CourseDetailLayout } from "../components/CourseDetailLayout";

const dsaCourse = {
  title: "Fiqh of Worship: Salah & Purification",
  subtitle: "Master the Rulings of Salah From Wudu to Witr",
  description: "A practical walkthrough of the fiqh of purification (Taharah) and prayer (Salah), covering the conditions, obligatory acts and common mistakes.",
  category: "Fiqh & Aqeedah",
  instructor: "Ustaza Amina Yusuf",
  instructorRole: "Fiqh Instructor",
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
    "Perform Wudu correctly according to the Sunnah",
    "Understand the conditions and pillars of Salah",
    "Distinguish Fard, Wajib and Sunnah acts in prayer",
    "Correct common mistakes in daily prayer",
    "Perform Witr and other Sunnah prayers confidently"
  ],
  curriculum: [
    {
      id: 1,
      title: "Taharah (Purification)",
      duration: "45 min",
      completed: true,
      lessons: [
        { id: 1, title: "Wudu Step by Step", duration: "13:15", completed: true },
        { id: 2, title: "What Invalidates Wudu", duration: "18:15", completed: true },
        { id: 3, title: "Ghusl (Ritual Bath)", duration: "23:15", completed: true }
      ],
    },
    {
      id: 2,
      title: "Conditions & Pillars of Salah",
      duration: "1h",
      completed: true,
      lessons: [
        { id: 1, title: "Conditions Before Prayer", duration: "13:15", completed: true },
        { id: 2, title: "The Pillars (Arkan) of Salah", duration: "18:15", completed: true },
        { id: 3, title: "Obligatory Acts (Wajibat)", duration: "23:15", completed: true }
      ],
    },
    {
      id: 3,
      title: "Fard Prayers",
      duration: "1h 20m",
      completed: false,
      lessons: [
        { id: 1, title: "Fajr and Dhuhr", duration: "13:15" },
        { id: 2, title: "Asr and Maghrib", duration: "18:15" },
        { id: 3, title: "Isha and Combining Prayers", duration: "23:15" }
      ],
    },
    {
      id: 4,
      title: "Sunnah & Witr Prayers",
      duration: "1h 15m",
      completed: false,
      lessons: [
        { id: 1, title: "Sunnah Mu'akkadah", duration: "13:15" },
        { id: 2, title: "Witr Prayer", duration: "18:15" },
        { id: 3, title: "Common Mistakes to Avoid", duration: "23:15" }
      ],
    }
  ],
};

export default function Page() {
  return <CourseDetailLayout course={dsaCourse} />;
}
