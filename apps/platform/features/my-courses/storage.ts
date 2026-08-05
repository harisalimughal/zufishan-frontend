import type { Course } from "../course-catalog/types";

export const REGISTERED_COURSES_KEY =
  "ranenla-registered-courses";

export const REGISTERED_COURSES_EVENT =
  "registered-courses-updated";

function canUseStorage(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.localStorage !== "undefined"
  );
}

export function getRegisteredCourses(): Course[] {
  if (!canUseStorage()) {
    return [];
  }

  try {
    const storedCourses =
      window.localStorage.getItem(
        REGISTERED_COURSES_KEY,
      );

    if (!storedCourses) {
      return [];
    }

    const parsedCourses: unknown =
      JSON.parse(storedCourses);

    return Array.isArray(parsedCourses)
      ? (parsedCourses as Course[])
      : [];
  } catch (error) {
    console.error(
      "Failed to load registered courses:",
      error,
    );

    return [];
  }
}

export function isCourseRegistered(
  courseId: number,
): boolean {
  return getRegisteredCourses().some(
    (course) => course.id === courseId,
  );
}

export function registerCourse(
  course: Course,
): Course[] {
  if (!canUseStorage()) {
    return [];
  }

  const currentCourses =
    getRegisteredCourses();

  const alreadyRegistered =
    currentCourses.some(
      (item) => item.id === course.id,
    );

  const updatedCourses = alreadyRegistered
    ? currentCourses
    : [...currentCourses, course];

  window.localStorage.setItem(
    REGISTERED_COURSES_KEY,
    JSON.stringify(updatedCourses),
  );

  window.dispatchEvent(
    new Event(REGISTERED_COURSES_EVENT),
  );

  return updatedCourses;
}

export function removeRegisteredCourse(
  courseId: number,
): Course[] {
  if (!canUseStorage()) {
    return [];
  }

  const updatedCourses =
    getRegisteredCourses().filter(
      (course) => course.id !== courseId,
    );

  window.localStorage.setItem(
    REGISTERED_COURSES_KEY,
    JSON.stringify(updatedCourses),
  );

  window.dispatchEvent(
    new Event(REGISTERED_COURSES_EVENT),
  );

  return updatedCourses;
}
