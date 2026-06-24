"use client"

import { useTranslation } from "@/lib/i18n"

export function WhyConvert() {
  const { t } = useTranslation()

  return (
    <section className="py-12 md:py-16 border-t border-hairline">
      <div className="section-container">
        <p className="font-mono text-xs text-marker tracking-wider uppercase mb-2">{t("why.eyebrow")}</p>
        <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink mb-10">{t("why.h2")}</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((n) => (
            <div key={n} className="border border-hairline rounded-lg p-6 bg-card">
              <h3 className="font-display text-lg text-ink mb-2">{t(`why.card${n}.title`)}</h3>
              <p className="text-sm text-ink/60 leading-relaxed">{t(`why.card${n}.desc`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
