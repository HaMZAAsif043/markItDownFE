import type { Metadata } from "next"
import { UseCasePage } from "@/components/UseCasePage"

export const metadata: Metadata = {
  title: "PowerPoint to Markdown — slide by slide",
  description: "Convert PPTX slide decks into clean Markdown. Extract all text, headings, and bullet points.",
  alternates: { canonical: "/convert/ppt-to-markdown" },
}

export default function Page() {
  return (
    <UseCasePage
      fileType="PPT"
      heroTitle="PowerPoint to Markdown — slide by slide"
      heroSub="Convert PPTX slide decks into clean Markdown. Extract all text, headings, and bullet points."
      whyItems={[
        "Each slide becomes a section — perfect for presentations and slide decks.",
        "Bullet points preserved exactly as written in your slides.",
        "Speaker notes included in the output for context.",
      ]}
      exampleInput={`Slide 1: Q4 Strategy Review
- Revenue target: $2.5M
- Key initiative: Product launch
- Team: 12 people

Slide 2: Timeline
- October: Beta release
- November: Marketing push
- December: Full launch

Slide 3: Budget Allocation
Marketing: 40%
Engineering: 35%
Operations: 25%`}
      exampleOutput={`## Q4 Strategy Review

- Revenue target: $2.5M
- Key initiative: Product launch
- Team: 12 people

## Timeline

- October: Beta release
- November: Marketing push
- December: Full launch

## Budget Allocation

- Marketing: 40%
- Engineering: 35%
- Operations: 25%`}
      faq={[
        { q: "Are images extracted?", a: "Image references are noted but not embedded in the output." },
        { q: "Does it work with Google Slides?", a: "Export as PPTX from Google Slides first." },
        { q: "What about slide order?", a: "Slides are output in order as H2 sections." },
      ]}
    />
  )
}
