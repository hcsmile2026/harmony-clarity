"use client"

interface InlineErrorProps {
  message: string
}

export function InlineError({ message }: InlineErrorProps) {
  if (!message) return null

  return (
    <div
      className="rounded-lg p-3 text-sm"
      style={{
        backgroundColor: "var(--hcb-error-bg)",
        color: "var(--hcb-error-text)",
      }}
    >
      {message}
    </div>
  )
}
