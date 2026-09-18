import { useState, type FormEvent } from "react";
import {
  CONNECT_BOX_EMAIL,
  CONNECT_BOX_MATERIAL_FILENAME,
  CONNECT_BOX_MATERIAL_URL,
} from "../constants";
import { trackGenerateLead } from "../lib/ga";

type Status = "idle" | "submitting" | "success" | "error";

function triggerDownload() {
  const a = document.createElement("a");
  a.href = CONNECT_BOX_MATERIAL_URL;
  a.download = CONNECT_BOX_MATERIAL_FILENAME;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export default function ConnectBoxLeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const company = String(data.get("company") ?? "").trim();
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();

    if (!company || !name || !email || !phone) {
      setStatus("error");
      setErrorMessage(
        "会社名、お名前、メールアドレス、電話番号はすべて必須です。",
      );
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

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
            _subject: "【Connect Box】サービス資料ダウンロード",
            _template: "table",
            _captcha: "false",
            種別: "サービス資料ダウンロード",
            会社名: company,
            お名前: name,
            メールアドレス: email,
            電話番号: phone,
          }),
        },
      );

      if (!res.ok) {
        throw new Error(`submit_failed_${res.status}`);
      }

      trackGenerateLead({
        lead_source: "connect_box_material",
        page_path: "/connect-box",
      });
      triggerDownload();
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage(
        "送信に失敗しました。時間をおいて再度お試しいただくか、メール・LINEでご連絡ください。",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="cb-lead-form cb-lead-form--done" role="status">
        <p className="cb-lead-form__done-title">送信しました</p>
        <p className="cb-lead-form__done-body">
          資料のダウンロードを開始します。始まらない場合は下のボタンから保存してください。
        </p>
        <a
          className="btn btn--primary"
          href={CONNECT_BOX_MATERIAL_URL}
          download={CONNECT_BOX_MATERIAL_FILENAME}
        >
          資料をダウンロード
        </a>
      </div>
    );
  }

  return (
    <form className="cb-lead-form" onSubmit={onSubmit} noValidate>
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
            電話番号 <abbr title="必須">*</abbr>
          </span>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            placeholder="090-0000-0000"
          />
        </label>
      </div>
      <p className="cb-lead-form__note">
        ご入力内容は資料送付とご案内の目的でのみ利用します。送信後すぐにサービス資料（PDF）をダウンロードできます。
      </p>
      {status === "error" ? (
        <p className="cb-lead-form__error" role="alert">
          {errorMessage}
        </p>
      ) : null}
      <button
        className="btn btn--primary btn--large"
        type="submit"
        disabled={status === "submitting"}
      >
        {status === "submitting"
          ? "送信中…"
          : "送信して資料をダウンロード"}
      </button>
    </form>
  );
}
