import { rulesModule } from "@/app/data/tutorials/rules";
import LessonPageContent from "@/app/components/tutorial/LessonPageContent";

export default function RulesLessonPage({
  params,
}: {
  params: Promise<{ lessonSlug: string }>;
}) {
  return (
    <LessonPageContent
      module={rulesModule}
      categorySlug="rules"
      params={params}
    />
  );
}
