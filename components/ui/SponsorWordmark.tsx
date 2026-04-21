import type { CSSProperties, SVGProps } from "react";

export type WordmarkVariant = "display" | "italic" | "serif" | "sansLight";
export type WordmarkAccent =
  | "none"
  | "dot"
  | "square"
  | "bar"
  | "underline"
  | "slash"
  | "triangle"
  | "dash"
  | "star"
  | "pipe"
  | "chevron";

export type SponsorMark = {
  id: string;
  name: string;
  primary: string;
  sub?: string;
  variant?: WordmarkVariant;
  accent?: WordmarkAccent;
  size?: number;
  letter?: number;
  weight?: number;
  subSize?: number;
  subLetter?: number;
};

const FONT: Record<WordmarkVariant, string> = {
  display:
    "var(--font-oswald), 'Oswald', 'Arial Narrow', 'Helvetica Neue', sans-serif",
  italic:
    "var(--font-inter), 'Inter', 'Helvetica Neue', Arial, sans-serif",
  serif: "'Playfair Display', Georgia, 'Times New Roman', serif",
  sansLight:
    "var(--font-inter), 'Inter', 'Helvetica Neue', Arial, sans-serif",
};

function AccentMark({ type }: { type: WordmarkAccent }) {
  switch (type) {
    case "dot":
      return <circle cx="24" cy="40" r="4" />;
    case "square":
      return <rect x="18" y="34" width="14" height="14" />;
    case "bar":
      return <rect x="18" y="20" width="5" height="40" />;
    case "triangle":
      return <polygon points="18,58 34,58 26,30" />;
    case "slash":
      return (
        <rect
          x="12"
          y="18"
          width="5"
          height="44"
          transform="rotate(-18 14 40)"
        />
      );
    case "dash":
      return <rect x="14" y="38" width="22" height="4" />;
    case "star":
      return (
        <path d="M24 26 L27 36 L37 36 L29 42 L32 52 L24 46 L16 52 L19 42 L11 36 L21 36 Z" />
      );
    case "pipe":
      return <rect x="22" y="24" width="2" height="32" />;
    case "chevron":
      return <path d="M16 28 L28 40 L16 52 M24 28 L36 40 L24 52" fill="none" stroke="currentColor" strokeWidth="3" />;
    case "underline":
    case "none":
    default:
      return null;
  }
}

export function WordmarkSVG({
  mark,
  ...rest
}: { mark: SponsorMark } & SVGProps<SVGSVGElement>) {
  const variant = mark.variant ?? "display";
  const weight = mark.weight ?? 700;
  const letter = mark.letter ?? 1;
  const size = mark.size ?? 30;
  const subSize = mark.subSize ?? 10;
  const subLetter = mark.subLetter ?? 3.5;

  const fontStyle: CSSProperties = {
    fontFamily: FONT[variant],
    fontWeight: weight,
    fontStyle: variant === "italic" ? "italic" : "normal",
    letterSpacing: `${letter}px`,
  };
  const subStyle: CSSProperties = {
    fontFamily: FONT.sansLight,
    fontWeight: 400,
    letterSpacing: `${subLetter}px`,
  };

  const hasSideAccent =
    mark.accent &&
    mark.accent !== "none" &&
    mark.accent !== "underline";

  const textX = hasSideAccent ? 46 : 20;
  const primaryY = mark.sub ? 42 : 52;
  const subY = 64;
  const estWidth = Math.min(mark.primary.length * (size * 0.55), 210);

  return (
    <svg
      viewBox="0 0 260 80"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      aria-label={mark.name}
      role="img"
      {...rest}
    >
      <AccentMark type={mark.accent ?? "none"} />
      <text
        x={textX}
        y={primaryY}
        fontSize={size}
        style={fontStyle}
        dominantBaseline="alphabetic"
      >
        {mark.primary}
      </text>
      {mark.accent === "underline" && (
        <rect x={textX} y={primaryY + 4} width={estWidth} height="2" />
      )}
      {mark.sub && (
        <text
          x={textX}
          y={subY}
          fontSize={subSize}
          style={subStyle}
          opacity={0.75}
        >
          {mark.sub}
        </text>
      )}
    </svg>
  );
}

