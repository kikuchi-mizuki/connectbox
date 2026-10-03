import { Link } from "react-router-dom";
import { usePageMeta } from "../hooks/usePageMeta";

export default function NotFoundPage() {
  usePageMeta({
    title: "ページが見つかりません｜株式会社T-connect",
    description: "お探しのページは見つかりませんでした。",
    path: "/404",
    noindex: true,
  });

  return (
    <main className="not-found">
      <div className="not-found__inner">
        <p className="not-found__code">404</p>
        <h1 className="not-found__title">ページが見つかりません</h1>
        <p className="not-found__lead">
          URLが変わったか、削除された可能性があります。
        </p>
        <div className="not-found__actions">
          <Link className="btn btn--primary" to="/">
            トップへ戻る
          </Link>
          <Link className="btn btn--secondary" to="/connect-box">
            Connect Boxを見る
          </Link>
        </div>
      </div>
    </main>
  );
}
