"use client"

import { useTranslation } from "@/lib/i18n"

const posts = [
  { date: "May 29, 2026", title: "Keeping structure when you convert a PDF to Markdown", excerpt: "A walkthrough of what tends to survive a PDF conversion and what tends to break — and how to check for both." },
  { date: "May 28, 2026", title: "Building a team knowledge base out of files you already have", excerpt: "How to turn scattered Word docs, PDFs, and internal wiki pages into one searchable set of Markdown files." },
  { date: "May 27, 2026", title: "Why plain text still wins for feeding AI assistants", excerpt: "A look at why models tend to follow instructions and summarize more reliably from Markdown than from raw HTML." },
]

export function BlogSection() {
  const { t } = useTranslation()

  return (
    <section className="py-12 md:py-16 border-t border-hairline">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <p className="font-mono text-xs text-marker tracking-wider uppercase mb-2">{t("blog.eyebrow")}</p>
        <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink mb-10">{t("blog.h2")}</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((p, i) => (
            <article key={i}>
              <p className="font-mono text-xs text-ink/40 mb-2">{p.date}</p>
              <h3 className="font-display text-lg text-ink mb-2 leading-snug">{p.title}</h3>
              <p className="text-sm text-ink/60 leading-relaxed mb-3">{p.excerpt}</p>
              <a href="#" className="font-mono text-xs text-cobalt hover:text-ink transition-colors">{t("blog.read")}</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
