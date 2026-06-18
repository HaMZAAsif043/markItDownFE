"use client"

import { Cpu, BookOpen, Edit, ArrowRightToLine, Search, WifiOff } from "lucide-react"
import { useTranslation } from "@/lib/i18n"

const benefits = [
  { icon: Cpu, key: "Better context for AI" },
  { icon: BookOpen, key: "Reusable knowledge" },
  { icon: Edit, key: "Easier editing" },
  { icon: ArrowRightToLine, key: "Faster migration" },
  { icon: Search, key: "Searchable by default" },
  { icon: WifiOff, key: "Nothing to install" },
]

const descs: Record<string, string> = {
  "Better context for AI": "Markdown gives a model a clearer structure than a layout-heavy file, which helps with summarizing, searching, and following instructions.",
  "Reusable knowledge": "A converted file can become a README, a doc page, a support article, or a source file for an AI skill.",
  "Easier editing": "Plain text is simpler to read, diff, and revise than content copied out of a document editor.",
  "Faster migration": "Move existing DOCX, PDF, and spreadsheet content into a Markdown-based workflow without retyping.",
  "Searchable by default": "Markdown is lightweight, text-based, and easy to index in a docs site, wiki, or embedding pipeline.",
  "Nothing to install": "Convert in the browser. No command-line setup, no library to manage, no local environment to configure.",
}

export function BenefitsGrid() {
  const { t } = useTranslation()

  return (
    <section className="py-12 md:py-16 border-t border-hairline">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <p className="font-mono text-xs text-marker tracking-wider uppercase mb-2">{t("benefits.eyebrow")}</p>
        <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink mb-10">{t("benefits.h2")}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map((b) => (
            <div key={b.key} className="border border-hairline rounded-lg p-5 bg-white hover:shadow-sm transition-shadow">
              <b.icon className="size-5 text-ink/40 mb-3" />
              <h3 className="font-display text-base text-ink mb-1.5">{b.key}</h3>
              <p className="text-sm text-ink/60 leading-relaxed">{descs[b.key]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
