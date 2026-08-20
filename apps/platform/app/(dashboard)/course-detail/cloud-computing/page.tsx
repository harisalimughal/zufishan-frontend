import { CourseDetailLayout } from "../components/CourseDetailLayout";

const cloudCourse = {
  title: "Hifz Journey: Juz Amma",
  subtitle: "Memorise the 30th Juz With a Structured Method",
  description: "A structured Hifz program for memorising Juz Amma, with teacher-verified revision cycles and daily retention tracking.",
  category: "Hifz Program",
  instructor: "Ustaza Hana Ibrahim",
  instructorRole: "Hifz Program Coordinator",
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
    "Memorise Surahs An-Naba through Al-Balad",
    "Apply correct Tajweed while reciting from memory",
    "Complete daily Sabaq and Sabqi revision",
    "Build a sustainable daily memorisation habit",
    "Recite Juz Amma fluently without a mistake"
  ],
  curriculum: [
    {
      id: 1,
      title: "Getting Started with Hifz",
      duration: "45 min",
      completed: true,
      lessons: [
        { id: 1, title: "What is Hifz?", duration: "13:15", completed: true },
        { id: 2, title: "Sabaq, Sabqi and Manzil Explained", duration: "18:15", completed: true },
        { id: 3, title: "Setting a Daily Routine", duration: "23:15", completed: true }
      ],
    },
    {
      id: 2,
      title: "Surahs An-Naba to An-Nazi'at",
      duration: "1h",
      completed: true,
      lessons: [
        { id: 1, title: "Surah An-Naba", duration: "13:15", completed: true },
        { id: 2, title: "Surah An-Nazi'at", duration: "18:15", completed: true },
        { id: 3, title: "First Revision Cycle", duration: "23:15", completed: true }
      ],
    },
    {
      id: 3,
      title: "Surahs Abasa to Al-Buruj",
      duration: "1h 10m",
      completed: false,
      lessons: [
        { id: 1, title: "Surah Abasa & At-Takwir", duration: "13:15" },
        { id: 2, title: "Surah Al-Infitar & Al-Mutaffifin", duration: "18:15" },
        { id: 3, title: "Surah Al-Inshiqaq & Al-Buruj", duration: "23:15" }
      ],
    },
    {
      id: 4,
      title: "Surahs At-Tariq to Al-Balad",
      duration: "1h",
      completed: false,
      lessons: [
        { id: 1, title: "Surah At-Tariq & Al-A'la", duration: "13:15" },
        { id: 2, title: "Surah Al-Ghashiyah & Al-Fajr", duration: "18:15" },
        { id: 3, title: "Surah Al-Balad & Final Revision", duration: "23:15" }
      ],
    }
  ],
};

export default function Page() {
  return <CourseDetailLayout course={cloudCourse} />;
}
