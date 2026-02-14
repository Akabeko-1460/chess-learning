import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface px-6 pt-20 pb-10 md:px-[100px]">
      <div className="mb-15 flex flex-col justify-between gap-10 md:flex-row">
        <div>
          <h2 className="mb-4 font-serif text-[28px] text-navy">
            <i className="ri-chess-fill" /> ChessLearn
          </h2>
          <p className="max-w-[300px] text-text-secondary">
            チェスの世界をすべての人に。今日からマスターへの旅を始めましょう。
          </p>
        </div>
        <div className="flex flex-wrap gap-16">
          <div>
            <h5 className="mb-5 text-lg font-bold text-text-primary">学ぶ</h5>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/tutorial/rules"
                  className="text-text-secondary transition-colors hover:text-navy"
                >
                  基本ルール
                </Link>
              </li>
              <li>
                <Link
                  href="/tutorial/openings"
                  className="text-text-secondary transition-colors hover:text-navy"
                >
                  オープニング
                </Link>
              </li>
              <li>
                <Link
                  href="/tutorial/strategy"
                  className="text-text-secondary transition-colors hover:text-navy"
                >
                  戦略
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="mb-5 text-lg font-bold text-text-primary">プレイ</h5>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/play/cpu"
                  className="text-text-secondary transition-colors hover:text-navy"
                >
                  CPU対戦
                </Link>
              </li>
              <li>
                <Link
                  href="/play/local"
                  className="text-text-secondary transition-colors hover:text-navy"
                >
                  ローカル対人戦
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
