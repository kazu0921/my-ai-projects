import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "施設向け 掲載案内 | 医療対応 介護入居相談センター（神奈川）",
  description:
    "比較やランキングに頼らず、医療対応が必要な方と施設を丁寧につなぐ相談窓口の掲載案内です。",
  openGraph: {
    title: "施設向け 掲載案内 | 医療対応 介護入居相談センター（神奈川）",
    description:
      "無断掲載なし・ランキング非表示。医療条件を確認した上で合う施設のみをご紹介します。"
  }
};

export default function ForFacilitiesPage() {
  return (
    <div className="btob">
      <section className="hero btob-hero">
        <span className="badge">施設向け 掲載案内</span>
        <h1>
          医療対応が必要な方と、
          <br />
          必要な支援を提供できる施設を
          <br />
          丁寧につなぐ相談窓口です。
        </h1>
        <p>
          比較やランキングではなく、ご家族の状況に合うかどうかを重視しています。
        </p>
        <div className="btob-points">
          <div className="btob-point">無断掲載なし</div>
          <div className="btob-point">ランキング非表示</div>
          <div className="btob-point">成果報酬型（固定費なし）</div>
        </div>
        <div className="cta-row">
          <Link className="btn btn-consult btob-cta" href="/consultation">
            掲載について相談する
          </Link>
        </div>
      </section>

      <section className="section btob-section">
        <h2>なぜ“比較サイト”ではないのか</h2>
        <div className="comparison-diagram">
          <div className="comparison-card">
            <h3>一般的な介護ポータル</h3>
            <ul>
              <li>ランキング表示</li>
              <li>広告優先の露出</li>
              <li>一括送客</li>
              <li>ミスマッチが起きやすい</li>
            </ul>
          </div>
          <div className="comparison-divider" aria-hidden="true">
            ⇄
          </div>
          <div className="comparison-card highlight">
            <h3>当センター</h3>
            <ul>
              <li>個別相談</li>
              <li>医療条件を確認</li>
              <li>合う施設のみ紹介</li>
              <li>見学前に状況整理</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section btob-section">
        <h2>施設側のメリット</h2>
        <div className="cards">
          <div className="card">
            <h3>無理な送客をしません</h3>
            <p>医療条件・受け入れ可否を事前に確認した上でご紹介します。</p>
          </div>
          <div className="card">
            <h3>現場負担を減らします</h3>
            <p>条件が合わない問い合わせはお繋ぎしません。</p>
          </div>
          <div className="card">
            <h3>成果報酬のみ</h3>
            <p>掲載費・固定費はかかりません。</p>
          </div>
        </div>
      </section>

      <section className="section btob-section">
        <h2>どんな相談者が来るのか</h2>
        <div className="btob-callout">
          <ul>
            <li>医療対応が必要な方</li>
            <li>ご家族が慎重に検討しているケース</li>
            <li>すぐの入居ではない相談も含みます</li>
          </ul>
          <p>見学・面談に進む前に、状況整理を行っています。</p>
        </div>
      </section>

      <section className="section btob-section">
        <h2>掲載までの流れ</h2>
        <div className="stepper btob-steps">
          <div className="step">
            <span className="step-index">1</span>
            <div>
              <h3>掲載相談（無料）</h3>
              <p>お問い合わせ内容を共有いただきます。</p>
            </div>
          </div>
          <div className="step">
            <span className="step-index">2</span>
            <div>
              <h3>受け入れ条件の確認</h3>
              <p>医療対応・入居条件を整理します。</p>
            </div>
          </div>
          <div className="step">
            <span className="step-index">3</span>
            <div>
              <h3>掲載開始</h3>
              <p>条件が合う方のみご紹介します。</p>
            </div>
          </div>
          <div className="step">
            <span className="step-index">4</span>
            <div>
              <h3>紹介の停止も可能</h3>
              <p>状況に応じていつでも調整できます。</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section btob-section">
        <h2>よくあるご質問</h2>
        <div className="btob-faq">
          <details>
            <summary>無断で掲載されることはありませんか？</summary>
            <p>ありません。必ず施設側の許可を得たうえで掲載しています。</p>
          </details>
          <details>
            <summary>成果報酬はどのタイミングですか？</summary>
            <p>入居決定後の成果報酬のみです。固定費は発生しません。</p>
          </details>
          <details>
            <summary>医療対応の範囲はどこまで伝わりますか？</summary>
            <p>掲載前に医療条件を確認し、必要な範囲を整理してお伝えします。</p>
          </details>
          <details>
            <summary>小規模施設でも掲載できますか？</summary>
            <p>はい。規模に関わらず医療対応の条件が合う施設をご紹介します。</p>
          </details>
        </div>
      </section>

      <section className="section btob-section">
        <h2>掲載についてのご相談</h2>
        <p>営業ではなく、まずは仕組みをご説明します。</p>
        <div className="cta-row">
          <Link className="btn btn-consult btob-cta" href="/consultation">
            掲載について相談する
          </Link>
          <span className="cta-note">無理な営業・即決のお願いは行いません。</span>
        </div>
      </section>
    </div>
  );
}
