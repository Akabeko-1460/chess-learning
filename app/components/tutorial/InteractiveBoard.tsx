"use client";

import { useState, useCallback } from "react";
import { Chess } from "chess.js";
import type { Square, Piece } from "react-chessboard/dist/chessboard/types";
import ChessBoard from "@/app/components/chess/ChessBoard";
import type { LessonStep } from "@/app/data/tutorials/types";

interface InteractiveBoardProps {
  step: LessonStep;
  onCorrectMove?: () => void;
}

export default function InteractiveBoard({ step, onCorrectMove }: InteractiveBoardProps) {
  const [position, setPosition] = useState(step.fen);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);

  const hasExpectedMove = !!step.expectedMove;

  const onDrop = useCallback(
    (sourceSquare: Square, targetSquare: Square, _piece: Piece): boolean => {
      if (!step.expectedMove) return false;

      if (
        sourceSquare === step.expectedMove.from &&
        targetSquare === step.expectedMove.to
      ) {
        const chess = new Chess(step.fen);
        const move = chess.move({ from: sourceSquare, to: targetSquare, promotion: "q" });
        if (move) {
          setPosition(chess.fen());
          setFeedback("correct");
          setTimeout(() => {
            onCorrectMove?.();
            setFeedback(null);
          }, 800);
          return true;
        }
      }

      setFeedback("wrong");
      setTimeout(() => setFeedback(null), 1000);
      return false;
    },
    [step, onCorrectMove]
  );

  // Reset position when step changes
  if (position !== step.fen && feedback === null) {
    setPosition(step.fen);
  }

  return (
    <div>
      <ChessBoard
        position={position}
        onPieceDrop={onDrop}
        arePiecesDraggable={hasExpectedMove && feedback !== "correct"}
        customSquareStyles={step.highlights}
        customArrows={step.arrows}
        boardWidth={480}
      />
      {feedback === "correct" && (
        <div className="mt-3 flex items-center gap-2 rounded-lg bg-green-50 px-4 py-2 text-sm font-medium text-accent-green">
          <i className="ri-checkbox-circle-fill" /> 正解です！
        </div>
      )}
      {feedback === "wrong" && (
        <div className="mt-3 flex items-center gap-2 rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-500">
          <i className="ri-close-circle-fill" /> もう一度試してみましょう
        </div>
      )}
    </div>
  );
}
