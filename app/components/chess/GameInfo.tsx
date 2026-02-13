"use client";

import type { Chess, Move } from "chess.js";

interface GameInfoProps {
  game: Chess;
  moves: Move[];
}

export default function GameInfo({ game, moves }: GameInfoProps) {
  const status = getStatus(game);

  return (
    <div className="flex flex-col gap-4">
      {/* Status */}
      <div className="rounded-lg bg-white p-4 shadow-sm">
        <div className="mb-2 text-sm font-medium text-text-secondary">ゲーム状態</div>
        <div className={`text-lg font-bold ${status.color}`}>{status.text}</div>
      </div>

      {/* Turn */}
      {!game.isGameOver() && (
        <div className="rounded-lg bg-white p-4 shadow-sm">
          <div className="mb-2 text-sm font-medium text-text-secondary">手番</div>
          <div className="flex items-center gap-2 text-lg font-bold text-text-primary">
            <div
              className={`h-4 w-4 rounded-full border border-gray-300 ${
                game.turn() === "w" ? "bg-white" : "bg-gray-800"
              }`}
            />
            {game.turn() === "w" ? "白" : "黒"}
          </div>
        </div>
      )}

      {/* Move history */}
      <div className="rounded-lg bg-white p-4 shadow-sm">
        <div className="mb-2 text-sm font-medium text-text-secondary">棋譜</div>
        <div className="max-h-[300px] overflow-y-auto">
          {moves.length === 0 ? (
            <p className="text-sm text-muted">まだ手が指されていません</p>
          ) : (
            <div className="grid grid-cols-[auto_1fr_1fr] gap-x-3 gap-y-1 text-sm">
              {Array.from({ length: Math.ceil(moves.length / 2) }).map((_, i) => {
                const white = moves[i * 2];
                const black = moves[i * 2 + 1];
                return (
                  <div key={i} className="contents">
                    <span className="text-muted">{i + 1}.</span>
                    <span className="font-mono">{white?.san}</span>
                    <span className="font-mono">{black?.san ?? ""}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function getStatus(game: Chess) {
  if (game.isCheckmate()) {
    return {
      text: `チェックメイト！${game.turn() === "w" ? "黒" : "白"}の勝ち`,
      color: "text-accent-green",
    };
  }
  if (game.isDraw()) {
    if (game.isStalemate()) return { text: "ステイルメイト（引き分け）", color: "text-text-secondary" };
    if (game.isThreefoldRepetition()) return { text: "三回繰り返し（引き分け）", color: "text-text-secondary" };
    if (game.isInsufficientMaterial()) return { text: "駒不足（引き分け）", color: "text-text-secondary" };
    return { text: "引き分け", color: "text-text-secondary" };
  }
  if (game.isCheck()) {
    return { text: "チェック！", color: "text-red-500" };
  }
  return { text: "対局中", color: "text-text-primary" };
}
