"use client";

import { useEffect, useMemo, useState } from "react";
import type { Facility } from "@/types/facility";

const defaultFacility: Facility = {
  slug: "",
  name: "",
  city: "",
  address: "",
  type: "有料老人ホーム",
  minCost: 200000,
  maxCost: 240000,
  medicalSupport: [],
  availability: "空室確認中",
  summary: "",
  mapUrl: "",
  recommendedRank: 99,
  createdAt: new Date().toISOString().slice(0, 10)
};

export default function AdminClient() {
  const [password, setPassword] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [formState, setFormState] = useState<Facility>(defaultFacility);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const selectedFacility = useMemo(
    () => facilities.find((facility) => facility.slug === selectedSlug) ?? null,
    [facilities, selectedSlug]
  );

  useEffect(() => {
    if (selectedFacility) {
      setFormState(selectedFacility);
    }
  }, [selectedFacility]);

  const handleLogin = async () => {
    setError(null);
    setMessage(null);

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ password })
    });

    if (!response.ok) {
      setError("パスワードが違います。");
      return;
    }

    setAuthorized(true);
    await fetchFacilities(password);
  };

  const fetchFacilities = async (pwd: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/facilities", {
        headers: {
          "x-admin-password": pwd
        }
      });
      if (!response.ok) {
        throw new Error("施設データの取得に失敗しました。");
      }
      const payload = (await response.json()) as { facilities: Facility[] };
      setFacilities(payload.facilities);
      setSelectedSlug(payload.facilities[0]?.slug ?? null);
      if (!payload.facilities[0]) {
        setFormState(defaultFacility);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "取得に失敗しました。");
    } finally {
      setLoading(false);
    }
  };

  const updateForm = (key: keyof Facility, value: string | number | string[]) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setMessage(null);
    setError(null);

    if (!password) {
      setError("パスワードを入力してください。");
      return;
    }

    const isEdit = facilities.some((facility) => facility.slug === formState.slug);
    const response = await fetch("/api/admin/facilities", {
      method: isEdit ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-password": password
      },
      body: JSON.stringify(formState)
    });

    if (!response.ok) {
      const payload = await response.json();
      setError(payload?.message ?? "保存に失敗しました。");
      return;
    }

    setMessage("保存しました。");
    await fetchFacilities(password);
  };

  const handleDelete = async () => {
    if (!selectedSlug) {
      setError("削除する施設を選択してください。");
      return;
    }

    setMessage(null);
    setError(null);

    const response = await fetch("/api/admin/facilities", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-admin-password": password
      },
      body: JSON.stringify({ slug: selectedSlug })
    });

    if (!response.ok) {
      const payload = await response.json();
      setError(payload?.message ?? "削除に失敗しました。");
      return;
    }

    setMessage("削除しました。");
    await fetchFacilities(password);
  };

  const handleNew = () => {
    setSelectedSlug(null);
    setFormState(defaultFacility);
  };

  if (!authorized) {
    return (
      <section className="section">
        <h2>管理ログイン</h2>
        <div className="card">
          <label htmlFor="admin-password">管理パスワード</label>
          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="管理パスワード"
          />
          {error && <p className="error">{error}</p>}
          <button className="cta" type="button" onClick={handleLogin}>
            ログイン
          </button>
        </div>
      </section>
    );
  }

  return (
    <div>
      <section className="section">
        <h2>施設一覧</h2>
        <div className="cards">
          <div className="card">
            <label htmlFor="facility-select">編集する施設</label>
            <select
              id="facility-select"
              value={selectedSlug ?? ""}
              onChange={(event) => setSelectedSlug(event.target.value || null)}
            >
              <option value="">新規作成</option>
              {facilities.map((facility) => (
                <option key={facility.slug} value={facility.slug}>
                  {facility.name}
                </option>
              ))}
            </select>
            <button className="cta secondary" type="button" onClick={handleNew}>
              新規作成フォーム
            </button>
          </div>
          <div className="card">
            <p>登録件数: {facilities.length}件</p>
            {loading && <p>読み込み中...</p>}
          </div>
        </div>
      </section>

      <section className="section">
        <h2>{selectedSlug ? "施設編集" : "施設追加"}</h2>
        <div className="card">
          <div className="form">
            <label>slug（URL用）</label>
            <input
              value={formState.slug}
              onChange={(event) => updateForm("slug", event.target.value)}
              placeholder="minatomirai-medical-home"
            />
            <label>施設名</label>
            <input
              value={formState.name}
              onChange={(event) => updateForm("name", event.target.value)}
            />
            <label>市区町村</label>
            <input
              value={formState.city}
              onChange={(event) => updateForm("city", event.target.value)}
            />
            <label>住所</label>
            <input
              value={formState.address}
              onChange={(event) => updateForm("address", event.target.value)}
            />
            <label>入居形態</label>
            <select
              value={formState.type}
              onChange={(event) => updateForm("type", event.target.value)}
            >
              <option value="特養">特養</option>
              <option value="有料老人ホーム">有料老人ホーム</option>
              <option value="介護付き有料老人ホーム">介護付き有料老人ホーム</option>
              <option value="サ高住">サ高住</option>
            </select>
            <label>月額費用（下限）</label>
            <input
              type="number"
              value={formState.minCost}
              onChange={(event) => updateForm("minCost", Number(event.target.value))}
            />
            <label>月額費用（上限）</label>
            <input
              type="number"
              value={formState.maxCost}
              onChange={(event) => updateForm("maxCost", Number(event.target.value))}
            />
            <label>医療対応タグ（カンマ区切り）</label>
            <input
              value={formState.medicalSupport.join(", ")}
              onChange={(event) =>
                updateForm(
                  "medicalSupport",
                  event.target.value
                    .split(",")
                    .map((item) => item.trim())
                    .filter(Boolean)
                )
              }
            />
            <label>空室状況</label>
            <input
              value={formState.availability}
              onChange={(event) => updateForm("availability", event.target.value)}
            />
            <label>概要</label>
            <textarea
              rows={3}
              value={formState.summary}
              onChange={(event) => updateForm("summary", event.target.value)}
            />
            <label>Google Maps URL</label>
            <input
              value={formState.mapUrl}
              onChange={(event) => updateForm("mapUrl", event.target.value)}
            />
            <label>おすすめ順位（小さいほど上）</label>
            <input
              type="number"
              value={formState.recommendedRank}
              onChange={(event) =>
                updateForm("recommendedRank", Number(event.target.value))
              }
            />
            <label>登録日</label>
            <input
              type="date"
              value={formState.createdAt}
              onChange={(event) => updateForm("createdAt", event.target.value)}
            />
            {error && <p className="error">{error}</p>}
            {message && <p>{message}</p>}
            <div className="cta-row">
              <button className="cta" type="button" onClick={handleSave}>
                保存する
              </button>
              <button className="cta secondary" type="button" onClick={handleDelete}>
                削除する
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
