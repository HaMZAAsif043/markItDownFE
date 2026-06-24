import type { Metadata } from "next"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "MarkItDown terms of service — free to use for personal and commercial purposes. No warranties, provided as-is.",
  alternates: { canonical: "/terms" },
}

const sections = [
  {
    title: "1. Use of the service",
    body: "MarkItDown is free to use for personal and commercial purposes. You agree not to upload files containing illegal content, and not to attempt to reverse-engineer or overload the service.",
  },
  {
    title: "2. No warranties",
    body: "The service is provided &ldquo;as is&rdquo;. We make no guarantees about the accuracy or completeness of conversion output. Always verify important content.",
  },
  {
    title: "3. Limitation of liability",
    body: "We are not liable for any data loss, incorrect conversion output, or damages arising from use of this service.",
  },
  {
    title: "4. Open source",
    body: "This tool is built on Microsoft&rsquo;s markitdown library (MIT license). Our wrapper code is also open source and available on GitHub.",
  },
  {
    title: "5. Contact",
    body: "For questions about these terms, email hello@mar-kit-down.dev.",
  },
]

export default function TermsPage() {
  return (
    <main className="min-h-dvh bg-[#f0faf5]">
      <div className="max-w-3xl mx-auto px-6 py-24">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#12203e] transition-colors mb-8">
          <ChevronLeft className="size-4" /> Back to homepage
        </Link>
        <p className="font-[family-name:var(--font-mono)] text-xs text-gray-400 uppercase tracking-wider mb-2">Last updated: June 2026</p>
        <h1 className="font-[family-name:var(--font-fraunces)] text-4xl md:text-5xl tracking-tight text-[#12203e] mb-10">Terms of Service</h1>
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
