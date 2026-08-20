import FadeIn from "./FadeIn";
import { company, representativeMessage } from "../data/company";

export default function MessageSection() {
  return (
    <section className="section top-message" aria-labelledby="message-title">
      <FadeIn className="section__inner top-message__inner">
        <header className="top-section-head">
          <p className="section__label">Message</p>
          <h2 className="section__title" id="message-title">
            {representativeMessage.title}
          </h2>
          <p className="top-section-head__lead">{representativeMessage.lead}</p>
          <p className="top-message__name">
            {company.representativeTitle}　{company.representative}
          </p>
        </header>
        <div className="top-message__body">
          {representativeMessage.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
