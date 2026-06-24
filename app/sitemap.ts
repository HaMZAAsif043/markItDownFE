import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.mar-kit-down.dev"

  return [
    { url: base, lastModified: new Date(), changeFrequency: "monthly", priority: 1.0 },
    { url: `${base}/privacy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/terms`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/cookies`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/convert/pdf-to-markdown`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/convert/ppt-to-markdown`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/convert/doc-to-markdown`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/convert/excel-to-markdown`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/convert/html-to-markdown`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/convert/csv-to-markdown`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ]
}
