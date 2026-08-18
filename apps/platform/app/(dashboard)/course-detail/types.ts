export type CourseLesson = {
  id: number;
  title: string;
  duration: string;
  completed?: boolean;
};

export type CourseModule = {
  id: number;
  title: string;
  duration: string;
  completed?: boolean;
  lessons: CourseLesson[];
};

export type CourseDetailData = {
  id?: string | number;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  instructor: string;
  instructorRole: string;
  rating: number;
  ratings: string;
  students: string;
  level: string;
  duration: string;
  totalLessons: number;
  liveClasses: number;
  certificate: boolean;
  language: string;
  updatedAt: string;
  badge?: string;
  progress: number;
  completedLessons: number;
  attendedClasses: number;
  submittedAssignments: number;
  curriculum: CourseModule[];
  outcomes: string[];
};
