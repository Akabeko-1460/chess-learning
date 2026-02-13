import Link from "next/link";
import { strategyModule } from "@/app/data/tutorials/strategy";

export default function StrategyPage() {
  return (
    <div className="min-h-screen bg-surface px-6 py-20 md:px-[100px]">
      <div className="mb-4">
        <Link href="/tutorial" className="flex items-center gap-1 text-sm text-text-secondary hover:text-navy">
          <i className="ri-arrow-left-line" /> チュートリアル一覧
        </Link>
      </div>
      <div className="mb-12">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EDF2F7] text-2xl text-navy-light">
            <i className={strategyModule.icon} />
          </div>
          <h1 className="font-serif text-3xl text-navy md:text-4xl">{strategyModule.title}</h1>
        </div>
        <p className="text-lg text-text-secondary">{strategyModule.description}</p>
      </div>
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-2">
        {strategyModule.lessons.map((lesson, i) => (
          <Link
            key={lesson.slug}
            href={`/tutorial/strategy/${lesson.slug}`}
            className="group flex items-center gap-4 rounded-xl border border-border bg-white p-5 transition-all hover:border-card-hover-border hover:shadow-md"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EDF2F7] text-sm font-bold text-navy-light group-hover:bg-navy-light group-hover:text-white">
              {i + 1}
            </div>
            <div>
              <h3 className="font-bold text-text-primary">{lesson.title}</h3>
              <p className="text-sm text-text-secondary">{lesson.description}</p>
            </div>
            <i className="ri-arrow-right-s-line ml-auto text-xl text-muted" />
          </Link>
        ))}
      </div>
    </div>
  );
}
