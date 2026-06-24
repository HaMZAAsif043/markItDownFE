import type { Metadata } from "next"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "MarkItDown cookie policy — minimal cookies, Vercel Analytics only. No tracking, no ads.",
  alternates: { canonical: "/cookies" },
}

const sections = [
  {
    title: "1. Minimal cookies",
    body: "We intentionally use no tracking, advertising, or marketing cookies. The only cookies that may be set are technical ones required for the page to function (e.g., session handling by Vercel).",
  },
  {
    title: "2. Vercel Analytics",
    body: "We use Vercel Analytics, which collects anonymized page-view data (device type, region, referrer) without cookies. No personal data is stored or shared.",
  },
  {
    title: "3. How to opt out",
    body: "You can block analytics by installing browser extensions like uBlock Origin, Ghostery, or Privacy Badger. This will not affect the converter functionality.",
  },
  {
    title: "4. Questions",
    body: "If you have questions about our cookie usage, email privacy@mar-kit-down.dev.",
  },
]

export default function CookiesPage() {
  return (
    <main className="min-h-dvh bg-paper">
      <div className="max-w-3xl mx-auto px-6 py-24">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-ink/50 hover:text-ink transition-colors mb-8">
          <ChevronLeft className="size-4" /> Back to homepage
        </Link>
        <p className="font-mono text-xs text-ink/30 uppercase tracking-wider mb-2">Last updated: June 2026</p>
        <h1 className="font-display text-4xl md:text-5xl tracking-tight text-ink mb-10">Cookie Policy</h1>
        <div className="space-y-8">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="font-display text-xl text-ink mb-2">{s.title}</h2>
              <div className="text-ink/60 leading-relaxed text-sm md:text-base">{s.body}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
