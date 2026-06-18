"use client"

import { Cpu, BookOpen, Edit, ArrowRightToLine, Search, WifiOff } from "lucide-react"
import { useTranslation } from "@/lib/i18n"

const icons = [Cpu, BookOpen, Edit, ArrowRightToLine, Search, WifiOff]

export function BenefitsGrid() {
  const { t } = useTranslation()

  return (
    <section className="py-12 md:py-16 border-t border-hairline">
      <div className="section-container">
        <p className="font-mono text-xs text-marker tracking-wider uppercase mb-2">{t("benefits.eyebrow")}</p>
        <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink mb-10">{t("benefits.h2")}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {icons.map((Icon, i) => (
            <div key={i} className="border border-hairline rounded-lg p-5 bg-white hover:shadow-sm transition-shadow">
              <Icon className="size-5 text-ink/40 mb-3" />
              <h3 className="font-display text-base text-ink mb-1.5">{t(`benefit.${i + 1}.title`)}</h3>
              <p className="text-sm text-ink/60 leading-relaxed">{t(`benefit.${i + 1}.desc`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
