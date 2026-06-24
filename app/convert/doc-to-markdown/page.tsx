import type { Metadata } from "next"
import { UseCasePage } from "@/components/UseCasePage"

export const metadata: Metadata = {
  title: "Word Document to Markdown — one click",
  description: "Turn DOCX files into clean Markdown with headings, lists, bold, italics, and tables intact.",
  alternates: { canonical: "/convert/doc-to-markdown" },
}

export default function Page() {
  return (
    <UseCasePage
      fileType="DOC"
      heroTitle="Word Document to Markdown — one click"
      heroSub="Turn DOCX files into clean Markdown with headings, lists, bold, italics, and tables intact."
      whyItems={[
        "Full formatting preserved — headings, bold, italics, and lists come through cleanly.",
        "Tables converted to Markdown pipe tables for easy reading.",
        "Works with both .doc and .docx formats.",
      ]}
      exampleInput={`Meeting Notes — Product Standup
Date: March 12, 2026

Agenda:
1. Sprint progress
2. Blockers
3. Action items

Sprint Progress
The team completed 8 of 12 story points this week. Key wins include the new search API and the dashboard redesign.

Blockers
- Database migration still pending DevOps review.
- Design assets for v2.1 delayed by 2 days.

Action Items
@Sarah: Finalize API docs by Friday.
@Mike: Review PR #234 by Thursday.`}
      exampleOutput={`# Meeting Notes — Product Standup

**Date:** March 12, 2026

## Agenda

1. Sprint progress
2. Blockers
3. Action items

## Sprint Progress

The team completed 8 of 12 story points this week. Key wins include the new search API and the dashboard redesign.

## Blockers

- Database migration still pending DevOps review.
- Design assets for v2.1 delayed by 2 days.

## Action Items

- **@Sarah:** Finalize API docs by Friday.
- **@Mike:** Review PR #234 by Thursday.`}
      faq={[
        { q: "Does it support .doc (old format)?", a: "Yes, both .doc and .docx are supported." },
        { q: "Are comments included?", a: "No, only document body content is converted." },
        { q: "What about images?", a: "Images are skipped; text content is fully preserved." },
      ]}
    />
  )
}
