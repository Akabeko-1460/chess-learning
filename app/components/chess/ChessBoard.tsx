"use client";

import { Chessboard } from "react-chessboard";
import type { Square, Piece } from "react-chessboard/dist/chessboard/types";

interface ChessBoardProps {
  position: string;
  onPieceDrop?: (sourceSquare: Square, targetSquare: Square, piece: Piece) => boolean;
  boardOrientation?: "white" | "black";
  boardWidth?: number;
  arePiecesDraggable?: boolean;
  customSquareStyles?: Record<string, React.CSSProperties>;
  customArrowColor?: string;
  customArrows?: [Square, Square][];
  onSquareClick?: (square: Square) => void;
}

export default function ChessBoard({
  position,
  onPieceDrop,
  boardOrientation = "white",
  boardWidth,
  arePiecesDraggable = true,
  customSquareStyles,
  customArrowColor,
  customArrows,
  onSquareClick,
}: ChessBoardProps) {
  return (
    <div className="flex justify-center">
      <Chessboard
        id="chess-board"
        position={position}
        onPieceDrop={onPieceDrop}
        boardOrientation={boardOrientation}
        boardWidth={boardWidth ?? 560}
        arePiecesDraggable={arePiecesDraggable}
        customBoardStyle={{
          borderRadius: "4px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
        customDarkSquareStyle={{ backgroundColor: "#4A5568" }}
        customLightSquareStyle={{ backgroundColor: "#E2E8F0" }}
        customSquareStyles={customSquareStyles}
        customArrowColor={customArrowColor ?? "rgba(72, 187, 120, 0.8)"}
        customArrows={customArrows}
        onSquareClick={onSquareClick}
        animationDuration={200}
      />
    </div>
  );
}
