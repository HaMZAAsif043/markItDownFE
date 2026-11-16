# F2: Safe Markdown preview and validated frontend boundaries

Status: verified; draft PR pending. Started: 16 November 2026. Updated: 17 November 2026.

## Request and scope

Begin the roadmap using Zod and maintainable TypeScript practices. This work addresses F2 and validates the API/history inputs that reach the preview. TypeScript remains the static type checker; Zod validates untrusted runtime data.

Backend execution limits, real batching, analytics, OCR, and paid features are separate work items.

## Repository and branch

- Repository: HaMZAAsif043/markItDownFE.
- Base: origin/main, refreshed 16 November 2026, commit `0fe5bcc89646e6af25a0651973af64e8b1c3f122`.
- Branch: `fix/safe-preview-zod-validation`.
- Initial working tree: clean; no unrelated edits present.
- Backend changes: none required; existing response shapes remain supported.

## Observed problem

The existing regex renderer inserts Markdown link destinations into single-quoted HTML attributes. A crafted link generates an extra event-handler attribute. It also leaves GFM tables as plain text. Conversion responses and browser history are trusted without validating their shape; malformed values can reach rendering or become an object-valued error message.

## Acceptance criteria

- [x] Render Markdown as React elements without interpolating untrusted HTML.
- [x] Raw HTML and unsafe link schemes remain inert; preview images do not fetch remote assets.
- [x] Tables, nested lists, fenced code, and safe links render correctly.
- [x] Zod schemas validate conversion responses, stats, backend errors, and saved history; TypeScript types derive from schemas.
- [x] Invalid payloads produce understandable errors; malformed history does not crash the converter.
- [x] Existing valid history and backend payloads remain compatible; original Markdown is preserved for copy/download.
- [x] Focused regression tests, static type checking, lint, production build, and browser verification are recorded honestly.

## Verification

Environment: Windows, Node 24.21.0, Next.js 16.2.9, Zod 4.6.7, React Markdown 10.1.0, Playwright 1.65.1. Read the installed Next.js component, TypeScript, and Playwright guides once dependency installation completed.

Baseline reproduction: evaluating the original renderer produced an injected `onmouseover` attribute; a GFM table produced no `<table>`. This was generated-markup evidence. The new Chromium tests check DOM attributes, inert payloads, and absence of image requests in a real browser.

| Command/check | Result | Limitation |
|---|---|---|
| `npm run typecheck` | Passed | Static checking, not runtime validation. |
| `npm run build` | Passed; 15 static pages generated | Next.js font fetching required the supported network path. |
| `npx eslint components/ConverterTool.tsx components/MarkdownPreview.tsx lib/api.ts lib/history.ts lib/schemas.ts lib/types.ts tests playwright.config.ts` | Passed | Changed implementation and test files only. |
| `npm test` | 18 tests passed: 14 contracts, 4 Chromium scenarios | Synthetic data; conversion responses mocked. No backend extraction or other browser engines tested. |
| `npm run lint` | Failed: 6 errors, 2 warnings in unchanged files | Internal home links in Header/Footer/UseCasePage, ThemeProvider effect state, and ambient declarations. Baseline already failed before those files were touched; they remain unchanged. |
| `npm audit --json` | Failed: 17 affected packages (9 moderate, 7 high, 1 critical), including existing Next.js | Audit reports advisories, not verified exploitability of this application. Initial locked install reported 18 affected packages. No broad dependency upgrade or forced audit fix was attempted. |

The first browser run passed 17/18 tests. The history button included its decorative arrow in its accessible name; marking it `aria-hidden` and adding `aria-expanded` fixed the failure, and the full suite passed. Adding native clipboard verification exposed Windows' LF-to-CRLF normalization; the clipboard check compares content after normalizing line endings, while downloads are checked byte-for-byte. Previews intentionally omit raw HTML/images and make relative/unsafe links non-clickable. The new preview notice falls back to English in other locales.

History uses `useSyncExternalStore` with cached snapshots, storage validation, and same-tab/cross-tab notifications to avoid hydration mismatches and state updates inside a mounting effect. Storage remains optional; quota errors do not discard a conversion result. Stats retain their existing zero fallback on unavailable/invalid data; this is not evidence of a true zero conversion count.

Priority follow-ups: establish a clean repository-wide lint baseline and upgrade the existing framework/toolchain advisories in a separate branch before calling the application production-hardened. F3 backend risks and F4 true batching remain unresolved.

## Sources

- [Zod basics](https://zod.dev/basics): runtime parsing and inferred types.
- [React Markdown](https://github.com/remarkjs/react-markdown#security): safe-by-default element rendering; plugin and URL-policy caveats.
- [remark-gfm](https://github.com/remarkjs/remark-gfm): GFM tables and related syntax.

## Publication and handoff

Commit: pending. Draft PR: pending. No business-validation results are claimed.
