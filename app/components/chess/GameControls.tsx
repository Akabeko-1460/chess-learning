"use client";

interface GameControlsProps {
  onNewGame: () => void;
  onFlipBoard: () => void;
  onUndo?: () => void;
  gameOver: boolean;
}

export default function GameControls({
  onNewGame,
  onFlipBoard,
  onUndo,
  gameOver,
}: GameControlsProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={onNewGame}
        className="flex items-center gap-2 rounded-md bg-navy px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-navy-light"
      >
        <i className="ri-restart-line" /> 新しいゲーム
      </button>
      {onUndo && (
        <button
          onClick={onUndo}
          className="flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:bg-light-gray"
        >
          <i className="ri-arrow-go-back-line" /> 一手戻す
        </button>
      )}
      <button
        onClick={onFlipBoard}
        className="flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:bg-light-gray"
      >
        <i className="ri-refresh-line" /> ボード反転
      </button>
    </div>
  );
}
