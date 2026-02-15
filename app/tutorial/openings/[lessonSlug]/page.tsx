import { openingsModule } from "@/app/data/tutorials/openings";
import LessonPageContent from "@/app/components/tutorial/LessonPageContent";

export default function OpeningsLessonPage({
  params,
}: {
  params: Promise<{ lessonSlug: string }>;
}) {
  return (
    <LessonPageContent
      module={openingsModule}
      categorySlug="openings"
      params={params}
    />
  );
}
