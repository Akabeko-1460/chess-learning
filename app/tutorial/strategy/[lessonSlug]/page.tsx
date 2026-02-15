import { strategyModule } from "@/app/data/tutorials/strategy";
import LessonPageContent from "@/app/components/tutorial/LessonPageContent";

export default function StrategyLessonPage({
  params,
}: {
  params: Promise<{ lessonSlug: string }>;
}) {
  return (
    <LessonPageContent
      module={strategyModule}
      categorySlug="strategy"
      params={params}
    />
  );
}
