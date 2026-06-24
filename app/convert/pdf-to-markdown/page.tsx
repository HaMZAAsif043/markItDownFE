import type { Metadata } from "next"
import { UseCasePage } from "@/components/UseCasePage"

export const metadata: Metadata = {
  title: "PDF to Markdown — free & instant",
  description: "Extract clean, structured Markdown from any PDF. Perfect for feeding documents into ChatGPT, Claude, or any LLM.",
  alternates: { canonical: "/convert/pdf-to-markdown" },
}

export default function Page() {
  return (
    <UseCasePage
      fileType="PDF"
      heroTitle="PDF to Markdown — free & instant"
      heroSub="Extract clean, structured Markdown from any PDF. Perfect for feeding documents into ChatGPT, Claude, or any LLM."
      whyItems={[
        "Preserves headings & tables from your PDF automatically.",
        "Text-only PDFs supported — no special setup needed.",
        "No OCR needed for digital PDFs; conversion is fast and accurate.",
      ]}
      exampleInput={`Project Report Q1 2026
========================

Introduction

This report covers the key metrics and milestones achieved during the first quarter of 2026.

Revenue Breakdown

  Region    | Q1 Revenue | Growth
  ----------|------------|-------
  North Am  | $1.2M      | +12%
  Europe    | $0.8M      | +8%
  APAC      | $0.5M      | +15%

Next Steps

- Expand into Latin America
- Hire 3 new SDRs
- Launch v2.0 in April`}
      exampleOutput={`# Project Report Q1 2026

## Introduction

This report covers the key metrics and milestones achieved during the first quarter of 2026.

## Revenue Breakdown

| Region    | Q1 Revenue | Growth |
|-----------|------------|--------|
| North Am  | $1.2M      | +12%   |
| Europe    | $0.8M      | +8%    |
| APAC      | $0.5M      | +15%   |

## Next Steps

- Expand into Latin America
- Hire 3 new SDRs
- Launch v2.0 in April`}
      faq={[
        { q: "Does it work on scanned PDFs?", a: "Only text-based PDFs. Scanned/image PDFs require OCR which we don't support yet." },
        { q: "Will tables be preserved?", a: "Yes, tables are converted to Markdown pipe format." },
        { q: "Is there a file size limit?", a: "Up to 20MB per file." },
      ]}
    />
  )
}
