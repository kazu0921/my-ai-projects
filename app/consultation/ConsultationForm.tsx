"use client";

import { useRouter } from "next/navigation";
import type { FormEvent } from "react";

export default function ConsultationForm() {
  const router = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push("/consultation/thanks");
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">お名前</label>
        <input id="name" name="name" required placeholder="山田 太郎" />
      </div>
      <div>
        <label htmlFor="email">メールアドレス</label>
        <input id="email" name="email" type="email" required placeholder="example@email.com" />
      </div>
      <div>
        <label htmlFor="phone">電話番号</label>
        <input id="phone" name="phone" type="tel" required placeholder="090-0000-0000" />
      </div>
      <div>
        <label htmlFor="message">相談内容</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="希望エリア、医療対応条件、入居希望時期など"
        />
      </div>
      <button className="cta" type="submit">
        無料相談を送信する
      </button>
    </form>
  );
}
