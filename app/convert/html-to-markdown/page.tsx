import type { Metadata } from "next"
import { UseCasePage } from "@/components/UseCasePage"

export const metadata: Metadata = {
  title: "HTML to Markdown — clean output",
  description: "Strip HTML tags and convert to readable Markdown. Links, headings, lists, and bold text are preserved.",
  alternates: { canonical: "/convert/html-to-markdown" },
}

export default function Page() {
  return (
    <UseCasePage
      fileType="HTML"
      heroTitle="HTML to Markdown — clean output"
      heroSub="Strip HTML tags and convert to readable Markdown. Links, headings, lists, and bold text are preserved."
      whyItems={[
        "Removes all HTML noise — only meaningful content survives.",
        "Links preserved as [text](url) for easy reference.",
        "Great for cleaning up web scraping output for LLM prompts.",
      ]}
      exampleInput={`<article>
  <h1>Getting Started with Docker</h1>
  <p>Docker makes it easy to <strong>containerize</strong> your applications.</p>
  <h2>Installation</h2>
  <ul>
    <li>Download Docker Desktop</li>
    <li>Run the installer</li>
    <li>Verify with <code>docker --version</code></li>
  </ul>
  <p>Learn more at <a href="https://docker.com">Docker's website</a>.</p>
</article>`}
      exampleOutput={`# Getting Started with Docker

Docker makes it easy to **containerize** your applications.

## Installation

- Download Docker Desktop
- Run the installer
- Verify with \`docker --version\`

Learn more at [Docker's website](https://docker.com).`}
      faq={[
        { q: "Does it handle inline styles?", a: "Inline styles are stripped; semantic tags are converted." },
        { q: "What about script and style tags?", a: "Fully removed from output." },
        { q: "Can I paste raw HTML?", a: "Yes — upload an .html file or a saved webpage." },
      ]}
    />
  )
}
