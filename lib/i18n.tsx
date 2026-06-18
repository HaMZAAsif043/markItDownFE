"use client"

import { createContext, useCallback, useContext, useState } from "react"

type Lang = "en" | "zh-CN" | "zh-TW" | "ja" | "fr" | "es" | "de" | "ko"

const EN: Record<string, string> = {
  "brand.name": "MarkItDown",
  "nav.convert": "Convert", "nav.how": "How it works", "nav.faq": "FAQ",
  "hero.eyebrow": "documents → markdown",
  "hero.h1": "Turn any file into Markdown your AI can read",
  "hero.sub": "Upload a DOCX, PDF, slide deck, spreadsheet, or web page. Get back clean Markdown with headings, lists, tables, and links still in place.",
  "hero.stat": "100,000+ files converted so far",
  "hero.pdfnote": "PDF note: only text-based PDFs can be read. Scanned or image-only pages won't convert.",
  "tool.upload": "Upload a file", "tool.url": "Fetch from URL",
  "tool.drag": "Drag a file here, or", "tool.click": "click to choose one",
  "tool.convert": "Convert", "tool.converting": "Converting...",
  "tool.preview": "Preview", "tool.raw": "Raw markdown",
  "tool.copy": "Copy", "tool.download": "Download .md",
  "tool.select": "Select a file first", "tool.enterurl": "Enter a URL first",
  "tool.copied": "Copied to clipboard", "tool.downloaded": "File downloaded", "tool.converted": "Converted",
  "tool.history": "History", "tool.loaded": "Loaded from history",
  "tool.stats": "{w} words · {c} chars · {l} lines",
  "tool.shortcut": "Ctrl+Enter to convert",
  "tool.history.clear": "Clear history", "tool.history.empty": "No recent conversions",
  "tool.empty": "Your converted file will show up here.",
  "how.eyebrow": "the process", "how.h2": "From file to Markdown in four steps",
  "how.1.title": "Upload your file", "how.1.desc": "DOCX, XLSX, PPTX, PDF, HTML, CSV, JSON, XML, TXT, MD, or IPYNB. Drag it in or paste a public URL.",
  "how.2.title": "Let it convert", "how.2.desc": "MarkItDown reads the file and pulls out the headings, paragraphs, lists, tables, and links that actually matter.",
  "how.3.title": "Review the output", "how.3.desc": "Check the Markdown before you use it. Catch anything that needs a manual tweak while it's still easy to fix.",
  "how.4.title": "Download and reuse", "how.4.desc": "Save the .md file or copy it straight into a repo, a docs site, an agent's context, or a prompt library.",
  "why.eyebrow": "the problem", "why.h2": "Why files need to become Markdown before AI can use them well",
  "why.card1.title": "Heavy files confuse AI tools", "why.card1.desc": "PDFs, slide decks, and spreadsheets bury their structure inside layout and formatting. Markdown removes the layout and keeps the meaning.",
  "why.card2.title": "Knowledge stays locked inside apps", "why.card2.desc": "Once it's Markdown, anyone can open it, search it, or feed it to a model without needing the original software.",
  "why.card3.title": "Manual copy-paste breaks everything", "why.card3.desc": "A proper conversion keeps headings, lists, and tables intact, so there's far less cleanup before the content is usable.",
  "what.eyebrow": "the tool", "what.h2": "One converter instead of five",
  "what.p": "MarkItDown converts the file formats people actually have into the same clean Markdown, in one pass.",
  "what.bullet1": "Handles DOCX, XLSX, PPTX, PDF, HTML, CSV, JSON, XML, TXT, MD, and IPYNB in a single workflow",
  "what.bullet2": "Keeps headings, lists, tables, and links recognizable in the output",
  "what.bullet3": "Shows you a preview before you commit to a download",
  "what.bullet4": "Built with AI context windows and knowledge-base migrations in mind",
  "benefits.eyebrow": "what you get", "benefits.h2": "Why teams convert to Markdown in the first place",
  "benefit.1.title": "Better context for AI", "benefit.1.desc": "Markdown gives a model a clearer structure than a layout-heavy file, which helps with summarizing, searching, and following instructions.",
  "benefit.2.title": "Reusable knowledge", "benefit.2.desc": "A converted file can become a README, a doc page, a support article, or a source file for an AI skill.",
  "benefit.3.title": "Easier editing", "benefit.3.desc": "Plain text is simpler to read, diff, and revise than content copied out of a document editor.",
  "benefit.4.title": "Faster migration", "benefit.4.desc": "Move existing DOCX, PDF, and spreadsheet content into a Markdown-based workflow without retyping.",
  "benefit.5.title": "Searchable by default", "benefit.5.desc": "Markdown is lightweight, text-based, and easy to index in a docs site, wiki, or embedding pipeline.",
  "benefit.6.title": "Nothing to install", "benefit.6.desc": "Convert in the browser. No command-line setup, no library to manage, no local environment to configure.",
  "blog.eyebrow": "further reading", "blog.h2": "Notes on working with Markdown and AI", "blog.read": "Read article →",
  "blog.post1.date": "May 29, 2026", "blog.post1.title": "Keeping structure when you convert a PDF to Markdown", "blog.post1.excerpt": "A walkthrough of what tends to survive a PDF conversion and what tends to break — and how to check for both.",
  "blog.post2.date": "May 28, 2026", "blog.post2.title": "Building a team knowledge base out of files you already have", "blog.post2.excerpt": "How to turn scattered Word docs, PDFs, and internal wiki pages into one searchable set of Markdown files.",
  "blog.post3.date": "May 27, 2026", "blog.post3.title": "Why plain text still wins for feeding AI assistants", "blog.post3.excerpt": "A look at why models tend to follow instructions and summarize more reliably from Markdown than from raw HTML.",
  "faq.eyebrow": "questions", "faq.h2": "Frequently asked questions",
  "faq.q1": "What is MarkItDown?", "faq.a1": "A browser-based tool that converts common document and data formats into Markdown.",
  "faq.q2": "What formats are supported?", "faq.a2": "DOCX, XLSX, PPTX, PDF, HTML, CSV, JSON, XML, TXT, MD, and IPYNB.",
  "faq.q3": "Why do AI agents prefer Markdown?", "faq.a3": "Markdown spells structure out directly so the model doesn't have to infer it from layout.",
  "faq.q4": "Is PDF conversion always perfect?", "faq.a4": "Text-based PDFs convert well. Scanned or image-only PDFs need OCR first.",
  "faq.q5": "Is this affiliated with Microsoft?", "faq.a5": "No. MarkItDown is an independent tool that uses the open-source markitdown library.",
  "faq.q6": "Do I need an account?", "faq.a6": "No account needed. Unlimited free conversions.",
  "faq.q7": "How accurate is the conversion?", "faq.a7": "Most text, headings, lists, and tables come through cleanly. Complex layouts may need a touch-up.",
  "faq.q8": "Why convert Office docs to Markdown?", "faq.a8": "Once it's Markdown, anyone can read it without needing Office or any specific app.",
  "faq.q9": "Can I batch convert?", "faq.a9": "Yes — select multiple files and they'll all be available for download.",
  "faq.q10": "What should I do after converting?", "faq.a10": "Check the preview, then download or copy into your repo, docs site, or AI agent context.",
  "footer.desc": "Convert documents to Markdown. Free, open source, no account required.",
  "footer.legal": "Legal", "footer.usecases": "Use cases", "footer.languages": "Languages",
  "footer.copyright": "All rights reserved.",
}

