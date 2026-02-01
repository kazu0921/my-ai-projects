import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const payload = (await request.json()) as { password?: string };
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return NextResponse.json(
      { message: "ADMIN_PASSWORD が未設定です。" },
      { status: 500 }
    );
  }

  if (!payload.password || payload.password !== adminPassword) {
    return NextResponse.json({ message: "パスワードが違います。" }, { status: 401 });
  }

  return NextResponse.json({ ok: true });
}
