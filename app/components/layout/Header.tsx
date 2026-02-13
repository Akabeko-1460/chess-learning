"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 flex h-[90px] w-full items-center justify-between bg-white px-6 shadow-[0_2px_15px_rgba(0,0,0,0.03)] md:px-[100px]">
      <Link href="/" className="flex items-center gap-2.5 font-serif text-[32px] text-navy">
        <i className="ri-chess-fill text-[36px]" />
        ChessLearn
      </Link>

      <button
        className="text-3xl text-navy md:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="メニュー"
      >
        <i className={menuOpen ? "ri-close-line" : "ri-menu-line"} />
      </button>

      <nav
        className={`${
          menuOpen ? "flex" : "hidden"
        } absolute top-[90px] left-0 w-full flex-col items-center gap-6 bg-white py-6 shadow-md md:static md:flex md:w-auto md:flex-row md:gap-10 md:py-0 md:shadow-none`}
      >
        <Link
          href="/"
          className="text-lg font-medium text-[#4A5568] transition-colors hover:text-navy"
          onClick={() => setMenuOpen(false)}
        >
          ホーム
        </Link>
        <Link
          href="/tutorial"
          className="text-lg font-medium text-[#4A5568] transition-colors hover:text-navy"
          onClick={() => setMenuOpen(false)}
        >
          チュートリアル
        </Link>
        <Link
          href="/play"
          className="text-lg font-medium text-[#4A5568] transition-colors hover:text-navy"
          onClick={() => setMenuOpen(false)}
        >
          プレイ
        </Link>
      </nav>

      <Link
        href="/tutorial"
        className="hidden rounded-md bg-navy px-7 py-3 text-base font-medium text-white transition-colors hover:bg-navy-light md:inline-block"
      >
        学習を始める
      </Link>
    </header>
  );
}
