"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Upload, Link, Copy, Download, ArrowRight, AlertCircle, Clock, Trash2, Hash, Settings } from "lucide-react"
import { toast } from "sonner"
import { convertFile, convertUrl, getApiUrl, setApiUrl } from "@/lib/api"
import { useTranslation } from "@/lib/i18n"
import type { ConversionResult } from "@/lib/types"

type InputMode = "file" | "url"
type ViewMode = "preview" | "raw"

interface HistoryItem {
  id: string; markdown: string; filename: string; words: number; time: number
}

const HISTORY_KEY = "md-history"
function loadHistory(): HistoryItem[] {
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]") } catch { return [] }
}
function saveHistory(h: HistoryItem[]) {
  try { localStorage.setItem(HISTORY_KEY, JSON.stringify(h.slice(0, 10))) } catch {}
}

export function ConverterTool() {
  const { t } = useTranslation()
  const [inputMode, setInputMode] = useState<InputMode>("file")
  const [files, setFiles] = useState<File[]>([])
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ConversionResult | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>("preview")
  const [error, setError] = useState("")
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [showHistory, setShowHistory] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [backendUrl, setBackendUrl] = useState(getApiUrl())
  const dragRef = useRef<HTMLDivElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => { setHistory(loadHistory()) }, [])

  const words = result ? result.markdown.trim().split(/\s+/).length : 0
  const chars = result ? result.markdown.length : 0
  const lines = result ? result.markdown.split("\n").length : 0

  const handleConvert = useCallback(async () => {
    setError("")
    if (inputMode === "file" && files.length === 0) { setError(t("tool.select")); return }
    if (inputMode === "url" && !url.trim()) { setError(t("tool.enterurl")); return }
    setLoading(true)
    try {
      const source = inputMode === "file" ? files[0] : url.trim()
      const r = inputMode === "file" ? await convertFile(source as File) : await convertUrl(source as string)
      setResult(r)
      const w = r.markdown.trim().split(/\s+/).length
      const entry: HistoryItem = { id: Date.now().toString(36), markdown: r.markdown, filename: r.filename, words: w, time: Date.now() }
      const updated = [entry, ...history].slice(0, 10)
      setHistory(updated)
      saveHistory(updated)
      toast.success(t("tool.converted"))
    } catch (e: any) { setError(e.message || "Conversion failed") }
    finally { setLoading(false) }
  }, [inputMode, files, url, history, t])

  const handleCopy = useCallback(async () => {
    if (!result) return; await navigator.clipboard.writeText(result.markdown); toast.success(t("tool.copied"))
  }, [result, t])

  const handleDownload = useCallback(() => {
    if (!result) return
    const blob = new Blob([result.markdown], { type: "text/markdown" })
    const a = document.createElement("a")
    a.href = URL.createObjectURL(blob)
    a.download = (result.filename || "document").replace(/\.[^.]+$/, "") + ".md"
    a.click(); URL.revokeObjectURL(a.href); toast.success(t("tool.downloaded"))
  }, [result, t])

  const loadFromHistory = useCallback((item: HistoryItem) => {
    setResult({ markdown: item.markdown, filename: item.filename })
    setError("")
    toast.success(t("tool.loaded"))
  }, [t])

  const clearHistory = useCallback(() => { setHistory([]); saveHistory([]) }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") handleConvert()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [handleConvert])

  return (
    <section id="tool" className="scroll-mt-20 pb-8">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* LEFT — Input panel */}
          <div className={`bg-white border border-hairline rounded-lg shadow-sm self-start ${result ? "md:col-span-2" : "md:col-span-5"}`}>
            <div className="flex border-b border-hairline">
              <button onClick={() => setInputMode("file")}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                  inputMode === "file" ? "border-ink text-ink" : "border-transparent text-ink/50 hover:text-ink/70"}`}>
                <Upload className="size-4" /> {t("tool.upload")}
              </button>
              <button onClick={() => setInputMode("url")}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                  inputMode === "url" ? "border-ink text-ink" : "border-transparent text-ink/50 hover:text-ink/70"}`}>
                <Link className="size-4" /> {t("tool.url")}
              </button>
            </div>

            <div className="p-4">
              {inputMode === "file" ? (
                <div ref={dragRef}
                  onDragOver={(e) => { e.preventDefault(); dragRef.current?.classList.add("border-cobalt", "bg-cobalt/5") }}
                  onDragLeave={() => dragRef.current?.classList.remove("border-cobalt", "bg-cobalt/5")}
                  onDrop={(e) => { e.preventDefault(); dragRef.current?.classList.remove("border-cobalt", "bg-cobalt/5"); setFiles((prev) => [...prev, ...Array.from(e.dataTransfer.files)]) }}
                  onClick={() => fileRef.current?.click()}
                  className="border-2 border-dashed border-hairline rounded-lg p-6 text-center cursor-pointer hover:border-cobalt/40 transition-colors bg-paper/40">
                  <input ref={fileRef} type="file" multiple className="hidden" accept=".docx,.xlsx,.pptx,.pdf,.html,.csv,.json,.xml,.txt,.md,.ipynb"
                    onChange={(e) => { if (e.target.files) setFiles((prev) => [...prev, ...Array.from(e.target.files!)]) }} />
                  <Upload className="size-7 mx-auto mb-2 text-ink/30" />
                  <p className="text-sm text-ink/70">{t("tool.drag")} <span className="text-cobalt underline underline-offset-2 cursor-pointer">{t("tool.click")}</span></p>
                  <p className="text-xs text-ink/40 mt-1 font-mono">DOCX · XLSX · PPTX · PDF · HTML · CSV · JSON · XML · TXT · MD · IPYNB</p>
                  {files.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2 justify-center">
                      {files.map((f, i) => (
                        <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-paper-alt text-xs font-medium text-ink">
                          {f.name} <button onClick={(e) => { e.stopPropagation(); setFiles((prev) => prev.filter((_, idx) => idx !== i)) }} className="text-ink/40 hover:text-forest ml-1">&times;</button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <input type="url" value={url} onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com/document.pdf"
                  className="w-full px-4 py-2.5 border border-hairline rounded-lg text-sm focus:outline-none focus:border-cobalt transition-colors" />
              )}

              <div className="mt-3 flex items-center gap-3">
                <button onClick={handleConvert} disabled={loading}
                  className="px-5 py-2 bg-ink text-paper text-sm font-medium rounded-lg hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-2 shadow-sm">
                  {loading ? t("tool.converting") : t("tool.convert")} {!loading && <ArrowRight className="size-4" />}
                </button>
                <span className="text-[11px] text-ink/30 font-mono">{t("tool.shortcut")}</span>
              </div>

              {error && (
                <div className="mt-3 flex items-start gap-2 text-sm text-ink/70 bg-forest/5 p-3 rounded-lg border border-forest/10">
                  <AlertCircle className="size-4 mt-0.5 shrink-0 text-forest" />
                  <span>{error}</span>
                </div>
              )}
            </div>

            {history.length > 0 && (
              <div className="border-t border-hairline">
                <button onClick={() => setShowHistory(!showHistory)}
                  className="flex items-center justify-between w-full px-4 py-2 text-xs font-medium text-ink/50 hover:text-ink transition-colors">
                  <span className="flex items-center gap-1.5"><Clock className="size-3.5" /> {t("tool.history")} ({history.length})</span>
                  <span className="text-[10px]">{showHistory ? "▲" : "▼"}</span>
                </button>
                {showHistory && (
                  <div className="px-3 pb-3 space-y-1 max-h-40 overflow-auto">
                    {history.map((item) => (
                      <button key={item.id} onClick={() => loadFromHistory(item)}
                        className="w-full text-left px-3 py-1.5 rounded-md text-xs text-ink/60 hover:bg-paper-alt hover:text-ink transition-colors flex items-center justify-between">
                        <span className="truncate mr-2">{item.filename}</span>
                        <span className="text-ink/30 shrink-0">{item.words}w</span>
                      </button>
                    ))}
                    <button onClick={clearHistory} className="flex items-center gap-1 text-[11px] text-ink/30 hover:text-forest transition-colors pt-1.5 px-1">
                      <Trash2 className="size-3" /> {t("tool.history.clear")}
                    </button>
                  </div>
                )}
              </div>
            )}

            <div className="border-t border-hairline">
              <button onClick={() => setShowSettings(!showSettings)}
                className="flex items-center gap-1.5 w-full px-4 py-2 text-xs font-medium text-ink/50 hover:text-ink transition-colors">
                <Settings className="size-3.5" /> Backend URL
              </button>
              {showSettings && (
                <div className="px-3 pb-3 flex gap-2">
                  <input type="text" value={backendUrl}
                    onChange={(e) => setBackendUrl(e.target.value)}
                    className="flex-1 px-3 py-1.5 border border-hairline rounded text-xs font-mono focus:outline-none focus:border-cobalt transition-colors"
                    placeholder="http://localhost:8000" />
                  <button onClick={() => { setApiUrl(backendUrl); setShowSettings(false) }}
                    className="px-3 py-1.5 bg-ink text-paper text-xs font-medium rounded hover:brightness-110 transition-all">
                    Save
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT — Preview pane */}
          {result && (
          <div className="md:col-span-3 bg-white border border-hairline rounded-lg shadow-sm min-h-[400px] flex flex-col">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-hairline bg-paper-alt/50">
              <div className="flex items-center gap-1 bg-hairline/30 rounded-md p-0.5">
                {(["preview", "raw"] as ViewMode[]).map((m) => (
                  <button key={m} onClick={() => setViewMode(m)}
                    className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                      viewMode === m ? "bg-white text-ink shadow-sm" : "text-ink/50 hover:text-ink/70"}`}>
                    {m === "preview" ? t("tool.preview") : t("tool.raw")}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[11px] text-ink/30 font-mono">{t("tool.stats", { w: words, c: chars, l: lines })}</span>
                <button onClick={handleCopy} className="text-xs text-ink/50 hover:text-ink transition-colors flex items-center gap-1"><Copy className="size-3.5" /> {t("tool.copy")}</button>
                <button onClick={handleDownload} className="text-xs text-ink/50 hover:text-ink transition-colors flex items-center gap-1"><Download className="size-3.5" /> {t("tool.download")}</button>
              </div>
            </div>
            <div className="p-5 flex-1 overflow-auto max-h-[600px]">
              {viewMode === "preview" ? (
                <RenderedMarkdown text={result.markdown} />
              ) : (
                <pre className="font-mono text-sm text-ink/70 whitespace-pre-wrap">{result.markdown}</pre>
              )}
            </div>
          </div>
          )}
        </div>
      </div>
    </section>
  )
}

function RenderedMarkdown({ text }: { text: string }) {
  const html = text
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/^### (.+)$/gm, "<h3 class='text-base font-semibold mt-4 mb-1 text-ink'>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2 class='text-lg font-semibold mt-5 mb-1.5 text-ink'>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1 class='text-xl font-bold mt-6 mb-2 text-ink'>$1</h1>")
    .replace(/\*\*(.+?)\*\*/g, "<strong class='text-ink'>$1</strong>").replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, "<code class='bg-hairline/30 px-1 rounded text-cobalt text-xs font-mono'>$1</code>")
    .replace(/^- (.+)$/gm, "<li class='ml-4 list-disc'>$1</li>")
    .replace(/^(\d+)\. (.+)$/gm, "<li class='ml-4 list-decimal'>$1. $2</li>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "<a href='$2' class='text-cobalt underline' target='_blank'>$1</a>")
    .replace(/\n\n/g, "</p><p>")
  return <div dangerouslySetInnerHTML={{ __html: `<p>${html}</p>` }} />
}
