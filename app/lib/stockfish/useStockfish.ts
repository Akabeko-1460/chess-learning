"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Difficulty } from "@/app/components/chess/DifficultySelector";
import { difficultySettings } from "./difficulty";

export function useStockfish() {
  const workerRef = useRef<Worker | null>(null);
  const [isReady, setIsReady] = useState(false);
  const resolveRef = useRef<((bestMove: string) => void) | null>(null);

  useEffect(() => {
    const worker = new Worker("/stockfish/stockfish.js");
    workerRef.current = worker;

    worker.onmessage = (e: MessageEvent) => {
      const msg = String(e.data);
      if (msg === "uciok") {
        worker.postMessage("isready");
      }
      if (msg === "readyok") {
        setIsReady(true);
      }
      if (msg.startsWith("bestmove")) {
        const bestMove = msg.split(" ")[1];
        if (resolveRef.current && bestMove) {
          resolveRef.current(bestMove);
          resolveRef.current = null;
        }
      }
    };

    worker.postMessage("uci");

    return () => {
      worker.terminate();
      workerRef.current = null;
    };
  }, []);

  const getBestMove = useCallback(
    (fen: string, difficulty: Difficulty): Promise<string> => {
      return new Promise((resolve) => {
        const worker = workerRef.current;
        if (!worker) {
          resolve("");
          return;
        }

        resolveRef.current = resolve;
        const config = difficultySettings[difficulty];

        worker.postMessage(`setoption name Skill Level value ${config.skillLevel}`);
        worker.postMessage(`position fen ${fen}`);
        worker.postMessage(`go depth ${config.depth} movetime ${config.moveTime}`);
      });
    },
    []
  );

  return { isReady, getBestMove };
}
