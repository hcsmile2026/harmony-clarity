"use client"

import { ReactNode, ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  fullWidth?: boolean
  isLoading?: boolean
}

export function PrimaryButton({
  children,
  fullWidth = false,
  isLoading = false,
  disabled,
  className = "",
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading

  return (
    <button
      {...props}
      disabled={isDisabled}
      className={`
        flex items-center justify-center gap-2
        h-[48px] md:h-[52px] px-6 
        rounded-[10px] md:rounded-[12px]
        text-base font-semibold
        transition-all duration-200
        cursor-pointer
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      style={{
        backgroundColor: isDisabled ? "var(--hcb-action-primary)" : "var(--hcb-action-primary)",
        color: "#FFFFFF",
        opacity: isDisabled ? 0.5 : 1,
        transform: isDisabled ? "none" : undefined,
        cursor: isDisabled ? "not-allowed" : "pointer",
      }}
      onMouseEnter={(e) => {
        if (!isDisabled) {
          e.currentTarget.style.backgroundColor = "var(--hcb-action-primary-hover)"
          e.currentTarget.style.transform = "translateY(-1px)"
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "var(--hcb-action-primary)"
        e.currentTarget.style.transform = "none"
      }}
    >
      {isLoading ? (
        <svg
          className="animate-spin h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        children
      )}
    </button>
  )
}

export function SecondaryButton({
  children,
  fullWidth = false,
  isLoading = false,
  disabled,
  className = "",
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading

  return (
    <button
      {...props}
      disabled={isDisabled}
      className={`
        flex items-center justify-center gap-2
        h-[48px] md:h-[52px] px-6 
        rounded-[10px] md:rounded-[12px]
        text-base font-semibold
        transition-all duration-200
        cursor-pointer
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      style={{
        backgroundColor: isDisabled ? "var(--hcb-action-secondary)" : "var(--hcb-action-secondary)",
        color: "#FFFFFF",
        opacity: isDisabled ? 0.5 : 1,
        cursor: isDisabled ? "not-allowed" : "pointer",
      }}
      onMouseEnter={(e) => {
        if (!isDisabled) {
          e.currentTarget.style.backgroundColor = "var(--hcb-action-secondary-hover)"
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "var(--hcb-action-secondary)"
      }}
    >
      {isLoading ? (
        <svg
          className="animate-spin h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        children
      )}
    </button>
  )
}

interface TextLinkButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export function TextLinkButton({ children, className = "", ...props }: TextLinkButtonProps) {
  return (
    <button
      {...props}
      className={`
        text-base font-medium
        transition-colors duration-200
        cursor-pointer
        bg-transparent border-none
        ${className}
      `}
      style={{ color: "var(--hcb-action-secondary)" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "var(--hcb-action-secondary-hover)"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "var(--hcb-action-secondary)"
      }}
    >
      {children}
    </button>
  )
}
