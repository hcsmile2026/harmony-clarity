"use client"

interface CreditsCardProps {
  credits: number
}

export function CreditsCard({ credits }: CreditsCardProps) {
  return (
    <div
      className="flex items-center gap-3 rounded-[12px] px-5 py-4"
      style={{
        backgroundColor: "var(--hcb-card-bg)",
        border: "1px solid var(--hcb-border-card)",
      }}
    >
      <span className="text-xl" style={{ color: "var(--hcb-action-primary)" }}>
        &#10022;
      </span>
      <div>
        <div
          className="text-2xl font-serif font-bold"
          style={{ color: "var(--hcb-text-primary)" }}
        >
          {credits}
        </div>
        <div
          className="text-sm"
          style={{ color: "var(--hcb-text-secondary)" }}
        >
          {credits === 1 ? "Credit remaining" : "Credits remaining"}
        </div>
      </div>
    </div>
  )
}