const ZH_CN: Record<string, string> = {
  "nav.convert": "转换", "nav.how": "使用方法", "nav.faq": "常见问题",
  "hero.eyebrow": "文档 → Markdown",
  "hero.h1": "将任何文件转换为AI可读的Markdown",
  "hero.sub": "上传DOCX、PDF、PPT、电子表格或网页，即可获得干净的Markdown格式。",
  "hero.stat": "已转换超过100,000个文件",
  "hero.pdfnote": "注意：仅支持基于文本的PDF。扫描件无法转换。",
  "tool.upload": "上传文件", "tool.url": "从URL获取",
  "tool.drag": "拖拽文件到此处，或", "tool.click": "点击选择",
  "tool.convert": "开始转换", "tool.converting": "转换中...",
  "tool.preview": "预览", "tool.raw": "原始Markdown",
  "tool.copy": "复制", "tool.download": "下载 .md",
  "tool.select": "请先选择文件", "tool.enterurl": "请输入URL",
  "tool.copied": "已复制到剪贴板", "tool.downloaded": "文件已下载", "tool.converted": "转换成功",
  "tool.history": "历史记录", "tool.loaded": "已加载历史记录",
  "tool.stats": "{w} 词 · {c} 字符 · {l} 行",
  "tool.shortcut": "Ctrl+Enter 开始转换",
  "tool.history.clear": "清空记录", "tool.history.empty": "暂无转换记录",
  "tool.empty": "转换结果将显示在这里。",
  "benefit.1.title": "为AI提供更好的上下文", "benefit.1.desc": "Markdown比布局复杂的文件更适合AI理解。",
  "benefit.2.title": "可复用的知识", "benefit.2.desc": "转换后的文件可成为README、文档、或AI技能源文件。",
  "benefit.3.title": "更容易编辑", "benefit.3.desc": "纯文本比从文档编辑器中复制的内容更易于阅读和修订。",
  "benefit.4.title": "快速迁移", "benefit.4.desc": "将现有DOCX、PDF等内容迁移到Markdown工作流，无需重新输入。",
  "benefit.5.title": "默认可搜索", "benefit.5.desc": "Markdown轻量易索引。",
  "benefit.6.title": "无需安装", "benefit.6.desc": "在浏览器中转换，无需设置命令行。",
  "blog.post1.date": "2026年5月29日", "blog.post1.title": "PDF转Markdown时如何保持结构", "blog.post1.excerpt": "PDF转换中哪些内容能保留、哪些会丢失——以及如何检查两者。",
  "blog.post2.date": "2026年5月28日", "blog.post2.title": "利用现有文件构建团队知识库", "blog.post2.excerpt": "如何将散落的Word文档、PDF和维基页面整合为一套可搜索的Markdown文件。",
  "blog.post3.date": "2026年5月27日", "blog.post3.title": "纯文本在AI交互中仍然胜出的原因", "blog.post3.excerpt": "探究为什么模型从Markdown中理解指令比从原始HTML中更可靠。",
  "how.eyebrow": "流程", "how.h2": "四个步骤从文件到Markdown",
  "how.1.title": "上传文件", "how.1.desc": "支持DOCX、XLSX、PPTX、PDF等多种格式。",
  "how.2.title": "开始转换", "how.2.desc": "MarkItDown读取文件，提取标题、段落、列表、表格等关键结构。",
  "how.3.title": "检查结果", "how.3.desc": "在使用前预览Markdown，发现需要手动调整的地方。",
  "how.4.title": "下载使用", "how.4.desc": "保存.md文件或直接复制到代码仓库或AI上下文中。",
  "why.eyebrow": "问题", "why.h2": "为什么AI使用前需要将文件转换为Markdown",
  "why.card1.title": "重型文件让AI工具困惑", "why.card1.desc": "PDF和PPT将结构隐藏在布局中。Markdown移除布局，保留含义。",
  "why.card2.title": "知识被锁在应用里", "why.card2.desc": "转为Markdown后，任何人都可以打开或搜索，无需原始软件。",
  "why.card3.title": "手动复制破坏一切", "why.card3.desc": "正确的转换能保留标题、列表和表格结构。",
  "what.eyebrow": "工具", "what.h2": "一个转换器代替五个",
  "what.p": "MarkItDown将常见文件格式转换为统一的Markdown。",
  "what.bullet1": "支持DOCX、XLSX、PPTX、PDF、HTML、CSV等多种格式",
  "what.bullet2": "保留标题、列表、表格和链接",
  "what.bullet3": "下载前可预览",
  "what.bullet4": "专为AI上下文和知识库迁移设计",
  "benefits.eyebrow": "收益", "benefits.h2": "团队选择Markdown的原因",
  "blog.eyebrow": "延伸阅读", "blog.h2": "Markdown与AI使用笔记", "blog.read": "阅读文章 →",
  "faq.eyebrow": "问答", "faq.h2": "常见问题",
  "faq.q1": "什么是MarkItDown？", "faq.a1": "一个将常见文档格式转换为Markdown的浏览器工具。",
  "faq.q2": "支持哪些格式？", "faq.a2": "DOCX, XLSX, PPTX, PDF, HTML, CSV, JSON, XML, TXT, MD, IPYNB。",
  "faq.q3": "为什么AI代理更喜欢Markdown？", "faq.a3": "Markdown直接标明结构，模型无需从布局中推断。",
  "faq.q4": "PDF转换总是完美吗？", "faq.a4": "文本型PDF转换良好。扫描件需要先进行OCR。",
  "faq.q5": "和微软有关系吗？", "faq.a5": "没有。MarkItDown是一个使用开源库的独立工具。",
  "faq.q6": "需要注册吗？", "faq.a6": "不需要。无限次免费转换。",
  "faq.q7": "转换准确性如何？", "faq.a7": "大多数文本和表格都能准确转换。复杂布局可能需要手动调整。",
  "faq.q8": "为什么要把Office文档转为Markdown？", "faq.a8": "转为Markdown后，无需Office即可阅读。",
  "faq.q9": "可以批量转换吗？", "faq.a9": "可以——选择多个文件，全部可供下载。",
  "faq.q10": "转换后应该做什么？", "faq.a10": "预览检查结果，然后下载或复制到您的项目中。",
  "footer.desc": "将文档转换为Markdown。免费、开源、无需注册。",
  "footer.legal": "法律条款", "footer.usecases": "应用场景", "footer.languages": "语言",
  "footer.copyright": "保留所有权利。",
}

