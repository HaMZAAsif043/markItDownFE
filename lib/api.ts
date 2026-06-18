import type { ConversionResult } from "./types"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export async function convertFile(file: File): Promise<ConversionResult> {
  const form = new FormData()
  form.append("file", file)
  const res = await fetch(`${API_URL}/convert`, { method: "POST", body: form })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }))
    throw new Error(err.detail || "Conversion failed")
  }
  return res.json()
}

export async function convertUrl(url: string): Promise<ConversionResult> {
  const form = new FormData()
  form.append("url", url)
  const res = await fetch(`${API_URL}/convert`, { method: "POST", body: form })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }))
    throw new Error(err.detail || "Conversion failed")
  }
  return res.json()
}
