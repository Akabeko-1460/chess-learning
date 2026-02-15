"use client";

import ChessBoard from "@/app/components/chess/ChessBoard";
import GameControls from "@/app/components/chess/GameControls";
import GameInfo from "@/app/components/chess/GameInfo";
import PromotionDialog from "@/app/components/chess/PromotionDialog";
import GameResultOverlay from "@/app/components/chess/GameResultOverlay";
import { useChessGame } from "@/app/lib/useChessGame";

export default function LocalPlayPage() {
  const {
    game,
    boardOrientation,
    moveSquares,
    legalMoveSquares,
    pendingPromotion,
    setPendingPromotion,
    gameStarted,
    setGameStarted,
    onDrop,
    onSquareClick,
    handlePromotionSelect,
    undo,
    newGame,
    flipBoard,
  } = useChessGame();

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-surface px-4 py-10 md:px-[60px]">
        <h1 className="mb-8 text-center font-serif text-3xl text-navy md:text-4xl">ローカル対人戦</h1>
        <div className="mx-auto max-w-lg rounded-2xl bg-white p-8 shadow-sm">
          <p className="mb-6 text-center text-text-secondary">
            同じデバイスで友達と対局できます。白と黒を交互に指して楽しみましょう。
          </p>
          <button
            onClick={() => setGameStarted(true)}
            className="w-full rounded-lg bg-navy px-6 py-3 text-lg font-medium text-white transition-colors hover:bg-navy-light"
          >
            対戦を開始
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface px-4 py-10 md:px-[60px]">
      <h1 className="mb-8 text-center font-serif text-3xl text-navy md:text-4xl">ローカル対人戦</h1>
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 lg:flex-row lg:pl-[280px]">
        <div className="w-full lg:w-auto">
          <ChessBoard
            position={game.fen()}
            onPieceDrop={onDrop}
            onSquareClick={onSquareClick}
            boardOrientation={boardOrientation}
            arePiecesDraggable={!game.isGameOver()}
            customSquareStyles={{ ...moveSquares, ...legalMoveSquares }}
          />
          <div className="mt-4">
            <GameControls
              onNewGame={newGame}
              onUndo={undo}
              onFlipBoard={flipBoard}
              gameOver={game.isGameOver()}
            />
          </div>
        </div>
        <div className="w-full lg:w-80">
          <GameInfo game={game} moves={game.history({ verbose: true })} />
        </div>
      </div>
      {pendingPromotion && (
        <PromotionDialog
          color={game.turn()}
          onSelect={handlePromotionSelect}
          onCancel={() => setPendingPromotion(null)}
        />
      )}
      {game.isGameOver() && (
        <GameResultOverlay game={game} onNewGame={newGame} />
      )}
    </div>
  );
}
