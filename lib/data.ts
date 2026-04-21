export type Member = {
  id: string;
  name: string;
  role: string;
  year: string;
  image: string;
  bio?: string;
};

export type Race = {
  id: string;
  name: string;
  date: string;
  location: string;
  image: string;
  status: "upcoming" | "finished";
};

export type SponsorPlan = {
  tier: "bronze" | "silver" | "gold";
  tierLabel: string;
  priceRange: string;
  tagline: string;
  highlights: string[];
  featured?: boolean;
};

export type Sponsor = {
  id: string;
  name: string;
  logo: string;
  tier: "gold" | "silver" | "bronze" | "partner";
};

export type Stat = {
  label: string;
  value: number;
  suffix?: string;
};

export type NavItem = {
  label: string;
  href: string;
};

export const NAV_ITEMS: NavItem[] = [
  { label: "ABOUT", href: "#about" },
  { label: "MEMBERS", href: "#members" },
  { label: "CALENDAR", href: "#calendar" },
  { label: "SPONSORSHIP", href: "#sponsorship" },
  { label: "CONTACT", href: "#contact" },
];

export const TEAM_MISSION = {
  tagline: "PUSH THE LIMIT.",
  subline: "CIT-Racing Team — 2026 Formula Student Japan",
  pillars: [
    {
      title: "ENGINEERING",
      body: "学生の手で設計・製造するフォーミュラカー。空力からパワートレインまで、全てを自分たちで作り上げる。",
    },
    {
      title: "TEAMWORK",
      body: "30名超のメンバーが専門領域を越えて協働。機械・電気・制御の知識を結集し、一台のマシンに全てを注ぐ。",
    },
    {
      title: "SPEED",
      body: "0.01秒を削るための執念。設計、製造、ドライビング、ピット作業——あらゆる工程で速さを追求する。",
    },
  ],
};

export const MEMBERS: Member[] = [
  {
    id: "m1",
    name: "TAKUMI SATO",
    role: "Team Principal / Driver",
    year: "生産工学部 機械工学科 4年",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    bio: "2年連続でエンデュランス完走。チーム全体の戦略を指揮する。",
  },
  {
    id: "m2",
    name: "HARUKA KOBAYASHI",
    role: "Lead Driver",
    year: "生産工学部 機械工学科 3年",
    image: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=800&q=80",
    bio: "全日本カート選手権出身。チーム最速のラップタイムを記録。",
  },
  {
    id: "m3",
    name: "KENTA MORI",
    role: "Chief Engineer",
    year: "生産工学部 機械工学科 修士1年",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    bio: "車両全体の設計を統括。2025年車両の軽量化を主導した。",
  },
  {
    id: "m4",
    name: "YUI TANAKA",
    role: "Aerodynamics Lead",
    year: "生産工学部 航空宇宙工学科 3年",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=800&q=80",
    bio: "CFD解析を駆使してダウンフォースを前年比+18%向上。",
  },
  {
    id: "m5",
    name: "RYO YAMAGUCHI",
    role: "Chassis Lead",
    year: "生産工学部 機械工学科 4年",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
    bio: "モノコックの設計・製造を担当。カーボン積層の最適化を推進。",
  },
  {
    id: "m6",
    name: "AOI NAKAMURA",
    role: "Powertrain Lead",
    year: "生産工学部 電気電子工学科 3年",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
    bio: "EV化プロジェクトのリーダー。モーター制御とバッテリ設計を担当。",
  },
];

export const STATS: Stat[] = [
  { label: "大会参戦歴", value: 7, suffix: "年" },
  { label: "チームメンバー", value: 32, suffix: "名" },
  { label: "SNSフォロワー", value: 5200, suffix: "+" },
  { label: "年間イベント露出", value: 24, suffix: "回" },
];

