export type Member = {
  id: string;
  name: string;
  reading: string;
  role: string;
  squad: string;
  year: string;
  photo?: string;
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
  note?: string;
};

export type NavItem = {
  label: string;
  href: string;
};

export type HistoryEntry = {
  year: string;
  event: string;
  headline: string;
  detail?: string;
  highlight?: boolean;
};

export type SponsorCategory = {
  id: string;
  label: string;
  title: string;
  companies: string[];
};

export const NAV_ITEMS: NavItem[] = [
  { label: "ABOUT", href: "#about" },
  { label: "HISTORY", href: "#history" },
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
      body: "企画・設計・製造・走行まで、一台のフォーミュラカーを学生の手で完遂する。フレーム、パワートレイン、サスペンション、コックピット—— 班ごとの専門性が集まり、毎年新しいマシンが生まれる。",
    },
    {
      title: "HERITAGE",
      body: "2002年の結成から20年以上。現役メンバーの背中には、60名を超えるOB・OGと、学内外の技術パートナーが並ぶ。受け継がれる知見が、挑戦の土台になっている。",
    },
    {
      title: "CHALLENGE",
      body: "2025年・第23回大会で総合18位、ベスト車検賞(ICV)を受賞。チーム史上最高成績を塗り替え続ける。次は2026年、全国のトップを狙う。",
    },
  ],
};

