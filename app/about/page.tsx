import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "運営情報 | 神奈川 医療対応 老人ホーム相談",
  description: "運営情報、免責事項、プライバシーポリシーを掲載。",
  openGraph: {
    title: "運営情報 | 神奈川 医療対応 老人ホーム相談",
    description: "運営情報、免責事項、プライバシーポリシーを掲載。"
  }
};

export default function AboutPage() {
  return (
    <div>
      <section className="hero">
        <span className="badge">運営情報</span>
        <h1>安心して相談できる運営体制</h1>
        <p>医療依存度が高い方向けの入居相談に特化し、提携施設のみ掲載しています。</p>
      </section>

      <section className="section">
        <h2>運営者情報</h2>
        <div className="card">
          <p>運営主体: 神奈川医療対応老人ホーム相談（仮）</p>
          <p>所在地: 神奈川県内（詳細は契約時に開示）</p>
          <p>連絡先: 相談フォームよりご連絡ください</p>
        </div>
      </section>

      <section className="section">
        <h2>免責事項</h2>
        <div className="card">
          <p>
            本サイトに掲載している施設情報は提携施設からの提供情報に基づいていますが、
            最新の空室状況や受け入れ可否は変動します。必ず無料相談にて最新状況をご確認ください。
          </p>
          <p>
            医療行為や診断に関する判断は医療機関の指示に従ってください。
            本サイトの情報は意思決定支援を目的としており、医学的助言に代わるものではありません。
          </p>
        </div>
      </section>

      <section className="section">
        <h2>プライバシーポリシー</h2>
        <div className="card">
          <p>
            ご提供いただいた個人情報は、入居相談および施設提案の目的にのみ利用します。
            法令に基づく場合を除き、本人の同意なく第三者に開示・提供することはありません。
          </p>
          <p>
            相談内容は相談対応品質の向上および成約状況の分析に利用し、適切に管理します。
          </p>
        </div>
      </section>
    </div>
  );
}