const ZH_TW: Record<string, string> = {
  "nav.convert": "轉換", "nav.how": "使用說明", "nav.faq": "常見問題",
  "hero.eyebrow": "文件 → Markdown",
  "hero.h1": "將任何檔案轉換為AI可讀的Markdown",
  "hero.sub": "上傳DOCX、PDF、PPT、試算表或網頁，即可獲得乾淨的Markdown格式。",
  "tool.upload": "上傳檔案", "tool.url": "從URL獲取",
  "tool.convert": "開始轉換", "tool.converting": "轉換中...",
  "tool.copy": "複製", "tool.download": "下載 .md",
  "tool.copied": "已複製到剪貼板", "tool.downloaded": "檔案已下載", "tool.converted": "轉換成功",
  "tool.shortcut": "Ctrl+Enter 開始轉換",
  "how.eyebrow": "流程", "how.h2": "四個步驟從檔案到Markdown",
  "footer.desc": "將文件轉換為Markdown。免費、開源、無需註冊。",
}

const JA: Record<string, string> = {
  "nav.convert": "変換", "nav.how": "使い方", "nav.faq": "よくある質問",
  "hero.eyebrow": "ドキュメント → Markdown",
  "hero.h1": "あらゆるファイルをAIが読めるMarkdownに変換",
  "hero.sub": "DOCX、PDF、PPT、スプレッドシート、Webページをアップロードして、クリーンなMarkdownを取得。",
  "tool.upload": "ファイルをアップロード", "tool.url": "URLから取得",
  "tool.convert": "変換", "tool.converting": "変換中...",
  "tool.copy": "コピー", "tool.download": "ダウンロード .md",
  "tool.copied": "クリップボードにコピーしました", "tool.downloaded": "ファイルをダウンロードしました", "tool.converted": "変換完了",
  "tool.shortcut": "Ctrl+Enter で変換",
  "how.eyebrow": "手順", "how.h2": "ファイルをMarkdownに変換する4ステップ",
  "footer.desc": "ドキュメントをMarkdownに変換。無料、オープンソース、登録不要。",
}

