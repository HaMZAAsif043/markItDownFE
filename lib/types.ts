export interface ConversionResult {
  markdown: string
  filename: string
  source?: string
  size?: number
}

export interface ConversionStats {
  words: number
  chars: number
  lines: number
}

export interface HistoryEntry {
  id: string
  markdown: string
  filename: string
  timestamp: number
  stats: ConversionStats
}
