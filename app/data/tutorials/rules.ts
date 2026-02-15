import type { TutorialModule } from "./types";

export const rulesModule: TutorialModule = {
  id: "rules",
  title: "基本ルール",
  description: "駒の動き方、特殊ルール、チェックメイトの基本を学びましょう。",
  icon: "ri-book-open-line",
  lessons: [
    {
      slug: "board-setup",
      title: "ボードの配置",
      description: "チェスボードの正しい配置方法を学びます。",
      steps: [
        {
          instruction: "チェスボードは8×8の64マスで構成されています。白は下側、黒は上側に配置します。これが初期配置です。",
          fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
        },
        {
          instruction: "白のキングはe1（右から4番目）に配置されます。黒のキングはe8に配置されます。",
          fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
          highlights: {
            e1: { backgroundColor: "rgba(72, 187, 120, 0.5)" },
            e8: { backgroundColor: "rgba(72, 187, 120, 0.5)" },
          },
        },
        {
          instruction: "クイーンは自分の色のマスに配置します。白のクイーンはd1（白マス）、黒のクイーンはd8（黒マス）です。",
          fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
          highlights: {
            d1: { backgroundColor: "rgba(72, 187, 120, 0.5)" },
            d8: { backgroundColor: "rgba(72, 187, 120, 0.5)" },
          },
        },
      ],
    },
    {
      slug: "pawn-movement",
      title: "ポーンの動き",
      description: "ポーンの前進、初手2マス、斜め取りを学びます。",
      steps: [
        {
          instruction: "ポーンは前方に1マス進めます。初期位置からは2マス進めることもできます。e2のポーンを見てみましょう。",
          fen: "7k/8/8/8/8/8/4P3/4K3 w - - 0 1",
          highlights: {
            e2: { backgroundColor: "rgba(72, 187, 120, 0.5)" },
            e3: { backgroundColor: "rgba(72, 187, 120, 0.3)" },
            e4: { backgroundColor: "rgba(72, 187, 120, 0.3)" },
          },
          arrows: [["e2", "e3"], ["e2", "e4"]],
        },
        {
          instruction: "ポーンは斜め前方の駒を取ることができます。e4のポーンはd5またはf5の駒を取れます。",
          fen: "7k/8/8/3p1p2/4P3/8/8/4K3 w - - 0 1",
          highlights: {
            e4: { backgroundColor: "rgba(72, 187, 120, 0.5)" },
            d5: { backgroundColor: "rgba(255, 0, 0, 0.3)" },
            f5: { backgroundColor: "rgba(255, 0, 0, 0.3)" },
          },
          arrows: [["e4", "d5"], ["e4", "f5"]],
        },
      ],
    },
    {
      slug: "rook-movement",
      title: "ルークの動き",
      description: "ルークの縦横移動を学びます。",
      steps: [
        {
          instruction: "ルークは縦横に何マスでも動けます。d4のルークの動ける範囲を確認しましょう。",
          fen: "7k/8/8/8/3R4/8/8/4K3 w - - 0 1",
          highlights: {
            d4: { backgroundColor: "rgba(72, 187, 120, 0.5)" },
            d1: { backgroundColor: "rgba(72, 187, 120, 0.2)" },
            d2: { backgroundColor: "rgba(72, 187, 120, 0.2)" },
            d3: { backgroundColor: "rgba(72, 187, 120, 0.2)" },
            d5: { backgroundColor: "rgba(72, 187, 120, 0.2)" },
            d6: { backgroundColor: "rgba(72, 187, 120, 0.2)" },
            d7: { backgroundColor: "rgba(72, 187, 120, 0.2)" },
            d8: { backgroundColor: "rgba(72, 187, 120, 0.2)" },
            a4: { backgroundColor: "rgba(72, 187, 120, 0.2)" },
            b4: { backgroundColor: "rgba(72, 187, 120, 0.2)" },
            c4: { backgroundColor: "rgba(72, 187, 120, 0.2)" },
            e4: { backgroundColor: "rgba(72, 187, 120, 0.2)" },
            f4: { backgroundColor: "rgba(72, 187, 120, 0.2)" },
            g4: { backgroundColor: "rgba(72, 187, 120, 0.2)" },
            h4: { backgroundColor: "rgba(72, 187, 120, 0.2)" },
          },
          arrows: [["d4", "d8"], ["d4", "d1"], ["d4", "a4"], ["d4", "h4"]],
        },
      ],
    },
    {
      slug: "bishop-movement",
      title: "ビショップの動き",
      description: "ビショップの斜め移動を学びます。",
      steps: [
        {
          instruction: "ビショップは斜めに何マスでも動けます。d4のビショップの動ける範囲を確認しましょう。4つの対角線方向に移動できます。",
          fen: "6k1/8/8/8/3B4/8/8/4K3 w - - 0 1",
          arrows: [["d4", "a7"], ["d4", "h8"], ["d4", "a1"], ["d4", "g1"]],
        },
      ],
    },
    {
      slug: "knight-movement",
      title: "ナイトの動き",
      description: "ナイトのL字型移動を学びます。",
      steps: [
        {
          instruction: "ナイトはL字型に動きます。2マス直進+1マス横、または1マス直進+2マス横です。他の駒を飛び越えられる唯一の駒です。",
          fen: "7k/8/8/8/3N4/8/8/4K3 w - - 0 1",
          highlights: {
            d4: { backgroundColor: "rgba(72, 187, 120, 0.5)" },
            c6: { backgroundColor: "rgba(72, 187, 120, 0.3)" },
            e6: { backgroundColor: "rgba(72, 187, 120, 0.3)" },
            f5: { backgroundColor: "rgba(72, 187, 120, 0.3)" },
            f3: { backgroundColor: "rgba(72, 187, 120, 0.3)" },
            e2: { backgroundColor: "rgba(72, 187, 120, 0.3)" },
            c2: { backgroundColor: "rgba(72, 187, 120, 0.3)" },
            b3: { backgroundColor: "rgba(72, 187, 120, 0.3)" },
            b5: { backgroundColor: "rgba(72, 187, 120, 0.3)" },
          },
        },
      ],
    },
    {
      slug: "queen-movement",
      title: "クイーンの動き",
      description: "クイーンの縦横斜め移動を学びます。",
      steps: [
        {
          instruction: "クイーンはルークとビショップを合わせた動きができます。縦横斜めの8方向に何マスでも動けます。最も強力な駒です。",
          fen: "6k1/8/8/8/3Q4/8/8/7K w - - 0 1",
          arrows: [
            ["d4", "d8"], ["d4", "d1"],
            ["d4", "h4"], ["d4", "a4"],
            ["d4", "h8"], ["d4", "a7"],
            ["d4", "g1"], ["d4", "a1"],
          ],
        },
      ],
    },
    {
      slug: "king-movement",
      title: "キングの動き",
      description: "キングの移動と制約を学びます。",
      steps: [
        {
          instruction: "キングは全方向に1マスだけ動けます。キングが取られるとゲーム終了なので、最も大切な駒です。",
          fen: "7k/8/8/8/3K4/8/8/8 w - - 0 1",
          highlights: {
            d4: { backgroundColor: "rgba(72, 187, 120, 0.5)" },
            c5: { backgroundColor: "rgba(72, 187, 120, 0.3)" },
            d5: { backgroundColor: "rgba(72, 187, 120, 0.3)" },
            e5: { backgroundColor: "rgba(72, 187, 120, 0.3)" },
            c4: { backgroundColor: "rgba(72, 187, 120, 0.3)" },
            e4: { backgroundColor: "rgba(72, 187, 120, 0.3)" },
            c3: { backgroundColor: "rgba(72, 187, 120, 0.3)" },
            d3: { backgroundColor: "rgba(72, 187, 120, 0.3)" },
            e3: { backgroundColor: "rgba(72, 187, 120, 0.3)" },
          },
        },
      ],
    },
    {
      slug: "check",
      title: "チェック",
      description: "チェック（王手）の概念を学びます。",
      steps: [
        {
          instruction: "キングが相手の駒に攻撃されている状態を「チェック」と言います。チェックされたら必ず回避しなければなりません。b4のビショップがe1のキングをチェックしています。",
          fen: "7k/8/8/8/1b6/8/8/4K3 w - - 0 1",
          highlights: {
            e1: { backgroundColor: "rgba(255, 0, 0, 0.4)" },
          },
          arrows: [["b4", "e1"]],
        },
      ],
    },
    {
      slug: "checkmate",
      title: "チェックメイト",
      description: "チェックメイトの条件を学びます。",
      steps: [
        {
          instruction: "チェックメイトとは、チェックを回避する手段がない状態です。これでゲーム終了、チェックメイトした側の勝ちです。ルークをa8に動かすと黒キングは逃げ場がなくなります。",
          fen: "6k1/5ppp/8/8/8/8/8/R3K3 w - - 0 1",
          arrows: [["a1", "a8"]],
        },
      ],
    },
    {
      slug: "castling",
      title: "キャスリング",
      description: "キャスリングの条件とやり方を学びます。",
      steps: [
        {
          instruction: "キャスリングはキングとルークを同時に動かす特殊な手です。キングを2マス横に動かし、ルークがキングを飛び越えます。",
          fen: "r3k2r/pppppppp/8/8/8/8/PPPPPPPP/R3K2R w KQkq - 0 1",
          arrows: [["e1", "g1"]],
        },
      ],
    },
    {
      slug: "en-passant",
      title: "アンパッサン",
      description: "アンパッサン（通過捕獲）を学びます。",
      steps: [
        {
          instruction: "アンパッサンは特殊なポーン取りです。相手のポーンが初期位置から2マス進んだ直後、隣にいる自分のポーンで斜めに取れます。",
          fen: "4K3/8/8/8/4Pp2/8/8/7k b - e3 0 1",
          arrows: [["f4", "e3"]],
          highlights: {
            e4: { backgroundColor: "rgba(255, 0, 0, 0.3)" },
            e3: { backgroundColor: "rgba(72, 187, 120, 0.3)" },
          },
        },
      ],
    },
    {
      slug: "promotion",
      title: "プロモーション",
      description: "ポーンの昇格を学びます。",
      steps: [
        {
          instruction: "ポーンが相手側の最後の列に到達すると、クイーン、ルーク、ビショップ、ナイトのいずれかに昇格できます。通常はクイーンを選びます。",
          fen: "7k/4P3/8/8/8/8/8/4K3 w - - 0 1",
          arrows: [["e7", "e8"]],
          highlights: {
            e7: { backgroundColor: "rgba(72, 187, 120, 0.5)" },
            e8: { backgroundColor: "rgba(72, 187, 120, 0.3)" },
          },
        },
      ],
    },
  ],
};
