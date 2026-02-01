import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import type { Facility } from "@/types/facility";

const facilitiesPath = path.join(process.cwd(), "data", "facilities.json");

const requiredFields: Array<keyof Facility> = [
  "slug",
  "name",
  "city",
  "address",
  "type",
  "minCost",
  "maxCost",
  "medicalSupport",
  "availability",
  "summary",
  "mapUrl",
  "recommendedRank",
  "createdAt"
];

function isAuthorized(request: Request) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  const provided = request.headers.get("x-admin-password");
  return Boolean(adminPassword && provided && provided === adminPassword);
}

async function readFacilities(): Promise<Facility[]> {
  const content = await fs.readFile(facilitiesPath, "utf8");
  return JSON.parse(content) as Facility[];
}

async function writeFacilities(facilities: Facility[]) {
  await fs.writeFile(facilitiesPath, JSON.stringify(facilities, null, 2));
}

function validateFacility(payload: Partial<Facility>): string | null {
  for (const field of requiredFields) {
    if (payload[field] === undefined || payload[field] === null || payload[field] === "") {
      return `必須項目が不足しています: ${field}`;
    }
  }

  if (!Array.isArray(payload.medicalSupport) || payload.medicalSupport.length === 0) {
    return "医療対応タグを1件以上入力してください";
  }

  return null;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ message: "認証に失敗しました" }, { status: 401 });
  }

  const facilities = await readFacilities();
  return NextResponse.json({ facilities });
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ message: "認証に失敗しました" }, { status: 401 });
  }

  const payload = (await request.json()) as Facility;
  const error = validateFacility(payload);
  if (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }

  const facilities = await readFacilities();
  if (facilities.some((facility) => facility.slug === payload.slug)) {
    return NextResponse.json({ message: "同じslugが既に存在します" }, { status: 400 });
  }

  facilities.push(payload);
  await writeFacilities(facilities);

  return NextResponse.json({ ok: true });
}

export async function PUT(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ message: "認証に失敗しました" }, { status: 401 });
  }

  const payload = (await request.json()) as Facility;
  const error = validateFacility(payload);
  if (error) {
    return NextResponse.json({ message: error }, { status: 400 });
  }

  const facilities = await readFacilities();
  const index = facilities.findIndex((facility) => facility.slug === payload.slug);
  if (index === -1) {
    return NextResponse.json({ message: "対象施設が見つかりません" }, { status: 404 });
  }

  facilities[index] = payload;
  await writeFacilities(facilities);

  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ message: "認証に失敗しました" }, { status: 401 });
  }

  const payload = (await request.json()) as { slug?: string };
  if (!payload.slug) {
    return NextResponse.json({ message: "slugを指定してください" }, { status: 400 });
  }

  const facilities = await readFacilities();
  const nextFacilities = facilities.filter((facility) => facility.slug !== payload.slug);

  if (nextFacilities.length === facilities.length) {
    return NextResponse.json({ message: "対象施設が見つかりません" }, { status: 404 });
  }

  await writeFacilities(nextFacilities);
  return NextResponse.json({ ok: true });
}
