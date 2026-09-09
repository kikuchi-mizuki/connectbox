import { COMPANY_NAME, SITE_URL } from "../constants";
import { company } from "./company";

/** サイト上で確認できる情報のみを用いた Organization / WebSite */
export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: COMPANY_NAME,
        legalName: company.legalName,
        alternateName: [company.serviceName, "ティーコネクト", company.englishName],
        url: `${SITE_URL}/`,
        logo: `${SITE_URL}/tconnect-logo.png`,
        description:
          "Connect BoxのBPO・コンサルティング、宝飾、起業家育成など、人と人との縁を紡ぐ事業を展開する株式会社T-connectの公式サイト。",
        address: {
          "@type": "PostalAddress",
          postalCode: "160-0023",
          addressRegion: "東京都",
          addressLocality: "新宿区",
          streetAddress: "西新宿３丁目１−３ MITSUWAビル １０階",
          addressCountry: "JP",
        },
        founder: {
          "@type": "Person",
          name: company.representative,
          jobTitle: company.representativeTitle,
        },
        brand: {
          "@type": "Brand",
          name: "Connect Box",
          alternateName: "コネクトボックス",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: COMPANY_NAME,
        alternateName: [company.serviceName, "ティーコネクト"],
        url: `${SITE_URL}/`,
        inLanguage: "ja",
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
    ],
  };
}
