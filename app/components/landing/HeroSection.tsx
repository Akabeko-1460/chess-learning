import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative flex w-full flex-col items-center justify-between overflow-hidden bg-gradient-to-br from-[#F0F4F8] to-white px-6 py-20 md:flex-row md:px-[100px] md:py-0 md:h-[800px]">
      <div className="z-10 w-full md:w-[45%]">
        <div className="mb-6 inline-block rounded-full bg-light-blue-bg px-4 py-2 text-sm font-bold tracking-wider text-light-blue-text uppercase">
          初心者向け
        </div>
        <h1 className="mb-6 font-serif text-5xl leading-tight text-navy md:text-7xl md:leading-[1.1]">
          チェスを
          <br />
          ステップバイステップで
        </h1>
        <p className="mb-10 max-w-[80%] text-xl text-text-secondary">
          戦略的な思考力を解放しよう。インタラクティブなレッスンで、ルール、オープニング、戦略を楽しく学べます。
        </p>
        <div className="flex flex-wrap gap-5">
          <Link
            href="/tutorial"
            className="rounded-md bg-navy px-8 py-4 text-lg font-medium text-white transition-colors hover:bg-navy-light"
          >
            学習をはじめる
          </Link>
          <Link
            href="/play"
            className="flex items-center gap-2.5 rounded-md border border-[#CBD5E0] px-8 py-4 text-lg transition-colors hover:bg-[#F7FAFC]"
          >
            <i className="ri-play-circle-line" /> プレイする
          </Link>
        </div>
      </div>

      <div className="relative mt-16 flex h-[500px] w-full items-center justify-center md:mt-0 md:w-[50%]">
        {/* Abstract chess board */}
        <div className="grid h-[350px] w-[350px] grid-cols-4 grid-rows-4 overflow-hidden rounded-[20px] bg-white shadow-[20px_20px_60px_rgba(0,0,0,0.1)] [transform:rotate(-15deg)_skewX(10deg)] md:h-[500px] md:w-[500px]">
          <div className="bg-light-gray" />
          <div className="bg-navy-light" />
          <div className="bg-light-gray" />
          <div className="bg-navy-light" />
          <div className="bg-navy-light" />
          <div className="relative bg-navy">
            <i className="ri-chess-king-fill absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl text-white/90 md:text-[80px]" />
          </div>
          <div className="bg-navy-light" />
          <div className="bg-light-gray" />
          <div className="bg-light-gray" />
          <div className="bg-navy-light" />
          <div className="bg-light-gray" />
          <div className="bg-navy-light" />
          <div className="bg-navy-light" />
          <div className="bg-light-gray" />
          <div className="relative bg-navy">
            <i className="ri-chess-knight-fill absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl text-white/90 md:text-[80px]" />
          </div>
          <div className="bg-light-gray" />
        </div>

        {/* Floating cards */}
        <div className="absolute top-[20%] right-[5%] flex items-center gap-4 rounded-xl bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.1)] animate-[float_6s_ease-in-out_infinite]">
          <div className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-light-blue-bg text-2xl text-light-blue-text">
            <i className="ri-trophy-line" />
          </div>
          <div>
            <h4 className="text-base font-bold">デイリーパズル</h4>
            <span className="text-xs text-text-secondary">毎日更新</span>
          </div>
        </div>

        <div className="absolute bottom-[20%] left-0 flex items-center gap-4 rounded-xl bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.1)] animate-[float_6s_ease-in-out_infinite_2s]">
          <div className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#E6FFFA] text-2xl text-[#319795]">
            <i className="ri-user-star-line" />
          </div>
          <div>
            <h4 className="text-base font-bold">AI対戦</h4>
            <span className="text-xs text-text-secondary">4段階の難易度</span>
          </div>
        </div>
      </div>
    </section>
  );
}
