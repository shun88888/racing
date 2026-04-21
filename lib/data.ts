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

export type SupportWay = {
  id: string;
  label: string;
  title: string;
  description: string;
  examples: string[];
  give: string[];
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
  { label: "SUPPORT", href: "#sponsorship" },
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

export const SUPPORT_WAYS: SupportWay[] = [
  {
    id: "financial",
    label: "01 / FUNDING",
    title: "活動資金のご支援",
    description:
      "マシン製作、大会遠征、部品購入など、チーム運営全般に充てさせていただきます。金額の大小は問いません。",
    examples: [
      "部品・材料費の一部補助",
      "大会遠征（静岡・エコパ）の交通費",
      "試験走行の会場費",
    ],
    give: [
      "マシン・ピットウェアへのロゴ掲出",
      "公式サイト・SNSでのご紹介",
      "活動報告書のお届け",
    ],
  },
  {
    id: "material",
    label: "02 / PARTS & TECH",
    title: "物品・技術のご提供",
    description:
      "現物での協力も大歓迎です。使われていない機材・部品・素材・試作サービスなど、形を問わずご相談ください。",
    examples: [
      "カーボン・アルミ等の素材提供",
      "機械加工・3Dプリント・溶接の協力",
      "計測機器・工具の貸与",
      "CFD / CAE ソフトのライセンス",
    ],
    give: [
      "技術協力パートナーとしてご紹介",
      "開発レポート・データの共有",
      "学生エンジニアとの技術交流",
    ],
  },
  {
    id: "facility",
    label: "03 / SPACE",
    title: "場所・設備のご提供",
    description:
      "試験走行場、工場見学、展示スペースなど、学生だけでは届かない環境をお借りできたら嬉しいです。",
    examples: [
      "テストコース・駐車場の貸与",
      "工場見学・実務体験の機会",
      "展示・発表スペースの提供",
    ],
    give: [
      "イベント・発表会へのご招待",
      "活動の様子を記事・動画化してご共有",
    ],
  },
  {
    id: "mentor",
    label: "04 / MENTORSHIP",
    title: "メンタリング・キャリア支援",
    description:
      "学生の成長そのものへのご支援。技術指導、インターン機会、OB/OGネットワークなど、長期的な関わりをお願いできる方を探しています。",
    examples: [
      "技術レビュー・アドバイス",
      "インターン・採用直結の接点",
      "OB/OG ネットワークへの参画",
    ],
    give: [
      "定例ミーティングでの接点",
      "学生メンバーとの継続的な関係",
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
