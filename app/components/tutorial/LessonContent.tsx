"use client";

import type { LessonStep } from "@/app/data/tutorials/types";

interface LessonContentProps {
  steps: LessonStep[];
  stepIndex: number;
}

export default function LessonContent({ steps, stepIndex }: LessonContentProps) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <div className="mb-3 text-sm text-text-secondary">
        <span>
          ステップ {stepIndex + 1} / {steps.length}
        </span>
      </div>
      <div className="mb-4 h-1.5 w-full overflow-hidden rounded-full bg-[#EDF2F7]">
        <div
          className="h-full rounded-full bg-accent-green transition-all duration-300"
          style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}
        />
      </div>
      <p className="whitespace-pre-line text-lg leading-relaxed text-text-primary">
        {steps[stepIndex].instruction}
      </p>
    </div>
  );
}
