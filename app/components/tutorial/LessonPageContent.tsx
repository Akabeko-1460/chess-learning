"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { TutorialModule } from "@/app/data/tutorials/types";
import { markLessonCompleted } from "@/app/lib/progress";
import InteractiveBoard from "./InteractiveBoard";
import LessonContent from "./LessonContent";
import LessonNavigation from "./LessonNavigation";

interface LessonPageContentProps {
  module: TutorialModule;
  categorySlug: string;
  params: Promise<{ lessonSlug: string }>;
}

export default function LessonPageContent({
  module,
  categorySlug,
  params,
}: LessonPageContentProps) {
  const { lessonSlug } = use(params);
  const lesson = module.lessons.find((l) => l.slug === lessonSlug);
  if (!lesson) notFound();

  const lessonIndex = module.lessons.findIndex((l) => l.slug === lessonSlug);
  const nextLesson = module.lessons[lessonIndex + 1];

  const [stepIndex, setStepIndex] = useState(0);
  const step = lesson.steps[stepIndex];

  const isLastStep = stepIndex === lesson.steps.length - 1;
  useEffect(() => {
    if (isLastStep) {
      markLessonCompleted(module.id, lesson.slug);
    }
  }, [isLastStep, module.id, lesson.slug]);

  return (
    <div className="min-h-screen bg-surface px-4 py-10 md:px-[60px]">
      <h1 className="mb-8 text-center font-serif text-3xl text-navy">
        {lesson.title}
      </h1>
      <div className="mx-auto flex max-w-5xl flex-col items-start gap-8 lg:flex-row">
        <div className="relative w-full lg:w-auto">
          <Link
            href={`/tutorial/${categorySlug}`}
            className="absolute -top-8 left-0 inline-flex items-center gap-1 text-sm text-text-secondary transition-colors hover:text-navy"
          >
            <i className="ri-arrow-go-back-line" /> 一覧に戻る
          </Link>
          <InteractiveBoard key={`${lessonSlug}-${stepIndex}`} step={step} />
        </div>
        <div className="flex w-full flex-col gap-4 lg:w-96">
          <LessonContent steps={lesson.steps} stepIndex={stepIndex} />
          <LessonNavigation
            onPrev={() => setStepIndex(Math.max(0, stepIndex - 1))}
            onNext={() =>
              setStepIndex(Math.min(lesson.steps.length - 1, stepIndex + 1))
            }
            hasPrev={stepIndex > 0}
            hasNext={stepIndex < lesson.steps.length - 1}
            nextLessonHref={
              nextLesson
                ? `/tutorial/${categorySlug}/${nextLesson.slug}`
                : undefined
            }
          />
        </div>
      </div>
    </div>
  );
}
