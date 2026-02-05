import Link from "next/link";
import facilities from "@/data/facilities.json";
import type { Facility } from "@/types/facility";
import type { Metadata } from "next";

const facilityList = facilities as Facility[];

type FacilityPageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return facilityList.map((facility) => ({ slug: facility.slug }));
}

export function generateMetadata({ params }: FacilityPageProps): Metadata {
  const facility = facilityList.find((item) => item.slug === params.slug);

  if (!facility) {
    return {
      title: "施設情報 | 神奈川 医療対応 老人ホーム相談",
      description: "施設情報の詳細ページ。"
    };
  }

  return {
    title: `${facility.name} | 施設詳細`,
    description: `${facility.city}の医療対応施設。${facility.summary}`,
    openGraph: {
      title: `${facility.name} | 施設詳細`,
      description: `${facility.city}の医療対応施設。${facility.summary}`
    }
  };
}

export default function FacilityDetailPage({ params }: FacilityPageProps) {
  const facility = facilityList.find((item) => item.slug === params.slug);

  if (!facility) {
    return (
      <section className="hero">
        <h1>施設が見つかりませんでした</h1>
        <Link className="btn" href="/search">
          施設検索に戻る
        </Link>
      </section>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: facility.name,
    address: {
      "@type": "PostalAddress",
      addressRegion: "神奈川県",
      addressLocality: facility.city,
      streetAddress: facility.address
    },
    medicalSpecialty: facility.medicalSupport,
    url: `https://example.com/facilities/${facility.slug}`
  };

  return (
    <div>
      <section className="hero">
        <span className="badge">提携施設詳細</span>
        <h1>{facility.name}</h1>
        <p>{facility.summary}</p>
        <div className="cta-row">
          <Link className="btn btn-consult" href="/consultation">
            この施設について相談する
          </Link>
          <Link className="btn" href="/search">
            施設一覧に戻る
          </Link>
        </div>
      </section>

      <section className="section">
        <h2>施設概要</h2>
        <div className="card">
          <p>所在地: {facility.address}</p>
          <p>エリア: {facility.city}</p>
          <p>入居形態: {facility.type}</p>
          <p>空室状況: {facility.availability}</p>
          <p>
            費用目安: 月額 {Math.round(facility.minCost / 10000)}〜
            {Math.round(facility.maxCost / 10000)}万円
          </p>
          <p>
            地図: {" "}
            <a href={facility.mapUrl} target="_blank" rel="noreferrer">
              Google Mapsで見る
            </a>
          </p>
        </div>
      </section>

      <section className="section">
        <h2>対応可能な医療内容</h2>
        <div className="cards">
          {facility.medicalSupport.map((item) => (
            <div className="card" key={item}>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>相談窓口</h2>
        <div className="card">
          <p>
            受け入れ条件は日々変動します。無料相談で最新の受け入れ可否を確認してください。
          </p>
          <div className="cta-row">
            <Link className="btn btn-consult" href="/consultation">
              無料相談へ進む
            </Link>
            <Link className="btn" href="/kanagawa">
              エリア別ページを見る
            </Link>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
