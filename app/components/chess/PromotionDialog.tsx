"use client";

interface PromotionDialogProps {
  color: "w" | "b";
  onSelect: (piece: "q" | "r" | "b" | "n") => void;
  onCancel: () => void;
}

const pieces = [
  { key: "q" as const, icon: "ri-chess-queen-fill", label: "クイーン" },
  { key: "r" as const, icon: "ri-chess-rook-fill", label: "ルーク" },
  { key: "b" as const, icon: "ri-chess-bishop-fill", label: "ビショップ" },
  { key: "n" as const, icon: "ri-chess-knight-fill", label: "ナイト" },
];

export default function PromotionDialog({ color, onSelect, onCancel }: PromotionDialogProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onCancel}>
      <div
        className="rounded-xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="mb-4 text-center text-lg font-bold text-navy">プロモーション</h3>
        <p className="mb-4 text-center text-sm text-text-secondary">昇格する駒を選んでください</p>
        <div className="flex gap-3">
          {pieces.map((p) => (
            <button
              key={p.key}
              onClick={() => onSelect(p.key)}
              className="flex flex-col items-center gap-1 rounded-lg border border-border p-4 transition-colors hover:border-accent-green hover:bg-accent-green/10"
            >
              <i className={`${p.icon} text-4xl ${color === "w" ? "text-navy" : "text-gray-700"}`} />
              <span className="text-xs text-text-secondary">{p.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
