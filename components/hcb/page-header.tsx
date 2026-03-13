"use client"

interface PageHeaderProps {
  title: string
  subtitle?: string
  onBack?: () => void
  rightElement?: React.ReactNode
}

export function PageHeader({ title, subtitle, onBack, rightElement }: PageHeaderProps) {
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
        {rightElement && <div>{rightElement}</div>}
      </div>

      <h1
        className="font-serif text-[28px] md:text-[32px] font-normal leading-tight"
        style={{ color: "var(--hcb-text-primary)" }}
      >
        {title}
      </h1>
      {subtitle && (
        <p
          className="mt-2 text-base leading-relaxed"
          style={{ color: "var(--hcb-text-secondary)" }}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
