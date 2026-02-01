import Link from "next/link";
import type { Metadata } from "next";
import areas from "@/data/areas.json";

export const metadata: Metadata = {
  title: "神奈川エリア別 老人ホーム相談 | 医療対応特化",
  description:
    "神奈川県内の市区町村別に医療対応老人ホーム相談ページを用意。横浜市・川崎市・藤沢市などのエリア別に施設相談が可能。",
  openGraph: {
    title: "神奈川エリア別 老人ホーム相談 | 医療対応特化",
    description:
      "神奈川県内の市区町村別に医療対応老人ホーム相談ページを用意。緊急度の高いケースでも無料相談で最新の受け入れ状況を確認。"
  }
};

type Area = {
  slug: string;
  name: string;
  summary: string;
};

const areaList = areas as Area[];

export default function KanagawaAreaPage() {
  return (
    <div>
      <section className="hero">
        <span className="badge">神奈川県エリア別ページ</span>
        <h1>神奈川県の市区町村別 施設相談</h1>
        <p>
          医療依存度が高い方の受け入れ先は限られています。市区町村ごとの受け入れ事情に合わせて、
          最適な施設候補を無料相談でご案内します。
        </p>
      </section>

      <section className="section">
        <h2>エリア一覧</h2>
        <div className="cards">
          {areaList.map((area) => (
            <div className="card" key={area.slug}>
              <h3>{area.name}</h3>
              <p>{area.summary}</p>
              <Link className="cta secondary" href={`/kanagawa/${area.slug}`}>
                {area.name}の相談ページを見る
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>相談窓口</h2>
        <div className="card">
          <p>緊急入居の相談は無料相談フォームからお知らせください。</p>
          <Link className="cta" href="/consultation">
            無料相談へ進む
          </Link>
        </div>
      </section>
    </div>
  );
}
