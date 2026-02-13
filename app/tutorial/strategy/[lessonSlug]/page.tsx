"use client";

import { useState, use } from "react";
import { notFound } from "next/navigation";
import { strategyModule } from "@/app/data/tutorials/strategy";
import InteractiveBoard from "@/app/components/tutorial/InteractiveBoard";
import LessonContent from "@/app/components/tutorial/LessonContent";
import LessonNavigation from "@/app/components/tutorial/LessonNavigation";

export default function StrategyLessonPage({ params }: { params: Promise<{ lessonSlug: string }> }) {
  const { lessonSlug } = use(params);
  const lesson = strategyModule.lessons.find((l) => l.slug === lessonSlug);
  if (!lesson) notFound();

  const [stepIndex, setStepIndex] = useState(0);
  const step = lesson.steps[stepIndex];

  return (
    <div className="min-h-screen bg-surface px-4 py-10 md:px-[60px]">
      <h1 className="mb-8 text-center font-serif text-3xl text-navy">{lesson.title}</h1>
      <div className="mx-auto flex max-w-5xl flex-col items-start gap-8 lg:flex-row">
        <div className="w-full lg:w-auto">
          <InteractiveBoard
            key={`${lessonSlug}-${stepIndex}`}
            step={step}
            onCorrectMove={() => {
              if (stepIndex < lesson.steps.length - 1) {
                setStepIndex(stepIndex + 1);
              }
            }}
          />
        </div>
        <div className="flex w-full flex-col gap-4 lg:w-96">
          <LessonContent step={step} stepIndex={stepIndex} totalSteps={lesson.steps.length} />
          <LessonNavigation
            onPrev={() => setStepIndex(Math.max(0, stepIndex - 1))}
            onNext={() => setStepIndex(Math.min(lesson.steps.length - 1, stepIndex + 1))}
            hasPrev={stepIndex > 0}
            hasNext={stepIndex < lesson.steps.length - 1}
            backHref="/tutorial/strategy"
          />
        </div>
      </div>
    </div>
  );
}
