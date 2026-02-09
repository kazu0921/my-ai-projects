# my-ai-projects

神奈川県向け「医療対応 介護入居相談センター（神奈川）」v1.0（MVP完成版）を実装しています。

## フォルダ構成（主要）
```
.
├── app
│   ├── about
│   │   └── page.tsx                 # 運営情報（免責・プライバシー）
│   ├── admin
│   │   ├── AdminClient.tsx          # 管理ページUI
│   │   └── page.tsx                 # 管理ページ
│   ├── api
│   │   ├── admin
│   │   │   ├── facilities
│   │   │   │   └── route.ts         # 施設CRUD API
│   │   │   └── login
│   │   │       └── route.ts         # 管理ログインAPI
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
│   ├── kanagawa
│   │   ├── [area]
│   │   │   └── page.tsx             # エリア別ページ
│   │   └── page.tsx                 # エリア一覧
│   ├── search
│   │   ├── SearchClient.tsx         # 検索 UI/ロジック（クライアント）
│   │   └── page.tsx                 # 施設検索ページ
│   ├── globals.css                  # 共通スタイル
│   ├── layout.tsx                   # 共通レイアウト/SEO
│   ├── page.tsx                     # トップページ
│   ├── robots.ts                    # robots.txt
│   └── sitemap.ts                   # sitemap.xml
├── data
│   ├── areas.json                   # エリアページ定義
│   ├── facilities.json              # 施設データ（正式ソース）
│   └── inquiries.json               # 相談データ（ローカル保存）
├── lib
│   └── facilitySearch.ts            # 検索フィルタリングロジック
├── tests
│   └── facilitySearch.test.ts       # 検索ロジックのテスト
├── kanagawa-platform.md             # 初期設計書
├── v1-product-output.md            # v1.0 UI/UX・事業設計出力
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
- `/kanagawa` エリア一覧
- `/kanagawa/[area]` エリア別ページ（FAQ付き）
- `/facilities/[slug]` 施設詳細
- `/consultation` 相談フォーム
- `/consultation/thanks` 送信完了
- `/about` 運営情報（免責/プライバシー）
- `/admin` 施設管理ページ（簡易ログイン）
- `/sitemap.xml` SEO用サイトマップ
- `/robots.txt` クロール制御

## 相談データについて
- 送信先はローカル保存（`/data/inquiries.json` へ追記）です。
- 本番運用時は DB またはメール送信に置き換えてください。

## 管理ページの運用手順（非エンジニア向け）
1. 環境変数 `ADMIN_PASSWORD` を設定
   - ローカルの場合は `.env.local` を作成して `ADMIN_PASSWORD=任意のパスワード` を記載
   - Vercelの場合は「Settings → Environment Variables」で追加
2. `/admin` にアクセス
3. 管理パスワードを入力してログイン
4. 施設一覧から編集したい施設を選ぶ
5. フォームで内容を更新して「保存する」
6. 新規追加の場合は「新規作成フォーム」→ 必須項目を入力して保存
7. 削除する場合は施設を選択して「削除する」

> 保存先は `data/facilities.json` です。将来DBに切り替える場合は API ルート（`app/api/admin/facilities/route.ts`）を置き換えます。

## 手動テスト手順（ユニットテストを実行できない場合）
1. `/search` で市区町村や医療対応タグを切り替え、結果件数が変わることを確認
2. `/kanagawa/[area]` でFAQが表示されることを確認
3. `/facilities/[slug]` の地図リンクが Google Maps に遷移することを確認
4. `/consultation` で未入力の状態で送信するとエラーメッセージが出ることを確認
5. 正しい情報で送信すると `/consultation/thanks` に遷移し、`/data/inquiries.json` に追記されることを確認
6. `/admin` で施設を追加・編集・削除できることを確認

## テスト
```
npm test
```



## SP版（モバイル最適化）対応
- モバイルヘッダーメニュー（ハンバーガー相当）を追加
- 画面下部に固定の「無料で相談する（24時間受付）」CTAを追加
- SP時の文字サイズ・余白・カード間隔を再調整
- 相談導線を片手操作でも押しやすいサイズに最適化

## SEOチェックリスト
- title / description が各ページで設定されている
- OGPが設定されている
- `/sitemap.xml` にエリアページが含まれている
- `/robots.txt` が公開されている
- エリアページにFAQ構造化データが入っている
- トップ → エリア → 施設詳細 → 相談 の導線がつながっている

## 次にやる拡張案（箇条書き）
- 管理画面で施設データの更新・承認フローを実装
- 相談データをDB化して成約率/CV率のダッシュボードを追加
- 施設掲載の申請フロー（提携審査/契約の自動化）
- 空室情報の更新をCSV/フォームで自動化
- 医師・看護師の監修情報をCMSで管理

## Vercelでの公開手順（非エンジニア向け）
Next.js なので Vercel の無料枠で公開できます。

1. GitHubにリポジトリをアップロード（まだの場合）
2. ブラウザで https://vercel.com/ にアクセス
3. 「Sign Up」→「Continue with GitHub」でログイン
4. Vercelのダッシュボードで「Add New...」→「Project」
5. 対象のGitHubリポジトリを選択して「Import」
6. Framework Preset が「Next.js」になっていることを確認
7. Build Command / Output Directory は空欄のまま「Deploy」
8. 数分後に発行されるURLで公開完了

### 使う環境変数
- `ADMIN_PASSWORD`（管理ページのログイン用）

### 公開後のチェックリスト（SEO / フォーム）
- トップページが表示される（スマホでも確認）
- `/search` で絞り込みが動く
- `/kanagawa/[area]` のエリアページが表示される
- `/facilities/[slug]` で詳細ページが表示される
- 相談フォームが送信できる（本番はDB/メールへの切替を推奨）
- `/admin` にログインでき、施設更新が反映される
- `/sitemap.xml` が表示される
- `/robots.txt` が表示される
- SNSシェア用のOGPが反映されている（タイトル/説明文）
