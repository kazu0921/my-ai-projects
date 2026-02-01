# my-ai-projects

神奈川県向け「医療依存度が高い方向け老人ホーム相談・検索プラットフォーム」v1 を実装しています。

## フォルダ構成（主要）
```
.
├── app
│   ├── about
│   │   └── page.tsx                 # 運営情報（免責・プライバシー）
│   ├── api
│   │   └── inquiries
│   │       └── route.ts             # 相談フォーム送信 API
│   ├── consultation
│   │   ├── ConsultationForm.tsx     # 相談フォーム（バリデーション/スパム対策）
│   │   ├── page.tsx                 # 相談フォームページ
│   │   └── thanks
│   │       └── page.tsx             # 送信完了
│   ├── facilities
│   │   └── [slug]
│   │       └── page.tsx             # 施設詳細ページ
│   ├── search
│   │   ├── SearchClient.tsx         # 検索 UI/ロジック（クライアント）
│   │   └── page.tsx                 # 施設検索ページ
│   ├── globals.css                  # 共通スタイル
│   ├── layout.tsx                   # 共通レイアウト/SEO
│   ├── page.tsx                     # トップページ
│   ├── robots.ts                    # robots.txt
│   └── sitemap.ts                   # sitemap.xml
├── data
│   ├── facilities.json              # 施設データ（正式ソース）
│   └── inquiries.json               # 相談データ（ローカル保存）
├── lib
│   └── facilitySearch.ts            # 検索フィルタリングロジック
├── tests
│   └── facilitySearch.test.ts       # 検索ロジックのテスト
├── kanagawa-platform.md             # 設計書
├── next.config.js
├── package.json
└── tsconfig.json
```

## 施設データJSONのスキーマ（必須項目）
`/data/facilities.json` を正式なデータソースとし、以下の必須項目で管理します。

| 項目 | 型 | 説明 | 例 |
| --- | --- | --- | --- |
| slug | string | URL用のユニークID | `minatomirai-medical-home` |
| name | string | 施設名 | `みなとみらい医療対応ホーム` |
| city | string | 市区町村 | `横浜市西区` |
| address | string | 住所 | `神奈川県横浜市西区みなとみらい1-1-1` |
| type | string | 入居形態 | `介護付き有料老人ホーム` |
| minCost | number | 月額下限（円） | `200000` |
| maxCost | number | 月額上限（円） | `260000` |
| medicalSupport | string[] | 医療対応タグ | `["胃ろう", "看取り"]` |
| availability | string | 空室状況 | `空室あり（概況）` |
| summary | string | 施設概要 | `医療依存度の高い方の受け入れ実績が多い提携施設。` |
| mapUrl | string | Google Maps URL | `https://maps.google.com/?q=...` |
| recommendedRank | number | おすすめ順の並び順 | `1` |
| createdAt | string | 新着順の基準日 | `2024-12-01` |

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

## MVP/v1 ページ一覧
- `/` トップページ（サービス概要・強み・CTA）
- `/search` 施設検索（絞り込み・並び替え）
- `/facilities/[slug]` 施設詳細
- `/consultation` 相談フォーム
- `/consultation/thanks` 送信完了
- `/about` 運営情報（免責/プライバシー）
- `/sitemap.xml` SEO用サイトマップ
- `/robots.txt` クロール制御

## 相談データについて
- 送信先はローカル保存（`/data/inquiries.json` へ追記）です。
- 本番運用時は DB またはメール送信に置き換えてください。

## 手動テスト手順（ユニットテストを実行できない場合）
1. `/search` で市区町村や医療対応タグを切り替え、結果件数が変わることを確認
2. `/facilities/[slug]` の地図リンクが Google Maps に遷移することを確認
3. `/consultation` で未入力の状態で送信するとエラーメッセージが出ることを確認
4. 正しい情報で送信すると `/consultation/thanks` に遷移し、`/data/inquiries.json` に追記されることを確認

## テスト
```
npm test
```

## 次にやる拡張案（箇条書き）
- 管理画面で施設データの更新・承認フローを実装
- 相談データをDB化して成約率/CV率のダッシュボードを追加
- 施設掲載の申請フロー（提携審査/契約の自動化）
- 空室情報の更新をCSV/フォームで自動化
- 医師・看護師の監修情報をCMSで管理
