import { useState, type FormEvent } from "react";
import { CONNECT_BOX_EMAIL, GA_MEASUREMENT_ID } from "../constants";
import { trackGenerateLead } from "../lib/ga";

type Choice = 0 | 1 | 2;
type Step = "quiz" | "result";
type FormStatus = "idle" | "submitting" | "success" | "error";

type PillarId = "reply" | "remind" | "owner" | "follow";

type Question = {
  id: string;
  pillar: PillarId;
  text: string;
};

type PillarResult = {
  id: PillarId;
  title: string;
  headline: string;
  advice: string[];
  trialFocus: string;
};

const QUESTIONS: Question[] = [
  {
    id: "q1",
    pillar: "reply",
    text: "問い合わせやメールの一次返信は、当日中にできていますか？",
  },
  {
    id: "q2",
    pillar: "remind",
    text: "アポイントの前日・当日リマインドは、決まった形でできていますか？",
  },
  {
    id: "q3",
    pillar: "owner",
    text: "日程調整や電話の一次対応を、社長・営業以外が担えていますか？",
  },
  {
    id: "q4",
    pillar: "follow",
    text: "名刺・商談履歴は、次の追客につながる形で残っていますか？",
  },
];

const CHOICES: { value: Choice; label: string }[] = [
  { value: 0, label: "ほぼできている" },
  { value: 1, label: "ときどき" },
  { value: 2, label: "ほぼできていない" },
];

const PILLARS: Record<PillarId, PillarResult> = {
  reply: {
    id: "reply",
    title: "商談の入口（一次対応）",
    headline: "いちばん効くのは、問い合わせを商談に変える速度です",
    advice: [
      "当日中の一次返信で、他社に取られる前に日程を取る",
      "定型文で入口を止めず、判断が要るものだけ社内へ渡す",
      "未返信一覧を毎日見て、商談化率の母数を守る",
    ],
    trialFocus: "問い合わせ対応（商談数の入口）",
  },
  remind: {
    id: "remind",
    title: "アポ実施率",
    headline: "いちばん効くのは、決まったアポを流さないことです",
    advice: [
      "前日・当日朝のリマインドを必須にし、実施率を上げる",
      "場所・時間・参加者をテンプレで送り、ドタキャンを減らす",
      "リスケも同じ手順で追い、週次で実施率を見る",
    ],
    trialFocus: "アポイント管理とリマインド（実施率）",
  },
  owner: {
    id: "owner",
    title: "売れる時間",
    headline: "いちばん効くのは、社長・営業を商談に戻すことです",
    advice: [
      "日程調整の往復を外に出し、売れる時間を取り戻す",
      "受電の一次切り分けで、営業が電話に縛られない形にする",
      "出る電話／出ない電話を分け、商談に使う時間を守る",
    ],
    trialFocus: "受電・日程調整（売れる時間の確保）",
  },
  follow: {
    id: "follow",
    title: "決まる率（追客）",
    headline: "いちばん効くのは、失注・休眠からの再商談です",
    advice: [
      "次回連絡日を必ず残し、追客からの再商談を増やす",
      "失注理由を短く記録し、再接触リストを週1で回す",
      "掘り起こし文面を型にして、決まる率の手前を厚くする",
    ],
    trialFocus: "顧客管理と追客（再商談・決まる率）",
  },
};

const PILLAR_ORDER: PillarId[] = ["reply", "remind", "owner", "follow"];

function trackDiagnosticComplete(primary: PillarId, leadSource: string) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", "diagnostic_complete", {
    lead_source: leadSource,
    primary_focus: primary,
    page_path: `${window.location.pathname}${window.location.search}`,
    send_to: GA_MEASUREMENT_ID,
  });
}

type Props = {
  leadSource?: string;
};

