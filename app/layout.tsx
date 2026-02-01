import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "神奈川 医療対応 老人ホーム相談プラットフォーム",
  description:
    "神奈川全域で医療依存度が高い方の老人ホーム入居相談を最短でサポート。無料相談で空室・受け入れ可否を確認。",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "神奈川 医療対応 老人ホーム相談プラットフォーム",
    description:
      "胃ろう・経管栄養・インスリン注射・看取り対応など医療依存度が高い方向けの入居相談に特化し、神奈川全域の提携施設を最短でご案内。",
    type: "website",
    siteName: "神奈川 医療対応老人ホーム相談"
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "神奈川医療対応老人ホーム相談",
  url: "https://example.com",
  description:
    "神奈川県内の医療依存度が高い方向け老人ホーム入居相談を提供する相談窓口",
  areaServed: "神奈川県",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    availableLanguage: ["日本語"]
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <header>
          <div className="header-inner">
            <Link href="/" className="brand">
              神奈川 医療対応老人ホーム相談
            </Link>
            <nav className="nav-links">
              <Link href="/search">施設検索</Link>
              <Link href="/consultation">無料相談</Link>
              <Link href="/about">運営情報</Link>
              <Link href="/admin">管理</Link>
            </nav>
          </div>
        </header>
        <main>
          <div className="container">{children}</div>
        </main>
        <footer className="footer">
          <div className="container">
            <p>神奈川全域の医療依存度が高い方向け老人ホーム相談窓口</p>
            <p>広告アフィリエイトなし・提携施設のみ掲載</p>
          </div>
        </footer>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
