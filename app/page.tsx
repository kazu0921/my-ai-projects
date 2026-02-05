import Link from "next/link";
import type { Metadata } from "next";
import areas from "@/data/areas.json";

export const metadata: Metadata = {
  title: "医療対応 介護入居相談センター（神奈川）",
  description:
    "医療が必要になったときに頼れる、神奈川県全域の介護入居相談窓口。比較ではなく、状況整理と意思決定を丁寧に支援します。",
  openGraph: {
    title: "医療対応 介護入居相談センター（神奈川）",
    description:
      "焦りや情報疲れを抱えるご家族へ。医療対応が必要な方の介護入居相談を、中立的にサポートします。"
  }
};

type Area = { slug: string; name: string };
const areaList = areas as Area[];

export default function HomePage() {
  return (
    <div>
      <section className="hero">
        <span className="badge">医療対応 介護入居相談センター（神奈川）</span>
        <h1>
          医療が必要になっても
          <br />
          入居できる介護施設は、あります。
        </h1>
        <p>
          まだ決めなくて大丈夫です。
          いまの状況を整理し、神奈川県内で受け入れ可能な候補を一緒に確認します。
        </p>
        <div className="cta-row">
          <Link className="btn btn-consult" href="/consultation">
            無料で相談する（24時間受付）
          </Link>
          <Link className="btn" href="/kanagawa">
            神奈川県の対応エリアを見る
          </Link>
        </div>
      </section>

      <section className="section">
        <h2>この窓口の役割</h2>
        <div className="cards">
          <div className="card">
            <h3>比較ではなく、相談</h3>
            <p>ランキングや過剰な訴求ではなく、今必要な情報だけを整理してご案内します。</p>
          </div>
          <div className="card">
            <h3>公的機関に近い中立性</h3>
            <p>売り込みを前提にせず、ご家族の不安と条件を優先して候補を絞ります。</p>
          </div>
          <div className="card">
            <h3>医療対応の確認を代行</h3>
            <p>胃ろう・経管栄養・インスリン・看取りなど、受け入れ可否を確認します。</p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>神奈川県全域に対応しています</h2>
        <p>横浜市・川崎市・藤沢市・茅ヶ崎市・相模原市を含む市区町村別ページをご用意しています。</p>
        <div className="cards">
          {areaList.map((area) => (
            <div className="card" key={area.slug}>
              <h3>{area.name}</h3>
              <Link className="btn" href={`/kanagawa/${area.slug}`}>
                {area.name}の相談ページへ
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>ご相談の進み方</h2>
        <div className="cards">
          <div className="card">
            <h3>1. 状況をうかがう</h3>
            <p>現在の医療処置、希望エリア、急ぎ度を確認します。</p>
          </div>
          <div className="card">
            <h3>2. 候補を確認する</h3>
            <p>受け入れ可否と費用感を照らし合わせ、候補を絞ります。</p>
          </div>
          <div className="card">
            <h3>3. 次の一歩を決める</h3>
            <p>見学や手続きの進め方を、無理のない順序でご案内します。</p>
          </div>
        </div>
        <div className="cta-row">
          <Link className="btn btn-consult" href="/consultation">
            無料で相談する（24時間受付）
          </Link>
          <Link className="btn" href="/search">
            施設検索ページを見る
          </Link>
        </div>
      </section>
    </div>
  );
}
