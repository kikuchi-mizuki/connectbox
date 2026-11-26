import { useState, type FormEvent } from "react";
import {
  DETECTIVE_EMAIL,
  DETECTIVE_GOOGLE_FORM_ACTION,
  DETECTIVE_GOOGLE_FORM_ENTRIES,
} from "../constants";
import { trackDetectiveFormSubmit, trackGenerateLead } from "../lib/ga";

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

    if (String(data.get("_honey") ?? "").trim()) {
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

    const body = new FormData();
    body.append(DETECTIVE_GOOGLE_FORM_ENTRIES.name, "（匿名）");
    body.append(DETECTIVE_GOOGLE_FORM_ENTRIES.contact, contact);
    body.append(
      DETECTIVE_GOOGLE_FORM_ENTRIES.message,
      message || "（未記入）",
    );

    try {
      // Googleフォームは CORS でレスポンスを読めないため no-cors。
      // 送信自体は届く（FormSubmitより速く、迷惑メールにも入りにくい）。
      await fetch(DETECTIVE_GOOGLE_FORM_ACTION, {
        method: "POST",
        mode: "no-cors",
        body,
      });

      trackGenerateLead({
        lead_source: "detective_form",
        page_path: `${window.location.pathname}${window.location.search}`,
        cta_position: "form",
      });
      trackDetectiveFormSubmit({
        lead_source: "detective_form",
        page_path: window.location.pathname,
        cta_position: "form",
      });
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage(
        `送信に失敗しました。時間をおいて再度お試しいただくか、LINE・電話、または ${DETECTIVE_EMAIL} へご連絡ください。`,
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

      <input
        className="det-contact-form__hp"
        name="_honey"
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

      <p className="det-contact-form__privacy">
        匿名でも大丈夫です。入力内容はご相談への対応にのみ使用します（
        <a href="#privacy">プライバシーポリシー</a>
        ）
      </p>
    </form>
  );
}
