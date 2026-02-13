import Link from "next/link";

const features = [
  "リアルタイム合法手ハイライト",
  "4段階のAI難易度調整",
  "ローカル対人戦モード",
  "棋譜の確認",
];

export default function PracticePreview() {
  return (
    <section className="flex flex-col items-center gap-20 bg-surface px-6 py-[100px] md:flex-row md:px-[100px]">
      {/* Chess board preview */}
      <div className="flex w-full justify-center rounded-[20px] bg-white p-10 shadow-[0_10px_40px_rgba(0,0,0,0.05)] md:w-[60%]">
        <div className="grid aspect-square w-full max-w-[600px] grid-cols-8 grid-rows-8 overflow-hidden rounded border-[20px] border-[#2D3748]">
          {renderBoard()}
        </div>
      </div>

      {/* Content */}
      <div className="w-full md:w-[40%]">
        <h2 className="mb-5 font-serif text-4xl text-navy md:text-[48px]">
          インタラクティブな練習
        </h2>
        <p className="mb-10 text-lg text-board-dark">
          理論だけでは不十分です。AIエンジンと対戦したり、友達と対局して、リアルタイムで上達しましょう。
        </p>
        <ul className="space-y-5">
          {features.map((f) => (
            <li key={f} className="flex items-center gap-4 text-lg text-text-primary">
              <i className="ri-checkbox-circle-fill text-2xl text-accent-green" />
              {f}
            </li>
          ))}
        </ul>
        <Link
          href="/play"
          className="mt-8 inline-block rounded-md bg-navy px-7 py-3 text-base font-medium text-white transition-colors hover:bg-navy-light"
        >
          今すぐプレイ
        </Link>
      </div>
    </section>
  );
}

/* Static 8x8 board for the landing page */
const pieces: Record<string, string> = {
  "0,0": "ri-chess-rook-fill", "0,1": "ri-chess-knight-fill", "0,2": "ri-chess-bishop-fill",
  "0,3": "ri-chess-queen-fill", "0,4": "ri-chess-king-fill", "0,5": "ri-chess-bishop-fill",
  "0,6": "ri-chess-knight-fill", "0,7": "ri-chess-rook-fill",
  "7,0": "ri-chess-rook-line", "7,1": "ri-chess-knight-line", "7,2": "ri-chess-bishop-line",
  "7,3": "ri-chess-queen-line", "7,4": "ri-chess-king-line", "7,5": "ri-chess-bishop-line",
  "7,6": "ri-chess-knight-line", "7,7": "ri-chess-rook-line",
};
for (let c = 0; c < 8; c++) {
  pieces[`1,${c}`] = "ri-chess-pawn-fill";
  pieces[`6,${c}`] = "ri-chess-pawn-line";
}

const highlights = new Set(["3,3", "4,2", "4,4", "5,6"]);

function renderBoard() {
  const cells = [];
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const isLight = (r + c) % 2 === 0;
      const key = `${r},${c}`;
      const piece = pieces[key];
      const isHighlight = highlights.has(key);
      const isBlack = r < 2;
      cells.push(
        <div
          key={key}
          className={`relative flex items-center justify-center text-[clamp(24px,4vw,40px)] ${
            isLight ? "bg-board-light text-text-primary" : "bg-board-dark text-light-gray"
          } ${isHighlight ? "after:absolute after:h-5 after:w-5 after:rounded-full after:bg-accent-green/60 after:content-['']" : ""}`}
        >
          {piece && <i className={`${piece} ${isBlack ? "" : ""}`} />}
        </div>
      );
    }
  }
  return cells;
}
