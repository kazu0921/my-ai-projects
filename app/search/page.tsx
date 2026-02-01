import type { Metadata } from "next";
import facilities from "@/data/facilities.json";
import type { Facility } from "@/types/facility";
import SearchClient from "./SearchClient";

export const metadata: Metadata = {
  title: "施設検索 | 神奈川 医療対応 老人ホーム相談",
  description:
    "神奈川県内の医療対応老人ホームを検索。市区町村・費用帯・入居形態・医療対応条件で絞り込み可能。",
  openGraph: {
    title: "施設検索 | 神奈川 医療対応 老人ホーム相談",
    description:
      "神奈川県内の医療対応施設を条件検索。提携施設のみ掲載し、無料相談で最新の受け入れ状況を確認できます。"
  }
};

const facilityList = facilities as Facility[];

export default function SearchPage() {
  return (
    <div>
      <section className="hero">
        <span className="badge">神奈川県内の提携施設のみ</span>
        <h1>施設検索</h1>
        <p>
          市区町村・費用帯・入居形態・医療対応条件で絞り込みが可能です。
          最新の空室状況は無料相談で確認できます。
        </p>
        <div className="cta-row">
          <Link className="cta secondary" href="/kanagawa">
            エリア別の相談ページを見る
          </Link>
        </div>
      </section>
      <SearchClient facilities={facilityList} />
    </div>
  );
}
