"use client";

import { useState, useCallback, useEffect } from "react";
import { Chess } from "chess.js";
import type { Square, Piece } from "react-chessboard/dist/chessboard/types";
import ChessBoard from "@/app/components/chess/ChessBoard";
import GameControls from "@/app/components/chess/GameControls";
import GameInfo from "@/app/components/chess/GameInfo";
import DifficultySelector from "@/app/components/chess/DifficultySelector";
import type { Difficulty } from "@/app/components/chess/DifficultySelector";
import PromotionDialog from "@/app/components/chess/PromotionDialog";
import GameResultOverlay from "@/app/components/chess/GameResultOverlay";
import { useStockfish } from "@/app/lib/stockfish/useStockfish";

function cloneGame(g: Chess): Chess {
  const copy = new Chess();
  copy.loadPgn(g.pgn());
  return copy;
}

export default function CpuPlayPage() {
  const [game, setGame] = useState(new Chess());
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [boardOrientation, setBoardOrientation] = useState<"white" | "black">("white");
  const [isThinking, setIsThinking] = useState(false);
  const [moveSquares, setMoveSquares] = useState<Record<string, React.CSSProperties>>({});
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [legalMoveSquares, setLegalMoveSquares] = useState<Record<string, React.CSSProperties>>({});
  const [pendingPromotion, setPendingPromotion] = useState<{ from: Square; to: Square } | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
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
          const copy = cloneGame(currentGame);
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
    if (gameStarted && game.turn() !== playerColor && !game.isGameOver()) {
      const timeout = setTimeout(() => makeStockfishMove(game), 300);
      return () => clearTimeout(timeout);
    }
  }, [game, playerColor, makeStockfishMove, gameStarted]);

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
    if (game.turn() !== playerColor || isThinking) return false;

    if (isPromotionMove(sourceSquare, targetSquare)) {
      setPendingPromotion({ from: sourceSquare, to: targetSquare });
      return false;
    }

    return executeMove(sourceSquare, targetSquare);
  }

  function onSquareClick(square: Square) {
    if (game.turn() !== playerColor || isThinking || game.isGameOver()) return;

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
    if (piece && piece.color === playerColor) {
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
      // Click empty or opponent square with no selection
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
    if (isThinking || game.history().length === 0) return;
    const copy = cloneGame(game);
    if (game.isGameOver()) {
      // Game over: undo the finishing move, then also the player's preceding move
      copy.undo();
      copy.undo();
    } else if (game.turn() === playerColor) {
      // Player's turn: undo CPU's response + player's previous move
      copy.undo();
      copy.undo();
    } else {
      // CPU's turn (shouldn't normally happen, but guard): undo player's move
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
    setIsThinking(false);
    setGameStarted(false);
  }

  function startGame() {
    setGame(new Chess());
    setMoveSquares({});
    setSelectedSquare(null);
    setLegalMoveSquares({});
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
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 lg:flex-row">
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
              onFlipBoard={() => setBoardOrientation(o => o === "white" ? "black" : "white")}
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
