# MarkItDown Web UI 📝🚀

An easy-to-use, web-based interface built with [Next.js](https://nextjs.org) that converts any file into clean, structured Markdown — perfect for saving valuable LLM (Large Language Model) context tokens.

**🌐 Live demo:** [mar-kit-down.dev](https://www.mar-kit-down.dev/#tool)

---

## ✨ Features

- **Universal File Conversion** — Drop in PDFs, Word docs, Excel sheets, PowerPoints, HTML, CSV, JSON, XML, TXT, Markdown, or Jupyter notebooks, and convert instantly to Markdown.
- **Upload or Fetch from URL** — Upload a local file or just paste a public URL to convert it directly.
- **LLM Token Optimization** — Strips layout noise and unnecessary formatting, drastically cutting token usage for LLM context, RAG pipelines, and embeddings.
- **Structure-Preserving Output** — Keeps headings, lists, tables, and links intact instead of losing fidelity like a copy-paste would.
- **Live Preview** — Review the converted Markdown before downloading or copying it.
- **No Signup, No Limits** — Free and open source, runs entirely in the browser — no account, no CLI setup, no local environment.

## 📂 Supported Formats

`DOCX` · `XLSX` · `PPTX` · `PDF` · `HTML` · `CSV` · `JSON` · `XML` · `TXT` · `MD` · `IPYNB`

> **Note:** Only text-based PDFs can be read. Scanned or image-only PDF pages won't convert.

## 🛠️ How It Works

1. **Upload your file** — drag it in, click to choose, or paste a public URL.
2. **Let it convert** — the backend reads the file and extracts the headings, paragraphs, lists, tables, and links that matter.
3. **Review the output** — catch anything that needs a manual tweak while it's still easy to fix.
4. **Download and reuse** — save the `.md` file or copy it straight into a repo, a docs site, an agent's context, or a prompt library.

## 💡 Why Markdown?

- **Cleaner input, better LLM results** — models summarize, search, and follow instructions more reliably from Markdown than from layout-heavy files.
- **One format for everything** — a converted file can become a README, a doc page, a support article, or context for an AI skill.
- **Plain text, full control** — easier to diff, version, and revise than content pulled from a document editor.
- **No vendor lock-in** — once it's Markdown, anyone can open it, search it, or feed it to a model without the original software.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### Installation

```bash
git clone https://github.com/HaMZAAsif043/markItDownFE.git
cd markItDownFE
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

### Environment Variables

Create a `.env.local` file in the project root and configure the backend API URL (and any other required keys):

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## 🏗️ Tech Stack

- **Frontend:** [Next.js](https://nextjs.org), TypeScript
- **Backend:** Fastapi wrapping Microsoft's [`markitdown`](https://github.com/microsoft/markitdown) library
- **Conversion Engine:** [MarkItDown](https://github.com/microsoft/markitdown) by Microsoft

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/HaMZAAsif043/markItDownFE/issues) or open a PR.

## 📄 License

This project is open source. See the [LICENSE](LICENSE) file for details.
