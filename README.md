# my-ai-projects

神奈川県向け「医療依存度が高い方向け老人ホーム相談・検索プラットフォーム」MVP を実装しています。

## フォルダ構成（主要）
```
.
├── app
│   ├── about
│   │   └── page.tsx            # 運営情報（免責・プライバシー）
│   ├── consultation
│   │   ├── ConsultationForm.tsx # 相談フォーム（クライアント）
│   │   ├── page.tsx            # 相談フォームページ
│   │   └── thanks
│   │       └── page.tsx        # 送信完了
│   ├── search
│   │   └── page.tsx            # 施設検索（簡易）
│   ├── globals.css             # 共通スタイル
│   ├── layout.tsx              # 共通レイアウト/SEO
│   └── page.tsx                # トップページ
├── data
│   └── facilities.json         # 仮の施設データ
├── kanagawa-platform.md        # 設計書
├── next.config.js
├── package.json
└── tsconfig.json
```

## ローカル起動手順（初心者向け）
1. Node.js 18 以上をインストール
2. 依存関係をインストール
   ```bash
   npm install
   ```
3. 開発サーバー起動
   ```bash
   npm run dev
   ```
4. ブラウザで `http://localhost:3000` にアクセス

## MVPページ一覧
- `/` トップページ（サービス概要・強み・CTA）
- `/search` 施設検索（簡易）
- `/consultation` 相談フォーム
- `/consultation/thanks` 送信完了
- `/about` 運営情報（免責/プライバシー）

## 次にやる拡張案（箇条書き）
- 市区町村別LP（横浜区別・川崎区別）をデータ駆動で生成
- 施設詳細ページの追加（提携施設のみ）
- 相談データのDB化と簡易CRM
- 空室状況の更新フロー（管理画面/CSVインポート）
- 医師・看護師監修欄の追加
- 成約率/CV率のダッシュボード
