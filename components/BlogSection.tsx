"use client"

import { useTranslation } from "@/lib/i18n"

export function BlogSection() {
  const { t } = useTranslation()

  return (
    <section className="py-12 md:py-16 border-t border-hairline">
      <div className="section-container">
        <p className="font-mono text-xs text-marker tracking-wider uppercase mb-2">{t("blog.eyebrow")}</p>
        <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink mb-10">{t("blog.h2")}</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((n) => (
            <article key={n}>
              <p className="font-mono text-xs text-ink/40 mb-2">{t(`blog.post${n}.date`)}</p>
              <h3 className="font-display text-lg text-ink mb-2 leading-snug">{t(`blog.post${n}.title`)}</h3>
              <p className="text-sm text-ink/60 leading-relaxed mb-3">{t(`blog.post${n}.excerpt`)}</p>
              <a href="#" className="font-mono text-xs text-cobalt hover:text-ink transition-colors">{t("blog.read")}</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
