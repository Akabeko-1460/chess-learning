"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { rulesModule } from "@/app/data/tutorials/rules";
import { openingsModule } from "@/app/data/tutorials/openings";
import { strategyModule } from "@/app/data/tutorials/strategy";
import { getCompletedLessons } from "@/app/lib/progress";
import type { TutorialModule } from "@/app/data/tutorials/types";

const modules: { data: TutorialModule; href: string }[] = [
  { data: rulesModule, href: "/tutorial/rules" },
  { data: openingsModule, href: "/tutorial/openings" },
  { data: strategyModule, href: "/tutorial/strategy" },
];

export default function TutorialPage() {
  const [completedMap, setCompletedMap] = useState<Record<string, string[]>>(
    {},
  );

  useEffect(() => {
    const map: Record<string, string[]> = {};
    for (const mod of modules) {
      map[mod.data.id] = getCompletedLessons(mod.data.id);
    }
    setCompletedMap(map);
  }, []);

  return (
    <div className="min-h-screen bg-surface px-6 py-20 md:px-[100px]">
      <div className="mb-16 text-center animate-[fade-in-up_0.6s_ease-out]">
        <h1 className="mb-4 font-serif text-4xl text-navy md:text-[48px]">
          チュートリアル
        </h1>
        <p className="text-lg text-text-secondary">
          基礎から応用まで、体系的にチェスを学びましょう。
        </p>
      </div>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 md:grid-cols-3">
        {modules.map((mod, i) => {
          const total = mod.data.lessons.length;
          const completed = (completedMap[mod.data.id] ?? []).length;
          const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
          const label =
            completed === 0
              ? "未開始"
              : completed >= total
                ? "完了"
                : `${pct}%`;

          return (
            <Link
              key={mod.data.id}
              href={mod.href}
              className="group rounded-2xl border border-border bg-white px-8 py-10 transition-all duration-300 hover:-translate-y-2 hover:border-card-hover-border hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
              style={{
                opacity: 0,
                animation: `fade-in-up 0.6s ease-out ${0.15 + i * 0.15}s forwards`,
              }}
            >
              <div className="mb-6 flex h-[70px] w-[70px] items-center justify-center rounded-xl bg-[#EDF2F7] text-[32px] text-navy-light transition-colors group-hover:bg-navy-light group-hover:text-white">
                <i className={mod.data.icon} />
              </div>
              <h2 className="mb-3 text-2xl font-bold text-text-primary">
                {mod.data.title}
              </h2>
              <p className="mb-6 leading-relaxed text-text-secondary">
                {mod.data.description}
              </p>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#EDF2F7]">
                <div
                  className="h-full rounded-full bg-accent-green transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="mt-2.5 flex justify-between text-sm font-medium text-muted">
                <span>
                  {completed} / {total} レッスン
                </span>
                <span>{label}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
