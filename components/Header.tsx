"use client"

import { useState } from "react"
import { ChevronDown, Menu, X } from "lucide-react"
import { useTranslation } from "@/lib/i18n"

const langs = [
  { code: "en" as const, label: "English" },
  { code: "zh-CN" as const, label: "简体中文" },
  { code: "zh-TW" as const, label: "繁體中文" },
  { code: "ja" as const, label: "日本語" },
  { code: "fr" as const, label: "Français" },
  { code: "es" as const, label: "Español" },
  { code: "de" as const, label: "Deutsch" },
  { code: "ko" as const, label: "한국어" },
]

export function Header() {
  const { lang, setLang, t } = useTranslation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur-sm border-b border-hairline">
      <div className="section-container flex items-center justify-between h-14">
        <a href="/" className="flex items-center gap-2">
          <div className="size-7 rounded bg-ink flex items-center justify-center">
            <span className="text-paper text-xs font-mono font-semibold">M</span>
          </div>
          <span className="font-display text-lg tracking-tight text-ink">{t("brand.name")}</span>
        </a>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#tool" className="text-ink/70 hover:text-ink transition-colors">{t("nav.convert")}</a>
          <a href="#how-it-works" className="text-ink/70 hover:text-ink transition-colors">{t("nav.how")}</a>
          <a href="#faq" className="text-ink/70 hover:text-ink transition-colors">{t("nav.faq")}</a>

          <div className="relative">
            <button onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1 text-ink/70 hover:text-ink transition-colors text-sm">
              {{ "en": "EN", "zh-CN": "简体", "zh-TW": "繁體", "ja": "日", "fr": "FR", "es": "ES", "de": "DE", "ko": "KO" }[lang]} <ChevronDown className="size-3" />
            </button>
            {langOpen && (
              <div className="absolute right-0 mt-1 w-36 bg-white border border-hairline rounded-lg shadow-sm py-1 z-50">
                {langs.map((l) => (
                  <button key={l.code} onClick={() => { setLang(l.code); setLangOpen(false) }}
                    className="w-full text-left px-3 py-1.5 text-sm text-ink/70 hover:text-ink hover:bg-paper transition-colors">
                    {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden size-8 flex items-center justify-center text-ink/70" aria-label="Menu">
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-hairline bg-paper px-4 py-3 space-y-3 animate-fade-up">
          <a href="#tool" className="block text-ink/70 hover:text-ink" onClick={() => setMobileOpen(false)}>{t("nav.convert")}</a>
          <a href="#how-it-works" className="block text-ink/70 hover:text-ink" onClick={() => setMobileOpen(false)}>{t("nav.how")}</a>
          <a href="#faq" className="block text-ink/70 hover:text-ink" onClick={() => setMobileOpen(false)}>{t("nav.faq")}</a>
        </div>
      )}
    </header>
  )
}
