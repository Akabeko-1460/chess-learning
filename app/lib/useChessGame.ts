"use client";

import { useState } from "react";
import { Chess } from "chess.js";
import type { Square, Piece } from "react-chessboard/dist/chessboard/types";
import { SQUARE_COLORS } from "./constants";

function cloneGame(g: Chess): Chess {
  const copy = new Chess();
  copy.loadPgn(g.pgn());
  return copy;
}

interface UseChessGameOptions {
  canMove?: (game: Chess) => boolean;
  onMoveComplete?: (game: Chess) => void;
  undoCount?: number;
}

export function useChessGame(options: UseChessGameOptions = {}) {
  const { canMove, onMoveComplete, undoCount = 1 } = options;

  const [game, setGame] = useState(new Chess());
  const [boardOrientation, setBoardOrientation] = useState<"white" | "black">(
    "white",
  );
  const [moveSquares, setMoveSquares] = useState<
    Record<string, React.CSSProperties>
  >({});
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [legalMoveSquares, setLegalMoveSquares] = useState<
    Record<string, React.CSSProperties>
  >({});
  const [pendingPromotion, setPendingPromotion] = useState<{
    from: Square;
    to: Square;
  } | null>(null);
  const [gameStarted, setGameStarted] = useState(false);

  function isPromotionMove(from: Square, to: Square): boolean {
    const piece = game.get(from);
    if (!piece || piece.type !== "p") return false;
    return (
      (piece.color === "w" && to[1] === "8") ||
      (piece.color === "b" && to[1] === "1")
    );
  }

  function executeMove(from: Square, to: Square, promotion?: string): boolean {
    const copy = cloneGame(game);
    const move = copy.move({ from, to, promotion });
    if (!move) return false;
    setMoveSquares({
      [from]: { backgroundColor: SQUARE_COLORS.legalMove },
      [to]: { backgroundColor: SQUARE_COLORS.active },
    });
    setSelectedSquare(null);
    setLegalMoveSquares({});
    setGame(copy);
    onMoveComplete?.(copy);
    return true;
  }

  function onDrop(
    sourceSquare: Square,
    targetSquare: Square,
    _piece: Piece,
  ): boolean {
    if (canMove && !canMove(game)) return false;

    if (isPromotionMove(sourceSquare, targetSquare)) {
      setPendingPromotion({ from: sourceSquare, to: targetSquare });
      return false;
    }
    return executeMove(sourceSquare, targetSquare);
  }

  function onSquareClick(square: Square) {
    if (game.isGameOver()) return;
    if (canMove && !canMove(game)) return;

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

    const piece = game.get(square);
    const selectableColor = canMove ? game.turn() : game.turn();
    if (piece && piece.color === selectableColor) {
      setSelectedSquare(square);
      const moves = game.moves({ square, verbose: true });
      const highlights: Record<string, React.CSSProperties> = {
        [square]: { backgroundColor: SQUARE_COLORS.selected },
      };
      moves.forEach((m) => {
        highlights[m.to] = {
          background: SQUARE_COLORS.legalMoveIndicator,
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
    for (let i = 0; i < undoCount; i++) {
      if (copy.history().length === 0) break;
      copy.undo();
    }
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

  function flipBoard() {
    setBoardOrientation((o) => (o === "white" ? "black" : "white"));
  }

  return {
    game,
    setGame,
    boardOrientation,
    setBoardOrientation,
    moveSquares,
    setMoveSquares,
    selectedSquare,
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
  };
}
