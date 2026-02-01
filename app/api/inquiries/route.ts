import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const inquiriesPath = path.join(process.cwd(), "data", "inquiries.json");

type InquiryPayload = {
  name: string;
  email: string;
  phone: string;
  message: string;
  website?: string;
  startedAt?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[0-9\-+()\s]{9,}$/;

async function readInquiries(): Promise<InquiryPayload[]> {
  try {
    const content = await fs.readFile(inquiriesPath, "utf8");
    return JSON.parse(content) as InquiryPayload[];
  } catch {
    return [];
  }
}

export async function POST(request: Request) {
  const payload = (await request.json()) as InquiryPayload;

  if (payload.website) {
    return NextResponse.json({ message: "送信に失敗しました" }, { status: 400 });
  }

  if (!payload.name || !payload.email || !payload.phone || !payload.message) {
    return NextResponse.json({ message: "必須項目を確認してください" }, { status: 400 });
  }

  if (!emailPattern.test(payload.email)) {
    return NextResponse.json({ message: "メール形式が不正です" }, { status: 400 });
  }

  if (!phonePattern.test(payload.phone)) {
    return NextResponse.json({ message: "電話番号形式が不正です" }, { status: 400 });
  }

  if (payload.startedAt) {
    const elapsed = Date.now() - new Date(payload.startedAt).getTime();
    if (elapsed < 3000) {
      return NextResponse.json({ message: "送信に失敗しました" }, { status: 400 });
    }
  }

  const entries = await readInquiries();
  const entry = {
    ...payload,
    id: `inq_${Date.now()}`,
    receivedAt: new Date().toISOString()
  };

  entries.push(entry);
  await fs.writeFile(inquiriesPath, JSON.stringify(entries, null, 2));

  return NextResponse.json({ status: "ok" });
}
