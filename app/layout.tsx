import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "医療対応 介護入居相談センター（神奈川）",
  description:
    "医療が必要になった時に頼れる公的機関に近い相談窓口。神奈川県全域で介護入居の意思決定を支援。",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "医療対応 介護入居相談センター（神奈川）",
    description:
      "比較ではなく相談。医療対応が必要な方の介護入居について、神奈川県全域で中立的にサポート。",
    type: "website",
    siteName: "医療対応 介護入居相談センター（神奈川）"
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "GovernmentService",
  name: "医療対応 介護入居相談センター（神奈川）",
  provider: {
    "@type": "Organization",
    name: "医療対応 介護入居相談センター（神奈川）"
  },
  areaServed: "神奈川県",
  serviceType: "医療対応介護入居相談"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <header>
          <div className="header-inner">
            <Link href="/" className="brand">
              医療対応 介護入居相談センター（神奈川）
            </Link>
            <nav className="nav-links desktop-nav">
              <Link href="/kanagawa">エリア別相談</Link>
              <Link href="/search">施設検索</Link>
              <Link href="/consultation">無料相談</Link>
              <Link href="/about">運営情報</Link>
              <Link href="/admin">管理</Link>
            </nav>
            <details className="mobile-nav">
              <summary>メニュー</summary>
              <div className="mobile-nav-panel">
                <Link href="/kanagawa">エリア別相談</Link>
                <Link href="/search">施設検索</Link>
                <Link href="/consultation">無料相談</Link>
                <Link href="/about">運営情報</Link>
                <Link href="/admin">管理</Link>
              </div>
            </details>
          </div>
        </header>
        <main>
          <div className="container">{children}</div>
        </main>
        <footer className="footer">
          <div className="container">
            <p>医療対応 介護入居相談センター（神奈川）</p>
            <p>神奈川県全域対応 / 比較・ランキングではなく相談支援に特化</p>
          </div>
        </footer>
        <div className="mobile-consult-bar">
          <Link href="/consultation" className="btn btn-consult">
            無料で相談する（24時間受付）
          </Link>
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
