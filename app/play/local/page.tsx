"use client";

import { useState } from "react";
import { Chess } from "chess.js";
import type { Square, Piece } from "react-chessboard/dist/chessboard/types";
import ChessBoard from "@/app/components/chess/ChessBoard";
import GameControls from "@/app/components/chess/GameControls";
import GameInfo from "@/app/components/chess/GameInfo";

export default function LocalPlayPage() {
  const [game, setGame] = useState(new Chess());
  const [boardOrientation, setBoardOrientation] = useState<"white" | "black">("white");
  const [moveSquares, setMoveSquares] = useState<Record<string, React.CSSProperties>>({});

  function onDrop(sourceSquare: Square, targetSquare: Square, piece: Piece): boolean {
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

  function undo() {
    const copy = new Chess(game.fen());
    copy.undo();
    setGame(copy);
    setMoveSquares({});
  }

  function newGame() {
    setGame(new Chess());
    setMoveSquares({});
  }

  return (
    <div className="min-h-screen bg-surface px-4 py-10 md:px-[60px]">
      <h1 className="mb-8 text-center font-serif text-3xl text-navy md:text-4xl">ローカル対人戦</h1>
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 lg:flex-row">
        <div className="w-full lg:w-auto">
          <ChessBoard
            position={game.fen()}
            onPieceDrop={onDrop}
            boardOrientation={boardOrientation}
            arePiecesDraggable={!game.isGameOver()}
            customSquareStyles={moveSquares}
          />
          <div className="mt-4">
            <GameControls
              onNewGame={newGame}
              onUndo={undo}
              onFlipBoard={() => setBoardOrientation(o => o === "white" ? "black" : "white")}
              gameOver={game.isGameOver()}
            />
          </div>
        </div>
        <div className="w-full lg:w-80">
          <GameInfo game={game} moves={game.history({ verbose: true })} />
        </div>
      </div>
    </div>
  );
}