const FR: Record<string, string> = {
  "nav.convert": "Convertir", "nav.how": "Fonctionnement", "nav.faq": "FAQ",
  "hero.eyebrow": "documents → markdown",
  "hero.h1": "Convertissez n'importe quel fichier en Markdown lisible par l'IA",
  "hero.sub": "Importez un DOCX, PDF, PPT, feuille de calcul ou page web. Obtenez un Markdown propre et structuré.",
  "tool.upload": "Importer un fichier", "tool.url": "Récupérer depuis une URL",
  "tool.convert": "Convertir", "tool.converting": "Conversion...",
  "tool.copy": "Copier", "tool.download": "Télécharger .md",
  "tool.copied": "Copié dans le presse-papier", "tool.downloaded": "Fichier téléchargé", "tool.converted": "Converti",
  "tool.shortcut": "Ctrl+Enter pour convertir",
  "how.eyebrow": "le processus", "how.h2": "Du fichier au Markdown en quatre étapes",
  "footer.desc": "Convertissez des documents en Markdown. Gratuit, open source, sans compte requis.",
}

const ES: Record<string, string> = {
  "nav.convert": "Convertir", "nav.how": "Cómo funciona", "nav.faq": "Preguntas",
  "hero.eyebrow": "documentos → markdown",
  "hero.h1": "Convierte cualquier archivo a Markdown que tu IA pueda leer",
  "hero.sub": "Sube un DOCX, PDF, PPT, hoja de cálculo o página web. Obtén Markdown limpio y estructurado.",
  "tool.upload": "Subir archivo", "tool.url": "Obtener desde URL",
  "tool.convert": "Convertir", "tool.converting": "Convirtiendo...",
  "tool.copy": "Copiar", "tool.download": "Descargar .md",
  "tool.copied": "Copiado al portapapeles", "tool.downloaded": "Archivo descargado", "tool.converted": "Convertido",
  "tool.shortcut": "Ctrl+Enter para convertir",
  "how.eyebrow": "el proceso", "how.h2": "Del archivo al Markdown en cuatro pasos",
  "footer.desc": "Convierte documentos a Markdown. Gratis, código abierto, sin registro.",
}

