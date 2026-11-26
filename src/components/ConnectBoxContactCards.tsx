import type { MouseEventHandler } from "react";
import {
  CONNECT_BOX_EMAIL,
  CONNECT_BOX_LINE_URL,
  CONNECT_BOX_MEETING_URL,
} from "../constants";
import { connectBoxContacts } from "../data/connectBox";

type Props = {
  /** Connect Box ページと同じ4種。会社サイトでは資料DLを除く */
  includeDownload?: boolean;
  ctaPosition?: string;
  className?: string;
  onDownloadClick?: MouseEventHandler<HTMLAnchorElement>;
  /** 4つ目カードのリンク先（既定 #download） */
  downloadHref?: string;
  downloadTitle?: string;
  downloadSub?: string;
};

export default function ConnectBoxContactCards({
  includeDownload = false,
  ctaPosition = "footer",
  className,
  onDownloadClick,
  downloadHref = "#download",
  downloadTitle,
  downloadSub,
}: Props) {
  const contacts = connectBoxContacts.filter(
    (c) => includeDownload || c.hrefKey !== "download",
  );

  const hrefs = {
    line: CONNECT_BOX_LINE_URL,
    meeting: CONNECT_BOX_MEETING_URL,
    email: `mailto:${CONNECT_BOX_EMAIL}`,
    download: downloadHref,
  } as const;

  return (
    <div
      className={[
        "cb-contact-grid",
        `cb-contact-grid--${contacts.length}`,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-cta-position={ctaPosition}
    >
      {contacts.map((c) => {
        const isExternal = c.hrefKey === "line" || c.hrefKey === "meeting";
        const title =
          c.hrefKey === "download" && downloadTitle ? downloadTitle : c.title;
        const sub =
          c.hrefKey === "download" && downloadSub ? downloadSub : c.sub;
        return (
          <a
            key={c.id}
            className={`cb-contact-card cb-contact-card--${c.id}`}
            href={hrefs[c.hrefKey]}
            data-cta-position={ctaPosition}
            {...(isExternal
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            onClick={c.hrefKey === "download" ? onDownloadClick : undefined}
          >
            <span className="cb-contact-card__title">{title}</span>
            <span className="cb-contact-card__sub">{sub}</span>
          </a>
        );
      })}
    </div>
  );
}
