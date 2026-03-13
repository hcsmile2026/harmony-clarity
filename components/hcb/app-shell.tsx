"use client"

import { ReactNode } from "react"

interface AppShellProps {
  children: ReactNode
  maxWidth?: "sm" | "md" | "lg"
  className?: string
}

export function AppShell({ children, maxWidth = "md", className = "" }: AppShellProps) {
  const maxWidthClass = {
    sm: "max-w-[480px]",
    md: "max-w-[680px]",
    lg: "max-w-[800px]",
  }[maxWidth]

  return (
    <div
      className={`min-h-screen w-full px-4 py-8 md:py-12 ${className}`}
      style={{ backgroundColor: "var(--hcb-bg)" }}
    >
      <div className={`mx-auto w-full ${maxWidthClass}`}>{children}</div>
    </div>
  )
}
