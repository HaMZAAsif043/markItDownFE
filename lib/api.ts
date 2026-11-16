import {
  apiErrorSchema,
  conversionCountSchema,
  conversionResultSchema,
  type ConversionCount,
  type ConversionResult,
} from "./schemas"

const STORAGE_KEY = "md-backend-url"
const DEFAULT_URL = "http://localhost:8000"

export function getApiUrl(): string {
  if (typeof window === "undefined") return DEFAULT_URL
  try {
    return localStorage.getItem(STORAGE_KEY) || process.env.NEXT_PUBLIC_API_URL || DEFAULT_URL
  } catch {
    return process.env.NEXT_PUBLIC_API_URL || DEFAULT_URL
  }
}

export function setApiUrl(url: string) {
  localStorage.setItem(STORAGE_KEY, url)
}

function baseUrl() {
  return getApiUrl().replace(/\/+$/, "")
}

export async function convertFile(file: File): Promise<ConversionResult> {
  const form = new FormData()
  form.append("file", file)
  return requestConversion(form)
}

export async function fetchStats(): Promise<ConversionCount> {
  try {
    const res = await fetch(`${baseUrl()}/stats`, { signal: AbortSignal.timeout(5000) })
    if (res.ok) {
      const data: unknown = await res.json()
      const result = conversionCountSchema.safeParse(data)
      if (result.success) return result.data
    }
  } catch {}
  return { total_conversions: 0 }
}

export async function convertUrl(url: string): Promise<ConversionResult> {
  const form = new FormData()
  form.append("url", url)
  return requestConversion(form)
}

async function requestConversion(form: FormData): Promise<ConversionResult> {
  const res = await fetch(`${baseUrl()}/convert`, { method: "POST", body: form })
  const data: unknown = await res.json().catch(() => null)
  if (!res.ok) {
    const error = apiErrorSchema.safeParse(data)
    if (error.success) {
      const detail = error.data.detail
      throw new Error(typeof detail === "string" ? detail : detail.map((item) => item.msg).join("; "))
    }
    throw new Error(`Conversion failed (HTTP ${res.status}). Please try again.`)
  }

  const result = conversionResultSchema.safeParse(data)
  if (!result.success) {
    throw new Error("The conversion service returned an invalid response. Please try again.")
  }
  return result.data
}
