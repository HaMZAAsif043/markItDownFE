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
    <main className="min-h-dvh bg-[#f0faf5]">
      {/* Nav */}
      <header className="sticky top-0 z-50 bg-[#f0faf5]/90 backdrop-blur-sm border-b border-gray-200/50">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="font-[family-name:var(--font-fraunces)] text-lg text-[#12203e] font-semibold">
            MarkItDown
          </Link>
          <Link href="/" className="text-sm text-gray-500 hover:text-[#12203e] transition-colors">
            Back to converter
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#12203e] transition-colors mb-6">
            <ChevronLeft className="size-4" /> Back to homepage
          </Link>
          <p className="font-[family-name:var(--font-mono)] text-xs text-[#4da68e] uppercase tracking-wider mb-3">{fileType}</p>
          <h1 className="font-[family-name:var(--font-fraunces)] text-4xl md:text-5xl lg:text-6xl tracking-tight text-[#12203e] max-w-2xl">{heroTitle}</h1>
          <p className="mt-4 text-base md:text-lg text-gray-600 max-w-xl leading-relaxed">{heroSub}</p>
          <a
            href="/"
            className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-[#12203e] text-white text-sm font-medium rounded-lg hover:opacity-90 transition-all shadow-sm"
          >
            Try it free <ArrowRight className="size-4" />
          </a>
        </div>
      </section>

      {/* How it works */}
      <section className="py-12 md:py-16 border-t border-gray-200/50">
        <div className="max-w-6xl mx-auto px-6">
          <p className="font-[family-name:var(--font-mono)] text-xs text-[#4da68e] uppercase tracking-wider mb-2">How it works</p>
          <h2 className="font-[family-name:var(--font-fraunces)] text-3xl md:text-4xl tracking-tight text-[#12203e] mb-10">
            From {fileType} to Markdown in seconds
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={step.title}>
                <span className="font-[family-name:var(--font-mono)] text-3xl text-gray-200 font-semibold">0{i + 1}</span>
                <div className="mt-2 mb-3 text-[#4da68e]">{step.icon}</div>
                <h3 className="font-[family-name:var(--font-fraunces)] text-lg text-[#12203e] mb-1.5">{step.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Example */}
      <section className="py-12 md:py-16 border-t border-gray-200/50">
        <div className="max-w-6xl mx-auto px-6">
          <p className="font-[family-name:var(--font-mono)] text-xs text-[#4da68e] uppercase tracking-wider mb-2">Example</p>
          <h2 className="font-[family-name:var(--font-fraunces)] text-3xl md:text-4xl tracking-tight text-[#12203e] mb-8">
            See the conversion in action
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-gray-200/50 rounded-lg overflow-hidden bg-white shadow-sm">
            <div className="p-5 bg-[#f0faf5]/80 border-b md:border-b-0 md:border-r border-gray-200/50">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-200/50">
                <div className="size-2.5 rounded-full bg-[#4da68e]" />
                <span className="font-[family-name:var(--font-mono)] text-[10px] text-gray-400 uppercase tracking-wider">Input ({fileType})</span>
              </div>
              <pre className="font-[family-name:var(--font-mono)] text-xs text-gray-500 whitespace-pre-wrap leading-relaxed">{exampleInput}</pre>
            </div>
            <div className="p-5 relative">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-200/50">
                <div className="flex items-center gap-2">
                  <div className="size-2.5 rounded-full bg-[#6d5fbf]" />
                  <span className="font-[family-name:var(--font-mono)] text-[10px] text-gray-400 uppercase tracking-wider">Markdown</span>
                </div>
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-[#12203e] transition-colors"
                >
                  {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
              <pre className="font-[family-name:var(--font-mono)] text-xs whitespace-pre-wrap leading-relaxed text-gray-700">{exampleOutput}</pre>
            </div>
          </div>
        </div>
      </section>

      {/* Why use it */}
      <section className="py-12 md:py-16 border-t border-gray-200/50">
        <div className="max-w-6xl mx-auto px-6">
          <p className="font-[family-name:var(--font-mono)] text-xs text-[#4da68e] uppercase tracking-wider mb-2">Why use it</p>
          <h2 className="font-[family-name:var(--font-fraunces)] text-3xl md:text-4xl tracking-tight text-[#12203e] mb-8">
            Why convert {fileType} to Markdown?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whyItems.map((item) => (
              <div key={item} className="bg-white border border-gray-200/50 rounded-lg p-6 shadow-sm">
                <div className="size-10 rounded-lg bg-[#dceee8] flex items-center justify-center mb-4">
                  {typeIcons[fileType] || <FileText className="size-5 text-[#12203e]" />}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-16 border-t border-gray-200/50">
        <div className="max-w-3xl mx-auto px-6">
          <p className="font-[family-name:var(--font-mono)] text-xs text-[#4da68e] uppercase tracking-wider mb-2">FAQ</p>
          <h2 className="font-[family-name:var(--font-fraunces)] text-3xl md:text-4xl tracking-tight text-[#12203e] mb-8">
            {fileType} to Markdown — common questions
          </h2>
          <div className="space-y-3">
            {faq.map((item, i) => (
              <div key={i} className="bg-white border border-gray-200/50 rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex items-center justify-between w-full px-5 py-4 text-left text-sm font-medium text-[#12203e] hover:bg-gray-50 transition-colors"
                >
                  {item.q}
                  <span className={`text-gray-400 transition-transform ${openFaq === i ? "rotate-180" : ""}`}>▼</span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">{item.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 md:py-20 border-t border-gray-200/50">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-[family-name:var(--font-fraunces)] text-3xl md:text-4xl tracking-tight text-[#12203e] mb-4">
            Ready to convert your {fileType} file?
          </h2>
          <p className="text-gray-600 mb-8">No signup, no limits. Free forever.</p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#12203e] text-white text-sm font-medium rounded-lg hover:opacity-90 transition-all shadow-sm"
          >
            Try it free <ArrowRight className="size-4" />
          </a>
        </div>
      </section>
    </main>
  )
}
