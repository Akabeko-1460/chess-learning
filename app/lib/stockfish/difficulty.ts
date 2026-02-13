import type { Difficulty } from "@/app/components/chess/DifficultySelector";

export interface DifficultyConfig {
  skillLevel: number;
  depth: number;
  moveTime: number;
}

export const difficultySettings: Record<Difficulty, DifficultyConfig> = {
  beginner: { skillLevel: 0, depth: 1, moveTime: 100 },
  easy: { skillLevel: 5, depth: 5, moveTime: 500 },
  medium: { skillLevel: 10, depth: 10, moveTime: 1000 },
  hard: { skillLevel: 18, depth: 15, moveTime: 2000 },
};
