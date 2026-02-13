import Link from "next/link";
import { rulesModule } from "@/app/data/tutorials/rules";
import { openingsModule } from "@/app/data/tutorials/openings";
import { strategyModule } from "@/app/data/tutorials/strategy";

const modules = [rulesModule, openingsModule, strategyModule];

export default function TutorialPage() {
  return (
    <div className="min-h-screen bg-surface px-6 py-20 md:px-[100px]">
      <div className="mb-16 text-center">
        <h1 className="mb-4 font-serif text-4xl text-navy md:text-[48px]">チュートリアル</h1>
        <p className="text-lg text-text-secondary">
          基礎から応用まで、体系的にチェスを学びましょう。
        </p>
      </div>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 md:grid-cols-3">
        {modules.map((mod) => (
          <Link
            key={mod.id}
            href={`/tutorial/${mod.id}`}
            className="group rounded-2xl border border-border bg-white px-8 py-10 transition-all duration-300 hover:-translate-y-2 hover:border-card-hover-border hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
          >
            <div className="mb-6 flex h-[70px] w-[70px] items-center justify-center rounded-xl bg-[#EDF2F7] text-[32px] text-navy-light transition-colors group-hover:bg-navy-light group-hover:text-white">
              <i className={mod.icon} />
            </div>
            <h2 className="mb-3 text-2xl font-bold text-text-primary">{mod.title}</h2>
            <p className="mb-6 leading-relaxed text-text-secondary">{mod.description}</p>
            <div className="text-sm font-medium text-muted">
              {mod.lessons.length} レッスン
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
