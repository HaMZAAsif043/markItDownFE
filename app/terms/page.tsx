import type { Metadata } from "next"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "MarkItDown terms of service — free tool, no warranties. Use at your own risk.",
  alternates: { canonical: "/terms" },
}

const sections = [
  {
    title: "1. Use of Service",
    body: "MarkItDown is provided as a free, open-source file conversion tool. You may use it for any lawful purpose. You are responsible for the files you upload and any content you generate through the service.",
  },
  {
    title: "2. No Warranties",
    body: "This service is provided &ldquo;as is&rdquo; without any warranty, express or implied. We do not guarantee that conversions will be error-free or that the service will be available at all times.",
  },
  {
    title: "3. Limitation of Liability",
    body: "In no event shall the creators or maintainers of MarkItDown be liable for any damages arising from the use or inability to use this service.",
  },
  {
    title: "4. Open Source",
    body: "MarkItDown is open source. You may view, fork, and contribute to the codebase on GitHub. Self-hosting is welcome and encouraged.",
  },
  {
    title: "5. Contact",
    body: 'For questions about these terms, open an issue on GitHub or email legal@mar-kit-down.dev.',
  },
]

export default function TermsPage() {
  return (
    <main className="min-h-dvh bg-paper">
      <div className="max-w-3xl mx-auto px-6 py-24">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-ink/50 hover:text-ink transition-colors mb-8">
          <ChevronLeft className="size-4" /> Back to homepage
        </Link>
        <p className="font-mono text-xs text-ink/30 uppercase tracking-wider mb-2">Last updated: June 2026</p>
        <h1 className="font-display text-4xl md:text-5xl tracking-tight text-ink mb-10">Terms of Service</h1>
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
