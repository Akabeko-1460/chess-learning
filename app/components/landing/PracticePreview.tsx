"use client";

import Link from "next/link";
import ChessBoard from "@/app/components/chess/ChessBoard";

const RUY_LOPEZ_FEN =
  "r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3";

const features = [
  "合法手ハイライト機能",
  "4段階のCPU難易度調整",
  "ローカル対人戦モード",
  "棋譜確認機能",
];

export default function PracticePreview() {
  return (
    <section className="flex flex-col items-center gap-16 bg-surface px-6 py-[100px] md:flex-row md:px-[80px]">
      {/* Chess board preview */}
      <div className="flex w-full justify-center rounded-[20px] bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.05)] md:w-[60%]">
        <ChessBoard
          position={RUY_LOPEZ_FEN}
          arePiecesDraggable={false}
          boardWidth={480}
        />
      </div>

      {/* Content */}
      <div className="w-full md:w-[45%]">
        <h2 className="mb-5 font-serif text-4xl text-navy md:text-[48px]">
          インタラクティブな練習
        </h2>
        <p className="mb-10 text-lg text-board-dark">
          理論だけでは不十分です。CPUと対戦して上達しましょう。
        </p>
        <ul className="space-y-5">
          {features.map((f) => (
            <li
              key={f}
              className="flex items-center gap-4 text-lg text-text-primary"
            >
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
