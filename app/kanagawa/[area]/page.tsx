import Link from "next/link";
import type { Metadata } from "next";
import areas from "@/data/areas.json";
import facilities from "@/data/facilities.json";
import type { Facility } from "@/types/facility";

const areaList = areas as Array<{
  slug: string;
  name: string;
  cities: string[];
  summary: string;
}>;
const facilityList = facilities as Facility[];

type AreaPageProps = {
  params: { area: string };
};

export function generateStaticParams() {
  return areaList.map((area) => ({ area: area.slug }));
}

export function generateMetadata({ params }: AreaPageProps): Metadata {
  const area = areaList.find((item) => item.slug === params.area);

  if (!area) {
    return {
      title: "神奈川エリア別 施設相談",
      description: "神奈川県内の医療対応老人ホーム相談ページ。"
    };
  }

  return {
    title: `${area.name} 医療対応 老人ホーム相談`,
    description: `${area.name}で医療依存度が高い方向けの老人ホーム相談。無料相談で受け入れ可否を確認できます。`,
    openGraph: {
      title: `${area.name} 医療対応 老人ホーム相談`,
      description: `${area.name}で医療依存度が高い方向けの老人ホーム相談。無料相談で受け入れ可否を確認できます。`
    }
  };
}

function createFaqJsonLd(areaName: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `${areaName}で医療依存度が高い方が入れる施設はありますか？`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `医療対応の条件によって受け入れ可否が変わるため、無料相談で空室と医療対応を確認します。`
        }
      },
      {
        "@type": "Question",
        name: "急ぎの入居相談でも対応できますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "緊急度が高い場合でも相談可能です。希望条件を入力いただければ最短で受け入れ可否を確認します。"
        }
      },
      {
        "@type": "Question",
        name: "費用はどのくらいかかりますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "施設の入居形態や医療対応によって月額費用が異なります。相談時に希望費用帯をお伝えください。"
        }
      }
    ]
  };
}

export default function AreaDetailPage({ params }: AreaPageProps) {
  const area = areaList.find((item) => item.slug === params.area);

  if (!area) {
    return (
      <section className="hero">
        <h1>エリアが見つかりませんでした</h1>
        <Link className="cta" href="/kanagawa">
          エリア一覧に戻る
        </Link>
      </section>
    );
  }

  const areaFacilities = facilityList.filter((facility) =>
    area.cities.some((city) => facility.city.startsWith(city))
  );

  const faqJsonLd = createFaqJsonLd(area.name);

  return (
    <div>
      <section className="hero">
        <span className="badge">{area.name}の相談ページ</span>
        <h1>{area.name} 医療対応 老人ホーム相談</h1>
        <p>{area.summary}</p>
        <div className="cta-row">
          <Link className="cta" href="/consultation">
            無料相談を始める
          </Link>
          <Link className="cta secondary" href="/search">
            施設検索をする
          </Link>
        </div>
      </section>

      <section className="section">
        <h2>{area.name}でよくあるお悩み</h2>
        <div className="cards">
          <div className="card">
            <h3>医療処置に対応できる施設が少ない</h3>
            <p>胃ろう・経管栄養・インスリン注射など、条件に合う施設を確認します。</p>
          </div>
          <div className="card">
            <h3>空室状況が分からない</h3>
            <p>最新の空室状況は無料相談で一括確認し、候補を絞り込みます。</p>
          </div>
          <div className="card">
            <h3>費用と医療対応のバランスが不安</h3>
            <p>希望費用帯と医療条件を伺い、条件に合う施設だけをご提案します。</p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>提携施設候補</h2>
        <div className="cards">
          {areaFacilities.length === 0 ? (
            <div className="card">
              <p>該当エリアの施設情報は相談窓口でご案内します。</p>
              <Link className="cta" href="/consultation">
                無料相談へ進む
              </Link>
            </div>
          ) : (
            areaFacilities.map((facility) => (
              <div className="card" key={facility.slug}>
                <h3>{facility.name}</h3>
                <p>エリア: {facility.city}</p>
                <p>入居形態: {facility.type}</p>
                <p>
                  費用目安: 月額 {Math.round(facility.minCost / 10000)}〜
                  {Math.round(facility.maxCost / 10000)}万円
                </p>
                <p>対応医療: {facility.medicalSupport.join(" / ")}</p>
                <div className="cta-row">
                  <Link className="cta secondary" href={`/facilities/${facility.slug}`}>
                    施設詳細を見る
                  </Link>
                  <Link className="cta" href="/consultation">
                    この施設について相談
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="section">
        <h2>FAQ</h2>
        <div className="cards">
          <div className="card">
            <h3>{area.name}で医療依存度が高い方が入れる施設はありますか？</h3>
            <p>医療対応の条件によって受け入れ可否が変わるため、無料相談で空室と医療対応を確認します。</p>
          </div>
          <div className="card">
            <h3>急ぎの入居相談でも対応できますか？</h3>
            <p>緊急度が高い場合でも相談可能です。希望条件を入力いただければ最短で受け入れ可否を確認します。</p>
          </div>
          <div className="card">
            <h3>費用はどのくらいかかりますか？</h3>
            <p>施設の入居形態や医療対応によって月額費用が異なります。相談時に希望費用帯をお伝えください。</p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>相談窓口</h2>
        <div className="card">
          <p>受け入れ可否の確認は無料相談で最短対応します。</p>
          <Link className="cta" href="/consultation">
            無料相談へ進む
          </Link>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </div>
  );
}
