import type { Metadata } from "next"
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
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
  title: "MarkItDown - From file to Markdown in one click",
  description:
    "Drop a DOCX, PDF, PPTX, XLSX, HTML, or any file — get clean Markdown back. Free, open source, no account needed.",
  keywords: [
    "markitdown", "markdown converter", "pdf to markdown", "docx to markdown",
    "pptx to markdown", "xlsx to markdown", "html to markdown", "ai context",
  ],
  icons: {
    icon: "/favicon.ico",        // /public/favicon.ico
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png", // optional, for iOS
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${ibmPlexMono.variable}`}>
      <body className="min-h-dvh antialiased">{children}<Analytics /></body>
    </html>
  )
}
