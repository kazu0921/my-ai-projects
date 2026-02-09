import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "送信完了 | 神奈川 医療対応 老人ホーム相談",
  description: "入居相談の送信完了ページ。相談内容を確認し、担当者から連絡します。",
  openGraph: {
    title: "送信完了 | 神奈川 医療対応 老人ホーム相談",
    description: "入居相談の送信完了ページ。相談内容を確認し、担当者から連絡します。"
  }
};

export default function ConsultationThanksPage() {
  return (
    <div>
      <section className="hero">
        <span className="badge">送信完了</span>
        <h1>ご相談ありがとうございます</h1>
        <p>
          内容を確認のうえ、担当者より24時間以内を目安にご連絡いたします。
          緊急の場合はお電話でのご相談も可能です。
        </p>
        <div className="cta-row">
          <Link className="btn" href="/">
            トップに戻る
          </Link>
          <Link className="btn" href="/search">
            施設一覧を見る
          </Link>
        </div>
      </section>

      <section className="section">
        <h2>次のご案内</h2>
        <div className="cards">
          <div className="card">
            <h3>連絡方法の目安</h3>
            <p>原則メールまたはお電話でご連絡します。日中にご連絡が取れる時間帯をお知らせください。</p>
          </div>
          <div className="card">
            <h3>医療情報の整理</h3>
            <p>主治医の診断内容や医療処置の内容を簡単にメモしておくとスムーズです。</p>
          </div>
          <div className="card">
            <h3>希望条件の確認</h3>
            <p>希望エリア、費用感、入居希望時期を家族で共有しておきましょう。</p>
          </div>
        </div>
      </section>
    </div>
  );
}
