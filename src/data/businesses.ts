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

/** HP・ナビに出す事業（探偵は独立LPのため含めない） */
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
    slug: "jewelry",
    name: "宝飾事業",
    en: "Jewelry",
    path: "/business/jewelry",
    tagline: "金・プラチナ・ブランド品の買取。",
    description: "大阪を拠点に、金・プラチナ・ブランド品買取を展開しています。",
    heroImage:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=2400&q=80",
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
