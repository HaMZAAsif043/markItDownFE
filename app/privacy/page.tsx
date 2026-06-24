import type { Metadata } from "next"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "MarkItDown privacy policy — no account, no personal data collected. Files are processed and immediately discarded.",
  alternates: { canonical: "/privacy" },
}

const sections = [
  {
    title: "1. What we collect",
    body: (
      <ul className="space-y-2">
        <li>No account system — we never ask for or store personal data.</li>
        <li>Anonymous usage analytics via Vercel Analytics (page views, device type, region). Nothing personally identifiable.</li>
        <li>Files you upload are processed server-side and immediately discarded. We never store, log, or inspect your files.</li>
      </ul>
    ),
  },
  {
    title: "2. Cookies",
    body: "We use no tracking cookies. Vercel (our hosting provider) may set performance-essential cookies — see their privacy policy for details.",
  },
  {
    title: "3. Third-party services",
    body: "Vercel Analytics — anonymous, GDPR-compliant page view data. No ads, no data brokers, no third-party trackers embedded on this site.",
  },
  {
    title: "4. Your rights",
    body: "There is nothing to delete — we store nothing about you. If you have questions, email privacy@mar-kit-down.dev.",
  },
  {
    title: "5. Changes",
    body: "If this policy changes, we will update this page and revise the &ldquo;Last updated&rdquo; date.",
  },
]

export default function PrivacyPage() {
  return (
    <main className="min-h-dvh bg-[#f0faf5]">
      <div className="max-w-3xl mx-auto px-6 py-24">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#12203e] transition-colors mb-8">
          <ChevronLeft className="size-4" /> Back to homepage
        </Link>
        <p className="font-[family-name:var(--font-mono)] text-xs text-gray-400 uppercase tracking-wider mb-2">Last updated: June 2026</p>
        <h1 className="font-[family-name:var(--font-fraunces)] text-4xl md:text-5xl tracking-tight text-[#12203e] mb-10">Privacy Policy</h1>
        <div className="space-y-8">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="font-[family-name:var(--font-fraunces)] text-xl text-[#12203e] mb-2">{s.title}</h2>
              <div className="font-[family-name:var(--font-inter)] text-gray-600 leading-relaxed text-sm md:text-base">{s.body}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
