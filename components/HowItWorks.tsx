"use client"

import { useTranslation } from "@/lib/i18n"

export function HowItWorks() {
  const { t } = useTranslation()

  return (
    <section id="how-it-works" className="scroll-mt-20 py-12 md:py-16 border-t border-hairline">
      <div className="section-container">
        <p className="font-mono text-xs text-marker tracking-wider uppercase mb-2">{t("how.eyebrow")}</p>
        <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink mb-10">{t("how.h2")}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((n) => (
            <div key={n}>
              <span className="font-mono text-3xl text-hairline font-semibold">0{n}</span>
              <h3 className="font-display text-lg text-ink mt-2 mb-1.5">{t(`how.${n}.title`)}</h3>
              <p className="text-sm text-ink/60 leading-relaxed">{t(`how.${n}.desc`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
