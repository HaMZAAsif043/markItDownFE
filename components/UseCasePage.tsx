"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, ArrowRight, Upload, Zap, Copy, Check, FileText, Table, Code, FileSpreadsheet, FileJson, FileType } from "lucide-react"

interface FAQItem {
  q: string
  a: string
}

interface UseCasePageProps {
  fileType: string
  heroTitle: string
  heroSub: string
  whyItems: string[]
  exampleInput: string
  exampleOutput: string
  faq: FAQItem[]
}

const typeIcons: Record<string, React.ReactNode> = {
  PDF: <FileText className="size-6" />,
  PPT: <FileType className="size-6" />,
  DOC: <FileText className="size-6" />,
  Excel: <FileSpreadsheet className="size-6" />,
  HTML: <Code className="size-6" />,
  CSV: <Table className="size-6" />,
}

const steps = [
  { icon: <Upload className="size-6" />, title: "Upload your file", desc: "Drag and drop or select your file. We support all major formats." },
  { icon: <Zap className="size-6" />, title: "Instant conversion", desc: "Your file is processed server-side and converted to clean Markdown." },
  { icon: <Copy className="size-6" />, title: "Copy or download", desc: "Grab the output with one click or download as a .md file." },
]

export function UseCasePage({ fileType, heroTitle, heroSub, whyItems, exampleInput, exampleOutput, faq }: UseCasePageProps) {
  const [copied, setCopied] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(exampleOutput)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="min-h-dvh bg-paper">
      {/* Nav */}
      <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur-sm border-b border-hairline">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="font-display text-lg text-ink font-semibold">
            MarkItDown
          </Link>
          <Link href="/" className="text-sm text-ink/50 hover:text-ink transition-colors">
            Back to converter
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-ink/50 hover:text-ink transition-colors mb-6">
            <ChevronLeft className="size-4" /> Back to homepage
          </Link>
          <p className="font-mono text-xs text-marker uppercase tracking-wider mb-3">{fileType}</p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight text-ink max-w-2xl">{heroTitle}</h1>
          <p className="mt-4 text-base md:text-lg text-ink/60 max-w-xl leading-relaxed">{heroSub}</p>
          <a
            href="/"
            className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-ink text-paper text-sm font-medium rounded-lg hover:brightness-110 transition-all shadow-sm"
          >
            Try it free <ArrowRight className="size-4" />
          </a>
        </div>
      </section>

      {/* How it works */}
      <section className="py-12 md:py-16 border-t border-hairline">
        <div className="max-w-6xl mx-auto px-6">
          <p className="font-mono text-xs text-marker uppercase tracking-wider mb-2">How it works</p>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink mb-10">
            From {fileType} to Markdown in seconds
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={step.title}>
                <span className="font-mono text-3xl text-hairline font-semibold">0{i + 1}</span>
                <div className="mt-2 mb-3 text-marker">{step.icon}</div>
                <h3 className="font-display text-lg text-ink mb-1.5">{step.title}</h3>
                <p className="text-sm text-ink/60 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Example */}
      <section className="py-12 md:py-16 border-t border-hairline">
        <div className="max-w-6xl mx-auto px-6">
          <p className="font-mono text-xs text-marker uppercase tracking-wider mb-2">Example</p>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink mb-8">
            See the conversion in action
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-hairline rounded-lg overflow-hidden bg-card shadow-sm">
            <div className="p-5 bg-paper-alt/80 border-b md:border-b-0 md:border-r border-hairline">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-hairline">
                <div className="size-2.5 rounded-full bg-marker" />
                <span className="font-mono text-[10px] text-ink/30 uppercase tracking-wider">Input ({fileType})</span>
              </div>
              <pre className="font-mono text-xs text-ink/50 whitespace-pre-wrap leading-relaxed">{exampleInput}</pre>
            </div>
            <div className="p-5 relative">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-hairline">
                <div className="flex items-center gap-2">
                  <div className="size-2.5 rounded-full bg-cobalt" />
                  <span className="font-mono text-[10px] text-ink/30 uppercase tracking-wider">Markdown</span>
                </div>
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1 text-xs text-ink/50 hover:text-ink transition-colors"
                >
                  {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
              <pre className="font-mono text-xs whitespace-pre-wrap leading-relaxed text-ink/70">{exampleOutput}</pre>
            </div>
          </div>
        </div>
      </section>

      {/* Why use it */}
      <section className="py-12 md:py-16 border-t border-hairline">
        <div className="max-w-6xl mx-auto px-6">
          <p className="font-mono text-xs text-marker uppercase tracking-wider mb-2">Why use it</p>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink mb-8">
            Why convert {fileType} to Markdown?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whyItems.map((item) => (
              <div key={item} className="bg-card border border-hairline rounded-lg p-6 shadow-sm">
                <div className="size-10 rounded-lg bg-marker/10 flex items-center justify-center mb-4">
                  {typeIcons[fileType] || <FileText className="size-5 text-marker" />}
                </div>
                <p className="text-sm text-ink/60 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-16 border-t border-hairline">
        <div className="max-w-3xl mx-auto px-6">
          <p className="font-mono text-xs text-marker uppercase tracking-wider mb-2">FAQ</p>
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink mb-8">
            {fileType} to Markdown — common questions
          </h2>
          <div className="space-y-3">
            {faq.map((item, i) => (
              <div key={i} className="bg-card border border-hairline rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex items-center justify-between w-full px-5 py-4 text-left text-sm font-medium text-ink hover:bg-paper-alt transition-colors"
                >
                  {item.q}
                  <span className={`text-ink/30 transition-transform ${openFaq === i ? "rotate-180" : ""}`}>▼</span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-sm text-ink/60 leading-relaxed">{item.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 md:py-20 border-t border-hairline">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display text-3xl md:text-4xl tracking-tight text-ink mb-4">
            Ready to convert your {fileType} file?
          </h2>
          <p className="text-ink/60 mb-8">No signup, no limits. Free forever.</p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-ink text-paper text-sm font-medium rounded-lg hover:brightness-110 transition-all shadow-sm"
          >
            Try it free <ArrowRight className="size-4" />
          </a>
        </div>
      </section>
    </main>
  )
}
