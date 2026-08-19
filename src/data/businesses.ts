export type Business = {
  slug: string;
  name: string;
  en: string;
  path: string;
  tagline: string;
  description: string;
  heroImage: string;
  status: "active" | "preparing";
};

export const businesses: Business[] = [
  {
    slug: "connectbox",
    name: "Connect Box",
    en: "BPO & Consulting",
    path: "/business/connectbox",
    tagline: "企業の課題解決を、BPOとコンサルティングで。",
    description:
      "バックオフィス代行・DX推進・Webマーケ・採用支援・経営戦略など、必要な領域から始められる業務支援。",
    heroImage:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2400&q=80",
    status: "active",
  },
  {
    slug: "detective",
    name: "探偵事業",
    en: "Detective",
    path: "/business/detective",
    tagline: "不貞調査を、確かな証拠で。",
    description: "探偵業の開業準備を進めています。SNS運用・SEO対策を含む中長期的なWeb集客基盤を構築中。",
    heroImage:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=2400&q=80",
    status: "preparing",
  },
  {
    slug: "jewelry",
    name: "宝飾事業",
    en: "Jewelry",
    path: "/business/jewelry",
    tagline: "金・プラチナ・ブランド品の買取。",
    description: "大阪を拠点に、金・プラチナ・ブランド品買取を展開しています。",
    heroImage:
      "https://images.unsplash.com/photo-1515562141589-67f0d569b6ac?auto=format&fit=crop&w=2400&q=80",
    status: "active",
  },
  {
    slug: "incubation",
    name: "起業家育成事業",
    en: "Incubation",
    path: "/business/incubation",
    tagline: "次の起業家を、育てる。",
    description: "起業を目指す方への支援事業です。",
    heroImage:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=2400&q=80",
    status: "active",
  },
];

export function getBusiness(slug: string | undefined) {
  return businesses.find((b) => b.slug === slug);
}
