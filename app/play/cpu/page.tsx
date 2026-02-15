"use client";

import { useCallback, useEffect, useState } from "react";
import type { Square } from "react-chessboard/dist/chessboard/types";
import ChessBoard from "@/app/components/chess/ChessBoard";
import GameControls from "@/app/components/chess/GameControls";
import GameInfo from "@/app/components/chess/GameInfo";
import DifficultySelector from "@/app/components/chess/DifficultySelector";
import type { Difficulty } from "@/app/components/chess/DifficultySelector";
import PromotionDialog from "@/app/components/chess/PromotionDialog";
import GameResultOverlay from "@/app/components/chess/GameResultOverlay";
import { useStockfish } from "@/app/lib/stockfish/useStockfish";
import { useChessGame } from "@/app/lib/useChessGame";
import { SQUARE_COLORS } from "@/app/lib/constants";
import { Chess } from "chess.js";

function cloneGame(g: Chess): Chess {
  const copy = new Chess();
  copy.loadPgn(g.pgn());
  return copy;
}

export default function CpuPlayPage() {
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [isThinking, setIsThinking] = useState(false);
  const { isReady, getBestMove } = useStockfish();

  const {
    game,
    setGame,
    boardOrientation,
    setBoardOrientation,
    moveSquares,
    setMoveSquares,
    legalMoveSquares,
    pendingPromotion,
    setPendingPromotion,
    gameStarted,
    setGameStarted,
    onDrop,
    onSquareClick,
    handlePromotionSelect,
    newGame: baseNewGame,
    flipBoard,
  } = useChessGame({
    canMove: (g) => {
      const playerColor = boardOrientation === "white" ? "w" : "b";
      return g.turn() === playerColor && !isThinking;
    },
    undoCount: 2,
  });

  const playerColor = boardOrientation === "white" ? "w" : "b";

  const makeStockfishMove = useCallback(
    async (currentGame: Chess) => {
      if (currentGame.isGameOver() || !isReady) return;
      if (currentGame.turn() === playerColor) return;

      setIsThinking(true);
      try {
        const bestMove = await getBestMove(currentGame.fen(), difficulty);
        if (bestMove && bestMove.length >= 4) {
          const from = bestMove.slice(0, 2) as Square;
          const to = bestMove.slice(2, 4) as Square;
          const promotion = bestMove.length > 4 ? bestMove[4] : undefined;
          const copy = cloneGame(currentGame);
          copy.move({ from, to, promotion });
          setMoveSquares({
            [from]: { backgroundColor: SQUARE_COLORS.legalMove },
            [to]: { backgroundColor: SQUARE_COLORS.active },
          });
          setGame(copy);
        }
      } catch {
        // Stockfish error, ignore
      }
      setIsThinking(false);
    },
    [isReady, getBestMove, difficulty, playerColor, setMoveSquares, setGame],
  );

  useEffect(() => {
    if (gameStarted && game.turn() !== playerColor && !game.isGameOver()) {
      const timeout = setTimeout(() => makeStockfishMove(game), 300);
      return () => clearTimeout(timeout);
    }
  }, [game, playerColor, makeStockfishMove, gameStarted]);

  function undo() {
    if (isThinking || game.history().length === 0) return;
    const copy = cloneGame(game);
    if (game.isGameOver()) {
      copy.undo();
      copy.undo();
    } else if (game.turn() === playerColor) {
      copy.undo();
      copy.undo();
    } else {
      copy.undo();
    }
    setGame(copy);
    setMoveSquares({});
  }

  function newGame() {
    baseNewGame();
    setIsThinking(false);
  }

  function startGame() {
    baseNewGame();
    setGameStarted(true);
  }

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-surface px-4 py-10 md:px-[60px]">
        <h1 className="mb-8 text-center font-serif text-3xl text-navy md:text-4xl">CPU対戦</h1>
        <div className="mx-auto max-w-lg rounded-2xl bg-white p-8 shadow-sm">
          <div className="mb-6">
            <DifficultySelector
              selected={difficulty}
              onChange={setDifficulty}
            />
          </div>
          <div className="mb-8">
            <h3 className="mb-3 text-sm font-medium text-text-secondary">持ち駒の色</h3>
            <div className="flex gap-3">
              <button
                onClick={() => setBoardOrientation("white")}
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg border-2 px-4 py-3 text-sm font-medium transition-colors ${
                  boardOrientation === "white"
                    ? "border-accent-green bg-accent-green/10 text-accent-green"
                    : "border-border text-text-primary hover:bg-light-gray"
                }`}
              >
                <i className="ri-chess-king-fill" /> 白
              </button>
              <button
                onClick={() => setBoardOrientation("black")}
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg border-2 px-4 py-3 text-sm font-medium transition-colors ${
                  boardOrientation === "black"
                    ? "border-accent-green bg-accent-green/10 text-accent-green"
                    : "border-border text-text-primary hover:bg-light-gray"
                }`}
              >
                <i className="ri-chess-king-line" /> 黒
              </button>
            </div>
          </div>
          <button
            onClick={startGame}
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
      <h1 className="mb-8 text-center font-serif text-3xl text-navy md:text-4xl">CPU対戦</h1>
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 lg:flex-row lg:pl-[280px]">
        <div className="relative w-full lg:w-auto">
          <ChessBoard
            position={game.fen()}
            onPieceDrop={onDrop}
            onSquareClick={onSquareClick}
            boardOrientation={boardOrientation}
            arePiecesDraggable={!isThinking && !game.isGameOver()}
            customSquareStyles={{ ...moveSquares, ...legalMoveSquares }}
          />
          {isThinking && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex items-center gap-2 rounded-lg bg-black/70 px-4 py-2 text-sm font-medium text-white shadow-lg">
                <i className="ri-loader-4-line animate-spin" /> CPUが考え中...
              </div>
            </div>
          )}
          <div className="mt-4">
            <GameControls
              onNewGame={newGame}
              onUndo={undo}
              onFlipBoard={flipBoard}
              gameOver={game.isGameOver()}
            />
          </div>
        </div>
        <div className="flex w-full flex-col gap-4 lg:w-80">
          <GameInfo game={game} moves={game.history({ verbose: true })} />
        </div>
      </div>
      {pendingPromotion && (
        <PromotionDialog
          color={playerColor}
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
