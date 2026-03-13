"use client"

import { ReactNode } from "react"

interface ClarityCardProps {
  children: ReactNode
  className?: string
}

export function ClarityCard({ children, className = "" }: ClarityCardProps) {
  return (
    <div
      className={`rounded-[14px] p-5 md:p-7 ${className}`}
      style={{
        backgroundColor: "var(--hcb-card-bg)",
        border: "1px solid var(--hcb-border-card)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
      }}
    >
      {children}
    </div>
  )
}
