import { expect, test } from "@playwright/test"
import { convertFile, convertUrl, fetchStats } from "../lib/api"
import { loadHistory, saveHistory } from "../lib/history"
import { conversionResultSchema } from "../lib/schemas"

const originalFetch = globalThis.fetch
const conversion = { markdown: "# A document\n\n**Original** content.", filename: "document.md" }
const historyItem = { ...conversion, id: "legacy", words: 5, time: 1_700_000_000_000 }

test.afterEach(() => { globalThis.fetch = originalFetch })

function respondWith(payload: unknown, status = 200) {
  globalThis.fetch = async () => new Response(JSON.stringify(payload), {
    status,
    headers: { "Content-Type": "application/json" },
  })
}

test("accepts current backend shapes and preserves Markdown exactly", () => {
  const markdown = "\n  # 日本語 العربية\n\n| x | y |\n|---|---|\n"
  expect(conversionResultSchema.parse({ ...conversion, markdown, source: "https://example.com", size: 0 }))
    .toEqual({ ...conversion, markdown, source: "https://example.com", size: 0 })
  expect(conversionResultSchema.parse({ ...conversion, markdown: "" }).markdown).toBe("")
})

for (const [name, payload] of [
  ["missing Markdown", { filename: "x.md" }],
  ["non-string Markdown", { ...conversion, markdown: {} }],
  ["empty filename", { ...conversion, filename: "" }],
  ["negative size", { ...conversion, size: -1 }],
  ["fractional size", { ...conversion, size: 1.5 }],
] as const) {
  test(`rejects ${name} at the API boundary`, async () => {
    respondWith(payload)
    await expect(convertUrl("https://example.com/document")).rejects.toThrow("invalid response")
  })
}

test("submits file and URL fields using the existing API contract", async () => {
  const requests: FormData[] = []
  globalThis.fetch = async (_input, init) => {
    requests.push(init?.body as FormData)
    return Response.json(conversion)
  }
  const file = new File(["source"], "source.txt", { type: "text/plain" })
  expect(await convertFile(file)).toEqual(conversion)
  expect(await convertUrl("https://example.com/document")).toEqual(conversion)
  expect((requests[0].get("file") as File).name).toBe("source.txt")
  expect(requests[1].get("url")).toBe("https://example.com/document")
})

test("handles non-JSON successful responses as invalid data", async () => {
  globalThis.fetch = async () => new Response("<html>Unexpected gateway page</html>")
  await expect(convertUrl("https://example.com")).rejects.toThrow("invalid response")
})

test("handles FastAPI string and structured validation errors", async () => {
  respondWith({ detail: "Unsupported document" }, 422)
  await expect(convertUrl("https://example.com")).rejects.toThrow("Unsupported document")
  respondWith({ detail: [{ loc: ["body", "url"], msg: "URL is required", type: "missing" }] }, 422)
  await expect(convertUrl("https://example.com")).rejects.toThrow("URL is required")
})

test("does not expose arbitrary error objects as UI messages", async () => {
  respondWith({ detail: { unexpected: "object" } }, 503)
  await expect(convertUrl("https://example.com")).rejects.toThrow("Conversion failed (HTTP 503)")
  globalThis.fetch = async () => new Response("Gateway failed", { status: 502 })
  await expect(convertUrl("https://example.com")).rejects.toThrow("Conversion failed (HTTP 502)")
})

test("validates stats and preserves their existing unavailable fallback", async () => {
  respondWith({ total_conversions: 123 })
  expect(await fetchStats()).toEqual({ total_conversions: 123 })
  for (const payload of [{ total_conversions: "123" }, { total_conversions: -1 }, null]) {
    respondWith(payload)
    expect(await fetchStats()).toEqual({ total_conversions: 0 })
  }
  globalThis.fetch = async () => { throw new Error("Offline") }
  expect(await fetchStats()).toEqual({ total_conversions: 0 })
})

test("loads valid legacy history while discarding malformed entries", () => {
  const storage = { getItem: () => JSON.stringify([null, { markdown: 42 }, historyItem]) }
  expect(loadHistory(storage)).toEqual([historyItem])
})

test("bounds history and tolerates invalid JSON, shapes, and blocked storage", () => {
  expect(loadHistory({ getItem: () => JSON.stringify(Array.from({ length: 20 }, (_, index) => ({ ...historyItem, id: String(index) }))) })).toHaveLength(10)
  for (const raw of ["{", "null", "{}", "42"]) expect(loadHistory({ getItem: () => raw })).toEqual([])
  expect(loadHistory({ getItem: () => { throw new Error("Storage denied") } })).toEqual([])
  expect(() => saveHistory([historyItem], { setItem: () => { throw new Error("Quota exceeded") } })).not.toThrow()
})

test("writes at most ten history entries without changing their contents", () => {
  let saved = ""
  saveHistory(Array.from({ length: 12 }, () => historyItem), { setItem: (_key, value) => { saved = value } })
  expect(JSON.parse(saved)).toEqual(Array.from({ length: 10 }, () => historyItem))
})