const DE: Record<string, string> = {
  "nav.convert": "Konvertieren", "nav.how": "So funktioniert's", "nav.faq": "FAQ",
  "hero.eyebrow": "Dokumente → Markdown",
  "hero.h1": "Wandle jede Datei in KI-lesbares Markdown um",
  "hero.sub": "Lade DOCX, PDF, PPT, Tabellenkalkulation oder Webseite hoch. Erhalte sauberes, strukturiertes Markdown.",
  "tool.upload": "Datei hochladen", "tool.url": "Von URL abrufen",
  "tool.convert": "Konvertieren", "tool.converting": "Konvertiere...",
  "tool.copy": "Kopieren", "tool.download": "Herunterladen .md",
  "tool.copied": "In Zwischenablage kopiert", "tool.downloaded": "Datei heruntergeladen", "tool.converted": "Konvertiert",
  "tool.shortcut": "Strg+Enter zum Konvertieren",
  "how.eyebrow": "der Prozess", "how.h2": "Von der Datei zu Markdown in vier Schritten",
  "footer.desc": "Dokumente in Markdown konvertieren. Kostenlos, Open Source, ohne Konto.",
}

const KO: Record<string, string> = {
  "nav.convert": "변환", "nav.how": "사용 방법", "nav.faq": "자주 묻는 질문",
  "hero.eyebrow": "문서 → Markdown",
  "hero.h1": "모든 파일을 AI가 읽을 수 있는 Markdown으로 변환",
  "hero.sub": "DOCX, PDF, PPT, 스프레드시트 또는 웹페이지를 업로드하세요. 깔끔한 Markdown을 얻을 수 있습니다.",
  "tool.upload": "파일 업로드", "tool.url": "URL에서 가져오기",
  "tool.convert": "변환", "tool.converting": "변환 중...",
  "tool.copy": "복사", "tool.download": "다운로드 .md",
  "tool.copied": "클립보드에 복사됨", "tool.downloaded": "파일 다운로드됨", "tool.converted": "변환 완료",
  "tool.shortcut": "Ctrl+Enter 변환",
  "how.eyebrow": "프로세스", "how.h2": "파일에서 Markdown으로의 4단계",
  "footer.desc": "문서를 Markdown으로 변환하세요. 무료, 오픈소스, 계정 불필요.",
}

const bundles: Record<Lang, Record<string, string>> = {
  "en": EN, "zh-CN": { ...EN, ...ZH_CN }, "zh-TW": { ...EN, ...ZH_TW },
  "ja": { ...EN, ...JA }, "fr": { ...EN, ...FR },
  "es": { ...EN, ...ES }, "de": { ...EN, ...DE }, "ko": { ...EN, ...KO },
}

interface I18nCtx { lang: Lang; setLang: (l: Lang) => void; t: (key: string, vars?: Record<string, string | number>) => string }
const I18nContext = createContext<I18nCtx>({ lang: "en", setLang: () => {}, t: (k) => k })

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en")
  const setLang = useCallback((l: Lang) => setLangState(l), [])
  const t = useCallback((key: string, vars?: Record<string, string | number>) => {
    let s = bundles[lang][key] ?? bundles["en"][key] ?? key
    if (vars) { for (const [k, v] of Object.entries(vars)) s = s.replace(`{${k}}`, String(v)) }
    return s
  }, [lang])
  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>
}

export function useTranslation() { return useContext(I18nContext) }
