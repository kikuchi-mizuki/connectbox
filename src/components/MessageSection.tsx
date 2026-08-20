import FadeIn from "./FadeIn";
import { company, representativeMessage } from "../data/company";

export default function MessageSection() {
  const { photoSrc, photoAlt, title, paragraphs } = representativeMessage;

  return (
    <section className="section top-message" aria-labelledby="message-title">
      <FadeIn className="section__inner top-message__inner">
        <header className="top-message__intro">
          <p className="section__label">Message</p>
          <h2 className="section__title" id="message-title">
            {title}
          </h2>
        </header>

        <div className="top-message__layout">
          <aside className="top-message__aside">
            <figure className="top-message__portrait">
              {photoSrc ? (
                <img src={photoSrc} alt={photoAlt} width={320} height={400} />
              ) : (
                <div
                  className="top-message__portrait-placeholder"
                  role="img"
                  aria-label={`${photoAlt}（写真準備中）`}
                >
                  <span>代表写真</span>
                  <span>準備中</span>
                </div>
              )}
            </figure>
            <p className="top-message__name">
              {company.representativeTitle}
              <br />
              {company.representative}
            </p>
          </aside>

          <div className="top-message__body">
            {paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
