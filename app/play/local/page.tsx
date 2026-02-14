"use client";

import { useState } from "react";
import { Chess } from "chess.js";
import type { Square, Piece } from "react-chessboard/dist/chessboard/types";
import ChessBoard from "@/app/components/chess/ChessBoard";
import GameControls from "@/app/components/chess/GameControls";
import GameInfo from "@/app/components/chess/GameInfo";
import PromotionDialog from "@/app/components/chess/PromotionDialog";
import GameResultOverlay from "@/app/components/chess/GameResultOverlay";

function cloneGame(g: Chess): Chess {
  const copy = new Chess();
  copy.loadPgn(g.pgn());
  return copy;
}

export default function LocalPlayPage() {
  const [game, setGame] = useState(new Chess());
  const [boardOrientation, setBoardOrientation] = useState<"white" | "black">("white");
  const [moveSquares, setMoveSquares] = useState<Record<string, React.CSSProperties>>({});
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [legalMoveSquares, setLegalMoveSquares] = useState<Record<string, React.CSSProperties>>({});
  const [pendingPromotion, setPendingPromotion] = useState<{ from: Square; to: Square } | null>(null);
  const [gameStarted, setGameStarted] = useState(false);

  function isPromotionMove(from: Square, to: Square): boolean {
    const piece = game.get(from);
    if (!piece || piece.type !== "p") return false;
    return (piece.color === "w" && to[1] === "8") || (piece.color === "b" && to[1] === "1");
  }

  function executeMove(from: Square, to: Square, promotion?: string) {
    const copy = cloneGame(game);
    const move = copy.move({ from, to, promotion });
    if (!move) return false;
    setMoveSquares({
      [from]: { backgroundColor: "rgba(72, 187, 120, 0.3)" },
      [to]: { backgroundColor: "rgba(72, 187, 120, 0.5)" },
    });
    setSelectedSquare(null);
    setLegalMoveSquares({});
    setGame(copy);
    return true;
  }

  function onDrop(sourceSquare: Square, targetSquare: Square, piece: Piece): boolean {
    if (isPromotionMove(sourceSquare, targetSquare)) {
      setPendingPromotion({ from: sourceSquare, to: targetSquare });
      return false;
    }
    return executeMove(sourceSquare, targetSquare);
  }

  function onSquareClick(square: Square) {
    if (game.isGameOver()) return;

    const currentTurn = game.turn();

    // If we have a selected piece and click a legal move target
    if (selectedSquare) {
      const moves = game.moves({ square: selectedSquare, verbose: true });
      const targetMove = moves.find((m) => m.to === square);
      if (targetMove) {
        if (isPromotionMove(selectedSquare, square)) {
          setPendingPromotion({ from: selectedSquare, to: square });
        } else {
          executeMove(selectedSquare, square);
        }
        return;
      }
    }

    // Select a new piece
    const piece = game.get(square);
    if (piece && piece.color === currentTurn) {
      setSelectedSquare(square);
      const moves = game.moves({ square, verbose: true });
      const highlights: Record<string, React.CSSProperties> = {
        [square]: { backgroundColor: "rgba(72, 187, 120, 0.4)" },
      };
      moves.forEach((m) => {
        highlights[m.to] = {
          background: "radial-gradient(circle, rgba(72, 187, 120, 0.5) 25%, transparent 25%)",
          borderRadius: "50%",
        };
      });
      setLegalMoveSquares(highlights);
    } else {
      setSelectedSquare(null);
      setLegalMoveSquares({});
    }
  }

  function handlePromotionSelect(piece: "q" | "r" | "b" | "n") {
    if (!pendingPromotion) return;
    executeMove(pendingPromotion.from, pendingPromotion.to, piece);
    setPendingPromotion(null);
  }

  function undo() {
    if (game.history().length === 0) return;
    const copy = cloneGame(game);
    copy.undo();
    setGame(copy);
    setMoveSquares({});
    setSelectedSquare(null);
    setLegalMoveSquares({});
  }

  function newGame() {
    setGame(new Chess());
    setMoveSquares({});
    setSelectedSquare(null);
    setLegalMoveSquares({});
    setPendingPromotion(null);
    setGameStarted(false);
  }

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
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 lg:flex-row">
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
              onFlipBoard={() => setBoardOrientation(o => o === "white" ? "black" : "white")}
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
