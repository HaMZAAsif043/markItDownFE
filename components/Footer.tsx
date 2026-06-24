"use client"

import { Github } from "lucide-react"
import { useTranslation } from "@/lib/i18n"
import Image from "next/image"
const useCaseLinks: { name: string; href: string }[] = [
  { name: "PDF to Markdown", href: "/convert/pdf-to-markdown" },
  { name: "PPT to Markdown", href: "/convert/ppt-to-markdown" },
  { name: "DOC to Markdown", href: "/convert/doc-to-markdown" },
  { name: "Excel to Markdown", href: "/convert/excel-to-markdown" },
  { name: "HTML to Markdown", href: "/convert/html-to-markdown" },
  { name: "CSV to Markdown", href: "/convert/csv-to-markdown" },
]

const legalLinks: { name: string; href: string }[] = [
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms" },
  { name: "Cookie Policy", href: "/cookies" },
]

const langList = ["English", "简体中文", "繁體中文", "日本語", "Français", "Español", "Deutsch", "한국어"]

export function FooterSection() {
  const { t } = useTranslation()

  return (
    <footer className="border-t border-hairline py-10 md:py-14">
      <div className="section-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
             <a href="/" className="flex items-center gap-2">
               <Image
                 src="/logo2.png"
                 width={142}
                 height={80}
                 alt="MarkItDown logo"
                 className="object-contain"
                 style={{ height: '80px', width: 'auto' }}
               />
             </a>
            </div>
            <p className="text-xs text-ink/40 leading-relaxed">{t("footer.desc")}</p>
            {/* <p className="text-xs text-ink/30 mt-3">hello@markitdown.pro</p> */}
          </div>

          <div>
            <h4 className="font-mono text-[11px] text-ink/50 uppercase tracking-wider mb-3">{t("footer.legal")}</h4>
            <ul className="space-y-1.5">
              {legalLinks.map((l) => (
                <li key={l.name}><a href={l.href} className="text-xs text-ink/50 hover:text-ink transition-colors">{l.name}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[11px] text-ink/50 uppercase tracking-wider mb-3">{t("footer.usecases")}</h4>
            <ul className="space-y-1.5">
              {useCaseLinks.map((u) => (
                <li key={u.name}><a href={u.href} className="text-xs text-ink/50 hover:text-ink transition-colors">{u.name}</a></li>
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

        <div className="mt-10 pt-6 border-t border-hairline flex flex-col items-center gap-3">
          <a href="https://github.com/HaMZAAsif043/markItDownFE" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-ink/40 hover:text-ink transition-colors">
            <Github className="size-4" /> View on GitHub
          </a>
          <p className="font-mono text-[11px] text-ink/30">
            &copy; {new Date().getFullYear()} {t("brand.name")}. {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  )
}
