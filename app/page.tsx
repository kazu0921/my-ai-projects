import Link from "next/link";
import type { Metadata } from "next";
import areas from "@/data/areas.json";

export const metadata: Metadata = {
  title: "神奈川 医療対応 老人ホーム相談プラットフォーム",
  description:
    "神奈川全域で医療依存度が高い方の老人ホーム入居相談を最短でサポート。無料相談で空室・受け入れ可否を確認。",
  openGraph: {
    title: "神奈川 医療対応 老人ホーム相談プラットフォーム",
    description:
      "胃ろう・経管栄養・インスリン注射・看取り対応など医療依存度が高い方向けの入居相談に特化。"
  }
};

type Area = {
  slug: string;
  name: string;
};

const areaList = areas as Area[];

export default function HomePage() {
  return (
    <div>
      <section className="hero">
        <span className="badge">神奈川全域対応・医療依存度が高い方専門</span>
        <h1>医療が必要になっても、入れる老人ホームはあります。</h1>
        <p>
          胃ろう・経管栄養・インスリン注射・看取り対応など、医療依存度が高い方の入居先を最短でご案内します。
          神奈川県内の提携施設のみを掲載し、無料相談で空室・受け入れ可否を確認します。
        </p>
        <div className="cta-row">
          <Link className="cta" href="/consultation">
            無料相談を始める
          </Link>
          <Link className="cta secondary" href="/search">
            施設を検索する
          </Link>
        </div>
      </section>

      <section className="section">
        <h2>サービス概要</h2>
        <div className="cards">
          <div className="card">
            <h3>医療依存度が高い方向けに特化</h3>
            <p>胃ろう・経管栄養・インスリン注射・看取り対応などの条件を重視。</p>
          </div>
          <div className="card">
            <h3>神奈川県内の提携施設のみ</h3>
            <p>無断掲載は行わず、受け入れ確認ができる施設のみを掲載。</p>
          </div>
          <div className="card">
            <h3>相談から入居まで伴走</h3>
            <p>最短で空室・受け入れ可否を確認し、見学調整まで支援。</p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>エリア別に相談する</h2>
        <p>神奈川県内の市区町村別に受け入れ事情を確認できます。</p>
        <div className="cards">
          {areaList.map((area) => (
            <div className="card" key={area.slug}>
              <h3>{area.name}</h3>
              <Link className="cta secondary" href={`/kanagawa/${area.slug}`}>
                {area.name}の相談ページへ
              </Link>
            </div>
          ))}
        </div>
        <Link className="cta" href="/kanagawa">
          エリア一覧を見る
        </Link>
      </section>

      <section className="section">
        <h2>強み</h2>
        <div className="cards">
          <div className="card">
            <h3>CV優先の導線</h3>
            <p>24時間以内の折り返しを目指す体制で緊急性に対応。</p>
          </div>
          <div className="card">
            <h3>医療対応の見える化</h3>
            <p>対応可能な医療処置を一覧で提示し、ミスマッチを防止。</p>
          </div>
          <div className="card">
            <h3>将来の他県展開を想定</h3>
            <p>エリア別LPを増やせる構造で横展開が容易。</p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>まずは無料相談</h2>
        <p>
          医療対応の条件や希望エリアを伝えるだけで、受け入れ可能な施設を確認します。
          迷ったら今すぐ無料相談をご利用ください。
        </p>
        <div className="cta-row">
          <Link className="cta" href="/consultation">
            無料相談へ進む
          </Link>
          <Link className="cta secondary" href="/about">
            運営情報を見る
          </Link>
        </div>
      </section>
    </div>
  );
}
