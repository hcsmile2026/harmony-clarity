"use client"

import { useMemo } from "react"

interface InsightCardProps {
  label: string
  content: string
}

function renderMarkdown(text: string): string {
  // Process line by line
  const lines = text.split("\n")
  const processedLines: string[] = []
  let inList = false

  for (const line of lines) {
    let processed = line

    // Skip dividers (---)
    if (/^-{3,}$/.test(processed.trim())) {
      if (inList) {
        processedLines.push("</ul>")
        inList = false
      }
      processedLines.push('<hr class="my-4 border-t border-current opacity-20" />')
      continue
    }

    // Headers (## Header)
    if (processed.startsWith("## ")) {
      if (inList) {
        processedLines.push("</ul>")
        inList = false
      }
      processed = `<h4 class="font-serif text-base font-medium mt-4 mb-2">${processed.slice(3)}</h4>`
      processedLines.push(processed)
      continue
    }

    // Bold (**text**)
    processed = processed.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold">$1</strong>')

    // Italic (*text*)
    processed = processed.replace(/\*([^*]+)\*/g, "<em>$1</em>")

    // Bullet points (- item or * item)
    if (/^\s*[-*]\s+/.test(processed)) {
      if (!inList) {
        processedLines.push('<ul class="list-disc pl-5 my-2">')
        inList = true
      }
      processed = `<li class="mb-1">${processed.replace(/^\s*[-*]\s+/, "")}</li>`
      processedLines.push(processed)
      continue
    }

    // Close list if we hit a non-list line
    if (inList && processed.trim() !== "") {
      processedLines.push("</ul>")
      inList = false
    }

    // Empty lines become breaks
    if (processed.trim() === "") {
      processedLines.push("<br />")
      continue
    }

    // Regular paragraph
    processedLines.push(`<p class="mb-2">${processed}</p>`)
  }

  // Close any open list
  if (inList) {
    processedLines.push("</ul>")
  }

  return processedLines.join("")
}

export function InsightCard({ label, content }: InsightCardProps) {
  const renderedContent = useMemo(() => renderMarkdown(content), [content])

  return (
    <div
      className="rounded-[14px] p-6"
      style={{
        backgroundColor: "var(--hcb-card-bg)",
        border: "1px solid var(--hcb-border-card)",
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span style={{ color: "var(--hcb-action-primary)" }}>&#10022;</span>
        <h3
          className="font-serif text-lg font-normal"
          style={{ color: "var(--hcb-text-primary)" }}
        >
          {label}
        </h3>
      </div>
      <div
        className="text-base leading-relaxed prose-content"
        style={{ color: "var(--hcb-text-primary)" }}
        dangerouslySetInnerHTML={{ __html: renderedContent }}
      />
    </div>
  )
}