const PORTRAIT = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&h=1000&q=80&sat=-100`;

export const MEMBERS: Member[] = [
  {
    id: "m1",
    name: "木瀬 悠貴",
    reading: "YUKI KISE",
    role: "プロジェクトリーダー",
    squad: "PROJECT LEADER",
    year: "生産工学部 2年",
    photo: PORTRAIT("photo-1500648767791-00dcc994a43e"),
  },
  {
    id: "m2",
    name: "君塚 航惺",
    reading: "KOKI KIMIZUKA",
    role: "テクニカルディレクター",
    squad: "TECHNICAL DIRECTOR",
    year: "生産工学部 2年",
    photo: PORTRAIT("photo-1507003211169-0a1dd7228f2d"),
  },
  {
    id: "m3",
    name: "木川 冬威",
    reading: "TOUI KIKAWA",
    role: "トラックエンジニア / サスペンション班 リーダー",
    squad: "TRACK ENGINEER",
    year: "生産工学部 2年",
    photo: PORTRAIT("photo-1519085360753-af0119f7cbe7"),
  },
  {
    id: "m4",
    name: "柘植 勇佑",
    reading: "YUSUKE TSUGE",
    role: "フレーム班 リーダー",
    squad: "FRAME",
    year: "生産工学部 2年",
    photo: PORTRAIT("photo-1506794778202-cad84cf45f1d"),
  },
  {
    id: "m5",
    name: "内田 光陽",
    reading: "KOYO UCHIDA",
    role: "パワートレイン班 リーダー",
    squad: "POWERTRAIN",
    year: "生産工学部 2年",
    photo: PORTRAIT("photo-1472099645785-5658abf4ff4e"),
  },
  {
    id: "m6",
    name: "石田 晴太郎",
    reading: "SEITARO ISHIDA",
    role: "コックピット班 リーダー",
    squad: "COCKPIT",
    year: "生産工学部 2年",
    photo: PORTRAIT("photo-1492562080023-ab3db95bfbce"),
  },
  {
    id: "m7",
    name: "土生 柚佑",
    reading: "YUSUKE HABU",
    role: "マネジメント班 リーダー",
    squad: "MANAGEMENT",
    year: "生産工学部 4年",
    photo: PORTRAIT("photo-1552058544-f2b08422138a"),
  },
];

export const STATS: Stat[] = [
  { label: "結成からの歩み", value: 24, suffix: "年", note: "2002年結成" },
  { label: "2025 全日本大会", value: 18, suffix: "位", note: "チーム史上最高" },
  { label: "協賛企業", value: 20, suffix: "+社", note: "技術・物品・資金" },
  { label: "OB・OG ネットワーク", value: 60, suffix: "+名", note: "産業界で活躍中" },
];

export const HISTORY: HistoryEntry[] = [
  {
    year: "2002",
    event: "FOUNDED",
    headline: "CIT-Racing Team 結成",
    detail: "日本大学生産工学部の学術系公認サークルとして発足。",
  },
  {
    year: "第6回",
    event: "FIRST DYNAMIC",
    headline: "動的審査 初出場",
    detail: "学生フォーミュラ日本大会の動的競技へ、チームとして初めて進出。",
  },
  {
    year: "第8回",
    event: "FIRST FINISH",
    headline: "エンデュランス 初完走",
    detail: "最難関の耐久走行を初めて走り切る。",
  },
  {
    year: "第14回",
    event: "COMEBACK",
    headline: "6年ぶりのエンデュランス完走",
    detail: "長い低迷期を経て、動的競技の主戦場に帰還。",
  },
  {
    year: "第15回",
    event: "AWARD",
    headline: "チーム史上初の全種目完走",
    detail: "日本自動車工業会会長賞を受賞。",
    highlight: true,
  },
  {
    year: "第16回",
    event: "AWARD",
    headline: "2年連続の全種目完走",
    detail: "日本自動車工業会会長賞を連続受賞。",
  },
  {
    year: "第22回",
    event: "TOP 30",
    headline: "総合30位 / 会長賞受賞",
    detail: "上位常連として成績を安定させる。",
  },
  {
    year: "2025 / 第23回",
    event: "BEST EVER",
    headline: "総合18位・ベスト車検賞(ICV)受賞",
    detail: "チーム史上最高順位を更新。走行性能と設計精度の両面で評価された。",
    highlight: true,
  },
  {
    year: "2026",
    event: "NEXT",
    headline: "次の自己ベストへ",
    detail: "2026年大会に向け、新体制で設計・製造を開始。",
  },
];

export const RACES: Race[] = [
  {
    id: "r1",
    name: "Formula Student Japan 2026",
    date: "2026-09-04T09:00:00+09:00",
    location: "静岡県 エコパ",
    image:
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80",
    status: "upcoming",
  },
  {
    id: "r2",
    name: "Pre-season Test Day",
    date: "2026-06-14T08:00:00+09:00",
    location: "袖ヶ浦フォレストレースウェイ",
    image:
      "https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?auto=format&fit=crop&w=1200&q=80",
    status: "upcoming",
  },
  {
    id: "r3",
    name: "Shakedown Run",
    date: "2026-05-10T09:00:00+09:00",
    location: "日本大学 生産工学部 実験場",
    image:
      "https://images.unsplash.com/photo-1541348263662-e068662d82af?auto=format&fit=crop&w=1200&q=80",
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

export const SPONSOR_CATEGORIES: SponsorCategory[] = [
  {
    id: "powertrain",
    label: "01",
    title: "動力系",
    companies: ["HONDA", "GS YUASA"],
  },
  {
    id: "dev",
    label: "02",
    title: "開発・解析ツール",
    companies: ["SolidWorks", "Autodesk", "IPG Automotive"],
  },
  {
    id: "manufacturing",
    label: "03",
    title: "製造・素材",
    companies: ["神戸製鋼", "柘植製作所", "三五", "NOK"],
  },
  {
    id: "chassis",
    label: "04",
    title: "シャシ・制動",
    companies: ["NTN", "RS-R", "FCC", "日立Astemo", "グループ・エム"],
  },
  {
    id: "cooling",
    label: "05",
    title: "冷却系",
    companies: ["三栄", "三光ラジエター"],
  },
  {
    id: "others",
    label: "06",
    title: "機能部品・サービス",
    companies: [
      "igus",
      "Stäubli",
      "KYOWA",
      "ナック・ケー・エス",
      "Mynavi Edge",
      "トヨタレンタレース千葉",
    ],
  },
];

export const SPECIAL_THANKS: string[] = [
  "日本大学生産工学部 自動車工学リサーチ・センター",
  "日本大学生産工学部 機械工学科 実習工場",
  "日本大学 理工学部",
  "CIT-Racing OB・OG会",
];

export const CONTACT_INFO = {
  email: "citracingteam@gmail.com",
  x: "https://twitter.com/cit_racing_team",
  xHandle: "@CIT_Racing_Team",
  instagram: "https://www.instagram.com/citracingteam",
  instagramHandle: "@citracingteam",
  website: "https://citracingteam.wixsite.com/cit-racing",
  address: "〒275-8575 千葉県習志野市泉町1-2-1 日本大学生産工学部 津田沼キャンパス 9号館",
  access: "京成本線 京成大久保駅から徒歩10分",
};

export const TEAM_VIDEO = {
  title: "TEAM VIDEO",
  label: "活動の様子を見る",
  driveFileId: "1Dlw7T9JkNmAZf6Q3mt8ywFAvh4JUmPhl",
  embedUrl:
    "https://drive.google.com/file/d/1Dlw7T9JkNmAZf6Q3mt8ywFAvh4JUmPhl/preview",
  externalUrl:
    "https://drive.google.com/file/d/1Dlw7T9JkNmAZf6Q3mt8ywFAvh4JUmPhl/view",
};

export const HERO_MEDIA = {
  videoSrc:
    "https://videos.pexels.com/video-files/2103099/2103099-uhd_3840_2160_30fps.mp4",
  posterSrc:
    "https://images.unsplash.com/photo-1541443131876-44b03de101c5?auto=format&fit=crop&w=1920&q=80",
  featureSrc: "/S__25518083_0.jpg",
  featureImages: [
    "/S__25518083_0.jpg",
    "/S__25518084_0.jpg",
    "/S__25518085_0.jpg",
    "/S__25518086_0.jpg",
    "/S__25518087_0.jpg",
    "/S__25518088_0.jpg",
    "/S__25518089.jpg",
  ],
};
