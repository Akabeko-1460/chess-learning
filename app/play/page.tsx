import Link from "next/link";

const modes = [
  {
    href: "/play/cpu",
    icon: "ri-robot-2-line",
    title: "CPU対戦",
    description: "コンピューターと対戦します。4段階の難易度から選べます。",
  },
  {
    href: "/play/local",
    icon: "ri-group-line",
    title: "ローカル対人戦",
    description: "同じデバイスで友達と対局。交互に手を指して楽しめます。",
  },
];

export default function PlayPage() {
  return (
    <div className="min-h-screen bg-surface px-6 py-20 md:px-[100px]">
      <div className="mb-16 text-center animate-[fade-in-up_0.6s_ease-out]">
        <h1 className="mb-4 font-serif text-4xl text-navy md:text-[48px]">プレイモード</h1>
        <p className="text-lg text-text-secondary">対戦モードを選んでゲームを始めましょう。</p>
      </div>
      <div className="mx-auto grid max-w-3xl grid-cols-1 gap-8 md:grid-cols-2">
        {modes.map((mode, i) => (
          <Link
            key={mode.href}
            href={mode.href}
            className="group rounded-2xl border border-border bg-white p-10 transition-all duration-300 hover:-translate-y-2 hover:border-card-hover-border hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
            style={{
              opacity: 0,
              animation: `fade-in-up 0.6s ease-out ${0.15 + i * 0.15}s forwards`,
            }}
          >
            <div className="mb-6 flex h-[80px] w-[80px] items-center justify-center rounded-xl bg-[#EDF2F7] text-[40px] text-navy-light transition-colors group-hover:bg-navy-light group-hover:text-white">
              <i className={mode.icon} />
            </div>
            <h2 className="mb-3 text-2xl font-bold text-text-primary">{mode.title}</h2>
            <p className="leading-relaxed text-text-secondary">{mode.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
