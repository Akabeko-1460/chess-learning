"use client";

import Link from "next/link";

interface LessonNavigationProps {
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  nextLessonHref?: string;
}

export default function LessonNavigation({
  onPrev,
  onNext,
  hasPrev,
  hasNext,
  nextLessonHref,
}: LessonNavigationProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-3">
        <button
          onClick={onPrev}
          disabled={!hasPrev}
          className="flex items-center gap-1 rounded-md border border-border px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:bg-light-gray disabled:cursor-not-allowed disabled:opacity-40"
        >
          <i className="ri-arrow-left-line" /> 前へ
        </button>
        <button
          onClick={onNext}
          disabled={!hasNext}
          className="flex items-center gap-1 rounded-md bg-navy px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-navy-light disabled:cursor-not-allowed disabled:opacity-40"
        >
          次へ <i className="ri-arrow-right-line" />
        </button>
      </div>
      {nextLessonHref && (
        <Link
          href={nextLessonHref}
          className="flex items-center gap-1 rounded-md bg-accent-green px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-green/80"
        >
          次のレッスン <i className="ri-arrow-right-s-line" />
        </Link>
      )}
    </div>
  );
}
