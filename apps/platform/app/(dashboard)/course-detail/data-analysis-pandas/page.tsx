import { CourseDetailLayout } from "../components/CourseDetailLayout";

const pandasCourse = {
  title: "Data Analysis with Pandas",
  subtitle: "Analyze Data Like a Pro",
  description: "Clean, transform and analyse real-world datasets using Python and Pandas.",
  category: "Data Science",
  instructor: "Prof. Noah (AI)",
  instructorRole: "Data Analyst",
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
    "Load and inspect datasets",
    "Clean inconsistent data",
    "Transform data using Pandas",
    "Create useful summaries",
    "Complete a data-analysis project"
  ],
  curriculum: [
    {
      id: 1,
      title: "Pandas Foundations",
      duration: "45 min",
      completed: true,
      lessons: [
        { id: 1, title: "Series and DataFrames", duration: "13:15", completed: true },
        { id: 2, title: "Reading Data", duration: "18:15", completed: true },
        { id: 3, title: "Inspecting Datasets", duration: "23:15", completed: true }
      ],
    },
    {
      id: 2,
      title: "Data Cleaning",
      duration: "1h",
      completed: true,
      lessons: [
        { id: 1, title: "Missing Values", duration: "13:15", completed: true },
        { id: 2, title: "Duplicates", duration: "18:15", completed: true },
        { id: 3, title: "Type Conversion", duration: "23:15", completed: true }
      ],
    },
    {
      id: 3,
      title: "Data Transformation",
      duration: "1h 10m",
      completed: false,
      lessons: [
        { id: 1, title: "Filtering", duration: "13:15" },
        { id: 2, title: "Grouping", duration: "18:15" },
        { id: 3, title: "Merging Data", duration: "23:15" }
      ],
    },
    {
      id: 4,
      title: "Analysis and Reporting",
      duration: "1h",
      completed: false,
      lessons: [
        { id: 1, title: "Descriptive Statistics", duration: "13:15" },
        { id: 2, title: "Pivot Tables", duration: "18:15" },
        { id: 3, title: "Exporting Results", duration: "23:15" }
      ],
    }
  ],
};

export default function Page() {
  return <CourseDetailLayout course={pandasCourse} />;
}
