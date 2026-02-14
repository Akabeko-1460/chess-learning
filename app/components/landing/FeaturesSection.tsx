const features = [
  {
    icon: "ri-robot-2-line",
    title: "CPU対戦",
    description: "4段階の難易度調整が可能CPUと対戦できます。",
  },
  {
    icon: "ri-brain-line",
    title: "インタラクティブレッスン",
    description: "駒を動かしながら学べるステップバイステップのチュートリアル。",
  },
  {
    icon: "ri-gamepad-line",
    title: "ローカル対人戦",
    description: "同じデバイスで友達と対局。交互に指して楽しめます。",
  },
  {
    icon: "ri-bar-chart-line",
    title: "学習トラッキング",
    description: "チュートリアルの進捗を保存し、学習の一貫性を確認できます。",
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-navy px-6 py-[100px] text-white md:px-[100px]">
      <div className="mb-5 text-center">
        <h2 className="mb-4 font-serif text-4xl text-white md:text-[48px]">
          ChessLearnの特徴
        </h2>
        <p className="text-[#CBD5E0]">
          初心者からの上達に必要なすべてが揃っています。
        </p>
      </div>
      <div className="mt-15 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
        {features.map((f) => (
          <div
            key={f.title}
            className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm transition-transform hover:-translate-y-1 hover:bg-white/10"
          >
            <i
              className={`${f.icon} mb-5 inline-block text-[40px] text-icon-blue`}
            />
            <h4 className="mb-3 text-xl font-bold">{f.title}</h4>
            <p className="text-[15px] leading-relaxed text-[#CBD5E0]">
              {f.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
