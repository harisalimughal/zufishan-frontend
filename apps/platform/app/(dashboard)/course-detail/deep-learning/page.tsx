import { CourseDetailLayout } from "../components/CourseDetailLayout";

const deepLearningCourse = {
  title: "Deep Learning Fundamentals",
  subtitle: "Neural Networks & Beyond",
  description: "Explore neural networks, optimisation, convolutional models and practical deep-learning workflows.",
  category: "AI & ML",
  instructor: "Prof. Ava (AI)",
  instructorRole: "Deep Learning Researcher",
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
    "Understand neural networks",
    "Train models using backpropagation",
    "Build convolutional networks",
    "Work with sequence models",
    "Complete a deep-learning project"
  ],
  curriculum: [
    {
      id: 1,
      title: "Neural Network Foundations",
      duration: "50 min",
      completed: true,
      lessons: [
        { id: 1, title: "Neurons and Layers", duration: "13:15", completed: true },
        { id: 2, title: "Activation Functions", duration: "18:15", completed: true },
        { id: 3, title: "Forward Propagation", duration: "23:15", completed: true }
      ],
    },
    {
      id: 2,
      title: "Training Deep Networks",
      duration: "1h 15m",
      completed: true,
      lessons: [
        { id: 1, title: "Loss Functions", duration: "13:15", completed: true },
        { id: 2, title: "Backpropagation", duration: "18:15", completed: true },
        { id: 3, title: "Optimisers", duration: "23:15", completed: true }
      ],
    },
    {
      id: 3,
      title: "Convolutional Networks",
      duration: "1h 20m",
      completed: false,
      lessons: [
        { id: 1, title: "Convolution Layers", duration: "13:15" },
        { id: 2, title: "Pooling", duration: "18:15" },
        { id: 3, title: "Image Classification", duration: "23:15" }
      ],
    },
    {
      id: 4,
      title: "Sequence Models",
      duration: "1h 10m",
      completed: false,
      lessons: [
        { id: 1, title: "RNNs", duration: "13:15" },
        { id: 2, title: "LSTMs", duration: "18:15" },
        { id: 3, title: "Sequence Applications", duration: "23:15" }
      ],
    }
  ],
};

export default function Page() {
  return <CourseDetailLayout course={deepLearningCourse} />;
}
