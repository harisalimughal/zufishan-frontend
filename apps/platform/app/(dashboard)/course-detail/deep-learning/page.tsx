import { CourseDetailLayout } from "../components/CourseDetailLayout";

const deepLearningCourse = {
  title: "Aqeedah: Foundations of Islamic Belief",
  subtitle: "Tawhid, the Pillars of Iman, and Common Misconceptions",
  description: "A structured study of Islamic creed (Aqeedah) — the oneness of Allah, the pillars of faith, and how to recognise and avoid common doctrinal errors.",
  category: "Fiqh & Aqeedah",
  instructor: "Ustaz Bilal Ahmad",
  instructorRole: "Aqeedah Instructor",
  rating: 4.9,
  ratings: "1.1K ratings",
  students: "6.7K",
  level: "Advanced",
  duration: "12 Weeks",
  totalLessons: 46,
  liveClasses: 20,
  certificate: true,
  language: "English",
  updatedAt: "July 10, 2026",
  progress: 40,
  completedLessons: 18,
  attendedClasses: 7,
  submittedAssignments: 4,
  outcomes: [
    "Explain the meaning and categories of Tawhid",
    "Describe the six pillars of Iman",
    "Recognise common misconceptions in belief",
    "Understand the names and attributes of Allah",
    "Apply sound Aqeedah to everyday life"
  ],
  curriculum: [
    {
      id: 1,
      title: "Understanding Tawhid",
      duration: "50 min",
      completed: true,
      lessons: [
        { id: 1, title: "Tawhid ar-Rububiyyah", duration: "13:15", completed: true },
        { id: 2, title: "Tawhid al-Uluhiyyah", duration: "18:15", completed: true },
        { id: 3, title: "Tawhid al-Asma was-Sifat", duration: "23:15", completed: true }
      ],
    },
    {
      id: 2,
      title: "The Pillars of Iman",
      duration: "1h 15m",
      completed: true,
      lessons: [
        { id: 1, title: "Belief in Allah and the Angels", duration: "13:15", completed: true },
        { id: 2, title: "Belief in the Books and Messengers", duration: "18:15", completed: true },
        { id: 3, title: "Belief in the Last Day and Qadr", duration: "23:15", completed: true }
      ],
    },
    {
      id: 3,
      title: "Common Misconceptions",
      duration: "1h 20m",
      completed: false,
      lessons: [
        { id: 1, title: "Shirk and Its Forms", duration: "13:15" },
        { id: 2, title: "Bid'ah in Belief", duration: "18:15" },
        { id: 3, title: "Distinguishing Culture from Creed", duration: "23:15" }
      ],
    },
    {
      id: 4,
      title: "Living With Sound Aqeedah",
      duration: "1h 10m",
      completed: false,
      lessons: [
        { id: 1, title: "Trust in Allah's Decree", duration: "13:15" },
        { id: 2, title: "Balancing Fear and Hope", duration: "18:15" },
        { id: 3, title: "Case Studies in Everyday Life", duration: "23:15" }
      ],
    }
  ],
};

export default function Page() {
  return <CourseDetailLayout course={deepLearningCourse} />;
}