export default function BackOfficeDiagnostic({
  leadSource = "back_office_diagnostic",
}: Props) {
  const [step, setStep] = useState<Step>("quiz");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Partial<Record<string, Choice>>>({});
  const [primary, setPrimary] = useState<PillarId | null>(null);
  const [scores, setScores] = useState<Record<PillarId, number> | null>(null);
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const current = QUESTIONS[index];
  const progress = `${index + 1} / ${QUESTIONS.length}`;

  function selectChoice(choice: Choice) {
    const nextAnswers = { ...answers, [current.id]: choice };
    setAnswers(nextAnswers);

    if (index < QUESTIONS.length - 1) {
      setIndex(index + 1);
      return;
    }

    const tally: Record<PillarId, number> = {
      reply: 0,
      remind: 0,
      owner: 0,
      follow: 0,
    };
    for (const q of QUESTIONS) {
      const c = nextAnswers[q.id];
      if (c === undefined) continue;
      tally[q.pillar] += c;
    }

    let best: PillarId = "reply";
    let bestScore = -1;
    for (const id of PILLAR_ORDER) {
      if (tally[id] > bestScore) {
        bestScore = tally[id];
        best = id;
      }
    }

    setScores(tally);
    setPrimary(best);
    setStep("result");
    trackDiagnosticComplete(best, leadSource);
  }

  function restart() {
    setStep("quiz");
    setIndex(0);
    setAnswers({});
    setPrimary(null);
    setScores(null);
    setFormStatus("idle");
    setErrorMessage("");
  }

  async function onLeadSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (formStatus === "submitting" || !primary) return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const company = String(data.get("company") ?? "").trim();
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();

    if (!company || !name || !email) {
      setFormStatus("error");
      setErrorMessage("会社名、お名前、メールアドレスは必須です。");
      return;
    }

    setFormStatus("submitting");
    setErrorMessage("");

    const result = PILLARS[primary];
    const pageUrl =
      typeof window !== "undefined" ? window.location.href : "";

    try {
      const res = await fetch(
        `https://formsubmit.co/ajax/${encodeURIComponent(CONNECT_BOX_EMAIL)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            _subject: "【Connect Box】無料簡易診断リード",
            _template: "table",
            _captcha: "false",
            種別: "無料簡易診断",
            優先強化ポイント: result.title,
            診断結果: result.headline,
            トライアル推奨: result.trialFocus,
            スコア_一次対応: scores?.reply ?? "",
            スコア_リマインド: scores?.remind ?? "",
            スコア_時間防衛: scores?.owner ?? "",
            スコア_追客: scores?.follow ?? "",
            会社名: company,
            お名前: name,
            メールアドレス: email,
            電話番号: phone || "（未記入）",
            ページ: pageUrl,
          }),
        },
      );

      if (!res.ok) throw new Error(`submit_failed_${res.status}`);

      trackGenerateLead({
        lead_source: leadSource,
        primary_focus: primary,
        page_path: `${window.location.pathname}${window.location.search}`,
        cta_position: "diagnostic",
      });
      setFormStatus("success");
      form.reset();
    } catch {
      setFormStatus("error");
      setErrorMessage(
        "送信に失敗しました。時間をおいて再度お試しいただくか、LINE・メールでご連絡ください。",
      );
    }
  }

  if (step === "result" && primary) {
    const result = PILLARS[primary];
    return (
      <div className="bo-diag">
        <p className="bo-diag__eyebrow">診断結果</p>
        <h3 className="bo-diag__result-title">{result.headline}</h3>
        <p className="bo-diag__focus">
          優先して強化する領域：<strong>{result.title}</strong>
        </p>
        <ul className="bo-diag__advice">
          {result.advice.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        <p className="bo-diag__trial">
          2週間無料なら、まず「{result.trialFocus}」から動かし、アポ・再商談の数字で振り返れます。
        </p>

        <div className="bo-diag__lead">
          <h4>この結果をもとに、無料トライアルのご案内を送ります</h4>
          <p>
            画面の診断結果はすでに表示済みです。会社名とメールを送ると、内容に合わせた無料トライアルの案内をメールでお送りします。
          </p>

          {formStatus === "success" ? (
            <div className="cb-lead-form cb-lead-form--done" role="status">
              <p className="cb-lead-form__done-title">受け付けました</p>
              <p className="cb-lead-form__done-body">
                診断結果を踏まえて、ご案内します。お急ぎの方は上のLINE・日程調整もご利用ください。
              </p>
            </div>
          ) : (
            <form className="cb-lead-form" onSubmit={onLeadSubmit} noValidate>
              <div className="cb-lead-form__grid">
                <label className="cb-lead-form__field">
                  <span>
                    会社名 <abbr title="必須">*</abbr>
                  </span>
                  <input
                    name="company"
                    type="text"
                    autoComplete="organization"
                    required
                    placeholder="株式会社〇〇"
                  />
                </label>
                <label className="cb-lead-form__field">
                  <span>
                    お名前 <abbr title="必須">*</abbr>
                  </span>
                  <input
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    placeholder="山田 太郎"
                  />
                </label>
                <label className="cb-lead-form__field">
                  <span>
                    メールアドレス <abbr title="必須">*</abbr>
                  </span>
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="you@example.com"
                  />
                </label>
                <label className="cb-lead-form__field">
                  <span>
                    電話番号 <em>（任意）</em>
                  </span>
                  <input
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="090-0000-0000"
                  />
                </label>
              </div>
              <p className="cb-lead-form__note">
                ご連絡は、診断結果に合わせた無料トライアルのご案内にのみ使います。
              </p>
              {formStatus === "error" ? (
                <p className="cb-lead-form__error" role="alert">
                  {errorMessage}
                </p>
              ) : null}
              <button
                className="btn btn--primary btn--large"
                type="submit"
                disabled={formStatus === "submitting"}
              >
                {formStatus === "submitting"
                  ? "送信中…"
                  : "メールで無料トライアル案内を受け取る"}
              </button>
            </form>
          )}
        </div>

        <div className="bo-diag__actions">
          <a className="btn btn--primary" href="#final-cta">
            無料トライアルを相談する
          </a>
          <button
            type="button"
            className="btn btn--secondary"
            onClick={restart}
          >
            もう一度診断する
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bo-diag">
      <div className="bo-diag__progress" aria-live="polite">
        <span>{progress}</span>
        <div
          className="bo-diag__bar"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={QUESTIONS.length}
          aria-valuenow={index + 1}
        >
          <span
            style={{ width: `${((index + 1) / QUESTIONS.length) * 100}%` }}
          />
        </div>
      </div>
      <h3 className="bo-diag__question">{current.text}</h3>
      <div className="bo-diag__choices" role="group" aria-label="回答選択肢">
        {CHOICES.map((c) => (
          <button
            key={c.value}
            type="button"
            className="bo-diag__choice"
            onClick={() => selectChoice(c.value)}
          >
            {c.label}
          </button>
        ))}
      </div>
      {index > 0 ? (
        <button
          type="button"
          className="bo-diag__back"
          onClick={() => setIndex(index - 1)}
        >
          前の質問に戻る
        </button>
      ) : null}
    </div>
  );
}