export const RACES: Race[] = [
  {
    id: "r1",
    name: "Formula Student Japan 2026",
    date: "2026-09-04T09:00:00+09:00",
    location: "静岡県 エコパ",
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80",
    status: "upcoming",
  },
  {
    id: "r2",
    name: "Pre-season Test Day",
    date: "2026-06-14T08:00:00+09:00",
    location: "袖ヶ浦フォレストレースウェイ",
    image: "https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?auto=format&fit=crop&w=1200&q=80",
    status: "upcoming",
  },
  {
    id: "r3",
    name: "Shakedown Run",
    date: "2026-05-10T09:00:00+09:00",
    location: "日本大学 生産工学部 実験場",
    image: "https://images.unsplash.com/photo-1541348263662-e068662d82af?auto=format&fit=crop&w=1200&q=80",
    status: "upcoming",
  },
];

export const SPONSOR_PLANS: SponsorPlan[] = [
  {
    tier: "bronze",
    tierLabel: "BRONZE",
    priceRange: "¥50,000〜",
    tagline: "まずは応援から",
    highlights: [
      "公式サイトにロゴ掲載（小）",
      "SNSにてご紹介投稿 1回",
      "年次活動報告書の送付",
      "感謝状の贈呈",
    ],
  },
  {
    tier: "gold",
    tierLabel: "GOLD",
    priceRange: "¥500,000〜",
    tagline: "共に頂点を目指す",
    featured: true,
    highlights: [
      "マシンの最も目立つ位置にロゴ掲載",
      "公式サイト・ピットウェア・配布物すべてに大サイズ掲載",
      "SNSにて毎戦ご紹介（年24回以上）",
      "役員・キャプテンとの定例ミーティング",
      "年次詳細レポート + CFD/テレメトリーデータ共有",
      "学生エンジニアとの産学連携機会",
    ],
  },
  {
    tier: "silver",
    tierLabel: "SILVER",
    priceRange: "¥200,000〜",
    tagline: "パートナーとして走る",
    highlights: [
      "マシンにロゴ貼付（中サイズ）",
      "公式サイト・配布物に中サイズ掲載",
      "SNSにてご紹介投稿 年3回",
      "テストデイ・大会への招待",
      "年次活動報告会への招待",
    ],
  },
];

function svgDataUri(inner: string, width = 260, height = 80): string {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}'>${inner}</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

type LogoBrand = {
  name: string;
  build: () => string;
  tier: Sponsor["tier"];
};

const WHITE = "%23f5f5f5";
const GRAY = "%23b8b8b8";
const RED = "%23e10600";

