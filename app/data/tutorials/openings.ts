import type { TutorialModule } from "./types";

export const openingsModule: TutorialModule = {
  id: "openings",
  title: "オープニング戦略",
  description: "人気のオープニングとその基本的な考え方を学びましょう。",
  icon: "ri-sword-line",
  lessons: [
    {
      slug: "opening-principles",
      title: "オープニングの原則",
      description: "序盤の基本的な考え方を学びます。",
      steps: [
        {
          instruction: "オープニングの3つの原則：\n①中央を支配する\n②駒を展開する\n③キングの安全を確保する",
          fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
        },
        {
          instruction: "①中央を支配する：e4とd4にポーンを進め、中央の4マスをコントロールしましょう。中央を支配すると駒の活動範囲が広がります。",
          fen: "rnbqkbnr/pppppppp/8/8/3PP3/8/PPP2PPP/RNBQKBNR b KQkq - 0 2",
          highlights: {
            e4: { backgroundColor: "rgba(72, 187, 120, 0.5)" },
            d4: { backgroundColor: "rgba(72, 187, 120, 0.5)" },
            e5: { backgroundColor: "rgba(72, 187, 120, 0.2)" },
            d5: { backgroundColor: "rgba(72, 187, 120, 0.2)" },
          },
        },
        {
          instruction: "②③駒を展開し、キングの安全を確保する：ナイトとビショップを展開した後、キャスリングでキングを安全な位置に移動させましょう。これが理想的な序盤の完成形です。",
          fen: "r1bq1rk1/ppppbppp/2n2n2/4p3/2B1P3/3P1N2/PPP2PPP/RNBQ1RK1 b - - 0 5",
          highlights: {
            g1: { backgroundColor: "rgba(72, 187, 120, 0.5)" },
            f1: { backgroundColor: "rgba(72, 187, 120, 0.3)" },
            f3: { backgroundColor: "rgba(72, 187, 120, 0.3)" },
            c4: { backgroundColor: "rgba(72, 187, 120, 0.3)" },
          },
          arrows: [["e1", "g1"]],
        },
      ],
    },
    {
      slug: "italian-game",
      title: "イタリアンゲーム",
      description: "最も古典的なオープニングの一つを学びます。",
      steps: [
        {
          instruction: "イタリアンゲームは1.e4 e5 2.Nf3 Nc6 3.Bc4で始まります。ビショップがf7を狙う攻撃的なオープニングです。",
          fen: "r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3",
          arrows: [["c4", "f7"]],
        },
        {
          instruction: "白のビショップはc4からf7の弱点（キングの隣のポーン）を狙っています。",
          fen: "r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3",
          highlights: {
            c4: { backgroundColor: "rgba(72, 187, 120, 0.5)" },
            f7: { backgroundColor: "rgba(255, 0, 0, 0.3)" },
          },
        },
      ],
    },
    {
      slug: "sicilian-defense",
      title: "シシリアンディフェンス",
      description: "黒の最も人気のある応手を学びます。",
      steps: [
        {
          instruction: "シシリアンディフェンスは1.e4 c5で始まります。黒は非対称な局面を目指し、反撃のチャンスを狙います。",
          fen: "rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2",
        },
        {
          instruction: "c5のポーンはd4への白の拡張を牽制しています。黒はクイーンサイドでの反撃を準備します。",
          fen: "rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2",
          highlights: {
            c5: { backgroundColor: "rgba(72, 187, 120, 0.5)" },
            d4: { backgroundColor: "rgba(255, 0, 0, 0.2)" },
          },
        },
      ],
    },
    {
      slug: "french-defense",
      title: "フレンチディフェンス",
      description: "堅実な防御オープニングを学びます。",
      steps: [
        {
          instruction: "フレンチディフェンスは1.e4 e6で始まります。黒は堅実なポーン構造を作り、d5への反撃を準備します。",
          fen: "rnbqkbnr/pppp1ppp/4p3/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2",
        },
        {
          instruction: "次に黒はd5を指して中央に反撃します。e6のポーンがd5のポーンをサポートする構造です。",
          fen: "rnbqkbnr/ppp2ppp/4p3/3p4/4P3/8/PPPP1PPP/RNBQKBNR w KQkq d6 0 2",
          arrows: [["e6", "d5"]],
          highlights: {
            d5: { backgroundColor: "rgba(72, 187, 120, 0.5)" },
            e6: { backgroundColor: "rgba(72, 187, 120, 0.3)" },
          },
        },
      ],
    },
    {
      slug: "queens-gambit",
      title: "クイーンズギャンビット",
      description: "d4から始まるクイーンズギャンビットを学びます。",
      steps: [
        {
          instruction: "クイーンズギャンビットは1.d4 d5 2.c4で始まります。白はc4のポーンを犠牲にして中央の支配を狙います。",
          fen: "rnbqkbnr/ppp1pppp/8/3p4/2PP4/8/PP2PPPP/RNBQKBNR b KQkq - 0 2",
          arrows: [["c4", "d5"]],
        },
        {
          instruction: "黒がdxc4と取ると「クイーンズギャンビットアクセプテッド」、取らないと「デクラインド」と呼ばれます。",
          fen: "rnbqkbnr/ppp1pppp/8/3p4/2PP4/8/PP2PPPP/RNBQKBNR b KQkq - 0 2",
          highlights: {
            c4: { backgroundColor: "rgba(255, 0, 0, 0.3)" },
            d5: { backgroundColor: "rgba(72, 187, 120, 0.5)" },
          },
        },
      ],
    },
    {
      slug: "london-system",
      title: "ロンドンシステム",
      description: "初心者に人気のシンプルなオープニングを学びます。",
      steps: [
        {
          instruction: "ロンドンシステムは1.d4の後、Bf4と展開する堅実なシステムです。相手の手に関係なく同じセットアップが使えます。",
          fen: "rnbqkb1r/ppp1pppp/5n2/3p4/3P1B2/5N2/PPP1PPPP/RN1QKB1R b KQkq - 3 3",
          highlights: {
            f4: { backgroundColor: "rgba(72, 187, 120, 0.5)" },
            f3: { backgroundColor: "rgba(72, 187, 120, 0.3)" },
            d4: { backgroundColor: "rgba(72, 187, 120, 0.3)" },
          },
        },
      ],
    },
    {
      slug: "kings-indian",
      title: "キングズインディアン",
      description: "ハイパーモダンな防御を学びます。",
      steps: [
        {
          instruction: "キングズインディアンディフェンスでは黒はg6-Bg7と展開し、中央を後から反撃します。",
          fen: "rnbqk2r/ppppppbp/5np1/8/2PP4/2N5/PP2PPPP/R1BQKBNR w KQkq - 2 3",
          highlights: {
            g7: { backgroundColor: "rgba(72, 187, 120, 0.5)" },
            g6: { backgroundColor: "rgba(72, 187, 120, 0.3)" },
          },
        },
        {
          instruction: "g7のビショップの配置を「フィアンケット」と呼びます。ビショップはg7からa1への長い対角線を支配し、中央と相手のクイーンサイドに強い影響力を持ちます。",
          fen: "rnbqk2r/ppppppbp/5np1/8/2PP4/2N5/PP2PPPP/R1BQKBNR w KQkq - 2 3",
          highlights: {
            g7: { backgroundColor: "rgba(72, 187, 120, 0.5)" },
          },
          arrows: [["g7", "a1"]],
        },
      ],
    },
    {
      slug: "ruy-lopez",
      title: "ルイ・ロペス",
      description: "スペインオープニングとも呼ばれる定番を学びます。",
      steps: [
        {
          instruction: "ルイ・ロペスは1.e4 e5 2.Nf3 Nc6 3.Bb5で始まります。ビショップがc6のナイトにプレッシャーをかけます。",
          fen: "r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3",
          arrows: [["b5", "c6"]],
        },
        {
          instruction: "ビショップはナイトを直接取る脅威を作り、間接的にe5のポーンへの圧力を高めています。",
          fen: "r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3",
          highlights: {
            b5: { backgroundColor: "rgba(72, 187, 120, 0.5)" },
            c6: { backgroundColor: "rgba(255, 0, 0, 0.3)" },
            e5: { backgroundColor: "rgba(255, 0, 0, 0.2)" },
          },
        },
      ],
    },
  ],
};
