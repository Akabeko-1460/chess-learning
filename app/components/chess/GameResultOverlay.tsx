"use client";

import type { Chess } from "chess.js";

interface GameResultOverlayProps {
  game: Chess;
  onNewGame: () => void;
}

function getResult(game: Chess) {
  if (game.isCheckmate()) {
    const winner = game.turn() === "w" ? "黒" : "白";
    return {
      icon: "ri-trophy-fill",
      message: `チェックメイト！\n${winner}の勝ち`,
      color: "text-accent-green",
    };
  }
  if (game.isStalemate()) {
    return {
      icon: "ri-scales-3-fill",
      message: "ステイルメイト\n引き分け",
      color: "text-text-secondary",
    };
  }
  if (game.isThreefoldRepetition()) {
    return {
      icon: "ri-repeat-fill",
      message: "三回繰り返し\n引き分け",
      color: "text-text-secondary",
    };
  }
  if (game.isInsufficientMaterial()) {
    return {
      icon: "ri-scales-3-fill",
      message: "駒不足\n引き分け",
      color: "text-text-secondary",
    };
  }
  return {
    icon: "ri-scales-3-fill",
    message: "引き分け",
    color: "text-text-secondary",
  };
}

export default function GameResultOverlay({ game, onNewGame }: GameResultOverlayProps) {
  const { icon, message, color } = getResult(game);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-[fade-in_0.2s_ease-out]">
      <div className="rounded-xl bg-white p-8 shadow-2xl text-center animate-[scale-in_0.3s_ease-out]">
        <i className={`${icon} text-6xl ${color} mb-4 block`} />
        <p className="whitespace-pre-line text-xl font-bold text-navy mb-6">{message}</p>
        <button
          onClick={onNewGame}
          className="rounded-lg bg-navy px-6 py-3 text-base font-medium text-white transition-colors hover:bg-navy-light"
        >
          新しいゲーム
        </button>
      </div>
    </div>
  );
}
