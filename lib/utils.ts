import { type ConversionStats, type HistoryEntry } from "./types"

export function computeStats(text: string): ConversionStats {
  const trimmed = text.trim()
  return {
    words: trimmed ? trimmed.split(/\s+/).length : 0,
    chars: trimmed.length,
    lines: trimmed ? trimmed.split("\n").length : 0,
  }
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
}

const STORAGE_KEY = "markitdown-pro-history"

export function loadHistory(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveHistory(entries: HistoryEntry[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries.slice(0, 20)))
  } catch {
    /* storage full */
  }
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B"
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
  return (bytes / (1024 * 1024)).toFixed(1) + " MB"
}

export const FILE_EXTENSIONS = [
  ".pdf", ".docx", ".pptx", ".xlsx", ".csv",
  ".html", ".htm", ".xml", ".json", ".md",
  ".txt", ".ipynb", ".epub", ".msg",
] as const

export function getFileIcon(filename: string): string {
  const ext = filename.toLowerCase().split(".").pop()
  const icons: Record<string, string> = {
    pdf: "📄", docx: "📝", pptx: "📊", xlsx: "📈",
    csv: "📋", html: "🌐", xml: "🔧", json: "📦",
    md: "📝", txt: "📃", ipynb: "📓", epub: "📖",
    msg: "✉️",
  }
  return icons[ext || ""] || "📁"
}

export function cn(...classes: (string | false | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ")
}
