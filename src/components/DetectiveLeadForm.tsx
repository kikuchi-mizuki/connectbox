import { useState, type FormEvent } from "react";
import { DETECTIVE_EMAIL } from "../constants";
import { trackGenerateLead } from "../lib/ga";

type Status = "idle" | "submitting" | "success" | "error";

function looksLikeContact(value: string) {
  const v = value.trim();
  if (!v) return false;
  if (v.includes("@")) return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const digits = v.replace(/[^\d]/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

export default function DetectiveLeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const form = e.currentTarget;
    const data = new FormData(form);

    // honeypot
    if (String(data.get("company_url") ?? "").trim()) {
      setStatus("success");
      return;
    }

    const contact = String(data.get("contact") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!looksLikeContact(contact)) {
      setStatus("error");
      setErrorMessage("メールアドレスか電話番号を入力してください。");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch(
        `https://formsubmit.co/ajax/${encodeURIComponent(DETECTIVE_EMAIL)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            _subject: "【ミノガサン】無料相談（LPフォーム）",
            _template: "table",
            _captcha: "false",
            種別: "探偵LP・無料相談フォーム",
            連絡先: contact,
            ご相談内容: message || "（未記入）",
            ページ: typeof window !== "undefined" ? window.location.href : "",
          }),
        },
      );

      if (!res.ok) {
        throw new Error(`submit_failed_${res.status}`);
      }

      trackGenerateLead({
        lead_source: "detective_form",
        page_path: `${window.location.pathname}${window.location.search}`,
        cta_position: "form",
      });
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage(
        "送信に失敗しました。時間をおいて再度お試しいただくか、LINE・電話でご連絡ください。",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="det-contact-form det-contact-form--done" role="status">
        <p className="det-contact-form__done-title">受付ました</p>
        <p className="det-contact-form__done-body">
          内容を確認のうえ、ご連絡します。お急ぎの方はLINEか電話もご利用ください。
        </p>
      </div>
    );
  }

  return (
    <form className="det-contact-form" onSubmit={onSubmit} noValidate>
      <label className="det-contact-form__field">
        <span>
          連絡先（メールまたは電話） <abbr title="必須">*</abbr>
        </span>
        <input
          name="contact"
          type="text"
          inputMode="email"
          autoComplete="email"
          required
          placeholder="example@mail.com ／ 080-0000-0000"
        />
      </label>

      <label className="det-contact-form__field">
        <span>
          ご相談内容 <em>（任意）</em>
        </span>
        <textarea
          name="message"
          rows={3}
          placeholder="いま気になっていることだけでも大丈夫です"
        />
      </label>

      {/* honeypot */}
      <input
        className="det-contact-form__hp"
        name="company_url"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      {errorMessage ? (
        <p className="det-contact-form__error" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <button
        className="det-btn det-btn--tel det-btn--lg det-contact-form__submit"
        type="submit"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "送信中…" : "無料で相談する"}
      </button>
    </form>
  );
}
