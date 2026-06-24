import type { Metadata } from "next"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "MarkItDown cookie policy — no advertising cookies, no tracking pixels. We use only anonymous Vercel Analytics.",
  alternates: { canonical: "/cookies" },
}

const sections = [
  {
    title: "1. We use minimal cookies",
    body: "No advertising cookies, no tracking pixels, no third-party marketing scripts. Your privacy is built into the design of this site.",
  },
  {
    title: "2. Vercel Analytics",
    body: "We use Vercel Analytics to collect anonymous page view data (page URL, referrer, browser type, device type, region). No personally identifiable information is collected or stored.",
  },
  {
    title: "3. How to opt out",
    body: "You can clear cookies via your browser settings at any time, or use the site in incognito/private browsing mode. Vercel Analytics respects Do Not Track headers where available.",
  },
  {
    title: "4. Questions",
    body: "If you have any questions about our use of cookies, email privacy@mar-kit-down.dev.",
  },
]

export default function CookiesPage() {
  return (
    <main className="min-h-dvh bg-[#f0faf5]">
      <div className="max-w-3xl mx-auto px-6 py-24">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#12203e] transition-colors mb-8">
          <ChevronLeft className="size-4" /> Back to homepage
        </Link>
        <p className="font-[family-name:var(--font-mono)] text-xs text-gray-400 uppercase tracking-wider mb-2">Last updated: June 2026</p>
        <h1 className="font-[family-name:var(--font-fraunces)] text-4xl md:text-5xl tracking-tight text-[#12203e] mb-10">Cookie Policy</h1>
        <div className="space-y-8">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="font-[family-name:var(--font-fraunces)] text-xl text-[#12203e] mb-2">{s.title}</h2>
              <p className="font-[family-name:var(--font-inter)] text-gray-600 leading-relaxed text-sm md:text-base">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
