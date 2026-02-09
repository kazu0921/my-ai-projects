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
const majorAreaSlugs = [
  "yokohama",
  "kawasaki",
  "fujisawa",
  "chigasaki",
  "sagamihara",
  "yokosuka",
  "atsugi",
  "hiratsuka"
];
const majorAreas = areaList.filter((area) => majorAreaSlugs.includes(area.slug));
const otherAreas = areaList.filter((area) => !majorAreaSlugs.includes(area.slug));

export default function HomePage() {
  return (
    <div>
      <section className="hero hero-grid">
        <div>
          <span className="badge">医療対応 介護入居相談センター（神奈川）</span>
          <h1>
            医療が必要になっても
            <br />
            入居できる選択肢はあります。
          </h1>
          <p>比較ではなく、状況整理と意思決定の相談窓口です。</p>
          <details className="hero-detail">
            <summary>相談窓口としてできること</summary>
            <p>
              医療条件の確認、候補整理、見学調整までを落ち着いて進めます。売り込みではなく、
              ご家族の不安を整えることを優先します。
            </p>
          </details>
          <div className="cta-row">
            <Link className="btn btn-consult" href="/consultation">
              無料で相談する（24時間受付）
            </Link>
            <Link className="btn" href="/kanagawa">
              対応エリアを見る
            </Link>
          </div>
          <div className="hero-pills">
            <span className="pill">
              <span className="pill-icon">安</span>まだ決めなくて大丈夫
            </span>
            <span className="pill">
              <span className="pill-icon">県</span>神奈川県全域対応
            </span>
            <span className="pill">
              <span className="pill-icon">医</span>医療条件の確認を代行
            </span>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <svg viewBox="0 0 320 240" role="img">
            <rect x="10" y="20" width="300" height="200" rx="22" fill="#ffffff" />
            <path d="M38 78h244v8H38z" fill="#d9e1ee" />
            <path d="M38 106h190v8H38z" fill="#d9e1ee" />
            <path d="M38 134h220v8H38z" fill="#d9e1ee" />
            <circle cx="80" cy="175" r="18" fill="#c7d4e8" />
            <circle cx="136" cy="175" r="18" fill="#c7d4e8" />
            <circle cx="192" cy="175" r="18" fill="#c7d4e8" />
            <path d="M238 158h50v34h-50z" fill="#e6b8bf" />
          </svg>
          <p className="visual-caption">公的窓口に近い、静かな情報整理</p>
        </div>
      </section>

      <section className="section" id="role">
        <div className="section-heading">
          <h2>この窓口の役割</h2>
          <span className="badge badge-muted">比較ではなく相談</span>
        </div>
        <div className="cards icon-cards">
          <div className="card">
            <div className="icon-circle">整</div>
            <h3>状況整理</h3>
            <p>今の医療状態と希望条件を短時間で整理します。</p>
          </div>
          <div className="card">
            <div className="icon-circle">確</div>
            <h3>候補確認</h3>
            <p>医療対応条件の受け入れ可否を確認します。</p>
          </div>
          <div className="card">
            <div className="icon-circle">歩</div>
            <h3>次の一歩</h3>
            <p>見学や手続きまで、無理のない順序で支援します。</p>
          </div>
        </div>
        <div className="cta-row">
          <Link className="btn btn-consult" href="/consultation">
            無料で相談する（24時間受付）
          </Link>
          <span className="cta-note">匿名での相談も可能です</span>
        </div>
      </section>

      <section className="section section-muted" id="area">
        <h2>神奈川県全域に対応しています</h2>
        <p>主要エリアから順にご案内します。詳細は市区町村別ページで確認できます。</p>
        <div className="area-map" aria-hidden="true">
          <svg viewBox="0 0 280 200">
            <path d="M35 30h80l40 20 50-10 40 30-10 40-60 40-80-10-50-30z" fill="none" stroke="#c8d2e2" strokeWidth="2" />
            <circle cx="80" cy="80" r="6" fill="#c8d2e2" />
            <circle cx="150" cy="70" r="6" fill="#c8d2e2" />
            <circle cx="200" cy="120" r="6" fill="#c8d2e2" />
          </svg>
        </div>
        <div className="area-grid">
          {majorAreas.map((area) => (
            <div className="card area-card" key={area.slug}>
              <h3>{area.name}</h3>
              <p>医療対応の受け入れ事情を確認</p>
              <Link className="btn" href={`/kanagawa/${area.slug}`}>
                相談ページへ
              </Link>
            </div>
          ))}
        </div>
        <details className="area-accordion">
          <summary>すべての市区町村を見る</summary>
          <div className="area-list">
            {otherAreas.map((area) => (
              <Link key={area.slug} href={`/kanagawa/${area.slug}`}>
                {area.name}
              </Link>
            ))}
          </div>
        </details>
      </section>

      <section className="section" id="steps">
        <h2>ご相談の進み方</h2>
        <div className="stepper">
          <div className="step">
            <span className="step-index">1</span>
            <div>
              <h3>状況を確認</h3>
              <p>医療処置と希望条件を共有します。</p>
            </div>
          </div>
          <div className="step">
            <span className="step-index">2</span>
            <div>
              <h3>候補を整理</h3>
              <p>受け入れ可否と費用感を確認します。</p>
            </div>
          </div>
          <div className="step">
            <span className="step-index">3</span>
            <div>
              <h3>次の一歩へ</h3>
              <p>見学・手続きの段取りを支援します。</p>
            </div>
          </div>
        </div>
        <div className="cta-row">
          <Link className="btn btn-consult" href="/consultation">
            無料で相談する（24時間受付）
          </Link>
          <span className="cta-note">24時間以内に折り返し連絡</span>
        </div>
      </section>
    </div>
  );
}
