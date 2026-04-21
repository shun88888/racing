export type SponsorMark = {
  id: string;
  name: string;
  src: string;
  href?: string;
  emphasis?: "lg";
};

const logo = (file: string) => `/sponsur/${encodeURIComponent(file)}`;

export const SPONSOR_LOGOS: SponsorMark[] = [
  {
    id: "honda",
    name: "HONDA",
    src: logo("image.png"),
    href: "https://www.honda.co.jp/",
    emphasis: "lg",
  },
  {
    id: "gsyuasa",
    name: "GS YUASA",
    src: logo("image copy.png"),
    href: "https://www.gs-yuasa.com/jp/",
  },
  {
    id: "solidworks",
    name: "SolidWorks",
    src: logo("image copy 2.png"),
    href: "https://www.solidworks.com/ja",
  },
  {
    id: "autodesk",
    name: "Autodesk",
    src: logo("image copy 3.png"),
    href: "https://www.autodesk.co.jp/",
  },
  {
    id: "ipg",
    name: "IPG Automotive",
    src: logo("image copy 4.png"),
    href: "https://ipg-automotive.com/ja/",
  },
  {
    id: "kobelco",
    name: "神戸製鋼（KOBELCO）",
    src: logo("image copy 5.png"),
    href: "https://www.kobelco.co.jp/",
  },
  {
    id: "tsuge",
    name: "柘植製作所（TSUGE）",
    src: logo("S__25518094.jpg"),
    href: "https://www.tsugess.jp/",
  },
  {
    id: "sango",
    name: "三五（SANGO）",
    src: logo("image copy 6.png"),
    href: "https://sango.jp/",
  },
  {
    id: "nok",
    name: "NOK",
    src: logo("image copy 7.png"),
    href: "https://www.nok.co.jp/",
  },
  {
    id: "ntn",
    name: "NTN",
    src: logo("image copy 8.png"),
    href: "https://www.ntn.co.jp/",
  },
  {
    id: "rsr",
    name: "RS-R",
    src: logo("image copy 9.png"),
    href: "https://www.rs-r.co.jp/",
  },
  {
    id: "hitachi",
    name: "日立Astemo",
    src: logo("image copy 10.png"),
    href: "https://www.hitachiastemo.com/ja/",
  },
  {
    id: "gm",
    name: "GruppeM",
    src: logo("image copy 11.png"),
    href: "https://www.gruppem.co.jp/",
  },
  {
    id: "sanei",
    name: "三栄（SAN-EI）",
    src: logo("image copy 12.png"),
    href: "https://san-ei-corp.co.jp/",
  },
  {
    id: "sanko",
    name: "三光ラジエター（SANKO）",
    src: logo("image copy 13.png"),
    href: "https://sankomfg.co.jp/",
  },
  {
    id: "igus",
    name: "igus",
    src: logo("image copy 14.png"),
    href: "https://www.igus.co.jp/",
  },
  {
    id: "kyowa",
    name: "共和産業（KYOWA）",
    src: logo("image copy 15.png"),
    href: "https://www.kyowa-sangyou.com/",
  },
  {
    id: "mynavi",
    name: "マイナビEdge",
    src: logo("image copy 16.png"),
    href: "https://mynavi-edge.jp/",
  },
  {
    id: "toyotarent",
    name: "TOYOTA Rent a Car",
    src: logo("image copy 17.png"),
    href: "https://rent.toyota.co.jp/",
  },
];