export const SPONSOR_LOGOS: SponsorMark[] = [
  {
    id: "honda",
    name: "HONDA",
    primary: "HONDA",
    variant: "display",
    weight: 700,
    letter: 6,
    size: 40,
    accent: "bar",
  },
  {
    id: "gsyuasa",
    name: "GS YUASA",
    primary: "GS YUASA",
    sub: "BATTERY",
    variant: "display",
    weight: 700,
    letter: 3,
    size: 28,
    accent: "square",
  },
  {
    id: "solidworks",
    name: "SolidWorks",
    primary: "SolidWorks",
    sub: "3D CAD",
    variant: "display",
    weight: 700,
    letter: 0,
    size: 28,
    accent: "dot",
  },
  {
    id: "autodesk",
    name: "Autodesk",
    primary: "Autodesk",
    sub: "GENERATIVE",
    variant: "italic",
    weight: 600,
    letter: 0,
    size: 32,
    accent: "slash",
  },
  {
    id: "ipg",
    name: "IPG Automotive",
    primary: "IPG",
    sub: "AUTOMOTIVE",
    variant: "display",
    weight: 700,
    letter: 6,
    size: 38,
    accent: "triangle",
  },
  {
    id: "kobelco",
    name: "神戸製鋼",
    primary: "KOBELCO",
    sub: "神戸製鋼",
    variant: "display",
    weight: 700,
    letter: 3,
    size: 26,
    accent: "bar",
  },
  {
    id: "tsuge",
    name: "柘植製作所",
    primary: "TSUGE",
    sub: "MFG.",
    variant: "display",
    weight: 700,
    letter: 4,
    size: 30,
    accent: "dot",
  },
  {
    id: "sango",
    name: "三五",
    primary: "SANGO",
    sub: "三五",
    variant: "display",
    weight: 700,
    letter: 4,
    size: 28,
    accent: "square",
  },
  {
    id: "nok",
    name: "NOK",
    primary: "NOK",
    sub: "SEALS",
    variant: "display",
    weight: 700,
    letter: 10,
    size: 40,
    accent: "underline",
  },
  {
    id: "ntn",
    name: "NTN",
    primary: "NTN",
    sub: "BEARINGS",
    variant: "display",
    weight: 700,
    letter: 10,
    size: 40,
    accent: "dot",
  },
  {
    id: "rsr",
    name: "RS-R",
    primary: "RS-R",
    sub: "DAMPER",
    variant: "display",
    weight: 700,
    letter: 2,
    size: 34,
    accent: "star",
  },
  {
    id: "fcc",
    name: "FCC",
    primary: "FCC",
    sub: "LSD",
    variant: "display",
    weight: 700,
    letter: 10,
    size: 40,
    accent: "slash",
  },
  {
    id: "hitachi",
    name: "日立Astemo",
    primary: "Hitachi",
    sub: "Astemo",
    variant: "italic",
    weight: 500,
    letter: 0,
    size: 28,
    accent: "underline",
  },
  {
    id: "gm",
    name: "グループ・エム",
    primary: "GROUP-M",
    sub: "BRAKE LINE",
    variant: "display",
    weight: 700,
    letter: 3,
    size: 26,
    accent: "slash",
  },
  {
    id: "sanei",
    name: "三栄",
    primary: "SANEI",
    sub: "三栄",
    variant: "display",
    weight: 700,
    letter: 4,
    size: 28,
    accent: "dash",
  },
  {
    id: "sanko",
    name: "三光ラジエター",
    primary: "SANKO",
    sub: "RADIATOR",
    variant: "display",
    weight: 700,
    letter: 3,
    size: 28,
    accent: "chevron",
  },
  {
    id: "igus",
    name: "igus",
    primary: "igus",
    sub: "POLYMER",
    variant: "italic",
    weight: 400,
    letter: 1,
    size: 34,
    accent: "dot",
  },
  {
    id: "staubli",
    name: "Stäubli",
    primary: "Stäubli",
    sub: "COUPLING",
    variant: "serif",
    weight: 700,
    letter: 1,
    size: 30,
    accent: "underline",
  },
  {
    id: "kyowa",
    name: "KYOWA",
    primary: "KYOWA",
    sub: "UNIVERSAL",
    variant: "display",
    weight: 500,
    letter: 5,
    size: 28,
    accent: "bar",
  },
  {
    id: "nackks",
    name: "ナック・ケー・エス",
    primary: "NACK-KS",
    sub: "FRP",
    variant: "display",
    weight: 700,
    letter: 2,
    size: 26,
    accent: "triangle",
  },
  {
    id: "mynavi",
    name: "Mynavi Edge",
    primary: "Mynavi",
    sub: "EDGE",
    variant: "display",
    weight: 700,
    letter: 1,
    size: 30,
    accent: "pipe",
  },
  {
    id: "toyotalease",
    name: "トヨタレンタレース千葉",
    primary: "TOYOTA",
    sub: "RENT-A-LEASE",
    variant: "display",
    weight: 700,
    letter: 3,
    size: 26,
    accent: "bar",
  },
];
