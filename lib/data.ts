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
