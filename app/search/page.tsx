import Link from "next/link";
import type { Metadata } from "next";
import facilities from "@/data/facilities.json";
import type { Facility } from "@/types/facility";
import SearchClient from "./SearchClient";

export const metadata: Metadata = {
  title: "施設検索 | 医療対応 介護入居相談センター（神奈川）",
  description:
    "神奈川県内の医療対応施設を、市区町村・費用帯・入居形態・医療対応条件から絞り込めます。",
  openGraph: {
    title: "施設検索 | 医療対応 介護入居相談センター（神奈川）",
    description:
      "比較表ではなく、必要条件で候補を絞り込むための施設検索ページです。"
  }
};

const facilityList = facilities as Facility[];

export default function SearchPage() {
  return (
    <div>
      <section className="hero">
        <span className="badge">神奈川県全域対応</span>
        <h1>施設検索</h1>
        <p>
          迷いを減らすために、必要条件だけで絞り込みます。
          決めきれない場合は、無料相談で状況整理から対応します。
        </p>
        <div className="cta-row">
          <Link className="btn" href="/kanagawa">
            エリア別相談ページを見る
          </Link>
          <Link className="btn btn-consult" href="/consultation">
            無料で相談する（24時間受付）
          </Link>
        </div>
      </section>
      <SearchClient facilities={facilityList} />
    </div>
  );
}
