import type { TutorialModule } from "./types";

export const strategyModule: TutorialModule = {
  id: "strategy",
  title: "基本戦略",
  description: "駒の価値、タクティクス、ポジショナルプレイの基礎を身につけましょう。",
  icon: "ri-flag-line",
  lessons: [
    {
      slug: "piece-values",
      title: "駒の価値",
      description: "各駒の相対的な価値を学びます。",
      steps: [
        {
          instruction: "駒には相対的な価値があります。ポーン=1、ナイト=3、ビショップ=3、ルーク=5、クイーン=9。キングは無限大（取られたら負け）です。",
          fen: "8/8/8/8/8/8/PPPPPPPP/RNBQKBNR w - - 0 1",
        },
        {
          instruction: "駒の交換では価値のバランスを考えましょう。ナイト(3)をルーク(5)と交換できれば有利です。逆にクイーン(9)をビショップ(3)と交換するのは大損です。",
          fen: "4k3/8/8/8/3n4/8/8/3RK3 w - - 0 1",
          highlights: {
            d1: { backgroundColor: "rgba(72, 187, 120, 0.5)" },
            d4: { backgroundColor: "rgba(255, 0, 0, 0.3)" },
          },
        },
      ],
    },
    {
      slug: "center-control",
      title: "中央の支配",
      description: "中央マスの重要性を学びます。",
      steps: [
        {
          instruction: "e4, d4, e5, d5の4マスが「中央」です。中央を支配する駒はボード全体に影響力を持ちます。",
          fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
          highlights: {
            e4: { backgroundColor: "rgba(72, 187, 120, 0.3)" },
            d4: { backgroundColor: "rgba(72, 187, 120, 0.3)" },
            e5: { backgroundColor: "rgba(72, 187, 120, 0.3)" },
            d5: { backgroundColor: "rgba(72, 187, 120, 0.3)" },
          },
        },
        {
          instruction: "中央が重要な理由：中央にいるナイトは最大8マスに利きますが、隅のナイトはわずか2マスしか利きません。ポーンとナイトで中央を支配した理想的な展開を見てみましょう。",
          fen: "rnbqkbnr/pppppppp/8/8/3PP3/2N2N2/PPP2PPP/R1BQKB1R b KQkq - 3 3",
          highlights: {
            d4: { backgroundColor: "rgba(72, 187, 120, 0.5)" },
            e4: { backgroundColor: "rgba(72, 187, 120, 0.5)" },
            c3: { backgroundColor: "rgba(72, 187, 120, 0.3)" },
            f3: { backgroundColor: "rgba(72, 187, 120, 0.3)" },
          },
        },
      ],
    },
    {
      slug: "fork",
      title: "フォーク（両取り）",
      description: "一手で2つ以上の駒を攻撃する技を学びます。",
      steps: [
        {
          instruction: "フォークとは、一つの駒で複数の相手駒を同時に攻撃することです。特にナイトのフォークは強力です。d5のナイトに注目しましょう。",
          fen: "r1bqkb1r/pppp1ppp/2n2n2/3Np3/2B1P3/5N2/PPPP1PPP/R1BQK2R w KQkq - 4 4",
          highlights: {
            d5: { backgroundColor: "rgba(72, 187, 120, 0.5)" },
          },
        },
        {
          instruction: "ナイトがc7に跳ぶとチェックになり、同時にa8のルークも攻撃しています！キングはチェック回避が最優先なので、その後ナイトでルークを取れます。",
          fen: "r1bqkb1r/ppNp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/R1BQK2R b KQkq - 5 4",
          highlights: {
            c7: { backgroundColor: "rgba(72, 187, 120, 0.5)" },
            e8: { backgroundColor: "rgba(255, 0, 0, 0.3)" },
            a8: { backgroundColor: "rgba(255, 0, 0, 0.3)" },
          },
          arrows: [["c7", "e8"], ["c7", "a8"]],
        },
      ],
    },
    {
      slug: "pin",
      title: "ピン（釘付け）",
      description: "駒をキングの前に釘付けにする技を学びます。",
      steps: [
        {
          instruction: "ピンとは、動くとその背後の価値の高い駒（特にキング）が取られてしまうため、駒が動けない状態のことです。",
          fen: "rnbqk1nr/pppp1ppp/8/4p3/1b6/2NP4/PPP1PPPP/R1BQKBNR w KQkq - 1 3",
          arrows: [["b4", "e1"]],
          highlights: {
            c3: { backgroundColor: "rgba(255, 0, 0, 0.3)" },
          },
        },
        {
          instruction: "b4のビショップがc3のナイトをピンしています。ナイトが動くとキングが取られてしまうため、ナイトは動けません。",
          fen: "rnbqk1nr/pppp1ppp/8/4p3/1b6/2NP4/PPP1PPPP/R1BQKBNR w KQkq - 1 3",
          highlights: {
            b4: { backgroundColor: "rgba(72, 187, 120, 0.5)" },
            c3: { backgroundColor: "rgba(255, 0, 0, 0.4)" },
            e1: { backgroundColor: "rgba(255, 0, 0, 0.2)" },
          },
        },
      ],
    },
    {
      slug: "discovered-attack",
      title: "ディスカバードアタック",
      description: "駒を動かすことで隠れた攻撃を発見する技を学びます。",
      steps: [
        {
          instruction: "ディスカバードアタックとは、駒を動かすことで、その背後にある駒の攻撃ラインを開く戦術です。d5のナイトとc4のビショップに注目しましょう。",
          fen: "r1bqkb1r/pppp1ppp/2n2n2/3Np3/2B1P3/8/PPPP1PPP/RNBQK2R w KQkq - 4 4",
          highlights: {
            d5: { backgroundColor: "rgba(72, 187, 120, 0.5)" },
            c4: { backgroundColor: "rgba(72, 187, 120, 0.3)" },
          },
        },
        {
          instruction: "ナイトがc7に移動すると、キングにチェックをかけると同時に、c4のビショップからf7への攻撃ラインが開きます。チェック回避が最優先のため、f7のポーンを守れません。",
          fen: "r1bqkb1r/ppNp1ppp/2n2n2/4p3/2B1P3/8/PPPP1PPP/RNBQK2R b KQkq - 5 4",
          highlights: {
            c7: { backgroundColor: "rgba(72, 187, 120, 0.5)" },
            e8: { backgroundColor: "rgba(255, 0, 0, 0.4)" },
            f7: { backgroundColor: "rgba(255, 0, 0, 0.3)" },
          },
          arrows: [["c7", "e8"], ["c4", "f7"]],
        },
      ],
    },
    {
      slug: "development",
      title: "駒の展開",
      description: "効率的に駒を展開する重要性を学びます。",
      steps: [
        {
          instruction: "序盤ではすべての駒を早く活用できるようにすることが重要です。同じ駒を何度も動かすよりも、新しい駒を展開しましょう。",
          fen: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1",
        },
        {
          instruction: "ナイトとビショップを早期に展開し、キャスリングでキングの安全を確保するのが理想的な序盤の進め方です。",
          fen: "r1bqk2r/ppppbppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4",
          highlights: {
            f3: { backgroundColor: "rgba(72, 187, 120, 0.3)" },
            c4: { backgroundColor: "rgba(72, 187, 120, 0.3)" },
            c6: { backgroundColor: "rgba(72, 187, 120, 0.3)" },
            f6: { backgroundColor: "rgba(72, 187, 120, 0.3)" },
            e7: { backgroundColor: "rgba(72, 187, 120, 0.3)" },
          },
        },
      ],
    },
  ],
};