const BRANDS: LogoBrand[] = [
  {
    name: "APEX MOTORS",
    tier: "gold",
    build: () =>
      svgDataUri(
        `<g fill='${WHITE}'>
          <polygon points='20,58 36,22 52,58 46,58 36,36 26,58' />
          <text x='62' y='52' font-family='Oswald, Arial' font-size='28' font-weight='700' letter-spacing='2'>APEX</text>
          <text x='62' y='68' font-family='Inter, Arial' font-size='9' fill='${GRAY}' letter-spacing='3'>MOTORS</text>
        </g>`
      ),
  },
  {
    name: "VELOCE TECH",
    tier: "gold",
    build: () =>
      svgDataUri(
        `<g>
          <text x='20' y='50' font-family='Georgia, serif' font-style='italic' font-size='32' font-weight='700' fill='${WHITE}'>Veloce</text>
          <rect x='20' y='55' width='94' height='2' fill='${RED}'/>
          <text x='20' y='70' font-family='Inter, Arial' font-size='9' fill='${GRAY}' letter-spacing='4'>TECHNOLOGIES</text>
        </g>`
      ),
  },
  {
    name: "CIRCUIT DYNAMICS",
    tier: "silver",
    build: () =>
      svgDataUri(
        `<g>
          <circle cx='30' cy='40' r='16' fill='none' stroke='${WHITE}' stroke-width='2.5'/>
          <circle cx='30' cy='40' r='6' fill='${RED}'/>
          <path d='M14 40 L22 40 M38 40 L46 40' stroke='${WHITE}' stroke-width='2.5'/>
          <text x='56' y='38' font-family='Oswald, Arial' font-size='18' font-weight='600' fill='${WHITE}' letter-spacing='2'>CIRCUIT</text>
          <text x='56' y='58' font-family='Inter, Arial' font-size='11' fill='${GRAY}' letter-spacing='3'>DYNAMICS</text>
        </g>`
      ),
  },
  {
    name: "TORQUE",
    tier: "gold",
    build: () =>
      svgDataUri(
        `<g>
          <rect x='18' y='20' width='10' height='40' fill='${RED}'/>
          <text x='38' y='56' font-family='Oswald, Arial' font-size='38' font-weight='700' fill='${WHITE}' letter-spacing='3'>TORQUE</text>
        </g>`
      ),
  },
  {
    name: "FORGE INDUSTRIES",
    tier: "silver",
    build: () =>
      svgDataUri(
        `<g>
          <path d='M20 50 L30 30 L40 50 Z' fill='${WHITE}'/>
          <path d='M40 50 L50 30 L60 50 Z' fill='${RED}'/>
          <text x='70' y='46' font-family='Oswald, Arial' font-size='20' font-weight='700' fill='${WHITE}' letter-spacing='3'>FORGE</text>
          <text x='70' y='62' font-family='Inter, Arial' font-size='9' fill='${GRAY}' letter-spacing='3'>INDUSTRIES</text>
        </g>`
      ),
  },
  {
    name: "NITRO+",
    tier: "bronze",
    build: () =>
      svgDataUri(
        `<g>
          <text x='20' y='56' font-family='Oswald, Arial' font-size='40' font-weight='700' fill='${WHITE}' letter-spacing='4'>NITRO</text>
          <text x='158' y='42' font-family='Oswald, Arial' font-size='42' font-weight='700' fill='${RED}'>+</text>
        </g>`
      ),
  },
  {
    name: "KINETICA",
    tier: "silver",
    build: () =>
      svgDataUri(
        `<g>
          <path d='M18 58 Q26 30 34 58 Q42 20 50 58' fill='none' stroke='${RED}' stroke-width='2.5' stroke-linecap='round'/>
          <text x='60' y='54' font-family='Inter, Arial' font-weight='300' font-size='26' fill='${WHITE}' letter-spacing='6'>KINETICA</text>
        </g>`
      ),
  },
  {
    name: "ZEROG AERO",
    tier: "silver",
    build: () =>
      svgDataUri(
        `<g>
          <path d='M18 50 L40 28 L60 30 L42 52 Z' fill='${WHITE}'/>
          <path d='M18 50 L40 28 L38 40 L22 56 Z' fill='${RED}' opacity='0.8'/>
          <text x='72' y='42' font-family='Oswald, Arial' font-size='18' font-weight='600' fill='${WHITE}' letter-spacing='3'>ZEROG</text>
          <text x='72' y='60' font-family='Inter, Arial' font-size='10' fill='${GRAY}' letter-spacing='4'>AERODYNAMICS</text>
        </g>`
      ),
  },
  {
    name: "PYRO RACING",
    tier: "bronze",
    build: () =>
      svgDataUri(
        `<g>
          <path d='M28 20 Q22 36 30 46 Q24 42 24 50 Q22 60 32 62 Q44 62 42 48 Q50 52 46 38 Q42 32 38 24 Q36 34 30 32 Q30 24 28 20 Z' fill='${RED}'/>
          <text x='56' y='46' font-family='Oswald, Arial' font-size='24' font-weight='700' fill='${WHITE}' letter-spacing='2'>PYRO</text>
          <text x='56' y='64' font-family='Inter, Arial' font-size='10' fill='${GRAY}' letter-spacing='4'>RACING</text>
        </g>`
      ),
  },
  {
    name: "PRIMA LAB",
    tier: "partner",
    build: () =>
      svgDataUri(
        `<g>
          <rect x='20' y='24' width='32' height='32' fill='none' stroke='${WHITE}' stroke-width='2'/>
          <text x='36' y='48' font-family='Georgia, serif' font-size='22' font-weight='700' fill='${WHITE}' text-anchor='middle'>P</text>
          <text x='60' y='44' font-family='Inter, Arial' font-weight='300' font-size='22' fill='${WHITE}' letter-spacing='5'>PRIMA</text>
          <text x='60' y='60' font-family='Inter, Arial' font-size='9' fill='${GRAY}' letter-spacing='3'>LABORATORIES</text>
        </g>`
      ),
  },
  {
    name: "CATALYST",
    tier: "silver",
    build: () =>
      svgDataUri(
        `<g>
          <circle cx='30' cy='40' r='4' fill='${RED}'/>
          <circle cx='30' cy='40' r='12' fill='none' stroke='${WHITE}' stroke-width='1.5'/>
          <circle cx='30' cy='40' r='18' fill='none' stroke='${WHITE}' stroke-width='1' stroke-dasharray='3 3'/>
          <text x='56' y='48' font-family='Oswald, Arial' font-size='22' font-weight='600' fill='${WHITE}' letter-spacing='4'>CATALYST</text>
        </g>`
      ),
  },
  {
    name: "REDLINE MACH",
    tier: "bronze",
    build: () =>
      svgDataUri(
        `<g>
          <path d='M18 30 L50 30 L62 40 L50 50 L18 50 Z' fill='${RED}'/>
          <text x='20' y='45' font-family='Oswald, Arial' font-size='14' font-weight='700' fill='${WHITE}' letter-spacing='2'>RED</text>
          <text x='72' y='38' font-family='Oswald, Arial' font-size='18' font-weight='700' fill='${WHITE}' letter-spacing='2'>REDLINE</text>
          <text x='72' y='56' font-family='Inter, Arial' font-size='10' fill='${GRAY}' letter-spacing='5'>MACH WORKS</text>
        </g>`
      ),
  },
  {
    name: "TITAN STEEL",
    tier: "gold",
    build: () =>
      svgDataUri(
        `<g>
          <polygon points='20,22 46,22 38,58 28,58' fill='${WHITE}'/>
          <polygon points='28,22 46,22 38,40 28,40' fill='${RED}'/>
          <text x='56' y='44' font-family='Oswald, Arial' font-size='22' font-weight='700' fill='${WHITE}' letter-spacing='3'>TITAN</text>
          <text x='56' y='60' font-family='Inter, Arial' font-size='10' fill='${GRAY}' letter-spacing='5'>STEEL CO.</text>
        </g>`
      ),
  },
  {
    name: "QUANTUM DRIVE",
    tier: "partner",
    build: () =>
      svgDataUri(
        `<g>
          <circle cx='30' cy='40' r='14' fill='none' stroke='${WHITE}' stroke-width='2'/>
          <circle cx='30' cy='40' r='14' fill='none' stroke='${RED}' stroke-width='2' stroke-dasharray='44 44' transform='rotate(-45 30 40)'/>
          <text x='54' y='44' font-family='Inter, Arial' font-weight='500' font-size='16' fill='${WHITE}' letter-spacing='4'>QUANTUM</text>
          <text x='54' y='58' font-family='Inter, Arial' font-size='9' fill='${GRAY}' letter-spacing='4'>DRIVE SYSTEMS</text>
        </g>`
      ),
  },
];

export const SPONSORS: Sponsor[] = BRANDS.map((b, i) => ({
  id: `s${String(i + 1).padStart(2, "0")}`,
  name: b.name,
  logo: b.build(),
  tier: b.tier,
}));

export const CONTACT_INFO = {
  email: "citracingteam@gmail.com",
  x: "https://twitter.com/CIT_Racing_Team",
  instagram: "https://instagram.com/citracingteam",
  youtube: "https://youtube.com/@CIT-Racing",
  address: "〒275-8575 千葉県習志野市泉町1-2-1 日本大学生産工学部",
};

export const HERO_MEDIA = {
  videoSrc: "https://videos.pexels.com/video-files/2103099/2103099-uhd_3840_2160_30fps.mp4",
  posterSrc: "https://images.unsplash.com/photo-1541443131876-44b03de101c5?auto=format&fit=crop&w=1920&q=80",
  featureSrc: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1400&q=85",
};
