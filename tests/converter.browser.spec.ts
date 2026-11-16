import { readFile } from "node:fs/promises"
import { expect, test, type Page } from "@playwright/test"

const api = "http://127.0.0.1:8000"

test.beforeEach(async ({ page }) => {
  await page.addInitScript((url) => { localStorage.setItem("md-backend-url", url) }, api)
  await page.route(`${api}/stats`, (route) => route.fulfill({ json: { total_conversions: 0 } }))
})

async function convert(page: Page, payload: unknown, status = 200) {
  await page.route(`${api}/convert`, (route) => route.fulfill({ status, json: payload }))
  await page.goto("/")
  await page.locator('input[type="file"]').setInputFiles({ name: "fixture.md", mimeType: "text/markdown", buffer: Buffer.from("Synthetic fixture") })
  await page.getByRole("button", { name: "Convert", exact: true }).click()
}

test("renders tables, nested lists and fenced code, and preserves copied/downloaded Markdown", async ({ page, context }) => {
  const markdown = "# Fixture\n\n| Item | Value |\n|---|---|\n| Alpha | 42 |\n\n- Parent\n  - Child\n\n```js\nconst answer = 42;\n```\n\n[Safe](https://example.com/docs)"
  await convert(page, { markdown, filename: "fixture.md" })
  const preview = page.locator(".markdown-preview")
  await expect(preview.getByRole("table")).toContainText("Alpha")
  await expect(preview.locator("li li")).toHaveText("Child")
  await expect(preview.locator("pre code")).toHaveText("const answer = 42;\n")
  await expect(preview.getByRole("link", { name: "Safe" })).toHaveAttribute("rel", "noopener noreferrer")
  await context.grantPermissions(["clipboard-read", "clipboard-write"])
  await page.getByRole("button", { name: "Copy", exact: true }).click()
  // Windows normalizes native clipboard line endings to CRLF.
  await expect.poll(async () => (await page.evaluate(() => navigator.clipboard.readText())).replace(/\r\n/g, "\n"))
    .toBe(markdown)
  await page.getByRole("button", { name: "Raw markdown", exact: true }).click()
  await expect(page.locator("#tool pre")).toHaveText(markdown)
  const downloadPromise = page.waitForEvent("download")
  await page.getByRole("button", { name: "Download .md", exact: true }).click()
  const download = await downloadPromise
  const downloadedPath = await download.path()
  expect(downloadedPath).not.toBeNull()
  expect(await readFile(downloadedPath!, "utf8")).toBe(markdown)
})

test("keeps hostile HTML and links inert and makes no preview-image requests", async ({ page }) => {
  const imageRequests: string[] = []
  await page.route("https://tracker.invalid/**", (route) => { imageRequests.push(route.request().url()); return route.abort() })
  const markdown = [
    "[attribute](https://example.com/'onmouseover='window.__previewInjected=1)",
    "[script](javascript:alert%281%29)",
    "[encoded](jav&#x61;script:alert%281%29)",
    "[data](data:text/html,attack)",
    "[relative](./document.md)",
    "[protocol-relative](//tracker.invalid/link)",
    '<img src="https://tracker.invalid/raw.png" onerror="window.__previewInjected=1">',
    "<script>window.__previewInjected=1</script>",
    "![remote](https://tracker.invalid/image.png)",
    "[Safe](https://example.com/docs)",
    "[Email](mailto:hello@example.com)",
  ].join("\n\n")
  await convert(page, { markdown, filename: "hostile.md" })
  const preview = page.locator(".markdown-preview")
  await expect(preview).toBeVisible()
  await expect(preview.locator("[onmouseover], [onerror], script, img")).toHaveCount(0)
  for (const name of ["script", "encoded", "data", "relative", "protocol-relative"]) {
    await expect(preview.getByRole("link", { name, exact: true })).toHaveCount(0)
  }
  await expect(preview.getByRole("link", { name: "Safe", exact: true })).toHaveAttribute("href", "https://example.com/docs")
  await expect(preview.getByRole("link", { name: "Email", exact: true })).toHaveAttribute("href", "mailto:hello@example.com")
  await preview.hover()
  expect(await page.evaluate(() => Reflect.get(window, "__previewInjected"))).toBeUndefined()
  expect(imageRequests).toEqual([])
})

test("rejects malformed API data without rendering or storing it", async ({ page }) => {
  await convert(page, { markdown: { invalid: true }, filename: "bad.md" })
  await expect(page.getByText("The conversion service returned an invalid response. Please try again.")).toBeVisible()
  await expect(page.locator(".markdown-preview")).toHaveCount(0)
  expect(await page.evaluate(() => localStorage.getItem("md-history"))).toBeNull()
})

test("restores valid historical output while ignoring corrupt entries", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("md-history", JSON.stringify([
    null,
    { id: "invalid", markdown: 42 },
    { id: "legacy", markdown: "# Legacy", filename: "legacy.md", words: 2, time: 1_700_000_000_000 },
  ])))
  await page.goto("/")
  await page.getByRole("button", { name: "History (1)", exact: true }).click()
  await page.getByRole("button", { name: "legacy.md 2w", exact: true }).click()
  await expect(page.locator(".markdown-preview").getByRole("heading", { name: "Legacy" })).toBeVisible()
})
