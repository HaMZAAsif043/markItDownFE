import type { Metadata } from "next"
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google"
import "./globals.css"

const fraunces = Fraunces({
  subsets: ["latin"], variable: "--font-fraunces", display: "swap",
})

const inter = Inter({
  subsets: ["latin"], variable: "--font-inter", display: "swap",
})

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600"], subsets: ["latin"], variable: "--font-mono", display: "swap",
})

export const metadata: Metadata = {
  title: "MarkItDown — Convert any file to Markdown your AI can read",
  description:
    "Turn DOCX, PDF, PPTX, XLSX, HTML, and more into clean Markdown. Free, open source, no account needed.",
  keywords: [
    "markitdown", "markdown converter", "pdf to markdown", "docx to markdown",
    "pptx to markdown", "xlsx to markdown", "html to markdown", "ai context",
  ],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${ibmPlexMono.variable}`}>
      <body className="min-h-dvh antialiased">{children}</body>
    </html>
  )
}
