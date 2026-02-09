import type { Metadata } from "next";
import AdminClient from "./AdminClient";

export const metadata: Metadata = {
  title: "管理ページ | 神奈川 医療対応 老人ホーム相談",
  description: "施設データを管理・更新するための管理ページ。"
};

export default function AdminPage() {
  return (
    <div>
      <section className="hero">
        <span className="badge">管理ページ</span>
        <h1>施設データ管理</h1>
        <p>施設情報の追加・編集・削除ができます。保存先は data/facilities.json です。</p>
      </section>
      <AdminClient />
    </div>
  );
}
