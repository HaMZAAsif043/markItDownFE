"use client"

import { useState } from "react"
import { Plus, Minus } from "lucide-react"
import { useTranslation } from "@/lib/i18n"

export function FAQSection() {
  const { t } = useTranslation()
  const [open, setOpen] = useState<number | null>(null)
  const count = 10

  return (
    <section id="faq" className="scroll-mt-20 py-12 md:py-16 border-t border-hairline">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <p className="font-mono text-xs text-marker tracking-wider uppercase mb-2">{t("faq.eyebrow")}</p>
        <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink mb-10">{t("faq.h2")}</h2>

        <div className="space-y-1">
          {Array.from({ length: count }, (_, i) => i + 1).map((n) => (
            <div key={n} className="border border-hairline rounded-lg overflow-hidden bg-card">
              <button onClick={() => setOpen(open === n ? null : n)}
                className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-medium text-ink hover:bg-paper/50 transition-colors">
                <span>{t(`faq.q${n}`)}</span>
                {open === n ? <Minus className="size-4 text-ink/30 shrink-0" /> : <Plus className="size-4 text-ink/30 shrink-0" />}
              </button>
              {open === n && (
                <div className="px-5 pb-4 text-sm text-ink/60 leading-relaxed border-t border-hairline pt-3 bg-paper/30">
                  {t(`faq.a${n}`)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
