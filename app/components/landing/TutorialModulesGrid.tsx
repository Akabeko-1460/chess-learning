import Link from "next/link";

const modules = [
  {
    icon: "ri-book-open-line",
    title: "基本ルール",
    description: "駒の動き方、キャスリングなどの特殊ルール、チェックメイトの基本を学びましょう。",
    lessons: 12,
    href: "/tutorial/rules",
  },
  {
    icon: "ri-sword-line",
    title: "オープニング戦略",
    description: "中央の支配と駒の展開を効率的に。人気のオープニングをマスターしましょう。",
    lessons: 8,
    href: "/tutorial/openings",
  },
  {
    icon: "ri-flag-line",
    title: "基本戦略",
    description: "駒の価値、タクティクス、ポジショナルプレイの基礎を身につけましょう。",
    lessons: 6,
    href: "/tutorial/strategy",
  },
];

export default function TutorialModulesGrid() {
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
        {modules.map((mod) => (
          <Link
            key={mod.title}
            href={mod.href}
            className="group rounded-2xl border border-border bg-white px-8 py-10 transition-all duration-400 hover:-translate-y-2.5 hover:border-card-hover-border hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
          >
            <div className="mb-6 flex h-[70px] w-[70px] items-center justify-center rounded-xl bg-[#EDF2F7] text-[32px] text-navy-light transition-colors group-hover:bg-navy-light group-hover:text-white">
              <i className={mod.icon} />
            </div>
            <h3 className="mb-3 text-2xl font-bold text-text-primary">
              {mod.title}
            </h3>
            <p className="mb-6 leading-relaxed text-text-secondary">
              {mod.description}
            </p>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#EDF2F7]">
              <div className="h-full w-0 rounded-full bg-accent-green" />
            </div>
            <div className="mt-2.5 flex justify-between text-sm font-medium text-muted">
              <span>{mod.lessons} レッスン</span>
              <span>未開始</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
