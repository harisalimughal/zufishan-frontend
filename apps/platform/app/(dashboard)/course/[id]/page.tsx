type CoursePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export function generateStaticParams() {
  return [{ id: "placeholder" }];
}

export default async function CoursePage({ params }: CoursePageProps) {
  await params;

  return <h1>Course</h1>;
}
