"use client";

import { FormEvent, useState } from "react";
import { FadeIn } from "@/components/ui/AnimatedText";
import { CONTACT_INFO } from "@/lib/data";

const SUPPORT_TYPES = [
  { value: "financial", label: "活動資金のご支援" },
  { value: "material", label: "物品・技術協力" },
  { value: "facility", label: "場所・設備のご提供" },
  { value: "mentor", label: "メンタリング・キャリア支援" },
  { value: "other", label: "まずは話を聞きたい" },
];

export function Contact() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    console.log("[Contact submission]", data);
    setTimeout(() => {
      setSubmitting(false);
      setSent(true);
      form.reset();
    }, 700);
  };

  return (
    <section
      id="contact"
      className="relative bg-racing-carbon px-5 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto grid max-w-[1600px] gap-14 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <div>
          <FadeIn>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-12 bg-racing-red" />
              <span className="font-display text-xs tracking-[0.4em] text-racing-red">
                GET IN TOUCH
              </span>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-display text-4xl font-bold leading-tight md:text-6xl">
              まずは、
              <br />
              お話しませんか。
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-racing-white/70 md:text-base">
              ご支援のかたちは決まっていなくて大丈夫です。
              活動へのご質問や、こんなことができそう、というご提案だけでも嬉しいです。
              学生メンバーより3営業日以内にご返信いたします。
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <dl className="mt-10 space-y-5 text-sm">
              <div>
                <dt className="font-display text-xs tracking-[0.3em] text-racing-gray">
                  EMAIL
                </dt>
                <dd className="mt-1">
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="underline-offset-4 transition-colors hover:text-racing-red hover:underline"
                  >
                    {CONTACT_INFO.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-display text-xs tracking-[0.3em] text-racing-gray">
                  ADDRESS
                </dt>
                <dd className="mt-1 leading-relaxed text-racing-white/80">
                  {CONTACT_INFO.address}
                </dd>
              </div>
              <div>
                <dt className="font-display text-xs tracking-[0.3em] text-racing-gray">
                  SOCIAL
                </dt>
                <dd className="mt-1 flex gap-4 text-racing-white/80">
                  <a href={CONTACT_INFO.x} target="_blank" rel="noopener noreferrer" className="hover:text-racing-red">
                    X
                  </a>
                  <a href={CONTACT_INFO.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-racing-red">
                    Instagram
                  </a>
                  <a href={CONTACT_INFO.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-racing-red">
                    YouTube
                  </a>
                </dd>
              </div>
            </dl>
          </FadeIn>
        </div>

        <FadeIn delay={0.2}>
          <form
            onSubmit={onSubmit}
            className="relative border border-white/10 bg-racing-black p-6 md:p-10"
          >
            <div className="absolute -top-px left-0 h-px w-24 bg-racing-red" />

            <div className="grid gap-6 md:grid-cols-2">
              <Field label="お名前" name="name" required />
              <Field label="会社名 / 団体名" name="company" required />
              <Field label="メールアドレス" name="email" type="email" required />
              <Field label="電話番号（任意）" name="phone" type="tel" />
            </div>

            <fieldset className="mt-6">
              <legend className="mb-3 font-display text-xs tracking-[0.3em] text-racing-gray">
                ご支援の内容（ご希望のもの）
              </legend>
              <div className="flex flex-wrap gap-3">
                {SUPPORT_TYPES.map((t) => (
                  <label
                    key={t.value}
                    className="group inline-flex cursor-pointer items-center gap-2 border border-white/15 px-4 py-2 text-sm transition-colors has-[input:checked]:border-racing-red has-[input:checked]:bg-racing-red/10 hover:border-racing-red/60"
                  >
                    <input
                      type="radio"
                      name="supportType"
                      value={t.value}
                      className="sr-only"
                      defaultChecked={t.value === "other"}
                    />
                    <span>{t.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="mt-6">
              <label className="block">
                <span className="mb-2 block font-display text-xs tracking-[0.3em] text-racing-gray">
                  メッセージ
                </span>
                <textarea
                  name="message"
                  required
                  rows={5}
                  className="peer w-full resize-none border-b border-white/20 bg-transparent px-1 py-2 text-sm text-racing-white placeholder:text-racing-white/30 focus:border-racing-red focus:outline-none transition-colors"
                  placeholder="ご質問・ご提案内容をお聞かせください"
                />
              </label>
            </div>

            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-racing-gray">
                送信をもってプライバシーポリシーに同意したものとみなします。
              </p>
              <button
                type="submit"
                disabled={submitting}
                className="group inline-flex items-center justify-center gap-3 bg-racing-red px-8 py-4 font-display text-sm font-semibold tracking-[0.25em] transition-colors hover:bg-racing-crimson disabled:opacity-60"
              >
                {submitting ? "送信中..." : "送信する"}
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </button>
            </div>

            {sent && (
              <div
                role="status"
                className="mt-6 border border-racing-red/50 bg-racing-red/10 p-4 text-sm"
              >
                お問い合わせを受け付けました。3営業日以内にご返信いたします。
              </div>
            )}
          </form>
        </FadeIn>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-display text-xs tracking-[0.3em] text-racing-gray">
        {label}
        {required && <span className="ml-1 text-racing-red">*</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full border-b border-white/20 bg-transparent px-1 py-2 text-sm text-racing-white placeholder:text-racing-white/30 focus:border-racing-red focus:outline-none transition-colors"
      />
    </label>
  );
}
