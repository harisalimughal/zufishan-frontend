import { CourseDetailLayout } from "../components/CourseDetailLayout";

const pythonCourse = {
  title: "Qur'anic Arabic for Beginners",
  subtitle: "Read and Understand Qur'anic Arabic from Scratch",
  description: "Learn Arabic grammar (Nahw) and morphology (Sarf) built specifically around understanding the Qur'an's vocabulary and sentence structure.",
  category: "Arabic Language",
  instructor: "Ustaz Yusuf Rahman",
  instructorRole: "Arabic Language Instructor",
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
    "Recognise core Qur'anic vocabulary roots",
    "Understand basic Arabic sentence structure",
    "Identify verb forms and conjugation patterns",
    "Translate simple ayat without a dictionary",
    "Read unvocalised Qur'anic text with confidence"
  ],
  curriculum: [
    {
      id: 1,
      title: "The Arabic Alphabet",
      duration: "45 min",
      completed: true,
      lessons: [
        { id: 1, title: "Alphabet Overview", duration: "13:15", completed: true },
        { id: 2, title: "Letter Forms & Joining", duration: "18:15", completed: true },
        { id: 3, title: "Reading Your First Words", duration: "23:15", completed: true }
      ],
    },
    {
      id: 2,
      title: "Nouns & Root Letters",
      duration: "1h",
      completed: true,
      lessons: [
        { id: 1, title: "The Three-Letter Root System", duration: "13:15", completed: true },
        { id: 2, title: "Definite & Indefinite Nouns", duration: "18:15", completed: true },
        { id: 3, title: "Singular, Dual & Plural", duration: "23:15", completed: true }
      ],
    },
    {
      id: 3,
      title: "Verbs & Tenses",
      duration: "1h 15m",
      completed: false,
      lessons: [
        { id: 1, title: "Past Tense Verbs", duration: "13:15" },
        { id: 2, title: "Present Tense Verbs", duration: "18:15" },
        { id: 3, title: "Command Form Verbs", duration: "23:15" }
      ],
    },
    {
      id: 4,
      title: "Sentence Structure",
      duration: "1h 20m",
      completed: false,
      lessons: [
        { id: 1, title: "Verbal Sentences", duration: "13:15" },
        { id: 2, title: "Nominal Sentences", duration: "18:15" },
        { id: 3, title: "Reading Qur'anic Verses", duration: "23:15" }
      ],
    }
  ],
};

export default function Page() {
  return <CourseDetailLayout course={pythonCourse} />;
}
