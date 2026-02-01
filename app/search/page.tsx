import facilities from "@/data/facilities.json";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "施設検索 | 神奈川 医療対応 老人ホーム相談",
  description:
    "神奈川県内の医療対応老人ホームを検索。胃ろう・経管栄養・インスリン注射などの条件に対応した提携施設のみ掲載。"
};

export default function SearchPage() {
  return (
    <div>
      <section className="hero">
        <span className="badge">神奈川県内の提携施設のみ</span>
        <h1>施設検索（簡易）</h1>
        <p>
          神奈川県内で医療依存度が高い方を受け入れ可能な施設を一覧で表示します。
          詳細条件は無料相談で確認できます。
        </p>
      </section>

      <section className="section">
        <h2>検索条件（MVP）</h2>
        <div className="cards">
          <div className="card">
            <h3>エリア</h3>
            <p>神奈川県全域（横浜市・川崎市・藤沢市 ほか）</p>
          </div>
          <div className="card">
            <h3>医療対応</h3>
            <p>胃ろう / 経管栄養 / インスリン注射 / 看取り など</p>
          </div>
          <div className="card">
            <h3>費用帯</h3>
            <p>月額 19〜28万円の範囲</p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>提携施設一覧</h2>
        <div className="cards">
          {facilities.map((facility) => (
            <div className="card" key={facility.id}>
              <h3>{facility.name}</h3>
              <p>エリア: {facility.area}</p>
              <p>対応医療: {facility.medicalSupport.join(" / ")}</p>
              <p>費用目安: {facility.monthlyCost}</p>
              <p>空室状況: {facility.availability}</p>
              <p>{facility.summary}</p>
              <Link className="cta secondary" href="/consultation">
                この施設について相談
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
