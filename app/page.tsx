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
            入居できる道は、あります。
          </h1>
          <p>比較ではなく、いまの状況を一緒に整える窓口です。</p>
          <details className="hero-detail">
            <summary>相談窓口でできること</summary>
            <p>
              医療面の条件が合うか、こちらで確認します。見学や手続きまで、
              無理なく進められるようにお手伝いします。
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
          <p className="cta-note">無理な営業や即決のご案内は行いません。</p>
          <div className="hero-pills">
            <span className="pill">
              <span className="pill-icon">静</span>比較ではありません
            </span>
            <span className="pill">
              <span className="pill-icon">安</span>今すぐ決めなくて大丈夫
            </span>
            <span className="pill">
              <span className="pill-icon">県</span>神奈川県全域対応
            </span>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <svg viewBox="0 0 320 240" role="img">
            <rect x="10" y="20" width="300" height="200" rx="22" fill="#ffffff" />
            <rect x="36" y="50" width="248" height="36" rx="10" fill="#f1f4f8" />
            <rect x="36" y="98" width="248" height="36" rx="10" fill="#f1f4f8" />
            <rect x="36" y="146" width="248" height="36" rx="10" fill="#f1f4f8" />
            <rect x="46" y="60" width="16" height="16" rx="4" fill="#c5d2e5" />
            <rect x="46" y="108" width="16" height="16" rx="4" fill="#c5d2e5" />
            <rect x="46" y="156" width="16" height="16" rx="4" fill="#c5d2e5" />
            <rect x="70" y="60" width="160" height="8" rx="4" fill="#d5deec" />
            <rect x="70" y="108" width="140" height="8" rx="4" fill="#d5deec" />
            <rect x="70" y="156" width="150" height="8" rx="4" fill="#d5deec" />
          </svg>
          <p className="visual-caption">公的窓口に近い、静かな情報整理</p>
        </div>
      </section>
      <section className="section flow-section" aria-label="相談フロー図解">
        <div className="section-heading">
          <h2>相談の流れ（図解）</h2>
          <span className="badge badge-muted">見てわかる3ステップ</span>
        </div>
        <div className="flow-cards">
          <div className="flow-card">
            <div className="flow-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <rect x="5" y="4" width="14" height="16" rx="2" fill="#f1f4f8" stroke="#7c90ad" />
                <path d="M8 8h8M8 12h8M8 16h5" stroke="#7c90ad" strokeWidth="1.4" />
                <path d="M6.5 6.5l1 1 2-2" stroke="#7c90ad" strokeWidth="1.4" />
              </svg>
            </div>
            <p>医療状況を確認</p>
          </div>
          <div className="flow-line" aria-hidden="true">→</div>
          <div className="flow-card">
            <div className="flow-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <rect x="4" y="6" width="16" height="12" rx="2" fill="#f1f4f8" stroke="#7c90ad" />
                <path d="M8 9h8M8 12h8" stroke="#7c90ad" strokeWidth="1.4" />
                <path d="M16.5 6.5v6" stroke="#7c90ad" strokeWidth="1.4" />
                <path d="M13.5 9.5h6" stroke="#7c90ad" strokeWidth="1.4" />
              </svg>
            </div>
            <p>入居できる施設を整理</p>
          </div>
          <div className="flow-line" aria-hidden="true">→</div>
          <div className="flow-card">
            <div className="flow-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M6 17c0 1.6-1.3 3-3 3" stroke="#7c90ad" strokeWidth="1.6" />
                <path d="M14 6c1.7 0 3 1.4 3 3" stroke="#7c90ad" strokeWidth="1.6" />
                <circle cx="8" cy="14" r="3" fill="#f1f4f8" stroke="#7c90ad" />
                <circle cx="16" cy="10" r="3" fill="#f1f4f8" stroke="#7c90ad" />
              </svg>
            </div>
            <p>見学・手続きまで支援</p>
          </div>
        </div>
      </section>

      <section className="section" id="role">
        <div className="section-heading">
          <h2>この窓口の役割</h2>
          <span className="badge badge-muted">比較ではなく相談</span>
        </div>
        <div className="section-illustration" aria-hidden="true">
          <svg viewBox="0 0 220 60">
            <rect x="10" y="14" width="56" height="32" rx="8" fill="#f1f4f8" />
            <rect x="78" y="10" width="56" height="40" rx="8" fill="#f1f4f8" />
            <rect x="146" y="18" width="56" height="28" rx="8" fill="#f1f4f8" />
            <path d="M26 30h20M92 30h20M160 30h20" stroke="#7c90ad" strokeWidth="2" />
          </svg>
        </div>
        <div className="cards icon-cards">
          <div className="card">
            <div className="icon-circle" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <rect x="5" y="4" width="14" height="16" rx="2" fill="#edf1f7" stroke="#7c90ad" />
                <path d="M8 8h8M8 12h8M8 16h5" stroke="#7c90ad" strokeWidth="1.4" />
                <path d="M6.5 6.5l1 1 2-2" stroke="#7c90ad" strokeWidth="1.4" />
              </svg>
            </div>
            <h3>状況整理</h3>
            <p>今の医療状態と希望条件をわかりやすく整えます。</p>
          </div>
          <div className="card">
            <div className="icon-circle" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <rect x="4.5" y="6" width="15" height="11" rx="2" fill="#edf1f7" stroke="#7c90ad" />
                <path d="M8 9h5" stroke="#7c90ad" strokeWidth="1.4" />
                <path d="M8 12h8" stroke="#7c90ad" strokeWidth="1.4" />
                <circle cx="18" cy="10" r="3" fill="#e6b8bf" />
                <path d="M17.2 10l1 1.1 1.6-2" stroke="#7c90ad" strokeWidth="1.4" />
              </svg>
            </div>
            <h3>候補確認</h3>
            <p>医療面の条件が合うか、こちらで確認します。</p>
          </div>
          <div className="card">
            <div className="icon-circle" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M7 17c0 1.7-1.4 3-3 3" stroke="#7c90ad" strokeWidth="1.6" />
                <path d="M14 6c1.7 0 3 1.4 3 3" stroke="#7c90ad" strokeWidth="1.6" />
                <circle cx="8" cy="14" r="3" fill="#edf1f7" stroke="#7c90ad" />
                <circle cx="16" cy="10" r="3" fill="#edf1f7" stroke="#7c90ad" />
              </svg>
            </div>
            <h3>次の一歩</h3>
            <p>見学や手続きまで、無理なく進めます。</p>
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
            <circle cx="140" cy="70" r="6" fill="#c8d2e2" />
            <circle cx="200" cy="120" r="6" fill="#c8d2e2" />
            <text x="70" y="72" fontSize="10" fill="#7c90ad">横浜</text>
            <text x="125" y="62" fontSize="10" fill="#7c90ad">川崎</text>
            <text x="188" y="114" fontSize="10" fill="#7c90ad">湘南</text>
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
        <div className="section-illustration" aria-hidden="true">
          <svg viewBox="0 0 220 60">
            <path d="M12 36h60l20-14 20 14h76" fill="none" stroke="#7c90ad" strokeWidth="2" />
            <circle cx="12" cy="36" r="6" fill="#f1f4f8" stroke="#7c90ad" />
            <circle cx="92" cy="22" r="6" fill="#f1f4f8" stroke="#7c90ad" />
            <circle cx="132" cy="36" r="6" fill="#f1f4f8" stroke="#7c90ad" />
          </svg>
        </div>
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
