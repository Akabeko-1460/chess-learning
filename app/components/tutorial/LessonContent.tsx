"use client";

import type { LessonStep } from "@/app/data/tutorials/types";

interface LessonContentProps {
  step: LessonStep;
  stepIndex: number;
  totalSteps: number;
}

export default function LessonContent({ step, stepIndex, totalSteps }: LessonContentProps) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <div className="mb-3 flex items-center justify-between text-sm text-text-secondary">
        <span>
          ステップ {stepIndex + 1} / {totalSteps}
        </span>
        {step.expectedMove && (
          <span className="flex items-center gap-1 text-navy">
            <i className="ri-drag-move-2-line" /> 駒を動かしてみよう
          </span>
        )}
      </div>
      <div className="mb-4 h-1.5 w-full overflow-hidden rounded-full bg-[#EDF2F7]">
        <div
          className="h-full rounded-full bg-accent-green transition-all duration-300"
          style={{ width: `${((stepIndex + 1) / totalSteps) * 100}%` }}
        />
      </div>
      <p className="text-lg leading-relaxed text-text-primary">{step.instruction}</p>
    </div>
  );
}
