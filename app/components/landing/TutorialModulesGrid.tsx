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

export default function TutorialModulesGrid() {
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
    <section className="bg-white px-6 py-[100px] md:px-[100px]">
      <div className="mb-20 text-center">
        <h2 className="mb-4 font-serif text-4xl text-navy md:text-[48px]">
          体系的な学習パス
        </h2>
        <p className="text-lg text-text-secondary">
          基礎から応用まで、カリキュラムに沿って学びましょう。
        </p>
      </div>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
        {modules.map((mod) => {
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
              className="group rounded-2xl border border-border bg-white px-8 py-10 transition-all duration-400 hover:-translate-y-2.5 hover:border-card-hover-border hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
            >
              <div className="mb-6 flex h-[70px] w-[70px] items-center justify-center rounded-xl bg-[#EDF2F7] text-[32px] text-navy-light transition-colors group-hover:bg-navy-light group-hover:text-white">
                <i className={mod.data.icon} />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-text-primary">
                {mod.data.title}
              </h3>
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
    </section>
  );
}
