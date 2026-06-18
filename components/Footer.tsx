"use client"

import { useTranslation } from "@/lib/i18n"

const useCaseLinks = [
  "PDF to Markdown", "PPT to Markdown", "DOC to Markdown",
  "Excel to Markdown", "HTML to Markdown", "CSV to Markdown",
]

const langList = ["English", "简体中文", "繁體中文", "日本語", "Français", "Español", "Deutsch", "한국어"]

export function FooterSection() {
  const { t } = useTranslation()

  return (
    <footer className="border-t border-hairline py-10 md:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="size-6 rounded bg-ink flex items-center justify-center">
                <span className="text-paper text-[10px] font-mono font-semibold">M</span>
              </div>
              <span className="font-display text-base text-ink">{t("brand.name")}</span>
            </div>
            <p className="text-xs text-ink/40 leading-relaxed">{t("footer.desc")}</p>
            <p className="text-xs text-ink/30 mt-3">hello@markitdown.pro</p>
          </div>

          <div>
            <h4 className="font-mono text-[11px] text-ink/50 uppercase tracking-wider mb-3">{t("footer.legal")}</h4>
            <ul className="space-y-1.5">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((l) => (
                <li key={l}><a href="#" className="text-xs text-ink/50 hover:text-ink transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[11px] text-ink/50 uppercase tracking-wider mb-3">{t("footer.usecases")}</h4>
            <ul className="space-y-1.5">
              {useCaseLinks.map((u) => (
                <li key={u}><a href="#" className="text-xs text-ink/50 hover:text-ink transition-colors">{u}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[11px] text-ink/50 uppercase tracking-wider mb-3">{t("footer.languages")}</h4>
            <ul className="space-y-1.5">
              {langList.map((l) => (
                <li key={l}><a href="#" className="text-xs text-ink/50 hover:text-ink transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-hairline text-center">
          <p className="font-mono text-[11px] text-ink/30">
            &copy; {new Date().getFullYear()} {t("brand.name")}. {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  )
}
