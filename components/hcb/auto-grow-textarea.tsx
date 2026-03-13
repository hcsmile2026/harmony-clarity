"use client"

import { useEffect, useRef, useCallback } from "react"

interface AutoGrowTextareaProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  minHeight?: number
  storageKey?: string
  debounceMs?: number
}

export function AutoGrowTextarea({
  value,
  onChange,
  placeholder = "",
  minHeight = 120,
  storageKey,
  debounceMs = 500,
}: AutoGrowTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Auto-grow
  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = "auto"
      textarea.style.height = `${Math.max(minHeight, textarea.scrollHeight)}px`
    }
  }, [value, minHeight])

  // Restore from localStorage on mount
  useEffect(() => {
    if (storageKey && typeof window !== "undefined") {
      const saved = localStorage.getItem(storageKey)
      if (saved && !value) {
        onChange(saved)
      }
    }
  }, [storageKey]) // eslint-disable-line react-hooks/exhaustive-deps

  // Debounced save to localStorage
  const handleChange = useCallback(
    (newValue: string) => {
      onChange(newValue)

      if (storageKey && typeof window !== "undefined") {
        if (debounceRef.current) {
          clearTimeout(debounceRef.current)
        }
        debounceRef.current = setTimeout(() => {
          localStorage.setItem(storageKey, newValue)
        }, debounceMs)
      }
    },
    [onChange, storageKey, debounceMs]
  )

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => handleChange(e.target.value)}
      placeholder={placeholder}
      className="w-full resize-none outline-none transition-shadow duration-200"
      style={{
        minHeight: `${minHeight}px`,
        padding: "14px 16px",
        fontSize: "16px",
        lineHeight: "1.6",
        borderRadius: "10px",
        border: "1px solid var(--hcb-border)",
        backgroundColor: "var(--hcb-card-bg)",
        color: "var(--hcb-text-primary)",
      }}
      onFocus={(e) => {
        e.currentTarget.style.boxShadow = "0 0 0 2px var(--hcb-focus-ring)"
        e.currentTarget.style.borderColor = "var(--hcb-focus-ring)"
      }}
      onBlur={(e) => {
        e.currentTarget.style.boxShadow = "none"
        e.currentTarget.style.borderColor = "var(--hcb-border)"
      }}
    />
  )
}
