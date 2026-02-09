"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[0-9\-+()\s]{9,}$/;

type FormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
  website: string;
  startedAt: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const defaultState: FormState = {
  name: "",
  email: "",
  phone: "",
  message: "",
  website: "",
  startedAt: ""
};

export default function ConsultationForm() {
  const router = useRouter();
  const [formState, setFormState] = useState<FormState>(defaultState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    setFormState((prev) => ({ ...prev, startedAt: new Date().toISOString() }));
  }, []);

  const validate = () => {
    const nextErrors: FormErrors = {};

    if (!formState.name.trim()) {
      nextErrors.name = "お名前を入力してください";
    }
    if (!formState.email.trim() || !emailPattern.test(formState.email)) {
      nextErrors.email = "有効なメールアドレスを入力してください";
    }
    if (!formState.phone.trim() || !phonePattern.test(formState.phone)) {
      nextErrors.phone = "有効な電話番号を入力してください";
    }
    if (!formState.message.trim()) {
      nextErrors.message = "相談内容を入力してください";
    }
    if (formState.website) {
      nextErrors.website = "送信に失敗しました";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (key: keyof FormState, value: string) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setServerError(null);

    if (!validate()) {
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formState)
      });

      if (!response.ok) {
        const payload = await response.json();
        throw new Error(payload?.message ?? "送信に失敗しました");
      }

      router.push("/consultation/thanks");
    } catch (error) {
      setServerError(
        error instanceof Error ? error.message : "送信に失敗しました"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">お名前</label>
        <input
          id="name"
          name="name"
          value={formState.name}
          onChange={(event) => handleChange("name", event.target.value)}
          required
          placeholder="山田 太郎"
        />
        {errors.name && <p className="error">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="email">メールアドレス</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formState.email}
          onChange={(event) => handleChange("email", event.target.value)}
          required
          placeholder="example@email.com"
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="phone">電話番号</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={formState.phone}
          onChange={(event) => handleChange("phone", event.target.value)}
          required
          placeholder="090-0000-0000"
        />
        {errors.phone && <p className="error">{errors.phone}</p>}
      </div>
      <div>
        <label htmlFor="message">相談内容</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formState.message}
          onChange={(event) => handleChange("message", event.target.value)}
          required
          placeholder="希望エリア、医療対応条件、入居希望時期など"
        />
        {errors.message && <p className="error">{errors.message}</p>}
      </div>
      <input
        type="text"
        name="website"
        value={formState.website}
        onChange={(event) => handleChange("website", event.target.value)}
        className="visually-hidden"
        autoComplete="off"
        tabIndex={-1}
      />
      <input type="hidden" name="startedAt" value={formState.startedAt} />
      {serverError && <p className="error">{serverError}</p>}
      <button className="btn btn-consult" type="submit" disabled={submitting}>
        {submitting ? "送信中..." : "無料相談を送信する"}
      </button>
    </form>
  );
}
