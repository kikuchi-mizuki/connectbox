import FadeIn from "./FadeIn";
import { companyMission } from "../data/company";

type Props = {
  id?: string;
};

export default function ValueSection({ id = "value" }: Props) {
  return (
    <section
      className="section top-value"
      id={id}
      aria-labelledby="value-title"
    >
      <FadeIn className="section__inner top-value__inner">
        <header className="top-section-head">
          <p className="section__label">Value</p>
          <h2 className="top-value__title" id="value-title">
            {companyMission.valueTitleLines.map((line) => (
              <span key={line} className="top-value__title-line">
                {line}
              </span>
            ))}
          </h2>
          <p className="top-section-head__lead">{companyMission.valueLead}</p>
        </header>
        <div className="top-value__content">
          <ol className="top-value__principles">
            {companyMission.valuePrinciples.map((item, i) => (
              <li key={item.title}>
                <span className="top-value__num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <aside className="top-value__note" aria-labelledby="value-reason-label">
            <p className="top-value__note-label" id="value-reason-label">
              {companyMission.valueReasonLabel}
            </p>
            <p>{companyMission.valueReason}</p>
          </aside>
        </div>
      </FadeIn>
    </section>
  );
}
