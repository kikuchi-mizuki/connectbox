import type { MouseEventHandler } from "react";
import {
  CONNECT_BOX_EMAIL,
  CONNECT_BOX_LINE_URL,
  CONNECT_BOX_MEETING_URL,
} from "../constants";
import { connectBoxContacts } from "../data/connectBox";

const hrefs = {
  line: CONNECT_BOX_LINE_URL,
  meeting: CONNECT_BOX_MEETING_URL,
  email: `mailto:${CONNECT_BOX_EMAIL}`,
  download: "#download",
} as const;

type Props = {
  /** Connect Box ページと同じ4種。会社サイトでは資料DLを除く */
  includeDownload?: boolean;
  ctaPosition?: string;
  className?: string;
  onDownloadClick?: MouseEventHandler<HTMLAnchorElement>;
};

export default function ConnectBoxContactCards({
  includeDownload = false,
  ctaPosition = "footer",
  className,
  onDownloadClick,
}: Props) {
  const contacts = connectBoxContacts.filter(
    (c) => includeDownload || c.hrefKey !== "download",
  );

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
            <span className="cb-contact-card__title">{c.title}</span>
            <span className="cb-contact-card__sub">{c.sub}</span>
          </a>
        );
      })}
    </div>
  );
}
