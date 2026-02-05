"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Facility, FacilityFilter } from "@/types/facility";
import { filterFacilities } from "@/lib/facilitySearch";

const defaultFilter: FacilityFilter = {
  city: "all",
  type: "all",
  costRange: "all",
  medicalTags: [],
  sort: "recommended"
};

type SearchClientProps = {
  facilities: Facility[];
};

export default function SearchClient({ facilities }: SearchClientProps) {
  const [filter, setFilter] = useState<FacilityFilter>(defaultFilter);

  const cities = useMemo(
    () => Array.from(new Set(facilities.map((facility) => facility.city))),
    [facilities]
  );
  const types = useMemo(
    () => Array.from(new Set(facilities.map((facility) => facility.type))),
    [facilities]
  );
  const medicalTags = useMemo(
    () => Array.from(new Set(facilities.flatMap((facility) => facility.medicalSupport))),
    [facilities]
  );

  const results = useMemo(
    () => filterFacilities([...facilities], filter),
    [facilities, filter]
  );

  const toggleMedicalTag = (tag: string) => {
    setFilter((prev) => ({
      ...prev,
      medicalTags: prev.medicalTags.includes(tag)
        ? prev.medicalTags.filter((item) => item !== tag)
        : [...prev.medicalTags, tag]
    }));
  };

  return (
    <>
      <section className="section">
        <h2>検索条件</h2>
        <div className="cards">
          <div className="card">
            <label htmlFor="city">市区町村</label>
            <select
              id="city"
              value={filter.city}
              onChange={(event) =>
                setFilter((prev) => ({ ...prev, city: event.target.value }))
              }
            >
              <option value="all">すべて</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div className="card">
            <label htmlFor="type">入居形態</label>
            <select
              id="type"
              value={filter.type}
              onChange={(event) =>
                setFilter((prev) => ({ ...prev, type: event.target.value }))
              }
            >
              <option value="all">すべて</option>
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className="card">
            <label htmlFor="cost">費用帯（月額）</label>
            <select
              id="cost"
              value={filter.costRange}
              onChange={(event) =>
                setFilter((prev) => ({
                  ...prev,
                  costRange: event.target.value as FacilityFilter["costRange"]
                }))
              }
            >
              <option value="all">指定なし</option>
              <option value="under200">20万円未満</option>
              <option value="200to250">20〜25万円</option>
              <option value="250to300">25〜30万円</option>
              <option value="over300">30万円以上</option>
            </select>
          </div>
          <div className="card">
            <label htmlFor="sort">並び替え</label>
            <select
              id="sort"
              value={filter.sort}
              onChange={(event) =>
                setFilter((prev) => ({
                  ...prev,
                  sort: event.target.value as FacilityFilter["sort"]
                }))
              }
            >
              <option value="recommended">おすすめ順</option>
              <option value="cost_low">費用が安い順</option>
              <option value="newest">新着順</option>
            </select>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>医療対応条件</h2>
        <div className="cards">
          {medicalTags.map((tag) => (
            <label key={tag} className="card">
              <input
                type="checkbox"
                checked={filter.medicalTags.includes(tag)}
                onChange={() => toggleMedicalTag(tag)}
              />
              <span style={{ marginLeft: 8 }}>{tag}</span>
            </label>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>検索結果（{results.length}件）</h2>
        <div className="cards">
          {results.map((facility) => (
            <div className="card" key={facility.slug}>
              <h3>{facility.name}</h3>
              <p>エリア: {facility.city}</p>
              <p>入居形態: {facility.type}</p>
              <p>
                費用目安: 月額 {Math.round(facility.minCost / 10000)}〜
                {Math.round(facility.maxCost / 10000)}万円
              </p>
              <p>対応医療: {facility.medicalSupport.join(" / ")}</p>
              <p>空室状況: {facility.availability}</p>
              <p>{facility.summary}</p>
              <div className="cta-row">
                <Link className="btn" href={`/facilities/${facility.slug}`}>
                  詳細を見る
                </Link>
                <Link className="btn btn-consult" href="/consultation">
                  この施設について相談
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
