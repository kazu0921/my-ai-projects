import type { Metadata } from "next";
import ConsultationForm from "./ConsultationForm";

export const metadata: Metadata = {
  title: "入居相談 | 医療対応 介護入居相談センター（神奈川）",
  description:
    "まだ決めなくて大丈夫です。医療対応が必要な方の介護入居について、神奈川県全域で無料相談を受け付けています。",
  openGraph: {
    title: "入居相談 | 医療対応 介護入居相談センター（神奈川）",
    description:
      "いまの状況を聞かせてください。売り込みではなく、次の一歩を整理する相談窓口です。"
  }
};

export default function ConsultationPage() {
  return (
    <div>
      <section className="hero">
        <span className="badge">1画面で完結する相談フォーム</span>
        <h1>まだ決めなくて大丈夫です。<br />今の状況を聞かせてください。</h1>
        <p>
          医療や介護の専門知識がなくても問題ありません。
          ご家族の状況に合わせて、受け入れ先を一緒に整理します。
        </p>
      </section>

      <section className="section">
        <h2>無料相談フォーム</h2>
        <ConsultationForm />
      </section>
    </div>
  );
}
