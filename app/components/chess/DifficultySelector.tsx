"use client";

export type Difficulty = "beginner" | "easy" | "medium" | "hard";

interface DifficultySelectorProps {
  selected: Difficulty;
  onChange: (d: Difficulty) => void;
}

const levels: { key: Difficulty; label: string; description: string }[] = [
  { key: "beginner", label: "初心者", description: "ランダムに近い手を指します" },
  { key: "easy", label: "初級", description: "基本的な戦略で対局します" },
  { key: "medium", label: "中級", description: "しっかり考えて手を指します" },
  { key: "hard", label: "上級", description: "最善手に近い手を指します" },
];

export default function DifficultySelector({ selected, onChange }: DifficultySelectorProps) {
  return (
    <div className="rounded-lg bg-white p-4 shadow-sm">
      <div className="mb-3 text-sm font-medium text-text-secondary">難易度</div>
      <div className="grid grid-cols-2 gap-2">
        {levels.map((level) => (
          <button
            key={level.key}
            onClick={() => onChange(level.key)}
            className={`rounded-lg border px-3 py-2 text-left transition-colors ${
              selected === level.key
                ? "border-navy bg-navy text-white"
                : "border-border hover:border-navy-light"
            }`}
          >
            <div className="text-sm font-bold">{level.label}</div>
            <div
              className={`text-xs ${
                selected === level.key ? "text-white/70" : "text-text-secondary"
              }`}
            >
              {level.description}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
