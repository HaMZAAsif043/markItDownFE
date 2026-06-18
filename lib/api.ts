import type { ConversionResult } from "./types"

const STORAGE_KEY = "md-backend-url"
const DEFAULT_URL = "http://localhost:8000"

export function getApiUrl(): string {
  if (typeof window === "undefined") return DEFAULT_URL
  return localStorage.getItem(STORAGE_KEY) || process.env.NEXT_PUBLIC_API_URL || DEFAULT_URL
}

export function setApiUrl(url: string) {
  localStorage.setItem(STORAGE_KEY, url)
}

export async function convertFile(file: File): Promise<ConversionResult> {
  const form = new FormData()
  form.append("file", file)
  const res = await fetch(`${getApiUrl()}/convert`, { method: "POST", body: form })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }))
    throw new Error(err.detail || "Conversion failed")
  }
  return res.json()
}

export async function convertUrl(url: string): Promise<ConversionResult> {
  const form = new FormData()
  form.append("url", url)
  const res = await fetch(`${getApiUrl()}/convert`, { method: "POST", body: form })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }))
    throw new Error(err.detail || "Conversion failed")
  }
  return res.json()
}
