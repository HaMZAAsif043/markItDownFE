import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

function safeLinkUrl(value: string): string {
  try {
    const url = new URL(value)
    return ["https:", "http:", "mailto:"].includes(url.protocol) ? url.href : ""
  } catch {
    // Relative links have no reliable source base in an uploaded document.
    return ""
  }
}

export function MarkdownPreview({ text }: { text: string }) {
  return (
    <div className="markdown-preview text-sm text-ink/70 break-words">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        skipHtml
        disallowedElements={["img"]}
        urlTransform={safeLinkUrl}
        components={{
          a: ({ href, children }) => href ? (
            <a href={href} target="_blank" rel="noopener noreferrer" className="text-cobalt underline">
              {children}
            </a>
          ) : <span>{children}</span>,
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  )
}
