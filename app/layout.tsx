import type { Metadata } from "next"
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap" })
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" })
const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600"], subsets: ["latin"], variable: "--font-mono", display: "swap",
})

const BASE_URL = "https://www.mar-kit-down.dev/" // replace with your domain

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "MarkItDown — Convert any file to Markdown in one click",
    template: "%s | MarkItDown",
  },
  description:
    "Free online tool to convert DOCX, PDF, PPTX, XLSX, HTML, CSV, JSON and more to clean Markdown. No signup, no limits. Perfect for feeding files into LLMs.",
  keywords: [
    "markitdown", "markdown converter", "file to markdown", "pdf to markdown",
    "docx to markdown", "pptx to markdown", "xlsx to markdown", "html to markdown",
    "csv to markdown", "json to markdown", "llm context", "ai token saver",
    "open source markdown tool", "free markdown converter",
  ],
  authors: [{ name: "MarkItDown", url: BASE_URL }],
  creator: "MarkItDown",
  applicationName: "MarkItDown",
  category: "Developer Tools",

  // Canonical URL
  alternates: {
    canonical: "/",
  },

  // Open Graph — controls how it looks when shared on LinkedIn, Slack, Discord etc.
  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: "MarkItDown",
    title: "MarkItDown — Convert any file to Markdown in one click",
    description:
      "Drop a DOCX, PDF, PPTX, XLSX, or HTML file — get clean Markdown back instantly. Free, open source, no account needed.",
    images: [
      {
        url: "/og-image.png", // create a 1200x630 image and put in /public
        width: 1200,
        height: 630,
        alt: "MarkItDown — File to Markdown converter",
      },
    ],
  },

  // Twitter/X card
  twitter: {
    card: "summary_large_image",
    title: "MarkItDown — Convert any file to Markdown in one click",
    description:
      "Drop a DOCX, PDF, PPTX, XLSX, or HTML file — get clean Markdown back instantly. Free & open source.",
    images: ["/og-image.png"],
    creator: "@yourhandle", // your Twitter handle
  },

  // Indexing
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${ibmPlexMono.variable}`}>
      <body className="min-h-dvh antialiased">{children}<Analytics /></body>
    </html>
  )
}