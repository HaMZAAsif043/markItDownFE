import { z } from "zod"
import { historyItemSchema, type HistoryItem } from "./schemas"

const HISTORY_KEY = "md-history"
const MAX_HISTORY_ITEMS = 10
const HISTORY_CHANGED = "md-history-changed"
const EMPTY_HISTORY: HistoryItem[] = []
let cachedRaw: string | null | undefined
let cachedHistory = EMPTY_HISTORY

function parseHistory(raw: string | null): HistoryItem[] {
  if (!raw) return EMPTY_HISTORY
  const data: unknown = JSON.parse(raw)
  const entries = z.array(z.unknown()).safeParse(data)
  if (!entries.success) return EMPTY_HISTORY

  const history: HistoryItem[] = []
  for (const entry of entries.data) {
    const result = historyItemSchema.safeParse(entry)
    if (result.success) history.push(result.data)
    if (history.length === MAX_HISTORY_ITEMS) break
  }
  return history
}

export function loadHistory(storage?: Pick<Storage, "getItem">): HistoryItem[] {
  try {
    const raw = (storage ?? localStorage).getItem(HISTORY_KEY)
    return parseHistory(raw)
  } catch {
    // Disabled storage, malformed JSON, or unavailable browser APIs must not
    // prevent a new conversion. Leave existing storage untouched on read.
    return []
  }
}

export function saveHistory(history: HistoryItem[], storage?: Pick<Storage, "setItem">): void {
  try {
    (storage ?? localStorage).setItem(HISTORY_KEY, JSON.stringify(history.slice(0, MAX_HISTORY_ITEMS)))
    if (!storage && typeof window !== "undefined") window.dispatchEvent(new Event(HISTORY_CHANGED))
  } catch {
    // History is optional: quota errors must not discard a successful result.
  }
}

// useSyncExternalStore needs a stable snapshot until the underlying value changes.
export function getHistorySnapshot(): HistoryItem[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY)
    if (raw !== cachedRaw) {
      cachedHistory = parseHistory(raw)
      cachedRaw = raw
    }
    return cachedHistory
  } catch {
    return EMPTY_HISTORY
  }
}

export function getServerHistorySnapshot(): HistoryItem[] {
  return EMPTY_HISTORY
}

export function subscribeHistory(onChange: () => void): () => void {
  const onStorage = (event: StorageEvent) => {
    if (event.key === HISTORY_KEY || event.key === null) onChange()
  }
  window.addEventListener("storage", onStorage)
  window.addEventListener(HISTORY_CHANGED, onChange)
  return () => {
    window.removeEventListener("storage", onStorage)
    window.removeEventListener(HISTORY_CHANGED, onChange)
  }
}
