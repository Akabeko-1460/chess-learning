"use client";

import { useState, useCallback, useEffect } from "react";
import { Chess } from "chess.js";
import type { Square, Piece } from "react-chessboard/dist/chessboard/types";
import ChessBoard from "@/app/components/chess/ChessBoard";
import GameControls from "@/app/components/chess/GameControls";
import GameInfo from "@/app/components/chess/GameInfo";
import DifficultySelector from "@/app/components/chess/DifficultySelector";
import type { Difficulty } from "@/app/components/chess/DifficultySelector";
import { useStockfish } from "@/app/lib/stockfish/useStockfish";

export default function CpuPlayPage() {
  const [game, setGame] = useState(new Chess());
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [boardOrientation, setBoardOrientation] = useState<"white" | "black">("white");
  const [isThinking, setIsThinking] = useState(false);
  const [moveSquares, setMoveSquares] = useState<Record<string, React.CSSProperties>>({});
  const { isReady, getBestMove } = useStockfish();

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
          const copy = new Chess(currentGame.fen());
          copy.move({ from, to, promotion });
          setMoveSquares({
            [from]: { backgroundColor: "rgba(72, 187, 120, 0.3)" },
            [to]: { backgroundColor: "rgba(72, 187, 120, 0.5)" },
          });
          setGame(copy);
        }
      } catch {
        // Stockfish error, ignore
      }
      setIsThinking(false);
    },
    [isReady, getBestMove, difficulty, playerColor]
  );

  useEffect(() => {
    if (game.turn() !== playerColor && !game.isGameOver()) {
      const timeout = setTimeout(() => makeStockfishMove(game), 300);
      return () => clearTimeout(timeout);
    }
  }, [game, playerColor, makeStockfishMove]);

  function onDrop(sourceSquare: Square, targetSquare: Square, piece: Piece): boolean {
    if (game.turn() !== playerColor || isThinking) return false;

    const copy = new Chess(game.fen());
    const promotion = piece[1] === "P" && (targetSquare[1] === "8" || targetSquare[1] === "1") ? "q" : undefined;
    const move = copy.move({ from: sourceSquare, to: targetSquare, promotion });
    if (!move) return false;

    setMoveSquares({
      [sourceSquare]: { backgroundColor: "rgba(72, 187, 120, 0.3)" },
      [targetSquare]: { backgroundColor: "rgba(72, 187, 120, 0.5)" },
    });
    setGame(copy);
    return true;
  }

  function newGame() {
    setGame(new Chess());
    setMoveSquares({});
    setIsThinking(false);
  }

  function resign() {
    const copy = new Chess(game.fen());
    // Force game over by removing king (not ideal, just set a custom state)
    // Instead, we'll just show a message
    alert(`あなたの投了です。${playerColor === "w" ? "黒" : "白"}の勝ちです。`);
    newGame();
  }

  return (
    <div className="min-h-screen bg-surface px-4 py-10 md:px-[60px]">
      <h1 className="mb-8 text-center font-serif text-3xl text-navy md:text-4xl">CPU対戦</h1>
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 lg:flex-row">
        <div className="w-full lg:w-auto">
          {isThinking && (
            <div className="mb-3 flex items-center gap-2 rounded-lg bg-light-blue-bg px-4 py-2 text-sm text-light-blue-text">
              <i className="ri-loader-4-line animate-spin" /> CPUが考え中...
            </div>
          )}
          <ChessBoard
            position={game.fen()}
            onPieceDrop={onDrop}
            boardOrientation={boardOrientation}
            arePiecesDraggable={!isThinking && !game.isGameOver()}
            customSquareStyles={moveSquares}
          />
          <div className="mt-4">
            <GameControls
              onNewGame={newGame}
              onResign={resign}
              onFlipBoard={() => setBoardOrientation(o => o === "white" ? "black" : "white")}
              gameOver={game.isGameOver()}
            />
          </div>
        </div>
        <div className="flex w-full flex-col gap-4 lg:w-80">
          <DifficultySelector
            selected={difficulty}
            onChange={(d) => {
              setDifficulty(d);
              newGame();
            }}
          />
          <GameInfo game={game} moves={game.history({ verbose: true })} />
        </div>
      </div>
    </div>
  );
}
