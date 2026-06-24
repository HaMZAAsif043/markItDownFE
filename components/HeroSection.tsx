"use client"

import { useEffect, useState } from "react"
import { ArrowRight, Sparkles } from "lucide-react"
import { useTranslation } from "@/lib/i18n"
import { fetchStats } from "@/lib/api"

const formats = ["DOCX", "XLSX", "PPTX", "PDF", "HTML", "CSV", "JSON", "XML", "TXT", "MD", "IPYNB"]

const sampleDoc = `Project Brief: Q4 Newsletter
Team: Marketing (lead: Sarah Chen)
Deadline: November 15
Sections:
1. Editor's Note
2. Product Updates
   - New dashboard launched
   - API v2 deprecated
3. Team Spotlight: Engineering
4. Metrics Dashboard
| Metric | Q3 | Q4 (target) |
|--------|-----|-------------|
| Users  | 12k | 18k         |
| Revenue| $45k| $62k        |
Image: newsletter_header.png`

const sampleMd = `# Project Brief: Q4 Newsletter
**Team:** Marketing (lead: Sarah Chen)
**Deadline:** November 15
## Sections
1. Editor's Note
2. Product Updates
   - New dashboard launched
   - API v2 deprecated
3. Team Spotlight: Engineering
4. Metrics Dashboard
| Metric | Q3 | Q4 (target) |
|--------|-----|-------------|
| Users  | 12k | 18k         |
| Revenue| $45k| $62k        |
![newsletter_header.png](newsletter_header.png)`

export function HeroSection() {
  const { t } = useTranslation()
  const [typingText, setTypingText] = useState("")
  const [typingDone, setTypingDone] = useState(false)
  const [stats, setStats] = useState<{ total_conversions: number } | null>(null)

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i < sampleMd.length) { setTypingText(sampleMd.slice(0, i + 1)); i++ }
      else { clearInterval(interval); setTypingDone(true) }
    }, 15)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    fetchStats().then(setStats).catch(() => {})
  }, [])

  return (
    <section className="pt-10 pb-12 md:pt-16 md:pb-16">
      <div className="section-container">
        <p className="font-mono text-xs text-marker tracking-wider uppercase mb-4">{t("hero.eyebrow")}</p>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight text-ink max-w-3xl">
          {t("hero.h1")}
        </h1>
        <p className="mt-4 text-base md:text-lg text-ink/60 max-w-2xl leading-relaxed">{t("hero.sub")}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {formats.map((f) => (
            <span key={f} className="font-mono text-[11px] px-2.5 py-1 rounded-full border border-hairline text-ink/50 hover:border-cobalt/40 hover:text-cobalt transition-colors">{f}</span>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-mono text-ink/40">
          <span className="flex items-center gap-1.5"><Sparkles className="size-3 text-marker" /> {t("hero.stat")}</span>
          {stats && (
            <span className="flex items-center gap-1.5">
              <span className="size-1 rounded-full bg-hairline" />
              {stats.total_conversions.toLocaleString()} files converted
            </span>
          )}
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-0 border border-hairline rounded-lg overflow-hidden bg-card shadow-sm">
          <div className="p-5 bg-paper-alt/80 border-b md:border-b-0 md:border-r border-hairline">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-hairline/50">
              <div className="size-2.5 rounded-full bg-marker" />
              <span className="font-mono text-[10px] text-ink/30 uppercase tracking-wider">Document</span>
            </div>
            <pre className="font-mono text-xs text-ink/60 whitespace-pre-wrap leading-relaxed">{sampleDoc}</pre>
          </div>
          <div className="p-5 relative">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-hairline/50">
              <div className="size-2.5 rounded-full bg-cobalt" />
              <span className="font-mono text-[10px] text-ink/30 uppercase tracking-wider">Markdown</span>
            </div>
            <pre className="font-mono text-xs whitespace-pre-wrap leading-relaxed">
              {typingText}{!typingDone && <span className="cursor-blink text-marker">|</span>}
            </pre>
          </div>
          <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="size-10 rounded-full bg-paper border border-hairline flex items-center justify-center shadow-sm">
              <ArrowRight className="size-5 text-ink/40" />
            </div>
          </div>
        </div>

        <p className="mt-4 text-xs text-ink/40 font-mono">{t("hero.pdfnote")}</p>
      </div>
    </section>
  )
}
