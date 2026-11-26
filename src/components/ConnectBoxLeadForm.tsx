import { useState, type FormEvent } from "react";
import {
  CONNECT_BOX_EMAIL,
  CONNECT_BOX_MATERIAL_FILENAME,
  CONNECT_BOX_MATERIAL_URL,
} from "../constants";
import {
  trackCbInquirySubmit,
  trackCbMaterialDownload,
  trackGenerateLead,
} from "../lib/ga";

type Status = "idle" | "submitting" | "success" | "error";

export type ConnectBoxLeadMode = "material" | "inquiry";

type Props = {
  mode?: ConnectBoxLeadMode;
  /** GA の lead_source。未指定時は mode から決定 */
  leadSource?: string;
  ctaPosition?: string;
  className?: string;
};

function triggerDownload() {
  const a = document.createElement("a");
  a.href = CONNECT_BOX_MATERIAL_URL;
  a.download = CONNECT_BOX_MATERIAL_FILENAME;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export default function ConnectBoxLeadForm({
  mode = "material",
  leadSource,
  ctaPosition,
  className,
}: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const isMaterial = mode === "material";
  const phoneRequired = isMaterial;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const company = String(data.get("company") ?? "").trim();
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!company || !name || !email || (phoneRequired && !phone)) {
      setStatus("error");
      setErrorMessage(
        phoneRequired
          ? "会社名、お名前、メールアドレス、電話番号はすべて必須です。"
          : "会社名、お名前、メールアドレスは必須です。",
      );
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

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
            _subject: isMaterial
              ? "【Connect Box】サービス資料ダウンロード"
              : "【Connect Box】無料トライアル・お問い合わせ",
            _template: "table",
            _captcha: "false",
            種別: isMaterial
              ? "サービス資料ダウンロード"
              : "無料トライアル・お問い合わせ",
            会社名: company,
            お名前: name,
            メールアドレス: email,
            電話番号: phone || "（未記入）",
            ...(isMaterial
              ? {}
              : { ご相談内容: message || "（未記入）" }),
            ページ: pageUrl,
          }),
        },
      );

      if (!res.ok) {
        throw new Error(`submit_failed_${res.status}`);
      }

      const leadParams = {
        lead_source:
          leadSource ??
          (isMaterial ? "connect_box_material" : "connect_box_inquiry"),
        page_path: `${window.location.pathname}${window.location.search}`,
        cta_position:
          ctaPosition ?? (isMaterial ? "download" : "inquiry_form"),
      };
      trackGenerateLead(leadParams);
      if (isMaterial) {
        trackCbMaterialDownload(leadParams);
        triggerDownload();
      } else {
        trackCbInquirySubmit(leadParams);
      }
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
      <div
        className={["cb-lead-form", "cb-lead-form--done", className]
          .filter(Boolean)
          .join(" ")}
        role="status"
      >
        <p className="cb-lead-form__done-title">送信しました</p>
        {isMaterial ? (
          <>
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
          </>
        ) : (
          <p className="cb-lead-form__done-body">
            内容を確認のうえ、ご連絡します。お急ぎの方はLINEか日程調整もご利用ください。
          </p>
        )}
      </div>
    );
  }

  return (
    <form
      className={["cb-lead-form", className].filter(Boolean).join(" ")}
      onSubmit={onSubmit}
      noValidate
    >
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
            電話番号{" "}
            {phoneRequired ? (
              <abbr title="必須">*</abbr>
            ) : (
              <em>（任意）</em>
            )}
          </span>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            required={phoneRequired}
            placeholder="090-0000-0000"
          />
        </label>
      </div>

      {!isMaterial ? (
        <label className="cb-lead-form__field">
          <span>
            ご相談内容 <em>（任意）</em>
          </span>
          <textarea
            name="message"
            rows={3}
            placeholder="いま落ちている業務や、試したい範囲だけでも大丈夫です"
          />
        </label>
      ) : null}

      <p className="cb-lead-form__note">
        {isMaterial
          ? "ご入力内容は資料送付とご案内の目的でのみ利用します。送信後すぐにサービス資料（PDF）をダウンロードできます。"
          : "ご入力内容はご相談への対応にのみ使用します。2週間の無料トライアルについても、こちらからご案内できます。"}
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
          : isMaterial
            ? "送信して資料をダウンロード"
            : "無料トライアルを申し込む"}
      </button>
    </form>
  );
}
