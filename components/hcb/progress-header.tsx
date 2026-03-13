"use client"

interface ProgressHeaderProps {
  step: number
  totalSteps: number
  onBack?: () => void
}

export function ProgressHeader({ step, totalSteps, onBack }: ProgressHeaderProps) {
  const progressPercent = Math.round((step / totalSteps) * 100)

  return (
    <div className="mb-6 md:mb-8">
      <div className="flex items-center justify-between mb-4">
        {onBack ? (
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm transition-colors cursor-pointer"
            style={{ color: "var(--hcb-text-secondary)" }}
            type="button"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 12L6 8L10 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back
          </button>
        ) : (
          <div />
        )}
        <span
          className="text-sm font-medium"
          style={{ color: "var(--hcb-text-secondary)" }}
        >
          Harmony Clarity
        </span>
      </div>

      <div className="flex items-center justify-between mb-3">
        <span
          className="text-sm"
          style={{ color: "var(--hcb-text-secondary)" }}
        >
          Step {step} of {totalSteps}
        </span>
      </div>

      <div
        className="h-1 w-full rounded-full overflow-hidden"
        style={{ backgroundColor: "var(--hcb-border)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            backgroundColor: "var(--hcb-action-primary)",
            width: `${progressPercent}%`,
          }}
        />
      </div>
    </div>
  )
}
