import type { Metadata } from "next";
import ConsultationForm from "./ConsultationForm";

export const metadata: Metadata = {
  title: "無料相談 | 神奈川 医療対応 老人ホーム相談",
  description:
    "医療依存度が高い方向けの入居相談フォーム。名前・メール・電話・相談内容だけで最短相談が可能。",
  openGraph: {
    title: "無料相談 | 神奈川 医療対応 老人ホーム相談",
    description:
      "医療依存度が高い方向けの入居相談フォーム。名前・メール・電話・相談内容だけで最短相談が可能。"
  }
};

export default function ConsultationPage() {
  return (
    <div>
      <section className="hero">
        <span className="badge">最短1分で相談完了</span>
        <h1>医療対応が必要な方の入居相談（無料）</h1>
        <p>
          医療が必要になっても入れる施設が見つからない方へ。
          神奈川県内の医療対応老人ホームを熟知した相談員が、受け入れ可能な施設を最短でご案内します。
        </p>
      </section>

      <section className="section">
        <h2>相談フォーム</h2>
        <ConsultationForm />
      </section>

      <section className="section">
        <h2>相談の流れ</h2>
        <div className="cards">
          <div className="card">
            <h3>1. 相談内容の確認</h3>
            <p>いただいた条件をもとに受け入れ可否を確認します。</p>
          </div>
          <div className="card">
            <h3>2. 施設候補のご提案</h3>
            <p>空室・医療対応状況を確認し、候補施設をご提案。</p>
          </div>
          <div className="card">
            <h3>3. 見学・入居調整</h3>
            <p>ご希望に応じて見学や入居手続きの調整を支援します。</p>
          </div>
        </div>
      </section>
    </div>
  );
}
