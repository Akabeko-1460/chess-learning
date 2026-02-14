import type { Square } from "react-chessboard/dist/chessboard/types";

export interface LessonStep {
  instruction: string;
  fen: string;
  highlights?: Record<string, React.CSSProperties>;
  arrows?: [Square, Square][];
}

export interface Lesson {
  slug: string;
  title: string;
  description: string;
  steps: LessonStep[];
}

export interface TutorialModule {
  id: string;
  title: string;
  description: string;
  icon: string;
  lessons: Lesson[];
}
