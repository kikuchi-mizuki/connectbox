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
            {companyMission.valueTitle}
          </h2>
          <p className="top-section-head__lead">{companyMission.valueLead}</p>
        </header>
        <div className="top-value__content">
          <ul className="top-value__list">
            {companyMission.valueBody.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
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
