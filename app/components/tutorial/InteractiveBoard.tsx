"use client";

import ChessBoard from "@/app/components/chess/ChessBoard";
import type { LessonStep } from "@/app/data/tutorials/types";

interface InteractiveBoardProps {
  step: LessonStep;
}

export default function InteractiveBoard({ step }: InteractiveBoardProps) {
  return (
    <div className="animate-[fade-in_0.4s_ease-out]">
      <ChessBoard
        position={step.fen}
        arePiecesDraggable={false}
        customSquareStyles={step.highlights}
        customArrows={step.arrows}
        boardWidth={480}
      />
    </div>
  );
}
