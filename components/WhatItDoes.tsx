"use client"

import { useTranslation } from "@/lib/i18n"

export function WhatItDoes() {
  const { t } = useTranslation()

  return (
    <section className="py-12 md:py-16 border-t border-hairline">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <p className="font-mono text-xs text-marker tracking-wider uppercase mb-2">{t("what.eyebrow")}</p>
        <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink mb-6">{t("what.h2")}</h2>
        <p className="text-base text-ink/60 max-w-3xl leading-relaxed mb-6">{t("what.p")}</p>
        <ul className="space-y-3">
          {[1, 2, 3, 4].map((n) => (
            <li key={n} className="flex items-start gap-3 text-sm text-ink/70">
              <span className="mt-1.5 size-1.5 rounded-full bg-ink shrink-0" />
              <span>{t(`what.bullet${n}`)}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
